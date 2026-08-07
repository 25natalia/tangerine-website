"use client";

import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useLanguage } from "@/lib/i18n/language-context";

export function ContactFaq() {
  const { t } = useLanguage();
  const copy = t.contact.faq;

  return (
    <Container size="content" className="py-16 sm:py-20">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">{copy.title}</h2>
      <Accordion variant="faq" className="mt-8">
        {copy.items.map((item, i) => (
          <AccordionItem key={item.question} value={String(i)}>
            <AccordionTrigger title={item.question} />
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
}
