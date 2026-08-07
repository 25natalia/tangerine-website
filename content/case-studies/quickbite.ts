import type { CaseStudyData } from "@/lib/templates/case-study";
import type { Localized } from "@/lib/i18n/types";

// Fuente: Brand OS, Volumen XII — QuickBite. Es un Concept Proposal (no un
// cliente real) — por eso no incluye `beforeAfter` (no hay un "antes" real
// que describir) ni `impact` (no hay métricas medidas, solo un impacto
// esperado, y ese "esperado" no es el tipo de dato que este campo pide).
// `en` es la traducción de la misma fuente.
export const quickbite: Localized<CaseStudyData> = {
  es: {
    slug: "quickbite",
    client: "QuickBite (proyecto conceptual)",
    title: "Comprar saludable no debería tomar más tiempo",
    category: "Concept Proposal — Identidad + E-commerce",
    year: "2026",
    services: ["Brand Identity", "UX/UI", "E-commerce"],
    duration: "8 sprints",
    heroPattern: "hoja",
    accent: "tangerine",
    liveUrl: "https://quickbite-ecommerce.vercel.app/",
    bannerVideo: { src: "/animations/banner-QUICKBITE.mp4", poster: "/animations/banner-QUICKBITE-poster.jpg" },

    summary: [
      "QuickBite nace como un proyecto conceptual desarrollado por Tangerine Studio para explorar cómo una experiencia de compra digital puede simplificar el acceso a alimentos saludables sin sacrificar comodidad, velocidad ni calidad.",
      "El proyecto comprende la creación integral de la identidad de marca, el diseño UX/UI del ecommerce y un sistema visual preparado para ser desarrollado sobre Shopify — pensado desde el inicio para responder a condiciones reales de desarrollo, no solo como ejercicio visual.",
    ],

    info: [
      { label: "Cliente", value: "QuickBite (concepto propio)" },
      { label: "Año", value: "2026" },
      { label: "Duración", value: "8 sprints" },
      { label: "Equipo", value: "Natalia García, Emy Dorado" },
      { label: "Herramientas", value: "Figma → Shopify" },
      { label: "Estado", value: "Concept Proposal" },
    ],

    challenge: {
      title: "Menos tiempo, no más variedad",
      body: [
        "Aunque el interés por la alimentación saludable continúa creciendo, la experiencia de compra permanece altamente fragmentada: frutas y verduras en un establecimiento, suplementos en otro, snacks saludables en tiendas especializadas.",
        "El desafío consistía en diseñar una marca capaz de transmitir cercanía y bienestar mientras se construía un ecommerce cuya prioridad fuera reducir el esfuerzo cognitivo durante la compra, organizando cientos de productos de manera clara e intuitiva.",
      ],
    },

    objectives: [
      "Construir una marca saludable cercana, moderna y memorable dentro del mercado colombiano.",
      "Diseñar una identidad visual diferenciada que comunique naturalidad sin recurrir a los recursos gráficos tradicionales del sector orgánico.",
      "Desarrollar una experiencia ecommerce optimizada para compras rápidas desde dispositivos móviles.",
      "Diseñar un packaging conceptual coherente con la identidad, preparado para implementarse sobre Shopify.",
    ],

    process: [
      { icon: "Search", title: "Investigación y estrategia", description: "Análisis del mercado colombiano de supermercados saludables, benchmark de competidores y definición de la propuesta de valor." },
      { icon: "Lightbulb", title: "Identidad visual", description: "Logotipo, sistema cromático, tipografía y primeras aplicaciones de marca." },
      { icon: "Layers", title: "Arquitectura y UX", description: "Organización del catálogo, wireframes y jerarquía de contenidos para móvil y escritorio." },
      { icon: "Rocket", title: "Interfaz y prototipo", description: "Pantallas de alta fidelidad, design system y prototipo navegable preparado para Shopify." },
    ],

    research: {
      intro: "El público objetivo son profesionales de 23 a 38 años que entrenan regularmente y valoran encontrar productos confiables rápido, más que la mayor variedad posible.",
      insights: [
        { title: "La experiencia también comunica marca", description: "La organización de la información, la claridad de la navegación y la jerarquía visual construyen percepción de marca tanto como el logotipo o la paleta cromática." },
        { title: "Diseñar desde las limitaciones reales de la plataforma", description: "Pensar desde Shopify desde el día uno permitió desarrollar una propuesta más viable y cercana a un escenario de producción real." },
      ],
    },

    visualIdentity: {
      intro: "La paleta evita el exceso de tonos verdes del sector: el contraste entre verde profundo, crema cálido y acentos en lima y naranja aporta una personalidad contemporánea.",
      colors: [
        { name: "Verde oscuro", hex: "#003324", role: "Color primario" },
        { name: "Crema", hex: "#FFFAF5", role: "Color secundario" },
        { name: "Negro", hex: "#00150F", role: "Color neutro" },
        { name: "Verde lima", hex: "#8BC652", role: "Color complementario" },
        { name: "Naranja", hex: "#F76711", role: "Color complementario" },
      ],
      typography: [
        { role: "Interfaz y cuerpo", family: "DM Sans", sample: "Aa" },
        { role: "Titulares", family: "Radio Canada", sample: "Aa" },
      ],
      video: { src: "/animations/paleta-QUICKBITE.mp4", poster: "/animations/paleta-QUICKBITE-poster.jpg" },
    },

    mockups: ["desktop", "mobile", "packaging"],

    learnings: [
      {
        title: "La marca vive en la experiencia completa",
        description: "En un ecommerce, la marca no se comunica únicamente mediante el logotipo o la paleta cromática — la organización de la información también construye percepción de marca.",
      },
    ],

    liveSite: {
      title: "Visita la experiencia",
      description:
        "El prototipo de e-commerce está desplegado y navegable — visítalo para ver el sistema completo en contexto real, no solo en capturas.",
    },

    nextProject: {
      eyebrow: "Siguiente proyecto",
      title: "SIMER",
      category: "Brand Identity",
      href: "/work/simer",
      pattern: "hoja",
      coverVideo: { src: "/animations/portada-SIMER.mp4", poster: "/animations/portada-SIMER-poster.jpg" },
    },
  },

  en: {
    slug: "quickbite",
    client: "QuickBite (concept project)",
    title: "Buying healthy shouldn't take more time",
    category: "Concept Proposal — Identity + E-commerce",
    year: "2026",
    services: ["Brand Identity", "UX/UI", "E-commerce"],
    duration: "8 sprints",
    heroPattern: "hoja",
    accent: "tangerine",
    liveUrl: "https://quickbite-ecommerce.vercel.app/",
    bannerVideo: { src: "/animations/banner-QUICKBITE.mp4", poster: "/animations/banner-QUICKBITE-poster.jpg" },

    summary: [
      "QuickBite began as a concept project developed by Tangerine Studio to explore how a digital shopping experience can simplify access to healthy food without sacrificing convenience, speed or quality.",
      "The project spans the full creation of the brand identity, the ecommerce's UX/UI design, and a visual system built to be developed on Shopify — designed from the start to respond to real development conditions, not just as a visual exercise.",
    ],

    info: [
      { label: "Client", value: "QuickBite (in-house concept)" },
      { label: "Year", value: "2026" },
      { label: "Duration", value: "8 sprints" },
      { label: "Team", value: "Natalia García, Emy Dorado" },
      { label: "Tools", value: "Figma → Shopify" },
      { label: "Status", value: "Concept Proposal" },
    ],

    challenge: {
      title: "Less time, not more variety",
      body: [
        "Even as interest in healthy eating keeps growing, the shopping experience remains highly fragmented: fruits and vegetables in one store, supplements in another, healthy snacks in specialty shops.",
        "The challenge was to design a brand able to convey warmth and wellbeing while building an ecommerce whose priority was reducing cognitive effort during shopping, organizing hundreds of products clearly and intuitively.",
      ],
    },

    objectives: [
      "Build an approachable, modern and memorable healthy brand within the Colombian market.",
      "Design a differentiated visual identity that communicates naturalness without relying on the organic sector's traditional graphic resources.",
      "Develop an ecommerce experience optimized for fast mobile shopping.",
      "Design conceptual packaging consistent with the identity, ready to be implemented on Shopify.",
    ],

    process: [
      { icon: "Search", title: "Research & strategy", description: "Analysis of the Colombian healthy-supermarket market, competitor benchmarking, and defining the value proposition." },
      { icon: "Lightbulb", title: "Visual identity", description: "Logo, color system, typography and first brand applications." },
      { icon: "Layers", title: "Architecture & UX", description: "Catalog organization, wireframes and content hierarchy for mobile and desktop." },
      { icon: "Rocket", title: "Interface & prototype", description: "High-fidelity screens, design system and a navigable prototype ready for Shopify." },
    ],

    research: {
      intro: "The target audience is professionals aged 23 to 38 who train regularly and value finding reliable products fast, more than the widest possible variety.",
      insights: [
        { title: "The experience communicates brand too", description: "Information organization, navigation clarity and visual hierarchy build brand perception as much as the logo or color palette do." },
        { title: "Design from the platform's real constraints", description: "Thinking from Shopify from day one made it possible to develop a proposal that's more viable and closer to a real production scenario." },
      ],
    },

    visualIdentity: {
      intro: "The palette avoids the sector's excess of green tones: the contrast between deep green, warm cream and lime and orange accents brings a contemporary personality.",
      colors: [
        { name: "Dark green", hex: "#003324", role: "Primary color" },
        { name: "Cream", hex: "#FFFAF5", role: "Secondary color" },
        { name: "Black", hex: "#00150F", role: "Neutral color" },
        { name: "Lime green", hex: "#8BC652", role: "Complementary color" },
        { name: "Orange", hex: "#F76711", role: "Complementary color" },
      ],
      typography: [
        { role: "Interface & body", family: "DM Sans", sample: "Aa" },
        { role: "Headlines", family: "Radio Canada", sample: "Aa" },
      ],
      video: { src: "/animations/paleta-QUICKBITE.mp4", poster: "/animations/paleta-QUICKBITE-poster.jpg" },
    },

    mockups: ["desktop", "mobile", "packaging"],

    learnings: [
      {
        title: "The brand lives in the full experience",
        description: "In an ecommerce, the brand isn't communicated only through the logo or color palette — information organization also builds brand perception.",
      },
    ],

    liveSite: {
      title: "Visit the experience",
      description:
        "The ecommerce prototype is deployed and navigable — visit it to see the full system in real context, not just in screenshots.",
    },

    nextProject: {
      eyebrow: "Next project",
      title: "SIMER",
      category: "Brand Identity",
      href: "/work/simer",
      pattern: "hoja",
      coverVideo: { src: "/animations/portada-SIMER.mp4", poster: "/animations/portada-SIMER-poster.jpg" },
    },
  },
};
