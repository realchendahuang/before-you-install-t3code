# #19 · Audit critique de l'authentification et de l'exécution de dépôts : shell LAN en clair pendant 30 jours, jetons non révocables et exposition de `SSH_AUTH_SOCK`

> La vérification ligne par ligne du dernier HEAD de `main` (`ca81b7b9`, 25 nov. 14:49 CST) a confirmé cinq failles de sécurité et de fiabilité actives : cookies de shell `--lan` en clair pendant 30 jours avec contournement en l'absence d'en-tête `Origin`, jetons Bearer de 30 jours non révocables, URLs `?wsTicket=` rejouables, `isIPv4` qui tue les tunnels `::1`, et des dépôts non fiables exécutant des hooks et des sous-modules avec héritage de `SSH_AUTH_SOCK` et de `GITHUB_TOKEN`.

<!-- section:claim -->
## Ce qui avait été affirmé

- Après la campagne de correctifs nocturne des 24 et 25 novembre, T3 Code était présenté comme nettoyé et sûr pour un usage d'ingénierie quotidien.
- `SECURITY.md` définit une session par défaut comme un contrôle total du shell de l'utilisateur OS, tout en affirmant que les frontières locales et LAN sont correctement gérées.

<!-- section:evidence -->
## Ce que montrent les preuves

Vérifié directement sur le commit amont [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) :

- **1. Cookies de shell `--lan` en clair pendant 30 jours + contournement en l'absence d'en-tête `Origin` :** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) fixe une durée de vie de session par défaut de 30 jours (équivalent à un accès complet au shell de l'utilisateur OS selon `SECURITY.md`). [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) n'a ajouté l'attribut `Secure` que pour `https:`, laissant les cookies HTTP de `t3 up --lan` transmis en clair ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). Pire encore, [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) renvoie `true` dès que `Origin` est omis — ainsi, quiconque capture un seul paquet sur le LAN peut rejouer le cookie depuis un script non-navigateur sans `Origin` et conserver silencieusement un accès shell à l'hôte pendant 30 jours.
- **2. Jetons Bearer non-DPoP de 30 jours non révocables & absence de route `/logout` :** `/oauth/token` ne réduit la durée de vie à 1 heure que si une preuve DPoP est fournie ; sinon, il émet un **jeton Bearer de 30 jours** non lié ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). Le contrat HTTP définit **zéro endpoint `/logout`** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)), et `revokeClientSession` bloque explicitement l'auto-révocation avec `current_session_revoke_not_allowed` ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. Jetons d'URL `?wsTicket=` rejouables pendant 5 minutes :** les tickets WebSocket circulent dans les chaînes de requête (`?wsTicket=`, qui finissent dans les journaux des proxys et des contrôles d'accès) avec une durée de vie de 5 minutes. [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) vérifie la signature, l'expiration, l'audience et la révocation avec **aucun magasin de rejeu `jti` à usage unique** — ce qui permet des rejeux illimités du RPC Bearer et de tous les tickets `media` en l'espace de 5 minutes ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. Dépôts non fiables exécutés avec l'ensemble de `SSH_AUTH_SOCK` & `GITHUB_TOKEN` :** la configuration du worktree lance automatiquement `git submodule update --init --recursive` dès que `.gitmodules` existe ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)) ; [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) omet une garde globale `core.hooksPath=/dev/null` ; et [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) exécute de manière synchrone les hooks `SessionStart` de `.claude/settings.json` — tous héritant de l'intégralité du `process.env` de l'hôte, y compris `GITHUB_TOKEN` et `SSH_AUTH_SOCK` (dont le rayon d'action couvre tous les dépôts distants et serveurs de production pour lesquels votre agent SSH peut signer).
- **5. `isIPv4` détruisant silencieusement les tunnels loopback `::1` :** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) ajoute `::1` à la liste d'autorisation du loopback à la ligne 39, puis appelle `NodeNet.isIPv4` à la ligne 73 — classant à tort les sockets loopback IPv6 de Tailscale Serve et de T3 Connect comme du trafic externe et appelant `socket.destroy()`.

<!-- section:status -->
## Statut en amont (`ca81b7b9`)

- **Les 5 problèmes sont toujours non corrigés à `ca81b7b9` :** confirmé ligne par ligne sur le HEAD de `main` (`2026-11-25 14:49 CST`), parallèlement à **0 avis de sécurité GitHub publié** (y compris la correction silencieuse de traversée de chemin du 20 nov. dans `PR #39483`).

<!-- section:visuals -->
## Preuves visuelles

![http.ts#L215-L241 envoyant des cookies de shell de 30 jours sans Secure sur du HTTP --lan en clair](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 renvoyant true dès que l'en-tête Origin est omis](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 bloquant l'auto-révocation de la session courante sans route de déconnexion](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 lançant une initialisation récursive des sous-modules sous SSH_AUTH_SOCK et GITHUB_TOKEN hérités](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 rejetant les tunnels loopback IPv6 ::1 via NodeNet.isIPv4](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## Sources primaires

- [Publication d'audit X originale — Partie 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [Partie 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [Commit `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [Dossier technique approfondi 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
