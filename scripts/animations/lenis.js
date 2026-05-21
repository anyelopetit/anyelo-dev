import Lenis from "lenis";
import { prefersReducedMotion } from "../utils/motion-safe.js";

export function initLenis() {
  if (prefersReducedMotion()) return;

  // Keep Lenis subtle: no heavy easing.
  const lenis = new Lenis({
    duration: 1.0,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.0
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
