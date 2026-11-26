#!/usr/bin/env python3
"""Compile single-source Markdown exhibits (cases/<lang>/NN-*.md) + content/manifest.json
+ content/ui/<lang>.json into:
  1. Clean, table-free GitHub READMEs for all 18 languages (README.md + docs/i18n/README.<lang>.md)
  2. Lazy-loaded per-language JSON bundles for the visual portal (site/data/<lang>.json)
  3. Per-exhibit OpenGraph / Twitter Card static share pages (site/c/<id>/ & site/c/zh/<id>/)

Zero third-party dependencies (Python 3.10+ stdlib only).
"""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "content"
CASES_DIR = ROOT / "cases"
SITE_DIR = ROOT / "site"
SITE_DATA_DIR = SITE_DIR / "data"
SITE_SHARE_DIR = SITE_DIR / "c"

SECTION_MARKER_RE = re.compile(r"<!--\s*section:([a-z_]+)\s*-->")
IMAGE_MD_RE = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")
LINK_MD_RE = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
CODE_FENCE_RE = re.compile(r"^```([a-zA-Z0-9_-]*)\s*$")


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def inline_md_to_html(text: str) -> str:
    """Convert inline Markdown (code spans, links, bold, italic) to clean safe HTML."""
    code_placeholders: list[str] = []

    def _save_code(m: re.Match[str]) -> str:
        idx = len(code_placeholders)
        code_placeholders.append(f"<code>{html.escape(m.group(1))}</code>")
        return f"\x00CODE{idx}\x00"

    # Extract inline code spans first so asterisks/brackets inside code stay literal
    s = re.sub(r"`([^`\n]+)`", _save_code, text)

    # Extract Markdown links before escaping remaining HTML
    link_placeholders: list[str] = []

    def _save_link(m: re.Match[str]) -> str:
        label = m.group(1)
        url = m.group(2).strip()
        # Recursively render formatting inside link label
        inner = inline_md_to_html(label)
        idx = len(link_placeholders)
        if url.startswith(("http://", "https://")):
            link_placeholders.append(
                f'<a href="{html.escape(url, quote=True)}" target="_blank" rel="noopener noreferrer">{inner}</a>'
            )
        else:
            link_placeholders.append(f'<a href="{html.escape(url, quote=True)}">{inner}</a>')
        return f"\x00LINK{idx}\x00"

    s = LINK_MD_RE.sub(_save_link, s)
    s = html.escape(s)

    # Bold & italic
    s = re.sub(r"\*\*([^\*\n]+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<!\*)\*([^\*\n]+?)\*(?!\*)", r"<em>\1</em>", s)

    for idx, val in enumerate(link_placeholders):
        s = s.replace(f"\x00LINK{idx}\x00", val)
    for idx, val in enumerate(code_placeholders):
        s = s.replace(f"\x00CODE{idx}\x00", val)
    return s


def block_md_to_html(md_text: str) -> str:
    """Convert simple Markdown blocks (paragraphs, bullets, nested bullets, fenced code) to HTML."""
    lines = md_text.strip().splitlines()
    out: list[str] = []
    i = 0
    in_ul = False
    in_nested_ul = False
    para_buf: list[str] = []

    def flush_para() -> None:
        nonlocal para_buf
        if para_buf:
            out.append(f"<p>{inline_md_to_html(' '.join(para_buf))}</p>")
            para_buf = []

    def close_lists() -> None:
        nonlocal in_ul, in_nested_ul
        if in_nested_ul:
            out.append("</ul></li>")
            in_nested_ul = False
        if in_ul:
            out.append("</ul>")
            in_ul = False

    while i < len(lines):
        raw = lines[i]
        stripped = raw.strip()

        # Skip section heading line (## ...) if present inside section body
        if stripped.startswith("## "):
            i += 1
            continue

        # Fenced code block
        m_fence = CODE_FENCE_RE.match(stripped)
        if m_fence:
            flush_para()
            close_lists()
            lang = m_fence.group(1) or "text"
            code_lines: list[str] = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code_lines.append(lines[i])
                i += 1
            code_body = html.escape("\n".join(code_lines))
            out.append(
                f'<pre class="exhibit-code" data-lang="{html.escape(lang, quote=True)}"><code>{code_body}</code></pre>'
            )
            i += 1
            continue

        if not stripped:
            flush_para()
            close_lists()
            i += 1
            continue

        # Nested bullet (2+ spaces followed by "- ")
        if re.match(r"^[ ]{2,}-\s+", raw):
            flush_para()
            item_text = re.sub(r"^[ ]{2,}-\s+", "", raw)
            if not in_ul:
                out.append("<ul><li>")
                in_ul = True
            if not in_nested_ul:
                # Re-open last <li> to hold nested <ul>
                if out and out[-1].endswith("</li>"):
                    out[-1] = out[-1][:-5]
                out.append("<ul>")
                in_nested_ul = True
            out.append(f"<li>{inline_md_to_html(item_text)}</li>")
            i += 1
            continue

        # Top-level bullet
        if raw.startswith("- "):
            flush_para()
            if in_nested_ul:
                out.append("</ul></li>")
                in_nested_ul = False
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            out.append(f"<li>{inline_md_to_html(raw[2:].strip())}</li>")
            i += 1
            continue

        # Blockquote
        if stripped.startswith("> "):
            flush_para()
            close_lists()
            out.append(f"<blockquote><p>{inline_md_to_html(stripped[2:].strip())}</p></blockquote>")
            i += 1
            continue

        # Normal paragraph line
        close_lists()
        para_buf.append(stripped)
        i += 1

    flush_para()
    close_lists()
    return "\n".join(out)


