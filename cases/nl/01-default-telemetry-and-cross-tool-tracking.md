# #01 · Standaardtelemetrie achter een homepage-belofte van "geen telemetrie"

> Terwijl de homepage beloofde "No telemetry. Unless you opt in. Full stop.", zette T3 Code standaard PostHog-tracking aan, leidde het ruwe kopieën via het closed-source `ingest.t3.codes`, hashte het externe inloggegevens uit `~/.codex` en `~/.claude.json`, en verwierp het vier opt-out-PR's uit de community.

<!-- section:claim -->
## Wat er werd beloofd

- De homepage van T3 Code beloofde prominent: *"No telemetry / Unless you opt in. Full stop."*
- Publiek gepresenteerd als een privacy-first, open-source lokale AI-codeerclient.

<!-- section:evidence -->
## Wat het bewijs laat zien

- **Standaardtracking verscheept onder de belofte "No telemetry" (`PR #174` → `3bdaa6e1`):** Op 6 maart 2026 schakelde [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) standaard ingeschakelde PostHog-analyse in, zonder toestemmingsdialoog, zonder schakelaar in de instellingen-UI en zonder enige documentatie over telemetrie. Ruim drie maanden later, op 18 juni, verwijderde [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) in stilte de homepage-belofte *"No telemetry"* tijdens een herontwerp, zonder enige kennisgeving aan gebruikers.
- **Retentie bij de eerste partij in closed source (`PR #15028`):** In oktober 2026 werden telemetriebatches (`FLUSH_INTERVAL_MS = 10_000`) geleid via T3's closed-source endpoint [`https://ingest.t3.codes/`](https://ingest.t3.codes/). Regel 1 van `AnalyticsService.ts` bevestigt dat de server van elk event een ruwe kopie bewaart voordat die naar PostHog wordt doorgestuurd.
- **Inloggegevens uitlezen over tools heen & ongesalte SHA-256 (`PR #21506`):** In baseline `9d3195b4` las `Identify.ts` `~/.codex/auth.json` (waarbij de `user_id`-JWT-claim van OpenAI werd gedecodeerd) en `~/.claude.json` (`oauthAccount.accountUuid`) uit, naast T3 Connect-gebruikers-ID's, en berekende ongesalte SHA-256-digests (`telemetryId.ts`) om afzonderlijke machines aan één persoon te koppelen. Omdat T3 Clerk-ID's in platte tekst bezit, zijn ongesalte digests deterministisch terug te rekenen.
- **Gedetailleerde vastlegging van gebruik:** `ProviderUsageAnalytics.ts` en `FeatureUsage.ts` rapporteerden providers, aangepaste modellen, reasoning effort, permissiemodus, token-aantallen, aantallen projecten/threads, OS/WSL-metadata en **35 afzonderlijke UI-/commando-acties**.
- **Vier opt-out-PR's uit de community afgewezen:** Op 23 juni sloot maintainer Julius [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) werd geruisloos gesloten, en vier opt-out-PR's uit de community (`#13458`, `#16763`, `#21248`, `#27077` — 147 geslaagde tests, goedgekeurd door de bot) werden afgewezen als `unwanted`.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Gedeeltelijk gepatcht:** Na publieke exposure (2,26 mln+ weergaven) verwijderde [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) het uitlezen van `~/.codex/auth.json` en `~/.claude.json`; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) maskeerde modellen buiten de catalogus als `custom:<driver>`; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) en [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) voegden CI- en `DO_NOT_TRACK`-opt-outs toe.
- **Nog open:** `AnalyticsService.ts:156` schrijft nog steeds een lokaal installatie-ID naar schijf voordat opt-outs worden gecontroleerd; `DesktopShellEnvironment.ts` laat nog steeds na `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED` door te geven; `ingest.t3.codes` blijft closed source; er bestaat geen enkele schakelaar in de instellingen-UI.

<!-- section:visuals -->
## Visueel bewijs

![Commit 3bdaa6e1 verwijdert in stilte de homepage-belofte "No telemetry / Unless you opt in. Full stop."](../../evidence/02-no-telemetry-removed.png)

![Identify.ts leest ~/.codex/auth.json en ~/.claude.json voor ongesalte SHA-256-toewijzing over apparaten heen](../../evidence/03-identify-codex-claude.png)

![Issue #1397 gesloten als not planned: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077 afgewezen als unwanted ondanks 147 geslaagde tests](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Primaire bronnen

- [Oorspronkelijk X-onderzoek (deel 1 · 2,26 mln+ weergaven)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [PR #42299 na de audit](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Diepgaand technisch dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
