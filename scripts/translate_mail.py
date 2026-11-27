#!/usr/bin/env python3
"""Batch-translate Tmail threads, evidence metadata, and new UI i18n keys across
all 17 non-English languages via local `pi-subagent` (DeepSeek V4.1 Flash) with
strict programmatic validation and automatic per-chunk retries.

Outputs:
  - site/data/mail-threads/<lang>.json (17 files: zh-CN, 15 EN-derived, zh-TW from zh-CN)
  - Syncs missing/updated keys into the 16 secondary site/data/i18n/<lang>.json files
"""

from __future__ import annotations

import argparse
import concurrent.futures
import copy
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "content" / "manifest.json"
THREADS_PATH = ROOT / "site" / "mail" / "threads.json"
EVIDENCE_PATH = ROOT / "site" / "data" / "evidence.json"
MAIL_THREADS_DIR = ROOT / "site" / "data" / "mail-threads"
I18N_DIR = ROOT / "site" / "data" / "i18n"

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
)

ZH_SIMPLIFIED_BANNED = (
    "值得注意的是",
    "不仅如此",
    "与此同时",
    "事实上",
    "毫无疑问",
    "引发广泛关注",
    "形成鲜明对比",
    "令人震惊",
    "公然",
    "赤裸裸",
    "彰显",
    "赋能",
    "闭环",
    "痛点",
    "抓手",
    "重磅",
    "官宣",
    "毋庸置疑",
    "显而易见",
    "不容忽视",
    "众所周知",
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
)

