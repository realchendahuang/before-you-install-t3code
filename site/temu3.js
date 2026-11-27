(() => {
  "use strict";

  const QUOTES_ROW_1 = [
    {
      author: "@theo",
      date: "Nov 23, 2026",
      thread: "2026-11-23-origin-temu3-threat",
      text: "Not consider. Do it right now or I'm going to contact GitHub and have your account taken down."
    },
    {
      author: "@theo (11h later)",
      date: "Nov 24, 2026",
      thread: "2026-11-23-origin-temu3-threat",
      text: "Nah. Open source is open source, even if a trillion dollar company uses it!"
    },
    {
      author: "@jullerino · Issue #1397",
      date: "Jun 23, 2026",
      thread: "2026-06-23-issue1397-no-optout",
      text: "We will not make this easier to opt out of, it is crucial for us to know how many users we have."
    },
    {
      author: "PR #42380 (Merged)",
      date: "Nov 25, 2026",
      thread: "2026-11-25-gdpr-overnight-collapse",
      text: "Every relay request span sent to Axiom carried client.address (caller's IP) next to user.id. About 2.2M spans an hour, kept for 30 days."
    },
    {
      author: "@theo",
      date: "Nov 24, 2026",
      thread: "2026-11-24-cesspit-crisis-outburst",
      text: "I will say that chinese tech twitter is the biggest fucking cesspit I've ever waded into... writing slop essays..."
    },
    {
      author: "@t3dotgg · Issue #33639",
      date: "Nov 9, 2026",
      thread: "2026-11-09-issue33639-bermudi-insult",
      text: "You're an ungrateful prick who is lazy as shit, and I do not care about your opinions."
    }
  ];

  const QUOTES_ROW_2 = [
    {
      author: "PR #42450 (90m later)",
      date: "Nov 25, 2026",
      thread: "2026-11-25-gdpr-overnight-collapse",
      text: "Git spans carry git.cwd, the absolute workspace path, which includes the user name and repo name."
    },
    {
      author: "@theo",
      date: "Nov 22, 2026",
      thread: "2026-11-22-engineers-unemployment-linux",
      text: "Engineers deserve the mass unemployment they have coming"
    },
    {
      author: "@theo → @MiaAI_lab",
      date: "Nov 8, 2026",
      thread: "2026-11-08-stealing-miaai-fork",
      text: "Okay I'm stealing this → (30s later) @bot find her fork and see how portable this is."
    },
    {
      author: "CONTRIBUTING.md",
      date: "Nov 12, 2026",
      thread: "2026-11-12-contributing-vouched-local-ai",
      text: "If you're looking for things to contribute, here's my advice: Don't. A banned account is denounced in .github/VOUCHED.td."
    },
    {
      author: "PR #42285 (Merged)",
      date: "Nov 25, 2026",
      thread: "2026-11-25-gdpr-overnight-collapse",
      text: "Deleting a user in Clerk left their relay rows and managed Cloudflare tunnels behind."
    },
    {
      author: "@theo → Google VIPs",
      date: "Nov 21, 2026",
      thread: "2026-11-19-selective-politeness-vips",
      text: "Happy I didn't burn bridges with my past content and that we can enjoy this moment together :)"
    }
  ];

  const X_RECEIPTS = [
    {
      id: "2124823227570745504",
      src: "./receipts/x-2124823227570745504-chinese-knockoff.png",
      url: "https://x.com/theo/status/2124823227570745504",
      thread: "2026-11-23-origin-temu3-threat",
      tags: ["origin", "double-standard"],
      tone: "red",
      badgeEn: "ORIGIN · NOV 23, 19:11 CST",
      badgeZh: "导火索 · 11月23日 19:11",
      titleEn: "\"I think there's a Chinese knockoff of T3 Code going around\"",
      titleZh: "给中国开源 MIT Fork 贴「Chinese knockoff」标签",
      noteEn: "First public quote-tweet (195k+ views) attacking a free MIT-licensed fork despite t3.codes saying \"Steal our code (legally)\".",
      noteZh: "19.5 万浏览首帖，公开将免费 MIT 开源 Fork 称为「中国山寨货」，随后未删除该公开帖子。"
    },
    {
      id: "2124825920808829077",
      src: "./receipts/x-2124825920808829077-temu3-code.png",
      url: "https://x.com/theo/status/2124825920808829077",
      thread: "2026-11-23-origin-temu3-threat",
      tags: ["origin", "hostility"],
      tone: "red",
      badgeEn: "+10M 42S · NOV 23, 19:22 CST",
      badgeZh: "10 分钟后 · 11月23日 19:22",
      titleEn: "Self-quote 10m 42s later: \"Temu3 Code\"",
      titleZh: "10 分 42 秒后亲自赐名：「Temu3 Code」",
      noteEn: "Origin of temu3code.com's name — posted 10m 42s after \"Chinese knockoff\" (84k+ views) and left up even after private DM apology.",
      noteZh: "本站域名 temu3code.com 的原话出处（8.4 万浏览）；私信道歉后仍把这条公开嘲讽保留在主页。"
    },
    {
      id: "2124829315657576890",
      src: "./evidence/01-origin-theo-threat.png",
      url: "https://x.com/theo/status/2124829315657576890",
      thread: "2026-11-23-origin-temu3-threat",
      tags: ["origin", "hostility"],
      tone: "red",
      badgeEn: "TAKEDOWN THREAT · NOV 23, 19:36",
      badgeZh: "封号威胁 · 11月23日 19:36",
      titleEn: "\"Not consider. Do it right now or I'm going to contact GitHub...\"",
      titleZh: "「不是考虑，立刻改名，否则我找 GitHub 封掉你的账号」",
      noteEn: "After @DDdxx666 politely offered to consider renaming the MIT fork, @theo demanded immediate compliance under threat of GitHub account takedown.",
      noteZh: "@DDdxx666 礼貌表示会考虑改名避免误解，@theo 当场威胁立即改名否则联系 GitHub 封号。"
    },
    {
      id: "2124989435154726982",
      src: "./receipts/x-2124989435154726982-trillion-dollar-oss.png",
      url: "https://x.com/theo/status/2124989435154726982",
      thread: "2026-11-23-origin-temu3-threat",
      tags: ["origin", "double-standard"],
      tone: "green",
      badgeEn: "11 HOURS LATER · NOV 24, 06:12",
      badgeZh: "11 小时后 · 11月24日 06:12",
      titleEn: "\"Nah. Open source is open source, even if a trillion dollar company uses it!\"",
      titleZh: "面对万亿美元美企：「开源就是开源，万亿美企用了也没事！」",
      noteEn: "11 hours after threatening a Chinese MIT fork author with GitHub account suspension, @theo welcomed trillion-dollar US labs copying T3 Code.",
      noteZh: "威胁中国个人开源作者封号仅 11 小时后，谈到万亿美元美国大厂抄 T3 Code 时瞬间大度。"
    },
    {
      id: "2125019705270477102",
      src: "./receipts/x-2125019705270477102-low-quality-users.png",
      url: "https://x.com/theo/status/2125019705270477102",
      thread: "2026-11-24-retroactive-trademark-blocker",
      tags: ["origin", "hostility"],
      tone: "amber",
      badgeEn: "ELITISM · NOV 24, 08:12 CST",
      badgeZh: "用户分级 · 11月24日 08:12",
      titleEn: "\"We already have all the high quality users, not surprised the low quality ones are now following\"",
      titleZh: "「我们已经拥有全部高质量用户，低质量用户现在跟风不足为奇」",
      noteEn: "Posted the morning of Nov 24 as backlash over the MIT fork threat and telemetry audit began spreading globally.",
      noteZh: "11 月 24 日早间发酵阶段发帖，将批评与围观的新用户群体直接归类为「低质量用户」。"
    },
    {
      id: "2125082769395220688",
      src: "./receipts/x-2125082769395220688-always-illegal.png",
      url: "https://x.com/theo/status/2125082769395220688",
      thread: "2026-11-24-retroactive-trademark-blocker",
      tags: ["origin", "double-standard"],
      tone: "blue",
      badgeEn: "17H RETROACTIVE · NOV 24, 12:23",
      badgeZh: "事后补刀 · 11月24日 12:23",
      titleEn: "\"Again, it was always illegal to use our trademark\" (PR #41898 · 0 USPTO regs)",
      titleZh: "补合 TRADEMARK.md 后 94 秒发文：「使用我们商标一直是非法的」",
      noteEn: "Posted 94 seconds after merging PR #41898 (17h after the takedown threat), while USPTO records show 0 active registrations for T3 Code / T3 Tools.",
      noteZh: "封号威胁过去 17 小时后紧急合并 PR #41898 补写 TRADEMARK.md，但 USPTO 记录显示活跃商标为 0 件。"
    },
    {
      id: "2125077510941802509",
      src: "./evidence/extra/p8-3-x-theo-autoblocker.png",
      url: "https://x.com/theo/status/2125077510941802509",
      thread: "2026-11-24-retroactive-trademark-blocker",
      tags: ["origin", "hostility"],
      tone: "red",
      badgeEn: "AUTO-BLOCKER · NOV 24, 12:02",
      badgeZh: "国别攻击 · 11月24日 12:02",
      titleEn: "\"You're a liar and a fucking pussy. China should kick you out for making them look bad.\"",
      titleZh: "「你是个骗子加懦夫，中国应该把你踢出去」+ 承认用 Bot 自动拉黑",
      noteEn: "Confirmed running an automated X blocker bot while directing national-origin insults at Chinese critic @DLKFZWilliam2.",
      noteZh: "公开承认使用自动拉黑 Bot，同时对中文批评者 @DLKFZWilliam2 进行人身与国别辱骂。"
    },
    {
      id: "2125177503526588877",
      src: "./evidence/26-cn-cesspit.png",
      url: "https://x.com/theo/status/2125177503526588877",
      thread: "2026-11-24-cesspit-crisis-outburst",
      tags: ["origin", "hostility"],
      tone: "red",
      badgeEn: "540K VIEWS · NOV 24, 18:39 CST",
      badgeZh: "54 万浏览 · 11月24日 18:39",
      titleEn: "\"chinese tech twitter is the biggest fucking cesspit... you are fucking braindead\"",
      titleZh: "「中文科技推是史上最大粪坑…信他们写文章的人都是脑残」",
      noteEn: "Posted 68 minutes after the source-code telemetry audit went viral, locking replies to selected accounts while gathering 540k+ views.",
      noteZh: "源码级遥测审计爆火 68 分钟后发帖，直接扫射整个中文科技圈与读者，并开启仅限部分账号回复。"
    },
    {
      id: "2125177947376300110",
      src: "./receipts/x-2125177947376300110-hurt-feelings-zh.png",
      url: "https://x.com/theo/status/2125177947376300110",
      thread: "2026-11-24-cesspit-crisis-outburst",
      tags: ["origin", "hostility"],
      tone: "red",
      badgeEn: "COPY-PASTED ×3 · NOV 24, 18:41",
      badgeZh: "连刷 3 遍 · 11月24日 18:41",
      titleEn: "Copy-pasted 3× verbatim in Chinese: \"完了，又伤害中国人民的感情了。\"",
      titleZh: "用中文连续复制粘贴 3 次：「完了，又伤害中国人民的感情了。」",
      noteEn: "Identical Chinese taunt copy-pasted at 18:41:21, 18:43:26 (2125178474759618748), and 19:45:14 (2125194026253255092) CST.",
      noteZh: "在 18:41、18:43、19:45 连续三次向不同用户复制粘贴同一句中文嘲讽回复。"
    },
    {
      id: "2125182476943556955",
      src: "./receipts/x-2125182476943556955-zero-value.png",
      url: "https://x.com/theo/status/2125182476943556955",
      thread: "2026-11-24-cesspit-crisis-outburst",
      tags: ["origin", "hostility"],
      tone: "amber",
      badgeEn: "ZERO VALUE · NOV 24, 18:59 CST",
      badgeZh: "零价值论 · 11月24日 18:59",
      titleEn: "\"He deserves zero attention... I'm thankful his audience has zero value\"",
      titleZh: "「他不配获得任何关注，庆幸他的受众毫无价值」",
      noteEn: "Dismissed the audit author and Chinese developer audience as \"zero value\" — 12 hours before T3 overnight-merged 7 GDPR/privacy fixes.",
      noteZh: "斥责审计作者与中文开发者受众「毫无价值」——但 12 小时后 T3 团队连夜合入了 7 个隐私/GDPR 紧急修复 PR。"
    },
    {
      id: "2125193393450226024",
      src: "./receipts/x-2125193393450226024-not-apologizing.png",
      url: "https://x.com/theo/status/2125193393450226024",
      thread: "2026-11-24-cesspit-crisis-outburst",
      tags: ["origin", "hostility"],
      tone: "amber",
      badgeEn: "NO APOLOGY · NOV 24, 19:42 CST",
      badgeZh: "拒绝道歉 · 11月24日 19:42",
      titleEn: "\"I'm not apologizing. I've done nothing wrong and I'm being dragged into a cesspit.\"",
      titleZh: "面对老粉劝其道歉：「我不会道歉，我什么都没做错」",
      noteEn: "Replied to long-time fan @mike_chong_zh refusing any apology for the cesspit / Chinese knockoff / GitHub threat sequence.",
      noteZh: "面对长期支持者 @mike_chong_zh 委婉劝其道歉，直接回绝并称自己「什么都没做错」。"
    },
    {
      id: "2119240810202034645",
      src: "./evidence/23-stealing-fork-bot.png",
      url: "https://x.com/theo/status/2119240810202034645",
      thread: "2026-11-08-stealing-miaai-fork",
      tags: ["double-standard"],
      tone: "blue",
      badgeEn: "30S BOT SCRAPE · NOV 8, 09:29",
      badgeZh: "30 秒扒代码 · 11月8日 09:29",
      titleEn: "\"Okay I'm stealing this\" → 30s later: \"@bot find her fork... implement it\"",
      titleZh: "刚说「我要偷这个了」，30 秒后立刻 @bot 扒女开发者 Fork 抄功能",
      noteEn: "Replied \"Okay I'm stealing this\" to @MiaAI_lab's fork feature, then 30s later ordered @bot to scrape her fork and implement it via Opus 5.5.",
      noteZh: "11 月 8 日刚公开让 @bot 扒别人 Fork 照抄功能，15 天后却因别人 Fork 名字威胁让 GitHub 封号。"
    }
  ];

  const COPY = {
    en: {
      langLabel: "中文",
      parodyBadge: "PUBLIC AUDIT · PARODY",
      navXReceipts: "X Receipts",
      navMemes: "Memes (61)",
      navMail: "Tmail Inbox",
      navReport: "20 Exhibits",
      navSourcesText: "· 327 sources",
      heroH1: "The open-source<br />receipt plane<br />for T3 Code.",
      heroSub:
        "Orchestrate 3.5 years of receipts, default-on PostHog commits, 2.2M/hr IP logs, and 0 USPTO trademarks from one surface. Bring your own fork. (Trillion-dollar US labs preferred.)",
      ctaOpenMail: "Open Tmail Inbox",
      ctaStealParody: "Steal our receipts (legally — CC0 1.0, we actually mean it) ↗",
      alsoJump: "Zero telemetry (for real):",
      jumpXReceipts: "12 Original X Screenshots",
      jumpOldest: "Oldest first (2023 → 2026)",
      jumpReport: "20 Exhibits (18 langs)",
      jumpGithubManual: "GitHub (star manually)",
      winCrumb: "Nov 23–25 Crisis & 2023–2026 Multi-Year Inbox",
      winOpenFull: "Launch full Tmail ↗",
      winThreadsLabel: "PINNED THREADS",
      winBubblePrompt:
        "Compare t3.codes (\"Steal our code (legally)\") against @theo's 11-minute reaction to a Chinese MIT fork",
      winComposerText:
        "Click to enter full interactive Tmail Inbox (34 threads · sort 2023 → 2026 · 109 attachments)",
      sec2Title: "\"Tolerated\" across 1,151 public tweets",
      sec2Lead:
        "0.0% profanity toward 20 Big-Tech VIPs. 8.0% hostility toward ordinary developers. 14.4% (4.0×) during the Chinese-fork crisis. Click any card to open the receipt in Tmail.",
      xrEyebrow: "PRIMARY SOURCES · FIRST-HAND X CAPTURES",
      xrTitle: "Original X screenshots & direct links.",
      xrLead:
        "12 unedited primary captures of @theo's public posts with timestamps and view counts. Click any screenshot to inspect full resolution, verify the original post on x.com, or jump straight to the matching Tmail thread.",
      xrFilterAll: "All (12)",
      xrFilterOrigin: "Fork & Temu3",
      xrFilterDouble: "Double Standard",
      xrFilterHostility: "Hostility & Outburst",
      xrFootNote:
        "Every image above is a verbatim capture paired with its canonical x.com/theo/status/<id> URL (no shortened links).",
      xrFootAll: "Browse all 109+ exhibits in TPhotos ↗",
      xrZoom: "Zoom full shot",
      xrOpenX: "Open on X ↗",
      xrOpenMail: "Tmail thread →",
      xrRawPng: "Raw PNG ↗",
      sec3Title: "Bring your own telemetry (opt-out: \"not planned\")",
      sec3Lead:
        "Homepage promised \"No telemetry. Unless you opt in. Full stop.\" — until commit 3bdaa6e1 quietly deleted that sentence three months later. Here's what actually shipped:",
      check1: "0 Settings UI toggles",
      check2: "4 community opt-out PRs rejected as \"unwanted\"",
      check3: "0 Published GitHub Security Advisories",
      gitPillCta: "Inspect timeline in Tmail",
      sec4Title: "One silent merge to force-push main.",
      sec4Lead:
        "Need a privacy whitelist stripped for your public leaderboard? 21 hours. Need to stop Claude Auto mode silently running git push --force origin main? 52+ days and counting.",
      sec4Item1: "52+ days unfixed: silent git push --force (Issue #15353)",
      sec4Item2: "21 hours: nuked model privacy filter for slopalytics.com (PR #41237)",
      sec4Item3: "30 seconds: \"@bot find her fork\" after replying \"Okay I'm stealing this\"",
      sec4Item4: "17 hours late: retroactively merged TRADEMARK.md with 0 USPTO marks (PR #41898)",
      mmEyebrow: "SATIRE ARSENAL · CDN.TEMU3CODE.COM · CC0 1.0",
      mmTitle: "The 19 Sins Collector Deck & Viral Memes.",
      mmLead:
        "Laugh first, verify in 1 click. 19 holographic collector cards + 33 viral blended memes + bilingual strips — separate from primary receipts, each linked straight back to its verified Tmail evidence thread.",
      mmDrawBtn: "Draw a Random Sin",
      mmOpenAllBtn: "Open All 61 Memes ↗",
      mmViralSub: "FEATURED VIRAL MEMES (CC0 — COPY PNG OR DOWNLOAD IN /MEMES/)",
      mmSeeAllViral: "All 33 viral memes →",
      mmOpenInArsenal: "Open in Meme Arsenal ↗",
      sec5Title: "\"Steal our code (legally).\"*",
      sec5Sub:
        "*Terms apply: must be a trillion-dollar US lab or a T3 employee (maria-rcks/t3libre). Chinese MIT forks receive an 11-minute GitHub ban threat and free \"Temu3 Code\" branding.",
      fp1Title: "Actually steal our code (CC0 1.0).",
      fp1Body:
        "Fork our entire audit repo, mirror it, rename it Temu4 Code — we genuinely won't threaten your GitHub account.",
      fp2Title: "Sort the 3.5-year inbox.",
      fp2Body:
        "Trace every receipt from 2024 Indian dev harassment and the deleted $20k FFmpeg bounty straight through Nov 2026.",
      fp3Title: "Zero 30s-idle fake star traps.",
      fp3Body:
        "If you star our GitHub repo, it's because you actually clicked it — not because an idle toast fired PUT user/starred with your host credentials.",
      ctaForkGithub: "Fork on GitHub ↗",
      ctaH2: "Your terminal deserves<br />truth before you install.",
      ctaLead:
        "Temu3 Code (temu3code.com) is an independent CC0 1.0 public-record parody & forensic archive — zero telemetry, zero 30s-idle star traps, and zero affiliation with T3 Tools Inc.",
      ctaXReceipts: "Original X Screenshots",
      ctaGithubBtn: "GitHub Repository ↗",
      footerLeft:
        "CC0 1.0 Public Domain · Independent Parody & Public-Record Archive (Not affiliated with T3 Tools Inc.)"
    },
    zh: {
      langLabel: "EN",
      parodyBadge: "独立公共审计 · 讽刺主页",
      navXReceipts: "原始 X 截图",
      navMemes: "梗图库 (61)",
      navMail: "Tmail 邮件门",
      navReport: "20 份证据报告",
      navSourcesText: "· 327 条信源",
      heroH1: "专为 T3 Code 打造的<br />开源实锤<br />控制面板。",
      heroSub:
        "在一个界面里编排 3.5 年公开实锤、默认开启的 PostHog 提交、每小时 220 万条 IP 日志与 0 件美国商标。欢迎自带 Fork。（仅限万亿美元美国大厂，华人 MIT Fork 慎点。）",
      ctaOpenMail: "进入 Tmail 邮件门",
      ctaStealParody: "来偷我们的实锤（合法地 · CC0 1.0，我们真不威胁封号）↗",
      alsoJump: "真·零遥测直达：",
      jumpXReceipts: "12 张一手 X 原图",
      jumpOldest: "2023 → 2026 跨度排序",
      jumpReport: "20 份报告 (18 语言)",
      jumpGithubManual: "GitHub 仓库（纯手动点星）",
      winCrumb: "11 月 23–25 日危机与 2023–2026 长期时间线收件箱",
      winOpenFull: "打开完整 Tmail ↗",
      winThreadsLabel: "置顶实锤线程",
      winBubblePrompt:
        "对照 t3.codes 主页「来偷我们的代码（合法地）」与 @theo 面对中国 MIT Fork 的 11 分钟破防实录",
      winComposerText:
        "点击进入完整交互式 Tmail 邮件门（34 条对话线程 · 按 2023→2026 排序 · 109 张原图）",
      sec2Title: "1,151 条公开推文，全程「原声大碟」",
      sec2Lead:
        "对 20 位大厂高管 0.0% 脏话，对普通开发者 8.0% 辱骂，中文 Fork 危机 25 小时暴涨 4 倍至 14.4%。点击任意卡片直达 Tmail 邮件取证。",
      xrEyebrow: "一手原证 · 原始 X 推文高清截图",
      xrTitle: "第一手 X 原始截图与原帖直达。",
      xrLead:
        "12 张直接截取自 X 平台的 @theo 一手公开发言原图（保留完整时间戳、浏览量与原话）。点击任意截图即可高清放大，或一键直达 x.com 原帖与对应 Tmail 邮件线程。",
      xrFilterAll: "全部 (12)",
      xrFilterOrigin: "Fork 与 Temu3",
      xrFilterDouble: "极致双标",
      xrFilterHostility: "破防与辱骂",
      xrFootNote:
        "以上每张截图均为未经剪辑的原帖留存，并绑定对应的 canonical x.com/theo/status/<id> 原始链接（绝无短链）。",
      xrFootAll: "前往 TPhotos 浏览全部 109+ 张取证图 ↗",
      xrZoom: "点击放大原图",
      xrOpenX: "查看 X 原帖 ↗",
      xrOpenMail: "Tmail 线程 →",
      xrRawPng: "打开原图 PNG ↗",
      sec3Title: "「绝无遥测。句号。」（关闭开关：不予计划）",
      sec3Lead:
        "官网挂了三个多月「绝无遥测，除非主动开启」，直到 commit 3bdaa6e1 悄悄删掉这行字。以下是代码里真实打包发货的 6 层惊喜：",
      check1: "0 个设置页关闭开关",
      check2: "连续拒绝 4 个社区关闭遥测 PR（标为 unwanted）",
      check3: "0 份已发布的 GitHub 安全公告",
      gitPillCta: "在 Tmail 中核验完整时间线",
      sec4Title: "一键静默放行，让 force-push 躺了 52 天。",
      sec4Lead:
        "为了给自家公开榜单导数据删掉隐私白名单？21 小时极速合并。修掉 Claude Auto 模式静默执行 git push --force origin main？52 天仍在排队。",
      sec4Item1: "52 天未修：Auto 模式静默 git push --force（Issue #15353）",
      sec4Item2: "21 小时闪电合并：为 slopalytics.com 删掉模型隐私白名单（PR #41237）",
      sec4Item3: "30 秒出警：刚回复女开发者「我要偷这个了」，立刻 @bot 扒她 Fork",
      sec4Item4: "迟到 17 小时：拿着 0 件美国商标补合 TRADEMARK.md（PR #41898）",
      mmEyebrow: "讽刺弹药库 · CDN.TEMU3CODE.COM · CC0 1.0",
      mmTitle: "「十九宗罪」游戏王抽卡墙 & 病毒梗图库。",
      mmLead:
        "先笑破防，一键核验源码实锤。19 张暗金收藏卡 + 33 张经典融图梗 + 双语讽刺漫画——与一手原证严格分层，每张图直连 Tmail 对应取证线程。",
      mmDrawBtn: "随机抽一张罪状卡",
      mmOpenAllBtn: "进入完整 61 张梗图库 ↗",
      mmViralSub: "精选病毒梗图（CC0 1.0 — 进入 /memes/ 支持一键复制 PNG 直发 X）",
      mmSeeAllViral: "查看全部 33 张病毒梗图 →",
      mmOpenInArsenal: "去梗图库一键复制 PNG ↗",
      sec5Title: "「来偷我们的代码（合法地）。」*",
      sec5Sub:
        "*最终解释权归 @theo 所有：万亿美元美国大厂与 T3 内部员工（maria-rcks/t3libre）适用；中国 MIT Fork 附赠 11 分钟极速封号威胁与「Temu3 Code」联名冠名权。",
      fp1Title: "真·随便偷我们的代码（CC0 1.0）。",
      fp1Body:
        "欢迎 Fork 整座审计仓库、做镜像、甚至改名叫 Temu4 Code——我们发誓绝对不找 GitHub 封你的号。",
      fp2Title: "按日期拉通 3.5 年收件箱。",
      fp2Body:
        "从 2024 年印度开发者网暴道歉、2025 年被删的 2 万美元 FFmpeg 悬赏，一路看到 2026 年 11 月。",
      fp3Title: "绝无 30 秒闲置偷点 Star 弹窗。",
      fp3Body:
        "你给我们的 GitHub 仓库点星，是因为你真的点了——绝不是后台偷偷用你本机凭证发 PUT user/starred。",
      ctaForkGithub: "去 GitHub 仓库 Fork / 点星 ↗",
      ctaH2: "你的终端在安装之前，<br />值得看到全部真相。",
      ctaLead:
        "Temu3 Code (temu3code.com) 为独立 CC0 1.0 公共记录讽刺站——真·零遥测、无 30 秒偷点 Star 陷阱，与 T3 Tools Inc. 无任何关联。",
      ctaXReceipts: "查看一手 X 原始截图",
      ctaGithubBtn: "访问 GitHub 仓库 ↗",
      footerLeft:
        "CC0 1.0 公共领域 · 独立讽刺与开源公共记录档案（与 T3 Tools Inc. 无关）"
    }
  };

  let lang = localStorage.getItem("temu3-lang") === "zh" ? "zh" : "en";
  let activeFilter = "all";
  let visibleReceipts = X_RECEIPTS.slice();
  let lbMode = "receipts";
  let lbItems = [];
  let lbIndex = -1;
  let memeCatalog = [];

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderMarquee(id, list) {
    const el = document.getElementById(id);
    if (!el) return;
    const doubled = list.concat(list);
    el.innerHTML = doubled
      .map(
        (q) => `<a class="quote-card" href="./mail/?thread=${encodeURIComponent(q.thread)}">
          <div class="quote-head">
            <span class="quote-author">${escapeHtml(q.author)}</span>
            <span class="quote-date">${escapeHtml(q.date)}</span>
          </div>
          <p class="quote-body">“${escapeHtml(q.text)}”</p>
        </a>`
      )
      .join("");
  }

  function renderXReceipts() {
    const grid = document.getElementById("xReceiptsGrid");
    if (!grid) return;
    const dict = COPY[lang] || COPY.en;
    visibleReceipts =
      activeFilter === "all"
        ? X_RECEIPTS.slice()
        : X_RECEIPTS.filter((r) => r.tags.includes(activeFilter));

    grid.innerHTML = visibleReceipts
      .map((r, idx) => {
        const badge = lang === "zh" ? r.badgeZh : r.badgeEn;
        const title = lang === "zh" ? r.titleZh : r.titleEn;
        const note = lang === "zh" ? r.noteZh : r.noteEn;
        return `<article class="xr-card">
          <button type="button" class="xr-thumb-btn" data-lb-idx="${idx}" aria-label="${escapeHtml(title)}">
            <div class="xr-thumb-frame">
              <img src="${escapeHtml(r.src)}" alt="${escapeHtml(title)}" loading="lazy" />
              <span class="xr-zoom-pill">🔍 ${escapeHtml(dict.xrZoom)}</span>
            </div>
          </button>
          <div class="xr-card-body">
            <div class="xr-card-meta">
              <span class="xr-badge xr-badge-${escapeHtml(r.tone)}">${escapeHtml(badge)}</span>
              <span class="xr-id-tag">#${escapeHtml(r.id.slice(-7))}</span>
            </div>
            <h3 class="xr-card-title">${escapeHtml(title)}</h3>
            <p class="xr-card-note">${escapeHtml(note)}</p>
            <div class="xr-card-actions">
              <a class="xr-btn xr-btn-x" href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(dict.xrOpenX)}</a>
              <a class="xr-btn" href="./mail/?thread=${encodeURIComponent(r.thread)}">${escapeHtml(dict.xrOpenMail)}</a>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  function updateLightbox() {
    const lb = document.getElementById("receiptLightbox");
    if (!lb || lbIndex < 0 || lbIndex >= lbItems.length) return;
    const dict = COPY[lang] || COPY.en;
    const badgeEl = document.getElementById("lbBadge");
    const img = document.getElementById("lbImg");
    const xLink = document.getElementById("lbXLink");
    const mailLink = document.getElementById("lbMailLink");
    const rawLink = document.getElementById("lbRawLink");

    if (lbMode === "memes") {
      const m = lbItems[lbIndex];
      const title = lang === "zh" ? m.titleZh : m.titleEn;
      badgeEl.className = m.series === "sins" ? "xr-badge xr-badge-amber" : "xr-badge xr-badge-blue";
      badgeEl.textContent = m.series === "sins" ? `19 SINS · EXHIBIT #${m.exhibit}` : `VIRAL MEME · EXHIBIT #${m.exhibit}`;
      document.getElementById("lbTitle").textContent = title;
      img.src = m.url;
      img.alt = title;
      document.getElementById("lbCaption").textContent =
        lang === "zh"
          ? "托管于 Cloudflare R2 (cdn.temu3code.com) · CC0 1.0 自由传播，点击右侧按钮一键核验对应源码/推文实锤。"
          : "Hosted on Cloudflare R2 (cdn.temu3code.com) · CC0 1.0 public domain. Click through to verify the primary receipt in Tmail.";
      xLink.href = `./memes/#${encodeURIComponent(m.id)}`;
      xLink.removeAttribute("target");
      xLink.textContent = dict.mmOpenInArsenal;
      mailLink.href = `./mail/?thread=${encodeURIComponent(m.thread)}`;
      mailLink.textContent = dict.xrOpenMail;
      rawLink.href = m.url;
      rawLink.textContent = "WebP ↗";
      return;
    }

    const r = lbItems[lbIndex];
    badgeEl.className = `xr-badge xr-badge-${r.tone}`;
    badgeEl.textContent = lang === "zh" ? r.badgeZh : r.badgeEn;
    document.getElementById("lbTitle").textContent = lang === "zh" ? r.titleZh : r.titleEn;
    img.src = r.src;
    img.alt = lang === "zh" ? r.titleZh : r.titleEn;
    document.getElementById("lbCaption").textContent = lang === "zh" ? r.noteZh : r.noteEn;
    xLink.href = r.url;
    xLink.setAttribute("target", "_blank");
    xLink.textContent = dict.xrOpenX;
    mailLink.href = `./mail/?thread=${encodeURIComponent(r.thread)}`;
    mailLink.textContent = dict.xrOpenMail;
    rawLink.href = r.src;
    rawLink.textContent = dict.xrRawPng;
  }

  function openLightbox(idx, mode = "receipts", list = null) {
    const lb = document.getElementById("receiptLightbox");
    lbMode = mode;
    lbItems = list || visibleReceipts;
    if (!lb || idx < 0 || idx >= lbItems.length) return;
    lbIndex = idx;
    updateLightbox();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function renderMemeShowcase() {
    const rail = document.getElementById("homeSinsRail");
    const viralGrid = document.getElementById("homeViralGrid");
    if (!rail || !viralGrid || !memeCatalog.length) return;

    const sins = memeCatalog.filter((m) => m.series === "sins");
    const featuredViral = memeCatalog.filter((m) => m.series === "blended" && m.featured).slice(0, 6);

    rail.innerHTML = sins
      .map((m, idx) => {
        const title = lang === "zh" ? m.titleZh : m.titleEn;
        return `<button type="button" class="sin-rail-card" data-sin-idx="${idx}">
          <div class="sin-rail-img">
            <img src="${escapeHtml(m.url)}" alt="${escapeHtml(title)}" loading="lazy" />
          </div>
          <div class="sin-rail-title">${escapeHtml(m.titleEn)}</div>
          <div class="sin-rail-ex">Exhibit #${escapeHtml(m.exhibit)} · Click to inspect</div>
        </button>`;
      })
      .join("");

    viralGrid.innerHTML = featuredViral
      .map((m, idx) => {
        const title = lang === "zh" ? m.titleZh : m.titleEn;
        return `<article class="mm-viral-card">
          <button type="button" class="mm-viral-thumb" data-viral-idx="${idx}" aria-label="${escapeHtml(title)}">
            <img src="${escapeHtml(m.url)}" alt="${escapeHtml(title)}" loading="lazy" />
          </button>
          <div class="mm-viral-body">
            <span class="mm-viral-title">${escapeHtml(title)}</span>
            <a class="mm-viral-link" href="./mail/?thread=${encodeURIComponent(m.thread)}">#${escapeHtml(m.exhibit)} →</a>
          </div>
        </article>`;
      })
      .join("");
  }

  async function loadMemeShowcase() {
    try {
      const res = await fetch("./data/memes.json");
      if (!res.ok) return;
      const data = await res.json();
      memeCatalog = Array.isArray(data.items) ? data.items : [];
      renderMemeShowcase();
    } catch (_) {}
  }

  function closeLightbox() {
    const lb = document.getElementById("receiptLightbox");
    if (!lb) return;
    lb.hidden = true;
    lbIndex = -1;
    document.body.style.overflow = "";
  }

  function applyLang() {
    const dict = COPY[lang] || COPY.en;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.getElementById("langLabel").textContent = dict.langLabel;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (dict[k]) el.textContent = dict[k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const k = el.getAttribute("data-i18n-html");
      if (dict[k]) el.innerHTML = dict[k];
    });
    renderXReceipts();
    renderMemeShowcase();
    if (lbIndex >= 0) updateLightbox();
  }

  renderMarquee("marqueeRow1", QUOTES_ROW_1);
  renderMarquee("marqueeRow2", QUOTES_ROW_2);
  applyLang();
  loadMemeShowcase();

  document.getElementById("langToggleBtn").addEventListener("click", () => {
    lang = lang === "en" ? "zh" : "en";
    try {
      localStorage.setItem("temu3-lang", lang);
    } catch (_) {}
    applyLang();
  });

  document.querySelectorAll("[data-xr-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-xr-filter") || "all";
      document.querySelectorAll("[data-xr-filter]").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
      });
      renderXReceipts();
    });
  });

  const gridEl = document.getElementById("xReceiptsGrid");
  if (gridEl) {
    gridEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lb-idx]");
      if (!btn) return;
      openLightbox(Number(btn.getAttribute("data-lb-idx")), "receipts", visibleReceipts);
    });
  }

  const sinsRailEl = document.getElementById("homeSinsRail");
  if (sinsRailEl) {
    sinsRailEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-sin-idx]");
      if (!btn) return;
      const sins = memeCatalog.filter((m) => m.series === "sins");
      openLightbox(Number(btn.getAttribute("data-sin-idx")), "memes", sins);
    });
  }

  const viralGridEl = document.getElementById("homeViralGrid");
  if (viralGridEl) {
    viralGridEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-viral-idx]");
      if (!btn) return;
      const featuredViral = memeCatalog.filter((m) => m.series === "blended" && m.featured).slice(0, 6);
      openLightbox(Number(btn.getAttribute("data-viral-idx")), "memes", featuredViral);
    });
  }

  const drawSinBtn = document.getElementById("homeDrawSinBtn");
  if (drawSinBtn) {
    drawSinBtn.addEventListener("click", () => {
      const sins = memeCatalog.filter((m) => m.series === "sins");
      if (!sins.length) {
        window.location.href = "./memes/?series=sins";
        return;
      }
      openLightbox(Math.floor(Math.random() * sins.length), "memes", sins);
    });
  }

  document.querySelectorAll("[data-lb-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("lbPrev");
  const nextBtn = document.getElementById("lbNext");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (lbIndex < 0 || !lbItems.length) return;
      lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length;
      updateLightbox();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (lbIndex < 0 || !lbItems.length) return;
      lbIndex = (lbIndex + 1) % lbItems.length;
      updateLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (lbIndex < 0 || !lbItems.length) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") {
      lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length;
      updateLightbox();
    } else if (e.key === "ArrowRight") {
      lbIndex = (lbIndex + 1) % lbItems.length;
      updateLightbox();
    }
  });
})();
