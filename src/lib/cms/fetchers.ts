// src/lib/cms/fetchers.ts
// SERVER ONLY — do not import from client components.
// Safe: called only from server components and API routes.
import "server-only";

import { and, asc, eq, isNull } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

import type { Locale } from "@/lib/constants";

import { withCmsCache } from "./cache";
import { getCmsDb } from "./client";
import type { GuideSection, PageBlock } from "./json-shapes";
import * as s from "./schema";
import type {
  BrandView,
  CalculatorOptionView,
  FaqView,
  GalleryImageView,
  GuideView,
  HomeStatView,
  NavLinkView,
  PageView,
  SeoOverrideView,
  ServiceView,
  TourDestinationView,
  TransportOptionView,
  UmrahPackageView,
} from "./types";

type BrandRow = typeof s.brandSettings.$inferSelect;
type NavLinkRow = typeof s.navLinks.$inferSelect;
type ServiceRow = typeof s.services.$inferSelect;
type ServiceTranslationRow = typeof s.serviceTranslations.$inferSelect;
type GuideRow = typeof s.guides.$inferSelect;
type GuideTranslationRow = typeof s.guideTranslations.$inferSelect;
type GalleryImageRow = typeof s.galleryImages.$inferSelect;
type GalleryTranslationRow = typeof s.galleryImageTranslations.$inferSelect;
type TourDestinationRow = typeof s.toursDestinations.$inferSelect;
type UmrahPackageRow = typeof s.umrahPackages.$inferSelect;
type HomeStatRow = typeof s.homeStats.$inferSelect;
type FaqRow = typeof s.faqItems.$inferSelect;
type CalculatorOptionRow = typeof s.calculatorOptions.$inferSelect;
type TransportOptionRow = typeof s.transportOptions.$inferSelect;
type PageRow = typeof s.pages.$inferSelect;
type PageTranslationRow = typeof s.pageTranslations.$inferSelect;
type SeoOverrideRow = typeof s.seoOverrides.$inferSelect;

export const getBrandSettings: () => Promise<BrandView | null> = withCmsCache(
  async () => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const rows = await db
      .select()
      .from(s.brandSettings)
      .where(eq(s.brandSettings.isActive, true))
      .limit(1);

    return rows[0] ? mapBrandRow(rows[0]) : null;
  },
  ["cms", "getBrandSettings"],
  ["cms:brand"],
  300,
);

export const getNavLinks: (
  locale: Locale,
) => Promise<NavLinkView[] | null> = withCmsCache(
  async (locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const rows = await db
      .select()
      .from(s.navLinks)
      .where(and(isNull(s.navLinks.deletedAt), eq(s.navLinks.isActive, true)))
      .orderBy(asc(s.navLinks.sortOrder));

    return rows.map((row) => mapNavLinkRow(row, locale));
  },
  ["cms", "getNavLinks"],
  ["cms:nav"],
  300,
);

export const getServices: (
  locale: Locale,
) => Promise<ServiceView[] | null> = withCmsCache(
  async (locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const requested = alias(s.serviceTranslations, "service_translations_req");
    const fallback = alias(s.serviceTranslations, "service_translations_en");
    const rows = await db
      .select({
        parent: s.services,
        requested,
        fallback,
      })
      .from(s.services)
      .leftJoin(
        requested,
        and(
          eq(requested.serviceId, s.services.id),
          eq(requested.locale, locale),
        ),
      )
      .leftJoin(
        fallback,
        and(eq(fallback.serviceId, s.services.id), eq(fallback.locale, "en")),
      )
      .where(and(isNull(s.services.deletedAt), eq(s.services.isActive, true)))
      .orderBy(asc(s.services.sortOrder));

    return rows.map((row) =>
      mapServiceRow(row.parent, pickTranslation(row.requested, row.fallback)),
    );
  },
  ["cms", "getServices"],
  ["cms:services"],
  300,
);

