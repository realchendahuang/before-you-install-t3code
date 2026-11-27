# Temu3 Code — 安装 T3 Code 之前

<p align="center">
  <em>面向 pingdotgg/t3code 的独立公共调查档案 —— 用一手源码、截图与量化数据，完整记录种族歧视双标、隐秘遥测、高危产品缺陷与商业操弄始末。</em>
</p>

<p align="center">
  <a href="https://temu3code.com/?lang=zh-CN"><strong>🌐 temu3code.com 主站</strong></a> ·
  <a href="https://temu3code.com/mail/?lang=zh-CN"><strong>✉ Tmail 邮件门</strong></a> ·
  <a href="https://temu3code.com/?lang=zh-CN#x-receipts"><strong>📸 12 张一手 X 原图</strong></a> ·
  <a href="https://temu3code.com/memes/?lang=zh-CN"><strong>🃏 61 张梗图库</strong></a>
</p>
<p align="center">
  <a href="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml"><img src="https://github.com/realchendahuang/temu3code/actions/workflows/verify.yml/badge.svg" alt="Repository Verification CI" /></a> ·
  <a href="../EVIDENCE-INDEX.md"><strong>109 张原图</strong></a> ·
  <a href="../COMPLETE-SOURCE-INDEX.md"><strong>327 条信源</strong></a>
</p>

<p align="center">
  <strong>全部 18 种语言：</strong><br />
  <a href="../../README.md">English</a> ·
  <a href="./README.zh-CN.md"><strong>简体中文</strong></a> ·
  <a href="./README.zh-TW.md">繁體中文</a> ·
  <a href="./README.fr.md">Français</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a> ·
  <a href="./README.ar.md">العربية</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.de.md">Deutsch</a> ·
  <a href="./README.pt-BR.md">Português</a> ·
  <a href="./README.it.md">Italiano</a> ·
  <a href="./README.nl.md">Nederlands</a> ·
  <a href="./README.pl.md">Polski</a> ·
  <a href="./README.tr.md">Türkçe</a> ·
  <a href="./README.vi.md">Tiếng Việt</a> ·
  <a href="./README.id.md">Bahasa Indonesia</a> ·
  <a href="./README.hi.md">हिन्दी</a>
</p>

![安装 T3 Code 之前](../../evidence/00-cover-zh.png)

