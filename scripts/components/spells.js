import { prefersReducedMotion } from "../utils/motion-safe.js";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function initMagnet(el) {
  let raf = 0;
  let tx = 0;
  let ty = 0;

  const strength = Number(el.dataset.magnetStrength || 10);
  const ease = 0.14;

  function render() {
    raf = 0;
    // translateZ for GPU.
    el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
  }

  function onMove(e) {
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    const dx = mx - r.width / 2;
    const dy = my - r.height / 2;
    const nx = clamp(dx / (r.width / 2), -1, 1);
    const ny = clamp(dy / (r.height / 2), -1, 1);
    tx += (nx * strength - tx) * ease;
    ty += (ny * strength - ty) * ease;
    if (!raf) raf = requestAnimationFrame(render);
  }

  function onLeave() {
    tx = 0;
    ty = 0;
    if (!raf) raf = requestAnimationFrame(render);
  }

  el.style.willChange = "transform";
  el.addEventListener("pointermove", onMove, { passive: true });
  el.addEventListener("pointerleave", onLeave, { passive: true });
}

function initSpotlight(el) {
  let raf = 0;
  let x = 50;
  let y = 50;

  function render() {
    raf = 0;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }

  function onMove(e) {
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    x = clamp(mx, 0, 100);
    y = clamp(my, 0, 100);
    if (!raf) raf = requestAnimationFrame(render);
  }

  el.addEventListener("pointermove", onMove, { passive: true });
}

function initHeroEasterEgg() {
  // Small delight: double-tap/click the hero photo toggles a subtle accent glow.
  const heroPhoto = document.querySelector(".hero-photo-frame");
  if (!heroPhoto) return;
  heroPhoto.addEventListener(
    "dblclick",
    () => {
      heroPhoto.classList.toggle("spell-glow");
    },
    { passive: true }
  );
}

export function initSpells() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll("[data-spell~='magnet']").forEach(initMagnet);
  document.querySelectorAll("[data-spell~='spotlight']").forEach(initSpotlight);
  initHeroEasterEgg();
}
