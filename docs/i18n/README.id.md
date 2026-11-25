# Sebelum Anda Menginstal T3 Code

<p align="center">
  <strong>Bahasa Resmi PBB:</strong>
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a>
</p>
<p align="center">
  <strong>Edisi Komunitas Global:</strong>
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md"><strong>Bahasa Indonesia</strong></a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>

![Sebelum Anda Menginstal T3 Code — Spanduk Audit Independen 18 Bagian](../../evidence/00-cover-en.png)

> **Ruang Lingkup & Kebijakan Verifikasi**  
> Repositori ini adalah audit independen atas keamanan, telemetri, tata kelola, dan rekam jejak publik `pingdotgg/t3code` (T3 Code), yang menghimpun 2 postingan awal dan **18 bagian audit terdokumentasi** yang diterbitkan pada 24–25 November 2026 bersama **180+ URL sumber primer kanonik** (commit GitHub, pull request, issue, file kode sumber verbatim, dokumentasi resmi, catatan USPTO TSDR, serta arsip postingan publik), enam dosir teknis mendalam ([`docs/dossiers/`](../dossiers/01-telemetry-and-gdpr-timeline.md)), dan himpunan data kuantitatif berisi **1.151 postingan X `@theo` berturut-turut** (7–24 November 2026). Tidak ada URL pemendek redirect dan tidak ada detail kontak pribadi yang disertakan. Pembaruan faktual, perbaikan yang baru di-merge, atau terjemahan tambahan dipersilakan melalui Pull Request dengan rujukan sumber primer — lihat [`CONTRIBUTING.md`](../../CONTRIBUTING.md) dan [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md).

---

## Daftar Isi

