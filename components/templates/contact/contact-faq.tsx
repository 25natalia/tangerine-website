"use client";

import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useLanguage } from "@/lib/i18n/language-context";

// `size="wide"` — no `size="content"` (768px): mismo Container que
// ContactHero/ContactTemplate, para que el margen izquierdo no salte al
// llegar a esta sección. Bloque angosto centrado (`mx-auto max-w-3xl`),
// mismo criterio que el resto del sitio (HomeFaq, StudioOrigin/Manifesto).
export function ContactFaq() {
  const { t } = useLanguage();
  const copy = t.contact.faq;

  return (
    <Container size="wide" className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{copy.title}</h2>
        <Accordion variant="faq" className="mt-8">
          {copy.items.map((item, i) => (
            <AccordionItem key={item.question} value={String(i)}>
              <AccordionTrigger title={item.question} />
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}
