# #01 · Telemetri Default di Balik Janji "No Telemetry" pada Halaman Depan

> Saat halaman depannya menjanjikan *"No telemetry. Unless you opt in. Full stop."*, T3 Code mengaktifkan pelacakan PostHog secara default, mengalirkan salinan mentah lewat `ingest.t3.codes` yang closed-source, melakukan hashing terhadap kredensial eksternal `~/.codex` dan `~/.claude.json`, serta menolak empat PR opt-out dari komunitas.

<!-- section:claim -->
## Apa yang Diklaim

- Halaman depan T3 Code secara mencolok menjanjikan: *"No telemetry / Unless you opt in. Full stop."*
- Dipresentasikan ke publik sebagai klien coding AI lokal open-source yang mengutamakan privasi.

<!-- section:evidence -->
## Apa yang Ditunjukkan Bukti

- **Pelacakan default dikirim di bawah janji "No telemetry" (`PR #174` → `3bdaa6e1`):** Pada 6 Maret 2026, [`PR #174`](https://github.com/pingdotgg/t3code/pull/174) mengaktifkan analitik PostHog yang menyala secara default tanpa dialog persetujuan, tanpa tombol di UI pengaturan, dan tanpa dokumentasi telemetri. Lebih dari tiga bulan kemudian, pada 18 Juni, [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) diam-diam menghapus janji halaman depan *"No telemetry"* saat sebuah redesain, tanpa pemberitahuan apa pun kepada pengguna.
- **Retensi first-party yang closed-source (`PR #15028`):** Pada Oktober 2026, batch telemetri (`FLUSH_INTERVAL_MS = 10_000`) dialirkan melalui endpoint closed-source milik T3, [`https://ingest.t3.codes/`](https://ingest.t3.codes/). Baris 1 `AnalyticsService.ts` menegaskan bahwa server menyimpan salinan mentah setiap event sebelum meneruskannya ke PostHog.
- **Pembacaan kredensial lintas-alat & SHA-256 tanpa salt (`PR #21506`):** Baseline `9d3195b4` pada `Identify.ts` membaca `~/.codex/auth.json` (mendekode klaim JWT `user_id` milik OpenAI) dan `~/.claude.json` (`oauthAccount.accountUuid`) bersama ID pengguna T3 Connect, lalu menghitung digest SHA-256 tanpa salt (`telemetryId.ts`) untuk menautkan mesin-mesin yang berbeda kembali ke satu orang. Karena T3 menyimpan ID Clerk dalam bentuk plaintext, digest tanpa salt dapat dibalik secara deterministik.
- **Penangkapan penggunaan yang sangat rinci:** `ProviderUsageAnalytics.ts` dan `FeatureUsage.ts` melaporkan penyedia, model kustom, reasoning effort, mode izin, jumlah token, jumlah proyek/thread, metadata OS/WSL, dan **35 aksi UI/perintah yang berbeda**.
- **Empat PR opt-out komunitas ditolak:** Pada 23 Juni, maintainer Julius menutup [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have."* [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) ditutup tanpa pengumuman, dan empat PR opt-out komunitas (`#13458`, `#16763`, `#21248`, `#27077` — 147 tes lulus, disetujui bot) ditolak sebagai `unwanted`.

```ts
// apps/server/src/telemetry/AnalyticsService.ts (line 1 & startup initialization)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## Status di Upstream (`ca81b7b9`)

- **Ditambal sebagian:** Setelah terekspos ke publik (2,26 juta+ tayangan), [`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) menghapus pembacaan `~/.codex/auth.json` dan `~/.claude.json`; [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) menyamarkan model non-katalog sebagai `custom:<driver>`; [`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) dan [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) menambahkan opsi opt-out lewat CI dan `DO_NOT_TRACK`.
- **Masih terbuka:** `AnalyticsService.ts:156` masih menulis install ID lokal ke disk sebelum memeriksa opt-out; `DesktopShellEnvironment.ts` masih tidak meneruskan `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`; `ingest.t3.codes` tetap closed-source; tidak ada satu pun tombol di UI Pengaturan.

<!-- section:visuals -->
## Bukti Visual

![Commit 3bdaa6e1 diam-diam menghapus janji halaman depan "No telemetry / Unless you opt in. Full stop."](../../evidence/02-no-telemetry-removed.png)

![Identify.ts membaca ~/.codex/auth.json dan ~/.claude.json untuk atribusi lintas-perangkat SHA-256 tanpa salt](../../evidence/03-identify-codex-claude.png)

![Issue #1397 ditutup sebagai not planned: "We will not make this easier to opt out of"](../../evidence/04-issue1397-no-optout.png)

![PR #27077 ditolak sebagai unwanted meski 147 tes lulus](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## Sumber Primer

- [Investigasi X Asli (Bagian 1 · 2,26 juta+ tayangan)](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [PR pasca-audit #42299](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [Dossier Teknis Mendalam 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
