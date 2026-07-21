// The Patterns system — Tangerine Studio's own graphic language.
// Shared data only (no JSX), so the docs page and any future consumer read
// from the same source of truth.
//
// This is the second generation of the system. The first generation was
// procedural (10 SVG families generated in code, tinted through 8 palettes).
// This generation is authored: five real SVG files, each hand-drawn with its
// own fixed color story, living in public/patterns/. They replace the old
// family system entirely — there is no palette-swapping here, because
// nothing here is generated. What you see in the file is the pattern.

export type PatternId = "mosaico" | "flor" | "destello" | "hoja" | "semillas";

export interface PatternColor {
  hex: string;
  /** The nearest registered Design System token — "≈" prefix means a close
   * match rather than a byte-for-byte one (the SVG was authored before this
   * documentation, so a few background tints sit between two token steps). */
  token: string;
  role: string;
}

export interface Pattern {
  id: PatternId;
  number: string;
  name: string;
  file: string;
  /** Is this the founding pattern the other four were extracted from? */
  principal?: boolean;
  tagline: string;
  description: string;
  inspiration: string;
  intention: string;
  personality: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  scaleNote: string;
  colors: PatternColor[];
}

export const patterns: Pattern[] = [
  {
    id: "mosaico",
    number: "00",
    name: "Mosaico",
    file: "/patterns/mosaico.svg",
    principal: true,
    tagline: "Los seis motivos de la familia, en una sola grilla.",
    description:
      "Mosaico es el único patrón de los cinco que no repite una sola forma — repite un sistema. Seis celdas cuadradas, seis combinaciones distintas de fondo y figura (Flor sobre Primary 600, Hoja sobre Lime 400, Mandarina sobre Gold 400, Destello sobre Tangerine 500, Lazo sobre Leaf Dark, Semillas sobre un lila claro), ensambladas en una grilla de 3×2 que se repite sin costura. La celda Mandarina es la más literal de las seis: el mismo anillo del isotipo haciendo de cuerpo de la fruta, coronado por una hoja — el logo, reducido a su geometría mínima. Mosaico es el patrón del que nacen los otros cuatro: cada uno de Flor, Destello, Hoja y Semillas es, literalmente, una de estas seis celdas llevada a su propia escala y tejido. Por eso es el principal — no decora, presenta.",
    inspiration:
      "La cuadrícula de color plano de un catálogo de Pantone y la lógica de un sampler textil: mostrar toda la paleta y toda la forma de una vez, en el mismo tamaño de celda, sin jerarquía entre ellas.",
    intention:
      "Comunicar en un solo vistazo que Tangerine tiene un lenguaje, no un solo ícono — que tan capaz de sostener seis registros de color a la vez, como de sostener uno solo.",
    personality: ["Creativa", "Ecléctica", "Segura", "Completa"],
    whenToUse: [
      "Como portada o momento de apertura — la primera pieza que alguien ve de Tangerine debería mostrar todo el sistema, no una parte.",
      "En superficies grandes (posters, fondos de sección completa, la propia página de Patterns) donde las seis celdas tienen espacio real para leerse por separado.",
      "Cuando el objetivo es enseñar el sistema, no aplicarlo — es la pieza de referencia, no la textura de fondo del día a día.",
    ],
    whenNotToUse: [
      "En superficies chicas (stickers, íconos, redes a tamaño de miniatura) — a menos de 200px de celda, las seis figuras se vuelven ruido de color sin forma legible.",
      "Detrás de texto largo — seis fondos de color distinto compiten con cualquier contenido tipográfico encima.",
      "Más de una vez en la misma pieza — es una declaración, no una textura; repetirlo le resta el peso de \"apertura\".",
    ],
    scaleNote:
      "Necesita que cada celda mida al menos 160–200px para que las seis figuras se distingan entre sí — es el único patrón de la familia que no funciona chico.",
    colors: [
      { hex: "#5434E2", token: "purple-600", role: "Fondo de Flor" },
      { hex: "#CDDC39", token: "lime-400", role: "Figura de Flor / fondo de Hoja" },
      { hex: "#00A254", token: "green-500 (brand-leaf)", role: "Figura de Hoja / hoja de Mandarina" },
      { hex: "#FFCA00", token: "gold-400", role: "Fondo de Mandarina / figura de Lazo" },
      { hex: "#FF7401", token: "tangerine-500", role: "Cuerpo de Mandarina / fondo de Destello" },
      { hex: "#00723B", token: "brand-leaf-dark", role: "Fondo de Lazo / anillo de Mandarina" },
      { hex: "#CAC0F6", token: "≈ purple-200", role: "Fondo de Semillas" },
    ],
  },
  {
    id: "flor",
    number: "01",
    name: "Flor",
    file: "/patterns/flor.svg",
    tagline: "Un estallido de doce pétalos, casi monocromo, repetido al ras.",
    description:
      "Una forma escalonada de doce lóbulos — más flor que engranaje, más brote que estrella — tejida en una grilla de ladrillo (cada fila desplazada medio ancho respecto a la anterior) tan apretada que el espacio negativo casi desaparece. Lima sobre lima pálido: el contraste es de textura, no de color. Es el único de los cuatro patrones satélite que se lee como una superficie antes que como una figura — hay que acercarse para ver que son flores, no manchas.",
    inspiration:
      "Papel de regalo japonés y azulejos de Talavera — la idea de que un solo motivo, repetido sin variación y casi sin contraste, se convierte en textura antes que en ilustración.",
    intention:
      "Dar calidez orgánica a una superficie sin gritarlo — es el patrón que menos compite con lo que tiene encima, precisamente porque su contraste interno ya es bajo.",
    personality: ["Cercana", "Orgánica", "Gentil", "Silenciosa"],
    whenToUse: [
      "Como fondo detrás de texto o composición — el bajo contraste interno lo hace el más seguro de los cuatro para convivir con contenido real.",
      "En superficies físicas con textura propia — packaging, forros de cuaderno, papel de regalo — donde una textura casi monocroma se siente más premium que un color plano.",
      "En dark mode o superficies donde se necesita un acento cálido sin introducir un segundo color de acento.",
    ],
    whenNotToUse: [
      "Como protagonista de una portada — su bajo contraste lo hace desaparecer a la distancia; para eso está Mosaico.",
      "Junto a Destello o Semillas en la misma pieza — las tres grillas de ladrillo se leen como una sola confusión si conviven.",
      "En blanco y negro puro — el patrón depende del casi-monocromo lima; sin color, los doce lóbulos pierden toda su lectura de textura.",
    ],
    scaleNote:
      "Funciona mejor entre 80–200px de celda — más chico se vuelve ruido, más grande empieza a leerse como figura individual en vez de textura.",
    colors: [
      { hex: "#F0F4C2", token: "≈ lime-100", role: "Fondo" },
      { hex: "#CDDC39", token: "lime-400", role: "Figura" },
    ],
  },
  {
    id: "destello",
    number: "02",
    name: "Destello",
    file: "/patterns/destello.svg",
    tagline: "Una estrella de cuatro puntas, precisa como una brújula.",
    description:
      "Cuatro puntas rectas que se cruzan en un centro compartido, cada una terminada en un ángulo agudo — no es una forma orgánica como Flor: es geométrica, direccional, casi mecánica. La misma grilla de ladrillo que el resto de la familia, pero acá el resultado se siente distinto porque la figura tiene esquinas, no curvas. Violeta sobre violeta claro — la única combinación monocroma de marca de los cuatro patrones satélite.",
    inspiration:
      "Brújulas, asteriscos tipográficos y la estrella ninja como ícono — formas que comunican dirección y precisión antes que decoración.",
    intention:
      "Aportar energía y movimiento sin recurrir al naranja — es la prueba de que Primary por sí solo puede sostener una superficie completa con personalidad propia.",
    personality: ["Enérgica", "Precisa", "Creativa", "Orientada"],
    whenToUse: [
      "En redes sociales — la figura angular se lee incluso a tamaño de miniatura, donde formas más orgánicas como Hoja pierden definición.",
      "En motion — la simetría de cuatro puntas hace que una rotación lenta se sienta intencional, no accidental (ver Movimiento).",
      "Como acento único de marca cuando la pieza ya usa naranja en otro lugar (logo, CTA) y no debería competir por atención.",
    ],
    whenNotToUse: [
      "En piezas que ya usan mucho violeta en tipografía o UI — el patrón compite por el mismo tono en vez de acompañarlo.",
      "Detrás de texto largo sin bajar la opacidad — las puntas agudas generan más ruido visual que Flor o Semillas al mismo tamaño.",
      "En superficies muy pequeñas (menos de 60px de celda) — las puntas se cierran entre sí y la estrella se lee como una mancha.",
    ],
    scaleNote:
      "Cómodo entre 100–260px de celda; es el patrón de la familia con mejor lectura a tamaños medianos (posters, stories, tapas de presentación).",
    colors: [
      { hex: "#8C77EC", token: "≈ purple-300/400", role: "Fondo" },
      { hex: "#5434E2", token: "purple-600", role: "Figura" },
    ],
  },
  {
    id: "hoja",
    number: "03",
    name: "Hoja",
    file: "/patterns/hoja.svg",
    tagline: "Una sola hoja, suelta, repetida como si cayera.",
    description:
      "Una forma orgánica asimétrica — mitad hoja, mitad gota — con una sola vena diagonal marcada, dispersa en la misma grilla de ladrillo que el resto de la familia. A diferencia de Flor (que se lee como textura densa) o Destello (que se lee como figura geométrica), Hoja tiene el espaciado más generoso de los cuatro: cada forma respira sola antes de encontrarse con la siguiente. Verde sobre verde — la conexión más directa de toda la familia con la mascota y la hoja que corona el isotipo.",
    inspiration:
      "El brote que corona la mandarina del logo — la misma hoja, simplificada a una sola curva asimétrica y multiplicada en vez de aislada.",
    intention:
      "Anclar cualquier composición al origen orgánico de la marca sin necesidad de dibujar la fruta completa — crecimiento, no fruta.",
    personality: ["Natural", "Cercana", "En crecimiento", "Espaciosa"],
    whenToUse: [
      "En packaging y papelería — el verde y la forma orgánica comunican material/origen natural sin una sola palabra.",
      "En fondos de sección donde se busca calidez sin la intensidad del naranja ni la frialdad del violeta.",
      "En piezas sobre sustentabilidad, proceso o cultura de equipo — cualquier contexto donde \"crecimiento\" es el mensaje.",
    ],
    whenNotToUse: [
      "En piezas de producto/UI densas — su espaciado generoso necesita aire alrededor; en un dashboard compacto se ve incompleto.",
      "Como fondo de un Card chico — a menos de 100px de celda, la asimetría de la hoja empieza a leerse como una mancha sin forma.",
      "Junto a fotografías de naturaleza reales — dos lenguajes \"orgánicos\" distintos (uno ilustrado, uno fotográfico) compiten en vez de reforzarse.",
    ],
    scaleNote:
      "El más generoso de los cuatro: recién se aprovecha desde 120px de celda en adelante, hasta superficies completas de packaging o portada.",
    colors: [
      { hex: "#54C18C", token: "≈ green-400", role: "Fondo" },
      { hex: "#00723B", token: "brand-leaf-dark", role: "Figura" },
    ],
  },
  {
    id: "semillas",
    number: "04",
    name: "Semillas",
    file: "/patterns/semillas.svg",
    tagline: "Cuatro puntos por celda — el motivo más simple, el más versátil.",
    description:
      "Cuatro círculos idénticos por celda, en grilla de 2×2, tejidos en el mismo desplazamiento de ladrillo que el resto de la familia. No hay geometría que descifrar: es el motivo más reducido de los cinco, y por eso el más flexible — funciona igual de bien diminuto (un sticker) que gigante (un fondo de sección completa). Naranja sobre durazno claro: la única combinación de la familia que usa el color secundario de marca como protagonista.",
    inspiration:
      "Las semillas visibles al cortar un gajo de mandarina — la parte de la fruta que normalmente se descarta, convertida en el motivo más repetible de toda la familia.",
    intention:
      "Dar a Tangerine un comodín — un patrón tan simple que nunca compite con nada, pensado para los contextos donde los otros cuatro son demasiado detallados.",
    personality: ["Simple", "Versátil", "Juguetona", "Rítmica"],
    whenToUse: [
      "En superficies muy chicas (stickers, favicons de sección, chips) donde Flor, Destello o Hoja pierden definición.",
      "Detrás de contenido denso (tablas, dashboards, listas largas) — los puntos no compiten con texto ni con datos.",
      "Como acento naranja cuando la pieza ya es mayormente violeta — el único patrón de la familia con el naranja como protagonista, no como detalle.",
    ],
    whenNotToUse: [
      "Como pieza de apertura o portada — es deliberadamente el más discreto de los cinco; para protagonismo está Mosaico.",
      "En superficies donde ya hay otros círculos con significado (el anillo del isotipo, un avatar) — los puntos pueden confundirse con esos elementos.",
      "A escala intermedia sin ningún otro elemento de marca cerca — sin contexto, cuatro puntos por celda pueden leerse como un patrón genérico de fondo, no como Tangerine.",
    ],
    scaleNote:
      "El único de los cinco que funciona en todo el rango — desde 40px (sticker) hasta una superficie completa (fondo de sección) sin perder lectura.",
    colors: [
      { hex: "#FFBF8A", token: "≈ tangerine-200/300", role: "Fondo" },
      { hex: "#FF7401", token: "tangerine-500", role: "Figura" },
    ],
  },
];

