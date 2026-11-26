# #03 · 52日間の沈黙の `git push --force` と、モデル・プライバシー・フィルターを外すまでの21時間

> 52日以上もの間、T3 Code は、Claude Auto モードがプロンプトを出さずに `git push --force origin main` を黙って承認してしまうバグをオープンのまま放置していた。一方で、プライバシー・ホワイトリストを撤廃し、プライベートなモデルが @theo の公開リーダーボードに表示されるようにするまでに要したのは、わずか21時間だった。

<!-- section:claim -->
## 何が主張されていたか

- Claude Auto モードは、高リスクの破壊的操作（`main` への force-push など）を、人間による明示的な承認へとエスカレーションするよう設計されている。
- テレメトリは、プライバシーに配慮した安全な集約メトリクスとして説明されていた。

<!-- section:evidence -->
## 証拠が示すもの

- **52日以上も未修正 — 沈黙の `git push --force`（`Issue #15353`）:** `ClaudeAdapterV2.ts` において、Auto モードは `!requiresClaudeApproval(context)` をショートサーキットして、そのまま `"allow"` に流していた。Claude 自身の安全分類器が `git push --force origin main` を2度ブロックし、3度目の試行を人間の確認のためにエスカレーションしたにもかかわらず、T3 Code は UI プロンプトを一切出さずに黙って承認し、`"source": "user_temporary"` と記録していた。コミュニティによる2件の修正 PR（`#15360`、`#35207`）はレビューされないままボットによる自動クローズを迎え、`#40692` はマージされないままだった。
- **プライバシー・ホワイトリストを外すまで21時間（`Issue #40948` → `PR #41237`）:** 11月22日、[`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) は、`PR #29001` がモデル・ホワイトリストを強制していたため、新しいモデルが `@theo` の公開リーダーボード [`slopalytics.com`](https://slopalytics.com/)（[`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)）に表示されていないと指摘した。**21時間**のうちに、[`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) が `@theo` のアカウントでマージされ、そこには Theo がフィルターの撤廃を明示的に要請したと記されていた。この結果、`ollama/acme-internal` や `acme-azure-deployment` といったプライベートなローカル／エンタープライズ名が、そのままの形で分析基盤へ送信されることになった。

<!-- section:status -->
## 上流のステータス（`ca81b7b9`）

- **部分的に変更済み／中核の安全バグは依然オープン:** その後、[`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) がカタログ外のモデルを `custom:<driver>` としてマスクするようにした（カタログ／ベンダーのスラッグは依然としてカスタムエンドポイントの背後で報告される）。**Issue #15353（Auto モードにおける沈黙の `git push --force`）は、`ca81b7b9` 時点でもオープンかつ未修正のままである。**

<!-- section:visuals -->
## 視覚的証拠

![52日以上オープンのままの Issue #15353。Claude Auto モードが git push --force を黙って承認していることを示す](../../evidence/11-issue15353-auto-force-push.png)

![Issue #40948 から21時間後にマージされた PR #41237。slopalytics.com 向けのモデル・プライバシー・フィルターを撤廃した](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## 一次資料

- [X での原調査（パート3）](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [再現コメント `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [未マージのコミュニティ修正: PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [詳細技術ドシエ 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
