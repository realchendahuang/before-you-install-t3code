# #05 · T3 Connect: Zero End-to-End Encryption & Plaintext TLS-Termination Gateway

> Every prompt, source file, and terminal stream routed through T3 Connect terminates in plaintext inside T3-controlled infrastructure — with zero end-to-end encryption and default-off device approval.

<!-- section:claim -->
## What Was Claimed

- On November 24, `@theo` stated conversation data *"lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) promises *"encrypted network transport"* without disclosing the absence of end-to-end encryption.

<!-- section:evidence -->
## What the Evidence Shows

- **Plaintext visibility inside T3's relay (`ManagedEndpointProvider.ts`):** T3 Connect provisions Cloudflare Tunnels inside T3's own Cloudflare account (`docs/internals/06_t3-connect.md`). Transport TLS terminates at Cloudflare's edge with zero client-to-client payload encryption, meaning attaching a Cloudflare Workers Route exposes every prompt, file, and terminal stream in plaintext.
- **E2E encryption rejected as out of scope (`Issue #32098`):** When developers requested mutual auth and end-to-end encryption, a maintainer closed [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) as too large a change; Discussions `#21286` and `#37831` went unanswered. On November 25, `@theo` declared E2E encryption impossible ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **Migration to T3-operated OVH Caddy gateway (`PR #32945`):** After Cloudflare Tunnel bills reached **$25,000/month**, `@theo` opened [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) to move onto a T3-rented OVH Hillsboro server (`gw.t3coderelay.com`), where T3's own Caddy instance terminates TLS and forwards plaintext over a Unix socket to a Go `yamux` proxy — still without E2E encryption.
- **Default-off device approval (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval` still defaults to `false` in [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426`). As `SECURITY.md` acknowledges, a compromised cloud account or leaked relay signing key grants shell-equivalent host access.

<!-- section:status -->
## Upstream Status (`ca81b7b9`)

- **Still open:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) added sign-in notifications, but **T3 Connect still has zero end-to-end encryption**, `requireConnectDeviceApproval` remains `false` by default, and `privacy-policy.astro` remains unchanged since `2026-10-06`.

<!-- section:visuals -->
## Visual Evidence

![Issue #32098 confirming a stolen cloud account or relay key can control linked machines without E2E encryption](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 moving T3 Connect onto a self-hosted OVH gateway where Caddy terminates TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts provisioning Cloudflare Tunnels inside T3's own account](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Primary Sources

- [Original X Investigation (Part 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Issue #32098 comment](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Deep Technical Dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
