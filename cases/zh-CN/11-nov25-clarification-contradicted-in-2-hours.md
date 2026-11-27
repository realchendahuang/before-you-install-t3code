# #11 · 11 月 25 日澄清长文 2 小时内被自家通宵 PR 与 100 MB 导出包三连打脸

> 11 月 25 日早晨，@theo 发长文拍胸脯作出三项隐私保证并放出 100 MB 遥测导出包——不到两小时，全部三项说法均被自家团队通宵合入的 PR 与导出包原始数据正面证伪。

<!-- section:claim -->
## 官方 / Theo 宣称

在 11 月 25 日早上的澄清长文（[`2125332390239494211`](https://x.com/theo/status/2125332390239494211)）及后续回复（[`2125370330244128924`](https://x.com/theo/status/2125370330244128924)）中，`@theo` 向用户保证：
- 从未收集过用户的文件路径。
- 环境变量一直都能干净彻底地关闭遥测。
- 退出遥测后本地不会写任何追踪文件，且 Claude 账号哈希本来就是“坏的”。

<!-- section:evidence -->
## 源码与公开记录铁证

- **打脸一：`git.cwd` 绝对工作区路径直接发往 Axiom（`PR #42450`）：** 发帖仅约 90 分钟后，核心维护者 Julius 合入 [`PR #42450`](https://github.com/pingdotgg/t3code/pull/42450)，承认中继触发的 Webhook 运行会把完整执行链路导出给 Axiom——其中 Git span 直接带着 `git.cwd`（**完整绝对路径、操作系统用户名与仓库名**）。
- **打脸二：Windows 与 macOS 退出环境变量长期失效（`PR #42376`、`PR #42464`）：** [`PR #42376`](https://github.com/pingdotgg/t3code/pull/42376) 承认 Windows 桌面端从已有进程启动时会忽略用户保存的 `T3CODE_TELEMETRY_ENABLED=false`；[`PR #42464`](https://github.com/pingdotgg/t3code/pull/42464) 承认 macOS/Linux 首次启动的中继追踪早于 shell 环境变量发现，整个会话期间完全无视 `~/.zshrc` 中的关闭设置。
- **打脸三：启动无条件落盘追踪 ID + 100 MB 导出包里藏着 264 条活 Claude 归因记录：** [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152)（在 `ca81b7b9` 位于第 156 行）启动时至今仍无条件先调 `getTelemetryIdentity` 落盘本地 UUID（`upsertAnonymousId`），然后才检查 `telemetryEnabled`。更讽刺的是，对 `@theo` 公开压缩包（`6,056,594` 字节、`95,789` 条事件）解包查 gzip 头发现原文件名叫 `events.clean.jsonl`（发帖前 20 分钟刚洗出来）——即便清洗过，里面依然留着 **264 条真实 Claude 账号哈希记录**，在 10 月 20 日把 **4 台不同电脑**（`installId`）精准串到同一个 SHA-256 哈希上，并原样泄露了 `vibeproxy/gpt-6-luna`、`muse-proxy-wonder-full` 等私人代理模型名。

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **部分修补：** `PR #42450`、`PR #42376` 与 `PR #42464` 已于当晚合入。
- **仍未修复：** `AnalyticsService.ts:156` 仍在检查退出开关前无条件写入本地追踪 ID；`DesktopShellEnvironment.ts` 依然漏传 `T3CODE_OTEL_SDK_DISABLED` 与 `OTEL_SDK_DISABLED`。

<!-- section:visuals -->
## 一手实证原图

![PR #42450 证实中继触发运行曾将含用户名与仓库名的 git.cwd 绝对路径导出至 Axiom](../../evidence/06-pr42450-absolute-path.jpg)

![PR #42376 承认 Windows 桌面端忽略用户保存的 T3CODE_TELEMETRY_ENABLED=false](../../evidence/extra/x-post11-2-pr42376-windows-optout.jpg)

![PR #42464 承认 macOS 首次启动中继追踪整场无视 ~/.zshrc 退出设置](../../evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg)

![对 Theo 公开导出的 events.clean.jsonl 取证：264 条活 Claude 记录串联 4 台电脑并泄露私人代理模型名](../../evidence/extra/x-post11-4-dump-264-claude-records.jpg)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 11 弹）](https://x.com/realchendahuang/status/2125394810559426993)
- [`@theo` 11 月 25 日澄清长文（`2125332390239494211`）](https://x.com/theo/status/2125332390239494211) · [后续否认回复（`2125370330244128924`）](https://x.com/theo/status/2125370330244128924) · [公开遥测导出压缩包](https://files.tslop.org/2026/11/t3code-telemetry-events-jsonl-a4896cdc.gz)
- [PR #42450](https://github.com/pingdotgg/t3code/pull/42450) · [PR #42376](https://github.com/pingdotgg/t3code/pull/42376) · [PR #42464](https://github.com/pingdotgg/t3code/pull/42464)
- [`AnalyticsService.ts#L152`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts#L152) · [`DesktopShellEnvironment.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/desktop/src/shell/DesktopShellEnvironment.ts)
- [深度技术卷宗 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
