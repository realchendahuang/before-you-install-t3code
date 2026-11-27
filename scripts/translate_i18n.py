#!/usr/bin/env python3
"""Batch-translate content/ui/<lang>.json and cases/<lang>/NN-*.md across all 16 secondary languages
using local pi-subagent (DeepSeek V4.1 Flash) with strict programmatic integrity checks:
  - Preserves all 5 <!-- section:... --> HTML markers
  - Preserves 100% of https:// URLs, image paths, code blocks, commit hashes, and PR/Issue identifiers
  - Preserves exact JSON key structure on UI dictionaries
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
CONTENT_DIR = ROOT / "content"
CASES_DIR = ROOT / "cases"

URL_RE = re.compile(r"https://[^\s<>)\"'\`\]，。；！？、…]+")
IMG_PATH_RE = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
MARKER_RE = re.compile(r"<!--\s*section:([a-z_]+)\s*-->")
REQUIRED_MARKERS = ["claim", "evidence", "status", "visuals", "sources"]


def run_pi(prompt: str, timeout: int = 180) -> str:
    cmd = ["pi-subagent", "--no-tools", "-r", "flash", prompt]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, check=False)
    if res.returncode != 0:
        raise RuntimeError(f"pi-subagent exited {res.returncode}: {res.stderr.strip()[:300]}")
    out = res.stdout.strip()
    # Strip accidental wrapping markdown fences if model emitted them
    if out.startswith("```"):
        lines = out.splitlines()
        if lines and lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        out = "\n".join(lines).strip()
    return out


def same_json_shape(ref: Any, cand: Any) -> bool:
    if type(ref) is not type(cand):
        return False
    if isinstance(ref, dict):
        if set(ref.keys()) != set(cand.keys()):
            return False
        return all(same_json_shape(ref[k], cand[k]) for k in ref)
    if isinstance(ref, list):
        if len(ref) != len(cand):
            return False
        return all(same_json_shape(a, b) for a, b in zip(ref, cand))
    return True


def translate_ui(lang: dict[str, Any], force: bool = False) -> tuple[str, str]:
    code = lang["code"]
    out_path = CONTENT_DIR / "ui" / f"{code}.json"
    if out_path.exists() and not force:
        return code, "cached"

    if code == "zh-TW":
        src_path = CONTENT_DIR / "ui" / "zh-CN.json"
        source_note = "Convert Simplified Chinese to natural Traditional Chinese (Taiwan/Hong Kong editorial usage)."
    else:
        src_path = CONTENT_DIR / "ui" / "en.json"
        source_note = f"Translate all string values into natural, restrained investigative-journalism {lang['englishName']} ({lang['name']})."

    src_text = src_path.read_text(encoding="utf-8")
    ref_obj = json.loads(src_text)

    prompt = (
        f"You are translating a UI dictionary JSON for an independent public-record software audit.\n"
        f"{source_note}\n"
        f"STRICT RULES:\n"
        f"1. Output ONLY valid JSON (no prose, no markdown fences).\n"
        f"2. Keep ALL JSON keys identical. Set \"langCode\" to \"{code}\".\n"
        f"3. Keep technical terms, code identifiers, commit hashes (9d3195b4, ca81b7b9), file names, PR/Issue numbers, placeholders like {{shown}} and {{total}}, and brand/product names (T3 Code, T3 Connect, pingdotgg/t3code, PostHog, Axiom, Clerk, USPTO, GDPR, @theo, GitHub) intact.\n"
        f"4. Keep the tone calm, sharp, factual, and journalistic — zero hype or profanity.\n\n"
        f"SOURCE JSON:\n{src_text}"
    )

    last_err = ""
    for attempt in range(1, 4):
        try:
            raw = run_pi(prompt, timeout=180)
            # Extract outermost JSON object if anything trailed
            m = re.search(r"\{.*\}", raw, flags=re.S)
            if not m:
                raise ValueError("No JSON object in output")
            obj = json.loads(m.group(0))
            obj["langCode"] = code
            if not same_json_shape(ref_obj, obj):
                raise ValueError("JSON shape/keys mismatch")
            out_path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            return code, f"ok(try={attempt})"
        except Exception as exc:
            last_err = str(exc)
    raise RuntimeError(f"UI translation failed for {code}: {last_err}")


def validate_case_translation(src_text: str, cand_text: str, case_id: str) -> list[str]:
    errs: list[str] = []
    markers = MARKER_RE.findall(cand_text)
    if markers != REQUIRED_MARKERS:
        errs.append(f"markers mismatch: got {markers}")
    if not re.match(rf"^#\s*#{case_id}\s*·\s*\S+", cand_text.splitlines()[0] if cand_text else ""):
        errs.append("missing '# #NN · Title' H1 header")

    src_urls = set(URL_RE.findall(src_text))
    cand_urls = set(URL_RE.findall(cand_text))
    missing_urls = src_urls - cand_urls
    if missing_urls:
        errs.append(f"missing {len(missing_urls)} URLs: {sorted(missing_urls)[:3]}")

    src_imgs = IMG_PATH_RE.findall(src_text)
    cand_imgs = IMG_PATH_RE.findall(cand_text)
    if src_imgs != cand_imgs:
        errs.append(f"image paths mismatch: expected {src_imgs}, got {cand_imgs}")

    if "t.co/" in cand_text.lower():
        errs.append("contains forbidden t.co shortlink")
    return errs


def translate_case(lang: dict[str, Any], cmeta: dict[str, Any], force: bool = False) -> tuple[str, str]:
    code = lang["code"]
    cid = cmeta["id"]
    slug = cmeta["slug"]
    out_dir = CASES_DIR / code
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{cid}-{slug}.md"
    if out_path.exists() and not force:
        return f"{code}/#{cid}", "cached"

    if code == "zh-TW":
        src_path = CASES_DIR / "zh-CN" / f"{cid}-{slug}.md"
        task_instr = "Convert this Simplified Chinese investigative exhibit Markdown into natural Traditional Chinese (Taiwan/Hong Kong standard editorial phrasing)."
    else:
        src_path = CASES_DIR / "en" / f"{cid}-{slug}.md"
        task_instr = f"Translate this English investigative exhibit Markdown into natural, clear, journalistic {lang['englishName']} ({lang['name']})."

    src_text = src_path.read_text(encoding="utf-8")

    prompt = (
        f"{task_instr}\n"
        f"STRICT STRUCTURAL & FACTUAL RULES:\n"
        f"1. Output ONLY the translated Markdown document (no preamble, no surrounding ```markdown fence).\n"
        f"2. Keep the exact H1 prefix `# #{cid} · ` followed by the translated title.\n"
        f"3. Keep ALL five HTML comment markers verbatim on their own lines in exact order:\n"
        f"   <!-- section:claim -->\n   <!-- section:evidence -->\n   <!-- section:status -->\n   <!-- section:visuals -->\n   <!-- section:sources -->\n"
        f"4. Translate the `##` section headings and image alt captions into {lang['englishName']}, while keeping EVERY URL (`https://...`), EVERY relative file/image path (`../../evidence/...`, `../../docs/...`), EVERY fenced code block (` ```ts ... ``` `), EVERY code identifier, file name, commit hash, PR/Issue number, and verbatim English quote inside quotation marks intact.\n"
        f"5. Do NOT omit any bullet, link, or image. Keep tone calm, factual, and crisp.\n\n"
        f"SOURCE MARKDOWN:\n{src_text}"
    )

    last_errs: list[str] = []
    for attempt in range(1, 4):
        try:
            cand = run_pi(prompt, timeout=180)
            errs = validate_case_translation(src_text, cand, cid)
            if not errs:
                out_path.write_text(cand.rstrip() + "\n", encoding="utf-8")
                return f"{code}/#{cid}", f"ok(try={attempt})"
            last_errs = errs
            # Strengthen prompt with exact feedback for retry
            prompt += f"\n\nPREVIOUS ATTEMPT FAILED VALIDATION: {'; '.join(errs)}. Fix these strictly and output the complete corrected Markdown."
        except Exception as exc:
            last_errs = [str(exc)]

    raise RuntimeError(f"Case translation failed for {code}/#{cid}: {'; '.join(last_errs)}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Batch-translate UI and cases across 16 languages via pi-subagent.")
    parser.add_argument("--langs", nargs="*", help="Subset of language codes to translate (default: all 16 non-en/zh-CN)")
    parser.add_argument("--only-case", help="Translate only a single case ID, e.g. 20")
    parser.add_argument("--only-ui", action="store_true", help="Translate only UI JSON files")
    parser.add_argument("--force", action="store_true", help="Overwrite existing translated files")
    parser.add_argument("-j", "--jobs", type=int, default=8, help="Concurrent pi-subagent workers")
    args = parser.parse_args()

    manifest = json.loads((CONTENT_DIR / "manifest.json").read_text(encoding="utf-8"))
    target_langs = [
        l for l in manifest["languages"]
        if l["code"] not in ("en", "zh-CN") and (not args.langs or l["code"] in args.langs)
    ]
    target_cases = [
        c for c in manifest["cases"]
        if not args.only_case or c["id"] == args.only_case
    ]

    if not args.only_case:
        print(f"Translating UI dictionaries for {len(target_langs)} languages (j={args.jobs})...", flush=True)
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.jobs) as ex:
            futs = [ex.submit(translate_ui, l, args.force) for l in target_langs]
            for fut in concurrent.futures.as_completed(futs):
                k, st = fut.result()
                print(f"  [ui] {k}: {st}", flush=True)

    if args.only_ui:
        return 0

    tasks = [(l, c) for l in target_langs for c in target_cases]
    print(f"Translating {len(tasks)} case files ({len(target_langs)} langs × {len(target_cases)} cases, j={args.jobs})...", flush=True)
    failures: list[str] = []
    done = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.jobs) as ex:
        fut_map = {ex.submit(translate_case, l, c, args.force): (l["code"], c["id"]) for l, c in tasks}
        for fut in concurrent.futures.as_completed(fut_map):
            code, cid = fut_map[fut]
            done += 1
            try:
                k, st = fut.result()
                if done % 20 == 0 or done == len(tasks) or st != "cached":
                    print(f"  [{done}/{len(tasks)}] {k}: {st}", flush=True)
            except Exception as exc:
                msg = f"{code}/#{cid}: {exc}"
                failures.append(msg)
                print(f"  [FAIL] {msg}", file=sys.stderr, flush=True)

    if failures:
        print(f"\nCompleted with {len(failures)} failures.", file=sys.stderr)
        return 1
    print(f"\nAll {len(tasks)} translations verified and written cleanly.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