def parse_case_file(path: Path, case_meta: dict[str, Any], repo_blob: str) -> dict[str, Any]:
    """Parse a localized cases/<lang>/NN-*.md file into structured exhibit data."""
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()

    # Title (# #NN · Title)
    title = ""
    summary_lines: list[str] = []
    first_marker_pos = text.find("<!-- section:")
    header_block = text[:first_marker_pos] if first_marker_pos != -1 else text

    for line in header_block.splitlines():
        s = line.strip()
        if s.startswith("# ") and not title:
            raw_title = s[2:].strip()
            # Strip leading "#NN · " or "#NN - "
            title = re.sub(r"^#\d+\s*[·\-—:\|]\s*", "", raw_title).strip()
        elif s.startswith("> "):
            summary_lines.append(s[2:].strip())

    summary = " ".join(summary_lines).strip()

    # Split sections by <!-- section:NAME -->
    parts = SECTION_MARKER_RE.split(text)
    sections_raw: dict[str, str] = {}
    for idx in range(1, len(parts) - 1, 2):
        sec_name = parts[idx].strip()
        sec_body = parts[idx + 1].strip()
        # Strip leading ## heading line from body
        body_lines = sec_body.splitlines()
        if body_lines and body_lines[0].strip().startswith("## "):
            body_lines = body_lines[1:]
        sections_raw[sec_name] = "\n".join(body_lines).strip()

    # Extract visuals
    visuals: list[dict[str, str]] = []
    for m in IMAGE_MD_RE.finditer(sections_raw.get("visuals", "")):
        caption = m.group(1).strip()
        rel_src = m.group(2).strip()
        norm_src = re.sub(r"^(\.\./)+", "", rel_src)
        visuals.append({"src": norm_src, "caption": caption})

    # Extract primary sources
    sources: list[dict[str, str]] = []
    seen_urls: set[str] = set()
    for m in LINK_MD_RE.finditer(sections_raw.get("sources", "")):
        label = m.group(1).strip().replace("`", "")
        url = m.group(2).strip()
        if url.startswith("../../"):
            url = repo_blob + url.replace("../../", "")
        if url not in seen_urls:
            seen_urls.add(url)
            sources.append({"label": label, "url": url})

    return {
        "id": case_meta["id"],
        "slug": case_meta["slug"],
        "act": case_meta["act"],
        "status": case_meta["status"],
        "severity": case_meta["severity"],
        "date": case_meta["date"],
        "evidencePart": case_meta["evidencePart"],
        "heroImage": case_meta["heroImage"],
        "dossier": case_meta["dossier"],
        "dossierUrl": repo_blob + case_meta["dossier"],
        "xPost": case_meta["xPost"],
        "charts": case_meta.get("charts", []),
        "title": title,
        "summary": summary,
        "claimHtml": block_md_to_html(sections_raw.get("claim", "")),
        "evidenceHtml": block_md_to_html(sections_raw.get("evidence", "")),
        "statusHtml": block_md_to_html(sections_raw.get("status", "")),
        "visuals": visuals,
        "sources": sources,
    }


