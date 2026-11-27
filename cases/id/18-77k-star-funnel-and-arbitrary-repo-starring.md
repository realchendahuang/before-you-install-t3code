# #18 · Corong 77.000 Bintang: Pemberian Bintang Memakai Kredensial Host Saat Idle 30 Detik & Bug Repo Sewenang-wenang yang Tak Kunjung Diperbaiki

> Enam bulan setelah mengecam bintang GitHub sebagai cara "to trick VCs into investing", @theo melakukan self-merge atas toast in-app yang muncul setelah idle 30 detik dan memicu `PUT user/starred/...` memakai kredensial GitHub host — melambungkan repo dari 30 ribu ke 77 ribu bintang (dengan ~129 watcher), sementara bug pemberian bintang ke repo sewenang-wenang dibiarkan tak diperbaiki.

<!-- section:claim -->
## Apa yang Diklaim

- Pada 26 April 2026, `@theo` menerbitkan *"Github has a fake star problem"*, dengan menulis bahwa bintang GitHub telah menjadi *"mostly a way for companies to trick VCs into investing"* ([`2048122499834036340`](https://x.com/theo/status/2048122499834036340)).
- Pada 24 November, saat repo berada di 74,6 ribu bintang, ia mengklaim *"completely missed crossing 70k"* ([`2124992724223029538`](https://x.com/theo/status/2124992724223029538)).

<!-- section:evidence -->
## Apa yang Ditunjukkan Bukti

- **Jurang bintang harian 10× lewat toast idle in-app (`PR #27832`, `#29922`, `#29987`):** Setelah butuh 8+ bulan untuk mencapai 30.000 bintang, `@theo` menulis sendiri lalu melakukan self-merge atas [`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) pada 30 Oktober, yang menambahkan toast bintang setelah 5 prompt terkirim (`PROMPTS_BEFORE_ASKING = 5`), dan seketika **melipatgandakan 10×** bintang harian (`+3,094` bintang/hari di GitHub Trending). Pada 3 November, [`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) dan [`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) menambahkan **deteksi idle berjendela 30 detik** (`IDLE_MS = 30_000`) saat pengguna menunggu giliran AI, serta mengganti pengalihan browser dengan RPC sisi server `sourceControl.star` yang memicu `PUT user/starred/pingdotgg/t3code` langsung melalui **kredensial `gh` CLI / `GH_TOKEN` milik server host**, disusul konfeti 160 partikel.
- **Melewati review & ketidakjelasan akun pada host bersama:** Macroscope menandai `PR #29922` sebagai *Needs Human Approval* karena ketidaksesuaian antara pengguna browser dan kredensial server; `@theo` tetap melakukan self-merge. Pada host bersama atau remote, menekan *Star* diam-diam memberi bintang ke repo memakai kredensial GitHub milik siapa pun yang menguasai server, tanpa memberi tahu pengguna akun mana yang dipakai.
- **Bug pemberian bintang ke repo sewenang-wenang yang tak diperbaiki (`driver.ts#L60-L99`):** Pada 6 November, pengembang `zhilsinger` mengajukan `Request changes` dengan menunjukkan bahwa [`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) menerima string `owner/repo` apa pun tanpa memaku `pingdotgg/t3code` — sehingga klien mana pun yang memiliki izin `source-control:write` dapat memberi bintang ke repositori GitHub sewenang-wenang memakai kredensial host.

```ts
// packages/source-control-github/src/server/driver.ts (lines 60–66, 90–96)
const starredPath = (repository: string) => {
  const segments = repository.split("/");
  return segments.length === 2 && segments.every((segment) => !["", ".", ".."].includes(segment))
    ? `user/starred/${segments.map(encodeURIComponent).join("/")}`
    : undefined;
};
```

<!-- section:status -->
## Status di Upstream (`ca81b7b9`)

- **Masih terbuka:** `driver.ts#L60-L99` yang memungkinkan pemberian bintang ke repo sewenang-wenang tanpa pemakuan, serta review `Request changes` dari `zhilsinger` pada 6 November, tetap tanpa jawaban dan tanpa perbaikan 19 hari kemudian (77 ribu+ bintang vs. ~129 watcher).

<!-- section:visuals -->
## Bukti Visual

![Grafik Theo 2 November yang merayakan jurang bintang 10x nyaris vertikal tepat setelah peluncuran prompt in-app](../../evidence/20-star-10x-cliff.png)

![Review Request Changes dari pengembang zhilsinger pada PR #29922 yang tak terjawab selama 19 hari](../../evidence/21-pr29922-zhilsinger-review.png)

![driver.ts#L60-L99 menerima string owner/repo sewenang-wenang tanpa memaku pingdotgg/t3code](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## Sumber Primer

- [Investigasi X Asli (Bagian 18)](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem" (`2048122499834036340`)](https://x.com/theo/status/2048122499834036340) · [jurang 10x (`2117065834267136469`)](https://x.com/theo/status/2117065834267136469) · [+3,094/hari Trending (`2117172614158508400`)](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [Dossier Teknis Mendalam 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
