import type { Metadata } from "next";

import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PlaneTakeoff,
} from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TourCalculatorWizard } from "@/components/tour-calculator";
import {
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";

const CONTENT = {
  en: {
    badge: "Custom Tour Quotation",
    title: "Plan Your International Tour - Get a Full Quote Instantly",
    description:
      "Tell us your destinations, hotels, and flights in a few steps. We'll send a detailed tour package quotation directly to your inbox.",
    trust: [
      "Hotels, Flights & Pricing - All in One Quote",
      "30+ Destinations Covered",
      "Custom per-Passenger Ticket Pricing",
      "IATA Certified - Trusted Since 2003",
    ],
    chips: ["50+ Countries", "2 Offices in Gujranwala", "UAN 111-786-788"],
    cardOneTitle: "30+ Destinations",
    cardOneText:
      "From Southeast Asia to Europe, the Middle East to Africa - we quote any destination.",
    cardTwoTitle: "Quick Response",
    cardTwoText:
      "Our travel team reviews every quotation and responds within 2 business hours.",
    stepLabel: "Step-by-Step Tour Calculator",
    how: "How It Works",
    howTitle: "Your custom tour quote in 4 simple steps",
    cards: [
      { number: "01", icon: ClipboardList, title: "Your Details", description: "Name, contact, email, and passenger count" },
      { number: "02", icon: Globe, title: "Countries & Hotels", description: "Select destinations and add hotels with nightly rates" },
      { number: "03", icon: PlaneTakeoff, title: "Flights & Pricing", description: "Add flight legs with per-passenger ticket prices" },
      { number: "04", icon: Mail, title: "Receive Quote", description: "Get a full itemised quotation straight to your inbox" },
    ],
    coversTitle: "What Your Quote Covers",
    included: [
      "International Flight Tickets (all airlines)",
      "Hotel Accommodation by Country",
      "Nightly Rate Calculation",
      "Per-Passenger Ticket Pricing",
      "Children & Infant Fares Included",
      "Coupon / Discount Support",
      "Full Itemised Summary",
      "Emailed Directly to You",
    ],
    callTitle: "Prefer to call instead?",
    callText: "Our tour desk is available to build your quotation over the phone.",
    whatsapp: "WhatsApp:",
    office: "Office 36-37, Jinnah Stadium, Gujranwala",
  },
  ur: {
    badge: "کسٹم ٹور کوٹیشن",
    title: "اپنا انٹرنیشنل ٹور پلان کریں - مکمل کوٹیشن فوراً حاصل کریں",
    description:
      "چند مراحل میں اپنی منزلیں، ہوٹلز اور فلائٹس بتائیں۔ ہم تفصیلی ٹور پیکج کوٹیشن براہِ راست آپ کے ان باکس میں بھیجیں گے۔",
    trust: [
      "ہوٹلز، فلائٹس اور قیمت - ایک ہی کوٹیشن میں",
      "30+ منزلیں کور",
      "فی مسافر کسٹم ٹکٹ قیمت",
      "IATA سرٹیفائیڈ - 2003 سے قابلِ اعتماد",
    ],
    chips: ["50+ ممالک", "گوجرانوالہ میں 2 دفاتر", "UAN 111-786-788"],
    cardOneTitle: "30+ منزلیں",
    cardOneText:
      "جنوب مشرقی ایشیا سے یورپ، مشرق وسطیٰ سے افریقہ تک، ہم ہر منزل کی کوٹیشن بنا سکتے ہیں۔",
    cardTwoTitle: "فوری جواب",
    cardTwoText:
      "ہماری ٹریول ٹیم ہر کوٹیشن کا جائزہ لے کر 2 کاروباری گھنٹوں میں جواب دیتی ہے۔",
    stepLabel: "مرحلہ وار ٹور کیلکولیٹر",
    how: "طریقہ کار",
    howTitle: "4 آسان مراحل میں آپ کی کسٹم ٹور کوٹیشن",
    cards: [
      { number: "01", icon: ClipboardList, title: "آپ کی تفصیلات", description: "نام، رابطہ، ای میل اور مسافروں کی تعداد" },
      { number: "02", icon: Globe, title: "ممالک اور ہوٹلز", description: "منزلیں منتخب کریں اور فی رات ریٹ کے ساتھ ہوٹلز شامل کریں" },
      { number: "03", icon: PlaneTakeoff, title: "فلائٹس اور قیمت", description: "فلائٹ لیگز اور فی مسافر ٹکٹ قیمت شامل کریں" },
      { number: "04", icon: Mail, title: "کوٹیشن وصول کریں", description: "مکمل تفصیلی کوٹیشن براہِ راست ای میل پر حاصل کریں" },
    ],
    coversTitle: "آپ کی کوٹیشن میں کیا شامل ہے",
    included: [
      "انٹرنیشنل فلائٹ ٹکٹس (تمام ایئر لائنز)",
      "ملک کے حساب سے ہوٹل رہائش",
      "فی رات ریٹ کیلکولیشن",
      "فی مسافر ٹکٹ قیمت",
      "بچوں اور شیرخوار کے کرائے شامل",
      "کوپن / ڈسکاؤنٹ سپورٹ",
      "مکمل آئٹمائزڈ خلاصہ",
      "براہِ راست ای میل پر ترسیل",
    ],
    callTitle: "فون پر بات کرنا چاہتے ہیں؟",
    callText: "ہمارا ٹور ڈیسک فون پر آپ کی کوٹیشن بنانے کے لیے دستیاب ہے۔",
    whatsapp: "واٹس ایپ:",
    office: "آفس 36-37، جناح اسٹیڈیم، گوجرانوالہ",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tour Package Quotation Calculator | The Flight Centre",
    description:
      "Get a custom international tour package quotation - hotels, flights, and pricing all in one place. The Flight Centre Travel & Tours, Gujranwala.",
    keywords: [
      "tour package calculator Pakistan",
      "custom tour quotation",
      "international tour package quote",
      "The Flight Centre tours",
    ],
  };
}

export default async function TourCalculatorPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);
  const content = CONTENT[locale === "ur" ? "ur" : "en"];

  return (
    <div className="pb-24">
      <Breadcrumb />

      <section className="mx-auto max-w-7xl px-6 pb-0 pt-6">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[2.5rem] bg-brand-mesh p-10 text-white shadow-glow">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.26em] text-white">
              {content.badge}
            </span>

            <h1 className="mt-6 font-display text-4xl font-black leading-tight md:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-md text-base leading-8 text-white/72">
              {content.description}
            </p>

            <div className="mt-8 space-y-3">
              {content.trust.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white/70" />
                  <span className="text-sm text-white/80">{item}</span>
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

          <div className="flex flex-col gap-4">
            <article className="rounded-[2rem] border border-brand-gold/20 bg-brand-gold/[0.06] p-6">
              <Globe className="mb-3 h-8 w-8 text-brand-gold" />
              <h2 className="font-display text-xl font-bold text-white">{content.cardOneTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                {content.cardOneText}
              </p>
            </article>

            <article className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6">
              <Clock3 className="mb-3 h-8 w-8 text-brand-gold" />
              <h2 className="font-display text-xl font-bold text-white">{content.cardTwoTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                {content.cardTwoText}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-brand-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
            {content.stepLabel}
          </span>
        </div>

        <div className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.03] p-1 shadow-glow">
          <TourCalculatorWizard />
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">
                  {number}
                </div>
                <Icon className="mt-6 h-8 w-8 text-white" />
                <h3 className="mt-6 font-display text-2xl font-black text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm md:p-6">
            <h2 className="mb-6 font-display text-2xl font-black text-white">
              {content.coversTitle}
            </h2>

            <div className="space-y-3">
              {content.included.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-gold" />
                  <span className="text-sm text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-brand-gold/20 bg-brand-gold/[0.04] p-5 backdrop-blur-sm md:p-6">
            <h2 className="font-display text-2xl font-bold text-brand-gold">
              {content.callTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {content.callText}
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="h-5 w-5 text-brand-gold" />
                <span>UAN: 111-786-788</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MessageCircle className="h-5 w-5 text-brand-gold" />
                <span>{content.whatsapp} 0304-111-9-786</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="h-5 w-5 text-brand-gold" />
                <span>info@tfctours.com.pk</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin className="h-5 w-5 text-brand-gold" />
                <span>{content.office}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
