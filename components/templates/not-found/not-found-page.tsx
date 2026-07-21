import Image from "next/image";
import { Navbar, NavbarBrand, NavbarLinks, NavbarLink, NavbarActions, NavbarThemeToggle } from "@/components/ui/navbar";
import { Footer, FooterLegal, FooterLink } from "@/components/ui/footer";
import { NotFoundTemplate, type NotFoundCta } from "./not-found-template";

/**
 * The one full-page composition, reused as-is by both the site's real
 * `app/not-found.tsx` and its `/preview/404` documentation preview — the
 * same page, not two maintained copies of the same Navbar/Footer wiring.
 * `NotFoundTemplate` itself stays chrome-free for anyone reusing it with
 * different chrome; this is Tangerine's own reference assembly of it.
 */
export function NotFoundPage({ ctas }: { ctas?: NotFoundCta[] }) {
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

      <main className="flex flex-1 flex-col">
        <NotFoundTemplate ctas={ctas} />
      </main>

      <Footer variant="minimal">
        <nav className="flex gap-6" aria-label="Enlaces">
          <FooterLink href="/introduction">Introduction</FooterLink>
          <FooterLink href="/resources">Resources</FooterLink>
        </nav>
        <FooterLegal className="mt-5">
          <span>© {new Date().getFullYear()} Tangerine Studio</span>
        </FooterLegal>
      </Footer>
    </div>
  );
}
