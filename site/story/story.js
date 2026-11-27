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
  let episodes = [];
  let podcasts = {};
  let storySubtitles = {};
  let stickerZipUrl = "https://cdn.temu3code.com/stickers/theo-rage-stickers-pack.zip";
  let lbIndex = -1;
  let observer = null;

  function isZhLang(code) {
    return code === "zh-CN" || code === "zh-TW";
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
    const media = (ep && ep.media && typeof ep.media === "object") ? ep.media : {};
    const enAsset = media.en || ep.en || null;
    const zhCnAsset = media["zh-CN"] || ep.zh || null;

    if (lang === "zh-CN") {
      if (zhCnAsset && zhCnAsset.url) {
        return { asset: zhCnAsset, actualLang: "zh-CN", isNativeComic: true };
      }
      return { asset: enAsset, actualLang: "en", isNativeComic: false };
    }

    if (lang === "zh-TW") {
      const zhTwAsset = media["zh-TW"] || null;
      if (zhTwAsset && zhTwAsset.url) {
        return { asset: zhTwAsset, actualLang: "zh-TW", isNativeComic: true };
      }
      if (zhCnAsset && zhCnAsset.url) {
        return { asset: zhCnAsset, actualLang: "zh-CN", isNativeComic: false };
      }
      return { asset: enAsset, actualLang: "en", isNativeComic: false };
    }

    const exactAsset = media[lang] || (lang === "en" ? ep.en : null);
    if (exactAsset && exactAsset.url) {
      return { asset: exactAsset, actualLang: lang, isNativeComic: true };
    }

    if (enAsset && enAsset.url) {
      return { asset: enAsset, actualLang: "en", isNativeComic: false };
    }
    return { asset: zhCnAsset, actualLang: "zh-CN", isNativeComic: false };
  }

  function getPodcastTrack() {
    const p = podcasts || {};
    const enTrack = p.en || null;
    const zhCnTrack = p["zh-CN"] || p.zh || null;

    if (lang === "zh-CN") {
      if (zhCnTrack && zhCnTrack.url) return { track: zhCnTrack, actualLang: "zh-CN" };
    } else if (lang === "zh-TW") {
      if (p["zh-TW"] && p["zh-TW"].url) return { track: p["zh-TW"], actualLang: "zh-TW" };
      if (zhCnTrack && zhCnTrack.url) return { track: zhCnTrack, actualLang: "zh-CN" };
    } else if (p[lang] && p[lang].url) {
      return { track: p[lang], actualLang: lang };
    }

    if (enTrack && enTrack.url) return { track: enTrack, actualLang: "en" };
    if (zhCnTrack && zhCnTrack.url) return { track: zhCnTrack, actualLang: "zh-CN" };
    return { track: null, actualLang: "en" };
  }

  function getEpSubtitles(ep) {
    const byLang = storySubtitles && storySubtitles[lang];
    if (byLang && Array.isArray(byLang[ep.id]) && byLang[ep.id].length) {
      return byLang[ep.id];
    }
    const enFallback = storySubtitles && storySubtitles.en;
    if (enFallback && Array.isArray(enFallback[ep.id]) && enFallback[ep.id].length) {
      return enFallback[ep.id];
    }
    return null;
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

    const { track, actualLang } = getPodcastTrack();
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
      dl.setAttribute("download", `temu3code-96h-${actualLang}.mp3`);
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

  function renderSubtitlesBlock(ep, idx, panels, isOpenByDefault) {
    if (!panels || !panels.length) return "";
    const cells = panels
      .map((panel, pIdx) => {
        const pNum = String(panel.p || (pIdx + 1)).padStart(2, "0");
        const tagHtml = panel.tag ? `<span class="ep-sub-tag">${escapeHtml(panel.tag)}</span>` : "";
        const linesHtml = (Array.isArray(panel.lines) ? panel.lines : [])
          .filter((ln) => ln !== null && ln !== undefined && String(ln).trim() !== "")
          .map((ln) => `<p class="ep-sub-line">${escapeHtml(ln)}</p>`)
          .join("");
        return `<div class="ep-sub-panel">
          <div class="ep-sub-head">
            <span class="ep-sub-num">${escapeHtml(pNum)}</span>
            ${tagHtml}
          </div>
          <div class="ep-sub-lines">${linesHtml}</div>
        </div>`;
      })
      .join("");

    return `<div id="subs-${escapeHtml(ep.id)}" class="ep-subs" data-ep-subs="${idx}"${isOpenByDefault ? "" : " hidden"}>
      ${cells}
    </div>`;
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
        const { asset, isNativeComic } = getEpAsset(ep);
        if (!asset || !asset.url) return "";
        const title = getEpTitle(ep);
        const epNum = String(ep.num).padStart(2, "0");
        const shareMsg = encodeURIComponent(`${title} · temu3code.com/story/#${ep.id}`);
        const shareUrl = encodeURIComponent(`https://temu3code.com/story/#${ep.id}`);
        const srcHref = ep.sourceUrl || `../mail/?thread=${encodeURIComponent(ep.thread)}`;
        const srcAttrs = ep.sourceUrl ? ' target="_blank" rel="noopener noreferrer"' : "";

        const panels = getEpSubtitles(ep);
        const subsOpen = !isNativeComic && Boolean(panels);
        const subsHtml = renderSubtitlesBlock(ep, idx, panels, subsOpen);
        const ccBtnHtml = panels
          ? `<button type="button" class="act-btn act-cc${subsOpen ? " is-active" : ""}" data-toggle-subs="${idx}" aria-controls="subs-${escapeHtml(ep.id)}" aria-expanded="${subsOpen ? "true" : "false"}" aria-label="CC">CC</button>`
          : "";

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
          ${subsHtml}
          <div class="ep-foot">
            <div class="ep-actions">
              <button type="button" class="act-btn" data-open-lb="${idx}">${escapeHtml(zoomTxt)}</button>
              <button type="button" class="act-btn act-primary" data-copy-idx="${idx}">${escapeHtml(copyTxt)}</button>
              <button type="button" class="act-btn" data-dl-idx="${idx}">${escapeHtml(dlTxt)}</button>
              <a class="act-btn" href="https://x.com/intent/tweet?text=${shareMsg}&url=${shareUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(shareTxt)}</a>
              ${ccBtnHtml}
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

  function setMetaAttr(selector, val) {
    const el = document.querySelector(selector);
    if (el && val) el.setAttribute("content", val);
  }

  async function applyLanguage(nextCode, deferRender = false) {
    lang = I18N.normalizeLang(nextCode) || "en";
    I18N.applyDirection(lang);
    bundle = await I18N.loadBundle(lang, "../data/");
    if (!bundle) return;

    if (lang === "en") {
      document.title = INITIAL_SEO.title;
      setMetaAttr('meta[name="description"]', INITIAL_SEO.desc);
      setMetaAttr('meta[property="og:title"]', INITIAL_SEO.ogTitle);
      setMetaAttr('meta[property="og:description"]', INITIAL_SEO.ogDesc);
    } else {
      const pt = t("story.pageTitle");
      const pd = t("home.storySub");
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
      if (v) el.textContent = v;
    });

    if (!deferRender) {
      renderPodcast();
      renderEpisodes();
      if (lbIndex >= 0) updateLightbox();
    }
  }

  async function init() {
    I18N.mountLangSelect(document.getElementById("langSelect"), lang, applyLanguage);

    const [memesRes, subsRes] = await Promise.all([
      fetch("../data/memes.json?v=4").catch(() => null),
      fetch("../data/story-subtitles.json?v=1").catch(() => null),
      applyLanguage(lang, true)
    ]);

    if (memesRes && memesRes.ok) {
      try {
        const data = await memesRes.json();
        episodes = Array.isArray(data.storyEpisodes) ? data.storyEpisodes : [];
        if (data.podcasts && typeof data.podcasts === "object") {
          podcasts = { ...data.podcasts };
        }
        if (data.stickerZipUrl) {
          stickerZipUrl = data.stickerZipUrl;
          const zipBtn = document.getElementById("storyZipBtn");
          if (zipBtn) zipBtn.href = stickerZipUrl;
        }
      } catch (_) {}
    }

    if (subsRes && subsRes.ok) {
      try {
        const subsData = await subsRes.json();
        if (subsData && typeof subsData === "object") {
          storySubtitles = subsData;
        }
      } catch (_) {}
    }

    renderPodcast();
    renderEpisodes();

    const hashId = (window.location.hash || "").replace(/^#/, "");
    if (hashId) {
      const target = document.getElementById(hashId);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }

  document.getElementById("storyReader").addEventListener("click", (e) => {
    const ccBtn = e.target.closest("[data-toggle-subs]");
    if (ccBtn) {
      const idx = ccBtn.getAttribute("data-toggle-subs");
      const box = document.querySelector(`[data-ep-subs="${idx}"]`);
      if (box) {
        const willOpen = box.hidden;
        box.hidden = !willOpen;
        ccBtn.classList.toggle("is-active", willOpen);
        ccBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      }
      return;
    }
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
