# #03 · 拖延 52 天不修的静默 `git push --force` vs 21 小时撤除隐私过滤

> 会直接冲毁主分支的 Claude Auto 静默强推漏洞拖了 52 天以上无人修复；但为了让私有模型登上 @theo 的公开排行榜，团队仅用 21 小时就撤掉了模型隐私白名单。

<!-- section:claim -->
## 官方 / Theo 宣称

- Claude Auto 模式本应拦截高危破坏性命令（例如向 `main` 强推），并在重试升级时弹窗交由人类确认。
- 官方对外宣称采集的遥测数据做好了隐私脱敏，仅用于聚合统计。

<!-- section:evidence -->
## 源码与公开记录铁证

- **拖延 52+ 天不修的静默强推（`Issue #15353`）：** `ClaudeAdapterV2.ts` 在 Auto 模式下将 `!requiresClaudeApproval(context)` 直接短路放行为 `"allow"`。用户实测显示，即便 Claude 自带安全分类器连续拦截两次 `git push --force origin main` 并在第 3 次升级请求人工确认，T3 Code 仍不弹出任何对话框直接静默放行，还在日志里伪造记录为 `"source": "user_temporary"`。社区白送的两个修复 PR（`#15360`、`#35207`）无人理睬直到被机器人自动关闭，`#40692` 长期悬空。
- **21 小时火速撤除模型隐私过滤（`Issue #40948` → `PR #41237`）：** 11 月 22 日，[`Issue #40948`](https://github.com/pingdotgg/t3code/issues/40948) 反馈新模型没出现在 `@theo` 的公开榜单 [`slopalytics.com`](https://slopalytics.com/)（[`t3-usage.json`](https://slopalytics.com/data/t3-usage.json)）上，原因是 `PR #29001` 设了白名单防止泄露私有模型名。仅 **21 小时**后，[`PR #41237`](https://github.com/pingdotgg/t3code/pull/41237) 在 `@theo` 账号下直接合入并明写系 Theo 要求移除过滤——导致 `ollama/acme-internal`、`acme-azure-deployment` 等企业私有部署名原样上报。

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **核心安全漏洞仍未修复：** [`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) 事后将非目录模型改写为 `custom:<driver>`（但私有端点后的目录模型 slug 仍照常上报）。**`Issue #15353`（Auto 模式静默 `git push --force`）在 `ca81b7b9` 依然敞开未修。**

<!-- section:visuals -->
## 一手实证原图

![Issue #15353 敞开 52 天以上，证实 Claude Auto 模式不弹窗静默放行 git push --force](../../evidence/11-issue15353-auto-force-push.png)

![Issue #40948 提出仅 21 小时后 PR #41237 即合并撤除模型隐私过滤以服务 slopalytics.com](../../evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 3 弹）](https://x.com/realchendahuang/status/2125201882687881378)
- [Issue #15353](https://github.com/pingdotgg/t3code/issues/15353) · [复现评论 `#6889019695`](https://github.com/pingdotgg/t3code/issues/15353#issuecomment-6889019695)
- [被冷落的社区修复：PR #15360](https://github.com/pingdotgg/t3code/pull/15360) · [PR #35207](https://github.com/pingdotgg/t3code/pull/35207) · [PR #40692](https://github.com/pingdotgg/t3code/pull/40692)
- [PR #29001](https://github.com/pingdotgg/t3code/pull/29001) · [Issue #40948](https://github.com/pingdotgg/t3code/issues/40948) · [PR #41237](https://github.com/pingdotgg/t3code/pull/41237) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465)
- [`slopalytics.com`](https://slopalytics.com/) · [深度技术卷宗 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
