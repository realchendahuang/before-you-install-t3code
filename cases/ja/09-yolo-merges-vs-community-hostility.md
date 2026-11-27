# #09 · 内部の `yolo merges` と、外部コミュニティへの敵意、そして `.github/VOUCHED.td` による追放

> 内部では、T3 Code が自動エージェントループによって1日500コミットを出荷し、"yolo merges breaking shit" と自ら認めていた。その一方で外部には、コントリビューターに「here's my advice: Don't」と告げ、`.github/VOUCHED.td` でユーザーを告発し、Issue の報告者を侮辱していた。

<!-- section:claim -->
## 主張されていたこと

- T3 Code は、エンジニアがエンジニアのために作った、動きの速いコミュニティ重視のオープンソースプロジェクトだと自ら標榜している。

<!-- section:evidence -->
## 証拠が示すもの

- **無謀な内部マージ速度：** `@theo` は **1日500コミット** の出荷を公言し（[`2120741101250515322`](https://x.com/theo/status/2120741101250515322)）、**700体の同時エージェント** を走らせ、コミュニティの PR を自動エージェントループでバッチマージし、*"my yolo merges breaking shit sometimes"* と認め（[`2119951615679672513`](https://x.com/theo/status/2119951615679672513)）、マシンの消去リスクを *"free content"* と冗談にしていた（[`2119993037971730879`](https://x.com/theo/status/2119993037971730879)）。
- **敵対的なガバナンスと公開告発による ban：** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) は *"here's my advice: Don't"* で始まり、[`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) による告発ベースの自動 ban、そして却下されたコミュニティ PR に付いた **174個の `unwanted` ラベル** がそれを裏づけている。
- **一方的な機能削除とユーザー侮辱：** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551) は Build/Plan トグルを埋もれさせ（*"Reality check for those upset"*、10 の低評価）、[`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190) はコンテキスト使用量リングを隠し（16 の低評価、リポジトリ内で最多）、[`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131) は自己矛盾した AI 要約とともに Plan モードを完全に削除した。[`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) で `@theo` はユーザー `@bermudi` に *"uninstall our software"* と言い、*"ungrateful prick"* と呼んだ。そして翌朝、彼のフォローアップ [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572) を却下した。
- **X におけるフォロワー強要：** コントリビューターは `@theo` をフォローしていないことで叱られ（[`2120821423438778667`](https://x.com/theo/status/2120821423438778667)）、`/btw` を削除すると脅され（[`2120853340078874923`](https://x.com/theo/status/2120853340078874923)）、注釈付きスクリーンショットのほうが PR を出すよりましだと言われた（[`2123754193530053110`](https://x.com/theo/status/2123754193530053110)）。

<!-- section:status -->
## 上流の現状（`ca81b7b9`）

- **依然として有効：** `CONTRIBUTING.md` と `.github/VOUCHED.td` は、`ca81b7b9` の `main` 上で今も残っている。

<!-- section:visuals -->
## 視覚的証拠

![外部からの PR を牽制し、.github/VOUCHED.td による公開告発 ban を明記した CONTRIBUTING.md](../../evidence/22-contributing-vouched-ban.png)

![Issue #33639 における Theo の返信。ユーザーにアンインストールを促し、"ungrateful prick" と罵倒している](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

!["yolo merges breaking shit sometimes" と認める Theo](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## 一次資料

- [X での元調査（第9回）](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [Issue #33639 のコメント](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [1日500コミット（`2120741101250515322`）](https://x.com/theo/status/2120741101250515322) · [`yolo merges`（`2119951615679672513`）](https://x.com/theo/status/2119951615679672513) · [マシン消去＝無料コンテンツ（`2119993037971730879`）](https://x.com/theo/status/2119993037971730879)
- [技術詳細ドシエ 05](../../docs/dossiers/05-governance-trademark-and-history.md)
