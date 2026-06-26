// src/lib/cms/effective.ts
// SERVER ONLY — do not import from client components.
// Merges CMS-backed content with the static defaults in constants.ts.
import "server-only";

import type {
  BrandProfile,
  GuideConfig,
  GuideSlug,
  Locale,
  ServiceConfig,
  ServiceIconName,
} from "@/lib/constants";
import { BRAND, GUIDES, SERVICES } from "@/lib/constants";

import { getBrandSettings, getGuides, getServices } from "./fetchers";
import type { BrandView, GuideView, ServiceView } from "./types";

export async function getEffectiveBrand(
  locale: Locale,
): Promise<BrandProfile> {
  try {
    const brand = await getBrandSettings();

    if (!brand) {
      return BRAND;
    }

    return mapBrandViewToProfile(brand, locale);
  } catch (error) {
    console.error({ action: "effective_brand_failed", error });
    return BRAND;
  }
}

export async function getEffectiveServices(
  locale: Locale,
  cmsServices?: ServiceView[] | null,
): Promise<readonly ServiceConfig[]> {
  try {
    let services = cmsServices;

    if (services === undefined) {
      services = await getServices(locale);
    }

    if (!services || services.length === 0) {
      return SERVICES;
    }

    const mapped = services.filter(isServiceViewActive).map(mapServiceView);
    return mapped.length > 0 ? mapped : SERVICES;
  } catch (error) {
    console.error({ action: "effective_services_failed", error });
    return SERVICES;
  }
}

export async function getEffectiveGuides(
  locale: Locale,
): Promise<readonly GuideConfig[]> {
  try {
    const guides = await getGuides(locale);

    if (!guides || guides.length === 0) {
      return GUIDES;
    }

    const mapped = guides.map(mapGuideView);
    return mapped.length > 0 ? mapped : GUIDES;
  } catch (error) {
    console.error({ action: "effective_guides_failed", error });
    return GUIDES;
  }
}

function mapBrandViewToProfile(
  brand: BrandView,
  locale: Locale,
): BrandProfile {
  const mainOffice = brand.mainOfficeEn ?? BRAND.mainOffice ?? BRAND.office;
  const branchOffice = brand.branchOfficeEn ?? BRAND.branchOffice;
  const office = mainOffice;
  const officeUr = brand.mainOfficeUr ?? undefined;

  return {
    companyName: brand.companyName,
    tagline:
      locale === "ur" && brand.taglineUr
        ? brand.taglineUr
        : brand.taglineEn ?? BRAND.tagline,
    ceo: brand.ceoName ?? BRAND.ceo,
    managingDirector: BRAND.managingDirector,
    phone: brand.primaryPhone,
    phone2: brand.secondaryPhone ?? undefined,
    uan: brand.uan ?? BRAND.uan,
    helpdesk: brand.helpdesk ?? undefined,
    email: brand.email,
    office,
    officeUr,
    mainOffice,
    mainOfficeUr: brand.mainOfficeUr ?? undefined,
    branchOffice: branchOffice ?? undefined,
    branchOfficeUr: brand.branchOfficeUr ?? undefined,
    mainPhone: brand.mainPhone ?? undefined,
    branchPhone: brand.branchPhone ?? undefined,
    geoLatitude: brand.geoLatitude ?? undefined,
    geoLongitude: brand.geoLongitude ?? undefined,
    logoLightUrl: brand.logoLightUrl ?? undefined,
    logoDarkUrl: brand.logoDarkUrl ?? undefined,
    postalAddress: brand.postalAddress ?? undefined,
    website: BRAND.website,
    iata: brand.iataСertified,
    social: mergeSocialLinks(brand.social),
  };
}

function mergeSocialLinks(social: BrandView["social"]): BrandProfile["social"] {
  const merged: NonNullable<BrandProfile["social"]> = {
    facebook: BRAND.social?.facebook ?? "",
    instagram: BRAND.social?.instagram ?? "",
    linkedin: BRAND.social?.linkedin ?? "",
    twitter: BRAND.social?.twitter ?? "",
    tiktok: BRAND.social?.tiktok,
  };

  for (const [key, value] of Object.entries(social)) {
    if (value) {
      merged[key as keyof NonNullable<BrandProfile["social"]>] = value;
    }
  }

  return merged;
}

function mapServiceView(service: ServiceView): ServiceConfig {
  const slug = service.slug;

  return {
    slug,
    href: `/services/${slug}`,
    icon: isServiceIconName(service.icon) ? service.icon : "tour",
    image: service.image,
    accentClass: service.accentClass,
    featured: service.isFeatured || undefined,
  };
}

function isServiceIconName(value: string): value is ServiceIconName {
  return (
    value === "tickets" ||
    value === "visa" ||
    value === "tour" ||
    value === "hotel" ||
    value === "insurance" ||
    value === "umrah"
  );
}

function isServiceViewActive(service: ServiceView): boolean {
  return !("isActive" in service) || service.isActive !== false;
}

function mapGuideView(guide: GuideView): GuideConfig {
  return {
    slug: guide.slug as GuideSlug,
    href: `/guides/${guide.slug as GuideSlug}`,
    image: guide.image,
    readMinutes: guide.readMinutes,
  };
}
