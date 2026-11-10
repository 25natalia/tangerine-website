import type { Localized } from "@/lib/i18n/types";

// Contenido y configuración de /rediseno ("Rediseño express": inscribe tu
// marca y quizá la rediseñemos en un reel).
//
// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────
// REDISENO_ACTIVO = false  → cierra las inscripciones ya, sin esperar la fecha.
// REDISENO_CIERRE          → último día para inscribirse (YYYY-MM-DD, hora de
//                            Colombia). Al día siguiente la página muestra
//                            "Inscripciones cerradas" y el botón de /links
//                            desaparece solo.
export const REDISENO_ACTIVO = true;
export const REDISENO_CIERRE = "2026-11-26";

export const ITEM_OPTIONS = ["logo", "paleta", "instagram", "empaque", "otro"] as const;
export type ItemOption = (typeof ITEM_OPTIONS)[number];

export const WHY_MAX = 500;

export const itemLabels: Localized<Record<ItemOption, string>> = {
  es: {
    logo: "Logo",
    paleta: "Colores y tipografía",
    instagram: "Feed de Instagram",
    empaque: "Empaque o etiqueta",
    otro: "Otro",
  },
  en: {
    logo: "Logo",
    paleta: "Colors and typography",
    instagram: "Instagram feed",
    empaque: "Packaging or label",
    otro: "Other",
  },
};

export interface RedisenoCopy {
  eyebrow: string;
  title: string;
  intro: string;
  steps: { title: string; body: string }[];
  deadline: (days: number, date: string) => string;
  closedTitle: string;
  closedBody: string;
  closedCta: string;
  nameLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  whatsappLabel: string;
  whatsappDescription: string;
  countryCodeLabel: string;
  brandLabel: string;
  instagramLabel: string;
  instagramPlaceholder: string;
  instagramDescription: string;
  sectorLabel: string;
  sectorPlaceholder: string;
  itemsLabel: string;
  itemsDescription: string;
  whyLabel: string;
  whyPlaceholder: string;
  referralLabel: string;
  publishConsent: string;
  consentBefore: string;
  consentLink: string;
  consentAfter: string;
  submit: string;
  requiredNote: string;
  errors: {
    required: string;
    email: string;
    phone: string;
    items: string;
    max: string;
    consent: string;
    publish: string;
  };
  sendError: string;
  rateLimitError: string;
  sendErrorWhatsapp: string;
  successTitle: (name: string, brand: string) => string;
  successBody: string;
  successCta: string;
  backToSite: string;
}

