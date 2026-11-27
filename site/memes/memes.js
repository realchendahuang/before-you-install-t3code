(() => {
  "use strict";

  const I18N = window.Temu3I18n;
  let lang = I18N.detectInitialLang();
  let bundle = null;
  let allItems = [];
  let visibleItems = [];
  let activeSeries = "all";
  let query = "";
  let lbIndex = -1;

  function t(path, fallback = "") {
    return I18N.getKey(bundle, path) || fallback;
  }

  function isZh() {
    return lang === "zh-CN" || lang === "zh-TW";
  }

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
      showToast(t("memes.copiedToast", "Copied PNG!"));
    } catch (_) {
      window.open(url, "_blank", "noopener,noreferrer");
      showToast(t("memes.copyFallbackToast", "Opened image in new tab."));
    }
  }

  async function downloadImage(url, filename) {
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
      showToast(t("memes.downloadedToast", "Download started."));
    } catch (_) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  function getFiltered() {
    const q = query.trim().toLowerCase();
    return allItems.filter((it) => {
      if (activeSeries !== "all" && it.series !== activeSeries) return false;
      if (!q) return true;
      return `${it.id} #${it.exhibit} ${it.titleEn} ${it.titleZh} ${it.series}`.toLowerCase().includes(q);
    });
  }

  function renderGrid() {
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

    const copyTxt = t("memes.copyBtn", "Copy PNG");
    const dlTxt = t("memes.downloadBtn", "Save");

    grid.innerHTML = visibleItems
      .map((it, idx) => {
        const title = isZh() ? it.titleZh : it.titleEn;
        const sLabel = t(`memes.series.${it.series}`, it.series.toUpperCase());
        return `<article class="meme-card${it.series === "sins" ? " is-sin" : ""}">
          <button type="button" class="meme-media-btn" data-open-lb="${idx}" aria-label="${escapeHtml(title)}">
            <div class="meme-img-frame">
              <img src="${escapeHtml(it.url)}" alt="${escapeHtml(title)}" width="${it.width || 900}" height="${it.height || 900}" loading="lazy" crossorigin="anonymous" />
            </div>
          </button>
          <div class="meme-body">
            <div class="meme-meta">
              <span class="badge badge-${escapeHtml(it.series)}">${escapeHtml(sLabel)}</span>
              <span class="ex-tag">#${escapeHtml(it.exhibit)}</span>
            </div>
            <h3 class="meme-title">${escapeHtml(title)}</h3>
            <div class="meme-actions">
              <button type="button" class="act-btn act-primary" data-copy-idx="${idx}">${escapeHtml(copyTxt)}</button>
              <button type="button" class="act-btn" data-dl-idx="${idx}">${escapeHtml(dlTxt)}</button>
              <a class="act-btn act-cobalt" href="../mail/?thread=${encodeURIComponent(it.thread)}">#${escapeHtml(it.exhibit)} →</a>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  function updateLightbox() {
    if (lbIndex < 0 || lbIndex >= visibleItems.length) return;
    const it = visibleItems[lbIndex];
    const title = isZh() ? it.titleZh : it.titleEn;
    const badgeEl = document.getElementById("lbBadge");
    badgeEl.className = `badge badge-${it.series}`;
    badgeEl.textContent = `${t(`memes.series.${it.series}`, it.series)} · #${it.exhibit}`;
    document.getElementById("lbTitle").textContent = title;
    const img = document.getElementById("lbImg");
    img.src = it.url;
    img.alt = title;
    const shareText = encodeURIComponent(`${it.titleEn} — temu3code.com`);
    const shareUrl = encodeURIComponent(`https://temu3code.com/memes/#${it.id}`);
    document.getElementById("lbShareX").href = `https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    document.getElementById("lbReceiptLink").href = `../mail/?thread=${encodeURIComponent(it.thread)}`;
    try { history.replaceState(null, "", `#${it.id}`); } catch (_) {}
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

  async function applyLanguage(nextCode) {
    lang = I18N.normalizeLang(nextCode) || "en";
    I18N.applyDirection(lang);
    bundle = await I18N.loadBundle(lang, "../data/");
    if (!bundle) return;

    const pt = t("memes.pageTitle");
    if (pt) document.title = pt;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    const searchEl = document.getElementById("memeSearch");
    if (searchEl) searchEl.placeholder = t("memes.searchPlaceholder", searchEl.placeholder);

    renderGrid();
    if (lbIndex >= 0) updateLightbox();
  }

  async function init() {
    I18N.mountLangSelect(document.getElementById("langSelect"), lang, applyLanguage);
    try {
      const res = await fetch("../data/memes.json");
      const data = await res.json();
      allItems = Array.isArray(data.items) ? data.items : [];
    } catch (_) {
      allItems = [];
    }

    const reqSeries = new URLSearchParams(window.location.search).get("series");
    if (reqSeries && ["all", "sins", "blended", "classic", "comics"].includes(reqSeries)) {
      activeSeries = reqSeries;
      document.querySelectorAll("[data-series]").forEach((b) =>
        b.classList.toggle("is-active", b.getAttribute("data-series") === activeSeries)
      );
    }

    await applyLanguage(lang);

    const hashId = (window.location.hash || "").replace(/^#/, "");
    if (hashId) {
      const found = visibleItems.findIndex((i) => i.id === hashId);
      if (found >= 0) openLightbox(found);
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
    if (visibleItems.length) openLightbox(Math.floor(Math.random() * visibleItems.length));
  });

  const gridEl = document.getElementById("memeGrid");
  gridEl.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-lb]");
    if (openBtn) { openLightbox(Number(openBtn.getAttribute("data-open-lb"))); return; }
    const copyBtn = e.target.closest("[data-copy-idx]");
    if (copyBtn) { const it = visibleItems[Number(copyBtn.getAttribute("data-copy-idx"))]; if (it) copyImageAsPng(it.url); return; }
    const dlBtn = e.target.closest("[data-dl-idx]");
    if (dlBtn) { const it = visibleItems[Number(dlBtn.getAttribute("data-dl-idx"))]; if (it) downloadImage(it.url, `${it.id}.webp`); }
  });

  gridEl.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".meme-card.is-sin");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
    card.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
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
    const it = visibleItems[lbIndex]; if (it) copyImageAsPng(it.url);
  });
  document.getElementById("lbDownloadBtn").addEventListener("click", () => {
    const it = visibleItems[lbIndex]; if (it) downloadImage(it.url, `${it.id}.webp`);
  });

  document.addEventListener("keydown", (e) => {
    if (lbIndex < 0) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") { lbIndex = (lbIndex - 1 + visibleItems.length) % visibleItems.length; updateLightbox(); }
    else if (e.key === "ArrowRight") { lbIndex = (lbIndex + 1) % visibleItems.length; updateLightbox(); }
  });

  init();
})();
