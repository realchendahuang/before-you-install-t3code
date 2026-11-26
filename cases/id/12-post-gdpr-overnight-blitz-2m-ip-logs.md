# #12 · Blitz Tengah Malam Enam Jam Pasca-GDPR: Log IP 2,2 Juta/Jam & Penghapusan Akun yang Rusak

> Setelah keluhan resmi GDPR Uni Eropa diajukan pada 24 November, enam jam tambalan darurat sepanjang malam tanpa sengaja memunculkan empat pengungkapan privasi yang lebih dalam — terutama span Axiom bertanda IP sebanyak 2,2 juta/jam yang disimpan selama 30 hari.

<!-- section:claim -->
## Apa yang Diklaim

- Bahkan 3,5 jam setelah `PR #42380` digabungkan, `@theo` menjawab secara publik bahwa IP pemanggil telah dihapus.
- Dokumen resmi (`docs/user/telemetry.md`) menjanjikan laporan `agent.feedback` bersifat anonim dan penghapusan akun menghapus data pengguna secara bersih.

<!-- section:evidence -->
## Apa yang Ditunjukkan Bukti

- **Span relai IP + User-Agent 2,2 juta/jam (`PR #42380`):** Setiap span permintaan relai yang diekspor ke Axiom — sekitar **2,2 juta span per jam, disimpan selama 30 hari** — mencatat `client.address` (IP pemanggil asli dari `cf-connecting-ip`) dan `user_agent.original` langsung bersama `user.id` (dengan log Workers Cloudflare 1% tetap terpisah).
- **Penghapusan akun Clerk yang rusak (`PR #42285` & `PR #42430`):** Menghapus akun pengguna di Clerk sebelumnya meninggalkan baris relai PlanetScale dan tunnel Cloudflare yang aktif berjalan di balik layar — sampai permintaan penghapusan privasi pengguna yang sebenarnya memaksa para engineer menjalankan **SQL yang ditulis tangan dan pembongkaran tunnel secara manual**.
- **Kebocoran token push seluler & ID pengguna (`PR #42459` & `PR #41859`):** Payload push FCM Android mengirimkan nilai `user_id` Clerk dalam teks biasa ke Google pada setiap notifikasi; span APNs iOS dan log error menangkap URL push perangkat lengkap yang membawa token push.
- **Batch umpan balik "anonymous" yang tercampur (`PR #42466`):** Peristiwa `agent.feedback` yang seharusnya anonim digabungkan di dalam HTTP POST yang persis sama bersama peristiwa `installId` yang teridentifikasi dan sidik jari host lengkap (OS, arsitektur, distro WSL mentah), yang secara langsung bertentangan dengan `docs/user/telemetry.md`.

<!-- section:status -->
## Status Hulu (`ca81b7b9`)

- **Ditambal sebagian:** PR darurat `#42380`, `#42285`, `#42430`, `#42459`, `#41859`, dan `#42466` digabungkan selama sprint GDPR tengah malam.
- **Masih terbuka:** `privacy-policy.astro` tetap tidak berubah sejak `2026-10-06`, `ingest.t3.codes` yang bersumber tertutup menyimpan salinan peristiwa mentah tanpa dapat diaudit secara independen, dan jendela retensi Axiom 30 hari sebelumnya tidak pernah diungkapkan secara formal kepada pengguna yang terdampak.

<!-- section:visuals -->
## Bukti Visual

![PR #42380 mengungkapkan span relai ~2,2 juta/jam mencatat IP pemanggil asli dan User-Agent di samping user.id selama 30 hari di Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 mengakui penghapusan akun sebelumnya meninggalkan baris PlanetScale dan tunnel Cloudflare aktif](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 mengakui push FCM Android mengirim nilai user_id Clerk mentah ke Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 mengakui umpan balik anonim digabungkan bersama installId dan sidik jari host](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

<!-- section:sources -->
## Sumber Utama

- [Investigasi X Asli (Bagian 12)](https://x.com/realchendahuang/status/2125395501663281198)
- [PR #42380](https://github.com/pingdotgg/t3code/pull/42380) · [PR #42285](https://github.com/pingdotgg/t3code/pull/42285) · [PR #42430](https://github.com/pingdotgg/t3code/pull/42430)
- [PR #42459](https://github.com/pingdotgg/t3code/pull/42459) · [PR #41859](https://github.com/pingdotgg/t3code/pull/41859) · [PR #42466](https://github.com/pingdotgg/t3code/pull/42466)
- [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) · [Dossier Teknis Mendalam 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
