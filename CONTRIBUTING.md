# Contributing

This repository (`realchendahuang/temu3code`) is an independent, evidence-first public-record archive of `pingdotgg/t3code` (T3 Code), published live at **https://temu3code.com/**. Pull requests and structured issue reports are welcome — especially for:

1. **Verifiable Status Updates:** If an issue or vulnerability documented here is fixed and verified in a public commit or pull request on `pingdotgg/t3code`, submit a PR or open an [Upstream Fix / Status Update](./.github/ISSUE_TEMPLATE/upstream-fix-update.yml) issue with the commit/PR URL.
2. **Additional Primary Evidence (`#20`, `#21`, …):** New telemetry, security, governance, or public-record exhibits must cite canonical, publicly verifiable URLs (GitHub commits, PRs, issues, source line links, official docs, USPTO TSDR records, or archived public posts). Private-message reports or uncorroborated allegations are kept separate from the numbered `#00`–`#19+` primary archive.
3. **18-Language Translations:** Improvements to any of the **18 equal language editions** across both GitHub Markdown (`cases/<lang>/`, `docs/i18n/README.<lang>.md`) and the live website (`site/data/i18n/<lang>.json`) are welcome via PR or [Translation Fix](./.github/ISSUE_TEMPLATE/translation-fix.yml).
4. **Community Memes & Satire Cards:** New CC0 1.0 satire cards can be submitted via GitHub Issue or PR and published to Cloudflare R2 (`cdn.temu3code.com`) via `scripts/publish_memes.py`.

## Repository Architecture

All **18 languages** stay aligned across GitHub Markdown and the static **https://temu3code.com/** site:

- [`content/manifest.json`](./content/manifest.json) — Master metadata registry (18 languages, 4 thematic chapters, numbered exhibits `#00`–`#19+`, upstream commits).
- [`content/evidence.json`](./content/evidence.json) — Structured catalog of all **109** primary visual receipts & forensic charts under `evidence/`.
- [`cases/<lang>/NN-<slug>.md`](./cases/en/00-origin-fork-dispute-and-double-standard.md) — **Markdown single source of truth** for every numbered exhibit (`#00`–`#19+`), written in clean, table-free prose with `<!-- section:... -->` structural markers.
- [`README.md`](./README.md) & [`docs/i18n/README.<lang>.md`](./docs/i18n/README.zh-CN.md) — 18 equal-footing front doors linking directly to `temu3code.com`, `/mail/`, `/#x-receipts`, and `/memes/` in the reader's language.
- [`site/`](./site/index.html) — Zero-telemetry static website deployed to **https://temu3code.com/** (Cloudflare Pages + GitHub Pages mirror):
  - [`site/index.html`](./site/index.html) — Temu3 Code homepage (`#x-receipts` 12 original X captures, 6 verified code/privacy facts, and 19 Sins collector showcase).
  - [`site/mail/index.html`](./site/mail/index.html) — **Tmail** interactive public-record inbox (`34` threads, 2023–2026 chronological sort, `TPhotos` 109 receipts, `TDrive` 6 dossiers, `TCal` 1,151-tweet charts).
  - [`site/memes/index.html`](./site/memes/index.html) — **Meme Arsenal** backed by edge-cached Cloudflare R2 (`cdn.temu3code.com`) and [`site/data/memes.json`](./site/data/memes.json).
  - [`site/data/i18n/<lang>.json`](./site/data/i18n/en.json) & [`site/data/i18n.js`](./site/data/i18n.js) — Shared 18-language UI translation bundles (including RTL Arabic).
- [`docs/dossiers/`](./docs/dossiers/01-telemetry-and-gdpr-timeline.md), [`docs/EVIDENCE-INDEX.md`](./docs/EVIDENCE-INDEX.md), [`docs/COMPLETE-SOURCE-INDEX.md`](./docs/COMPLETE-SOURCE-INDEX.md), and [`docs/community/`](./docs/community/issue-1-the-case-against-theo.md) — Deep technical reference dossiers, master catalogs, and separated community commentary.

## How to Add a New Exhibit (`#20`, `#21`, …) or New Memes

```bash
# 1. Scaffold English & Simplified Chinese Markdown exhibit templates
python3 scripts/new_case.py \
  --id 20 \
  --slug "short-descriptive-slug" \
  --act act3 \
  --status open \
  --severity critical \
  --hero "evidence/extra/your-screenshot.png" \
  --x-post "https://x.com/..."

# 2. Polish cases/en/20-*.md and cases/zh-CN/20-*.md, add URLs to docs/COMPLETE-SOURCE-INDEX.md,
#    and add the matching thread to site/mail/threads.json

# 3. Publish new memes (converts to WebP, syncs to R2, refreshes site/data/memes.json)
python3 scripts/publish_memes.py

# 4. Run strict CI verification (must exit 0 with 0 errors)
python3 scripts/verify_repo.py
```

## Editorial & Verification Rules

- **Zero shortened redirect URLs** (`t.co` links are blocked by CI).
- **Zero private contact details** or doxxing.
- **100% evidence accounting:** Every file under `evidence/` must be indexed and referenced.
- **100% URL parity:** Every localized exhibit under `cases/<lang>/` must preserve the exact canonical URLs and image paths of its English source.
