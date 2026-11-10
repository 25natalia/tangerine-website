import type { Localized } from "@/lib/i18n/types";

// Contenido y configuración de /diagnostico ("Te decimos qué mejorar, gratis").
//
// ─── CUPOS ────────────────────────────────────────────────────────────────
// CUPOS_DISPONIBLES = true  → formulario normal.
// CUPOS_DISPONIBLES = false → modo lista de espera: cambia el título, el texto,
//                             el botón y el asunto del correo que les llega.
// CUPOS_RESTANTES es el número que muestra el badge de /links ("Quedan N cupos
// este mes"). Debe ser el número real. Si CUPOS_DISPONIBLES es false, /links
// muestra "Sin cupos este mes" sin importar este número.
// Los dos se leen en el servidor al enviar, así que el asunto del correo
// siempre coincide con lo que vio la persona.
export const CUPOS_DISPONIBLES = true;
export const CUPOS_RESTANTES = 3;


export const AREA_OPTIONS = ["logo", "instagram", "web", "producto", "otro"] as const;
export type AreaOption = (typeof AREA_OPTIONS)[number];

export const REFERRAL_OPTIONS = ["instagram", "recomendacion", "feria", "google", "otro"] as const;
export type ReferralOption = (typeof REFERRAL_OPTIONS)[number];

export const CONCERN_MAX = 500;

export const areaLabels: Localized<Record<AreaOption, string>> = {
  es: {
    logo: "Logo o identidad",
    instagram: "Instagram",
    web: "Página web",
    producto: "Producto o app",
    otro: "Otro",
  },
  en: {
    logo: "Logo or identity",
    instagram: "Instagram",
    web: "Website",
    producto: "Product or app",
    otro: "Other",
  },
};

export const referralLabels: Localized<Record<ReferralOption, string>> = {
  es: {
    instagram: "Instagram",
    recomendacion: "Recomendación",
    feria: "Feria o evento",
    google: "Google",
    otro: "Otro",
  },
  en: {
    instagram: "Instagram",
    recomendacion: "Recommendation",
    feria: "Fair or event",
    google: "Google",
    otro: "Other",
  },
};

export interface DiagnosticoCopy {
  title: string;
  intro: string;
  waitlistTitle: string;
  waitlistIntro: string;
  nameLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  whatsappLabel: string;
  whatsappDescription: string;
  countryCodeLabel: string;
  brandLabel: string;
  areasLabel: string;
  areasDescription: string;
  linkLabel: string;
  linkPlaceholder: string;
  linkDescription: string;
  concernLabel: string;
  concernPlaceholder: string;
  referralLabel: string;
  consentBefore: string;
  consentLink: string;
  consentAfter: string;
  submit: string;
  submitWaitlist: string;
  requiredNote: string;
  errors: {
    required: string;
    email: string;
    phone: string;
    areas: string;
    max: string;
    consent: string;
  };
  sendError: string;
  rateLimitError: string;
  sendErrorWhatsapp: string;
  successTitle: (name: string) => string;
  successWaitlistTitle: (name: string) => string;
  successWaitlistBody: string;
  successCta: string;
  backToSite: string;
}

