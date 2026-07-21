"use server";

import { Resend } from "resend";

const CONTACT_INBOX = "hola@tangerine.studio";

function getField(data: FormData, key: string): string {
  return String(data.get(key) ?? "").trim();
}

/** Extrae utm_* de la URL completa que el cliente adjuntó (ver site-contact-form.tsx). */
function extractUtm(pageUrl: string): Record<string, string> {
  try {
    const url = new URL(pageUrl);
    const utm: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const value = url.searchParams.get(key);
      if (value) utm[key] = value;
    }
    return utm;
  } catch {
    return {};
  }
}

/**
 * Server Action real — no simulada. Requiere RESEND_API_KEY en el entorno;
 * sin esa variable, falla explícitamente (nunca finge éxito) para que
 * ContactForm muestre su estado de error real en vez de una confirmación
 * falsa. Ver DESIGN_SYSTEM_SYNC.md para el porqué de esta arquitectura.
 */
export async function sendContactEmail(data: FormData): Promise<void> {
  const name = getField(data, "name");
  const company = getField(data, "company");
  const email = getField(data, "email");
  const website = getField(data, "website");
  const linkedin = getField(data, "linkedin");
  const projectType = getField(data, "projectType");
  const budget = getField(data, "budget");
  const timeline = getField(data, "timeline");
  const message = getField(data, "message");
  const referral = getField(data, "referral");
  const services = data.getAll("services").map(String);

  // Captura de origen — adjuntada por site-contact-form.tsx, no por un
  // script de terceros. Ver Volumen de arquitectura §12 (Analytics).
  const referrer = getField(data, "_referrer");
  const pageUrl = getField(data, "_page");
  const utm = pageUrl ? extractUtm(pageUrl) : {};

  if (!name || !email || !message) {
    throw new Error("Faltan campos obligatorios.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "El envío de correo no está configurado — falta RESEND_API_KEY en el entorno."
    );
  }

  const resend = new Resend(apiKey);

  const lines = [
    `Nombre: ${name}`,
    `Empresa: ${company || "—"}`,
    `Email: ${email}`,
    website ? `Sitio web: ${website}` : null,
    linkedin ? `LinkedIn: ${linkedin}` : null,
    `Tipo de proyecto: ${projectType || "—"}`,
    `Presupuesto: ${budget || "—"}`,
    timeline ? `Tiempo estimado: ${timeline}` : null,
    services.length ? `Servicios de interés: ${services.join(", ")}` : null,
    referral ? `Cómo nos conoció: ${referral}` : null,
    "",
    "Mensaje:",
    message,
    "",
    "— Origen —",
    referrer ? `Referrer: ${referrer}` : null,
    pageUrl ? `Página: ${pageUrl}` : null,
    ...Object.entries(utm).map(([key, value]) => `${key}: ${value}`),
  ].filter((line): line is string => line !== null);

  const { error } = await resend.emails.send({
    // Remitente de sandbox de Resend — reemplazar por una dirección del
    // dominio propio (ej. "Tangerine Studio <hola@tangerine.studio>") una
    // vez que tangerine.studio esté verificado en la cuenta de Resend.
    from: "Tangerine Studio <onboarding@resend.dev>",
    to: CONTACT_INBOX,
    replyTo: email,
    subject: `Nuevo contacto — ${company || name}`,
    text: lines.join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}
