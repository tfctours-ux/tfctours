// SERVER ONLY — do not import from client components.
// Safe: called only from server components and API routes.
// src/lib/cms/schema.ts
// MIRROR of the tables in tfc-admin/db/schema.ts that the marketing site reads.
// Single source of truth: tfc-admin. When changing a column there, update here.
import { sql, isNull } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import type { GuideSection, PageBlock } from "./json-shapes";

export const localeCodeEnum = pgEnum("locale_code", ["en", "ur"]);

export const serviceIconEnum = pgEnum("service_icon", [
  "tickets",
  "visa",
  "tour",
  "hotel",
  "insurance",
  "umrah",
]);

export const galleryUsageEnum = pgEnum("gallery_usage", [
  "home",
  "about_hero",
  "about_office_presence",
  "about_gallery",
  "umrah_packages",
  "skip",
]);

export const galleryCategoryEnum = pgEnum("gallery_category", [
  "destination",
  "office_environment",
  "customer_service",
  "team",
  "consultation",
  "signage",
  "office_culture",
  "external_event",
]);

export const pageStatusEnum = pgEnum("page_status", ["draft", "published"]);

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  tiktok?: string;
};

export type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
};

export const brandSettings = pgTable(
  "brand_settings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    isActive: boolean("is_active").notNull().default(true),
    companyName: text("company_name").notNull(),
    taglineEn: text("tagline_en"),
    taglineUr: text("tagline_ur"),
    ceoName: text("ceo_name"),
    primaryPhone: text("primary_phone").notNull(),
    secondaryPhone: text("secondary_phone"),
    uan: text("uan"),
    helpdesk: text("helpdesk"),
    email: text("email").notNull(),
    mainOfficeEn: text("main_office_en"),
    mainOfficeUr: text("main_office_ur"),
    mainPhone: text("main_phone"),
    branchOfficeEn: text("branch_office_en"),
    branchOfficeUr: text("branch_office_ur"),
    branchPhone: text("branch_phone"),
    geoLatitude: text("geo_latitude"),
    geoLongitude: text("geo_longitude"),
    postalAddress: jsonb("postal_address").$type<PostalAddress>(),
    social: jsonb("social")
      .$type<SocialLinks>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    logoLightUrl: text("logo_light_url"),
    logoDarkUrl: text("logo_dark_url"),
    iataCertified: boolean("iata_certified").notNull().default(true),
  },
  (table) => ({
    singleActive: uniqueIndex("brand_settings_single_active")
      .on(sql`(true)`)
      .where(sql`${table.isActive} = true`),
  }),
);

export const translations = pgTable(
  "translations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    namespace: text("namespace").notNull(),
    key: text("key").notNull(),
    locale: localeCodeEnum("locale").notNull(),
    value: text("value").notNull(),
    notes: text("notes"),
  },
  (table) => ({
    nsKeyLocaleUnique: uniqueIndex("translations_ns_key_locale_unique").on(
      table.namespace,
      table.key,
      table.locale,
    ),
    byNsLocale: index("translations_ns_locale_idx").on(
      table.namespace,
      table.locale,
    ),
  }),
);

export const navLinks = pgTable(
  "nav_links",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    key: text("key").notNull(),
    href: text("href").notNull(),
    isExternal: boolean("is_external").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    labelEn: text("label_en").notNull(),
    labelUr: text("label_ur").notNull(),
  },
  (table) => ({
    keyUnique: uniqueIndex("nav_links_key_unique")
      .on(table.key)
      .where(isNull(table.deletedAt)),
    activeSort: index("nav_links_active_sort_idx")
      .on(table.isActive, table.sortOrder)
      .where(isNull(table.deletedAt)),
  }),
);

