import type { ReactNode } from "react";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

// El chrome se decide una sola vez acá — ninguna página de marketing es
// dueña de su propio Navbar/Footer. Ver ARCHITECTURE.md.
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNavbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
