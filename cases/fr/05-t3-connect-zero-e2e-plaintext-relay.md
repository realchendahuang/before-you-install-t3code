# #05 · T3 Connect : chiffrement de bout en bout inexistant et passerelle de terminaison TLS en clair

> Chaque prompt, fichier source et flux de terminal acheminé par T3 Connect aboutit en clair dans l'infrastructure contrôlée par T3 — sans aucun chiffrement de bout en bout et avec une approbation d'appareil désactivée par défaut.

<!-- section:claim -->
## Ce qui a été affirmé

- Le 24 novembre, `@theo` a déclaré que les données de conversation *"lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) promet un *"encrypted network transport"* sans mentionner l'absence de chiffrement de bout en bout.

<!-- section:evidence -->
## Ce que montrent les pièces

- **Visibilité en clair à l'intérieur du relais de T3 (`ManagedEndpointProvider.ts`) :** T3 Connect provisionne des Cloudflare Tunnels dans le propre compte Cloudflare de T3 (`docs/internals/06_t3-connect.md`). Le TLS de transport se termine à la périphérie de Cloudflare sans aucun chiffrement de charge utile de client à client, ce qui signifie qu'attacher une Cloudflare Workers Route expose chaque prompt, fichier et flux de terminal en clair.
- **Chiffrement E2E écarté comme hors périmètre (`Issue #32098`) :** lorsque des développeurs ont demandé une authentification mutuelle et un chiffrement de bout en bout, un mainteneur a fermé [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) au motif que le changement était trop lourd ; les Discussions `#21286` et `#37831` sont restées sans réponse. Le 25 novembre, `@theo` a déclaré le chiffrement E2E impossible ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **Migration vers une passerelle Caddy OVH exploitée par T3 (`PR #32945`) :** après que les factures Cloudflare Tunnel ont atteint **25 000 $/mois**, `@theo` a ouvert [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) pour basculer sur un serveur OVH loué par T3 à Hillsboro (`gw.t3coderelay.com`), où l'instance Caddy de T3 termine le TLS et transmet le trafic en clair via une socket Unix vers un proxy Go `yamux` — toujours sans chiffrement de bout en bout.
- **Approbation d'appareil désactivée par défaut (`PR #36419`, `settings.ts`) :** `requireConnectDeviceApproval` vaut toujours `false` par défaut dans [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426`). Comme le reconnaît `SECURITY.md`, un compte cloud compromis ou une clé de signature de relais divulguée donne un accès à l'hôte équivalent à un shell.

<!-- section:status -->
## État en amont (`ca81b7b9`)

- **Toujours ouvert :** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) a ajouté des notifications de connexion, mais **T3 Connect n'a toujours aucun chiffrement de bout en bout**, `requireConnectDeviceApproval` reste `false` par défaut, et `privacy-policy.astro` est inchangé depuis le `2026-10-06`.

<!-- section:visuals -->
## Pièces visuelles

![Issue #32098 confirmant qu'un compte cloud ou une clé de relais volés permettent de contrôler les machines liées sans chiffrement E2E](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 déplaçant T3 Connect vers une passerelle OVH auto-hébergée où Caddy termine le TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts provisionnant des Cloudflare Tunnels dans le propre compte de T3](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Sources primaires

- [Enquête X d'origine (partie 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Commentaire de l'Issue #32098](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Dossier technique approfondi 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