export const services = pgTable(
  "services",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    slug: text("slug").notNull(),
    icon: serviceIconEnum("icon").notNull(),
    imageUrl: text("image_url").notNull(),
    accentClass: text("accent_class").notNull(),
    isFeatured: boolean("is_featured").notNull().default(false),
    isExtended: boolean("is_extended").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => ({
    slugUnique: uniqueIndex("services_slug_unique")
      .on(table.slug)
      .where(isNull(table.deletedAt)),
    activeSort: index("services_active_sort_idx")
      .on(table.isActive, table.sortOrder)
      .where(isNull(table.deletedAt)),
  }),
);

export const serviceTranslations = pgTable(
  "service_translations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id, { onDelete: "cascade" }),
    locale: localeCodeEnum("locale").notNull(),
    title: text("title").notNull(),
    eyebrow: text("eyebrow"),
    shortSummary: text("short_summary"),
    description: text("description"),
    highlights: jsonb("highlights")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    process: jsonb("process")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    requirements: jsonb("requirements")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    keywords: jsonb("keywords")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
  },
  (table) => ({
    serviceLocaleUnique: uniqueIndex(
      "service_translations_service_locale_unique",
    ).on(table.serviceId, table.locale),
  }),
);

export const guides = pgTable(
  "guides",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    slug: text("slug").notNull(),
    imageUrl: text("image_url").notNull(),
    readMinutes: integer("read_minutes").notNull().default(5),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => ({
    slugUnique: uniqueIndex("guides_slug_unique")
      .on(table.slug)
      .where(isNull(table.deletedAt)),
    activeSort: index("guides_active_sort_idx")
      .on(table.isActive, table.sortOrder)
      .where(isNull(table.deletedAt)),
  }),
);

export const guideTranslations = pgTable(
  "guide_translations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    guideId: uuid("guide_id")
      .notNull()
      .references(() => guides.id, { onDelete: "cascade" }),
    locale: localeCodeEnum("locale").notNull(),
    title: text("title").notNull(),
    eyebrow: text("eyebrow"),
    description: text("description"),
    checklist: jsonb("checklist")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    sections: jsonb("sections")
      .$type<GuideSection[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    keywords: jsonb("keywords")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
  },
  (table) => ({
    guideLocaleUnique: uniqueIndex("guide_translations_guide_locale_unique").on(
      table.guideId,
      table.locale,
    ),
  }),
);

export const galleryImages = pgTable(
  "gallery_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    externalId: text("external_id"),
    imageUrl: text("image_url").notNull(),
    category: galleryCategoryEnum("category").notNull().default("destination"),
    usage: galleryUsageEnum("usage").notNull().default("home"),
    isPriority: boolean("is_priority").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => ({
    usageSort: index("gallery_usage_sort_idx")
      .on(table.usage, table.isActive, table.sortOrder)
      .where(isNull(table.deletedAt)),
  }),
);

export const galleryImageTranslations = pgTable(
  "gallery_image_translations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    imageId: uuid("image_id")
      .notNull()
      .references(() => galleryImages.id, { onDelete: "cascade" }),
    locale: localeCodeEnum("locale").notNull(),
    alt: text("alt").notNull(),
    title: text("title"),
    caption: text("caption"),
  },
  (table) => ({
    imageLocaleUnique: uniqueIndex(
      "gallery_image_translations_image_locale_unique",
    ).on(table.imageId, table.locale),
  }),
);

export const toursDestinations = pgTable(
  "tours_destinations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    slug: text("slug").notNull(),
    imageUrl: text("image_url").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    nameEn: text("name_en").notNull(),
    nameUr: text("name_ur").notNull(),
  },
  (table) => ({
    slugUnique: uniqueIndex("tours_destinations_slug_unique")
      .on(table.slug)
      .where(isNull(table.deletedAt)),
    activeSort: index("tours_destinations_active_sort_idx")
      .on(table.isActive, table.sortOrder)
      .where(isNull(table.deletedAt)),
  }),
);

