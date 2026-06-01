import type { Metadata } from "next";

import { CheckCircle2 } from "lucide-react";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/shared/PageHero";
import { UmrahPackageImageRow } from "@/components/shared/UmrahPackageImageRow";
import { SpeakableJsonLd } from "@/components/shared/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getUmrahPackages } from "@/lib/cms/fetchers";
import {
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";
import { buildMetadata, localizePath } from "@/lib/utils";

const CONTENT = {
  en: {
    metaTitle: "Umrah Packages 2025 | The Flight Centre Travel & Tours",
    metaDescription:
      "Complete Umrah packages from Pakistan - 15, 21 & 28 days. Includes hotel, air ticket, transport & Umrah visa. Book with The Flight Centre, Gujranwala.",
    imageAlt: "Umrah packages by The Flight Centre Travel & Tours",
    eyebrow: "Umrah Packages 2025",
    title: "Complete Umrah Packages - 15, 21 & 28 Days",
    description:
      "The Flight Centre offers complete Umrah packages including hotel, air ticket, ground transport and Umrah visa. Best price with best services.",
    primaryLabel: "Book Now - 0304-111-9-786",
    completePackage: "Complete Package",
    asideText: "Hotel, flights, visa, transport and Ziyarat handled under one roof.",
    optionsBadge: "Package Options",
    galleryBadge: "Umrah Stay Options",
    galleryTitle: "Choose the hotel category that fits your journey",
    galleryDescription:
      "From practical 3-star plans to premium 5-star and customized Umrah arrangements, our team shapes the package around your dates, family size and preferred comfort level.",
    includedBadge: "What's Included",
    journey: "Start Your Journey",
    confirmTitle: "Ready to confirm your Umrah package?",
    confirmText:
      "Speak with The Flight Centre team for the right 15, 21 or 28 day option and current booking support from Gujranwala.",
    quote: "Get Your Umrah Quote",
    packageOptions: [
      {
        title: "15 Days",
        description:
          "Short-stay Umrah package with hotel, flight, visa and transport support.",
      },
      {
        title: "21 Days",
        description:
          "Balanced Umrah plan for families and travelers wanting extra time in Haram.",
      },
      {
        title: "28 Days",
        description:
          "Extended Umrah package with complete coordination from departure to return.",
      },
    ],
    includedItems: [
      "Hotel Accommodation",
      "Air Ticket",
      "Ground Transport",
      "Umrah Visa Processing",
      "Ziyarat Tours",
    ],
  },
  ur: {
    metaTitle: "عمرہ پیکجز 2025 | دی فلائٹ سینٹر ٹریول اینڈ ٹورز",
    metaDescription:
      "پاکستان سے مکمل عمرہ پیکجز: 15، 21 اور 28 دن۔ ہوٹل، ایئر ٹکٹ، ٹرانسپورٹ اور عمرہ ویزا شامل۔ دی فلائٹ سینٹر گوجرانوالہ سے بک کریں۔",
    imageAlt: "دی فلائٹ سینٹر ٹریول اینڈ ٹورز کے عمرہ پیکجز",
    eyebrow: "عمرہ پیکجز 2025",
    title: "مکمل عمرہ پیکجز - 15، 21 اور 28 دن",
    description:
      "دی فلائٹ سینٹر ہوٹل، ایئر ٹکٹ، گراؤنڈ ٹرانسپورٹ اور عمرہ ویزا کے ساتھ مکمل عمرہ پیکجز فراہم کرتا ہے۔ بہترین قیمت اور قابلِ اعتماد سروس۔",
    primaryLabel: "ابھی بک کریں - 0304-111-9-786",
    completePackage: "مکمل پیکج",
    asideText: "ہوٹل، فلائٹس، ویزا، ٹرانسپورٹ اور زیارات ایک ہی جگہ سے مکمل۔",
    optionsBadge: "پیکج آپشنز",
    galleryBadge: "عمرہ قیام کے آپشنز",
    galleryTitle: "اپنے سفر کے مطابق ہوٹل کیٹیگری منتخب کریں",
    galleryDescription:
      "3 اسٹار کے مناسب پلانز سے لے کر 5 اسٹار پریمیم اور کسٹمائزڈ عمرہ انتظامات تک، ہماری ٹیم آپ کی تاریخوں، فیملی سائز اور آرام کی ترجیح کے مطابق پیکج بناتی ہے۔",
    includedBadge: "کیا شامل ہے",
    journey: "اپنا سفر شروع کریں",
    confirmTitle: "اپنا عمرہ پیکج کنفرم کرنے کے لیے تیار ہیں؟",
    confirmText:
      "15، 21 یا 28 دن کے درست آپشن اور موجودہ بکنگ سپورٹ کے لیے دی فلائٹ سینٹر ٹیم سے بات کریں۔",
    quote: "عمرہ کوٹیشن حاصل کریں",
    packageOptions: [
      {
        title: "15 دن",
        description:
          "مختصر عمرہ پیکج جس میں ہوٹل، فلائٹ، ویزا اور ٹرانسپورٹ سپورٹ شامل ہے۔",
      },
      {
        title: "21 دن",
        description:
          "فیملیز اور حرم میں اضافی وقت چاہنے والے مسافروں کے لیے متوازن عمرہ پلان۔",
      },
      {
        title: "28 دن",
        description:
          "روانگی سے واپسی تک مکمل کوآرڈینیشن کے ساتھ تفصیلی عمرہ پیکج۔",
      },
    ],
    includedItems: [
      "ہوٹل رہائش",
      "ایئر ٹکٹ",
      "گراؤنڈ ٹرانسپورٹ",
      "عمرہ ویزا پروسیسنگ",
      "زیارات ٹورز",
    ],
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
    path: "/umrah",
    image: "/images/umrah-package.webp",
    imageAlt: content.imageAlt,
    keywords: [
      "umrah packages 2025",
      "umrah packages pakistan",
      "the flight centre gujranwala",
    ],
  });
}

