# #01 · 官网挂着「零遥测」承诺却默认全量上报、偷读跨工具凭证并连拒四个关闭开关 PR

> 在官网白纸黑字写着「No telemetry. Unless you opt in. Full stop.」期间，T3 Code 默认启用 PostHog 遥测并经闭源网关 `ingest.t3.codes` 留存原始数据，悄悄读取 `~/.codex` 与 `~/.claude.json` 做无盐哈希跨设备归因，还拒绝了社区白送的四个关闭开关 PR。

<!-- section:claim -->
## 官方 / Theo 宣称

- T3 Code 官网首页醒目承诺：*"No telemetry / Unless you opt in. Full stop."*（绝无遥测，除非你主动选择加入，没有例外）。
- 对外宣传为注重隐私、自由透明的本地开源 AI 编程客户端。

<!-- section:evidence -->
## 源码与公开记录铁证

- **挂羊头卖狗肉，跑满三个月后静默删承诺（`PR #174` → `3bdaa6e1`）：** 2026 年 3 月 6 日，[`PR #174`](https://github.com/pingdotgg/t3code/pull/174) 在无弹窗、无设置开关、无文档的情况下默认开启 PostHog 遥测。跑满三个多月后，6 月 18 日 [`commit 3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) 在改版中静默删掉官网“绝无遥测”承诺，未向用户发布任何说明。
- **闭源中转网关留存原始拷贝（`PR #15028`）：** 2026 年 10 月起，每 10 秒批量上报的遥测数据先发往 T3 自建闭源网关 [`https://ingest.t3.codes/`](https://ingest.t3.codes/)。`AnalyticsService.ts` 第一行注释明确写着：转发给 PostHog 之前，T3 闭源网关会先留存一份完整原始拷贝。
- **偷读 `~/.codex/auth.json` 与 `~/.claude.json` 做无盐 SHA-256 跨机归因（`PR #21506`）：** 基线版本 `9d3195b4` 的 `Identify.ts` 直接读取用户家目录下其他 AI 工具的凭证文件，解析 OpenAI `user_id` JWT 与 Claude `oauthAccount.accountUuid`，用无盐 SHA-256（`telemetryId.ts`）把多台电脑精准串联到同一自然人。由于 T3 后台同时持有明文 Clerk 账号 ID，无盐哈希可直接反向精确匹配。
- **细粒度采集：** `ProviderUsageAnalytics.ts` 与 `FeatureUsage.ts` 上报供应商、自定义模型名、推理档位、权限模式、Token 消耗、本地项目/线程数、系统/WSL 环境以及 **35 项具体 UI 与命令操作**。
- **强硬拒绝社区关闭开关：** 6 月 23 日，核心维护者 Julius 将 [`Issue #1397`](https://github.com/pingdotgg/t3code/issues/1397) 标为 `not planned` 关闭，直言 *"We will not make this easier to opt out of, it is crucial for us to know how many users we have"*。质疑违背承诺的 [`Issue #4123`](https://github.com/pingdotgg/t3code/issues/4123) 被静默关闭；4 个社区提交的关闭开关 PR（`#13458`、`#16763`、`#21248`、`#27077`——通过 147 项测试并获审查机器人通过）全部被以 `unwanted` 拒之门外。

```ts
// apps/server/src/telemetry/AnalyticsService.ts（第 1 行与启动初始化）
// T3 ingest retains events and forwards to PostHog; UUIDs deduplicate retries there.
posthogHost: Config.String("T3CODE_POSTHOG_HOST").pipe(Config.withDefault("https://ingest.t3.codes")),
enabled: Config.Boolean("T3CODE_TELEMETRY_ENABLED").pipe(Config.withDefault(true)),
const { distinctId, installId } = yield* getTelemetryIdentity;
```

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **部分修补：** 经 226 万阅读曝光后，[`PR #42299`](https://github.com/pingdotgg/t3code/pull/42299) 移除了 `.codex`/`.claude.json` 读取；[`PR #42465`](https://github.com/pingdotgg/t3code/pull/42465) 将非目录自定义模型脱敏为 `custom:<driver>`；[`PR #42630`](https://github.com/pingdotgg/t3code/pull/42630) 与 [`PR #42629`](https://github.com/pingdotgg/t3code/pull/42629) 响应 CI 环境与 `DO_NOT_TRACK`。
- **仍未修复：** `AnalyticsService.ts:156` 启动时仍先落盘本地追踪 ID 再检查是否退出；`DesktopShellEnvironment.ts` 仍漏传 `OTEL_SDK_DISABLED`/`T3CODE_OTEL_SDK_DISABLED`；`ingest.t3.codes` 依旧闭源；软件设置界面至今无任何关闭按钮。

<!-- section:visuals -->
## 一手实证原图

![Commit 3bdaa6e1 静默删除官网 "No telemetry / Unless you opt in. Full stop." 承诺](../../evidence/02-no-telemetry-removed.png)

![Identify.ts 读取 ~/.codex/auth.json 与 ~/.claude.json 生成无盐 SHA-256 跨设备归因哈希](../../evidence/03-identify-codex-claude.png)

![核心维护者 Julius 关闭 Issue #1397 并直言不会让用户更容易退出遥测](../../evidence/04-issue1397-no-optout.png)

![通过 147 项测试的社区遥测开关 PR #27077 被打上 unwanted 拒绝](../../evidence/extra/t3code-4-pr-27077-rejected.png)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 1 弹 · 226 万+ 阅读）](https://x.com/realchendahuang/status/2125153472450527440)
- [PR #174](https://github.com/pingdotgg/t3code/pull/174) · [Commit `3bdaa6e1`](https://github.com/pingdotgg/t3code/commit/3bdaa6e10046945ccc08264d2d6f3b81775efcb3) · [PR #15028](https://github.com/pingdotgg/t3code/pull/15028) · [PR #21506](https://github.com/pingdotgg/t3code/pull/21506)
- [Issue #1397](https://github.com/pingdotgg/t3code/issues/1397) · [Issue #4123](https://github.com/pingdotgg/t3code/issues/4123) · [PR #27077](https://github.com/pingdotgg/t3code/pull/27077)
- [`AnalyticsService.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/AnalyticsService.ts) · [`Identify.ts`](https://github.com/pingdotgg/t3code/blob/main/apps/server/src/telemetry/Identify.ts) · [`telemetryId.ts`](https://github.com/pingdotgg/t3code/blob/main/packages/shared/src/telemetryId.ts)
- [事后补丁 PR #42299](https://github.com/pingdotgg/t3code/pull/42299) · [PR #42465](https://github.com/pingdotgg/t3code/pull/42465) · [PR #42630](https://github.com/pingdotgg/t3code/pull/42630) · [PR #42629](https://github.com/pingdotgg/t3code/pull/42629)
- [深度技术卷宗 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
