(() => {
  "use strict";

  const LANGUAGES = [
    { code: "en", flag: "🇺🇸", name: "English", dir: "ltr" },
    { code: "zh-CN", flag: "🇨🇳", name: "简体中文", dir: "ltr" },
    { code: "zh-TW", flag: "🇹🇼", name: "繁體中文", dir: "ltr" },
    { code: "ja", flag: "🇯🇵", name: "日本語", dir: "ltr" },
    { code: "ko", flag: "🇰🇷", name: "한국어", dir: "ltr" },
    { code: "fr", flag: "🇫🇷", name: "Français", dir: "ltr" },
    { code: "es", flag: "🇪🇸", name: "Español", dir: "ltr" },
    { code: "de", flag: "🇩🇪", name: "Deutsch", dir: "ltr" },
    { code: "pt-BR", flag: "🇧🇷", name: "Português", dir: "ltr" },
    { code: "ru", flag: "🇷🇺", name: "Русский", dir: "ltr" },
    { code: "ar", flag: "🇸🇦", name: "العربية", dir: "rtl" },
    { code: "it", flag: "🇮🇹", name: "Italiano", dir: "ltr" },
    { code: "nl", flag: "🇳🇱", name: "Nederlands", dir: "ltr" },
    { code: "pl", flag: "🇵🇱", name: "Polski", dir: "ltr" },
    { code: "tr", flag: "🇹🇷", name: "Türkçe", dir: "ltr" },
    { code: "vi", flag: "🇻🇳", name: "Tiếng Việt", dir: "ltr" },
    { code: "id", flag: "🇮🇩", name: "Bahasa Indonesia", dir: "ltr" },
    { code: "hi", flag: "🇮🇳", name: "हिन्दी", dir: "ltr" }
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
    // 1. Explicit ?lang= query param applies only to the current view (never poisons localStorage).
    try {
      const p = new URLSearchParams(window.location.search).get("lang");
      const fromParam = normalizeLang(p);
      if (fromParam) return fromParam;
    } catch (_) {}
    // 2. Explicit user selection saved from the language dropdown.
    try {
      const saved = normalizeLang(localStorage.getItem("temu3-lang"));
      if (saved) return saved;
    } catch (_) {}
    // 3. Browser preferred language list; falls back strictly to English ("en").
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
      const res = await fetch(`${base}i18n/${norm}.json?v=2`);
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
      (l) => `<option value="${l.code}" lang="${l.code}">${l.flag} ${l.name}</option>`
    ).join("");
    selectEl.title = "Language";
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
