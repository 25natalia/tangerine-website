import type { CaseStudyData } from "@/lib/templates/case-study";
import type { Localized } from "@/lib/i18n/types";

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
// Aprendizajes, todas verificadas contra el texto real. `en` es la
// traducción de esa misma fuente.
export const simer: Localized<CaseStudyData> = {
  es: {
    slug: "simer",
    client: "SIMER",
    title: "Una identidad que no se sintiera clínica",
    category: "Brand Identity",
    year: "2025",
    services: ["Brand Identity"],
    duration: "2 semanas",
    heroPattern: "hoja",
    accent: "green",
    bannerVideo: { src: "/animations/banner-SIMER.mp4", poster: "/animations/banner-SIMER-poster.jpg" },

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

    visualIdentity: {
      intro: "Un lenguaje deliberadamente alejado de la iconografía médica tradicional — blancos clínicos, cruces, señalética hospitalaria.",
      colors: [
        { name: "Azul eléctrico", hex: "#3B5BFF", role: "Color primario" },
        { name: "Blanco grisáceo", hex: "#F4F6FA", role: "Color secundario" },
        { name: "Negro carbón", hex: "#1E1E1E", role: "Color neutro" },
        { name: "Azul claro", hex: "#A8C7FF", role: "Color complemento" },
        { name: "Rojo coral", hex: "#FF4E4E", role: "Color acento" },
        { name: "Verde lima", hex: "#C7FF4E", role: "Color complemento" },
      ],
      typography: [],
      video: { src: "/animations/paleta-SIMER.mp4", poster: "/animations/paleta-SIMER-poster.jpg" },
    },

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
      coverVideo: { src: "/animations/portada-UNA-NOCHE.mp4", poster: "/animations/portada-UNA-NOCHE-poster.jpg" },
    },
  },

  en: {
    slug: "simer",
    client: "SIMER",
    title: "An identity that didn't feel clinical",
    category: "Brand Identity",
    year: "2025",
    services: ["Brand Identity"],
    duration: "2 weeks",
    heroPattern: "hoja",
    accent: "green",
    bannerVideo: { src: "/animations/banner-SIMER.mp4", poster: "/animations/banner-SIMER-poster.jpg" },

    summary: [
      "SIMER is Icesi University's Emergency Medicine and Resuscitation student group. It needed a recognizable visual identity, able to set it apart from other university student groups, and to convey warmth, professionalism and youth without falling into the cold image usually associated with emergency medicine.",
      "The finding that defined the project wasn't about visual consistency, but about perception: many students associate the specialty with intense emotional weight before discovering its educational and community side. The identity had to correct that perception in every post, not just organize them.",
    ],

    info: [
      { label: "Client", value: "SIMER — Icesi University" },
      { label: "Year", value: "2025" },
      { label: "Duration", value: "2 weeks" },
      { label: "Team", value: "Natalia García, Emy Dorado" },
      { label: "Way of working", value: "Collaborative, no fixed roles" },
      { label: "Tools", value: "Figma → Canva" },
    ],

    challenge: {
      title: "The problem wasn't only visual",
      body: [
        "The student group's visual inconsistency, besides costing time on every post, was missing the chance to correct a mistaken perception: that emergency medicine is only urgency and emotional weight, with no room for learning and community.",
        "The strategy aimed to hold a tension instead of resolving it by picking a side: SIMER needed to look professional, because it's part of the medical field, but also approachable, because its real function is to attract students who are still exploring whether this specialty is for them.",
      ],
    },

    objectives: [
      "Set SIMER apart from other university student groups with a recognizable visual identity.",
      "Convey warmth, professionalism and youth at the same time, avoiding the cold image usually associated with emergency medicine.",
      "Build a system that's easy to maintain over time, backed by reusable templates that cut down production time for each post.",
    ],

    process: [
      { icon: "Search", title: "Discovery & immersion", description: "Worked together, in short, successive sessions, rather than as phases separated by days." },
      { icon: "Lightbulb", title: "Exploration & concept", description: "Both founders proposing and debating directions in real time, instead of splitting the work by specialty." },
      { icon: "Palette", title: "Visual system", description: "A language deliberately distanced from traditional medical iconography — clinical whites, crosses, hospital signage." },
      { icon: "Layers", title: "Templates & delivery", description: "Full adaptation to Canva so SIMER's team could keep using the system without depending on Tangerine." },
    ],

    research: {
      intro: "The most important finding of the immersion stage was that SIMER's problem wasn't only visual consistency, but perception of the specialty itself.",
      insights: [
        { title: "Perception before aesthetics", description: "Many students associate emergency medicine with intense emotional weight before discovering its educational and community side." },
        { title: "The cost of inconsistency", description: "Every post without a system didn't just take longer — it lost the chance to correct that perception." },
      ],
    },

    visualIdentity: {
      intro: "A language deliberately distanced from traditional medical iconography — clinical whites, crosses, hospital signage.",
      colors: [
        { name: "Electric blue", hex: "#3B5BFF", role: "Primary color" },
        { name: "Grayish white", hex: "#F4F6FA", role: "Secondary color" },
        { name: "Carbon black", hex: "#1E1E1E", role: "Neutral color" },
        { name: "Light blue", hex: "#A8C7FF", role: "Complementary color" },
        { name: "Coral red", hex: "#FF4E4E", role: "Accent color" },
        { name: "Lime green", hex: "#C7FF4E", role: "Complementary color" },
      ],
      typography: [],
      video: { src: "/animations/paleta-SIMER.mp4", poster: "/animations/paleta-SIMER-poster.jpg" },
    },

    mockups: ["branding", "merch"],

    beforeAfter: {
      before: { label: "Before", description: "Communication with no visual system at all, every piece designed from scratch." },
      after: { label: "After", description: "A complete identity, documented and ready to be maintained by the student group's own team, within a two-week timeframe." },
    },

    learnings: [
      {
        title: "Working without fixed roles",
        description: "With both founders involved at every stage, handoff time between separate roles disappeared — a real cost in a two-week process.",
      },
      {
        title: "The process compresses, it doesn't disappear",
        description: "The ten stages of the Creative Process can compress in time without disappearing: what changes under deadline pressure is how long each stage takes, never whether it happens.",
      },
    ],

    nextProject: {
      eyebrow: "Next project",
      title: "Una Noche",
      category: "Brand Identity",
      href: "/work/una-noche",
      pattern: "semillas",
      coverVideo: { src: "/animations/portada-UNA-NOCHE.mp4", poster: "/animations/portada-UNA-NOCHE-poster.jpg" },
    },
  },
};
