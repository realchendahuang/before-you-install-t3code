# #04 · Usurpation d'en-têtes Google Antigravity, fausse `SSH_CONNECTION` et bannissements de compte en 3 minutes

> Bien que sa FAQ garantisse le respect des conditions d'utilisation, T3 Code extrait les identifiants du trousseau de l'OS, usurpe des en-têtes internes de Google (`antigravity/hub/2.24.0`) face à `v1internal` et injecte de fausses valeurs `SSH_CONNECTION` — exposant les abonnements Google personnels à des bannissements rapides.

<!-- section:claim -->
## Ce qui a été affirmé

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) assurait aux abonnés payants : *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- Lorsque des utilisateurs bannis ont ouvert l'[`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713), un mainteneur a nié tout appel au backend d'Antigravity comme toute réutilisation de jetons — et sur X, `@theo` a mis en cause des proxys tiers (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## Ce que montrent les preuves

- **Extraction des identifiants de l'OS et appels `v1internal` usurpés :** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) extrait les jetons OAuth Google depuis des fichiers locaux, `@napi-rs/keyring` ou le Gestionnaire d'identifiants Windows (`CredReadW` via `ffi-rs` sur `advapi32.dll`), code en dur `antigravity/hub/2.24.0`, et envoie des `POST` directement vers le point de terminaison privé `v1internal` de Google. Des employés de Google ont confirmé sur le [forum officiel](https://discuss.ai.google.dev/t/185992) que l'article 6 des [conditions d'utilisation de Google Antigravity](https://antigravity.google/terms) interdit aux outils tiers d'extraire ou de réutiliser des identifiants pour interroger directement les points de terminaison du backend.
- **`SSH_CONNECTION` falsifiée et fuite entre comptes :** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) injecte une variable d'environnement `SSH_CONNECTION` falsifiée (`"127.0.0.1 0 127.0.0.1 0"`) pour faire sortir la CLI de Google de l'isolation du trousseau de l'OS et la forcer à écrire dans des fichiers en clair. Lorsque Google a mis à jour sa CLI le 24 novembre, l'[`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) a confirmé que les requêtes du compte A étaient silencieusement routées vers le compte B.
- **Un compte neuf à 20 $ banni en 3 minutes (`Issue #41536`) :** Un abonnement Google AI à 20 $ flambant neuf, sans aucun proxy — utilisant uniquement l'Antigravity géré par T3 — a été banni dès son tout premier message, 3 minutes après la configuration. Les mainteneurs ont clos l'issue comme doublon, sans ajouter le moindre avertissement destiné aux utilisateurs.
- **Usurpation du client natif et de CLIProxyAPI :** `@theo` a personnellement fusionné la [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) en se faisant passer pour `"zed"`, tandis que la [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800), également fusionnée, branchait le polling de hub de [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) avec les en-têtes usurpés `claude-code/2.1.273`, `grok-cli/1.0.77` et `antigravityUserAgent`.

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
## État en amont (`ca81b7b9`)

- **Toujours actif :** la [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) a ajouté [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) pour afficher les liens de vérification de compte Google `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) — ce qui confirme que Google applique bien ses règles — tandis que les quatre voies d'usurpation et d'extraction de jetons restent actives.

<!-- section:visuals -->
## Preuves visuelles

![antigravityUsageLimits.ts codant en dur des en-têtes Google usurpés et appelant v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts falsifiant SSH_CONNECTION pour contourner le stockage du trousseau de l'OS](../../evidence/13-antigravity-ssh-spoof.png)

![L'issue #41536 documentant un compte neuf à 20 $ sans proxy banni en 3 minutes](../../evidence/14-issue41536-fresh-ban.png)

![La PR #33800 branchant nativement le polling de hub CLIProxyAPI usurpé dans T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Sources primaires

- [Enquête X originale (partie 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [Garantie ToS de la FAQ](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Conditions d'utilisation de Google Antigravity](https://antigravity.google/terms) · [Forum des développeurs Google](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Dossier technique approfondi 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
