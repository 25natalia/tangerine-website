import type { CaseStudyData } from "@/lib/templates/case-study";

// Fuente: Brand OS, Volumen X — Margarita Burgos. Proyecto en curso
// (cerrado hasta Sprint 02 al momento de este porteo) — por eso no incluye
// `impact` (no hay métricas reales medidas todavía) ni `beforeAfter` (el
// proceso sigue activo, no hay un "después" cerrado que describir).
export const margaritaBurgos: CaseStudyData = {
  slug: "margarita-burgos",
  client: "Margarita Burgos",
  title: "La sabiduría como símbolo de una buena asesoría",
  category: "Personal Branding + Ecosistema Digital",
  year: "2025–2026",
  services: ["Personal Branding", "Automatización"],
  duration: "6 sprints + acompañamiento",
  heroPattern: "flor",
  accent: "purple",
  bannerVideo: { src: "/animations/banner-MB.mp4", poster: "/animations/banner-MB-poster.jpg" },

  summary: [
    "Margarita Burgos llegó a Tangerine con la necesidad de construir una marca personal sólida que representara su experiencia como asesora de seguros y la diferenciara en un sector caracterizado por una comunicación altamente estandarizada.",
    "La investigación de mercado confirmó el reto: la mayoría de marcas del sector recurre a los mismos recursos visuales —paletas azules, iconografía de escudos, casas, manos— que comunican seguridad pero generan poca recordación y proyectan una imagen genérica e intercambiable.",
  ],

  info: [
    { label: "Cliente", value: "Margarita Burgos, Asesora de Seguros" },
    { label: "Año", value: "2025 – 2026" },
    { label: "Duración", value: "6 sprints + acompañamiento" },
    { label: "Equipo", value: "Natalia García, Emy Dorado" },
    { label: "Herramientas", value: "Figma → Framer → n8n → Google Sheets" },
    { label: "Estado", value: "En curso" },
  ],

  challenge: {
    title: "Alejarse del azul de todo el sector",
    body: [
      "Aunque Margarita contaba con experiencia y conocimiento del sector asegurador, su comunicación no reflejaba el valor real de su asesoría ni construía una percepción diferenciada frente a otros profesionales que ofrecen servicios similares.",
      "La ausencia de una identidad consistente limitaba el reconocimiento de su marca y hacía que cada punto de contacto dependiera únicamente del contenido, sin el respaldo de un sistema visual capaz de generar recordación.",
    ],
  },

  objectives: [
    "Construir una marca personal sólida, memorable y diferenciada dentro del sector asegurador.",
    "Desarrollar una identidad visual coherente capaz de transmitir seguridad sin recurrir a los códigos tradicionales del sector.",
    "Crear un portafolio web que funcione como principal plataforma de comunicación y captación de clientes.",
    "Integrar identidad visual y experiencia digital en un único ecosistema de marca.",
  ],

  process: [
    { icon: "Search", title: "Sprint 01 — Hallazgos y marca personal", description: "Informe de investigación, briefing y selección de moodboard." },
    { icon: "Lightbulb", title: "Sprint 02 — Estrategia y marca", description: "Flujo de automatización, manual de marca, brandboard y piezas gráficas." },
    { icon: "Layers", title: "Sprint 03 — Marketing y contenido", description: "Plan de contenido para redes y guía de la primera versión de la automatización." },
    { icon: "Rocket", title: "Sprint 04 — Entrega y puesta en marcha", description: "Entrega final de marca, capacitación y lanzamiento de las primeras publicaciones." },
  ],

  research: {
    intro: "El mercado colombiano de seguros generales es atendido por cerca de 40 compañías; las 10 mayores concentran el 75% de las primas emitidas.",
    insights: [
      { title: "Un sector que compite por precio, no por claridad", description: "Los clientes de productos personales y voluntarios buscan claridad y confianza más que precio — una oportunidad frente a competidores que solo compiten en tarifa." },
      { title: "Asesores percibidos como transaccionales", description: "Los asesores independientes actuales son vistos como poco educativos, con plantillas genéricas y gestión manual que pierde ventas por falta de seguimiento." },
    ],
  },

  visualIdentity: {
    intro: "La paleta se aleja deliberadamente de los tonos azules tradicionales del sector: el violeta profundo transmite sofisticación y diferenciación.",
    colors: [
      { name: "Violeta profundo", hex: "#3A22B2", role: "Color primario" },
      { name: "Gris azulado claro", hex: "#E7ECF2", role: "Color secundario" },
      { name: "Negro", hex: "#2C2C2C", role: "Color neutro" },
      { name: "Azul-violeta", hex: "#5E5DF6", role: "Color complemento" },
      { name: "Verde lima", hex: "#C7FF4E", role: "Color complemento" },
    ],
    typography: [
      { role: "Título", family: "Champagne & Limousines — Bold", sample: "Mg" },
      { role: "Cuerpo", family: "Champagne & Limousines — Regular", sample: "Mg" },
    ],
    video: { src: "/animations/paleta-MB.mp4", poster: "/animations/paleta-MB-poster.jpg" },
  },

  mockups: ["desktop", "branding"],

  learnings: [
    {
      title: "Comparar opciones reales, no imponer una ideal",
      description: "Presentar al cliente dos niveles de automatización con costos y resultados claramente comparados permitió que Margarita tomara una decisión informada y sin presión, ajustada a su presupuesto real.",
    },
  ],

  nextProject: {
    eyebrow: "Siguiente proyecto",
    title: "Alegra Veneers Cali",
    category: "Diseño y Desarrollo Web",
    href: "/work/alegra-veneers-cali",
    pattern: "destello",
    coverVideo: { src: "/animations/portada-ALEGRA.mp4", poster: "/animations/portada-ALEGRA-poster.jpg" },
  },
};
