// Validación compartida de /diagnostico — la misma función corre en el
// navegador (errores en vivo) y en el servidor (send-diagnostico.ts), así las
// reglas no se pueden desincronizar. Devuelve códigos, no textos: cada lado
// traduce el código al idioma que corresponda.

import { AREA_OPTIONS, CONCERN_MAX, REFERRAL_OPTIONS } from "@/content/diagnostico";

export interface DiagnosticoInput {
  name: string;
  email: string;
  whatsapp: string;
  brand: string;
  areas: string[];
  link: string;
  concern: string;
  referral: string;
  consent: boolean;
}

export type DiagnosticoErrorCode = "required" | "email" | "phone" | "areas" | "max" | "consent";
export type DiagnosticoErrors = Partial<Record<keyof DiagnosticoInput, DiagnosticoErrorCode>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Solo dígitos del WhatsApp (sin +, espacios ni guiones). */
export function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function validateDiagnostico(input: DiagnosticoInput): DiagnosticoErrors {
  const errors: DiagnosticoErrors = {};

  if (!input.name.trim()) errors.name = "required";

  if (!input.email.trim()) errors.email = "required";
  else if (!EMAIL_RE.test(input.email.trim())) errors.email = "email";

  const digits = phoneDigits(input.whatsapp);
  // El campo arranca en "+57 ", así que "solo el indicativo" cuenta como vacío.
  if (digits.length <= 3) errors.whatsapp = "required";
  else if (digits.length < 10 || digits.length > 15) errors.whatsapp = "phone";

  if (!input.brand.trim()) errors.brand = "required";

  const areas = input.areas.filter((a) => (AREA_OPTIONS as readonly string[]).includes(a));
  if (areas.length === 0) errors.areas = "areas";

  if (input.concern.length > CONCERN_MAX) errors.concern = "max";

  if (input.referral && !(REFERRAL_OPTIONS as readonly string[]).includes(input.referral)) {
    errors.referral = "required";
  }

  if (!input.consent) errors.consent = "consent";

  return errors;
}

/**
 * Convierte lo que la persona escribió en un link clicable cuando se puede:
 * "@marca" → Instagram, "marca.com" → https://marca.com. Si no parece un link,
 * devuelve null y el correo lo muestra como texto.
 */
export function toClickableUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (/^@[\w.]+$/.test(value)) return `https://www.instagram.com/${value.slice(1)}/`;
  if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(value)) return `https://${value}`;
  return null;
}
