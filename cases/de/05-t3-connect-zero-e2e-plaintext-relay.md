# #05 · T3 Connect: Keine Ende-zu-Ende-Verschlüsselung & Klartext-Gateway mit TLS-Terminierung

> Jeder Prompt, jede Quelldatei und jeder Terminal-Stream, der durch T3 Connect läuft, endet im Klartext innerhalb der von T3 kontrollierten Infrastruktur — ohne jede Ende-zu-Ende-Verschlüsselung und mit standardmäßig deaktivierter Gerätefreigabe.

<!-- section:claim -->
## Was behauptet wurde

- Am 24. November erklärte `@theo`, Gesprächsdaten *„lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) verspricht *„encrypted network transport"*, ohne das Fehlen einer Ende-zu-Ende-Verschlüsselung offenzulegen.

<!-- section:evidence -->
## Was die Belege zeigen

- **Klartext-Einsicht innerhalb von T3s Relay (`ManagedEndpointProvider.ts`):** T3 Connect richtet Cloudflare Tunnels im eigenen Cloudflare-Konto von T3 ein (`docs/internals/06_t3-connect.md`). Transport-TLS endet am Cloudflare-Edge ohne jegliche Client-zu-Client-Nutzlastverschlüsselung; das Anhängen einer Cloudflare Workers Route legt damit jeden Prompt, jede Datei und jeden Terminal-Stream im Klartext offen.
- **E2E-Verschlüsselung als außerhalb des Umfangs abgelehnt (`Issue #32098`):** Als Entwickler gegenseitige Authentifizierung und Ende-zu-Ende-Verschlüsselung forderten, schloss ein Maintainer [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) mit Verweis auf eine zu große Änderung; die Discussions `#21286` und `#37831` blieben unbeantwortet. Am 25. November erklärte `@theo` Ende-zu-Ende-Verschlüsselung für unmöglich ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **Migration zu einem von T3 betriebenen OVH-Caddy-Gateway (`PR #32945`):** Nachdem die Cloudflare-Tunnel-Rechnungen **25.000 US-Dollar/Monat** erreicht hatten, eröffnete `@theo` [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945), um auf einen von T3 gemieteten OVH-Server in Hillsboro (`gw.t3coderelay.com`) zu wechseln, wo T3s eigene Caddy-Instanz TLS terminiert und Klartext über einen Unix-Socket an einen Go-`yamux`-Proxy weiterleitet — weiterhin ohne E2E-Verschlüsselung.
- **Standardmäßig deaktivierte Gerätefreigabe (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval` ist in [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) weiterhin standardmäßig `false` (Zeilen 1424–1426). Wie `SECURITY.md` einräumt, verschafft ein kompromittiertes Cloud-Konto oder ein geleakter Relay-Signaturschlüssel Shell-äquivalenten Host-Zugriff.

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Weiterhin offen:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) fügte Anmeldebenachrichtigungen hinzu, doch **T3 Connect hat weiterhin keine Ende-zu-Ende-Verschlüsselung**, `requireConnectDeviceApproval` bleibt standardmäßig `false`, und `privacy-policy.astro` ist seit `2026-10-06` unverändert.

<!-- section:visuals -->
## Visuelle Belege

![Issue #32098 bestätigt, dass ein gestohlenes Cloud-Konto oder ein Relay-Schlüssel verknüpfte Rechner ohne E2E-Verschlüsselung steuern kann](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 verlagert T3 Connect auf ein selbst gehostetes OVH-Gateway, bei dem Caddy TLS terminiert](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts richtet Cloudflare Tunnels im eigenen Konto von T3 ein](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Primärquellen

- [Original-X-Recherche (Teil 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Kommentar zu Issue #32098](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Deep Technical Dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
