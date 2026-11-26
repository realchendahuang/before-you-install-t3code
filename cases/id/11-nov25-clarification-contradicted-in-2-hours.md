# #11 · Klarifikasi 25 November Dibantah dalam 2 Jam oleh PR Semalam & Dump 100 MB

> Pada pagi 25 November, @theo menyampaikan tiga jaminan privasi yang bersifat menyeluruh dan merilis dump telemetri berukuran 100 MB — ketiga klaim itu dibantah dalam waktu dua jam oleh PR timnya sendiri dan oleh isi dump terkompresi gzip tersebut.

<!-- section:claim -->
## Apa yang Diklaim

Dalam klarifikasi pagi 25 November ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) dan balasan lanjutannya ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)), `@theo` meyakinkan pengguna:
- T3 Code *"never collected file paths."*
- Variabel environment *"always disabled telemetry cleanly."*
- Instalasi yang memilih keluar tidak menulis berkas pelacakan lokal sama sekali, dan hash pemilik Claude *"broken."*

<!-- section:evidence -->
## Apa yang Ditunjukkan Bukti

- **Kontradiksi 1 — kebocoran path workspace absolut `git.cwd` (`PR #42450`):** Sekitar 90 menit setelah unggahan tersebut, maintainer inti Julius menggabungkan [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450), yang mengakui bahwa run webhook yang dikirim lewat relay mengekspor seluruh span eksekusi ke Axiom — termasuk span Git yang memuat `git.cwd` (**path workspace absolut lengkap, nama pengguna OS, dan nama repositori**).
- **Kontradiksi 2 — opsi keluar yang rusak di Windows & macOS (`PR #42376`, `PR #42464`):** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) mengakui bahwa aplikasi desktop Windows mengabaikan variabel environment pengguna `T3CODE_TELEMETRY_ENABLED=false` yang sudah tersimpan ketika dijalankan dari proses yang sudah ada sebelumnya. [`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) mengakui bahwa pelacakan relay pada peluncuran pertama di macOS/Linux sudah diinisialisasi sebelum penemuan shell, sehingga mengabaikan opsi keluar di `~/.zshrc` selama seluruh sesi.
- **Kontradiksi 3 — penulisan disk tanpa syarat & 264 catatan Claude aktif di `events.clean.jsonl`:** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (`line 156` pada `ca81b7b9`) tetap memanggil `getTelemetryIdentity` tanpa syarat saat startup, sehingga menulis UUID instalasi lokal (`upsertAnonymousId`) sebelum memeriksa `telemetryEnabled`. Sementara itu, header gzip dari ekspor publik `@theo` (`6,056,594` byte terkompresi, `95,789` event) menunjukkan nama berkas asli `events.clean.jsonl` yang dibuat 20 menit sebelum unggahan — namun berkas itu tetap memuat **264 catatan pemilik Claude aktif** yang menyambungkan **4 mesin terpisah** (`installId`) ke satu hash SHA-256, berikut model proxy privat yang tercatat apa adanya (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

<!-- section:status -->
## Status Upstream (`ca81b7b9`)

- **Ditambal sebagian:** `PR #42450`, `PR #42376`, dan `PR #42464` digabungkan pada malam yang sama.
- **Masih terbuka:** `AnalyticsService.ts:156` masih menulis ID anonim lokal tanpa syarat sebelum memeriksa opsi keluar, dan `DesktopShellEnvironment.ts` masih tidak meneruskan `T3CODE_OTEL_SDK_DISABLED` serta `OTEL_SDK_DISABLED`.

<!-- section:visuals -->
## Bukti Visual

![PR #42450 mengakui bahwa run yang dipicu relay mengekspor path workspace absolut git.cwd ke Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 mengakui bahwa aplikasi desktop Windows mengabaikan env var T3CODE_TELEMETRY_ENABLED=false yang tersimpan](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 mengakui bahwa pelacakan relay pada peluncuran pertama macOS mengabaikan opsi keluar ~/.zshrc](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Audit forensik atas events.clean.jsonl yang mengungkap 264 catatan Claude yang menautkan 4 mesin dan ID model proxy privat](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## Sumber Primer

- [Investigasi X Asli (Bagian 11)](https://x.com/realchendahuang/status/2125394810559426993)
- [Klarifikasi `@theo` 25 November (`2125332390239494211`)](https://x.com/theo/status/2125332390239494211) · [Balasan lanjutan (`2125370330244128924`)](https://x.com/theo/status/2125370330244128924) · [Dump gzip publik](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [Dossier Teknis Mendalam 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
