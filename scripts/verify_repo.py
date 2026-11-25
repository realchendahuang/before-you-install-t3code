#!/usr/bin/env python3
"""Verify repository links, formatting hygiene, and external HTTPS URL coverage."""

from __future__ import annotations

import argparse
import json
import re
import sys
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

EXPECTED_I18N_FILES = (
    "docs/i18n/README.zh-CN.md",
    "docs/i18n/README.zh-TW.md",
    "docs/i18n/README.fr.md",
    "docs/i18n/README.es.md",
    "docs/i18n/README.ru.md",
    "docs/i18n/README.ar.md",
    "docs/i18n/README.ja.md",
    "docs/i18n/README.ko.md",
    "docs/i18n/README.de.md",
    "docs/i18n/README.pt-BR.md",
    "docs/i18n/README.it.md",
    "docs/i18n/README.nl.md",
    "docs/i18n/README.pl.md",
    "docs/i18n/README.tr.md",
    "docs/i18n/README.vi.md",
    "docs/i18n/README.id.md",
    "docs/i18n/README.hi.md",
)

FENCED_CODE_RE = re.compile(
    r"(?ms)^[ \t]{0,3}(`{3,}|~{3,})[^\n]*\n.*?^[ \t]{0,3}\1[ \t]*$"
)
INLINE_CODE_RE = re.compile(r"`+[^`\n]+?`+")
MD_LINK_RE = re.compile(r"!?\[[^\]]*\]\(([^()\n]+(?:\([^()\n]*\)[^()\n]*)*)\)")
HTML_ATTR_RE = re.compile(r"""(?:href|src)\s*=\s*(?:"([^"]+)"|'([^']+)')""", re.IGNORECASE)
HTTPS_URL_RE = re.compile(r"https://[^\s<>)\"'\`\]，。；！？、…]+")
TCO_RE = re.compile(r"(?:https?://)?t\.co/", re.IGNORECASE)
ESCAPED_DOLLAR_RE = re.compile(r"\\\$")
HIGHLIGHT_RE = re.compile(r"(?<!=)==(?=\S)([^=\n]*?\S)==(?!=)")


@dataclass
class VerificationReport:
    """Aggregates check metrics, errors, and non-blocking Wave 1 notices."""

    markdown_files: list[str] = field(default_factory=list)
    relative_links_checked: int = 0
    broken_links: list[str] = field(default_factory=list)
    pending_i18n_links: list[str] = field(default_factory=list)
    missing_dossiers: list[str] = field(default_factory=list)
    missing_i18n_files: list[str] = field(default_factory=list)
    tco_hits: list[str] = field(default_factory=list)
    escaped_dollar_hits: list[str] = field(default_factory=list)
    highlight_hits: list[str] = field(default_factory=list)
    base_readme_urls: int = 0
    source_index_urls: int = 0
    missing_in_source_index: list[str] = field(default_factory=list)
    dossier_urls_not_in_index: list[str] = field(default_factory=list)
    i18n_url_parity: dict[str, dict[str, int | list[str]]] = field(default_factory=dict)
    evidence_counts: dict[str, int] = field(default_factory=dict)
    allow_missing_i18n: bool = False

    def error_count(self) -> int:
        errors = (
            len(self.broken_links)
            + len(self.missing_dossiers)
            + len(self.tco_hits)
            + len(self.escaped_dollar_hits)
            + len(self.highlight_hits)
            + len(self.missing_in_source_index)
        )
        if not self.allow_missing_i18n:
            errors += len(self.missing_i18n_files)
            for info in self.i18n_url_parity.values():
                errors += len(info["missing"])  # type: ignore[arg-type]
        return errors


def strip_code(text: str) -> str:
    """Remove fenced code blocks and inline code spans while preserving line breaks."""
    without_fenced = FENCED_CODE_RE.sub(
        lambda m: "\n" * m.group(0).count("\n"), text
    )
    return INLINE_CODE_RE.sub("", without_fenced)


