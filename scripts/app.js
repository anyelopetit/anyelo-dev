import { initHeader } from "./components/header.js";
import { initMobileMenu } from "./components/mobile-menu.js";
import { initContactForm } from "./components/contact-form.js";
import { initLenis } from "./animations/lenis.js";
import { initReveals } from "./animations/reveal.js";

// Keep startup minimal: initialize only what exists.
initHeader();
initMobileMenu();
initContactForm();
initLenis();
initReveals();

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
