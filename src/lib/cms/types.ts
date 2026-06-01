// src/lib/cms/types.ts
import type { InferSelectModel } from "drizzle-orm";

import type { PageBlock } from "./json-shapes";
import {
  brandSettings,
  calculatorOptions,
  faqItems,
  galleryImages,
  galleryImageTranslations,
  guides,
  guideTranslations,
  homeStats,
  navLinks,
  pages,
  pageTranslations,
  seoOverrides,
  services,
  serviceTranslations,
  toursDestinations,
  translations,
  transportOptions,
  umrahPackages,
} from "./schema";

export type BrandSettings = InferSelectModel<typeof brandSettings>;
export type Translation = InferSelectModel<typeof translations>;
export type NavLink = InferSelectModel<typeof navLinks>;
export type Service = InferSelectModel<typeof services>;
export type ServiceTranslation = InferSelectModel<typeof serviceTranslations>;
export type Guide = InferSelectModel<typeof guides>;
export type GuideTranslation = InferSelectModel<typeof guideTranslations>;
export type GalleryImage = InferSelectModel<typeof galleryImages>;
export type GalleryImageTranslation = InferSelectModel<
  typeof galleryImageTranslations
>;
export type TourDestination = InferSelectModel<typeof toursDestinations>;
export type UmrahPackage = InferSelectModel<typeof umrahPackages>;
export type HomeStat = InferSelectModel<typeof homeStats>;
export type FaqItem = InferSelectModel<typeof faqItems>;
export type CalculatorOption = InferSelectModel<typeof calculatorOptions>;
export type TransportOption = InferSelectModel<typeof transportOptions>;
export type Page = InferSelectModel<typeof pages>;
export type PageTranslation = InferSelectModel<typeof pageTranslations>;
export type SeoOverride = InferSelectModel<typeof seoOverrides>;

export interface BrandView {
  companyName: string;
  taglineEn: string | null;
  taglineUr: string | null;
  ceoName: string | null;
  primaryPhone: string;
  secondaryPhone: string | null;
  uan: string | null;
  helpdesk: string | null;
  email: string;
  mainOfficeEn: string | null;
  mainOfficeUr: string | null;
  mainPhone: string | null;
  branchOfficeEn: string | null;
  branchOfficeUr: string | null;
  branchPhone: string | null;
  geoLatitude: string | null;
  geoLongitude: string | null;
  postalAddress: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  } | null;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    tiktok?: string;
  };
  logoLightUrl: string | null;
  logoDarkUrl: string | null;
  iataСertified: boolean;
}

export interface NavLinkView {
  key: string;
  href: string;
  label: string;
  isExternal: boolean;
  sortOrder: number;
}

export interface ServiceView {
  slug: string;
  icon: string;
  image: string;
  accentClass: string;
  isFeatured: boolean;
  isExtended: boolean;
  sortOrder: number;
  title: string;
  eyebrow: string | null;
  shortSummary: string | null;
  description: string | null;
  highlights: string[];
  process: string[];
  requirements: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
}

export interface GuideView {
  slug: string;
  image: string;
  readMinutes: number;
  sortOrder: number;
  title: string;
  eyebrow: string | null;
  description: string | null;
  checklist: string[];
  sections: { title: string; body: string }[];
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
}

export interface GalleryImageView {
  id: string;
  url: string;
  category: string;
  usage: string;
  sortOrder: number;
  isPriority: boolean;
  alt: string;
  title: string | null;
  caption: string | null;
}

export interface TourDestinationView {
  slug: string;
  image: string;
  name: string;
  sortOrder: number;
}

export interface UmrahPackageView {
  slug: string;
  durationDays: number;
  title: string;
  description: string;
  includedItems: string[];
  sortOrder: number;
}

export interface HomeStatView {
  key: string;
  from: number;
  to: number;
  suffix: string;
  label: string;
  sortOrder: number;
}

export interface FaqView {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface CalculatorOptionView {
  value: string;
  label: string;
  metadata: Record<string, unknown>;
  sortOrder: number;
}

export interface TransportOptionView {
  id: string;
  label: string;
  sarRate: number;
  sortOrder: number;
}

export interface PageView {
  slug: string;
  status: string;
  heroImage: string | null;
  title: string;
  description: string | null;
  bodyBlocks: PageBlock[];
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
  sortOrder: number;
}

export interface SeoOverrideView {
  path: string;
  locale: string;
  title: string | null;
  description: string | null;
  keywords: string[];
  ogImage: string | null;
  noIndex: boolean;
}
