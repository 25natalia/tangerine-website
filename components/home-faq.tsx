import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Reveal } from "@/components/templates/reveal";

// Preguntas reales de un cliente evaluando contratar una agencia de diseño
// digital, no genéricas de plantilla. Respuestas ancladas en contenido ya
// real del sitio (capabilities.ts, el flujo real de Contact) — deliberadamente
// sin inventar nombres de herramientas, tarifas o plazos específicos que no
// están confirmados en el Brand OS todavía.
const faqs = [
  {
    question: "¿Qué tipo de proyectos desarrollan?",
    answer:
      "Desde sistemas de marca completos hasta productos y experiencias digitales — Brand Systems, Digital Experiences, Product Design, Creative Direction, Content Systems, Growth y Automation son las siete formas en las que aplicamos la misma manera de pensar a un problema distinto.",
  },
  {
    question: "¿Trabajan con startups o con empresas grandes?",
    answer:
      "Con ambas. No buscamos un tamaño de empresa específico, sino que haya una identidad real detrás para trabajar — el tamaño cambia el alcance del proyecto, no el criterio con el que lo encaramos.",
  },
  {
    question: "¿Qué herramientas utilizan?",
    answer:
      "Las que mejor se adapten a cada proyecto — priorizamos el resultado sobre el apego a una herramienta en particular. Lo que sí se mantiene siempre igual es el criterio: investigar antes de proponer, documentar las decisiones, y dejarte un sistema que tu equipo pueda sostener sin depender de nosotros.",
  },
  {
    question: "¿Cuánto dura un proyecto?",
    answer:
      "Depende directamente del alcance — un sistema de marca completo no dura lo mismo que una pieza puntual. Antes de arrancar definimos un cronograma real para ese proyecto específico, no una estimación genérica.",
  },
  {
    question: "¿Cómo funcionan los precios y las cotizaciones?",
    answer:
      "Cada cotización se arma después de entender tu proyecto, no antes — por eso no tenemos una tarifa fija publicada. Nos escribís por el formulario de contacto con el contexto de lo que necesitás, y desde ahí coordinamos la conversación que define el alcance y la propuesta.",
  },
];

export function HomeFaq() {
  return (
    <section>
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
