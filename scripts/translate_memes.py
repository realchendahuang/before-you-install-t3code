#!/usr/bin/env python3
"""Batch-translate all 150 meme/sin archive items across the 16 non-EN/non-ZH-CN
languages via local `pi-subagent` (DeepSeek V4.1 Flash) with strict validation.

Outputs:
  - site/data/memes-i18n/<lang>.json (16 files)
"""

from __future__ import annotations

import argparse
import concurrent.futures
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "content" / "manifest.json"
MEMES_PATH = ROOT / "site" / "data" / "memes.json"
OUT_DIR = ROOT / "site" / "data" / "memes-i18n"

BRAND_NAMES = (
    "T3 Code",
    "T3 Connect",
    "pingdotgg/t3code",
    "PostHog",
    "Axiom",
    "Clerk",
    "USPTO",
    "GDPR",
    "GitHub",
    "Tmail",
    "Temu3 Code",
    "Discord",
    "Slack",
    "Telegram",
    "WeChat",
    "NotebookLM",
    "Antigravity",
    "Vibe Kanban",
    "Daytona",
    "OpenAI",
    "Claude",
)

ZH_TRADITIONAL_BANNED = (
    "值得注意的是",
    "不僅如此",
    "與此同時",
    "事實上",
    "毫無疑問",
    "引發廣泛關注",
    "形成鮮明對比",
    "令人震驚",
    "公然",
    "赤裸裸",
    "彰顯",
    "賦能",
    "閉環",
    "痛點",
    "抓手",
    "重磅",
    "官宣",
    "毋庸置疑",
    "顯而易見",
    "不容忽視",
    "眾所周知",
    "值得關注",
    "令人咋舌",
    "細思極恐",
    "不言而喻",
)

ZH_TW_FORBIDDEN_TERMS = (
    "微信",
    "MIT 分支",
    "MIT 分叉",
    "梗圖",
    "梗图",
    "補丁",
    "倉庫",
    "軟件",
    "信息",
    "默認",
    "鏈接",
    "活兒",
    "搞廢",
    "整廢",
    "破防",
    "舉報",
    "好使",
    "播放量",
    "點讚",
    "黑客",
    "服務器",
    "內存",
    "硬盤",
    "帶寬",
    "喜提",
    "擦屁股",
    "這玩意兒",
    "停服",
)

# Verified strictly Simplified-only characters that must not leak into zh-TW
ZH_TW_SC_CHARS = set(
    "着这说为们还没过进时经让带标机废并实东问资几账号评论关闭开发现样"
    "与专业两严举义乐习书买乱争亚产亲亿仅从价众优会伟传伤伪体佣债倾偿储"
    "党兰兴养写军农冲决况冻净减凭凯击划则刚创删剂剑剧劝办务动励劲劳势"
    "区医华协单卖卫却厂历压厌县参双变叙号叹吓吗启员响团园围国图圆圣场坏"
    "坐坚执堡堪塑壮声处贼数"
)

SCRIPT_RE_BY_LANG: dict[str, re.Pattern[str]] = {
    "zh-TW": re.compile(r"[\u4e00-\u9fff]"),
    "ja": re.compile(r"[\u3040-\u30ff\u4e00-\u9fff]"),
    "ko": re.compile(r"[\uac00-\ud7af\u1100-\u11ff]"),
    "ru": re.compile(r"[\u0400-\u04ff]"),
    "ar": re.compile(r"[\u0600-\u06ff]"),
    "hi": re.compile(r"[\u0900-\u097f]"),
}

HANDLE_RE = re.compile(r"(?<![A-Za-z0-9_.])@[A-Za-z0-9_]+")
PR_ISSUE_RE = re.compile(r"\b(?:PR|Issue)\s*#\d+")
HASH_RE = re.compile(r"\b(?=[0-9a-f]*[a-f])(?=[0-9a-f]*\d)[0-9a-f]{7,40}\b")
FILE_PATH_RE = re.compile(
    r"(?:~/[^\s`\"')，。；！？、]+|"
    r"\b[A-Za-z0-9_.-]+\.(?:ts|tsx|js|jsx|json|md|td|sqlite|py|sh|css|html|png|jpg)"
    r"(?::\d+(?:-\d+)?|#L\d+(?:-L\d+)?)?)"
)
ALPHA_WORD_RE = re.compile(r"[A-Za-z]{2,}")
URL_RE = re.compile(r"https?://[^\s<>)\"'\`\]，。；！？、…]+")


