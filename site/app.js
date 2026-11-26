(function () {
  "use strict";

  var CHARTS = {
    chart1: {
      html: "./charts/theo-chart-1-overview.html",
      png: "evidence/charts/theo-chart-1-overview.png",
      titleEn: "Chart 1 · Corpus Structure & Product Focus (n = 1,151)",
      titleZh: "图表 1 · 1,151 条推文结构与产品聚焦"
    },
    chart2: {
      html: "./charts/theo-chart-2-rhythm.html",
      png: "evidence/charts/theo-chart-2-rhythm.png",
      titleEn: "Chart 2 · 24-Hour PST Circadian & 17-Day Cadence",
      titleZh: "图表 2 · 24 小时发帖节律与 17 天日均分布"
    },
    chart3: {
      html: "./charts/theo-chart-3-double-standard.html",
      png: "evidence/charts/theo-chart-3-double-standard.png",
      pngZh: "evidence/25-double-standard-chart-zh.png",
      titleEn: "Chart 3 · Selective Politeness Split (0.0% VIP vs. 8.0% Devs vs. 14.4% Crisis)",
      titleZh: "图表 3 · 选择性礼貌双标对照（大厂 0.0% vs 开发者 8.0% vs 危机期 14.4%）"
    },
    chart4: {
      html: "./charts/theo-chart-4-cn-crisis.html",
      png: "evidence/charts/theo-chart-4-cn-crisis.png",
      titleEn: "Chart 4 · 25-Hour Chinese-Fork Crisis Timeline (4.0× Insult Surge)",
      titleZh: "图表 4 · 中文二改 25 小时危机期三波次暴涨曲线（4.0 倍）"
    }
  };

  var state = {
    manifest: null,
    evidence: [],
    langCode: "en",
    bundleCache: {},
    bundle: null,
    viewMode: "theme", // "theme" | "chrono"
    statusFilter: "all", // "all" | "open" | "partial" | "record"
    compact: false,
    chartKey: "chart1",
    galleryPart: "All",
    galleryQuery: "",
    lightboxList: [],
    lightboxIndex: 0,
    lightboxZoomed: false,
    observer: null,
    pendingCaseId: null
  };

  function $(id) {
    return document.getElementById(id);
  }

  function escHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatInlineCode(s) {
    return escHtml(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function showToast(msg) {
    var el = $("toastBar");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      el.hidden = true;
    }, 2200);
  }

  function isZhLang(code) {
    return code === "zh-CN" || code === "zh-TW";
  }

  function currentTheme() {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }

  function detectInitialLang(languages) {
    var codes = languages.map(function (l) { return l.code; });
    var params = new URLSearchParams(window.location.search);
    var qLang = params.get("lang");
    if (qLang && codes.indexOf(qLang) !== -1) return qLang;

    var saved = null;
    try { saved = localStorage.getItem("byit3-lang"); } catch (e) {}
    if (saved && codes.indexOf(saved) !== -1) return saved;

    var nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("zh-tw") || nav.startsWith("zh-hk") || nav.startsWith("zh-hant")) return "zh-TW";
    if (nav.startsWith("zh")) return "zh-CN";
    if (nav.startsWith("pt")) return "pt-BR";
    var prefix = nav.split("-")[0];
    if (codes.indexOf(prefix) !== -1) return prefix;
    return "en";
  }

  function getShareUrl(caseId) {
    var base = (state.manifest && state.manifest.pagesUrl ? state.manifest.pagesUrl : "").replace(/\/$/, "");
    if (!base) {
      base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "");
    }
    if (isZhLang(state.langCode)) {
      return base + "/c/zh/" + caseId + "/";
    }
    return base + "/c/" + caseId + "/";
  }

  async function fetchJson(url) {
    var res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed to load " + url + " (" + res.status + ")");
    return res.json();
  }

  async function loadLanguage(code, updateUrl) {
    if (!state.bundleCache[code]) {
      try {
        state.bundleCache[code] = await fetchJson("./data/" + code + ".json");
      } catch (err) {
        if (code !== "en") {
          code = "en";
          if (!state.bundleCache.en) {
            state.bundleCache.en = await fetchJson("./data/en.json");
          }
        } else {
          throw err;
        }
      }
    }
    state.langCode = code;
    state.bundle = state.bundleCache[code];

    var langMeta = state.bundle.lang;
    document.documentElement.lang = langMeta.code;
    document.documentElement.dir = langMeta.dir || "ltr";
    document.title = state.bundle.ui.siteTitle + " — " + state.bundle.ui.stats.casesValue;

    try { localStorage.setItem("byit3-lang", code); } catch (e) {}
    if (updateUrl) {
      var u = new URL(window.location.href);
      if (code === "en") u.searchParams.delete("lang");
      else u.searchParams.set("lang", code);
      window.history.replaceState({}, "", u.toString());
    }

    renderAll();
    syncChartIframe();
  }

  function syncThemeUI() {
    var dark = currentTheme() === "dark";
    var btn = $("themeToggleBtn");
    if (btn) btn.setAttribute("aria-pressed", String(dark));
    var sun = $("themeIconSun");
    var moon = $("themeIconMoon");
    if (sun) sun.style.display = dark ? "block" : "none";
    if (moon) moon.style.display = dark ? "none" : "block";
    var lbl = $("themeToggleLabel");
    if (lbl && state.bundle) {
      lbl.textContent = dark ? state.bundle.ui.controls.themeLight : state.bundle.ui.controls.themeDark;
    }
    syncChartIframe();
  }

  function syncChartIframe() {
    var frame = $("chartFrame");
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage(
      {
        type: "t3-theme",
        theme: currentTheme(),
        lang: isZhLang(state.langCode) ? "zh" : "en"
      },
      "*"
    );
  }

  function renderLanguageControls() {
    var langs = state.manifest.languages;
    var ui = state.bundle.ui;
    var cur = state.bundle.lang;

    $("currentLangLabel").textContent = cur.name;

    // Dropdown menu
    var un = langs.filter(function (l) { return l.group === "un"; });
    var comm = langs.filter(function (l) { return l.group !== "un"; });

    function renderGroup(title, list) {
      return (
        '<div class="lang-group-heading">' + escHtml(title) + "</div>" +
        '<div class="lang-group-grid">' +
        list.map(function (l) {
          var active = l.code === state.langCode ? " active" : "";
          return (
            '<button type="button" class="lang-option' + active + '" role="option" aria-selected="' +
            (l.code === state.langCode ? "true" : "false") +
            '" data-select-lang="' + escHtml(l.code) + '">' +
            "<span>" + escHtml(l.name) + "</span>" +
            '<span class="lang-option-code">' + escHtml(l.code) + "</span>" +
            "</button>"
          );
        }).join("") +
        "</div>"
      );
    }

    $("langDropdown").innerHTML =
      renderGroup(ui.readme.unLanguages, un) +
      renderGroup(ui.readme.communityLanguages, comm);

    // Hero compact language strip
    $("heroLangStrip").innerHTML = langs.map(function (l) {
      var active = l.code === state.langCode ? " active" : "";
      return (
        '<button type="button" class="lang-chip' + active + ' claude-spring-press" data-select-lang="' +
        escHtml(l.code) + '">' + escHtml(l.name) + "</button>"
      );
    }).join("");
  }

  function renderStaticChrome() {
    var ui = state.bundle.ui;
    var lang = state.bundle.lang;
    var m = state.manifest;

    $("brandTitle").textContent = ui.siteTitle;
    $("footerBrandTitle").textContent = ui.siteTitle;
    $("navOverview").textContent = ui.nav.overview;
    $("navExhibits").textContent = ui.nav.exhibits;
    $("navCharts").textContent = ui.nav.charts;
    $("navCommunity").textContent = ui.nav.community;
    $("navGallery").textContent = ui.nav.gallery;
    $("navMitigation").textContent = ui.nav.mitigation;
    $("headerRepoBtn").textContent = "GitHub";

    $("subbarPath").textContent = m.upstreamRepo + " · " + ui.stats.casesValue;
    $("subbarStatus").textContent =
      m.baselineShort + " → " + m.latestShort + " (+" + m.commitsTracked + " commits · " + m.latestChecked + ")";

    $("heroKicker").textContent = ui.heroKicker;
    $("heroTitle").textContent = ui.siteTitle;
    $("heroSubtitle").textContent = ui.siteSubtitle;
    $("heroThesis").textContent = ui.heroThesis;

    $("statCasesLabel").textContent = ui.stats.casesLabel;
    $("statCasesValue").textContent = ui.stats.casesValue;
    $("statReceiptsLabel").textContent = ui.stats.receiptsLabel;
    $("statReceiptsValue").textContent = ui.stats.receiptsValue;
    $("statUpstreamLabel").textContent = ui.stats.upstreamLabel;
    $("statUpstreamValue").textContent = ui.stats.upstreamValue;
    $("statAdvisoriesLabel").textContent = ui.stats.advisoriesLabel;
    $("statAdvisoriesValue").textContent = ui.stats.advisoriesValue;

    $("ctaReadCases").textContent = ui.cta.readCases;
    $("ctaHardening").textContent = ui.cta.hardening;
    $("ctaEvidence").textContent = ui.cta.evidenceArchive;
    $("ctaSources").textContent = ui.cta.sourceIndex;
    $("ctaInspectCover").textContent = ui.cta.inspectCover;

    $("heroCoverImg").src = "./" + lang.cover;
    $("heroCoverImg").alt = ui.siteTitle;
    $("heroCoverPath").textContent = lang.cover;

    // Story Arc
    $("storyArcHeading").textContent = ui.storyArcHeading;
    $("storyArcLead").textContent = ui.storyArcLead;
    $("storyArcGrid").innerHTML = ui.storyArc.map(function (beat) {
      return (
        '<article class="story-card">' +
          '<div class="story-card-top">' +
            '<span class="story-step">' + escHtml(beat.step) + "</span>" +
            '<span class="story-window">' + escHtml(beat.window) + "</span>" +
          "</div>" +
          "<h3>" + escHtml(beat.title) + "</h3>" +
          "<p>" + escHtml(beat.body) + "</p>" +
        "</article>"
      );
    }).join("");

    // Sidebar controls
    $("sidebarMobileTitle").textContent = ui.nav.exhibits;
    $("modeByThemeBtn").textContent = ui.viewModes.byTheme;
    $("modeChronoBtn").textContent = ui.viewModes.chronological;
    $("toggleDensityBtn").textContent = state.compact ? ui.cta.expandAll : ui.cta.collapseAll;

    // Status pills
    var counts = { all: state.bundle.cases.length, open: 0, partial: 0, record: 0 };
    state.bundle.cases.forEach(function (c) {
      if (counts[c.status] !== undefined) counts[c.status]++;
    });
    document.querySelectorAll("[data-status-filter]").forEach(function (btn) {
      var k = btn.getAttribute("data-status-filter");
      btn.textContent = (ui.statusLabels[k] || k) + " (" + counts[k] + ")";
      var active = state.statusFilter === k;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    // Charts
    $("chartsHeading").textContent = ui.charts.heading;
    $("chartsLead").textContent = ui.charts.lead;
    $("chartTab1").textContent = ui.charts.tabs.chart1;
    $("chartTab2").textContent = ui.charts.tabs.chart2;
    $("chartTab3").textContent = ui.charts.tabs.chart3;
    $("chartTab4").textContent = ui.charts.tabs.chart4;
    $("chartPngBtn").textContent = ui.charts.inspectPng;
    $("chartStandaloneLink").textContent = ui.charts.openStandalone;
    $("chartDossierLink").textContent = ui.charts.readDossier;
    updateChartToolbar();

    // Community
    $("communityHeading").textContent = ui.community.heading;
    $("communityLead").textContent = ui.community.lead;
    $("commIssue1Title").textContent = ui.community.issue1Title;
    $("commIssue1Body").textContent = ui.community.issue1Body;
    $("commIssue1Link").textContent = ui.community.issue1Link;
    $("commDmTitle").textContent = ui.community.dmTitle;
    $("commDmBody").textContent = ui.community.dmBody;
    $("commDmLink").textContent = ui.community.dmLink;

    // Gallery
    $("galleryHeading").textContent = ui.gallery.heading;
    $("galleryLead").textContent = ui.gallery.lead;
    $("gallerySearch").placeholder = ui.gallery.searchPlaceholder;

    // Mitigation
    $("mitigationHeading").textContent = ui.mitigation.heading;
    $("mitigationLead").textContent = ui.mitigation.lead;
    $("pbTabUnix").textContent = ui.mitigation.tabs.unix;
    $("pbTabWindows").textContent = ui.mitigation.tabs.windows;
    $("pbTabPolicy").textContent = ui.mitigation.tabs.policy;
    $("mitigationSteps").innerHTML = ui.mitigation.steps.map(function (st) {
      return "<li>" + escHtml(st) + "</li>";
    }).join("");
    $("alternativesTitle").textContent = ui.mitigation.alternativesTitle;
    $("alternativesBody").textContent = ui.mitigation.alternativesBody;
    document.querySelectorAll(".copy-btn").forEach(function (b) {
      b.textContent = ui.mitigation.copy;
    });

    // Footer & Lightbox controls
    $("footerColophon").textContent = ui.footer.colophon;
    $("footerGroupDossiers").textContent = ui.footer.groupDossiers;
    $("footerGroupIndexes").textContent = ui.footer.groupIndexes;
    $("footerGroupRepo").textContent = ui.footer.groupRepo;
    $("footerScopeTitle").textContent = ui.footer.scopeTitle;
    $("footerScopeBody").textContent = ui.footer.scopeBody;
    $("lightboxPrevBtn").textContent = ui.controls.prev;
    $("lightboxNextBtn").textContent = ui.controls.next;
    $("lightboxZoomBtn").textContent = state.lightboxZoomed ? ui.controls.fit : ui.controls.zoom100;
    $("lightboxCloseBtn").textContent = ui.controls.close;

    syncThemeUI();
  }

  function getFilteredCases() {
    return state.bundle.cases.filter(function (c) {
      return state.statusFilter === "all" || c.status === state.statusFilter;
    });
  }

  function renderExhibitCardHtml(c) {
    var ui = state.bundle.ui;
    var stLabel = ui.statusLabels[c.status] || c.status;
    var shareUrl = getShareUrl(c.id);
    var tweetText = encodeURIComponent("#" + c.id + " · " + c.title + "\n" + c.summary);
    var shareXUrl = "https://x.com/intent/tweet?text=" + tweetText + "&url=" + encodeURIComponent(shareUrl);

    var visualsHtml = "";
    if (c.visuals && c.visuals.length) {
      visualsHtml =
        '<div class="exhibit-visuals">' +
        c.visuals.map(function (v) {
          return (
            '<button type="button" class="visual-thumb claude-spring-press" data-open-image="' +
            escHtml(v.src) + '" data-open-caption="' + escHtml(v.caption) + '" data-open-part="#' +
            escHtml(c.id) + '">' +
              '<img src="./' + escHtml(v.src) + '" alt="' + escHtml(v.caption) + '" loading="lazy" />' +
              '<span class="visual-thumb-caption">' + escHtml(v.caption) + "</span>" +
            "</button>"
          );
        }).join("") +
        "</div>";
    }

    var extraHtml = "";
    if (c.extraReceipts && c.extraReceipts.length) {
      extraHtml =
        '<div class="extra-receipts-wrap">' +
          '<button type="button" class="btn btn-sm claude-spring-press" data-toggle-extra="' + escHtml(c.id) + '" aria-expanded="false">' +
            escHtml(ui.cta.showMoreReceipts) + " (+" + c.extraReceipts.length + ")" +
          "</button>" +
          '<div class="exhibit-visuals extra-receipts-grid" data-extra-panel="' + escHtml(c.id) + '" hidden>' +
          c.extraReceipts.map(function (r) {
            return (
              '<button type="button" class="visual-thumb claude-spring-press" data-open-image="' +
              escHtml(r.src) + '" data-open-caption="' + escHtml(r.caption) + '" data-open-part="' +
              escHtml(r.id) + '">' +
                '<img src="./' + escHtml(r.src) + '" alt="' + escHtml(r.title) + '" loading="lazy" />' +
                '<span class="visual-thumb-caption">' + escHtml(r.title) + "</span>" +
              "</button>"
            );
          }).join("") +
          "</div>" +
        "</div>";
    }

    var chartJumpHtml = "";
    if (c.charts && c.charts.length) {
      chartJumpHtml =
        '<a class="btn btn-sm btn-stone claude-spring-press" href="#forensic-charts">' +
        escHtml(ui.nav.charts) + "</a>";
    }

    var sourcesHtml = (c.sources || []).slice(0, 8).map(function (s) {
      return (
        '<a class="source-chip" href="' + escHtml(s.url) + '" target="_blank" rel="noopener noreferrer">' +
        escHtml(s.label) + "</a>"
      );
    }).join("");

    return (
      '<article class="exhibit-card" id="case-' + escHtml(c.id) + '" data-case-id="' + escHtml(c.id) + '">' +
        '<div class="exhibit-topbar">' +
          '<div class="exhibit-meta">' +
            '<span class="exhibit-id">#' + escHtml(c.id) + "</span>" +
            '<span class="status-badge badge-' + escHtml(c.status) + '">' + escHtml(stLabel) + "</span>" +
            '<span class="exhibit-date">' + escHtml(c.date) + "</span>" +
          "</div>" +
          '<div class="exhibit-share-bar">' +
            '<button type="button" class="btn btn-sm claude-spring-press" data-copy-share="' + escHtml(shareUrl) + '">' +
              escHtml(ui.cta.copyShareLink) +
            "</button>" +
            '<a class="btn btn-sm claude-spring-press" href="' + escHtml(shareXUrl) + '" target="_blank" rel="noopener noreferrer">' +
              escHtml(ui.cta.shareOnX) +
            "</a>" +
          "</div>" +
        "</div>" +

        '<h3 class="exhibit-title">' + formatInlineCode(c.title) + "</h3>" +
        '<p class="exhibit-summary">' + formatInlineCode(c.summary) + "</p>" +

        '<div class="contrast-grid">' +
          '<div class="contrast-pane pane-claim">' +
            '<h4 class="pane-heading">' + escHtml(ui.sectionLabels.claim) + "</h4>" +
            c.claimHtml +
          "</div>" +
          '<div class="contrast-pane pane-status">' +
            '<h4 class="pane-heading">' + escHtml(ui.sectionLabels.status) + "</h4>" +
            c.statusHtml +
          "</div>" +
        "</div>" +

        '<div class="exhibit-collapsible">' +
          '<h4 class="exhibit-body-heading">' + escHtml(ui.sectionLabels.evidence) + "</h4>" +
          '<div class="exhibit-prose">' + c.evidenceHtml + "</div>" +
          visualsHtml +
          extraHtml +
        "</div>" +

        '<div class="exhibit-footer">' +
          '<div class="source-chips">' + sourcesHtml + "</div>" +
          '<div class="exhibit-actions-row">' +
            (state.compact
              ? '<button type="button" class="btn btn-sm btn-primary claude-spring-press" data-expand-card="' + escHtml(c.id) + '">' + escHtml(ui.cta.viewExhibit) + "</button>"
              : "") +
            '<a class="btn btn-sm claude-spring-press" href="' + escHtml(c.xPost) + '" target="_blank" rel="noopener noreferrer">' + escHtml(ui.cta.openOriginalPost) + "</a>" +
            '<a class="btn btn-sm claude-spring-press" href="' + escHtml(c.markdownUrl) + '" target="_blank" rel="noopener noreferrer">Markdown</a>' +
            '<a class="btn btn-sm claude-spring-press" href="' + escHtml(c.dossierUrl) + '" target="_blank" rel="noopener noreferrer">' + escHtml(ui.cta.openDossier) + "</a>" +
            '<button type="button" class="btn btn-sm claude-spring-press" data-jump-part="' + escHtml(c.evidencePart) + '">' + escHtml(ui.cta.viewAllReceipts) + "</button>" +
            chartJumpHtml +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderWorkspace() {
    var ui = state.bundle.ui;
    var cases = getFilteredCases();
    var byId = {};
    cases.forEach(function (c) { byId[c.id] = c; });

    var navHtml = "";
    var streamHtml = "";

    if (state.viewMode === "theme") {
      state.manifest.acts.forEach(function (act) {
        var actCases = act.cases.map(function (id) { return byId[id]; }).filter(Boolean);
        if (!actCases.length) return;
        var aui = ui.acts[act.id];

        navHtml += '<div class="sidebar-group-title">' + escHtml(aui.label + " · " + aui.title) + "</div>";
        actCases.forEach(function (c) {
          navHtml +=
            '<a class="sidebar-link" href="#case-' + escHtml(c.id) + '" data-nav-case="' + escHtml(c.id) + '">' +
              '<span class="sidebar-num">#' + escHtml(c.id) + "</span>" +
              "<span>" + formatInlineCode(c.title) + "</span>" +
              '<span class="sidebar-dot dot-' + escHtml(c.status) + '" aria-hidden="true"></span>' +
            "</a>";
        });

        streamHtml +=
          '<div class="chapter-header" id="chapter-' + escHtml(act.id) + '">' +
            '<div class="chapter-swatch-row">' +
              '<span class="chapter-swatch swatch-' + escHtml(act.swatch) + '" aria-hidden="true"></span>' +
              "<span>" + escHtml(aui.label) + "</span>" +
            "</div>" +
            '<h2 class="chapter-title">' + escHtml(aui.title) + "</h2>" +
            '<p class="chapter-summary">' + escHtml(aui.summary) + "</p>" +
          "</div>";

        actCases.forEach(function (c) {
          streamHtml += renderExhibitCardHtml(c);
        });
      });
    } else {
      cases.forEach(function (c) {
        navHtml +=
          '<a class="sidebar-link" href="#case-' + escHtml(c.id) + '" data-nav-case="' + escHtml(c.id) + '">' +
            '<span class="sidebar-num">#' + escHtml(c.id) + "</span>" +
            "<span>" + formatInlineCode(c.title) + "</span>" +
            '<span class="sidebar-dot dot-' + escHtml(c.status) + '" aria-hidden="true"></span>' +
          "</a>";
        streamHtml += renderExhibitCardHtml(c);
      });
    }

    $("sidebarNav").innerHTML = navHtml;
    var container = $("exhibitsContainer");
    container.classList.toggle("is-compact", state.compact);
    container.innerHTML = streamHtml || '<p class="section-desc">' + escHtml(ui.gallery.empty) + "</p>";

    setupScrollSpy();
  }

  function setupScrollSpy() {
    if (state.observer) state.observer.disconnect();
    if (!("IntersectionObserver" in window)) return;
    var cards = document.querySelectorAll(".exhibit-card");
    if (!cards.length) return;

    state.observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("data-case-id");
            document.querySelectorAll(".sidebar-link").forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("data-nav-case") === id);
            });
          }
        });
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
    );
    cards.forEach(function (el) { state.observer.observe(el); });
  }

  function updateChartToolbar() {
    var cfg = CHARTS[state.chartKey] || CHARTS.chart1;
    var zh = isZhLang(state.langCode);
    $("chartDesc").textContent = zh ? cfg.titleZh : cfg.titleEn;
    var png = zh && cfg.pngZh ? cfg.pngZh : cfg.png;
    $("chartPngBtn").setAttribute("data-png", png);
    $("chartStandaloneLink").href = cfg.html;
    document.querySelectorAll("[data-chart-tab]").forEach(function (btn) {
      var active = btn.getAttribute("data-chart-tab") === state.chartKey;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", String(active));
    });
  }

  function switchChart(key) {
    if (!CHARTS[key]) return;
    state.chartKey = key;
    updateChartToolbar();
    var frame = $("chartFrame");
    if (frame) {
      frame.src = CHARTS[key].html;
    }
  }

  function renderGalleryControls() {
    var ui = state.bundle.ui;
    var partsOrder = [
      "All", "Origin", "Part 1", "Part 2", "Part 3", "Part 4", "Part 5",
      "Part 6", "Part 7", "Part 8", "Part 9", "Part 10", "Part 11", "Part 12",
      "Part 13", "Part 14", "Charts", "Part 15", "Part 17", "Part 18", "Part 19"
    ];
    $("partPills").innerHTML = partsOrder.map(function (p) {
      var active = state.galleryPart === p ? " active" : "";
      var label = p === "All" ? ui.gallery.allParts : p;
      return (
        '<button type="button" class="filter-pill' + active + ' claude-spring-press" data-gallery-part="' +
        escHtml(p) + '">' + escHtml(label) + "</button>"
      );
    }).join("");
  }

  function renderGallery() {
    var ui = state.bundle.ui;
    var q = state.galleryQuery.trim().toLowerCase();
    var filtered = state.evidence.filter(function (item) {
      var partOk =
        state.galleryPart === "All" ||
        item.part === state.galleryPart ||
        (item.parts && item.parts.indexOf(state.galleryPart) !== -1);
      if (!partOk) return false;
      if (!q) return true;
      var hay = (item.id + " " + item.part + " " + item.path + " " + item.title + " " + item.caption).toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    $("galleryCount").textContent = ui.gallery.showing
      .replace("{shown}", String(filtered.length))
      .replace("{total}", String(state.evidence.length));

    if (!filtered.length) {
      $("galleryGrid").innerHTML = '<p class="section-desc">' + escHtml(ui.gallery.empty) + "</p>";
      return;
    }

    $("galleryGrid").innerHTML = filtered.map(function (item) {
      return (
        '<button type="button" class="gallery-card claude-spring-press" data-gallery-id="' + escHtml(item.id) + '">' +
          '<img src="./' + escHtml(item.path) + '" alt="' + escHtml(item.title) + '" loading="lazy" />' +
          '<div class="gallery-card-meta"><span>' + escHtml(item.id) + "</span><span>" + escHtml(item.part) + "</span></div>" +
          '<div class="gallery-card-title">' + escHtml(item.title) + "</div>" +
        "</button>"
      );
    }).join("");
  }

  function openLightbox(list, startIndex) {
    state.lightboxList = list;
    state.lightboxIndex = Math.max(0, Math.min(startIndex, list.length - 1));
    state.lightboxZoomed = false;
    updateLightbox();
    $("lightboxModal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    $("lightboxModal").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    var item = state.lightboxList[state.lightboxIndex];
    if (!item) return;
    var ui = state.bundle.ui;
    $("lightboxPart").textContent = item.part || "Receipt";
    $("lightboxPath").textContent = item.path;
    $("lightboxCounter").textContent = (state.lightboxIndex + 1) + " / " + state.lightboxList.length;
    $("lightboxImg").src = "./" + item.path;
    $("lightboxImg").alt = item.title || item.caption || "";
    $("lightboxTitle").textContent = item.title || item.path;
    $("lightboxCaption").textContent = item.caption || "";
    $("lightboxStage").classList.toggle("is-zoomed", state.lightboxZoomed);
    $("lightboxZoomBtn").textContent = state.lightboxZoomed ? ui.controls.fit : ui.controls.zoom100;

    var links = [];
    if (item.sourceUrl) {
      links.push('<a class="btn btn-sm" href="' + escHtml(item.sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + escHtml(ui.controls.openSource) + "</a>");
    }
    if (item.dossier) {
      links.push('<a class="btn btn-sm" href="' + escHtml(item.dossier) + '" target="_blank" rel="noopener noreferrer">' + escHtml(ui.controls.openDossier) + "</a>");
    }
    $("lightboxLinks").innerHTML = links.join("");
  }

  function renderAll() {
    renderLanguageControls();
    renderStaticChrome();
    renderWorkspace();
    renderGalleryControls();
    renderGallery();
  }

  function focusCaseFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var cid = state.pendingCaseId || params.get("case");
    if (!cid && window.location.hash && window.location.hash.startsWith("#case-")) {
      cid = window.location.hash.replace("#case-", "");
    }
    if (!cid) return;
    state.pendingCaseId = null;
    var el = $("case-" + cid);
    if (el) {
      el.classList.add("is-expanded", "is-highlighted");
      setTimeout(function () {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }, 60);
      setTimeout(function () {
        el.classList.remove("is-highlighted");
      }, 3200);
    }
  }

  function setDrawerOpen(open) {
    var sb = $("workspaceSidebar");
    var bd = $("drawerBackdrop");
    var btn = $("mobileDrawerBtn");
    if (sb) sb.classList.toggle("is-open", open);
    if (bd) bd.hidden = !open;
    if (btn) btn.setAttribute("aria-expanded", String(open));
  }

  function bindEvents() {
    // Language switcher open/close
    $("langMenuBtn").addEventListener("click", function (e) {
      e.stopPropagation();
      var dd = $("langDropdown");
      var open = dd.hidden;
      dd.hidden = !open;
      $("langMenuBtn").setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", function (e) {
      var dd = $("langDropdown");
      if (dd && !dd.hidden && !$("langSwitcher").contains(e.target)) {
        dd.hidden = true;
        $("langMenuBtn").setAttribute("aria-expanded", "false");
      }

      // Delegated clicks
      var langBtn = e.target.closest("[data-select-lang]");
      if (langBtn) {
        var code = langBtn.getAttribute("data-select-lang");
        dd.hidden = true;
        $("langMenuBtn").setAttribute("aria-expanded", "false");
        loadLanguage(code, true);
        return;
      }

      var shareBtn = e.target.closest("[data-copy-share]");
      if (shareBtn) {
        var url = shareBtn.getAttribute("data-copy-share");
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url);
        }
        showToast(state.bundle.ui.cta.copied + " · " + url);
        return;
      }

      var extraBtn = e.target.closest("[data-toggle-extra]");
      if (extraBtn) {
        var cid = extraBtn.getAttribute("data-toggle-extra");
        var panel = document.querySelector('[data-extra-panel="' + cid + '"]');
        if (panel) {
          var willOpen = panel.hidden;
          panel.hidden = !willOpen;
          extraBtn.setAttribute("aria-expanded", String(willOpen));
        }
        return;
      }

      var expandBtn = e.target.closest("[data-expand-card]");
      if (expandBtn) {
        var card = expandBtn.closest(".exhibit-card");
        if (card) card.classList.toggle("is-expanded");
        return;
      }

      var jumpPartBtn = e.target.closest("[data-jump-part]");
      if (jumpPartBtn) {
        state.galleryPart = jumpPartBtn.getAttribute("data-jump-part") || "All";
        state.galleryQuery = "";
        $("gallerySearch").value = "";
        renderGalleryControls();
        renderGallery();
        $("receipts").scrollIntoView({ behavior: "smooth" });
        return;
      }

      var thumbBtn = e.target.closest("[data-open-image]");
      if (thumbBtn) {
        var src = thumbBtn.getAttribute("data-open-image");
        var idx = state.evidence.findIndex(function (it) { return it.path === src; });
        if (idx !== -1) {
          openLightbox(state.evidence, idx);
        } else {
          openLightbox([{
            path: src,
            part: thumbBtn.getAttribute("data-open-part") || "Receipt",
            title: thumbBtn.getAttribute("data-open-caption") || src,
            caption: thumbBtn.getAttribute("data-open-caption") || ""
          }], 0);
        }
        return;
      }

      var galCard = e.target.closest("[data-gallery-id]");
      if (galCard) {
        var gid = galCard.getAttribute("data-gallery-id");
        var gIdx = state.evidence.findIndex(function (it) { return it.id === gid; });
        if (gIdx !== -1) openLightbox(state.evidence, gIdx);
        return;
      }

      var gPart = e.target.closest("[data-gallery-part]");
      if (gPart) {
        state.galleryPart = gPart.getAttribute("data-gallery-part") || "All";
        renderGalleryControls();
        renderGallery();
        return;
      }

      var navLink = e.target.closest(".sidebar-link");
      if (navLink) {
        setDrawerOpen(false);
        return;
      }
    });

    // Theme toggle
    $("themeToggleBtn").addEventListener("click", function () {
      var nextDark = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", nextDark);
      try { localStorage.setItem("byit3-theme", nextDark ? "dark" : "light"); } catch (e) {}
      syncThemeUI();
    });

    // Hero cover click
    $("heroCoverCard").addEventListener("click", function () {
      var coverPath = state.bundle.lang.cover;
      var idx = state.evidence.findIndex(function (it) { return it.path === coverPath; });
      openLightbox(state.evidence, idx !== -1 ? idx : 0);
    });

    // View mode (By 4 Themes vs Chronological)
    document.querySelectorAll("[data-view-mode]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.viewMode = btn.getAttribute("data-view-mode");
        document.querySelectorAll("[data-view-mode]").forEach(function (b) {
          var active = b.getAttribute("data-view-mode") === state.viewMode;
          b.classList.toggle("active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        renderWorkspace();
      });
    });

    // Status filter pills
    document.querySelectorAll("[data-status-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.statusFilter = btn.getAttribute("data-status-filter");
        document.querySelectorAll("[data-status-filter]").forEach(function (b) {
          var active = b.getAttribute("data-status-filter") === state.statusFilter;
          b.classList.toggle("active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        renderWorkspace();
      });
    });

    // Compact / Full Read toggle
    $("toggleDensityBtn").addEventListener("click", function () {
      state.compact = !state.compact;
      $("toggleDensityBtn").textContent = state.compact
        ? state.bundle.ui.cta.expandAll
        : state.bundle.ui.cta.collapseAll;
      renderWorkspace();
    });

    // Mobile drawer
    $("mobileDrawerBtn").addEventListener("click", function () { setDrawerOpen(true); });
    $("closeDrawerBtn").addEventListener("click", function () { setDrawerOpen(false); });
    $("drawerBackdrop").addEventListener("click", function () { setDrawerOpen(false); });

    // Charts
    document.querySelectorAll("[data-chart-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchChart(btn.getAttribute("data-chart-tab"));
      });
    });
    $("chartFrame").addEventListener("load", syncChartIframe);
    $("chartPngBtn").addEventListener("click", function () {
      var png = $("chartPngBtn").getAttribute("data-png");
      var idx = state.evidence.findIndex(function (it) { return it.path === png; });
      if (idx !== -1) openLightbox(state.evidence, idx);
    });
    window.addEventListener("message", function (e) {
      if (e.data && e.data.type === "t3-chart-height" && typeof e.data.height === "number") {
        var frame = $("chartFrame");
        if (frame) frame.style.height = Math.max(520, e.data.height + 4) + "px";
      }
    });

    // Gallery search
    $("gallerySearch").addEventListener("input", function (e) {
      state.galleryQuery = e.target.value || "";
      renderGallery();
    });

    // Playbook tabs & copy buttons
    document.querySelectorAll("[data-playbook-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-playbook-tab");
        document.querySelectorAll("[data-playbook-tab]").forEach(function (b) {
          var active = b.getAttribute("data-playbook-tab") === key;
          b.classList.toggle("active", active);
          b.setAttribute("aria-selected", String(active));
        });
        document.querySelectorAll("[data-playbook-panel]").forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-playbook-panel") === key);
        });
      });
    });

    document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var pre = $(btn.getAttribute("data-copy-target"));
        if (!pre) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(pre.textContent || "");
        }
        var orig = state.bundle.ui.mitigation.copy;
        btn.textContent = state.bundle.ui.mitigation.copied;
        setTimeout(function () { btn.textContent = orig; }, 1600);
      });
    });

    // Footer accordions
    document.querySelectorAll("[data-acc-trigger]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-acc-trigger");
        var panel = document.querySelector('[data-acc-panel="' + key + '"]');
        if (!panel) return;
        var next = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(next));
        panel.setAttribute("data-open", String(next));
      });
    });

    // Lightbox controls & keyboard
    $("lightboxPrevBtn").addEventListener("click", function () {
      state.lightboxIndex = (state.lightboxIndex - 1 + state.lightboxList.length) % state.lightboxList.length;
      state.lightboxZoomed = false;
      updateLightbox();
    });
    $("lightboxNextBtn").addEventListener("click", function () {
      state.lightboxIndex = (state.lightboxIndex + 1) % state.lightboxList.length;
      state.lightboxZoomed = false;
      updateLightbox();
    });
    $("lightboxZoomBtn").addEventListener("click", function () {
      state.lightboxZoomed = !state.lightboxZoomed;
      updateLightbox();
    });
    $("lightboxCloseBtn").addEventListener("click", closeLightbox);
    $("lightboxModal").addEventListener("click", function (e) {
      if (e.target === $("lightboxModal")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if ($("lightboxModal").getAttribute("aria-hidden") !== "false") return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") $("lightboxPrevBtn").click();
      else if (e.key === "ArrowRight") $("lightboxNextBtn").click();
    });
  }

  async function init() {
    bindEvents();
    try {
      var results = await Promise.all([
        fetchJson("./data/manifest.json"),
        fetchJson("./data/evidence.json")
      ]);
      state.manifest = results[0];
      state.evidence = results[1];
      var initial = detectInitialLang(state.manifest.languages);
      await loadLanguage(initial, false);
      focusCaseFromUrl();
    } catch (err) {
      $("exhibitsContainer").innerHTML =
        '<div class="editorial-card"><h3>Unable to load investigation data</h3><p>' +
        escHtml(err && err.message ? err.message : String(err)) + "</p></div>";
    }
  }

  init();
})();
