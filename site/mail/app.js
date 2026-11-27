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
      profileSub: "Viewing verbatim public statements, GitHub PRs, USPTO records & 109 receipts for @theo / pingdotgg/t3code (2023–2026).",
      openFullReport: "Back to Temu3 Home",
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
      photosTitle: "TPhotos — 109 Primary Visual Receipts",
      photosDesc: "Every archived screenshot, GitHub PR capture, USPTO check, and forensic chart from the repository. Click any image to inspect at full resolution.",
      activityTitle: "TCal — Multi-Year Pattern & 1,151-Tweet Activity",
      activityDesc: "Chronological timeline from May 2023 to Nov 2026 alongside the exhaustive 1,151-tweet quantitative dataset (Nov 7–24, 2026).",
      viewChronoInbox: "Open Chronological Inbox",
      driveTitle: "TDrive — 6 Deep Dossiers & 327 Primary Sources",
      driveDesc: "Line-by-line source code audits, verbatim SQL, USPTO TSDR records, and 2-minute hardening commands.",
      peopleDirTitle: "People & Counterparties Directory",
      peopleDirDesc: "Click any person or community below to filter every documented interaction with @theo and pingdotgg/t3code.",
      backInbox: "← Back to Inbox",
      dockReport: "Temu3",
      searchPlaceholder: "Search public record (e.g. Temu, FFmpeg, 41.6 GB, PR #42450, Antigravity...)",
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
      profileSub: "收录 @theo 与 pingdotgg/t3code 的公开原文、GitHub PR/Issue、USPTO 商标查询及 109 份存档截图（2023–2026）。",
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
      photosTitle: "TPhotos — 109 份一手截图证据库",
      photosDesc: "仓库完整归档的推文截图、PR 源码截图、USPTO 记录与统计图表，点击任意图片查看原图。",
      activityTitle: "TCal — 3.5 年时间线与 1,151 条推文定量分析",
      activityDesc: "完整还原 2023 年 5 月至 2026 年 11 月公开行为轨迹，结合 1,151 条连续推文定量统计图表。",
      viewChronoInbox: "按最早时间浏览收件箱",
      driveTitle: "TDrive — 6 份深度技术卷宗与 327 条一手信源",
      driveDesc: "逐行源码审计、SQL 取证、USPTO 商标检索及 2 分钟清理加固命令。",
      peopleDirTitle: "涉及人物与开发者群体目录",
      peopleDirDesc: "点击任意人物或群体，立刻筛选与 @theo 及 pingdotgg/t3code 的全部公开交互记录。",
      backInbox: "← 返回收件箱",
      dockReport: "主页",
      searchPlaceholder: "搜索公共记录（如 Temu、FFmpeg、41.6 GB、PR #42450、Antigravity...）",
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
  const state = {
    lang: SHARED_I18N ? SHARED_I18N.detectInitialLang() : "en",
    bundle: null,
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
    readIds: new Set()
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
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatBody(text) {
    return escapeHtml(text).replace(/`([^`\n]+)`/g, "<code>$1</code>");
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
    const isImageOk = async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const ct = (res.headers.get("content-type") || "").toLowerCase();
        return res.ok && ct.startsWith("image/");
      } catch (_) {
        return false;
      }
    };

    const p = window.location.pathname || "/";
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
        if (fromMatch && !th.from.toLowerCase().includes(fromMatch[1])) return false;
        if (toMatch && !`${th.to} ${th.from}`.toLowerCase().includes(toMatch[1])) return false;
        if (!freeText) return true;
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
          ...th.messages.map((m) => `${m.sender} ${m.handle} ${m.body}`)
        ]
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

  async function applyI18n(nextCode) {
    if (nextCode && SHARED_I18N) {
      state.lang = SHARED_I18N.normalizeLang(nextCode) || "en";
    }
    if (SHARED_I18N) {
      SHARED_I18N.applyDirection(state.lang);
      state.bundle = await SHARED_I18N.loadBundle(state.lang, state.dataPrefix);
    }
    const pt = t("pageTitle");
    if (pt && pt !== "pageTitle") document.title = pt;

    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
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
        const localized = t(`topics.${tp.id}`);
        const label = localized && localized !== `topics.${tp.id}` ? localized : (isZh() ? tp.labelZh : tp.label);
        return `<li>
          <button type="button" class="topic-btn${active}" data-topic="${tp.id}">
            <span class="material-symbols-outlined">${tp.icon}</span>
            <span class="nav-label">${escapeHtml(label)}</span>
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
        <span class="person-name">${escapeHtml(t("allContacts"))}</span>
        <span class="person-count">${state.data.threads.length}</span>
      </button></li>`
    ];
    state.data.people.forEach((p) => {
      const count = state.data.threads.filter((th) => th.people.includes(p.id)).length;
      if (!count) return;
      const active = state.person === p.id ? " active" : "";
      peopleItems.push(`<li>
        <button type="button" class="person-btn${active}" data-person="${p.id}">
          <span class="person-name">${escapeHtml(p.name)}</span>
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
        const localized = t(`topics.${tp.id}`);
        const tpLabel = localized && localized !== `topics.${tp.id}` ? localized : (isZh() ? tp.labelZh : tp.label);
        chips.push({
          label: `${t("topicPrefix")}: ${tpLabel}`,
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
          label: `${t("personPrefix")}: ${p.name}`,
          clear: () => {
            state.person = null;
          }
        });
      }
    }
    if (state.platform !== "all") {
      chips.push({
        label: `${t("sourcePrefix")}: ${state.platform}`,
        clear: () => {
          state.platform = "all";
          $("#platformFilter").value = "all";
        }
      });
    }
    if (state.year !== "all") {
      chips.push({
        label: `${t("datePrefix")}: ${state.year}`,
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
          `<span class="active-chip">${escapeHtml(c.label)} <button type="button" data-clear-chip="${idx}" aria-label="Remove filter">×</button></span>`
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
        <span class="material-symbols-outlined">inbox</span>
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
        const subject = isZh() ? th.subjectZh : th.subject;
        const snippet = isZh() ? th.snippetZh : th.snippet;
        const attCount = th.messages.reduce((n, m) => n + (m.attachments ? m.attachments.length : 0), 0);
        const msgCount = th.messages.length;
        const starDisplay = th.starCount + (starred ? 1 : 0);
        const chipClass = th.deleted ? " chip-deleted" : th.status === "open" ? " chip-open" : "";
        const chipLabel = th.deleted ? t("chipDeleted") : th.platform;
        const leadMsg = th.messages && th.messages[0];
        const avatarChar = (leadMsg && leadMsg.avatar) || th.from.replace(/^@/, "").charAt(0).toUpperCase() || "T";
        const avatarColor = (leadMsg && leadMsg.color) || "#5f6368";

        return `<div class="email-row${isRead ? " is-read" : ""}" role="listitem" tabindex="0" data-thread-id="${th.id}">
          <div class="row-avatar" style="background:${escapeHtml(avatarColor)}" aria-hidden="true">${escapeHtml(avatarChar)}</div>
          <div class="row-controls">
            <button type="button" class="star-btn${starred ? " is-starred" : ""}" data-star-id="${th.id}" aria-label="Star thread" title="Star">
              <span class="material-symbols-outlined">${starred ? "star" : "star_border"}</span>
              <span>${starDisplay}</span>
            </button>
          </div>
          <div class="row-sender">
            <span class="sender-name">${escapeHtml(th.from)}</span>
            ${msgCount > 1 ? `<span class="msg-count">${msgCount}</span>` : ""}
          </div>
          <div class="row-main">
            <span class="platform-chip${chipClass}">${escapeHtml(chipLabel)}</span>
            <span class="row-subject">${escapeHtml(subject)}</span>
            <span class="row-snippet">${escapeHtml(snippet)}</span>
          </div>
          <div class="row-meta">
            ${attCount ? `<span class="attach-pill" title="${attCount}"><span class="material-symbols-outlined">attach_file</span>${attCount}</span>` : ""}
            <span class="row-date">${escapeHtml(th.dateDisplay)}</span>
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

  function openThread(id) {
    const th = state.data.threads.find((x) => x.id === id);
    if (!th) return;
    state.activeThreadId = id;
    state.view = "thread";
    state.readIds.add(id);
    saveRead();
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("thread", id);
      window.history.replaceState({}, "", url.toString());
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
    starBtn.innerHTML = `<span class="material-symbols-outlined${starred ? " is-filled" : ""}" style="${starred ? "color:#f4b400" : ""}">${starred ? "star" : "star_border"}</span>`;

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

    const subject = isZh() ? th.subjectZh : th.subject;
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
    const shareText = encodeURIComponent(`${th.dateDisplay} · ${subject} (#${th.exhibit})`);
    const shareUrl = encodeURIComponent(window.location.href);

    const messagesHtml = th.messages
      .map((m, mi) => {
        const atts = (m.attachments || [])
          .map(
            (a, ai) => `<button type="button" class="att-card" data-open-att="${mi}-${ai}">
              <img class="att-thumb" src="${escapeHtml(assetUrl(a.src))}" alt="${escapeHtml(a.title)}" loading="lazy" />
              <div class="att-meta">📎 ${escapeHtml(a.title)}</div>
            </button>`
          )
          .join("");

        const links = (m.links || [])
          .map(
            (lk) =>
              `<a class="source-link-pill" href="${escapeHtml(lk.url)}" target="_blank" rel="noopener noreferrer">↗ ${escapeHtml(lk.label)}</a>`
          )
          .join("");

        return `<article class="thread-msg-card">
          <div class="msg-avatar" style="background:${escapeHtml(m.color)}">${escapeHtml(m.avatar)}</div>
          <div class="msg-body-wrap">
            <div class="msg-head">
              <div>
                <div class="msg-sender-line">
                  <span class="msg-sender-name">${escapeHtml(m.sender)}</span>
                  <span class="msg-handle">&lt;${escapeHtml(m.handle)}&gt;</span>
                </div>
                <div class="msg-to">${escapeHtml(t("toPrefix"))} ${escapeHtml(m.to)}</div>
              </div>
              <div class="msg-time">${escapeHtml(m.time)}</div>
            </div>
            <div class="msg-text">${formatBody(m.body)}</div>
            ${atts ? `<div class="msg-attachments">${atts}</div>` : ""}
            ${links ? `<div class="msg-links">${links}</div>` : ""}
          </div>
        </article>`;
      })
      .join("");

    $("#threadContent").innerHTML = `<div class="thread-inner">
      <div class="thread-subject-row">
        <h1 class="thread-subject">${escapeHtml(subject)}</h1>
        <span class="platform-chip">${escapeHtml(th.platform)}</span>
        <span class="platform-chip${statusClass}">${escapeHtml(statusLabel)}</span>
        <span class="platform-chip">${escapeHtml(t("exhibitLabel"))} #${escapeHtml(th.exhibit)}</span>
      </div>
      ${messagesHtml}
      <div class="thread-footer-actions">
        <a class="gmail-reply-btn" href="${escapeHtml(primaryLink)}" target="_blank" rel="noopener noreferrer">
          <span class="material-symbols-outlined">reply</span>
          <span>${escapeHtml(t("replyOriginal"))}</span>
        </a>
        <a class="gmail-reply-btn" href="https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener noreferrer">
          <span class="material-symbols-outlined">forward</span>
          <span>${escapeHtml(t("shareOnX"))}</span>
        </a>
        <a class="gmail-reply-btn" href="${exhibitUrl}">
          <span class="material-symbols-outlined">article</span>
          <span>${escapeHtml(t("fullExhibit"))} (#${escapeHtml(th.exhibit)})</span>
        </a>
        <button type="button" class="gmail-reply-btn" id="footerCopyBtn">
          <span class="material-symbols-outlined">link</span>
          <span>${escapeHtml(t("copyLink"))}</span>
        </button>
        <button type="button" class="gmail-reply-btn" id="footerMemeBtn">
          <span class="material-symbols-outlined">style</span>
          <span>${escapeHtml(t("viewMemeCard"))}</span>
        </button>
      </div>
    </div>`;

    $$("#threadContent [data-open-att]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [mi, ai] = btn.getAttribute("data-open-att").split("-").map(Number);
        const att = th.messages[mi].attachments[ai];
        openLightbox(assetUrl(att.src), att.title, `${th.dateDisplay} · Exhibit #${th.exhibit}`, primaryLink);
      });
    });

    $("#footerCopyBtn").addEventListener("click", copyCurrentThreadLink);
    $("#footerMemeBtn").addEventListener("click", () => openThreadMemesModal(th));
  }

  async function openThreadMemesModal(th) {
    if (!state.memes) {
      try {
        const res = await fetch(`${state.dataPrefix}memes.json?v=4`);
        if (res.ok) {
          const obj = await res.json();
          state.memes = Array.isArray(obj.items) ? obj.items : [];
        } else {
          state.memes = [];
        }
      } catch (_) {
        state.memes = [];
      }
    }
    let matches = state.memes.filter((m) => m.exhibit === th.exhibit || m.thread === th.id);
    if (!matches.length) matches = state.memes.slice(0, 3);
    const cardsHtml = matches
      .slice(0, 6)
      .map((m) => {
        const title = isZh() ? m.titleZh : m.titleEn;
        const note = isZh() ? m.noteZh : m.noteEn;
        return `<a href="../memes/#${encodeURIComponent(m.id)}" style="display:flex;flex-direction:column;gap:6px;padding:8px;border:1px solid #dadce0;border-radius:10px;text-decoration:none;color:#202124;background:#fff;">
          <img src="${escapeHtml(m.url)}" alt="${escapeHtml(title)}" style="width:100%;height:auto;border-radius:6px;display:block;" loading="lazy" />
          <strong style="font-size:12.5px;line-height:1.35;">${escapeHtml(title)}</strong>
          ${note ? `<span style="font-size:11.5px;line-height:1.45;color:#5f6368;">${escapeHtml(note)}</span>` : ""}
          <span style="font-size:11px;color:#0b57d0;">${escapeHtml(t("copyInMemes"))}</span>
        </a>`;
      })
      .join("");
    openModal(
      `${t("viewMemeCard")} · #${th.exhibit}`,
      `<p style="margin-top:0;font-size:13px;color:#5f6368;">${escapeHtml(t("memeModalDesc"))}</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;">${cardsHtml}</div>
      <div style="margin-top:14px;display:flex;justify-content:flex-end;">
        <a class="tool-btn" href="../memes/">${escapeHtml(t("openAllMemes"))}</a>
      </div>`
    );
  }

  function renderAttachmentsView(filterText = "") {
    const q = filterText.trim().toLowerCase();
    const items = state.evidence.filter((e) => {
      if (!q) return true;
      return `${e.id} ${e.part} ${e.title} ${e.caption} ${e.path}`.toLowerCase().includes(q);
    });

    $("#photosGrid").innerHTML = items
      .map(
        (e, i) => `<button type="button" class="photo-card" data-ev-idx="${i}">
          <img src="${escapeHtml(assetUrl(e.path))}" alt="${escapeHtml(e.title)}" loading="lazy" />
          <div class="photo-card-body">
            <span class="photo-card-part">${escapeHtml(e.id)} · ${escapeHtml(e.part)}</span>
            <div class="photo-card-title">${escapeHtml(e.title)}</div>
          </div>
        </button>`
      )
      .join("");

    $$("#photosGrid .photo-card").forEach((card, i) => {
      card.addEventListener("click", () => {
        const ev = items[i];
        openLightbox(assetUrl(ev.path), `${ev.id} · ${ev.title}`, ev.caption, ev.sourceUrl || ev.dossier);
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

    $("#activityCharts").innerHTML = charts
      .map(
        (c, i) => `<div class="chart-card" data-chart-idx="${i}">
          <img src="${escapeHtml(assetUrl(c.src))}" alt="${escapeHtml(c.title)}" />
          <div class="chart-card-cap">${escapeHtml(c.title)}</div>
        </div>`
      )
      .join("");

    $$("#activityCharts .chart-card").forEach((card, i) => {
      card.addEventListener("click", () => {
        openLightbox(assetUrl(charts[i].src), charts[i].title, "Forensic Dataset (n = 1,151, Nov 7–24, 2026)", "https://github.com/realchendahuang/temu3code/blob/main/docs/dossiers/06-tweet-forensic-dataset-1151.md");
      });
    });

    const sortedOldest = state.data.threads.slice().sort((a, b) => a.date.localeCompare(b.date));
    $("#activityTimeline").innerHTML = sortedOldest
      .map((th) => {
        const subject = isZh() ? th.subjectZh : th.subject;
        return `<div class="timeline-row" data-timeline-id="${th.id}">
          <span class="timeline-date">${escapeHtml(th.date)}</span>
          <div>
            <strong>${escapeHtml(subject)}</strong>
            <div style="font-size:12px;color:#5f6368;margin-top:2px;">${escapeHtml(th.from)}</div>
          </div>
          <span class="platform-chip">${escapeHtml(th.platform)} · #${escapeHtml(th.exhibit)}</span>
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
        <strong style="font-size:14px;">${escapeHtml(title)}</strong>
        <span style="font-size:12.5px;color:#5f6368;">${escapeHtml(desc)}</span>
        <span style="font-size:12px;color:#0b57d0;font-weight:600;margin-top:auto;">${openGh}</span>
      </a>`;
    }).join("") + `
      <a class="drive-card" href="https://github.com/realchendahuang/temu3code/blob/main/docs/COMPLETE-SOURCE-INDEX.md" target="_blank" rel="noopener noreferrer">
        <span class="photo-card-part">INDEX</span>
        <strong style="font-size:14px;">${escapeHtml(t("masterIndexTitle"))}</strong>
        <span style="font-size:12.5px;color:#5f6368;">${escapeHtml(t("masterIndexDesc"))}</span>
        <span style="font-size:12px;color:#0b57d0;font-weight:600;margin-top:auto;">${openGh}</span>
      </a>
      <a class="drive-card" href="https://github.com/realchendahuang/temu3code#2-minute-hardening--cleanup-playbook" target="_blank" rel="noopener noreferrer">
        <span class="photo-card-part">HARDENING</span>
        <strong style="font-size:14px;">${escapeHtml(t("hardeningTitle"))}</strong>
        <span style="font-size:12.5px;color:#5f6368;">${escapeHtml(t("hardeningDesc"))}</span>
        <span style="font-size:12px;color:#0b57d0;font-weight:600;margin-top:auto;">${openGh}</span>
      </a>
    `;
  }

  function renderPeopleDirectory() {
    $("#peopleDirGrid").innerHTML = state.data.people
      .map((p) => {
        const matches = state.data.threads.filter((th) => th.people.includes(p.id)).sort((a, b) => a.date.localeCompare(b.date));
        if (!matches.length) return "";
        const span = matches.length === 1 ? matches[0].dateDisplay : `${matches[0].dateDisplay} → ${matches[matches.length - 1].dateDisplay}`;
        return `<button type="button" class="person-card" data-dir-person="${p.id}">
          <div class="person-card-head">
            <span class="person-avatar-sm" style="background:${p.color}">${escapeHtml(p.name.replace(/^@/, "").charAt(0).toUpperCase())}</span>
            <div>
              <div class="person-card-name">${escapeHtml(p.name)}</div>
              <div class="person-card-role">${escapeHtml(p.role)}</div>
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

  function clearUrlThreadParam() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("thread");
      window.history.replaceState({}, "", url.toString());
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

  function openLightbox(src, title, caption, sourceUrl) {
    $("#lightboxImg").src = src;
    $("#lightboxImg").alt = title || "";
    $("#lightboxTitle").textContent = title || "Receipt";
    $("#lightboxCaption").textContent = caption || "";
    const srcLink = $("#lightboxSourceLink");
    if (sourceUrl) {
      srcLink.href = sourceUrl;
      srcLink.hidden = false;
    } else {
      srcLink.hidden = true;
    }
    $("#lightbox").hidden = false;
  }

  function closeLightbox() {
    $("#lightbox").hidden = true;
  }

  function openModal(title, html) {
    $("#modalTitle").textContent = title;
    $("#modalBody").innerHTML = html;
    $("#modalOverlay").hidden = false;
  }

  function closeModal() {
    $("#modalOverlay").hidden = true;
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
            label: p.name,
            personId: p.id
          }));

    pop.innerHTML =
      `<div class="popover-heading">${escapeHtml(mode === "from" ? t("filterSender") : t("filterPerson"))}</div>` +
      items
        .map(
          (it, idx) =>
            `<button type="button" class="popover-item" data-pop-idx="${idx}"><span>${escapeHtml(it.label)}</span></button>`
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
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;">
        <a class="tool-btn" href="https://github.com/realchendahuang/temu3code/issues/new" target="_blank" rel="noopener noreferrer">${escapeHtml(t("submitIssueBtn"))}</a>
        <a class="tool-btn" href="https://github.com/realchendahuang/temu3code/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">${escapeHtml(t("submitGuideBtn"))}</a>
      </div>`
    );
  }

  function openAboutModal() {
    openModal(
      t("aboutTitle"),
      `<p>${escapeHtml(t("aboutBody"))}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;">
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
      clearUrlThreadParam();
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
    $("#lightboxCloseBtn").addEventListener("click", closeLightbox);
    $("#lightbox").addEventListener("click", (e) => {
      if (e.target === $("#lightbox")) closeLightbox();
    });

    // Global keyboard shortcuts (Gmail-style!)
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        $("#searchInput").focus();
        $("#searchInput").select();
        return;
      }
      const inInput = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);
      if (e.key === "Escape") {
        if (!$("#lightbox").hidden) closeLightbox();
        else if (!$("#modalOverlay").hidden) closeModal();
        else if (state.view === "thread") {
          state.view = "inbox";
          clearUrlThreadParam();
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
    await detectAssetPrefix();

    try {
      const [threadsRes, evRes] = await Promise.all([
        fetch("./threads.json"),
        fetch(`${state.dataPrefix}evidence.json`).catch(() => null)
      ]);
      state.data = await threadsRes.json();
      if (evRes && evRes.ok) {
        state.evidence = await evRes.json();
      }
      loadPersistedState(state.data.threads);
      await applyI18n(state.lang);

      // Check deep-link ?thread=..., ?sort=oldest, ?view=photos
      const params = new URLSearchParams(window.location.search);
      if (params.get("sort") === "oldest") {
        state.sort = "oldest";
        $("#sortSelect").value = "oldest";
      }
      const deepThread = params.get("thread");
      if (deepThread && state.data.threads.some((x) => x.id === deepThread)) {
        openThread(deepThread);
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
