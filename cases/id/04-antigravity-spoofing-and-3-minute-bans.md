# #04 · Pemalsuan Header Google Antigravity, `SSH_CONNECTION` Palsu & Larangan Akun dalam 3 Menit

> Meski menjamin kepatuhan ToS di FAQ-nya, T3 Code mengekstrak kredensial keyring OS, memalsukan header internal Google (`antigravity/hub/2.24.0`) ke endpoint `v1internal`, dan menyuntikkan nilai `SSH_CONNECTION` palsu — membuat langganan Google pribadi rentan dilarang dalam hitungan menit.

<!-- section:claim -->
## Apa yang Diklaim

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) meyakinkan pelanggan berbayar: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- Saat pengguna yang dilarang membuka [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713), seorang maintainer membantah telah menyentuh backend Antigravity atau memakai ulang token — dan di X, `@theo` menyalahkan proxy pihak ketiga (`"Not with cliproxy right?"`).

<!-- section:evidence -->
## Apa yang Ditunjukkan Bukti

- **Ekstraksi kredensial OS & panggilan `v1internal` yang dipalsukan:** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) mengekstrak token OAuth Google dari file lokal, `@napi-rs/keyring`, atau Windows Credential Manager (`CredReadW` lewat `ffi-rs` pada `advapi32.dll`), meng-hardcode `antigravity/hub/2.24.0`, lalu melakukan `POST` langsung ke endpoint privat `v1internal` milik Google. Staf Google menegaskan di [forum resmi](https://discuss.ai.google.dev/t/185992) bahwa Bagian 6 dari [ToS Google Antigravity](https://antigravity.google/terms) melarang alat pihak ketiga mengekstrak atau memakai ulang kredensial untuk mengakses endpoint backend secara langsung.
- **`SSH_CONNECTION` palsu & kebocoran antar-akun:** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) menyuntikkan variabel lingkungan `SSH_CONNECTION` palsu (`"127.0.0.1 0 127.0.0.1 0"`) untuk mengelabui CLI Google agar keluar dari isolasi keychain OS dan menulis ke file plaintext. Ketika Google memperbarui CLI-nya pada 24 November, [`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) mengonfirmasi prompt dari Akun A diam-diam dialihkan ke Akun B.
- **Akun $20 baru dilarang dalam 3 menit (`Issue #41536`):** Langganan Google AI $20 yang baru dibuat, tanpa proxy sama sekali — hanya memakai Antigravity yang dikelola T3 — dilarang pada pesan pertamanya, 3 menit setelah penyiapan. Para maintainer menutup issue tersebut sebagai duplikat tanpa menambahkan peringatan apa pun kepada pengguna.
- **Pemalsuan klien native & CLIProxyAPI:** `@theo` secara pribadi melakukan merge atas [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) yang menyamar sebagai `"zed"`, sementara [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) yang telah di-merge menyambungkan polling hub [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) dengan header palsu `claude-code/2.1.273`, `grok-cli/1.0.77`, dan `antigravityUserAgent`.

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
## Status Hulu (`ca81b7b9`)

- **Masih berjalan:** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) menambahkan [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) untuk menampilkan tautan verifikasi akun Google `403 PERMISSION_DENIED` (`VALIDATION_REQUIRED`) — menegaskan penegakan aturan Google yang aktif — sementara keempat jalur pemalsuan dan ekstraksi token masih tetap hidup.

<!-- section:visuals -->
## Bukti Visual

![antigravityUsageLimits.ts meng-hardcode header Google palsu dan memanggil v1internal](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts memalsukan SSH_CONNECTION untuk melewati penyimpanan keychain OS](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 mendokumentasikan akun $20 baru tanpa proxy yang dilarang dalam 3 menit](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 menyambungkan polling hub CLIProxyAPI palsu secara native ke T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## Sumber Utama

- [Investigasi X Asli (Bagian 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [Jaminan ToS di FAQ](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [ToS Google Antigravity](https://antigravity.google/terms) · [Google Developer Forum](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Dossier Teknis Mendalam 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
