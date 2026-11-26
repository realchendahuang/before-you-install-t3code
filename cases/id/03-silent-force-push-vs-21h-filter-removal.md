# #03 · 52 Hari `git push --force` Senyap vs. 21 Jam Penghapusan Filter Privasi Model

> Selama 52+ hari, T3 Code membiarkan sebuah bug tetap terbuka di mana mode Claude Auto diam-diam menyetujui `git push --force origin main` tanpa meminta konfirmasi — namun hanya butuh 21 jam untuk mencabut whitelist privasi agar model privat muncul di leaderboard publik @theo.

<!-- section:claim -->
## Apa yang Diklaim

- Mode Claude Auto dirancang untuk mengeskalasi tindakan destruktif berisiko tinggi (seperti force-push ke `main`) demi persetujuan manusia secara eksplisit.
- Telemetri digambarkan sebagai metrik agregat yang aman bagi privasi.

<!-- section:evidence -->
## Apa yang Ditunjukkan Bukti

- **52+ hari tak diperbaiki — `git push --force` senyap (`Issue #15353`):** Di `ClaudeAdapterV2.ts`, mode Auto memotong jalur `!requiresClaudeApproval(context)` langsung menuju `"allow"`. Ketika classifier keamanan milik Claude sendiri memblokir `git push --force origin main` dua kali dan mengeskalasi percobaan ketiga untuk konfirmasi manusia, T3 Code diam-diam menyetujuinya tanpa satu pun prompt UI dan mencatat `"source": "user_temporary"`. Dua PR perbaikan dari komunitas (`#15360`, `#35207`) dibiarkan tanpa review hingga ditutup otomatis oleh bot; `#40692` tetap tidak di-merge.
- **21 jam untuk mencabut whitelist privasi (`Issue #40948` → `PR #41237`):** Pada 22 November, [`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) mencatat bahwa model-model yang lebih baru tidak muncul di leaderboard publik `@theo` [`slopalytics.com`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) karena `PR #29001` memberlakukan whitelist model. Dalam **21 jam**, [`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) di-merge melalui akun `@theo` dengan catatan bahwa Theo secara eksplisit meminta filter tersebut dihapus — sehingga nama-nama privat lokal/enterprise seperti `ollama/acme-internal` dan `acme-azure-deployment` terkirim apa adanya ke analitik.

<!-- section:status -->
## Status Hulu (`ca81b7b9`)

- **Sebagian berubah / bug keamanan inti masih terbuka:** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) kemudian menyamarkan model non-katalog sebagai `custom:<driver>` (slug katalog/vendor masih terlaporkan melalui custom endpoint). **Issue #15353 ( `git push --force` senyap di mode Auto) masih terbuka dan belum diperbaiki pada `ca81b7b9`.**

<!-- section:visuals -->
## Bukti Visual

![Issue #15353 terbuka 52+ hari yang menunjukkan mode Claude Auto diam-diam menyetujui git push --force](../../evidence/11-issue15353-auto-force-push.png)

![PR #41237 di-merge 21 jam setelah Issue #40948 mencabut filter privasi model untuk slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## Sumber Utama

- [Investigasi X Asli (Bagian 3)](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Komentar reproduksi `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [Perbaikan komunitas yang belum di-merge: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [Dossier Teknis Mendalam 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