export const getServiceBySlug: (
  slug: string,
  locale: Locale,
) => Promise<ServiceView | null> = withCmsCache(
  async (slug: string, locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const requested = alias(s.serviceTranslations, "service_translation_req");
    const fallback = alias(s.serviceTranslations, "service_translation_en");
    const rows = await db
      .select({
        parent: s.services,
        requested,
        fallback,
      })
      .from(s.services)
      .leftJoin(
        requested,
        and(
          eq(requested.serviceId, s.services.id),
          eq(requested.locale, locale),
        ),
      )
      .leftJoin(
        fallback,
        and(eq(fallback.serviceId, s.services.id), eq(fallback.locale, "en")),
      )
      .where(
        and(
          isNull(s.services.deletedAt),
          eq(s.services.isActive, true),
          eq(s.services.slug, slug),
        ),
      )
      .limit(1);

    const row = rows[0];
    return row
      ? mapServiceRow(row.parent, pickTranslation(row.requested, row.fallback))
      : null;
  },
  ["cms", "getServiceBySlug"],
  ["cms:services"],
  300,
);

export const getGuides: (locale: Locale) => Promise<GuideView[] | null> = withCmsCache(
  async (locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const requested = alias(s.guideTranslations, "guide_translations_req");
    const fallback = alias(s.guideTranslations, "guide_translations_en");
    const rows = await db
      .select({
        parent: s.guides,
        requested,
        fallback,
      })
      .from(s.guides)
      .leftJoin(
        requested,
        and(eq(requested.guideId, s.guides.id), eq(requested.locale, locale)),
      )
      .leftJoin(
        fallback,
        and(eq(fallback.guideId, s.guides.id), eq(fallback.locale, "en")),
      )
      .where(and(isNull(s.guides.deletedAt), eq(s.guides.isActive, true)))
      .orderBy(asc(s.guides.sortOrder));

    return rows.map((row) =>
      mapGuideRow(row.parent, pickTranslation(row.requested, row.fallback)),
    );
  },
  ["cms", "getGuides"],
  ["cms:guides"],
  300,
);

export const getGuideBySlug: (
  slug: string,
  locale: Locale,
) => Promise<GuideView | null> = withCmsCache(
  async (slug: string, locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const requested = alias(s.guideTranslations, "guide_translation_req");
    const fallback = alias(s.guideTranslations, "guide_translation_en");
    const rows = await db
      .select({
        parent: s.guides,
        requested,
        fallback,
      })
      .from(s.guides)
      .leftJoin(
        requested,
        and(eq(requested.guideId, s.guides.id), eq(requested.locale, locale)),
      )
      .leftJoin(
        fallback,
        and(eq(fallback.guideId, s.guides.id), eq(fallback.locale, "en")),
      )
      .where(
        and(
          isNull(s.guides.deletedAt),
          eq(s.guides.isActive, true),
          eq(s.guides.slug, slug),
        ),
      )
      .limit(1);

    const row = rows[0];
    return row
      ? mapGuideRow(row.parent, pickTranslation(row.requested, row.fallback))
      : null;
  },
  ["cms", "getGuideBySlug"],
  ["cms:guides"],
  300,
);

export const getGalleryImages: (
  usage:
    | "home"
    | "about_hero"
    | "about_office_presence"
    | "about_gallery"
    | "umrah_packages",
  locale: Locale,
) => Promise<GalleryImageView[] | null> = withCmsCache(
  async (
    usage:
      | "home"
      | "about_hero"
      | "about_office_presence"
      | "about_gallery"
      | "umrah_packages",
    locale: Locale,
  ) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const requested = alias(
      s.galleryImageTranslations,
      "gallery_image_translations_req",
    );
    const fallback = alias(
      s.galleryImageTranslations,
      "gallery_image_translations_en",
    );
    const rows = await db
      .select({
        image: s.galleryImages,
        requested,
        fallback,
      })
      .from(s.galleryImages)
      .leftJoin(
        requested,
        and(
          eq(requested.imageId, s.galleryImages.id),
          eq(requested.locale, locale),
        ),
      )
      .leftJoin(
        fallback,
        and(eq(fallback.imageId, s.galleryImages.id), eq(fallback.locale, "en")),
      )
      .where(
        and(
          isNull(s.galleryImages.deletedAt),
          eq(s.galleryImages.isActive, true),
          eq(s.galleryImages.usage, usage),
        ),
      )
      .orderBy(asc(s.galleryImages.sortOrder), asc(s.galleryImages.createdAt));

    return rows.map((row) =>
      mapGalleryRow(row.image, pickTranslation(row.requested, row.fallback)),
    );
  },
  ["cms", "getGalleryImages"],
  ["cms:gallery"],
  300,
);

