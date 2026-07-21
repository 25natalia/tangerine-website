import { Container } from "@/components/ui/container";
import { ContactHero } from "./contact-hero";
import { ContactForm, type ContactFormProps } from "./contact-form";
import { ContactSidebar } from "./contact-sidebar";
import { SocialProof } from "./social-proof";
import { ContactFaq } from "./contact-faq";

export interface ContactTemplateProps {
  /** Forwarded to `ContactForm` — wire a real submit handler here. */
  onSubmit?: ContactFormProps["onSubmit"];
  /**
   * `SocialProof` reads `socialProofClients`/`testimonial` from
   * `lib/templates/contact-data.ts`, which are this template's own demo
   * content — a real consumer almost never has a matching real testimonial
   * on day one. Set false to omit the section entirely instead of shipping
   * placeholder clients as if they were real. @default true
   */
  showSocialProof?: boolean;
}

/**
 * Deliberately not a 50/50 split — the brief explicitly rules that out. The
 * form is the wider, dominant column (it's the actual task); the sidebar is
 * a fixed 360px companion, not an equal partner, and drops below the form
 * on mobile instead of above it — the form is still the point of the page
 * on a small screen.
 */
export function ContactTemplate({ onSubmit, showSocialProof = true }: ContactTemplateProps = {}) {
  return (
    <article>
      <ContactHero />
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <ContactForm onSubmit={onSubmit} />
          <ContactSidebar />
        </div>
      </Container>
      {showSocialProof ? <SocialProof /> : null}
      <ContactFaq />
    </article>
  );
}
