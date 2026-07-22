import type { CaseStudyData } from "@/lib/templates/case-study";

// Fuente: Brand OS, Volumen XI — Alegra Veneers Cali.
export const alegraVeneersCali: CaseStudyData = {
  slug: "alegra-veneers-cali",
  client: "Alegra Veneers Cali",
  title: "Your 5-day smile transformation",
  category: "Diseño y Desarrollo Web",
  year: "2026",
  services: ["Diseño Web", "Desarrollo"],
  duration: "4 semanas",
  heroPattern: "destello",
  accent: "info",
  liveUrl: "https://alegraveneerscali.com/",
  bannerVideo: { src: "/animations/banner-ALEGRA.mp4", poster: "/animations/banner-ALEGRA-poster.jpg" },

  summary: [
    "El proyecto consistió en el rediseño, estructuración y desarrollo completo de una nueva página web para la clínica odontológica Alegra, con un enfoque orientado a la captación de pacientes internacionales —principalmente de Estados Unidos— sin dejar de atender el mercado colombiano.",
    "Más que una página corporativa, el encargo fue construir una plataforma comercial que funcionara como herramienta de ventas, posicionamiento y generación de confianza para convertir visitantes en pacientes.",
  ],

  info: [
    { label: "Cliente", value: "Alegra Veneers Cali" },
    { label: "Año", value: "2026" },
    { label: "Duración", value: "4 semanas" },
    { label: "Equipo", value: "Natalia García, Emy Dorado" },
    { label: "Herramientas", value: "Framer → Google Sheets" },
    { label: "Estado", value: "Entregado — sitio en producción" },
  ],

  challenge: {
    title: "Vender una transformación, no un tratamiento",
    body: [
      "La página anterior de la clínica presentaba información básica pensada para un público local y no reflejaba la propuesta de valor real de Alegra frente al mercado internacional.",
      "El reto consistía en transformar por completo esa presencia digital para atraer pacientes extranjeros, generar confianza desde el primer contacto, mostrar resultados reales y comunicar la experiencia humana del servicio — sin vender únicamente tratamientos odontológicos, sino una transformación de vida a través de una experiencia integral.",
    ],
  },

  objectives: [
    "Rediseñar por completo la experiencia visual del sitio.",
    "Priorizar los tratamientos con mayor demanda internacional (coronas, carillas, implantes, All-on-4/6).",
    "Posicionar a Alegra como referente en turismo dental frente a destinos ya establecidos como México y Turquía.",
    "Optimizar el sitio para campañas de Google y Meta Ads, y facilitar la navegación en español e inglés.",
  ],

  process: [
    { icon: "Search", title: "Investigación y estrategia", description: "Público objetivo, priorización de servicios y propuesta de valor definidos antes de tocar el diseño." },
    { icon: "Layers", title: "Arquitectura del sitio", description: "Wireframes organizados alrededor del recorrido real del paciente, no de un listado genérico de servicios." },
    { icon: "Palette", title: "Diseño visual", description: "Dirección oscura con acentos en celeste brillante — estética premium y aspiracional." },
    { icon: "Code2", title: "Desarrollo y optimización", description: "Funcionalidades, integración de reseñas de Google, y optimización para campañas pagas." },
  ],

  research: {
    intro: "El 80% del público es de Estados Unidos, compara precios y revisa reseñas antes de viajar; el 20% restante es colombiano.",
    insights: [
      { title: "La seguridad como objeción principal", description: "La seguridad de viajar a Cali surgió como una de las principales objeciones del paciente extranjero, lo que llevó a dedicarle contenido propio dentro del sitio." },
      { title: "Compite con destinos ya posicionados", description: "Alegra compite como destino de turismo dental frente a México y Turquía, lo que reforzó la necesidad de comparativos de costo y contenido que justifique 'por qué Cali'." },
    ],
  },

  visualIdentity: {
    intro: "Fondo oscuro como base de toda la interfaz; el azul brillante funciona como color de acento en CTAs e íconos.",
    colors: [
      { name: "Azul marino oscuro", hex: "#001321", role: "Fondo principal" },
      { name: "Azul brillante", hex: "#1F95DE", role: "Acento / CTAs" },
      { name: "Blanco azulado", hex: "#F7FDFF", role: "Superficie clara" },
    ],
    typography: [{ role: "Título y cuerpo", family: "Urbanist", sample: "Aa" }],
    video: { src: "/animations/paleta-ALEGRA.mp4", poster: "/animations/paleta-ALEGRA-poster.jpg" },
  },

  mockups: ["desktop", "tablet", "mobile"],

  beforeAfter: {
    before: { label: "Antes", description: "Página con información básica pensada para un público local, sin enfoque en captación internacional." },
    after: { label: "Después", description: "Sitio bilingüe completo, en producción, con cinco secciones (Home, Testimonies, Services, Dental Experience, Book a videocall) diseñadas para convertir visitantes internacionales en pacientes." },
  },

  learnings: [
    {
      title: "El recorrido del paciente como estructura",
      description: "Estructurar el sitio directamente alrededor del recorrido real del paciente en lugar de un listado convencional de servicios permitió traducir un proceso logístico complejo en una promesa de marca simple y visual.",
    },
  ],

  liveSite: {
    title: "Explora el sitio en vivo",
    description:
      "El sitio está en producción, sirviendo campañas reales de Google y Meta Ads orientadas a pacientes internacionales. Visítalo para ver el sistema completo en contexto real, no solo en capturas.",
  },

  nextProject: {
    eyebrow: "Siguiente proyecto",
    title: "QuickBite",
    category: "Concept Proposal",
    href: "/work/quickbite",
    pattern: "hoja",
    coverVideo: { src: "/animations/portada-QUICKBITE.mp4", poster: "/animations/portada-QUICKBITE-poster.jpg" },
  },
};
