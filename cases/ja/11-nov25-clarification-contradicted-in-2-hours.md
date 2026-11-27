# #11 · 11月25日の説明、2時間以内に一夜のPR群と100MBダンプで矛盾が露呈

> 11月25日の朝、@theo はプライバシーに関する包括的な保証を3つ示し、100 MB のテレメトリーダンプを公開した。しかし、その3つの主張はいずれも2時間以内に、彼自身のチームによるPR群とgzip圧縮されたダンプそのものによって覆された。

<!-- section:claim -->
## 何が主張されたか

11月25日朝の説明（[`2125332390239494211`](https://x.com/theo/status/2125332390239494211)）とその後の返信（[`2125370330244128924`](https://x.com/theo/status/2125370330244128924)）の中で、`@theo` はユーザーに次のように保証した。

- T3 Code は *"never collected file paths."*
- 環境変数は *"always disabled telemetry cleanly."*
- オプトアウトしたインストールはローカルの追跡ファイルを一切書き込まず、Claude の所有者ハッシュは *"broken."* だった。

<!-- section:evidence -->
## 証拠が示すもの

- **矛盾1 — `git.cwd` による絶対ワークスペースパスの漏えい（`PR #42450`）：** 投稿から約90分後、コアメンテナーの Julius は [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450) をマージし、リレー経由で配信された webhook 実行が実行スパン全体を Axiom にエクスポートしていたことを認めた。そこには `git.cwd`（**絶対ワークスペースパス全体、OS ユーザー名、リポジトリ名**）を含む Git スパンも含まれていた。
- **矛盾2 — Windows と macOS のオプトアウトが機能せず（`PR #42376`、`PR #42464`）：** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) は、既存プロセスから起動された場合、Windows デスクトップが保存済みの `T3CODE_TELEMETRY_ENABLED=false` ユーザー環境変数を無視していたことを認めた。[`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) は、macOS/Linux の初回起動時のリレートレーシングがシェル検出より前に初期化され、セッション全体にわたって `~/.zshrc` のオプトアウトを無視していたことを認めた。
- **矛盾3 — 無条件のディスク書き込みと `events.clean.jsonl` 内の264件の現行 Claude レコード：** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152)（`ca81b7b9` 時点の `line 156`）は、起動時に今も無条件で `getTelemetryIdentity` を呼び出し、`telemetryEnabled` を確認する前にローカルのインストール UUID（`upsertAnonymousId`）を書き込んでいる。一方、`@theo` の公開エクスポート（圧縮後 `6,056,594` バイト、`95,789` イベント）の gzip ヘッダーには、投稿の20分前に生成された元のファイル名 `events.clean.jsonl` が示されていた。それでもなお、このファイルには **264件の現行 Claude 所有者レコード** が含まれ、**4台の別々のマシン**（`installId`）を1つの SHA-256 ハッシュに結び付け、さらにそのままのプライベートなプロキシモデル名（`vibeproxy/gpt-6-luna`、`muse-proxy-wonder-full`）も記録されていた。

<!-- section:status -->
## 上流の状況（`ca81b7b9`）

- **部分的に修正済み：** `PR #42450`、`PR #42376`、`PR #42464` は一夜のうちにマージされた。
- **未解決：** `AnalyticsService.ts:156` は今もオプトアウトを確認する前にローカルの匿名 ID を無条件で書き込み、`DesktopShellEnvironment.ts` は今も `T3CODE_OTEL_SDK_DISABLED` と `OTEL_SDK_DISABLED` の転送を省略している。

<!-- section:visuals -->
## 視覚的証拠

![リレーでトリガーされた実行が `git.cwd` の絶対ワークスペースパスを Axiom にエクスポートしていたことを認める PR #42450](../../evidence/06-pr42450-absolute-path.jpg)

![Windows デスクトップが保存済みの `T3CODE_TELEMETRY_ENABLED=false` 環境変数を無視していたことを認める PR #42376](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![macOS の初回起動時のリレートレーシングが `~/.zshrc` のオプトアウトを無視していたことを認める PR #42464](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![`events.clean.jsonl` のフォレンジック監査。4台のマシンとプライベートなプロキシモデル ID を結び付ける264件の Claude レコードを明らかにする](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## 一次資料

- [X での原調査（第11回）](https://x.com/realchendahuang/status/2125394810559426993)
- [`@theo` の11月25日の説明（`2125332390239494211`）](https://x.com/theo/status/2125332390239494211) · [フォローアップ返信（`2125370330244128924`）](https://x.com/theo/status/2125370330244128924) · [公開 gzip ダンプ](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [詳細技術ドシエ 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
