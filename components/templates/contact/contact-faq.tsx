import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { faqItems } from "@/lib/templates/contact-data";

export function ContactFaq() {
  return (
    <Container size="content" className="py-16 sm:py-20">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">Preguntas frecuentes</h2>
      <Accordion variant="faq" className="mt-8">
        {faqItems.map((item, i) => (
          <AccordionItem key={item.question} value={String(i)}>
            <AccordionTrigger title={item.question} />
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
}
