# #11 · Разъяснение от 25 ноября опровергнуто в течение 2 часов ночными PR и дампом на 100 МБ

> Утром 25 ноября @theo выступил с тремя широкими заверениями о приватности и опубликовал дамп телеметрии на 100 МБ — все три утверждения были опровергнуты в течение двух часов PR его собственной команды и самим gzip-архивом.

<!-- section:claim -->
## Что утверждалось

В утреннем разъяснении от 25 ноября ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) и последующем ответе ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) `@theo` заверил пользователей:
- T3 Code *"never collected file paths."*
- Переменные окружения *"always disabled telemetry cleanly."*
- Установки с отказом от телеметрии не пишут ни одного локального файла трекинга, а хеши владельцев Claude были *"broken."*

<!-- section:evidence -->
## Что показывают доказательства

- **Противоречие 1 — утечка абсолютного пути рабочей области через `git.cwd` (`PR #42450`):** примерно через 90 минут после публикации ключевой мейнтейнер Julius слил [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450), признав, что запуски вебхуков, доставленные через relay, экспортировали в Axiom целые спаны выполнения — включая Git-спаны, содержащие `git.cwd` (**полный абсолютный путь рабочей области, имя пользователя ОС и название репозитория**).
- **Противоречие 2 — сломанные отказы в Windows и macOS (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) признал, что десктопное приложение Windows игнорировало сохранённые пользовательские переменные окружения `T3CODE_TELEMETRY_ENABLED=false` при запуске из уже существующих процессов. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) признал, что трассировка relay при первом запуске в macOS/Linux инициализировалась до обнаружения оболочки, игнорируя отказы из `~/.zshrc` на всю сессию.
- **Противоречие 3 — безусловные записи на диск и 264 живые записи Claude в `events.clean.jsonl`:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` на `ca81b7b9`) по-прежнему вызывает `getTelemetryIdentity` безусловно при запуске, записывая локальный UUID установки (`upsertAnonymousId`) ещё до проверки `telemetryEnabled`. При этом заголовок gzip в публичном экспорте `@theo` (`6,056,594` байт в сжатом виде, `95,789` событий) содержал исходное имя файла `events.clean.jsonl`, созданного за 20 минут до публикации, — и в нём всё ещё было **264 живых записи владельцев Claude**, связывающих **4 отдельные машины** (`installId`) с одним хешем SHA-256, а также дословные названия приватных прокси-моделей (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## Статус в upstream (`ca81b7b9`)

- **Частично исправлено:** `PR #42450`, `PR #42376` и `PR #42464` слиты ночью.
- **Всё ещё открыто:** `AnalyticsService.ts:156` по-прежнему записывает локальный анонимный ID безусловно, до проверки отказов, а `DesktopShellEnvironment.ts` по-прежнему не передаёт `T3CODE_OTEL_SDK_DISABLED` и `OTEL_SDK_DISABLED`.

<!-- section:visuals -->
## Визуальные доказательства

![PR #42450 признаёт, что запуски по триггеру relay экспортировали в Axiom абсолютные пути рабочей области git.cwd](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 признаёт, что десктоп Windows игнорировал сохранённые переменные окружения T3CODE_TELEMETRY_ENABLED=false](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 признаёт, что трассировка relay при первом запуске в macOS игнорировала отказы из ~/.zshrc](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Криминалистический аудит events.clean.jsonl: 264 записи Claude связывают 4 машины и приватные ID прокси-моделей](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Первоисточники

- [Оригинальное расследование в X (часть 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [Разъяснение `@theo` от 25 ноября (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [Ответ-продолжение (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [Публичный gzip-дамп](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Глубокое техническое досье 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
