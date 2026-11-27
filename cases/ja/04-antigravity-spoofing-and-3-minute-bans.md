# #04 · Google Antigravity のヘッダー偽装、偽造された `SSH_CONNECTION`、そして3分でのアカウントBAN

> FAQでToS遵守を保証しているにもかかわらず、T3 CodeはOSのキーリングから認証情報を抜き出し、Google内部向けヘッダー（`antigravity/hub/2.24.0`）を`v1internal`に対して偽装し、さらに偽の`SSH_CONNECTION`値を注入している——個人のGoogleサブスクリプションを急速なBANへと晒しながら。

<!-- section:claim -->
## 何が主張されていたか

- [`docs/user/faq.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) は有料購読者に対してこう断言していた：*"We work with all of the labs and T3 Code is within the TOS of Claude Code, Codex, and Google Antigravity... If it works in T3 Code, you can trust it is safe."*
- BANされた利用者が [`Issue #40713`](https://github.com/pingdotgg/t3code/issues/40713) を起票したとき、メンテナーはAntigravityのバックエンドに接続したりトークンを再利用したりしていないと否定し、X上では `@theo` がサードパーティ製プロキシのせいにした（`"Not with cliproxy right?"`）。

<!-- section:evidence -->
## 証拠が示すもの

- **OS認証情報の抽出と偽装された`v1internal`呼び出し：** [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) は、ローカルファイル、`@napi-rs/keyring`、またはWindows Credential Manager（`advapi32.dll` 上の `ffi-rs` 経由で `CredReadW`）からGoogle OAuthトークンを抽出し、`antigravity/hub/2.24.0` をハードコードしたうえで、Googleの非公開エンドポイント `v1internal` へ直接 `POST` している。Googleの担当者は[公式フォーラム](https://discuss.ai.google.dev/t/185992)で、[Google Antigravity ToS](https://antigravity.google/terms) の第6条が、サードパーティ製ツールによる認証情報の抽出や再利用、バックエンドエンドポイントへの直接クエリを禁止していると確認している。
- **偽造された`SSH_CONNECTION`とアカウント間の漏えい：** [`antigravityAuthSupport.ts#L230-L236`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) は偽造した `SSH_CONNECTION` 環境変数（`"127.0.0.1 0 127.0.0.1 0"`）を注入し、GoogleのCLIをOSキーチェーンの分離から抜け出させて平文ファイルへと誘導している。11月24日にGoogleがCLIを更新した際、[`Issue #41973`](https://github.com/pingdotgg/t3code/issues/41973) はアカウントA宛てのプロンプトが黙ってアカウントBへルーティングされることを確認した。
- **新規$20アカウントが3分でBAN（`Issue #41536`）：** プロキシを一切使わず、T3管理のAntigravityのみを利用していた、できたばかりの$20 Google AIサブスクリプションが、セットアップから3分後の最初のメッセージでBANされた。メンテナーはユーザー向けの警告を一切追加することなく、このIssueを重複としてクローズした。
- **ネイティブクライアントとCLIProxyAPIの偽装：** `@theo` は自ら [`PR #26876`](https://github.com/pingdotgg/t3code/pull/26876) をマージして `"zed"` を装い、マージ済みの [`PR #33800`](https://github.com/pingdotgg/t3code/pull/33800) は [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts) のハブポーリングに、偽装された `claude-code/2.1.273`、`grok-cli/1.0.77`、`antigravityUserAgent` ヘッダーを組み込んだ。

```ts
// apps/server/src/provider/antigravityUsageLimits.ts (lines 20–24, 450–454)
export function antigravityUserAgent(platform: NodeJS.Platform, architecture: NodeJS.Architecture) {
  return `antigravity/hub/2.24.0 (aidev_client; os_type=${platform}; arch=${architecture}; cl=963137146)`;
}
HttpClientRequest.post(`${endpoint}/v1internal:${operation}`).pipe(
  HttpClientRequest.setHeaders({ Authorization: `Bearer ${accessToken}`, "User-Agent": antigravityUserAgent(platform, architecture) })
);
```

<!-- section:status -->
## 上流の状況（`ca81b7b9`）

- **現在も稼働中：** [`PR #41210`](https://github.com/pingdotgg/t3code/pull/41210) は [`AntigravityTurnOutcome.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/acp/AntigravityTurnOutcome.ts) を追加し、Googleの `403 PERMISSION_DENIED`（`VALIDATION_REQUIRED`）アカウント検証リンクを表示するようにした——これはGoogle側の取り締まりが実際に動いていることを裏づける一方で、4つすべての偽装・トークン抽出経路は依然として生きている。

<!-- section:visuals -->
## 視覚的証拠

![antigravityUsageLimits.ts が偽装したGoogleヘッダーをハードコードし、v1internalを呼び出している](../../evidence/12-antigravity-v1internal-spoof.png)

![antigravityAuthSupport.ts がOSキーチェーン保存を回避するためSSH_CONNECTIONを偽造している](../../evidence/13-antigravity-ssh-spoof.png)

![Issue #41536：プロキシ未使用の新規$20アカウントが3分でBANされたことを記録](../../evidence/14-issue41536-fresh-ban.png)

![PR #33800：偽装されたCLIProxyAPIハブポーリングをT3 Codeにネイティブに組み込んでいる](../../evidence/extra/p2-2-pr33800-cliproxy-agy.png)

<!-- section:sources -->
## 一次情報源

- [Original X Investigation (Part 4)](https://x.com/realchendahuang/status/2125213397507858657)
- [FAQ ToS guarantee](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md#will-i-get-banned-for-using-my-subscription) · [Google Antigravity ToS](https://antigravity.google/terms) · [Google Developer Forum](https://discuss.ai.google.dev/t/185992)
- [`antigravityUsageLimits.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityUsageLimits.ts#L20-L45) · [`antigravityAuthSupport.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/provider/antigravityAuthSupport.ts#L230-L236) · [`cliproxyApi.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/usage/cliproxyApi.ts)
- [Issue #40713](https://github.com/pingdotgg/t3code/issues/40713) · [Issue #41536](https://github.com/pingdotgg/t3code/issues/41536) · [Issue #41973](https://github.com/pingdotgg/t3code/issues/41973)
- [PR #26876](https://github.com/pingdotgg/t3code/pull/26876) · [PR #33800](https://github.com/pingdotgg/t3code/pull/33800) · [PR #41210](https://github.com/pingdotgg/t3code/pull/41210)
- [Deep Technical Dossier 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
