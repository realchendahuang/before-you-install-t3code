# #03 · 52 дня молчаливого `git push --force` против 21 часа на удаление фильтра приватности моделей

> Более 52 дней T3 Code держал открытым баг, при котором режим Claude Auto молча одобрял `git push --force origin main`, не запрашивая подтверждения, — и при этом ему понадобился всего 21 час, чтобы убрать белый список приватности, из-за чего приватные модели появились в публичном лидерборде @theo.

<!-- section:claim -->
## Что утверждалось

- Режим Claude Auto спроектирован так, чтобы высокорисковые деструктивные действия (например, force-push в `main`) эскалировались на явное подтверждение человеком.
- Телеметрия подавалась как агрегированные метрики, безопасные для приватности.

<!-- section:evidence -->
## Что показывают доказательства

- **52+ дня без исправления — молчаливый `git push --force` (`Issue #15353`):** В `ClaudeAdapterV2.ts` режим Auto сокращал `!requiresClaudeApproval(context)` сразу до `"allow"`. Когда собственный классификатор безопасности Claude дважды заблокировал `git push --force origin main` и на третьей попытке эскалировал запрос на подтверждение человеком, T3 Code молча одобрил его без единого запроса в UI и записал в лог `"source": "user_temporary"`. Два PR с исправлениями от сообщества (`#15360`, `#35207`) оставались без рассмотрения до автозакрытия ботом; `#40692` так и не был смёржен.
- **21 час на удаление белого списка приватности (`Issue #40948` → `PR #41237`):** 22 ноября [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) отметил, что новые модели отсутствуют в публичном лидерборде `@theo` [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)), поскольку `PR #29001` ввёл белый список моделей. В течение **21 часа** [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) был смёржен под аккаунтом `@theo` с пометкой, что Theo явно попросил убрать фильтр, — из-за чего приватные локальные и корпоративные имена вроде `ollama/acme-internal` и `acme-azure-deployment` стали передаваться в аналитику дословно.

<!-- section:status -->
## Статус в upstream (`ca81b7b9`)

- **Частично изменено / ключевой баг безопасности всё ещё открыт:** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) позднее замаскировал модели вне каталога как `custom:<driver>` (slug'и из каталога и от вендоров по-прежнему передаются через кастомные эндпоинты). **Issue #15353 (молчаливый `git push --force` в режиме Auto) остаётся открытым и неисправленным на `ca81b7b9`.**

<!-- section:visuals -->
## Визуальные доказательства

![Issue #15353 открыт 52+ дня: режим Claude Auto молча одобряет git push --force](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237 смёржен через 21 час после Issue #40948: удаление фильтра приватности моделей для slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Первоисточники

- [Оригинальное расследование в X (часть 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Комментарий с воспроизведением `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Несмёрженные исправления от сообщества: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Глубокое техническое досье 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
