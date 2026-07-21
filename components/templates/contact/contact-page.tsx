import Image from "next/image";
import { Navbar, NavbarBrand, NavbarLinks, NavbarLink, NavbarActions, NavbarThemeToggle } from "@/components/ui/navbar";
import { Footer, FooterLegal, FooterLink } from "@/components/ui/footer";
import { ContactTemplate } from "./contact-template";

/**
 * The reference full-page assembly — Navbar + ContactTemplate + Footer,
 * same composition pattern as every other template's `*Page` export.
 * `variant="corporate"` on Footer, same reasoning as Portfolio Gallery: this
 * page already ends on its own quiet beat (the FAQ), so the Footer doesn't
 * need to be a second spectacle.
 */
export function ContactPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar variant="solid" position="sticky">
        <NavbarBrand href="/">
          <Image src="/brand/logo.svg" alt="Tangerine" width={96} height={24} className="h-6 w-auto" />
        </NavbarBrand>
        <NavbarLinks>
          <NavbarLink href="/templates">Templates</NavbarLink>
          <NavbarLink href="/components">Components</NavbarLink>
          <NavbarLink href="/foundations">Foundations</NavbarLink>
        </NavbarLinks>
        <NavbarActions>
          <NavbarThemeToggle />
        </NavbarActions>
      </Navbar>

      <main className="flex-1">
        <ContactTemplate />
      </main>

      <Footer variant="corporate">
        <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-start">
          <Image src="/brand/logo-mark.svg" alt="" width={56} height={98} className="opacity-90" />
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <h3 className="text-caption font-semibold tracking-wide text-(--text-tertiary) uppercase">Sistema</h3>
              <nav className="flex flex-col gap-2.5">
                <FooterLink href="/foundations">Foundations</FooterLink>
                <FooterLink href="/components">Components</FooterLink>
                <FooterLink href="/templates">Templates</FooterLink>
              </nav>
            </div>
          </div>
        </div>
        <FooterLegal className="mt-10">
          <span>© {new Date().getFullYear()} Tangerine Studio</span>
          <span>Contact Template</span>
        </FooterLegal>
      </Footer>
    </div>
  );
}
