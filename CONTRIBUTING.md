# Contributing

This repository is an evidence-backed, public-record audit of `pingdotgg/t3code` (T3 Code). Pull requests and structured issue reports are welcome—especially for:

1. **Verifiable Status Updates:** If an issue or vulnerability documented here is properly fixed and verified in a public commit or pull request on `pingdotgg/t3code`, please submit a PR or use the [Upstream Fix / Status Update](./.github/ISSUE_TEMPLATE/upstream-fix-update.yml) issue form with the fix commit/PR link and verification details.
2. **Additional Primary Evidence:** Any new telemetry, security, or compliance finding must include direct, verifiable primary URLs (GitHub commits, PRs, issues, source line links, official docs, or archived public records) via PR or the [New Primary Evidence](./.github/ISSUE_TEMPLATE/new-evidence.yml) issue form.
3. **Translations:** Improvements to the six United Nations official language editions or any of the 12 Global Community Editions under [`docs/i18n/`](./docs/i18n/README.zh-CN.md) (18 languages total including the root English edition) are welcome via PR or the [Translation Fix](./.github/ISSUE_TEMPLATE/translation-fix.yml) issue form.

## Repository Structure

### Root, Indexes, Evidence Assets & Static Pages Viewer

- [`README.md`](./README.md) — Flagship English audit portal summarizing all 18 findings, timeline, mitigation steps, and primary links.
- [`docs/COMPLETE-SOURCE-INDEX.md`](./docs/COMPLETE-SOURCE-INDEX.md) — Master tabular index of all direct primary URLs across the root portal, all six deep-dive dossiers, and the primary-source archive.
- [`docs/EVIDENCE-INDEX.md`](./docs/EVIDENCE-INDEX.md) — Complete catalog of all **108** visual assets under `evidence/` (`28` root curated screenshots/covers including `00-cover-zh.png` and `25-double-standard-chart-zh.png` for Chinese editions, `4` forensic charts in `evidence/charts/`, and `76` extended screenshots in `evidence/extra/`).
- [`docs/community/issue-1-the-case-against-theo.md`](./docs/community/issue-1-the-case-against-theo.md) — Verbatim archive of community commentary submitted via Issue #1 (`@opserx`).
- `evidence/` — Losslessly optimized PNG and JPEG visual receipts (`evidence/`, `evidence/charts/`, `evidence/extra/`). Every file under `evidence/` must be referenced by the repository's Markdown documentation.
- [`site/`](./site/index.html) — Zero-tracker static GitHub Pages portal (`site/index.html`, `site/styles.css`, `site/app.js`, and interactive dark-themed forensic charts under `site/charts/`) featuring a filterable risk matrix, interactive 1,151-tweet charts, a 108-receipt lightbox gallery, and copy-paste mitigation commands. Deployed via [`.github/workflows/pages.yml`](./.github/workflows/pages.yml), which stages `site/` alongside `evidence/` without duplicating image bytes.

### Deep Forensic Dossiers (`docs/dossiers/`)

Detailed technical, financial, and quantitative documentation is organized into six dedicated dossiers:

1. [`docs/dossiers/01-telemetry-and-gdpr-timeline.md`](./docs/dossiers/01-telemetry-and-gdpr-timeline.md) — Default PostHog telemetry, `ingest.t3.codes`, cross-tool SHA-256 identification (`Identify.ts`), Managed Policy gaps, the Nov 24–25 post-GDPR overnight sprint, and post-audit upstream tracking.
2. [`docs/dossiers/02-local-safety-and-security-audit.md`](./docs/dossiers/02-local-safety-and-security-audit.md) — `statev2.sqlite` retention, `t3-resource-monitor` process scanning, Claude Auto silent `git push --force`, silent security patches, and `SECURITY.md` boundaries.
3. [`docs/dossiers/03-antigravity-tos-and-t3connect-relay.md`](./docs/dossiers/03-antigravity-tos-and-t3connect-relay.md) — Google Antigravity `v1internal` header and `SSH_CONNECTION` spoofing, fresh account bans, and T3 Connect missing end-to-end encryption.
4. [`docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md`](./docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md) — $800k+ spend, 31.7T-token telemetry radar, investor/sponsor overlaps, CLIProxyAPI contradictions, and the `driver.ts` 77k-star toast funnel.
5. [`docs/dossiers/05-governance-trademark-and-history.md`](./docs/dossiers/05-governance-trademark-and-history.md) — `yolo merges` vs. `CONTRIBUTING.md`/`.github/VOUCHED.td`, fork-scraping `@bot`, USPTO/GitHub trademark record, and historical incidents.
6. [`docs/dossiers/06-tweet-forensic-dataset-1151.md`](./docs/dossiers/06-tweet-forensic-dataset-1151.md) — Quantitative methodology, cadence, tone asymmetry, and embedded PNG charts across 1,151 `@theo` X posts (Nov 7–24, 2026).

### 18-Language Documentation Tree (`docs/i18n/`)

The audit portal maintains an 18-language tree covering the six United Nations official languages and 12 Global Community Editions:

