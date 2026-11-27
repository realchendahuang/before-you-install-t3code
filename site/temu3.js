(() => {
  "use strict";

  const X_RECEIPTS = [
    { id: "2124823227570745504", src: "./receipts/x-2124823227570745504-chinese-knockoff.png", url: "https://x.com/theo/status/2124823227570745504", thread: "2026-11-23-origin-temu3-threat", tags: ["origin", "double-standard"] },
    { id: "2124825920808829077", src: "./receipts/x-2124825920808829077-temu3-code.png", url: "https://x.com/theo/status/2124825920808829077", thread: "2026-11-23-origin-temu3-threat", tags: ["origin", "hostility"] },
    { id: "2124829315657576890", src: "./evidence/01-origin-theo-threat.png", url: "https://x.com/theo/status/2124829315657576890", thread: "2026-11-23-origin-temu3-threat", tags: ["origin", "hostility"] },
    { id: "2124989435154726982", src: "./receipts/x-2124989435154726982-trillion-dollar-oss.png", url: "https://x.com/theo/status/2124989435154726982", thread: "2026-11-23-origin-temu3-threat", tags: ["origin", "double-standard"] },
    { id: "2125019705270477102", src: "./receipts/x-2125019705270477102-low-quality-users.png", url: "https://x.com/theo/status/2125019705270477102", thread: "2026-11-24-retroactive-trademark-blocker", tags: ["origin", "hostility"] },
    { id: "2125082769395220688", src: "./receipts/x-2125082769395220688-always-illegal.png", url: "https://x.com/theo/status/2125082769395220688", thread: "2026-11-24-retroactive-trademark-blocker", tags: ["origin", "double-standard"] },
    { id: "2125077510941802509", src: "./evidence/extra/p8-3-x-theo-autoblocker.png", url: "https://x.com/theo/status/2125077510941802509", thread: "2026-11-24-retroactive-trademark-blocker", tags: ["origin", "hostility"] },
    { id: "2125177503526588877", src: "./evidence/26-cn-cesspit.png", url: "https://x.com/theo/status/2125177503526588877", thread: "2026-11-24-cesspit-crisis-outburst", tags: ["origin", "hostility"] },
    { id: "2125177947376300110", src: "./receipts/x-2125177947376300110-hurt-feelings-zh.png", url: "https://x.com/theo/status/2125177947376300110", thread: "2026-11-24-cesspit-crisis-outburst", tags: ["origin", "hostility"] },
    { id: "2125182476943556955", src: "./receipts/x-2125182476943556955-zero-value.png", url: "https://x.com/theo/status/2125182476943556955", thread: "2026-11-24-cesspit-crisis-outburst", tags: ["origin", "hostility"] },
    { id: "2125193393450226024", src: "./receipts/x-2125193393450226024-not-apologizing.png", url: "https://x.com/theo/status/2125193393450226024", thread: "2026-11-24-cesspit-crisis-outburst", tags: ["origin", "hostility"] },
    { id: "2119240810202034645", src: "./evidence/23-stealing-fork-bot.png", url: "https://x.com/theo/status/2119240810202034645", thread: "2026-11-08-stealing-miaai-fork", tags: ["double-standard"] }
  ];

  const PREVIEW_THREADS = [
    {
      thread: "2026-11-23-origin-temu3-threat",
      cards: [
        {
          badgeClass: "win-badge-red",
          badgeKey: "home.winC1Badge",
          metaKey: "home.winC1Meta",
          href: "https://x.com/theo/status/2124829315657576890",
          html: "“Temu3 Code” · “Not consider. Do it right now or I'm going to contact GitHub and have your account taken down.”"
        },
        {
          badgeClass: "win-badge-green",
          badgeKey: "home.winC2Badge",
          metaKey: "home.winC2Meta",
          href: "https://x.com/theo/status/2124989435154726982",
          html: "“Nah. Open source is open source, even if a trillion dollar company uses it!”"
        },
        {
          badgeClass: "win-badge-amber",
          badgeKey: "home.winC3Badge",
          metaKey: "home.winC3Meta",
          href: "https://x.com/theo/status/2119240810202034645",
          html: "“Okay I'm stealing this” → <code>@bot find her fork and see how portable this is... implement it.</code>"
        }
      ]
    },
    {
      thread: "2026-11-25-gdpr-overnight-collapse",
      cards: [
        { badgeClass: "win-badge-red", badgeKey: "home.winP2B1", metaKey: "home.winP2M1", textKey: "home.winP2T1" },
        { badgeClass: "win-badge-amber", badgeKey: "home.winP2B2", metaKey: "home.winP2M2", textKey: "home.winP2T2" }
      ]
    },
    {
      thread: "2025-10-ffmpeg-bounty",
      cards: [
        { badgeClass: "win-badge-amber", badgeKey: "home.winP3B1", metaKey: "home.winP3M1", textKey: "home.winP3T1" },
        { badgeClass: "win-badge-red", badgeKey: "home.winP3B2", metaKey: "home.winP3M2", textKey: "home.winP3T2" }
      ]
    },
    {
      thread: "2026-11-25-ca81b7b9-active-vulns",
      cards: [
        { badgeClass: "win-badge-red", badgeKey: "home.winP4B1", metaKey: "home.winP4M1", textKey: "home.winP4T1" },
        { badgeClass: "win-badge-amber", badgeKey: "home.winP4B2", metaKey: "home.winP4M2", textKey: "home.winP4T2" }
      ]
    }
  ];

  const I18N = window.Temu3I18n;
  let lang = I18N.detectInitialLang();
  let bundle = null;
  let activePreviewIdx = 0;
  let activeFilter = "all";
  let visibleReceipts = X_RECEIPTS.slice();
  let memeCatalog = [];
  let memeCatalogMeta = null;
  let lbMode = "receipts";
  let lbIsSins = false;
  let lbItems = [];
  let lbIndex = -1;

  function t(path, fallback = "") {
    return I18N.getKey(bundle, path) || fallback;
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isZh() {
    return lang === "zh-CN" || lang === "zh-TW";
  }

  function showToast(msg) {
    const el = document.getElementById("homeToast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { el.hidden = true; }, 2400);
  }

  async function copyImageAsPng(url) {
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const bmp = await createImageBitmap(blob);
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width;
      canvas.height = bmp.height;
      canvas.getContext("2d").drawImage(bmp, 0, 0);
      const pngBlob = await new Promise((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png")
      );
      await navigator.clipboard.write([new ClipboardItem({ "image/png": pngBlob })]);
      showToast(t("home.mmCopied", "Copied PNG to clipboard."));
    } catch (_) {
      window.open(url, "_blank", "noopener,noreferrer");
      showToast(t("home.mmCopyFallback", "Opened image in a new tab."));
    }
  }

  function renderPreviewPane() {
    const host = document.getElementById("winCenterCards");
    const openBtn = document.getElementById("winOpenThreadBtn");
    const item = PREVIEW_THREADS[activePreviewIdx] || PREVIEW_THREADS[0];
    if (!host || !item) return;

    host.innerHTML = item.cards
      .map((c) => {
        const badge = escapeHtml(t(c.badgeKey, ""));
        const meta = escapeHtml(t(c.metaKey, ""));
        const body = c.html ? c.html : escapeHtml(t(c.textKey, ""));
        const pAttr = c.html ? ' dir="ltr"' : "";
        const inner = `<div class="win-msg-head">
          <span class="${c.badgeClass}">${badge}</span>
          <span class="muted">${meta}</span>
        </div>
        <p${pAttr}>${body}</p>`;
        if (c.href) {
          return `<a class="win-msg-card" href="${escapeHtml(c.href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
        }
        return `<a class="win-msg-card" href="./mail/?thread=${encodeURIComponent(item.thread)}">${inner}</a>`;
      })
      .join("");

    if (openBtn) {
      openBtn.href = `./mail/?thread=${encodeURIComponent(item.thread)}`;
      openBtn.textContent = t("home.winOpenThread", "Open this thread in Tmail →");
    }

    document.querySelectorAll("[data-preview-idx]").forEach((btn) => {
      const active = Number(btn.getAttribute("data-preview-idx")) === activePreviewIdx;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function renderXReceipts() {
    const grid = document.getElementById("xReceiptsGrid");
    if (!grid) return;
    visibleReceipts =
      activeFilter === "all"
        ? X_RECEIPTS.slice()
        : X_RECEIPTS.filter((r) => r.tags.includes(activeFilter));

    const openX = t("common.openX", "Original post ↗");
    const openMail = t("common.openMail", "Tmail →");

    grid.innerHTML = visibleReceipts
      .map((r, idx) => {
        const title = t(`home.xrTitles.${r.id}`, r.id);
        return `<article class="xr-card">
          <button type="button" class="xr-thumb-btn" data-lb-idx="${idx}" aria-label="${escapeHtml(title)}">
            <div class="xr-thumb-frame">
              <img src="${escapeHtml(r.src)}" alt="${escapeHtml(title)}" loading="lazy" />
            </div>
          </button>
          <div class="xr-card-body">
            <h3 class="xr-card-title">${escapeHtml(title)}</h3>
            <div class="xr-card-actions">
              <a class="xr-btn xr-btn-x" href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(openX)}</a>
              <a class="xr-btn" href="./mail/?thread=${encodeURIComponent(r.thread)}">${escapeHtml(openMail)}</a>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  function renderMemeShowcase() {
    const rail = document.getElementById("homeSinsRail");
    const viralGrid = document.getElementById("homeViralGrid");

    // Sync Story cover & dynamic meme counts
    const coverImg = document.getElementById("homeStoryCoverImg");
    if (coverImg && memeCatalogMeta && Array.isArray(memeCatalogMeta.storyEpisodes) && memeCatalogMeta.storyEpisodes.length) {
      const ep1 = memeCatalogMeta.storyEpisodes[0];
      const pick = isZh() ? (ep1.zh || ep1.en) : (ep1.en || ep1.zh);
      if (pick && pick.url) coverImg.src = pick.url;
    }
    const zipBtn = document.getElementById("homeStoryZipBtn");
    if (zipBtn && memeCatalogMeta && memeCatalogMeta.stickerZipUrl) {
      zipBtn.href = memeCatalogMeta.stickerZipUrl;
    }

    if (!rail || !viralGrid || !memeCatalog.length) return;

    const sins = memeCatalog.filter((m) => m.series === "sins");
    const featuredViral = memeCatalog.filter((m) => m.series === "blended" && m.featured).slice(0, 6);

    rail.innerHTML = sins
      .map((m, idx) => {
        const title = isZh() ? m.titleZh : m.titleEn;
        return `<button type="button" class="sin-rail-card" data-sin-idx="${idx}">
          <div class="sin-rail-img">
            <img src="${escapeHtml(m.url)}" alt="${escapeHtml(title)}" loading="lazy" />
          </div>
          <div class="sin-rail-title">${escapeHtml(title)}</div>
        </button>`;
      })
      .join("");

    viralGrid.innerHTML = featuredViral
      .map((m, idx) => {
        const title = isZh() ? m.titleZh : m.titleEn;
        const note = isZh() ? m.noteZh : m.noteEn;
        const srcHref = m.sourceUrl || `./mail/?thread=${encodeURIComponent(m.thread)}`;
        const srcAttrs = m.sourceUrl ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<article class="mm-viral-card">
          <button type="button" class="mm-viral-thumb" data-viral-idx="${idx}" aria-label="${escapeHtml(title)}">
            <img src="${escapeHtml(m.url)}" alt="${escapeHtml(title)}" loading="lazy" />
          </button>
          <div class="mm-viral-body">
            <div class="mm-viral-top">
              <span class="mm-viral-title">${escapeHtml(title)}</span>
              <a class="mm-viral-link" href="${escapeHtml(srcHref)}"${srcAttrs}>#${escapeHtml(m.exhibit)} →</a>
            </div>
            ${note ? `<p class="mm-viral-note">${escapeHtml(note)}</p>` : ""}
          </div>
        </article>`;
      })
      .join("");
  }

  function triggerDrawPop() {
    const wrap = document.getElementById("lbImgWrap");
    if (!wrap) return;
    wrap.classList.remove("is-drawing");
    void wrap.offsetWidth;
    wrap.classList.add("is-drawing");
  }

  function updateLightbox(animate = false) {
    const lb = document.getElementById("receiptLightbox");
    if (!lb || lbIndex < 0 || lbIndex >= lbItems.length) return;
    const img = document.getElementById("lbImg");
    const counter = document.getElementById("lbCounter");
    const xLink = document.getElementById("lbXLink");
    const mailLink = document.getElementById("lbMailLink");
    const rawLink = document.getElementById("lbRawLink");
    const drawAgainBtn = document.getElementById("lbDrawAgainBtn");
    const copyBtn = document.getElementById("lbCopyPngBtn");

    if (counter) counter.textContent = `${lbIndex + 1} / ${lbItems.length}`;
    if (copyBtn) copyBtn.textContent = t("home.mmCopyPng", "Copy PNG");

    const noteEl = document.getElementById("lbNote");
    if (lbMode === "memes") {
      const m = lbItems[lbIndex];
      const title = isZh() ? m.titleZh : m.titleEn;
      document.getElementById("lbTitle").textContent = title;
      if (noteEl) noteEl.textContent = (isZh() ? m.noteZh : m.noteEn) || "";
      img.src = m.url;
      img.alt = title;
      xLink.href = `./memes/#${encodeURIComponent(m.id)}`;
      xLink.removeAttribute("target");
      xLink.textContent = t("home.mmOpenArsenal", "Open in /memes/ ↗");
      if (m.sourceUrl) {
        mailLink.href = m.sourceUrl;
        mailLink.setAttribute("target", "_blank");
        mailLink.setAttribute("rel", "noopener noreferrer");
        mailLink.textContent = t("common.openX", "Original post ↗");
      } else {
        mailLink.href = `./mail/?thread=${encodeURIComponent(m.thread)}`;
        mailLink.removeAttribute("target");
        mailLink.removeAttribute("rel");
        mailLink.textContent = t("common.openMail", "Tmail →");
      }
      rawLink.href = m.url;
      rawLink.textContent = t("common.rawImage", "Full image ↗");
      if (drawAgainBtn) drawAgainBtn.hidden = !lbIsSins;
      if (animate) triggerDrawPop();
      return;
    }

    const r = lbItems[lbIndex];
    const title = t(`home.xrTitles.${r.id}`, r.id);
    document.getElementById("lbTitle").textContent = title;
    if (noteEl) noteEl.textContent = "";
    img.src = r.src;
    img.alt = title;
    xLink.href = r.url;
    xLink.setAttribute("target", "_blank");
    xLink.textContent = t("common.openX", "Original post ↗");
    mailLink.href = `./mail/?thread=${encodeURIComponent(r.thread)}`;
    mailLink.textContent = t("common.openMail", "Tmail →");
    rawLink.href = r.src;
    rawLink.textContent = t("common.rawImage", "Full image ↗");
    if (drawAgainBtn) drawAgainBtn.hidden = true;
  }

  function openLightbox(idx, mode = "receipts", list = null, isSins = false, animate = false) {
    const lb = document.getElementById("receiptLightbox");
    lbMode = mode;
    lbIsSins = isSins;
    lbItems = list || visibleReceipts;
    if (!lb || idx < 0 || idx >= lbItems.length) return;
    lbIndex = idx;
    updateLightbox(animate);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const lb = document.getElementById("receiptLightbox");
    if (!lb) return;
    lb.hidden = true;
    lbIndex = -1;
    document.body.style.overflow = "";
  }

  function stepLightbox(delta) {
    if (lbIndex < 0 || !lbItems.length) return;
    lbIndex = (lbIndex + delta + lbItems.length) % lbItems.length;
    updateLightbox(false);
  }

  async function applyLanguage(nextCode) {
    lang = I18N.normalizeLang(nextCode) || "en";
    I18N.applyDirection(lang);
    bundle = await I18N.loadBundle(lang, "./data/");
    if (!bundle) return;

    const pt = t("home.pageTitle");
    if (pt) document.title = pt;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n-html"));
      if (v) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-tip]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n-tip"));
      if (v) el.setAttribute("data-tip", v);
    });

    renderPreviewPane();
    renderXReceipts();
    renderMemeShowcase();
    if (lbIndex >= 0) updateLightbox(false);
  }

  async function init() {
    I18N.mountLangSelect(document.getElementById("langSelect"), lang, applyLanguage);
    await applyLanguage(lang);
    try {
      const res = await fetch("./data/memes.json?v=5");
      if (res.ok) {
        const data = await res.json();
        memeCatalogMeta = data;
        memeCatalog = Array.isArray(data.items) ? data.items : [];
        renderMemeShowcase();
      }
    } catch (_) {}
  }

  document.querySelectorAll("[data-preview-idx]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activePreviewIdx = Number(btn.getAttribute("data-preview-idx")) || 0;
      renderPreviewPane();
    });
  });

  document.querySelectorAll("[data-xr-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-xr-filter") || "all";
      document.querySelectorAll("[data-xr-filter]").forEach((b) => b.classList.toggle("is-active", b === btn));
      renderXReceipts();
    });
  });

  document.getElementById("xReceiptsGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lb-idx]");
    if (btn) openLightbox(Number(btn.getAttribute("data-lb-idx")), "receipts", visibleReceipts, false, false);
  });

  document.getElementById("homeSinsRail").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-sin-idx]");
    if (!btn) return;
    openLightbox(Number(btn.getAttribute("data-sin-idx")), "memes", memeCatalog.filter((m) => m.series === "sins"), true, false);
  });

  document.getElementById("homeViralGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-viral-idx]");
    if (!btn) return;
    openLightbox(
      Number(btn.getAttribute("data-viral-idx")),
      "memes",
      memeCatalog.filter((m) => m.series === "blended" && m.featured).slice(0, 6),
      false,
      false
    );
  });

  document.getElementById("homeDrawSinBtn").addEventListener("click", () => {
    const sins = memeCatalog.filter((m) => m.series === "sins");
    if (!sins.length) { window.location.href = "./memes/?series=sins"; return; }
    openLightbox(Math.floor(Math.random() * sins.length), "memes", sins, true, true);
  });

  document.getElementById("lbDrawAgainBtn").addEventListener("click", () => {
    if (!lbItems.length) return;
    let next = Math.floor(Math.random() * lbItems.length);
    if (lbItems.length > 1 && next === lbIndex) next = (next + 1) % lbItems.length;
    lbIndex = next;
    updateLightbox(true);
  });

  document.getElementById("lbCopyPngBtn").addEventListener("click", () => {
    if (lbIndex < 0 || !lbItems.length) return;
    const cur = lbItems[lbIndex];
    const url = lbMode === "memes" ? cur.url : cur.src;
    if (url) copyImageAsPng(url);
  });

  document.querySelectorAll("[data-lb-close]").forEach((el) => el.addEventListener("click", closeLightbox));
  document.getElementById("lbPrev").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lbNext").addEventListener("click", () => stepLightbox(1));
  document.getElementById("lbPrevMobile").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lbNextMobile").addEventListener("click", () => stepLightbox(1));

  // Touch swipe left/right inside lightbox
  let touchStartX = 0;
  let touchStartY = 0;
  const lbStage = document.getElementById("lbStage");
  if (lbStage) {
    lbStage.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    lbStage.addEventListener("touchend", (e) => {
      if (!e.changedTouches.length) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        stepLightbox(dx < 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  document.addEventListener("keydown", (e) => {
    if (lbIndex < 0 || !lbItems.length) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") stepLightbox(-1);
    else if (e.key === "ArrowRight") stepLightbox(1);
  });

  init();
})();