def run_pi(prompt: str, timeout: int = 240, role: str = "flash") -> str:
    """Invoke pi-subagent in toolless mode and strip wrapper noise/fences."""
    cmd = ["pi-subagent", "run", "--no-tools", "-r", role, prompt]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, check=False)
    if res.returncode != 0:
        err = res.stderr.strip() or res.stdout.strip()
        raise RuntimeError(f"pi-subagent exited {res.returncode}: {err[:300]}")
    lines = res.stdout.strip().splitlines()
    while lines and lines[0].startswith("[pi-subagent:"):
        lines.pop(0)
    out = "\n".join(lines).strip()
    if out.startswith("```"):
        fence_lines = out.splitlines()
        if fence_lines and fence_lines[0].startswith("```"):
            fence_lines = fence_lines[1:]
        if fence_lines and fence_lines[-1].strip() == "```":
            fence_lines = fence_lines[:-1]
        out = "\n".join(fence_lines).strip()
    elif out.startswith("`") and out.endswith("`") and "\n" not in out:
        out = out[1:-1].strip()
    return out


def parse_json_output(raw: str) -> Any:
    """Parse JSON object from model output, recovering outermost braces if needed."""
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        start = raw.find("{")
        end = raw.rfind("}")
        if start == -1 or end <= start:
            raise ValueError("No JSON object found in model output")
        return json.loads(raw[start : end + 1])


def chunk_list(items: list[Any], size: int) -> list[list[Any]]:
    return [items[i : i + size] for i in range(0, len(items), size)]


def strip_non_prose(text: str) -> str:
    """Remove handles, URLs, PRs, hashes, filenames, and brand names before prose checks."""
    s = URL_RE.sub(" ", text)
    s = HANDLE_RE.sub(" ", s)
    s = PR_ISSUE_RE.sub(" ", s)
    s = FILE_PATH_RE.sub(" ", s)
    s = HASH_RE.sub(" ", s)
    for brand in BRAND_NAMES:
        s = s.replace(brand, " ")
    return s


def extract_invariants(text: str) -> dict[str, list[str]]:
    """Collect invariant tokens from source text that must survive translation verbatim."""
    return {
        "handles": list(dict.fromkeys(HANDLE_RE.findall(text))),
        "prs": list(dict.fromkeys(re.sub(r"\s+", " ", m) for m in PR_ISSUE_RE.findall(text))),
        "hashes": list(dict.fromkeys(HASH_RE.findall(text))),
        "files": list(dict.fromkeys(fp.rstrip(".,;:!?") for fp in FILE_PATH_RE.findall(text))),
        "brands": [b for b in BRAND_NAMES if b in text],
    }