def strip_fenced_only(text: str) -> str:
    """Remove fenced code blocks while preserving line breaks."""
    return FENCED_CODE_RE.sub(lambda m: "\n" * m.group(0).count("\n"), text)


def line_number_at(text: str, pos: int) -> int:
    return text.count("\n", 0, pos) + 1


def extract_https_urls(text: str) -> set[str]:
    """Return unique canonicalized https:// URLs found in markdown text."""
    urls: set[str] = set()
    for match in HTTPS_URL_RE.findall(text):
        cleaned = match.rstrip(".,;:)")
        if cleaned:
            urls.add(cleaned)
    return urls


def clean_link_target(raw: str) -> str:
    """Extract target path/URL from markdown destination syntax."""
    target = raw.strip()
    if target.startswith("<") and ">" in target:
        target = target[1 : target.index(">")].strip()
    else:
        target = re.split(r'\s+["\']', target, maxsplit=1)[0].strip()
    return target


def is_external_or_anchor(target: str) -> bool:
    lower = target.lower()
    return (
        not target
        or target.startswith("#")
        or lower.startswith(("http://", "https://", "mailto:", "tel:", "data:", "javascript:"))
    )


def collect_markdown_files(repo_root: Path) -> list[Path]:
    files = [
        p
        for p in repo_root.rglob("*.md")
        if ".git" not in p.parts and "node_modules" not in p.parts
    ]
    return sorted(files)


