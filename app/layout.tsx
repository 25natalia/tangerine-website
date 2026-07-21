import type { Metadata } from "next";
import { Baloo_2, Roboto, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { OrganizationJsonLd } from "@/components/json-ld";
import "./globals.css";

// Same font stack as tangerine-design-system, portado sin modificar — ver
// DESIGN_SYSTEM_SYNC.md. Baloo 2 sigue siendo el fallback visual de la
// fuente display hasta que existan los archivos con licencia de Cocogoose
// Display (bloqueado en ambos repos, no solo en este).
const baloo2 = Baloo_2({
  variable: "--font-baloo-2",
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

// Corte de acento Cocogoose Regular (400) — self-hosted, distinto de la
// fuente display de headlines. Ver el comentario extenso en globals.css
// sobre por qué el nombre interno del @font-face es "Cocogoose Display" y
// nunca "Cocogoose" a secas.
const cocogooseRegular = localFont({
  src: "../public/fonts/Cocogoose-Regular.otf",
  variable: "--font-cocogoose-regular-src",
  weight: "400",
  style: "normal",
  display: "swap",
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
      className={`${baloo2.variable} ${roboto.variable} ${geistMono.variable} ${cocogooseRegular.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
