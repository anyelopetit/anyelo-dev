import { prefersReducedMotion } from "../utils/motion-safe.js";

const PHRASES = [
  "generan impacto",
  "crecen negocios",
  "venden más",
  "reducen costos",
  "mejoran procesos",
  "resuelven problemas",
  "llegan a producción",
  "funcionan de verdad",
  "entregan resultados",
  "optimizan procesos",
  "se sienten premium",
  "dan confianza",
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function initHeroTyping() {
  const root = document.querySelector('[data-component="hero-typing"]');
  if (!root) return;

  const textEl = root.querySelector("[data-typing-text]");
  if (!textEl) return;

  if (prefersReducedMotion()) {
    textEl.textContent = PHRASES[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeSpeed = 58;
  const deleteSpeed = 34;
  const holdAfterType = 1200;
  const holdAfterDelete = 260;

  async function loop() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const phrase = PHRASES[phraseIndex];

      if (!deleting) {
        charIndex = Math.min(charIndex + 1, phrase.length);
        textEl.textContent = phrase.slice(0, charIndex);

        if (charIndex === phrase.length) {
          await sleep(holdAfterType);
          deleting = true;
        } else {
          await sleep(typeSpeed);
        }
      } else {
        charIndex = Math.max(charIndex - 1, 0);
        textEl.textContent = phrase.slice(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % PHRASES.length;
          await sleep(holdAfterDelete);
        } else {
          await sleep(deleteSpeed);
        }
      }
    }
  }

  loop();
}
