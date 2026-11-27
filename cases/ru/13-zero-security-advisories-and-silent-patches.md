# #13 · Ноль опубликованных GitHub Security Advisories, молчаливые патчи высокой критичности и поспешный `SECURITY.md`

> Отмахиваясь на X от китайских аудиторов исходного кода, T3 Code тихо вливал исправления уязвимостей высокой критичности — включая path traversal в хранилище секретов, утечки токенов между доменами и выполнение команд из недоверенных репозиториев — при этом число опубликованных GitHub Security Advisories оставалось равным 0.

<!-- section:claim -->
## Что утверждалось

- 24 ноября `@theo` на X назвал китайскоязычные технические аудиты *"the biggest fucking cesspit"* и оскорбил разработчиков, которые их читают ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- Поспешные правки `SECURITY.md` (`PR #38812`, `PR #41942`) представили широкий доступ к хосту и нешифрованный транспорт как допустимые, заранее заданные границы.

<!-- section:evidence -->
## Что показывают доказательства

- **Ноль опубликованных Security Advisories (`0`):** по состоянию на `ca81b7b9` страница [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) репозитория `pingdotgg/t3code` содержит **ноль** опубликованных advisories — то есть у существующих пользователей десктопной и серверной версий нет ни одного формального оповещения о CVE или предупреждения об обновлении.
- **Уязвимости высокой критичности исправлены молча:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): path traversal в `ServerSecretStore` через `jti`/`nonce` релея до подтверждения устройства.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): утечки токенов корпоративных GitHub/GitLab между доменами.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) и [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): изоляция превью браузера на десктопе без песочницы и подтверждение команд для раскладки worktree.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): права на файл токена Clerk на десктопе — доступ только владельцу.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): патч примерно на 3 000 строк, который наконец добавляет запросы подтверждения перед выполнением команд из конфигов недоверенных репозиториев (наряду с более ранними молчаливыми исправлениями `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`).
- **Открытые локальные дефекты безопасности:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (path traversal и симлинки на внешние пути) и [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (в Windows-файле `externalLauncher.ts` запускается `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>`, что AVG/Avast помечает как `IDP.HELU.PSE96`) остаются не влитыми.
- **`SECURITY.md` сужает ответственность вместо укрепления архитектуры:** документ прямо объявляет межсистемный `filesystem:read` за пределами рабочих пространств, незашифрованный HTTP на iOS/LAN и полный захват хост-машины через скомпрометированный ключ подписи релея *заданными границами дизайна*.

<!-- section:status -->
## Статус в апстриме (`ca81b7b9`)

- **Всё ещё открыто:** число опубликованных GitHub Security Advisories по-прежнему равно **0**; `Issue #26489` и `PR #30997` остаются неисправленными; `SECURITY.md` продолжает относить межсистемные чтения и незашифрованный HTTP к заявленному поведению.

<!-- section:visuals -->
## Визуальные доказательства

![PR #39483 молча исправляет path traversal в ServerSecretStore, не публикуя Security Advisory](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997 — открытое исправление запуска PowerShell с Base64 в Windows, помеченного антивирусом](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md относит межсистемные чтения, незашифрованный HTTP на iOS и захват машины через ключ релея к заявленным границам](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## Первоисточники

- [Оригинальное расследование в X (часть 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (опубликовано 0)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Техническое досье 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
