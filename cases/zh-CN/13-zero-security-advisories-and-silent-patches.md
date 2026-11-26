# #13 · GitHub 安全公告始终为 0，却静默修复多个高危漏洞并仓促改写 `SECURITY.md`

> 一边把中文技术圈源码审计骂成“粪坑”，一边悄悄合入密钥目录路径穿越、跨域名令牌泄露、未隔离预览与陌生仓库自动执行等高危修复——却连一条提醒老用户升级的 GitHub Security Advisory 都不发。

<!-- section:claim -->
## 官方 / Theo 宣称

- 11 月 24 日，`@theo` 在 X 上攻击中文技术圈是 *"the biggest fucking cesspit"*，并辱骂相信中文源码审计的开发者（[`2125177503526588877`](https://x.com/theo/status/2125177503526588877)）。
- 仓促修订的 `SECURITY.md`（`PR #38812`、`#41942`）试图将越权文件读取与明文传输定义为“预期边界”。

<!-- section:evidence -->
## 源码与公开记录铁证

- **0 条已发布 GitHub 安全公告：** 截至 `ca81b7b9`，`pingdotgg/t3code` 的 [GitHub Security Advisories](https://github.com/pingdotgg/t3code/security/advisories) 列表仍为 **0 条**，现网老版本用户收不到任何正式 CVE 或升级警报。
- **悄悄合入的一连串高危安全补丁：**
  - [`PR #39483`](https://github.com/pingdotgg/t3code/pull/39483)：在设备审批前通过中继 `jti`/`nonce` 触发的 `ServerSecretStore` 路径穿越漏洞。
  - [`PR #41756`](https://github.com/pingdotgg/t3code/pull/41756)：企业级 GitHub/GitLab 跨域名令牌泄露。
  - [`PR #41757`](https://github.com/pingdotgg/t3code/pull/41757) 与 [`PR #42386`](https://github.com/pingdotgg/t3code/pull/42386)：无沙盒桌面浏览器预览隔离及 worktree 布局命令确认。
  - [`PR #42413`](https://github.com/pingdotgg/t3code/pull/42413)：将桌面端 Clerk 令牌文件权限收窄为仅属主可读。
  - [`PR #42504`](https://github.com/pingdotgg/t3code/pull/42504)：近 3,000 行大补丁，终于在执行陌生仓库配置命令前加上弹窗确认（另有 `#22190`、`#37823`、`#39464`、`#39480`、`#40133`、`#41886` 等静默修复）。
- **依然悬而未决的本地漏洞：** [`Issue #26489`](https://github.com/pingdotgg/t3code/issues/26489)（外部路径穿越/软链接）与 [`PR #30997`](https://github.com/pingdotgg/t3code/pull/30997)（Windows `externalLauncher.ts` 调用 `powershell.exe -ExecutionPolicy Bypass -EncodedCommand <base64>` 触发 AVG/Avast 报毒 `IDP.HELU.PSE96`）均未合并。
- **用 `SECURITY.md` 甩锅而非加固架构：** 明文将工作区外的全盘 `filesystem:read`、iOS/局域网明文 HTTP 传输，以及中继签名密钥失守导致整机接管划为“预期设计边界”，拒绝视为漏洞。

<!-- section:status -->
## 上游最新状态（`ca81b7b9`）

- **仍未修复：** 已发布 GitHub Security Advisories 仍为 **0 条**；`Issue #26489` 与 `PR #30997` 仍未合入；`SECURITY.md` 仍维持上述宽松边界声明。

<!-- section:visuals -->
## 一手实证原图

![PR #39483 静默修复 ServerSecretStore 路径穿越漏洞却未发布任何安全公告](../../evidence/extra/t3code-13-pr-39483-secret-traversal.png)

![PR #30997 记录 Windows 端 Base64 编码 PowerShell 启动方式被杀软报毒，至今未合入](../../evidence/extra/t3code-14-pr-30997-powershell-av.png)

![SECURITY.md 明确将全盘读取、iOS 明文 HTTP 与中继密钥接管主机划为“预期边界”](../../evidence/extra/x-post05-4-security-md-intended.jpg)

<!-- section:sources -->
## 可核验原始来源

- [X 调查原帖（第 13 弹）](https://x.com/realchendahuang/status/2125395980354994414)
- [GitHub Security Advisories（0 条）](https://github.com/pingdotgg/t3code/security/advisories) · [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/main/SECURITY.md)
- [PR #39483](https://github.com/pingdotgg/t3code/pull/39483) · [PR #41756](https://github.com/pingdotgg/t3code/pull/41756) · [PR #41757](https://github.com/pingdotgg/t3code/pull/41757) · [PR #42386](https://github.com/pingdotgg/t3code/pull/42386) · [PR #42413](https://github.com/pingdotgg/t3code/pull/42413) · [PR #42504](https://github.com/pingdotgg/t3code/pull/42504)
- [Issue #26489](https://github.com/pingdotgg/t3code/issues/26489) · [PR #30997](https://github.com/pingdotgg/t3code/pull/30997) · [深度技术卷宗 02](../../docs/dossiers/02-local-safety-and-security-audit.md)
