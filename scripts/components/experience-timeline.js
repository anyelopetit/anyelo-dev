import { on, qs } from "../utils/dom.js";

function setExpanded(openBtn, closeBtn, expanded) {
  if (openBtn) openBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
  if (closeBtn) closeBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function initExperienceTimeline() {
  const section = qs('[data-component="experience-timeline"]');
  if (!section) return;

  const preview = qs("[data-experience-preview]", section);
  const collapsedWrap = qs("[data-experience-toggle-collapsed]", section);
  const expandedWrap = qs("[data-experience-toggle-expanded]", section);

  const openBtn = qs('[data-experience-toggle="open"]', section);
  const closeBtn = qs('[data-experience-toggle="close"]', section);
  if (!openBtn || !closeBtn) return;

  const controlsId = openBtn.getAttribute("aria-controls") || closeBtn.getAttribute("aria-controls");
  if (!controlsId) return;
  const panel = document.getElementById(controlsId);
  if (!panel) return;

  const TRANSITION_MS = 220;
  let closeTimer = 0;
  let openRaf = 0;

  function clearTimers() {
    if (closeTimer) window.clearTimeout(closeTimer);
    closeTimer = 0;
    if (openRaf) window.cancelAnimationFrame(openRaf);
    openRaf = 0;
  }

  function openExperience() {
    clearTimers();

    if (collapsedWrap) collapsedWrap.hidden = true; // display:none immediately
    if (expandedWrap) expandedWrap.hidden = false;
    if (preview) preview.classList.add("is-expanded");
    setExpanded(openBtn, closeBtn, true);

    panel.hidden = false;

    const reduceMotion = prefersReducedMotion();
    if (reduceMotion) {
      panel.classList.add("is-visible");
      return;
    }

    panel.classList.remove("is-visible");
    openRaf = requestAnimationFrame(() => {
      openRaf = 0;
      panel.classList.add("is-visible");
    });
  }

  function closeExperience() {
    clearTimers();

    const reduceMotion = prefersReducedMotion();
    setExpanded(openBtn, closeBtn, false);

    if (reduceMotion) {
      panel.classList.remove("is-visible");
      panel.hidden = true;
      if (expandedWrap) expandedWrap.hidden = true;
      if (collapsedWrap) collapsedWrap.hidden = false;
      if (preview) preview.classList.remove("is-expanded");
      return;
    }

    // Start exit transition. Keep layout while animating out.
    panel.classList.remove("is-visible");

    closeTimer = window.setTimeout(() => {
      closeTimer = 0;
      panel.hidden = true;
      if (expandedWrap) expandedWrap.hidden = true;
      if (collapsedWrap) collapsedWrap.hidden = false;
      if (preview) preview.classList.remove("is-expanded");
    }, TRANSITION_MS);
  }

  // Initial state.
  if (openBtn.getAttribute("aria-expanded") === "true") {
    openExperience();
  } else {
    // Ensure a clean collapsed baseline.
    panel.classList.remove("is-visible");
    panel.hidden = true;
    if (expandedWrap) expandedWrap.hidden = true;
    if (collapsedWrap) collapsedWrap.hidden = false;
    if (preview) preview.classList.remove("is-expanded");
    setExpanded(openBtn, closeBtn, false);
  }

  on(openBtn, "click", openExperience);
  on(closeBtn, "click", closeExperience);
}