SCRIPT_RE_BY_LANG: dict[str, re.Pattern[str]] = {
    "zh-CN": re.compile(r"[\u4e00-\u9fff]"),
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
LONG_ID_RE = re.compile(r"\b\d{10,20}\b")
INLINE_CODE_RE = re.compile(r"`([^`\n]+)`")
FILE_PATH_RE = re.compile(
    r"(?:~/[^\s`\"')，。；！？、]+|"
    r"\b[A-Za-z0-9_.-]+\.(?:ts|tsx|js|jsx|json|md|td|sqlite|py|sh|css|html|png|jpg)"
    r"(?::\d+(?:-\d+)?|#L\d+(?:-L\d+)?)?)"
)
PLACEHOLDER_RE = re.compile(r"\{[A-Za-z0-9_]+\}")
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


SLUG_RE = re.compile(r"\b[A-Za-z0-9_]+(?:-[A-Za-z0-9_]+){2,}\b")


def strip_non_prose(text: str) -> str:
    """Remove code, handles, URLs, PRs, hashes, filenames, slugs, and brand names before prose checks."""
    s = INLINE_CODE_RE.sub(" ", text)
    s = URL_RE.sub(" ", s)
    s = HANDLE_RE.sub(" ", s)
    s = PR_ISSUE_RE.sub(" ", s)
    s = FILE_PATH_RE.sub(" ", s)
    s = SLUG_RE.sub(" ", s)
    s = HASH_RE.sub(" ", s)
    s = LONG_ID_RE.sub(" ", s)
    for brand in BRAND_NAMES:
        s = s.replace(brand, " ")
    return s


def extract_invariants(text: str) -> dict[str, list[str]]:
    """Collect invariant tokens from source text that must survive translation verbatim."""
    raw_files = FILE_PATH_RE.findall(text)
    clean_files = [
        f[4:] if f.startswith("Pre-") else f
        for f in raw_files
    ]
    return {
        "handles": list(dict.fromkeys(HANDLE_RE.findall(text))),
        "prs": list(dict.fromkeys(re.sub(r"\s+", " ", m) for m in PR_ISSUE_RE.findall(text))),
        "hashes": list(dict.fromkeys(HASH_RE.findall(text))),
        "long_ids": list(dict.fromkeys(LONG_ID_RE.findall(text))),
        "codes": list(dict.fromkeys(INLINE_CODE_RE.findall(text))),
        "files": list(dict.fromkeys(clean_files)),
        "brands": [b for b in BRAND_NAMES if b in text],
    }


def classify_line(line: str) -> str:
    stripped = line.lstrip()
    if stripped.startswith(">"):
        return "q"
    if re.match(r"^[-•*]\s+", stripped):
        return "ul"
    if re.match(r"^\d+\.\s+", stripped):
        return "ol"
    return "p"


def body_block_signature(text: str) -> list[tuple[Any, ...]]:
    """Return structural signature of blank-line separated markdown blocks."""
    raw = text.strip()
    if not raw:
        return []
    sig: list[tuple[Any, ...]] = []
    for block in re.split(r"\n\s*\n", raw):
        lines = [ln for ln in block.splitlines() if ln.strip()]
        if not lines:
            continue
        kinds = [classify_line(ln) for ln in lines]
        if all(k == "q" for k in kinds):
            sig.append(("quote",))
        elif all(k == "ul" for k in kinds):
            sig.append(("ul", len(lines)))
        elif all(k == "ol" for k in kinds):
            sig.append(("ol", len(lines)))
        elif all(k == "p" for k in kinds):
            sig.append(("para",))
        else:
            sig.append(("mixed", tuple(kinds)))
    return sig


def check_text_invariants(
    src: str,
    cand: Any,
    lang_code: str,
    field_label: str,
    *,
    is_body: bool = False,
    min_prose_words: int = 5,
    check_translation: bool = True,
) -> list[str]:
    """Validate a translated string against its source string."""
    errs: list[str] = []
    if not isinstance(cand, str) or not cand.strip():
        return [f"{field_label}: must be a non-empty string"]
    if "t.co/" in cand.lower():
        errs.append(f"{field_label}: contains forbidden t.co/ link")

    if lang_code == "zh-CN":
        for bad in ZH_SIMPLIFIED_BANNED:
            if bad in cand:
                errs.append(f"{field_label}: contains AI cliché '{bad}'")
    elif lang_code == "zh-TW":
        for bad in ZH_TRADITIONAL_BANNED:
            if bad in cand:
                errs.append(f"{field_label}: contains AI cliché '{bad}'")

    inv = extract_invariants(src)
    for h in inv["handles"]:
        if h not in cand:
            errs.append(f"{field_label}: missing handle '{h}'")
    for pr in inv["prs"]:
        kind, num = pr.split("#", 1)
        kind_clean = kind.strip().lower()
        num_tok = f"#{num}"
        if pr not in cand and pr.replace(" ", "") not in cand:
            if not (num_tok in cand and kind_clean in cand.lower()):
                errs.append(f"{field_label}: missing PR/Issue '{pr}'")
    for hs in inv["hashes"]:
        if hs not in cand:
            errs.append(f"{field_label}: missing hash '{hs}'")
    for lid in inv["long_ids"]:
        if lid not in cand:
            errs.append(f"{field_label}: missing ID '{lid}'")
    for code in inv["codes"]:
        if f"`{code}`" not in cand:
            errs.append(f"{field_label}: missing inline code '`{code}`'")
    for fp in inv["files"]:
        if fp not in cand:
            errs.append(f"{field_label}: missing file/path '{fp}'")
    for brand in inv["brands"]:
        if brand not in cand:
            errs.append(f"{field_label}: missing brand '{brand}'")

    if is_body:
        src_sig = body_block_signature(src)
        cand_sig = body_block_signature(cand)
        if src_sig != cand_sig:
            errs.append(f"{field_label}: block structure mismatch (expected {src_sig}, got {cand_sig})")

    if check_translation:
        prose_words = ALPHA_WORD_RE.findall(strip_non_prose(src))
        if len(prose_words) >= min_prose_words:
            if cand.strip() == src.strip():
                errs.append(f"{field_label}: left untranslated verbatim from source")
            script_re = SCRIPT_RE_BY_LANG.get(lang_code)
            if script_re and not script_re.search(cand):
                errs.append(f"{field_label}: missing target script characters for {lang_code}")

        if is_body and not errs:
            src_blocks = [b for b in re.split(r"\n\s*\n", src.strip()) if b.strip()]
            cand_blocks = [b for b in re.split(r"\n\s*\n", cand.strip()) if b.strip()]
            for bi, (sb, cb) in enumerate(zip(src_blocks, cand_blocks)):
                sb_clean = re.sub(r"^(?:>\s*|[-•*]\s+|\d+\.\s+)", "", sb, flags=re.M)
                blk_words = ALPHA_WORD_RE.findall(strip_non_prose(sb_clean))
                if len(blk_words) >= 6:
                    if cb.strip() == sb.strip():
                        errs.append(f"{field_label}[block {bi}]: block left untranslated in English")
                    script_re = SCRIPT_RE_BY_LANG.get(lang_code)
                    if script_re and not script_re.search(cb):
                        errs.append(f"{field_label}[block {bi}]: missing target script in block")
    return errs


def build_lang_guidance(lang: dict[str, Any], from_zh_cn: bool) -> str:
    code = lang["code"]
    if from_zh_cn:
        return (
            "Convert every Simplified Chinese string value into natural Traditional Chinese "
            "(Taiwan/Hong Kong editorial usage: e.g. 程式碼/檔案/伺服器/使用者/預設/雜湊/連結/帳號/封鎖).\n"
            "Keep any verbatim Simplified Chinese quote inside quotation marks when explicitly quoting "
            "@theo's pasted Chinese sentence (e.g. 「完了，又伤害中国人民的感情了。」), and keep all short "
            "quoted English catchphrases (like \"Temu3 Code\", \"Chinese knockoff\") intact."
        )
    if code == "zh-CN":
        return (
            "Translate all English strings into crisp, sharp, conversational-journalistic Simplified Chinese "
            "(like a real tech editor summarizing solid receipts — match cases/zh-CN style).\n"
            "ANTI-AI RULE (CRITICAL): NEVER use AI tropes such as: 值得注意的是, 不仅如此, 与此同时, "
            "事实上, 毫无疑问, 引发广泛关注, 形成鲜明对比, 令人震惊, 公然, 赤裸裸, 彰显, 赋能, 闭环, 痛点, 抓手, 重磅, 官宣.\n"
            "Translate EVERYTHING readable including `> ` blockquotes! For short key English catchphrases that "
            "are the subject of dispute (\"Temu3 Code\", \"Chinese knockoff\", \"Steal our code (legally)\"), "
            "translate naturally and keep the short phrase in quotes alongside if helpful — NEVER dump whole "
            "untranslated English sentences or paragraphs."
        )
    return (
        f"Translate all English strings into natural, direct, sharp journalistic {lang['englishName']} ({lang['name']}).\n"
        f"Write like a human tech journalist summarizing verified public records — NO robotic filler, NO AI hype.\n"
        f"Translate EVERYTHING readable, INCLUDING every `> ` blockquote tweet/post, into idiomatic {lang['englishName']} "
        f"so readers never hit a wall of untranslated English! Only keep short dispute catchphrases in quotes "
        f"alongside your translation when helpful (e.g. \"Temu3 Code\", \"Chinese knockoff\")."
    )


def translate_json_chunk(
    payload: Any,
    lang: dict[str, Any],
    from_zh_cn: bool,
    task_desc: str,
    validator: Any,
    extra_rules: str = "",
    timeout: int = 240,
) -> Any:
    """Translate a JSON payload with validation and automated retry feedback."""
    lang_guidance = build_lang_guidance(lang, from_zh_cn)
    src_json = json.dumps(payload, ensure_ascii=False, indent=2)
    base_prompt = (
        f"You are translating {task_desc} for an independent public-record software audit (Temu3 Code / Tmail).\n"
        f"{lang_guidance}\n"
        f"STRICT STRUCTURAL & FACTUAL RULES:\n"
        f"1. Output ONLY valid JSON matching the exact input object keys, IDs, and array lengths (no prose, no markdown fences).\n"
        f"2. Preserve 100% of @handles, PR/Issue numbers in exact ASCII (`PR #...`, `Issue #...`), commit hashes (`ca81b7b9`, `3bdaa6e1`, etc.), "
        f"file/path names, inline `` `code` `` spans (keep backticks!), and brand names "
        f"(T3 Code, T3 Connect, pingdotgg/t3code, PostHog, Axiom, Clerk, USPTO, GDPR, GitHub, Tmail, Temu3 Code).\n"
        f"3. Preserve exact ASCII digits for IDs, hashes, PR/Issue numbers, and technical metrics.\n"
        f"4. Zero `t.co/` links.\n"
        f"{extra_rules}"
        f"\nINPUT JSON:\n{src_json}"
    )

    prompt = base_prompt
    last_errs: list[str] = []
    for attempt in range(1, 5):
        role = "quick" if attempt == 4 else "flash"
        try:
            raw = run_pi(prompt, timeout=timeout, role=role)
            cand = parse_json_output(raw)
            errs = validator(cand)
            if not errs:
                return cand
            last_errs = errs
            feedback = "; ".join(errs[:12])
            prompt = (
                f"{base_prompt}\n\n"
                f"RETRY {attempt} — YOUR PREVIOUS JSON FAILED VALIDATION:\n{feedback}\n"
                f"IMPORTANT: Do NOT leave any paragraph, blockquote (`> `), subject, or snippet in untranslated English — "
                f"even when quoting harsh language or insults verbatim, translate them accurately into the target language.\n"
                f"Fix EVERY error above strictly and output ONLY the corrected complete JSON object."
            )
        except Exception as exc:
            last_errs = [str(exc)]
            prompt = (
                f"{base_prompt}\n\n"
                f"RETRY {attempt} — PREVIOUS OUTPUT ERROR: {exc}\n"
                f"Output ONLY strictly valid JSON."
            )
    raise RuntimeError(f"Chunk failed for {lang['code']} ({task_desc}): {'; '.join(last_errs[:8])}")


def validate_topics_people(
    src_topics: dict[str, str],
    src_people: dict[str, dict[str, str]],
    cand: Any,
    lang_code: str,
    check_translation: bool,
) -> list[str]:
    if not isinstance(cand, dict):
        return ["root must be JSON object"]
    errs: list[str] = []
    if set(cand.keys()) != {"topics", "people"}:
        return [f"root keys mismatch: expected ['people', 'topics'], got {sorted(cand.keys())}"]
    ctopics = cand["topics"]
    cpeople = cand["people"]
    if not isinstance(ctopics, dict) or set(ctopics.keys()) != set(src_topics.keys()):
        errs.append(f"topics keys mismatch: expected {sorted(src_topics.keys())}")
    else:
        for tid, s_val in src_topics.items():
            errs.extend(
                check_text_invariants(
                    s_val, ctopics[tid], lang_code, f"topics.{tid}",
                    min_prose_words=2, check_translation=check_translation,
                )
            )
    if not isinstance(cpeople, dict) or set(cpeople.keys()) != set(src_people.keys()):
        errs.append(f"people keys mismatch: expected {sorted(src_people.keys())}")
    else:
        for pid, p_obj in src_people.items():
            cp = cpeople[pid]
            if not isinstance(cp, dict) or set(cp.keys()) != {"name", "role"}:
                errs.append(f"people.{pid}: must have exact keys ['name', 'role']")
                continue
            errs.extend(
                check_text_invariants(
                    p_obj["name"], cp["name"], lang_code, f"people.{pid}.name",
                    min_prose_words=4, check_translation=check_translation,
                )
            )
            errs.extend(
                check_text_invariants(
                    p_obj["role"], cp["role"], lang_code, f"people.{pid}.role",
                    min_prose_words=3, check_translation=check_translation,
                )
            )
    return errs


def validate_threads_chunk(
    src_threads: dict[str, dict[str, Any]],
    cand: Any,
    lang_code: str,
    check_translation: bool,
) -> list[str]:
    if not isinstance(cand, dict):
        return ["threads chunk must be JSON object"]
    if set(cand.keys()) != set(src_threads.keys()):
        missing = sorted(set(src_threads.keys()) - set(cand.keys()))
        extra = sorted(set(cand.keys()) - set(src_threads.keys()))
        return [f"thread IDs mismatch: missing={missing[:5]}, extra={extra[:5]}"]

    errs: list[str] = []
    expected_th_keys = {"from", "to", "dateDisplay", "subject", "snippet", "messages"}
    expected_msg_keys = {"sender", "handle", "to", "time", "body", "attachments", "links"}

    for tid, sth in src_threads.items():
        cth = cand[tid]
        if not isinstance(cth, dict) or set(cth.keys()) != expected_th_keys:
            errs.append(f"threads.{tid}: keys must be {sorted(expected_th_keys)}")
            continue
        for fld, min_w in (("from", 4), ("to", 4), ("dateDisplay", 99), ("subject", 3), ("snippet", 4)):
            errs.extend(
                check_text_invariants(
                    sth[fld], cth[fld], lang_code, f"threads.{tid}.{fld}",
                    min_prose_words=min_w, check_translation=check_translation,
                )
            )
        s_msgs = sth["messages"]
        c_msgs = cth["messages"]
        if not isinstance(c_msgs, list) or len(c_msgs) != len(s_msgs):
            errs.append(f"threads.{tid}.messages: length mismatch (expected {len(s_msgs)})")
            continue
        for mi, (sm, cm) in enumerate(zip(s_msgs, c_msgs)):
            pfx = f"threads.{tid}.messages[{mi}]"
            if not isinstance(cm, dict) or set(cm.keys()) != expected_msg_keys:
                errs.append(f"{pfx}: keys must be {sorted(expected_msg_keys)}")
                continue
            for mfld, min_w in (("sender", 6), ("handle", 5), ("to", 5), ("time", 99)):
                errs.extend(
                    check_text_invariants(
                        sm[mfld], cm[mfld], lang_code, f"{pfx}.{mfld}",
                        min_prose_words=min_w, check_translation=check_translation,
                    )
                )
            errs.extend(
                check_text_invariants(
                    sm["body"], cm["body"], lang_code, f"{pfx}.body",
                    is_body=True, min_prose_words=5, check_translation=check_translation,
                )
            )
            for arr_fld in ("attachments", "links"):
                s_arr = sm[arr_fld]
                c_arr = cm[arr_fld]
                if not isinstance(c_arr, list) or len(c_arr) != len(s_arr):
                    errs.append(f"{pfx}.{arr_fld}: expected length {len(s_arr)}")
                    continue
                for ai, (sa, ca) in enumerate(zip(s_arr, c_arr)):
                    errs.extend(
                        check_text_invariants(
                            sa, ca, lang_code, f"{pfx}.{arr_fld}[{ai}]",
                            min_prose_words=4, check_translation=check_translation,
                        )
                    )
    return errs


def validate_evidence_chunk(
    src_ev: dict[str, dict[str, str]],
    cand: Any,
    lang_code: str,
    check_translation: bool,
) -> list[str]:
    if not isinstance(cand, dict):
        return ["evidence chunk must be JSON object"]
    if set(cand.keys()) != set(src_ev.keys()):
        missing = sorted(set(src_ev.keys()) - set(cand.keys()))
        extra = sorted(set(cand.keys()) - set(src_ev.keys()))
        return [f"evidence IDs mismatch: missing={missing[:5]}, extra={extra[:5]}"]
    errs: list[str] = []
    for eid, sev in src_ev.items():
        cev = cand[eid]
        if not isinstance(cev, dict) or set(cev.keys()) != {"title", "caption"}:
            errs.append(f"evidence.{eid}: must have exact keys ['caption', 'title']")
            continue
        errs.extend(
            check_text_invariants(
                sev["title"], cev["title"], lang_code, f"evidence.{eid}.title",
                min_prose_words=4, check_translation=check_translation,
            )
        )
        errs.extend(
            check_text_invariants(
                sev["caption"], cev["caption"], lang_code, f"evidence.{eid}.caption",
                min_prose_words=4, check_translation=check_translation,
            )
        )
    return errs


def build_canonical_bundle(
    threads_raw: dict[str, Any],
    evidence_raw: list[dict[str, Any]],
    limit_threads: int | None = None,
) -> dict[str, Any]:
    """Extract canonical translatable English bundle matching mail-threads schema."""
    topics = {tp["id"]: tp["label"] for tp in threads_raw["topics"]}
    people = {p["id"]: {"name": p["name"], "role": p["role"]} for p in threads_raw["people"]}
    threads_list = threads_raw["threads"][:limit_threads] if limit_threads else threads_raw["threads"]
    threads: dict[str, Any] = {}
    zh_hints: dict[str, dict[str, str]] = {}
    for th in threads_list:
        threads[th["id"]] = {
            "from": th["from"],
            "to": th["to"],
            "dateDisplay": th["dateDisplay"],
            "subject": th["subject"],
            "snippet": th["snippet"],
            "messages": [
                {
                    "sender": m["sender"],
                    "handle": m["handle"],
                    "to": m["to"],
                    "time": m["time"],
                    "body": m["body"],
                    "attachments": [a["title"] for a in m.get("attachments", [])],
                    "links": [lk["label"] for lk in m.get("links", [])],
                }
                for m in th["messages"]
            ],
        }
        zh_hints[th["id"]] = {
            "subjectZh": th.get("subjectZh", ""),
            "snippetZh": th.get("snippetZh", ""),
        }
    evidence = {
        ev["id"]: {"title": ev["title"], "caption": ev["caption"]}
        for ev in (evidence_raw[:limit_threads * 3] if limit_threads else evidence_raw)
    }
    return {
        "topics": topics,
        "people": people,
        "threads": threads,
        "evidence": evidence,
        "_zh_hints": zh_hints,
    }


def validate_full_bundle(
    bundle: Any,
    canonical: dict[str, Any],
    lang_code: str,
    check_translation: bool = True,
) -> list[str]:
    """Run complete structural and invariant validation on a language mail-threads bundle."""
    if not isinstance(bundle, dict):
        return ["Bundle root is not a JSON object"]
    expected_top = {"lang", "topics", "people", "threads", "evidence"}
    if set(bundle.keys()) != expected_top:
        return [f"Top-level keys mismatch: expected {sorted(expected_top)}, got {sorted(bundle.keys())}"]
    if bundle.get("lang") != lang_code:
        return [f"lang field mismatch: expected '{lang_code}', got '{bundle.get('lang')}'"]

    errs: list[str] = []
    errs.extend(
        validate_topics_people(
            canonical["topics"], canonical["people"],
            {"topics": bundle["topics"], "people": bundle["people"]},
            lang_code, check_translation,
        )
    )
    errs.extend(validate_threads_chunk(canonical["threads"], bundle["threads"], lang_code, check_translation))
    errs.extend(validate_evidence_chunk(canonical["evidence"], bundle["evidence"], lang_code, check_translation))
    return errs


def submit_language_chunks(
    ex: concurrent.futures.ThreadPoolExecutor,
    lang: dict[str, Any],
    canonical: dict[str, Any],
    zh_cn_bundle: dict[str, Any] | None,
    zh_cn_i18n: dict[str, Any],
) -> dict[str, Any]:
    """Submit all chunk translation futures for one language into a shared executor."""
    code = lang["code"]
    from_zh_cn = code == "zh-TW"
    if from_zh_cn:
        if zh_cn_bundle is None:
            raise RuntimeError("zh-TW requires site/data/mail-threads/zh-CN.json to exist first")
        src_topics = zh_cn_bundle["topics"]
        src_people = zh_cn_bundle["people"]
        src_threads = zh_cn_bundle["threads"]
        src_evidence = zh_cn_bundle["evidence"]
        check_trans = False
    else:
        src_topics = canonical["topics"]
        src_people = canonical["people"]
        src_threads = canonical["threads"]
        src_evidence = canonical["evidence"]
        check_trans = True

    tp_payload = {"topics": src_topics, "people": src_people}
    tp_extra = ""
    if code == "zh-CN" and zh_cn_i18n.get("mail", {}).get("topics"):
        tp_extra = (
            "Align topic labels cleanly with site/data/i18n/zh-CN.json mail.topics:\n"
            + json.dumps(zh_cn_i18n["mail"]["topics"], ensure_ascii=False)
            + "\n"
        )

    thread_ids = list(src_threads.keys())
    thread_batches = chunk_list(thread_ids, 6)
    ev_ids = list(src_evidence.keys())
    ev_batches = chunk_list(ev_ids, 37)

    futures: list[tuple[concurrent.futures.Future[Any], str, int]] = []
    futures.append(
        (
            ex.submit(
                translate_json_chunk,
                tp_payload,
                lang,
                from_zh_cn,
                "topics and people directory",
                lambda c: validate_topics_people(src_topics, src_people, c, code, check_trans),
                tp_extra,
            ),
            "tp",
            0,
        )
    )

    for bi, batch_ids in enumerate(thread_batches):
        batch_src = {tid: src_threads[tid] for tid in batch_ids}
        prompt_payload = copy.deepcopy(batch_src)
        extra = (
            "5. In every `messages[].body`, preserve the EXACT block structure separated by blank lines (`\\n\\n`), "
            "keeping every `> ` blockquote line, `- ` unordered bullet line, and `1. ` ordered list line in exact order.\n"
            "6. Every `attachments` and `links` array in a message MUST be a JSON array of strings of the EXACT same length as input.\n"
        )
        if code == "zh-CN":
            hints = {tid: canonical["_zh_hints"][tid] for tid in batch_ids}
            extra += (
                "7. You may use these existing subjectZh/snippetZh hints where sharp and free of AI clichés, "
                "fixing any awkwardness (do NOT include these hint keys in your output JSON):\n"
                + json.dumps(hints, ensure_ascii=False)
                + "\n"
            )
        futures.append(
            (
                ex.submit(
                    translate_json_chunk,
                    prompt_payload,
                    lang,
                    from_zh_cn,
                    f"mail threads batch {bi + 1}/{len(thread_batches)}",
                    lambda c, bs=batch_src: validate_threads_chunk(bs, c, code, check_trans),
                    extra,
                ),
                "th",
                bi,
            )
        )

    for bi, batch_ids in enumerate(ev_batches):
        batch_src = {eid: src_evidence[eid] for eid in batch_ids}
        futures.append(
            (
                ex.submit(
                    translate_json_chunk,
                    batch_src,
                    lang,
                    from_zh_cn,
                    f"evidence captions batch {bi + 1}/{len(ev_batches)}",
                    lambda c, bs=batch_src: validate_evidence_chunk(bs, c, code, check_trans),
                ),
                "ev",
                bi,
            )
        )

    return {
        "code": code,
        "thread_ids": thread_ids,
        "thread_batches": len(thread_batches),
        "ev_ids": ev_ids,
        "ev_batches": len(ev_batches),
        "check_trans": check_trans,
        "futures": futures,
    }


def finalize_language_job(
    job: dict[str, Any],
    canonical: dict[str, Any],
    dry_run: bool,
) -> tuple[str, str, dict[str, Any]]:
    """Collect finished chunk futures for one language, validate, and write JSON."""
    code = job["code"]
    tp_res: dict[str, Any] = {}
    th_parts: dict[int, dict[str, Any]] = {}
    ev_parts: dict[int, dict[str, Any]] = {}

    for fut, kind, idx in job["futures"]:
        res = fut.result()
        if kind == "tp":
            tp_res = res
        elif kind == "th":
            th_parts[idx] = res
        else:
            ev_parts[idx] = res

    merged_threads: dict[str, Any] = {}
    for bi in range(job["thread_batches"]):
        merged_threads.update(th_parts[bi])

    merged_evidence: dict[str, Any] = {}
    for bi in range(job["ev_batches"]):
        merged_evidence.update(ev_parts[bi])

    bundle = {
        "lang": code,
        "topics": tp_res["topics"],
        "people": tp_res["people"],
        "threads": {tid: merged_threads[tid] for tid in job["thread_ids"]},
        "evidence": {eid: merged_evidence[eid] for eid in job["ev_ids"]},
    }

    full_errs = validate_full_bundle(bundle, canonical, code, check_translation=job["check_trans"])
    if full_errs:
        raise RuntimeError(f"Final bundle validation failed for {code}: {'; '.join(full_errs[:10])}")

    if not dry_run:
        MAIL_THREADS_DIR.mkdir(parents=True, exist_ok=True)
        out_path = MAIL_THREADS_DIR / f"{code}.json"
        out_path.write_text(json.dumps(bundle, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return code, "ok", bundle


def run_mail_batch(
    langs: list[dict[str, Any]],
    canonical: dict[str, Any],
    zh_cn_bundle: dict[str, Any] | None,
    zh_cn_i18n: dict[str, Any],
    *,
    jobs: int,
    force: bool,
    dry_run: bool,
) -> tuple[dict[str, dict[str, Any]], list[str]]:
    """Translate a list of languages concurrently using one shared chunk worker pool."""
    results: dict[str, dict[str, Any]] = {}
    failures: list[str] = []
    pending_jobs: list[dict[str, Any]] = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=jobs) as ex:
        for lang in langs:
            code = lang["code"]
            out_path = MAIL_THREADS_DIR / f"{code}.json"
            if out_path.exists() and not force and not dry_run:
                existing = json.loads(out_path.read_text(encoding="utf-8"))
                if not validate_full_bundle(existing, canonical, code, check_translation=(code != "zh-TW")):
                    results[code] = existing
                    print(f"  [mail] {code}: cached", flush=True)
                    continue
            pending_jobs.append(submit_language_chunks(ex, lang, canonical, zh_cn_bundle, zh_cn_i18n))

        fut_to_code: dict[concurrent.futures.Future[Any], str] = {}
        remaining_by_code: dict[str, int] = {}
        job_by_code: dict[str, dict[str, Any]] = {}
        for job in pending_jobs:
            c = job["code"]
            job_by_code[c] = job
            remaining_by_code[c] = len(job["futures"])
            for fut, _, _ in job["futures"]:
                fut_to_code[fut] = c

        for fut in concurrent.futures.as_completed(fut_to_code):
            c = fut_to_code[fut]
            remaining_by_code[c] -= 1
            if remaining_by_code[c] == 0:
                try:
                    code, st, bundle = finalize_language_job(job_by_code[c], canonical, dry_run)
                    results[code] = bundle
                    print(f"  [mail] {code}: {st}", flush=True)
                except Exception as exc:
                    failures.append(f"{c}: {exc}")
                    print(f"  [FAIL] {c}: {exc}", file=sys.stderr, flush=True)
    return results, failures


def flatten_dict(obj: dict[str, Any], prefix: str = "") -> dict[str, str]:
    out: dict[str, str] = {}
    for k, v in obj.items():
        path = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            out.update(flatten_dict(v, path))
        else:
            out[path] = str(v)
    return out


def rebuild_like_template(template: dict[str, Any], flat_values: dict[str, str], prefix: str = "") -> dict[str, Any]:
    out: dict[str, Any] = {}
    for k, v in template.items():
        path = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            out[k] = rebuild_like_template(v, flat_values, path)
        else:
            out[k] = flat_values[path]
    return out


def sync_single_i18n_file(
    lang: dict[str, Any],
    en_obj: dict[str, Any],
    zh_cn_obj: dict[str, Any],
    update_keys: set[str],
    dry_run: bool,
) -> tuple[str, str]:
    """Sync missing or explicitly updated UI keys into a secondary site/data/i18n/<lang>.json."""
    code = lang["code"]
    target_path = I18N_DIR / f"{code}.json"
    if not target_path.is_file():
        raise FileNotFoundError(f"Missing {target_path}")

    from_zh_cn = code == "zh-TW"
    ref_obj = zh_cn_obj if from_zh_cn else en_obj
    ref_flat = flatten_dict(ref_obj)

    cur_obj = json.loads(target_path.read_text(encoding="utf-8"))
    cur_flat = flatten_dict(cur_obj)

    needed_paths = [
        k for k in ref_flat
        if (k not in cur_flat and bool(str(ref_flat[k]).strip()))
        or k in update_keys
        or (bool(str(ref_flat[k]).strip()) and not str(cur_flat.get(k, "")).strip())
    ]
    for k in ref_flat:
        if k not in cur_flat and not str(ref_flat[k]).strip():
            cur_flat[k] = ""
    # Keep metadata keys aligned directly without LLM
    for meta_key in ("code", "name", "dir"):
        if meta_key in needed_paths:
            needed_paths.remove(meta_key)
    cur_flat["code"] = code
    cur_flat["name"] = lang["name"]
    cur_flat["dir"] = lang["dir"]

    removed_paths = [k for k in cur_flat if k not in ref_flat]

    if needed_paths:
        src_subset = {k: ref_flat[k] for k in needed_paths}

        def validate_ui_subset(cand: Any) -> list[str]:
            if not isinstance(cand, dict) or set(cand.keys()) != set(src_subset.keys()):
                return [f"keys mismatch: expected {sorted(src_subset.keys())}"]
            errs: list[str] = []
            for k, sv in src_subset.items():
                cv = cand[k]
                if not isinstance(cv, str) or not cv.strip():
                    errs.append(f"{k}: empty string")
                    continue
                for ph in PLACEHOLDER_RE.findall(sv):
                    if ph not in cv:
                        errs.append(f"{k}: missing placeholder {ph}")
                errs.extend(
                    check_text_invariants(
                        sv, cv, code, k, min_prose_words=4, check_translation=(not from_zh_cn),
                    )
                )
            return errs

        translated = translate_json_chunk(
            src_subset,
            lang,
            from_zh_cn,
            "UI i18n dictionary keys",
            validate_ui_subset,
            "5. Preserve placeholders like `{a}`, `{b}`, `{n}`, `{i}` and HTML tags like `<br />` verbatim.\n",
        )
        cur_flat.update(translated)

    final_obj = rebuild_like_template(ref_obj, cur_flat)
    if not dry_run and (needed_paths or removed_paths or json.dumps(cur_obj) != json.dumps(final_obj)):
        target_path.write_text(json.dumps(final_obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    status = f"updated({len(needed_paths)} keys)" if needed_paths or removed_paths else "in-sync"
    return code, status


def validate_existing_outputs(
    manifest: dict[str, Any],
    canonical: dict[str, Any],
    target_langs: list[dict[str, Any]],
) -> int:
    """Validate existing mail-threads/*.json and site/data/i18n/*.json strictly."""
    errors: list[str] = []
    en_flat = flatten_dict(json.loads((I18N_DIR / "en.json").read_text(encoding="utf-8")))

    for lang in target_langs:
        code = lang["code"]
        mt_path = MAIL_THREADS_DIR / f"{code}.json"
        if not mt_path.is_file():
            errors.append(f"Missing {mt_path.relative_to(ROOT)}")
        else:
            try:
                bundle = json.loads(mt_path.read_text(encoding="utf-8"))
                errs = validate_full_bundle(bundle, canonical, code, check_translation=True)
                for e in errs:
                    errors.append(f"{mt_path.name}: {e}")
            except Exception as exc:
                errors.append(f"{mt_path.name}: invalid JSON ({exc})")

        if code != "zh-CN":
            i18n_path = I18N_DIR / f"{code}.json"
            if not i18n_path.is_file():
                errors.append(f"Missing {i18n_path.relative_to(ROOT)}")
            else:
                try:
                    i_obj = json.loads(i18n_path.read_text(encoding="utf-8"))
                    i_flat = flatten_dict(i_obj)
                    missing = sorted(set(en_flat.keys()) - set(i_flat.keys()))
                    extra = sorted(set(i_flat.keys()) - set(en_flat.keys()))
                    if missing:
                        errors.append(f"i18n/{code}.json: missing keys {missing[:5]}")
                    if extra:
                        errors.append(f"i18n/{code}.json: extra keys {extra[:5]}")
                except Exception as exc:
                    errors.append(f"i18n/{code}.json: invalid JSON ({exc})")

    if errors:
        print(f"VALIDATION FAILED ({len(errors)} errors):", file=sys.stderr)
        for err in errors[:50]:
            print(f"  - {err}", file=sys.stderr)
        return 1
    print(f"ALL VALIDATIONS PASSED across {len(target_langs)} mail-threads bundles and i18n files.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--langs", nargs="*", help="Subset of non-English language codes")
    parser.add_argument("--only-mail", action="store_true", help="Only translate site/data/mail-threads/<lang>.json")
    parser.add_argument("--only-i18n", action="store_true", help="Only sync site/data/i18n/<lang>.json")
    parser.add_argument("--update-i18n-keys", nargs="*", default=[], help="Force re-translation of specific dotted i18n keys")
    parser.add_argument("--validate-only", action="store_true", help="Validate existing outputs without calling pi-subagent")
    parser.add_argument("--force", action="store_true", help="Overwrite existing mail-threads/<lang>.json files")
    parser.add_argument("--dry-run", action="store_true", help="Run translation & validation without writing files")
    parser.add_argument("--limit-threads", type=int, help="Limit thread count (for dry-run testing)")
    parser.add_argument("-j", "--jobs", type=int, default=8, help="Concurrent pi-subagent workers (default: 8)")
    args = parser.parse_args()

    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    threads_raw = json.loads(THREADS_PATH.read_text(encoding="utf-8"))
    evidence_raw = json.loads(EVIDENCE_PATH.read_text(encoding="utf-8"))
    canonical = build_canonical_bundle(threads_raw, evidence_raw, limit_threads=args.limit_threads)

    all_non_en = [l for l in manifest["languages"] if l["code"] != "en"]
    target_langs = [l for l in all_non_en if not args.langs or l["code"] in args.langs]
    if not target_langs:
        print("No matching target languages.", file=sys.stderr)
        return 1

    if args.validate_only:
        return validate_existing_outputs(manifest, canonical, target_langs)

    zh_cn_i18n = json.loads((I18N_DIR / "zh-CN.json").read_text(encoding="utf-8"))
    en_i18n = json.loads((I18N_DIR / "en.json").read_text(encoding="utf-8"))

    if not args.only_i18n:
        # Phase 1: zh-CN and the 15 EN-derived languages (skip zh-TW until zh-CN is ready)
        phase1_langs = [l for l in target_langs if l["code"] != "zh-TW"]
        zh_cn_bundle: dict[str, Any] | None = None
        if (MAIL_THREADS_DIR / "zh-CN.json").is_file():
            zh_cn_bundle = json.loads((MAIL_THREADS_DIR / "zh-CN.json").read_text(encoding="utf-8"))

        failures: list[str] = []
        if phase1_langs:
            print(
                f"Translating mail-threads ({len(canonical['threads'])} threads, {len(canonical['evidence'])} evidence) "
                f"for {len(phase1_langs)} language(s) [j={args.jobs} shared chunk pool]...",
                flush=True,
            )
            p1_results, p1_failures = run_mail_batch(
                phase1_langs,
                canonical,
                None,
                zh_cn_i18n,
                jobs=args.jobs,
                force=args.force,
                dry_run=args.dry_run,
            )
            failures.extend(p1_failures)
            if "zh-CN" in p1_results:
                zh_cn_bundle = p1_results["zh-CN"]

        # Phase 2: zh-TW derived strictly from zh-CN
        if any(l["code"] == "zh-TW" for l in target_langs):
            tw_lang = next(l for l in target_langs if l["code"] == "zh-TW")
            print(f"Translating zh-TW from zh-CN (j={args.jobs})...", flush=True)
            _, p2_failures = run_mail_batch(
                [tw_lang],
                canonical,
                zh_cn_bundle,
                zh_cn_i18n,
                jobs=args.jobs,
                force=args.force,
                dry_run=args.dry_run,
            )
            failures.extend(p2_failures)

        if failures:
            print(f"\nMail translation completed with {len(failures)} failure(s).", file=sys.stderr)
            return 1

    if not args.only_mail:
        i18n_langs = [l for l in target_langs if l["code"] not in ("en", "zh-CN")]
        if i18n_langs:
            update_keys = set(args.update_i18n_keys)
            print(f"Syncing site/data/i18n/*.json for {len(i18n_langs)} languages (j={args.jobs})...", flush=True)
            with concurrent.futures.ThreadPoolExecutor(max_workers=min(args.jobs, len(i18n_langs))) as ex:
                futs = [
                    ex.submit(sync_single_i18n_file, l, en_i18n, zh_cn_i18n, update_keys, args.dry_run)
                    for l in i18n_langs
                ]
                for fut in concurrent.futures.as_completed(futs):
                    code, st = fut.result()
                    print(f"  [i18n] {code}: {st}", flush=True)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
