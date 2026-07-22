// Plain configuration for the Contact Template — deliberately not a
// prop-driven "ContactData" model like Case Study/Portfolio. Those two
// template arbitrary future work; this template mirrors Tangerine Studio's
// own real intake process (its project types, budget tiers, questions), so
// treating it as generic swappable data would document a flexibility this
// template was never asked to have. See the README's "Por qué esto no es
// un modelo genérico" section.

export interface ProjectTypeOption {
  value: string;
  label: string;
  icon: "palette" | "layout" | "smartphone" | "component" | "cart" | "pen" | "sparkles";
}

export interface ChoiceOption {
  value: string;
  label: string;
  description?: string;
}

export const projectTypeOptions: ProjectTypeOption[] = [
  { value: "branding", label: "Branding e identidad", icon: "palette" },
  { value: "landing", label: "Landing page", icon: "layout" },
  { value: "product", label: "Producto digital", icon: "smartphone" },
  { value: "design-system", label: "Design system", icon: "component" },
  { value: "ecommerce", label: "E-commerce", icon: "cart" },
  { value: "ux-ui", label: "UX / UI", icon: "pen" },
  { value: "other", label: "Otro", icon: "sparkles" },
];

// Montos en pesos colombianos (COP) — Tangerine Studio factura en COP, no en
// USD, así que el propio selector debe decirlo explícito en vez de dejarlo
// implícito en un número solo.
export const budgetOptions: ChoiceOption[] = [
  { value: "1-3m", label: "COP $1.000.000 – $3.000.000", description: "Proyecto acotado, alcance definido." },
  { value: "3-8m", label: "COP $3.000.000 – $8.000.000", description: "El rango más frecuente para un proyecto completo." },
  { value: "8-15m", label: "COP $8.000.000 – $15.000.000", description: "Alcance amplio, varios entregables." },
  { value: "15m-plus", label: "COP $15.000.000+", description: "Proyecto integral o de largo plazo." },
  { value: "not-sure", label: "Aún no estoy seguro", description: "Podemos definirlo juntos en la primera charla." },
];

export const timelineOptions: ChoiceOption[] = [
  { value: "asap", label: "Lo antes posible" },
  { value: "1-month", label: "En el próximo mes" },
  { value: "2-3-months", label: "En 2–3 meses" },
  { value: "flexible", label: "Soy flexible con los tiempos" },
];

export const referralOptions: ChoiceOption[] = [
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Recomendación de alguien" },
  { value: "search", label: "Google / búsqueda" },
  { value: "portfolio", label: "Otro estudio o portfolio" },
  { value: "event", label: "Un evento o charla" },
  { value: "other", label: "Otro" },
];

export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { title: "Conversación inicial", description: "Escuchamos el proyecto antes de proponer nada." },
  { title: "Propuesta a medida", description: "Alcance, tiempos y presupuesto claros, por escrito." },
  { title: "Kickoff", description: "Arrancamos con el equipo completo, no con un solo diseñador." },
  { title: "Entregas y seguimiento", description: "Avances visibles, sin sorpresas al final." },
];

export interface Benefit {
  title: string;
  icon: "users" | "shield" | "lightbulb";
}

export const benefits: Benefit[] = [
  { title: "Un solo equipo, de principio a fin", icon: "users" },
  { title: "Procesos claros, sin sorpresas", icon: "shield" },
  { title: "Diseño con criterio, no solo estética", icon: "lightbulb" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "¿Cuánto tarda un proyecto?",
    answer:
      "Depende del alcance — una landing page puede tomar 2–3 semanas; un design system completo, varios meses. En la propuesta inicial definimos un cronograma real, no una estimación genérica.",
  },
  {
    question: "¿Cómo trabajan?",
    answer:
      "En ciclos cortos con entregas visibles: nunca desaparecemos varias semanas para volver con un resultado inesperado. Cada etapa tiene un punto de revisión antes de seguir a la siguiente.",
  },
  {
    question: "¿Cómo son los pagos?",
    answer:
      "Un anticipo para arrancar y el resto dividido en hitos asociados a entregables concretos — nunca 100% por adelantado, nunca 100% al final.",
  },
  {
    question: "¿Trabajan internacionalmente?",
    answer:
      "Sí — trabajamos de forma remota con clientes en distintas zonas horarias, coordinando horarios de sincronización que funcionen para ambos equipos.",
  },
];

// Contenido de demo, no clientes reales de Tangerine Studio — igual que el
// resto de este archivo, pero acá vale la pena decirlo explícito: un
// nombre de cliente y una cita de testimonio son afirmaciones de hecho, no
// solo copy de relleno. Un consumidor real casi nunca tiene, el día uno, un
// testimonio real que reemplace este — usar
// `<ContactTemplate showSocialProof={false} />` en vez de publicar estos
// nombres o esta cita como si fueran reales.
export interface SocialProofClient {
  name: string;
}

export const socialProofClients: SocialProofClient[] = [
  { name: "Estudio Nébula" },
  { name: "Fintech Co." },
  { name: "Vista Realty" },
  { name: "Aurora Labs" },
  { name: "Onda Studio" },
  { name: "Norte Arquitectura" },
];

export const testimonial = {
  quote:
    "Nos ayudaron a entender el problema antes de diseñar nada. Eso cambió por completo el resultado final.",
  author: "Julia Fernández",
  role: "Fundadora, Estudio Nébula",
};
