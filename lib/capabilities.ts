// Contenido propio de Tangerine Studio (Brand OS, Volumen IV — "Nuestras
// capacidades"), citado literalmente. Fuente única: Home (preview) y
// /capabilities (completa) leen de acá — nunca se duplica el texto entre
// las dos páginas.

export interface Capability {
  slug: string;
  name: string;
  resolves: string;
  existsBecause: string;
  generatesValue: string;
}

export const capabilities: Capability[] = [
  {
    slug: "brand-systems",
    name: "Brand Systems",
    resolves:
      "La fragmentación: marcas que dicen algo distinto en cada lugar donde aparecen porque nunca tuvieron una identidad completa, solo piezas sueltas hechas en momentos distintos.",
    existsBecause:
      "Una identidad no puede vivir solamente en un logo: necesita un sistema completo —verbal, visual, de comportamiento— que se sostenga en el tiempo sin depender de quién lo esté aplicando ese día.",
    generatesValue:
      "Haciendo que cada nueva pieza de comunicación parta de una base clara, en lugar de inventarse desde cero cada vez.",
  },
  {
    slug: "digital-experiences",
    name: "Digital Experiences",
    resolves:
      "El momento más frágil de cualquier marca: los primeros segundos en los que alguien decide, sin saberlo del todo, si confía o se va.",
    existsBecause:
      "Un sitio bien diseñado no es una vitrina, es una conversación silenciosa entre una marca y quien la visita.",
    generatesValue: "Convirtiendo la primera impresión digital en la mejor versión posible de esa conversación.",
  },
  {
    slug: "product-design",
    name: "Product Design",
    resolves: "La distancia entre lo que un producto promete y lo que realmente entrega a quien lo usa.",
    existsBecause:
      "La funcionalidad y la identidad nunca deberían competir entre sí: un producto puede ser, al mismo tiempo, fácil de usar y profundamente propio.",
    generatesValue:
      "En la retención silenciosa que produce una experiencia bien pensada, la que nadie nota porque nunca genera fricción.",
  },
  {
    slug: "creative-direction",
    name: "Creative Direction",
    resolves:
      "El problema de las marcas que trabajan con muchos proveedores distintos y terminan, sin darse cuenta, hablando con varias voces a la vez.",
    existsBecause:
      "La coherencia no ocurre sola: alguien tiene que sostenerla activamente, decisión tras decisión, mucho después de que termina el proyecto inicial.",
    generatesValue: "Protegiendo, en el tiempo, la identidad que costó tanto construir.",
  },
  {
    slug: "content-systems",
    name: "Content Systems",
    resolves: "La inconsistencia de voz que aparece cuando el contenido se produce rápido y sin un criterio detrás que lo sostenga.",
    existsBecause: "Una marca no se construye una vez: se repite, con disciplina, en cada pieza de contenido que produce.",
    generatesValue:
      "En la acumulación: cada publicación coherente con las anteriores construye más identidad que una publicación aislada, por más viral que sea.",
  },
  {
    slug: "growth",
    name: "Growth",
    resolves:
      "El estancamiento que aparece cuando una marca ya tiene una identidad sólida pero no sabe cómo traducirla en resultados medibles.",
    existsBecause: "El buen diseño, sin un canal para llegar a las personas correctas, se queda hablando solo.",
    generatesValue: "Conectando el trabajo creativo con datos reales, sin sacrificar identidad por conversión.",
  },
  {
    slug: "automation",
    name: "Automation",
    resolves: "El tiempo perdido en tareas repetitivas que le restan horas al trabajo que sí requiere criterio humano.",
    existsBecause: "Cada hora librada de una tarea mecánica es una hora que puede dedicarse a pensar mejor.",
    generatesValue: "Liberando, no reemplazando, el criterio de las personas que hacen el trabajo importante.",
  },
];

export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}
