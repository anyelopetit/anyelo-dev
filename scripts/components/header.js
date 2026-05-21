import { qs } from "../utils/dom.js";

export function initHeader() {
  const shell = qs('[data-component="header"]');
  if (!shell) return;

  const card = qs('[data-header="shell"]', shell);
  if (!card) return;

  const onScroll = () => {
    const y = window.scrollY || 0;
    const compact = y > 24;
    card.classList.toggle("shadow-medium", compact);
    card.classList.toggle("bg-surface/80", compact);
    card.classList.toggle("bg-surface/60", !compact);
  };

  // Initial state.
  card.classList.add("bg-surface/60");
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
