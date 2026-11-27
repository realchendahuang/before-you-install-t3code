# #04 · Google Antigravity Header Spoofing, Fake `SSH_CONNECTION` & 3-Minute Account Bans

> Despite guaranteeing ToS compliance in its FAQ, T3 Code extracts OS keyring credentials, spoofs Google internal headers (`antigravity/hub/2.24.0`) against `v1internal`, and injects fake `SSH_CONNECTION` values — exposing personal Google subscriptions to rapid bans.

<!-- section:claim -->
## What Was Claimed

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) assured paying subscribers: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- When banned users filed [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713), a maintainer denied hitting Antigravity's backend or reusing tokens — and on X, `@theo` blamed third-party proxies (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## What the Evidence Shows

- **OS credential extraction & spoofed `v1internal` calls:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) extracts Google OAuth tokens from local files, `@napi-rs/keyring`, or Windows Credential Manager (`CredReadW` via `ffi-rs` on `advapi32.dll`), hardcodes `antigravity/hub/2.24.0`, and `POST`s directly to Google's private `v1internal` endpoint. Google staff confirmed on the [official forum](https://discuss.ai.google.dev/t/185992) that Section 6 of the [Google Antigravity ToS](https://antigravity.google/terms) prohibits third-party tools from extracting or reusing credentials to query backend endpoints directly.
- **Forged `SSH_CONNECTION` & cross-account leakage:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) injects a forged `SSH_CONNECTION` environment variable (`"127.0.0.1 0 127.0.0.1 0"`) to trick Google's CLI out of OS keychain isolation into plaintext files. When Google updated its CLI on November 24, [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) confirmed prompts from Account A silently routed to Account B.
- **Fresh $20 account banned in 3 minutes (`Issue #41536`):** A brand-new $20 Google AI subscription with zero proxies — using only T3-managed Antigravity — was banned on its very first message, 3 minutes after setup. Maintainers closed the issue as a duplicate without adding any user warning.
- **Native client & CLIProxyAPI spoofing:** `@theo` personally merged [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) masquerading as `"zed"`, while merged [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) wired [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) hub polling with spoofed `claude-code/2.1.273`, `grok-cli/1.0.77`, and `antigravityUserAgent` headers.

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
## Upstream Status (`ca81b7b9`)

- **Still active:** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) added [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) to display Google `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) account verification links — confirming active Google enforcement — while all four spoofing and token-extraction paths remain live.

<!-- section:visuals -->
## Visual Evidence

![antigravityUsageLimits.ts hardcoding spoofed Google headers and calling v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts forging SSH_CONNECTION to bypass OS keychain storage](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 documenting a fresh $20 no-proxy account banned in 3 minutes](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 natively wiring spoofed CLIProxyAPI hub polling into T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Primary Sources

- [Original X Investigation (Part 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [FAQ ToS guarantee](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity ToS](https://antigravity.google/terms) · [Google Developer Forum](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Deep Technical Dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
