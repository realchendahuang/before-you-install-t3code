# #01 · Standard-Telemetrie hinter dem „No telemetry“-Versprechen der Startseite

> Während die Startseite „No telemetry. Unless you opt in. Full stop.“ versprach, aktivierte T3 Code standardmäßig PostHog-Tracking, leitete Rohkopien über das quelloffene… nein: über das **closed-source** `ingest.t3.codes`, hashte externe Zugangsdaten aus `~/.codex` und `~/.claude.json` und lehnte vier Opt-out-PRs aus der Community ab.

<!-- section:claim -->
## Was behauptet wurde

- Die Startseite von T3 Code versprach prominent: *„No telemetry / Unless you opt in. Full stop.“*
- Öffentlich präsentiert als datenschutzorientierter, quelloffener lokaler KI-Coding-Client.

<!-- section:evidence -->
## Was die Belege zeigen

- **Standard-Tracking ausgeliefert unter dem „No telemetry“-Versprechen (`PR #174` → `3bdaa6e1`):** Am 6. März 2026 aktivierte [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) standardmäßig eingeschaltete PostHog-Analytics – ohne Einwilligungsdialog, ohne Schalter in der Einstellungsoberfläche und ohne Telemetrie-Dokumentation. Über drei Monate später, am 18. Juni, löschte [`commit 33bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) das *„No telemetry“*-Versprechen der Startseite stillschweigend im Rahmen eines Redesigns – ohne jeden Hinweis an die Nutzer.

- **Closed-Source-Retention aus erster Hand (`PR #15028`):** Im Oktober 2026 wurden Telemetrie-Batches (`FLUSH_INTERVAL_MS = 10_000`) über T3s Closed-Source-Endpunkt [`https://ingest.t3.codes/`](https://ingest.t3.codes/) geleitet. Zeile 1 von `AnalyticsService.ts` bestätigt, dass der Server eine Rohkopie jedes Events behält, bevor er sie an PostHog weiterleitet.

- **Tool-übergreifendes Auslesen von Zugangsdaten & ungesalzenes SHA-256 (`PR #21506`):** Die Baseline `9d3195b4` von `Identify.ts` las `~/.codex/auth.json` (Dekodierung von OpenAIs `user_id`-JWT-Claim) und `~/.claude.json` (`oauthAccount.accountUuid`) zusammen mit T3-Connect-User-IDs und berechnete ungesalzene SHA-256-Digests (`telemetryId.ts`), um verschiedene Rechner auf eine Person zurückzuführen. Da T3 die Clerk-IDs im Klartext hält, sind ungesalzene Digests deterministisch umkehrbar.

- **Granulare Nutzungserfassung:** `ProviderUsageAnalytics.ts` und `FeatureUsage.ts` meldeten Provider, Custom-Modelle, Reasoning-Effort, Berechtigungsmodus, Token-Zahlen, Projekt-/Thread-Zahlen, OS-/WSL-Metadaten sowie **35 verschiedene UI-/Kommando-Aktionen**.

- **Vier Opt-out-PRs aus der Community abgelehnt:** Am 23. Juni schloss Maintainer Julius [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *„We will not make this easier to opt out of, it is crucial for us to know how many users we have.“* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) wurde stillschweigend geschlossen, und vier Opt-out-PRs aus der Community (`#13458`, `#16763`, `#21248`, `#27077` – 147 bestandene Tests, vom Bot freigegeben) wurden als `unwanted` abgelehnt.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Teilweise gepatcht:** Nach der öffentlichen Aufdeckung (2,26 Mio.+ Aufrufe) entfernte [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) die Zugriffe auf `~/.codex/auth.json` und `~/.claude.json`; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) maskierte Nicht-Katalog-Modelle als `custom:<driver>`; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) und [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) fügten CI- und `DO_NOT_TRACK`-Opt-outs hinzu.
- **Weiterhin offen:** `AnalyticsService.ts:156` schreibt noch immer eine lokale Install-ID auf die Festplatte, bevor Opt-outs geprüft werden; `DesktopShellEnvironment.ts` reicht `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED` weiterhin nicht durch; `ingest.t3.codes` bleibt Closed Source; in der Einstellungsoberfläche existiert kein einziger Schalter.

<!-- section:visuals -->
## Visuelle Belege

![Commit 3bdaa6e1 löscht stillschweigend das Startseiten-Versprechen „No telemetry / Unless you opt in. Full stop.“](../../evidence/02-no-telemetry-removed.png)

![Identify.ts liest ~/.codex/auth.json und ~/.claude.json für ungesalzene SHA-256-Zuordnung über Geräte hinweg](../../evidence/03-identify-codex-claude.png)

![Issue #1397 geschlossen als not planned: „We will not make this easier to opt out of“](../../evidence/04-issue1397-no-optout.png)

![PR #27077 abgelehnt als unwanted trotz 147 bestandener Tests](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Primärquellen

- [Ursprüngliche X-Recherche (Teil 1 · 2,26 Mio.+ Aufrufe)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [Post-Audit-PR #42299](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Technisches Deep-Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
