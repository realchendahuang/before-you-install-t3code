# #01 · Telemetria predefinita dietro la promessa «niente telemetria» di una homepage

> Mentre la sua homepage prometteva "No telemetry. Unless you opt in. Full stop.", T3 Code attivava per impostazione predefinita il tracciamento PostHog, faceva transitare copie grezze attraverso `ingest.t3.codes`, servizio a codice chiuso, calcolava l'hash delle credenziali esterne in `~/.codex` e `~/.claude.json`, e respingeva quattro PR della community per disattivare la telemetria.

<!-- section:claim -->
## Cosa era stato dichiarato

- La homepage di T3 Code prometteva in evidenza: *"No telemetry / Unless you opt in. Full stop."*
- Presentato pubblicamente come client di coding AI locale, open source e attento alla riservatezza.

<!-- section:evidence -->
## Cosa dimostrano le prove

- **Tracciamento predefinito rilasciato sotto la promessa "No telemetry" (`PR #174` → `3bdaa6e1`):** il 6 marzo 2026, [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) ha attivato le analisi PostHog accese per impostazione predefinita, senza finestra di consenso, senza interruttore nell'interfaccia delle impostazioni e senza alcuna documentazione sulla telemetria. Oltre tre mesi dopo, il 18 giugno, [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) ha cancellato in silenzio la promessa *"No telemetry"* dalla homepage durante un restyling, senza alcun avviso agli utenti.
- **Conservazione dei dati in proprio e a codice chiuso (`PR #15028`):** nell'ottobre 2026 i lotti di telemetria (`FLUSH_INTERVAL_MS = 10_000`) sono stati instradati attraverso l'endpoint a codice chiuso di T3 [`https://ingest.t3.codes/`](https://ingest.t3.codes/). La riga 1 di `AnalyticsService.ts` conferma che il server conserva una copia grezza di ogni evento prima di inoltrarla a PostHog.
- **Lettura delle credenziali di altri strumenti e SHA-256 senza salt (`PR #21506`):** nella baseline `9d3195b4`, `Identify.ts` leggeva `~/.codex/auth.json` (decodificando il claim JWT `user_id` di OpenAI) e `~/.claude.json` (`oauthAccount.accountUuid`) insieme agli ID utente di T3 Connect, calcolando digest SHA-256 senza salt (`telemetryId.ts`) per ricollegare macchine diverse a un'unica persona. Poiché T3 conserva in chiaro gli ID Clerk, i digest senza salt si invertono in modo deterministico.
- **Raccolta granulare dell'utilizzo:** `ProviderUsageAnalytics.ts` e `FeatureUsage.ts` riportavano provider, modelli personalizzati, livello di ragionamento, modalità di autorizzazione, conteggi di token, conteggi di progetti e thread, metadati su OS/WSL e **35 distinte azioni dell'interfaccia o comandi**.
- **Quattro PR della community per la disattivazione respinte:** il 23 giugno il maintainer Julius ha chiuso [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) è stata chiusa in silenzio, e quattro PR della community per disattivare la telemetria (`#13458`, `#16763`, `#21248`, `#27077` — 147 test superati, approvate dai bot) sono state respinte come `unwanted`.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Corretto in parte:** dopo la divulgazione pubblica (oltre 2,26 milioni di visualizzazioni), [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) ha rimosso la lettura di `~/.codex/auth.json` e `~/.claude.json`; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) ha mascherato i modelli fuori catalogo come `custom:<driver>`; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) e [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) hanno aggiunto le disattivazioni tramite CI e `DO_NOT_TRACK`.
- **Ancora aperto:** `AnalyticsService.ts:156` scrive ancora su disco un ID di installazione locale prima di verificare le disattivazioni; `DesktopShellEnvironment.ts` omette ancora l'inoltro di `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`; `ingest.t3.codes` resta a codice chiuso; non esiste alcun interruttore nell'interfaccia delle impostazioni.

<!-- section:visuals -->
## Prove visive

![Il commit 3bdaa6e1 cancella in silenzio la promessa "No telemetry / Unless you opt in. Full stop." dalla homepage](../../evidence/02-no-telemetry-removed.png)

![Identify.ts legge ~/.codex/auth.json e ~/.claude.json per l'attribuzione cross-device tramite SHA-256 senza salt](../../evidence/03-identify-codex-claude.png)

![Issue #1397 chiusa come not planned: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077 respinta come unwanted nonostante 147 test superati](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Fonti primarie

- [Indagine originale su X (Parte 1 · oltre 2,26 milioni di visualizzazioni)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [PR #42299 successiva all'audit](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Dossier tecnico approfondito 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
