# #02 · SQLite 假“永久删除”撑爆 41.6 GB 硬盘与每 5 秒全机进程命令行扫描

> 侧边栏点击“永久删除”根本不删历史数据，导致本地 `statev2.sqlite` 膨胀至 41.6 GB；后台 Rust 监控程序每 5 秒无开关扫描全机所有进程与完整命令行参数。

<!-- section:claim -->
## 官方 / Theo 宣称

- 侧边栏删除确认框（`useThreadActionMenu.ts`）明确告知用户：*"This permanently clears conversation history for this thread."*（这将永久清除该对话的全部历史记录）。
- 将 T3 Code 宣传为轻量、高效的本地开发工作台。

<!-- section:evidence -->
## 源码与公开记录铁证

- **假“永久删除”撑爆硬盘（`Issue #17845`、`#28903`）：** 基线版本 `9d3195b4` 点击删除时，仅在 `statev2.sqlite` 里追加一条 `"thread.deleted"` 标记事件，所有敏感聊天、工具输出与推理过程纹丝不动留在硬盘里。多位用户实测数据库 3 周涨到 **25.9 GB**（90% 为“已删除”对话）、6 周涨到 **41.6 GB**、7 周涨到 **33 GB**。
- **每 5 秒全机扫描进程与明文命令行（`Issue #11222`、`PR #41889`）：** 后台 Rust 辅助程序 `t3-resource-monitor`（`native/resource-monitor/src/main.rs`）即便关闭诊断面板，也每 5 秒调用 `ProcessesToUpdate::All` 与 `with_cmd(UpdateKind::Always)`，在 Windows 上对 440+ 个无关软件/游戏持有近 300 个常驻句柄且无开关。11 月 24 日 [`PR #41889`](https://github.com/pingdotgg/t3code/pull/41889) 证实诊断快照一直在采集**完整进程命令行**（常含明文 API Key、数据库密码与令牌）。
- **泄露内网主机名与强制联网拉取：** 前端图标请求将企业内网主机名（如 `devbox.localdomain`）发往 Google Favicon 服务（`PR #16950`、`PR #32657`）；服务端每次启动均无条件请求 `raw.githubusercontent.com` 拉取兼容清单，无任何禁用选项（`Issue #36479`）。
- **1.7 倍额度空耗与 136 倍异常功耗：** 通过 Agent SDK 驱动 Claude 曾以正常速率 **1.7 倍**消耗 5 小时配额（`Issue #7338`、`#24649`，81 条评论）；GPU 缺陷导致功耗高达同类 Electron 应用的 **136 倍**，MacBook GPU 被顶死在 **60W**（78 分钟耗光电量），关掉网页标签后仍持续耗电 **18W**（`Issue #3143`、`#40581`）。

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **部分修补：** [`PR #42119`](https://github.com/pingdotgg/t3code/pull/42119) 新增异步 `thread-content.purge`（关闭 `#17845`）；[`PR #42577`](https://github.com/pingdotgg/t3code/pull/42577) 仅收窄了 Windows 进程读取范围。
- **仍未修复：** 若源对话仍被活跃分支、`merge_back` 或子代理引用，历史数据仍会保留，墓碑行仍留在 SQLite 中且缩减体积需离线手动执行 `VACUUM`；Linux 与 macOS 依旧保持 `ProcessesToUpdate::All` 全机发现，`PR #41889` 仍未合并。

<!-- section:visuals -->
## 一手实证原图

![Issue #17845 证实所谓永久删除对话仍留在 statev2.sqlite 中，将硬盘撑爆至数十 GB](../../evidence/10-issue17845-fake-delete.png)

![Issue #11222 记录 t3-resource-monitor 每 5 秒扫描整台电脑所有进程](../../evidence/extra/t3code-9-issue-11222-process-spy.png)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 2 弹）](https://x.com/realchendahuang/status/2125160473176023486)
- [Issue #17845](https://github.com/pingdotgg/t3code/issues/17845) · [Issue #28903](https://github.com/pingdotgg/t3code/issues/28903) · [PR #42119](https://github.com/pingdotgg/t3code/pull/42119)
- [Issue #11222](https://github.com/pingdotgg/t3code/issues/11222) · [PR #41889](https://github.com/pingdotgg/t3code/pull/41889) · [PR #42577](https://github.com/pingdotgg/t3code/pull/42577)
- [Issue #36479](https://github.com/pingdotgg/t3code/issues/36479) · [Issue #24649](https://github.com/pingdotgg/t3code/issues/24649) · [Issue #40581](https://github.com/pingdotgg/t3code/issues/40581)
- [深度技术卷宗 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
