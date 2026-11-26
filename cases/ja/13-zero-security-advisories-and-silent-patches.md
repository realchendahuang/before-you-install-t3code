# #13 · GitHubセキュリティアドバイザリは0件、高深刻度修正は無言のまま、`SECURITY.md` は急ごしらえ

> Xで中国語圏のソースコード監査者たちを一蹴する傍ら、T3 Codeは高深刻度の脆弱性修正——シークレットストアのパストラバーサル、クロスドメインのトークン漏洩、信頼できないリポジトリからのコマンド実行——を静かにマージし続け、公開済みのGitHubセキュリティアドバイザリは0件のまま据え置いていた。

<!-- section:claim -->
## 何が主張されていたか

- 11月24日、`@theo` はX上で中国語の技術監査を *"the biggest fucking cesspit"* に由来するものと一蹴し、それを読む開発者たちを侮辱した（[`2125177503526588877`](https://x.com/theo/status/2125177503526588877)）。
- 急ごしらえの `SECURITY.md` 改訂（`PR #38812`、`PR #41942`）は、広範なホストアクセスと非暗号化トランスポートを、許容される「意図された境界」として位置づけた。

<!-- section:evidence -->
## 証拠が示すもの

- **公開済みセキュリティアドバイザリはゼロ（`0`）：** `ca81b7b9` 時点で、`pingdotgg/t3code` の [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) ページに公開済みアドバイザリは**0件**——既存のデスクトップ／サーバーユーザーには、正式なCVE通知もアップグレード警告も一切届いていない。
- **高深刻度の脆弱性が黙って修正されていた：**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483)：デバイス承認前のリレー `jti`/`nonce` を経由した `ServerSecretStore` のパストラバーサル。
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756)：クロスドメインのエンタープライズGitHub/GitLabトークン漏洩。
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) および [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386)：非サンドボックスのデスクトップブラウザプレビュー分離と、worktreeレイアウトのコマンド確認。
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413)：デスクトップ版Clerkトークンファイルのパーミッションを所有者限定に。
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504)：信頼できないリポジトリ設定からのコマンド実行前に、確認プロンプトをようやく追加した約3,000行のパッチ（加えて、それ以前の無言の修正 `#22190`、`#37823`、`#39464`、`#39480`、`#40133`、`#41886`）。
- **未解決のローカルセキュリティ欠陥：** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489)（外部パストラバーサル／シンボリックリンク）と、[`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997)（Windows の `externalLauncher.ts` が `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` を実行し、AVG/Avast に `IDP.HELU.PSE96` として検出される）は、未マージのまま残っている。
- **`SECURITY.md` はアーキテクチャを堅牢化するのではなく、責任範囲を狭めている：** ワークスペース外でのOS全体の `filesystem:read`、iOS/LAN における平文HTTPトランスポート、侵害されたリレー署名鍵によるホストマシン全体の乗っ取りを、*意図された設計上の境界* と明言している。

<!-- section:status -->
## 上流のステータス（`ca81b7b9`）

- **依然として未解決：** 公開済みのGitHubセキュリティアドバイザリは**0件**のまま。`Issue #26489` と `PR #30997` は未修正。`SECURITY.md` はOS全体の読み取りと平文HTTPを、意図された挙動として分類し続けている。

<!-- section:visuals -->
## 視覚的証拠

![セキュリティアドバイザリを公開しないまま、`ServerSecretStore` のパストラバーサルを黙って修正する PR #39483](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![ウイルス対策ソフトに検出された Windows の Base64 PowerShell 起動に対する、未マージの修正 PR #30997](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![OS全体の読み取り、iOS の平文HTTP、リレー鍵によるマシン乗っ取りを意図された境界として分類する SECURITY.md](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## 一次情報源

- [X での元調査（第13回）](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories（公開0件）](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [詳細技術ドシエ 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
