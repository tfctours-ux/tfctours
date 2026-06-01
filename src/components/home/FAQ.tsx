// src/components/home/FAQ.tsx
import { getLocale } from "next-intl/server";

import { FAQClient } from "@/components/home/FAQClient";
import { getFaqItems } from "@/lib/cms/fetchers";
import type { FaqView } from "@/lib/cms/types";
import type { Locale } from "@/lib/constants";
import { TFC_FAQ_ITEMS } from "@/lib/seo/faq-items";

export { FAQSkeleton } from "./FAQSkeleton";

export async function FAQ() {
  const locale = (await getLocale()) as Locale;
  const items = await getFaqItems(locale);
  const resolvedItems =
    items ??
    TFC_FAQ_ITEMS.map<FaqView>((item, index) => ({
      id: item.id,
      question: locale === "ur" ? item.question.ur : item.question.en,
      answer: locale === "ur" ? item.answer.ur : item.answer.en,
      sortOrder: index,
    }));

  return <FAQClient items={resolvedItems} />;
}
