import { qs } from "../utils/dom.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setStatus(node, msg) {
  if (!node) return;
  node.textContent = msg;
}

function fieldError(el, msg) {
  el.setAttribute("aria-invalid", "true");
  el.dataset.error = "true";
  el.title = msg;
}

function clearFieldError(el) {
  el.removeAttribute("aria-invalid");
  delete el.dataset.error;
  el.removeAttribute("title");
}

export function initContactForm() {
  const form = qs('[data-component="contact-form"]');
  if (!form) return;

  const status = qs('[data-contact-form="status"]', form);
  const submit = qs('[data-contact-form="submit"]', form);

  const name = qs('#name', form);
  const email = qs('#email', form);
  const company = qs('#company', form);
  const budget = qs('#budget', form);
  const message = qs('#message', form);
  const website = qs('#website', form);

  form.addEventListener("input", (e) => {
    const t = e.target;
    if (t && t.matches("input,select,textarea")) clearFieldError(t);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus(status, "");

    const payload = {
      name: String(name?.value ?? "").trim(),
      email: String(email?.value ?? "").trim(),
      company: String(company?.value ?? "").trim(),
      budget: String(budget?.value ?? "").trim(),
      message: String(message?.value ?? "").trim(),
      website: String(website?.value ?? "").trim()
    };

    let ok = true;
    if (payload.name.length < 2 || payload.name.length > 80) {
      fieldError(name, "Ingresa tu nombre (2-80 caracteres). ");
      ok = false;
    }
    if (!EMAIL_RE.test(payload.email) || payload.email.length > 120) {
      fieldError(email, "Ingresa un email valido.");
      ok = false;
    }
    if (!payload.budget) {
      fieldError(budget, "Selecciona un presupuesto.");
      ok = false;
    }
    if (payload.message.length < 20 || payload.message.length > 1500) {
      fieldError(message, "Cuéntame un poco mas (20-1500 caracteres). ");
      ok = false;
    }
    if (payload.website) {
      // Honeypot hit.
      setStatus(status, "No fue posible enviar el mensaje.");
      return;
    }
    if (!ok) {
      setStatus(status, "Revisa los campos marcados.");
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.setAttribute("aria-busy", "true");
    }
    setStatus(status, "Enviando...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus(status, data?.message || "No fue posible enviar el mensaje.");
        if (data?.fieldErrors) {
          if (data.fieldErrors.email) fieldError(email, data.fieldErrors.email);
          if (data.fieldErrors.name) fieldError(name, data.fieldErrors.name);
          if (data.fieldErrors.message) fieldError(message, data.fieldErrors.message);
          if (data.fieldErrors.budget) fieldError(budget, data.fieldErrors.budget);
        }
        return;
      }

      setStatus(status, "Mensaje enviado. Te respondo pronto.");
      form.reset();
    } catch {
      setStatus(status, "No fue posible enviar el mensaje. Intenta mas tarde.");
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.removeAttribute("aria-busy");
      }
    }
  });
}
