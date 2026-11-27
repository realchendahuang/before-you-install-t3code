# #07 · Managed Policy 谎言：自吹“全行业最好一键关闭”，自家文档打脸四大盲区

> @theo 宣称 T3 Code 拥有全行业最好的企业 Managed Policy、“轻而易举关闭全部遥测”，却被自家官方文档 `docs/user/telemetry.md` 与 `docs/user/managed-policy.md` 逐条证伪。

<!-- section:claim -->
## 官方 / Theo 宣称

- 11 月 24 日 19:13 CST，`@theo` 驳斥缺少关闭开关的质疑：*"We have the best corporate managed policy system in the game, trivial to set up and turn off all telemetry. 100x easier than tools like cursor."*（[`2125186071357251715`](https://x.com/theo/status/2125186071357251715)）。
- 半小时后，他又声称对话数据 *"never touches any of our servers"*（[`2125191784859115766`](https://x.com/theo/status/2125191784859115766)）。

<!-- section:evidence -->
## 源码与公开记录铁证

T3 Code 自己的官方文档（[`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md) 与 [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md)）白纸黑字列出四个硬伤：

- **仅限系统管理员部署（无个人设置开关）：** 桌面端设置里压根没有关闭开关。Managed Policy 强制要求通过 MDM/GPO 或管理员保护路径（`/Library/Application Support/T3Code/policy.json`、`C:\Program Files\T3Code\policy.json` / `HKLM\SOFTWARE\Policies\T3Tools\T3Code` 或 `/etc/t3code/policy.json`）部署，普通无 root 权限用户根本无权配置。
- **官方网页版（`app.t3.codes`）彻底免疫策略：** 浏览器端无视服务端环境变量与 Managed Policy，若构建带追踪则持续上报连接日志，文档明写 *"has no relay tracing toggle"*（没有中继追踪开关）。
- **移动端不受服务端策略控制：** 文档明确承认服务端环境变量与 Managed Policy *"do not disable mobile tracing"*（无法关闭移动端追踪）。
- **`Publish agent activity` 无视遥测退出：** 该功能会将项目名、对话标题、模型名与实时状态发往 T3 Connect，且文档直白写明 *"The telemetry opt-out does not disable it."*；同时失败的 Axiom 追踪与崩溃日志 *"can quote a value the app was handling"*，`Agent feedback` 还可附带高达 16 KB 对话正文。

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **仍未修复：** 通宵合入的 [`PR #42415`](https://github.com/pingdotgg/t3code/pull/42415) 仅给移动端加了单独开关，Managed Policy 依然管不了移动端，`app.t3.codes` 仍无任何开关，`Publish agent activity` 依然无视遥测退出，桌面端依然没有 UI 开关。

<!-- section:visuals -->
## 一手实证原图

![官方文档 docs/user/telemetry.md 证实 app.t3.codes 无开关、移动端与 Publish agent activity 不受退出限制](../../evidence/05-telemetry-cant-disable.png)

![官方文档 docs/user/managed-policy.md 列出三大系统管理员保护路径](../../evidence/extra/p5-4-doc-managed-policy-paths.png)

![Theo 11 月 24 日发帖宣称 Managed Policy 可轻而易举关闭全部遥测](../../evidence/extra/p5-1-x-theo-managed-policy.png)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 7 弹）](https://x.com/realchendahuang/status/2125391659492081947)
- [`docs/user/telemetry.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/telemetry.md) · [`docs/user/managed-policy.md`](https://github.com/pingdotgg/t3code/blob/main/docs/user/managed-policy.md)
- [`@theo` 吹嘘 Managed Policy（`2125186071357251715`）](https://x.com/theo/status/2125186071357251715) · [`@theo` 宣称数据从不碰服务器（`2125191784859115766`）](https://x.com/theo/status/2125191784859115766)
- [PR #42415](https://github.com/pingdotgg/t3code/pull/42415) · [深度技术卷宗 01](../../docs/dossiers/01-telemetry-and-gdpr-timeline.md)
