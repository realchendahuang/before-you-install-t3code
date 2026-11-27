# #05 · T3 Connect: полное отсутствие сквозного шифрования и шлюз с терминацией TLS, пропускающий открытый текст

> Каждый промпт, исходный файл и поток терминала, проходящие через T3 Connect, обрабатываются в открытом виде внутри инфраструктуры, контролируемой T3, — при полном отсутствии сквозного шифрования и одобрении устройств, отключённом по умолчанию.

<!-- section:claim -->
## Что утверждалось

- 24 ноября `@theo` заявил, что данные переписки *"lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) обещает *"encrypted network transport"*, не раскрывая отсутствие сквозного шифрования.

<!-- section:evidence -->
## Что показывают доказательства

- **Открытый текст виден внутри релея T3 (`ManagedEndpointProvider.ts`):** T3 Connect разворачивает Cloudflare Tunnels внутри собственного аккаунта Cloudflare компании T3 (`docs/internals/06_t3-connect.md`). Транспортный TLS терминируется на периметре Cloudflare при полном отсутствии шифрования полезной нагрузки между клиентами, а значит, подключение Cloudflare Workers Route раскрывает каждый промпт, файл и поток терминала в открытом виде.
- **Сквозное шифрование отклонено как выходящее за рамки (`Issue #32098`):** Когда разработчики запросили взаимную аутентификацию и сквозное шифрование, мейнтейнер закрыл [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) как слишком крупное изменение; Discussions `#21286` и `#37831` остались без ответа. 25 ноября `@theo` объявил сквозное шифрование невозможным ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **Переезд на шлюз OVH Caddy, управляемый T3 (`PR #32945`):** После того как счета за Cloudflare Tunnel достигли **$25,000 в месяц**, `@theo` открыл [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945), чтобы перейти на арендованный T3 сервер OVH в Хиллсборо (`gw.t3coderelay.com`), где собственный экземпляр Caddy компании T3 терминирует TLS и передаёт открытый текст через Unix-сокет в Go-прокси `yamux` — по-прежнему без сквозного шифрования.
- **Одобрение устройств отключено по умолчанию (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval` по-прежнему по умолчанию равен `false` в [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426`). Как признаёт `SECURITY.md`, скомпрометированный облачный аккаунт или утёкший ключ подписи релея даёт доступ к хосту, эквивалентный доступу к оболочке.

<!-- section:status -->
## Статус в upstream (`ca81b7b9`)

- **Всё ещё открыто:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) добавил уведомления о входе в систему, но **в T3 Connect по-прежнему нет сквозного шифрования**, `requireConnectDeviceApproval` остаётся `false` по умолчанию, а `privacy-policy.astro` не менялся с `2026-10-06`.

<!-- section:visuals -->
## Визуальные доказательства

![Issue #32098 подтверждает, что украденный облачный аккаунт или ключ релея позволяет управлять подключёнными машинами без сквозного шифрования](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 переносит T3 Connect на самостоятельно размещённый шлюз OVH, где TLS терминирует Caddy](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts разворачивает Cloudflare Tunnels внутри собственного аккаунта T3](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Первоисточники

- [Original X Investigation (Part 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Issue #32098 comment](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Deep Technical Dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
