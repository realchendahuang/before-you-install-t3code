#!/usr/bin/env python3
"""Verify repository links, heading/HTML anchors, 18-language exhibit parity, evidence coverage,
formatting hygiene, JSON portal bundles, OG share pages, and URL parity."""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
import urllib.parse
from dataclasses import dataclass, field
from pathlib import Path

EXPECTED_DOSSIERS = (
    "docs/dossiers/01-telemetry-and-gdpr-timeline.md",
    "docs/dossiers/02-local-safety-and-security-audit.md",
    "docs/dossiers/03-antigravity-tos-and-t3connect-relay.md",
    "docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md",
    "docs/dossiers/05-governance-trademark-and-history.md",
    "docs/dossiers/06-tweet-forensic-dataset-1151.md",
)

SELF_PORTAL_PREFIXES = (
    "https://temu3code.com",
    "https://github.com/realchendahuang/temu3code/actions/workflows/",
    "https://realchendahuang.github.io/temu3code",
    "https://realchendahuang.github.io/before-you-install-t3code",
)

FENCED_CODE_RE = re.compile(r"(?ms)^[ \t]{0,3}(`{3,}|~{3,})[^\n]*\n.*?^[ \t]{0,3}\1[ \t]*$")
INLINE_CODE_RE = re.compile(r"`+[^`\n]+?`+")
ATX_HEADING_RE = re.compile(r"(?m)^[ \t]{0,3}#{1,6}[ \t]+(.+?)[ \t]*#*[ \t]*$")
HTML_ID_RE = re.compile(r"""\bid\s*=\s*(?:"([^"]+)"|'([^']+)')""", re.IGNORECASE)
MD_LINK_RE = re.compile(r"!?\[[^\]]*\]\(([^()\n]+(?:\([^()\n]*\)[^()\n]*)*)\)")
HTML_ATTR_RE = re.compile(r"""(?:href|src)\s*=\s*(?:"([^"]+)"|'([^']+)')""", re.IGNORECASE)
HTTPS_URL_RE = re.compile(r"https://[^\s<>)\"'\`\]，。；！？、…]+")
TCO_RE = re.compile(r"(?:https?://)?t\.co/", re.IGNORECASE)
ESCAPED_DOLLAR_RE = re.compile(r"\\\$")
HIGHLIGHT_RE = re.compile(r"(?<!=)==(?=\S)([^=\n]*?\S)==(?!=)")
SECTION_MARKER_RE = re.compile(r"<!--\s*section:([a-z_]+)\s*-->")
REQUIRED_MARKERS = ["claim", "evidence", "status", "visuals", "sources"]


def is_self_portal_url(url: str) -> bool:
    return any(url.startswith(p) for p in SELF_PORTAL_PREFIXES)


@dataclass
class VerificationReport:
    markdown_files: list[str] = field(default_factory=list)
    relative_links_checked: int = 0
    anchors_checked: int = 0
    broken_links: list[str] = field(default_factory=list)
    broken_anchors: list[str] = field(default_factory=list)
    missing_dossiers: list[str] = field(default_factory=list)
    missing_i18n_files: list[str] = field(default_factory=list)
    missing_case_files: list[str] = field(default_factory=list)
    case_structure_errors: list[str] = field(default_factory=list)
    case_url_parity_errors: list[str] = field(default_factory=list)
    site_bundle_errors: list[str] = field(default_factory=list)
    tco_hits: list[str] = field(default_factory=list)
    escaped_dollar_hits: list[str] = field(default_factory=list)
    highlight_hits: list[str] = field(default_factory=list)
    base_readme_urls: int = 0
    source_index_urls: int = 0
    missing_in_source_index: list[str] = field(default_factory=list)
    dossier_urls_not_in_index: list[str] = field(default_factory=list)
    i18n_url_parity: dict[str, dict[str, int | list[str]]] = field(default_factory=dict)
    evidence_counts: dict[str, int] = field(default_factory=dict)
    evidence_referenced: int = 0
    unreferenced_evidence: list[str] = field(default_factory=list)
    allow_missing_i18n: bool = False

    def error_count(self) -> int:
        errors = (
            len(self.broken_links)
            + len(self.broken_anchors)
            + len(self.missing_dossiers)
            + len(self.tco_hits)
            + len(self.escaped_dollar_hits)
            + len(self.highlight_hits)
            + len(self.missing_in_source_index)
            + len(self.dossier_urls_not_in_index)
            + len(self.unreferenced_evidence)
            + len(self.case_structure_errors)
            + len(self.case_url_parity_errors)
            + len(self.site_bundle_errors)
        )
        if not self.allow_missing_i18n:
            errors += len(self.missing_i18n_files) + len(self.missing_case_files)
            for info in self.i18n_url_parity.values():
                errors += len(info["missing"])  # type: ignore[arg-type]
        return errors


