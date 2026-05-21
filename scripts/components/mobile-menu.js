import { qs, on } from "../utils/dom.js";

export function initMobileMenu() {
  const menu = qs('[data-component="mobile-menu"]');
  const openBtn = qs('[data-component="mobile-menu-button"]');
  if (!menu || !openBtn) return;

  const closeBtn = qs('[data-mobile-menu="close"]', menu);
  const backdrop = qs('[data-mobile-menu="backdrop"]', menu);

  function setExpanded(expanded) {
    openBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
  }

  function open() {
    menu.hidden = false;
    menu.classList.remove("pointer-events-none", "opacity-0");
    menu.classList.add("pointer-events-auto", "opacity-100");
    setExpanded(true);
    // Lock scroll.
    document.documentElement.style.overflow = "hidden";
  }

  function close() {
    menu.classList.add("opacity-0");
    menu.classList.remove("opacity-100");
    setExpanded(false);
    document.documentElement.style.overflow = "";
    // Wait for opacity to settle.
    window.setTimeout(() => {
      menu.hidden = true;
      menu.classList.add("pointer-events-none");
      menu.classList.remove("pointer-events-auto");
    }, 180);
  }

  on(openBtn, "click", open);
  if (closeBtn) on(closeBtn, "click", close);
  if (backdrop) on(backdrop, "click", close);
  on(window, "keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) close();
  });

  // Close when clicking an in-menu anchor.
  menu.addEventListener(
    "click",
    (e) => {
      const a = e.target?.closest?.("a");
      if (a) close();
    },
    { passive: true }
  );
}