def check_item_invariants(
    src_text: str,
    cand: Any,
    lang_code: str,
    label: str,
    *,
    from_zh_cn: bool,
) -> list[str]:
    errs: list[str] = []
    if not isinstance(cand, str) or not cand.strip():
        return [f"{label}: must be a non-empty string"]
    if "t.co/" in cand.lower():
        errs.append(f"{label}: contains forbidden t.co/ link")

    if from_zh_cn:
        for bad in ZH_TRADITIONAL_BANNED:
            if bad in cand:
                errs.append(f"{label}: contains AI cliché '{bad}'")
        for bad_term in ZH_TW_FORBIDDEN_TERMS:
            if bad_term in cand:
                errs.append(f"{label}: contains forbidden/Mainland term '{bad_term}' in zh-TW")
        if re.search(r"(?<!處理)(?<!應用)程序", cand):
            errs.append(f"{label}: contains Mainland '程序' in zh-TW")
        if re.search(r"MIT Fork[\u4e00-\u9fff]|[\u4e00-\u9fff]MIT Fork", cand):
            errs.append(f"{label}: missing space around 'MIT Fork'")
        if "完了，又伤害中国人民的感情了" not in cand:
            sc_hits = sorted(set(cand) & ZH_TW_SC_CHARS)
            if sc_hits:
                errs.append(f"{label}: contains Simplified Chinese char(s) {''.join(sc_hits)}")
    else:
        prose_words = ALPHA_WORD_RE.findall(strip_non_prose(src_text))
        if len(prose_words) >= 3 and cand.strip() == src_text.strip():
            errs.append(f"{label}: left untranslated verbatim from English")
        script_re = SCRIPT_RE_BY_LANG.get(lang_code)
        if script_re and len(prose_words) >= 2 and not script_re.search(cand):
            errs.append(f"{label}: missing target script characters for {lang_code}")
        if lang_code == "pt-BR" and ("trillion" in src_text.lower() or "$1T" in src_text):
            if re.search(r"bilion[áa]ri|bilh[ãa]o|bilh[õo]es", cand, re.I):
                errs.append(f"{label}: $1T/trillion must be trilhão/trilionário in pt-BR")
        if lang_code == "vi" and src_text.startswith("Sin ") and cand.startswith("Sin "):
            errs.append(f"{label}: translate 'Sin' as 'Tội' in Vietnamese")

    inv = extract_invariants(src_text)
    for h in inv["handles"]:
        if h not in cand:
            errs.append(f"{label}: missing handle '{h}'")
    for pr in inv["prs"]:
        kind, num = pr.split("#", 1)
        num_tok = f"#{num}"
        if pr not in cand and pr.replace(" ", "") not in cand:
            if not (num_tok in cand and kind.strip().lower() in cand.lower()):
                errs.append(f"{label}: missing PR/Issue '{pr}'")
    for hs in inv["hashes"]:
        if hs not in cand:
            errs.append(f"{label}: missing hash '{hs}'")
    for fp in inv["files"]:
        if fp not in cand:
            errs.append(f"{label}: missing file/path '{fp}'")
    for brand in inv["brands"]:
        if brand not in cand:
            errs.append(f"{label}: missing brand '{brand}'")
    return errs


def validate_chunk(
    src_items: dict[str, dict[str, str]],
    cand: Any,
    lang_code: str,
    from_zh_cn: bool,
) -> list[str]:
    if not isinstance(cand, dict):
        return ["chunk must be a JSON object"]
    if set(cand.keys()) != set(src_items.keys()):
        missing = sorted(set(src_items.keys()) - set(cand.keys()))
        extra = sorted(set(cand.keys()) - set(src_items.keys()))
        return [f"IDs mismatch: missing={missing[:5]}, extra={extra[:5]}"]

    errs: list[str] = []
    for mid, src_obj in src_items.items():
        c_obj = cand[mid]
        if not isinstance(c_obj, dict) or set(c_obj.keys()) != {"title", "note"}:
            errs.append(f"{mid}: must have exact keys ['note', 'title']")
            continue
        errs.extend(check_item_invariants(src_obj["title"], c_obj["title"], lang_code, f"{mid}.title", from_zh_cn=from_zh_cn))
        errs.extend(check_item_invariants(src_obj["note"], c_obj["note"], lang_code, f"{mid}.note", from_zh_cn=from_zh_cn))
    return errs


MEME_STYLE_HINTS: dict[str, str] = {
    "ja": "Use punchy plain-form Japanese (常体/タメ口でキレのあるネットミーム調). Translate short English punchlines cleanly into Japanese.",
    "ko": "Use punchy Korean declarative/meme style (~했다 / ~다 / 명사형 종결). Translate quoted English punchlines naturally into Korean (never leave 'Okay I'm stealing this' untranslated).",
    "es": "Use crisp Spanish dev-meme style: 'fork' (never 'bifurcación'), natural phrasing, and translate quoted English punchlines into Spanish.",
    "fr": "Use sharp French tech-meme satire: 'fork', punchy phrasing, natural French idioms.",
    "de": "Use sharp German tech-meme satire: crisp, ironic, natural German syntax.",
    "pt-BR": "Use punchy Brazilian Portuguese tech-meme style: 'fork', and ALWAYS translate '$1T' / 'trillion' as 'trilhão' / 'trilionário' (NEVER 'bilionário').",
    "vi": "Use punchy Vietnamese meme satire: translate 'Sin N' as 'Tội N' (never keep 'Sin N'), natural dev slang.",
    "it": "Use crisp Italian tech-meme satire ('fork', sharp punchlines).",
    "nl": "Use sharp Dutch tech-meme satire ('fork', dry Dutch wit).",
    "pl": "Use crisp Polish dev-meme satire ('fork', sharp punchlines).",
    "ru": "Use biting Russian IT-meme satire ('форк', sharp concise punchlines).",
    "ar": "Use punchy modern Arabic tech-meme satire ('فورك MIT', sharp crisp phrasing).",
    "tr": "Use sharp Turkish dev-meme satire ('fork', crisp punchlines).",
    "id": "Use witty Indonesian tech-meme style ('fork', natural conversational punchlines).",
    "hi": "Use sharp Hindi tech-meme style ('फ़ोर्क', natural punchlines without untranslated English blocks).",
}


