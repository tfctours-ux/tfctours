// src/lib/constants.ts
import { locales, type AppLocale } from "@/i18n";

export const LOCALES = locales;

export type Locale = AppLocale;

export const BASE_URL = "https://www.tfctours.com";

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return new URL(withProtocol).origin;
}

export function getBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    return BASE_URL;
  }

  try {
    return normalizeSiteUrl(siteUrl);
  } catch {
    return BASE_URL;
  }
}

export type ServiceSlug =
  | "ticket-booking"
  | "visit-visa"
  | "tour-packages"
  | "hotel-booking"
  | "travel-insurance"
  | "umrah-packages";

export type AnyServiceSlug = ServiceSlug;

export type ExtendedServiceSlug = "work-visa" | "saudi-wakala";
export type AnyExtendedServiceSlug = ServiceSlug | ExtendedServiceSlug;

export type GuideSlug = "saudi-visa-guide" | "visit-visa-guide";

export type ServiceIconName =
  | "tickets"
  | "visa"
  | "tour"
  | "hotel"
  | "insurance"
  | "umrah";

export interface BrandProfile {
  companyName: string;
  tagline: string;
  ceo: string;
  phone: string;
  phone2?: string;
  uan: string;
  helpdesk?: string;
  email: string;
  office: string;
  officeUr?: string;
  mainOffice?: string;
  mainOfficeUr?: string;
  branchOffice?: string;
  branchOfficeUr?: string;
  mainPhone?: string;
  branchPhone?: string;
  geoLatitude?: string;
  geoLongitude?: string;
  logoLightUrl?: string;
  logoDarkUrl?: string;
  postalAddress?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  website: string;
  iata?: boolean;
  social?: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    tiktok?: string;
  };
}

export interface ServiceConfig {
  slug: ServiceSlug | string;
  href: `/services/${string}`;
  icon: ServiceIconName;
  image: string;
  accentClass: string;
  featured?: boolean;
}

export interface GuideConfig {
  slug: GuideSlug;
  href: `/guides/${GuideSlug}`;
  image: string;
  readMinutes: number;
}

export interface GalleryImage {
  id: string;
  image: string;
}

export const BRAND: BrandProfile = {
  companyName: "The Flight Centre Travel & Tours",
  tagline: "Your Gateway to the World",
  ceo: "Rana Khalid Parvez Khan",
  phone: "+92 304 1119786",
  phone2: "+92 300 8623818",
  uan: "111-786-788",
  helpdesk: "0304-111-9-786",
  email: "info@tfctours.com.pk",
  office: "Office 36, 37 Jinnah Stadium, Gujranwala, Pakistan",
  mainOffice: "Office 36, 37 Jinnah Stadium, Gujranwala, Pakistan",
  branchOffice: "Plaza 18, Neelum Block DC Colony, Gujranwala, Pakistan",
  mainPhone: "+92 55 37 30 255/56",
  branchPhone: "+92 55 3783054-55",
  website: BASE_URL,
  iata: true,
  social: {
    facebook: "https://www.facebook.com/theflightcentre",
    instagram: "https://www.instagram.com/theflightcentre",
    linkedin: "https://www.linkedin.com/company/theflightcentre",
    twitter: "https://www.twitter.com/theflightcentre",
    tiktok: "https://www.tiktok.com/@theflightcentre",
  },
};

export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "umrah", href: "/umrah" },
  { key: "tours", href: "/tours" },
  { key: "contact", href: "/contact" },
] as const;

export const FLIGHTS_URL = "https://www.theflightcentre.pk/";

export const AGENT_LOGIN_URL = "https://agent.tfctours.com/";

export const SERVICES: readonly ServiceConfig[] = [
  {
    slug: "ticket-booking",
    href: "/services/ticket-booking",
    icon: "tickets",
    image: "/images/ticket-booking.webp",
    accentClass: "from-brand-red/80 to-brand-darkred/90",
  },
  {
    slug: "visit-visa",
    href: "/services/visit-visa",
    icon: "visa",
    image: "/images/visit-visa.webp",
    accentClass: "from-brand-gold/70 to-brand-red/70",
  },
  {
    slug: "tour-packages",
    href: "/services/tour-packages",
    icon: "tour",
    image: "/images/tour-packages.webp",
    accentClass: "from-amber-500/80 to-brand-red/80",
  },
  {
    slug: "umrah-packages",
    href: "/services/umrah-packages",
    icon: "umrah",
    image: "/images/umrah-package.webp",
    accentClass: "from-brand-gold/70 to-brand-black/95",
    featured: true,
  },
  {
    slug: "hotel-booking",
    href: "/services/hotel-booking",
    icon: "hotel",
    image: "/images/hotel-booking.webp",
    accentClass: "from-stone-900/75 to-brand-gold/65",
  },
  {
    slug: "travel-insurance",
    href: "/services/travel-insurance",
    icon: "insurance",
    image: "/images/travel-insurance.webp",
    accentClass: "from-emerald-700/75 to-brand-black/90",
  },
] as const;

export const EXTENDED_SERVICE_META: Record<
  ExtendedServiceSlug,
  {
    image: string;
    href: `/services/${ExtendedServiceSlug}`;
  }
> = {
  "work-visa": {
    image: "/images/work-visa.webp",
    href: "/services/work-visa",
  },
  "saudi-wakala": {
    image: "/images/saudi-wakala.webp",
    href: "/services/saudi-wakala",
  },
};

export const GUIDES: readonly GuideConfig[] = [
  {
    slug: "saudi-visa-guide",
    href: "/guides/saudi-visa-guide",
    image: "/images/madinah-masjid.webp",
    readMinutes: 5,
  },
  {
    slug: "visit-visa-guide",
    href: "/guides/visit-visa-guide",
    image: "/images/japan.webp",
    readMinutes: 4,
  },
] as const;

export const HOME_STATS = [
  { id: "offices", from: 0, to: 2, suffix: "" },
  { id: "countries", from: 0, to: 50, suffix: "+" },
  { id: "clients", from: 0, to: 10000, suffix: "+" },
  { id: "experience", from: 0, to: 20, suffix: "+" },
] as const;

export const GALLERY_IMAGES: readonly GalleryImage[] = [
  { id: "dubai", image: "/images/dubai.webp" },
  { id: "malaysia", image: "/images/malaysia.webp" },
  { id: "thailand", image: "/images/thailand.webp" },
  { id: "singapore", image: "/images/singapore.webp" },
  { id: "bahrain", image: "/images/bahrain.webp" },
  { id: "azerbaijan", image: "/images/azerbaijan.webp" },
] as const;

export const BRAND_IMAGES = {
  logo: "/images/tfc-logo-light.webp",      // light-coloured (for dark backgrounds)
  logoDark: "/images/tfc-logo-dark.webp",   // dark-coloured (for light backgrounds)
  office: "/images/tfc-office.webp",
  hero: "/images/hero-1.webp",
  favicon: "/images/favicon.png",
} as const;
