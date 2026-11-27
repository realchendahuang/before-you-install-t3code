# #11 · Nov 25 Clarification Contradicted Within 2 Hours by Overnight PRs & 100 MB Dump

> On the morning of November 25, @theo made three sweeping privacy assurances and released a 100 MB telemetry dump — all three claims were contradicted within two hours by his own team's PRs and the gzipped dump itself.

<!-- section:claim -->
## What Was Claimed

In his November 25 morning clarification ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) and follow-up reply ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)), `@theo` assured users:
- T3 Code *"never collected file paths."*
- Environment variables *"always disabled telemetry cleanly."*
- Opted-out installs write zero local tracking files, and Claude owner hashes were *"broken."*

<!-- section:evidence -->
## What the Evidence Shows

- **Contradiction 1 — `git.cwd` absolute workspace path leaks (`PR #42450`):** Roughly 90 minutes after the post, core maintainer Julius merged [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450), admitting relay-delivered webhook runs exported entire execution spans to Axiom — including Git spans containing `git.cwd` (**full absolute workspace path, OS username, and repository name**).
- **Contradiction 2 — Broken Windows & macOS opt-outs (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) admitted Windows desktop ignored saved `T3CODE_TELEMETRY_ENABLED=false` user environment variables when launched from pre-existing processes. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) admitted macOS/Linux first-launch relay tracing initialized before shell discovery, ignoring `~/.zshrc` opt-outs for the entire session.
- **Contradiction 3 — Unconditional disk writes & 264 live Claude records in `events.clean.jsonl`:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` at `ca81b7b9`) still calls `getTelemetryIdentity` unconditionally on startup, writing the local install UUID (`upsertAnonymousId`) before checking `telemetryEnabled`. Meanwhile, the gzip header of `@theo`'s public export (`6,056,594` bytes compressed, `95,789` events) showed an original filename `events.clean.jsonl` generated 20 minutes before posting — yet it still contained **264 live Claude owner records** stitching **4 separate machines** (`installId`s) to one SHA-256 hash alongside verbatim private proxy models (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## Upstream Status (`ca81b7b9`)

- **Partially patched:** `PR #42450`, `PR #42376`, and `PR #42464` merged overnight.
- **Still open:** `AnalyticsService.ts:156` still writes the local anonymous ID unconditionally before checking opt-outs, and `DesktopShellEnvironment.ts` still omits forwarding `T3CODE_OTEL_SDK_DISABLED` and `OTEL_SDK_DISABLED`.

<!-- section:visuals -->
## Visual Evidence

![PR #42450 admitting relay-triggered runs exported git.cwd absolute workspace paths to Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 admitting Windows desktop ignored saved T3CODE_TELEMETRY_ENABLED=false env vars](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 admitting macOS first-launch relay tracing ignored ~/.zshrc opt-outs](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Forensic audit of events.clean.jsonl revealing 264 Claude records linking 4 machines and private proxy model IDs](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Primary Sources

- [Original X Investigation (Part 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [`@theo` Nov 25 clarification (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [Follow-up reply (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [Public gzipped dump](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Deep Technical Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
