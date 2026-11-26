# #01 · Default Telemetry Behind a "No Telemetry" Homepage Promise

> While its homepage promised "No telemetry. Unless you opt in. Full stop.", T3 Code enabled default PostHog tracking, routed raw copies through closed-source `ingest.t3.codes`, hashed external `~/.codex` and `~/.claude.json` credentials, and rejected four community opt-out PRs.

<!-- section:claim -->
## What Was Claimed

- The T3 Code homepage prominently promised: *"No telemetry / Unless you opt in. Full stop."*
- Presented publicly as a privacy-first, open-source local AI coding client.

<!-- section:evidence -->
## What the Evidence Shows

- **Default tracking shipped under the "No telemetry" pledge (`PR #174` → `3bdaa6e1`):** On March 6, 2026, [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) enabled default-on PostHog analytics with no consent dialog, no settings UI toggle, and no telemetry documentation. Over three months later, on June 18, [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) silently deleted the *"No telemetry"* homepage promise during a redesign with zero user notice.
- **Closed-source first-party retention (`PR #15028`):** In October 2026, telemetry batches (`FLUSH_INTERVAL_MS = 10_000`) were routed through T3's closed-source endpoint [`https://ingest.t3.codes/`](https://ingest.t3.codes/). Line 1 of `AnalyticsService.ts` confirms the server retains a raw copy of every event before forwarding to PostHog.
- **Cross-tool credential reading & unsalted SHA-256 (`PR #21506`):** Baseline `9d3195b4` `Identify.ts` read `~/.codex/auth.json` (decoding OpenAI's `user_id` JWT claim) and `~/.claude.json` (`oauthAccount.accountUuid`) alongside T3 Connect user IDs, computing unsalted SHA-256 digests (`telemetryId.ts`) to link separate machines back to one person. Because T3 holds plaintext Clerk IDs, unsalted digests reverse deterministically.
- **Granular usage capture:** `ProviderUsageAnalytics.ts` and `FeatureUsage.ts` reported providers, custom models, reasoning effort, permission mode, token counts, project/thread counts, OS/WSL metadata, and **35 distinct UI/command actions**.
- **Four community opt-out PRs rejected:** On June 23, maintainer Julius closed [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) was closed silently, and four community opt-out PRs (`#13458`, `#16763`, `#21248`, `#27077` — 147 passing tests, bot-approved) were rejected as `unwanted`.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Upstream Status (`ca81b7b9`)

- **Partially patched:** After public exposure (2.26M+ views), [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) removed `~/.codex/auth.json` and `~/.claude.json` reads; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) masked non-catalog models as `custom:<driver>`; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) and [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) added CI and `DO_NOT_TRACK` opt-outs.
- **Still open:** `AnalyticsService.ts:156` still writes a local install ID to disk before checking opt-outs; `DesktopShellEnvironment.ts` still omits forwarding `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`; `ingest.t3.codes` remains closed-source; zero Settings UI toggle exists.

<!-- section:visuals -->
## Visual Evidence

![Commit 3bdaa6e1 silently deleting the "No telemetry / Unless you opt in. Full stop." homepage promise](../../evidence/02-no-telemetry-removed.png)

![Identify.ts reading ~/.codex/auth.json and ~/.claude.json for unsalted SHA-256 cross-device attribution](../../evidence/03-identify-codex-claude.png)

![Issue #1397 closed as not planned: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077 rejected as unwanted despite 147 passing tests](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Primary Sources

- [Original X Investigation (Part 1 · 2.26M+ views)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [Post-audit PR #42299](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Deep Technical Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
