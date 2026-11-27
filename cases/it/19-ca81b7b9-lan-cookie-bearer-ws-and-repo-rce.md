# #19 · `ca81b7b9` Audit critico di autenticazione ed esecuzione nei repository: shell LAN in chiaro per 30 giorni, token non revocabili ed esposizione di `SSH_AUTH_SOCK`

> La verifica riga per riga dell'ultimo HEAD di `main` (`ca81b7b9`, 25 nov 14:49 CST) ha confermato cinque falle attive di sicurezza e affidabilità: cookie di shell `--lan` in chiaro validi 30 giorni con bypass in assenza di `Origin`, token Bearer di 30 giorni non revocabili, URL `?wsTicket=` riproducibili, `isIPv4` che elimina i tunnel `::1`, e repository non attendibili che eseguono hook e sottomoduli con `SSH_AUTH_SOCK` e `GITHUB_TOKEN` ereditati.

<!-- section:claim -->
## Che cosa era stato dichiarato

- Dopo il ciclo di patch notturne del 24–25 novembre, T3 Code è stato presentato come ripulito e sicuro per l'uso ingegneristico quotidiano.
- `SECURITY.md` definisce una sessione predefinita come controllo completo della shell dell'utente OS, pur sostenendo che i confini locale/LAN siano gestiti correttamente.

<!-- section:evidence -->
## Che cosa dimostrano le prove

Verificato direttamente sul commit upstream [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd):

- **1. Cookie di shell `--lan` in chiaro validi 30 giorni + bypass in assenza di `Origin`:** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) imposta un TTL di sessione predefinito di 30 giorni (equivalente all'accesso completo alla shell dell'OS secondo `SECURITY.md`). [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) ha aggiunto l'attributo `Secure` solo per `https:`, lasciando i cookie HTTP di `t3 up --lan` trasmessi in chiaro ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). Peggio ancora, [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) restituisce `true` ogni volta che `Origin` è omesso — così chiunque intercetti un singolo pacchetto LAN può riprodurre il cookie da uno script non-browser senza `Origin` e mantenere silenziosamente l'accesso alla shell dell'host per 30 giorni.
- **2. Token Bearer non-DPoP di 30 giorni non revocabili e nessuna rotta `/logout`:** `/oauth/token` riduce la durata a 1 ora solo quando viene fornita la prova DPoP; altrimenti emette un **token Bearer di 30 giorni** non vincolato ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). Il contratto HTTP definisce **zero endpoint `/logout`** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)), e `revokeClientSession` blocca esplicitamente l'autorevoca con `current_session_revoke_not_allowed` ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. Token URL `?wsTicket=` riproducibili validi 5 minuti:** i ticket WebSocket viaggiano nelle query string (`?wsTicket=`, finendo nei log di proxy e access) con un TTL di 5 minuti. [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) verifica firma, scadenza, audience e revoca **senza alcun archivio di replay `jti` monouso** — consentendo replay illimitati del Bearer RPC e di tutti i ticket `media` entro 5 minuti ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. Repository non attendibili eseguiti con pieno `SSH_AUTH_SOCK` e `GITHUB_TOKEN`:** il setup del worktree esegue automaticamente `git submodule update --init --recursive` ogni volta che esiste `.gitmodules` ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)); [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) omette una protezione globale `core.hooksPath=/dev/null`; e [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) esegue sincronicamente gli hook `SessionStart` di `.claude/settings.json` — tutti ereditando l'intero `process.env` dell'host, inclusi `GITHUB_TOKEN` e `SSH_AUTH_SOCK` (il cui raggio d'azione copre ogni repository remoto e server di produzione per cui il tuo agente SSH può firmare).
- **5. `isIPv4` che distrugge silenziosamente i tunnel loopback `::1`:** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) aggiunge `::1` alla allowlist del loopback alla riga 39, poi chiama `NodeNet.isIPv4` alla riga 73 — classificando erroneamente i socket loopback IPv6 di Tailscale Serve e T3 Connect come traffico esterno e invocando `socket.destroy()`.

<!-- section:status -->
## Stato upstream (`ca81b7b9`)

- **Tutti e 5 i problemi attivamente non risolti in `ca81b7b9`:** confermato riga per riga su `main` HEAD (`2026-11-25 14:49 CST`), insieme a **0 GitHub Security Advisory pubblicati** (inclusa la correzione silenziosa del path traversal del 20 nov in `PR #39483`).

<!-- section:visuals -->
## Prove visive

![http.ts#L215-L241 invia cookie di shell validi 30 giorni senza Secure su HTTP --lan in chiaro](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 restituisce true ogni volta che l'header Origin è omesso](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 blocca l'autorevoca della sessione corrente senza rotta di logout](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 esegue l'init ricorsivo dei sottomoduli sotto SSH_AUTH_SOCK e GITHUB_TOKEN ereditati](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 rifiuta i tunnel loopback IPv6 ::1 tramite NodeNet.isIPv4](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## Fonti primarie

- [Post originale dell'audit su X — Parte 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [Parte 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [Commit `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [Dossier tecnico approfondito 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
