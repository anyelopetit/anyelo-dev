import { on, qs, qsa } from "../utils/dom.js";

const STORAGE_KEY = "anyelo:blog:reading";

const DEFAULTS = {
  theme: "dark",
  font: "atkinson",
  size: "md",
  width: "comfortable"
};

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function readPrefs() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const data = raw ? safeParse(raw) : null;
  return {
    theme: data?.theme || DEFAULTS.theme,
    font: data?.font || DEFAULTS.font,
    size: data?.size || DEFAULTS.size,
    width: data?.width || DEFAULTS.width
  };
}

function writePrefs(prefs) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

function applyPrefs(prefs) {
  document.body.dataset.readingTheme = prefs.theme;
  document.body.dataset.readingFont = prefs.font;
  document.body.dataset.readingSize = prefs.size;
  document.body.dataset.readingWidth = prefs.width;
}

function setRadio(group, value) {
  const input = qs(`input[name="${group}"][value="${value}"]`);
  if (input) input.checked = true;
}

export function initBlogReadingPreferences() {
  if (document.body.getAttribute("data-reading-enabled") !== "true") return;

  const btn = qs("[data-reading-button]");
  const panel = qs("[data-reading-panel]");
  if (!btn || !panel) return;

  const closeBtn = qs("[data-reading-close]", panel);

  const prefs = readPrefs();
  applyPrefs(prefs);
  setRadio("reading-theme", prefs.theme);
  setRadio("reading-font", prefs.font);
  setRadio("reading-size", prefs.size);
  setRadio("reading-width", prefs.width);

  function open() {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    const first = panel.querySelector("input,button,select,textarea,a[href]");
    first?.focus?.();
  }

  function close() {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.focus();
  }

  if (closeBtn) on(closeBtn, "click", close);

  on(btn, "click", () => {
    if (panel.hidden) open();
    else close();
  });

  // Close on escape.
  on(window, "keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) close();
  });

  // Close when clicking outside.
  on(document, "click", (e) => {
    if (panel.hidden) return;
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest("[data-reading-panel]") || t.closest("[data-reading-button]")) return;
    close();
  });

  // Apply changes.
  qsa("input[type=radio]", panel).forEach((input) => {
    on(input, "change", () => {
      const next = readPrefs();
      const name = input.getAttribute("name") || "";
      const value = input.getAttribute("value") || "";
      if (name === "reading-theme") next.theme = value;
      if (name === "reading-font") next.font = value;
      if (name === "reading-size") next.size = value;
      if (name === "reading-width") next.width = value;
      writePrefs(next);
      applyPrefs(next);
    });
  });
}
