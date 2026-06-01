// src/i18n/request.ts
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { defaultLocale } from "@/i18n";
import { deepMerge } from "@/lib/cms/deep-merge";
import { getCmsI18nOverrides } from "@/lib/cms/i18n-overrides";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : defaultLocale;

  const bundled = (await import(`../messages/${locale}.json`))
    .default as Record<string, unknown>;
  const overrides = await getCmsI18nOverrides(locale);
  const messages = deepMerge(
    bundled,
    overrides as unknown as Record<string, unknown>,
  );

  return {
    locale,
    messages,
  };
});
