import type { Metadata } from "next";

import Image from "next/image";

import {
  Building2,
  BriefcaseBusiness,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Handshake,
  Headset,
  Layers,
  Plane,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";
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
    stats: [
      { value: "20+", label: "Years of service" },
      { value: "50+", label: "Countries covered" },
      { value: "2", label: "Offices in Gujranwala" },
      { value: "24/7", label: "Traveller helpdesk" },
    ],
    identityEyebrow: "Who we are",
    ceoProfile: {
      eyebrow: "Chief Executive Officer",
      name: "Adv. Rana Khalid Pervez Khan",
      title: "Hands-on leadership for reliable travel, visa and Umrah service.",
      description:
        "Adv. Rana Khalid Pervez Khan leads The Flight Centre Travel & Tours with a practical, client-first approach: clear guidance, accountable documentation handling and dependable support before, during and after every journey.",
      quote:
        "Every traveller deserves a clear process, honest advice and a team that stays available when plans are moving.",
      highlights: [
        {
          title: "Client accountability",
          description:
            "Keeps the agency focused on transparent communication, careful case review and accessible follow-up for families, pilgrims and business travellers.",
          Icon: Handshake,
        },
        {
          title: "End-to-end coordination",
          description:
            "Oversees joined-up service across ticketing, Umrah packages, tours, hotel bookings, visit visas, work visa support and travel insurance.",
          Icon: Plane,
        },
        {
          title: "Operational discipline",
          description:
            "Guides the team to handle time-sensitive bookings and documentation with organized processes and professional care.",
          Icon: BriefcaseBusiness,
        },
      ],
    },
    valuesEyebrow: "The client experience",
    valuesHeading: "Why travellers choose The Flight Centre",
    valuesDescription:
      "Two decades of practice distilled into a calmer, more accountable way to plan, book and travel.",
    valueCards: [
      {
        title: "One desk, every journey",
        description:
          "Flights, Umrah, tours, hotels, visas and insurance — coordinated together so you never chase separate providers.",
        Icon: Layers,
      },
      {
        title: "Always within reach",
        description:
          "Phone, WhatsApp, email or a walk-in visit — reach a real consultant whenever your plans change.",
        Icon: Headset,
      },
      {
        title: "Documentation done right",
        description:
          "Time-sensitive tickets, visa files and packages handled with organised, professional care.",
        Icon: FileCheck2,
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
    stats: [
      { value: "20+", label: "سال کی خدمت" },
      { value: "50+", label: "ممالک کی رسائی" },
      { value: "2", label: "گوجرانوالہ میں دفاتر" },
      { value: "24/7", label: "ہیلپ ڈیسک" },
    ],
    identityEyebrow: "ہم کون ہیں",
    ceoProfile: {
      eyebrow: "چیف ایگزیکٹو آفیسر",
      name: "ایڈووکیٹ رانا خالد پرویز خان",
      title: "قابل اعتماد سفر، ویزا اور عمرہ خدمات کے لیے عملی قیادت۔",
      description:
        "ایڈووکیٹ رانا خالد پرویز خان دی فلائٹ سینٹر ٹریول اینڈ ٹورز کی قیادت ایک واضح اور کلائنٹ فرسٹ انداز میں کرتے ہیں: درست رہنمائی، ذمہ دارانہ ڈاکومنٹ ہینڈلنگ اور ہر سفر سے پہلے، دوران اور بعد قابل اعتماد سپورٹ۔",
      quote:
        "ہر مسافر کو واضح طریقہ کار، دیانت دار مشورہ اور ایسی ٹیم ملنی چاہیے جو پلان حرکت میں آنے کے بعد بھی دستیاب رہے۔",
      highlights: [
        {
          title: "کلائنٹ اکاونٹیبلٹی",
          description:
            "فیملیز، زائرین اور بزنس ٹریولرز کے لیے شفاف کمیونیکیشن، محتاط کیس ریویو اور آسان فالو اپ پر توجہ برقرار رکھتے ہیں۔",
          Icon: Handshake,
        },
        {
          title: "مکمل کوآرڈینیشن",
          description:
            "ٹکٹنگ، عمرہ پیکجز، ٹورز، ہوٹل بکنگ، وزٹ ویزا، ورک ویزا سپورٹ اور ٹریول انشورنس کو ایک مربوط سروس کے طور پر دیکھتے ہیں۔",
          Icon: Plane,
        },
        {
          title: "آپریشنل نظم",
          description:
            "ٹیم کو ٹائم سینسیٹو بکنگز اور ڈاکومنٹیشن منظم طریقے اور پیشہ ورانہ احتیاط سے سنبھالنے کی رہنمائی دیتے ہیں۔",
          Icon: BriefcaseBusiness,
        },
      ],
    },
    valuesEyebrow: "کلائنٹ کا تجربہ",
    valuesHeading: "مسافر دی فلائٹ سینٹر کو کیوں چنتے ہیں",
    valuesDescription:
      "بیس سال کا تجربہ ایک پُرسکون، زیادہ ذمہ دار طریقہ کار میں ڈھل کر آپ کے سفر کی منصوبہ بندی اور بکنگ کو آسان بناتا ہے۔",
    valueCards: [
      {
        title: "ایک ڈیسک، ہر سفر",
        description:
          "فلائٹس، عمرہ، ٹورز، ہوٹلز، ویزا اور انشورنس ایک ساتھ مربوط، تاکہ آپ کو مختلف جگہوں پر نہ جانا پڑے۔",
        Icon: Layers,
      },
      {
        title: "ہمیشہ دستیاب",
        description:
          "فون، واٹس ایپ، ای میل یا دفتر آ کر — جب بھی پلان بدلے، ایک حقیقی کنسلٹنٹ سے رابطہ کریں۔",
        Icon: Headset,
      },
      {
        title: "درست ڈاکومنٹیشن",
        description:
          "ٹائم سینسیٹو ٹکٹس، ویزا فائلیں اور پیکجز منظم اور پیشہ ورانہ احتیاط کے ساتھ سنبھالے جاتے ہیں۔",
        Icon: FileCheck2,
      },
    ],
  },
} as const;

const managingDirectorProfile = {
  eyebrow: "Managing Director TFC Group Of Comapnies",
  name: BRAND.managingDirector,
  title: "Focused execution for every booking, file and follow-up.",
  description:
    "Adv. Rana Mudasser Nazar Khan helps turn the agency's service promise into daily action, keeping consultants aligned, documents moving and clients updated from first enquiry to final confirmation.",
  quote:
    "Good travel service is built in the follow-up: one clear update, one correct file and one calm decision at a time.",
  highlights: [
    {
      title: "Daily operations",
      description:
        "Keeps the front desk, ticketing and visa workflows moving with practical coordination.",
      Icon: ClipboardCheck,
    },
    {
      title: "Client response",
      description:
        "Focuses on clear updates so travellers know what is complete, pending and next.",
      Icon: UsersRound,
    },
    {
      title: "Service quality",
      description:
        "Supports a calm, organized experience across bookings, packages and documentation.",
      Icon: Compass,
    },
  ],
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
      <OrganizationJsonLd description={story[0]} />
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

      {/* ── Stats band ── */}
      <section className="mx-auto mt-10 max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-black px-6 py-10 text-white shadow-glow md:px-12 md:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 12% 18%, rgba(201, 168, 76, 0.20), transparent 42%), radial-gradient(circle at 88% 82%, rgba(204, 0, 0, 0.18), transparent 44%)",
            }}
          />
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {copy.stats.map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p className="font-display text-5xl font-black text-brand-gold md:text-6xl">
                  {value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Identity + key facts ── */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">
            {copy.identityEyebrow}
          </p>
          <h1
            id="about-h1"
            className="mt-4 font-display text-4xl font-black text-foreground md:text-5xl"
          >
            {t("h1")}
          </h1>
          <p
            id="about-mission"
            className="mt-5 max-w-3xl text-base leading-8 text-foreground-muted md:text-lg"
          >
            {t("mission")}
          </p>

          <dl
            id="about-key-facts"
            className="mt-10 grid gap-x-8 gap-y-4 rounded-[2rem] border border-border bg-surface-elevated p-7 shadow-brand md:grid-cols-2 md:p-8"
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
                {copy.ceoProfile.name}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle">
                {managingDirectorProfile.eyebrow}
              </dt>
              <dd className="mt-1 text-foreground">
                {managingDirectorProfile.name}
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

      {/* ── Leadership: CEO ── */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid items-stretch gap-8 overflow-hidden rounded-[2.5rem] border border-border bg-surface-elevated shadow-brand lg:grid-cols-[0.9fr_1.1fr]">
          <figure className="relative min-h-[30rem] bg-brand-black lg:min-h-full">
            <Image
              src="/images/ceo-adv-rana-khalid-pervez-khan.webp"
              alt={`${copy.ceoProfile.name}, ${t("ceoTitle")} of The Flight Centre Travel & Tours`}
              fill
              sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 44vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 text-white md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-brand-gold">
                {t("ceoTitle")}
              </p>
              <h2 className="mt-3 font-display text-3xl font-black md:text-4xl">
                {copy.ceoProfile.name}
              </h2>
            </div>
          </figure>

          <div className="px-6 py-8 md:px-8 lg:py-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {copy.ceoProfile.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-black text-foreground md:text-4xl">
              {copy.ceoProfile.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-foreground-muted">
              {copy.ceoProfile.description}
            </p>
            <blockquote className="mt-6 border-l-4 border-gold pl-5 text-base font-semibold leading-8 text-foreground">
              &ldquo;{copy.ceoProfile.quote}&rdquo;
            </blockquote>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {copy.ceoProfile.highlights.map(({ title, description, Icon }) => (
                <article
                  key={title}
                  className="rounded-[1.5rem] border border-border bg-surface p-4"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-foreground-muted">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership: Managing Director ── */}
      <section className="mx-auto mt-8 max-w-7xl px-6">
        <div className="grid overflow-hidden rounded-[2.5rem] border border-border bg-surface shadow-brand lg:grid-cols-[1.08fr_0.92fr]">
          <div className="px-6 py-8 md:px-8 lg:py-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {managingDirectorProfile.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-black text-foreground md:text-4xl">
              {managingDirectorProfile.name}
            </h2>
            <p className="mt-3 max-w-2xl text-lg font-semibold leading-8 text-foreground">
              {managingDirectorProfile.title}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-foreground-muted">
              {managingDirectorProfile.description}
            </p>
            <blockquote className="mt-6 border-l-4 border-gold pl-5 text-base font-semibold leading-8 text-foreground">
              &ldquo;{managingDirectorProfile.quote}&rdquo;
            </blockquote>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {managingDirectorProfile.highlights.map(
                ({ title, description, Icon }) => (
                  <article
                    key={title}
                    className="rounded-[1.25rem] border border-border bg-surface-elevated p-4"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-foreground-muted">
                      {description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>

          <figure className="relative min-h-[28rem] bg-brand-black lg:min-h-full">
            <Image
              src="/images/rana-mudassir-managing-director.webp"
              alt={`${managingDirectorProfile.name}, ${managingDirectorProfile.eyebrow} of The Flight Centre Travel & Tours`}
              fill
              sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 44vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 text-white md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-brand-gold">
                {managingDirectorProfile.eyebrow}
              </p>
              <p className="mt-3 font-display text-3xl font-black md:text-4xl">
                {managingDirectorProfile.name}
              </p>
            </div>
          </figure>
        </div>
      </section>

      {/* ── Story + office presence ── */}
      <section className="mx-auto mt-12 grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[2rem] border border-border bg-surface-elevated p-6 shadow-brand md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            {t("story.title")}
          </p>
          <div className="mt-5 space-y-5 text-base leading-8 text-foreground-muted">
            {story.map((paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-border bg-surface-elevated p-5 shadow-brand md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {officePresenceCopy.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-2xl font-black text-foreground md:text-3xl">
              {officePresenceCopy.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-foreground-muted md:text-base">
              {officePresenceCopy.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
            {officeSceneImage ? (
              <figure className="group overflow-hidden rounded-[2rem] border border-border bg-brand-black shadow-brand sm:row-span-2">
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
              <figure className="group overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-brand">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                    {getLocalizedGalleryText(signageImage.title, locale)}
                  </p>
                  <p className="text-sm leading-7 text-foreground-muted">
                    {getLocalizedGalleryText(signageImage.caption, locale)}
                  </p>
                </figcaption>
              </figure>
            ) : null}
          </div>
        </div>
      </section>

      <AboutGallerySection locale={locale} items={galleryImages} />

      {/* ── Why choose us ── */}
      <section className="mx-auto mt-12 max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-black px-6 py-10 text-white shadow-glow md:px-10 md:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 85% 15%, rgba(201, 168, 76, 0.18), transparent 40%), radial-gradient(circle at 10% 90%, rgba(204, 0, 0, 0.16), transparent 42%)",
            }}
          />
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-brand-gold">
              {copy.valuesEyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-black md:text-4xl">
              {copy.valuesHeading}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/72 md:text-base">
              {copy.valuesDescription}
            </p>
          </div>

          <div className="relative mt-9 grid gap-6 md:grid-cols-3">
            {copy.valueCards.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition hover:border-brand-gold/40 hover:bg-white/[0.09]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/15">
                  <Icon className="h-6 w-6 text-brand-gold" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-white">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/72">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
