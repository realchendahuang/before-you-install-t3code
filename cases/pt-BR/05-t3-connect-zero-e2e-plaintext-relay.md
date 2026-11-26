# #05 · T3 Connect: zero criptografia ponta a ponta e gateway de terminação TLS em texto claro

> Todo prompt, arquivo-fonte e fluxo de terminal roteado pelo T3 Connect termina em texto claro dentro da infraestrutura controlada pela T3 — com zero criptografia ponta a ponta e aprovação de dispositivo desativada por padrão.

<!-- section:claim -->
## O que foi alegado

- Em 24 de novembro, `@theo` afirmou que os dados da conversa *"lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) promete *"encrypted network transport"* sem divulgar a ausência de criptografia ponta a ponta.

<!-- section:evidence -->
## O que as evidências mostram

- **Visibilidade em texto claro dentro do relay da T3 (`ManagedEndpointProvider.ts`):** o T3 Connect provisiona Cloudflare Tunnels dentro da própria conta Cloudflare da T3 (`docs/internals/06_t3-connect.md`). O TLS de transporte termina na borda da Cloudflare sem qualquer criptografia de payload cliente-para-cliente, o que significa que anexar uma Cloudflare Workers Route expõe cada prompt, arquivo e fluxo de terminal em texto claro.
- **Criptografia ponta a ponta descartada como fora de escopo (`Issue #32098`):** quando desenvolvedores pediram autenticação mútua e criptografia ponta a ponta, um mantenedor fechou a [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) por ser uma mudança grande demais; as Discussions `#21286` e `#37831` ficaram sem resposta. Em 25 de novembro, `@theo` declarou a criptografia ponta a ponta impossível ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **Migração para um gateway OVH com Caddy operado pela T3 (`PR #32945`):** depois que as faturas do Cloudflare Tunnel chegaram a **US$ 25.000/mês**, `@theo` abriu o [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) para migrar para um servidor OVH em Hillsboro alugado pela T3 (`gw.t3coderelay.com`), onde a instância Caddy da própria T3 termina o TLS e encaminha texto claro por um Unix socket para um proxy Go `yamux` — ainda sem criptografia ponta a ponta.
- **Aprovação de dispositivo desativada por padrão (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval` ainda tem valor padrão `false` em [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426`). Como o `SECURITY.md` reconhece, uma conta de nuvem comprometida ou uma chave de assinatura do relay vazada concede acesso ao host equivalente a shell.

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Ainda em aberto:** o [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) adicionou notificações de login, mas **o T3 Connect continua com zero criptografia ponta a ponta**, `requireConnectDeviceApproval` segue `false` por padrão e o `privacy-policy.astro` permanece inalterado desde `2026-10-06`.

<!-- section:visuals -->
## Evidências visuais

![Issue #32098 confirmando que uma conta de nuvem roubada ou uma chave de relay pode controlar máquinas vinculadas sem criptografia ponta a ponta](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 movendo o T3 Connect para um gateway OVH auto-hospedado onde o Caddy termina o TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts provisionando Cloudflare Tunnels dentro da própria conta da T3](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Fontes primárias

- [Original X Investigation (Part 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Issue #32098 comment](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Deep Technical Dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
