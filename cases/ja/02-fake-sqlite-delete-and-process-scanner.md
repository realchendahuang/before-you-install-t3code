# #02 · 偽のSQLiteスレッド削除（41.6 GBの肥大化）と5秒ごとのOS全プロセススキャン

> 「完全に削除」をクリックしても、会話履歴のすべてが `statev2.sqlite` の中にそのまま残っていた（ローカルディスクを41.6 GBまで肥大化）。一方、バックグラウンドのRust製モニターは、オプトアウトの手段が一切ないまま、5秒ごとにOSの全プロセスとコマンドライン全体をスキャンしていた。

<!-- section:claim -->
## 何が主張されていたか

- サイドバーの削除確認ダイアログ（`useThreadActionMenu.ts`）は、ユーザーに明示的にこう告げていた。*「This permanently clears conversation history for this thread.」*
- T3 Codeは、クリーンで高速なローカル・コーディング・ワークスペースとして売り込まれていた。

<!-- section:evidence -->
## 証拠が示すもの

- **偽の完全削除（`Issue #17845`、`#28903`）：** ベースライン `9d3195b4` の時点では、スレッドを削除しても `statev2.sqlite` に `"thread.deleted"` イベントが追加されるだけで、それ以前のメッセージ、ツール出力、推論トレースはディスク上にそのまま残っていた。ユーザーによる記録では、`statev2.sqlite` は3週間で**25.9 GB**（「削除済み」スレッドが90%）、6週間で**41.6 GB**、7週間で**33 GB**まで膨れ上がった。
- **マシン全体のプロセスおよびコマンドラインのスキャン（`Issue #11222`、`PR #41889`）：** バックグラウンド・ヘルパーの `t3-resource-monitor`（`native/resource-monitor/src/main.rs`）は、診断機能を閉じていても5秒ごとに `ProcessesToUpdate::All` を `with_cmd(UpdateKind::Always)` 付きで実行し、Windows上で440以上の無関係なアプリやゲームにまたがる280〜300個の永続ハンドルを保持し続けていた。11月24日、[`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) は、診断機能が**プロセスのコマンドライン全体**（しばしば平文のAPIキー、データベースのパスワード、トークンを含む）をスナップショットとテレメトリーに取り込んでいたことを確認した。
- **企業ホスト名の漏洩と起動時の強制フェッチ：** フロントエンドのfaviconリクエストが、内部ホスト名（`devbox.localdomain` など）をGoogleのfaviconサービスへ漏洩させていた（`PR #16950`、`PR #32657`）。またサーバー起動時には、オプトアウト手段なしで `raw.githubusercontent.com` から互換性マニフェストを無条件に取得していた（`Issue #36479`）。
- **深刻なクォータ消費と電力バグ：** Agent SDK経由でClaudeを動かすと、5時間のクォータが通常の**1.7倍**の速さで消費された（`Issue #7338`、`Issue #24649`、81件のコメント）。さらにGPUのリグレッションにより、同等のElectronと比べて最大**136倍**の電力を消費し、MacBookのGPUを**60W**に固定（バッテリー駆動78分で枯渇）、Webタブを閉じた後でも**18W**を消費した（`Issue #3143`、`Issue #40581`）。

<!-- section:status -->
## 上流のステータス（`ca81b7b9`）

- **部分的にパッチ済み：** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) が非同期の `thread-content.purge` を追加し（`#17845` をクローズ）、[`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) がWindowsのプロセスモニターの読み取り範囲を狭めた。
- **未解決のまま：** 削除されたソーススレッドは、生きたフォーク、保留中の `merge_back`、または稼働中のサブエージェントから参照されている間は履歴を保持し続ける。トゥームストーン行はSQLiteに残り、ディスク容量の回収には依然としてオフラインでの `VACUUM` が必要。LinuxとmacOSでは `ProcessesToUpdate::All` による検出が続いており、`PR #41889` もオープンのままである。

<!-- section:visuals -->
## 視覚的証拠

![完全削除したスレッドが statev2.sqlite を数十ギガバイトまで肥大化させていることを記録した Issue #17845](../../evidence/10-issue17845-fake-delete.png)

![t3-resource-monitor が5秒ごとにOSの全プロセスをスキャンしていることを記録した Issue #11222](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## 一次資料

- [Original X Investigation (Part 2)](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [Deep Technical Dossier 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
