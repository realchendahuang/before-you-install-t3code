# #02 · Penghapusan Thread SQLite Palsu (Pembengkakan 41,6 GB) & Pemindaian Proses Seluruh OS Setiap 5 Detik

> Menekan "hapus permanen" meninggalkan seluruh riwayat percakapan utuh di dalam `statev2.sqlite` (membengkakkan disk lokal hingga 41,6 GB), sementara pemantau Rust di latar belakang memindai setiap proses OS dan baris perintah lengkapnya setiap 5 detik tanpa opsi untuk mematikannya.

<!-- section:claim -->
## Apa yang Diklaim

- Dialog konfirmasi penghapusan di sidebar (`useThreadActionMenu.ts`) secara eksplisit memberi tahu pengguna: *"This permanently clears conversation history for this thread."*
- T3 Code dipasarkan sebagai ruang kerja coding lokal yang bersih dan cepat.

<!-- section:evidence -->
## Apa yang Ditunjukkan Bukti

- **Penghapusan permanen palsu (`Issue #17845`, `#28903`):** Pada baseline `9d3195b4`, menghapus sebuah thread hanya menambahkan event `"thread.deleted"` ke `statev2.sqlite`, sementara pesan-pesan sebelumnya, output tool, dan jejak penalaran tetap utuh di disk. Pengguna mendokumentasikan `statev2.sqlite` membengkak hingga **25,9 GB** dalam 3 minggu (90% thread "terhapus"), **41,6 GB** dalam 6 minggu, dan **33 GB** dalam 7 minggu.
- **Pemindaian proses & baris perintah seluruh mesin (`Issue #11222`, `PR #41889`):** Helper latar belakang `t3-resource-monitor` (`native/resource-monitor/src/main.rs`) menjalankan `ProcessesToUpdate::All` dengan `with_cmd(UpdateKind::Always)` setiap 5 detik bahkan saat panel diagnostik ditutup — menahan 280–300 handle persisten pada 440+ aplikasi/game tak terkait di Windows. Pada 24 November, [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) mengonfirmasi bahwa diagnostik menangkap **baris perintah proses secara lengkap** (sering membawa API key plaintext, password database, dan token) ke dalam snapshot dan telemetri.
- **Kebocoran hostname korporat & pengambilan wajib saat startup:** Permintaan favicon dari frontend membocorkan hostname internal (seperti `devbox.localdomain`) ke layanan favicon Google (`PR #16950`, `PR #32657`), sementara server saat startup tanpa syarat mengambil manifest kompatibilitas dari `raw.githubusercontent.com` tanpa opsi untuk mematikannya (`Issue #36479`).
- **Pembakaran kuota berat & bug daya:** Menjalankan Claude via Agent SDK membakar kuota 5 jam pada kecepatan **1,7x** normal (`Issue #7338`, `Issue #24649`, 81 komentar), sementara regresi GPU menarik daya hingga **136x** dibanding Electron setara — mengunci GPU MacBook pada **60W** (baterai habis dalam 78 menit) dan **18W** setelah tab web ditutup (`Issue #3143`, `Issue #40581`).

<!-- section:status -->
## Status Upstream (`ca81b7b9`)

- **Ditambal sebagian:** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) menambahkan `thread-content.purge` asinkron (menutup `#17845`), dan [`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) mempersempit pembacaan pemantau proses di Windows.
- **Masih terbuka:** Thread sumber yang terhapus tetap menyimpan riwayat selama masih direferensikan oleh fork aktif, `merge_back` yang tertunda, atau subagent yang aktif; baris tombstone tetap berada di SQLite dan untuk merebut kembali ruang disk masih diperlukan `VACUUM` secara offline; Linux dan macOS tetap memakai penemuan `ProcessesToUpdate::All`, dan `PR #41889` masih terbuka.

<!-- section:visuals -->
## Bukti Visual

![Issue #17845 mendokumentasikan thread yang dihapus permanen namun membengkakkan statev2.sqlite hingga puluhan gigabyte](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 mendokumentasikan t3-resource-monitor yang memindai setiap proses OS setiap 5 detik](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## Sumber Primer

- [Investigasi X Asli (Bagian 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Dossier Teknis Mendalam 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