export const getTourDestinations: (
  locale: Locale,
) => Promise<TourDestinationView[] | null> = withCmsCache(
  async (locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const rows = await db
      .select()
      .from(s.toursDestinations)
      .where(
        and(
          isNull(s.toursDestinations.deletedAt),
          eq(s.toursDestinations.isActive, true),
        ),
      )
      .orderBy(asc(s.toursDestinations.sortOrder));

    return rows.map((row) => mapTourDestinationRow(row, locale));
  },
  ["cms", "getTourDestinations"],
  ["cms:tours"],
  300,
);

export const getUmrahPackages: (
  locale: Locale,
) => Promise<UmrahPackageView[] | null> = withCmsCache(
  async (locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const rows = await db
      .select()
      .from(s.umrahPackages)
      .where(
        and(
          isNull(s.umrahPackages.deletedAt),
          eq(s.umrahPackages.isActive, true),
        ),
      )
      .orderBy(asc(s.umrahPackages.sortOrder));

    return rows.map((row) => mapUmrahPackageRow(row, locale));
  },
  ["cms", "getUmrahPackages"],
  ["cms:umrah"],
  300,
);

export const getHomeStats: (
  locale: Locale,
) => Promise<HomeStatView[] | null> = withCmsCache(
  async (locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const rows = await db
      .select()
      .from(s.homeStats)
      .where(and(isNull(s.homeStats.deletedAt), eq(s.homeStats.isActive, true)))
      .orderBy(asc(s.homeStats.sortOrder));

    return rows.map((row) => mapHomeStatRow(row, locale));
  },
  ["cms", "getHomeStats"],
  ["cms:stats"],
  300,
);

export const getFaqItems: (locale: Locale) => Promise<FaqView[] | null> = withCmsCache(
  async (locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const rows = await db
      .select()
      .from(s.faqItems)
      .where(and(isNull(s.faqItems.deletedAt), eq(s.faqItems.isActive, true)))
      .orderBy(asc(s.faqItems.sortOrder));

    return rows.map((row) => mapFaqRow(row, locale));
  },
  ["cms", "getFaqItems"],
  ["cms:faq"],
  300,
);

