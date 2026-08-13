import type { CaseStudyData } from "@/lib/templates/case-study";
import type { Localized } from "@/lib/i18n/types";

// Fuente: Brand OS, Volumen XI — Alegra Veneers Cali. `es` es la cita
// literal del documento original; `en` es su traducción — todo lo que no es
// idioma (slug, hex, video, pattern, accent, iconos) se repite igual en
// ambas versiones a propósito, no se re-declara por separado.
export const alegraVeneersCali: Localized<CaseStudyData> = {
  es: {
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
    heroImage: "/recursos-proyectos/alegra/Portada.svg",
    intent: "Un sitio bilingüe pensado para convertir visitantes internacionales en pacientes.",

    summary: [
      "El proyecto consistió en el rediseño, estructuración y desarrollo completo de una nueva página web para la clínica odontológica Alegra, con un enfoque orientado a la captación de pacientes internacionales, principalmente de Estados Unidos, sin dejar de atender el mercado colombiano.",
      "Más que una página corporativa, el encargo fue construir una plataforma comercial que funcionara como herramienta de ventas, posicionamiento y generación de confianza para convertir visitantes en pacientes.",
    ],

    info: [
      { label: "Cliente", value: "Alegra Veneers Cali" },
      { label: "Duración", value: "4 semanas" },
      { label: "Herramientas", value: "Framer, Google Ads, Soro, Clarity" },
    ],

    challenge: {
      color: "#001321",
      colorDark: "#1F95DE",
      title: "Vender una transformación, no un tratamiento",
      body: [
        "La página anterior de la clínica presentaba información básica pensada para un público local y no reflejaba la propuesta de valor real de Alegra frente al mercado internacional.",
        "El reto consistía en transformar por completo esa presencia digital para atraer pacientes extranjeros, generar confianza desde el primer contacto, mostrar resultados reales y comunicar la experiencia humana del servicio, sin vender únicamente tratamientos odontológicos, sino una transformación de vida a través de una experiencia integral.",
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
      { icon: "Palette", title: "Diseño visual", description: "Dirección oscura con acentos en celeste brillante: estética premium y aspiracional." },
      { icon: "Code2", title: "Desarrollo y optimización", description: "Funcionalidades, integración de reseñas de Google, y optimización para campañas pagas." },
    ],

    research: {
      eyebrow: "Investigación",
      intro: "El 80% del público es de Estados Unidos, compara precios y revisa reseñas antes de viajar; el 20% restante es colombiano.",
      insights: [
        { title: "La seguridad como objeción principal", description: "La seguridad de viajar a Cali surgió como una de las principales objeciones del paciente extranjero, lo que llevó a dedicarle contenido propio dentro del sitio." },
        { title: "Compite con destinos ya posicionados", description: "Alegra compite como destino de turismo dental frente a México y Turquía, lo que reforzó la necesidad de comparativos de costo y contenido que justifique 'por qué Cali'." },
      ],
    },

    galleryLabel: { eyebrow: "El website" },
    gallery: [
      {
        image: "/recursos-proyectos/alegra/desktop-1.png",
        fit: "contain",
        caption: "La home, en escritorio.",
      },
      {
        image: "/recursos-proyectos/alegra/tablet-1.png",
        fit: "contain",
        caption: "Antes y después, en tablet.",
      },
      {
        image: "/recursos-proyectos/alegra/phone-1.png",
        fit: "contain",
        caption: "Historias reales, en celular.",
      },
      {
        image: "/recursos-proyectos/alegra/phone-2.png",
        fit: "contain",
        caption: "La home, en celular.",
      },
    ],

    beforeAfter: {
      before: { label: "Antes", description: "Página con información básica pensada para un público local, sin enfoque en captación internacional." },
      after: { label: "Después", description: "Sitio bilingüe completo, en producción, con cinco secciones (Home, Testimonies, Services, Dental Experience, Book a videocall) diseñadas para convertir visitantes internacionales en pacientes." },
    },

    outcome:
      "Un sitio bilingüe en producción, con cinco secciones diseñadas para convertir visitantes internacionales en pacientes.",

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
  },

  en: {
    slug: "alegra-veneers-cali",
    client: "Alegra Veneers Cali",
    title: "Your 5-day smile transformation",
    category: "Web Design & Development",
    year: "2026",
    services: ["Web Design", "Development"],
    duration: "4 weeks",
    heroPattern: "destello",
    accent: "info",
    liveUrl: "https://alegraveneerscali.com/",
    heroImage: "/recursos-proyectos/alegra/Portada.svg",
    intent: "A bilingual site built to turn international visitors into patients.",

    summary: [
      "The project consisted of the redesign, restructuring and complete development of a new website for Alegra dental clinic, focused on attracting international patients, mainly from the United States, while still serving the Colombian market.",
      "More than a corporate page, the brief was to build a commercial platform that worked as a sales, positioning and trust-building tool to convert visitors into patients.",
    ],

    info: [
      { label: "Client", value: "Alegra Veneers Cali" },
      { label: "Duration", value: "4 weeks" },
      { label: "Tools", value: "Framer, Google Ads, Soro, Clarity" },
    ],

    challenge: {
      color: "#001321",
      colorDark: "#1F95DE",
      title: "Sell a transformation, not a treatment",
      body: [
        "The clinic's previous page presented basic information aimed at a local audience and didn't reflect Alegra's real value proposition for the international market.",
        "The challenge was to completely transform that digital presence to attract foreign patients, build trust from the first contact, show real results, and communicate the human side of the service, not selling dental treatments alone, but a life transformation through a complete experience.",
      ],
    },

    objectives: [
      "Completely redesign the site's visual experience.",
      "Prioritize the treatments with the highest international demand (crowns, veneers, implants, All-on-4/6).",
      "Position Alegra as a dental tourism benchmark against already-established destinations like Mexico and Turkey.",
      "Optimize the site for Google and Meta Ads campaigns, and make navigation in Spanish and English seamless.",
    ],

    process: [
      { icon: "Search", title: "Research & strategy", description: "Target audience, service prioritization and value proposition defined before touching the design." },
      { icon: "Layers", title: "Site architecture", description: "Wireframes organized around the patient's actual journey, not a generic list of services." },
      { icon: "Palette", title: "Visual design", description: "Dark direction with bright sky-blue accents: a premium, aspirational aesthetic." },
      { icon: "Code2", title: "Development & optimization", description: "Functionality, Google reviews integration, and optimization for paid campaigns." },
    ],

    research: {
      eyebrow: "Research",
      intro: "80% of the audience is from the United States, compares prices and checks reviews before traveling; the remaining 20% is Colombian.",
      insights: [
        { title: "Safety as the main objection", description: "The safety of traveling to Cali came up as one of the main objections from international patients, which led to dedicating its own content to it within the site." },
        { title: "Competes with already-positioned destinations", description: "Alegra competes as a dental tourism destination against Mexico and Turkey, which reinforced the need for cost comparisons and content that justifies 'why Cali'." },
      ],
    },

    galleryLabel: { eyebrow: "The website" },
    gallery: [
      {
        image: "/recursos-proyectos/alegra/desktop-1.png",
        fit: "contain",
        caption: "The homepage, on desktop.",
      },
      {
        image: "/recursos-proyectos/alegra/tablet-1.png",
        fit: "contain",
        caption: "Before and after, on tablet.",
      },
      {
        image: "/recursos-proyectos/alegra/phone-1.png",
        fit: "contain",
        caption: "Real stories, on mobile.",
      },
      {
        image: "/recursos-proyectos/alegra/phone-2.png",
        fit: "contain",
        caption: "The homepage, on mobile.",
      },
    ],

    beforeAfter: {
      before: { label: "Before", description: "A page with basic information aimed at a local audience, with no focus on international acquisition." },
      after: { label: "After", description: "A complete bilingual site, in production, with five sections (Home, Testimonies, Services, Dental Experience, Book a videocall) designed to convert international visitors into patients." },
    },

    outcome:
      "A complete bilingual site in production, with five sections designed to convert international visitors into patients.",

    learnings: [
      {
        title: "The patient journey as structure",
        description: "Structuring the site directly around the patient's real journey instead of a conventional service list made it possible to translate a complex logistical process into a simple, visual brand promise.",
      },
    ],

    liveSite: {
      title: "Explore the live site",
      description:
        "The site is in production, serving real Google and Meta Ads campaigns aimed at international patients. Visit it to see the full system in real context, not just in screenshots.",
    },

    nextProject: {
      eyebrow: "Next project",
      title: "QuickBite",
      category: "Concept Proposal",
      href: "/work/quickbite",
      pattern: "hoja",
      coverVideo: { src: "/animations/portada-QUICKBITE.mp4", poster: "/animations/portada-QUICKBITE-poster.jpg" },
    },
  },
};
