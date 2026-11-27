# #09 · 內部日均 500 次提交與 `yolo merges`，對外卻勸退貢獻者、公開拉黑並辱罵使用者

> 對內靠 700 個 Agent 每天狂推 500 個提交，自承 `yolo merges` 經常把程式碼搞炸；對外卻在 `CONTRIBUTING.md` 寫「勸你別來」、用 `.github/VOUCHED.td` 公開拉黑、刪除核心功能，還在 Issue 裡直接辱罵回報問題的使用者。

<!-- section:claim -->
## 官方／Theo 的說法

- 把 T3 Code 包裝成高速迭代、貼近開發者需求的開源標竿工程。

<!-- section:evidence -->
## 原始碼與公開紀錄鐵證

- **內部毫無節制地狂飆（每天 500 個 commit 與 `yolo merges`）：** `@theo` 公開炫耀自己日常每天就合併 **500 個 commit**（[`2120741101250515322`](https://x.com/theo/status/2120741101250515322)）、同時跑 **700 個 Agent**、核心維護者 Julius 掛著自動迴圈批次處理 PR，還親口承認 *"my yolo merges breaking shit sometimes"*（盲合併經常把東西搞壞，[`2119951615679672513`](https://x.com/theo/status/2119951615679672513)），甚至調侃「把電腦搞炸就是免費流量素材」（[`2119993037971730879`](https://x.com/theo/status/2119993037971730879)）。
- **勸退社群與 `.github/VOUCHED.td` 公開拉黑機制：** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) 開篇第一句就是 *"here's my advice: Don't"*（給想貢獻程式碼者的忠告：別來），搭配 [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) 公開點名拉黑、秒關的機制，整個儲存庫對外部 PR 貼了 **174 個 `unwanted` 標籤**。
- **單方面砍功能與辱罵回報者：** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551) 藏起 Build/Plan 切換（附圖嘲諷 *"Reality check for those upset"*，10 個倒讚）；[`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190) 藏起上下文用量環（16 個倒讚，全倉最高）；[`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131) 徹底刪除 Plan 模式，並附上一段自相矛盾的 AI 摘要。在 [`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) 裡，`@theo` 直接叫使用者 `@bermudi` *"uninstall our software"*，並辱罵對方是 *"ungrateful prick"*，隔天一早又否決對方提交的 [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572)。
- **在 X 上用關注度拿捏貢獻者：** 斥責提出建議的開發者沒追蹤自己（[`2120821423438778667`](https://x.com/theo/status/2120821423438778667)）、威脅把 `/btw` 功能從使用者手上收回（[`2120853340078874923`](https://x.com/theo/status/2120853340078874923)），並稱「發一張標註截圖比提 PR 有用得多」（[`2123754193530053110`](https://x.com/theo/status/2123754193530053110)）。

<!-- section:status -->
## 上游最新狀態（`ca81b7b9`）

- **依然有效：** `CONTRIBUTING.md` 與 `.github/VOUCHED.td` 仍持續在 `main` 主幹上生效。

<!-- section:visuals -->
## 第一手實證原圖

![CONTRIBUTING.md 勸退社群貢獻，並說明透過 .github/VOUCHED.td 公開拉黑的機制](../../evidence/22-contributing-vouched-ban.png)

![Theo 在 Issue #33639 留言區叫使用者卸載，並辱罵對方是 ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo 公開承認自己的 yolo merges 經常把專案搞炸](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## 可查核的原始出處

- [X 調查原帖（第 9 彈）](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [Issue #33639 留言](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [日均 500 次提交（`2120741101250515322`）](https://x.com/theo/status/2120741101250515322) · [`yolo merges`（`2119951615679672513`）](https://x.com/theo/status/2119951615679672513) · [把電腦搞炸＝免費流量（`2119993037971730879`）](https://x.com/theo/status/2119993037971730879)
- [深度技術卷宗 05](../../docs/dossiers/05-governance-trademark-and-history.md)
