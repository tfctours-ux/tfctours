// src/lib/seo/schemas.ts
import { BRAND, getBaseUrl } from "@/lib/constants";

export const POSTAL_ADDRESS_MAIN = {
  "@type": "PostalAddress",
  streetAddress: "Office 36-37, Jinnah Stadium",
  addressLocality: "Gujranwala",
  addressRegion: "Punjab",
  postalCode: "52250",
  addressCountry: "PK",
} as const;

export const POSTAL_ADDRESS_BRANCH = {
  "@type": "PostalAddress",
  streetAddress: "Plaza 18, Neelum Block, DC Colony",
  addressLocality: "Gujranwala",
  addressRegion: "Punjab",
  addressCountry: "PK",
} as const;

export const GEO_COORDINATES = {
  "@type": "GeoCoordinates",
  latitude: "32.1617",
  longitude: "74.1883",
} as const;

export const TELEPHONES = ["+923041119786", "+923008623818", "111786788"] as const;

export function buildContactPoints() {
  return [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+923041119786",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
    {
      "@type": "ContactPoint",
      contactType: "reservations",
      telephone: "111786788",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      telephone: "+923041119786",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
  ];
}

export function buildSameAs() {
  return [
    BRAND.social?.facebook,
    BRAND.social?.instagram,
    BRAND.social?.linkedin,
    BRAND.social?.twitter,
    BRAND.social?.tiktok,
  ].filter((v): v is string => Boolean(v));
}

export function brandId() {
  return `${getBaseUrl()}/#organization`;
}

export function localBusinessId() {
  return `${getBaseUrl()}/#localbusiness`;
}
