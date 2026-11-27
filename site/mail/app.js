/* ==========================================================================
   Tmail — Interactive Public Record Inbox Client (100% Static, Zero Telemetry)
   ========================================================================== */

(() => {
  "use strict";

  // Optional voluntary support configuration (disabled by default).
  // Flip `enabled: true` and fill in any address/URL to show the Support button.
  const SUPPORT_CONFIG = {
    enabled: false,
    title: "Support Independent Public-Record Research",
    titleZh: "支持独立公共记录审计",
    note: "Zero ads, zero trackers, CC0 1.0 public domain. Voluntary support covers domain registration and public archival costs.",
    noteZh: "零广告、零埋点、CC0 1.0 开源公共记录。自愿支持将用于域名与证据归档维护。",
    usdtTrc20: "",
    usdtErc20: "",
    githubSponsors: ""
  };

  const I18N = {
    en: {
      from: "From",
      to: "To",
      support: "Support",
      statsPill: "1,151 Stats",
      suiteTitle: "Public Record Suite",
      classicPortal: "Temu3",
      profileGreeting: "Public Record Archive",
      profileSub: "Public posts, GitHub PRs, and archived screenshots for @theo / pingdotgg/t3code.",
      openFullReport: "Temu3 Home",
      submitReceipt: "Submit Receipt",
      folderInbox: "Inbox",
      folderStarred: "Starred",
      folderDeleted: "Deleted / Retracted",
      folderSent: "Sent by @theo",
      folderAttachments: "Attachments",
      folderActivity: "Daily Activity",
      topicsHeading: "TOPICS",
      peopleHeading: "PEOPLE",
      browsePeople: "Browse all people →",
      allContacts: "All Contacts",
      overviewTitle: "Public Record Overview",
      randomThread: "Random",
      allPlatforms: "All sources",
      allDates: "All dates (2023–2026)",
      sortBadge: "Span",
      sortNewest: "Newest first",
      sortOldest: "Oldest first (2023 → 2026)",
      sortStarred: "Most starred",
      sortReceipts: "Most receipts",
      tabPrimary: "Primary",
      tabBullying: "Bullying & Double Standards",
      tabBullyingSub: "2024 Indian devs, $20k FFmpeg, Temu3, cesspit…",
      tabTelemetry: "Telemetry & Security",
      tabTelemetrySub: "PostHog, 2.2M/hr IP logs, Antigravity bans, ca81b7b9…",
      verifiedSource: "Verified Primary Source",
      photosTitle: "TPhotos · Archived Screenshots",
      photosDesc: "Screenshots, PRs, and charts. Click any image to zoom.",
      activityTitle: "TCal · Timeline & 1,151 Posts",
      activityDesc: "Timeline from 2023 to 2026 and stats from 1,151 posts.",
      viewChronoInbox: "Sort oldest first",
      driveTitle: "TDrive · Reports & Source Links",
      driveDesc: "Full write-ups, trademark checks, and cleanup commands.",
      peopleDirTitle: "People & Counterparties Directory",
      peopleDirDesc: "Click any person or community below to filter every documented interaction with @theo and pingdotgg/t3code.",
      backInbox: "← Back to Inbox",
      dockReport: "Temu3",
      searchPlaceholder: "Search public record (e.g. Temu, FFmpeg, 41.6 GB, PR #42450, Antigravity...)",
      viewOriginalEn: "Original EN",
      viewTranslated: "Translated",
      replyOriginal: "Open Original Source",
      shareOnX: "Share on X",
      fullExhibit: "Full Exhibit Dossier",
      copyLink: "Copy Thread Link",
      copied: "Thread link copied to clipboard",
      emptyList: "No public-record threads match your current filter.",
      clearFilters: "Clear all filters",
      langToggle: "中文",
      statusOpen: "Unfixed",
      statusPartial: "Partially Patched",
      statusDeleted: "Deleted / Retracted",
      statusRecord: "Public Record"
    },
    zh: {
      from: "发件人",
      to: "对象",
      support: "支持",
      statsPill: "1,151 统计",
      suiteTitle: "公共档案套件",
      classicPortal: "Temu3 主页",
      profileGreeting: "独立公共记录档案箱",
      profileSub: "收录 @theo 和 pingdotgg/t3code 的公开原帖、GitHub PR 和存档截图。",
      openFullReport: "返回 Temu3 主页",
      submitReceipt: "提交公开证据",
      folderInbox: "收件箱",
      folderStarred: "已加星标",
      folderDeleted: "已删帖 / 静默撤回",
      folderSent: "@theo 发出",
      folderAttachments: "全部附件截图",
      folderActivity: "时间跨度与统计",
      topicsHeading: "主题分类",
      peopleHeading: "涉及人物 / 群体",
      browsePeople: "查看全部人物目录 →",
      allContacts: "全部联系人",
      overviewTitle: "公共档案概览",
      randomThread: "随机抽一条",
      allPlatforms: "全部来源",
      allDates: "全部时间 (2023–2026)",
      sortBadge: "按跨度",
      sortNewest: "最新优先",
      sortOldest: "最早优先 (2023 → 2026 霸凌跨度)",
      sortStarred: "星标最多",
      sortReceipts: "截图证据最多",
      tabPrimary: "主要收件箱",
      tabBullying: "霸凌与双标记录",
      tabBullyingSub: "2024 印度开发者、$20k FFmpeg 悬赏、Temu3、粪坑骂战…",
      tabTelemetry: "遥测与安全漏洞",
      tabTelemetrySub: "默认 PostHog、220 万/时 IP 日志、Antigravity 3 分钟封号…",
      verifiedSource: "已核验一手信源",
      photosTitle: "TPhotos · 截图存档",
      photosDesc: "截图、PR 记录和图表，点开查看大图。",
      activityTitle: "TCal · 时间线和 1,151 条推文",
      activityDesc: "2023 到 2026 年时间线，以及 1,151 条推文统计。",
      viewChronoInbox: "按最早时间排序",
      driveTitle: "TDrive · 专题报告与原始链接",
      driveDesc: "完整报告、商标查询和 2 分钟清理命令。",
      peopleDirTitle: "涉及人物与开发者群体目录",
      peopleDirDesc: "点击任意人物或群体，立刻筛选与 @theo 及 pingdotgg/t3code 的全部公开交互记录。",
      backInbox: "← 返回收件箱",
      dockReport: "主页",
      searchPlaceholder: "搜索公共记录（如 Temu、FFmpeg、41.6 GB、PR #42450、Antigravity...）",
      viewOriginalEn: "英文原文",
      viewTranslated: "显示译文",
      replyOriginal: "打开一手原文",
      shareOnX: "转发到 X",
      fullExhibit: "查看完整证据页",
      copyLink: "复制本条直链",
      copied: "已复制该条记录直链",
      emptyList: "当前筛选条件下没有匹配的记录。",
      clearFilters: "清空筛选",
      langToggle: "EN",
      statusOpen: "仍未修复",
      statusPartial: "部分修补",
      statusDeleted: "已删帖 / 撤回",
      statusRecord: "公开记录"
    }
  };

  const DOSSIERS = [
    {
      num: "01",
      title: "Telemetry Architecture, Cross-Tool Stitching & GDPR Overnight Sprint",
      titleZh: "卷宗 01：遥测架构、跨工具身份串联与 GDPR 午夜紧急补丁",
      desc: "PR #174, commit 3bdaa6e1, ingest.t3.codes, Identify.ts, 2.2M/hr IP spans in Axiom, and PR #42450 git.cwd leaks.",
      url: "https://github.com/realchendahuang/temu3code/blob/main/docs/dossiers/01-telemetry-and-gdpr-timeline.md"
    },
    {
      num: "02",
      title: "Local Safety, Fake SQLite Deletion & Silent Security Patches",
      titleZh: "卷宗 02：41.6 GB 假删除、5 秒进程扫描、静默 force-push 与 0 安全公告",
      desc: "41.6 GB statev2.sqlite bloat, t3-resource-monitor cmdline sweep, 52-day silent git push --force, and silent PR #39483.",
      url: "https://github.com/realchendahuang/temu3code/blob/main/docs/dossiers/02-local-safety-and-security-audit.md"
    },
    {
      num: "03",
      title: "Google Antigravity Spoofing, T3 Connect Relay & ca81b7b9 Vulns",
      titleZh: "卷宗 03：Google Antigravity 伪造 Header 封号、明文中继与 ca81b7b9 漏洞",
      desc: "v1internal spoofing, fake SSH_CONNECTION, 3-minute bans, zero-E2E plaintext relay, and active LAN/Bearer/SSH_AUTH_SOCK flaws.",
      url: "https://github.com/realchendahuang/temu3code/blob/main/docs/dossiers/03-antigravity-tos-and-t3connect-relay.md"
    },
    {
      num: "04",
      title: "Business Ledger, Investor Conflicts, Sponsors & 77k-Star Funnel",
      titleZh: "卷宗 04：80 万美元账本、31.7T 算力雷达、天使投资冲突与 7.7 万星漏斗",
      desc: "31.7T tokens/day radar, Vibe Kanban & Daytona overlap, Clerk/Axiom sponsors, CLIProxyAPI Gist, and PR #29922 star funnel.",
      url: "https://github.com/realchendahuang/temu3code/blob/main/docs/dossiers/04-business-ledger-sponsors-and-77k-stars.md"
    },
    {
      num: "05",
      title: "Governance, Fork-Scraping @bot, 0 USPTO Trademarks & 2024–2026 Pattern",
      titleZh: "卷宗 05：社区治理、@bot 扒 Fork、0 件 USPTO 商标与两年历史行为脉络",
      desc: "Origin MIT fork threat, 17h retroactive TRADEMARK.md, VOUCHED.td bans, 2024 Indian dev backlash, and $20k FFmpeg bounty.",
      url: "https://github.com/realchendahuang/temu3code/blob/main/docs/dossiers/05-governance-trademark-and-history.md"
    },
    {
      num: "06",
      title: "1,151-Tweet Quantitative Forensic Dataset (Nov 7–24, 2026)",
      titleZh: "卷宗 06：1,151 条连续推文定量取证数据集（选择性礼貌与 4 倍辱骂飙升）",
      desc: "0.0% profanity to 20 Big-Tech VIPs vs. 8.0% to ordinary devs vs. 14.4% crisis surge; full reproducible methodology.",
      url: "https://github.com/realchendahuang/temu3code/blob/main/docs/dossiers/06-tweet-forensic-dataset-1151.md"
    }
  ];

  const SHARED_I18N = window.Temu3I18n;
  const ICONS = {
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6"/>',
    group: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 19.5c0-3 2.9-5 6.5-5s6.5 2 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14.5c2.5 0 4.5 1.5 4.5 4"/>',
    translate: '<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1"/><path d="m22 22-5-10-5 10M14 18h6"/>',
    help_outline: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 0 1 5 1c0 1.8-2.5 2.2-2.5 3.8"/><circle cx="12" cy="17.2" r="0.8" fill="currentColor" stroke="none"/>',
    volunteer_activism: '<path d="M12 20s-7-4.5-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 2.5C19 15.5 12 20 12 20Z"/>',
    apps: '<circle cx="5" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="19" r="1.5" fill="currentColor" stroke="none"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    photo_library: '<rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9.5" cy="9.5" r="1.5" fill="currentColor" stroke="none"/><path d="m20 15-4.5-4.5L7 19"/>',
    folder_open: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
    calendar_month: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    auto_stories: '<path d="M2 6.5A2.5 2.5 0 0 1 4.5 4H12v16H4.5A2.5 2.5 0 0 1 2 17.5v-11Z"/><path d="M22 6.5A2.5 2.5 0 0 0 19.5 4H12v16h7.5a2.5 2.5 0 0 0 2.5-2.5v-11Z"/>',
    playing_cards: '<rect x="5" y="4" width="11" height="15" rx="2"/><path d="M16 7h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9"/>',
    style: '<rect x="5" y="4" width="11" height="15" rx="2"/><path d="M16 7h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9"/>',
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    inbox: '<path d="M4 4h16l2 9v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6l2-9Z"/><path d="M2 13h6l2 3h4l2-3h6"/>',
    star_border: '<polygon points="12 3 14.9 8.8 21.3 9.7 16.6 14.2 17.7 20.6 12 17.6 6.3 20.6 7.4 14.2 2.7 9.7 9.1 8.8" fill="none"/>',
    star: '<polygon points="12 3 14.9 8.8 21.3 9.7 16.6 14.2 17.7 20.6 12 17.6 6.3 20.6 7.4 14.2 2.7 9.7 9.1 8.8" fill="currentColor" stroke-width="1.2"/>',
    visibility_off: '<path d="M3 3l18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 4.2A10.4 10.4 0 0 1 12 4c5.5 0 9.5 4.2 10.5 8-.4 1.6-1.4 3.2-2.7 4.5M6.6 6.6C4.4 8 2.9 10 2.5 12c1 3.8 5 8 9.5 8 1.9 0 3.7-.6 5.2-1.5"/>',
    send: '<path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7Z"/>',
    attach_file: '<path d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.1a2 2 0 0 1-2.8-2.8l8.5-8.4"/>',
    calendar_today: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    arrow_drop_down: '<path d="m7 10 5 5 5-5H7Z" fill="currentColor" stroke="none"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/>',
    casino: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none"/>',
    public: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18"/>',
    date_range: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h2M12 14h2M16 14h.01"/>',
    schedule: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    gavel: '<path d="m14 13-7.5 7.5a2.1 2.1 0 0 1-3-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
    shield: '<path d="M12 3 4 7v5c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V7l-8-4Z"/>',
    arrow_back: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1"/>',
    description: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    article: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    verified: '<path d="M12 2 14.9 4.2 18.5 3.8 19.6 7.2 22.5 9.5 21.3 13 22.5 16.5 19.6 18.8 18.5 22.2 14.9 21.8 12 24 9.1 21.8 5.5 22.2 4.4 18.8 1.5 16.5 2.7 13 1.5 9.5 4.4 7.2 5.5 3.8 9.1 4.2Z" fill="currentColor" stroke="none"/><path d="m8.8 12.2 2.2 2.2 4.5-4.6" stroke="#ffffff" stroke-width="2.1"/>',
    chevron_left: '<path d="m15 18-6-6 6-6"/>',
    chevron_right: '<path d="m9 18 6-6-6-6"/>',
    sort: '<path d="M3 6h18M3 12h12M3 18h6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    balance: '<path d="M12 3v18M5 7h14M7 7l-3 7h6l-3-7ZM17 7l-3 7h6l-3-7ZM8 21h8"/>',
    fact_check: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h5M7 14h4M14.5 12.5l1.5 1.5 3-3"/>',
    visibility: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    trending_up: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    reply: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/>',
    forward: '<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"/>',
    open_in_new: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>'
  };
  function iconSvg(name, cls = "") {
    const body = ICONS[name] || ICONS.article;
    const classes = cls ? `tmail-ico ${cls}` : "tmail-ico";
    return `<svg class="${classes}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }
  const INITIAL_SEO = {
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "",
    ogDesc: document.querySelector('meta[property="og:description"]')?.getAttribute("content") || ""
  };
  const BLANK_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  const IMG_DIMS = {"evidence/00-cover-en.png":[1800,766],"evidence/00-cover-zh.png":[1800,766],"evidence/01-origin-theo-threat.png":[1400,1142],"evidence/02-no-telemetry-removed.png":[1200,900],"evidence/03-identify-codex-claude.png":[1000,980],"evidence/04-issue1397-no-optout.png":[900,760],"evidence/05-telemetry-cant-disable.png":[1400,1336],"evidence/06-pr42450-absolute-path.jpg":[1400,1144],"evidence/08-pr42380-220w-ip-axiom.jpg":[1400,1144],"evidence/09-pr42285-delete-account-leftover.jpg":[1400,1144],"evidence/10-issue17845-fake-delete.png":[920,840],"evidence/11-issue15353-auto-force-push.png":[1400,750],"evidence/12-antigravity-v1internal-spoof.png":[1400,750],"evidence/13-antigravity-ssh-spoof.png":[1400,750],"evidence/14-issue41536-fresh-ban.png":[1400,750],"evidence/15-connect-no-e2e.jpg":[1400,750],"evidence/16-pr32945-ovh-caddy-gateway.jpg":[1400,750],"evidence/17-theo-31t-tokens-10m-day.png":[1400,1214],"evidence/18-theo-vibe-kanban.png":[1400,1040],"evidence/19-cliproxy-gist-555pct.jpg":[1400,1120],"evidence/20-star-10x-cliff.png":[1400,1588],"evidence/21-pr29922-zhilsinger-review.png":[1400,1182],"evidence/22-contributing-vouched-ban.png":[960,840],"evidence/23-stealing-fork-bot.png":[1400,846],"evidence/24-pr41898-trademark-aftermath.png":[1400,766],"evidence/25-double-standard-chart-zh.png":[1400,934],"evidence/25-engineers-unemployment.png":[1400,1584],"evidence/26-cn-cesspit.png":[1400,810],"evidence/charts/theo-chart-1-overview.png":[2880,1920],"evidence/charts/theo-chart-2-rhythm.png":[2880,1920],"evidence/charts/theo-chart-3-double-standard.png":[2880,1920],"evidence/charts/theo-chart-4-cn-crisis.png":[2880,1920],"evidence/extra/ca81b7b9-a1-a4-a5-ttl-and-wsclaims.png":[1280,820],"evidence/extra/ca81b7b9-a1-cookie-origin-bypass.png":[1280,820],"evidence/extra/ca81b7b9-a1-lan-cookie-no-secure.png":[1512,810],"evidence/extra/ca81b7b9-a2-pr39483-silent-fix.png":[1512,810],"evidence/extra/ca81b7b9-a3-ipv6-loopback-killed.png":[1512,810],"evidence/extra/ca81b7b9-a4-ws-ticket-reuse-url.png":[1280,820],"evidence/extra/ca81b7b9-a5-30d-bearer-and-no-self-revoke.png":[1280,820],"evidence/extra/ca81b7b9-a6-submodule-recursive.png":[1512,810],"evidence/extra/p1-2b-trademark-md.png":[4240,4320],"evidence/extra/p1-3-maria-t3libre.png":[5840,3120],"evidence/extra/p1-4-github-t3code-search.png":[3312,4280],"evidence/extra/p1-5-x-get-better-lawyer.png":[2520,1952],"evidence/extra/p10-1-x-theo-apr25-trick-vcs.png":[2472,3045],"evidence/extra/p10-3-x-theo-nov2-trending.png":[2472,4686],"evidence/extra/p10-4a-pr29922-macroscope.png":[3392,1364],"evidence/extra/p10-5-gh-driver-arbitrary-repo.png":[4400,3328],"evidence/extra/p10-6-x-theo-nov24-missed-70k.png":[2472,4067],"evidence/extra/p2-1a-cliproxy-claude.png":[4560,1968],"evidence/extra/p2-1b-cliproxy-xai-agy.png":[4560,3728],"evidence/extra/p2-2-pr33800-cliproxy-agy.png":[6208,3400],"evidence/extra/p2-3-x-theo-cliproxy-clickhouse.png":[2520,1316],"evidence/extra/p2-4-x-theo-grokbot-tutorial.png":[2520,4513],"evidence/extra/p2-4b-x-theo-15k-ultra.png":[2520,3226],"evidence/extra/p2-5-x-theo-not-cliproxy.png":[2520,2682],"evidence/extra/p3-1-x-theo-patrick-many-prs.png":[2520,2146],"evidence/extra/p3-2-patrick-only-1-commit.png":[6176,2608],"evidence/extra/p3-3-pr29922-one-click-star.png":[6208,3400],"evidence/extra/p3-4-code-star-prompt.png":[4080,4624],"evidence/extra/p4-2-x-theo-daytona-investor.png":[2520,1106],"evidence/extra/p4-3-x-theo-paid-cloud-sandboxes.png":[2520,1796],"evidence/extra/p5-1-x-theo-managed-policy.png":[2472,1486],"evidence/extra/p5-2-x-theo-never-touches-servers.png":[2472,1561],"evidence/extra/p5-4-doc-managed-policy-paths.png":[4240,2960],"evidence/extra/p6-1-x-theo-800k-cost.png":[2472,1390],"evidence/extra/p6-3-x-theo-my-analytics.png":[2472,1294],"evidence/extra/p6-4-x-theo-investors.png":[2472,1362],"evidence/extra/p6-5-x-theo-98pct-usage.png":[2472,1102],"evidence/extra/p7-1-x-theo-nukes-machine.png":[2472,1102],"evidence/extra/p7-2-x-theo-yolo-merges.png":[2472,1258],"evidence/extra/p7-3-x-theo-unfollow-pr.png":[2472,2403],"evidence/extra/p7-4-x-theo-take-it-away.png":[2472,1066],"evidence/extra/p7-5-x-theo-pic-over-pr.png":[2472,1294],"evidence/extra/p8-2-x-theo-demonetize-cn.png":[2472,1198],"evidence/extra/p8-3-x-theo-autoblocker.png":[2472,1486],"evidence/extra/p8-4b-x-theo-copy-other-tools.png":[2472,1198],"evidence/extra/p8-4c-x-theo-mock-copying.png":[2472,3317],"evidence/extra/p9-1-x-theo-google-bridges.png":[2472,3018],"evidence/extra/p9-3-x-theo-local-ai-graves.png":[2472,1294],"evidence/extra/p9-4-x-theo-linux-larpers.png":[2472,1582],"evidence/extra/p9-5-x-theo-jail-rsd.png":[2472,3012],"evidence/extra/p9-5b-x-theo-stupid-bitch.png":[2472,1084],"evidence/extra/p9-7-x-theo-burning-trust.png":[2472,1102],"evidence/extra/t3code-12-issue-33639-theo-insult.png":[1512,810],"evidence/extra/t3code-13-pr-39483-secret-traversal.png":[1512,810],"evidence/extra/t3code-14-pr-30997-powershell-av.png":[1512,810],"evidence/extra/t3code-15-pr-41237-slophouse-drop-filter.png":[1512,810],"evidence/extra/t3code-16-faq-tos-guarantee.png":[1512,810],"evidence/extra/t3code-17-issue-40713-lie-and-bust.png":[1512,810],"evidence/extra/t3code-17b-issue-40713-schlessera-bust.png":[1512,810],"evidence/extra/t3code-18b-code-v1internal-call.png":[1512,810],"evidence/extra/t3code-20-pr-26876-spoof-zed.png":[1512,810],"evidence/extra/t3code-4-pr-27077-rejected.png":[900,680],"evidence/extra/t3code-5-pr-21506-theo-owner-tracking.png":[960,820],"evidence/extra/t3code-6-pr-5551-reality-check.png":[960,920],"evidence/extra/t3code-7-pr-33131-ai-brainrot.png":[920,740],"evidence/extra/t3code-9-issue-11222-process-spy.png":[920,840],"evidence/extra/x-post05-3-managed-endpoint-provider.jpg":[1512,810],"evidence/extra/x-post05-4-security-md-intended.jpg":[1512,810],"evidence/extra/x-post11-2-pr42376-windows-optout.jpg":[2048,1673],"evidence/extra/x-post11-3-pr42464-mac-shell-env.jpg":[2048,1673],"evidence/extra/x-post11-4-dump-264-claude-records.jpg":[1200,792],"evidence/extra/x-post12-3-pr42459-android-fcm-leak.jpg":[2048,1673],"evidence/extra/x-post12-4-pr42466-anonymous-batch.jpg":[2048,1673],"evidence/extra/x-post17-1-theo-youtube-sponsors.jpg":[1108,890],"evidence/extra/x-post17-2-maria-endless-deleted.jpg":[1108,894],"evidence/extra/x-post17-3-codex-45444-regression.jpg":[2048,1673],"evidence/extra/x-post17-5-rauchg-vercel-sponsor.jpg":[1108,794],"receipts/x-2124823227570745504-chinese-knockoff.webp":[2440,3668],"receipts/x-2124825920808829077-temu3-code.webp":[610,372],"receipts/x-2124989435154726982-trillion-dollar-oss.webp":[2440,1428],"receipts/x-2125019705270477102-low-quality-users.webp":[2440,1428],"receipts/x-2125082769395220688-always-illegal.webp":[2440,2996],"receipts/x-2125177947376300110-hurt-feelings-zh.webp":[2440,968],"receipts/x-2125182476943556955-zero-value.webp":[610,328],"receipts/x-2125193393450226024-not-apologizing.webp":[2440,1448]};
  function imgDimAttrs(path) {
    const clean = String(path || "").replace(/^\.?\//, "");
    const d = IMG_DIMS[clean];
    return d ? `width="${d[0]}" height="${d[1]}"` : "";
  }
  const mailLocaleCache = new Map();
  const state = {
    lang: SHARED_I18N ? SHARED_I18N.detectInitialLang() : "en",
    bundle: null,
    mailLocale: null,
    data: null,
    evidence: [],
    assetPrefix: "../",
    dataPrefix: "../data/",
    reportBase: "../",
    view: "inbox", // inbox | thread | attachments | activity | drive | people
    folder: "inbox", // inbox | starred | deleted | sent
    tab: "primary", // primary | bullying | telemetry
    topic: null,
    person: null,
    platform: "all",
    year: "all",
    sort: "newest",
    query: "",
    activeThreadId: null,
    starredIds: new Set(),
    readIds: new Set(),
    showOriginalMsgs: new Set(),
    lbGallery: null,
    lbIndex: -1,
    lbPrevFocus: null,
    modalPrevFocus: null
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function isZh() {
    return state.lang === "zh-CN" || state.lang === "zh-TW";
  }

  function t(key) {
    if (state.bundle && state.bundle.mail) {
      const aliasMap = {
        classicPortal: "homeTile",
        dockReport: "homeTile",
        openFullReport: "openHome"
      };
      const k = aliasMap[key] || key;
      const val = SHARED_I18N && SHARED_I18N.getKey ? SHARED_I18N.getKey(state.bundle.mail, k) : state.bundle.mail[k];
      if (val) return val;
    }
    const fallbackLang = isZh() ? "zh" : "en";
    return (I18N[fallbackLang] && I18N[fallbackLang][key]) || I18N.en[key] || key;
  }

  function fmt(template, vars) {
    if (SHARED_I18N && SHARED_I18N.fmt) return SHARED_I18N.fmt(template, vars);
    return String(template || "").replace(/\{(\w+)\}/g, (_, k) => (vars && k in vars ? String(vars[k]) : ""));
  }

  function escapeHtml(str) {
    if (SHARED_I18N && SHARED_I18N.escapeHtml) return SHARED_I18N.escapeHtml(str);
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function isolateHandlesHtml(escaped) {
    if (SHARED_I18N && SHARED_I18N.isolateHandlesHtml) return SHARED_I18N.isolateHandlesHtml(escaped);
    return escaped.replace(/(^|[^A-Za-z0-9_.])(@[A-Za-z0-9_]+)/g, '$1<bdi dir="ltr">$2</bdi>');
  }

  function escapeBidi(str) {
    return isolateHandlesHtml(escapeHtml(str));
  }

  function formatInline(raw) {
    const parts = String(raw || "").split(/(`[^`\n]+`)/g);
    return parts
      .map((part) => {
        if (part.length >= 2 && part.startsWith("`") && part.endsWith("`")) {
          return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
        }
        return isolateHandlesHtml(
          escapeHtml(part).replace(/\*\*([^\n]+?)\*\*/g, "<strong>$1</strong>")
        );
      })
      .join("");
  }

  function formatBody(text) {
    const lines = String(text || "").replace(/\r\n?/g, "\n").split("\n");
    const blocks = [];
    const ulRe = /^\s*(?:-|•)\s+(.+)$/;
    const olRe = /^\s*(\d+)\.\s+(.+)$/;
    const quoteRe = /^\s*>\s?(.*)$/;

    const isOrderedStart = (idx) => {
      const m = lines[idx].match(olRe);
      if (!m) return false;
      const num = Number(m[1]);
      if (num === 1) return true;
      let j = idx + 1;
      while (j < lines.length && /^\s*$/.test(lines[j])) j++;
      if (j < lines.length) {
        const m2 = lines[j].match(olRe);
        if (m2 && Number(m2[1]) === num + 1) return true;
      }
      return false;
    };

    let i = 0;
    while (i < lines.length) {
      if (/^\s*$/.test(lines[i])) {
        i++;
        continue;
      }

      if (quoteRe.test(lines[i])) {
        const qLines = [];
        while (i < lines.length && quoteRe.test(lines[i])) {
          qLines.push(lines[i].replace(quoteRe, "$1"));
          i++;
        }
        const qParas = [];
        let cur = [];
        for (const ql of qLines) {
          if (/^\s*$/.test(ql)) {
            if (cur.length) {
              qParas.push(`<p>${cur.map(formatInline).join("<br>")}</p>`);
              cur = [];
            }
          } else {
            cur.push(ql);
          }
        }
        if (cur.length) {
          qParas.push(`<p>${cur.map(formatInline).join("<br>")}</p>`);
        }
        if (qParas.length) {
          blocks.push(`<blockquote class="msg-quote">${qParas.join("")}</blockquote>`);
        }
        continue;
      }

      if (ulRe.test(lines[i])) {
        const items = [];
        while (i < lines.length) {
          const m = lines[i].match(ulRe);
          if (m) {
            items.push(`<li>${formatInline(m[1])}</li>`);
            i++;
            continue;
          }
          if (/^\s*$/.test(lines[i])) {
            let j = i + 1;
            while (j < lines.length && /^\s*$/.test(lines[j])) j++;
            if (j < lines.length && ulRe.test(lines[j])) {
              i = j;
              continue;
            }
          }
          break;
        }
        blocks.push(`<ul class="msg-list">${items.join("")}</ul>`);
        continue;
      }

      if (isOrderedStart(i)) {
        const items = [];
        const firstNum = Number(lines[i].match(olRe)[1]);
        while (i < lines.length) {
          const m = lines[i].match(olRe);
          if (m) {
            items.push(`<li>${formatInline(m[2])}</li>`);
            i++;
            continue;
          }
          if (/^\s*$/.test(lines[i])) {
            let j = i + 1;
            while (j < lines.length && /^\s*$/.test(lines[j])) j++;
            if (j < lines.length && olRe.test(lines[j])) {
              i = j;
              continue;
            }
          }
          break;
        }
        const startAttr = firstNum !== 1 ? ` start="${firstNum}"` : "";
        blocks.push(`<ol class="msg-list"${startAttr}>${items.join("")}</ol>`);
        continue;
      }

      const pLines = [];
      while (
        i < lines.length &&
        !/^\s*$/.test(lines[i]) &&
        !quoteRe.test(lines[i]) &&
        !ulRe.test(lines[i]) &&
        !isOrderedStart(i)
      ) {
        pLines.push(lines[i]);
        i++;
      }
      if (pLines.length) {
        blocks.push(`<p class="msg-p">${pLines.map(formatInline).join("<br>")}</p>`);
      }
    }

    return blocks.join("");
  }

  async function fetchMailLocaleFile(code) {
    if (mailLocaleCache.has(code)) return mailLocaleCache.get(code);
    try {
      const res = await fetch(`${state.dataPrefix}mail-threads/${encodeURIComponent(code)}.json?v=2`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const obj = await res.json();
      mailLocaleCache.set(code, obj);
      return obj;
    } catch (_) {
      mailLocaleCache.set(code, null);
      return null;
    }
  }

  async function loadMailTranslation(code) {
    if (!code || code === "en") return null;
    let obj = await fetchMailLocaleFile(code);
    if (!obj && code === "zh-TW") {
      obj = await fetchMailLocaleFile("zh-CN");
    }
    return obj;
  }

  function getLocThread(th) {
    return (state.mailLocale && state.mailLocale.threads && state.mailLocale.threads[th.id]) || null;
  }

  function getLocMsg(th, mi) {
    const lt = getLocThread(th);
    return (lt && Array.isArray(lt.messages) && lt.messages[mi]) || null;
  }

  function locThreadFields(th) {
    const lt = getLocThread(th);
    return {
      from: (lt && lt.from) || th.from,
      to: (lt && lt.to) || th.to,
      dateDisplay: (lt && lt.dateDisplay) || th.dateDisplay,
      subject: (lt && lt.subject) || (isZh() ? (th.subjectZh || th.subject) : th.subject),
      snippet: (lt && lt.snippet) || (isZh() ? (th.snippetZh || th.snippet) : th.snippet)
    };
  }

  function locTopicLabel(tp) {
    const fromMailLocale = state.mailLocale && state.mailLocale.topics && state.mailLocale.topics[tp.id];
    if (fromMailLocale) return fromMailLocale;
    const localized = t(`topics.${tp.id}`);
    if (localized && localized !== `topics.${tp.id}`) return localized;
    return isZh() ? tp.labelZh : tp.label;
  }

  function locPerson(p) {
    const lp = state.mailLocale && state.mailLocale.people && state.mailLocale.people[p.id];
    return {
      name: (lp && lp.name) || p.name,
      role: (lp && lp.role) || p.role
    };
  }

  function locEvidence(ev) {
    const le = state.mailLocale && state.mailLocale.evidence && state.mailLocale.evidence[ev.id];
    return {
      title: (le && le.title) || ev.title,
      caption: (le && le.caption) || ev.caption
    };
  }

  function locMessage(th, m, mi) {
    const lm = getLocMsg(th, mi);
    return {
      sender: (lm && lm.sender) || m.sender,
      handle: (lm && lm.handle) || m.handle,
      to: (lm && lm.to) || m.to,
      time: (lm && lm.time) || m.time,
      body: (lm && lm.body) || m.body,
      attTitle: (ai) => (lm && Array.isArray(lm.attachments) && lm.attachments[ai]) || (m.attachments[ai] && m.attachments[ai].title) || "",
      linkLabel: (li) => (lm && Array.isArray(lm.links) && lm.links[li]) || (m.links[li] && m.links[li].label) || ""
    };
  }

  function assetUrl(path) {
    if (!path) return "";
    if (/^https?:\/\//.test(path)) return path;
    const clean = path.replace(/^\.?\//, "");
    if (clean.startsWith("receipts/") && state.assetPrefix === "../../") {
      return "../" + clean;
    }
    return state.assetPrefix + clean;
  }

  function showToast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      el.hidden = true;
    }, 2400);
  }

  async function detectAssetPrefix() {
    const p = window.location.pathname || "/";
    if (/^\/?(index\.html)?$/.test(p)) {
      state.assetPrefix = "./";
      state.dataPrefix = "./data/";
      state.reportBase = "./";
    } else if (/^\/(mail|inbox)(\/index\.html|\/)?$/.test(p)) {
      state.assetPrefix = "../";
      state.dataPrefix = "../data/";
      state.reportBase = "../";
    } else {
      const isImageOk = async (url) => {
        try {
          const res = await fetch(url, { method: "HEAD" });
          const ct = (res.headers.get("content-type") || "").toLowerCase();
          return res.ok && ct.startsWith("image/");
        } catch (_) {
          return false;
        }
      };
      const inSubdir = /\/(mail|inbox)(\/|$)/.test(p);
      if (!inSubdir && (await isImageOk("./evidence/00-cover-en.png"))) {
        state.assetPrefix = "./";
        state.dataPrefix = "./data/";
        state.reportBase = "./";
      } else if (await isImageOk("../evidence/00-cover-en.png")) {
        state.assetPrefix = "../";
        state.dataPrefix = "../data/";
        state.reportBase = "../";
      } else if (await isImageOk("../../evidence/00-cover-en.png")) {
        state.assetPrefix = "../../";
        state.dataPrefix = "../data/";
        state.reportBase = "../";
      } else {
        state.assetPrefix = "../";
        state.dataPrefix = "../data/";
        state.reportBase = "../";
      }
    }

    $$("[data-report-link]").forEach((a) => {
      a.setAttribute("href", state.reportBase);
    });
  }

  function loadPersistedState(threads) {
    try {
      const savedStars = JSON.parse(localStorage.getItem("tmail-stars") || "null");
      if (Array.isArray(savedStars)) {
        state.starredIds = new Set(savedStars);
      } else {
        state.starredIds = new Set(threads.filter((th) => th.starredDefault).map((th) => th.id));
      }
      const savedRead = JSON.parse(localStorage.getItem("tmail-read") || "[]");
      if (Array.isArray(savedRead)) {
        state.readIds = new Set(savedRead);
      }
    } catch (_) {
      state.starredIds = new Set(threads.filter((th) => th.starredDefault).map((th) => th.id));
    }
  }

  function saveStars() {
    try {
      localStorage.setItem("tmail-stars", JSON.stringify(Array.from(state.starredIds)));
    } catch (_) {}
  }

  function saveRead() {
    try {
      localStorage.setItem("tmail-read", JSON.stringify(Array.from(state.readIds)));
    } catch (_) {}
  }

  function getFilteredThreads() {
    if (!state.data) return [];
    let list = state.data.threads.slice();

    if (state.folder === "starred") {
      list = list.filter((th) => state.starredIds.has(th.id));
    } else if (state.folder === "deleted") {
      list = list.filter((th) => th.deleted || th.topics.includes("deleted"));
    } else if (state.folder === "sent") {
      list = list.filter((th) => th.sentByTheo);
    }

    if (state.folder === "inbox" && !state.topic && !state.person) {
      if (state.tab === "bullying") {
        list = list.filter((th) => th.category === "bullying" || th.topics.includes("bullying") || th.topics.includes("double-standard"));
      } else if (state.tab === "telemetry") {
        list = list.filter((th) => th.category === "telemetry" || th.topics.includes("telemetry") || th.topics.includes("security"));
      }
    }

    if (state.topic) {
      list = list.filter((th) => th.topics.includes(state.topic));
    }

    if (state.person) {
      list = list.filter((th) => th.people.includes(state.person));
    }

    if (state.platform !== "all") {
      list = list.filter((th) => th.platform === state.platform);
    }

    if (state.year !== "all") {
      list = list.filter((th) => {
        if (state.year === "2023-2024") return th.date < "2025-01-01";
        if (state.year === "2025") return th.date >= "2025-01-01" && th.date < "2026-01-01";
        if (state.year === "2026-pre") return th.date >= "2026-01-01" && th.date <= "2026-11-22";
        if (state.year === "crisis") return th.date >= "2026-11-23";
        return true;
      });
    }

    if (state.query.trim()) {
      const q = state.query.trim().toLowerCase();
      const fromMatch = q.match(/from:([^\s]+)/);
      const toMatch = q.match(/to:([^\s]+)/);
      const freeText = q.replace(/(from|to):[^\s]+/g, "").trim();

      list = list.filter((th) => {
        const lt = getLocThread(th);
        const fromStr = `${th.from} ${(lt && lt.from) || ""}`.toLowerCase();
        const toStr = `${th.to} ${th.from} ${(lt && lt.to) || ""} ${(lt && lt.from) || ""}`.toLowerCase();
        if (fromMatch && !fromStr.includes(fromMatch[1])) return false;
        if (toMatch && !toStr.includes(toMatch[1])) return false;
        if (!freeText) return true;
        const locMsgs = lt && Array.isArray(lt.messages) ? lt.messages : [];
        const haystack = [
          th.subject,
          th.subjectZh,
          th.snippet,
          th.snippetZh,
          th.from,
          th.to,
          th.platform,
          th.date,
          th.dateDisplay,
          "#" + th.exhibit,
          lt && lt.subject,
          lt && lt.snippet,
          lt && lt.from,
          lt && lt.to,
          lt && lt.dateDisplay,
          ...th.messages.map((m, mi) => {
            const lm = locMsgs[mi];
            const enAtts = (m.attachments || []).map((a) => a.title).join(" ");
            const enLinks = (m.links || []).map((lk) => lk.label).join(" ");
            const locAtts = lm && Array.isArray(lm.attachments) ? lm.attachments.join(" ") : "";
            const locLinks = lm && Array.isArray(lm.links) ? lm.links.join(" ") : "";
            return [
              m.sender,
              m.handle,
              m.to,
              m.time,
              m.body,
              enAtts,
              enLinks,
              lm && lm.sender,
              lm && lm.handle,
              lm && lm.to,
              lm && lm.time,
              lm && lm.body,
              locAtts,
              locLinks
            ]
              .filter(Boolean)
              .join(" ");
          })
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(freeText);
      });
    }

    list.sort((a, b) => {
      if (state.sort === "oldest") return a.date.localeCompare(b.date);
      if (state.sort === "starred") {
        const sa = a.starCount + (state.starredIds.has(a.id) ? 1 : 0);
        const sb = b.starCount + (state.starredIds.has(b.id) ? 1 : 0);
        return sb - sa;
      }
      if (state.sort === "receipts") {
        const ra = a.messages.reduce((n, m) => n + (m.attachments ? m.attachments.length : 0), 0);
        const rb = b.messages.reduce((n, m) => n + (m.attachments ? m.attachments.length : 0), 0);
        return rb - ra || b.date.localeCompare(a.date);
      }
      return b.date.localeCompare(a.date);
    });

    return list;
  }

  function setMetaAttr(selector, val) {
    const el = document.querySelector(selector);
    if (el && val) el.setAttribute("content", val);
  }

  function updateMailMeta(title, desc) {
    if (title) {
      document.title = title;
      setMetaAttr('meta[property="og:title"]', title);
    }
    if (desc) {
      setMetaAttr('meta[name="description"]', desc);
      setMetaAttr('meta[property="og:description"]', desc);
    }
  }

  function applyInboxMeta() {
    if (state.lang === "en") {
      updateMailMeta(INITIAL_SEO.title, INITIAL_SEO.desc);
      setMetaAttr('meta[property="og:title"]', INITIAL_SEO.ogTitle);
      setMetaAttr('meta[property="og:description"]', INITIAL_SEO.ogDesc);
    } else {
      const pt = t("pageTitle");
      const pd = t("aboutBody");
      updateMailMeta(
        pt && pt !== "pageTitle" ? pt : INITIAL_SEO.title,
        pd && pd !== "aboutBody" ? pd : INITIAL_SEO.desc
      );
    }
  }

  async function applyI18n(nextCode) {
    const prevLang = state.lang;
    if (nextCode && SHARED_I18N) {
      state.lang = SHARED_I18N.normalizeLang(nextCode) || "en";
    }
    const targetLang = state.lang;
    if (prevLang !== targetLang && state.showOriginalMsgs) {
      state.showOriginalMsgs.clear();
    }
    if (SHARED_I18N) {
      SHARED_I18N.applyDirection(targetLang);
    }
    const [bundle, mailLocale] = await Promise.all([
      SHARED_I18N ? SHARED_I18N.loadBundle(targetLang, state.dataPrefix) : Promise.resolve(null),
      loadMailTranslation(targetLang)
    ]);
    if (state.lang !== targetLang) return;
    state.bundle = bundle;
    state.mailLocale = mailLocale;

    if (state.view !== "thread") applyInboxMeta();

    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = t(key);
      if (el.tagName !== "OPTION" && /@[A-Za-z0-9_]+/.test(val)) {
        el.innerHTML = escapeBidi(val);
      } else {
        el.textContent = val;
      }
    });
    const searchEl = $("#searchInput");
    if (searchEl) searchEl.placeholder = t("searchPlaceholder");
    const photosSearch = $("#photosSearchInput");
    if (photosSearch) photosSearch.placeholder = t("photosSearch");
  }

  function bindOverviewQuickBtns() {
    const oldestBtn = $("#quickOldestBtn");
    if (oldestBtn) {
      oldestBtn.addEventListener("click", () => {
        state.view = "inbox";
        state.folder = "inbox";
        state.sort = "oldest";
        $("#sortSelect").value = "oldest";
        renderAll();
        showToast(t("sortedOldestToast"));
      });
    }
    const randBtn = $("#quickRandomBtn");
    if (randBtn) {
      randBtn.addEventListener("click", openRandomThread);
    }
  }

  function updateCounts() {
    if (!state.data) return;
    const all = state.data.threads;
    $("#countInbox").textContent = all.length;
    $("#countStarred").textContent = state.starredIds.size;
    $("#countDeleted").textContent = all.filter((th) => th.deleted || th.topics.includes("deleted")).length;
    $("#countSent").textContent = all.filter((th) => th.sentByTheo).length;
    const countPhotosEl = $("#countPhotos");
    if (countPhotosEl && Array.isArray(state.evidence) && state.evidence.length) {
      countPhotosEl.textContent = state.evidence.length;
    }
    $("#tabBullyingCount").textContent = all.filter(
      (th) => th.category === "bullying" || th.topics.includes("bullying") || th.topics.includes("double-standard")
    ).length;
    $("#tabTelemetryCount").textContent = all.filter(
      (th) => th.category === "telemetry" || th.topics.includes("telemetry") || th.topics.includes("security")
    ).length;
  }

  function renderSidebar() {
    if (!state.data) return;

    // Folder active highlight
    $$(".folder-nav .nav-row").forEach((btn) => {
      const f = btn.getAttribute("data-folder");
      const isActive =
        (state.view === "attachments" && f === "attachments") ||
        (state.view === "activity" && f === "activity") ||
        ((state.view === "inbox" || state.view === "thread") && !state.topic && !state.person && state.folder === f);
      btn.classList.toggle("active", isActive);
    });

    // Topics
    const topicHtml = state.data.topics
      .map((tp) => {
        const count = state.data.threads.filter((th) => th.topics.includes(tp.id)).length;
        const active = state.topic === tp.id ? " active" : "";
        const label = locTopicLabel(tp);
        return `<li>
          <button type="button" class="topic-btn${active}" data-topic="${tp.id}">
            ${iconSvg(tp.icon)}
            <span class="nav-label">${escapeBidi(label)}</span>
            <span class="person-count">${count}</span>
          </button>
        </li>`;
      })
      .join("");
    $("#topicList").innerHTML = topicHtml;

    // People
    const allContactsActive = !state.person && state.view === "inbox" ? " active" : "";
    const peopleItems = [
      `<li><button type="button" class="person-btn${allContactsActive}" data-person="">
        <span class="person-name">${escapeBidi(t("allContacts"))}</span>
        <span class="person-count">${state.data.threads.length}</span>
      </button></li>`
    ];
    state.data.people.forEach((p) => {
      const count = state.data.threads.filter((th) => th.people.includes(p.id)).length;
      if (!count) return;
      const active = state.person === p.id ? " active" : "";
      const lp = locPerson(p);
      peopleItems.push(`<li>
        <button type="button" class="person-btn${active}" data-person="${p.id}">
          <span class="person-name">${escapeBidi(lp.name)}</span>
          <span class="person-count">${count}</span>
        </button>
      </li>`);
    });
    $("#peopleList").innerHTML = peopleItems.join("");

    // Bind topic/person clicks
    $$("#topicList .topic-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-topic");
        state.topic = state.topic === id ? null : id;
        state.person = null;
        state.folder = "inbox";
        state.view = "inbox";
        closeMobileSidebar();
        renderAll();
      });
    });

    $$("#peopleList .person-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-person");
        state.person = id || null;
        state.topic = null;
        state.folder = "inbox";
        state.view = "inbox";
        closeMobileSidebar();
        renderAll();
      });
    });
  }

  function renderActiveFilterBar() {
    const chips = [];
    if (state.topic) {
      const tp = state.data.topics.find((x) => x.id === state.topic);
      if (tp) {
        chips.push({
          label: `${t("topicPrefix")}: ${locTopicLabel(tp)}`,
          clear: () => {
            state.topic = null;
          }
        });
      }
    }
    if (state.person) {
      const p = state.data.people.find((x) => x.id === state.person);
      if (p) {
        chips.push({
          label: `${t("personPrefix")}: ${locPerson(p).name}`,
          clear: () => {
            state.person = null;
          }
        });
      }
    }
    if (state.platform !== "all") {
      const platLabel = state.platform === "Code" ? t("platCode") : state.platform;
      chips.push({
        label: `${t("sourcePrefix")}: ${platLabel}`,
        clear: () => {
          state.platform = "all";
          $("#platformFilter").value = "all";
        }
      });
    }
    if (state.year !== "all") {
      const yearMap = { "2026-pre": t("yearPre"), crisis: t("yearCrisis") };
      chips.push({
        label: `${t("datePrefix")}: ${yearMap[state.year] || state.year}`,
        clear: () => {
          state.year = "all";
          $("#yearFilter").value = "all";
        }
      });
    }
    if (state.query.trim()) {
      chips.push({
        label: `"${state.query.trim()}"`,
        clear: () => {
          state.query = "";
          $("#searchInput").value = "";
        }
      });
    }

    const bar = $("#activeFilterBar");
    if (!chips.length) {
      bar.hidden = true;
      bar.innerHTML = "";
      return;
    }
    bar.hidden = false;
    bar.innerHTML = chips
      .map(
        (c, idx) =>
          `<span class="active-chip">${escapeBidi(c.label)} <button type="button" data-clear-chip="${idx}" aria-label="Remove filter">×</button></span>`
      )
      .join("") + `<button type="button" class="inline-link-btn" id="clearAllFiltersBtn">${escapeHtml(t("clearFilters"))}</button>`;

    $$("[data-clear-chip]").forEach((btn) => {
      btn.addEventListener("click", () => {
        chips[Number(btn.getAttribute("data-clear-chip"))].clear();
        renderAll();
      });
    });
    $("#clearAllFiltersBtn").addEventListener("click", resetFilters);
  }

  function renderEmailList() {
    const list = getFilteredThreads();
    const total = list.length;
    $("#rangeLabel").textContent = total ? fmt(t("rangeFormat"), { a: 1, b: total, n: total }) : "0";

    // Show category tabs only on top-level Inbox with no person/topic filter
    $("#categoryTabs").hidden = !(state.folder === "inbox" && !state.topic && !state.person);
    $$(".cat-tab").forEach((btn) => {
      const active = btn.getAttribute("data-tab") === state.tab;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    renderActiveFilterBar();

    const container = $("#emailList");
    if (!total) {
      container.innerHTML = `<div class="empty-state">
        ${iconSvg("inbox")}
        <p>${escapeHtml(t("emptyList"))}</p>
        <button type="button" class="tool-btn" id="emptyResetBtn">${escapeHtml(t("clearFilters"))}</button>
      </div>`;
      $("#emptyResetBtn").addEventListener("click", resetFilters);
      return;
    }

    container.innerHTML = list
      .map((th) => {
        const starred = state.starredIds.has(th.id);
        const isRead = state.readIds.has(th.id);
        const lf = locThreadFields(th);
        const attCount = th.messages.reduce((n, m) => n + (m.attachments ? m.attachments.length : 0), 0);
        const msgCount = th.messages.length;
        const starDisplay = th.starCount + (starred ? 1 : 0);
        const chipClass = th.deleted ? " chip-deleted" : th.status === "open" ? " chip-open" : "";
        const platLabel = th.platform === "Code" ? t("platCode") : th.platform;
        const chipLabel = th.deleted ? t("chipDeleted") : platLabel;
        const leadMsg = th.messages && th.messages[0];
        const avatarChar = (leadMsg && leadMsg.avatar) || th.from.replace(/^@/, "").charAt(0).toUpperCase() || "T";
        const avatarColor = (leadMsg && leadMsg.color) || "#5f6368";

        return `<div class="email-row${isRead ? " is-read" : ""}" role="listitem" tabindex="0" data-thread-id="${th.id}">
          <div class="row-avatar" style="background:${escapeHtml(avatarColor)}" aria-hidden="true">${escapeHtml(avatarChar)}</div>
          <div class="row-controls">
            <button type="button" class="star-btn${starred ? " is-starred" : ""}" data-star-id="${th.id}" aria-label="Star thread" title="Star">
              ${iconSvg(starred ? "star" : "star_border", starred ? "is-filled" : "")}
              <span>${starDisplay}</span>
            </button>
          </div>
          <div class="row-sender">
            <span class="sender-name">${escapeBidi(lf.from)}</span>
            ${msgCount > 1 ? `<span class="msg-count">${msgCount}</span>` : ""}
          </div>
          <div class="row-main">
            <span class="platform-chip${chipClass}">${escapeHtml(chipLabel)}</span>
            <span class="row-subject">${escapeBidi(lf.subject)}</span>
            <span class="row-snippet">${escapeBidi(lf.snippet)}</span>
          </div>
          <div class="row-meta">
            ${attCount ? `<span class="attach-pill" title="${attCount}">${iconSvg("attach_file")}${attCount}</span>` : ""}
            <span class="row-date">${escapeHtml(lf.dateDisplay)}</span>
          </div>
        </div>`;
      })
      .join("");

    $$("#emailList .email-row").forEach((row) => {
      row.addEventListener("click", (e) => {
        if (e.target.closest("[data-star-id]")) return;
        openThread(row.getAttribute("data-thread-id"));
      });
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openThread(row.getAttribute("data-thread-id"));
        }
      });
    });

    $$("#emailList [data-star-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleStar(btn.getAttribute("data-star-id"));
      });
    });
  }

  function toggleStar(id) {
    if (state.starredIds.has(id)) {
      state.starredIds.delete(id);
    } else {
      state.starredIds.add(id);
    }
    saveStars();
    updateCounts();
    if (state.view === "thread" && state.activeThreadId === id) {
      renderThreadDetail();
    } else if (state.view === "inbox") {
      renderEmailList();
    }
  }

  function openThread(id, opts = {}) {
    const th = state.data.threads.find((x) => x.id === id);
    if (!th) return;
    state.activeThreadId = id;
    state.view = "thread";
    state.readIds.add(id);
    saveRead();
    try {
      const url = new URL(window.location.href);
      const prevThread = url.searchParams.get("thread");
      url.searchParams.set("thread", id);
      if (!opts.fromPopstate) {
        if (opts.replace || prevThread === id) {
          window.history.replaceState({ view: "thread", threadId: id }, "", url.toString());
        } else {
          window.history.pushState({ view: "thread", threadId: id }, "", url.toString());
        }
      }
    } catch (_) {}
    renderAll();
    $("#threadContent").scrollTop = 0;
  }

  function renderThreadDetail() {
    const list = getFilteredThreads();
    const th = state.data.threads.find((x) => x.id === state.activeThreadId);
    if (!th) {
      state.view = "inbox";
      renderAll();
      return;
    }

    const idx = list.findIndex((x) => x.id === th.id);
    const posText = idx >= 0 ? fmt(t("posFormat"), { i: idx + 1, n: list.length }) : `#${th.exhibit}`;
    $("#threadPosLabel").textContent = posText;
    $("#prevThreadBtn").disabled = idx <= 0;
    $("#nextThreadBtn").disabled = idx < 0 || idx >= list.length - 1;

    const starred = state.starredIds.has(th.id);
    const starBtn = $("#threadStarBtn");
    starBtn.innerHTML = iconSvg(starred ? "star" : "star_border", starred ? "is-filled" : "");
    starBtn.style.color = starred ? "#f4b400" : "";

    const CASE_SLUGS = {
      "00": "origin-fork-dispute-and-double-standard",
      "01": "default-telemetry-and-cross-tool-tracking",
      "02": "fake-sqlite-delete-and-process-scanner",
      "03": "silent-force-push-vs-21h-filter-removal",
      "04": "antigravity-spoofing-and-3-minute-bans",
      "05": "t3-connect-zero-e2e-plaintext-relay",
      "06": "angel-investor-conflicts-vibe-kanban-daytona",
      "07": "managed-policy-blind-spots",
      "08": "800k-spend-and-31t-token-radar",
      "09": "yolo-merges-vs-community-hostility",
      "10": "fork-scraping-bot-and-critics-suppression",
      "11": "nov25-clarification-contradicted-in-2-hours",
      "12": "post-gdpr-overnight-blitz-2m-ip-logs",
      "13": "zero-security-advisories-and-silent-patches",
      "14": "1151-tweet-quantitative-double-standard",
      "15": "zero-uspto-trademarks-and-retroactive-policy",
      "16": "two-year-pattern-of-bullying-and-deletions",
      "17": "sponsor-stack-and-quota-exploit-hypocrisy",
      "18": "77k-star-funnel-and-arbitrary-repo-starring",
      "19": "ca81b7b9-lan-cookie-bearer-ws-and-repo-rce"
    };
    const caseLang = SHARED_I18N ? (SHARED_I18N.normalizeLang(state.lang) || "en") : "en";
    const slug = CASE_SLUGS[th.exhibit];
    const exhibitUrl = slug
      ? `https://github.com/realchendahuang/temu3code/blob/main/cases/${caseLang}/${th.exhibit}-${slug}.md`
      : "https://github.com/realchendahuang/temu3code#all-20-verified-exhibits-0019";
    $("#threadExhibitTopLink").href = exhibitUrl;
    $("#threadExhibitTopLabel").textContent = `${t("fullExhibit")} #${th.exhibit}`;

    const lf = locThreadFields(th);
    const subject = lf.subject;
    updateMailMeta(`${subject} · Tmail`, lf.snippet || INITIAL_SEO.desc);
    const platLabel = th.platform === "Code" ? t("platCode") : th.platform;
    const statusLabel =
      th.status === "open"
        ? t("statusOpen")
        : th.status === "partial"
        ? t("statusPartial")
        : th.deleted
        ? t("statusDeleted")
        : t("statusRecord");
    const statusClass = th.deleted ? " chip-deleted" : th.status === "open" ? " chip-open" : "";

    const primaryLink = (th.messages[0] && th.messages[0].links && th.messages[0].links[0] && th.messages[0].links[0].url) || state.data.meta.repoUrl;
    const shareText = encodeURIComponent(`${lf.dateDisplay} · ${subject} (#${th.exhibit})`);
    const shareUrl = encodeURIComponent(window.location.href);

    const messagesHtml = th.messages
      .map((m, mi) => {
        const lm = locMessage(th, m, mi);
        const origBody = m.body || "";
        const locBody = lm.body || origBody;
        const hasTranslation = state.lang !== "en" && locBody.trim() !== origBody.trim();
        const msgKey = `${th.id}:${mi}`;
        const showingOrig = hasTranslation && state.showOriginalMsgs.has(msgKey);
        const activeBody = showingOrig ? origBody : locBody;

        const atts = (m.attachments || [])
          .map((a, ai) => {
            const attTitle = lm.attTitle(ai);
            const dims = imgDimAttrs(a.src);
            return `<button type="button" class="att-card" data-open-att="${mi}-${ai}">
              <img class="att-thumb" src="${escapeHtml(assetUrl(a.src))}" alt="${escapeHtml(attTitle)}" ${dims} loading="lazy" decoding="async" />
              <div class="att-meta">📎 ${escapeBidi(attTitle)}</div>
            </button>`;
          })
          .join("");

        const links = (m.links || [])
          .map(
            (lk, li) =>
              `<a class="source-link-pill" href="${escapeHtml(lk.url)}" target="_blank" rel="noopener noreferrer">↗ ${escapeBidi(lm.linkLabel(li))}</a>`
          )
          .join("");

        const origBtn = hasTranslation
          ? `<button type="button" class="msg-orig-btn${showingOrig ? " is-original" : ""}" data-toggle-orig="${mi}" aria-pressed="${showingOrig ? "true" : "false"}">${escapeHtml(showingOrig ? t("viewTranslated") : t("viewOriginalEn"))}</button>`
          : "";

        return `<article class="thread-msg-card">
          <div class="msg-avatar" style="background:${escapeHtml(m.color)}">${escapeHtml(m.avatar)}</div>
          <div class="msg-body-wrap">
            <div class="msg-head">
              <div>
                <div class="msg-sender-line">
                  <span class="msg-sender-name">${escapeBidi(lm.sender)}</span>
                  <span class="msg-handle">&lt;${escapeHtml(lm.handle)}&gt;</span>
                </div>
                <div class="msg-to">${escapeBidi(t("toPrefix"))} ${escapeBidi(lm.to)}</div>
              </div>
              <div class="msg-head-meta">
                ${origBtn}
                <div class="msg-time">${escapeHtml(lm.time)}</div>
              </div>
            </div>
            <div class="msg-text" data-msg-body="${mi}"${showingOrig ? ' dir="ltr"' : ""}>${formatBody(activeBody)}</div>
            ${atts ? `<div class="msg-attachments">${atts}</div>` : ""}
            ${links ? `<div class="msg-links">${links}</div>` : ""}
          </div>
        </article>`;
      })
      .join("");

    $("#threadContent").innerHTML = `<div class="thread-inner">
      <div class="thread-subject-row">
        <h1 class="thread-subject">${escapeBidi(subject)}</h1>
        <span class="platform-chip">${escapeHtml(platLabel)}</span>
        <span class="platform-chip${statusClass}">${escapeHtml(statusLabel)}</span>
        <span class="platform-chip">${escapeHtml(t("exhibitLabel"))} #${escapeHtml(th.exhibit)}</span>
      </div>
      ${messagesHtml}
      <div class="thread-footer-actions">
        <a class="gmail-reply-btn" href="${escapeHtml(primaryLink)}" target="_blank" rel="noopener noreferrer">
          ${iconSvg("reply")}
          <span>${escapeHtml(t("replyOriginal"))}</span>
        </a>
        <a class="gmail-reply-btn" href="https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener noreferrer">
          ${iconSvg("forward")}
          <span>${escapeHtml(t("shareOnX"))}</span>
        </a>
        <a class="gmail-reply-btn" href="${exhibitUrl}">
          ${iconSvg("article")}
          <span>${escapeHtml(t("fullExhibit"))} (#${escapeHtml(th.exhibit)})</span>
        </a>
        <button type="button" class="gmail-reply-btn" id="footerCopyBtn">
          ${iconSvg("link")}
          <span>${escapeHtml(t("copyLink"))}</span>
        </button>
        <button type="button" class="gmail-reply-btn" id="footerMemeBtn">
          ${iconSvg("style")}
          <span>${escapeHtml(t("viewMemeCard"))}</span>
        </button>
        <a class="gmail-reply-btn" href="./t/${encodeURIComponent(th.id)}/${isZh() ? "zh/" : ""}">
          ${iconSvg("open_in_new")}
          <span>HTML</span>
        </a>
      </div>
    </div>`;

    $$("#threadContent [data-toggle-orig]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mi = Number(btn.getAttribute("data-toggle-orig"));
        const msgKey = `${th.id}:${mi}`;
        const nextOrig = !state.showOriginalMsgs.has(msgKey);
        if (nextOrig) state.showOriginalMsgs.add(msgKey);
        else state.showOriginalMsgs.delete(msgKey);

        const m = th.messages[mi];
        const lm = locMessage(th, m, mi);
        const bodyText = nextOrig ? (m.body || "") : (lm.body || m.body || "");
        const card = btn.closest(".thread-msg-card");
        const textEl = card && card.querySelector(`[data-msg-body="${mi}"]`);
        if (textEl) {
          textEl.innerHTML = formatBody(bodyText);
          if (nextOrig) textEl.setAttribute("dir", "ltr");
          else textEl.removeAttribute("dir");
        }
        btn.classList.toggle("is-original", nextOrig);
        btn.setAttribute("aria-pressed", nextOrig ? "true" : "false");
        btn.textContent = nextOrig ? t("viewTranslated") : t("viewOriginalEn");
      });
    });

    const threadGallery = [];
    const attIndexMap = new Map();
    (th.messages || []).forEach((msg, mIdx) => {
      const lm = locMessage(th, msg, mIdx);
      (msg.attachments || []).forEach((att, aIdx) => {
        attIndexMap.set(`${mIdx}-${aIdx}`, threadGallery.length);
        threadGallery.push({
          src: assetUrl(att.src),
          title: lm.attTitle(aIdx),
          caption: `${lf.dateDisplay} · ${t("exhibitLabel")} #${th.exhibit}`,
          sourceUrl: primaryLink
        });
      });
    });

    $$("#threadContent [data-open-att]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-open-att");
        const gIdx = attIndexMap.get(key) || 0;
        const item = threadGallery[gIdx];
        if (!item) return;
        openLightbox(item.src, item.title, item.caption, item.sourceUrl, threadGallery, gIdx);
      });
    });

    $("#footerCopyBtn").addEventListener("click", copyCurrentThreadLink);
    $("#footerMemeBtn").addEventListener("click", () => openThreadMemesModal(th));
  }

  async function openThreadMemesModal(th) {
    const [_, overlay] = await Promise.all([
      (async () => {
        if (state.memes) return;
        try {
          const res = await fetch(`${state.dataPrefix}memes.json?v=6`);
          if (res.ok) {
            const obj = await res.json();
            state.memes = Array.isArray(obj.items) ? obj.items : [];
          } else {
            state.memes = [];
          }
        } catch (_) {
          state.memes = [];
        }
      })(),
      SHARED_I18N && SHARED_I18N.loadMemesOverlay
        ? SHARED_I18N.loadMemesOverlay(state.lang, state.dataPrefix)
        : Promise.resolve(null)
    ]);
    let matches = state.memes.filter((m) => m.exhibit === th.exhibit || m.thread === th.id);
    if (!matches.length) matches = state.memes.slice(0, 3);
    const cardsHtml = matches
      .slice(0, 6)
      .map((m) => {
        const picked = SHARED_I18N && SHARED_I18N.pickMemeText
          ? SHARED_I18N.pickMemeText(m, state.lang, overlay)
          : { title: isZh() ? m.titleZh : m.titleEn, note: isZh() ? m.noteZh : m.noteEn };
        const w = Number(m.width) || 900;
        const h = Number(m.height) || 900;
        return `<a class="meme-modal-card" href="../memes/#${encodeURIComponent(m.id)}">
          <img src="${escapeHtml(m.url)}" alt="${escapeHtml(picked.title)}" width="${w}" height="${h}" loading="lazy" decoding="async" />
          <strong class="meme-modal-title">${escapeBidi(picked.title)}</strong>
          ${picked.note ? `<span class="meme-modal-note">${escapeBidi(picked.note)}</span>` : ""}
          <span class="meme-modal-cta">${escapeHtml(t("copyInMemes"))}</span>
        </a>`;
      })
      .join("");
    openModal(
      `${t("viewMemeCard")} · #${th.exhibit}`,
      `<p class="modal-desc">${escapeHtml(t("memeModalDesc"))}</p>
      <div class="meme-modal-grid">${cardsHtml}</div>
      <div class="modal-actions">
        <a class="tool-btn" href="../memes/">${escapeHtml(t("openAllMemes"))}</a>
      </div>`
    );
  }

  function renderAttachmentsView(filterText = "") {
    const q = filterText.trim().toLowerCase();
    const items = state.evidence.filter((e) => {
      if (!q) return true;
      const le = locEvidence(e);
      return `${e.id} ${e.part} ${e.title} ${e.caption} ${le.title} ${le.caption} ${e.path}`.toLowerCase().includes(q);
    });

    const gallery = items.map((e) => {
      const le = locEvidence(e);
      return {
        src: assetUrl(e.path),
        title: `${e.id} · ${le.title}`,
        caption: le.caption,
        sourceUrl: e.sourceUrl || e.dossier
      };
    });

    $("#photosGrid").innerHTML = items
      .map((e, i) => {
        const le = locEvidence(e);
        const dims = imgDimAttrs(e.path);
        return `<button type="button" class="photo-card" data-ev-idx="${i}">
          <img src="${escapeHtml(assetUrl(e.path))}" alt="${escapeHtml(le.title)}" ${dims} loading="lazy" decoding="async" />
          <div class="photo-card-body">
            <span class="photo-card-part">${escapeHtml(e.id)} · ${escapeHtml(e.part)}</span>
            <div class="photo-card-title">${escapeBidi(le.title)}</div>
          </div>
        </button>`;
      })
      .join("");

    $$("#photosGrid .photo-card").forEach((card, i) => {
      card.addEventListener("click", () => {
        const item = gallery[i];
        if (!item) return;
        openLightbox(item.src, item.title, item.caption, item.sourceUrl, gallery, i);
      });
    });
  }

  function renderActivityView() {
    const metrics = [
      { num: "3.5+ yrs", label: t("tcalM1"), danger: false },
      { num: "0.0% vs 8.0%", label: t("tcalM2"), danger: true },
      { num: "4.0× (14.4%)", label: t("tcalM3"), danger: true },
      { num: "1,151", label: t("tcalM4"), danger: false },
      { num: "2.2M / hr", label: t("tcalM5"), danger: true },
      { num: "0", label: t("tcalM6"), danger: true }
    ];

    $("#activityMetrics").innerHTML = metrics
      .map(
        (m) => `<div class="metric-card">
          <div class="metric-num${m.danger ? " is-danger" : ""}">${escapeHtml(m.num)}</div>
          <div class="metric-label">${escapeHtml(m.label)}</div>
        </div>`
      )
      .join("");

    const charts = [
      { src: "evidence/charts/theo-chart-3-double-standard.png", title: t("tcalC1") },
      { src: "evidence/charts/theo-chart-4-cn-crisis.png", title: t("tcalC2") },
      { src: "evidence/charts/theo-chart-1-overview.png", title: t("tcalC3") },
      { src: "evidence/charts/theo-chart-2-rhythm.png", title: t("tcalC4") }
    ];

    const chartsGallery = charts.map((c) => ({
      src: assetUrl(c.src),
      title: c.title,
      caption: t("activityDesc"),
      sourceUrl: "https://github.com/realchendahuang/temu3code/blob/main/docs/dossiers/06-tweet-forensic-dataset-1151.md"
    }));

    $("#activityCharts").innerHTML = charts
      .map(
        (c, i) => `<button type="button" class="chart-card" data-chart-idx="${i}">
          <img src="${escapeHtml(assetUrl(c.src))}" alt="${escapeHtml(c.title)}" ${imgDimAttrs(c.src)} loading="lazy" decoding="async" />
          <div class="chart-card-cap">${escapeHtml(c.title)}</div>
        </button>`
      )
      .join("");

    $$("#activityCharts .chart-card").forEach((card, i) => {
      card.addEventListener("click", () => {
        const item = chartsGallery[i];
        if (!item) return;
        openLightbox(item.src, item.title, item.caption, item.sourceUrl, chartsGallery, i);
      });
    });

    const sortedOldest = state.data.threads.slice().sort((a, b) => a.date.localeCompare(b.date));
    $("#activityTimeline").innerHTML = sortedOldest
      .map((th) => {
        const lf = locThreadFields(th);
        const platLabel = th.platform === "Code" ? t("platCode") : th.platform;
        return `<div class="timeline-row" data-timeline-id="${th.id}">
          <span class="timeline-date">${escapeHtml(th.date)}</span>
          <div>
            <strong>${escapeBidi(lf.subject)}</strong>
            <div class="timeline-from">${escapeBidi(lf.from)}</div>
          </div>
          <span class="platform-chip">${escapeHtml(platLabel)} · #${escapeHtml(th.exhibit)}</span>
        </div>`;
      })
      .join("");

    $$("#activityTimeline .timeline-row").forEach((row) => {
      row.addEventListener("click", () => openThread(row.getAttribute("data-timeline-id")));
    });
  }

  function renderDriveView() {
    const openGh = escapeHtml(t("openOnGithub"));
    $("#driveGrid").innerHTML = DOSSIERS.map((d) => {
      const locTitle = t(`dossiers.${d.num}.title`);
      const locDesc = t(`dossiers.${d.num}.desc`);
      const title = locTitle && !locTitle.startsWith("dossiers.") ? locTitle : (isZh() ? d.titleZh : `Dossier ${d.num} · ${d.title}`);
      const desc = locDesc && !locDesc.startsWith("dossiers.") ? locDesc : d.desc;
      return `<a class="drive-card" href="${d.url}" target="_blank" rel="noopener noreferrer">
        <span class="photo-card-part">DOSSIER ${d.num}</span>
        <strong class="drive-card-title">${escapeHtml(title)}</strong>
        <span class="drive-card-desc">${escapeHtml(desc)}</span>
        <span class="drive-card-cta">${openGh}</span>
      </a>`;
    }).join("") + `
      <a class="drive-card" href="https://github.com/realchendahuang/temu3code/blob/main/docs/COMPLETE-SOURCE-INDEX.md" target="_blank" rel="noopener noreferrer">
        <span class="photo-card-part">INDEX</span>
        <strong class="drive-card-title">${escapeHtml(t("masterIndexTitle"))}</strong>
        <span class="drive-card-desc">${escapeHtml(t("masterIndexDesc"))}</span>
        <span class="drive-card-cta">${openGh}</span>
      </a>
      <a class="drive-card" href="https://github.com/realchendahuang/temu3code#2-minute-hardening--cleanup-playbook" target="_blank" rel="noopener noreferrer">
        <span class="photo-card-part">HARDENING</span>
        <strong class="drive-card-title">${escapeHtml(t("hardeningTitle"))}</strong>
        <span class="drive-card-desc">${escapeHtml(t("hardeningDesc"))}</span>
        <span class="drive-card-cta">${openGh}</span>
      </a>
    `;
  }

  function renderPeopleDirectory() {
    $("#peopleDirGrid").innerHTML = state.data.people
      .map((p) => {
        const matches = state.data.threads.filter((th) => th.people.includes(p.id)).sort((a, b) => a.date.localeCompare(b.date));
        if (!matches.length) return "";
        const lp = locPerson(p);
        const firstDate = locThreadFields(matches[0]).dateDisplay;
        const lastDate = locThreadFields(matches[matches.length - 1]).dateDisplay;
        const span = matches.length === 1 ? firstDate : `${firstDate} → ${lastDate}`;
        return `<button type="button" class="person-card" data-dir-person="${p.id}">
          <div class="person-card-head">
            <span class="person-avatar-sm" style="background:${p.color}">${escapeHtml(p.name.replace(/^@/, "").charAt(0).toUpperCase())}</span>
            <div>
              <div class="person-card-name">${escapeBidi(lp.name)}</div>
              <div class="person-card-role">${escapeBidi(lp.role)}</div>
            </div>
          </div>
          <div class="person-card-span">${matches.length} ${escapeHtml(matches.length === 1 ? t("threadWord") : t("threadsWord"))} · ${escapeHtml(span)}</div>
        </button>`;
      })
      .join("");

    $$("#peopleDirGrid .person-card").forEach((card) => {
      card.addEventListener("click", () => {
        state.person = card.getAttribute("data-dir-person");
        state.topic = null;
        state.folder = "inbox";
        state.view = "inbox";
        renderAll();
      });
    });
  }

  function updateDockAndPanes() {
    $("#listView").hidden = state.view !== "inbox";
    $("#threadView").hidden = state.view !== "thread";
    $("#attachmentsView").hidden = state.view !== "attachments";
    $("#activityView").hidden = state.view !== "activity";
    $("#driveView").hidden = state.view !== "drive";
    $("#peopleView").hidden = state.view !== "people";
    const ov = $("#overviewBanner");
    if (ov) ov.hidden = state.view !== "inbox";

    $$(".floating-dock .dock-btn[data-dock]").forEach((btn) => {
      const target = btn.getAttribute("data-dock");
      const active =
        (target === "inbox" && (state.view === "inbox" || state.view === "thread" || state.view === "people")) ||
        target === state.view;
      btn.classList.toggle("active", active);
    });
  }

  function renderAll() {
    updateCounts();
    renderSidebar();
    updateDockAndPanes();
    if (state.view !== "thread") applyInboxMeta();
    if (state.view === "inbox") renderEmailList();
    else if (state.view === "thread") renderThreadDetail();
    else if (state.view === "attachments") renderAttachmentsView($("#photosSearchInput").value || "");
    else if (state.view === "activity") renderActivityView();
    else if (state.view === "drive") renderDriveView();
    else if (state.view === "people") renderPeopleDirectory();
  }

  function resetFilters() {
    state.folder = "inbox";
    state.tab = "primary";
    state.topic = null;
    state.person = null;
    state.platform = "all";
    state.year = "all";
    state.query = "";
    state.view = "inbox";
    $("#platformFilter").value = "all";
    $("#yearFilter").value = "all";
    $("#searchInput").value = "";
    clearUrlThreadParam();
    renderAll();
  }

  function clearUrlThreadParam(opts = {}) {
    try {
      const url = new URL(window.location.href);
      if (!url.searchParams.has("thread")) return;
      url.searchParams.delete("thread");
      if (opts.push) {
        window.history.pushState({ view: state.view }, "", url.toString());
      } else {
        window.history.replaceState({ view: state.view }, "", url.toString());
      }
    } catch (_) {}
  }

  function openRandomThread() {
    if (!state.data || !state.data.threads.length) return;
    const pool = state.data.threads.filter((th) => th.id !== state.activeThreadId);
    const pick = pool[Math.floor(Math.random() * pool.length)] || state.data.threads[0];
    openThread(pick.id);
  }

  function copyCurrentThreadLink() {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => showToast(t("copied")));
    } else {
      showToast(url);
    }
  }

  function renderLightboxItem(item) {
    const img = $("#lightboxImg");
    img.src = BLANK_IMG;
    img.src = item.src;
    img.alt = item.title || "";
    $("#lightboxTitle").innerHTML = escapeBidi(item.title || "Receipt");
    $("#lightboxCaption").innerHTML = escapeBidi(item.caption || "");
    const srcLink = $("#lightboxSourceLink");
    if (item.sourceUrl) {
      srcLink.href = item.sourceUrl;
      srcLink.hidden = false;
    } else {
      srcLink.hidden = true;
    }
    const navGroup = $("#lightboxNavGroup");
    if (navGroup) {
      const hasMulti = Array.isArray(state.lbGallery) && state.lbGallery.length > 1;
      navGroup.hidden = !hasMulti;
      if (hasMulti) {
        $("#lightboxCounter").textContent = `${state.lbIndex + 1} / ${state.lbGallery.length}`;
      }
    }
  }

  function openLightbox(src, title, caption, sourceUrl, gallery = null, galleryIdx = 0) {
    const lb = $("#lightbox");
    if (lb.hidden) state.lbPrevFocus = document.activeElement;
    state.lbGallery = Array.isArray(gallery) && gallery.length > 1 ? gallery : null;
    state.lbIndex = state.lbGallery ? Math.max(0, Math.min(galleryIdx, state.lbGallery.length - 1)) : -1;
    const item = state.lbGallery ? state.lbGallery[state.lbIndex] : { src, title, caption, sourceUrl };
    renderLightboxItem(item);
    lb.hidden = false;
    $("#lightboxCloseBtn").focus();
  }

  function stepMailLightbox(delta) {
    if (!state.lbGallery || !state.lbGallery.length) return;
    state.lbIndex = (state.lbIndex + delta + state.lbGallery.length) % state.lbGallery.length;
    renderLightboxItem(state.lbGallery[state.lbIndex]);
  }

  function closeLightbox() {
    const lb = $("#lightbox");
    lb.hidden = true;
    $("#lightboxImg").src = BLANK_IMG;
    state.lbGallery = null;
    state.lbIndex = -1;
    if (state.lbPrevFocus && typeof state.lbPrevFocus.focus === "function") state.lbPrevFocus.focus();
    state.lbPrevFocus = null;
  }

  function openModal(title, html) {
    const ov = $("#modalOverlay");
    if (ov.hidden) state.modalPrevFocus = document.activeElement;
    $("#modalTitle").textContent = title;
    $("#modalBody").innerHTML = html;
    ov.hidden = false;
    $("#modalCloseBtn").focus();
  }

  function closeModal() {
    $("#modalOverlay").hidden = true;
    if (state.modalPrevFocus && typeof state.modalPrevFocus.focus === "function") state.modalPrevFocus.focus();
    state.modalPrevFocus = null;
  }

  function closeMobileSidebar() {
    $("#appShell").classList.remove("mobile-sidebar-open");
    $("#sidebarBackdrop").hidden = true;
  }

  function showSearchFilterPopover(mode) {
    const pop = $("#searchFilterPopover");
    const items =
      mode === "from"
        ? [
            { label: "@theo (Theo Browne)", token: "from:theo" },
            { label: "@jullerino (Julius)", token: "from:julius" },
            { label: "pingdotgg/t3code", token: "from:pingdotgg" },
            { label: "Community / Users", token: "from:users" },
            { label: "Security Audit", token: "from:audit" }
          ]
        : state.data.people.slice(0, 10).map((p) => ({
            label: locPerson(p).name,
            personId: p.id
          }));

    pop.innerHTML =
      `<div class="popover-heading">${escapeHtml(mode === "from" ? t("filterSender") : t("filterPerson"))}</div>` +
      items
        .map(
          (it, idx) =>
            `<button type="button" class="popover-item" data-pop-idx="${idx}"><span>${escapeBidi(it.label)}</span></button>`
        )
        .join("");
    pop.hidden = false;

    $$("#searchFilterPopover .popover-item").forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        const item = items[idx];
        if (item.personId) {
          state.person = item.personId;
          state.view = "inbox";
        } else {
          state.query = item.token;
          $("#searchInput").value = item.token;
          state.view = "inbox";
        }
        pop.hidden = true;
        renderAll();
      });
    });
  }

  function openSubmitReceiptModal() {
    const template = `## New Public-Record Receipt
- Date (UTC/CST): YYYY-MM-DD
- Counterparty / Target: @handle or project
- Source Platform: X / GitHub PR / Issue / YouTube / Official Docs
- Canonical URL (no t.co): https://...
- Verbatim Quote / Code Location: ...`;

    openModal(
      t("submitTitle"),
      `<p>${escapeHtml(t("submitBody"))}</p>
      <pre>${escapeHtml(template)}</pre>
      <div class="modal-actions">
        <a class="tool-btn" href="https://github.com/realchendahuang/temu3code/issues/new" target="_blank" rel="noopener noreferrer">${escapeHtml(t("submitIssueBtn"))}</a>
        <a class="tool-btn" href="https://github.com/realchendahuang/temu3code/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">${escapeHtml(t("submitGuideBtn"))}</a>
      </div>`
    );
  }

  function openAboutModal() {
    openModal(
      t("aboutTitle"),
      `<p>${escapeHtml(t("aboutBody"))}</p>
      <div class="modal-actions">
        <a class="tool-btn" href="${state.reportBase}">${escapeHtml(t("openHome"))}</a>
        <a class="tool-btn" href="../memes/">${escapeHtml(t("openAllMemes"))}</a>
        <a class="tool-btn" href="https://github.com/realchendahuang/temu3code" target="_blank" rel="noopener noreferrer">${escapeHtml(t("openOnGithub"))}</a>
      </div>`
    );
  }

  function openSupportModal() {
    if (!SUPPORT_CONFIG.enabled) return;
    const blocks = [];
    if (SUPPORT_CONFIG.usdtTrc20) {
      blocks.push(`<p><strong>USDT (TRC-20):</strong></p><pre>${escapeHtml(SUPPORT_CONFIG.usdtTrc20)}</pre>`);
    }
    if (SUPPORT_CONFIG.usdtErc20) {
      blocks.push(`<p><strong>USDT (ERC-20 / Arbitrum / Base):</strong></p><pre>${escapeHtml(SUPPORT_CONFIG.usdtErc20)}</pre>`);
    }
    if (SUPPORT_CONFIG.githubSponsors) {
      blocks.push(`<p><a class="tool-btn" href="${escapeHtml(SUPPORT_CONFIG.githubSponsors)}" target="_blank" rel="noopener noreferrer">GitHub Sponsors ↗</a></p>`);
    }
    openModal(
      isZh() ? SUPPORT_CONFIG.titleZh : SUPPORT_CONFIG.title,
      `<p>${escapeHtml(isZh() ? SUPPORT_CONFIG.noteZh : SUPPORT_CONFIG.note)}</p>${blocks.join("")}`
    );
  }

  function bindGlobalEvents() {
    $("#menuToggleBtn").addEventListener("click", () => {
      if (window.innerWidth <= 960) {
        const open = $("#appShell").classList.toggle("mobile-sidebar-open");
        $("#sidebarBackdrop").hidden = !open;
      } else {
        $("#appShell").classList.toggle("sidebar-collapsed");
      }
    });

    $("#sidebarBackdrop").addEventListener("click", closeMobileSidebar);

    $("#brandHomeLink").addEventListener("click", (e) => {
      e.preventDefault();
      resetFilters();
    });

    if (SHARED_I18N && $("#langSelect")) {
      SHARED_I18N.mountLangSelect($("#langSelect"), state.lang, async (next) => {
        await applyI18n(next);
        renderAll();
      });
    }

    $("#aboutBtn").addEventListener("click", openAboutModal);
    $("#composeBtn").addEventListener("click", openSubmitReceiptModal);
    $("#statsPillBtn").addEventListener("click", () => {
      state.view = "activity";
      renderAll();
    });

    if (SUPPORT_CONFIG.enabled) {
      const supBtn = $("#supportHeaderBtn");
      supBtn.hidden = false;
      supBtn.addEventListener("click", openSupportModal);
    }

    // Apps launcher & profile menus
    $("#appsLauncherBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      $("#profileMenu").hidden = true;
      $("#appsLauncherMenu").hidden = !$("#appsLauncherMenu").hidden;
    });
    $("#profileBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      $("#appsLauncherMenu").hidden = true;
      $("#profileMenu").hidden = !$("#profileMenu").hidden;
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".apps-wrap")) $("#appsLauncherMenu").hidden = true;
      if (!e.target.closest(".profile-wrap")) $("#profileMenu").hidden = true;
      if (!e.target.closest("#searchForm")) $("#searchFilterPopover").hidden = true;
    });

    $$("#appsLauncherMenu [data-suite]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.view = btn.getAttribute("data-suite");
        $("#appsLauncherMenu").hidden = true;
        renderAll();
      });
    });

    // Search
    $("#searchForm").addEventListener("submit", (e) => {
      e.preventDefault();
      state.query = $("#searchInput").value;
      state.view = "inbox";
      renderAll();
    });
    $("#searchInput").addEventListener("input", () => {
      state.query = $("#searchInput").value;
      if (state.view !== "inbox") state.view = "inbox";
      renderAll();
    });
    $("#chipFromBtn").addEventListener("click", () => showSearchFilterPopover("from"));
    $("#chipToBtn").addEventListener("click", () => showSearchFilterPopover("to"));

    // Overview banner removed for minimal inbox layout

    // Folders
    $$(".folder-nav .nav-row").forEach((btn) => {
      btn.addEventListener("click", () => {
        const f = btn.getAttribute("data-folder");
        state.topic = null;
        state.person = null;
        if (f === "attachments") {
          state.view = "attachments";
        } else if (f === "activity") {
          state.view = "activity";
        } else {
          state.folder = f;
          state.view = "inbox";
        }
        clearUrlThreadParam();
        closeMobileSidebar();
        renderAll();
      });
    });

    // Collapsible sections
    $("#topicsToggle").addEventListener("click", () => {
      const exp = $("#topicsToggle").getAttribute("aria-expanded") === "true";
      $("#topicsToggle").setAttribute("aria-expanded", String(!exp));
      $("#topicList").hidden = exp;
    });
    $("#peopleToggle").addEventListener("click", () => {
      const exp = $("#peopleToggle").getAttribute("aria-expanded") === "true";
      $("#peopleToggle").setAttribute("aria-expanded", String(!exp));
      $("#peopleListWrap").hidden = exp;
    });

    $("#browsePeopleBtn").addEventListener("click", () => {
      state.view = "people";
      closeMobileSidebar();
      renderAll();
    });
    $("#peopleBackBtn").addEventListener("click", () => {
      state.view = "inbox";
      renderAll();
    });

    // Toolbar filters & sort
    $("#resetFiltersBtn").addEventListener("click", resetFilters);
    $("#randomThreadBtn").addEventListener("click", openRandomThread);
    $("#platformFilter").addEventListener("change", (e) => {
      state.platform = e.target.value;
      renderAll();
    });
    $("#yearFilter").addEventListener("change", (e) => {
      state.year = e.target.value;
      renderAll();
    });
    $("#sortSelect").addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderAll();
    });

    // Category tabs
    $$(".cat-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.tab = btn.getAttribute("data-tab");
        renderAll();
      });
    });

    // Thread toolbar actions
    $("#backToInboxBtn").addEventListener("click", () => {
      state.view = "inbox";
      clearUrlThreadParam({ push: true });
      renderAll();
    });
    $("#threadStarBtn").addEventListener("click", () => {
      if (state.activeThreadId) toggleStar(state.activeThreadId);
    });
    $("#copyThreadLinkBtn").addEventListener("click", copyCurrentThreadLink);
    $("#prevThreadBtn").addEventListener("click", () => {
      const list = getFilteredThreads();
      const idx = list.findIndex((x) => x.id === state.activeThreadId);
      if (idx > 0) openThread(list[idx - 1].id);
    });
    $("#nextThreadBtn").addEventListener("click", () => {
      const list = getFilteredThreads();
      const idx = list.findIndex((x) => x.id === state.activeThreadId);
      if (idx >= 0 && idx < list.length - 1) openThread(list[idx + 1].id);
    });

    // TPhotos search & TCal jump
    $("#photosSearchInput").addEventListener("input", (e) => {
      renderAttachmentsView(e.target.value);
    });
    $("#activityToOldestBtn").addEventListener("click", () => {
      state.view = "inbox";
      state.folder = "inbox";
      state.sort = "oldest";
      $("#sortSelect").value = "oldest";
      renderAll();
    });

    // Floating dock
    $$(".floating-dock .dock-btn[data-dock]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-dock");
        state.view = target;
        if (target === "inbox") clearUrlThreadParam();
        renderAll();
      });
    });

    // Modal & Lightbox
    $("#modalCloseBtn").addEventListener("click", closeModal);
    $("#modalOverlay").addEventListener("click", (e) => {
      if (e.target === $("#modalOverlay")) closeModal();
    });
    $("#lightboxPrevBtn").addEventListener("click", () => stepMailLightbox(-1));
    $("#lightboxNextBtn").addEventListener("click", () => stepMailLightbox(1));
    $("#lightboxCloseBtn").addEventListener("click", closeLightbox);
    $("#lightbox").addEventListener("click", (e) => {
      if (e.target === $("#lightbox")) closeLightbox();
    });

    // Browser history Back/Forward support for thread view <-> inbox
    window.addEventListener("popstate", () => {
      if (!state.data) return;
      const deepThread = new URLSearchParams(window.location.search).get("thread");
      if (deepThread && state.data.threads.some((x) => x.id === deepThread)) {
        openThread(deepThread, { fromPopstate: true });
      } else {
        state.view = "inbox";
        state.activeThreadId = null;
        renderAll();
      }
    });

    // Global keyboard shortcuts (Gmail-style!)
    document.addEventListener("keydown", (e) => {
      if (!$("#lightbox").hidden) {
        if (e.key === "Escape") { e.preventDefault(); closeLightbox(); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); stepMailLightbox(-1); }
        else if (e.key === "ArrowRight") { e.preventDefault(); stepMailLightbox(1); }
        else if (e.key === "Tab" && SHARED_I18N && SHARED_I18N.trapFocus) {
          SHARED_I18N.trapFocus($(".lightbox-card"), e);
        }
        return;
      }
      if (!$("#modalOverlay").hidden) {
        if (e.key === "Escape") { e.preventDefault(); closeModal(); }
        else if (e.key === "Tab" && SHARED_I18N && SHARED_I18N.trapFocus) {
          SHARED_I18N.trapFocus($(".modal-card"), e);
        }
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        $("#searchInput").focus();
        $("#searchInput").select();
        return;
      }
      const inInput = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);
      if (e.key === "Escape") {
        if (state.view === "thread") {
          state.view = "inbox";
          clearUrlThreadParam({ push: true });
          renderAll();
        }
        return;
      }
      if (inInput) return;
      if (e.key === "/") {
        e.preventDefault();
        $("#searchInput").focus();
      } else if (e.key.toLowerCase() === "s" && state.view === "thread" && state.activeThreadId) {
        toggleStar(state.activeThreadId);
      }
    });
  }

  async function init() {
    bindGlobalEvents();
    const inSubdir = /\/(mail|inbox)(\/|$)/.test(window.location.pathname || "/");
    state.assetPrefix = inSubdir ? "../" : "./";
    state.dataPrefix = inSubdir ? "../data/" : "./data/";
    state.reportBase = state.assetPrefix;

    try {
      const [, threadsRes, evRes] = await Promise.all([
        detectAssetPrefix(),
        fetch("./threads.json?v=2"),
        fetch(`${state.dataPrefix}evidence.json?v=2`).catch(() => null),
        applyI18n(state.lang)
      ]);
      if (!threadsRes.ok) throw new Error(`HTTP ${threadsRes.status}`);
      state.data = await threadsRes.json();
      if (evRes && evRes.ok) {
        state.evidence = await evRes.json();
      }
      loadPersistedState(state.data.threads);
      if (state.lang !== "en") applyInboxMeta();

      // Check deep-link ?thread=..., ?sort=oldest, ?view=photos
      const params = new URLSearchParams(window.location.search);
      if (params.get("sort") === "oldest") {
        state.sort = "oldest";
        $("#sortSelect").value = "oldest";
      }
      const deepThread = params.get("thread");
      if (deepThread && state.data.threads.some((x) => x.id === deepThread)) {
        openThread(deepThread, { replace: true });
      } else if (params.get("view") === "photos" || window.location.hash === "#photos") {
        state.view = "attachments";
        renderAll();
      } else if (params.get("view") === "activity" || window.location.hash === "#activity") {
        state.view = "activity";
        renderAll();
      } else {
        renderAll();
      }
    } catch (err) {
      $("#emailList").innerHTML = `<div class="empty-state"><p>Failed to load public-record dataset: ${escapeHtml(err.message)}</p></div>`;
    }
  }

  init();
})();
