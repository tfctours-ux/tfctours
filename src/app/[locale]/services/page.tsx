import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { SpeakableJsonLd } from "@/components/shared/JsonLd";
import { getEffectiveServices } from "@/lib/cms/effective";
import { getServices } from "@/lib/cms/fetchers";
import { BRAND_IMAGES } from "@/lib/constants";
import { localizePath } from "@/lib/utils";
import {
  buildLocalizedPageMetadata,
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  return buildLocalizedPageMetadata(params, "servicesPage.meta", "/services", [
    "travel services",
    "visa services",
    "umrah packages",
  ]);
}

export default async function ServicesPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const common = await getTranslations({ locale, namespace: "common" });
  const process = t.raw("process") as string[];
  const reasons = t.raw("whyUs") as string[];
  const cmsServices = await getServices(locale);
  const services = await getEffectiveServices(locale, cmsServices);
  const serviceCountCopy =
    locale === "ur"
      ? { eyebrow: "پورٹ فولیو", label: "خدمات" }
      : { eyebrow: "Portfolio", label: "Services" };

  return (
    <div className="pb-24">
      <SpeakableJsonLd
        path={localizePath(locale, "/services")}
        cssSelectors={["#services-h1", "#services-lede"]}
      />
      <Breadcrumb />

      {/* ── Hero ── */}
      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: text */}
        <div className="overflow-hidden rounded-[2.5rem] bg-brand-mesh p-8 text-white shadow-glow md:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.26em] text-brand-gold backdrop-blur-sm">
            {t("hero.eyebrow")}
          </span>
          <h1 id="services-h1" className="display-copy mt-6 font-display text-4xl font-black leading-tight text-white md:text-5xl xl:text-6xl">
            {t("hero.title")}
          </h1>
          <p id="services-lede" className="mt-5 max-w-xl text-base leading-8 text-white/70 md:text-lg">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={localizePath(locale, "/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-brand-darkred"
            >
              {common("bookConsultation")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={localizePath(locale, "/guides")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-brand-black"
            >
              {common("allGuides")}
            </Link>
          </div>
        </div>

        {/* Right: full-bleed image */}
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-glow">
          <Image
            src={BRAND_IMAGES.hero}
            alt={t("hero.title")}
            fill
            priority
            className="object-cover"
            sizes="(min-width:1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative min-h-[22rem] lg:min-h-[28rem]" />
          {/* Service count badge */}
          <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-black/50 px-5 py-3 backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">
              {serviceCountCopy.eyebrow}
            </p>
            <p className="mt-0.5 font-display text-2xl font-black text-white">
              {services.length} {serviceCountCopy.label}
            </p>
          </div>
        </div>
      </section>

      {/* ── Service Cards Grid ── */}
      <section className="mx-auto mt-14 max-w-7xl px-6">
        <div className="mb-10">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red">
              {t("hero.eyebrow")}
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-white text-brand-white md:text-4xl">
            {t("hero.title")}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              locale={locale}
              service={service}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── Process + Why Us ── */}
      <section className="mx-auto mt-14 max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-2">

          {/* How it works */}
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-red">
              {t("processTitle")}
            </div>
            <ol className="mt-6 space-y-4">
              {process.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl border border-black/[0.07] bg-brand-light p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-zinc-700">{item}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Why choose us */}
          <div className="overflow-hidden rounded-[2rem] bg-brand-black shadow-glow">
            {/* Accent image strip */}
            <div className="relative h-36 w-full">
              <Image
                src={BRAND_IMAGES.hero}
                alt=""
                fill
                className="object-cover opacity-35"
                sizes="(min-width:1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-black" />
              <div className="absolute bottom-4 left-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-brand-gold">
                  {t("whyUsTitle")}
                </p>
                <p className="mt-1 font-display text-2xl font-black text-white">
                  {t("whyUsTitle")}
                </p>
              </div>
            </div>

            <ul className="space-y-3 px-6 pb-8 pt-2 md:px-8">
              {reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/75"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-gold" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