export const umrahPackages = pgTable(
  "umrah_packages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    slug: text("slug").notNull(),
    durationDays: integer("duration_days").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    titleEn: text("title_en").notNull(),
    titleUr: text("title_ur").notNull(),
    descriptionEn: text("description_en").notNull(),
    descriptionUr: text("description_ur").notNull(),
    includedItems: jsonb("included_items")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
  },
  (table) => ({
    slugUnique: uniqueIndex("umrah_packages_slug_unique")
      .on(table.slug)
      .where(isNull(table.deletedAt)),
    activeSort: index("umrah_packages_active_sort_idx")
      .on(table.isActive, table.sortOrder)
      .where(isNull(table.deletedAt)),
  }),
);

export const homeStats = pgTable(
  "home_stats",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    key: text("key").notNull(),
    fromValue: integer("from_value").notNull().default(0),
    toValue: integer("to_value").notNull(),
    suffix: text("suffix").notNull().default(""),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    labelEn: text("label_en").notNull(),
    labelUr: text("label_ur").notNull(),
  },
  (table) => ({
    keyUnique: uniqueIndex("home_stats_key_unique")
      .on(table.key)
      .where(isNull(table.deletedAt)),
    activeSort: index("home_stats_active_sort_idx")
      .on(table.isActive, table.sortOrder)
      .where(isNull(table.deletedAt)),
  }),
);

export const faqItems = pgTable(
  "faq_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    externalId: text("external_id").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    questionEn: text("question_en").notNull(),
    questionUr: text("question_ur").notNull(),
    answerEn: text("answer_en").notNull(),
    answerUr: text("answer_ur").notNull(),
  },
  (table) => ({
    externalIdUnique: uniqueIndex("faq_items_external_id_unique")
      .on(table.externalId)
      .where(isNull(table.deletedAt)),
    activeSort: index("faq_items_active_sort_idx")
      .on(table.isActive, table.sortOrder)
      .where(isNull(table.deletedAt)),
  }),
);

export const calculatorOptions = pgTable(
  "calculator_options",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    scope: text("scope").notNull(),
    optionValue: text("option_value").notNull(),
    labelEn: text("label_en").notNull(),
    labelUr: text("label_ur"),
    metadata: jsonb("metadata")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => ({
    scopeValueUnique: uniqueIndex("calculator_options_scope_value_unique")
      .on(table.scope, table.optionValue)
      .where(isNull(table.deletedAt)),
    scopeActiveSort: index("calculator_options_scope_active_sort_idx")
      .on(table.scope, table.isActive, table.sortOrder)
      .where(isNull(table.deletedAt)),
  }),
);

export const transportOptions = pgTable(
  "transport_options",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    labelEn: text("label_en").notNull(),
    labelUr: text("label_ur"),
    sarRate: integer("sar_rate").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => ({
    activeSort: index("transport_options_active_sort_idx")
      .on(table.isActive, table.sortOrder)
      .where(isNull(table.deletedAt)),
  }),
);

export const pages = pgTable(
  "pages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    slug: text("slug").notNull(),
    status: pageStatusEnum("status").notNull().default("draft"),
    heroImageUrl: text("hero_image_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (table) => ({
    slugUnique: uniqueIndex("pages_slug_unique")
      .on(table.slug)
      .where(isNull(table.deletedAt)),
  }),
);

export const pageTranslations = pgTable(
  "page_translations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    pageId: uuid("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    locale: localeCodeEnum("locale").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    bodyBlocks: jsonb("body_blocks")
      .$type<PageBlock[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    keywords: jsonb("keywords")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
  },
  (table) => ({
    pageLocaleUnique: uniqueIndex("page_translations_page_locale_unique").on(
      table.pageId,
      table.locale,
    ),
  }),
);

export const seoOverrides = pgTable(
  "seo_overrides",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    routePath: text("route_path").notNull(),
    locale: localeCodeEnum("locale").notNull(),
    title: text("title"),
    description: text("description"),
    keywords: jsonb("keywords")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    ogImageUrl: text("og_image_url"),
    noIndex: boolean("no_index").notNull().default(false),
  },
  (table) => ({
    pathLocaleUnique: uniqueIndex("seo_overrides_path_locale_unique")
      .on(table.routePath, table.locale)
      .where(isNull(table.deletedAt)),
  }),
);
