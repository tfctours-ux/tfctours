// src/app/[locale]/services/work-visa/page.tsx
import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/shared/PageHero";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/constants";
import { buildExtendedServiceMetadata } from "@/lib/page-metadata";
import { localizePath } from "@/lib/utils";

const HERO_IMAGE = "/images/og-image.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return buildExtendedServiceMetadata(params, "work-visa");
}

export default async function WorkVisaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "extendedServices.work-visa.page",
  });
  const tbc = await getTranslations({ locale, namespace: "breadcrumbs" });

  return (
    <article className="bg-background">
      <BreadcrumbJsonLd
        items={[
          { name: tbc("home"), path: localizePath(locale as Locale, "/") },
          { name: tbc("services"), path: localizePath(locale as Locale, "/services") },
          { name: t("title"), path: localizePath(locale as Locale, "/services/work-visa") },
        ]}
      />
      <PageHero
        locale={locale as Locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        image={HERO_IMAGE}
        imageAlt={t("title")}
      />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="prose-brand">
          <h2>{t("body.h2")}</h2>
          <p>{t("body.p1")}</p>
          <p>{t("body.p2")}</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={localizePath(locale as Locale, "/contact")} variant="primary" size="lg">
            {t("cta")}
          </Button>
        </div>
      </section>
    </article>
  );
}
