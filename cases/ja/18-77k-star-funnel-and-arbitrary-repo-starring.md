# #18 · 7万7,000スターの漏斗：30秒アイドル時にホスト認証情報でスターを付けさせる仕組みと、放置された任意リポジトリ・バグ

> GitHubのスターを「to trick VCs into investing」の手段だと断じたあの投稿から6か月。@theo は、ホストのGitHub認証情報を使って `PUT user/starred/...` を発火させる、アプリ内の30秒アイドル・トーストを自らマージした。これでリポジトリは3万から7万7,000スターへと跳ね上がった（ウォッチャーは約129人）。一方、任意のリポジトリにスターを付けてしまうバグは未修正のまま残された。

<!-- section:claim -->
## 何が主張されていたか

- 2026年4月26日、`@theo` は *"Github has a fake star problem"* を公開し、GitHubのスターはもはや *"mostly a way for companies to trick VCs into investing"* になったと書いた（[`2048122499834036340`](https://x.com/theo/status/2048122499834036340)）。
- 11月24日、スター7万4,600の時点で、彼は *"completely missed crossing 70k"* と主張した（[`2124992724223029538`](https://x.com/theo/status/2124992724223029538)）。

<!-- section:evidence -->
## 証拠が示すもの

- **アプリ内アイドル・トーストが生んだ、1日あたりスターの10倍急崖（`PR #27832`、`#29922`、`#29987`）：** 3万スターに届くまで8か月以上を要した後、`@theo` は10月30日、プロンプトを5回送信した後にスターのトーストを表示する[`PR #27832`](https://github.com/pingdotgg/t3code/pull/27832) を自ら書き、自らマージした（`PROMPTS_BEFORE_ASKING = 5`）。これで1日あたりのスターは即座に**10倍**となり（GitHub Trendingで`+3,094`スター/日）、11月3日には[`PR #29922`](https://github.com/pingdotgg/t3code/pull/29922) と[`PR #29987`](https://github.com/pingdotgg/t3code/pull/29987) が、ユーザーがAIの応答を待つ間の**30秒ウィンドウのアイドル検知**（`IDLE_MS = 30_000`）を追加し、ブラウザのリダイレクトを、**ホストサーバーの `gh` CLI / `GH_TOKEN` 認証情報**を通じて直接 `PUT user/starred/pingdotgg/t3code` を発火するサーバーサイドの `sourceControl.star` RPC に置き換えた。その直後には160個のパーティクルによる紙吹雪が続く。
- **レビューの迂回と、共有ホスト上のアカウントの不透明さ：** Macroscope は、ブラウザのユーザーとサーバー認証情報の不一致を理由に `PR #29922` を *Needs Human Approval* と指摘したが、`@theo` はそのまま自らマージした。共有ホストやリモートホストでは、*Star* をクリックすると、サーバーのGitHub認証情報を所有する者のアカウントで黙ってリポジトリにスターが付き、どのアカウントが使われたのかはユーザーに知らされない。
- **未修正の任意リポジトリ・スター・バグ（`driver.ts#L60-L99`）：** 11月6日、開発者 `zhilsinger` は `Request changes` を提出し、[`packages/source-control-github/src/server/driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99) が `pingdotgg/t3code` に固定せず任意の `owner/repo` 文字列を受け付けていると指摘した。つまり `source-control:write` を持つクライアントなら誰でも、ホストの認証情報を使って任意のGitHubリポジトリにスターを付けられる。

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
## 上流のステータス（`ca81b7b9`）

- **依然オープン：** `driver.ts#L60-L99` の固定されていない任意リポジトリ・スター機能、および `zhilsinger` による11月6日の `Request changes` レビューは、19日が経った今も回答も修正もされていない（スター7万7,000以上に対し、ウォッチャーは約129人）。

<!-- section:visuals -->
## 視覚的証拠

![アプリ内プロンプトを出荷した直後に起きた、ほぼ垂直の10倍スター急崖を祝うTheoの11月2日のチャート](../../evidence/20-star-10x-cliff.png)

![PR #29922への開発者zhilsingerのRequest Changesレビューは19日間、未回答のまま](../../evidence/21-pr29922-zhilsinger-review.png)

![pingdotgg/t3codeに固定せず、任意のowner/repo文字列を受け付けるdriver.ts#L60-L99](../../evidence/extra/p10-5-gh-driver-arbitrary-repo.png)

<!-- section:sources -->
## 一次情報源

- [Xの元調査（第18回）](https://x.com/realchendahuang/status/2125416210120765799)
- ["GitHub has a fake star problem"（`2048122499834036340`）](https://x.com/theo/status/2048122499834036340) · [10倍の急崖（`2117065834267136469`）](https://x.com/theo/status/2117065834267136469) · [Trendingで1日`+3,094`（`2117172614158508400`）](https://x.com/theo/status/2117172614158508400)
- [PR #27832](https://github.com/pingdotgg/t3code/pull/27832) · [PR #29922](https://github.com/pingdotgg/t3code/pull/29922) · [PR #29987](https://github.com/pingdotgg/t3code/pull/29987)
- [`GitHubStarPrompt.tsx`](https://github.com/pingdotgg/t3code/blob/main/apps/web/src/components/GitHubStarPrompt.tsx) · [`driver.ts#L60-L99`](https://github.com/pingdotgg/t3code/blob/main/packages/source-control-github/src/server/driver.ts#L60-L99)
- [詳細技術ドシエ 04](../../docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md)