def translate_chunk(
    src_items: dict[str, dict[str, str]],
    lang: dict[str, Any],
    chunk_label: str,
    timeout: int = 240,
) -> dict[str, dict[str, str]]:
    code = lang["code"]
    from_zh_cn = code == "zh-TW"

    if from_zh_cn:
        guidance = (
            "Convert every Simplified Chinese `title` and `note` into authentic, sharp Taiwan/HK Traditional Chinese (信達雅).\n"
            "STRICT zh-TW TERMINOLOGY:\n"
            "- Always use `WeChat` (never `微信`), `迷因` (never `梗圖`/`梗图`), `MIT Fork` (never `MIT 分支`/`MIT 分叉`), `行程`/`處理程序` (never standalone `程序`), `工程師` (never `程序員`), `修補程式` (never `補丁`), `儲存庫` (never `倉庫`), `專案` (for project), `軟體` (never `軟件`), `預設` (never `默認`), `檢舉` (never `舉報`), `瀏覽量` (never `播放量`), `按讚` (never `點讚`).\n"
            "- Replace Mainland slang (`活兒`/`玩意兒`/`搞廢`/`整廢`/`破防`/`好使`/`喜提`/`擦屁股`/`停服`) with natural Taiwan phrasing (`開發工作`/`這東西`/`弄垮`/`失控暴走`/`管用`/`正式畢業`/`救火`/`關停`).\n"
            "- Keep spaces around English/numbers (`MIT Fork 威脅`) and NEVER leave Simplified Chinese chars behind.\n"
            "- Zero AI clichés."
        )
    else:
        extra_hint = MEME_STYLE_HINTS.get(code, "")
        guidance = (
            f"Translate every `title` and `note` from English into faithful, fluent, razor-sharp {lang['englishName']} ({lang['name']}) — 信达雅:\n"
            f"- 信 (Faithful): preserve exact facts, numbers, dates, and references.\n"
            f"- 达 (Fluent): natural {lang['englishName']} word order and idiom; no stiff translationese.\n"
            f"- 雅 (Sharp Satire): write like a witty tech-community meme archive editor — concise, punchy, zero robotic filler or AI hype.\n"
            f"{extra_hint}\n"
            f"Translate ALL readable English prose completely into {lang['englishName']}; never leave whole titles or notes in English!\n"
            f"- For items like `Sin 1 · 歧 · ...` or `The 歧 Seal`, keep the single Chinese sin/seal glyph (e.g. `歧`) and translate the rest.\n"
            f"- For `(中文)` in episode/comic titles, translate it cleanly into {lang['englishName']} (e.g., Chinese edition / 简体中文版 / etc.).\n"
            f"- IMPORTANT: 'receipts' means 'documented evidence/proof' (NEVER store receipts/invoices like fatura/recibo/paragon/чек/biên lai), and 'bought a sprint' means 'triggered/forced a sprint' (NEVER literally purchased)."
        )

    src_json = json.dumps(src_items, ensure_ascii=False, indent=2)
    base_prompt = (
        f"You are translating meme & archive card captions for Temu3 Code ({code}).\n"
        f"{guidance}\n"
        f"STRICT RULES:\n"
        f"1. Output ONLY valid JSON mapping the exact same item IDs to `{{\"title\": \"...\", \"note\": \"...\"}}` (no prose, no markdown fences).\n"
        f"2. Preserve 100% of @handles, `PR #...`, `Issue #...`, commit hashes, file/path names, and brand names "
        f"(T3 Code, T3 Connect, pingdotgg/t3code, PostHog, Axiom, Clerk, USPTO, GDPR, GitHub, Tmail, Temu3 Code, "
        f"Discord, Slack, Telegram, WeChat, NotebookLM, Antigravity, Vibe Kanban, Daytona, OpenAI, Claude).\n"
        f"3. Zero `t.co/` links.\n\n"
        f"INPUT JSON ({chunk_label}):\n{src_json}"
    )

    prompt = base_prompt
    last_errs: list[str] = []
    for attempt in range(1, 5):
        role = "quick" if attempt == 4 else "flash"
        try:
            raw = run_pi(prompt, timeout=timeout, role=role)
            cand = parse_json_output(raw)
            errs = validate_chunk(src_items, cand, code, from_zh_cn)
            if not errs:
                return cand
            last_errs = errs
            prompt = (
                f"{base_prompt}\n\n"
                f"RETRY {attempt} — YOUR PREVIOUS JSON FAILED VALIDATION:\n"
                + "; ".join(errs[:12])
                + "\nFix every error strictly and output ONLY valid JSON."
            )
        except Exception as exc:
            last_errs = [str(exc)]
            prompt = f"{base_prompt}\n\nRETRY {attempt} — ERROR: {exc}\nOutput ONLY valid JSON."
    raise RuntimeError(f"Chunk failed for {code} ({chunk_label}): {'; '.join(last_errs[:8])}")


