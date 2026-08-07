import type { CaseStudyData } from "@/lib/templates/case-study";
import type { Localized } from "@/lib/i18n/types";

// Fuente: Brand OS, Volumen X — Margarita Burgos. Proyecto en curso
// (cerrado hasta Sprint 02 al momento de este porteo) — por eso no incluye
// `impact` (no hay métricas reales medidas todavía) ni `beforeAfter` (el
// proceso sigue activo, no hay un "después" cerrado que describir). `en` es
// la traducción de la misma fuente.
export const margaritaBurgos: Localized<CaseStudyData> = {
  es: {
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
  },

  en: {
    slug: "margarita-burgos",
    client: "Margarita Burgos",
    title: "Wisdom as the symbol of good advice",
    category: "Personal Branding + Digital Ecosystem",
    year: "2025–2026",
    services: ["Personal Branding", "Automation"],
    duration: "6 sprints + ongoing support",
    heroPattern: "flor",
    accent: "purple",
    bannerVideo: { src: "/animations/banner-MB.mp4", poster: "/animations/banner-MB-poster.jpg" },

    summary: [
      "Margarita Burgos came to Tangerine needing to build a solid personal brand that represented her experience as an insurance advisor and set her apart in a sector marked by highly standardized communication.",
      "Market research confirmed the challenge: most brands in the sector rely on the same visual resources —blue palettes, shield iconography, houses, hands— that communicate safety but generate little recall and project a generic, interchangeable image.",
    ],

    info: [
      { label: "Client", value: "Margarita Burgos, Insurance Advisor" },
      { label: "Year", value: "2025 – 2026" },
      { label: "Duration", value: "6 sprints + ongoing support" },
      { label: "Team", value: "Natalia García, Emy Dorado" },
      { label: "Tools", value: "Figma → Framer → n8n → Google Sheets" },
      { label: "Status", value: "In progress" },
    ],

    challenge: {
      title: "Step away from the whole sector's blue",
      body: [
        "Although Margarita had experience and knowledge of the insurance sector, her communication didn't reflect the real value of her advisory work, nor did it build a differentiated perception against other professionals offering similar services.",
        "The lack of a consistent identity limited her brand's recognition and made every touchpoint depend solely on content, with no visual system behind it able to generate recall.",
      ],
    },

    objectives: [
      "Build a solid, memorable and differentiated personal brand within the insurance sector.",
      "Develop a coherent visual identity able to convey safety without relying on the sector's traditional codes.",
      "Create a web portfolio that works as the main platform for communication and client acquisition.",
      "Integrate visual identity and digital experience into a single brand ecosystem.",
    ],

    process: [
      { icon: "Search", title: "Sprint 01 — Findings & personal brand", description: "Research report, briefing and moodboard selection." },
      { icon: "Lightbulb", title: "Sprint 02 — Strategy & brand", description: "Automation flow, brand manual, brandboard and graphic pieces." },
      { icon: "Layers", title: "Sprint 03 — Marketing & content", description: "Social content plan and a guide for the automation's first version." },
      { icon: "Rocket", title: "Sprint 04 — Delivery & launch", description: "Final brand delivery, training, and launch of the first posts." },
    ],

    research: {
      intro: "The Colombian general insurance market is served by around 40 companies; the top 10 concentrate 75% of premiums issued.",
      insights: [
        { title: "A sector that competes on price, not clarity", description: "Clients of personal and voluntary products look for clarity and trust more than price — an opportunity against competitors who only compete on rate." },
        { title: "Advisors perceived as transactional", description: "Current independent advisors are seen as not very educational, with generic templates and manual management that loses sales from a lack of follow-up." },
      ],
    },

    visualIdentity: {
      intro: "The palette deliberately steps away from the sector's traditional blue tones: deep violet conveys sophistication and differentiation.",
      colors: [
        { name: "Deep violet", hex: "#3A22B2", role: "Primary color" },
        { name: "Light blue-gray", hex: "#E7ECF2", role: "Secondary color" },
        { name: "Black", hex: "#2C2C2C", role: "Neutral color" },
        { name: "Blue-violet", hex: "#5E5DF6", role: "Complementary color" },
        { name: "Lime green", hex: "#C7FF4E", role: "Complementary color" },
      ],
      typography: [
        { role: "Heading", family: "Champagne & Limousines — Bold", sample: "Mg" },
        { role: "Body", family: "Champagne & Limousines — Regular", sample: "Mg" },
      ],
      video: { src: "/animations/paleta-MB.mp4", poster: "/animations/paleta-MB-poster.jpg" },
    },

    mockups: ["desktop", "branding"],

    learnings: [
      {
        title: "Compare real options, not impose an ideal one",
        description: "Presenting the client with two automation tiers, with costs and results clearly compared, let Margarita make an informed decision without pressure, fitted to her real budget.",
      },
    ],

    nextProject: {
      eyebrow: "Next project",
      title: "Alegra Veneers Cali",
      category: "Web Design & Development",
      href: "/work/alegra-veneers-cali",
      pattern: "destello",
      coverVideo: { src: "/animations/portada-ALEGRA.mp4", poster: "/animations/portada-ALEGRA-poster.jpg" },
    },
  },
};
