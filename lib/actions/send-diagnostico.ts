"use server";

// Envío del formulario /diagnostico. Reutiliza el mismo sistema que el
// formulario de contacto (que no se toca): Resend, la bandeja CONTACT_INBOX y
// la hoja de Google Sheets (pestaña "Leads"). Correo y hoja van en paralelo;
// el envío solo falla si fallan los dos.

import {
  AREA_OPTIONS,
  CUPOS_DISPONIBLES,
  REFERRAL_OPTIONS,
  areaLabels,
  referralLabels,
  type AreaOption,
  type ReferralOption,
} from "@/content/diagnostico";
import {
  phoneDigits,
  toClickableUrl,
  validateDiagnostico,
  type DiagnosticoErrors,
  type DiagnosticoInput,
} from "@/lib/diagnostico/validation";
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

/** Máximo 3 envíos por IP cada 10 minutos. */
const isRateLimited = createRateLimiter(3, 10 * 60 * 1000);

export type DiagnosticoResult =
  | { ok: true }
  | { ok: false; error: "validation"; fields: DiagnosticoErrors }
  | { ok: false; error: "rate_limit" | "send" };

export async function sendDiagnostico(data: FormData): Promise<DiagnosticoResult> {
  // Bot: se le responde "ok" para no darle pistas, pero no se envía nada.
  if (looksLikeBot(data)) return { ok: true };

  const input: DiagnosticoInput = {
    name: field(data, "name", 120),
    email: field(data, "email", 200),
    whatsapp: field(data, "whatsapp", 30),
    brand: field(data, "brand", 160),
    areas: data.getAll("areas").map(String),
    link: field(data, "link", 300),
    concern: String(data.get("concern") ?? "").trim(),
    referral: field(data, "referral", 40),
    consent: data.get("consent") === "true",
  };

  const fields = validateDiagnostico(input);
  if (Object.keys(fields).length > 0) return { ok: false, error: "validation", fields };
  if (isRateLimited(await getClientIp())) return { ok: false, error: "rate_limit" };

  const origen = field(data, "origen", 40) || "directo";
  const utmSource = field(data, "utm_source", 60);
  const pageUrl = field(data, "_page", 500);
  const sentAt = new Date();
  const waitlist = !CUPOS_DISPONIBLES;
  const areas = input.areas
    .filter((a): a is AreaOption => (AREA_OPTIONS as readonly string[]).includes(a))
    .map((a) => areaLabels.es[a]);
  const referral = (REFERRAL_OPTIONS as readonly string[]).includes(input.referral)
    ? referralLabels.es[input.referral as ReferralOption]
    : "";

  const firstName = input.name.split(/\s+/)[0];
  const waLink = whatsappLink(
    phoneDigits(input.whatsapp),
    `Hola ${firstName}, te escribimos de The Tangerine Studio por tu diagnóstico de ${input.brand} 🍊`
  );
  const clickable = toClickableUrl(input.link);
  const subject = waitlist
    ? `🍊 Lista de espera · diagnóstico gratis · ${input.brand}`
    : `🍊 Consulta gratis desde links · ${input.brand}`;
  const sentAtLabel = formatBogota(sentAt);
  const origin = [`origen=${origen}`, utmSource && `utm_source=${utmSource}`].filter(Boolean).join(" · ");

  const html = emailShell(`
    ${emailHeader({
      tag: waitlist ? "Lista de espera" : "Diagnóstico gratis",
      tagColor: waitlist ? EMAIL_COLORS.muted : EMAIL_COLORS.tangerine,
      title: input.brand,
      subtitle: sentAtLabel,
    })}
    <tr><td style="padding:16px 0 8px;">${emailButton(waLink, "Escribirle por WhatsApp")}</td></tr>
    <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${emailRow("Nombre", escapeHtml(input.name))}
      ${emailRow("Correo", emailLink(`mailto:${input.email}`, input.email))}
      ${emailRow("WhatsApp", emailLink(waLink, input.whatsapp))}
      ${emailRow("Marca o proyecto", escapeHtml(input.brand))}
      ${emailRow("Qué revisar", escapeHtml(areas.join(" · ")))}
      ${emailRow("Link para revisar", input.link ? (clickable ? emailLink(clickable, input.link) : escapeHtml(input.link)) : "—")}
      ${emailRow("Lo que más le preocupa", input.concern ? escapeHtml(input.concern).replace(/\n/g, "<br>") : "—")}
      ${emailRow("Cómo nos encontró", escapeHtml(referral || "—"))}
      ${emailRow("Origen", escapeHtml(origin))}
    </table></td></tr>
    <tr><td style="padding-top:16px;color:${EMAIL_COLORS.muted};font-size:13px;">Responde este correo para escribirle directamente a ${escapeHtml(input.email)}.</td></tr>
  `);

  const text = [
    subject,
    "",
    `Nombre: ${input.name}`,
    `Correo: ${input.email}`,
    `WhatsApp: ${input.whatsapp} → ${waLink}`,
    `Marca o proyecto: ${input.brand}`,
    `Qué revisar: ${areas.join(", ")}`,
    `Link: ${input.link || "—"}`,
    `Lo que más le preocupa: ${input.concern || "—"}`,
    `Cómo nos encontró: ${referral || "—"}`,
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
        `Revisar: ${areas.join(", ")}`,
        input.concern,
        pageUrl,
        utmSource ? `utm_source=${utmSource}` : "",
        waitlist ? `Diagnóstico · lista de espera (${origen})` : `Diagnóstico (${origen})`,
        input.link,
        referral,
      ].map(asSheetText)
    ),
  ]);

  if (emailResult.status === "rejected") console.error("sendDiagnostico: falló el correo.", emailResult.reason);
  if (sheetResult.status === "rejected") console.error("sendDiagnostico: falló Google Sheets.", sheetResult.reason);
  if (emailResult.status === "rejected" && sheetResult.status === "rejected") return { ok: false, error: "send" };

  // Confirmación a la persona: solo con dominio verificado (RESEND_FROM).
  if (RESEND_FROM) {
    const body = waitlist
      ? `¡Hola, ${firstName}! Ya tenemos tus datos para ${input.brand}. Este mes no quedan cupos, pero te escribimos primero cuando se abran.`
      : `¡Hola, ${firstName}! Ya tenemos tu solicitud para ${input.brand}. En las próximas 48 horas hábiles te escribimos por WhatsApp con tu diagnóstico.`;
    await sendEmail({
      to: input.email,
      replyTo: CONTACT_INBOX,
      subject: "Recibimos tu solicitud 🍊",
      html: confirmationHtml(body),
      text: `${body}\n\nNatalia & Emy, The Tangerine Studio.`,
    }).catch((error) => console.error("sendDiagnostico: falló la confirmación.", error));
  }

  return { ok: true };
}
