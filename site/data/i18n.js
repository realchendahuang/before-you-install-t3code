(() => {
  "use strict";

  const LANGUAGES = [
    { code: "en", name: "English", dir: "ltr" },
    { code: "zh-CN", name: "简体中文", dir: "ltr" },
    { code: "zh-TW", name: "繁體中文", dir: "ltr" },
    { code: "fr", name: "Français", dir: "ltr" },
    { code: "es", name: "Español", dir: "ltr" },
    { code: "ru", name: "Русский", dir: "ltr" },
    { code: "ar", name: "العربية", dir: "rtl" },
    { code: "ja", name: "日本語", dir: "ltr" },
    { code: "ko", name: "한국어", dir: "ltr" },
    { code: "de", name: "Deutsch", dir: "ltr" },
    { code: "pt-BR", name: "Português", dir: "ltr" },
    { code: "it", name: "Italiano", dir: "ltr" },
    { code: "nl", name: "Nederlands", dir: "ltr" },
    { code: "pl", name: "Polski", dir: "ltr" },
    { code: "tr", name: "Türkçe", dir: "ltr" },
    { code: "vi", name: "Tiếng Việt", dir: "ltr" },
    { code: "id", name: "Bahasa Indonesia", dir: "ltr" },
    { code: "hi", name: "हिन्दी", dir: "ltr" }
  ];

  const VALID_CODES = new Set(LANGUAGES.map((l) => l.code));
  const cache = new Map();

  function normalizeLang(raw) {
    if (!raw) return null;
    const s = String(raw).trim();
    if (VALID_CODES.has(s)) return s;
    const low = s.toLowerCase();
    if (low === "zh" || low.startsWith("zh-cn") || low.startsWith("zh-sg") || low.startsWith("zh-hans")) return "zh-CN";
    if (low.startsWith("zh-tw") || low.startsWith("zh-hk") || low.startsWith("zh-mo") || low.startsWith("zh-hant")) return "zh-TW";
    if (low.startsWith("pt")) return "pt-BR";
    const base = low.split("-")[0];
    for (const l of LANGUAGES) {
      if (l.code.toLowerCase() === base) return l.code;
    }
    return null;
  }

  function detectInitialLang() {
    try {
      const p = new URLSearchParams(window.location.search).get("lang");
      const fromParam = normalizeLang(p);
      if (fromParam) {
        try { localStorage.setItem("temu3-lang", fromParam); } catch (_) {}
        return fromParam;
      }
    } catch (_) {}
    try {
      const saved = normalizeLang(localStorage.getItem("temu3-lang"));
      if (saved) return saved;
    } catch (_) {}
    try {
      const navList = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
      for (const n of navList) {
        const hit = normalizeLang(n);
        if (hit) return hit;
      }
    } catch (_) {}
    return "en";
  }

  async function loadBundle(code, dataBase) {
    const norm = normalizeLang(code) || "en";
    if (cache.has(norm)) return cache.get(norm);
    const base = dataBase.endsWith("/") ? dataBase : dataBase + "/";
    try {
      const res = await fetch(`${base}i18n/${norm}.json?v=1`);
      if (!res.ok) throw new Error("fetch failed");
      const obj = await res.json();
      cache.set(norm, obj);
      return obj;
    } catch (_) {
      if (norm !== "en") return loadBundle("en", base);
      return null;
    }
  }

  function getKey(bundle, path) {
    if (!bundle || !path) return "";
    const parts = path.split(".");
    let cur = bundle;
    for (const part of parts) {
      if (cur && Object.prototype.hasOwnProperty.call(cur, part)) {
        cur = cur[part];
      } else {
        return "";
      }
    }
    return typeof cur === "string" ? cur : "";
  }

  function mountLangSelect(selectEl, initialCode, onChange) {
    if (!selectEl) return;
    selectEl.innerHTML = LANGUAGES.map(
      (l) => `<option value="${l.code}">${l.name}</option>`
    ).join("");
    selectEl.value = normalizeLang(initialCode) || "en";
    selectEl.addEventListener("change", () => {
      const next = normalizeLang(selectEl.value) || "en";
      try { localStorage.setItem("temu3-lang", next); } catch (_) {}
      try {
        const u = new URL(window.location.href);
        if (u.searchParams.has("lang")) {
          u.searchParams.set("lang", next);
          history.replaceState(null, "", u.pathname + u.search + u.hash);
        }
      } catch (_) {}
      onChange(next);
    });
  }

  function applyDirection(code) {
    const meta = LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
  }

  window.Temu3I18n = {
    LANGUAGES,
    normalizeLang,
    detectInitialLang,
    loadBundle,
    getKey,
    mountLangSelect,
    applyDirection
  };
})();
