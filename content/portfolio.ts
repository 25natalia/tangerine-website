import type { PortfolioData } from "@/lib/templates/portfolio";
import { caseStudies } from "./case-studies";

// PortfolioProject es una vista resumida — un valor por proyecto para cada
// campo, curado a mano (categoría, tamaño de card, estado), no derivado
// automáticamente del CaseStudyData completo. `href` apunta al case study
// real de cada proyecto: los cinco ya tienen su página en /work/[slug].
//
// Nota de mapeo honesta: `PortfolioProjectStatus` solo admite "Live" /
// "En proceso" / "Archivado" — no existe una opción para "concepto propio,
// no es un cliente real". QuickBite se mapea a "En proceso" por ser el
// ajuste menos inexacto de los tres, no porque describa la situación con
// precisión. Vale la pena que el Design System sume un cuarto estado
// ("Concept") el día que haya más de un proyecto conceptual en el portfolio.
export const portfolio: PortfolioData = {
  eyebrow: "Work",
  title: "Cinco proyectos, una misma manera de pensar.",
  subtitle:
    "Cada caso documenta el proceso completo detrás de una decisión de diseño: el contexto, las restricciones, las conversaciones, las exploraciones y el resultado final.",
  heroStats: [
    { value: "5", label: "Proyectos" },
    { value: "2025–2026", label: "Años activos" },
    { value: "7", label: "Capacidades del estudio" },
  ],
  sectionStats: [
    { value: "5", label: "Proyectos documentados" },
    { value: "2", label: "Fundadoras" },
    { value: "7", label: "Capacidades" },
    { value: "2025", label: "Primer proyecto" },
  ],
  projects: [
    {
      slug: "alegra-veneers-cali",
      client: "Alegra Veneers Cali",
      title: "Your 5-day smile transformation",
      category: "UX/UI",
      year: "2025",
      services: ["Diseño Web", "Desarrollo"],
      description: "Rediseño completo de una clínica odontológica para captar pacientes internacionales.",
      status: "Live",
      pattern: "destello",
      accent: "info",
      size: "large",
      href: "/work/alegra-veneers-cali",
    },
    {
      slug: "simer",
      client: "SIMER — Universidad Icesi",
      title: "Una identidad que no se sintiera clínica",
      category: "Branding",
      year: "2025",
      services: ["Brand Identity"],
      description: "Identidad visual para un semillero de medicina de emergencias, en dos semanas.",
      status: "Live",
      pattern: "hoja",
      accent: "green",
      size: "medium",
      href: "/work/simer",
    },
    {
      slug: "una-noche",
      client: "Una Noche",
      title: "Un símbolo, no un logo",
      category: "Branding",
      year: "2025",
      services: ["Brand Identity"],
      description: "Una identidad de marca construida desde cero alrededor de un símbolo propio: el dado.",
      status: "Live",
      pattern: "semillas",
      accent: "tangerine",
      size: "medium",
      href: "/work/una-noche",
    },
    {
      slug: "margarita-burgos",
      client: "Margarita Burgos",
      title: "La sabiduría como símbolo de una buena asesoría",
      category: "Branding",
      year: "2025",
      services: ["Personal Branding", "Automatización"],
      description: "Marca personal y ecosistema digital para una asesora de seguros.",
      status: "En proceso",
      pattern: "flor",
      accent: "purple",
      size: "medium",
      href: "/work/margarita-burgos",
    },
    {
      slug: "quickbite",
      client: "QuickBite",
      title: "Comprar saludable no debería tomar más tiempo",
      category: "E-commerce",
      year: "2026",
      services: ["Brand Identity", "UX/UI", "E-commerce"],
      description: "Concept proposal: identidad y experiencia ecommerce para un supermercado saludable.",
      status: "En proceso",
      pattern: "hoja",
      accent: "tangerine",
      size: "small",
      href: "/work/quickbite",
    },
  ],
};

// Confirma en build time que el orden de portfolio.projects coincide con
// caseStudies — si alguna vez diverge, es un error de contenido, no algo
// que deba fallar en silencio.
if (portfolio.projects.length !== caseStudies.length) {
  throw new Error("content/portfolio.ts y content/case-studies no tienen la misma cantidad de proyectos.");
}
