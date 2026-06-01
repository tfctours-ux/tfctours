// src/lib/cms/cache.ts
// SERVER ONLY — do not import from client components.
// Safe: called only from server components and API routes.
import "server-only";

import { unstable_cache } from "next/cache";

export const CMS_TAGS = {
  brand: "cms:brand",
  nav: "cms:nav",
  services: "cms:services",
  guides: "cms:guides",
  gallery: "cms:gallery",
  tours: "cms:tours",
  umrah: "cms:umrah",
  stats: "cms:stats",
  faq: "cms:faq",
  translations: "cms:translations",
  calculator: "cms:calculator",
  transport: "cms:transport",
  pages: "cms:pages",
  seo: "cms:seo",
  media: "cms:media",
} as const;

export type CmsTag = (typeof CMS_TAGS)[keyof typeof CMS_TAGS];

function toCacheKeyPart(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function withCmsCache<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  keyParts: string[],
  tags: string[],
  revalidate: number = 300,
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs) => {
    if (!process.env.NEON_DATABASE_URL) {
      // Fetchers all model "no CMS data" as null. The generic cast keeps the
      // wrapper transparent while callers keep their explicit null fallbacks.
      return null as unknown as TReturn;
    }

    const cachedFn = unstable_cache(
      async (...innerArgs: TArgs) => {
        try {
          return await fn(...innerArgs);
        } catch (error) {
          console.error({ action: "cms_cache_miss", tags, error });
          // Same documented null path as missing env: callers own fallback data.
          return null as unknown as TReturn;
        }
      },
      [...keyParts, ...args.map(toCacheKeyPart)],
      { tags, revalidate },
    );

    try {
      return await cachedFn(...args);
    } catch (error) {
      console.error({ action: "cms_cache_miss", tags, error });
      // unstable_cache itself can throw; preserve the same fallback contract.
      return null as unknown as TReturn;
    }
  };
}
