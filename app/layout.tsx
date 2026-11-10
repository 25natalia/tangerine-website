import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Roboto, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { OrganizationJsonLd } from "@/components/json-ld";
import { CookieConsent } from "@/components/cookie-consent";
import { CONSENT_KEY } from "@/lib/consent";
import "./globals.css";

// Google Tag Manager container ID.
const GTM_ID = "GTM-N4ZL7X8T";

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
      className={`${plusJakartaSans.variable} ${roboto.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Google Tag Manager — con Consent Mode v2: antes de cargar GTM se fija
            analytics_storage según lo que la persona eligió en el aviso de
            cookies (components/cookie-consent.tsx); sin elección, "denied". */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c=null;try{c=localStorage.getItem('${CONSENT_KEY}');}catch(e){}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:c==='granted'?'granted':'denied',wait_for_update:500});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <OrganizationJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <CookieConsent />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
