import { headers } from "next/headers";
import {
  BRAND,
  SERVICES,
  type BrandProfile,
  type Locale,
  type ServiceSlug,
} from "@/lib/constants";
import { getFaqItems } from "@/lib/cms/fetchers";
import type { FaqView } from "@/lib/cms/types";
import { absoluteUrl, localizePath } from "@/lib/utils";
import { TFC_FAQ_ITEMS, type FaqItem } from "@/lib/seo/faq-items";
import {
  POSTAL_ADDRESS_MAIN,
  POSTAL_ADDRESS_BRANCH,
  GEO_COORDINATES,
  TELEPHONES,
  buildContactPoints,
  buildSameAs,
  localBusinessId,
  brandId,
} from "@/lib/seo/schemas";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type HowToStep = {
  name: string;
  text: string;
};

async function JsonLdScript({ data }: { data: unknown }) {
  const h = await headers();
  const nonce = h.get("x-nonce") ?? undefined;
  return (
    <script
      suppressHydrationWarning
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function LocalBusinessJsonLd({
  brand,
  locale,
}: {
  brand: BrandProfile;
  locale: Locale;
}) {
  const telephones = [brand.phone, brand.phone2, brand.mainPhone, brand.branchPhone]
    .filter((value): value is string => Boolean(value));
  const address = brand.postalAddress
    ? {
        "@type": "PostalAddress",
        ...brand.postalAddress,
      }
    : POSTAL_ADDRESS_MAIN;
  const geo =
    brand.geoLatitude && brand.geoLongitude
      ? {
          "@type": "GeoCoordinates",
          latitude: brand.geoLatitude,
          longitude: brand.geoLongitude,
        }
      : GEO_COORDINATES;
  const sameAs = brand.social
    ? Object.values(brand.social).filter((value): value is string =>
        Boolean(value),
      )
    : buildSameAs();

  const schema = {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": localBusinessId(),
    name: brand.companyName,
    alternateName: "دی فلائٹ سینٹر ٹریول اینڈ ٹورز",
    url: absoluteUrl("/"),
    telephone: telephones.length > 0 ? telephones : TELEPHONES,
    email: brand.email,
    address,
    geo,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    priceRange: "$$",
    hasCredential: "IATA Certified Travel Agency",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Branch Office",
        value: brand.branchOffice ?? POSTAL_ADDRESS_BRANCH.streetAddress,
      },
    ],
    areaServed: [
      "Pakistan",
      "Saudi Arabia",
      "UAE",
      "Qatar",
      "Kuwait",
      "Oman",
      "Bahrain",
    ],
    knowsAbout: [
      "Umrah Packages",
      "Visit Visa Services",
      "International Ticket Booking",
      "Tour Packages",
      "Hotel Reservations",
    ],
    sameAs,
    inLanguage: locale === "ur" ? ["ur", "en"] : ["en", "ur"],
  };

  return <JsonLdScript data={schema} />;
}

export async function ServiceJsonLd({
  locale,
  slug,
  name,
  description,
}: {
  locale: Locale;
  slug: ServiceSlug;
  name: string;
  description: string;
}) {
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(localizePath(locale, service.href))}#service`,
    name,
    description,
    serviceType: name,
    url: absoluteUrl(localizePath(locale, service.href)),
    image: absoluteUrl(service.image),
    areaServed: ["Pakistan", "Saudi Arabia", "UAE", "Qatar", "Kuwait", "Oman"],
    provider: {
      "@type": "TravelAgency",
      "@id": brandId(),
      name: BRAND.companyName,
      url: absoluteUrl("/"),
      telephone: BRAND.phone,
      email: BRAND.email,
      address: POSTAL_ADDRESS_MAIN,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(localizePath(locale, "/contact")),
      availableLanguage: ["en", "ur"],
    },
  };

  return <JsonLdScript data={schema} />;
}

export async function FAQJsonLd({
  items = TFC_FAQ_ITEMS,
  locale = "en",
}: {
  items?: FaqItem[];
  locale?: "en" | "ur";
}) {
  const resolvedItems =
    items === TFC_FAQ_ITEMS
      ? ((await getFaqItems(locale)) ??
        TFC_FAQ_ITEMS.map<FaqView>((item, index) => ({
          id: item.id,
          question: item.question[locale],
          answer: item.answer[locale],
          sortOrder: index,
        })))
      : items.map<FaqView>((item, index) => ({
          id: item.id,
          question: item.question[locale],
          answer: item.answer[locale],
          sortOrder: index,
        }));

  if (resolvedItems.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "ur" ? "ur-PK" : "en-PK",
    mainEntity: resolvedItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return <JsonLdScript data={schema} />;
}


export async function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return <JsonLdScript data={schema} />;
}

export async function OrganizationJsonLd({
  description,
}: {
  description: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": brandId(),
    name: "The Flight Centre Travel & Tours",
    alternateName: "دی فلائٹ سینٹر ٹریول اینڈ ٹورز",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/tfc-logo-light.webp"),
    description,
    email: BRAND.email,
    telephone: TELEPHONES,
    address: POSTAL_ADDRESS_MAIN,
    contactPoint: buildContactPoints(),
    sameAs: buildSameAs(),
    hasCredential: "IATA Certified Travel Agency",
  };

  return <JsonLdScript data={schema} />;
}

export async function ArticleJsonLd({
  headline,
  description,
  path,
  image,
  datePublished = "2025-01-01",
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline,
    description,
    url: absoluteUrl(path),
    image: [absoluteUrl(image)],
    datePublished,
    dateModified: dateModified ?? new Date().toISOString().slice(0, 10),
    author: {
      "@type": "Organization",
      name: BRAND.companyName,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.companyName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/tfc-logo-light.webp"),
      },
    },
    mainEntityOfPage: absoluteUrl(path),
  };

  return <JsonLdScript data={schema} />;
}

export async function HowToJsonLd({
  name,
  description,
  path,
  steps,
}: {
  name: string;
  description: string;
  path: string;
  steps: HowToStep[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${absoluteUrl(path)}#howto`,
    name,
    description,
    url: absoluteUrl(path),
    totalTime: "P14D",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    mainEntityOfPage: absoluteUrl(path),
  };

  return <JsonLdScript data={schema} />;
}

export async function SpeakableJsonLd({
  path,
  cssSelectors,
}: {
  path: string;
  cssSelectors: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
  return <JsonLdScript data={schema} />;
}