export function getPattern(id: PatternId): Pattern {
  const found = patterns.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown pattern: ${id}`);
  return found;
}

/**
 * Two motifs already exist inside Mosaico but haven't shipped as their own
 * standalone tile yet — the honest next step for growing this family
 * without inventing a new visual system (see Escalabilidad).
 */
export const reserveMotifs = [
  {
    name: "Mandarina",
    description:
      "El anillo del isotipo haciendo de cuerpo de la fruta, coronado por una hoja — el logo completo, reducido a su geometría mínima. Vive en la celda inferior-izquierda de Mosaico, sobre Gold 400. El más literal de los seis motivos, y por eso el que más cuidado necesitaría si se lanzara como patrón satélite propio — es el que más cerca está de \"el logo en mosaico\", justo lo que el resto de la familia evita a propósito.",
  },
  {
    name: "Lazo",
    description:
      "Dos rombos entrelazados en un nudo compacto de cuatro puntas — el motivo más abstracto de los seis. Vive en la celda superior-derecha de Mosaico, sobre Leaf Dark.",
  },
];

export const geometryRules = [
  {
    rule: "Una sola figura por patrón satélite",
    detail: "Flor, Destello, Hoja y Semillas repiten exactamente una forma — nunca dos figuras distintas en el mismo tile. Mosaico es la única excepción, porque su rol es mostrar el conjunto.",
  },
  {
    rule: "Fondo y figura, nunca más de dos tintas",
    detail: "Cada patrón satélite usa un color de fondo y un color de figura — nunca un tercer tono. El contraste entre ambos es la única variable de personalidad (alto en Destello y Semillas, bajo en Flor).",
  },
  {
    rule: "Grilla de ladrillo (half-drop), no grilla recta",
    detail: "Las filas se desplazan medio ancho de tile respecto a la anterior — evita las líneas rectas de una grilla convencional y es lo que le da a la familia su ritmo compartido.",
  },
  {
    rule: "El tile es siempre más alto que ancho",
    detail: "Los cuatro patrones satélite usan una proporción de tile de aproximadamente 1:2 (ancho:alto) — una proporción vertical consistente que cualquier patrón nuevo debería mantener.",
  },
  {
    rule: "Todo color sale de un token ya registrado",
    detail: "Cada hex usado en los cinco archivos corresponde a un primitivo de Foundations → Color (ver la tabla de colores de cada ficha) — nunca un tono inventado para la ocasión.",
  },
];
