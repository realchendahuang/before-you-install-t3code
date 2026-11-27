# #19 · `ca81b7b9` Критический аудит аутентификации и выполнения в репозитории: 30-дневная оболочка по открытому HTTP в LAN, неотзываемые токены и утечка `SSH_AUTH_SOCK`

> Построчная проверка последнего HEAD ветки `main` (`ca81b7b9`, 25 ноября 14:49 CST) подтвердила пять активных брешей в безопасности и надёжности: 30-дневные куки оболочки в открытом виде при `--lan` с обходом при отсутствии `Origin`, неотзываемые Bearer-токены на 30 дней, воспроизводимые URL с `?wsTicket=`, `isIPv4`, убивающий туннели `::1`, и недоверенные репозитории, исполняющие хуки и сабмодули с унаследованными `SSH_AUTH_SOCK` и `GITHUB_TOKEN`.

<!-- section:claim -->
## Что утверждалось

- После ночного марафона патчей 24–25 ноября T3 Code был представлен как вычищенный и безопасный для повседневной инженерной работы.
- В `SECURITY.md` сессия по умолчанию описана как полный контроль над оболочкой от имени пользователя ОС, при этом заявлено, что локальные границы и границы LAN управляются должным образом.

<!-- section:evidence -->
## Что показывает доказательство

Проверено напрямую по upstream-коммиту [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd):

- **1. 30-дневные куки оболочки в открытом виде при `--lan` + обход при отсутствии `Origin`:** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) задаёт срок жизни сессии по умолчанию 30 дней (что, согласно `SECURITY.md`, эквивалентно полному доступу к оболочке ОС). [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) добавил атрибут `Secure` только для `https:`, из-за чего куки `t3 up --lan` по HTTP передаются открытым текстом ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). Хуже того, [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) возвращает `true` всякий раз, когда `Origin` отсутствует, — поэтому любой, кто перехватит один пакет в LAN, может воспроизвести куки из небраузерного скрипта без `Origin` и незаметно удерживать доступ к оболочке хоста 30 дней.
- **2. Неотзываемые Bearer-токены на 30 дней без DPoP и отсутствие маршрута `/logout`:** `/oauth/token` сокращает срок жизни до 1 часа только при наличии DPoP-подтверждения; в остальных случаях выдаётся непривязанный **Bearer-токен на 30 дней** ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). HTTP-контракт определяет **ни одного эндпоинта `/logout`** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)), а `revokeClientSession` явно блокирует самоотзыв с `current_session_revoke_not_allowed` ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. Воспроизводимые URL-токены `?wsTicket=` на 5 минут:** тикеты WebSocket передаются в query-строке (`?wsTicket=`, попадая в логи прокси и журналы доступа) со сроком жизни 5 минут. [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) проверяет подпись, срок действия, audience и отзыв, но **не хранит одноразовые `jti` для защиты от повторного использования** — это позволяет неограниченно повторять Bearer RPC и все тикеты `media` в течение 5 минут ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. Недоверенные репозитории выполняются с полными `SSH_AUTH_SOCK` и `GITHUB_TOKEN`:** при настройке worktree автоматически выполняется `git submodule update --init --recursive`, если существует `.gitmodules` ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)); [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) не задаёт глобальную защиту `core.hooksPath=/dev/null`; а [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) синхронно запускает хуки `SessionStart` из `.claude/settings.json` — все они наследуют полный `process.env` хоста, включая `GITHUB_TOKEN` и `SSH_AUTH_SOCK` (радиус поражения которых охватывает каждый удалённый репозиторий и production-сервер, для которых ваш SSH-агент может подписывать).
- **5. `isIPv4` незаметно уничтожает loopback-туннели `::1`:** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) добавляет `::1` в allowlist loopback в строке 39, а затем в строке 73 вызывает `NodeNet.isIPv4` — из-за чего сокеты IPv6 loopback Tailscale Serve и T3 Connect ошибочно классифицируются как внешний трафик, и вызывается `socket.destroy()`.

<!-- section:status -->
## Статус в upstream (`ca81b7b9`)

- **Все 5 проблем по-прежнему не исправлены на `ca81b7b9`:** подтверждено построчно на HEAD ветки `main` (`2026-11-25 14:49 CST`), при этом **опубликовано 0 GitHub Security Advisories** (включая тихое исправление path traversal от 20 ноября в `PR #39483`).

<!-- section:visuals -->
## Визуальные доказательства

![http.ts#L215-L241 отправляет 30-дневные куки оболочки без Secure по открытому HTTP при --lan](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 возвращает true всякий раз, когда заголовок Origin отсутствует](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 блокирует самоотзыв текущей сессии при отсутствии маршрута logout](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 запускает рекурсивную инициализацию сабмодулей с унаследованными SSH_AUTH_SOCK и GITHUB_TOKEN](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 отвергает loopback-туннели IPv6 ::1 через NodeNet.isIPv4](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## Первоисточники

- [Исходный пост аудита в X — часть 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [Часть 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [Коммит `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [Глубокое техническое досье 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
