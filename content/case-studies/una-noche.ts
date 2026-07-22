import type { CaseStudyData } from "@/lib/templates/case-study";

// Fuente: Brand OS, Volumen IX — Una Noche.
export const unaNoche: CaseStudyData = {
  slug: "una-noche",
  client: "Una Noche",
  title: "Un símbolo, no un logo",
  category: "Brand Identity",
  year: "2025",
  services: ["Brand Identity"],
  duration: "No especificada en la documentación original",
  heroPattern: "semillas",
  accent: "tangerine",
  bannerVideo: { src: "/animations/banner-UNA-NOCHE.mp4", poster: "/animations/banner-UNA-NOCHE-poster.jpg" },

  summary: [
    "Una Noche llegó a Tangerine sin ninguna identidad previa que heredar: una marca todavía por nacer visualmente, con una ambición mucho más grande que la de organizar eventos. Su intención real es construir una comunidad alrededor de la música, la creatividad, la cultura y el estilo de vida — no solo vender entradas.",
    "El reto tenía dos capas: construir una identidad completa desde cero, sin ningún activo visual previo del cual partir, y lograr que esa identidad transmitiera pertenencia real, no solamente asistencia a un evento puntual.",
  ],

  info: [
    { label: "Cliente", value: "Una Noche" },
    { label: "Año", value: "2025" },
    { label: "Servicios", value: "Brand Identity" },
    { label: "Equipo", value: "Natalia García, Emy Dorado" },
    { label: "Herramientas", value: "Figma → Canva" },
    { label: "Estado", value: "Entregado" },
  ],

  challenge: {
    title: "Inspirarse en el mecanismo, no en el resultado",
    body: [
      "El punto de partida de la estrategia fue una pregunta, no una respuesta: ¿qué es, exactamente, lo que hace que una comunidad como la de Nude Project se sienta real? La respuesta no estaba en su paleta de colores ni en su tipografía. Estaba en tener un símbolo compartido, algo reconocible y apropiable que sus miembros pudieran llevar puesto, mostrar y usar como señal de pertenencia.",
      "Una Noche no vende ropa como producto principal, así que ese mecanismo no podía trasladarse literalmente. Necesitaba su propio símbolo — y de ahí nació la decisión de construir la identidad alrededor de un elemento capaz de encarnar esa idea de forma inmediata: el dado.",
    ],
  },

  objectives: [
    "Construir una identidad con mucha personalidad, que transmitiera juventud y creatividad, memorable en un mercado donde las marcas de eventos se parecen entre sí.",
    "Evitar, de forma explícita, la estética de empresa tradicional de eventos.",
    "Construir un sistema lo suficientemente flexible para convivir entre eventos, ropa, contenido y productos que todavía no existían al momento del proyecto.",
    "Inspirarse en el sentimiento que genera Nude Project — comunidad, autenticidad, pertenencia — sin replicar su identidad visual.",
  ],

  process: [
    { icon: "Search", title: "Inmersión", description: "Análisis deliberado del mecanismo detrás de Nude Project — no de su estética, sino de por qué genera pertenencia — para evitar terminar copiando su resultado." },
    { icon: "Lightbulb", title: "Exploración", description: "Se descartaron direcciones que dependían exclusivamente de tipografía o paleta, por no ofrecer la misma capacidad de convertirse en un objeto físico compartible." },
    { icon: "Palette", title: "El dado como concepto", description: "Un elemento capaz de encarnar incertidumbre, movimiento y juego — coherente con lo que el propio nombre de la marca ya sugiere." },
    { icon: "Layers", title: "Sistema y entrega", description: "Logos, patrones, mockups y templates adaptados a Canva, organizados para que un recurso nuevo se incorpore sin reconstruir el sistema." },
  ],

  research: {
    intro: "La fuerza de una marca como Nude Project no está en lo que vende, sino en lo que sus miembros pueden mostrar.",
    insights: [
      { title: "Objeto, no solo imagen", description: "Una identidad puramente digital, sin un elemento capaz de trascender la pantalla, difícilmente iba a construir el mismo sentido de pertenencia que Una Noche buscaba." },
      { title: "Flexibilidad como requisito", description: "Cualquier elemento central tenía que poder viajar entre formatos digitales, físicos y futuros sin perder coherencia." },
    ],
  },

  // Mismo criterio que en simer.ts: colores y jerarquía extraídos
  // directamente del video real de paleta del proyecto, sin typography
  // documentada que citar.
  visualIdentity: {
    intro: "Rojo vino profundo como color primario, acompañado de un crema cálido y un neutro casi negro — la misma tensión entre seriedad y calidez que sostiene al dado como símbolo.",
    colors: [
      { name: "Rojo vino", hex: "#A41414", role: "Color primario" },
      { name: "Crema cálido", hex: "#FFF5E6", role: "Color secundario" },
      { name: "Negro", hex: "#0C0C0C", role: "Color neutro" },
      { name: "Gris cálido", hex: "#9D918C", role: "Color complemento" },
    ],
    typography: [],
    video: { src: "/animations/paleta-UNA-NOCHE.mp4", poster: "/animations/paleta-UNA-NOCHE-poster.jpg" },
  },

  gallery: [
    { pattern: "semillas", caption: "El dado como elemento gráfico independiente — logotipo, patrones y aplicaciones.", accent: "tangerine" },
    { pattern: "flor", caption: "Patrones 01 y 02, derivados del mismo concepto del dado.", accent: "purple" },
  ],

  mockups: ["merch", "branding"],

  beforeAfter: {
    before: { label: "Antes", description: "Ningún activo visual: sin logo previo que evolucionar, sin paleta instalada en la memoria de ninguna audiencia." },
    after: { label: "Después", description: "Un sistema de identidad completo, flexible, con un símbolo propio y defendible —el dado— capaz de sostener la marca a través de eventos, contenido digital y futuras aplicaciones físicas." },
  },

  learnings: [
    {
      title: "Copiar el resultado no es lo mismo que entender el mecanismo",
      description: "Nude Project no aportó ninguna decisión estética a este proyecto; aportó una pregunta —¿qué símbolo puede compartir esta comunidad?— que Una Noche respondió con un elemento completamente propio.",
    },
  ],

  nextProject: {
    eyebrow: "Siguiente proyecto",
    title: "Margarita Burgos",
    category: "Personal Branding",
    href: "/work/margarita-burgos",
    pattern: "flor",
  },
};
