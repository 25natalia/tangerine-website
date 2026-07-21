import type { CaseStudyData } from "@/lib/templates/case-study";

// Fuente: Brand OS, Volumen VIII — SIMER.
//
// NOTA IMPORTANTE: las secciones "01 · Introducción" y "02 · Sobre el
// cliente" del Volumen VIII contienen, en el documento original, texto
// copiado por error del Volumen X (Margarita Burgos) — hablan de una
// "asesora de seguros", no del semillero de medicina de emergencias. Ese
// error queda señalado acá y NO se usó como fuente. Todo el contenido de
// este archivo sale de las secciones del Volumen VIII que sí son
// genuinamente sobre SIMER (05 en adelante) — Ficha técnica, Objetivos,
// Estrategia, Proceso, Hallazgos, Decisiones de diseño, Resultado y
// Aprendizajes, todas verificadas contra el texto real.
export const simer: CaseStudyData = {
  slug: "simer",
  client: "SIMER",
  title: "Una identidad que no se sintiera clínica",
  category: "Brand Identity",
  year: "2025",
  services: ["Brand Identity"],
  duration: "2 semanas",
  heroPattern: "hoja",
  accent: "green",

  summary: [
    "SIMER es el Semillero de Medicina de Emergencias y Reanimación de la Universidad Icesi. Necesitaba una identidad visual reconocible, capaz de diferenciarlo del resto de los semilleros universitarios, y de transmitir cercanía, profesionalismo y juventud sin caer en la imagen fría que suele asociarse a la medicina de emergencias.",
    "El hallazgo que definió el proyecto no fue de consistencia visual, sino de percepción: muchos estudiantes asocian la especialidad con una carga emocional intensa antes de descubrir su costado formativo y comunitario. La identidad tenía que corregir esa percepción en cada publicación, no solo ordenarlas.",
  ],

  info: [
    { label: "Cliente", value: "SIMER — Universidad Icesi" },
    { label: "Año", value: "2025" },
    { label: "Duración", value: "2 semanas" },
    { label: "Equipo", value: "Natalia García, Emy Dorado" },
    { label: "Forma de trabajo", value: "Colaborativa, sin roles fijos" },
    { label: "Herramientas", value: "Figma → Canva" },
  ],

  challenge: {
    title: "El problema no era solo visual",
    body: [
      "La inconsistencia visual del semillero, además de costar tiempo en cada publicación, estaba perdiendo la oportunidad de corregir una percepción equivocada: la de que la medicina de emergencias es únicamente urgencia y carga emocional, sin lugar para el aprendizaje y la comunidad.",
      "La estrategia buscó sostener una tensión en vez de resolverla eligiendo un lado: SIMER necesitaba verse profesional, porque forma parte del ámbito médico, pero también cercana, porque su función real es atraer estudiantes que todavía están explorando si esta especialidad es para ellos.",
    ],
  },

  objectives: [
    "Diferenciar a SIMER del resto de los semilleros universitarios con una identidad visual reconocible.",
    "Transmitir cercanía, profesionalismo y juventud a la vez, evitando la imagen fría habitualmente asociada a la medicina de emergencias.",
    "Construir un sistema fácil de mantener en el tiempo, apoyado en plantillas reutilizables que redujeran el tiempo de producción de cada publicación.",
  ],

  process: [
    { icon: "Search", title: "Descubrimiento e inmersión", description: "Trabajados en conjunto, en sesiones cortas y sucesivas, en vez de como fases separadas por días de diferencia." },
    { icon: "Lightbulb", title: "Exploración y concepto", description: "Ambas fundadoras proponiendo y debatiendo direcciones en tiempo real, en vez de dividir el trabajo por especialidad." },
    { icon: "Palette", title: "Sistema visual", description: "Un lenguaje deliberadamente alejado de la iconografía médica tradicional — blancos clínicos, cruces, señalética hospitalaria." },
    { icon: "Layers", title: "Plantillas y entrega", description: "Adaptación completa a Canva para que el equipo de SIMER pudiera seguir usando el sistema sin depender de Tangerine." },
  ],

  research: {
    intro: "El hallazgo más importante de la etapa de inmersión fue que el problema de SIMER no era únicamente de consistencia visual, sino de percepción de la especialidad misma.",
    insights: [
      { title: "Percepción antes que estética", description: "Muchos estudiantes asocian la medicina de emergencias con una carga emocional intensa antes de descubrir su costado formativo y comunitario." },
      { title: "El costo de la inconsistencia", description: "Cada publicación sin sistema no solo tomaba más tiempo — perdía la oportunidad de corregir esa percepción." },
    ],
  },

  gallery: [
    { pattern: "hoja", caption: "Sistema de plantillas para Instagram — anuncios, contenido educativo, cobertura de actividades.", accent: "green" },
    { pattern: "semillas", caption: "Brand Sheet — referencia rápida de logo, colores y tipografía para cualquier miembro de SIMER.", accent: "gold" },
  ],

  mockups: ["branding", "merch"],

  beforeAfter: {
    before: { label: "Antes", description: "Comunicación sin ningún sistema visual, cada pieza diseñada desde cero." },
    after: { label: "Después", description: "Identidad completa, documentada y lista para ser mantenida por el propio equipo del semillero, en un plazo de dos semanas." },
  },

  learnings: [
    {
      title: "Trabajar sin roles fijos",
      description: "Con ambas fundadoras involucradas en cada etapa, eliminó el tiempo de traspaso de información entre roles separados — un costo real en un proceso de dos semanas.",
    },
    {
      title: "El proceso se comprime, no se elimina",
      description: "Las diez etapas del Creative Process pueden comprimirse en el tiempo sin eliminarse: lo que cambia bajo presión de plazo es la duración de cada etapa, nunca su existencia.",
    },
  ],

  nextProject: {
    eyebrow: "Siguiente proyecto",
    title: "Una Noche",
    category: "Brand Identity",
    href: "/work/una-noche",
    pattern: "semillas",
  },
};
