# #19 · `ca81b7b9` Kritieke audit van auth en repo-uitvoering: 30 dagen plaintext LAN-shell, tokens die niet ingetrokken kunnen worden & blootstelling van `SSH_AUTH_SOCK`

> Regel-voor-regel verificatie van de nieuwste `main` HEAD (`ca81b7b9`, 25 nov 14:49 CST) bevestigde vijf actieve beveiligings- en betrouwbaarheidsfouten: 30 dagen geldige plaintext `--lan`-shellcookies met een bypass wanneer `Origin` ontbreekt, Bearer-tokens van 30 dagen die niet ingetrokken kunnen worden, herspeelbare `?wsTicket=`-URL's, `isIPv4` dat `::1`-tunnels sloopt, en niet-vertrouwde repositories die hooks/submodules uitvoeren met overgeërfde `SSH_AUTH_SOCK` en `GITHUB_TOKEN`.

<!-- section:claim -->
## Wat er werd beweerd

- Na de nachtelijke patchmarathon van 24–25 november werd T3 Code gepresenteerd als opgeruimd en veilig voor dagelijks engineeringgebruik.
- `SECURITY.md` definieert een standaardsessie als volledige shellcontrole onder de OS-gebruiker, terwijl het beweert dat lokale/LAN-grenzen goed worden beheerd.

<!-- section:evidence -->
## Wat het bewijs laat zien

Direct geverifieerd tegen upstream commit [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd):

- **1. 30 dagen geldige plaintext `--lan`-shellcookies + bypass wanneer `Origin` ontbreekt:** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) stelt een standaard sessie-TTL van 30 dagen in (gelijk aan volledige OS-shelltoegang volgens `SECURITY.md`). [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) voegde het `Secure`-attribuut alleen toe voor `https:`, waardoor `t3 up --lan` HTTP-cookies in cleartext worden verzonden ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). Erger nog: [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) retourneert `true` zodra `Origin` ontbreekt — dus iedereen die één enkel LAN-pakket onderschept, kan de cookie opnieuw afspelen vanuit een niet-browser script zonder `Origin` en stilzwijgend 30 dagen shelltoegang tot de host houden.
- **2. Bearer-tokens van 30 dagen zonder DPoP die niet ingetrokken kunnen worden & geen `/logout`-route:** `/oauth/token` verkort de levensduur alleen tot 1 uur wanneer een DPoP-proof wordt meegegeven; anders geeft het een niet-gebonden **Bearer-token van 30 dagen** uit ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). Het HTTP-contract definieert **nul `/logout`-endpoints** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)), en `revokeClientSession` blokkeert expliciet zelf-intrekking met `current_session_revoke_not_allowed` ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. Herspeelbare `?wsTicket=`-URL-tokens van 5 minuten:** WebSocket-tickets reizen in querystrings (`?wsTicket=`, belanden in proxy-/accesslogs) met een TTL van 5 minuten. [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) controleert handtekening, vervaldatum, audience en intrekking met **geen single-use `jti`-replaystore** — waardoor onbeperkt opnieuw afspelen mogelijk is van Bearer-RPC en alle `media`-tickets binnen 5 minuten ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. Niet-vertrouwde repositories draaien met volledige `SSH_AUTH_SOCK` & `GITHUB_TOKEN`:** Worktree-setup voert automatisch `git submodule update --init --recursive` uit zodra `.gitmodules` bestaat ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)); [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) laat een globale `core.hooksPath=/dev/null`-guard weg; en [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) voert `SessionStart`-hooks uit `.claude/settings.json` synchroon uit — allemaal met volledige overerving van de host-`process.env`, inclusief `GITHUB_TOKEN` en `SSH_AUTH_SOCK` (waarvan de impact zich uitstrekt over elke remote repo en productieserver waarvoor je SSH-agent kan ondertekenen).
- **5. `isIPv4` die stilletjes `::1`-loopbacktunnels vernietigt:** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) voegt `::1` toe aan de loopback-allowlist op regel 39, en roept vervolgens `NodeNet.isIPv4` aan op regel 73 — waardoor IPv6-loopback Tailscale Serve- en T3 Connect-sockets verkeerd worden geclassificeerd als extern verkeer en `socket.destroy()` wordt aangeroepen.

<!-- section:status -->
## Upstream-status (`ca81b7b9`)

- **Alle 5 problemen actief onopgelost op `ca81b7b9`:** Regel voor regel bevestigd op `main` HEAD (`2026-11-25 14:49 CST`), samen met **0 gepubliceerde GitHub Security Advisories** (inclusief de stille path-traversal-fix van 20 nov in `PR #39483`).

<!-- section:visuals -->
## Visueel bewijs

![http.ts#L215-L241 verzendt 30 dagen geldige shellcookies zonder Secure over plaintext --lan HTTP](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 retourneert true zodra de Origin-header ontbreekt](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 blokkeert zelf-intrekking van de huidige sessie zonder logout-route](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 voert recursieve submodule-init uit onder overgeërfde SSH_AUTH_SOCK en GITHUB_TOKEN](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 verwerpt IPv6 ::1-loopbacktunnels via NodeNet.isIPv4](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## Primaire bronnen

- [Originele X-auditpost — deel 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [Deel 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [Commit `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [Diepgaand technisch dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
