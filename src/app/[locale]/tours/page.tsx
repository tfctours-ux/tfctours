import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/Button";
import {
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";
import { buildMetadata, localizePath } from "@/lib/utils";

const DESTINATIONS = [
  { name: { en: "Dubai", ur: "دبئی" }, image: "/images/dubai.webp" },
  { name: { en: "Malaysia", ur: "ملائیشیا" }, image: "/images/malaysia.webp" },
  { name: { en: "Thailand", ur: "تھائی لینڈ" }, image: "/images/thailand.webp" },
  { name: { en: "Singapore", ur: "سنگاپور" }, image: "/images/singapore.webp" },
  { name: { en: "Bahrain", ur: "بحرین" }, image: "/images/bahrain.webp" },
  { name: { en: "Azerbaijan", ur: "آذربائیجان" }, image: "/images/azerbaijan.webp" },
  { name: { en: "Oman", ur: "عمان" }, image: "/images/oman.webp" },
  { name: { en: "Cambodia", ur: "کمبوڈیا" }, image: "/images/cambodia.webp" },
  { name: { en: "Maldives", ur: "مالدیپ" }, image: "/images/maldives.webp" },
] as const;

const CONTENT = {
  en: {
    metaTitle: "International Tour Packages | The Flight Centre Travel & Tours",
    metaDescription:
      "Book international tour packages from Pakistan to Dubai, Malaysia, Thailand, Singapore, Bahrain, Azerbaijan and 50+ destinations. Contact The Flight Centre, Gujranwala.",
    imageAlt: "International tours by The Flight Centre Travel & Tours",
    eyebrow: "International Tours",
    title: "Explore the World's Best Destinations",
    description:
      "From the beaches of Southeast Asia to the ancient cities of the Middle East - The Flight Centre brings you curated tour packages from Pakistan.",
    getQuote: "Get Quote",
    tourQuote: "Get Your Tour Quote",
    destinations: "Destinations",
    packages: "Packages",
    enquire: "Enquire Now",
    customTitle: "Can't find your destination? We cover 50+ countries.",
    customCta: "Contact Us For Custom Package",
  },
  ur: {
    metaTitle: "انٹرنیشنل ٹور پیکجز | دی فلائٹ سینٹر ٹریول اینڈ ٹورز",
    metaDescription:
      "پاکستان سے دبئی، ملائیشیا، تھائی لینڈ، سنگاپور، بحرین، آذربائیجان اور 50+ مقامات کے انٹرنیشنل ٹور پیکجز بک کریں۔ دی فلائٹ سینٹر گوجرانوالہ سے رابطہ کریں۔",
    imageAlt: "دی فلائٹ سینٹر ٹریول اینڈ ٹورز کے انٹرنیشنل ٹورز",
    eyebrow: "انٹرنیشنل ٹورز",
    title: "دنیا کی بہترین منزلیں دریافت کریں",
    description:
      "جنوب مشرقی ایشیا کے ساحلوں سے مشرق وسطیٰ کے تاریخی شہروں تک، دی فلائٹ سینٹر پاکستان سے تیار شدہ ٹور پیکجز فراہم کرتا ہے۔",
    getQuote: "کوٹیشن لیں",
    tourQuote: "ٹور کوٹیشن حاصل کریں",
    destinations: "منزلیں",
    packages: "پیکجز",
    enquire: "ابھی پوچھیں",
    customTitle: "آپ کی منزل نظر نہیں آ رہی؟ ہم 50+ ممالک کور کرتے ہیں۔",
    customCta: "کسٹم پیکج کے لیے رابطہ کریں",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  const content = CONTENT[locale === "ur" ? "ur" : "en"];

  return buildMetadata({
    locale,
    title: content.metaTitle,
    absoluteTitle: content.metaTitle,
    description: content.metaDescription,
    path: "/tours",
    image: "/images/dubai.webp",
    imageAlt: content.imageAlt,
    keywords: [
      "international tours pakistan",
      "dubai malaysia thailand tours",
      "the flight centre gujranwala",
    ],
  });
}

export default async function ToursPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);
  const key = locale === "ur" ? "ur" : "en";
  const content = CONTENT[key];

  return (
    <div className="pb-24">
      <Breadcrumb />

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[2.5rem] bg-brand-mesh p-8 text-white shadow-glow md:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.26em] text-brand-gold backdrop-blur-sm">
            {content.eyebrow}
          </span>
          <h1 className="display-copy mt-6 font-display text-4xl font-black leading-tight text-white md:text-5xl xl:text-6xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/70 md:text-lg">
            {content.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={localizePath(locale, "/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-brand-darkred"
            >
              {content.getQuote}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Button href={localizePath(locale, "/tour-calculator")} variant="gold" showArrow>
              {content.tourQuote}
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] shadow-glow">
          <Image
            src="/images/dubai.webp"
            alt={content.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(min-width:1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative min-h-[22rem] lg:min-h-[28rem]" />
          <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-black/50 px-5 py-3 backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">
              {content.destinations}
            </p>
            <p className="mt-0.5 font-display text-2xl font-black text-white">
              {DESTINATIONS.length}+ {content.packages}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6">
        <div className="mb-10">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red">
              {content.eyebrow}
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl text-brand-black md:text-4xl">
            {content.title}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((destination) => {
            const destinationName = destination.name[key];

            return (
              <article
                key={destination.name.en}
                className="group relative overflow-hidden rounded-[2rem] shadow-brand ring-1 ring-black/[0.06]"
              >
                <div className="relative min-h-[22rem] overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destinationName}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-3xl font-black text-white">
                    {destinationName}
                  </p>
                  <Link
                    href={localizePath(locale, "/contact")}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-brand-black"
                  >
                    {content.enquire}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6">
        <div className="rounded-[2.5rem] bg-brand-black px-8 py-10 text-white shadow-glow md:px-10">
          <h2 className="font-display text-3xl font-black md:text-4xl">
            {content.customTitle}
          </h2>
          <div className="mt-6">
            <Link
              href={localizePath(locale, "/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-brand-darkred"
            >
              {content.customCta}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
