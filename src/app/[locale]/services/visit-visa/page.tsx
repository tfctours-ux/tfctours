import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ServiceDetailPage } from "@/components/shared/ServiceDetailPage";
import { Accordion } from "@/components/ui/Accordion";
import {
  FAQJsonLd,
  ServiceJsonLd,
  BreadcrumbJsonLd,
} from "@/components/shared/JsonLd";
import { SERVICE_FAQ_MAP } from "@/lib/seo/faq-items";
import { localizePath } from "@/lib/utils";
import {
  buildServiceMetadata,
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  return buildServiceMetadata(params, "visit-visa");
}

export default async function VisitVisaPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);

  const tPage = await getTranslations({
    locale,
    namespace: "servicePages.visit-visa",
  });
  const tbc = await getTranslations({ locale, namespace: "breadcrumbs" });
  const t = (key: string, chunks?: Parameters<typeof tPage>[1]) => {
    if (key.startsWith("breadcrumbs.")) {
      return tbc(key.replace("breadcrumbs.", ""), chunks);
    }
    return tPage(key, chunks);
  };

  return (
    <>
      <FAQJsonLd locale={locale} items={SERVICE_FAQ_MAP["visit-visa"]} />
      <ServiceJsonLd
        locale={locale}
        slug="visit-visa"
        name={t("title")}
        description={t("description")}
      />
      <BreadcrumbJsonLd
        items={[
          {
            name: t("breadcrumbs.home", { default: "Home" }),
            path: localizePath(locale, "/"),
          },
          {
            name: t("breadcrumbs.services", { default: "Services" }),
            path: localizePath(locale, "/services"),
          },
          {
            name: t("title"),
            path: localizePath(locale, "/services/visit-visa"),
          },
        ]}
      />
      <Breadcrumb />
      <ServiceDetailPage locale={locale} slug="visit-visa" />
      <section className="mx-auto max-w-5xl px-6 py-16 border-t border-border mt-12">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-black text-foreground md:text-4xl">
            {locale === "ur" ? "اکثر پوچھے جانے والے سوالات" : "Frequently Asked Questions"}
          </h2>
        </div>
        <Accordion
          items={SERVICE_FAQ_MAP["visit-visa"].map((item) => ({
            question: item.question[locale],
            answer: item.answer[locale],
          }))}
        />
      </section>
    </>
  );
}
