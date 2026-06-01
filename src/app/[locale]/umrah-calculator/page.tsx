// src/app/[locale]/umrah-calculator/page.tsx
import type { Metadata } from "next";

import {
  Building2,
  CheckCircle2,
  ClipboardList,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PlaneTakeoff,
} from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { UmrahCalculatorWizard } from "@/components/umrah-calculator";
import {
  AIRLINES,
  MADINAH_HOTELS,
  MAKKAH_HOTELS,
  PK_CITIES,
  ROOM_TYPES,
  SAUDI_CITIES,
  TRANSPORT_OPTIONS,
} from "@/components/umrah-calculator/config";
import { Badge } from "@/components/ui/Badge";
import { getCalculatorOptions, getTransportOptions } from "@/lib/cms/fetchers";
import {
  buildLocalizedPageMetadata,
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";

const CONTENT = {
  en: {
    badge: "Free Instant Quote",
    title: "Umrah Package Quotation Calculator",
    description:
      "Tell us your travel details in 6 simple steps and receive a full Umrah package quotation by email - flights, hotels, transport, visa, and pricing all included.",
    bullets: [
      "Flights, Hotels, Transport & Visa - All in One Quote",
      "Makkah & Madinah Hotels Included",
      "IATA Certified - Trusted Since 2003",
    ],
    chips: ["15 / 21 / 28 Day Packages", "2 Offices in Gujranwala", "UAN 111-786-788"],
    how: "How It Works",
    howTitle: "Get your custom quote in minutes",
    cards: [
      { number: "01", icon: ClipboardList, title: "Your Details", description: "Name, contact and passenger count" },
      { number: "02", icon: PlaneTakeoff, title: "Flight Info", description: "Departure and return flight details" },
      { number: "03", icon: Building2, title: "Hotels", description: "Makkah and Madinah hotel preferences" },
      { number: "04", icon: Mail, title: "Get Quote", description: "Receive detailed quotation by email" },
    ],
    includedEyebrow: "What's Included",
    includedTitle: "What Your Quote Includes",
    includedItems: [
      "Return Air Tickets (all airlines)",
      "Makkah Hotel Accommodation",
      "Madinah Hotel Accommodation",
      "Ground Transport (Makkah <-> Madinah)",
      "Umrah Visa Processing",
      "Ziyarat in Makkah & Madinah",
      "Airport Transfers",
      "24/7 TFC Support",
    ],
    helpTitle: "Need help filling the form?",
    helpText:
      "Call our Umrah desk directly - we'll prepare your quotation over the phone.",
    office1: "Office 36-37, Jinnah Stadium, Gujranwala",
    office2: "Plaza 18, Neelum Block DC Colony, Gujranwala",
  },
  ur: {
    badge: "فوری مفت کوٹیشن",
    title: "عمرہ پیکج کوٹیشن کیلکولیٹر",
    description:
      "6 آسان مراحل میں اپنی سفری تفصیلات بتائیں اور مکمل عمرہ پیکج کوٹیشن ای میل پر حاصل کریں، جس میں فلائٹس، ہوٹلز، ٹرانسپورٹ، ویزا اور قیمت شامل ہیں۔",
    bullets: [
      "فلائٹس، ہوٹلز، ٹرانسپورٹ اور ویزا - ایک ہی کوٹیشن میں",
      "مکہ اور مدینہ ہوٹلز شامل",
      "IATA سرٹیفائیڈ - 2003 سے قابلِ اعتماد",
    ],
    chips: ["15 / 21 / 28 دن کے پیکجز", "گوجرانوالہ میں 2 دفاتر", "UAN 111-786-788"],
    how: "طریقہ کار",
    howTitle: "چند منٹ میں اپنی کسٹم کوٹیشن حاصل کریں",
    cards: [
      { number: "01", icon: ClipboardList, title: "آپ کی تفصیلات", description: "نام، رابطہ اور مسافروں کی تعداد" },
      { number: "02", icon: PlaneTakeoff, title: "فلائٹ معلومات", description: "روانگی اور واپسی کی فلائٹ تفصیلات" },
      { number: "03", icon: Building2, title: "ہوٹلز", description: "مکہ اور مدینہ ہوٹل ترجیحات" },
      { number: "04", icon: Mail, title: "کوٹیشن حاصل کریں", description: "تفصیلی کوٹیشن ای میل پر حاصل کریں" },
    ],
    includedEyebrow: "کیا شامل ہے",
    includedTitle: "آپ کی کوٹیشن میں کیا شامل ہے",
    includedItems: [
      "ریٹرن ایئر ٹکٹس (تمام ایئر لائنز)",
      "مکہ ہوٹل رہائش",
      "مدینہ ہوٹل رہائش",
      "گراؤنڈ ٹرانسپورٹ (مکہ <-> مدینہ)",
      "عمرہ ویزا پروسیسنگ",
      "مکہ اور مدینہ زیارات",
      "ایئرپورٹ ٹرانسفرز",
      "24/7 TFC سپورٹ",
    ],
    helpTitle: "فارم بھرنے میں مدد چاہیے؟",
    helpText:
      "ہمارے عمرہ ڈیسک کو براہِ راست کال کریں، ہم فون پر آپ کی کوٹیشن تیار کر دیں گے۔",
    office1: "آفس 36-37، جناح اسٹیڈیم، گوجرانوالہ",
    office2: "پلازہ 18، نیلم بلاک ڈی سی کالونی، گوجرانوالہ",
  },
} as const;

const META_KEYWORDS = [
  "Umrah quotation calculator",
  "Umrah package quote Pakistan",
  "custom Umrah package",
  "The Flight Centre",
];

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  return buildLocalizedPageMetadata(
    params,
    "umrahCalculator.meta",
    "/umrah-calculator",
    META_KEYWORDS,
  );
}

