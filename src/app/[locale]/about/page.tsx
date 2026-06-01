import type { Metadata } from "next";

import Image from "next/image";

import { Building2, ShieldCheck, Star, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { AboutGallerySection } from "@/components/about/AboutGallerySection";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { OrganizationJsonLd, SpeakableJsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import {
  ABOUT_GALLERY_IMAGES,
  getAboutGalleryImage,
  getLocalizedGalleryText,
} from "@/lib/about-gallery";
import { BRAND } from "@/lib/constants";
import {
  buildLocalizedPageMetadata,
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";

const aboutCopy = {
  en: {
    heroTrustEyebrow: "Why clients trust us",
    heroTrustPoints: [
      {
        label: "IATA Certified",
        detail: "Trusted airline access and booking infrastructure.",
        Icon: ShieldCheck,
      },
      {
        label: "20+ Years",
        detail: "Serving travellers across flights, tours and Umrah.",
        Icon: Star,
      },
      {
        label: "2 Offices",
        detail: "Jinnah Stadium and DC Colony, Gujranwala.",
        Icon: Building2,
      },
    ],
    valueCards: [
      {
        title: "IATA Certified Handling",
        description:
          "All flight bookings backed by IATA certification, giving clients access to the best fares and reliable ticketing infrastructure.",
        Icon: ShieldCheck,
      },
      {
        title: "One-Stop Travel Desk",
        description:
          "Flights, Umrah, tours, hotels, visas and insurance — handled together so you never need to go elsewhere.",
        Icon: Star,
      },
      {
        title: "Direct Communication",
        description:
          "Phone, WhatsApp, email and walk-in — reach us however is easiest for your travel or visa question.",
        Icon: UserRound,
      },
    ],
    trustHeading: "IATA Certified",
    trustDescription:
      "Built on trusted travel infrastructure, direct airline access and two fully staffed offices in Gujranwala.",
    trustCards: [
      {
        title: "IATA Certified Agency",
        description:
          "The Flight Centre is an IATA certified travel agency, giving clients access to global airline inventory and trusted booking infrastructure.",
        Icon: ShieldCheck,
      },
      {
        title: "20+ Years Experience",
        description:
          "Serving Pakistani travellers since the early 2000s, with thousands of satisfied clients across flights, tours, Umrah and visa services.",
        Icon: Star,
      },
      {
        title: "2 Offices in Gujranwala",
        description:
          "Main office at Jinnah Stadium and branch at DC Colony — both fully staffed to serve walk-in clients.",
        Icon: Building2,
      },
    ],
  },
  ur: {
    heroTrustEyebrow: "کلائنٹس ہم پر کیوں اعتماد کرتے ہیں",
    heroTrustPoints: [
      {
        label: "آئی اے ٹی اے سرٹیفائیڈ",
        detail: "قابل اعتماد ایئرلائن رسائی اور مستند بکنگ انفراسٹرکچر۔",
        Icon: ShieldCheck,
      },
      {
        label: "20+ سال",
        detail: "فلائٹس، ٹورز اور عمرہ میں مسافروں کی مسلسل خدمت۔",
        Icon: Star,
      },
      {
        label: "2 دفاتر",
        detail: "جناح اسٹیڈیم اور ڈی سی کالونی، گوجرانوالہ۔",
        Icon: Building2,
      },
    ],
    valueCards: [
      {
        title: "سرٹیفائیڈ ٹکٹنگ ہینڈلنگ",
        description:
          "تمام فلائٹ بکنگ مستند ٹکٹنگ سسٹم کے ذریعے ہوتی ہے، تاکہ کلائنٹس کو بہتر کرایوں اور قابل اعتماد سپورٹ تک رسائی ملے۔",
        Icon: ShieldCheck,
      },
      {
        title: "ون اسٹاپ ٹریول ڈیسک",
        description:
          "فلائٹس، عمرہ، ٹورز، ہوٹلز، ویزا اور انشورنس ایک ہی جگہ سنبھالے جاتے ہیں، تاکہ آپ کو مختلف جگہوں پر نہ جانا پڑے۔",
        Icon: Star,
      },
      {
        title: "براہ راست رابطہ",
        description:
          "فون، واٹس ایپ، ای میل یا دفتر آ کر رابطہ کریں، ہماری ٹیم ہر سفری اور ویزا سوال میں رہنمائی کرتی ہے۔",
        Icon: UserRound,
      },
    ],
    trustHeading: "آئی اے ٹی اے سرٹیفائیڈ",
    trustDescription:
      "قابل اعتماد ٹریول انفراسٹرکچر، براہ راست ایئرلائن رسائی اور گوجرانوالہ میں دو مکمل اسٹافڈ دفاتر کے ساتھ خدمت۔",
    trustCards: [
      {
        title: "سرٹیفائیڈ ٹریول ایجنسی",
        description:
          "دی فلائٹ سینٹر عالمی ایئرلائن انوینٹری اور قابل اعتماد بکنگ سسٹمز تک رسائی کے ساتھ کلائنٹس کی خدمت کرتا ہے۔",
        Icon: ShieldCheck,
      },
      {
        title: "20+ سال کا تجربہ",
        description:
          "ابتدائی 2000s سے پاکستانی مسافروں کی فلائٹس، ٹورز، عمرہ اور ویزا سروسز میں رہنمائی۔",
        Icon: Star,
      },
      {
        title: "گوجرانوالہ میں 2 دفاتر",
        description:
          "جناح اسٹیڈیم میں مین آفس اور ڈی سی کالونی میں برانچ، دونوں واک اِن کلائنٹس کے لیے مکمل طور پر فعال ہیں۔",
        Icon: Building2,
      },
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  return buildLocalizedPageMetadata(params, "about.meta", "/about", [
    "about the flight centre",
    "travel agency gujranwala",
  ]);
}

export default async function AboutPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "about" });
  const common = await getTranslations({ locale, namespace: "common" });
  const copy = aboutCopy[locale];
  const factualContent =
    locale === "ur"
      ? {
          title: "دی فلائٹ سینٹر ٹریول اینڈ ٹورز کے بارے میں",
          paragraphs: [
            "دی فلائٹ سینٹر ٹریول اینڈ ٹورز گزشتہ 20 سال سے گوجرانوالہ میں قابلِ اعتماد ٹریول سروس فراہم کر رہا ہے۔ فلائٹ بکنگ سے لے کر مکمل عمرہ پیکجز اور انٹرنیشنل ٹورز تک، ہم ہر سفری ضرورت کو پیشہ ورانہ انداز میں سنبھالتے ہیں۔",
            "بطور آئی اے ٹی اے سرٹیفائیڈ ایجنسی، ہمارے پاس عالمی ایئرلائن نیٹ ورک، ہوٹل پارٹنرز، ویزا سپورٹ چینلز اور 50 سے زائد ممالک کے ٹور آپریٹرز تک براہ راست رسائی موجود ہے۔",
            "گوجرانوالہ میں ہمارے دو دفاتر ہر سال ہزاروں کلائنٹس کی خدمت کرتے ہیں، جبکہ 24/7 ہیلپ ڈیسک ہر مسافر کے لیے فوری رہنمائی مہیا کرتا ہے۔",
          ],
          facts: [
            ["ہم کون ہیں", "گوجرانوالہ میں قائم آئی اے ٹی اے سرٹیفائیڈ ٹریول اینڈ ٹورز ایجنسی"],
            ["ہم کیا کرتے ہیں", "فلائٹس، عمرہ، ٹورز، ہوٹلز، ویزا اور ٹریول انشورنس"],
            ["ہم کہاں ہیں", "جناح اسٹیڈیم اور ڈی سی کالونی، گوجرانوالہ"],
            ["تجربہ", "20 سال سے زائد"],
            ["رسائی", "پاکستان بھر کے مسافروں اور ایجنٹس کے لیے"],
          ],
        }
      : {
          title: "About The Flight Centre Travel & Tours",
          paragraphs: [
            "The Flight Centre Travel & Tours has been Gujranwala's go-to travel agency for over 20 years. From simple flight bookings to complete Umrah packages and international tours, we handle every travel need with care and professionalism.",
            "As an IATA certified agency, we provide direct access to global airline inventory and maintain strong relationships with hotels, visa authorities and tour operators across 50+ countries.",
            "Our two offices in Gujranwala serve thousands of clients each year, with a 24/7 helpdesk ensuring round-the-clock support for every traveller.",
          ],
          facts: [
            ["Who we are", "An IATA certified travel agency in Gujranwala, Pakistan"],
            ["What we handle", "Flights, Umrah, tours, hotels, visas and travel insurance"],
            ["Where we serve", "Jinnah Stadium and DC Colony, Gujranwala"],
            ["Experience", "More than 20 years serving travellers"],
            ["Reach", "Serving clients across Pakistan"],
          ],
        };
  const story = t.raw("story.paragraphs") as string[];
  const heroImage = getAboutGalleryImage("4.webp");
  const officeSceneImage = getAboutGalleryImage("2.webp");
  const signageImage = getAboutGalleryImage("3.webp");
  const galleryImages = ABOUT_GALLERY_IMAGES.filter((image) => image.usage === "gallery");
  const officePresenceCopy =
    locale === "ur"
      ? {
          eyebrow: "گوجرانوالہ سے براہِ راست خدمت",
          title: "سامنے موجود فرنٹ ڈیسک، واضح آفس موجودگی اور روزانہ کی کلائنٹ رہنمائی",
          description:
            "یہ تصاویر ریسیپشن فلور، سروس کاؤنٹرز اور سڑک کی جانب موجود آفس سائن ایج کو دکھاتی ہیں، تاکہ کلائنٹس کو ہمارے اصل کام کے ماحول کا اندازہ ہو۔",
        }
      : {
          eyebrow: "Serving Clients from Gujranwala",
          title: "A visible front desk, a real office floor and a street-facing presence",
          description:
            "These images show the reception floor, service desks and outside signage that clients associate with The Flight Centre's day-to-day operation.",
        };

  return (
    <div className="pb-20">
      <OrganizationJsonLd description={factualContent.paragraphs[0]} />
      <SpeakableJsonLd path="/about" cssSelectors={["#about-h1", "#about-mission"]} />
      <Breadcrumb />
      <PageHero
        locale={locale}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={heroImage?.src ?? "/images/tfc-office.webp"}
        imageAlt={
          heroImage
            ? getLocalizedGalleryText(heroImage.alt, locale)
            : BRAND.mainOffice ?? BRAND.office
        }
        primaryHref="/contact"
        primaryLabel={common("bookConsultation")}
        secondaryHref="/services"
        secondaryLabel={common("exploreServices")}
        aside={
          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">
              {copy.heroTrustEyebrow}
            </p>
            <div className="mt-4 space-y-4">
              {copy.heroTrustPoints.map(({ label, detail, Icon }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-black/10 px-4 py-3"
                >
                  <Icon className="mt-0.5 h-5 w-5 text-brand-gold" />
                  <div>
                    <p className="font-semibold text-white">{label}</p>
                    <p className="mt-1 text-sm leading-6 text-white/72">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="bg-background py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h1
            id="about-h1"
            className="font-display text-4xl font-black text-foreground md:text-5xl"
          >
            {t("h1")}
          </h1>
          <p
            id="about-mission"
            className="mt-4 max-w-3xl text-base leading-8 text-foreground-muted md:text-lg"
          >
            {t("mission")}
          </p>

          <dl
            id="about-key-facts"
            className="mt-10 grid gap-x-8 gap-y-4 rounded-2xl border border-border bg-surface-elevated p-6 md:grid-cols-2"
          >
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle">
                {t("facts.legalNameLabel")}
              </dt>
              <dd className="mt-1 text-foreground">
                The Flight Centre Travel &amp; Tours
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle">
                {t("facts.headquartersLabel")}
              </dt>
              <dd className="mt-1 text-foreground">
                Office 36-37, Jinnah Stadium, Gujranwala, Pakistan
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle">
                UAN
              </dt>
              <dd className="mt-1 text-foreground" dir="ltr">111-786-788</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle">
                {t("facts.certificationsLabel")}
              </dt>
              <dd className="mt-1 text-foreground">
                IATA Certified
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle">
                {t("facts.foundedLabel")}
              </dt>
              <dd className="mt-1 text-foreground">
                20+ years of operation
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle">
                CEO
              </dt>
              <dd className="mt-1 text-foreground">
                Rana Khalid Parvez Khan
              </dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle">
                {t("facts.servicesLabel")}
              </dt>
              <dd className="mt-1 text-foreground">
                Umrah Packages, Tour Packages, Airline Ticket Booking, Hotel Booking, Visit Visa Services, Travel Insurance, Saudi Wakala, Work Visa Services
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle">
                {t("facts.languagesLabel")}
              </dt>
              <dd className="mt-1 text-foreground">
                English, Urdu (اردو)
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle">
                {t("facts.areasServedLabel")}
              </dt>
              <dd className="mt-1 text-foreground">
                Pakistan, Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
          <h2 className="font-display text-3xl font-bold text-brand-black">
            {t("story.title")}
          </h2>
          <div className="mt-5 space-y-5 text-base leading-8 text-zinc-700">
            {story.map((paragraph, i) => (
              <p
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-brand md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-red">
              {officePresenceCopy.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-black text-brand-black">
              {officePresenceCopy.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
              {officePresenceCopy.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
            {officeSceneImage ? (
              <figure className="group overflow-hidden rounded-[2rem] border border-black/10 bg-brand-black shadow-brand sm:row-span-2">
                <div className="relative aspect-[4/3] overflow-hidden sm:h-full sm:min-h-[25rem]">
                  <Image
                    src={officeSceneImage.src}
                    alt={getLocalizedGalleryText(officeSceneImage.alt, locale)}
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                </div>
                <figcaption className="space-y-2 px-5 py-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">
                    {getLocalizedGalleryText(officeSceneImage.title, locale)}
                  </p>
                  <p className="text-sm leading-7 text-white/72">
                    {getLocalizedGalleryText(officeSceneImage.caption, locale)}
                  </p>
                </figcaption>
              </figure>
            ) : null}

            {signageImage ? (
              <figure className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-brand">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={signageImage.src}
                    alt={getLocalizedGalleryText(signageImage.alt, locale)}
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 640px) 36vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                </div>
                <figcaption className="space-y-2 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">
                    {getLocalizedGalleryText(signageImage.title, locale)}
                  </p>
                  <p className="text-sm leading-7 text-zinc-600">
                    {getLocalizedGalleryText(signageImage.caption, locale)}
                  </p>
                </figcaption>
              </figure>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
            <h2
              className="font-display text-3xl font-bold text-brand-black"
            >
              {factualContent.title}
            </h2>
            <div className="mt-5 space-y-5 text-base leading-8 text-zinc-700">
              {factualContent.paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {factualContent.facts.map(([label, value]) => (
                <article
                  key={label}
                  className="rounded-[1.5rem] border border-black/10 bg-brand-light p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-red">
                    {label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-700">{value}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AboutGallerySection locale={locale} items={galleryImages} />

      <section className="mx-auto mt-12 max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {copy.valueCards.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand"
            >
              <Icon className="h-6 w-6 text-brand-red" />
              <h3 className="mt-5 font-display text-2xl font-bold text-brand-black">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-700">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-6">
        <div className="rounded-[2.5rem] bg-brand-black px-6 py-8 text-white shadow-glow md:px-8">
          <h2 className="display-copy font-display text-4xl font-black">
            {copy.trustHeading}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72">
            {copy.trustDescription}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {copy.trustCards.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-brand-gold" />
                  <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">
                    {title}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/72">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