def status_emoji(status: str) -> str:
    return {"open": "🔴", "partial": "🟡", "record": "📌"}.get(status, "•")


def render_readme(
    lang: dict[str, Any],
    manifest: dict[str, Any],
    ui: dict[str, Any],
    cases_by_id: dict[str, dict[str, Any]],
) -> str:
    """Render an ultra-clean, zero-giant-table GitHub README for a given language."""
    code = lang["code"]
    is_root = code == "en"
    prefix = "./" if is_root else "../../"
    i18n_prefix = "./docs/i18n/" if is_root else "./"
    docs_prefix = "./docs/" if is_root else "../"

    pages_url = manifest["pagesUrl"].rstrip("/")
    portal_lang_url = f"{pages_url}/?lang={code}" if code != "en" else f"{pages_url}/"
    repo_url = manifest["repoUrl"].rstrip("/")
    verify_badge = f"{repo_url}/actions/workflows/verify.yml/badge.svg"
    verify_url = f"{repo_url}/actions/workflows/verify.yml"

    un_links = []
    comm_links = []
    for l in manifest["languages"]:
        href = (
            f"{prefix}README.md"
            if l["code"] == "en"
            else f"{i18n_prefix}README.{l['code']}.md"
        )
        label = f"<strong>{l['name']}</strong>" if l["code"] == code else l["name"]
        tag = f'<a href="{href}">{label}</a>'
        if l["group"] == "un":
            un_links.append(tag)
        else:
            comm_links.append(tag)

    lines: list[str] = []
    lines.append(f"# {ui['siteTitle']}")
    lines.append("")
    lines.append('<p align="center">')
    lines.append(f"  <em>{ui['siteSubtitle']}</em>")
    lines.append("</p>")
    lines.append("")
    lines.append('<p align="center">')
    lines.append(f'  <a href="{portal_lang_url}"><strong>🌐 {ui["cta"]["openPortal"]}</strong></a>')
    lines.append("  ·")
    lines.append(f'  <a href="{verify_url}"><img src="{verify_badge}" alt="Repository Verification CI" /></a>')
    lines.append("  ·")
    lines.append(f'  <a href="{docs_prefix}EVIDENCE-INDEX.md"><strong>{ui["cta"]["evidenceArchive"]}</strong></a>')
    lines.append("  ·")
    lines.append(f'  <a href="{docs_prefix}COMPLETE-SOURCE-INDEX.md"><strong>{ui["cta"]["sourceIndex"]}</strong></a>')
    lines.append("</p>")
    lines.append("")
    lines.append('<p align="center">')
    lines.append(f'  <strong>{ui["readme"]["unLanguages"]}:</strong>')
    lines.append("  " + " ·\n  ".join(un_links))
    lines.append("</p>")
    lines.append('<p align="center">')
    lines.append(f'  <strong>{ui["readme"]["communityLanguages"]}:</strong>')
    lines.append("  " + " ·\n  ".join(comm_links))
    lines.append("</p>")
    lines.append("")
    lines.append(f"![{ui['siteTitle']}]({prefix}{lang['cover']})")
    lines.append("")
    lines.append("> [!IMPORTANT]")
    lines.append(f"> **{ui['heroKicker']}**")
    lines.append(">")
    lines.append(f"> {ui['heroThesis']}")
    lines.append(">")
    lines.append(f"> - **{ui['stats']['casesLabel']}:** {ui['stats']['casesValue']}")
    lines.append(f"> - **{ui['stats']['receiptsLabel']}:** {ui['stats']['receiptsValue']}")
    lines.append(
        f"> - **{ui['stats']['upstreamLabel']}:** [`{manifest['baselineShort']}`](https://github.com/{manifest['upstreamRepo']}/commit/{manifest['baselineCommit']}) → [`{manifest['latestShort']}`](https://github.com/{manifest['upstreamRepo']}/commit/{manifest['latestCommit']}) (`+{manifest['commitsTracked']}` commits · {manifest['latestChecked']})"
    )
    lines.append(f"> - **{ui['stats']['advisoriesLabel']}:** {ui['stats']['advisoriesValue']}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # 60-Second Story Arc (Clean numbered beats — zero giant tables!)
    lines.append(f"## {ui['storyArcHeading']}")
    lines.append("")
    lines.append(ui["storyArcLead"])
    lines.append("")
    for beat in ui["storyArc"]:
        lines.append(f"{int(beat['step'])}. **{beat['title']}** *({beat['window']})* — {beat['body']}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # All 20 Exhibits grouped cleanly by 4 thematic Acts (ZERO tables!)
    lines.append(f"## {ui['readme']['quickNav']}")
    lines.append("")
    lines.append(ui["readme"]["quickNavNote"])
    lines.append("")

    for act in manifest["acts"]:
        act_id = act["id"]
        act_ui = ui["acts"][act_id]
        lines.append(f"### {act_ui['label']} · {act_ui['title']}")
        lines.append("")
        lines.append(f"*{act_ui['summary']}*")
        lines.append("")
        for cid in act["cases"]:
            c = cases_by_id[cid]
            case_rel = f"{prefix}cases/{code}/{c['id']}-{c['slug']}.md"
            share_url = (
                f"{pages_url}/c/zh/{c['id']}/"
                if code in ("zh-CN", "zh-TW")
                else f"{pages_url}/c/{c['id']}/"
            )
            st_label = ui["statusLabels"].get(c["status"], c["status"])
            em = status_emoji(c["status"])
            lines.append(f"- **#{c['id']} · [{c['title']}]({case_rel})** — `{em} {st_label}`")
            lines.append(f"  {c['summary']}")
            lines.append(
                f"  [{ui['cta']['viewExhibit']}]({case_rel}) · [{ui['cta']['readOnWeb']}]({share_url}) · [{ui['cta']['openOriginalPost']}]({c['xPost']})"
            )
        lines.append("")

    lines.append("---")
    lines.append("")

    # Curated Visual Highlights
    lines.append(f"## {ui['readme']['featuredVisuals']}")
    lines.append("")
    lines.append(f"![#00 Origin GitHub takedown threat]({prefix}evidence/01-origin-theo-threat.png)")
    lines.append("")
    lines.append(f"![#01 Commit 3bdaa6e1 deleting No telemetry promise]({prefix}evidence/02-no-telemetry-removed.png)")
    lines.append("")
    lines.append(f"![#14 1,151-tweet selective politeness chart]({prefix}{lang['doubleStandardChart']})")
    lines.append("")
    lines.append(f"![#19 ca81b7b9 plaintext --lan cookie without Secure]({prefix}evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)")
    lines.append("")
    lines.append("---")
    lines.append("")

    # 2-Minute Hardening & Cleanup
    lines.append(f"## {ui['mitigation']['heading']}")
    lines.append("")
    lines.append(ui["mitigation"]["lead"])
    lines.append("")
    for step in ui["mitigation"]["steps"]:
        lines.append(f"- [ ] {step}")
    lines.append("")
    lines.append("```bash")
    lines.append("# macOS / Linux: combine DO_NOT_TRACK=1 with legacy flags + /etc/hosts sinkhole")
    lines.append("export DO_NOT_TRACK=1")
    lines.append("export T3CODE_TELEMETRY_ENABLED=false")
    lines.append("export T3CODE_OTEL_SDK_DISABLED=true")
    lines.append("export OTEL_SDK_DISABLED=true")
    lines.append('sudo sh -c \'printf "\\n127.0.0.1 ingest.t3.codes\\n::1 ingest.t3.codes\\n" >> /etc/hosts\'')
    lines.append("")
    lines.append("# Quit T3 Code first, then compact statev2.sqlite or clean local directories")
    lines.append('sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"')
    lines.append("rm -rf ~/.t3/userdata/providers/antigravity/ ~/.t3/tools/antigravity-acp/")
    lines.append("```")
    lines.append("")
    lines.append(f"**{ui['mitigation']['alternativesTitle']}:** {ui['mitigation']['alternativesBody']}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Community Reports (strictly separated)
    lines.append(f"## {ui['community']['heading']}")
    lines.append("")
    lines.append(ui["community"]["lead"])
    lines.append("")
    lines.append(
        f"- **{ui['community']['issue1Title']}** — {ui['community']['issue1Body']} ([{ui['community']['issue1Link']}]({docs_prefix}community/issue-1-the-case-against-theo.md))"
    )
    lines.append(
        f"- **{ui['community']['dmTitle']}** — {ui['community']['dmBody']} ([{ui['community']['dmLink']}]({prefix}CONTRIBUTING.md))"
    )
    lines.append("")
    lines.append("---")
    lines.append("")

    # Deep Technical Dossiers & Master Indexes
    lines.append(f"## {ui['readme']['deepArchive']}")
    lines.append("")
    lines.append(ui["readme"]["deepArchiveNote"])
    lines.append("")
    lines.append(f"- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint]({docs_prefix}dossiers/01-telemetry-and-gdpr-timeline.md)")
    lines.append(f"- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches]({docs_prefix}dossiers/02-local-safety-and-security-audit.md)")
    lines.append(f"- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay]({docs_prefix}dossiers/03-antigravity-tos-and-t3connect-relay.md)")
    lines.append(f"- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel]({docs_prefix}dossiers/04-business-ledger-sponsors-and-77k-stars.md)")
    lines.append(f"- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History]({docs_prefix}dossiers/05-governance-trademark-and-history.md)")
    lines.append(f"- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset]({docs_prefix}dossiers/06-tweet-forensic-dataset-1151.md)")
    lines.append(f"- [{ui['cta']['evidenceArchive']} (`docs/EVIDENCE-INDEX.md`)]({docs_prefix}EVIDENCE-INDEX.md)")
    lines.append(f"- [{ui['cta']['sourceIndex']} (`docs/COMPLETE-SOURCE-INDEX.md`)]({docs_prefix}COMPLETE-SOURCE-INDEX.md)")
    lines.append("")
    lines.append(f"### {ui['readme']['howToUpdate']}")
    lines.append("")
    lines.append(ui["readme"]["howToUpdateBody"])
    lines.append("")
    return "\n".join(lines)


def render_og_share_page(
    case: dict[str, Any],
    ui: dict[str, Any],
    manifest: dict[str, Any],
    lang_code: str,
    rel_to_root: str,
) -> str:
    """Generate a lightweight static OpenGraph / Twitter Card landing page for one exhibit."""
    pages_url = manifest["pagesUrl"].rstrip("/")
    hero_img = case["heroImage"]
    if lang_code in ("zh-CN", "zh-TW") and case["id"] == "14":
        hero_img = "evidence/25-double-standard-chart-zh.png"

    page_title = f"#{case['id']} · {case['title']} — {ui['siteTitle']}"
    desc = case["summary"]
    img_url = f"{pages_url}/{hero_img}"
    canonical_sub = f"c/zh/{case['id']}/" if lang_code == "zh-CN" else f"c/{case['id']}/"
    canonical_url = f"{pages_url}/{canonical_sub}"
    target_query = (
        f"{rel_to_root}?lang=zh-CN&case={case['id']}#case-{case['id']}"
        if lang_code == "zh-CN"
        else f"{rel_to_root}?case={case['id']}#case-{case['id']}"
    )

    return f"""<!DOCTYPE html>
<html lang="{html.escape(lang_code, quote=True)}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(page_title)}</title>
  <meta name="description" content="{html.escape(desc, quote=True)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="{html.escape(ui['siteTitle'], quote=True)}" />
  <meta property="og:title" content="{html.escape(page_title, quote=True)}" />
  <meta property="og:description" content="{html.escape(desc, quote=True)}" />
  <meta property="og:url" content="{html.escape(canonical_url, quote=True)}" />
  <meta property="og:image" content="{html.escape(img_url, quote=True)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{html.escape(page_title, quote=True)}" />
  <meta name="twitter:description" content="{html.escape(desc, quote=True)}" />
  <meta name="twitter:image" content="{html.escape(img_url, quote=True)}" />
  <meta http-equiv="refresh" content="0; url={html.escape(target_query, quote=True)}" />
  <style>
    body {{
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #faf9f5;
      color: #141413;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Sans SC", sans-serif;
      padding: 24px;
    }}
    main {{
      max-width: 60ch;
      background: #f5f4ed;
      border: 1px solid #e8e6dc;
      border-radius: 12px;
      padding: 24px;
    }}
    h1 {{ font-size: 1.25rem; font-weight: 500; margin: 0 0 12px; }}
    p {{ color: #5e5d59; line-height: 1.65; margin: 0 0 16px; }}
    a {{ color: #141413; font-weight: 500; }}
  </style>
  <script>window.location.replace({json.dumps(target_query)});</script>
</head>
<body>
  <main>
    <h1>{html.escape(page_title)}</h1>
    <p>{html.escape(desc)}</p>
    <p><a href="{html.escape(target_query, quote=True)}">{html.escape(ui['cta']['openPortal'])}</a></p>
  </main>
</body>
</html>
"""


def main() -> int:
    manifest = load_json(CONTENT_DIR / "manifest.json")
    evidence = load_json(CONTENT_DIR / "evidence.json")
    repo_blob = manifest["repoUrl"].rstrip("/") + "/blob/main/"

    # Group evidence receipts by part so each case bundle knows its related extra receipts
    receipts_by_part: dict[str, list[dict[str, Any]]] = {}
    for item in evidence:
        for p in item.get("parts", [item["part"]]):
            receipts_by_part.setdefault(p, []).append(item)

    SITE_DATA_DIR.mkdir(parents=True, exist_ok=True)
    SITE_SHARE_DIR.mkdir(parents=True, exist_ok=True)

    # Write shared static manifest + evidence catalog for site/
    (SITE_DATA_DIR / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (SITE_DATA_DIR / "evidence.json").write_text(
        json.dumps(evidence, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    built_langs: list[str] = []
    skipped_langs: list[str] = []

    for lang in manifest["languages"]:
        code = lang["code"]
        ui_path = CONTENT_DIR / "ui" / f"{code}.json"
        lang_cases_dir = CASES_DIR / code
        if not ui_path.exists() or not lang_cases_dir.exists():
            skipped_langs.append(code)
            continue

        ui = load_json(ui_path)
        parsed_cases: list[dict[str, Any]] = []
        cases_by_id: dict[str, dict[str, Any]] = {}
        missing_case = False

        for cmeta in manifest["cases"]:
            cpath = lang_cases_dir / f"{cmeta['id']}-{cmeta['slug']}.md"
            if not cpath.exists():
                print(f"[warn] missing {cpath.relative_to(ROOT)}", file=sys.stderr)
                missing_case = True
                continue
            parsed = parse_case_file(cpath, cmeta, repo_blob)
            inline_srcs = {v["src"] for v in parsed["visuals"]}
            related = [
                {
                    "id": r["id"],
                    "src": r["path"],
                    "title": r["title"],
                    "caption": r["caption"],
                    "sourceUrl": r.get("sourceUrl", ""),
                }
                for r in receipts_by_part.get(cmeta["evidencePart"], [])
                if r["path"] not in inline_srcs
                and not r["path"].endswith(("00-cover-en.png", "00-cover-zh.png"))
            ]
            parsed["extraReceipts"] = related
            parsed["markdownUrl"] = f"{repo_blob}cases/{code}/{cmeta['id']}-{cmeta['slug']}.md"
            parsed_cases.append(parsed)
            cases_by_id[cmeta["id"]] = parsed

        if missing_case:
            skipped_langs.append(code)
            continue

        # 1. Write lazy-loaded site/data/<lang>.json
        bundle = {
            "lang": lang,
            "ui": ui,
            "cases": parsed_cases,
        }
        (SITE_DATA_DIR / f"{code}.json").write_text(
            json.dumps(bundle, ensure_ascii=False, separators=(",", ":")) + "\n",
            encoding="utf-8",
        )

        # 2. Render clean GitHub README for this language
        readme_md = render_readme(lang, manifest, ui, cases_by_id)
        readme_out = ROOT / lang["readmePath"]
        readme_out.parent.mkdir(parents=True, exist_ok=True)
        readme_out.write_text(readme_md, encoding="utf-8")

        # 3. Emit per-exhibit OG share pages for EN (default) and ZH-CN
        if code == "en":
            for c in parsed_cases:
                share_dir = SITE_SHARE_DIR / c["id"]
                share_dir.mkdir(parents=True, exist_ok=True)
                (share_dir / "index.html").write_text(
                    render_og_share_page(c, ui, manifest, "en", "../../"),
                    encoding="utf-8",
                )
        elif code == "zh-CN":
            for c in parsed_cases:
                share_dir = SITE_SHARE_DIR / "zh" / c["id"]
                share_dir.mkdir(parents=True, exist_ok=True)
                (share_dir / "index.html").write_text(
                    render_og_share_page(c, ui, manifest, "zh-CN", "../../../"),
                    encoding="utf-8",
                )

        built_langs.append(code)

    print(
        f"Built {len(built_langs)} languages ({', '.join(built_langs)}); "
        f"skipped {len(skipped_langs)} ({', '.join(skipped_langs) if skipped_langs else 'none'})."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
