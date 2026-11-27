# #05 · T3 Connect: Nol Enkripsi End-to-End & Gateway Terminasi TLS Plaintext

> Setiap prompt, berkas sumber, dan aliran terminal yang melewati T3 Connect berakhir sebagai plaintext di dalam infrastruktur yang dikendalikan T3 — tanpa enkripsi end-to-end sama sekali dan dengan persetujuan perangkat yang secara bawaan mati.

<!-- section:claim -->
## Yang Diklaim

- Pada 24 November, `@theo` menyatakan data percakapan *"lives on your machine. It never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) menjanjikan *"encrypted network transport"* tanpa mengungkapkan tidak adanya enkripsi end-to-end.

<!-- section:evidence -->
## Apa yang Ditunjukkan Bukti

- **Visibilitas plaintext di dalam relay T3 (`ManagedEndpointProvider.ts`):** T3 Connect menyediakan Cloudflare Tunnels di dalam akun Cloudflare milik T3 sendiri (`docs/internals/06_t3-connect.md`). TLS transport berakhir di edge Cloudflare tanpa enkripsi payload klien-ke-klien sama sekali, yang berarti memasang Cloudflare Workers Route akan mengekspos setiap prompt, berkas, dan aliran terminal sebagai plaintext.
- **Enkripsi E2E ditolak karena dianggap di luar cakupan (`Issue #32098`):** Ketika para pengembang meminta autentikasi mutual dan enkripsi end-to-end, seorang maintainer menutup [`Issue #32098`](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) karena perubahan itu dianggap terlalu besar; Discussions `#21286` dan `#37831` tidak pernah dijawab. Pada 25 November, `@theo` menyatakan enkripsi E2E mustahil ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)).
- **Migrasi ke gateway Caddy OVH yang dioperasikan T3 (`PR #32945`):** Setelah tagihan Cloudflare Tunnel mencapai **$25.000/bulan**, `@theo` membuka [`PR #32945`](https://github.com/pingdotgg/t3code/pull/32945) untuk pindah ke server OVH Hillsboro sewaan T3 (`gw.t3coderelay.com`), tempat instans Caddy milik T3 sendiri memutuskan TLS dan meneruskan plaintext lewat Unix socket ke proxy Go `yamux` — tetap tanpa enkripsi E2E.
- **Persetujuan perangkat mati secara bawaan (`PR #36419`, `settings.ts`):** `requireConnectDeviceApproval` masih bernilai bawaan `false` di [`packages/contracts/src/settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) (`lines 1424–1426`). Sebagaimana diakui `SECURITY.md`, akun cloud yang disusupi atau kunci penandatangan relay yang bocor memberi akses host setara shell.

<!-- section:status -->
## Status Hulu (`ca81b7b9`)

- **Masih terbuka:** [`PR #42311`](https://github.com/pingdotgg/t3code/pull/42311) menambahkan notifikasi masuk, tetapi **T3 Connect masih tanpa enkripsi end-to-end sama sekali**, `requireConnectDeviceApproval` tetap `false` secara bawaan, dan `privacy-policy.astro` tidak berubah sejak `2026-10-06`.

<!-- section:visuals -->
## Bukti Visual

![Issue #32098 yang menegaskan bahwa akun cloud atau kunci relay yang dicuri dapat mengendalikan mesin tertaut tanpa enkripsi E2E](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 yang memindahkan T3 Connect ke gateway OVH yang di-host sendiri, tempat Caddy memutuskan TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

![ManagedEndpointProvider.ts yang menyediakan Cloudflare Tunnels di dalam akun milik T3 sendiri](../../evidence/extra/x-post05-3-managed-endpoint-provider.jpg)

<!-- section:sources -->
## Sumber Primer

- [Investigasi X Asli (Bagian 5)](https://x.com/realchendahuang/status/2125218189596676555)
- [Komentar Issue #32098](https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926) · [Discussion #21286](https://github.com/pingdotgg/t3code/discussions/21286) · [Discussion #37831](https://github.com/pingdotgg/t3code/discussions/37831)
- [PR #32945](https://github.com/pingdotgg/t3code/pull/32945) · [PR #36419](https://github.com/pingdotgg/t3code/pull/36419) · [PR #42311](https://github.com/pingdotgg/t3code/pull/42311)
- [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) · [`settings.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/contracts/src/settings.ts) · [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md) · [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro)
- [Dossier Teknis Mendalam 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
