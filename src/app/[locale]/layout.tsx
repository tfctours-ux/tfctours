// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  DM_Sans,
  Noto_Nastaliq_Urdu,
  Playfair_Display,
} from "next/font/google";
import { headers } from "next/headers";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Script from "next/script";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LocalBusinessJsonLd } from "@/components/shared/JsonLd";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { routing } from "@/i18n/routing";
import { getEffectiveBrand } from "@/lib/cms/effective";
import { getBaseUrl } from "@/lib/constants";
import { absoluteUrl, cn, isRtlLocale } from "@/lib/utils";

import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-noto-nastaliq",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "The Flight Centre Travel & Tours",
    template: "%s | The Flight Centre Travel & Tours",
  },
  description:
    "Pakistan's IATA certified travel agency. Umrah packages, international tours, flight booking, hotel reservations, visit visas. Gujranwala. UAN: 111-786-788",
  keywords: [
    "travel agency Pakistan",
    "Umrah packages 2025",
    "international tours Pakistan",
    "flight booking Gujranwala",
    "visit visa services",
    "The Flight Centre",
    "IATA certified Pakistan",
    "tfctours",
  ],
  authors: [{ name: "The Flight Centre Travel & Tours" }],
  creator: "The Flight Centre Travel & Tours",
  applicationName: "The Flight Centre Travel & Tours",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: getBaseUrl(),
    siteName: "The Flight Centre Travel & Tours",
    title: "The Flight Centre Travel & Tours | Flights, Umrah, Tours & Visas",
    description:
      "Gujranwala's IATA certified travel agency — Umrah packages, international tours, flights, hotels and visas. UAN: 111-786-788",
    images: [
      {
        url: absoluteUrl("/images/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: "The Flight Centre Travel & Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Flight Centre Travel & Tours",
    description: "Gujranwala's IATA certified travel & tours agency",
    images: [absoluteUrl("/images/og-image.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-PK": absoluteUrl("/"),
      "ur-PK": absoluteUrl("/ur"),
      "x-default": absoluteUrl("/"),
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isRtl = isRtlLocale(locale);
  const nonce = (await headers()).get("x-nonce") ?? "";
  const brand = await getEffectiveBrand(locale);

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        `${playfair.variable} ${dmSans.variable} ${notoNastaliq.variable} antialiased`,
      )}
    >
      <head>
        {/*
          Inline anti-FOUC theme script. Placed in <head> so it runs before the
          body paints (same effect as next/script's beforeInteractive). It must
          be a native <script> with suppressHydrationWarning: the browser strips
          the CSP nonce value from the DOM after applying it, so React would
          otherwise flag a server/client nonce mismatch on hydration.
        */}
        <script
          id="tfc-theme-init"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('tfc-theme');var v=t==='light'||t==='dark'?t:'light';var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(v);r.setAttribute('data-tfc-theme',v);r.style.colorScheme=v;}catch(e){}})();`,
          }}
        />
        <LocalBusinessJsonLd locale={locale} brand={brand} />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={cn(
          "overflow-x-clip bg-background text-foreground",
          isRtl
            ? `${notoNastaliq.variable} font-urdu`
            : `${playfair.variable} ${dmSans.variable} font-body`,
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <div
              className="locale-shell relative flex min-h-screen flex-col bg-background"
              dir={isRtl ? "rtl" : "ltr"}
              lang={locale}
            >
              <div aria-hidden className="consular-orb consular-orb-crimson" />
              <div aria-hidden className="consular-orb consular-orb-gold" />
              <div
                aria-hidden
                className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:7rem_7rem] opacity-[0.035]"
              />
              <Navbar />
              <main className="relative z-10 flex-1">{children}</main>
              <Footer brand={brand} />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
