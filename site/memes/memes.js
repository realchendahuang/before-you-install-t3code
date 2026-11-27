(() => {
  "use strict";

  const I18N = window.Temu3I18n;
  const INITIAL_SEO = {
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "",
    ogDesc: document.querySelector('meta[property="og:description"]')?.getAttribute("content") || ""
  };
  let lang = I18N.detectInitialLang();
  let bundle = null;
  let memesOverlay = null;
  let catalogMeta = null;
  let allItems = [];
  let visibleItems = [];
  let activeSeries = "all";
  let query = "";
  let lbIndex = -1;
  let lbPrevFocus = null;
  const BLANK_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  function t(path, fallback = "") {
    return I18N.getKey(bundle, path) || fallback;
  }

  function escapeHtml(s) {
    return I18N.escapeHtml(s);
  }

  function escapeBidi(s) {
    return I18N.escapeBidi(s);
  }

  function isAnimatedGif(it) {
    return Boolean(it && (it.animated || it.mime === "image/gif" || /\.gif(\?|$)/i.test(it.url || "")));
  }

  function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { el.hidden = true; }, 2400);
  }

  async function copyAsset(it) {
    if (!it) return;
    if (isAnimatedGif(it)) {
      try {
        await navigator.clipboard.writeText(it.url);
        showToast(t("memes.copiedGifToast", "Copied animated GIF link."));
      } catch (_) {
        window.open(it.url, "_blank", "noopener,noreferrer");
        showToast(t("memes.copyFallbackToast", "Opened image in a new tab."));
      }
      return;
    }
    try {
      const res = await fetch(it.url, { mode: "cors" });
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
      showToast(t("memes.copiedToast", "Copied PNG."));
    } catch (_) {
      window.open(it.url, "_blank", "noopener,noreferrer");
      showToast(t("memes.copyFallbackToast", "Opened image in a new tab."));
    }
  }

  async function downloadAsset(it) {
    if (!it) return;
    const ext = isAnimatedGif(it) ? "gif" : "webp";
    const filename = `${it.slug || it.id}.${ext}`;
    try {
      const res = await fetch(it.url, { mode: "cors" });
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
      showToast(t("memes.downloadedToast", "Saved."));
    } catch (_) {
      window.open(it.url, "_blank", "noopener,noreferrer");
    }
  }

  function updateDynamicCounts() {
    if (!catalogMeta) return;
    const zipBtn = document.getElementById("stickerZipBtn");
    if (zipBtn && catalogMeta.stickerZipUrl) {
      zipBtn.href = catalogMeta.stickerZipUrl;
    }
  }

  function renderSeriesBanner() {
    const el = document.getElementById("seriesBanner");
    if (!el) return;

    if (activeSeries === "stickers" && catalogMeta) {
      const zipUrl = catalogMeta.stickerZipUrl || "https://cdn.temu3code.com/stickers/theo-rage-stickers-pack.zip";
      const promoUrl = catalogMeta.promoSheetUrl || "";
      const mb = catalogMeta.stickerZipBytes ? ` (${(catalogMeta.stickerZipBytes / (1024 * 1024)).toFixed(1)} MB)` : "";
      el.innerHTML = `<div class="sb-left">
        ${promoUrl ? `<a class="sb-thumb" href="${escapeHtml(promoUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Sticker Contact Sheet"><img src="${escapeHtml(promoUrl)}" alt="Sticker Pack Promo Sheet" width="985" height="1600" loading="lazy" decoding="async" /></a>` : ""}
        <div>
          <div class="sb-title">${escapeHtml(t("memes.stickerBannerTitle", "Transparent Rage-Comic Sticker Pack"))}</div>
          <p class="sb-desc">${escapeHtml(t("memes.stickerBannerDesc", "Pre-sized RGBA folders for Discord & Slack (128px), Telegram (512px WebP/PNG), and WeChat (240px) + promo contact sheet."))}</p>
        </div>
      </div>
      <div class="sb-actions">
        ${promoUrl ? `<a class="act-btn" href="${escapeHtml(promoUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("memes.promoSheetBtn", "4×7 Contact Sheet ↗"))}</a>` : ""}
        <a class="act-btn act-cobalt" href="${escapeHtml(zipUrl)}" download>📦 ${escapeHtml(t("memes.stickerZipBtn", "Download Sticker Pack"))}${escapeHtml(mb)}</a>
      </div>`;
      el.hidden = false;
      return;
    }

    if (activeSeries === "story") {
      el.innerHTML = `<div class="sb-left">
        <div>
          <div class="sb-title">${escapeHtml(t("memes.storyBannerTitle", "Read the comic + listen in 18 languages"))}</div>
          <p class="sb-desc">${escapeHtml(t("memes.storyBannerDesc", "Switch any of the 18 languages from the top bar for native comics, panel subtitles, and NotebookLM podcasts."))}</p>
        </div>
      </div>
      <div class="sb-actions">
        <a class="act-btn act-cobalt" href="../story/">${escapeHtml(t("memes.openStoryReader", "Open /story/ →"))}</a>
      </div>`;
      el.hidden = false;
      return;
    }

    el.hidden = true;
    el.innerHTML = "";
  }

  function getFiltered() {
    const q = query.trim().toLowerCase();
    return allItems.filter((it) => {
      if (activeSeries === "receipts") {
        if (it.series !== "classic" && it.series !== "comics") return false;
      } else if (activeSeries !== "all" && it.series !== activeSeries) {
        return false;
      }
      if (!q) return true;
      const loc = I18N.pickMemeText(it, lang, memesOverlay);
      return `${it.id} #${it.exhibit} ${it.slug || ""} ${it.subseries || ""} ${it.titleEn} ${it.titleZh} ${it.noteEn || ""} ${it.noteZh || ""} ${loc.title} ${loc.note} ${it.series}`.toLowerCase().includes(q);
    });
  }

  let lastColCount = 0;

  function getColCount() {
    const w = window.innerWidth || 1200;
    if (w <= 540) return 1;
    if (w <= 980) return 2;
    return 3;
  }

  function renderGrid() {
    renderSeriesBanner();
    const grid = document.getElementById("memeGrid");
    const empty = document.getElementById("emptyState");
    const badge = document.getElementById("countBadge");
    visibleItems = getFiltered();
    if (badge) badge.textContent = `${visibleItems.length} / ${allItems.length}`;
    if (!visibleItems.length) {
      grid.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    const copyPngTxt = t("memes.copyBtn", "Copy PNG");
    const copyGifTxt = t("memes.copyGifBtn", "Copy GIF URL");
    const dlTxt = t("memes.downloadBtn", "Save");
    const dlGifTxt = t("memes.downloadGifBtn", "Save GIF");

    const colCount = getColCount();
    lastColCount = colCount;
    const cols = Array.from({ length: colCount }, () => []);
    const heights = new Array(colCount).fill(0);
    const colWidth = colCount === 1 ? 340 : colCount === 2 ? 360 : 340;

    const denseScript = lang.startsWith("zh") || lang === "ja" || lang === "ko";
    visibleItems.forEach((it, idx) => {
      const { title, note } = I18N.pickMemeText(it, lang, memesOverlay);
      const sLabel = t(`memes.series.${it.series}`, it.series.toUpperCase());
      const gif = isAnimatedGif(it);
      const cardCls = [
        "meme-card",
        it.series === "sins" ? "is-sin" : "",
        it.series === "stickers" || it.transparent ? "is-sticker" : "",
      ].filter(Boolean).join(" ");

      const srcHref = it.sourceUrl || `../mail/?thread=${encodeURIComponent(it.thread)}`;
      const srcAttrs = it.sourceUrl ? ' target="_blank" rel="noopener noreferrer"' : "";

      const w = Number(it.width) || 900;
      const h = Number(it.height) || 900;
      const ratio = Math.min(2.2, Math.max(0.4, h / w));
      const noteLines = note ? Math.ceil(note.length / (denseScript ? 22 : 42)) : 0;
      const titleLines = title ? Math.ceil(title.length / (denseScript ? 18 : 34)) : 1;
      const estHeight = ratio * colWidth + 96 + titleLines * 21 + noteLines * 20;

      let bestCol = 0;
      for (let c = 1; c < colCount; c++) {
        if (heights[c] < heights[bestCol]) bestCol = c;
      }

      cols[bestCol].push(`<article class="${cardCls}">
          <button type="button" class="meme-media-btn" data-open-lb="${idx}" aria-label="${escapeHtml(title)}">
            <div class="meme-img-frame">
              ${gif ? `<span class="gif-pill">GIF</span>` : ""}
              <img src="${escapeHtml(it.url)}" alt="${escapeHtml(title)}" width="${w}" height="${h}" loading="lazy" decoding="async" crossorigin="anonymous" />
            </div>
          </button>
          <div class="meme-body">
            <div class="meme-meta">
              <span class="badge badge-${escapeHtml(it.series)}">${escapeHtml(sLabel)}</span>
              <span class="ex-tag">${it.slug ? `:${escapeHtml(it.slug)}:` : `#${escapeHtml(it.exhibit)}`}</span>
            </div>
            <h3 class="meme-title">${escapeBidi(title)}</h3>
            ${note ? `<p class="meme-note">${escapeBidi(note)}</p>` : ""}
            <div class="meme-actions">
              <button type="button" class="act-btn act-primary" data-copy-idx="${idx}">${escapeHtml(gif ? copyGifTxt : copyPngTxt)}</button>
              <button type="button" class="act-btn" data-dl-idx="${idx}">${escapeHtml(gif ? dlGifTxt : dlTxt)}</button>
              <a class="act-btn act-cobalt" href="${escapeHtml(srcHref)}"${srcAttrs}>#${escapeHtml(it.exhibit)} →</a>
            </div>
          </div>
        </article>`);
      heights[bestCol] += estHeight + 18;
    });

    grid.innerHTML = cols.map((itemsHtml) => `<div class="meme-col">${itemsHtml.join("")}</div>`).join("");
  }

  function triggerPop() {
    const box = document.getElementById("lbImgBox");
    if (!box) return;
    box.classList.remove("is-drawing");
    void box.offsetWidth;
    box.classList.add("is-drawing");
  }

  function updateLightbox(animate = false) {
    if (lbIndex < 0 || lbIndex >= visibleItems.length) return;
    const it = visibleItems[lbIndex];
    const { title, note } = I18N.pickMemeText(it, lang, memesOverlay);
    const gif = isAnimatedGif(it);

    const counter = document.getElementById("lbCounter");
    if (counter) counter.textContent = `${lbIndex + 1} / ${visibleItems.length}`;
    const badgeEl = document.getElementById("lbBadge");
    badgeEl.className = `badge badge-${it.series}`;
    const sLabel = t(`memes.series.${it.series}`, it.series);
    badgeEl.textContent = `${sLabel} · ${it.slug ? `:${it.slug}:` : `#${it.exhibit}`}`;
    document.getElementById("lbTitle").innerHTML = escapeBidi(title);
    const noteEl = document.getElementById("lbNote");
    if (noteEl) noteEl.innerHTML = escapeBidi(note || "");
    const imgBox = document.getElementById("lbImgBox");
    if (imgBox) imgBox.classList.toggle("is-transparent", Boolean(it.transparent || it.series === "stickers"));
    const img = document.getElementById("lbImg");
    img.src = BLANK_IMG;
    img.src = it.url;
    img.alt = title;

    const copyBtn = document.getElementById("lbCopyBtn");
    if (copyBtn) copyBtn.textContent = gif ? t("memes.copyGifBtn", "Copy GIF URL") : t("memes.copyBtn", "Copy PNG");
    const dlBtn = document.getElementById("lbDownloadBtn");
    if (dlBtn) dlBtn.textContent = gif ? t("memes.downloadGifBtn", "Save GIF") : t("memes.downloadBtn", "Save");

    const shareText = encodeURIComponent(`${title} · temu3code.com`);
    const shareUrl = encodeURIComponent(`https://temu3code.com/memes/#${it.id}`);
    document.getElementById("lbShareX").href = `https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    const receiptLink = document.getElementById("lbReceiptLink");
    if (it.sourceUrl) {
      receiptLink.href = it.sourceUrl;
      receiptLink.setAttribute("target", "_blank");
      receiptLink.setAttribute("rel", "noopener noreferrer");
      receiptLink.textContent = t("common.openX", "Original post ↗");
    } else {
      receiptLink.href = `../mail/?thread=${encodeURIComponent(it.thread)}`;
      receiptLink.removeAttribute("target");
      receiptLink.removeAttribute("rel");
      receiptLink.textContent = t("memes.verifyReceipt", "Source →");
    }
    const drawAgain = document.getElementById("lbDrawAgainBtn");
    if (drawAgain) drawAgain.hidden = it.series !== "sins";
    if (animate) triggerPop();
    try { history.replaceState(null, "", `#${it.id}`); } catch (_) {}
  }

  function openLightbox(idx, animate = false) {
    const lb = document.getElementById("memeLightbox");
    if (!lb || idx < 0 || idx >= visibleItems.length) return;
    if (lb.hidden) lbPrevFocus = document.activeElement;
    lbIndex = idx;
    updateLightbox(animate);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = lb.querySelector(".lb-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    const lb = document.getElementById("memeLightbox");
    if (!lb) return;
    lb.hidden = true;
    lbIndex = -1;
    document.body.style.overflow = "";
    if (window.location.hash) {
      try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (_) {}
    }
    if (lbPrevFocus && typeof lbPrevFocus.focus === "function") lbPrevFocus.focus();
    lbPrevFocus = null;
  }

  function stepLightbox(delta) {
    if (lbIndex < 0 || !visibleItems.length) return;
    lbIndex = (lbIndex + delta + visibleItems.length) % visibleItems.length;
    updateLightbox(false);
  }

  function setMetaAttr(selector, val) {
    const el = document.querySelector(selector);
    if (el && val) el.setAttribute("content", val);
  }

  async function applyLanguage(nextCode, deferRender = false) {
    const target = I18N.normalizeLang(nextCode) || "en";
    lang = target;
    I18N.applyDirection(lang);
    const [nextBundle, nextOverlay] = await Promise.all([
      I18N.loadBundle(lang, "../data/"),
      I18N.loadMemesOverlay(lang, "../data/")
    ]);
    if (lang !== target || !nextBundle) return;
    bundle = nextBundle;
    memesOverlay = nextOverlay;

    if (lang === "en") {
      document.title = INITIAL_SEO.title;
      setMetaAttr('meta[name="description"]', INITIAL_SEO.desc);
      setMetaAttr('meta[property="og:title"]', INITIAL_SEO.ogTitle);
      setMetaAttr('meta[property="og:description"]', INITIAL_SEO.ogDesc);
    } else {
      const pt = t("memes.pageTitle");
      const pd = t("memes.sub");
      if (pt) {
        document.title = pt;
        setMetaAttr('meta[property="og:title"]', pt);
      }
      if (pd) {
        setMetaAttr('meta[name="description"]', pd);
        setMetaAttr('meta[property="og:description"]', pd);
      }
    }
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n"));
      if (!v) return;
      if (el.tagName !== "OPTION" && /@[A-Za-z0-9_]+/.test(v)) {
        el.innerHTML = escapeBidi(v);
      } else {
        el.textContent = v;
      }
    });
    const searchEl = document.getElementById("memeSearch");
    if (searchEl) searchEl.placeholder = t("memes.searchPlaceholder", searchEl.placeholder);

    if (!deferRender) {
      updateDynamicCounts();
      renderGrid();
      if (lbIndex >= 0) updateLightbox(false);
    }
  }

  async function init() {
    I18N.mountLangSelect(document.getElementById("langSelect"), lang, applyLanguage);

    const reqSeries = new URLSearchParams(window.location.search).get("series");
    if (reqSeries) {
      const mapped = (reqSeries === "classic" || reqSeries === "comics") ? "receipts" : reqSeries;
      if (["all", "sins", "blended", "stickers", "creative", "story", "receipts"].includes(mapped)) {
        activeSeries = mapped;
        document.querySelectorAll("[data-series]").forEach((b) =>
          b.classList.toggle("is-active", b.getAttribute("data-series") === activeSeries)
        );
      }
    }

    const [memesRes] = await Promise.all([
      fetch("../data/memes.json?v=7").catch(() => null),
      applyLanguage(lang, true)
    ]);
    if (memesRes && memesRes.ok) {
      try {
        const data = await memesRes.json();
        catalogMeta = data;
        allItems = Array.isArray(data.items) ? data.items : [];
      } catch (_) {
        allItems = [];
      }
    }
    updateDynamicCounts();
    renderGrid();

    const hashId = (window.location.hash || "").replace(/^#/, "");
    if (hashId) {
      const found = visibleItems.findIndex((i) => i.id === hashId);
      if (found >= 0) openLightbox(found, false);
    }
  }

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
    document.querySelectorAll("[data-series]").forEach((b) =>
      b.classList.toggle("is-active", b.getAttribute("data-series") === "sins")
    );
    renderGrid();
    if (visibleItems.length) openLightbox(Math.floor(Math.random() * visibleItems.length), true);
  });

  document.getElementById("lbDrawAgainBtn").addEventListener("click", () => {
    if (!visibleItems.length) return;
    let next = Math.floor(Math.random() * visibleItems.length);
    if (visibleItems.length > 1 && next === lbIndex) next = (next + 1) % visibleItems.length;
    lbIndex = next;
    updateLightbox(true);
  });

  const gridEl = document.getElementById("memeGrid");
  gridEl.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-lb]");
    if (openBtn) { openLightbox(Number(openBtn.getAttribute("data-open-lb")), false); return; }
    const copyBtn = e.target.closest("[data-copy-idx]");
    if (copyBtn) { const it = visibleItems[Number(copyBtn.getAttribute("data-copy-idx"))]; if (it) copyAsset(it); return; }
    const dlBtn = e.target.closest("[data-dl-idx]");
    if (dlBtn) { const it = visibleItems[Number(dlBtn.getAttribute("data-dl-idx"))]; if (it) downloadAsset(it); }
  });

  gridEl.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".meme-card.is-sin");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
    card.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
  });

  document.querySelectorAll("[data-lb-close]").forEach((el) => el.addEventListener("click", closeLightbox));
  document.getElementById("lbPrev").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lbNext").addEventListener("click", () => stepLightbox(1));
  document.getElementById("lbPrevMobile").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lbNextMobile").addEventListener("click", () => stepLightbox(1));
  document.getElementById("lbCopyBtn").addEventListener("click", () => {
    const it = visibleItems[lbIndex]; if (it) copyAsset(it);
  });
  document.getElementById("lbDownloadBtn").addEventListener("click", () => {
    const it = visibleItems[lbIndex]; if (it) downloadAsset(it);
  });

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
    if (lbIndex < 0) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") stepLightbox(-1);
    else if (e.key === "ArrowRight") stepLightbox(1);
    else if (e.key === "Tab") I18N.trapFocus(document.querySelector("#memeLightbox .lb-dialog"), e);
  });

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (allItems.length && getColCount() !== lastColCount) renderGrid();
    }, 120);
  });

  init();
})();
