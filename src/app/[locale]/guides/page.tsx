import type { Metadata } from "next";

import Image from "next/image";

import { Clock3 } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/shared/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GUIDES } from "@/lib/constants";
import {
  buildLocalizedPageMetadata,
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";
import { localizePath } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  return buildLocalizedPageMetadata(params, "guidesPage.meta", "/guides", [
    "visa guide",
    "travel guide",
    "saudi guide",
  ]);
}

export default async function GuidesPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "guidesPage" });
  const guideT = await getTranslations({ locale, namespace: "guidesData" });
  const common = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="pb-20">
      <Breadcrumb />
      <PageHero
        locale={locale}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image="/images/japan.webp"
        imageAlt={t("hero.title")}
        primaryHref="/contact"
        primaryLabel={common("bookConsultation")}
        secondaryHref="/services"
        secondaryLabel={common("exploreServices")}
        aside={
          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 text-white backdrop-blur">
            <p className="text-sm leading-7 text-white/78">{t("note")}</p>
          </div>
        }
      />

      <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-6 md:grid-cols-2">
        {GUIDES.map((guide) => (
          <article
            key={guide.slug}
            className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-brand"
          >
            <div className="relative min-h-[18rem]">
              <Image
                src={guide.image}
                alt={guideT(`${guide.slug}.title`)}
                fill
                sizes="(min-width: 768px) 44vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-5 top-5">
                <Badge className="border-white/15 bg-white/10 text-white">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-3.5 w-3.5" />
                    {guide.readMinutes} {common("minutesShort")}
                  </span>
                </Badge>
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-display text-3xl font-bold text-brand-black">
                {guideT(`${guide.slug}.title`)}
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-700">
                {guideT(`${guide.slug}.summary`)}
              </p>
              <div className="mt-6">
                <Button href={localizePath(locale, guide.href)} showArrow>
                  {common("viewGuide")}
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
