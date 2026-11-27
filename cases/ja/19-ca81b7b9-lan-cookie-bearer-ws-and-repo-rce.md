# #19 · `ca81b7b9` 認証・リポジトリ実行 重大監査：30日間の平文LANシェル、失効不能トークン、`SSH_AUTH_SOCK` 露出

> 最新の `main` HEAD（`ca81b7b9`、11月25日 14:49 CST）を一行ずつ検証した結果、現役のセキュリティおよび信頼性の欠陥が5件確認された。30日間有効な平文 `--lan` シェルクッキーと `Origin` 欠落時のバイパス、失効不能な30日間有効の Bearer トークン、再生可能な `?wsTicket=` URL、`::1` トンネルを破壊する `isIPv4`、そして信頼できないリポジトリが `SSH_AUTH_SOCK` と `GITHUB_TOKEN` を継承したままフックやサブモジュールを実行する問題である。

<!-- section:claim -->
## 何が主張されていたか

- 11月24日から25日にかけての夜通しのパッチ適用ラッシュの後、T3 Code は整理され、日常のエンジニアリング利用に安全であると提示された。
- `SECURITY.md` は、デフォルトのセッションを OS ユーザーとしての完全なシェル制御と定義しつつ、ローカル／LAN の境界は適切に管理されていると主張している。

<!-- section:evidence -->
## 証拠が示すもの

上流コミット [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) に対して直接検証済み：

- **1. 30日間有効な平文 `--lan` シェルクッキー + `Origin` 欠落バイパス：** [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) はデフォルトのセッション TTL を30日に設定している（`SECURITY.md` によれば OS シェルへの完全アクセスに相当）。[`PR #37042`](https://github.com/pingdotgg/t3code/pull/37042) は `https:` の場合にのみ `Secure` 属性を追加したため、`t3 up --lan` の HTTP クッキーは平文のまま送信される（[`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221)）。さらに悪いことに、[`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806) は `Origin` が省略されるたびに `true` を返す。つまり、LAN パケットを1つ盗聴できれば、誰でも `Origin` なしの非ブラウザスクリプトからクッキーを再生し、30日間のホストシェルアクセスを静かに保持できる。
- **2. 失効不能な30日間有効の非 DPoP Bearer トークンと `/logout` ルートの不在：** `/oauth/token` は DPoP 証明が提供された場合にのみ有効期間を1時間に短縮し、それ以外ではバインドされていない **30日間有効の Bearer トークン** を発行する（[`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186)）。HTTP コントラクトには **`/logout` エンドポイントが一切定義されておらず**（[`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)）、`revokeClientSession` は `current_session_revoke_not_allowed` によって自己失効を明示的にブロックしている（[`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511)）。
- **3. 再生可能な5分間有効の `?wsTicket=` URL トークン：** WebSocket チケットはクエリ文字列（`?wsTicket=`、プロキシ／アクセスログに残る）で運ばれ、TTL は5分。[`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) は署名・有効期限・オーディエンス・失効を検証するが、**単一使用の `jti` リプレイストアを持たない**。そのため5分以内であれば、Bearer RPC およびすべての `media` チケットを無制限に再生できる（[`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622)）。
- **4. 完全な `SSH_AUTH_SOCK` と `GITHUB_TOKEN` で実行される信頼できないリポジトリ：** ワークツリーのセットアップは `.gitmodules` が存在するたびに `git submodule update --init --recursive` を自動実行し（[`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205)）、[`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) はグローバルな `core.hooksPath=/dev/null` ガードを欠いており、[`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985) は `.claude/settings.json` の `SessionStart` フックを同期的に実行する。これらはいずれも `GITHUB_TOKEN` と `SSH_AUTH_SOCK` を含むホストの `process.env` を完全に継承する（後者の影響範囲は、あなたの SSH エージェントが署名できるすべてのリモートリポジトリと本番サーバーに及ぶ）。
- **5. `::1` ループバックトンネルを静かに破壊する `isIPv4`：** [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108) は39行目で `::1` をループバック許可リストに追加し、73行目で `NodeNet.isIPv4` を呼び出す。その結果、IPv6 ループバックの Tailscale Serve および T3 Connect ソケットを外部トラフィックと誤判定し、`socket.destroy()` を呼び出してしまう。

<!-- section:status -->
## 上流のステータス（`ca81b7b9`）

- **`ca81b7b9` 時点で5件すべてが未修正のまま：** `main` HEAD（`2026-11-25 14:49 CST`）上で一行ずつ確認済み。あわせて **公開された GitHub Security Advisory は0件**（11月20日の `PR #39483` におけるサイレントなパストラバーサル修正を含む）。

<!-- section:visuals -->
## 視覚的証拠

![http.ts#L215-L241 が平文 --lan HTTP 上で Secure なしの30日間シェルクッキーを送信](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

![EnvironmentAuth.ts#L798-L819 が Origin ヘッダー省略時に常に true を返す](../../evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png)

![EnvironmentAuth.ts#L1506-L1521 がログアウトルートなしで現行セッションの自己失効をブロック](../../evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png)

![GitVcsDriverCore.ts#L6144-L6205 が継承された SSH_AUTH_SOCK と GITHUB_TOKEN の下で再帰的サブモジュール初期化を実行](../../evidence/extra/ca81b7b9-a6-submodule-recursive.png)

![startupAccess.ts#L71-L110 が NodeNet.isIPv4 によって IPv6 ::1 ループバックトンネルを拒否](../../evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png)

<!-- section:sources -->
## 一次情報源

- [元の X 監査投稿 — 第19回（中国語）](https://x.com/realchendahuang/status/2125494234614788390) · [第19回（英語）](https://x.com/realchendahuang/status/2125494623640465525)
- [コミット `ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) · [PR #37042](https://github.com/pingdotgg/t3code/pull/37042) · [PR #39483](https://github.com/pingdotgg/t3code/pull/39483)
- [`SessionStore.ts#L492-L493`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L492-L493) · [`http.ts#L215-L221`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/http.ts#L215-L221) · [`EnvironmentAuth.ts#L798-L806`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L798-L806)
- [`EnvironmentAuth.ts#L1175-L1186`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1175-L1186) · [`EnvironmentAuth.ts#L1506-L1511`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1506-L1511) · [`environmentHttp.ts#L595-L679`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/packages/contracts/src/environmentHttp.ts#L595-L679)
- [`EnvironmentAuth.ts#L1553-L1622`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/EnvironmentAuth.ts#L1553-L1622) · [`SessionStore.ts#L1086-L1156`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/auth/SessionStore.ts#L1086-L1156) · [`startupAccess.ts#L71-L108`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/startupAccess.ts#L71-L108)
- [`GitVcsDriverCore.ts#L6144-L6205`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/GitVcsDriverCore.ts#L6144-L6205) · [`VcsProcess.ts#L145-L157`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/vcs/VcsProcess.ts#L145-L157) · [`ClaudeAdapterV2.ts#L5982-L5985`](https://github.com/pingdotgg/t3code/blob/ca81b7b9/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L5982-L5985)
- [詳細技術ドシエ 03](../../docs/dossiers/03-antigravity-tos-and-t3connect-relay.md)
