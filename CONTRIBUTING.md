# Contributing

This repository is an independent, evidence-first public-record investigation of `pingdotgg/t3code` (T3 Code). Pull requests and structured issue reports are welcome — especially for:

1. **Verifiable Status Updates:** If an issue or vulnerability documented here is fixed and verified in a public commit or pull request on `pingdotgg/t3code`, submit a PR or open an [Upstream Fix / Status Update](./.github/ISSUE_TEMPLATE/upstream-fix-update.yml) issue with the commit/PR URL.
2. **Additional Primary Evidence (`#20`, `#21`, …):** New telemetry, security, governance, or public-record exhibits must cite canonical, publicly verifiable URLs (GitHub commits, PRs, issues, source line links, official docs, USPTO TSDR records, or archived public posts). Private-message reports or uncorroborated allegations are kept separate from the numbered `#00`–`#19+` primary archive.
3. **18-Language Translations:** Improvements to any of the 18 language editions (6 UN official languages + 12 global community editions) are welcome via PR or [Translation Fix](./.github/ISSUE_TEMPLATE/translation-fix.yml).

## Single-Source Repository Architecture

To guarantee readability and keep all **18 languages** permanently in sync across GitHub Markdown and the interactive GitHub Pages portal:

- [`content/manifest.json`](./content/manifest.json) — Master metadata registry (18 languages, 4 thematic chapters, numbered exhibits `#00`–`#19+`, upstream commits).
- [`content/evidence.json`](./content/evidence.json) — Structured catalog of all **109** primary visual receipts & forensic charts under `evidence/`.
- [`content/ui/<lang>.json`](./content/ui/en.json) — Localized UI strings, chapter summaries, story arc, and hardening steps across all 18 languages.
- [`cases/<lang>/NN-<slug>.md`](./cases/en/00-origin-fork-dispute-and-double-standard.md) — **Markdown single source of truth** for every numbered exhibit (`#00`–`#19+`), written in clean, table-free magazine prose with invisible `<!-- section:... -->` structural markers.
- [`README.md`](./README.md) & [`docs/i18n/README.<lang>.md`](./docs/i18n/README.zh-CN.md) — Clean, table-free 18-language front doors **generated directly** from `cases/<lang>/` and `content/ui/<lang>.json` via `scripts/build_portal.py`.
- [`site/`](./site/index.html) — Zero-tracker static GitHub Pages interactive visual portal (Claude editorial typography & reading workspace) supporting all **18 languages** (including RTL Arabic), lazy-loaded JSON bundles (`site/data/<lang>.json`), embedded 1,151-tweet interactive charts, a searchable 109-receipt lightbox archive, and per-exhibit static OpenGraph / Twitter Card share pages (`site/c/NN/` & `site/c/zh/NN/`).
- [`docs/dossiers/`](./docs/dossiers/01-telemetry-and-gdpr-timeline.md), [`docs/EVIDENCE-INDEX.md`](./docs/EVIDENCE-INDEX.md), [`docs/COMPLETE-SOURCE-INDEX.md`](./docs/COMPLETE-SOURCE-INDEX.md), and [`docs/community/`](./docs/community/issue-1-the-case-against-theo.md) — Preserved deep technical reference dossiers, master catalogs, and separated community commentary.

## How to Add a New Exhibit (`#20`, `#21`, …)

```bash
# 1. Scaffold metadata + English & Simplified Chinese Markdown templates
python3 scripts/new_case.py \
  --id 20 \
  --slug "short-descriptive-slug" \
  --act act3 \
  --status open \
  --severity critical \
  --hero "evidence/extra/your-screenshot.png" \
  --x-post "https://x.com/..."

# 2. Polish cases/en/20-*.md and cases/zh-CN/20-*.md, and add new URLs to docs/COMPLETE-SOURCE-INDEX.md

# 3. Batch-translate Exhibit #20 across the remaining 16 languages with automated URL/marker validation
python3 scripts/translate_i18n.py --only-case 20 -j 8

# 4. Rebuild all 18 READMEs, 18 lazy site JSON bundles, and OG share pages
python3 scripts/build_portal.py

# 5. Run strict CI verification (must exit 0 with 0 errors)
python3 scripts/verify_repo.py
```

## Editorial & Verification Rules

- **Zero shortened redirect URLs** (`t.co` links are blocked by CI).
- **Zero private contact details** or doxxing.
- **100% evidence accounting:** Every file under `evidence/` must be indexed and referenced.
- **100% URL parity:** Every localized exhibit under `cases/<lang>/` must preserve the exact canonical URLs and image paths of its English source.
