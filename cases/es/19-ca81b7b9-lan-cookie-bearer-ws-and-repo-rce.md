# #19 · `ca81b7b9` Auditoría crítica de autenticación y ejecución de repositorios: 30 días de shell LAN en texto plano, tokens irrevocables y exposición de `SSH_AUTH_SOCK`

> La verificación línea por línea del último HEAD de `main` (`ca81b7b9`, 25 nov 14:49 CST) confirmó cinco fallos activos de seguridad y fiabilidad: cookies de shell `--lan` en texto plano con 30 días de vigencia y bypass por ausencia de `Origin`, tokens Bearer de 30 días irrevocables, URLs `?wsTicket=` reutilizables, `isIPv4` matando túneles `::1`, y repositorios no confiables que ejecutan hooks/submódulos con `SSH_AUTH_SOCK` y `GITHUB_TOKEN` heredados.

<!-- section:claim -->
## Qué se afirmó

- Tras el maratón de parches de la noche del 24 al 25 de noviembre, T3 Code se presentó como saneado y seguro para el uso diario en ingeniería.
- `SECURITY.md` define una sesión por defecto como control total del shell del usuario del SO, mientras afirma que los límites local/LAN están gestionados correctamente.

<!-- section:evidence -->
## Qué muestra la evidencia

Verificado directamente contra el commit upstream [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd):

- **1. Cookies de shell `--lan` en texto plano con 30 días de vigencia + bypass por ausencia de `Origin`:** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) fija un TTL de sesión por defecto de 30 días (equivalente a acceso total al shell del SO según `SECURITY.md`). [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) añadió el atributo `Secure` solo para `https:`, dejando que las cookies HTTP de `t3 up --lan` se transmitan en claro ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). Peor aún, [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) devuelve `true` siempre que se omite `Origin`; así, cualquiera que capture un solo paquete en la LAN puede reutilizar la cookie desde un script que no sea un navegador y sin `Origin`, y conservar en silencio acceso al shell del host durante 30 días.
- **2. Tokens Bearer de 30 días sin DPoP e irrevocables, y ausencia de ruta `/logout`:** `/oauth/token` solo reduce la vida útil a 1 hora cuando se aporta una prueba DPoP; en caso contrario emite un **token Bearer de 30 días** sin vínculo ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). El contrato HTTP define **cero endpoints `/logout`** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)), y `revokeClientSession` bloquea explícitamente la autorrevocación con `current_session_revoke_not_allowed` ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. Tokens de URL `?wsTicket=` de 5 minutos reutilizables:** los tickets de WebSocket viajan en cadenas de consulta (`?wsTicket=`, que acaban en los logs de proxy y de acceso) con un TTL de 5 minutos. [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) comprueba firma, caducidad, audiencia y revocación **sin ningún almacén de replay de `jti` de un solo uso**, lo que permite reutilizaciones ilimitadas del RPC Bearer y de todos los tickets de `media` dentro de esos 5 minutos ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. Repositorios no confiables ejecutados con `SSH_AUTH_SOCK` y `GITHUB_TOKEN` completos:** la preparación del worktree ejecuta automáticamente `git submodule update --init --recursive` siempre que exista `.gitmodules` ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)); [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) omite una protección global `core.hooksPath=/dev/null`; y [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) ejecuta de forma síncrona los hooks `SessionStart` de `.claude/settings.json`; todos ellos heredan el `process.env` completo del host, incluidos `GITHUB_TOKEN` y `SSH_AUTH_SOCK` (cuyo radio de impacto abarca todos los repositorios remotos y servidores de producción para los que tu agente SSH pueda firmar).
- **5. `isIPv4` destruyendo en silencio los túneles de loopback `::1`:** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) añade `::1` a la lista de permitidos de loopback en la línea 39 y luego llama a `NodeNet.isIPv4` en la línea 73, clasificando erróneamente los sockets de loopback IPv6 de Tailscale Serve y T3 Connect como tráfico externo y llamando a `socket.destroy()`.

<!-- section:status -->
## Estado upstream (`ca81b7b9`)

- **Los 5 problemas siguen sin corregir en `ca81b7b9`:** confirmado línea por línea sobre el HEAD de `main` (`2026-11-25 14:49 CST`), junto con **0 avisos de seguridad de GitHub publicados** (incluida la corrección silenciosa de path traversal del 20 de noviembre en `PR #39483`).

<!-- section:visuals -->
## Evidencia visual

![http.ts#L215-L241 enviando cookies de shell de 30 días sin Secure sobre HTTP --lan en texto plano](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 devolviendo true siempre que se omite la cabecera Origin](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 bloqueando la autorrevocación de la sesión actual sin ruta de logout](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 ejecutando la inicialización recursiva de submódulos bajo SSH_AUTH_SOCK y GITHUB_TOKEN heredados](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 rechazando túneles de loopback IPv6 ::1 mediante NodeNet.isIPv4](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## Fuentes primarias

- [Publicación original de la auditoría en X — Parte 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [Parte 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [Commit `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [Dossier técnico detallado 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
