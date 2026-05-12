import type { Metadata } from "next";

import { defaultLocale } from "@/i18n";

import { BRAND, LOCALES, type Locale, getBaseUrl } from "./constants";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function isRtlLocale(locale: string) {
  return locale === "ur";
}

export function absoluteUrl(path = "/") {
  return new URL(path, getBaseUrl()).toString();
}

export function localizePath(locale: Locale, path = "/") {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

  if (locale === defaultLocale) {
    return normalized || "/";
  }

  return `/${locale}${normalized}`;
}

export function stripLocaleFromPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  const [first, ...rest] = segments;

  if ((LOCALES as readonly string[]).includes(first)) {
    return rest.length === 0 ? "/" : `/${rest.join("/")}`;
  }

  return pathname;
}

interface MetadataOptions {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  absoluteTitle?: string;
}

export function getOpenGraphLocale(locale: Locale) {
  return locale === "ur" ? "ur_PK" : "en_PK";
}

export function buildMetadata({
  locale,
  title,
  description,
  path,
  image = "/images/og-image.jpg",
  imageAlt,
  keywords = [],
  absoluteTitle,
}: MetadataOptions): Metadata {
  const canonicalPath = localizePath(locale, path);
  const canonical = absoluteUrl(canonicalPath);
  const languageAlternates = Object.fromEntries(
    LOCALES.map((item) => [item, absoluteUrl(localizePath(item, path))]),
  );

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        ...languageAlternates,
        "x-default": absoluteUrl(path),
      },
    },
    openGraph: {
      title: absoluteTitle ?? title,
      description,
      url: canonical,
      siteName: BRAND.companyName,
      type: "website",
      locale: getOpenGraphLocale(locale),
      images: [
        {
          url: image.startsWith("http") ? image : absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: imageAlt ?? absoluteTitle ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ?? title,
      description,
      images: [image.startsWith("http") ? image : absoluteUrl(image)],
    },
  };
}
