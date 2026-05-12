import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArrowUpRight, CheckCircle2, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { BRAND, SERVICES, type Locale, type ServiceSlug } from "@/lib/constants";
import { localizePath } from "@/lib/utils";

import { ServiceJsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ServiceDetailPageProps {
  locale: Locale;
  slug: ServiceSlug;
}

export function ServiceDetailPage({ locale, slug }: ServiceDetailPageProps) {
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) notFound();

  const catalogT = useTranslations("servicesData");
  const pageT = useTranslations(`servicePages.${slug}`);
  const common = useTranslations("common");
  const highlights = pageT.raw("highlights") as string[];
  const process = pageT.raw("process") as string[];
  const requirements = pageT.raw("requirements") as string[];

  return (
    <div className="pb-24">
      <ServiceJsonLd
        locale={locale}
        slug={slug}
        name={catalogT(`${slug}.title`)}
        description={pageT("description")}
      />

      <PageHero
        locale={locale}
        eyebrow={pageT("eyebrow")}
        title={pageT("title")}
        description={pageT("description")}
        image={service.image}
        imageAlt={catalogT(`${slug}.title`)}
        primaryHref="/contact"
        primaryLabel={common("bookConsultation")}
        secondaryHref="/services"
        secondaryLabel={common("allServices")}
        aside={
          <div className="space-y-3">
            <Badge className="border-white/20 bg-white/15 text-white backdrop-blur-sm">
              {catalogT(`${slug}.tag`)}
            </Badge>
            <div className="grid gap-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm leading-6 text-white/90 backdrop-blur-md"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* ── Body ── */}
      <div className="mx-auto mt-14 max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">

          {/* Process steps */}
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
            <Badge>{pageT("processTitle")}</Badge>
            <ol className="mt-6 space-y-4">
              {process.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-2xl border border-black/[0.07] bg-brand-light p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-zinc-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-8">
            {/* Requirements */}
            <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
              <Badge>{pageT("requirementsTitle")}</Badge>
              <ul className="mt-6 space-y-3">
                {requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-red" />
                    <p className="text-sm leading-7 text-zinc-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA dark card */}
            <div className="overflow-hidden rounded-[2rem] bg-brand-black shadow-glow">
              {/* Thin accent image strip */}
              <div className="relative h-32 w-full">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover opacity-40"
                  sizes="(min-width:1024px) 40vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-black" />
              </div>

              <div className="px-6 pb-8 pt-2 text-white md:px-8">
                <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">
                  {common("directSupport")}
                </p>
                <h2 className="display-copy mt-3 font-display text-2xl font-bold md:text-3xl">
                  {pageT("ctaTitle")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {pageT("ctaDescription")}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={localizePath(locale, "/contact")} showArrow>
                    {common("contactOffice")}
                  </Button>
                  <Button
                    href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                    variant="outline"
                    className="border-white/15 bg-white/10 text-white hover:border-white hover:bg-white hover:text-brand-black"
                  >
                    <Phone className="h-4 w-4 text-brand-gold" />
                    <span dir="ltr" className="inline-block font-body">
                      {BRAND.phone}
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Related services */}
            <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
              <h3 className="font-display text-xl font-bold text-brand-black">
                {common("relatedServices")}
              </h3>
              <div className="mt-4 grid gap-2">
                {SERVICES.filter((item) => item.slug !== slug)
                  .slice(0, 3)
                  .map((item) => (
                    <Link
                      key={item.slug}
                      href={localizePath(locale, item.href)}
                      className="group flex items-center justify-between rounded-2xl border border-black/[0.07] bg-brand-light px-4 py-3.5 text-sm font-medium text-brand-black transition hover:border-brand-red/30 hover:bg-brand-red/5 hover:text-brand-red"
                    >
                      {catalogT(`${item.slug}.title`)}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
