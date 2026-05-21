import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../utils/motion-safe.js";

export function initReveals() {
  if (prefersReducedMotion()) return;

  gsap.registerPlugin(ScrollTrigger);
  const nodes = document.querySelectorAll("section, article");
  if (!nodes.length) return;

  // Lightweight global reveals. Specific sections can override later.
  nodes.forEach((node) => {
    gsap.fromTo(
      node,
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: node,
          start: "top 90%",
          once: true
        }
      }
    );
  });
}
