# #05 · T3 Connect: geen end-to-endversleuteling en een gateway die TLS in plaintext termineert

> Elke prompt, elk bronbestand en elke terminalstream die via T3 Connect loopt, eindigt in plaintext binnen de infrastructuur die door T3 wordt beheerd — zonder enige end-to-endversleuteling en met apparaatgoedkeuring die standaard uit staat.

<!-- section:claim -->
## Wat er werd beweerd

- Op 24 november stelde `@theo` dat gespreksdata *"lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) belooft *"encrypted network transport"* zonder te vermelden dat end-to-endversleuteling ontbreekt.

<!-- section:evidence -->
## Wat het bewijs laat zien

- **Plaintext-zichtbaarheid binnen T3's relay (`ManagedEndpointProvider.ts`):** T3 Connect richt Cloudflare Tunnels in binnen T3's eigen Cloudflare-account (`docs/internals/06_t3-connect.md`). Transport-TLS termineert aan de edge van Cloudflare, zonder enige payload-versleuteling van client naar client. Een Cloudflare Workers Route eraan koppelen legt daardoor elke prompt, elk bestand en elke terminalstream in plaintext bloot.
- **E2E-versleuteling afgewezen als buiten scope (`Issue #32098`):** Toen ontwikkelaars om wederzijdse authenticatie en end-to-endversleuteling vroegen, sloot een maintainer [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) als een te grote wijziging; Discussions `#21286` en `#37831` bleven onbeantwoord. Op 25 november verklaarde `@theo` E2E-versleuteling onmogelijk ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **Migratie naar een door T3 beheerde OVH Caddy-gateway (`PR #32945`):** Nadat de Cloudflare Tunnel-rekeningen **$25.000/maand** hadden bereikt, opende `@theo` [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) om over te stappen naar een door T3 gehuurde OVH-server in Hillsboro (`gw.t3coderelay.com`), waar T3's eigen Caddy-instantie TLS termineert en plaintext via een Unix-socket doorstuurt naar een Go-`yamux`-proxy — nog steeds zonder E2E-versleuteling.
- **Apparaatgoedkeuring die standaard uit staat (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval` staat nog altijd standaard op `false` in [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426`). Zoals `SECURITY.md` erkent, geeft een gecompromitteerd cloudaccount of een gelekte relay-signingkey toegang tot de host die gelijkstaat aan shell-toegang.

<!-- section:status -->
## Status upstream (`ca81b7b9`)

- **Nog steeds open:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) voegde inlogmeldingen toe, maar **T3 Connect heeft nog steeds geen enkele end-to-endversleuteling**, `requireConnectDeviceApproval` blijft standaard `false`, en `privacy-policy.astro` is sinds `2026-10-06` ongewijzigd.

<!-- section:visuals -->
## Visueel bewijs

![Issue #32098 bevestigt dat een gestolen cloudaccount of relay-key gekoppelde machines kan besturen zonder E2E-versleuteling](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 verplaatst T3 Connect naar een zelf gehoste OVH-gateway waar Caddy TLS termineert](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts richt Cloudflare Tunnels in binnen T3's eigen account](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Primaire bronnen

- [Oorspronkelijk X-onderzoek (deel 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Reactie op Issue #32098](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Technisch dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
