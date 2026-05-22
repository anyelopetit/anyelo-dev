import { qs, qsa } from "../utils/dom.js";

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function initBlogReading() {
  const bar = qs("[data-reading-progress]");
  const toc = qs("[data-toc]");
  if (!bar && !toc) return;

  const article = qs("article");
  if (!article) return;

  const reduceMotion = prefersReducedMotion();

  // Reading progress.
  if (bar) {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = article.getBoundingClientRect();
        const viewportH = window.innerHeight || 1;

        // Progress 0 when article top hits viewport top; 1 when article bottom hits viewport bottom.
        const total = rect.height - viewportH;
        const traveled = -rect.top;
        const p = total <= 0 ? 1 : clamp(traveled / total, 0, 1);
        bar.style.transform = `scaleX(${p.toFixed(4)})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  }

  // TOC active section.
  if (toc) {
    const links = qsa("[data-toc-link]", toc);
    if (!links.length) return;

    const linkById = new Map();
    links.forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      const id = href.slice(1);
      if (!id) return;
      linkById.set(id, a);
    });

    const headings = [];
    linkById.forEach((_a, id) => {
      const el = document.getElementById(id);
      if (el) headings.push(el);
    });

    function setActive(id) {
      links.forEach((a) => {
        a.classList.remove("is-active");
        a.removeAttribute("aria-current");
      });
      const a = linkById.get(id);
      if (a) {
        a.classList.add("is-active");
        a.setAttribute("aria-current", "true");
      }
    }

    if (reduceMotion || !window.IntersectionObserver) {
      // Fallback: mark the first as active.
      const first = headings[0];
      if (first?.id) setActive(first.id);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the top-most visible heading.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top || 0) - (b.boundingClientRect.top || 0));
        const h = visible[0]?.target;
        if (h?.id) setActive(h.id);
      },
      {
        root: null,
        // Activate slightly before it hits the top.
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0, 1]
      }
    );

    headings.forEach((h) => observer.observe(h));
  }
}
