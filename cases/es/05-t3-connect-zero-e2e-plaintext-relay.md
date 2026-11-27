# #05 · T3 Connect: cifrado de extremo a extremo inexistente y puerta de enlace TLS que termina en texto plano

> Cada prompt, archivo de código fuente y flujo de terminal que pasa por T3 Connect acaba en texto plano dentro de la infraestructura controlada por T3, sin ningún cifrado de extremo a extremo y con la aprobación de dispositivos desactivada por defecto.

<!-- section:claim -->
## Qué se afirmó

- El 24 de noviembre, `@theo` afirmó que los datos de la conversación *"lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) promete *"encrypted network transport"* sin revelar la ausencia de cifrado de extremo a extremo.

<!-- section:evidence -->
## Qué muestran las pruebas

- **Visibilidad en texto plano dentro del relay de T3 (`ManagedEndpointProvider.ts`):** T3 Connect aprovisiona Cloudflare Tunnels dentro de la propia cuenta de Cloudflare de T3 (`docs/internals/06_t3-connect.md`). El TLS de transporte termina en el borde de Cloudflare sin ningún cifrado de carga útil entre cliente y cliente, lo que significa que añadir una Route de Cloudflare Workers expone en texto plano cada prompt, cada archivo y cada flujo de terminal.
- **Cifrado E2E rechazado por quedar fuera de alcance (`Issue #32098`):** Cuando los desarrolladores pidieron autenticación mutua y cifrado de extremo a extremo, un mantenedor cerró [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) por considerarlo un cambio demasiado grande; las Discussions `#21286` y `#37831` quedaron sin respuesta. El 25 de noviembre, `@theo` declaró imposible el cifrado E2E ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **Migración a una puerta de enlace Caddy en OVH operada por T3 (`PR #32945`):** Después de que las facturas de Cloudflare Tunnel llegaran a **25.000 USD/mes**, `@theo` abrió [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) para trasladarse a un servidor OVH de Hillsboro alquilado por T3 (`gw.t3coderelay.com`), donde la propia instancia de Caddy de T3 termina el TLS y reenvía el texto plano por un socket Unix a un proxy `yamux` escrito en Go, todavía sin cifrado E2E.
- **Aprobación de dispositivos desactivada por defecto (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval` sigue teniendo `false` como valor por defecto en [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426`). Como reconoce `SECURITY.md`, una cuenta en la nube comprometida o una clave de firma del relay filtrada otorga un acceso al host equivalente al de un shell.

<!-- section:status -->
## Estado upstream (`ca81b7b9`)

- **Sigue abierto:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) añadió notificaciones de inicio de sesión, pero **T3 Connect sigue sin ningún cifrado de extremo a extremo**, `requireConnectDeviceApproval` sigue siendo `false` por defecto y `privacy-policy.astro` no ha cambiado desde el `2026-10-06`.

<!-- section:visuals -->
## Pruebas visuales

![Issue #32098 que confirma que una cuenta en la nube robada o una clave del relay pueden controlar las máquinas vinculadas sin cifrado E2E](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 que traslada T3 Connect a una puerta de enlace OVH autoalojada donde Caddy termina el TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts aprovisionando Cloudflare Tunnels dentro de la propia cuenta de T3](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Fuentes primarias

- [Investigación original en X (Parte 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Comentario en el Issue #32098](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Dosier técnico en profundidad 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
