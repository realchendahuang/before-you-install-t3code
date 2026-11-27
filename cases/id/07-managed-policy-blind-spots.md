# #07 · Kontradiksi Managed Policy: Empat Titik Buta Telemetri yang Terdokumentasi

> @theo mengklaim T3 Code punya "best corporate managed policy system" sehingga "trivial to turn off all telemetry" — dikontradiksi langsung oleh `docs/user/telemetry.md` dan `docs/user/managed-policy.md` milik T3 Code sendiri.

<!-- section:claim -->
## Apa yang Diklaim

- Pada 24 November pukul 19:13 CST, `@theo` menepis soal tidak adanya toggle opt-out bagi pengguna: *"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."* ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715)).
- Setengah jam kemudian, ia menambahkan bahwa data percakapan *"never touches any of our servers"* ([`2125191784859115766`](https://x.com/theo/status/2125191784859115766)).

<!-- section:evidence -->
## Apa yang Ditunjukkan Bukti

Dokumentasi resmi T3 Code sendiri ([`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) dan [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)) mendokumentasikan empat titik buta konkret:

- **Deployment khusus admin (nol sakelar UI personal):** Pengguna desktop tidak punya toggle di Settings. Managed Policy mewajibkan MDM/GPO atau path OS yang dilindungi admin (`/Library/Application Support/T3Code/policy.json`, `C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`, atau `/etc/t3code/policy.json`), yang sama sekali tidak dapat diakses pengguna desktop non-admin.
- **Aplikasi Web Hosted (`app.t3.codes`) mengabaikan policy:** Aplikasi browser mengabaikan variabel environment server dan Managed Policy, memancarkan connection trace bila dibangun dengan tracing, dan *"has no relay tracing toggle."*
- **Aplikasi mobile berada di luar policy server:** Dokumentasi resmi menegaskan variabel env server dan Managed Policy *"do not disable mobile tracing."*
- **`Publish agent activity` mengabaikan opt-out:** Mengunggah judul proyek, judul thread, nama model, dan status live ke T3 Connect — dan dokumentasi menyatakan secara eksplisit: *"The telemetry opt-out does not disable it."* Selain itu, span/log crash Axiom yang gagal *"can quote a value the app was handling"*, dan `Agent feedback` dapat melampirkan pesan percakapan hingga 16 KB.

<!-- section:status -->
## Status Upstream (`ca81b7b9`)

- **Masih terbuka:** Semalam [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) menambahkan toggle trace mobile di dalam aplikasi, tetapi Managed Policy masih tidak dapat menonaktifkan mobile tracing, `app.t3.codes` yang hosted masih tanpa toggle opt-out, `Publish agent activity` masih mengabaikan opt-out telemetri, dan tidak ada toggle UI Settings di desktop.

<!-- section:visuals -->
## Bukti Visual

![Dokumentasi resmi docs/user/telemetry.md yang menegaskan app.t3.codes tidak punya toggle, mobile mengabaikan Managed Policy, dan agent activity mengabaikan opt-out](../../evidence/05-telemetry-cant-disable.png)

![Dokumentasi resmi docs/user/managed-policy.md yang mencantumkan path sistem terlindungi admin di macOS, Windows, dan Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Postingan Theo 24 November yang mengklaim Managed Policy membuat penonaktifan seluruh telemetri jadi sepele](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## Sumber Utama

- [Investigasi X Asli (Bagian 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [Klaim Managed Policy `@theo` (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Dossier Teknis Mendalam 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
