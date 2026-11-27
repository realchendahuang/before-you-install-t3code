(() => {
  "use strict";

  const I18N = window.Temu3I18n;
  let lang = I18N.detectInitialLang();
  let bundle = null;
  let episodes = [];
  let podcasts = { en: null, zh: null };
  let stickerZipUrl = "https://cdn.temu3code.com/stickers/theo-rage-stickers-pack.zip";
  let lbIndex = -1;
  let observer = null;

  function isZhLang(code) {
    return code === "zh-CN" || code === "zh-TW";
  }

  function mediaLang() {
    return isZhLang(lang) ? "zh" : "en";
  }

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
      showToast(t("memes.copiedToast", "Copied PNG."));
    } catch (_) {
      window.open(url, "_blank", "noopener,noreferrer");
      showToast(t("memes.copyFallbackToast", "Opened image in a new tab."));
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
      showToast(t("memes.downloadedToast", "Saved."));
    } catch (_) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  function getEpAsset(ep) {
    const wantZh = mediaLang() === "zh";
    const pick = wantZh ? (ep.zh || ep.en) : (ep.en || ep.zh);
    const actualLang = (wantZh && ep.zh) ? "zh" : (ep.en ? "en" : "zh");
    return { asset: pick, actualLang };
  }

  function getEpTitle(ep) {
    const fallback = isZhLang(lang) ? (ep.titleZh || ep.titleEn) : (ep.titleEn || ep.titleZh);
    return t(`story.episodes.${ep.id}`, fallback);
  }

  function getEpPillLabel(ep) {
    return I18N.fmt(t("story.epPill", "Ep.{n}"), { n: ep.num });
  }

  function renderPodcast() {
    const card = document.getElementById("podcastCard");
    const audio = document.getElementById("podcastAudio");
    const meta = document.getElementById("podMeta");
    const dl = document.getElementById("podDownloadBtn");
    if (!card || !audio) return;

    const want = mediaLang();
    const track = (want === "zh" ? podcasts.zh : podcasts.en) || podcasts.en || podcasts.zh;
    const actual = track === podcasts.zh ? "zh" : "en";
    if (!track || !track.url) {
      card.hidden = true;
      return;
    }

    card.hidden = false;

    if (audio.getAttribute("data-src") !== track.url) {
      audio.pause();
      audio.src = track.url;
      audio.setAttribute("data-src", track.url);
      audio.load();
    }

    if (meta) {
      const sizeMb = track.bytes ? `${(track.bytes / (1024 * 1024)).toFixed(1)} MB` : "";
      meta.textContent = [track.durationText || "", sizeMb].filter(Boolean).join(" · ");
    }

    if (dl) {
      dl.href = track.url;
      dl.setAttribute("download", actual === "zh" ? "temu3code-96h-zh.mp3" : "temu3code-96h-en.mp3");
    }
  }

  function renderPills() {
    const nav = document.getElementById("epJumpPills");
    if (!nav) return;
    nav.innerHTML = episodes
      .map((ep, idx) => {
        const label = getEpPillLabel(ep);
        return `<a class="ep-pill${idx === 0 ? " is-active" : ""}" href="#${escapeHtml(ep.id)}" data-ep-pill="${escapeHtml(ep.id)}">${escapeHtml(label)}</a>`;
      })
      .join("");
  }

  function setupScrollSpy() {
    if (observer) observer.disconnect();
    if (typeof IntersectionObserver === "undefined") return;
    const cards = document.querySelectorAll(".ep-card[id]");
    if (!cards.length) return;
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const activeId = visible[0].target.id;
        document.querySelectorAll("[data-ep-pill]").forEach((pill) => {
          pill.classList.toggle("is-active", pill.getAttribute("data-ep-pill") === activeId);
        });
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] }
    );
    cards.forEach((c) => observer.observe(c));
  }

  function renderEpisodes() {
    renderPills();
    const host = document.getElementById("storyReader");
    if (!host) return;
    if (!episodes.length) {
      host.innerHTML = `<div class="story-cta-box"><p class="pod-meta">${escapeHtml(t("story.loadingEmpty", "Loading..."))}</p></div>`;
      return;
    }

    const zoomTxt = t("story.zoomBtn", "Zoom");
    const copyTxt = t("memes.copyBtn", "Copy PNG");
    const dlTxt = t("memes.downloadBtn", "Save");
    const shareTxt = t("memes.shareX", "Share on X ↗");
    const receiptTxt = t("story.receiptBtn", "Receipt");

    host.innerHTML = episodes
      .map((ep, idx) => {
        const { asset } = getEpAsset(ep);
        if (!asset || !asset.url) return "";
        const title = getEpTitle(ep);
        const epNum = String(ep.num).padStart(2, "0");
        const shareMsg = encodeURIComponent(`${title} · temu3code.com/story/#${ep.id}`);
        const shareUrl = encodeURIComponent(`https://temu3code.com/story/#${ep.id}`);
        const srcHref = ep.sourceUrl || `../mail/?thread=${encodeURIComponent(ep.thread)}`;
        const srcAttrs = ep.sourceUrl ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<article id="${escapeHtml(ep.id)}" class="ep-card">
          <div class="ep-head">
            <span class="ep-num">${escapeHtml(epNum)}</span>
            <h2 class="ep-title">${escapeHtml(title)}</h2>
          </div>
          <button type="button" class="ep-media-btn" data-open-lb="${idx}" aria-label="${escapeHtml(title)}">
            <div class="ep-img-frame">
              <img src="${escapeHtml(asset.url)}" alt="${escapeHtml(title)}" width="${asset.width || 1024}" height="${asset.height || 1536}" loading="${idx === 0 ? "eager" : "lazy"}" crossorigin="anonymous" />
            </div>
          </button>
          <div class="ep-foot">
            <div class="ep-actions">
              <button type="button" class="act-btn" data-open-lb="${idx}">${escapeHtml(zoomTxt)}</button>
              <button type="button" class="act-btn act-primary" data-copy-idx="${idx}">${escapeHtml(copyTxt)}</button>
              <button type="button" class="act-btn" data-dl-idx="${idx}">${escapeHtml(dlTxt)}</button>
              <a class="act-btn" href="https://x.com/intent/tweet?text=${shareMsg}&url=${shareUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(shareTxt)}</a>
              <a class="act-btn act-cobalt" href="${escapeHtml(srcHref)}"${srcAttrs}>${escapeHtml(receiptTxt)} #${escapeHtml(ep.exhibit)} →</a>
            </div>
          </div>
        </article>`;
      })
      .join("");

    setupScrollSpy();
  }

  function updateLightbox() {
    if (lbIndex < 0 || lbIndex >= episodes.length) return;
    const ep = episodes[lbIndex];
    const { asset } = getEpAsset(ep);
    if (!asset) return;
    const title = `${getEpPillLabel(ep)} · ${getEpTitle(ep)}`;

    document.getElementById("lbCounter").textContent = `${lbIndex + 1} / ${episodes.length}`;
    document.getElementById("lbTitle").textContent = title;
    const img = document.getElementById("lbImg");
    img.src = asset.url;
    img.alt = title;

    const shareMsg = encodeURIComponent(`${title} · temu3code.com/story/#${ep.id}`);
    const shareUrl = encodeURIComponent(`https://temu3code.com/story/#${ep.id}`);
    document.getElementById("lbShareX").href = `https://x.com/intent/tweet?text=${shareMsg}&url=${shareUrl}`;
    const receiptLink = document.getElementById("lbReceiptLink");
    if (ep.sourceUrl) {
      receiptLink.href = ep.sourceUrl;
      receiptLink.setAttribute("target", "_blank");
      receiptLink.setAttribute("rel", "noopener noreferrer");
      receiptLink.textContent = t("common.openX", "Original post ↗");
    } else {
      receiptLink.href = `../mail/?thread=${encodeURIComponent(ep.thread)}`;
      receiptLink.removeAttribute("target");
      receiptLink.removeAttribute("rel");
      receiptLink.textContent = t("memes.verifyReceipt", "Source →");
    }
  }

  function openLightbox(idx) {
    const lb = document.getElementById("storyLightbox");
    if (!lb || idx < 0 || idx >= episodes.length) return;
    lbIndex = idx;
    updateLightbox();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const lb = document.getElementById("storyLightbox");
    if (!lb) return;
    lb.hidden = true;
    lbIndex = -1;
    document.body.style.overflow = "";
  }

  function stepLightbox(delta) {
    if (lbIndex < 0 || !episodes.length) return;
    lbIndex = (lbIndex + delta + episodes.length) % episodes.length;
    updateLightbox();
  }

  async function applyLanguage(nextCode) {
    lang = I18N.normalizeLang(nextCode) || "en";
    I18N.applyDirection(lang);
    bundle = await I18N.loadBundle(lang, "../data/");
    if (!bundle) return;

    const pt = t("story.pageTitle");
    if (pt) document.title = pt;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });

    renderPodcast();
    renderEpisodes();
    if (lbIndex >= 0) updateLightbox();
  }

  async function init() {
    I18N.mountLangSelect(document.getElementById("langSelect"), lang, applyLanguage);

    try {
      const res = await fetch("../data/memes.json?v=3");
      if (res.ok) {
        const data = await res.json();
        episodes = Array.isArray(data.storyEpisodes) ? data.storyEpisodes : [];
        if (data.podcasts && typeof data.podcasts === "object") {
          podcasts = { en: data.podcasts.en || null, zh: data.podcasts.zh || null };
        }
        if (data.stickerZipUrl) {
          stickerZipUrl = data.stickerZipUrl;
          const zipBtn = document.getElementById("storyZipBtn");
          if (zipBtn) zipBtn.href = stickerZipUrl;
        }
      }
    } catch (_) {}

    await applyLanguage(lang);

    const hashId = (window.location.hash || "").replace(/^#/, "");
    if (hashId) {
      const target = document.getElementById(hashId);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }

  document.getElementById("storyReader").addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-lb]");
    if (openBtn) { openLightbox(Number(openBtn.getAttribute("data-open-lb"))); return; }
    const copyBtn = e.target.closest("[data-copy-idx]");
    if (copyBtn) {
      const ep = episodes[Number(copyBtn.getAttribute("data-copy-idx"))];
      if (ep) { const { asset } = getEpAsset(ep); if (asset) copyImageAsPng(asset.url); }
      return;
    }
    const dlBtn = e.target.closest("[data-dl-idx]");
    if (dlBtn) {
      const ep = episodes[Number(dlBtn.getAttribute("data-dl-idx"))];
      if (ep) {
        const { asset, actualLang } = getEpAsset(ep);
        if (asset) downloadImage(asset.url, `temu3-${ep.id}-${actualLang}.webp`);
      }
    }
  });

  document.querySelectorAll("[data-lb-close]").forEach((el) => el.addEventListener("click", closeLightbox));
  document.getElementById("lbPrev").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lbNext").addEventListener("click", () => stepLightbox(1));
  document.getElementById("lbPrevMobile").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lbNextMobile").addEventListener("click", () => stepLightbox(1));

  document.getElementById("lbCopyBtn").addEventListener("click", () => {
    const ep = episodes[lbIndex];
    if (ep) { const { asset } = getEpAsset(ep); if (asset) copyImageAsPng(asset.url); }
  });
  document.getElementById("lbDownloadBtn").addEventListener("click", () => {
    const ep = episodes[lbIndex];
    if (ep) {
      const { asset, actualLang } = getEpAsset(ep);
      if (asset) downloadImage(asset.url, `temu3-${ep.id}-${actualLang}.webp`);
    }
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
  });

  init();
})();