def build_source_items(memes_items: list[dict[str, Any]], from_zh_cn: bool) -> dict[str, dict[str, str]]:
    out: dict[str, dict[str, str]] = {}
    for it in memes_items:
        if from_zh_cn:
            out[it["id"]] = {"title": it["titleZh"], "note": it["noteZh"]}
        else:
            out[it["id"]] = {"title": it["titleEn"], "note": it["noteEn"]}
    return out


def validate_file(lang: dict[str, Any], memes_items: list[dict[str, Any]]) -> list[str]:
    code = lang["code"]
    p = OUT_DIR / f"{code}.json"
    if not p.is_file():
        return [f"Missing {p.relative_to(ROOT)}"]
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
    except Exception as exc:
        return [f"{p.name}: invalid JSON ({exc})"]
    if not isinstance(data, dict) or set(data.keys()) != {"lang", "items"}:
        return [f"{p.name}: root keys must be ['items', 'lang']"]
    if data.get("lang") != code:
        return [f"{p.name}: lang mismatch ({data.get('lang')!r})"]
    src_items = build_source_items(memes_items, code == "zh-TW")
    return [f"{p.name}: {e}" for e in validate_chunk(src_items, data["items"], code, code == "zh-TW")]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--langs", nargs="*", help="Subset of non-en/non-zh-CN language codes")
    parser.add_argument("--validate-only", action="store_true", help="Validate existing memes-i18n JSONs without calling pi-subagent")
    parser.add_argument("--force", action="store_true", help="Overwrite existing valid files")
    parser.add_argument("--batch-size", type=int, default=25, help="Items per pi-subagent chunk (default: 25)")
    parser.add_argument("-j", "--jobs", type=int, default=12, help="Concurrent pi-subagent workers (default: 12)")
    args = parser.parse_args()

    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    memes_raw = json.loads(MEMES_PATH.read_text(encoding="utf-8"))
    memes_items = memes_raw["items"]

    target_langs = [
        l for l in manifest["languages"]
        if l["code"] not in ("en", "zh-CN") and (not args.langs or l["code"] in args.langs)
    ]
    if not target_langs:
        print("No matching target languages.", file=sys.stderr)
        return 1

    if args.validate_only:
        all_errs: list[str] = []
        for lang in target_langs:
            all_errs.extend(validate_file(lang, memes_items))
        if all_errs:
            print(f"VALIDATION FAILED ({len(all_errs)} errors):", file=sys.stderr)
            for e in all_errs[:50]:
                print(f"  - {e}", file=sys.stderr)
            return 1
        print(f"ALL VALIDATIONS PASSED across {len(target_langs)} memes-i18n files ({len(memes_items)} items each).")
        return 0

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    all_ids = [it["id"] for it in memes_items]

    pending_jobs: list[tuple[dict[str, Any], dict[str, dict[str, str]], dict[str, dict[str, str]], list[list[str]]]] = []
    for lang in target_langs:
        code = lang["code"]
        from_zh_cn = code == "zh-TW"
        src_items = build_source_items(memes_items, from_zh_cn)
        cached_items: dict[str, dict[str, str]] = {}
        out_path = OUT_DIR / f"{code}.json"
        if not args.force and out_path.is_file():
            try:
                old_obj = json.loads(out_path.read_text(encoding="utf-8"))
                old_items = old_obj.get("items") if isinstance(old_obj, dict) else None
                if isinstance(old_items, dict):
                    for mid in all_ids:
                        if mid in old_items and not validate_chunk({mid: src_items[mid]}, {mid: old_items[mid]}, code, from_zh_cn):
                            cached_items[mid] = old_items[mid]
            except Exception:
                cached_items = {}
        missing_ids = [mid for mid in all_ids if mid not in cached_items]
        if not missing_ids and not validate_file(lang, memes_items):
            print(f"  [memes-i18n] {code}: cached ({len(all_ids)} items)", flush=True)
            continue
        id_batches = chunk_list(missing_ids, args.batch_size)
        pending_jobs.append((lang, src_items, cached_items, id_batches))

    if not pending_jobs:
        print("All target memes-i18n files are already valid and cached.")
        return 0

    total_chunks = sum(len(jb[3]) for jb in pending_jobs)
    print(
        f"Translating missing/updated memes across {len(pending_jobs)} language(s) "
        f"({total_chunks} chunk(s), j={args.jobs})...",
        flush=True,
    )

    failures: list[str] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.jobs) as ex:
        fut_map: dict[concurrent.futures.Future[Any], tuple[str, int]] = {}
        chunks_by_lang: dict[str, dict[int, dict[str, dict[str, str]]]] = {}
        remaining_by_lang: dict[str, int] = {}
        src_by_lang: dict[str, dict[str, dict[str, str]]] = {}
        cached_by_lang: dict[str, dict[str, dict[str, str]]] = {}
        batch_count_by_lang: dict[str, int] = {}

        for lang, src_items, cached_items, id_batches in pending_jobs:
            code = lang["code"]
            src_by_lang[code] = src_items
            cached_by_lang[code] = cached_items
            chunks_by_lang[code] = {}
            batch_count_by_lang[code] = len(id_batches)
            remaining_by_lang[code] = len(id_batches)
            for bi, batch_ids in enumerate(id_batches):
                batch_src = {mid: src_items[mid] for mid in batch_ids}
                fut = ex.submit(translate_chunk, batch_src, lang, f"batch {bi + 1}/{len(id_batches)}")
                fut_map[fut] = (code, bi)

        for fut in concurrent.futures.as_completed(fut_map):
            code, bi = fut_map[fut]
            try:
                chunks_by_lang[code][bi] = fut.result()
            except Exception as exc:
                failures.append(f"{code}[{bi}]: {exc}")
                print(f"  [FAIL] {code} batch {bi + 1}: {exc}", file=sys.stderr, flush=True)
            remaining_by_lang[code] -= 1
            if remaining_by_lang[code] == 0:
                if len(chunks_by_lang[code]) != batch_count_by_lang[code]:
                    continue
                merged: dict[str, dict[str, str]] = dict(cached_by_lang[code])
                for idx in range(batch_count_by_lang[code]):
                    merged.update(chunks_by_lang[code][idx])
                ordered = {mid: merged[mid] for mid in all_ids}
                errs = validate_chunk(src_by_lang[code], ordered, code, code == "zh-TW")
                if errs:
                    failures.append(f"{code}: {'; '.join(errs[:5])}")
                    print(f"  [FAIL] {code}: {errs[0]}", file=sys.stderr, flush=True)
                    continue
                out_obj = {"lang": code, "items": ordered}
                (OUT_DIR / f"{code}.json").write_text(
                    json.dumps(out_obj, ensure_ascii=False, indent=2) + "\n",
                    encoding="utf-8",
                )
                reused = len(cached_by_lang[code])
                print(f"  [memes-i18n] {code}: ok ({len(ordered)} items; reused={reused}, translated={len(ordered)-reused})", flush=True)

    if failures:
        print(f"\nCompleted with {len(failures)} failure(s).", file=sys.stderr)
        return 1
    print(f"\nAll {len(pending_jobs)} memes-i18n files written and validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
