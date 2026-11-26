# #09 · 内部日均 500 提交与 `yolo merges` vs 对外劝退贡献者、公开拉黑与辱骂用户

> 对内靠 700 个 Agent 每天狂推 500 个提交、自承 `yolo merges` 经常搞炸代码；对外却在 `CONTRIBUTING.md` 写“劝你别来”、用 `.github/VOUCHED.td` 公开拉黑、删核心功能并在 Issue 里直接辱骂反馈用户。

<!-- section:claim -->
## 官方 / Theo 宣称

- 将 T3 Code 包装成高速迭代、贴近开发者需求的开源标杆工程。

<!-- section:evidence -->
## 源码与公开记录铁证

- **内部无底线狂飙（500 commits/天 & `yolo merges`）：** `@theo` 公开炫耀日常每天合并 **500 个 commit**（[`2120741101250515322`](https://x.com/theo/status/2120741101250515322)）、同时跑 **700 个 Agent**、核心维护者 Julius 挂自动循环批量处理 PR、亲口承认 *"my yolo merges breaking shit sometimes"*（盲合并经常把东西搞坏，[`2119951615679672513`](https://x.com/theo/status/2119951615679672513)），甚至调侃“把电脑搞炸就是免费流量素材”（[`2119993037971730879`](https://x.com/theo/status/2119993037971730879)）。
- **劝退社区与 `.github/VOUCHED.td` 公开拉黑机制：** [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) 开篇第一句就是 *"here's my advice: Don't"*（给想贡献代码者的忠告：别来），配合 [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td) 公开点名拉黑秒关机制，全仓给外部 PR 打了 **174 个 `unwanted` 标签**。
- **单方面砍功能与辱骂反馈者：** [`PR #5551`](https://github.com/pingdotgg/t3code/pull/5551) 藏起 Build/Plan 切换（配图嘲讽 *"Reality check for those upset"*，10 踩）；[`PR #9190`](https://github.com/pingdotgg/t3code/pull/9190) 藏起上下文用量环（16 踩，全仓最高）；[`PR #33131`](https://github.com/pingdotgg/t3code/pull/33131) 彻底删除 Plan 模式并配一段自相矛盾的 AI 摘要。在 [`Issue #33639`](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) 里，`@theo` 直接让用户 `@bermudi` *"uninstall our software"* 并辱骂其为 *"ungrateful prick"*，次日一早拒掉对方提交的 [`PR #41572`](https://github.com/pingdotgg/t3code/pull/41572)。
- **X 上用关注度拿捏贡献者：** 训斥提建议的开发者没关注自己（[`2120821423438778667`](https://x.com/theo/status/2120821423438778667)）、威胁把 `/btw` 功能从用户手里拿走（[`2120853340078874923`](https://x.com/theo/status/2120853340078874923)），并称“发张标注截图比提 PR 强得多”（[`2123754193530053110`](https://x.com/theo/status/2123754193530053110)）。

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **依然生效：** `CONTRIBUTING.md` 与 `.github/VOUCHED.td` 仍在 `main` 主干持续生效。

<!-- section:visuals -->
## 一手实证原图

![CONTRIBUTING.md 劝退社区贡献并说明通过 .github/VOUCHED.td 公开拉黑机制](../../evidence/22-contributing-vouched-ban.png)

![Theo 在 Issue #33639 评论区叫用户卸载并辱骂其为 ungrateful prick](../../evidence/extra/t3code-12-issue-33639-theo-insult.png)

![Theo 公开承认自己的 yolo merges 经常把项目搞炸](../../evidence/extra/p7-2-x-theo-yolo-merges.png)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 9 弹）](https://x.com/realchendahuang/status/2125392916369871309)
- [`CONTRIBUTING.md`](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md) · [`.github/VOUCHED.td`](https://github.com/pingdotgg/t3code/blob/main/.github/VOUCHED.td)
- [PR #5551](https://github.com/pingdotgg/t3code/pull/5551) · [PR #9190](https://github.com/pingdotgg/t3code/pull/9190) · [PR #33131](https://github.com/pingdotgg/t3code/pull/33131) · [Issue #33639 评论](https://github.com/pingdotgg/t3code/issues/33639#issuecomment-6765462545) · [PR #41572](https://github.com/pingdotgg/t3code/pull/41572)
- [日均 500 提交（`2120741101250515322`）](https://x.com/theo/status/2120741101250515322) · [`yolo merges`（`2119951615679672513`）](https://x.com/theo/status/2119951615679672513) · [搞炸电脑=免费流量（`2119993037971730879`）](https://x.com/theo/status/2119993037971730879)
- [深度技术卷宗 05](../../docs/dossiers/05-governance-trademark-and-history.md)
