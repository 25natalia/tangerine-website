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

// Contenido propio de la web (nunca del Design System) — la arquitectura de
// información definida en el roadmap: Home, Studio, Capabilities, Work, Contact.
const primaryLinks = [
  { href: "/studio", label: "Studio" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function SiteNavbar() {
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
