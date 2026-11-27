# #04 · Подмена заголовков Google Antigravity, фиктивный `SSH_CONNECTION` и блокировка аккаунта за 3 минуты

> Несмотря на гарантии соблюдения ToS в своём FAQ, T3 Code извлекает учётные данные из связки ключей ОС, подменяет внутренние заголовки Google (`antigravity/hub/2.24.0`) при обращении к `v1internal` и подставляет фиктивные значения `SSH_CONNECTION` — подвергая личные подписки Google риску быстрых блокировок.

<!-- section:claim -->
## Что утверждалось

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) заверял платящих подписчиков: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- Когда заблокированные пользователи открыли [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713), мейнтейнер отрицал обращения к бэкенду Antigravity и переиспользование токенов — а в X `@theo` возложил вину на сторонние прокси (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## Что показывают доказательства

- **Извлечение учётных данных ОС и подменённые вызовы `v1internal`:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) извлекает OAuth-токены Google из локальных файлов, `@napi-rs/keyring` или Windows Credential Manager (`CredReadW` через `ffi-rs` в `advapi32.dll`), жёстко прописывает `antigravity/hub/2.24.0` и выполняет `POST` напрямую к приватному эндпоинту Google `v1internal`. Сотрудники Google подтвердили на [официальном форуме](https://discuss.ai.google.dev/t/185992), что раздел 6 [Google Antigravity ToS](https://antigravity.google/terms) запрещает сторонним инструментам извлекать или повторно использовать учётные данные для прямых запросов к бэкенд-эндпоинтам.
- **Поддельный `SSH_CONNECTION` и утечка между аккаунтами:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) подставляет поддельную переменную окружения `SSH_CONNECTION` (`"127.0.0.1 0 127.0.0.1 0"`), чтобы вывести CLI Google из изоляции системного хранилища ключей и заставить его писать в открытые текстовые файлы. После того как Google обновил свой CLI 24 ноября, [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) подтвердил, что запросы из аккаунта A молча направлялись в аккаунт B.
- **Новый аккаунт за $20 заблокирован за 3 минуты (`Issue #41536`):** Совершенно новая подписка Google AI за $20 без единого прокси — использовался только Antigravity под управлением T3 — была заблокирована на самом первом сообщении, через 3 минуты после настройки. Мейнтейнеры закрыли issue как дубликат, не добавив никакого предупреждения для пользователей.
- **Подмена в нативном клиенте и CLIProxyAPI:** `@theo` лично смёржил [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876), выдающий себя за `"zed"`, а смёрженный [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) подключил опрос хаба в [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) с подменёнными заголовками `claude-code/2.1.273`, `grok-cli/1.0.77` и `antigravityUserAgent`.

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({ Authorization: `Bearer ${accessToken}`, "User-Agent": antigravityUserAgent(platform, architecture) })
);
```

<!-- section:status -->
## Статус в upstream (`ca81b7b9`)

- **Всё ещё активно:** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) добавил [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts), чтобы показывать ссылки на верификацию аккаунта при ошибке Google `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`), — что подтверждает действующие меры со стороны Google, — тогда как все четыре пути подмены и извлечения токенов остаются рабочими.

<!-- section:visuals -->
## Визуальные доказательства

![antigravityUsageLimits.ts жёстко задаёт подменённые заголовки Google и вызывает v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts подделывает SSH_CONNECTION, чтобы обойти системное хранилище ключей](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 документирует блокировку нового аккаунта за $20 без прокси за 3 минуты](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 нативно встраивает подменённый опрос хаба CLIProxyAPI в T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Первоисточники

- [Оригинальное расследование в X (часть 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [Гарантия ToS в FAQ](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity ToS](https://antigravity.google/terms) · [Форум разработчиков Google](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Техническое досье 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
