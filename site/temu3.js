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

  const I18N = window.Temu3I18n;
  let lang = I18N.detectInitialLang();
  let bundle = null;
  let activeFilter = "all";
  let visibleReceipts = X_RECEIPTS.slice();
  let memeCatalog = [];
  let lbMode = "receipts";
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

  function renderXReceipts() {
    const grid = document.getElementById("xReceiptsGrid");
    if (!grid) return;
    visibleReceipts =
      activeFilter === "all"
        ? X_RECEIPTS.slice()
        : X_RECEIPTS.filter((r) => r.tags.includes(activeFilter));

    const openX = t("common.openX", "X ↗");
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

  function updateLightbox() {
    const lb = document.getElementById("receiptLightbox");
    if (!lb || lbIndex < 0 || lbIndex >= lbItems.length) return;
    const img = document.getElementById("lbImg");
    const xLink = document.getElementById("lbXLink");
    const mailLink = document.getElementById("lbMailLink");
    const rawLink = document.getElementById("lbRawLink");

    if (lbMode === "memes") {
      const m = lbItems[lbIndex];
      const title = isZh() ? m.titleZh : m.titleEn;
      document.getElementById("lbTitle").textContent = title;
      img.src = m.url;
      img.alt = title;
      xLink.href = `./memes/#${encodeURIComponent(m.id)}`;
      xLink.removeAttribute("target");
      xLink.textContent = t("home.mmOpenArsenal", "Open in /memes/ ↗");
      mailLink.href = `./mail/?thread=${encodeURIComponent(m.thread)}`;
      mailLink.textContent = t("common.openMail", "Tmail →");
      rawLink.href = m.url;
      rawLink.textContent = t("common.rawImage", "Raw ↗");
      return;
    }

    const r = lbItems[lbIndex];
    const title = t(`home.xrTitles.${r.id}`, r.id);
    document.getElementById("lbTitle").textContent = title;
    img.src = r.src;
    img.alt = title;
    xLink.href = r.url;
    xLink.setAttribute("target", "_blank");
    xLink.textContent = t("common.openX", "X ↗");
    mailLink.href = `./mail/?thread=${encodeURIComponent(r.thread)}`;
    mailLink.textContent = t("common.openMail", "Tmail →");
    rawLink.href = r.src;
    rawLink.textContent = t("common.rawImage", "Raw ↗");
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

  function closeLightbox() {
    const lb = document.getElementById("receiptLightbox");
    if (!lb) return;
    lb.hidden = true;
    lbIndex = -1;
    document.body.style.overflow = "";
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

    renderXReceipts();
    renderMemeShowcase();
    if (lbIndex >= 0) updateLightbox();
  }

  async function init() {
    I18N.mountLangSelect(document.getElementById("langSelect"), lang, applyLanguage);
    await applyLanguage(lang);
    try {
      const res = await fetch("./data/memes.json");
      if (res.ok) {
        const data = await res.json();
        memeCatalog = Array.isArray(data.items) ? data.items : [];
        renderMemeShowcase();
      }
    } catch (_) {}
  }

  document.querySelectorAll("[data-xr-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-xr-filter") || "all";
      document.querySelectorAll("[data-xr-filter]").forEach((b) => b.classList.toggle("is-active", b === btn));
      renderXReceipts();
    });
  });

  document.getElementById("xReceiptsGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lb-idx]");
    if (btn) openLightbox(Number(btn.getAttribute("data-lb-idx")), "receipts", visibleReceipts);
  });

  document.getElementById("homeSinsRail").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-sin-idx]");
    if (!btn) return;
    openLightbox(Number(btn.getAttribute("data-sin-idx")), "memes", memeCatalog.filter((m) => m.series === "sins"));
  });

  document.getElementById("homeViralGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-viral-idx]");
    if (!btn) return;
    openLightbox(
      Number(btn.getAttribute("data-viral-idx")),
      "memes",
      memeCatalog.filter((m) => m.series === "blended" && m.featured).slice(0, 6)
    );
  });

  document.getElementById("homeDrawSinBtn").addEventListener("click", () => {
    const sins = memeCatalog.filter((m) => m.series === "sins");
    if (!sins.length) { window.location.href = "./memes/?series=sins"; return; }
    openLightbox(Math.floor(Math.random() * sins.length), "memes", sins);
  });

  document.querySelectorAll("[data-lb-close]").forEach((el) => el.addEventListener("click", closeLightbox));
  document.getElementById("lbPrev").addEventListener("click", () => {
    if (lbIndex < 0 || !lbItems.length) return;
    lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length;
    updateLightbox();
  });
  document.getElementById("lbNext").addEventListener("click", () => {
    if (lbIndex < 0 || !lbItems.length) return;
    lbIndex = (lbIndex + 1) % lbItems.length;
    updateLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lbIndex < 0 || !lbItems.length) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; updateLightbox(); }
    else if (e.key === "ArrowRight") { lbIndex = (lbIndex + 1) % lbItems.length; updateLightbox(); }
  });

  init();
})();
