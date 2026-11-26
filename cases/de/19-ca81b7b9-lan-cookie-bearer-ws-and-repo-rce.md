# #19 · `ca81b7b9` Kritisches Audit zu Authentifizierung und Repo-Ausführung: 30 Tage Klartext-LAN-Shell, nicht widerrufbare Tokens & `SSH_AUTH_SOCK`-Exposition

> Die zeilenweise Verifikation des neuesten `main`-HEAD (`ca81b7b9`, 25. Nov., 14:49 CST) bestätigte fünf aktive Sicherheits- und Zuverlässigkeitsmängel: 30 Tage gültige Klartext-Shell-Cookies für `--lan` mit Bypass bei fehlendem `Origin`, nicht widerrufbare 30-Tage-Bearer-Tokens, wiederverwendbare `?wsTicket=`-URLs, `isIPv4`, das `::1`-Tunnel zunichtemacht, und nicht vertrauenswürdige Repositories, die Hooks/Submodule mit vererbtem `SSH_AUTH_SOCK` und `GITHUB_TOKEN` ausführen.

<!-- section:claim -->
## Was behauptet wurde

- Nach dem nächtlichen Patch-Marathon vom 24. auf den 25. November wurde T3 Code als aufgeräumt und sicher für den täglichen Engineering-Einsatz präsentiert.
- `SECURITY.md` definiert eine Standardsitzung als vollständige Shell-Kontrolle unter dem OS-Benutzer und behauptet zugleich, lokale/LAN-Grenzen würden ordnungsgemäß verwaltet.

<!-- section:evidence -->
## Was die Belege zeigen

Direkt gegen den Upstream-Commit [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) verifiziert:

- **1. 30 Tage gültige Klartext-Shell-Cookies für `--lan` + Bypass bei fehlendem `Origin`:** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) setzt eine Standard-Sitzungs-TTL von 30 Tagen (entspricht laut `SECURITY.md` vollständigem OS-Shell-Zugriff). [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) fügte das `Secure`-Attribut nur für `https:` hinzu, sodass `t3 up --lan`-HTTP-Cookies im Klartext übertragen werden ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). Schlimmer noch: [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) gibt `true` zurück, wann immer `Origin` fehlt — wer also ein einziges LAN-Paket mitschneidet, kann das Cookie aus einem Nicht-Browser-Skript ohne `Origin` wiederverwenden und sich so unbemerkt 30 Tage lang Shell-Zugriff auf den Host sichern.
- **2. Nicht widerrufbare 30-Tage-Bearer-Tokens ohne DPoP & keine `/logout`-Route:** `/oauth/token` verkürzt die Lebensdauer nur dann auf 1 Stunde, wenn ein DPoP-Nachweis geliefert wird; andernfalls wird ein ungebundenes **30-Tage-Bearer-Token** ausgestellt ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). Der HTTP-Vertrag definiert **keinen `/logout`-Endpunkt** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)), und `revokeClientSession` blockiert die Selbstwiderrufung ausdrücklich mit `current_session_revoke_not_allowed` ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. Wiederverwendbare 5-Minuten-`?wsTicket=`-URL-Tokens:** WebSocket-Tickets werden in Query-Strings übertragen (`?wsTicket=`, landen in Proxy-/Access-Logs) und haben eine TTL von 5 Minuten. [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) prüft Signatur, Ablauf, Audience und Widerruf mit **keinem Einmal-`jti`-Replay-Store** — wodurch Bearer-RPC und alle `media`-Tickets innerhalb von 5 Minuten unbegrenzt wiederverwendet werden können ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. Nicht vertrauenswürdige Repositories laufen mit vollem `SSH_AUTH_SOCK` & `GITHUB_TOKEN`:** Die Worktree-Einrichtung führt automatisch `git submodule update --init --recursive` aus, wann immer `.gitmodules` existiert ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)); [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) lässt einen globalen `core.hooksPath=/dev/null`-Schutz fehlen; und [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) führt `.claude/settings.json`-`SessionStart`-Hooks synchron aus — alle erben das vollständige Host-`process.env` einschließlich `GITHUB_TOKEN` und `SSH_AUTH_SOCK` (deren Wirkungskreis jedes Remote-Repository und jeden Produktionsserver umfasst, für die dein SSH-Agent signieren kann).
- **5. `isIPv4` zerstört stillschweigend `::1`-Loopback-Tunnel:** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) fügt `::1` in Zeile 39 zur Loopback-Allowlist hinzu und ruft dann in Zeile 73 `NodeNet.isIPv4` auf — IPv6-Loopback-Sockets von Tailscale Serve und T3 Connect werden als externer Traffic fehlklassifiziert und `socket.destroy()` wird aufgerufen.

<!-- section:status -->
## Upstream-Status (`ca81b7b9`)

- **Alle 5 Probleme sind bei `ca81b7b9` weiterhin nicht behoben:** zeilenweise auf `main`-HEAD bestätigt (`2026-11-25 14:49 CST`), bei **0 veröffentlichten GitHub Security Advisories** (einschließlich des stillen Path-Traversal-Fixes vom 20. November in `PR #39483`).

<!-- section:visuals -->
## Visuelle Belege

![http.ts#L215-L241 sendet 30 Tage gültige Shell-Cookies ohne Secure über Klartext-HTTP mit --lan](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 gibt true zurück, wann immer der Origin-Header fehlt](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 blockiert die Selbstwiderrufung der aktuellen Sitzung, ohne Logout-Route](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 führt rekursive Submodul-Initialisierung unter vererbtem SSH_AUTH_SOCK und GITHUB_TOKEN aus](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 weist IPv6-::1-Loopback-Tunnel über NodeNet.isIPv4 zurück](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## Primärquellen

- [Originaler X-Audit-Beitrag — Teil 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [Teil 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [Commit `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [Technisches Detail-Dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