> [!IMPORTANT]
> **独立公共调查档案 · 全球 18 语种**
>
> 零遥测、反对种族主义与种族歧视。本档案每一项指控均锚定公开原话、源码行号、PR/Commit 记录、USPTO 官方数据库与归档原图，接受全球开发者公开复核。
>
> - **核验罪证:** 20 项完整罪证（#00–#19）
> - **一手素材:** 109 张实证原图 · 327 条原始链接
> - **代码追踪:** [`9d3195b4`](https://github.com/pingdotgg/t3code/commit/9d3195b49dfb0098e9fa592fe0ada5464206d1c2) → [`ca81b7b9`](https://github.com/pingdotgg/t3code/commit/ca81b7b97a1c4b91e5ac25768d0f6629f37732fd) (`+259` commits · 2026-11-25 14:49 CST)
> - **安全公告:** 0 条 GitHub Security Advisories

---

## 60 秒看懂整件事的来龙去脉

一场针对中国开发者开源 MIT 二改的歧视性辱骂与封号威胁，引发了全球开发者对 T3 Code 源码、商业账本与历史言行的全面起底。

1. **歧视性导火索与赤裸双标** *(2026-11-23)* — 有网友将中国开发者的免费 MIT 二改误认为官方客户端，@theo 10 分钟内连发两帖辱骂其为「Chinese knockoff」「Temu3 Code」并威胁找 GitHub 封号——此时他名下 USPTO 注册商标为 0；不到 11 小时后，他又表态欢迎万亿美元美国大厂照抄 MIT 代码。
2. **源码开盖：产品劣质全面曝光** *(2026-11-24)* — 逐行审计 pingdotgg/t3code 源码发现：官网挂着「No telemetry」期间默认启用 PostHog 并经闭源 ingest.t3.codes 留存原始数据、偷读 ~/.codex 与 ~/.claude.json 做无盐哈希、41.6 GB 假删除、52 天不修的静默 git push --force、伪造 Google Antigravity 请求头导致封号，以及零端到端加密的明文 T3 Connect。
3. **226 万阅读、欧盟 GDPR 举报与 6 小时通宵自爆** *(11-24 晚至 11-25 晨)* — 第 1 弹在 X 上突破 226 万阅读并引发欧盟 GDPR 正式举报。团队 6 小时通宵急救 PR 意外自曝：中继服务每小时向 Axiom 发送 220 万条含真实 IP 和 UA 的日志存 30 天、泄露 git.cwd 绝对路径、删号不删库、Win/Mac 退出开关长期失效。
4. **核心架构隐患至今仍未解决** *(11-25（ca81b7b9）及持续追踪)* — 持续复核 259 个新提交至 ca81b7b9 证实：虽然修补了部分舆论焦点，但启动先写本地追踪 ID、零 UI 关闭按钮、0 条安全公告、任意仓库点星漏洞，以及第 19 项查实的局域网 30 天明文 shell Cookie、不可吊销 Bearer 与陌生仓库暴露 SSH_AUTH_SOCK 全部依然存在。

---

## 全部 20 项核验罪证一览（#00–#19）

以下每条罪证均直达本仓库对应的清爽独立图文页，以及可视化网页端专属分享卡片。本仓库将持续追踪并按 #20、#21… 顺延更新。

### 第一卷 · 种族歧视、双重标准与惯犯实录

*从零商标却以「Chinese knockoff」「Temu3 Code」威胁封杀中国开发者，到 1,151 条推文量化实证（对大厂 VIP 0.0% 粗口 vs 普通开发者 8.0% vs 辱华危机期暴涨至 14.4%），再到过去两年的反复惯行。*

- **#00 · [起因导火索：“偷我们的代码”、Fork 封号威胁与赤裸双标](../../cases/zh-CN/00-origin-fork-dispute-and-double-standard.md)** — `📌 事实留档`
  11 分钟内，@theo 连发两帖将一名中国开发者的免费 MIT 二改辱骂为「Chinese knockoff」「Temu3 Code」并威胁找 GitHub 封掉其账号；不到 11 小时后，他又公开表态欢迎万亿美元美国大厂照抄 MIT 代码。
  [查看完整图文档案](../../cases/zh-CN/00-origin-fork-dispute-and-double-standard.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-23-origin-temu3-threat&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125062675147448475)
- **#14 · [1,151 条连续推文量化铁证：对大厂 VIP 0.0% 粗口 vs 辱华危机期暴涨 4.0 倍](../../cases/zh-CN/14-1151-tweet-quantitative-double-standard.md)** — `📌 事实留档`
  对 2026 年 11 月 7 日至 24 日 @theo 全部 1,151 条连续推文做穷举量化审计，坐实了赤裸的权力看人下菜碟：面对 20 位大厂高管与员工 0.0% 粗口，面对普通开发者 8.0% 敌意，而在中文二改 25 小时窗口内人身攻击暴涨 4.0 倍至 14.4%。
  [查看完整图文档案](../../cases/zh-CN/14-1151-tweet-quantitative-double-standard.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-19-selective-politeness-vips&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125404517697290438)
- **#15 · [威胁 GitHub 封号时 USPTO 注册商标为 0，17 小时后紧急补写 `TRADEMARK.md`](../../cases/zh-CN/15-zero-uspto-trademarks-and-retroactive-policy.md)** — `📌 事实留档`
  当 @theo 威胁找 GitHub 封杀中国开发者账号并指控对方“侵犯商标”时，T3 Tools Inc. 名下对 `T3 Code`、`T3 Tools` 与 `T3 Connect` 的 USPTO 注册商标全部为 0——直到 17 小时后他才仓促补合了一份 `TRADEMARK.md`。
  [查看完整图文档案](../../cases/zh-CN/15-zero-uspto-trademarks-and-retroactive-policy.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-24-retroactive-trademark-blocker&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125408163273080950)
- **#16 · [两年反复惯犯实录：印度开发者网暴道歉、$20,000 FFmpeg 悬赏与凌晨威胁闭源后删推](../../cases/zh-CN/16-two-year-pattern-of-bullying-and-deletions.md)** — `📌 事实留档`
  2026 年 11 月针对中国开发者的辱骂绝非偶发失言——2024 至 2026 年的公开记录完整勾勒出一套反复上演的行为闭环：挑起国籍敌意、霸凌开源维护者、嘲讽他人界面博流量，事发后删帖撤回。
  [查看完整图文档案](../../cases/zh-CN/16-two-year-pattern-of-bullying-and-deletions.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2025-10-ffmpeg-bounty&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125408843152953693)

### 第二卷 · 隐秘遥测与隐私欺骗

*拆穿「No telemetry」首页承诺背后的默认上报、闭源网关 ingest.t3.codes 留存、跨工具凭证读取、Managed Policy 三大盲区，以及 GDPR 举报后自曝的每小时 220 万条 IP 日志。*

- **#01 · [官网挂着「零遥测」承诺却默认全量上报、偷读跨工具凭证并连拒四个关闭开关 PR](../../cases/zh-CN/01-default-telemetry-and-cross-tool-tracking.md)** — `🟡 部分修补`
  在官网白纸黑字写着「No telemetry. Unless you opt in. Full stop.」期间，T3 Code 默认启用 PostHog 遥测并经闭源网关 `ingest.t3.codes` 留存原始数据，悄悄读取 `~/.codex` 与 `~/.claude.json` 做无盐哈希跨设备归因，还拒绝了社区白送的四个关闭开关 PR。
  [查看完整图文档案](../../cases/zh-CN/01-default-telemetry-and-cross-tool-tracking.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-03-06-pr174-default-telemetry&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125153472450527440)
- **#07 · [Managed Policy 谎言：自吹“全行业最好一键关闭”，自家文档打脸四大盲区](../../cases/zh-CN/07-managed-policy-blind-spots.md)** — `🔴 仍未修复`
  @theo 宣称 T3 Code 拥有全行业最好的企业 Managed Policy、“轻而易举关闭全部遥测”，却被自家官方文档 `docs/user/telemetry.md` 与 `docs/user/managed-policy.md` 逐条证伪。
  [查看完整图文档案](../../cases/zh-CN/07-managed-policy-blind-spots.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125391659492081947)
- **#11 · [11 月 25 日澄清长文 2 小时内被自家通宵 PR 与 100 MB 导出包三连打脸](../../cases/zh-CN/11-nov25-clarification-contradicted-in-2-hours.md)** — `🟡 部分修补`
  11 月 25 日早晨，@theo 发长文拍胸脯作出三项隐私保证并放出 100 MB 遥测导出包——不到两小时，全部三项说法均被自家团队通宵合入的 PR 与导出包原始数据正面证伪。
  [查看完整图文档案](../../cases/zh-CN/11-nov25-clarification-contradicted-in-2-hours.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125394810559426993)
- **#12 · [欧盟 GDPR 举报后 6 小时通宵自爆：每小时 220 万条 IP 日志与删号不删库](../../cases/zh-CN/12-post-gdpr-overnight-blitz-2m-ip-logs.md)** — `🟡 部分修补`
  11 月 24 日晚有人向欧盟提起正式 GDPR 举报后，团队在 6 小时内通宵合入的一连串急救补丁，反手把藏得更深的四笔隐私旧账抖了个底朝天——其中仅 Axiom 一项就曾每小时记录 220 万条真实 IP 与 UA，保存整整 30 天。
  [查看完整图文档案](../../cases/zh-CN/12-post-gdpr-overnight-blitz-2m-ip-logs.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-25-gdpr-overnight-collapse&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125395501663281198)

### 第三卷 · 产品劣质与高危安全漏洞

*41.6 GB SQLite 假删除、全机进程与命令行扫描、52 天静默 force push、伪装 Google Antigravity 致新号 3 分钟封禁、T3 Connect 明文零加密、0 条安全公告，以及 ca81b7b9 局域网/认证/SSH_AUTH_SOCK 重大漏洞。*

- **#02 · [SQLite 假“永久删除”撑爆 41.6 GB 硬盘与每 5 秒全机进程命令行扫描](../../cases/zh-CN/02-fake-sqlite-delete-and-process-scanner.md)** — `🟡 部分修补`
  侧边栏点击“永久删除”根本不删历史数据，导致本地 `statev2.sqlite` 膨胀至 41.6 GB；后台 Rust 监控程序每 5 秒无开关扫描全机所有进程与完整命令行参数。
  [查看完整图文档案](../../cases/zh-CN/02-fake-sqlite-delete-and-process-scanner.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-10-28-fake-delete-process-spy&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125160473176023486)
- **#03 · [拖延 52 天不修的静默 `git push --force` vs 21 小时撤除隐私过滤](../../cases/zh-CN/03-silent-force-push-vs-21h-filter-removal.md)** — `🔴 仍未修复`
  会直接冲毁主分支的 Claude Auto 静默强推漏洞拖了 52 天以上无人修复；但为了让私有模型登上 @theo 的公开排行榜，团队仅用 21 小时就撤掉了模型隐私白名单。
  [查看完整图文档案](../../cases/zh-CN/03-silent-force-push-vs-21h-filter-removal.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-10-03-issue15353-force-push&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125201882687881378)
- **#04 · [伪装 Google Antigravity 内部请求头、伪造 `SSH_CONNECTION` 与新号 3 分钟封禁](../../cases/zh-CN/04-antigravity-spoofing-and-3-minute-bans.md)** — `🔴 仍未修复`
  官网 FAQ 白纸黑字担保符合 Google Antigravity 服务条款；源码却提取系统钥匙串令牌、伪造 `antigravity/hub/2.24.0` 直连 `v1internal` 内部接口并注入假 `SSH_CONNECTION`，导致全新 $20 付费账号 3 分钟被封。
  [查看完整图文档案](../../cases/zh-CN/04-antigravity-spoofing-and-3-minute-bans.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-22-antigravity-spoof-3min-ban&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125213397507858657)
- **#05 · [T3 Connect 零端到端加密：所有提示词、源码与终端明文经过 T3 自有网关](../../cases/zh-CN/05-t3-connect-zero-e2e-plaintext-relay.md)** — `🔴 仍未修复`
  通过 T3 Connect 远程连电脑时，没有任何端到端加密——所有对话、源代码与终端输出都在 T3 控制的 Cloudflare 或 OVH Caddy 网关上明文终结，且新设备审批默认关闭。
  [查看完整图文档案](../../cases/zh-CN/05-t3-connect-zero-e2e-plaintext-relay.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-24-managed-policy-plaintext-relay&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125218189596676555)
- **#13 · [GitHub 安全公告始终为 0，却静默修复多个高危漏洞并仓促改写 `SECURITY.md`](../../cases/zh-CN/13-zero-security-advisories-and-silent-patches.md)** — `🔴 仍未修复`
  一边把中文技术圈源码审计骂成“粪坑”，一边悄悄合入密钥目录路径穿越、跨域名令牌泄露、未隔离预览与陌生仓库自动执行等高危修复——却连一条提醒老用户升级的 GitHub Security Advisory 都不发。
  [查看完整图文档案](../../cases/zh-CN/13-zero-security-advisories-and-silent-patches.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125395980354994414)
- **#19 · [`ca81b7b9` 重大认证与代码执行漏洞：局域网 30 天明文 Shell、不可吊销令牌与 `SSH_AUTH_SOCK` 裸奔](../../cases/zh-CN/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md)** — `🔴 仍未修复`
  锁定最新上游提交 `ca81b7b9`（11 月 25 日 14:49 CST）逐行核验，证实五项现网高危安全与底层缺陷：同局域网抓一个包即可白拿一个月完整终端控制权、30 天裸 Bearer 无法自注销、5 分钟可重放 `?wsTicket=`、`isIPv4` 掐断 `::1` 隧道，以及打开陌生仓库直接把整机 `SSH_AUTH_SOCK` 与 `GITHUB_TOKEN` 暴露出去。
  [查看完整图文档案](../../cases/zh-CN/19-ca81b7b9-lan-cookie-bearer-ws-and-repo-rce.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-25-ca81b7b9-active-vulns&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125494234614788390)

### 第四卷 · 商业操弄、利益冲突与社区霸凌

*自掏 80 万美元打造日跑 31.7 万亿 token 算力雷达的商业账本、Vibe Kanban/Daytona 投资冲突、赞助商绑定、发呆 30 秒动用宿主机凭据刷出 7.7 万星、派 @bot 扒人 Fork 与拉黑机制。*

- **#06 · [天使投资人利益冲突：公开嘲讽被投企业 Vibe Kanban 倒闭与 Daytona 重叠](../../cases/zh-CN/06-angel-investor-conflicts-vibe-kanban-daytona.md)** — `📌 事实留档`
  除代码漏洞外，@theo 本人的公开推文暴露了其作为天使投资人与 T3 Code 作者之间的严重角色边界冲突。
  [查看完整图文档案](../../cases/zh-CN/06-angel-investor-conflicts-vibe-kanban-daytona.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-16-vibe-kanban-daytona&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125385742243520653)
- **#08 · [自掏 80 万美元的真实账本：日跑 31.7 万亿 Token（$10.19M/天）算力雷达](../../cases/zh-CN/08-800k-spend-and-31t-token-radar.md)** — `📌 事实留档`
  默认开启的遥测绝非“顺手统计人数”：它为 @theo 撑起了一台日跑 31.7 万亿 Token（折合日消耗 1,019 万美元 API）的实时行业雷达，并直接换取超 30 万美元 OpenAI 免费内测额度与 VC 接洽。
  [查看完整图文档案](../../cases/zh-CN/08-800k-spend-and-31t-token-radar.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-18-31t-token-radar&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125392410763239723)
- **#09 · [内部日均 500 提交与 `yolo merges` vs 对外劝退贡献者、公开拉黑与辱骂用户](../../cases/zh-CN/09-yolo-merges-vs-community-hostility.md)** — `📌 事实留档`
  对内靠 700 个 Agent 每天狂推 500 个提交、自承 `yolo merges` 经常搞炸代码；对外却在 `CONTRIBUTING.md` 写“劝你别来”、用 `.github/VOUCHED.td` 公开拉黑、删核心功能并在 Issue 里直接辱骂反馈用户。
  [查看完整图文档案](../../cases/zh-CN/09-yolo-merges-vs-community-hostility.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-09-issue33639-bermudi-insult&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125392916369871309)
- **#10 · [公开派 `@bot` 30 秒扒社区女开发者 Fork 抄功能、却嘲讽竞品抄袭并动用拉黑机器人](../../cases/zh-CN/10-fork-scraping-bot-and-critics-suppression.md)** — `📌 事实留档`
  一边嘲讽竞品抄自己的界面设计，一边对独立开发者的 Fork 回一句「Okay I'm stealing this」并在 30 秒后公开派 `@bot` 扒取对方代码；对批评者则煽动打社区笔记断其收益，并启用自动批量拉黑机器人。
  [查看完整图文档案](../../cases/zh-CN/10-fork-scraping-bot-and-critics-suppression.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-08-stealing-miaai-fork&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125393641665671593)
- **#17 · [赞助商深度绑定、带头白嫖 Codex 0% 漏洞与 10 账号 `CLIProxyAPI` 双标](../../cases/zh-CN/17-sponsor-stack-and-quota-exploit-hypocrisy.md)** — `📌 事实留档`
  嘴上讲技术中立与遵守条款、以封号风险拒绝内置切号；背地里 T3 云端架构绑着自家 YouTube 赞助商（Clerk/Axiom），本人更带头刷爆 Codex 0% 额度漏洞并公开发布 10 账号池化 `CLIProxyAPI` 教程直接挂进官方 FAQ。
  [查看完整图文档案](../../cases/zh-CN/17-sponsor-stack-and-quota-exploit-hypocrisy.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2023-05-sponsor-roster&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125411353393553744)
- **#18 · [25 天冲出 7.7 万星的秘密：发呆 30 秒弹窗动用宿主机 GitHub 凭据后台点星与未修漏洞](../../cases/zh-CN/18-77k-star-funnel-and-arbitrary-repo-starring.md)** — `🔴 仍未修复`
  痛批 GitHub Star 沦为“忽悠 VC 投资的工具”仅半年后，@theo 自写自合了发呆 30 秒弹窗并直接动用宿主机 `gh` CLI / `GH_TOKEN` 后台发 API 点星，25 天从 3 万星冲到 7.7 万星（仅约 129 名 watcher），更把任意仓库点星漏洞晾了 19 天未修。
  [查看完整图文档案](../../cases/zh-CN/18-77k-star-funnel-and-arbitrary-repo-starring.md) · [可视化证据卡](https://temu3code.com/mail/?thread=2026-11-02-pr29922-77k-stars&lang=zh-CN) · [查看 X 原帖](https://x.com/realchendahuang/status/2125416210120765799)

---

## 核心镇楼实证

![#00 Origin GitHub takedown threat](../../evidence/01-origin-theo-threat.png)

![#01 Commit 3bdaa6e1 deleting No telemetry promise](../../evidence/02-no-telemetry-removed.png)

![#14 1,151-tweet selective politeness chart](../../evidence/25-double-standard-chart-zh.png)

![#19 ca81b7b9 plaintext --lan cookie without Secure](../../evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png)

---

## 2 分钟止损与清理操作手册

如果电脑已经安装了 T3 Code，切勿仅靠环境变量：ca81b7b9 仍会在检查开关前落盘本地追踪 ID，且桌面端仍漏传 OTEL_SDK_DISABLED。请同步组合环境变量、hosts 屏蔽、离线数据库压缩与令牌吊销。

- [ ] 同时配置 DO_NOT_TRACK=1 与传统遥测关闭变量，并在 /etc/hosts 中屏蔽闭源采集网关 ingest.t3.codes。
- [ ] 彻底退出 T3 Code，检查 statev2.sqlite 体积并执行离线 VACUUM;，或直接清理 ~/.t3 目录。
- [ ] 立即停止在 T3 Code 托管目录下使用个人 Google AI / Antigravity 付费订阅，保住唯一申诉机会。
- [ ] 关闭 Publish agent activity、解绑所有 T3 Connect 设备、申请 Clerk 与中继数据删除，并到 GitHub 吊销 T3 Code 授权。
- [ ] 严禁裸跑明文 t3 up --lan；勿将 30 天裸 Bearer 放入 CI；打开陌生仓库前清空 SSH_AUTH_SOCK 与 GITHUB_TOKEN。

```bash
# macOS / Linux: combine DO_NOT_TRACK=1 with legacy flags + /etc/hosts sinkhole
export DO_NOT_TRACK=1
export T3CODE_TELEMETRY_ENABLED=false
export T3CODE_OTEL_SDK_DISABLED=true
export OTEL_SDK_DISABLED=true
sudo sh -c 'printf "\n127.0.0.1 ingest.t3.codes\n::1 ingest.t3.codes\n" >> /etc/hosts'

# Quit T3 Code first, then compact statev2.sqlite or clean local directories
sqlite3 ~/.t3/userdata/statev2.sqlite "VACUUM;"
rm -rf ~/.t3/userdata/providers/antigravity/ ~/.t3/tools/antigravity-acp/
```

**社区推荐替代客户端:** 开发者重点推荐了 Mirasim（@Mirasim_ADE）、Paseo（@paseo_sh）、Paradev（@ParadevAI）、Cloudroom、Conductor、Emdash 与 Orca。切换前请核验：默认关闭遥测、真正删除本地对话、严格调用官方 CLI 不伪装请求头、远程隧道具备客户端端到端加密。

---

## 社区证言与独立投稿（与一手铁证分栏隔离）

主档案 #00–#19 严格限定为公开可核验的源码、PR、官方注册记录与公开原帖。社区长评与私信控诉单独列于本区，确保主证据链的最高公信力。

- **Issue #1 · 《对 Theo 的指控》（@opserx 投稿）** — 2026 年 11 月 25 日由社区成员提交至本仓库的长篇公开评述完整留档，并附带对 PR #42450 与 PR #41237 的精确信源勘误注记。 ([阅读 Issue #1 完整归档](../community/issue-1-the-case-against-theo.md))
- **开发者私信控诉与持续线索征集** — 事件曝光后，多位开发者通过私信发来了自己与 @theo 或 T3 Code 相关的经历与线索。为坚持最高核验纪律，未经公开第三方实证复核的私信内容不混入 #00–#19 主编号库。欢迎附带公开链接通过 PR 或 Issue 提交新铁证或官方修复进展。 ([查看投稿与核验规范](../../CONTRIBUTING.md))

---

## 深度技术卷宗与全量总索引

如需查阅逐行代码 diff、完整 SQL 语句与 327 条原始链接总表，可直接进入以下专家级底层档案：

- [Dossier 01 · Telemetry Architecture, Cross-Tool Stitching & GDPR Sprint](../dossiers/01-telemetry-and-gdpr-timeline.md)
- [Dossier 02 · Local Safety, Guardrail Bypasses & Undisclosed Security Patches](../dossiers/02-local-safety-and-security-audit.md)
- [Dossier 03 · Google Antigravity ToS Spoofing & T3 Connect Plaintext Relay](../dossiers/03-antigravity-tos-and-t3connect-relay.md)
- [Dossier 04 · Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel](../dossiers/04-business-ledger-sponsors-and-77k-stars.md)
- [Dossier 05 · Governance, Fork-Scraping Bots, USPTO Trademark Record & History](../dossiers/05-governance-trademark-and-history.md)
- [Dossier 06 · 1,151-Tweet Quantitative Forensic Dataset](../dossiers/06-tweet-forensic-dataset-1151.md)
- [109 张原图档案馆 (`docs/EVIDENCE-INDEX.md`)](../EVIDENCE-INDEX.md)
- [327 条一手信源 (`docs/COMPLETE-SOURCE-INDEX.md`)](../COMPLETE-SOURCE-INDEX.md)

### 持续追踪与社区共建

本仓库长期持续追踪更新。如发现新的一手铁证、上游确认修复了某项漏洞或改进任意语种翻译，欢迎附带公开一手链接提交 PR 或 Issue——详见 CONTRIBUTING.md。
