# #01 · Domyślna telemetria wbrew obietnicy „bez telemetrii" na stronie głównej

> Choć strona główna obiecywała „No telemetry. Unless you opt in. Full stop.", T3 Code domyślnie włączał śledzenie PostHog, przesyłał surowe kopie zdarzeń przez zamknięte źródłowo `ingest.t3.codes`, haszował dane uwierzytelniające z zewnętrznych plików `~/.codex` i `~/.claude.json`, a także odrzucił cztery zgłoszone przez społeczność PR-y wyłączające telemetrię.

<!-- section:claim -->
## Co deklarowano

- Strona główna T3 Code wyraźnie obiecywała: *„No telemetry / Unless you opt in. Full stop."*
- Publicznie przedstawiano produkt jako otwartoźródłowy, lokalny klient AI do kodowania, stawiający prywatność na pierwszym miejscu.

<!-- section:evidence -->
## Co pokazują dowody

- **Domyślne śledzenie wdrożone pod hasłem „bez telemetrii" (`PR #174` → `3bdaa6e1`):** 6 marca 2026 r. [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) włączył analitykę PostHog domyślnie, bez okna zgody, bez przełącznika w ustawieniach i bez dokumentacji telemetrii. Ponad trzy miesiące później, 18 czerwca, [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) po cichu usunął ze strony głównej obietnicę *„No telemetry"* przy okazji redesignu, bez żadnej informacji dla użytkowników.
- **Zamknięte źródłowo przechowywanie danych po stronie operatora (`PR #15028`):** W październiku 2026 r. partie zdarzeń telemetrycznych (`FLUSH_INTERVAL_MS = 10_000`) były kierowane przez zamknięty źródłowo endpoint T3 [`https://ingest.t3.codes/`](https://ingest.t3.codes/). Wiersz 1 pliku `AnalyticsService.ts` potwierdza, że serwer zachowuje surową kopię każdego zdarzenia, zanim przekaże je do PostHog.
- **Odczyt danych uwierzytelniających innych narzędzi i niesolony SHA-256 (`PR #21506`):** Plik `Identify.ts` z punktu bazowego `9d3195b4` odczytywał `~/.codex/auth.json` (dekodując roszczenie JWT `user_id` OpenAI) oraz `~/.claude.json` (`oauthAccount.accountUuid`) obok identyfikatorów użytkowników T3 Connect, a następnie obliczał niesolone skróty SHA-256 (`telemetryId.ts`), by powiązać różne maszyny z jedną osobą. Ponieważ T3 przechowuje identyfikatory Clerk w postaci jawnej, niesolone skróty dają się odwrócić deterministycznie.
- **Szczegółowe rejestrowanie użycia:** `ProviderUsageAnalytics.ts` i `FeatureUsage.ts` raportowały dostawców, modele niestandardowe, poziom wysiłku rozumowania, tryb uprawnień, liczbę tokenów, liczbę projektów i wątków, metadane systemu OS/WSL oraz **35 odrębnych akcji w interfejsie i poleceniach**.
- **Odrzucenie czterech PR-ów społeczności wyłączających telemetrię:** 23 czerwca opiekun projektu Julius zamknął [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *„We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) zamknięto bez słowa, a cztery PR-y społeczności wyłączające telemetrię (`#13458`, `#16763`, `#21248`, `#27077` — 147 przechodzących testów, zatwierdzone przez bota) odrzucono jako `unwanted`.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Częściowo naprawione:** Po publicznym nagłośnieniu sprawy (ponad 2,26 mln wyświetleń) [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) usunął odczyt `~/.codex/auth.json` i `~/.claude.json`; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) zamaskował modele spoza katalogu jako `custom:<driver>`; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) i [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) dodały mechanizmy opt-out w CI oraz przez `DO_NOT_TRACK`.
- **Nadal otwarte:** `AnalyticsService.ts:156` wciąż zapisuje lokalny identyfikator instalacji na dysku, zanim sprawdzi ustawienia opt-out; `DesktopShellEnvironment.ts` nadal nie przekazuje dalej `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`; `ingest.t3.codes` pozostaje zamknięte źródłowo; w ustawieniach nadal nie ma żadnego przełącznika.

<!-- section:visuals -->
## Dowody wizualne

![Commit 3bdaa6e1 po cichu usuwa ze strony głównej obietnicę „No telemetry / Unless you opt in. Full stop."](../../evidence/02-no-telemetry-removed.png)

![Identify.ts odczytuje ~/.codex/auth.json i ~/.claude.json na potrzeby niesolonego przypisania między urządzeniami przez SHA-256](../../evidence/03-identify-codex-claude.png)

![Issue #1397 zamknięte jako not planned: „We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077 odrzucony jako unwanted mimo 147 przechodzących testów](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Źródła pierwotne

- [Pierwotne śledztwo na X (część 1 · ponad 2,26 mln wyświetleń)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [PR #42299 po audycie](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Pogłębione dossier techniczne 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