export default async function UmrahCalculatorPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);
  const content = CONTENT[locale === "ur" ? "ur" : "en"];
  const [
    airlines,
    pakistanCities,
    saudiCities,
    roomTypes,
    makkahHotels,
    madinahHotels,
    transportOptions,
  ] = await Promise.all([
    getCalculatorOptions("umrah_airline", locale),
    getCalculatorOptions("pk_city", locale),
    getCalculatorOptions("saudi_city", locale),
    getCalculatorOptions("room_type", locale),
    getCalculatorOptions("makkah_hotel", locale),
    getCalculatorOptions("madinah_hotel", locale),
    getTransportOptions(locale),
  ]);
  const resolvedAirlines = airlines?.map((option) => option.label) ?? [...AIRLINES];
  const resolvedPakistanCities = pakistanCities?.map((option) => option.label) ?? [
    ...PK_CITIES,
  ];
  const resolvedSaudiCities = saudiCities?.map((option) => option.label) ?? [
    ...SAUDI_CITIES,
  ];
  const resolvedRoomTypes = roomTypes?.map((option) => option.label) ?? [
    ...ROOM_TYPES,
  ];
  const resolvedMakkahHotels = makkahHotels?.map((option) => option.label) ?? [
    ...MAKKAH_HOTELS,
  ];
  const resolvedMadinahHotels = madinahHotels?.map((option) => option.label) ?? [
    ...MADINAH_HOTELS,
  ];
  const resolvedTransportOptions =
    transportOptions?.map((option) => ({
      label: option.label,
      sar: option.sarRate,
    })) ?? TRANSPORT_OPTIONS;

  return (
    <div className="pb-24">
      <Breadcrumb />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-brand-red/90 to-brand-darkred p-10 text-white">
            <Badge
              variant="dark"
              className="border-white/30 bg-white/15 !text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
            >
              {content.badge}
            </Badge>
            <h1 className="mt-6 font-display text-4xl font-black leading-tight text-white md:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-md text-base leading-8 text-white/75">
              {content.description}
            </p>

            <div className="mt-8 space-y-3">
              {content.bullets.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white/80" />
                  <p className="text-sm text-white/80">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {content.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.03] p-1">
            <ErrorBoundary>
              <UmrahCalculatorWizard
                initialAirlines={resolvedAirlines}
                initialPakistanCities={resolvedPakistanCities}
                initialSaudiCities={resolvedSaudiCities}
                initialRoomTypes={resolvedRoomTypes}
                initialMakkahHotels={resolvedMakkahHotels}
                initialMadinahHotels={resolvedMadinahHotels}
                initialTransportOptions={resolvedTransportOptions}
              />
            </ErrorBoundary>
          </div>
        </div>
      </section>

      <section className="bg-brand-black px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
            {content.how}
          </p>
          <h2 className="mt-4 font-display text-3xl font-black text-white">
            {content.howTitle}
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {content.cards.map(({ number, icon: Icon, title, description }) => (
              <article
                key={number}
                className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6"
              >
                <p className="text-sm font-bold tracking-[0.18em] text-brand-red">
                  {number}
                </p>
                <Icon className="mt-6 h-8 w-8 text-white" />
                <h3 className="mt-6 font-display text-2xl font-black text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
              {content.includedEyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-black text-white">
              {content.includedTitle}
            </h2>

            <ul className="mt-8 space-y-4">
              {content.includedItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-gold" />
                  <span className="text-sm leading-7 text-white/78">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-brand-gold/20 bg-brand-gold/[0.04] p-8 backdrop-blur-sm">
            <h2 className="font-display text-2xl font-bold text-brand-gold">
              {content.helpTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              {content.helpText}
            </p>

            <div className="mt-8 space-y-4 text-sm text-white/78">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-brand-gold" />
                <span>UAN: 111-786-788</span>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-1 h-5 w-5 text-brand-gold" />
                <span>0304-111-9-786</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-brand-gold" />
                <span>info@tfctours.com.pk</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-brand-gold" />
                <span>{content.office1}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-brand-gold" />
                <span>{content.office2}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
