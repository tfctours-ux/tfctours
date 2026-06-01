// src/lib/cms/i18n-overrides.ts
// SERVER ONLY — do not import from client components.
// Safe: called only from server components and API routes.
import "server-only";

import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

import { getCmsDb } from "./client";
import { translations } from "./schema";

type I18nOverrides = Record<string, Record<string, string>>;

export async function getCmsI18nOverrides(
  locale: string,
): Promise<I18nOverrides> {
  if (!process.env.NEON_DATABASE_URL) {
    return {};
  }

  const cached = unstable_cache(
    async (innerLocale: string) => {
      try {
        const db = getCmsDb();
        if (!db || !isLocale(innerLocale)) {
          return {};
        }

        const rows = await db
          .select({
            id: translations.id,
            namespace: translations.namespace,
            key: translations.key,
            value: translations.value,
          })
          .from(translations)
          .where(eq(translations.locale, innerLocale));

        const overrides: Record<string, unknown> = {};

        for (const row of rows) {
          setNestedValue(
            overrides,
            [...row.namespace.split("."), ...row.key.split(".")],
            row.value,
          );
        }

        return overrides as I18nOverrides;
      } catch (error) {
        console.error({ action: "cms_i18n_override_fetch_failed", error });
        return {};
      }
    },
    ["cms", "i18n-overrides", locale],
    { tags: ["cms:translations"], revalidate: 60 },
  );

  try {
    return await cached(locale);
  } catch (error) {
    console.error({ action: "cms_i18n_override_fetch_failed", error });
    return {};
  }
}

function isLocale(locale: string): locale is "en" | "ur" {
  return locale === "en" || locale === "ur";
}

function setNestedValue(
  target: Record<string, unknown>,
  path: string[],
  value: string,
) {
  let cursor = target;

  for (let index = 0; index < path.length; index += 1) {
    const part = path[index];
    if (!part) {
      continue;
    }

    if (index === path.length - 1) {
      cursor[part] = value;
      return;
    }

    const next = cursor[part];
    if (!isRecord(next)) {
      cursor[part] = {};
    }
    cursor = cursor[part] as Record<string, unknown>;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
