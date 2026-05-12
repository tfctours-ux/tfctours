import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import {
  GUIDES,
  SERVICES,
  type GuideSlug,
  type Locale,
  type ServiceSlug,
} from "./constants";
import { buildMetadata } from "./utils";

export type LocaleParams = Promise<{ locale: string }>;

type ServiceSeoKey = ServiceSlug;

const SERVICE_SEO: Partial<
  Record<ServiceSeoKey, { title: string; description: string; keywords: string[] }>
> = {
  "ticket-booking": {
    title: "Airline Ticket Booking Pakistan | All Airlines | The Flight Centre",
    description:
      "Book domestic and international flight tickets from Pakistan with The Flight Centre Travel & Tours. All airlines, all destinations, fare guidance and instant e-ticket support.",
    keywords: [
      "airline ticket booking Pakistan",
      "all airlines booking",
      "The Flight Centre",
      "tfctours",
      "Gujranwala travel agency",
    ],
  },
  "visit-visa": {
    title: "Visa Services All Countries | Pakistan Visa Agency | The Flight Centre",
    description:
      "Visa services from Pakistan for visit, tourist, business, family and other travel categories. Get documentation guidance and application support from The Flight Centre Travel & Tours.",
    keywords: [
      "visit visa services Pakistan",
      "all countries visa agency",
      "The Flight Centre",
      "tfctours",
      "Gujranwala travel agency",
    ],
  },
  "tour-packages": {
    title: "International Tour Packages from Pakistan | The Flight Centre",
    description:
      "Explore family tours, honeymoon packages, adventure tours and customized international itineraries with hotels and meals from The Flight Centre Travel & Tours.",
    keywords: [
      "international tour packages Pakistan",
      "holiday packages Pakistan",
      "The Flight Centre",
      "tfctours",
      "Gujranwala travel agency",
    ],
  },
  "hotel-booking": {
    title: "Worldwide Hotels | Pakistan Travel Agency | The Flight Centre",
    description:
      "Book worldwide hotels through The Flight Centre Travel & Tours with best-price guidance, luxury-to-budget options, secure reservations and instant confirmation.",
    keywords: [
      "worldwide hotel booking Pakistan",
      "hotel reservation travel agency",
      "The Flight Centre",
      "tfctours",
      "Gujranwala travel agency",
    ],
  },
  "travel-insurance": {
    title: "Travel Insurance Deals Pakistan | Worldwide Coverage | The Flight Centre",
    description:
      "Get travel insurance deals in Pakistan with medical coverage, trip cancellation, baggage protection, 24/7 assistance and worldwide coverage.",
    keywords: [
      "travel insurance Pakistan",
      "worldwide travel coverage",
      "The Flight Centre",
      "tfctours",
      "Gujranwala travel agency",
    ],
  },
  "umrah-packages": {
    title: "Umrah Packages 2025 | The Flight Centre | Gujranwala",
    description:
      "Plan a spiritual journey with Umrah packages from Pakistan covering Makkah and Madinah hotels, visa, ticket, transport, Ziyarat and guided support.",
    keywords: [
      "Umrah packages 2025 Pakistan",
      "Umrah package Gujranwala",
      "The Flight Centre Umrah",
    ],
  },
};

export async function getLocaleFromParams(params: LocaleParams) {
  const { locale } = await params;
  return locale as Locale;
}

export async function buildLocalizedPageMetadata(
  params: LocaleParams,
  namespace: string,
  path: string,
  keywords: string[] = [],
): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace });

  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path,
    keywords,
  });
}

export async function buildServiceMetadata(
  params: LocaleParams,
  slug: ServiceSlug,
): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  const service = SERVICES.find((item) => item.slug === slug);
  const seo = SERVICE_SEO[slug] ?? {
    title: service?.slug
      ? `${service.slug} | The Flight Centre Travel & Tours`
      : "The Flight Centre Travel & Tours",
    description:
      "Travel services from The Flight Centre Travel & Tours in Gujranwala, Pakistan.",
    keywords: ["The Flight Centre", "tfctours", "Gujranwala travel agency"],
  };

  return buildMetadata({
    locale,
    title: seo.title,
    absoluteTitle: seo.title,
    description: seo.description,
    path: `/services/${slug}`,
    image: service?.image,
    imageAlt: seo.title,
    keywords: seo.keywords,
  });
}

export async function buildGuideMetadata(
  params: LocaleParams,
  slug: GuideSlug,
): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  const guide = GUIDES.find((item) => item.slug === slug);
  const t = await getTranslations({
    locale,
    namespace: `guidePages.${slug}.meta`,
  });

  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: `/guides/${slug}`,
    image: guide?.image,
    imageAlt: t("title"),
    keywords: ["travel guide", "visa guide", slug],
  });
}
