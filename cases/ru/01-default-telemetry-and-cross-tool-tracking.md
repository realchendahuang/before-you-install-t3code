# #01 · Телеметрия по умолчанию за обещанием "No Telemetry" на главной странице

> Пока на главной странице обещали *"No telemetry. Unless you opt in. Full stop."*, T3 Code включил отслеживание PostHog по умолчанию, направлял сырые копии через закрытый `ingest.t3.codes`, хешировал внешние учетные данные `~/.codex` и `~/.claude.json` и отклонил четыре PR сообщества об отказе от телеметрии.

<!-- section:claim -->
## Что утверждалось

- На главной странице T3 Code заметно обещали: *"No telemetry / Unless you opt in. Full stop."*
- Публично позиционировался как открытый локальный AI-клиент для программирования, ставящий конфиденциальность на первое место.

<!-- section:evidence -->
## Что показывают доказательства

- **Отслеживание по умолчанию появилось под обещанием "No telemetry" (`PR #174` → `3bdaa6e1`):** 6 марта 2026 года [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) включил аналитику PostHog по умолчанию — без диалога согласия, без переключателя в интерфейсе настроек и без документации о телеметрии. Спустя более трех месяцев, 18 июня, [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) молча удалил обещание *"No telemetry"* с главной страницы во время редизайна, никак не уведомив пользователей.
- **Закрытое хранение на собственных серверах (`PR #15028`):** В октябре 2026 года пакеты телеметрии (`FLUSH_INTERVAL_MS = 10_000`) направлялись через закрытую конечную точку T3 [`https://ingest.t3.codes/`](https://ingest.t3.codes/). Строка 1 в `AnalyticsService.ts` подтверждает, что сервер сохраняет сырую копию каждого события, прежде чем передать ее в PostHog.
- **Чтение учетных данных из других инструментов и SHA-256 без соли (`PR #21506`):** На базовом коммите `9d3195b4` файл `Identify.ts` читал `~/.codex/auth.json` (декодируя заявку `user_id` из JWT OpenAI) и `~/.claude.json` (`oauthAccount.accountUuid`) вместе с идентификаторами пользователей T3 Connect, вычисляя дайджесты SHA-256 без соли (`telemetryId.ts`), чтобы связать разные машины с одним человеком. Поскольку T3 хранит идентификаторы Clerk в открытом виде, дайджесты без соли детерминированно обратимы.
- **Детальный сбор данных об использовании:** `ProviderUsageAnalytics.ts` и `FeatureUsage.ts` передавали сведения о провайдерах, кастомных моделях, уровне reasoning effort, режиме разрешений, количестве токенов, числе проектов и тредов, метаданные ОС/WSL и **35 отдельных действий в UI и командах**.
- **Четыре PR сообщества об отказе от телеметрии отклонены:** 23 июня мейнтейнер Julius закрыл [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) закрыли молча, а четыре PR сообщества об отказе от телеметрии (`#13458`, `#16763`, `#21248`, `#27077` — 147 проходящих тестов, одобрены ботом) отклонили как `unwanted`.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Статус в upstream (`ca81b7b9`)

- **Частично исправлено:** После публичной огласки (2,26 млн+ просмотров) [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) удалил чтение `~/.codex/auth.json` и `~/.claude.json`; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) замаскировал модели вне каталога как `custom:<driver>`; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) и [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) добавили отказ от телеметрии в CI и через `DO_NOT_TRACK`.
- **По-прежнему открыто:** `AnalyticsService.ts:156` по-прежнему записывает локальный install ID на диск до проверки отказа от телеметрии; `DesktopShellEnvironment.ts` по-прежнему не передает `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`; `ingest.t3.codes` остается закрытым; в интерфейсе настроек нет ни одного переключателя.

<!-- section:visuals -->
## Визуальные доказательства

![Commit 3bdaa6e1 молча удаляет обещание "No telemetry / Unless you opt in. Full stop." с главной страницы](../../evidence/02-no-telemetry-removed.png)

![Identify.ts читает ~/.codex/auth.json и ~/.claude.json для атрибуции между устройствами через SHA-256 без соли](../../evidence/03-identify-codex-claude.png)

![Issue #1397 закрыт как not planned: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077 отклонен как unwanted, несмотря на 147 проходящих тестов](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Первоисточники

- [Оригинальное расследование в X (часть 1 · 2,26 млн+ просмотров)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Коммит `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [PR #42299 после аудита](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Глубокое техническое досье 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
