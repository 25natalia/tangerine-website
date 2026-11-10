// Utilidades de servidor compartidas por los formularios /diagnostico y
// /rediseno. NO es "use server": solo se importa desde los Server Actions, así
// que nada de esto queda expuesto al navegador.

import { headers } from "next/headers";
import { Resend } from "resend";

export const CONTACT_INBOX = process.env.CONTACT_INBOX ?? "tangerinestudio.col@gmail.com";
/**
 * Remitente. Sin dominio verificado en Resend se usa el de prueba
 * (onboarding@resend.dev), que SOLO puede enviar a la cuenta dueña de Resend —
 * por eso las confirmaciones a la persona se envían solo si existe RESEND_FROM.
 */
export const RESEND_FROM = process.env.RESEND_FROM;
const FROM = RESEND_FROM ?? "The Tangerine Studio <onboarding@resend.dev>";

// ─── Antispam ─────────────────────────────────────────────────────────────
// Límite en memoria por IP. En hosting serverless cada instancia tiene su
// propia memoria: es un freno básico (junto al honeypot y el tiempo mínimo),
// no un límite exacto.
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function isLimited(key: string) {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    const limited = recent.length >= limit;
    if (!limited) recent.push(now);
    hits.set(key, recent);
    return limited;
  };
}

export async function getClientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/** Un humano no completa el formulario en menos de esto. */
const MIN_FILL_MS = 3000;

/** true si el envío parece de un bot (honeypot lleno o demasiado rápido). */
export function looksLikeBot(data: FormData) {
  if (String(data.get("company_website") ?? "").trim()) return true;
  const startedAt = Number(data.get("_startedAt"));
  return Boolean(startedAt) && Date.now() - startedAt < MIN_FILL_MS;
}

export function field(data: FormData, key: string, max = 300) {
  return String(data.get(key) ?? "").trim().slice(0, max);
}

export function formatBogota(date: Date) {
  return new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", dateStyle: "long", timeStyle: "short" }).format(date);
}

/** Evita que Sheets interprete "+57…" o "=…" como fórmula (y la inyección de fórmulas). */
export function asSheetText(value: string) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

// ─── Correo ───────────────────────────────────────────────────────────────
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Colores de marca en hex: los clientes de correo no entienden variables CSS
// (mismo criterio que lib/og.tsx).
export const EMAIL_COLORS = {
  purple: "#5434E2",
  tangerine: "#FF7401",
  text: "#1d1a2b",
  muted: "#6b6880",
  border: "#e7e5ef",
};
const C = EMAIL_COLORS;

export function emailRow(label: string, valueHtml: string) {
  return `<tr><td style="padding:12px 0;border-bottom:1px solid ${C.border};">
    <div style="font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:${C.muted};margin-bottom:4px;">${label}</div>
    <div style="font-size:16px;line-height:1.5;color:${C.text};">${valueHtml}</div>
  </td></tr>`;
}

export function emailLink(href: string, text: string) {
  return `<a href="${escapeHtml(href)}" style="color:${C.purple};font-weight:600;text-decoration:underline;">${escapeHtml(text)}</a>`;
}

export function emailButton(href: string, text: string) {
  return `<a href="${escapeHtml(href)}" style="display:block;text-align:center;background:${C.purple};color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:12px;padding:14px 16px;">${escapeHtml(text)}</a>`;
}

export function emailHeader({ tag, tagColor, title, subtitle }: { tag: string; tagColor: string; title: string; subtitle: string }) {
  return `<tr><td style="padding-bottom:8px;">
    <div style="display:inline-block;background:${tagColor};color:#ffffff;font-size:12px;font-weight:700;border-radius:999px;padding:4px 10px;">${escapeHtml(tag)}</div>
    <h1 style="margin:12px 0 4px;font-size:22px;line-height:1.3;color:${C.text};">${escapeHtml(title)}</h1>
    <p style="margin:0;color:${C.muted};font-size:14px;">${escapeHtml(subtitle)}</p>
  </td></tr>`;
}

export function emailShell(content: string) {
  return `<!doctype html><html lang="es"><body style="margin:0;padding:0;background:#f6f5fb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f5fb;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;padding:24px;">
        ${content}
      </table>
    </td></tr>
  </table></body></html>`;
}

/** Cuerpo de la confirmación para la persona — mismo formato en todos los formularios. */
export function confirmationHtml(body: string) {
  return emailShell(`<tr><td style="font-size:16px;line-height:1.6;color:${C.text};">
    <p style="margin:0 0 16px;">${escapeHtml(body)}</p>
    <p style="margin:0;color:${C.muted};">Natalia &amp; Emy<br>The Tangerine Studio</p>
  </td></tr>`);
}

export async function sendEmail(message: { to: string; replyTo: string; subject: string; html: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Falta RESEND_API_KEY en el entorno.");
  const { error } = await new Resend(apiKey).emails.send({ from: FROM, ...message });
  if (error) throw new Error(error.message);
}

/** Link de wa.me con mensaje prellenado. */
export function whatsappLink(digits: string, text: string) {
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