export const redisenoCopy: Localized<RedisenoCopy> = {
  es: {
    eyebrow: "Rediseño express",
    title: "Inscribe tu marca y quizá la rediseñemos en un reel",
    intro:
      "Elegimos marcas reales para rediseñarlas frente a la cámara: el antes, el después y el porqué de cada decisión. Es gratis.",
    steps: [
      { title: "Te inscribes", body: "Nos cuentas de tu marca en 2 minutos." },
      { title: "Elegimos", body: "Seleccionamos algunas marcas después del cierre." },
      { title: "Te avisamos", body: "Si quedas, te escribimos por WhatsApp antes de publicar." },
    ],
    deadline: (days, date) =>
      `${days <= 0 ? "Cierra hoy" : days === 1 ? "Cierra mañana" : `Cierra en ${days} días`} · ${date}`,
    closedTitle: "Las inscripciones ya cerraron",
    closedBody:
      "Gracias a todas las marcas que se inscribieron. Síguenos en Instagram para ver los rediseños y enterarte de la próxima convocatoria.",
    closedCta: "Ver el Instagram",
    nameLabel: "Nombre",
    emailLabel: "Correo",
    emailPlaceholder: "tu@correo.com",
    whatsappLabel: "WhatsApp",
    whatsappDescription: "Por aquí te avisamos si tu marca queda elegida.",
    countryCodeLabel: "Indicativo del país",
    brandLabel: "Nombre de tu marca",
    instagramLabel: "Instagram o web de tu marca",
    instagramPlaceholder: "@tumarca o tumarca.com",
    instagramDescription: "Lo necesitamos para ver cómo se ve tu marca hoy.",
    sectorLabel: "¿A qué se dedica tu marca?",
    sectorPlaceholder: "Ej. pastelería artesanal en Cali",
    itemsLabel: "¿Qué te gustaría que rediseñáramos?",
    itemsDescription: "Elige una o varias.",
    whyLabel: "¿Por qué tu marca necesita un rediseño?",
    whyPlaceholder: "Cuéntanos qué no te convence hoy o qué quieres lograr…",
    referralLabel: "¿Cómo nos encontraste?",
    publishConsent:
      "Si mi marca es elegida, autorizo a The Tangerine Studio a mostrar su nombre, logo y contenido público en un reel en Instagram y otras redes.",
    consentBefore: "Autorizo a The Tangerine Studio a tratar mis datos para gestionar esta inscripción, según la ",
    consentLink: "política de tratamiento de datos",
    consentAfter: ".",
    submit: "Inscribir mi marca",
    requiredNote: "Los campos con * son obligatorios.",
    errors: {
      required: "Este campo es obligatorio.",
      email: "Revisa el correo, parece que falta algo (ej. tu@correo.com).",
      phone: "Revisa el número, ej. 300 123 4567.",
      items: "Elige al menos una opción.",
      max: "Máximo 500 caracteres.",
      consent: "Necesitamos tu autorización para gestionar tu inscripción.",
      publish: "Sin esta autorización no podemos mostrar tu marca en el reel.",
    },
    sendError: "No pudimos enviar tu inscripción. Lo que escribiste sigue aquí, puedes intentarlo de nuevo.",
    rateLimitError: "Recibimos varios envíos seguidos desde tu conexión. Espera unos minutos y vuelve a intentarlo.",
    sendErrorWhatsapp: "O escríbenos por WhatsApp",
    successTitle: (name, brand) => `¡Listo, ${name}! ${brand} ya está inscrita 🍊`,
    successBody: "Después del cierre elegimos las marcas. Si la tuya queda, te escribimos por WhatsApp antes de publicar el reel.",
    successCta: "Mientras tanto, mira nuestros proyectos",
    backToSite: "Ir a la web",
  },
  en: {
    eyebrow: "Express redesign",
    title: "Sign up your brand and we might redesign it in a reel",
    intro:
      "We pick real brands and redesign them on camera: the before, the after and the why behind every decision. It's free.",
    steps: [
      { title: "You sign up", body: "Tell us about your brand in 2 minutes." },
      { title: "We choose", body: "We pick a few brands after sign-ups close." },
      { title: "We let you know", body: "If you're picked, we message you on WhatsApp before posting." },
    ],
    deadline: (days, date) =>
      `${days <= 0 ? "Closes today" : days === 1 ? "Closes tomorrow" : `Closes in ${days} days`} · ${date}`,
    closedTitle: "Sign-ups are closed",
    closedBody:
      "Thanks to every brand that signed up. Follow us on Instagram to see the redesigns and hear about the next call.",
    closedCta: "See our Instagram",
    nameLabel: "Name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    whatsappLabel: "WhatsApp",
    whatsappDescription: "We'll let you know here if your brand is picked.",
    countryCodeLabel: "Country code",
    brandLabel: "Your brand name",
    instagramLabel: "Your brand's Instagram or website",
    instagramPlaceholder: "@yourbrand or yourbrand.com",
    instagramDescription: "We need it to see how your brand looks today.",
    sectorLabel: "What does your brand do?",
    sectorPlaceholder: "E.g. artisan bakery in Cali",
    itemsLabel: "What would you like us to redesign?",
    itemsDescription: "Pick one or more.",
    whyLabel: "Why does your brand need a redesign?",
    whyPlaceholder: "Tell us what doesn't convince you today or what you want to achieve…",
    referralLabel: "How did you find us?",
    publishConsent:
      "If my brand is picked, I authorize The Tangerine Studio to show its name, logo and public content in a reel on Instagram and other social networks.",
    consentBefore: "I authorize The Tangerine Studio to process my data to manage this sign-up, according to the ",
    consentLink: "data processing policy",
    consentAfter: ".",
    submit: "Sign up my brand",
    requiredNote: "Fields marked with * are required.",
    errors: {
      required: "This field is required.",
      email: "Check your email, something seems missing (e.g. you@email.com).",
      phone: "Check the number, e.g. 300 123 4567.",
      items: "Pick at least one option.",
      max: "500 characters max.",
      consent: "We need your authorization to manage your sign-up.",
      publish: "Without this authorization we can't show your brand in the reel.",
    },
    sendError: "We couldn't send your sign-up. What you wrote is still here, you can try again.",
    rateLimitError: "We got several submissions in a row from your connection. Wait a few minutes and try again.",
    sendErrorWhatsapp: "Or message us on WhatsApp",
    successTitle: (name, brand) => `Done, ${name}! ${brand} is signed up 🍊`,
    successBody: "We'll pick the brands after sign-ups close. If yours is picked, we'll message you on WhatsApp before posting the reel.",
    successCta: "Meanwhile, see our projects",
    backToSite: "Go to website",
  },
};