def verify_repo(repo_root: Path, allow_missing_i18n: bool) -> VerificationReport:
    report = VerificationReport(allow_missing_i18n=allow_missing_i18n)
    i18n_expected_set = {(repo_root / rel).resolve() for rel in EXPECTED_I18N_FILES}

    for rel in EXPECTED_DOSSIERS:
        if not (repo_root / rel).is_file():
            report.missing_dossiers.append(rel)

    for rel in EXPECTED_I18N_FILES:
        if not (repo_root / rel).is_file():
            report.missing_i18n_files.append(rel)

    evidence_dir = repo_root / "evidence"
    if evidence_dir.is_dir():
        report.evidence_counts = {
            "root": sum(1 for p in evidence_dir.iterdir() if p.is_file()),
            "extra": sum(
                1 for p in (evidence_dir / "extra").iterdir() if p.is_file()
            )
            if (evidence_dir / "extra").is_dir()
            else 0,
            "charts": sum(
                1 for p in (evidence_dir / "charts").iterdir() if p.is_file()
            )
            if (evidence_dir / "charts").is_dir()
            else 0,
        }

    md_files = collect_markdown_files(repo_root)
    report.markdown_files = [p.relative_to(repo_root).as_posix() for p in md_files]

    for md_path in md_files:
        rel_doc = md_path.relative_to(repo_root).as_posix()
        raw_text = md_path.read_text(encoding="utf-8")
        no_fenced = strip_fenced_only(raw_text)
        prose_only = strip_code(raw_text)

        # (b) Forbidden artifacts
        for m in TCO_RE.finditer(raw_text):
            ln = line_number_at(raw_text, m.start())
            report.tco_hits.append(f"{rel_doc}:{ln}: {m.group(0)}")

        for m in ESCAPED_DOLLAR_RE.finditer(no_fenced):
            ln = line_number_at(no_fenced, m.start())
            report.escaped_dollar_hits.append(f"{rel_doc}:{ln}: \\$")

        for m in HIGHLIGHT_RE.finditer(prose_only):
            ln = line_number_at(prose_only, m.start())
            snippet = m.group(0)[:60]
            report.highlight_hits.append(f"{rel_doc}:{ln}: {snippet}")

        # (a) Relative Markdown and HTML links/images
        targets: list[tuple[int, str]] = []
        for m in MD_LINK_RE.finditer(prose_only):
            targets.append((line_number_at(prose_only, m.start()), clean_link_target(m.group(1))))
        for m in HTML_ATTR_RE.finditer(prose_only):
            attr_val = m.group(1) if m.group(1) is not None else m.group(2)
            targets.append((line_number_at(prose_only, m.start()), clean_link_target(attr_val)))

        for ln, target in targets:
            if is_external_or_anchor(target):
                continue
            rel_part = target.split("#", 1)[0].split("?", 1)[0]
            if not rel_part:
                continue
            report.relative_links_checked += 1
            resolved = (md_path.parent / rel_part).resolve()
            try:
                resolved.relative_to(repo_root.resolve())
            except ValueError:
                report.broken_links.append(
                    f"{rel_doc}:{ln}: escapes repository root -> {target}"
                )
                continue

            if not resolved.exists():
                if allow_missing_i18n and resolved in i18n_expected_set:
                    rel_target = resolved.relative_to(repo_root.resolve()).as_posix()
                    report.pending_i18n_links.append(f"{rel_doc}:{ln} -> {rel_target}")
                else:
                    report.broken_links.append(f"{rel_doc}:{ln}: missing target -> {target}")

    # (c) External HTTPS URL coverage against README.md / COMPLETE-SOURCE-INDEX.md
    readme_path = repo_root / "README.md"
    source_index_path = repo_root / "docs" / "COMPLETE-SOURCE-INDEX.md"
    base_urls = (
        extract_https_urls(strip_fenced_only(readme_path.read_text(encoding="utf-8")))
        if readme_path.is_file()
        else set()
    )
    index_urls = (
        extract_https_urls(strip_fenced_only(source_index_path.read_text(encoding="utf-8")))
        if source_index_path.is_file()
        else set()
    )
    report.base_readme_urls = len(base_urls)
    report.source_index_urls = len(index_urls)
    report.missing_in_source_index = sorted(base_urls - index_urls)

    # Check if dossiers introduce external URLs absent from COMPLETE-SOURCE-INDEX.md (advisory)
    dossier_urls: set[str] = set()
    for rel in EXPECTED_DOSSIERS:
        p = repo_root / rel
        if p.is_file():
            dossier_urls |= extract_https_urls(strip_fenced_only(p.read_text(encoding="utf-8")))
    report.dossier_urls_not_in_index = sorted(dossier_urls - index_urls)

    # Check i18n translation parity against base README.md
    for rel in EXPECTED_I18N_FILES:
        p = repo_root / rel
        if not p.is_file():
            continue
        lang_urls = extract_https_urls(strip_fenced_only(p.read_text(encoding="utf-8")))
        missing = sorted(base_urls - lang_urls)
        report.i18n_url_parity[rel] = {
            "total": len(lang_urls),
            "missing": missing,
        }

    return report


