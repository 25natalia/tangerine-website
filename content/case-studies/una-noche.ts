import type { CaseStudyData } from "@/lib/templates/case-study";
import type { Localized } from "@/lib/i18n/types";

// Fuente: Brand OS, Volumen IX — Una Noche. `en` es la traducción de la
// misma fuente.
export const unaNoche: Localized<CaseStudyData> = {
  es: {
    slug: "una-noche",
    client: "Una Noche",
    title: "Un símbolo, no un logo",
    category: "Brand Identity",
    year: "2025",
    services: ["Brand Identity"],
    duration: "3 semanas",
    heroPattern: "semillas",
    accent: "tangerine",
    bannerVideo: { src: "/animations/banner-UNA-NOCHE.mp4", poster: "/animations/banner-UNA-NOCHE-poster.jpg" },
    heroImage: "/recursos-proyectos/una-noche/Portada.svg",
    intent: "Una identidad construida desde cero alrededor de un símbolo propio: el dado.",

    summary: [
      "Una Noche llegó a Tangerine sin ninguna identidad previa que heredar: una marca todavía por nacer visualmente, con una ambición mucho más grande que la de organizar eventos. Su intención real es construir una comunidad alrededor de la música, la creatividad, la cultura y el estilo de vida, no solo vender entradas.",
      "El reto tenía dos capas: construir una identidad completa desde cero, sin ningún activo visual previo del cual partir, y lograr que esa identidad transmitiera pertenencia real, no solamente asistencia a un evento puntual.",
    ],

    info: [
      { label: "Cliente", value: "Una Noche" },
      { label: "Duración", value: "3 semanas" },
      { label: "Herramientas", value: "Figma, Illustrator, Canva" },
    ],

    challenge: {
      color: "#A41414",
      colorDark: "#FFF5E6",
      title: "Inspirarse en el mecanismo, no en el resultado",
      body: [
        "El punto de partida de la estrategia fue una pregunta, no una respuesta: ¿qué es, exactamente, lo que hace que una comunidad como la de Nude Project se sienta real? La respuesta no estaba en su paleta de colores ni en su tipografía. Estaba en tener un símbolo compartido, algo reconocible y apropiable que sus miembros pudieran llevar puesto, mostrar y usar como señal de pertenencia.",
        "Una Noche no vende ropa como producto principal, así que ese mecanismo no podía trasladarse literalmente. Necesitaba su propio símbolo, y de ahí nació la decisión de construir la identidad alrededor de un elemento capaz de encarnar esa idea de forma inmediata: el dado.",
      ],
    },

    objectives: [
      "Construir una identidad con mucha personalidad, que transmitiera juventud y creatividad, memorable en un mercado donde las marcas de eventos se parecen entre sí.",
      "Evitar, de forma explícita, la estética de empresa tradicional de eventos.",
      "Construir un sistema lo suficientemente flexible para convivir entre eventos, ropa, contenido y productos que todavía no existían al momento del proyecto.",
      "Inspirarse en el sentimiento que genera Nude Project (comunidad, autenticidad, pertenencia) sin replicar su identidad visual.",
    ],

    process: [
      { icon: "Search", title: "Inmersión", description: "Análisis deliberado del mecanismo detrás de Nude Project (no de su estética, sino de por qué genera pertenencia) para evitar terminar copiando su resultado." },
      { icon: "Lightbulb", title: "Exploración", description: "Se descartaron direcciones que dependían exclusivamente de tipografía o paleta, por no ofrecer la misma capacidad de convertirse en un objeto físico compartible." },
      { icon: "Palette", title: "El dado como concepto", description: "Un elemento capaz de encarnar incertidumbre, movimiento y juego: coherente con lo que el propio nombre de la marca ya sugiere." },
      { icon: "Layers", title: "Sistema y entrega", description: "Logos, patrones, mockups y templates adaptados a Canva, organizados para que un recurso nuevo se incorpore sin reconstruir el sistema." },
    ],
    processLabel: { eyebrow: "Concepto" },

    research: {
      eyebrow: "Percepción",
      intro: "La fuerza de una marca como Nude Project no está en lo que vende, sino en lo que sus miembros pueden mostrar.",
      insights: [
        { title: "Objeto, no solo imagen", description: "Una identidad puramente digital, sin un elemento capaz de trascender la pantalla, difícilmente iba a construir el mismo sentido de pertenencia que Una Noche buscaba." },
        { title: "Flexibilidad como requisito", description: "Cualquier elemento central tenía que poder viajar entre formatos digitales, físicos y futuros sin perder coherencia." },
      ],
    },

    visualIdentity: {
      eyebrow: "La identidad",
      intro: "Rojo vino profundo como color primario, acompañado de un crema cálido y un neutro casi negro: la misma tensión entre seriedad y calidez que sostiene al dado como símbolo.",
      colors: [
        { name: "Rojo medianoche", hex: "#A41414", role: "Color primario" },
        { name: "Crema secreta", hex: "#FFF5E6", role: "Color secundario" },
        { name: "Negro total", hex: "#0C0C0C", role: "Color neutro" },
        { name: "Gris cómplice", hex: "#9D918C", role: "Color complemento" },
      ],
      typography: [
        { role: "Tipografía principal", family: "Tipografía de marca", sample: "Aa", image: "/recursos-proyectos/una-noche/tipografia-principal.svg" },
        { role: "Tipografía secundaria", family: "Tipografía de marca", sample: "Aa", image: "/recursos-proyectos/una-noche/tipografia-secundaria.svg" },
      ],
      marks: [
        { src: "/recursos-proyectos/una-noche/logo-negro.svg", label: "Logo, en negro", fit: "contain" },
        { src: "/recursos-proyectos/una-noche/logo-rojo.svg", label: "Logo, en rojo vino", fit: "contain" },
        { src: "/recursos-proyectos/una-noche/iso-1.svg", label: "Isologo, en rojo vino" },
        { src: "/recursos-proyectos/una-noche/iso-3.svg", label: "Isologo, en negro" },
      ],
      patterns: [
        { src: "/recursos-proyectos/una-noche/pattern-1.svg", label: "Ritmo nocturno" },
        { src: "/recursos-proyectos/una-noche/pattern-2.svg", label: "Noche texturizada" },
      ],
      identityMockups: [
        { src: "/recursos-proyectos/una-noche/mockup-1.svg", label: "Estilo que se lleva puesto" },
        { src: "/recursos-proyectos/una-noche/mockup-2.svg", label: "La marca en la calle" },
        { src: "/recursos-proyectos/una-noche/mockup-3.svg", label: "Presencia que se nota" },
      ],
    },

    beforeAfter: {
      before: { label: "Antes", description: "Ningún activo visual: sin logo previo que evolucionar, sin paleta instalada en la memoria de ninguna audiencia." },
      after: { label: "Después", description: "Un sistema de identidad completo, flexible, con un símbolo propio y defendible, el dado, capaz de sostener la marca a través de eventos, contenido digital y futuras aplicaciones físicas." },
    },

    outcome:
      "Construimos un sistema de identidad flexible alrededor de un símbolo propio, el dado, capaz de sostener a Una Noche a través de eventos, contenido y futuras aplicaciones físicas.",

    learnings: [
      {
        title: "Copiar el resultado no es lo mismo que entender el mecanismo",
        description: "Nude Project no aportó ninguna decisión estética a este proyecto; aportó una pregunta (¿qué símbolo puede compartir esta comunidad?) que Una Noche respondió con un elemento completamente propio.",
      },
    ],

    nextProject: {
      eyebrow: "Siguiente proyecto",
      title: "Margarita Burgos",
      category: "Personal Branding",
      href: "/work/margarita-burgos",
      pattern: "flor",
      coverVideo: { src: "/animations/portada-MB.mp4", poster: "/animations/portada-MB-poster.jpg" },
    },
  },

  en: {
    slug: "una-noche",
    client: "Una Noche",
    title: "A symbol, not a logo",
    category: "Brand Identity",
    year: "2025",
    services: ["Brand Identity"],
    duration: "3 weeks",
    heroPattern: "semillas",
    accent: "tangerine",
    bannerVideo: { src: "/animations/banner-UNA-NOCHE.mp4", poster: "/animations/banner-UNA-NOCHE-poster.jpg" },
    heroImage: "/recursos-proyectos/una-noche/Portada.svg",
    intent: "An identity built from scratch around a symbol of its own: the die.",

    summary: [
      "Una Noche came to Tangerine with no prior identity to inherit: a brand still to be born visually, with an ambition far bigger than organizing events. Its real intent is to build a community around music, creativity, culture and lifestyle, not just sell tickets.",
      "The challenge had two layers: build a complete identity from scratch, with no prior visual asset to start from, and make that identity convey real belonging, not just attendance at a one-off event.",
    ],

    info: [
      { label: "Client", value: "Una Noche" },
      { label: "Duration", value: "3 weeks" },
      { label: "Tools", value: "Figma, Illustrator, Canva" },
    ],

    challenge: {
      color: "#A41414",
      colorDark: "#FFF5E6",
      title: "Draw from the mechanism, not the result",
      body: [
        "The strategy's starting point was a question, not an answer: what is it, exactly, that makes a community like Nude Project's feel real? The answer wasn't in its color palette or its typography. It was in having a shared symbol, something recognizable and appropriable that its members could wear, show and use as a sign of belonging.",
        "Una Noche doesn't sell clothing as its main product, so that mechanism couldn't be transferred literally. It needed its own symbol, and from there came the decision to build the identity around an element able to embody that idea immediately: the die.",
      ],
    },

    objectives: [
      "Build an identity with a lot of personality, conveying youth and creativity, memorable in a market where event brands tend to look alike.",
      "Explicitly avoid the traditional event-company aesthetic.",
      "Build a system flexible enough to live across events, clothing, content and products that didn't exist yet at the time of the project.",
      "Draw inspiration from the feeling Nude Project generates (community, authenticity, belonging) without replicating its visual identity.",
    ],

    process: [
      { icon: "Search", title: "Immersion", description: "A deliberate analysis of the mechanism behind Nude Project (not its aesthetic, but why it generates belonging) to avoid ending up copying its result." },
      { icon: "Lightbulb", title: "Exploration", description: "Directions that depended solely on typography or palette were dropped, since they didn't offer the same ability to become a shareable physical object." },
      { icon: "Palette", title: "The die as concept", description: "An element able to embody uncertainty, movement and play: consistent with what the brand's own name already suggests." },
      { icon: "Layers", title: "System & delivery", description: "Logos, patterns, mockups and templates adapted to Canva, organized so a new asset can be added without rebuilding the system." },
    ],
    processLabel: { eyebrow: "Concept" },

    research: {
      eyebrow: "Perception",
      intro: "The strength of a brand like Nude Project isn't in what it sells, but in what its members can show.",
      insights: [
        { title: "An object, not just an image", description: "A purely digital identity, with no element able to transcend the screen, was unlikely to build the same sense of belonging Una Noche was after." },
        { title: "Flexibility as a requirement", description: "Any central element had to be able to travel across digital, physical and future formats without losing coherence." },
      ],
    },

    visualIdentity: {
      eyebrow: "The identity",
      intro: "Deep wine red as the primary color, paired with a warm cream and an almost-black neutral: the same tension between seriousness and warmth that holds up the die as a symbol.",
      colors: [
        { name: "Midnight red", hex: "#A41414", role: "Primary color" },
        { name: "Secret cream", hex: "#FFF5E6", role: "Secondary color" },
        { name: "Total black", hex: "#0C0C0C", role: "Neutral color" },
        { name: "Accomplice gray", hex: "#9D918C", role: "Complementary color" },
      ],
      typography: [
        { role: "Primary typeface", family: "Brand typeface", sample: "Aa", image: "/recursos-proyectos/una-noche/tipografia-principal.svg" },
        { role: "Secondary typeface", family: "Brand typeface", sample: "Aa", image: "/recursos-proyectos/una-noche/tipografia-secundaria.svg" },
      ],
      marks: [
        { src: "/recursos-proyectos/una-noche/logo-negro.svg", label: "Logo, in black", fit: "contain" },
        { src: "/recursos-proyectos/una-noche/logo-rojo.svg", label: "Logo, in wine red", fit: "contain" },
        { src: "/recursos-proyectos/una-noche/iso-1.svg", label: "Mark, in wine red" },
        { src: "/recursos-proyectos/una-noche/iso-3.svg", label: "Mark, in black" },
      ],
      patterns: [
        { src: "/recursos-proyectos/una-noche/pattern-1.svg", label: "Night rhythm" },
        { src: "/recursos-proyectos/una-noche/pattern-2.svg", label: "Textured night" },
      ],
      identityMockups: [
        { src: "/recursos-proyectos/una-noche/mockup-1.svg", label: "Style you wear" },
        { src: "/recursos-proyectos/una-noche/mockup-2.svg", label: "Brand on the street" },
        { src: "/recursos-proyectos/una-noche/mockup-3.svg", label: "Presence that stands out" },
      ],
    },

    beforeAfter: {
      before: { label: "Before", description: "No visual assets at all: no prior logo to evolve, no palette installed in any audience's memory." },
      after: { label: "After", description: "A complete, flexible identity system, with an original and defensible symbol, the die, able to carry the brand across events, digital content and future physical applications." },
    },

    outcome:
      "We built a flexible identity system around a symbol of its own, the die, able to carry Una Noche across events, content and future physical applications.",

    learnings: [
      {
        title: "Copying the result isn't the same as understanding the mechanism",
        description: "Nude Project didn't contribute a single aesthetic decision to this project; it contributed a question (what symbol can this community share?) which Una Noche answered with an element entirely its own.",
      },
    ],

    nextProject: {
      eyebrow: "Next project",
      title: "Margarita Burgos",
      category: "Personal Branding",
      href: "/work/margarita-burgos",
      pattern: "flor",
      coverVideo: { src: "/animations/portada-MB.mp4", poster: "/animations/portada-MB-poster.jpg" },
    },
  },
};
