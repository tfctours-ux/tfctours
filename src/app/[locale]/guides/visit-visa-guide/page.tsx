import type { Metadata } from "next";

import Link from "next/link";

import { getTranslations } from "next-intl/server";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  ArticleJsonLd,
  FAQJsonLd,
  HowToJsonLd,
} from "@/components/shared/JsonLd";
import { Button } from "@/components/ui/Button";
import { type Locale } from "@/lib/constants";
import {
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";
import { buildMetadata, localizePath } from "@/lib/utils";

const content: Record<
  Locale,
  {
    title: string;
    description: string;
    intro: string[];
    sections: Array<{ heading: string; paragraphs: string[] }>;
    countries: Array<{
      country: string;
      visaType: string;
      processingTime: string;
      requirements: string;
    }>;
    steps: string[];
    faq: Array<{ question: string; answer: string }>;
    labels: {
      eyebrow: string;
      tableCountry: string;
      tableType: string;
      tableTime: string;
      tableReq: string;
      faq: string;
      final: string;
      service: string;
      contact: string;
    };
  }
> = {
  en: {
    title:
      "Visit Visa Requirements by Country for Pakistani Passport Holders (2025)",
    description:
      "Country-by-country visit visa requirements for Pakistani passport holders covering UAE, UK, Schengen, USA, Canada, Australia, Turkey, Malaysia, Thailand, and Saudi Arabia.",
    intro: [
      "Visit visa planning becomes easier when Pakistani travellers stop treating every country like the same case. Most embassies and visa systems want to see identity, travel purpose, financial readiness, and a believable intention to return. The difference is in how strongly each country focuses on those areas. That is why many applicants get confused: they hear one checklist from a friend, then discover their actual destination needs a different style of file.",
      "This guide is a practical reference for Pakistani passport holders comparing popular visit visa destinations. It gives a country table for quick review, but it also explains the logic behind strong visa preparation so that travellers can understand why some cases move quickly and others need much more careful documentation.",
    ],
    sections: [
      {
        heading: "How visit visa files are usually assessed",
        paragraphs: [
          "In most destinations, a visit visa application needs to show identity, purpose, finances, and ties. A passport proves identity. A family visit explanation, tour plan, invitation, or hotel booking helps prove purpose. Financial documents support the idea that the traveller can complete the trip responsibly. Employment, business, family, or property ties may help show that the traveller has a reason to return to Pakistan.",
          "The deeper issue is consistency. A file is stronger when the reason for travel, the bank profile, and the itinerary all support one another. A weak file usually contains contradictions or vague explanations. That is why destination-specific planning matters.",
        ],
      },
      {
        heading: "Why timelines vary from country to country",
        paragraphs: [
          "Processing time does not depend only on the country. It also depends on season, embassy workload, the quality of the applicant’s documentation, and whether extra verification is required. Gulf destinations can move faster in straightforward cases, while countries such as the UK, Schengen states, Canada, Australia, or the USA may take longer because the review is broader or more document-intensive.",
          "Applicants should treat published timelines as guidance rather than promises. If the application needs clarification, additional verification, or a stronger financial explanation, the real wait can be longer than expected.",
        ],
      },
      {
        heading: "How to prepare a stronger case before submission",
        paragraphs: [
          "Before starting the application, decide the destination, travel purpose, and realistic travel dates. Then gather your passport, financial papers, employment or business proof, hotel or host information, and any previous travel history records. When these materials are reviewed together, it becomes easier to spot weaknesses before they turn into refusals.",
          "Many Pakistani travellers also benefit from linking the visa file to the rest of the trip. Ticket planning, hotel reservation, and insurance support can make the itinerary more coherent. Agencies such as The Flight Centre Travel & Tours become useful here because they can review the visa side and the travel side in one conversation.",
        ],
      },
      {
        heading: "When to ask for professional guidance",
        paragraphs: [
          "Professional guidance is especially valuable when the traveller is unsure about country-specific requirements, has a mixed document profile, or wants to avoid wasted time and repeated submissions. A review before submission is usually far more valuable than a correction after refusal.",
          "If you are planning a visit to UAE, UK, Schengen countries, USA, Canada, Australia, Turkey, Malaysia, Thailand, or Saudi Arabia, the best next step is to compare your destination with the table below and then contact the agency for a destination-specific checklist.",
        ],
      },
    ],
    countries: [
      ["UAE", "Tourist / Family Visit", "3-7 working days", "Passport, photos, hotel or host details, return plan"],
      ["UK", "Standard Visitor Visa", "3-6 weeks", "Passport, bank statement, job proof, travel purpose"],
      ["Schengen", "Short-Stay Visa", "15-30 days", "Insurance, itinerary, financial proof, hotel booking"],
      ["USA", "B1/B2 Visitor", "Interview-based timeline", "DS-160, passport, purpose, financial background"],
      ["Canada", "Temporary Resident Visa", "4-8 weeks or more", "Passport, finances, travel purpose, ties to Pakistan"],
      ["Australia", "Visitor Visa", "3-6 weeks", "Identity, finances, sponsor or family details, itinerary"],
      ["Turkey", "Tourist Visa / eVisa eligible cases", "Few days to 2 weeks", "Passport, hotel booking, finances, travel tickets"],
      ["Malaysia", "eVisa / Visit Visa", "3-10 days", "Passport, photo, accommodation and trip details"],
      ["Thailand", "Tourist Visa", "5-10 working days", "Passport, bank proof, hotel booking, return plan"],
      ["Saudi Arabia", "Visit / Family / Tourist", "Varies by category", "Passport, sponsor or travel documents, category-specific papers"],
    ].map(([country, visaType, processingTime, requirements]) => ({
      country,
      visaType,
      processingTime,
      requirements,
    })),
    steps: [
      "Choose the country and define the purpose of travel clearly.",
      "Collect passport, financial proof, and purpose-related documents.",
      "Match hotel, host, and ticket planning to the visa category.",
      "Review the case for consistency before submission.",
      "Contact a visa desk if you want destination-specific guidance.",
    ],
    faq: [
      {
        question: "Which countries are commonly requested by Pakistani travellers?",
        answer:
          "UAE, UK, Schengen countries, USA, Canada, Australia, Turkey, Malaysia, Thailand, and Saudi Arabia are among the most frequently requested destinations.",
      },
      {
        question: "How long does visit visa processing take?",
        answer:
          "It varies by country, embassy workload, season, and applicant profile. Gulf destinations can move more quickly, while UK, Schengen, Canada, Australia, or USA cases may take longer.",
      },
      {
        question: "Can ticket and hotel planning help a visit visa case?",
        answer:
          "Yes. A coherent itinerary often makes the travel purpose clearer and helps support a stronger overall case when the country expects structured trip details.",
      },
    ],
    labels: {
      eyebrow: "Visit Visa Guide",
      tableCountry: "Country",
      tableType: "Visa Type",
      tableTime: "Processing Time",
      tableReq: "Requirements",
      faq: "Frequently Asked Questions",
      final: "Review your destination, then move to the related service page or contact the visa desk for a tailored checklist.",
      service: "Explore Visit Visa Service",
      contact: "Contact the Visa Desk",
    },
  },
  ur: {
    title:
      "پاکستانی پاسپورٹ ہولڈرز کے لیے مختلف ممالک کے وزٹ ویزا تقاضے (2025)",
    description:
      "پاکستانی مسافروں کے لیے مختلف ممالک کے وزٹ ویزا تقاضوں کی عملی گائیڈ جس میں UAE، UK، شینگن، USA، Canada، Australia، Turkey، Malaysia، Thailand اور Saudi Arabia شامل ہیں۔",
    intro: [
      "وزٹ ویزا کی تیاری اس وقت آسان ہو جاتی ہے جب پاکستانی درخواست گزار ہر ملک کو ایک جیسا سمجھنا بند کر دیتے ہیں۔ زیادہ تر ممالک شناخت، سفر کے مقصد، مالی تیاری اور پاکستان واپسی کی معقول وجہ دیکھتے ہیں۔ فرق صرف یہ ہے کہ ہر ملک ان نکات کو مختلف انداز سے جانچتا ہے۔",
      "یہ گائیڈ پاکستانی پاسپورٹ ہولڈرز کے لیے ایک عملی حوالہ ہے۔ اس میں اہم ممالک کا تقابلی جدول، عمومی اصول، اور فائل کو بہتر بنانے کے طریقے شامل ہیں تاکہ درخواست گزار صرف چیک لسٹ نہ دیکھے بلکہ یہ بھی سمجھے کہ مضبوط کیس بنتا کیسے ہے۔",
    ],
    sections: [
      {
        heading: "وزٹ ویزا فائلیں عموماً کیسے دیکھی جاتی ہیں",
        paragraphs: [
          "زیادہ تر ممالک میں وزٹ ویزا فائل کے لیے شناخت، مقصد، مالی استطاعت اور پاکستان سے تعلقات اہم ہوتے ہیں۔ پاسپورٹ شناخت ظاہر کرتا ہے۔ دعوت، ہوٹل بکنگ یا ٹور پلان مقصد واضح کرتے ہیں۔ مالی کاغذات سفر کی صلاحیت کو ظاہر کرتے ہیں۔ ملازمت یا کاروبار کے ثبوت واپسی کی نیت مضبوط بناتے ہیں۔",
          "اصل فرق مطابقت میں ہوتا ہے۔ جب مقصد، بینک ریکارڈ اور ایٹنری ایک دوسرے سے میل کھاتے ہوں تو فائل بہتر بنتی ہے۔ جب وضاحت کمزور ہو یا کاغذات آپس میں متضاد ہوں تو کیس کمزور ہو جاتا ہے۔",
        ],
      },
      {
        heading: "ممالک کے حساب سے ٹائم لائن کیوں بدلتی ہے",
        paragraphs: [
          "پراسیسنگ ٹائم صرف ملک پر منحصر نہیں ہوتا بلکہ سیزن، ایمبیسی کے بوجھ، اور فائل کی مضبوطی پر بھی منحصر ہوتا ہے۔ خلیجی کیسز بعض اوقات نسبتاً جلدی چلتے ہیں جبکہ UK، شینگن، Canada، Australia یا USA کے کیسز زیادہ وقت لے سکتے ہیں۔",
          "اس لیے سرکاری یا عمومی ٹائم لائن کو اندازہ سمجھیں، ضمانت نہیں۔ اگر مزید تصدیق یا وضاحت درکار ہو تو انتظار بڑھ سکتا ہے۔",
        ],
      },
      {
        heading: "سبمشن سے پہلے اپنی فائل کیسے مضبوط کریں",
        paragraphs: [
          "سب سے پہلے ملک، سفر کی وجہ اور تاریخیں واضح کریں۔ پھر پاسپورٹ، مالی کاغذات، ملازمت یا کاروبار کے ثبوت، ہوٹل یا میزبان تفصیل، اور اگر ہو تو سابقہ سفر ریکارڈ ایک ساتھ جمع کریں۔ جب یہ سب ایک نظر میں دیکھا جائے تو کمزوریاں واضح ہو جاتی ہیں۔",
          "بہت سے پاکستانی مسافروں کے لیے یہ بھی مفید ہوتا ہے کہ ویزا فائل کو ٹکٹ، ہوٹل اور انشورنس کے ساتھ جوڑ کر دیکھا جائے۔ اس سے پوری ایٹنری زیادہ منظم اور قابلِ فہم بن جاتی ہے۔",
        ],
      },
      {
        heading: "پیشہ ورانہ رہنمائی کب لینی چاہیے",
        paragraphs: [
          "اگر آپ منزل کے تقاضوں کے بارے میں غیر یقینی کا شکار ہیں، آپ کے کاغذات ملے جلے ہیں، یا آپ ریفیوزل سے بچنا چاہتے ہیں، تو سبمشن سے پہلے رہنمائی لینا زیادہ بہتر ہے۔",
          "اگر آپ UAE، UK، شینگن، USA، Canada، Australia، Turkey، Malaysia، Thailand یا Saudi Arabia کا وزٹ پلان کر رہے ہیں تو نیچے دیے گئے جدول سے شروعات کریں اور پھر دفتر سے ملک کے مطابق چیک لسٹ حاصل کریں۔",
        ],
      },
    ],
    countries: [
      ["UAE", "ٹورسٹ / فیملی وزٹ", "3-7 ورکنگ ڈیز", "پاسپورٹ، تصاویر، ہوٹل یا میزبان تفصیل، واپسی پلان"],
      ["UK", "اسٹینڈرڈ وزیٹر", "3-6 ہفتے", "پاسپورٹ، بینک اسٹیٹمنٹ، ملازمت ثبوت، سفر کا مقصد"],
      ["Schengen", "شارٹ اسٹے", "15-30 دن", "انشورنس، ایٹنری، مالی ثبوت، ہوٹل بکنگ"],
      ["USA", "B1/B2 وزیٹر", "انٹرویو پر منحصر", "پروفائل فارم، پاسپورٹ، مقصد، مالی پس منظر"],
      ["Canada", "ٹمپریری ریزیڈنٹ", "4-8 ہفتے یا زیادہ", "پاسپورٹ، مالی کاغذات، مقصد، پاکستان سے تعلق"],
      ["Australia", "وزیٹر ویزا", "3-6 ہفتے", "شناخت، مالی ثبوت، اسپانسر یا فیملی تفصیل"],
      ["Turkey", "ٹورسٹ / بعض کیسز میں eVisa", "چند دن سے 2 ہفتے", "پاسپورٹ، ہوٹل، مالی ثبوت، ٹکٹ"],
      ["Malaysia", "eVisa / وزٹ", "3-10 دن", "پاسپورٹ، تصویر، رہائش اور سفر کی تفصیل"],
      ["Thailand", "ٹورسٹ ویزا", "5-10 ورکنگ ڈیز", "پاسپورٹ، بینک ثبوت، ہوٹل، واپسی پلان"],
      ["Saudi Arabia", "وزٹ / فیملی / ٹورسٹ", "کیٹیگری کے مطابق مختلف", "پاسپورٹ، اسپانسر یا سفر کاغذات"],
    ].map(([country, visaType, processingTime, requirements]) => ({
      country,
      visaType,
      processingTime,
      requirements,
    })),
    steps: [
      "ملک اور سفر کی وجہ واضح کریں۔",
      "پاسپورٹ اور مالی کاغذات تیار کریں۔",
      "ہوٹل، میزبان اور ٹکٹ پلان کو فائل کے مطابق ترتیب دیں۔",
      "سبمشن سے پہلے فائل کی مطابقت چیک کریں۔",
      "ملک کے مطابق رہنمائی کے لیے ویزا ڈیسک سے رابطہ کریں۔",
    ],
    faq: [
      {
        question: "پاکستانی مسافروں کی عام وزٹ ویزا منزلیں کون سی ہیں؟",
        answer:
          "UAE، UK، شینگن، USA، Canada، Australia، Turkey، Malaysia، Thailand اور Saudi Arabia عام طور پر زیادہ پوچھی جانے والی منزلیں ہیں۔",
      },
      {
        question: "وزٹ ویزا پراسیسنگ میں کتنا وقت لگتا ہے؟",
        answer:
          "یہ ملک، سیزن، ایمبیسی کے بوجھ اور درخواست گزار کی پروفائل کے مطابق بدلتا ہے۔",
      },
      {
        question: "کیا ٹکٹ اور ہوٹل پلاننگ ویزا کیس کو مضبوط بناتی ہے؟",
        answer:
          "جی ہاں، کئی ممالک میں واضح ایٹنری اور بکنگ سے سفر کا مقصد زیادہ قابلِ فہم ہو جاتا ہے۔",
      },
    ],
    labels: {
      eyebrow: "وزٹ ویزا گائیڈ",
      tableCountry: "ملک",
      tableType: "ویزا کی قسم",
      tableTime: "پراسیسنگ ٹائم",
      tableReq: "ضروریات",
      faq: "اکثر پوچھے جانے والے سوالات",
      final: "منزل کا جائزہ لینے کے بعد متعلقہ سروس صفحہ دیکھیں یا ویزا ڈیسک سے اپنی فائل کے مطابق چیک لسٹ حاصل کریں۔",
      service: "وزٹ ویزا سروس دیکھیں",
      contact: "ویزا ڈیسک سے رابطہ کریں",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  const page = content[locale];

  return buildMetadata({
    locale,
    title: page.title,
    absoluteTitle: page.title,
    description: page.description,
    path: "/guides/visit-visa-guide",
    image: "/images/uae.webp",
    imageAlt: page.title,
    keywords: [
      "visit visa requirements Pakistan",
      "Pakistani passport visa guide",
      "visit visa countries 2025",
    ],
  });
}

export default async function VisitVisaGuidePage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);
  const common = await getTranslations({ locale, namespace: "common" });
  const page = content[locale];

  return (
    <div className="pb-20">
      <ArticleJsonLd
        headline={page.title}
        description={page.description}
        path={localizePath(locale, "/guides/visit-visa-guide")}
        image="/images/uae.webp"
      />
      <HowToJsonLd
        name={page.title}
        description={page.description}
        path={localizePath(locale, "/guides/visit-visa-guide")}
        steps={page.steps.map((step, index) => ({
          name: `${common("step")} ${index + 1}`,
          text: step,
        }))}
      />
      <FAQJsonLd items={page.faq} />
      <Breadcrumb />

      <section className="mx-auto mt-6 max-w-6xl px-6">
        <div className="rounded-[2.5rem] bg-brand-mesh px-6 py-10 text-white shadow-glow md:px-10">
          <p className="text-xs uppercase tracking-[0.26em] text-brand-gold">
            {page.labels.eyebrow}
          </p>
          <h1 className="display-copy mt-6 font-display text-4xl font-black leading-tight md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-white/78 md:text-lg">
            {page.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={localizePath(locale, "/services/visit-visa")} showArrow>
              {page.labels.service}
            </Button>
            <Button
              href={localizePath(locale, "/contact")}
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:border-white hover:bg-white hover:text-brand-black"
            >
              {page.labels.contact}
            </Button>
          </div>
        </div>
      </section>

      <article className="mx-auto mt-12 max-w-6xl px-6">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-10">
          <div className="space-y-5 text-base leading-8 text-zinc-700">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 space-y-10">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-3xl font-bold text-brand-black">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-12 overflow-hidden rounded-[1.75rem] border border-black/10">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-zinc-700">
                <thead className="bg-brand-black text-white">
                  <tr>
                    <th className="px-4 py-3">{page.labels.tableCountry}</th>
                    <th className="px-4 py-3">{page.labels.tableType}</th>
                    <th className="px-4 py-3">{page.labels.tableTime}</th>
                    <th className="px-4 py-3">{page.labels.tableReq}</th>
                  </tr>
                </thead>
                <tbody>
                  {page.countries.map((row, index) => (
                    <tr
                      key={row.country}
                      className={index % 2 === 0 ? "bg-brand-light" : "bg-white"}
                    >
                      <td className="px-4 py-4 font-semibold text-brand-black">
                        {row.country}
                      </td>
                      <td className="px-4 py-4">{row.visaType}</td>
                      <td className="px-4 py-4">{row.processingTime}</td>
                      <td className="px-4 py-4">{row.requirements}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-3xl font-bold text-brand-black">
              {page.labels.faq}
            </h2>
            <div className="mt-6 space-y-4">
              {page.faq.map((item) => (
                <div
                  key={item.question}
                  className="rounded-[1.5rem] border border-black/10 bg-brand-light p-5"
                >
                  <h3 className="text-lg font-semibold text-brand-black">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-700">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] bg-brand-black p-6 text-white shadow-glow md:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">
              {common("contactOffice")}
            </p>
            <p className="mt-4 text-base leading-8 text-white/75">
              {page.labels.final}{" "}
              <Link
                href={localizePath(locale, "/services/visit-visa")}
                className="font-semibold text-brand-gold underline-offset-4 hover:underline"
              >
                {page.labels.service}
              </Link>{" "}
              {" / "}
              <Link
                href={localizePath(locale, "/contact")}
                className="font-semibold text-brand-gold underline-offset-4 hover:underline"
              >
                {page.labels.contact}
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