def strip_code(text: str) -> str:
    without_fenced = FENCED_CODE_RE.sub(lambda m: "\n" * m.group(0).count("\n"), text)
    return INLINE_CODE_RE.sub("", without_fenced)


def strip_fenced_only(text: str) -> str:
    return FENCED_CODE_RE.sub(lambda m: "\n" * m.group(0).count("\n"), text)


def line_number_at(text: str, pos: int) -> int:
    return text.count("\n", 0, pos) + 1


def github_heading_slug(raw_heading: str) -> str:
    text = re.sub(r"<[^>]+>", "", raw_heading)
    text = re.sub(r"!\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = text.replace("`", "").replace("*", "")
    out: list[str] = []
    for ch in text.strip().lower():
        if ch == " ":
            out.append("-")
        elif ch in ("-", "_"):
            out.append(ch)
        else:
            cat = unicodedata.category(ch)
            if cat[0] in ("L", "M", "N"):
                out.append(ch)
    return "".join(out)


def collect_document_anchors(raw_text: str) -> set[str]:
    no_fenced = strip_fenced_only(raw_text)
    anchors: set[str] = set()
    slug_counts: dict[str, int] = {}
    for m in ATX_HEADING_RE.finditer(no_fenced):
        base = github_heading_slug(m.group(1))
        if not base:
            continue
        idx = slug_counts.get(base, 0)
        slug_counts[base] = idx + 1
        anchors.add(base if idx == 0 else f"{base}-{idx}")
    for m in HTML_ID_RE.finditer(no_fenced):
        attr_id = m.group(1) if m.group(1) is not None else m.group(2)
        if attr_id:
            anchors.add(attr_id)
    return anchors


def extract_https_urls(text: str) -> set[str]:
    urls: set[str] = set()
    for match in HTTPS_URL_RE.findall(text):
        cleaned = match.rstrip(".,;:)")
        if cleaned:
            urls.add(cleaned)
    return urls


def clean_link_target(raw: str) -> str:
    target = raw.strip()
    if target.startswith("<") and ">" in target:
        target = target[1 : target.index(">")].strip()
    else:
        target = re.split(r'\s+["\']', target, maxsplit=1)[0].strip()
    return target


def is_external_scheme(target: str) -> bool:
    lower = target.lower()
    return not target or lower.startswith(
        ("http://", "https://", "mailto:", "tel:", "data:", "javascript:")
    )


def collect_markdown_files(repo_root: Path) -> list[Path]:
    return sorted(
        p
        for p in repo_root.rglob("*.md")
        if ".git" not in p.parts and "node_modules" not in p.parts
    )


def collect_evidence_files(repo_root: Path) -> set[str]:
    evidence_dir = repo_root / "evidence"
    if not evidence_dir.is_dir():
        return set()
    return {
        p.relative_to(repo_root).as_posix()
        for p in evidence_dir.rglob("*")
        if p.is_file()
    }


def verify_repo(repo_root: Path, allow_missing_i18n: bool) -> VerificationReport:
    report = VerificationReport(allow_missing_i18n=allow_missing_i18n)
    repo_resolved = repo_root.resolve()

    manifest_path = repo_root / "content" / "manifest.json"
    if not manifest_path.is_file():
        report.site_bundle_errors.append("Missing content/manifest.json")
        return report
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    expected_i18n_files = tuple(
        l["readmePath"] for l in manifest["languages"] if l["code"] != "en"
    )

    for rel in EXPECTED_DOSSIERS:
        if not (repo_root / rel).is_file():
            report.missing_dossiers.append(rel)

    for rel in expected_i18n_files:
        if not (repo_root / rel).is_file():
            report.missing_i18n_files.append(rel)

    # Check cases/<lang>/NN-*.md presence, section markers, and URL parity vs EN
    en_case_urls: dict[str, set[str]] = {}
    for c in manifest["cases"]:
        cid, slug = c["id"], c["slug"]
        en_path = repo_root / "cases" / "en" / f"{cid}-{slug}.md"
        if not en_path.is_file():
            report.missing_case_files.append(f"cases/en/{cid}-{slug}.md")
            continue
        en_txt = en_path.read_text(encoding="utf-8")
        en_case_urls[cid] = extract_https_urls(strip_fenced_only(en_txt))
        markers = SECTION_MARKER_RE.findall(en_txt)
        if markers != REQUIRED_MARKERS:
            report.case_structure_errors.append(
                f"cases/en/{cid}-{slug}.md: markers={markers}"
            )

    for lang in manifest["languages"]:
        code = lang["code"]
        if code == "en":
            continue
        for c in manifest["cases"]:
            cid, slug = c["id"], c["slug"]
            rel = f"cases/{code}/{cid}-{slug}.md"
            p = repo_root / rel
            if not p.is_file():
                report.missing_case_files.append(rel)
                continue
            txt = p.read_text(encoding="utf-8")
            markers = SECTION_MARKER_RE.findall(txt)
            if markers != REQUIRED_MARKERS:
                report.case_structure_errors.append(f"{rel}: markers={markers}")
            cand_urls = extract_https_urls(strip_fenced_only(txt))
            missing_u = sorted(en_case_urls.get(cid, set()) - cand_urls)
            if missing_u:
                report.case_url_parity_errors.append(
                    f"{rel}: missing {len(missing_u)} URLs from EN ({missing_u[0]})"
                )

    # Check canonical Temu3 + Tmail static site assets & threads.json attachments
    for req_file in (
        "site/index.html",
        "site/temu3.css",
        "site/temu3.js",
        "site/mail/index.html",
        "site/mail/styles.css",
        "site/mail/app.js",
        "site/mail/threads.json",
        "site/memes/index.html",
        "site/memes/memes.css",
        "site/memes/memes.js",
        "site/data/evidence.json",
        "site/data/memes.json",
    ):
        fp = repo_root / req_file
        if not fp.is_file():
            report.site_bundle_errors.append(f"Missing {req_file}")
        elif req_file.endswith(".json"):
            try:
                obj = json.loads(fp.read_text(encoding="utf-8"))
                if req_file == "site/mail/threads.json":
                    for th in obj.get("threads", []):
                        for m in th.get("messages", []):
                            for a in m.get("attachments", []):
                                src = str(a.get("src", "")).lstrip("./")
                                disk = (repo_root / "site" / src) if src.startswith("receipts/") else (repo_root / src)
                                if not disk.is_file():
                                    report.site_bundle_errors.append(
                                        f"site/mail/threads.json ({th.get('id')}): missing attachment {src}"
                                    )
            except Exception as exc:
                report.site_bundle_errors.append(f"Invalid JSON in {req_file}: {exc}")

    # Evidence inventory
    evidence_dir = repo_root / "evidence"
    if evidence_dir.is_dir():
        report.evidence_counts = {
            "root": sum(1 for p in evidence_dir.iterdir() if p.is_file()),
            "extra": sum(1 for p in (evidence_dir / "extra").iterdir() if p.is_file())
            if (evidence_dir / "extra").is_dir()
            else 0,
            "charts": sum(1 for p in (evidence_dir / "charts").iterdir() if p.is_file())
            if (evidence_dir / "charts").is_dir()
            else 0,
        }

    all_evidence_files = collect_evidence_files(repo_root)
    referenced_evidence: set[str] = set()

    md_files = collect_markdown_files(repo_root)
    report.markdown_files = [p.relative_to(repo_root).as_posix() for p in md_files]

    doc_texts: dict[Path, str] = {}
    doc_anchors: dict[Path, set[str]] = {}
    for md_path in md_files:
        raw_text = md_path.read_text(encoding="utf-8")
        resolved_md = md_path.resolve()
        doc_texts[resolved_md] = raw_text
        doc_anchors[resolved_md] = collect_document_anchors(raw_text)

    for md_path in md_files:
        rel_doc = md_path.relative_to(repo_root).as_posix()
        resolved_md = md_path.resolve()
        raw_text = doc_texts[resolved_md]
        no_fenced = strip_fenced_only(raw_text)
        prose_only = strip_code(raw_text)

        for m in TCO_RE.finditer(raw_text):
            ln = line_number_at(raw_text, m.start())
            report.tco_hits.append(f"{rel_doc}:{ln}: {m.group(0)}")

        for m in ESCAPED_DOLLAR_RE.finditer(no_fenced):
            ln = line_number_at(no_fenced, m.start())
            report.escaped_dollar_hits.append(f"{rel_doc}:{ln}: \\$")

        for m in HIGHLIGHT_RE.finditer(prose_only):
            ln = line_number_at(prose_only, m.start())
            report.highlight_hits.append(f"{rel_doc}:{ln}: {m.group(0)[:60]}")

        targets: list[tuple[int, str]] = []
        for m in MD_LINK_RE.finditer(prose_only):
            targets.append((line_number_at(prose_only, m.start()), clean_link_target(m.group(1))))
        for m in HTML_ATTR_RE.finditer(prose_only):
            attr_val = m.group(1) if m.group(1) is not None else m.group(2)
            targets.append((line_number_at(prose_only, m.start()), clean_link_target(attr_val)))

        for ln, target in targets:
            if is_external_scheme(target):
                continue
            if "#" in target:
                path_part, raw_fragment = target.split("#", 1)
                fragment = urllib.parse.unquote(raw_fragment.strip())
            else:
                path_part, fragment = target, ""
            rel_part = path_part.split("?", 1)[0]

            if not rel_part:
                if fragment:
                    report.anchors_checked += 1
                    if fragment not in doc_anchors[resolved_md]:
                        report.broken_anchors.append(f"{rel_doc}:{ln}: missing anchor -> #{fragment}")
                continue

            report.relative_links_checked += 1
            resolved = (md_path.parent / rel_part).resolve()
            try:
                rel_from_root = resolved.relative_to(repo_resolved)
            except ValueError:
                report.broken_links.append(f"{rel_doc}:{ln}: escapes repo root -> {target}")
                continue

            if not resolved.exists():
                report.broken_links.append(f"{rel_doc}:{ln}: missing target -> {target}")
                continue

            rel_posix = rel_from_root.as_posix()
            if rel_posix in all_evidence_files:
                referenced_evidence.add(rel_posix)

            if fragment and resolved in doc_anchors:
                report.anchors_checked += 1
                if fragment not in doc_anchors[resolved]:
                    report.broken_anchors.append(
                        f"{rel_doc}:{ln}: missing anchor in {rel_posix} -> #{fragment}"
                    )

    report.evidence_referenced = len(referenced_evidence)
    report.unreferenced_evidence = sorted(all_evidence_files - referenced_evidence)

    # URL coverage against COMPLETE-SOURCE-INDEX.md
    readme_path = repo_root / "README.md"
    source_index_path = repo_root / "docs" / "COMPLETE-SOURCE-INDEX.md"
    base_urls = (
        extract_https_urls(strip_fenced_only(readme_path.read_text(encoding="utf-8")))
        if readme_path.is_file()
        else set()
    )
    en_all_case_urls: set[str] = set()
    for urls in en_case_urls.values():
        en_all_case_urls |= urls

    index_urls = (
        extract_https_urls(strip_fenced_only(source_index_path.read_text(encoding="utf-8")))
        if source_index_path.is_file()
        else set()
    )
    report.base_readme_urls = len(base_urls | en_all_case_urls)
    report.source_index_urls = len(index_urls)
    report.missing_in_source_index = sorted(
        u for u in (base_urls | en_all_case_urls) - index_urls if not is_self_portal_url(u)
    )

    dossier_urls: set[str] = set()
    for rel in EXPECTED_DOSSIERS:
        dp = repo_root / rel
        if dp.is_file():
            dossier_urls |= extract_https_urls(strip_fenced_only(dp.read_text(encoding="utf-8")))
    report.dossier_urls_not_in_index = sorted(
        u for u in dossier_urls - index_urls if not is_self_portal_url(u)
    )

    base_non_portal = {u for u in base_urls if not is_self_portal_url(u)}
    for rel in expected_i18n_files:
        p = repo_root / rel
        if not p.is_file():
            continue
        lang_urls = {
            u for u in extract_https_urls(strip_fenced_only(p.read_text(encoding="utf-8")))
            if not is_self_portal_url(u)
        }
        missing = sorted(base_non_portal - lang_urls)
        report.i18n_url_parity[rel] = {"total": len(lang_urls), "missing": missing}

    return report


def format_report(report: VerificationReport) -> str:
    mode = "relaxed" if report.allow_missing_i18n else "strict"
    total_evidence = sum(report.evidence_counts.values())
    lines = [
        f"=== Repository Verification Report [{mode}] ===",
        f"Markdown files scanned : {len(report.markdown_files)}",
        f"Relative links checked : {report.relative_links_checked}",
        f"Internal anchors check : {report.anchors_checked}",
        (
            "Evidence inventory     : "
            f"root={report.evidence_counts.get('root', 0)}, "
            f"extra={report.evidence_counts.get('extra', 0)}, "
            f"charts={report.evidence_counts.get('charts', 0)} "
            f"(referenced={report.evidence_referenced}/{total_evidence})"
        ),
        f"Base + Case HTTPS URLs : {report.base_readme_urls}",
        f"Source Index HTTPS URLs: {report.source_index_urls}",
        "",
    ]

    def add_section(title: str, items: list[str]) -> None:
        if items:
            lines.append(f"[ERROR] {title} ({len(items)}):")
            for item in items[:30]:
                lines.append(f"  - {item}")
            if len(items) > 30:
                lines.append(f"  ... and {len(items) - 30} more")
            lines.append("")

    add_section("Missing dossiers", report.missing_dossiers)
    add_section("Missing i18n READMEs", report.missing_i18n_files)
    add_section("Missing localized case files", report.missing_case_files)
    add_section("Case section marker errors", report.case_structure_errors)
    add_section("Case URL parity errors", report.case_url_parity_errors)
    add_section("Site JSON / OG share page errors", report.site_bundle_errors)
    add_section("Broken relative links/images", report.broken_links)
    add_section("Broken heading/HTML anchors", report.broken_anchors)
    add_section("Unreferenced evidence/ assets", report.unreferenced_evidence)
    add_section("Shortened t.co links", report.tco_hits)
    add_section("Escaped dollar artifacts (\\$)", report.escaped_dollar_hits)
    add_section("Unrendered ==highlight== markers", report.highlight_hits)
    add_section("README/Case URLs missing in COMPLETE-SOURCE-INDEX.md", report.missing_in_source_index)
    add_section("Dossier URLs missing in COMPLETE-SOURCE-INDEX.md", report.dossier_urls_not_in_index)

    parity_issues = [
        (rel, info) for rel, info in sorted(report.i18n_url_parity.items()) if info["missing"]
    ]
    if parity_issues:
        lines.append(f"[ERROR] i18n README URL parity gaps ({len(parity_issues)}):")
        for rel, info in parity_issues:
            lines.append(f"  - {rel}: {info['total']} URLs, missing {len(info['missing'])}")
        lines.append("")

    errors = report.error_count()
    lines.append(f"Summary: {'PASS' if errors == 0 else 'FAIL'} (errors={errors})")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument("--allow-missing-i18n", action="store_true")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    report = verify_repo(args.root.resolve(), allow_missing_i18n=args.allow_missing_i18n)
    if args.json:
        print(json.dumps({"errors": report.error_count(), "markdown_files": len(report.markdown_files)}, indent=2))
    else:
        print(format_report(report))
    return 0 if report.error_count() == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