def format_report(report: VerificationReport) -> str:
    mode = "wave1 (--allow-missing-i18n)" if report.allow_missing_i18n else "strict"
    lines: list[str] = [
        f"=== Repository Verification Report [{mode}] ===",
        f"Markdown files scanned : {len(report.markdown_files)}",
        f"Relative links checked : {report.relative_links_checked}",
        (
            "Evidence inventory     : "
            f"root={report.evidence_counts.get('root', 0)}, "
            f"extra={report.evidence_counts.get('extra', 0)}, "
            f"charts={report.evidence_counts.get('charts', 0)}"
        ),
        f"Base README HTTPS URLs : {report.base_readme_urls}",
        f"Source Index HTTPS URLs: {report.source_index_urls}",
        "",
    ]

    def add_section(title: str, items: list[str], label: str = "ERROR") -> None:
        if items:
            lines.append(f"[{label}] {title} ({len(items)}):")
            for item in items:
                lines.append(f"  - {item}")
            lines.append("")

    add_section("Missing dossiers", report.missing_dossiers)
    add_section("Broken relative links/images", report.broken_links)
    add_section("Shortened t.co links", report.tco_hits)
    add_section("Escaped dollar artifacts (\\$)", report.escaped_dollar_hits)
    add_section("Unrendered ==highlight== markers", report.highlight_hits)
    add_section("Base README URLs missing in COMPLETE-SOURCE-INDEX.md", report.missing_in_source_index)

    if report.dossier_urls_not_in_index:
        lines.append(
            f"[INFO] Dossier HTTPS URLs not in COMPLETE-SOURCE-INDEX.md ({len(report.dossier_urls_not_in_index)}):"
        )
        for u in report.dossier_urls_not_in_index[:25]:
            lines.append(f"  - {u}")
        if len(report.dossier_urls_not_in_index) > 25:
            lines.append(f"  ... and {len(report.dossier_urls_not_in_index) - 25} more")
        lines.append("")

    i18n_label = "PENDING-WAVE2" if report.allow_missing_i18n else "ERROR"
    if report.missing_i18n_files:
        lines.append(
            f"[{i18n_label}] Missing docs/i18n/ editions ({len(report.missing_i18n_files)}):"
        )
        for item in report.missing_i18n_files:
            lines.append(f"  - {item}")
        lines.append("")

    if report.pending_i18n_links:
        unique_targets = sorted({p.split(" -> ")[-1] for p in report.pending_i18n_links})
        lines.append(
            f"[PENDING-WAVE2] Links to unbuilt docs/i18n/ targets ({len(report.pending_i18n_links)} refs across {len(unique_targets)} targets):"
        )
        for item in unique_targets:
            lines.append(f"  - {item}")
        lines.append("")

    parity_issues = [
        (rel, info)
        for rel, info in sorted(report.i18n_url_parity.items())
        if info["missing"]
    ]
    if parity_issues:
        lines.append(
            f"[{i18n_label}] Existing docs/i18n/ editions behind base README.md URL set ({len(parity_issues)}):"
        )
        for rel, info in parity_issues:
            missing_list: list[str] = info["missing"]  # type: ignore[assignment]
            lines.append(
                f"  - {rel}: {info['total']} URLs present, {len(missing_list)} missing from base README.md"
            )
        lines.append("")

    errors = report.error_count()
    lines.append(f"Summary: {'PASS' if errors == 0 else 'FAIL'} (errors={errors})")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--root",
        type=Path,
        default=Path(__file__).resolve().parent.parent,
        help="Repository root directory",
    )
    parser.add_argument(
        "--allow-missing-i18n",
        action="store_true",
        help="Allow pending Wave-2 docs/i18n/ files and i18n URL parity lag during Wave 1 checks",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print JSON report instead of plain text summary",
    )
    args = parser.parse_args()

    report = verify_repo(args.root.resolve(), allow_missing_i18n=args.allow_missing_i18n)
    if args.json:
        print(
            json.dumps(
                {
                    "mode": "wave1" if args.allow_missing_i18n else "strict",
                    "errors": report.error_count(),
                    "markdown_files": report.markdown_files,
                    "relative_links_checked": report.relative_links_checked,
                    "evidence_counts": report.evidence_counts,
                    "broken_links": report.broken_links,
                    "missing_dossiers": report.missing_dossiers,
                    "missing_i18n_files": report.missing_i18n_files,
                    "pending_i18n_links": report.pending_i18n_links,
                    "tco_hits": report.tco_hits,
                    "escaped_dollar_hits": report.escaped_dollar_hits,
                    "highlight_hits": report.highlight_hits,
                    "base_readme_urls": report.base_readme_urls,
                    "source_index_urls": report.source_index_urls,
                    "missing_in_source_index": report.missing_in_source_index,
                    "dossier_urls_not_in_index": report.dossier_urls_not_in_index,
                    "i18n_url_parity": report.i18n_url_parity,
                },
                indent=2,
                ensure_ascii=False,
            )
        )
    else:
        print(format_report(report))

    return 0 if report.error_count() == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
