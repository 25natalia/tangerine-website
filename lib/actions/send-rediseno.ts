"use server";

// Envío del formulario /rediseno (inscripción al rediseño express en reel).
// Mismo sistema que /diagnostico y contacto: Resend → CONTACT_INBOX y una fila
// en la pestaña "Leads" de Google Sheets (columna J = "Rediseño express").

import { ITEM_OPTIONS, itemLabels, type ItemOption } from "@/content/rediseno";
import { REFERRAL_OPTIONS, referralLabels, type ReferralOption } from "@/content/diagnostico";
import { isRedisenoOpen, validateRediseno, type RedisenoErrors, type RedisenoInput } from "@/lib/rediseno/validation";
import { phoneDigits, toClickableUrl } from "@/lib/diagnostico/validation";
import { appendRowToSheet } from "@/lib/google-sheets";
import {
  CONTACT_INBOX,
  EMAIL_COLORS,
  RESEND_FROM,
  asSheetText,
  confirmationHtml,
  createRateLimiter,
  emailButton,
  emailHeader,
  emailLink,
  emailRow,
  emailShell,
  escapeHtml,
  field,
  formatBogota,
  getClientIp,
  looksLikeBot,
  sendEmail,
  whatsappLink,
} from "@/lib/forms/server-utils";

const isRateLimited = createRateLimiter(3, 10 * 60 * 1000);

export type RedisenoResult =
  | { ok: true }
  | { ok: false; error: "validation"; fields: RedisenoErrors }
  | { ok: false; error: "rate_limit" | "send" | "closed" };

export async function sendRediseno(data: FormData): Promise<RedisenoResult> {
  if (looksLikeBot(data)) return { ok: true };
  // La fecha se revisa también acá: una pestaña abierta desde antes del cierre no puede colarse.
  if (!isRedisenoOpen()) return { ok: false, error: "closed" };

  const input: RedisenoInput = {
    name: field(data, "name", 120),
    email: field(data, "email", 200),
    whatsapp: field(data, "whatsapp", 30),
    brand: field(data, "brand", 160),
    instagram: field(data, "instagram", 300),
    sector: field(data, "sector", 200),
    items: data.getAll("items").map(String),
    why: String(data.get("why") ?? "").trim(),
    referral: field(data, "referral", 40),
    publishConsent: data.get("publishConsent") === "true",
    consent: data.get("consent") === "true",
  };

  const fields = validateRediseno(input);
  if (Object.keys(fields).length > 0) return { ok: false, error: "validation", fields };
  if (isRateLimited(await getClientIp())) return { ok: false, error: "rate_limit" };

  const origen = field(data, "origen", 40) || "directo";
  const utmSource = field(data, "utm_source", 60);
  const pageUrl = field(data, "_page", 500);
  const sentAt = new Date();
  const sentAtLabel = formatBogota(sentAt);
  const items = input.items
    .filter((i): i is ItemOption => (ITEM_OPTIONS as readonly string[]).includes(i))
    .map((i) => itemLabels.es[i]);
  const referral = (REFERRAL_OPTIONS as readonly string[]).includes(input.referral)
    ? referralLabels.es[input.referral as ReferralOption]
    : "";
  const firstName = input.name.split(/\s+/)[0];
  const waLink = whatsappLink(
    phoneDigits(input.whatsapp),
    `Hola ${firstName}, te escribimos de The Tangerine Studio por el rediseño express de ${input.brand} 🍊`
  );
  const brandUrl = toClickableUrl(input.instagram);
  const origin = [`origen=${origen}`, utmSource && `utm_source=${utmSource}`].filter(Boolean).join(" · ");
  const subject = `🍊 Rediseño express · ${input.brand}`;

  const html = emailShell(`
    ${emailHeader({ tag: "Rediseño express", tagColor: EMAIL_COLORS.purple, title: input.brand, subtitle: sentAtLabel })}
    <tr><td style="padding:16px 0 8px;">${emailButton(brandUrl ?? waLink, brandUrl ? "Ver la marca" : "Escribirle por WhatsApp")}</td></tr>
    <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${emailRow("Nombre", escapeHtml(input.name))}
      ${emailRow("Correo", emailLink(`mailto:${input.email}`, input.email))}
      ${emailRow("WhatsApp", emailLink(waLink, input.whatsapp))}
      ${emailRow("Marca", escapeHtml(input.brand))}
      ${emailRow("Instagram o web", brandUrl ? emailLink(brandUrl, input.instagram) : escapeHtml(input.instagram))}
      ${emailRow("A qué se dedica", escapeHtml(input.sector))}
      ${emailRow("Qué rediseñar", escapeHtml(items.join(" · ")))}
      ${emailRow("Por qué necesita un rediseño", escapeHtml(input.why).replace(/\n/g, "<br>"))}
      ${emailRow("Cómo nos encontró", escapeHtml(referral || "—"))}
      ${emailRow("Autorizaciones", "Publicación en reel: sí · Tratamiento de datos: sí")}
      ${emailRow("Origen", escapeHtml(origin))}
    </table></td></tr>
  `);

  const text = [
    subject,
    "",
    `Nombre: ${input.name}`,
    `Correo: ${input.email}`,
    `WhatsApp: ${input.whatsapp} → ${waLink}`,
    `Marca: ${input.brand}`,
    `Instagram o web: ${input.instagram}`,
    `A qué se dedica: ${input.sector}`,
    `Qué rediseñar: ${items.join(", ")}`,
    `Por qué: ${input.why}`,
    `Cómo nos encontró: ${referral || "—"}`,
    "Autorizaciones: publicación en reel sí, tratamiento de datos sí",
    `Origen: ${origin}`,
    `Enviado: ${sentAtLabel}`,
  ].join("\n");

  const [emailResult, sheetResult] = await Promise.allSettled([
    sendEmail({ to: CONTACT_INBOX, replyTo: input.email, subject, html, text }),
    appendRowToSheet(
      "Leads",
      [
        sentAt.toISOString(),
        input.name,
        input.brand,
        input.email,
        input.whatsapp,
        `Rediseñar: ${items.join(", ")} · Sector: ${input.sector}`,
        input.why,
        pageUrl,
        utmSource ? `utm_source=${utmSource}` : "",
        `Rediseño express (${origen})`,
        input.instagram,
        referral,
      ].map(asSheetText)
    ),
  ]);

  if (emailResult.status === "rejected") console.error("sendRediseno: falló el correo.", emailResult.reason);
  if (sheetResult.status === "rejected") console.error("sendRediseno: falló Google Sheets.", sheetResult.reason);
  if (emailResult.status === "rejected" && sheetResult.status === "rejected") return { ok: false, error: "send" };

  if (RESEND_FROM) {
    const body = `¡Hola, ${firstName}! ${input.brand} ya está inscrita al rediseño express. Después del cierre elegimos las marcas; si la tuya queda, te escribimos por WhatsApp antes de publicar el reel.`;
    await sendEmail({
      to: input.email,
      replyTo: CONTACT_INBOX,
      subject: "Recibimos tu inscripción 🍊",
      html: confirmationHtml(body),
      text: `${body}\n\nNatalia & Emy, The Tangerine Studio.`,
    }).catch((error) => console.error("sendRediseno: falló la confirmación.", error));
  }

  return { ok: true };
}
