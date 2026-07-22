import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { OrganizationJsonLd } from "@/components/json-ld";
import "./globals.css";

// Same font stack as tangerine-design-system, portado sin modificar — ver
// DESIGN_SYSTEM_SYNC.md. Plus Jakarta Sans es la tipografía dominante
// (títulos, headings, navegación, botones, cards, badges, UI, hero, CTAs);
// Roboto queda reservada para lectura larga (--font-reading en
// globals.css, aplicado a los roles Body Large/Body/Body Small).
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Tangerine Studio existe porque el mundo tiene, cada vez más, marcas y personas que funcionan perfecto y dicen cada vez menos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${roboto.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <OrganizationJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