- **United Nations Official Languages (6):**
  - English: [`./README.md`](./README.md)
  - 简体中文: [`./docs/i18n/README.zh-CN.md`](./docs/i18n/README.zh-CN.md)
  - Français: [`./docs/i18n/README.fr.md`](./docs/i18n/README.fr.md)
  - Español: [`./docs/i18n/README.es.md`](./docs/i18n/README.es.md)
  - Русский: [`./docs/i18n/README.ru.md`](./docs/i18n/README.ru.md)
  - العربية: [`./docs/i18n/README.ar.md`](./docs/i18n/README.ar.md)
- **Global Community Editions (12):**
  - 繁體中文: [`./docs/i18n/README.zh-TW.md`](./docs/i18n/README.zh-TW.md)
  - 日本語: [`./docs/i18n/README.ja.md`](./docs/i18n/README.ja.md)
  - 한국어: [`./docs/i18n/README.ko.md`](./docs/i18n/README.ko.md)
  - Deutsch: [`./docs/i18n/README.de.md`](./docs/i18n/README.de.md)
  - Português: [`./docs/i18n/README.pt-BR.md`](./docs/i18n/README.pt-BR.md)
  - Italiano: [`./docs/i18n/README.it.md`](./docs/i18n/README.it.md)
  - Nederlands: [`./docs/i18n/README.nl.md`](./docs/i18n/README.nl.md)
  - Polski: [`./docs/i18n/README.pl.md`](./docs/i18n/README.pl.md)
  - Türkçe: [`./docs/i18n/README.tr.md`](./docs/i18n/README.tr.md)
  - Tiếng Việt: [`./docs/i18n/README.vi.md`](./docs/i18n/README.vi.md)
  - Bahasa Indonesia: [`./docs/i18n/README.id.md`](./docs/i18n/README.id.md)
  - हिन्दी: [`./docs/i18n/README.hi.md`](./docs/i18n/README.hi.md)

When updating or adding translations inside `docs/i18n/`, adjust relative asset and cross-document paths for depth (for example, `../../evidence/...`, `../dossiers/...`, `../COMPLETE-SOURCE-INDEX.md`, `../EVIDENCE-INDEX.md`, and `../../README.md`).

### Issue Templates (`.github/ISSUE_TEMPLATE/`)

Structured YAML issue forms route community contributions cleanly:

- [`.github/ISSUE_TEMPLATE/config.yml`](./.github/ISSUE_TEMPLATE/config.yml) — Disables blank issues and directs general questions back to this guide.
- [`.github/ISSUE_TEMPLATE/upstream-fix-update.yml`](./.github/ISSUE_TEMPLATE/upstream-fix-update.yml) — Reports verified upstream fixes or status changes in `pingdotgg/t3code` (requires affected dossier/section, canonical fix PR/commit URL, and verification details).
- [`.github/ISSUE_TEMPLATE/new-evidence.yml`](./.github/ISSUE_TEMPLATE/new-evidence.yml) — Submits new primary-source findings (requires target domain, canonical `https://` URLs, and reproducible steps or line references).
- [`.github/ISSUE_TEMPLATE/translation-fix.yml`](./.github/ISSUE_TEMPLATE/translation-fix.yml) — Reports translation or link-parity issues across the 17 `docs/i18n/` editions and `README.md`.

## Ground Rules

- **Primary sources only:** No rumors, speculation, or unverified claims.
- **No personal information or harassment:** Keep all entries strictly focused on shipped software behavior, repository documentation, governance policies, and verifiable public statements. Never submit private addresses, phone numbers, or personal contact data.
- **Preserve all URLs verbatim:** When translating, never modify, shorten, or drop any GitHub, USPTO, YouTube, or X source URL.
- **Canonical direct URLs only:** Never commit X redirect shortlinks; always expand links to their direct canonical `https://` target.
- **Clean Markdown formatting:** Avoid backslash-escaped currency dollar signs and unrendered double-equals highlight syntax.

## Automated Verification

Every push to `main` and every pull request runs [`.github/workflows/verify.yml`](./.github/workflows/verify.yml), which executes `scripts/verify_repo.py`. Before opening a pull request, run the repository verification script locally:

```bash
# Full strict check (required in CI: links, anchors, evidence/, dossiers -> source index, and all 17 i18n editions)
python3 scripts/verify_repo.py

# Staged English/dossier check (allows pending docs/i18n/ editions during staged drafting)
python3 scripts/verify_repo.py --allow-missing-i18n
```

`scripts/verify_repo.py` enforces:

1. **Relative Links & Images:** Every relative Markdown and HTML `href`/`src` target resolves cleanly inside the repository.
2. **Internal `#anchor` Validation:** Every same-file and cross-file `#anchor` link resolves against GitHub Unicode heading slugs (`L`, `M`, `N`, `-`, `_`, spaces → `-`, lowercase, with duplicate-heading suffixes) or explicit HTML `id="..."` attributes.
3. **100% `evidence/` Asset Coverage:** Every image file under `evidence/` is referenced by the repository's Markdown documentation (`0` unreferenced assets).
4. **Formatting & Link Hygiene:** Zero X redirect shortlinks, zero backslash-escaped currency dollar signs outside fenced code blocks, and zero unrendered double-equals highlight markers.
5. **External URL Parity:** Every `https://` URL in `README.md` and **all** `docs/dossiers/*.md` files is cataloged in `docs/COMPLETE-SOURCE-INDEX.md`, and all 17 `docs/i18n/` editions match the base `README.md` URL set.
