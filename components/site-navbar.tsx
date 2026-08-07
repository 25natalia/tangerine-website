"use client";

import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
  NavbarThemeToggle,
  NavbarMobileMenu,
} from "@/components/ui/navbar";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/i18n/language-context";

export function SiteNavbar() {
  // Contenido propio de la web (nunca del Design System) — la arquitectura de
  // información definida en el roadmap: Home, Studio, Capabilities, Work,
  // Contact. Los labels vienen del diccionario ES/EN — todos idénticos en
  // los dos idiomas (nombres de sección ya en inglés en el sitio en
  // español), salvo "Home", que sí se traduce a "Inicio" en ES — ver
  // lib/i18n/dictionaries/es.ts. Mismo array alimenta el menú desktop y el
  // hamburguesa mobile, así que un solo link nuevo aparece en los dos.
  const { t } = useLanguage();
  const primaryLinks = t.nav.links;

  return (
    <Navbar variant="blur" position="sticky">
      <NavbarBrand href="/">
        <Image src="/brand/logo.svg" alt="Tangerine Studio" width={96} height={24} className="h-6 w-auto" />
      </NavbarBrand>

      <NavbarLinks>
        {primaryLinks.map((link) => (
          <NavbarLink key={link.href} href={link.href}>
            {link.label}
          </NavbarLink>
        ))}
      </NavbarLinks>

      <NavbarActions>
        <LanguageToggle />
        <NavbarThemeToggle />
        <NavbarMobileMenu>
          {primaryLinks.map((link) => (
            <NavbarLink key={link.href} href={link.href}>
              {link.label}
            </NavbarLink>
          ))}
        </NavbarMobileMenu>
      </NavbarActions>
    </Navbar>
  );
}
