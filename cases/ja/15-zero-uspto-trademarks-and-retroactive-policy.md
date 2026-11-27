# #15 · GitHub アカウント削除脅迫の背後に USPTO 商標登録ゼロ、そして 17 時間後の遡及的な `TRADEMARK.md`

> @theo が「商標侵害」を理由に GitHub に連絡して中国人開発者のアカウントを削除させると脅したとき、T3 Tools Inc. は `T3 Code`、`T3 Tools`、`T3 Connect` について USPTO の登録を 0 件しか持っておらず、しかも 17 時間後に `TRADEMARK.md` を遡及的にマージした。

<!-- section:claim -->
## 何が主張されたか

- 11月23日、`@theo` は MIT フォークの作者を商標侵害だと非難し、GitHub アカウントの削除を示唆した（[`2124829315657576890`](https://x.com/theo/status/2124829315657576890)）。
- `TRADEMARK.md` をマージする3時間前、同氏は疑問を呈した開発者たちに*「get a better lawyer」*と言い放った（[`2125026423769555308`](https://x.com/theo/status/2125026423769555308)）。それにもかかわらず、2024年9月には*「unenforceable trademark dispute」*をめぐって WordPress を嘲笑していたのだ（[`1839261574005141945`](https://x.com/theo/status/1839261574005141945)）。

<!-- section:evidence -->
## 証拠が示すもの

- **T3 商標の USPTO 登録はゼロ：** USPTO TSDR を直接確認したところ（`@vildanden_ai` の情報提供による、[`2125275487404761555`](https://x.com/vildanden_ai/status/2125275487404761555)）、`T3 Code`、`T3 Tools`、`T3 Connect` の登録は**0 件**である。T3 Tools Inc. による唯一の USPTO 出願（`PING LABS`、Serial [`97294243`](https://tsdr.uspto.gov/statusview/sn97294243)）は2025年2月に拒絶され、2025年5月19日に `ABANDONED` と記された。一方、無関係の第三者は第9類および第42類で有効な `T3` ソフトウェア／SaaS 登録を保有している（`EquipmentShare`、Reg. `7795672` / Serial [`90644500`](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)、`ESG Operations`、Reg. `3324707`）。
- **GitHub 商標ポリシーの要件：** [GitHub の商標ポリシー](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)によれば、商業的な商標削除要請には、偽証罪の罰則のもとで連邦または国際登録番号が必要である。`@theo` が `@DDdxx666` のアカウント削除を脅した時点で、同氏は GitHub のフォームを完成させることができなかった。
- **17時間後の遡及的な `TRADEMARK.md`（`PR #41898`）：** **11月24日 12:21 CST**、つまりアカウント削除脅迫から17時間後、`@theo` は [`PR #41898`](https://github.com/pingdotgg/t3code/pull/41898) をマージして `TRADEMARK.md` を挿入し、*「whether registered or unregistered」*という権利を主張した。そして94秒後に X でそれを引用した（[`2125082769395220688`](https://x.com/theo/status/2125082769395220688)）。

<!-- section:status -->
## 上流の状況（`ca81b7b9`）

- **公開記録：** 遡及的な `TRADEMARK.md` は `main` 上に残っており、USPTO TSDR の記録は `T3 Code` について T3 Tools Inc. の登録が0件であることを引き続き示している。

<!-- section:visuals -->
## 視覚的証拠

![アカウント削除脅迫から17時間後にマージされ、遡及的に TRADEMARK.md を追加した PR #41898](../../evidence/24-pr41898-trademark-aftermath.png)

![「whether registered or unregistered」という独占権を主張する TRADEMARK.md](../../evidence/extra/p1-2b-trademark-md.png)

![TRADEMARK.md をマージする3時間前に、開発者たちに「get a better lawyer」と言う Theo](../../evidence/extra/p1-5-x-get-better-lawyer.png)

<!-- section:sources -->
## 一次資料

- [X での原調査（第15回）](https://x.com/realchendahuang/status/2125408163273080950)
- [USPTO TSDR `97294243`（PING LABS — ABANDONED）](https://tsdr.uspto.gov/statusview/sn97294243) · [USPTO TSDR `90644500`（EquipmentShare `T3`）](https://tsdr.uspto.gov/#caseNumber=90644500&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch)
- [GitHub 商標ポリシー](https://docs.github.com/en/site-policy/content-removal-policies/github-trademark-policy)
- [PR #41898](https://github.com/pingdotgg/t3code/pull/41898) · [`TRADEMARK.md`](https://github.com/pingdotgg/t3code/blob/main/TRADEMARK.md)
- [94秒後の遡及的引用（`2125082769395220688`）](https://x.com/theo/status/2125082769395220688) · [「Get a better lawyer」（`2125026423769555308`）](https://x.com/theo/status/2125026423769555308) · [WordPress への嘲笑（`1839261574005141945`）](https://x.com/theo/status/1839261574005141945)
- [詳細技術ドシエ 05](../../docs/dossiers/05-governance-trademark-and-history.md)
