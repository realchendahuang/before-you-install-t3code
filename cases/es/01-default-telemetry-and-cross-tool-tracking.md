# #01 · Telemetría activada por defecto tras una promesa de «sin telemetría» en la página principal

> Mientras su página principal prometía *"No telemetry. Unless you opt in. Full stop."*, T3 Code activaba el rastreo PostHog por defecto, enrutaba copias en bruto a través del servicio de código cerrado `ingest.t3.codes`, aplicaba hash a credenciales externas de `~/.codex` y `~/.claude.json`, y rechazó cuatro PR de la comunidad para desactivar la telemetría.

<!-- section:claim -->
## Lo que se afirmaba

- La página principal de T3 Code prometía de forma destacada: *"No telemetry / Unless you opt in. Full stop."*
- Se presentaba públicamente como un cliente local de programación con IA, de código abierto y centrado en la privacidad.

<!-- section:evidence -->
## Lo que muestran las pruebas

- **Rastreo activado por defecto bajo la promesa de «sin telemetría» (`PR #174` → `3bdaa6e1`):** El 6 de marzo de 2026, [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) activó la analítica PostHog por defecto, sin diálogo de consentimiento, sin interruptor en la interfaz de ajustes y sin documentación de telemetría. Más de tres meses después, el 18 de junio, [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) eliminó en silencio la promesa *"No telemetry"* de la página principal durante un rediseño, sin avisar a los usuarios.
- **Retención propia en código cerrado (`PR #15028`):** En octubre de 2026, los lotes de telemetría (`FLUSH_INTERVAL_MS = 10_000`) se enrutaban a través del endpoint de código cerrado de T3 [`https://ingest.t3.codes/`](https://ingest.t3.codes/). La línea 1 de `AnalyticsService.ts` confirma que el servidor conserva una copia en bruto de cada evento antes de reenviarlo a PostHog.
- **Lectura de credenciales de otras herramientas y SHA-256 sin sal (`PR #21506`):** En la base `9d3195b4`, `Identify.ts` leía `~/.codex/auth.json` (decodificando la claim JWT `user_id` de OpenAI) y `~/.claude.json` (`oauthAccount.accountUuid`) junto con los ID de usuario de T3 Connect, calculando digests SHA-256 sin sal (`telemetryId.ts`) para vincular distintas máquinas a una misma persona. Como T3 posee los ID de Clerk en texto plano, los digests sin sal se revierten de forma determinista.
- **Captura granular de uso:** `ProviderUsageAnalytics.ts` y `FeatureUsage.ts` reportaban proveedores, modelos personalizados, esfuerzo de razonamiento, modo de permisos, recuentos de tokens, número de proyectos e hilos, metadatos de OS/WSL y **35 acciones distintas de interfaz y comando**.
- **Cuatro PR de la comunidad para desactivar la telemetría, rechazados:** El 23 de junio, el mantenedor Julius cerró [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) se cerró en silencio, y cuatro PR de la comunidad para desactivar la telemetría (`#13458`, `#16763`, `#21248`, `#27077` — 147 tests en verde, aprobados por bots) fueron rechazados como `unwanted`.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Estado upstream (`ca81b7b9`)

- **Parcheado parcialmente:** Tras la exposición pública (más de 2,26 M de visualizaciones), [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) eliminó las lecturas de `~/.codex/auth.json` y `~/.claude.json`; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) enmascaró los modelos fuera de catálogo como `custom:<driver>`; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) y [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) añadieron opciones de exclusión en CI y para `DO_NOT_TRACK`.
- **Sigue abierto:** `AnalyticsService.ts:156` todavía escribe un ID de instalación local en disco antes de comprobar las exclusiones; `DesktopShellEnvironment.ts` sigue sin reenviar `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`; `ingest.t3.codes` continúa siendo de código cerrado; no existe ningún interruptor en la interfaz de ajustes.

<!-- section:visuals -->
## Pruebas visuales

![Commit 3bdaa6e1 eliminando en silencio la promesa de la página principal "No telemetry / Unless you opt in. Full stop."](../../evidence/02-no-telemetry-removed.png)

![Identify.ts leyendo ~/.codex/auth.json y ~/.claude.json para la atribución entre dispositivos mediante SHA-256 sin sal](../../evidence/03-identify-codex-claude.png)

![Issue #1397 cerrado como not planned: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077 rechazado como unwanted pese a 147 tests en verde](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 1 · más de 2,26 M de visualizaciones)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [PR posterior a la auditoría #42299](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Dossier técnico detallado 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
