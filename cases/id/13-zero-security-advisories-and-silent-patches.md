# #13 · Nol Security Advisory GitHub, Patch Severity Tinggi yang Senyap & `SECURITY.md` yang Terburu-buru

> Saat meremehkan auditor kode sumber Tiongkok di X, T3 Code diam-diam menggabungkan perbaikan kerentanan severity tinggi — termasuk path traversal pada secret store, kebocoran token lintas domain, dan eksekusi perintah dari repo tak tepercaya — sambil membiarkan Security Advisory GitHub yang terbit tetap 0.

<!-- section:claim -->
## Apa yang Diklaim

- Pada 24 November, `@theo` meremehkan audit teknis berbahasa Tiongkok di X sebagai berasal dari *"the biggest fucking cesspit"* dan menghina pengembang yang membacanya ([`2125177503526588877`](https://x.com/theo/status/2125177503526588877)).
- Revisi `SECURITY.md` yang terburu-buru (`PR #38812`, `PR #41942`) membingkai akses host yang luas dan transportasi tanpa enkripsi sebagai batas desain yang dapat diterima.

<!-- section:evidence -->
## Apa yang Ditunjukkan Bukti

- **Nol Security Advisory yang terbit (`0`):** Per `ca81b7b9`, halaman [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) milik `pingdotgg/t3code` mencantumkan **nol** advisory yang terbit — sehingga pengguna desktop/server yang ada tidak menerima satu pun peringatan CVE formal atau imbauan upgrade.
- **Kerentanan severity tinggi diperbaiki secara senyap:**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483): path traversal pada `ServerSecretStore` lewat `jti`/`nonce` relay sebelum persetujuan perangkat.
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756): kebocoran token GitHub/GitLab enterprise lintas domain.
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) & [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386): isolasi pratinjau browser desktop tanpa sandbox dan konfirmasi perintah pada tata letak worktree.
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413): izin berkas token Clerk desktop khusus pemilik.
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504): patch sekitar 3.000 baris yang akhirnya menambahkan prompt konfirmasi sebelum mengeksekusi perintah dari konfigurasi repositori tak tepercaya (bersamaan dengan perbaikan senyap sebelumnya `#22190`, `#37823`, `#39464`, `#39480`, `#40133`, `#41886`).
- **Cacat keamanan lokal yang masih terbuka:** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489) (path traversal/symlink eksternal) dan [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997) (Windows `externalLauncher.ts` menjalankan `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>`, ditandai oleh AVG/Avast sebagai `IDP.HELU.PSE96`) masih belum di-merge.
- **`SECURITY.md` mempersempit tanggung jawab alih-alih memperkuat arsitektur:** Secara eksplisit menyatakan `filesystem:read` seluruh OS di luar workspace, transportasi HTTP polos di iOS/LAN, dan pengambilalihan penuh mesin host melalui kunci penandatangan relay yang disusupi sebagai *batas desain yang dimaksudkan*.

<!-- section:status -->
## Status Upstream (`ca81b7b9`)

- **Masih terbuka:** Security Advisory GitHub yang terbit tetap **0**; `Issue #26489` dan `PR #30997` tetap belum diperbaiki; `SECURITY.md` terus menggolongkan pembacaan seluruh OS dan HTTP polos sebagai perilaku yang dimaksudkan.

<!-- section:visuals -->
## Bukti Visual

![PR #39483 memperbaiki path traversal ServerSecretStore secara senyap tanpa menerbitkan Security Advisory](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997 perbaikan terbuka untuk peluncuran PowerShell Base64 di Windows yang ditandai antivirus](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md menggolongkan pembacaan seluruh OS, HTTP polos di iOS, dan pengambilalihan mesin via kunci relay sebagai batas yang dimaksudkan](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## Sumber Primer

- [Investigasi X Asli (Bagian 13)](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories (0 terbit)](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [Dossier Teknis Mendalam 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
