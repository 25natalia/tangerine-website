// Validación compartida de /rediseno — corre igual en el navegador y en el
// servidor (send-rediseno.ts). Devuelve códigos; cada lado los traduce.

import { ITEM_OPTIONS, REDISENO_ACTIVO, REDISENO_CIERRE, WHY_MAX } from "@/content/rediseno";
import { REFERRAL_OPTIONS } from "@/content/diagnostico";
import { daysUntil } from "@/content/links";
import { phoneDigits } from "@/lib/diagnostico/validation";

export interface RedisenoInput {
  name: string;
  email: string;
  whatsapp: string;
  brand: string;
  instagram: string;
  sector: string;
  items: string[];
  why: string;
  referral: string;
  publishConsent: boolean;
  consent: boolean;
}

export type RedisenoErrorCode = "required" | "email" | "phone" | "items" | "max" | "consent" | "publish";
export type RedisenoErrors = Partial<Record<keyof RedisenoInput, RedisenoErrorCode>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** ¿Siguen abiertas las inscripciones? (interruptor + fecha, en hora de Colombia). */
export function isRedisenoOpen(now = new Date()) {
  return REDISENO_ACTIVO && daysUntil(REDISENO_CIERRE, now) >= 0;
}

export function validateRediseno(input: RedisenoInput): RedisenoErrors {
  const errors: RedisenoErrors = {};

  if (!input.name.trim()) errors.name = "required";

  if (!input.email.trim()) errors.email = "required";
  else if (!EMAIL_RE.test(input.email.trim())) errors.email = "email";

  const digits = phoneDigits(input.whatsapp);
  if (digits.length <= 3) errors.whatsapp = "required";
  else if (digits.length < 10 || digits.length > 15) errors.whatsapp = "phone";

  if (!input.brand.trim()) errors.brand = "required";
  if (!input.instagram.trim()) errors.instagram = "required";
  if (!input.sector.trim()) errors.sector = "required";

  const items = input.items.filter((i) => (ITEM_OPTIONS as readonly string[]).includes(i));
  if (items.length === 0) errors.items = "items";

  if (!input.why.trim()) errors.why = "required";
  else if (input.why.length > WHY_MAX) errors.why = "max";

  if (input.referral && !(REFERRAL_OPTIONS as readonly string[]).includes(input.referral)) {
    errors.referral = "required";
  }

  if (!input.publishConsent) errors.publishConsent = "publish";
  if (!input.consent) errors.consent = "consent";

  return errors;
}
