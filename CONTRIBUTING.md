# Contributing

This repository is an evidence-backed, public-record audit of `pingdotgg/t3code` (T3 Code). Pull requests are welcome—especially for:

1. **Verifiable Status Updates:** If an issue or vulnerability documented here is properly fixed and verified in a public commit or pull request on `pingdotgg/t3code`, please open a PR adding the fix commit/PR link and date.
2. **Additional Primary Evidence:** Any new telemetry, security, or compliance finding must include direct, verifiable primary URLs (GitHub commits, PRs, issues, source line links, official docs, or archived public records).
3. **Translations:** Improvements to the six United Nations official language editions or any of the 12 Global Community Editions under [`docs/i18n/`](./docs/i18n/README.zh-CN.md) (18 languages total including the root English edition) are very welcome.

## Repository Structure

### Root & Evidence Assets

- [`README.md`](./README.md) — Flagship English audit portal summarizing all 18 findings, timeline, mitigation steps, and primary links.
- [`docs/COMPLETE-SOURCE-INDEX.md`](./docs/COMPLETE-SOURCE-INDEX.md) — Master tabular index of all direct primary URLs across the audit and primary-source archive.
- `evidence/` — Root curated screenshots (`00-*` through `26-*`), extended primary screenshots (`evidence/extra/`), and forensic dataset charts (`evidence/charts/`).

### Deep Forensic Dossiers (`docs/dossiers/`)

Detailed technical, financial, and quantitative documentation is organized into six dedicated dossiers:

1. [`docs/dossiers/01-telemetry-and-gdpr-timeline.md`](./docs/dossiers/01-telemetry-and-gdpr-timeline.md) — Default PostHog telemetry, `ingest.t3.codes`, cross-tool SHA-256 identification (`Identify.ts`), Managed Policy gaps, and the Nov 24–25 post-GDPR overnight sprint.
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

When updating or adding translations inside `docs/i18n/`, adjust relative asset and cross-document paths for depth (for example, `../../evidence/...`, `../dossiers/...`, `../COMPLETE-SOURCE-INDEX.md`, and `../../README.md`).

## Ground Rules

- **Primary sources only:** No rumors, speculation, or unverified claims.
- **No personal information or harassment:** Keep all entries strictly focused on shipped software behavior, repository documentation, governance policies, and verifiable public statements. Never submit private addresses, phone numbers, or personal contact data.
- **Preserve all URLs verbatim:** When translating, never modify, shorten, or drop any GitHub, USPTO, YouTube, or X source URL.
- **Canonical direct URLs only:** Never commit X redirect shortlinks; always expand links to their direct canonical `https://` target.
- **Clean Markdown formatting:** Avoid backslash-escaped currency dollar signs and unrendered double-equals highlight syntax.

## Automated Verification

Before opening a pull request, run the repository verification script:

```bash
# Full strict check (all 17 docs/i18n/ translations + URL parity required)
python3 scripts/verify_repo.py

# Staged English/dossier check (allows pending Wave-2 docs/i18n/ translations)
python3 scripts/verify_repo.py --allow-missing-i18n
```

The checker validates relative Markdown and HTML links/images, bans X redirect shortlinks and formatting artifacts, and verifies external `https://` URL coverage across `README.md`, `docs/COMPLETE-SOURCE-INDEX.md`, and `docs/i18n/`.