export const getTranslations: (
  namespace: string,
  locale: Locale,
) => Promise<Record<string, string> | null> = withCmsCache(
  async (namespace: string, locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const rows = await db
      .select()
      .from(s.translations)
      .where(
        and(
          eq(s.translations.namespace, namespace),
          eq(s.translations.locale, locale),
        ),
      );

    if (rows.length === 0) {
      return null;
    }

    return rows.reduce<Record<string, string>>((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
  },
  ["cms", "getTranslations"],
  ["cms:translations"],
  300,
);

export const getCalculatorOptions: (
  scope: string,
  locale: Locale,
) => Promise<CalculatorOptionView[] | null> = withCmsCache(
  async (scope: string, locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const rows = await db
      .select()
      .from(s.calculatorOptions)
      .where(
        and(
          eq(s.calculatorOptions.scope, scope),
          isNull(s.calculatorOptions.deletedAt),
          eq(s.calculatorOptions.isActive, true),
        ),
      )
      .orderBy(asc(s.calculatorOptions.sortOrder));

    return rows.map((row) => mapCalculatorOptionRow(row, locale));
  },
  ["cms", "getCalculatorOptions"],
  ["cms:calculator"],
  600,
);

export const getTransportOptions: (
  locale: Locale,
) => Promise<TransportOptionView[] | null> = withCmsCache(
  async (locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const rows = await db
      .select()
      .from(s.transportOptions)
      .where(
        and(
          isNull(s.transportOptions.deletedAt),
          eq(s.transportOptions.isActive, true),
        ),
      )
      .orderBy(asc(s.transportOptions.sortOrder));

    return rows.map((row) => mapTransportOptionRow(row, locale));
  },
  ["cms", "getTransportOptions"],
  ["cms:transport"],
  600,
);

export const getPage: (
  slug: string,
  locale: Locale,
) => Promise<PageView | null> = withCmsCache(
  async (slug: string, locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const requested = alias(s.pageTranslations, "page_translations_req");
    const fallback = alias(s.pageTranslations, "page_translations_en");
    const rows = await db
      .select({
        page: s.pages,
        requested,
        fallback,
      })
      .from(s.pages)
      .leftJoin(
        requested,
        and(eq(requested.pageId, s.pages.id), eq(requested.locale, locale)),
      )
      .leftJoin(
        fallback,
        and(eq(fallback.pageId, s.pages.id), eq(fallback.locale, "en")),
      )
      .where(
        and(
          isNull(s.pages.deletedAt),
          eq(s.pages.slug, slug),
          eq(s.pages.status, "published"),
        ),
      )
      .limit(1);

    const row = rows[0];
    return row
      ? mapPageRow(row.page, pickTranslation(row.requested, row.fallback))
      : null;
  },
  ["cms", "getPage"],
  ["cms:pages"],
  60,
);

export const getSeoOverride: (
  routePath: string,
  locale: Locale,
) => Promise<SeoOverrideView | null> = withCmsCache(
  async (routePath: string, locale: Locale) => {
    const db = getCmsDb();
    if (!db) {
      return null;
    }

    const rows = await db
      .select()
      .from(s.seoOverrides)
      .where(
        and(
          isNull(s.seoOverrides.deletedAt),
          eq(s.seoOverrides.routePath, routePath),
          eq(s.seoOverrides.locale, locale),
        ),
      )
      .limit(1);

    return rows[0] ? mapSeoOverrideRow(rows[0]) : null;
  },
  ["cms", "getSeoOverride"],
  ["cms:seo"],
  60,
);

function mapBrandRow(row: BrandRow): BrandView {
  return {
    companyName: row.companyName,
    taglineEn: row.taglineEn ?? null,
    taglineUr: row.taglineUr ?? null,
    ceoName: row.ceoName ?? null,
    primaryPhone: row.primaryPhone,
    secondaryPhone: row.secondaryPhone ?? null,
    uan: row.uan ?? null,
    helpdesk: row.helpdesk ?? null,
    email: row.email,
    mainOfficeEn: row.mainOfficeEn ?? null,
    mainOfficeUr: row.mainOfficeUr ?? null,
    mainPhone: row.mainPhone ?? null,
    branchOfficeEn: row.branchOfficeEn ?? null,
    branchOfficeUr: row.branchOfficeUr ?? null,
    branchPhone: row.branchPhone ?? null,
    geoLatitude: row.geoLatitude ?? null,
    geoLongitude: row.geoLongitude ?? null,
    postalAddress: row.postalAddress ?? null,
    social: row.social as BrandView["social"],
    logoLightUrl: row.logoLightUrl ?? null,
    logoDarkUrl: row.logoDarkUrl ?? null,
    iataСertified: row.iataCertified,
  };
}

function mapNavLinkRow(row: NavLinkRow, locale: Locale): NavLinkView {
  return {
    key: row.key,
    href: row.href,
    label: locale === "ur" ? row.labelUr : row.labelEn,
    isExternal: row.isExternal,
    sortOrder: row.sortOrder,
  };
}

function mapServiceRow(
  parentRow: ServiceRow,
  translationRow: ServiceTranslationRow | null,
): ServiceView {
  return {
    slug: parentRow.slug,
    icon: parentRow.icon,
    image: parentRow.imageUrl,
    accentClass: parentRow.accentClass,
    isFeatured: parentRow.isFeatured,
    isExtended: parentRow.isExtended,
    sortOrder: parentRow.sortOrder,
    title: translationRow?.title ?? parentRow.slug,
    eyebrow: translationRow?.eyebrow ?? null,
    shortSummary: translationRow?.shortSummary ?? null,
    description: translationRow?.description ?? null,
    highlights: (translationRow?.highlights ?? []) as string[],
    process: (translationRow?.process ?? []) as string[],
    requirements: (translationRow?.requirements ?? []) as string[],
    metaTitle: translationRow?.metaTitle ?? null,
    metaDescription: translationRow?.metaDescription ?? null,
    keywords: (translationRow?.keywords ?? []) as string[],
  };
}

function mapGuideRow(
  parentRow: GuideRow,
  translationRow: GuideTranslationRow | null,
): GuideView {
  return {
    slug: parentRow.slug,
    image: parentRow.imageUrl,
    readMinutes: parentRow.readMinutes,
    sortOrder: parentRow.sortOrder,
    title: translationRow?.title ?? parentRow.slug,
    eyebrow: translationRow?.eyebrow ?? null,
    description: translationRow?.description ?? null,
    checklist: (translationRow?.checklist ?? []) as string[],
    sections: (translationRow?.sections ?? []) as GuideSection[],
    metaTitle: translationRow?.metaTitle ?? null,
    metaDescription: translationRow?.metaDescription ?? null,
    keywords: (translationRow?.keywords ?? []) as string[],
  };
}

function mapGalleryRow(
  imageRow: GalleryImageRow,
  translationRow: GalleryTranslationRow | null,
): GalleryImageView {
  return {
    id: imageRow.externalId ?? imageRow.id,
    url: imageRow.imageUrl,
    category: imageRow.category,
    usage: imageRow.usage,
    sortOrder: imageRow.sortOrder,
    isPriority: imageRow.isPriority,
    alt: translationRow?.alt ?? imageRow.externalId ?? imageRow.id,
    title: translationRow?.title ?? null,
    caption: translationRow?.caption ?? null,
  };
}

function mapTourDestinationRow(
  row: TourDestinationRow,
  locale: Locale,
): TourDestinationView {
  return {
    slug: row.slug,
    image: row.imageUrl,
    name: locale === "ur" ? row.nameUr : row.nameEn,
    sortOrder: row.sortOrder,
  };
}

function mapUmrahPackageRow(
  row: UmrahPackageRow,
  locale: Locale,
): UmrahPackageView {
  return {
    slug: row.slug,
    durationDays: row.durationDays,
    title: locale === "ur" ? row.titleUr : row.titleEn,
    description: locale === "ur" ? row.descriptionUr : row.descriptionEn,
    includedItems: row.includedItems as string[],
    sortOrder: row.sortOrder,
  };
}

function mapHomeStatRow(row: HomeStatRow, locale: Locale): HomeStatView {
  return {
    key: row.key,
    from: row.fromValue,
    to: row.toValue,
    suffix: row.suffix,
    label: locale === "ur" ? row.labelUr : row.labelEn,
    sortOrder: row.sortOrder,
  };
}

function mapFaqRow(row: FaqRow, locale: Locale): FaqView {
  return {
    id: row.externalId,
    question: locale === "ur" ? row.questionUr : row.questionEn,
    answer: locale === "ur" ? row.answerUr : row.answerEn,
    sortOrder: row.sortOrder,
  };
}

function mapCalculatorOptionRow(
  row: CalculatorOptionRow,
  locale: Locale,
): CalculatorOptionView {
  return {
    value: row.optionValue,
    label: locale === "ur" && row.labelUr ? row.labelUr : row.labelEn,
    metadata: row.metadata as Record<string, unknown>,
    sortOrder: row.sortOrder,
  };
}

function mapTransportOptionRow(
  row: TransportOptionRow,
  locale: Locale,
): TransportOptionView {
  return {
    id: row.id,
    label: locale === "ur" && row.labelUr ? row.labelUr : row.labelEn,
    sarRate: row.sarRate,
    sortOrder: row.sortOrder,
  };
}

function mapPageRow(
  pageRow: PageRow,
  translationRow: PageTranslationRow | null,
): PageView {
  return {
    slug: pageRow.slug,
    status: pageRow.status,
    heroImage: pageRow.heroImageUrl ?? null,
    title: translationRow?.title ?? pageRow.slug,
    description: translationRow?.description ?? null,
    bodyBlocks: (translationRow?.bodyBlocks ?? []) as PageBlock[],
    metaTitle: translationRow?.metaTitle ?? null,
    metaDescription: translationRow?.metaDescription ?? null,
    keywords: (translationRow?.keywords ?? []) as string[],
    sortOrder: pageRow.sortOrder,
  };
}

function mapSeoOverrideRow(row: SeoOverrideRow): SeoOverrideView {
  return {
    path: row.routePath,
    locale: row.locale,
    title: row.title ?? null,
    description: row.description ?? null,
    keywords: row.keywords as string[],
    ogImage: row.ogImageUrl ?? null,
    noIndex: row.noIndex,
  };
}

function pickTranslation<T extends { id: string }>(
  requested: T | null,
  fallback: T | null,
): T | null {
  return requested?.id ? requested : fallback?.id ? fallback : null;
}
