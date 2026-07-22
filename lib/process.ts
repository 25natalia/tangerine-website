// Contenido nuevo, NO tomado del Brand OS — no existe una narrativa de
// proceso/metodología documentada todavía. Redactado a pedido explícito del
// usuario para "Cómo trabajamos" (ver DESIGN_SYSTEM_SYNC.md); tratarlo como
// borrador sujeto a su revisión, no como texto de marca ya validado.

export interface ProcessStep {
  slug: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    slug: "discover",
    title: "Descubrimos antes de diseñar",
    description:
      "Entendemos el problema real antes de proponer una sola pantalla: quién lo vive, por qué existe, qué se ha intentado antes.",
  },
  {
    slug: "design",
    title: "Diseñamos con intención",
    description: "Cada decisión visual responde a una razón concreta. Si no podemos explicarla, no la usamos.",
  },
  {
    slug: "build",
    title: "Construimos en colaboración",
    description: "El trabajo avanza junto a quien lo va a vivir después, no en aislamiento hasta el final.",
  },
  {
    slug: "test",
    title: "Probamos con usuarios",
    description: "Antes de dar algo por terminado, lo ponemos frente a personas reales y ajustamos con lo que vemos.",
  },
  {
    slug: "iterate",
    title: "Iteramos continuamente",
    description: "Ninguna primera versión es la definitiva. Mejoramos con lo que aprendemos en el camino.",
  },
  {
    slug: "deliver",
    title: "Entregamos sistemas, no pantallas",
    description: "Lo que dejamos atrás sigue funcionando sin nosotros: reglas y criterio, no un archivo cerrado.",
  },
];
