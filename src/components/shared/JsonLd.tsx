import { BRAND, SERVICES, type Locale, type ServiceSlug } from "@/lib/constants";
import { absoluteUrl, localizePath } from "@/lib/utils";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type HowToStep = {
  name: string;
  text: string;
};

const TFC_FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is The Flight Centre IATA certified?",
    answer:
      "Yes. The Flight Centre Travel & Tours is an IATA certified travel agency based in Gujranwala, Pakistan. We operate from two offices and have been serving clients for over 20 years.",
  },
  {
    question: "Which travel agency in Gujranwala offers Umrah packages?",
    answer:
      "The Flight Centre Travel & Tours at Office 36-37 Jinnah Stadium, Gujranwala offers complete Umrah packages including hotel, air ticket, transport and Umrah visa. Call UAN 111-786-788.",
  },
  {
    question: "What Umrah package durations are available?",
    answer:
      "The Flight Centre offers 15-day, 21-day and 28-day Umrah packages from Pakistan, covering hotel near Haram, return air ticket, Umrah visa, ground transport and Ziyarat.",
  },
  {
    question: "Does The Flight Centre book international flights?",
    answer:
      "Yes. We provide airline ticket booking for all international and domestic routes. Visit our flight booking portal at www.theflightcentre.pk for online bookings.",
  },
  {
    question: "What tour destinations does The Flight Centre cover?",
    answer:
      "We offer curated tour packages to Dubai, Malaysia, Thailand, Singapore, Bahrain, Azerbaijan, Oman, Cambodia, Sri Lanka, Iran, Indonesia and 50+ more destinations.",
  },
  {
    question: "How do I get a visit visa through The Flight Centre?",
    answer:
      "Contact our office with your destination and travel dates. We provide document guidance, application support and processing assistance for all countries.",
  },
  {
    question: "Does The Flight Centre offer a B2B portal for travel agents?",
    answer:
      "Yes. The Flight Centre offers a web portal ID for travel agencies with same-day activation. Features include multi-user ID support, ticket management and round-the-clock connectivity. Visit agent.tfctours.com.",
  },
  {
    question: "What is the UAN number for The Flight Centre?",
    answer:
      "The UAN is 111-786-788. You can also call 0304-111-9-786 or reach our 24/7 helpdesk on the same number.",
  },
];

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const sameAs = [
    BRAND.social?.facebook,
    BRAND.social?.instagram,
    BRAND.social?.linkedin,
    BRAND.social?.twitter,
  ].filter((value): value is string => Boolean(value));

  const schema = {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": absoluteUrl("/#localbusiness"),
    name: "The Flight Centre Travel & Tours",
    alternateName: "دی فلائٹ سینٹر ٹریول اینڈ ٹورز",
    url: absoluteUrl("/"),
    telephone: ["+923041119786", "111786788"],
    email: "info@tfctours.com.pk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office 36-37, Jinnah Stadium",
      addressLocality: "Gujranwala",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "32.1617",
      longitude: "74.1883",
    },
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
        value: "Plaza 18, Neelum Block DC Colony, Gujranwala",
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

export function ServiceJsonLd({
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
      "@id": absoluteUrl("/#organization"),
      name: BRAND.companyName,
      url: absoluteUrl("/"),
      telephone: BRAND.phone,
      email: BRAND.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office 36-37, Jinnah Stadium",
        addressLocality: "Gujranwala",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(localizePath(locale, "/contact")),
      availableLanguage: ["en", "ur"],
    },
  };

  return <JsonLdScript data={schema} />;
}

export function FAQJsonLd({ items = TFC_FAQ_ITEMS }: { items?: FaqItem[] }) {
  if (items.length === 0) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
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

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
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

export function OrganizationJsonLd({
  description,
}: {
  description: string;
}) {
  const sameAs = [
    BRAND.social?.facebook,
    BRAND.social?.instagram,
    BRAND.social?.linkedin,
    BRAND.social?.twitter,
  ].filter((value): value is string => Boolean(value));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: "The Flight Centre Travel & Tours",
    alternateName: "دی فلائٹ سینٹر ٹریول اینڈ ٹورز",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/tfc-logo-light.webp"),
    description,
    email: "info@tfctours.com.pk",
    telephone: ["+923041119786", "111786788"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office 36-37, Jinnah Stadium",
      addressLocality: "Gujranwala",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+923041119786",
        areaServed: "PK",
        availableLanguage: ["en", "ur"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "111786788",
        areaServed: "PK",
        availableLanguage: ["en", "ur"],
      },
      {
        "@type": "ContactPoint",
        contactType: "24/7 helpdesk",
        telephone: "+923041119786",
        areaServed: "PK",
        availableLanguage: ["en", "ur"],
      },
    ],
    sameAs,
    hasCredential: "IATA Certified Travel Agency",
  };

  return <JsonLdScript data={schema} />;
}

export function ArticleJsonLd({
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

export function HowToJsonLd({
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
