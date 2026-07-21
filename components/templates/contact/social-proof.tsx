import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { socialProofClients, testimonial } from "@/lib/templates/contact-data";

/**
 * Kept deliberately quiet — plain wordmarks, one testimonial, no logo wall
 * or carousel. The brief is explicit: "no saturar." This is a supporting
 * beat before the FAQ, not a second hero.
 */
export function SocialProof() {
  return (
    <div className="border-t border-(--border-subtle) bg-(--background-subtle)">
      <Container size="wide" className="py-16 sm:py-20">
        <p className="text-caption text-center font-semibold tracking-wide text-(--text-tertiary) uppercase">
          Estudios y equipos que ya construyeron con nosotros
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {socialProofClients.map((client) => (
            <span key={client.name} className="font-display text-lg text-(--text-secondary) sm:text-xl">
              {client.name}
            </span>
          ))}
        </div>

        <figure className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-4 text-center">
          <Quote className="size-6 text-(--icon-brand)" aria-hidden="true" />
          <blockquote className="text-title text-balance text-foreground">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="text-body-sm text-(--text-secondary)">
            {testimonial.author} — {testimonial.role}
          </figcaption>
        </figure>
      </Container>
    </div>
  );
}
