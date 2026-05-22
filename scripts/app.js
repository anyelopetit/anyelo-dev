import { initHeader } from "./components/header.js";
import { initMobileMenu } from "./components/mobile-menu.js";
import { initContactForm } from "./components/contact-form.js";
import { initSpells } from "./components/spells.js";
import { initHeroTyping } from "./components/hero-typing.js";
import { initExperienceTimeline } from "./components/experience-timeline.js";
import { initBlogReading } from "./components/blog-reading.js";
import { initBlogReadingPreferences } from "./components/blog-reading-preferences.js";
import { initLenis } from "./animations/lenis.js";
import { initReveals } from "./animations/reveal.js";

// Keep startup minimal: initialize only what exists.
initHeader();
initMobileMenu();
initContactForm();
initSpells();
initHeroTyping();
initExperienceTimeline();
initBlogReading();
initBlogReadingPreferences();
initLenis();
initReveals();

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
