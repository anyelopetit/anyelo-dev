const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, init = {}) {
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init.headers
    },
    ...init
  });
}

function sanitizeText(input) {
  const s = String(input ?? "");
  // Normalize whitespace and strip control characters.
  return s
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pick(obj, keys) {
  const out = {};
  for (const k of keys) out[k] = obj?.[k];
  return out;
}

async function sendWithResend(env, payload) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) throw new Error("missing RESEND_API_KEY");

  const from = env.CONTACT_FROM_EMAIL;
  const to = env.CONTACT_TO_EMAIL;
  const replyTo = env.CONTACT_REPLY_TO_EMAIL;
  if (!from || !to) throw new Error("missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL");

  const subject = `Nuevo lead: ${payload.name} (${payload.budget || ""})`;
  const text = [
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    `Empresa: ${payload.company || "-"}`,
    `Presupuesto: ${payload.budget}`,
    "",
    "Mensaje:",
    payload.message
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo || payload.email,
      subject,
      text
    })
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`resend_error_${res.status}: ${msg.slice(0, 200)}`);
  }
}

async function verifyTurnstile(env, token, ip) {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Not configured.
  if (!token) return false;

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form
  });
  const data = await res.json().catch(() => null);
  return Boolean(data?.success);
}

export async function onRequestPost({ request, env }) {
  // Origin guard (best-effort; WAF should be the real gate).
  const allowedOrigin = env.ALLOWED_ORIGIN;
  const origin = request.headers.get("origin") || "";
  if (allowedOrigin && origin && origin !== allowedOrigin) {
    return json({ ok: false, message: "Origen no permitido." }, { status: 400 });
  }

  const ct = request.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return json({ ok: false, message: "Content-Type invalido." }, { status: 400 });
  }

  const raw = await request.json().catch(() => null);
  const body = pick(raw, ["name", "email", "company", "budget", "message", "website", "turnstileToken"]);

  // Honeypot.
  if (sanitizeText(body.website)) {
    return json({ ok: true, message: "Mensaje enviado correctamente." });
  }

  const payload = {
    name: sanitizeText(body.name),
    email: sanitizeText(body.email),
    company: sanitizeText(body.company),
    budget: sanitizeText(body.budget),
    message: sanitizeText(body.message)
  };

  const fieldErrors = {};
  if (payload.name.length < 2 || payload.name.length > 80) fieldErrors.name = "Ingresa tu nombre (2-80).";
  if (!EMAIL_RE.test(payload.email) || payload.email.length > 120) fieldErrors.email = "Ingresa un email valido.";
  if (!payload.budget) fieldErrors.budget = "Selecciona un presupuesto.";
  if (payload.company.length > 120) fieldErrors.company = "Empresa demasiado larga.";
  if (payload.message.length < 20 || payload.message.length > 1500) fieldErrors.message = "Mensaje (20-1500).";

  if (Object.keys(fieldErrors).length) {
    return json(
      { ok: false, message: "Revisa los campos.", fieldErrors },
      { status: 400 }
    );
  }

  const ip = request.headers.get("CF-Connecting-IP") || undefined;
  const turnstileOk = await verifyTurnstile(env, sanitizeText(body.turnstileToken), ip);
  if (!turnstileOk) {
    return json({ ok: false, message: "Validacion anti-spam fallida." }, { status: 400 });
  }

  try {
    await sendWithResend(env, payload);
    return json({ ok: true, message: "Mensaje enviado correctamente." });
  } catch {
    return json({ ok: false, message: "No fue posible enviar el mensaje." }, { status: 500 });
  }
}

export async function onRequest({ request }) {
  return json({ ok: false, message: "Metodo no permitido." }, { status: 405 });
}
