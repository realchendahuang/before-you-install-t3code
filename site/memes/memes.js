(() => {
  "use strict";

  const COPY = {
    en: {
      langLabel: "中文",
      brandPill: "MEME ARSENAL · CC0",
      navHome: "Home",
      navXReceipts: "X Receipts",
      navMail: "Tmail Inbox",
      navRepo: "↗",
      eyebrow: "LAUGH FIRST · VERIFY IN 1 CLICK · CDN.TEMU3CODE.COM",
      heroTitle: "The Temu3 Meme Arsenal.",
      heroSub:
        "19 Sins holographic collector cards, 33 viral blended memes, and bilingual editorial strips — CC0 1.0 public domain. Copy any card directly to your clipboard, download, or click through to the verified receipt in Tmail.",
      drawSinBtn: "Draw a Random Sin Card",
      openTmailBtn: "Verify Receipts in Tmail →",
      submitMemeBtn: "Submit a Meme (PR / Issue) ↗",
      tabAll: "All",
      tabSins: "19 Sins Cards",
      tabBlended: "Viral Memes",
      tabClassic: "Classic Receipts",
      tabComics: "Bilingual Comics",
      searchPlaceholder: "Search Drake, Clown, 1151, PostHog, #15...",
      copyBtn: "Copy",
      copyPng: "Copy PNG",
      downloadBtn: "Download",
      shareX: "Share on X ↗",
      verifyReceipt: "Verify Receipt in Tmail →",
      receiptShort: "Receipt",
      emptyState: 'No memes match your search. Try "Drake", "USPTO", "1151", or clear filters.',
      growTitle: "Built to keep growing (CC0 1.0).",
      growBody:
        "Every meme here is served from edge-cached Cloudflare R2 (cdn.temu3code.com) and indexed via memes.json — zero database, zero telemetry. Drop a new meme or receipt via GitHub PR/Issue and we'll add it to the arsenal (and we genuinely won't threaten your GitHub account).",
      growCta: "Contribute on GitHub ↗",
      growReceipts: "Inspect Original X Screenshots",
      footerNote: "CC0 1.0 Public Domain · Independent Satire & Public-Record Archive (Not affiliated with T3 Tools Inc.)",
      copiedToast: "Copied PNG to clipboard — paste straight into X / Discord!",
      copyFallbackToast: "Clipboard blocked by browser — opened image in new tab instead.",
      downloadedToast: "Downloaded meme image.",
      seriesLabels: {
        sins: "19 SINS CARD",
        blended: "VIRAL MEME",
        classic: "RECEIPT MEME",
        comics: "EDITORIAL STRIP",
        community: "COMMUNITY"
      }
    },
    zh: {
      langLabel: "EN",
      brandPill: "梗图弹药库 · CC0",
      navHome: "主页",
      navXReceipts: "原始 X 截图",
      navMail: "Tmail 邮件门",
      navRepo: "↗",
      eyebrow: "先笑破防 · 一键核验源码实锤 · CDN.TEMU3CODE.COM",
      heroTitle: "Temu3 梗图弹药库。",
      heroSub:
        "19 张「十九宗罪」全息收藏卡、33 张欧美经典换脸 Meme、经典收据梗图与双语讽刺漫画 —— CC0 1.0 随便转载。一键复制 PNG 直发 X / 微信 / Discord，每张图均绑定 Tmail 一手实锤。",
      drawSinBtn: "随机抽一张「十九宗罪」卡",
      openTmailBtn: "前往 Tmail 核验实锤 →",
      submitMemeBtn: "去 GitHub 投稿新梗图 ↗",
      tabAll: "全部",
      tabSins: "十九宗罪卡",
      tabBlended: "经典融图梗",
      tabClassic: "收据条梗图",
      tabComics: "双语漫画",
      searchPlaceholder: "搜索 Drake、小丑、1151、PostHog、#15...",
      copyBtn: "复制图",
      copyPng: "复制 PNG 原图",
      downloadBtn: "保存原图",
      shareX: "发到 X ↗",
      verifyReceipt: "前往 Tmail 核验实锤 →",
      receiptShort: "实锤",
      emptyState: "没有匹配的梗图，试试搜 Drake、USPTO、1151 或切换回「全部」。",
      growTitle: "持续生长的开源弹药库（CC0 1.0）。",
      growBody:
        "所有梗图托管在 Cloudflare R2 全球边缘缓存（cdn.temu3code.com），由静态 memes.json 驱动——零数据库、零遥测。欢迎通过 GitHub PR / Issue 投稿新梗图或新实锤（我们发誓绝不找 GitHub 封号）。",
      growCta: "去 GitHub 投稿 / Fork ↗",
      growReceipts: "查看 12 张一手 X 原始截图",
      footerNote: "CC0 1.0 公共领域 · 独立讽刺与开源公共记录档案（与 T3 Tools Inc. 无关）",
      copiedToast: "已复制高清 PNG 到剪贴板，直接粘贴发 X / Discord / 微信！",
      copyFallbackToast: "浏览器未开放剪贴板权限，已在新标签打开原图。",
      downloadedToast: "已开始下载梗图原图。",
      seriesLabels: {
        sins: "十九宗罪卡",
        blended: "病毒梗图",
        classic: "收据梗图",
        comics: "讽刺漫画",
        community: "社区投稿"
      }
    }
  };

  let lang = localStorage.getItem("temu3-lang") === "zh" ? "zh" : "en";
  let allItems = [];
  let visibleItems = [];
  let activeSeries = "all";
  let query = "";
  let lbIndex = -1;

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { el.hidden = true; }, 2600);
  }

  async function copyImageAsPng(url) {
    const dict = COPY[lang] || COPY.en;
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const bmp = await createImageBitmap(blob);
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width;
      canvas.height = bmp.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bmp, 0, 0);
      const pngBlob = await new Promise((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png")
      );
      await navigator.clipboard.write([new ClipboardItem({ "image/png": pngBlob })]);
      showToast(dict.copiedToast);
    } catch (_) {
      window.open(url, "_blank", "noopener,noreferrer");
      showToast(dict.copyFallbackToast);
    }
  }

  async function downloadImage(url, filename) {
    const dict = COPY[lang] || COPY.en;
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const objUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(objUrl), 4000);
      showToast(dict.downloadedToast);
    } catch (_) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  function getFiltered() {
    const q = query.trim().toLowerCase();
    return allItems.filter((it) => {
      if (activeSeries !== "all" && it.series !== activeSeries) return false;
      if (!q) return true;
      const hay = `${it.id} #${it.exhibit} ${it.titleEn} ${it.titleZh} ${it.series}`.toLowerCase();
      return hay.includes(q);
    });
  }

  function renderGrid() {
    const grid = document.getElementById("memeGrid");
    const empty = document.getElementById("emptyState");
    const badge = document.getElementById("countBadge");
    const dict = COPY[lang] || COPY.en;

    visibleItems = getFiltered();
    if (badge) badge.textContent = `${visibleItems.length} / ${allItems.length}`;
    if (!visibleItems.length) {
      grid.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    grid.innerHTML = visibleItems
      .map((it, idx) => {
        const title = lang === "zh" ? it.titleZh : it.titleEn;
        const sLabel = (dict.seriesLabels && dict.seriesLabels[it.series]) || it.series.toUpperCase();
        const isSin = it.series === "sins";
        return `<article class="meme-card${isSin ? " is-sin" : ""}" data-card-idx="${idx}">
          <button type="button" class="meme-media-btn" data-open-lb="${idx}" aria-label="${escapeHtml(title)}">
            <div class="meme-img-frame">
              <img src="${escapeHtml(it.url)}" alt="${escapeHtml(title)}" width="${it.width || 900}" height="${it.height || 900}" loading="lazy" crossorigin="anonymous" />
            </div>
          </button>
          <div class="meme-body">
            <div class="meme-meta">
              <span class="badge badge-${escapeHtml(it.series)}">${escapeHtml(sLabel)}</span>
              <span class="ex-tag">Exhibit #${escapeHtml(it.exhibit)}</span>
            </div>
            <h3 class="meme-title">${escapeHtml(title)}</h3>
            <div class="meme-actions">
              <button type="button" class="act-btn act-primary" data-copy-idx="${idx}">${escapeHtml(dict.copyBtn)}</button>
              <button type="button" class="act-btn" data-dl-idx="${idx}">${escapeHtml(dict.downloadBtn)}</button>
              <a class="act-btn act-cobalt" href="../mail/?thread=${encodeURIComponent(it.thread)}">${escapeHtml(dict.receiptShort)} #${escapeHtml(it.exhibit)} →</a>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  function updateLightbox() {
    if (lbIndex < 0 || lbIndex >= visibleItems.length) return;
    const it = visibleItems[lbIndex];
    const dict = COPY[lang] || COPY.en;
    const title = lang === "zh" ? it.titleZh : it.titleEn;
    const badgeEl = document.getElementById("lbBadge");
    badgeEl.className = `badge badge-${it.series}`;
    badgeEl.textContent = `${(dict.seriesLabels && dict.seriesLabels[it.series]) || it.series} · #${it.exhibit}`;
    document.getElementById("lbTitle").textContent = title;
    const img = document.getElementById("lbImg");
    img.src = it.url;
    img.alt = title;
    const shareText = encodeURIComponent(`${it.titleEn} — backed by verified primary receipts on temu3code.com`);
    const shareUrl = encodeURIComponent(`https://temu3code.com/memes/#${it.id}`);
    document.getElementById("lbShareX").href = `https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    document.getElementById("lbReceiptLink").href = `../mail/?thread=${encodeURIComponent(it.thread)}`;
    try {
      history.replaceState(null, "", `#${it.id}`);
    } catch (_) {}
  }

  function openLightbox(idx) {
    const lb = document.getElementById("memeLightbox");
    if (!lb || idx < 0 || idx >= visibleItems.length) return;
    lbIndex = idx;
    updateLightbox();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const lb = document.getElementById("memeLightbox");
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
    const searchEl = document.getElementById("memeSearch");
    if (searchEl) searchEl.placeholder = dict.searchPlaceholder;
    renderGrid();
    if (lbIndex >= 0) updateLightbox();
  }

  async function init() {
    try {
      const res = await fetch("../data/memes.json");
      const data = await res.json();
      allItems = Array.isArray(data.items) ? data.items : [];
    } catch (_) {
      allItems = [];
    }

    // Apply URL params (?series=sins or #id)
    const params = new URLSearchParams(window.location.search);
    const reqSeries = params.get("series");
    if (reqSeries && ["all", "sins", "blended", "classic", "comics"].includes(reqSeries)) {
      activeSeries = reqSeries;
      document.querySelectorAll("[data-series]").forEach((b) => {
        b.classList.toggle("is-active", b.getAttribute("data-series") === activeSeries);
      });
    }

    applyLang();

    const hashId = (window.location.hash || "").replace(/^#/, "");
    if (hashId) {
      const found = visibleItems.findIndex((i) => i.id === hashId);
      if (found >= 0) openLightbox(found);
    }
  }

  document.getElementById("langToggleBtn").addEventListener("click", () => {
    lang = lang === "en" ? "zh" : "en";
    try { localStorage.setItem("temu3-lang", lang); } catch (_) {}
    applyLang();
  });

  document.querySelectorAll("[data-series]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeSeries = btn.getAttribute("data-series") || "all";
      document.querySelectorAll("[data-series]").forEach((b) => b.classList.toggle("is-active", b === btn));
      renderGrid();
    });
  });

  document.getElementById("memeSearch").addEventListener("input", (e) => {
    query = e.target.value || "";
    renderGrid();
  });

  document.getElementById("drawSinBtn").addEventListener("click", () => {
    activeSeries = "sins";
    query = "";
    document.getElementById("memeSearch").value = "";
    document.querySelectorAll("[data-series]").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-series") === "sins");
    });
    renderGrid();
    if (visibleItems.length) {
      openLightbox(Math.floor(Math.random() * visibleItems.length));
    }
  });

  const gridEl = document.getElementById("memeGrid");
  gridEl.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-lb]");
    if (openBtn) {
      openLightbox(Number(openBtn.getAttribute("data-open-lb")));
      return;
    }
    const copyBtn = e.target.closest("[data-copy-idx]");
    if (copyBtn) {
      const it = visibleItems[Number(copyBtn.getAttribute("data-copy-idx"))];
      if (it) copyImageAsPng(it.url);
      return;
    }
    const dlBtn = e.target.closest("[data-dl-idx]");
    if (dlBtn) {
      const it = visibleItems[Number(dlBtn.getAttribute("data-dl-idx"))];
      if (it) downloadImage(it.url, `${it.id}.webp`);
    }
  });

  // Holographic foil pointer tracking on Sin Cards
  gridEl.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".meme-card.is-sin");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const mx = (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%";
    const my = (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%";
    card.style.setProperty("--mx", mx);
    card.style.setProperty("--my", my);
  });

  document.querySelectorAll("[data-lb-close]").forEach((el) => el.addEventListener("click", closeLightbox));
  document.getElementById("lbPrev").addEventListener("click", () => {
    if (lbIndex < 0) return;
    lbIndex = (lbIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  });
  document.getElementById("lbNext").addEventListener("click", () => {
    if (lbIndex < 0) return;
    lbIndex = (lbIndex + 1) % visibleItems.length;
    updateLightbox();
  });
  document.getElementById("lbCopyBtn").addEventListener("click", () => {
    const it = visibleItems[lbIndex];
    if (it) copyImageAsPng(it.url);
  });
  document.getElementById("lbDownloadBtn").addEventListener("click", () => {
    const it = visibleItems[lbIndex];
    if (it) downloadImage(it.url, `${it.id}.webp`);
  });

  document.addEventListener("keydown", (e) => {
    if (lbIndex < 0) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") {
      lbIndex = (lbIndex - 1 + visibleItems.length) % visibleItems.length;
      updateLightbox();
    } else if (e.key === "ArrowRight") {
      lbIndex = (lbIndex + 1) % visibleItems.length;
      updateLightbox();
    }
  });

  init();
})();