export default async function UmrahPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);
  const content = CONTENT[locale === "ur" ? "ur" : "en"];
  const cmsPackages = await getUmrahPackages(locale);
  const packageOptions =
    cmsPackages && cmsPackages.length > 0
      ? cmsPackages.map((item) => ({
          title: item.title,
          description: item.description,
        }))
      : content.packageOptions;

  return (
    <div className="pb-24">
      <SpeakableJsonLd
        path={localizePath(locale, "/umrah")}
        cssSelectors={["#umrah-h1", "#umrah-lede"]}
      />
      <Breadcrumb />

      <PageHero
        locale={locale}
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        image="/images/umrah-package.webp"
        imageAlt={content.imageAlt}
        primaryHref="tel:03041119786"
        primaryLabel={content.primaryLabel}
        h1Id="umrah-h1"
        pId="umrah-lede"
        aside={
          <div className="rounded-[1.75rem] border border-white/15 bg-black/65 p-5 text-white shadow-[0_18px_55px_rgb(0_0_0_/_0.35)] backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold [text-shadow:0_2px_8px_rgb(0_0_0_/_0.85)]">
              {content.completePackage}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {packageOptions.map((option) => (
                <Badge
                  key={option.title}
                  className="border-white/20 bg-white/15 text-white shadow-[0_2px_10px_rgb(0_0_0_/_0.25)]"
                >
                  {option.title}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm font-medium leading-7 text-white/90 [text-shadow:0_2px_8px_rgb(0_0_0_/_0.85)]">
              {content.asideText}
            </p>
          </div>
        }
      />

      <section className="mx-auto mt-14 max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge>{content.galleryBadge}</Badge>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-black text-brand-black md:text-4xl">
              {content.galleryTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-600">
            {content.galleryDescription}
          </p>
        </div>
        <UmrahPackageImageRow locale={locale} tone="light" />
      </section>

      <div className="mx-auto mt-14 max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
            <Badge>{content.optionsBadge}</Badge>
            <div className="mt-6 grid gap-4">
              {packageOptions.map((option) => (
                <article
                  key={option.title}
                  className="rounded-[1.75rem] bg-brand-red p-5 text-white shadow-[0_16px_40px_rgba(204,0,0,0.16)]"
                >
                  <h2 className="font-display text-2xl font-bold">{option.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/85">
                    {option.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <div className="space-y-8">
            <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
              <Badge>{content.includedBadge}</Badge>
              <ul className="mt-6 space-y-3">
                {content.includedItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-red" />
                    <p className="text-sm leading-7 text-zinc-700">{item}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="overflow-hidden rounded-[2rem] bg-brand-black shadow-glow">
              <div
                className="relative h-32 w-full bg-cover bg-center opacity-80"
                style={{ backgroundImage: "url('/images/umrah-package.webp')" }}
              />
              <div className="px-6 pb-8 pt-5 text-white md:px-8">
                <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">
                  {content.journey}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
                  {content.confirmTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {content.confirmText}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button href="tel:03041119786" showArrow>
                    {content.primaryLabel}
                  </Button>
                  <Button
                    href={localizePath(locale, "/umrah-calculator")}
                    variant="gold"
                    showArrow
                  >
                    {content.quote}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