export const diagnosticoCopy: Localized<DiagnosticoCopy> = {
  es: {
    title: "Te decimos qué mejorar, gratis",
    intro:
      "Cuéntanos de tu proyecto y en 48 horas te enviamos por WhatsApp un video corto con 3 observaciones y una recomendación. Tenemos 5 cupos al mes.",
    waitlistTitle: "Este mes ya no hay cupos",
    waitlistIntro: "Déjanos tus datos y te avisamos primero cuando se abran.",
    nameLabel: "Nombre",
    emailLabel: "Correo",
    emailPlaceholder: "tu@correo.com",
    whatsappLabel: "WhatsApp",
    whatsappDescription: "Por aquí te enviamos el diagnóstico. Cambia el indicativo si no estás en Colombia.",
    countryCodeLabel: "Indicativo del país",
    brandLabel: "Nombre de tu marca o proyecto",
    areasLabel: "¿Qué quieres que revisemos?",
    areasDescription: "Elige una o varias.",
    linkLabel: "Link para revisar",
    linkPlaceholder: "Instagram, web o lo que tengas",
    linkDescription: "Si no tienes link, cuéntanos en la siguiente pregunta.",
    concernLabel: "¿Qué es lo que más te preocupa hoy de tu proyecto?",
    concernPlaceholder: "Por ejemplo: siento que mi marca no se ve profesional…",
    referralLabel: "¿Cómo nos encontraste?",
    consentBefore: "Autorizo a The Tangerine Studio a tratar mis datos para responder esta solicitud, según la ",
    consentLink: "política de tratamiento de datos",
    consentAfter: ".",
    submit: "Quiero mi diagnóstico",
    submitWaitlist: "Avísenme cuando haya cupos",
    requiredNote: "Los campos con * son obligatorios.",
    errors: {
      required: "Este campo es obligatorio.",
      email: "Revisa el correo, parece que falta algo (ej. tu@correo.com).",
      phone: "Revisa el número, ej. 300 123 4567.",
      areas: "Elige al menos una opción.",
      max: "Máximo 500 caracteres.",
      consent: "Necesitamos tu autorización para poder responderte.",
    },
    sendError: "No pudimos enviar tu solicitud. Lo que escribiste sigue aquí, puedes intentarlo de nuevo.",
    rateLimitError: "Recibimos varios envíos seguidos desde tu conexión. Espera unos minutos y vuelve a intentarlo.",
    sendErrorWhatsapp: "O escríbenos por WhatsApp",
    successTitle: (name) => `¡Listo, ${name}! Te escribimos en 48 horas por WhatsApp 🍊`,
    successWaitlistTitle: (name) => `¡Listo, ${name}! Estás en la lista de espera 🍊`,
    successWaitlistBody: "Te escribimos primero cuando se abran los cupos.",
    successCta: "Mientras tanto, mira nuestros proyectos",
    backToSite: "Ir a la web",
  },
  en: {
    title: "We'll tell you what to improve, free",
    intro:
      "Tell us about your project and within 48 hours we'll send you a short WhatsApp video with 3 observations and one recommendation. We take 5 projects a month.",
    waitlistTitle: "No spots left this month",
    waitlistIntro: "Leave us your details and you'll be the first to know when spots open.",
    nameLabel: "Name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    whatsappLabel: "WhatsApp",
    whatsappDescription: "We'll send your review here. Change the country code if you're not in Colombia.",
    countryCodeLabel: "Country code",
    brandLabel: "Your brand or project name",
    areasLabel: "What should we review?",
    areasDescription: "Pick one or more.",
    linkLabel: "Link to review",
    linkPlaceholder: "Instagram, website or whatever you have",
    linkDescription: "No link? Tell us about it in the next question.",
    concernLabel: "What worries you most about your project today?",
    concernPlaceholder: "For example: I feel my brand doesn't look professional…",
    referralLabel: "How did you find us?",
    consentBefore: "I authorize The Tangerine Studio to process my data to answer this request, according to the ",
    consentLink: "data processing policy",
    consentAfter: ".",
    submit: "I want my review",
    submitWaitlist: "Let me know when spots open",
    requiredNote: "Fields marked with * are required.",
    errors: {
      required: "This field is required.",
      email: "Check your email, something seems missing (e.g. you@email.com).",
      phone: "Check the number, e.g. 300 123 4567.",
      areas: "Pick at least one option.",
      max: "500 characters max.",
      consent: "We need your authorization to answer you.",
    },
    sendError: "We couldn't send your request. What you wrote is still here, you can try again.",
    rateLimitError: "We got several submissions in a row from your connection. Wait a few minutes and try again.",
    sendErrorWhatsapp: "Or message us on WhatsApp",
    successTitle: (name) => `Done, ${name}! We'll message you on WhatsApp within 48 hours 🍊`,
    successWaitlistTitle: (name) => `Done, ${name}! You're on the waitlist 🍊`,
    successWaitlistBody: "We'll message you first when spots open.",
    successCta: "Meanwhile, see our projects",
    backToSite: "Go to website",
  },
};
