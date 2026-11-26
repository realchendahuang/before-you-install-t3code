# #19 · `ca81b7b9` Critical Auth & Repo Execution Audit: 30-Day Plaintext LAN Shell, Unrevocable Tokens & `SSH_AUTH_SOCK` Exposure

> Line-by-line verification of latest `main` HEAD (`ca81b7b9`, Nov 25 14:49 CST) confirmed five active security and reliability flaws: 30-day plaintext `--lan` shell cookies with missing-`Origin` bypass, unrevocable 30-day Bearer tokens, replayable `?wsTicket=` URLs, `isIPv4` killing `::1` tunnels, and untrusted repositories executing hooks/submodules with inherited `SSH_AUTH_SOCK` and `GITHUB_TOKEN`.

<!-- section:claim -->
## What Was Claimed

- After the November 24–25 overnight patching blitz, T3 Code was presented as cleaned up and safe for daily engineering use.
- `SECURITY.md` defines a default session as full OS-user shell control, while claiming local/LAN boundaries are properly managed.

<!-- section:evidence -->
## What the Evidence Shows

Verified directly against upstream commit [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd):

- **1. 30-day plaintext `--lan` shell cookies + missing-`Origin` bypass:** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) sets a 30-day default session TTL (equivalent to full OS shell access per `SECURITY.md`). [`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) added the `Secure` attribute only for `https:`, leaving `t3 up --lan` HTTP cookies transmitted in cleartext ([`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)). Worse, [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) returns `true` whenever `Origin` is omitted — so anyone sniffing a single LAN packet can replay the cookie from a non-browser script without `Origin` and hold 30-day host shell access silently.
- **2. Unrevocable 30-day non-DPoP Bearer tokens & no `/logout` route:** `/oauth/token` only shortens lifetime to 1 hour when DPoP proof is supplied; otherwise it issues an unbound **30-day Bearer token** ([`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)). The HTTP contract defines **zero `/logout` endpoint** ([`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)), and `revokeClientSession` explicitly blocks self-revocation with `current_session_revoke_not_allowed` ([`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)).
- **3. Replayable 5-minute `?wsTicket=` URL tokens:** WebSocket tickets travel in query strings (`?wsTicket=`, landing in proxy/access logs) with a 5-minute TTL. [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) checks signature, expiry, audience, and revocation with **no single-use `jti` replay store** — allowing unlimited replays of Bearer RPC and all `media` tickets within 5 minutes ([`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)).
- **4. Untrusted repositories running with full `SSH_AUTH_SOCK` & `GITHUB_TOKEN`:** Worktree setup automatically runs `git submodule update --init --recursive` whenever `.gitmodules` exists ([`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)); [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) omits a global `core.hooksPath=/dev/null` guard; and [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) runs `.claude/settings.json` `SessionStart` hooks synchronously — all inheriting full host `process.env` including `GITHUB_TOKEN` and `SSH_AUTH_SOCK` (whose blast radius spans every remote repo and production server your SSH agent can sign for).
- **5. `isIPv4` silently destroying `::1` loopback tunnels:** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) adds `::1` to the loopback allowlist on line 39, then calls `NodeNet.isIPv4` on line 73 — misclassifying IPv6 loopback Tailscale Serve and T3 Connect sockets as external traffic and calling `socket.destroy()`.

<!-- section:status -->
## Upstream Status (`ca81b7b9`)

- **All 5 issues actively unfixed at `ca81b7b9`:** Confirmed line-by-line on `main` HEAD (`2026-11-25 14:49 CST`), alongside **0 published GitHub Security Advisories** (including the Nov 20 silent path-traversal fix in `PR #39483`).

<!-- section:visuals -->
## Visual Evidence

![http.ts#L215-L241 sending 30-day shell cookies without Secure over plaintext --lan HTTP](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 returning true whenever the Origin header is omitted](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 blocking current-session self-revocation with no logout route](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 running recursive submodule init under inherited SSH_AUTH_SOCK and GITHUB_TOKEN](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 rejecting IPv6 ::1 loopback tunnels via NodeNet.isIPv4](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## Primary Sources

- [Original X Audit Post — Part 19 (ZH)](https://x.com/realchendahuang/status/2125494234614788390) · [Part 19 (EN)](https://x.com/realchendahuang/status/2125494623640465525)
- [Commit `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [Deep Technical Dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
