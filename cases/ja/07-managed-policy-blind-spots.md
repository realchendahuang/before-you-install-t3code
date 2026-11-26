# #07 · マネージドポリシーの矛盾：文書化された4つのテレメトリ盲点

> `@theo` は、T3 Code に「最高の企業向けマネージドポリシーシステム」があり、「すべてのテレメトリを切るのは簡単」だと主張した。しかしこれは、T3 Code 自身の `docs/user/telemetry.md` と `docs/user/managed-policy.md` によって真っ向から否定されている。

<!-- section:claim -->
## 何が主張されたか

- 11月24日 19:13 CST、`@theo` はユーザー向けのオプトアウト切り替えがないことを一蹴し、こう述べた：*"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."*（[`2125186071357251715`](https://x.com/theo/status/2125186071357251715)）。
- その30分後、彼は会話データが*"never touches any of our servers"*（当社のサーバーには一切触れない）と付け加えた（[`2125191784859115766`](https://x.com/theo/status/2125191784859115766)）。

<!-- section:evidence -->
## 証拠が示すもの

T3 Code 自身の公式ドキュメント（[`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) および [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)）は、4つの具体的な盲点を記録している：

- **管理者専用のデプロイ（個人向けUIスイッチは皆無）：** デスクトップユーザーには設定トグルが存在しない。マネージドポリシーは MDM/GPO あるいは管理者が保護するOSパス（`/Library/Application Support/T3Code/policy.json`、`C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code`、または `/etc/t3code/policy.json`）を必要とし、非管理者のデスクトップユーザーには完全に手が届かない。
- **ホスト型Webアプリ（`app.t3.codes`）はポリシーを無視：** ブラウザアプリはサーバー環境変数とマネージドポリシーを無視し、トレーシングを有効にしてビルドされた場合は接続トレースを出力する。そして*"has no relay tracing toggle."*
- **モバイルアプリはサーバーポリシーの外側にある：** 公式ドキュメントは、サーバー環境変数とマネージドポリシーが*"do not disable mobile tracing."* と明記している。
- **`Publish agent activity` はオプトアウトを無視：** プロジェクト名、スレッド名、モデル名、ライブステータスを T3 Connect にアップロードする。しかもドキュメントは明言している：*"The telemetry opt-out does not disable it."* さらに、失敗した Axiom スパン／クラッシュログは*"can quote a value the app was handling"*、そして `Agent feedback` は最大16 KBの会話メッセージを添付しうる。

<!-- section:status -->
## アップストリームの状況（`ca81b7b9`）

- **未解決のまま：** 夜間の対応で [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) がアプリ内のモバイル・トレース・トグルを追加したが、マネージドポリシーは依然としてモバイルトレーシングを無効化できず、ホスト型の `app.t3.codes` には依然としてオプトアウトのトグルが一切なく、`Publish agent activity` は依然としてテレメトリのオプトアウトを無視し、デスクトップの設定UIトグルも存在しない。

<!-- section:visuals -->
## 視覚的証拠

![app.t3.codes にはトグルがなく、モバイルはマネージドポリシーを無視し、エージェントアクティビティはオプトアウトを無視することを確認する公式ドキュメント docs/user/telemetry.md](../../evidence/05-telemetry-cant-disable.png)

![macOS、Windows、Linux にわたる管理者保護のシステムパスを列挙した公式ドキュメント docs/user/managed-policy.md](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![マネージドポリシーによってすべてのテレメトリを切るのは簡単だと主張する Theo の11月24日の投稿](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## 一次資料

- [Original X Investigation (Part 7)](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [`@theo` Managed Policy claim (`2125186071357251715`)](https://x.com/theo/status/2125186071357251715) · [`@theo` "never touches servers" (`2125191784859115766`)](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [Deep Technical Dossier 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
