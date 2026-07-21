import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Reveal } from "@/components/templates/reveal";

// Respuestas honestas y generales, ancladas en contenido ya real del sitio
// (capabilities.ts, la copy del propio Contact) — deliberadamente sin
// inventar políticas de negocio específicas (plazos exactos, alcance
// internacional) que no están confirmadas en el Brand OS todavía.
const faqs = [
  {
    question: "¿Con qué tipo de clientes trabajan?",
    answer:
      "Con marcas y personas que ya tienen algo real que decir, sin importar el tamaño o la industria — de proyectos de salud a proyectos gastronómicos. No buscamos un rubro específico: buscamos que haya una identidad real detrás para trabajar.",
  },
  {
    question: "¿También desarrollan productos digitales?",
    answer:
      "Sí — Digital Experiences y Product Design son dos de nuestras capacidades reales, no un servicio adicional. Diseñamos, y podemos llevar a producción, sitios y productos digitales completos, no solo la identidad visual que los viste.",
  },
  {
    question: "¿Cómo empieza un proyecto?",
    answer:
      "Escuchando primero. Antes de proponer cualquier solución necesitamos entender tu proyecto — quién sos, qué resolviste hasta ahora y qué es lo que todavía no encuentra su forma. Esa conversación inicial, no un brief genérico, es lo que define el resto.",
  },
  {
    question: "¿Cuánto dura normalmente un proyecto?",
    answer:
      "Depende directamente del alcance — un sistema de marca completo no dura lo mismo que una pieza puntual. Antes de arrancar definimos un cronograma real para ese proyecto específico, no una estimación genérica.",
  },
  {
    question: "¿Trabajan con empresas internacionales?",
    answer:
      "Trabajamos donde tenga sentido el proyecto — la ubicación no es, en sí misma, un filtro. Lo que sí importa es poder sostener una comunicación real y frecuente durante todo el proceso.",
  },
  {
    question: "¿Pueden integrarse con equipos internos?",
    answer:
      "Sí. Cuando ya existe un equipo de diseño, marketing o producto del otro lado, nos sumamos a su forma de trabajar en vez de imponer la nuestra — cómo se da esa integración es parte de lo que se acuerda en la conversación inicial.",
  },
  {
    question: "¿Qué entregables reciben los clientes?",
    answer:
      "Depende de la capacidad — un sistema de marca completo entrega lineamientos verbales, visuales y de comportamiento; un proyecto digital entrega el producto o sitio funcionando, no solo un diseño. En cualquier caso, algo que tu equipo pueda sostener y aplicar sin depender de que sigamos ahí.",
  },
  {
    question: "¿Cómo solicito una propuesta?",
    answer:
      "Completando el formulario de contacto con el contexto de tu proyecto — no hace falta un brief perfecto, alcanza con lo que tengas claro hoy. Respondemos desde ahí para coordinar la primera conversación.",
  },
];

export function HomeFaq() {
  return (
    <section className="border-t border-(--border-subtle)">
      <Container size="content" className="py-24 sm:py-32">
        <Reveal className="mb-12 max-w-xl sm:mb-16">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            Preguntas frecuentes
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
            Antes de escribirnos, esto puede ahorrarte una vuelta.
          </h2>
        </Reveal>

        <Reveal>
          <Accordion variant="faq" size="md" icon="plus-minus" hiddenUntilFound>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger title={faq.question} />
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