- [Matriks Temuan Terstruktur & Risiko](#matriks-temuan-terstruktur--risiko)
- [Linimasa Kronologis (2023–2026)](#linimasa-kronologis-20232026)
- [1. Sengketa Awal: "Steal Our Code", Ancaman Penamaan Fork & Standar Ganda](#1-sengketa-awal-steal-our-code-ancaman-penamaan-fork--standar-ganda)
- [2. Telemetri, Pembacaan Kredensial Lintas Alat & Gelombang Tambalan Pascakeluhan GDPR (Bagian 1, 7, 11, 12)](#2-telemetri-pembacaan-kredensial-lintas-alat--gelombang-tambalan-pascakeluhan-gdpr-bagian-1-7-11-12)
- [3. Penyimpanan Lokal, Pemantauan Proses, Penerobosan Pagar Pengaman & Tambalan Keamanan Tersembunyi (Bagian 2, 3, 13)](#3-penyimpanan-lokal-pemantauan-proses-penerobosan-pagar-pengaman--tambalan-keamanan-tersembunyi-bagian-2-3-13)
- [4. Risiko Ketentuan Layanan Google Antigravity & Relay T3 Connect Tanpa Enkripsi (Bagian 4, 5)](#4-risiko-ketentuan-layanan-google-antigravity--relay-t3-connect-tanpa-enkripsi-bagian-4-5)
- [5. Neraca Bisnis, Konflik Investor, Sponsor & Corong 77.000 Bintang (Bagian 6, 8, 17, 18)](#5-neraca-bisnis-konflik-investor-sponsor--corong-77000-bintang-bagian-6-8-17-18)
- [6. Tata Kelola, Bot Pengikis Fork, Catatan Merek Dagang, Himpunan Data 1.151 Tweet & Rekam Jejak Historis (Bagian 9, 10, 14, 15, 16)](#6-tata-kelola-bot-pengikis-fork-catatan-merek-dagang-himpunan-data-1151-tweet--rekam-jejak-historis-bagian-9-10-14-15-16)
- [7. Panduan Mitigasi & Remediasi Praktis](#7-panduan-mitigasi--remediasi-praktis)
- [8. Sumber Primer & Indeks Lengkap 18 Bagian Utas Asli](#8-sumber-primer--indeks-lengkap-18-bagian-utas-asli)

---

## Matriks Temuan Terstruktur & Risiko

| Ranah & Bagian Audit | Risiko / Dampak | Temuan Inti Terdokumentasi & Bukti Sumber | Status (25 Nov 2026) | Dosir Mendalam |
|---|---|---|---|---|
| **Telemetri & Privasi Pasca-GDPR**<br>*(Bagian 1, 7, 11, 12)* | **Kritis** | Analitik PostHog aktif secara bawaan (`PR #174`) sementara beranda menjanjikan `"No telemetry / Unless you opt in. Full stop."` (`3bdaa6e1` menghapusnya pada 18 Jun); penyimpanan event mentah lewat `ingest.t3.codes` yang tertutup (`PR #15028`); penghashan SHA-256 tanpa salt lintas alat atas `~/.codex/auth.json` & `~/.claude.json` (`Identify.ts`, `telemetryId.ts`); 4 PR opt-out ditolak (`#13458`, `#16763`, `#21248`, `#27077`); celah Managed Policy (`docs/user/telemetry.md`); PR kilat semalam pasca-GDPR yang mengakui **2,2 juta span/jam berisi IP + UA** disimpan 30 hari di Axiom (`#42380`), kebocoran path `git.cwd` (`#42450`), pengabaian opt-out Win/Mac (`#42376`, `#42464`), penghapusan akun yang tidak tuntas (`#42285`), serta penggabungan batch anonim dengan data teridentifikasi (`#42466`). | Tambalan semalam masih parsial; `AnalyticsService.ts` tetap membuat identitas lokal saat startup; aplikasi web terhosting tetap tanpa tombol mati; `ingest.t3.codes` tetap tertutup | [**Dossier 01**](../dossiers/01-telemetry-and-gdpr-timeline.md) |
| **Keamanan Lokal & Imbauan Tersembunyi**<br>*(Bagian 2, 3, 13)* | **Kritis** | Fitur "hapus permanen" di sidebar hanya menambahkan event `"thread.deleted"` ke `statev2.sqlite` (membengkak hingga 25,9–41,6 GB, `#17845`); `t3-resource-monitor` memindai seluruh proses OS beserta baris perintahnya (`ProcessesToUpdate::All`, `#11222`, `PR #41889`); mode Claude Auto diam-diam menyetujui `git push --force` pada percobaan ke-3 (`#15353`, terbuka 52–53+ hari); pencabutan filter model privat dalam 21 jam demi `slopalytics.com` (`#41237`); **0 GitHub Security Advisories** meski banyak perbaikan keamanan diam-diam (`#39483`, `#41757`, `#42386`, `#42504`); issue terbuka peluncur PowerShell Base64 di Windows yang ditandai antivirus (`#30997`); `SECURITY.md` menyatakan pembacaan `filesystem:read` seluruh OS dan HTTP di iOS sebagai desain yang disengaja. | `#17845`, `#15353`, `#26489`, `#30997` tetap belum teratasi / terbuka; `0` Security Advisory diterbitkan | [**Dossier 02**](../dossiers/02-local-safety-and-security-audit.md) |
| **ToS Antigravity & Relay T3 Connect**<br>*(Bagian 4, 5)* | **Tinggi** | `docs/user/faq.md` menjamin keamanan terhadap ToS Google Antigravity, padahal `antigravityUsageLimits.ts` mengekstrak token dari keyring OS / Windows `CredReadW`, memalsukan header `antigravity/hub/2.24.0`, dan menembak endpoint internal `v1internal`; `antigravityAuthSupport.ts` menyuntikkan `SSH_CONNECTION` palsu sehingga memicu perutean silang antar-akun (`#41973`); akun baru berbayar $20 diblokir permanen dalam 3 menit (`#41536`); `PR #33800` menghubungkan polling hub CLIProxyAPI dengan pemalsuan header `claude`/`xai`/`antigravity`; T3 Connect memiliki **nol enkripsi ujung-ke-ujung (E2E)**, `requireConnectDeviceApproval` mati secara bawaan (`#36419`), dan gateway terminasi TLS Caddy di OVH yang terbuka (`PR #32945`). | Kode spoofing Antigravity masih aktif; enkripsi E2E pada T3 Connect ditolak secara eksplisit (`#32098`, balasan 25 Nov) | [**Dossier 03**](../dossiers/03-antigravity-tos-and-t3connect-relay.md) |
| **Neraca Bisnis, Sponsor & 77rb Bintang**<br>*(Bagian 6, 8, 17, 18)* | **Tinggi** | Pengeluaran $800 ribu+ untuk klien gratis (`162` penyebutan T3 dibanding `0` untuk produk berbayar); radar komputasi **31,7 triliun token/hari** (setara biaya API $10,19 juta/hari) ditukar dengan akses awal token gratis OpenAI senilai $300 ribu+ & pendekatan VC; tumpang tindih angel investor dengan Vibe Kanban & Daytona; tumpukan sponsor (Clerk, Axiom, eksklusivitas Vercel); eksploit kuota 0% Codex (`Endless` / `codex#45444`); Gist 10 akun `CLIProxyAPI` (`555%` kuota) berlawanan dengan peringatan blokir di FAQ; toast otomatis setelah 5 prompt / diam 30 detik yang menembak `PUT user/starred/...` lewat kredensial host (`#27832`, `#29922`, `#29987`), menerobos ulasan Macroscope, dan membiarkan bug pemberian bintang ke repositori sembarang di `driver.ts#L60-L99` tak diperbaiki selama 19 hari. | Bug bintang tak terkunci di `driver.ts` & ulasan `zhilsinger` terbengkalai 19 hari; repo mencapai 77rb+ bintang vs ~129 watcher | [**Dossier 04**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md) |
| **Tata Kelola, Merek Dagang & Riwayat**<br>*(Postingan Awal 1–2, Bagian 9, 10, 15, 16)* | **Menengah–Tinggi** | 500 commit/hari / 700 agen / `yolo merges` berbanding terbalik dengan `CONTRIBUTING.md` (`"here's my advice: Don't"`), pemblokiran otomatis lewat daftar hitam publik `.github/VOUCHED.td`, `174` label `unwanted`, penghapusan mode Plan (`#5551`, `#9190`, `#33131`), serta hinaan di `#33639`; pengikisan fork lewat `@bot` secara terbuka (`@MiaAI_lab`), seruan demonetisasi via Community Notes, dan bot pemblokir otomatis; **0 pendaftaran USPTO** untuk `T3 Code`/`T3 Tools`/`T3 Connect` (`PING LABS` `97294243` berstatus terbengkalai; EquipmentShare `7795672` terdaftar) saat melayangkan ancaman penghapusan akun GitHub; penggabungan retroaktif `PR #41898` `TRADEMARK.md` 17 jam kemudian; pola 2024–2026 (`vsc-material-but-i-wont-sue-you`, reaksi balik pengembang India, sayembara $20rb FFmpeg, ancaman menutup kode sumber pukul 4 pagi 25 Nov yang dihapus). | `CONTRIBUTING.md` / `.github/VOUCHED.td` & `TRADEMARK.md` tetap aktif di `main` | [**Dossier 05**](../dossiers/05-governance-trademark-and-history.md) |
| **Dataset Kuantitatif 1.151 Tweet**<br>*(Bagian 14)* | **Basis Audit** | Korpus lengkap 7–24 November (`n = 1.151`, 17,24 hari, 66,8 postingan/hari, 75,6% balasan, jeda median 2,7 menit): **0,0% umpatan/hinaan** terhadap 20 eksekutif/staf/KOL raksasa teknologi (`0/43` penyebutan `@` utama ketat, `32,6%` ucapan terima kasih) dibanding **8,0% permusuhan** terhadap pengembang biasa (`61/766`) serta **lonjakan 4,0x ke 14,4%** (`19/132`) berupa penghinaan pribadi langsung selama jendela krisis 25 jam fork pengembang Tiongkok. | Audit regex yang dapat direproduksi lengkap dengan 4 grafik forensik | [**Dossier 06**](../dossiers/06-tweet-forensic-dataset-1151.md) |
| **Katalog URL Sumber Primer Lengkap** | **Referensi** | Katalog referensi silang lengkap atas setiap URL kanonik `https://` di seluruh portal ini, `canonical_refs.txt`, `tco_resolved.json`, `all_18_posts.txt`, dan `missing_posts_full.json`. | 100% terkanonisasi (nol tautan `t.co`) | [**Indeks Sumber**](../COMPLETE-SOURCE-INDEX.md) |

---

## Linimasa Kronologis (2023–2026)

| Tanggal / Waktu | Tonggak Kejadian | Artefak / Sumber Terverifikasi |
|---|---|---|
| **2023-05-14** | `@theo` memublikasikan daftar sponsor YouTube-nya (`@vercel`, `@clerk`, `@upstash`, `@axiomhq`, `@PlanetScale`). Clerk dan Axiom kemudian menjadi infrastruktur autentikasi & logging inti di dalam T3 Code. | [`1657488850472804353`](https://x.com/theo/status/1657488850472804353) |
| **2024-04 / 2024-09** | CEO Vercel mengonfirmasi hanya mensponsori satu YouTuber (`Theo`); `@theo` mengakui kontrak sponsor memuat klausul eksklusivitas yang membatasi promosi kompetitor. | [`1776260839965863965`](https://x.com/rauchg/status/1776260839965863965) · [Video](https://www.youtube.com/watch?v=uv179CTAK-w) |
| **2024** *(2 thn sebelumnya)* | `@theo` membuat fork tema VS Code dengan nama `vsc-material-but-i-wont-sue-you` untuk mengejek temperamen penulis aslinya; secara terpisah, setelah videonya yang menargetkan kanal tutorial India memicu perundungan, ia mengunggah video permintaan maaf (`I screwed up.`) yang mengecam serangan berbasis kebangsaan. | [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) · [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) |
| **2025-02 – 2025-05** | USPTO menolak satu-satunya permohonan merek dagang T3 Tools Inc. (`PING LABS`, Nomor Seri `97294243`) dan menandainya `ABANDONED` (19 Mei 2025). EquipmentShare mendaftarkan merek `T3` di kelas perangkat lunak/SaaS 9 & 42 (`Reg. 7795672`, 13 Mei 2025). | [TSDR `97294243`](https://tsdr.uspto.gov/statusview/sn97294243) · [TSDR `90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch) |
| **2025-10** | `@theo` berselisih dengan FFmpeg di X dan menawarkan **sayembara $20.000** untuk menyingkirkan salah satu pengelola FFmpeg; Windscribe membalas dengan tawaran tandingan $21.000, pendiri VLC keberatan, para pengembang FFmpeg mendokumentasikan perundungan publik tersebut, dan `@theo` menghapus video/tweet serta mencabut sayembaranya. | [Rekaman FFmpeg](https://www.youtube.com/watch?v=1oQ3KMeaH04) |
| **2026-03-06** | **PR #174** di-merge ke `pingdotgg/t3code`, mengaktifkan telemetri PostHog secara bawaan tanpa dialog persetujuan, tanpa tombol pengaturan UI, dan tanpa dokumentasi telemetri. | [PR #174](https://github.com/pingdotgg/t3code/pull/174) |
| **2026-04-26** | `@theo` menerbitkan *"Github has a fake star problem"*, menulis bahwa bintang GitHub `"mostly a way for companies to trick VCs into investing"` ("sebagian besar hanyalah cara perusahaan menipu VC agar berinvestasi"). | [`2048122499834036340`](https://x.com/theo/status/2048122499834036340) |
| **2026-06-18** | **Commit `3bdaa6e1`** diam-diam menghapus kalimat `No telemetry / Unless you opt in. Full stop.` dari beranda T3 Code setelah 3+ bulan pengumpulan telemetri bawaan berjalan. | [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) |
| **2026-06-23** | Pengelola inti Julius menutup **Issue #1397** (`not planned`): *"We will not make this easier to opt out of, it is crucial for us to know how many users we have"*. | [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) |
| **2026-07 – 2026-11-17** | **Issue #4123** (tangkapan layar arsip janji `"No telemetry"`) ditutup diam-diam pada 4 Nov; 4 PR opt-out dari komunitas (`#13458`, `#16763`, `#21248`, `#27077`) ditolak (`#27077` ditutup berlabel `unwanted` meski lulus 147 pengujian). | [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077) |
| **2026-08-06 – 2026-09-02** | **PR #5551** mengubur tombol Build/Plan (`Reality check for those upset`, 10 downvote); **PR #9190** menyembunyikan meteran konteks (16 downvote, tertinggi di repo). | [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) |
| **2026-08-19 – 2026-08-22** | `@theo` membanggakan diri menyedot **$800+** melampaui kuota 0% Codex sementara `@maria_rcks` merilis *Endless*; keduanya menghapus postingan setelah reaksi keras (`2090972426876129658`); OpenAI memperketat pemutusan giliran pada kuota 0% (`openai/codex#45444`). | [`2090972426876129658`](https://x.com/maria_rcks/status/2090972426876129658) · [`codex#45444`](https://github.com/openai/codex/issues/45444) |
| **2026-10-03 – 2026-10-10** | **Issue #15353** (mode Claude Auto diam-diam menjalankan `git push --force`, 3 Okt), `privacy-policy.astro` (`2026-10-06`), dan **Issue #17845** (penghapusan palsu di `statev2.sqlite`, 10 Okt) tercatat. | [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) |
| **2026-10 – 2026-10-19** | **PR #15028** merutekan telemetri melalui `ingest.t3.codes` yang tertutup; **PR #21506** menambahkan atribusi lintas alat berbasis SHA-256 tanpa salt di `Identify.ts`; `@theo` menerbitkan Gist 10 akun `CLIProxyAPI` (`555%` kuota). | [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506) · [Gist](https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af) |
| **2026-10-30 – 2026-11-06** | **PR #27832**, **#29922**, dan **#29987** merilis toast permintaan bintang setelah 5 prompt / diam 30 detik yang menembak `PUT user/starred/...` memakai kredensial host; `zhilsinger` mengajukan `Request changes` pada 6 Nov (tak dijawab selama 19 hari). | [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) |
| **2026-11-08 – 2026-11-22** | Pengikisan fork oleh `@bot` (`@MiaAI_lab`), mode Plan dihapus (`#33131`), pengeluaran `$800k+` & radar `31.7T/day` / `$10.19M/day` terungkap, token gratis OpenAI `$300k+`, penulisan ulang `CONTRIBUTING.md`, tumpang tindih Vibe Kanban/Daytona, serta `PR #41237` mencabut filter model dalam 21 jam. | [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [`2122860770329608290`](https://x.com/theo/status/2122860770329608290) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) |
| **2026-11-23 19:11–19:54 CST** | `@theo` memposting `"Chinese knockoff"` dan `"Temu3 Code"` serta mengancam penghapusan akun GitHub (`2124829315657576890`); pembuat fork MIT mengganti nama menjadi `Stardust` dalam 30 menit; permintaan maaf lewat DM pribadi menyusul, namun postingan publik tetap dibiarkan tayang. | [`2124829315657576890`](https://x.com/theo/status/2124829315657576890) · [Origin 2](https://x.com/realchendahuang/status/2125062675147448475) |
| **2026-11-24 06:06–12:23 CST** | `@theo` menyambut perusahaan AS bernilai triliunan dolar yang menyalin kode MIT (`2124989435154726982`), mengejek kepatuhan hukum (`"get a better lawyer"`), Postingan Awal 1–2 terbit, dan pada **12:21 CST** (`04:21Z`, 17 jam setelah ancaman blokir) `@theo` me-merge **PR #41898** yang secara retroaktif menambahkan `TRADEMARK.md`. | [`2124989435154726982`](https://x.com/theo/status/2124989435154726982) · [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) |
| **2026-11-24 17:04–21:21 CST** | Audit **Bagian 1–5** terbit (Bagian 1 menembus **1,81 juta+ tayangan**, 6.640 marka buku). Pada `18:39 CST`, `@theo` menyebut komunitas teknologi Tiongkok di Twitter sebagai `"the biggest fucking cesspit"` (`2125177503526588877`); pada `19:13–19:36 CST` mengklaim Managed Policy mematikan seluruh telemetri (`2125186071357251715`). | [Bagian 1](https://x.com/realchendahuang/status/2125153472450527440) → [Bagian 5](https://x.com/realchendahuang/status/2125218189596676555) |
| **2026-11-24 Malam – 2026-11-25 ~07:00 CST** | Keluhan resmi GDPR Uni Eropa diajukan; **sprint kilat 6 jam semalaman** me-merge `#42380` (2,2 juta/jam span IP), `#42285`/`#42430` (penghapusan akun), `#42376`/`#42464` (pengabaian opt-out Win/Mac), `#42450` (kebocoran path `git.cwd`, 90 menit setelah Theo membantah pengumpulan path), `#42459`/`#41859` (kebocoran push), `#42466` (batch anonim), `#41757`/`#42386`/`#42504` (tambalan keamanan diam-diam). Menjelang fajar, `@theo` memposting lalu menghapus ancaman untuk menutup kode sumber (`closed-source`). | [Bagian 11](https://x.com/realchendahuang/status/2125394810559426993) · [Bagian 12](https://x.com/realchendahuang/status/2125395501663281198) · [Bagian 13](https://x.com/realchendahuang/status/2125395980354994414) |
| **2026-11-25 08:27–10:28 CST** | Audit **Bagian 6–18** terbit membahas neraca bisnis, celah Managed Policy, `yolo merges`, pengikisan oleh `@bot`, pengungkapan pasca-GDPR, dataset 1.151 tweet, catatan USPTO, keterkaitan sponsor, dan mesin pengumpul 77 ribu bintang. | [Bagian 6](https://x.com/realchendahuang/status/2125385742243520653) → [Bagian 18](https://x.com/realchendahuang/status/2125416210120765799) |

---

## 1. Sengketa Awal: "Steal Our Code", Ancaman Penamaan Fork & Standar Ganda

Selama 48 jam pada 23–25 November 2026, sengketa penamaan atas sebuah fork komunitas berlisensi MIT dari T3 Code berkembang menjadi audit kode sumber menyeluruh, pengaduan GDPR di Eropa, dan hampir 20 tambalan darurat dalam satu malam.

Antara malam 23 November hingga pagi 24 November 2026 (Waktu Beijing), seorang pengguna mengeluhkan UI dari fork MIT sumber terbuka dan gratis yang dibuat oleh pengembang Tiongkok (`@DDdxx666`) di internet karena mengira aplikasi tersebut adalah aplikasi resmi. Tanpa memeriksa apakah repositori itu merupakan fork MIT yang sah, `@theo` memposting dua kali dalam selang 11 menit dengan menyebutnya `"Chinese knockoff"` dan `"Temu3 Code"`, mengejek langsung karya penulisnya, dan mengancam akan menghubungi GitHub agar akun pembuatnya diblokir (`"Do it right now or I'm going to contact GitHub and have your account taken down"`). Pada waktu yang hampir bersamaan, situs web T3 Code ([`https://t3.codes/`](https://t3.codes/)) memberi label tautan repositori GitHub-nya dengan tulisan `"Steal our code (legally)"` (`"steal our code"`) ([Origin 1](https://x.com/realchendahuang/status/2125059292919394654), [Origin 2](https://x.com/realchendahuang/status/2125062675147448475)).

Pembuat fork itu segera menuruti permintaan tersebut dengan mengganti nama repositorinya menjadi `Stardust` dan menghapus seluruh merek T3 dalam 30 menit. `@theo` meminta maaf secara pribadi melalui DM, namun tetap membiarkan kedua postingan publiknya—yang jika digabungkan melampaui 200.000 tayangan—tayang tanpa penghapusan atau klarifikasi. Kurang dari 11 jam kemudian, pada pukul `06:12 BJ` tanggal 24 November (`2124989435154726982`), ketika ditanya apakah perusahaan AI AS bernilai triliunan dolar yang menyalin fitur dari T3 Code telah melampaui batas, ia justru mengambil sikap berlawanan: `"Nah. Open source is open source, even if a trillion dollar company uses it!"` Sementara itu, pegawai T3 sendiri `@maria_rcks` mengelola fork publik bernama `maria-rcks/t3libre` (*"T3 Code, liberated"*), dan repositori berbahasa Inggris seperti `t3code-quota-ui`, `t3code-atlas`, dan `t3code-bar` beroperasi tanpa ancaman publik apa pun.

![Theo secara terbuka mengancam akan menghubungi GitHub agar akun pembuat fork sumber terbuka diblokir](../../evidence/01-origin-theo-threat.png)

![Anggota tim T3 @maria_rcks mengelola fork publik bernama maria-rcks/t3libre ("T3 Code, liberated")](../../evidence/extra/p1-3-maria-t3libre.png)

Dimulai pada pukul 17:04 Waktu Beijing tanggal 24 November, saya mengaudit riwayat commit, file kode sumber, PR, Issue, dokumentasi resmi, catatan USPTO TSDR milik `pingdotgg/t3code`, serta linimasa X publik `@theo`. Selama lebih dari 24 jam, saya menerbitkan **18 bagian terdokumentasi** yang ditopang tautan langsung dan tangkapan layar. Bagian 1 saja menembus **1,81 juta tayangan** dan **6.640 marka buku**, memicu pengajuan keluhan GDPR di Eropa dan sprint penambalan semalam berdurasi 6 jam oleh tim T3.

---

## 2. Telemetri, Pembacaan Kredensial Lintas Alat & Gelombang Tambalan Pascakeluhan GDPR (Bagian 1, 7, 11, 12)

> **Audit Teknis Mendalam:** Pemetaan baris kode sumber lengkap, daftar aksi `FeatureUsage.ts`, celah `DesktopShellEnvironment.ts`, dan log menit demi menit 23–25 November tersedia di [**Dossier 01: Arsitektur Telemetri, Penautan Identitas Lintas Alat & Sprint Semalam GDPR 24–25 Nov**](../dossiers/01-telemetry-and-gdpr-timeline.md).

### 2.1 Telemetri Bawaan, Janji Beranda yang Dihapus & Penghashan Kredensial Lintas Alat (`Bagian 1`)

Pada **6 Maret 2026**, `pingdotgg/t3code` me-merge **PR #174**, yang mengaktifkan telemetri PostHog secara bawaan tanpa dokumentasi telemetri di repositori, tanpa dialog persetujuan saat pertama kali dijalankan, dan tanpa tombol pengaturan di UI. Variabel lingkungan opt-out tersembunyi di dalam kode sementara instalasi bawaan langsung mulai mengirimkan event ([Bagian 1](https://x.com/realchendahuang/status/2125153472450527440)).

Selama lebih dari tiga bulan pengumpulan data bawaan berjalan, beranda T3 Code memajang dua baris janji secara mencolok: `No telemetry / Unless you opt in. Full stop.` Pada **18 Juni 2026**, `@theo` diam-diam menghapus kedua baris itu saat merombak tampilan beranda ([`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3)) tanpa pengumuman atau pemberitahuan kepada pengguna lama.

![Commit 3bdaa6e1 pada 18 Juni 2026 diam-diam menghapus janji beranda "No telemetry / Unless you opt in. Full stop."](../../evidence/02-no-telemetry-removed.png)

Pada Oktober 2026, `@theo` me-merge **PR #15028**, merutekan unggahan telemetri dalam batch setiap 10 detik (`FLUSH_INTERVAL_MS = 10_000`) melalui gateway sumber tertutup T3 [`https://ingest.t3.codes/`](https://ingest.t3.codes/). Baris 1 dari [`apps/server/src/telemetry/AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) menyatakan secara eksplisit bahwa endpoint ingest menyimpan salinan setiap event mentah sebelum meneruskannya ke PostHog:

```ts
// apps/server/src/telemetry/AnalyticsService.ts (lines 1, 71–74, 149)
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
...
  posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(
    Config.withDefault("https://ingest.t3.codes"),
  ),
  enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
...
  const { distinctId, installId } = yield* getTelemetryIdentity;
```

Kolom yang dikumpulkan di dalam [`ProviderUsageAnalytics.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts) dan `FeatureUsage.ts` mencakup penyedia (provider), pilihan model (mengirimkan ID model/endpoint kustom di luar katalog secara verbatim melalui `ProviderDimensions.ts`), tingkat reasoning effort, mode izin, durasi eksekusi, jumlah token input/output/cached/reasoning, token agen anak (child-agent), jumlah proyek/thread lokal, **35 aksi UI/perintah yang berbeda** (`18` `COMMAND_FEATURES` + `17` `METHOD_FEATURES`), detail OS, distro WSL, dan arsitektur CPU.

Pada **19 Oktober 2026**, `@theo` melanjutkannya dengan **PR #21506** untuk menghitung berapa banyak mesin yang dimiliki oleh satu individu. [`apps/server/src/telemetry/Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) mulai diam-diam membaca file kredensial milik alat AI lain di direktori home pengguna—`~/.codex/auth.json` dan `~/.claude.json`—lalu mendekode klaim JWT `user_id` OpenAI serta `oauthAccount.accountUuid` Claude, dan membuat hash-nya bersama ID pengguna T3 Connect dan ID perangkat yang tertaut:

```ts
// apps/server/src/telemetry/Identify.ts (lines 257–269, 321–338)
  const codexTokens = yield* readJsonIdentityFile(
    "codex",
    path.join(homeDirectory, ".codex", "auth.json"),
    decodeCodexAuthJson,
  )...
  const claudeJson = yield* readJsonIdentityFile(
    "claude",
    path.join(homeDirectory, ".claude.json"),
    decodeClaudeJson,
  )...
  const raw: ReadonlyArray<readonly [TelemetryOwnerSource, Option.Option<string>]> = [
    ["connect", connectUser],
    ["openai", Option.flatMap(codexTokens, (tokens) => Option.flatMap(Option.fromUndefinedOr(tokens.id_token), openAiUserId))],
    ["claude", Option.flatMap(claudeJson, (json) => Option.fromUndefinedOr(json.oauthAccount?.accountUuid))],
  ];
  return raw.flatMap(([source, value]) =>
    Option.isSome(value) && value.value.trim() !== "" ? [{ source, ownerId: hashTelemetryId(value.value) }] : [],
  );
```

Dan di [`packages/shared/src/telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts) (baris 8–9), `hashTelemetryId` menghitung **digest SHA-256 tanpa salt** (`Hex.encode(sha256(new TextEncoder().encode(value)))`). Karena server sudah menyimpan ID akun T3 Connect dalam bentuk teks biasa dari Clerk, penghashan nilai teks biasa di sisi backend dapat langsung membalikkan digest tanpa salt itu kembali ke identitas orang yang dikenal; ID OpenAI atau Claude pihak ketiga yang bocor juga akan bertaut secara deterministik pada hash yang sama.

![Identify.ts membaca ~/.codex/auth.json dan ~/.claude.json untuk mengirim hash SHA-256 tanpa salt demi atribusi lintas perangkat](../../evidence/03-identify-codex-claude.png)

Protes komunitas berulang kali dibungkam. Pada **23 Juni**, seorang pengembang membuka **Issue #1397** untuk meminta tombol penghenti di pengaturan; pengelola inti Julius menutupnya sebagai `not planned`: `We will not make this easier to opt out of, it is crucial for us to know how many users we have`. Pada bulan Juli, seorang pengguna mengunggah tangkapan layar arsip beranda di **Issue #4123** untuk mempertanyakan janji yang diingkari (`"No telemetry"`), yang kemudian ditutup oleh akun `@theo` melalui commit yang tidak berkaitan pada 21 Oktober, dibuka kembali setelah menuai kritik, dan ditutup diam-diam lagi pada 4 November. Antara September hingga November, para kontributor mengajukan **empat PR opt-out terpisah** (`#13458`, `#16763`, `#21248`, `#27077`). Bahkan `#27077`—yang telah teruji di perangkat keras nyata dengan **147 pengujian lulus** dan disetujui oleh Macroscope—tetap ditutup pada **17 November** dengan label `unwanted`.

![Pengelola inti Julius menutup Issue #1397 sebagai not planned dan menyatakan tidak akan mempermudah opt-out](../../evidence/04-issue1397-no-optout.png)

![PR #27077 ditutup tanpa di-merge dan diberi label unwanted meski 147 pengujian lulus serta disetujui Macroscope](../../evidence/extra/t3code-4-pr-27077-rejected.png)

### 2.2 Kontradiksi Managed Policy & Dokumentasi Resmi (`Bagian 7`)

Pada 24 November, seiring meningkatnya kritik, `@theo` mengklaim di X bahwa T3 Code memiliki Managed Policy perusahaan terbaik di industri (`"trivial to set up and turn off all telemetry"`) serta bahwa data percakapan tetap berada di disk lokal dan `"never touches any of our servers"` ([`2125186071357251715`](https://x.com/theo/status/2125186071357251715), [`2125191784859115766`](https://x.com/theo/status/2125191784859115766), [Bagian 7](https://x.com/realchendahuang/status/2125391659492081947)).

Pemeriksaan langsung terhadap [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) dan [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) menunjukkan hal sebaliknya:
1. **Konfigurasi Khusus Administrator:** Pengguna desktop masih tidak memiliki tombol Settings UI sama sekali. Mematikan telemetri via Managed Policy mewajibkan MDM/Group Policy atau menulis `policy.json` ke path sistem yang dilindungi hak admin (`/Library/Application Support/T3Code/policy.json` di macOS, `C:\Program Files\T3Code\policy.json` atau `HKLM\SOFTWARE\Policies\T3Tools\T3Code` di Windows, `/etc/t3code/policy.json` di Linux).
2. **Titik Buta Aplikasi Web Terhosting (`app.t3.codes`):** `docs/user/telemetry.md` secara eksplisit mengakui bahwa aplikasi browser tidak membaca variabel lingkungan server, mengabaikan Managed Policy, mengirim jejak koneksi ketika dibangun dengan fitur tracing, dan `"has no relay tracing toggle"`.
3. **Aplikasi Seluler di Luar Kebijakan Server:** Variabel lingkungan server dan Managed Policy `"do not disable mobile tracing"`.
4. **`Publish agent activity` Mengabaikan Opt-Out:** Ketika diaktifkan pada sebuah host, judul proyek, judul thread, nama model, dan status aktivitas langsung dikirim ke relay T3 Connect—dan `"The telemetry opt-out does not disable it."` (Selain itu, span Axiom yang gagal dan log crash seluler `"can quote a value the app was handling"`, sementara `Agent feedback` dapat melampirkan hingga 16 KB pesan percakapan.)

![Dokumentasi resmi docs/user/telemetry.md mengonfirmasi aplikasi web terhosting tidak memiliki tombol mati, seluler berada di luar Managed Policy, dan publikasi aktivitas agen mengabaikan opt-out telemetri](../../evidence/05-telemetry-cant-disable.png)

![Dokumentasi resmi docs/user/managed-policy.md merinci path sistem yang dilindungi administrator di macOS, Windows, dan Linux](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

### 2.3 Klarifikasi 25 Nov Terbantahkan dalam 2 Jam (`Bagian 11`)

Pada pagi hari 25 November, `@theo` menerbitkan klarifikasi panjang ([`2125332390239494211`](https://x.com/theo/status/2125332390239494211)) beserta ekspor telemetri publik ([`t3code-telemetry-events-jsonl-a4896cdc.gz`](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)) yang membuat tiga jaminan tegas—disusul balasan yang membantah adanya penulisan file pelacakan lokal saat kondisi opt-out ([`2125370330244128924`](https://x.com/theo/status/2125370330244128924)) ([Bagian 11](https://x.com/realchendahuang/status/2125394810559426993)):

- **"Tidak pernah mengumpulkan path file" (`"Never collected file paths"`):** 90 menit kemudian, Julius me-merge **PR #42450**, yang mengakui bahwa eksekusi webhook yang dikirimkan melalui relay mengekspor keseluruhan span eksekusi ke Axiom—termasuk span Git yang memuat `git.cwd` (**path ruang kerja absolut, nama pengguna OS, dan nama repositori**).
- **"Variabel lingkungan selalu mematikan telemetri dengan bersih" (`"Environment variables always disabled telemetry cleanly"`):** **PR #42376** mengonfirmasi versi desktop Windows mengabaikan variabel lingkungan pengguna tersimpan `T3CODE_TELEMETRY_ENABLED=false` saat diluncurkan dari proses yang sudah berjalan, sedangkan **PR #42464** mengonfirmasi tracing relay peluncuran pertama di macOS/Linux dievaluasi sebelum penemuan shell, sehingga mengabaikan opt-out di `~/.zshrc` sepanjang sesi berjalan. (`DesktopShellEnvironment.ts` masih melewatkan penerusan `T3CODE_OTEL_SDK_DISABLED`.)
- **"Tidak ada file pelacakan yang ditulis saat opt-out" (`"No tracking files written when opted out"`) & "Hash Claude dulu rusak" (`"Claude hashes were broken"`):** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) (baris 149) tetap memanggil `getTelemetryIdentity` tanpa syarat saat startup, menulis ID instalasi lokal serta membaca/menghash `~/.codex/auth.json` dan `~/.claude.json`. Sementara itu, pemeriksaan header gzip dari ekspor ~100MB milik `@theo` (`6.056.594` byte terkompresi, `95.789` event) memperlihatkan nama file asli `events.clean.jsonl` yang dibuat 20 menit sebelum tweet-nya—namun masih menyimpan **264 catatan akun Claude aktif** yang menautkan **4 mesin berbeda** (`installId`) ke hash SHA-256 yang sama persis pada 20 Oktober, bersama nama model proxy privat secara verbatim (`vibeproxy/gpt-6-luna`, `muse-proxy-wonder-full`).

![PR #42450 mengonfirmasi eksekusi yang dipicu relay sebelumnya mengekspor path ruang kerja absolut git.cwd berisi nama pengguna dan nama repo ke Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 mengakui desktop Windows mengabaikan variabel lingkungan pengguna T3CODE_TELEMETRY_ENABLED=false yang tersimpan](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 mengakui tracing relay peluncuran pertama macOS mengabaikan opt-out ~/.zshrc sepanjang sesi](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![Audit forensik atas dump publik events.clean.jsonl milik Theo menunjukkan 264 catatan Claude menautkan 4 mesin serta model proxy kustom secara verbatim](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

### 2.4 Gelombang Tambalan Kilat Enam Jam Pasca-GDPR (`Bagian 12`)

Setelah keluhan resmi GDPR Uni Eropa diajukan pada malam 24 November, PR darurat semalaman memunculkan empat pengungkapan privasi yang lebih dalam ([Bagian 12](https://x.com/realchendahuang/status/2125395501663281198)):

1. **2,2 Juta/Jam Span Relay Bertag IP (`PR #42380`):** Mengakui setiap span permintaan relay yang diekspor ke Axiom—sekitar **2,2 juta span per jam, disimpan selama 30 hari**—mencatat `client.address` (IP pemanggil dari `cf-connecting-ip`) dan `user_agent.original` tepat di sebelah `user.id` (dengan catatan log pemanggilan 1% Cloudflare Workers tetap terpisah). Tiga setengah jam setelah di-merge, `@theo` masih membalas bahwa alamat IP sudah lama dihapus.
2. **Penghapusan Akun yang Tidak Tuntas (`PR #42285` & `PR #42430`):** Mengakui bahwa menghapus pengguna di Clerk sebelumnya membiarkan baris data relay PlanetScale dan Cloudflare tunnel aktif tetap utuh, hingga permintaan penghapusan privasi yang masuk menuntut **SQL tulisan tangan dan pembongkaran tunnel secara manual**.
3. **Kebocoran Notifikasi Push Seluler (`PR #42459` & `PR #41859`):** Notifikasi FCM Android mengirimkan nilai `user_id` Clerk dalam teks biasa ke Google pada setiap push; span/error permintaan push iOS mencatat URL push perangkat lengkap yang membawa token.
4. **Umpan Balik "Anonim" yang Tercampur (`PR #42466`):** Mengakui bahwa event `agent.feedback` yang diklaim anonim digabung dalam satu HTTP POST yang sama bersama event ber-`installId` teridentifikasi dan sidik jari host lengkap (OS, arsitektur, distro WSL mentah), bertentangan dengan `docs/user/telemetry.md`. Sementara itu, `privacy-policy.astro` tidak berubah sejak 6 Oktober.

![PR #42380 mengungkap span relay mencatat alamat IP pemanggil asli dan User-Agent di samping user.id sebanyak 2,2 juta span/jam selama 30 hari di Axiom](../../evidence/08-pr42380-220w-ip-axiom.jpg)

![PR #42285 mengakui penghapusan akun sebelumnya meninggalkan baris relay dan Cloudflare tunnel aktif hingga permintaan penghapusan privasi memaksa penulisan SQL manual](../../evidence/09-pr42285-delete-account-leftover.jpg)

![PR #42459 mengakui push FCM Android mengirimkan nilai Clerk user_id mentah ke Google](../../evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg)

![PR #42466 mengakui umpan balik anonim digabungkan dalam POST yang sama bersama installId dan sidik jari host](../../evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg)

---

## 3. Penyimpanan Lokal, Pemantauan Proses, Penerobosan Pagar Pengaman & Tambalan Keamanan Tersembunyi (Bagian 2, 3, 13)

> **Audit Teknis Mendalam:** Kueri SQL pemangkasan SQLite verbatim, pemanggilan `sysinfo` Rust, baris izin `ClaudeAdapterV2.ts`, dan analisis batas lengkap `SECURITY.md` tersedia di [**Dossier 02: Keamanan Lokal, Penerobosan Eksekusi Kode Diam-Diam, dan Audit Keamanan Tak Terpublikasi**](../dossiers/02-local-safety-and-security-audit.md).

### 3.1 Penghapusan Thread Palsu di SQLite & Pemindaian Proses Seluruh Mesin (`Bagian 2`)

Saat pengguna menghapus thread di sidebar, dialog konfirmasi (`useThreadActionMenu.ts`) menjanjikan `"This permanently clears conversation history for this thread."` Kenyataannya, `ThreadDeletion.ts` hanya menambahkan event `"thread.deleted"` ke `statev2.sqlite`, sementara `ProjectionMaintenance.ts` mengecualikan `thread.created` serta event stream terbaru (`MAX(newer.sequence)`) dan tetap mempertahankan event-event sebelumnya. Pengguna melaporkan `statev2.sqlite` membengkak hingga **25,9 GB** dalam tiga minggu (90% berisi thread "terhapus"), **41,6 GB** dalam enam minggu, dan **33 GB** dalam tujuh minggu—membiarkan **Issue #17845** (dan **#28903**) terbengkalai sejak 10 Oktober ([Bagian 2](https://x.com/realchendahuang/status/2125160473176023486)).

![Issue #17845 melaporkan thread yang dihapus permanen tetap tersimpan di dalam statev2.sqlite, membengkakkan disk hingga puluhan gigabyte](../../evidence/10-issue17845-fake-delete.png)

Proses pembantu latar belakang berbahasa Rust, `t3-resource-monitor` (**Issue #11222**, `native/resource-monitor/src/main.rs` yang memanggil `ProcessesToUpdate::All` dengan `with_cmd(UpdateKind::Always)`), memindai setiap proses di mesin setiap 5 detik meski panel diagnostik ditutup—membuka ~280–300 handle persisten terhadap 440+ aplikasi dan gim yang tak berkaitan di Windows tanpa opsi opt-out, sementara dokumentasi mengklaim pengambilan sampel hanya berjalan bila ada subscriber aktif. Baru pada **24 November**, **PR #41889** mengonfirmasi bahwa diagnostik proses sebelumnya merekam **argumen baris perintah proses secara utuh**—yang kerap memuat kunci API teks biasa, kata sandi basis data, dan token autentikasi—ke dalam telemetri langsung dan snapshot riwayat.

![Issue #11222 mendokumentasikan t3-resource-monitor memindai setiap proses di dalam mesin](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

Cacat lokal terverifikasi lainnya dalam Bagian 2 meliputi:
- **Kebocoran Hostname Perusahaan lewat Favicon:** Permintaan frontend membocorkan hostname internal (mis. `devbox.localdomain`) ke API favicon Google (`PR #16950`, `PR #32657`).
- **Permintaan Jaringan Wajib saat Startup:** Meski telemetri dimatikan, startup server secara tanpa syarat mengambil manifes kompatibilitas dari [`https://raw.githubusercontent.com/`](https://raw.githubusercontent.com/) tanpa opsi opt-out (**Issue #36479**).
- **Penerobosan Persetujuan & Kebijakan:** Perbaikan penerobosan persetujuan/kebijakan pada akses penuh dan WSL/Tailscale (`PR #21806`, `PR #27322`).
- **Pembakaran Kuota Claude 1,7x & Konsumsi Daya 136x:** Menjalankan Claude via Agent SDK menguras kuota 5 jam pada kecepatan **1,7x** dari laju normal hingga awal November (`Issue #7338`, `Issue #24649`, 81 komentar); bug GPU/daya mencapai **136x** konsumsi daya aplikasi Electron pembanding—termasuk GPU 19-core MacBook yang terkunci di **60W** hingga menguras baterai dalam 78 menit dan tetap menyedot **18W** setelah tab web ditutup (`Issue #3143`, `Issue #40581`).

### 3.2 `git push --force` Diam-Diam Selama 52 Hari vs. Pencabutan Filter Privasi Model dalam 21 Jam (`Bagian 3`)

Sejak **3 Oktober** ke atas—lebih dari **52–53 hari** di **Issue #15353** ([komentar](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695))—mode Claude Auto diam-diam mengeksekusi perintah berbahaya (`ClaudeAdapterV2.ts` mengambil jalan pintas menjadi `"allow"` ketika `requiresClaudeApproval` bernilai false). Bahkan tanpa aturan kustom apa pun, setelah pengklasifikasi Claude memblokir `git push --force origin main` dua kali dan mengeskalasi percobaan ketiga untuk persetujuan manual, T3 Code langsung menyetujuinya diam-diam tanpa dialog UI dan mencatat `"source": "user_temporary"`. Dua PR perbaikan dari komunitas (`#15360`, `#35207`) dibiarkan tanpa tinjauan hingga ditutup otomatis oleh bot, sementara `#40692` tetap tertunda ([Bagian 3](https://x.com/realchendahuang/status/2125201882687881378)).

![Issue #15353 terbuka lebih dari 52 hari memperlihatkan mode Claude Auto diam-diam menyetujui git push --force tanpa meminta konfirmasi](../../evidence/11-issue15353-auto-force-push.png)

Sebaliknya, pada **22 November**, **Issue #40948** mencatat bahwa model-model baru tidak muncul di papan peringkat telemetri publik milik `@theo` [`https://slopalytics.com/`](https://slopalytics.com/) ([`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)) karena `PR #29001` membatasi pelaporan hanya pada daftar putih (whitelist). Dalam waktu **21 jam**, **PR #41237** di-merge di bawah akun `@theo` dengan keterangan eksplisit bahwa Theo meminta penghapusan filter tersebut—sehingga nama internal seperti `ollama/acme-internal` dan `acme-azure-deployment` milik perusahaan terkirim secara verbatim ke analitik.

![PR #41237 di-merge 21 jam setelah Issue #40948 untuk mencabut filter model demi slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

### 3.3 Nol Imbauan Keamanan, Tambalan Kerentanan Diam-Diam & `SECURITY.md` (`Bagian 13`)

Hingga 25 November, tab [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) milik `pingdotgg/t3code` mencatat **0 imbauan keamanan diterbitkan** ([Bagian 13](https://x.com/realchendahuang/status/2125395980354994414)). Namun para pengelola diam-diam me-merge tambalan tingkat keparahan tinggi tanpa memberi tahu pengguna aktif:
- **Perbaikan keamanan yang di-merge diam-diam:** `PR #39483` (penelusuran jalur pada `ServerSecretStore` melalui `jti`/`nonce` relay sebelum persetujuan perangkat), `PR #41756` (kebocoran token GitHub/GitLab perusahaan lintas domain), `PR #41886`, `PR #22190`, `PR #37823`, `PR #39464`, `PR #39480`, `PR #40133`, `PR #41757` & `PR #42386` (pratinjau browser desktop tanpa sandbox & isolasi popup), serta `PR #42504` (tambalan ~3.000 baris yang akhirnya menambahkan konfirmasi untuk konfigurasi repo tak tepercaya yang sebelumnya langsung mengeksekusi perintah lokal tanpa persetujuan).
- **Item keamanan yang belum selesai / masih terbuka:** `Issue #26489` (risiko penelusuran jalur eksternal/symlink), `PR #36216`, `PR #23428`, `PR #33144`, dan `PR #30997` (peluncur Windows `externalLauncher.ts` yang menjalankan `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` hingga ditandai AVG/Avast sebagai `IDP.HELU.PSE96`).
- **[`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md) yang disusun terburu-buru (`PR #38812`, `PR #41942`):** Menyatakan pembacaan `filesystem:read` seluruh OS di luar ruang kerja, transmisi HTTP polos di iOS/LAN, dan pengambilalihan penuh mesin akibat bocornya kunci penandatanganan relay sebagai **batasan desain yang disengaja**, bukan kerentanan, sementara [`https://ingest.t3.codes/`](https://ingest.t3.codes/) tetap tertutup (`2125370330244128924`).

![PR #39483 diam-diam menambal penelusuran jalur ServerSecretStore tanpa menerbitkan Security Advisory](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997 perbaikan terbuka untuk peluncuran PowerShell Base64 EncodedCommand di Windows yang ditandai sebagai malware](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md secara eksplisit menandai pembacaan seluruh OS, HTTP sembarang di iOS, dan pengambilalihan mesin lewat kunci relay sebagai batasan yang disengaja](../../evidence/extra/x-post05-4-security-md-intended.jpg)

---

## 4. Risiko Ketentuan Layanan Google Antigravity & Relay T3 Connect Tanpa Enkripsi (Bagian 4, 5)

> **Audit Teknis Mendalam:** Peta header lengkap `cliproxyApi.ts` (`PR #33800`), `AntigravityAcpSupport.ts`, `contracts/src/settings.ts`, dan referensi baris `ManagedEndpointProvider.ts` tersedia di [**Dossier 03: Pemalsuan ToS Google Antigravity, `PR #33800`, dan Arsitektur Relay T3 Connect**](../dossiers/03-antigravity-tos-and-t3connect-relay.md).

### 4.1 Pemalsuan Header Google Antigravity, `SSH_CONNECTION` Palsu & Pemblokiran 3 Menit (`Bagian 4`)

Dokumentasi resmi T3 Code [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) meyakinkan pengguna berbayar: *"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."* Ketika pengguna melaporkan pemblokiran di **Issue #40713**, seorang pengelola membantah telah memanggil backend Antigravity atau memakai ulang token dengan mengklaim semua permintaan berasal dari CLI resmi Google—sebelum pengembang (`schlessera`) membantah klaim tersebut menggunakan file kode sumber T3 Code sendiri ([Bagian 4](https://x.com/realchendahuang/status/2125213397507858657)):

1. **User-Agent Palsu, Ekstraksi Keychain & Panggilan `v1internal` ([`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45)):** Mengekstrak kredensial OAuth Google dari file lokal, `@napi-rs/keyring`, atau Windows Credential Manager (`CredReadW` via `ffi-rs` pada `advapi32.dll`), menanamkan string klien internal Google secara hardcode, dan langsung mengirim `POST` ke backend `v1internal` Google yang tidak didokumentasikan ([baris 445–476](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476)). Staf Google mengonfirmasi di [forum pengembang resmi](https://discuss.ai.google.dev/t/185992) bahwa Bagian 6 dari [Ketentuan Layanan Google Antigravity](https://antigravity.google/terms) melarang alat pihak ketiga mengekstrak atau memakai ulang kredensial untuk mengkueri backend secara langsung:

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
const DAILY_ENDPOINT = "https://daily-cloudcode-pa.googleapis.com";
...
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({
    Authorization: `Bearer ${accessToken}`,
    "User-Agent": antigravityUserAgent(platform, architecture),
  }),
```

2. **Penyuntikan `SSH_CONNECTION` Palsu & Percampuran Akun ([`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236)):** Karena CLI Google mengisolasi satu sesi login di dalam keychain OS, T3 menyuntikkan variabel lingkungan `SSH_CONNECTION` palsu untuk mengelabui CLI agar menulis file token teks biasa di penyimpanan lokal. Ketika Google memperbarui CLI-nya pada 24 November dan menghapus mekanisme cadangan itu, **Issue #41973** mengonfirmasi prompt Akun A dialihkan secara diam-diam ke Akun B:

```ts
// apps/server/src/provider/antigravityAuthSupport.ts (lines 230–236)
// The 1.5 CLI ignores AGY_ACP_FORCE_FILE_STORAGE and keeps Google sign-ins in one OS keyring
// entry for every profile, unless it believes it runs over SSH. Sign-in then uses `--login`.
...(auth.authMethod === "oauth-personal"
  ? { SSH_CONNECTION: baseEnv.SSH_CONNECTION || "127.0.0.1 0 127.0.0.1 0" }
  : {}),
GEMINI_HOME: profile.geminiHome,
AGY_ACP_FORCE_FILE_STORAGE: "1",
```

3. **Pemblokiran Akun Baru dalam 3 Menit (`Issue #41536`) & Pemalsuan Klien (`PR #26876`):** Pada 23 November, **Issue #41536** mendokumentasikan langganan Google AI `$20` yang baru dibeli dan berjalan **tanpa proxy sama sekali**—hanya menggunakan Antigravity terkelola di dalam T3 Code—diblokir tepat pada **pesan pertamanya, 3 menit setelah penyiapan** (Google hanya memberi akun pribadi satu kali kesempatan banding; para pengelola menutup issue tersebut sebagai duplikat tanpa menambahkan peringatan). Sebelumnya, `@theo` secara pribadi me-merge **PR #26876** yang menyamarkan T3 Code sebagai `"zed"` (`AntigravityAcpSupport.ts`) demi menerobos daftar putih model. Dan meskipun `@theo` menggambar diagram `T3 Code -> Antigravity binary ✅` pada 23 November ([`2124665075638411641`](https://x.com/theo/status/2124665075638411641)) dan menyalahkan CLIProxy ketika akun Google AI Ultra kedua milik pengguna `@Only_21Mil` dinonaktifkan ([`2124703048140517397`](https://x.com/theo/status/2124703048140517397)), [**PR #33800**](https://github.com/pingdotgg/t3code/pull/33800) yang sudah di-merge secara bawaan menghubungkan polling hub [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) dengan header palsu `claude-code/2.1.273`, `grok-cli/1.0.77`, dan `antigravityUserAgent`.

![antigravityUsageLimits.ts menanamkan header klien Google palsu secara hardcode dan memanggil backend v1internal yang tak terdokumentasi](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts menyuntikkan variabel lingkungan SSH_CONNECTION palsu untuk melewati penyimpanan keychain OS](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536 mendokumentasikan akun Google baru $20 tanpa proxy yang diblokir tiga menit setelah penyiapan pada pesan pertamanya, lalu ditutup sebagai duplikat](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800 menghubungkan polling hub CLIProxyAPI untuk Antigravity, xAI, dan Claude langsung ke dalam T3 Code](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

### 4.2 T3 Connect: Nol Enkripsi Ujung-ke-Ujung & Gateway Terminasi TLS OVH (`Bagian 5`)

**T3 Connect tidak memiliki enkripsi ujung-ke-ujung (E2E) sama sekali—setiap prompt, file kode sumber, dan keluaran terminal secara teknis terlihat dalam teks biasa oleh pihak T3** ([Bagian 5](https://x.com/realchendahuang/status/2125218189596676555)). Saat ini, [`ManagedEndpointProvider.ts`](https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts) menyediakan Cloudflare Tunnels dan catatan DNS di dalam akun Cloudflare milik T3 sendiri (`06_t3-connect.md`). TLS berakhir di edge Cloudflare tanpa enkripsi payload; memasang sebuah Workers Route sudah cukup untuk menyadap seluruh lalu lintas tanpa satu baris pun perubahan kode maupun peringatan di sisi klien.

Persetujuan perangkat baru (`requireConnectDeviceApproval` yang ditambahkan pada [`PR #36419`](https://github.com/pingdotgg/t3code/pull/36419)) bernilai bawaan **`false`**. Sebagaimana diakui [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md), kunci penandatanganan relay yang bocor atau akun cloud yang diretas dapat langsung mencetak sesi ke mesin tertaut—setara dengan akses shell lokal penuh. Ketika **Issue #32098** meminta autentikasi timbal balik (mutual auth) dan enkripsi E2E, seorang pengelola menutupnya dengan alasan E2E penuh merupakan perubahan yang terlalu besar; diskusi `#21286` dan `#37831` tetap tak terjawab, dan pada 25 November `@theo` menyatakan enkripsi E2E tidak mungkin dilakukan (`2125370330244128924`).

Karena biaya Cloudflare Tunnels mencapai **$25.000 per bulan**, `@theo` membuka **PR #32945** untuk memindahkan lalu lintas ke gateway OVH Hillsboro sewaan T3 (`gw.t3coderelay.com`), tempat Caddy milik T3 sendiri mengakhiri TLS dan meneruskan teks biasa melalui Unix socket ke proxy Go `yamux`—tetap tanpa enkripsi E2E. Sementara itu, [`privacy-policy.astro`](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro) (`effectiveDate="2026-10-06"`) menjanjikan `"encrypted network transport"` tanpa mengungkapkan ketiadaan enkripsi E2E maupun memberikan jaminan tidak adanya penyimpanan data.

![Pengelola inti mengakui di Issue #32098 bahwa akun cloud atau kunci relay yang dicuri dapat mengendalikan mesin tertaut namun tetap menyisihkan enkripsi E2E](../../evidence/15-connect-no-e2e.jpg)

![PR #32945 milik Theo mencatat tagihan Cloudflare $25rb per bulan dan memindahkan T3 Connect ke gateway OVH yang dikelola sendiri tempat Caddy mengakhiri TLS](../../evidence/16-pr32945-ovh-caddy-gateway.jpg)

---

## 5. Neraca Bisnis, Konflik Investor, Sponsor & Corong 77.000 Bintang (Bagian 6, 8, 17, 18)

> **Audit Teknis Mendalam:** Kutipan lengkap pendapatan/radar, konfigurasi Axiom `infra/relay/src/observability.ts`, dan pembongkaran lengkap `GitHubStarPrompt.tsx` tersedia di [**Dossier 04: Neraca Bisnis, Konflik Investor, Tumpukan Sponsor & Mesin 77rb Bintang**](../dossiers/04-business-ledger-sponsors-and-77k-stars.md).

### 5.1 Pengeluaran $800.000+ & Radar Komputasi 31,7 Triliun Token/Hari ($10,19 Juta/Hari) (`Bagian 8`)

Dari 1.151 tweet selama 17,24 hari, `@theo` menyebut T3 Code sebanyak **162 kali (14,1%)** sementara menyebut tiga bisnis berbayarnya yang lama—`T3 Chat`, `UploadThing`, dan [`https://ping.gg/`](https://ping.gg/)—sebanyak **0 kali**. Pada 12 November, ia mengonfirmasi telah mengeluarkan **$800k+** dari kantong sendiri untuk klien MIT gratis tersebut ([`2120729779511124267`](https://x.com/theo/status/2120729779511124267), [Bagian 8](https://x.com/realchendahuang/status/2125392410763239723)).

Sebagai imbalannya, telemetri yang mengalir ke `ingest.t3.codes` membangun radar komputasi waktu nyata yang melacak **31,7 triliun token/hari**—setara biaya API **$10,19 juta/hari** pada 18 November (mencapai puncak mendekati **$10,2 juta/hari**)—beserta pangsa pasar persisnya (`99%` berbasis langganan, `~98,5%` terbagi di Codex/Claude/Antigravity, pangsa uji coba model open-weight merosot dari `15%` menjadi `6%` dengan di bawah 0,5% total prompt). Ketika seorang komentator mencoba menebak pangsa pasar pada 23 November, `@theo` mengejeknya karena tidak memiliki akses ke analitik miliknya (`2124682906132181482`).

Radar tersebut langsung berkonversi menjadi daya tawar: **$300k+ token akses awal OpenAI gratis tanpa batas** yang dihabiskan dalam satu tolok ukur GPT-6.2 Astra (`2122760447103484410`), benchmarking bare-metal Google & interaksi dengan DeepMind (meski klaim `@theo` bahwa `@PatrickToulme` dari DeepMind menyumbang `"many PRs"` bertolak belakang dengan git log `pingdotgg/t3code` yang hanya mencatat **1 commit**, `PR #31158`), serta ketertarikan investor (`"multiple investors have asked me about this"`, [`2123885732330885417`](https://x.com/theo/status/2123885732330885417)).

![Dasbor analitik internal T3 Code milik Theo menampilkan 31,7 triliun token dan pengeluaran API harian setara $10,19 juta](../../evidence/17-theo-31t-tokens-10m-day.png)

![Riwayat commit pingdotgg/t3code yang disaring menurut patrick-toulme hanya menunjukkan 1 commit (#31158), bukan "many PRs"](../../evidence/extra/p3-2-patrick-only-1-commit.png)

### 5.2 Konflik Angel Investor (`Bagian 6`) & Standar Ganda Sponsor/Kuota (`Bagian 17`)

- **Tumpang Tindih Vibe Kanban & Daytona ([Bagian 6](https://x.com/realchendahuang/status/2125385742243520653)):** Pada 16 November (`2122201981167251877`), `@theo` mengungkapkan bahwa ia adalah investor dan kontributor **Vibe Kanban**—yang beralih ke arah UI T3 Code sebelum tutup—lalu mengejek UI tersebut sangat cocok `"for running out of runway and killing your business"`. Pada 18 November (`2123011578090127499`), ia mengonfirmasi berinvestasi di perusahaan cloud-sandbox **Daytona** beserta para kompetitornya, hanya sembilan hari setelah melontarkan rencana cloud sandbox berbayar di dalam T3 Code (`2119705561679933806`).
- **Tumpukan Sponsor Tertanam di Relay ([Bagian 17](https://x.com/realchendahuang/status/2125411353393553744)):** Dua sponsor dari daftar sponsor YouTube `@theo` pada Mei 2023 (`1657488850472804353`)—**Clerk** dan **Axiom**—menggerakkan autentikasi cloud dan pencatatan log relay bertag IP selama 30 hari di T3 Code. Pada April 2024, CEO Vercel `@rauchg` mengonfirmasi bahwa Vercel hanya mensponsori Theo (`1776260839965863965`), dan Theo belakangan mengakui kontrak sponsor memuat klausul eksklusivitas (`uv179CTAK-w`). Ia juga merupakan angel investor di Cursor dan Cline.
- **Eksploit Kuota 0% Codex & Kontradiksi CLIProxyAPI 10 Akun:** Pada 21 Agustus 2026, `@theo` membanggakan keberhasilannya menyedot **$800+** melewati masa tenggang kuota 0% Codex sementara pegawai T3 `@maria_rcks` merilis *Endless* untuk terus memutar eksekusi melampaui batas nol; setelah menuai kritik pada 22 Agustus, keduanya menghapus postingan mereka dan Maria berharap Codex memblokir akun-akun tersebut (`2090972426876129658`), tepat sebelum terjadinya regresi pemutusan paksa OpenAI (`openai/codex#45444`). Pada Oktober, `@theo` menerbitkan Gist dengan 452 bintang (`59a521d2ee8d70aaf90e280c175072af`) yang menggabungkan **7 akun Claude + 3 akun Codex** (`555%` kuota di 12+ mesin; juga membanggakan hasil `$14.662` / `$15k` Ultra dari 1,1 juta permintaan terproksi serta menulis tutorial Grok Bot + penyiapan Claude `$100`)—yang justru ditautkan oleh `docs/user/faq.md` milik T3 Code tepat setelah menolak fitur pergantian akun bawaan dengan alasan risiko pemblokiran (`"Early apologies if it gets you banned 💀"`).

![Theo mengungkap bahwa dirinya berinvestasi dan berkontribusi di Vibe Kanban sebelum mengejek penutupannya di depan umum](../../evidence/18-theo-vibe-kanban.png)

![Gist cliproxy-setup.md milik Theo dengan 452 bintang yang menggabungkan 7 akun Claude dan 3 akun Codex di 12+ komputer dengan kuota 555%](../../evidence/19-cliproxy-gist-555pct.jpg)

![openai/codex#45444 mendokumentasikan regresi global yang menghentikan giliran aktif di tengah tugas pada kuota 0%](../../evidence/extra/x-post17-3-codex-45444-regression.jpg)

### 5.3 Bagaimana T3 Code Melonjak dari 30rb ke 77rb Bintang dalam 25 Hari (129 Watcher) (`Bagian 18`)

Enam bulan setelah menerbitkan *"Github has a fake star problem"* (`2048122499834036340`, yang memperingatkan bahwa bintang GitHub telah menjadi alat `"to trick VCs into investing"`), `@theo` menulis dan me-merge sendiri tiga PR berikut ([Bagian 18](https://x.com/realchendahuang/status/2125416210120765799)):
1. **30 Okt (`PR #27832`):** Menambahkan dialog permintaan bintang di kanan atas setelah 5 prompt terkirim (`PROMPTS_BEFORE_ASKING = 5`, muncul pada prompt ke-6 di [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx)), langsung **melipatgandakan 10x** jumlah bintang harian (`2117065834267136469`) dan mencapai **+3.094 bintang/hari** di GitHub Trending (`2117172614158508400`).
2. **3 Nov (`PR #29922` & `PR #29987`):** Meningkatkan pemicunya dengan **deteksi jendela diam selama 30 detik** (`IDLE_MS = 30_000`) saat pengguna menunggu giliran agen, serta mengganti pengalihan browser dengan RPC `sourceControl.star`—menembak `PUT user/starred/pingdotgg/t3code` langsung lewat **kredensial GitHub server host** sebelum meledakkan konfeti 160 partikel.
3. **Menerobos Tinjauan & Bug Pemberian Bintang ke Repo Sembarang:** Macroscope menandai `PR #29922` sebagai `Needs Human Approval`; `@theo` tetap me-merge-nya sendiri. Pada 6 November, `zhilsinger` mengajukan `Request changes` yang memperingatkan ketidaktahuan pengguna pada kredensial host bersama (diakui di `GitHubStarPrompt.tsx#L115`) dan fakta bahwa [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) tidak pernah mengunci target ke `pingdotgg/t3code`:

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  // "." and ".." survive encoding and would normalize the URL out of user/starred.
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
...
  return Effect.fn("GitHubDriver.starRepository")(
    function* (host: string, repository: string) {
      const path = starredPath(repository);
      if (path === undefined) return false;
      const response = yield* api.rest({ host, operation: "starRepository", method: "PUT", path });
```

Klien mana pun dengan izin `source-control:write` dapat memberi bintang ke repositori sembarang menggunakan kredensial milik host. Tinjauan `zhilsinger` dibiarkan tak tersentuh selama **19 hari** tanpa satu pun tanggapan sementara jumlah bintang repo melesat dari 30rb ke 77rb bintang (dengan 129 watcher).

![Grafik 2 November milik Theo merayakan lonjakan hampir vertikal 10x bintang harian tepat setelah merilis permintaan bintang di dalam aplikasi](../../evidence/20-star-10x-cliff.png)

![Ulasan Request Changes pengembang zhilsinger pada PR #29922 yang memperingatkan pemberian bintang pada host bersama dan ke repo sembarang lewat kredensial server, dibiarkan tak dijawab selama 19 hari](../../evidence/21-pr29922-zhilsinger-review.png)

![packages/source-control-github/src/server/driver.ts baris 60–99 gagal mengunci target pada pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

---

## 6. Tata Kelola, Bot Pengikis Fork, Catatan Merek Dagang, Himpunan Data 1.151 Tweet & Rekam Jejak Historis (Bagian 9, 10, 14, 15, 16)

> **Audit Teknis Mendalam:** Kode otomatisasi tata kelola lengkap (`.github/scripts/pr-limits.cjs`), audit USPTO TSDR, serta metodologi lengkap `n = 1.151` dan tabel leksikal tersedia di [**Dossier 05: Tata Kelola Repositori, Bot Pengikis Fork, Penyalahgunaan Merek Dagang & Catatan Historis**](../dossiers/05-governance-trademark-and-history.md) dan [**Dossier 06: Dataset Forensik Kuantitatif 1.151 Tweet (7–24 Nov 2026)**](../dossiers/06-tweet-forensic-dataset-1151.md).

### 6.1 Kecepatan Internal vs. Permusuhan Eksternal (`Bagian 9`) & Pengikisan Fork (`Bagian 10`)

- **500 Commit/Hari & `yolo merges` vs. `CONTRIBUTING.md` ([Bagian 9](https://x.com/realchendahuang/status/2125392916369871309)):** `@theo` menggambarkan dirinya mengirim **500 commit/hari** (`2120741101250515322`), menjalankan **700 agen**, Julius me-merge PR secara massal lewat loop agen, `"my yolo merges breaking shit sometimes"` (`2119951615679672513`), serta mempertaruhkan penghapusan isi mesin demi `"free content"` (`2119993037971730879`). Bagi pengguna luar, **PR #5551** mengubur mode Plan (`"Reality check for those upset"`, 10 downvote), **PR #9190** menyembunyikan cincin konteks (16 downvote, tertinggi di repo), **PR #33131** menghapus mode Plan dengan ringkasan AI yang janggal, **Issue #33639** membalas pengguna yang mengeluh dengan `"uninstall our software"` / `"ungrateful prick"` (dan **PR #41572** ditolak keesokan paginya), `CONTRIBUTING.md` dibuka dengan `"here's my advice: Don't"` bersama larangan model serta daftar hitam pengecaman publik di `.github/VOUCHED.td` (174 label `unwanted` di seluruh repo), dan kontributor di X dimarahi karena tidak mengikutinya (`2120821423438778667`), diancam fitur `/btw` akan dihapus (`2120853340078874923`), atau diberi tahu bahwa tangkapan layar beranotasi lebih baik daripada mengirim PR (`2123754193530053110`).
- **Pengikisan oleh `@bot` Secara Terbuka vs. Ejekan terhadap Kompetitor ([Bagian 10](https://x.com/realchendahuang/status/2125393641665671593)):** Pada 8 November, `@theo` membalas `"Okay I'm stealing this"` pada fitur fork milik `@MiaAI_lab` dan 30 detik kemudian mengerahkan `@bot` di balasan publik untuk mengikis fork tersebut ke `beebox` melalui Opus 5.5 (`2119240810202034645`); pada 13 November, ia kembali mengerahkan `@bot` untuk mengkloning fitur-fitur yang dipuji dari alat pesaing (`2121017649652269120`). Namun pada 24 November ia justru mengejek Claude Code Desktop karena menambahkan tab sidebar (`2124987957803446311`). Terhadap para pengkritik, ia menyerukan pengikutnya menggunakan Community Notes untuk `"demonetize them"` (`2120238923884696025`) dan mengonfirmasi menjalankan bot pemblokir otomatis di X (~100 akun diblokir pada 24 Nov, `2125077510941802509`).

![CONTRIBUTING.md menghalangi PR luar dan merinci pemblokiran pengecaman publik di .github/VOUCHED.td](../../evidence/22-contributing-vouched-ban.png)

![Balasan Theo di Issue #33639 yang menyuruh @bermudi mencopot aplikasi dan menyebutnya ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo membalas "Okay I'm stealing this" dan mengerahkan @bot 30 detik kemudian untuk mengikis fork seorang pengembang ke dalam T3 Code](../../evidence/23-stealing-fork-bot.png)

### 6.2 Audit Merek Dagang: 0 Pendaftaran USPTO & `PR #41898` Retroaktif (`Bagian 15`)

Menindaklanjuti petunjuk dari `@vildanden_ai` (`2125275487404761555`), pengecekan pada basis data USPTO TSDR menunjukkan **0 pendaftaran** untuk `T3 Code`, `T3 Tools`, maupun `T3 Connect` ([Bagian 15](https://x.com/realchendahuang/status/2125408163273080950)). Satu-satunya pengajuan USPTO milik T3 Tools Inc. (`PING LABS`, Nomor Seri [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)) ditolak final pada Februari 2025 dan berstatus `ABANDONED` per 19 Mei 2025, sementara pihak ketiga sudah memegang pendaftaran merek perangkat lunak/SaaS `T3` di kelas 42 dan 9 (`EquipmentShare` Reg. `7795672` / Seri [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch); `ESG Operations` Reg. `3324707`).

Menurut [Kebijakan Merek Dagang GitHub](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy), perusahaan komersial yang mengajukan permintaan penghapusan berbasis merek dagang wajib menyertakan nomor pendaftaran federal atau internasional di bawah sumpah ancaman pidana sumpah palsu (pengecualian merek tak terdaftar hanya berlaku bagi badan pemerintah dan lembaga nirlaba). Pada saat `@theo` mengancam akan menurunkan akun GitHub milik `@DDdxx666`, ia tidak dapat mengisi formulir GitHub tersebut. Baru **17 jam kemudian** (`12:21 BJ` pada 24 November), `@theo` me-merge **PR #41898** yang secara retroaktif menyisipkan `TRADEMARK.md` (`"whether registered or unregistered"`) dan merujuknya 94 detik kemudian (`2125082769395220688`)—meski ia pernah mengejek WordPress atas `"unenforceable trademark dispute"` pada September 2024 (`1839261574005141945`) dan menyuruh para pengembang `"get a better lawyer"` tiga jam sebelumnya pada 24 November (`2125026423769555308`).

![PR #41898 di-merge 17 jam setelah ancaman blokir, secara retroaktif menambahkan TRADEMARK.md yang mengklaim hak baik terdaftar maupun tidak terdaftar](../../evidence/24-pr41898-trademark-aftermath.png)

![Theo menyuruh pengembang "get a better lawyer" tiga jam sebelum me-merge TRADEMARK.md](../../evidence/extra/p1-5-x-get-better-lawyer.png)

### 6.3 Himpunan Data Kuantitatif 1.151 Tweet (`Bagian 14`) & Catatan Historis Dua Tahun (`Bagian 16`)

Analisis atas seluruh **1.151 postingan X `@theo` berturut-turut** dari 7 hingga 24 November 2026 (`17,24` hari; `66,8/hari`; `75,6%` balasan; interval median `2,7 menit`) mengkuantifikasi ketimpangan perlakuan yang ekstrem ([Bagian 14](https://x.com/realchendahuang/status/2125404517697290438)):
- **Eksekutif Raksasa Teknologi, Staf Lab & KOL Papan Atas (`n = 43` penyebutan `@` utama ketat / `n = 60`–`62` lebih luas):** **0,0%** umpatan yang ditargetkan atau hinaan pribadi (`30,0%`–`32,6%` ucapan terima kasih sopan). Kritik tajam terhadap Gemini 4 Carbon dan GPT-6.2 Astra langsung diredam atau disusul permintaan maaf terbuka (`2123255588570501585`, `2123995323123343869`).
- **Pengembang Biasa & Pengkritik (`n = 766` penyebutan `@` utama ketat / `n = 749` lebih luas):** Permusuhan/umpatan melonjak ke **8,0%** (`61/766`), termasuk `"Engineers deserve the mass unemployment they have coming"` (`2124470530590011704`), `"dance on the graves of the 'local ai' community"` (`2120733839832273025`), `"Linux larpers"` (`2124298216271499605`), unggahan berulang `stupid bitch` (`2120599310211703274`), serta ejekan penjara/RSD (`2122865897375400066`).
- **Jendela Krisis Fork Tiongkok 25 Jam (`n = 132`):** Penghinaan pribadi langsung melonjak **4,0x** dari garis dasar `3,6%` menjadi **14,4%** (`19/132`), termasuk `"chinese tech twitter is the biggest fucking cesspit"` dan menyebut pembaca audit berbahasa Mandarin sebagai `"fucking braindead"` (`2125177503526588877`)—kurang dari 24 jam setelah ia menceramahi pengguna lain agar tidak merusak kepercayaan (`2124449493513068862`).

![Grafik Forensik 1: 1.151 tweet selama 17 hari — 75,6% balasan dan 162 vs. 0 penyebutan produk](../../evidence/charts/theo-chart-1-overview.png)

![Grafik Forensik 2: Ritme PST 24 jam (233 postingan larut malam) dan batang postingan 17 hari](../../evidence/charts/theo-chart-2-rhythm.png)

![Grafik Forensik 3: Kesantunan selektif — 0,0% umpatan ke VIP vs. 8,0% permusuhan ke pengembang dan lonjakan krisis 14,4%](../../evidence/charts/theo-chart-3-double-standard.png)

![Grafik Forensik 4: Rincian tiga gelombang pada jendela krisis fork Tiongkok selama 25 jam](../../evidence/charts/theo-chart-4-cn-crisis.png)

![Theo mengutip tweet pertanyaan perbandingan alat sederhana untuk menulis bahwa para engineer pantas menerima pengangguran massal](../../evidence/25-engineers-unemployment.png)

![Theo menyebut komunitas teknologi Tiongkok di Twitter sebagai cesspit dan menghina pengembang yang membaca audit kode berbahasa Mandarin](../../evidence/26-cn-cesspit.png)

Meninjau dua tahun ke belakang mengonfirmasi pola yang berulang ([Bagian 16](https://x.com/realchendahuang/status/2125408843152953693)):
- **Ejekan Fork 2024:** Menamai fork tema VS Code milik pengembang lain sebagai [`vsc-material-but-i-wont-sue-you`](https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you) sambil mengejek temperamen pencipta aslinya.
- **Perundungan Pengembang India & Permintaan Maaf 2024:** Setelah videonya yang menyasar kanal tutorial India memicu perundungan, ia mengunggah [`I screwed up.`](https://www.youtube.com/watch?v=o2CSJYXJBpc) yang mengecam serangan berbasis kebangsaan—dua tahun sebelum menyerang komunitas teknologi Tiongkok di Twitter.
- **Sayembara FFmpeg Oktober 2025:** Mengumpat di depan kamera dan menawarkan **sayembara $20.000** untuk mendepak pengelola FFmpeg ([rekaman](https://www.youtube.com/watch?v=1oQ3KMeaH04)), lalu menariknya dan menghapus konten setelah tawaran tandingan $21rb dari Windscribe, penentangan terbuka VLC, serta kecaman di milis FFmpeg.
- **Ancaman Penutupan Kode Sumber yang Dihapus 25 November 2026 (~04:00 pagi):** Mengancam akan mengubah T3 Code menjadi sumber tertutup malam itu karena pengguna dianggap tidak layak menerima sumber terbuka; lalu diam-diam menghapus tweet tersebut sebelum fajar setelah melampaui 3.000 tanda suka.

---

## 7. Panduan Mitigasi & Remediasi Praktis

Jika T3 Code terpasang di mesin pribadi atau perusahaan, terapkan pertahanan berlapis pada bendera lingkungan (environment flags), pemblokiran jaringan tingkat OS, Managed Policy, pembersihan SQLite/kredensial lokal, serta pencabutan token cloud.

### 7.1 Variabel Lingkungan + Pemblokiran Jaringan Tingkat OS (Pengguna Lokal / Desktop)

Jangan **hanya** mengandalkan variabel lingkungan (`PR #42376`, `PR #42464`, dan `DesktopShellEnvironment.ts` tidak meneruskan `T3CODE_OTEL_SDK_DISABLED`, sementara `AnalyticsService.ts:149` tetap menginisialisasi identitas lokal di disk saat startup). Gabungkan variabel shell/pengguna di `~/.zshrc` (atau `~/.bashrc`) dengan pemblokiran `/etc/hosts` tingkat OS (di Windows: `C:\Windows\System32\drivers\etc\hosts`):

```bash
# 1. macOS / Linux: add to ~/.zshrc (or ~/.bashrc), reload shell, and restart T3 Code completely
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true

# 2. Block the closed-source ingestion gateway at the OS boundary (/etc/hosts)
#    (Windows path: C:\Windows\System32\drivers\etc\hosts)
127.0.0.1 ingest.t3.codes
::1 ingest.t3.codes
```

Di Windows, atur juga `T3CODE_TELEMETRY_ENABLED=false`, `T3CODE_OTEL_SDK_DISABLED=true`, dan `OTEL_SDK_DISABLED=true` pada **System Properties → Environment Variables** (User & System) lalu reboot/mulai ulang layanan latar belakang apa pun. Perhatikan sesuai `Issue #36479` bahwa startup server masih melakukan pemeriksaan keluar ke `raw.githubusercontent.com` kecuali diblokir melalui aturan firewall/proxy.

### 7.2 Kebijakan Terkelola Administrator / Managed Policy (`macOS`, `Linux`, `Windows`)

Untuk mengunci telemetri, tunnel T3 Connect, tugas webhook, impor cookie browser, dan tunnel pratinjau sesuai [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md), terapkan `policy.json` milik administrator (atau padanan MDM/GPO):

| OS | Kebijakan Bawaan / Registri | Path File (`chmod 644` / dimiliki root atau Admin) |
|---|---|---|
| **macOS** | Profil Konfigurasi Perangkat untuk `com.t3tools.t3code` *(profil pengguna diabaikan)* | `/Library/Application Support/T3Code/policy.json` |
| **Linux / WSL** | — *(terapkan di dalam setiap distro WSL secara terpisah)* | `/etc/t3code/policy.json` |
| **Windows** | GPO (`t3code.admx`) atau `REG_SZ` `Policy` di bawah `HKLM\SOFTWARE\Policies\T3Tools\T3Code` | `C:\Program Files\T3Code\policy.json` |

```json
{
  "schemaVersion": 1,
  "organization": "Local Hardening Policy",
  "limits": {
    "maxRuntimeMode": "auto-accept-edits",
    "clients": ["desktop"],
    "connect": false,
    "webhookTasks": false,
    "browserCookieImport": false,
    "previewTunnel": false,
    "telemetry": false
  }
}
```

Validasi dan pastikan penegakannya dengan `t3 policy check policy.json`, mulai ulang T3 Code sepenuhnya, lalu jalankan `t3 policy show`. **Ingat titik buta yang terdokumentasi di `docs/user/telemetry.md`:** Managed Policy **tidak** mematikan tracing relay pada `app.t3.codes` terhosting, **tidak** mengendalikan tracing aplikasi seluler, dan **tidak** mematikan `Publish agent activity` jika sebelumnya sudah diaktifkan.

### 7.3 Pemeriksaan `statev2.sqlite` & Pembersihan State Lokal

Karena penghapusan thread di UI tetap menyimpan event-event sebelumnya di dalam `~/.t3/userdata/statev2.sqlite` (`Issue #17845`), periksa pembengkakan berkas lokal, cek jumlah penanda penghapusan secara baca-saja (setelah keluar dari T3 Code), atau hapus `~/.t3` setelah mencadangkan data kustom bila ingin mencopot penuh:

```bash
# Inspect local T3 state directory size and database bloat (macOS / Linux)
ls -lh ~/.t3/userdata/statev2.sqlite*

# Optional read-only check of retained deletion markers (quit T3 Code first)
sqlite3 -readonly ~/.t3/userdata/statev2.sqlite \
  "SELECT COUNT(*) FROM orchestration_events WHERE event_type = 'thread.deleted';"

# If uninstalling completely, remove ~/.t3 after backing up any needed custom data
rm -rf ~/.t3
```

*(Di Windows, periksa dan bersihkan `%USERPROFILE%\.t3\userdata\` termasuk `statev2.sqlite`, `anonymous-id`, dan `secrets`.)*

### 7.4 Pencabutan Google Antigravity, T3 Connect, Clerk/Cloudflare & GitHub

1. **Google Antigravity:** Segera hentikan penggunaan langganan Google AI / Antigravity pribadi melalui Antigravity terkelola T3 atau CLIProxyAPI untuk melindungi jatah banding tunggal akun Anda. Hapus `~/.t3/userdata/providers/antigravity/` dan `~/.t3/tools/antigravity-acp/`.
2. **Penghapusan Data T3 Connect & Cloud:** Nonaktifkan **Publish agent activity** di bawah **Settings → Sharing & access**, putuskan tautan semua mesin lokal (`t3` logout / unlink), dan aktifkan `requireConnectDeviceApproval` jika Anda suatu saat mengaktifkan ulang akses jarak jauh. Ajukan penghapusan akun dan relay secara penuh melalui Clerk serta kontak resmi penghapusan privasi T3 Tools yang tercantum di `privacy-policy.astro` (agar webhook penghapusan Clerk dari `PR #42285` membongkar baris relay PlanetScale dan Cloudflare tunnel).
3. **Rotasi Token & Rahasia GitHub:** Cabut otorisasi OAuth / Aplikasi GitHub milik T3 Code di **GitHub Settings → Applications / Authorized GitHub Apps** (`driver.ts` memegang izin pemberian bintang tingkat host). Putar ulang setiap kunci API, URL basis data, atau token yang mungkin pernah diteruskan lewat baris perintah proses yang tertangkap oleh `t3-resource-monitor` sebelum `PR #41889`, atau yang terkirim melalui error webhook/relay ke Axiom.

### 7.5 Klien Alternatif

Dalam balasan lanjutan komunitas, para pengembang kerap menyoroti **Mirasim** (`@Mirasim_ADE`), **Paseo** (`@paseo_sh`), **Paradev** (`@ParadevAI`), dan **Cloudroom** ([Utas Alternatif](https://x.com/realchendahuang/status/2125244977878036713)). Sebelum mengadopsi klien pengganti mana pun, verifikasi secara independen: (1) telemetri nonaktif secara bawaan dan tangkapan lalu lintas jaringan yang bersih, (2) `DELETE` + `VACUUM` sejati atau penghapusan file saat thread dihapus, (3) pendelegasian ketat ke CLI resmi tanpa ekstraksi kredensial atau pemalsuan header, serta (4) enkripsi ujung-ke-ujung sisi klien sejati untuk tunnel jarak jauh.

---

## 8. Sumber Primer & Indeks Lengkap 18 Bagian Utas Asli

> Untuk lembar referensi tabel induk yang memetakan setiap rujukan `SRC-001` hingga `SRC-206+` di semua bagian dan tangkapan layar, lihat [`docs/COMPLETE-SOURCE-INDEX.md`](../COMPLETE-SOURCE-INDEX.md).

### Postingan Awal dan Indeks Lengkap 18 Bagian X (Kronologis)

- Origin 1 (Tautan GitHub beranda berlabel `"steal our code"`): https://x.com/realchendahuang/status/2125059292919394654
- Origin 2 (Sengketa penamaan fork MIT, penghinaan Temu, dan standar ganda): https://x.com/realchendahuang/status/2125062675147448475
- Bagian 1 (Telemetri bawaan, janji `"No telemetry"` yang diingkari, penghashan tanpa salt lintas alat): https://x.com/realchendahuang/status/2125153472450527440
- Bagian 2 (Penghapusan palsu SQLite, pemindai proses 5 detik, penghapusan mode Plan, pemblokiran di `CONTRIBUTING.md`): https://x.com/realchendahuang/status/2125160473176023486
- Bagian 3 (`git push --force` diam-diam mode Auto, pencabutan filter privasi 21 jam, 0 imbauan keamanan, penghinaan ke pengguna): https://x.com/realchendahuang/status/2125201882687881378
- Bagian 4 (Pemalsuan header Google Antigravity, `SSH_CONNECTION` palsu, pemblokiran 3 menit pada akun baru): https://x.com/realchendahuang/status/2125213397507858657
- Bagian 5 (T3 Connect tanpa enkripsi E2E, Cloudflare Tunnel, gateway teks biasa OVH yang dikelola sendiri): https://x.com/realchendahuang/status/2125218189596676555
- Bagian 6 (Konflik angel investor: ejekan penutupan Vibe Kanban dan tumpang tindih sandbox Daytona): https://x.com/realchendahuang/status/2125385742243520653
- Bagian 7 (Klaim `"turn off all telemetry"` Managed Policy vs. tiga titik buta dokumentasi resmi): https://x.com/realchendahuang/status/2125391659492081947
- Bagian 8 (Neraca bisnis klien gratis $800k+ dan radar harian 31,7T token / $10,19 juta): https://x.com/realchendahuang/status/2125392410763239723
- Bagian 9 (500 commit/hari, 700 agen, `yolo merges` vs. penolakan PR dan penyaringan pengikut): https://x.com/realchendahuang/status/2125392916369871309
- Bagian 10 (Pengerahan `@bot` untuk mengikis fork dan pesaing, bot pemblokir otomatis, seruan demonetisasi Community Notes): https://x.com/realchendahuang/status/2125393641665671593
- Bagian 11 (Klarifikasi 25 Nov terbantahkan dalam 2 jam oleh PR semalaman dan 264 catatan Claude di dump 100MB): https://x.com/realchendahuang/status/2125394810559426993
- Bagian 12 (Perbaikan semalaman pasca-GDPR mengungkap log IP 2,2 juta/jam, penghapusan akun rusak, kebocoran push, batch anonim tercampur): https://x.com/realchendahuang/status/2125395501663281198
- Bagian 13 (Menyebut Twitter teknologi Tiongkok sebagai cesspit sambil menambal diam-diam pratinjau tanpa sandbox dan eksekusi perintah tanpa konfirmasi): https://x.com/realchendahuang/status/2125395980354994414
- Bagian 14 (Pemilahan kuantitatif 1.151 tweet: 0% umpatan ke eksekutif teknologi besar vs. 8% permusuhan ke pengembang biasa): https://x.com/realchendahuang/status/2125404517697290438
- Bagian 15 (Nol pendaftaran USPTO untuk T3 Code dan persyaratan Kebijakan Merek Dagang GitHub): https://x.com/realchendahuang/status/2125408163273080950
- Bagian 16 (Rekam jejak berulang: `vsc-material-but-i-wont-sue-you`, reaksi balik pengembang India, sayembara $20k FFmpeg, ancaman menutup kode sumber yang dihapus): https://x.com/realchendahuang/status/2125408843152953693
- Bagian 17 (Tumpukan sponsor Clerk/Axiom, eksploit kuota 0% Codex & penghapusannya, Gist 10 akun `CLIProxyAPI`): https://x.com/realchendahuang/status/2125411353393553744
- Bagian 18 (Bagaimana 77rb bintang GitHub terjadi: toast diam 30 detik yang menembak bintang via API kredensial host & pemberian bintang ke repo sembarang yang tak diperbaiki): https://x.com/realchendahuang/status/2125416210120765799
- Daftar alternatif komunitas: https://x.com/realchendahuang/status/2125244977878036713

### Kode Sumber, PR, Issue, Kebijakan, dan Bukti Primer

**Telemetri, Privasi, dan Tambalan Semalam Pasca-GDPR (Bagian 1, 7, 11, 12)**

- Domain beranda resmi: https://t3.codes/
- Telemetri PostHog bawaan (PR #174): https://github.com/pingdotgg/t3code/pull/174
- Penghapusan diam-diam janji `"No telemetry"` di beranda (`commit 3bdaa6e1`): https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3
- Penolakan mempermudah opt-out (Issue #1397) dan pertanyaan atas janji yang diingkari (Issue #4123): https://github.com/pingdotgg/t3code/issues/1397 ; https://github.com/pingdotgg/t3code/issues/4123
- Salinan event mentah `ingest.t3.codes` yang dikelola sendiri (PR #15028) dan penghashan tanpa salt lintas alat (PR #21506): https://github.com/pingdotgg/t3code/pull/15028 ; https://github.com/pingdotgg/t3code/pull/21506 ; https://ingest.t3.codes/
- Empat PR tombol opt-out komunitas yang ditolak (`#13458` / `#16763` / `#21248` / `#27077`): https://github.com/pingdotgg/t3code/pull/13458 ; https://github.com/pingdotgg/t3code/pull/16763 ; https://github.com/pingdotgg/t3code/pull/21248 ; https://github.com/pingdotgg/t3code/pull/27077
- File kode sumber telemetri & identifikasi (`AnalyticsService.ts` / `Identify.ts` / `ProviderUsageAnalytics.ts` / `telemetryId.ts`): https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/ProviderUsageAnalytics.ts ; https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts
- Dokumentasi resmi telemetri & Managed Policy: https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md
- Klaim Managed Policy, klarifikasi, dan tiadanya file pelacakan oleh Theo + ekspor publik `events.clean.jsonl`: https://x.com/theo/status/2125186071357251715 ; https://x.com/theo/status/2125191784859115766 ; https://x.com/theo/status/2125332390239494211 ; https://x.com/theo/status/2125370330244128924 ; https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz
- Kebocoran path ruang kerja absolut (PR #42450) dan pengabaian opt-out Win/Mac (PR #42376 / #42464): https://github.com/pingdotgg/t3code/pull/42450 ; https://github.com/pingdotgg/t3code/pull/42376 ; https://github.com/pingdotgg/t3code/pull/42464
- Log IP 2,2 juta/jam disimpan 30 hari (PR #42380), penghapusan akun tidak tuntas (PR #42285 / #42430), kebocoran push seluler (PR #42459 / #41859), dan penggabungan batch umpan balik anonim (PR #42466): https://github.com/pingdotgg/t3code/pull/42380 ; https://github.com/pingdotgg/t3code/pull/42285 ; https://github.com/pingdotgg/t3code/pull/42430 ; https://github.com/pingdotgg/t3code/pull/42459 ; https://github.com/pingdotgg/t3code/pull/41859 ; https://github.com/pingdotgg/t3code/pull/42466

**Keamanan Lokal, Tambalan Keamanan Diam-Diam, Antigravity, dan T3 Connect (Bagian 2, 3, 4, 5, 13)**

- Penghapusan palsu SQLite (Issue #17845 / #28903), pemantau proses 5 detik (Issue #11222), dan perbaikan perekaman baris perintah (PR #41889): https://github.com/pingdotgg/t3code/issues/17845 ; https://github.com/pingdotgg/t3code/issues/28903 ; https://github.com/pingdotgg/t3code/issues/11222 ; https://github.com/pingdotgg/t3code/pull/41889
- Pengiriman hostname internal ke favicon Google (PR #16950 / #32657), pemeriksaan jaringan keluar paksa (Issue #36479 / `raw.githubusercontent.com`), penerobosan izin/kebijakan (PR #21806 / #27322), pembakaran kuota Claude 1,7x (Issue #7338 / #24649), dan bug konsumsi daya (Issue #3143 / #40581): https://github.com/pingdotgg/t3code/pull/16950 ; https://github.com/pingdotgg/t3code/pull/32657 ; https://github.com/pingdotgg/t3code/issues/36479 ; https://raw.githubusercontent.com/ ; https://github.com/pingdotgg/t3code/pull/21806 ; https://github.com/pingdotgg/t3code/pull/27322 ; https://github.com/pingdotgg/t3code/issues/7338 ; https://github.com/pingdotgg/t3code/issues/24649 ; https://github.com/pingdotgg/t3code/issues/3143 ; https://github.com/pingdotgg/t3code/issues/40581
- `git push --force` diam-diam mode Claude Auto (Issue #15353 & komentar reproduksi) dan PR perbaikan komunitas (`#15360` / `#35207` / `#40692`): https://github.com/pingdotgg/t3code/issues/15353 ; https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695 ; https://github.com/pingdotgg/t3code/pull/15360 ; https://github.com/pingdotgg/t3code/pull/35207 ; https://github.com/pingdotgg/t3code/pull/40692
- Pencabutan penyaringan model privat dalam 21 jam untuk `slopalytics.com` (PR #29001 / Issue #40948 / PR #41237): https://github.com/pingdotgg/t3code/pull/29001 ; https://github.com/pingdotgg/t3code/issues/40948 ; https://github.com/pingdotgg/t3code/pull/41237 ; https://slopalytics.com/ ; https://slopalytics.com/data/t3-usage.json
- Tab Security Advisories kosong, `SECURITY.md` (`PR #38812` / `#41942`), perbaikan keamanan diam-diam yang sudah di-merge (`#22190` / `#37823` / `#39464` / `#39480` / `#39483` / `#40133` / `#41756` / `#41757` / `#41886` / `#42386` / `#42504`), dan item keamanan/peluncur yang masih terbuka (`Issue #26489` / `PR #23428` / `PR #30997` / `PR #33144` / `PR #36216`): https://github.com/pingdotgg/t3code/security/advisories ; https://github.com/pingdotgg/t3code/blob/main/SECURITY.md ; https://github.com/pingdotgg/t3code/pull/38812 ; https://github.com/pingdotgg/t3code/pull/41942 ; https://github.com/pingdotgg/t3code/pull/22190 ; https://github.com/pingdotgg/t3code/pull/37823 ; https://github.com/pingdotgg/t3code/pull/39464 ; https://github.com/pingdotgg/t3code/pull/39480 ; https://github.com/pingdotgg/t3code/pull/39483 ; https://github.com/pingdotgg/t3code/pull/40133 ; https://github.com/pingdotgg/t3code/pull/41756 ; https://github.com/pingdotgg/t3code/pull/41757 ; https://github.com/pingdotgg/t3code/pull/41886 ; https://github.com/pingdotgg/t3code/pull/42386 ; https://github.com/pingdotgg/t3code/pull/42504 ; https://github.com/pingdotgg/t3code/issues/26489 ; https://github.com/pingdotgg/t3code/pull/23428 ; https://github.com/pingdotgg/t3code/pull/30997 ; https://github.com/pingdotgg/t3code/pull/33144 ; https://github.com/pingdotgg/t3code/pull/36216
- Jaminan FAQ Antigravity, bantahan kode Issue #40713, pemblokiran 3 menit (Issue #41536), percampuran akun (Issue #41973), pemalsuan editor ber-whitelist (PR #26876), PR #33800 hub CLIProxyAPI, postingan pengalihan/diagram/nol-risiko/CLIProxy oleh Theo, serta kode sumber: https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription ; https://github.com/pingdotgg/t3code/issues/40713 ; https://github.com/pingdotgg/t3code/issues/41536 ; https://github.com/pingdotgg/t3code/issues/41973 ; https://github.com/pingdotgg/t3code/pull/26876 ; https://github.com/pingdotgg/t3code/pull/33800 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L445-L476 ; https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236 ; https://x.com/theo/status/2124264935505199294 ; https://x.com/theo/status/2124665075638411641 ; https://x.com/theo/status/2124703048140517397
- Ketentuan Layanan Google Antigravity dan larangan resmi di forum developer: https://antigravity.google/terms ; https://discuss.ai.google.dev/t/185992
- Penolakan E2E T3 Connect (Issue #32098), `requireConnectDeviceApproval` mati secara bawaan (PR #36419), gateway Caddy OVH yang dikelola sendiri (PR #32945), kode relay, kebijakan privasi, dan diskusi yang tak terjawab: https://github.com/pingdotgg/t3code/issues/32098#issuecomment-6869049926 ; https://github.com/pingdotgg/t3code/pull/36419 ; https://github.com/pingdotgg/t3code/pull/32945 ; https://github.com/pingdotgg/t3code/blob/main/docs/internals/06_t3-connect.md ; https://github.com/pingdotgg/t3code/blob/main/infra/relay/src/environments/ManagedEndpointProvider.ts ; https://github.com/pingdotgg/t3code/blob/main/apps/marketing/src/pages/privacy-policy.astro ; https://github.com/pingdotgg/t3code/discussions/21286 ; https://github.com/pingdotgg/t3code/discussions/37831

**Neraca Bisnis, Konflik Investor, Sponsor, dan 77rb Bintang (Bagian 6, 8, 17, 18)**

- Pengeluaran $800k+, dasbor harian 31,7T token / $10,19 juta, pangsa tiga lab 98,5%, balasan pedas analitik, token akses awal OpenAI gratis $300k+, 1 commit Patrick PR #31158, pendekatan investor, dan `Ping.gg`: https://x.com/theo/status/2120729779511124267 ; https://x.com/theo/status/2122860770329608290 ; https://x.com/theo/status/2123965784888377541 ; https://x.com/theo/status/2124682906132181482 ; https://x.com/theo/status/2122760447103484410 ; https://github.com/pingdotgg/t3code/pull/31158 ; https://x.com/theo/status/2123885732330885417 ; https://ping.gg/
- Ejekan Vibe Kanban, pengungkapan investasi Daytona, dan rencana cloud-sandbox berbayar: https://x.com/theo/status/2122201981167251877 ; https://x.com/theo/status/2123011578090127499 ; https://x.com/theo/status/2119705561679933806
- Daftar sponsor YouTube, konfirmasi CEO Vercel, video eksklusivitas, postingan penghapusan oleh Maria, `openai/codex#45444`, tweet ClickHouse/Ultra/GrokBot CLIProxyAPI, Gist CLIProxyAPI, dan FAQ: https://x.com/theo/status/1657488850472804353 ; https://x.com/rauchg/status/1776260839965863965 ; https://www.youtube.com/watch?v=uv179CTAK-w ; https://x.com/maria_rcks/status/2090972426876129658 ; https://github.com/openai/codex/issues/45444 ; https://x.com/theo/status/2119193502852755520 ; https://x.com/theo/status/2119960608816988596 ; https://x.com/theo/status/2119994608516276256 ; https://gist.github.com/t3dotgg/59a521d2ee8d70aaf90e280c175072af ; https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#can-i-add-a-bunch-of-accounts-for-one-provider
- Video "Fake star" VC, lonjakan bintang 10x, postingan Trending +3.094, postingan `"missed 70k"`, PR #27832 / #29922 / #29987, `GitHubStarPrompt.tsx`, dan kode pemberian bintang ke repo sembarang di `driver.ts`: https://x.com/theo/status/2048122499834036340 ; https://x.com/theo/status/2117065834267136469 ; https://x.com/theo/status/2117172614158508400 ; https://x.com/theo/status/2124992724223029538 ; https://github.com/pingdotgg/t3code/pull/27832 ; https://github.com/pingdotgg/t3code/pull/29922 ; https://github.com/pingdotgg/t3code/pull/29987 ; https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx ; https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99

**Tata Kelola, Merek Dagang, Kesantunan Selektif, dan Insiden Terdahulu (Bagian 9, 10, 14, 15, 16)**

- Penghapusan mode Plan (PR #5551 / #33131), cincin progres disembunyikan (PR #9190), hinaan Issue #33639, penolakan PR #41572, `CONTRIBUTING.md`, dan `.github/VOUCHED.td`: https://github.com/pingdotgg/t3code/pull/5551 ; https://github.com/pingdotgg/t3code/pull/9190 ; https://github.com/pingdotgg/t3code/pull/33131 ; https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545 ; https://github.com/pingdotgg/t3code/pull/41572 ; https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md ; https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td
- 500 commit/hari, `yolo merges`, `"nukes my machine = free content"`, penyaringan PR berdasarkan pengikut, ancaman `/btw`, dan postingan tangkapan layar dibanding PR: https://x.com/theo/status/2119993037971730879 ; https://x.com/theo/status/2119951615679672513 ; https://x.com/theo/status/2120741101250515322 ; https://x.com/theo/status/2119958282022568059 ; https://x.com/theo/status/2120821423438778667 ; https://x.com/theo/status/2120853340078874923 ; https://x.com/theo/status/2123754193530053110
- Perintah `@bot` pengikis fork, ejekan ke Claude Desktop, seruan demonetisasi Community Notes, dan konfirmasi bot pemblokir otomatis: https://x.com/theo/status/2119240810202034645 ; https://x.com/theo/status/2121017649652269120 ; https://x.com/theo/status/2124987957803446311 ; https://x.com/theo/status/2120238923884696025 ; https://x.com/theo/status/2125077510941802509
- Catatan USPTO TSDR (`PING LABS` 97294243 terbengkalai; EquipmentShare `T3` Reg. 7795672), Kebijakan Merek Dagang GitHub, `PR #41898` retroaktif, ancaman blokir, balasan open-source triliunan dolar, `"aware of the legality"`, `"get a better lawyer"`, dan tweet merek dagang terdahulu: https://tsdr.uspto.gov/statusview/sn97294243 ; https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch ; https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy ; https://github.com/pingdotgg/t3code/pull/41898 ; https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md ; https://x.com/theo/status/2124829315657576890 ; https://x.com/theo/status/2124989435154726982 ; https://x.com/theo/status/2125082769395220688 ; https://x.com/theo/status/2125026423769555308 ; https://x.com/vildanden_ai/status/2125275487404761555 ; https://x.com/theo/status/1839261574005141945
- Bukti kesantunan selektif (permintaan maaf & penjembatan Google Neon, pengangguran engineer, kuburan AI lokal, Linux larpers, ancaman penjara/RSD, postingan `stupid bitch`, cesspit Twitter teknologi Tiongkok, tidak adanya permintaan maaf, ceramah menjaga kepercayaan): https://x.com/theo/status/2123255588570501585 ; https://x.com/theo/status/2123995323123343869 ; https://x.com/theo/status/2124470530590011704 ; https://x.com/theo/status/2120733839832273025 ; https://x.com/theo/status/2124298216271499605 ; https://x.com/theo/status/2122865897375400066 ; https://x.com/theo/status/2120599310211703274 ; https://x.com/theo/status/2125177503526588877 ; https://x.com/theo/status/2125193393450226024 ; https://x.com/theo/status/2124449493513068862
- Bukti historis (`vsc-material-but-i-wont-sue-you`, video permintaan maaf pengembang India, rekaman sayembara $20k FFmpeg): https://github.com/t3dotgg/vsc-material-but-i-wont-sue-you ; https://www.youtube.com/watch?v=o2CSJYXJBpc ; https://www.youtube.com/watch?v=1oQ3KMeaH04
