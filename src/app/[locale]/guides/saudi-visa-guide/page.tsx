import type { Metadata } from "next";

import Link from "next/link";

import { getTranslations } from "next-intl/server";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  ArticleJsonLd,
  FAQJsonLd,
  ServiceJsonLd,
} from "@/components/shared/JsonLd";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/utils";
import {
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";
import { type Locale } from "@/lib/constants";
import { localizePath } from "@/lib/utils";

const content: Record<
  Locale,
  {
    title: string;
    description: string;
    intro: string[];
    sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
    faq: Array<{ question: string; answer: string }>;
    labels: { eyebrow: string; faq: string; final: string; serviceName: string };
    ctas: { service: string; contact: string };
  }
> = {
  en: {
    title: "How to Get Saudi Arabia Work Visa from Pakistan (2025 Complete Guide)",
    description:
      "A practical 2025 guide for Pakistani workers on Saudi Arabia work visas, required documents, application flow, licensed support, and next steps with The Flight Centre Travel & Tours.",
    intro: [
      "Saudi Arabia remains one of the most important overseas employment destinations for Pakistani workers. Every year, applicants begin the process with a job offer, a company demand, or an employer file but still struggle to understand what has to happen next. Many people know they need a visa, but fewer understand that a Saudi work visa is part of a larger manpower and document route that may include employer papers, medical steps, protector-related requirements, and Wakala handling. That gap between the job opportunity and the actual paperwork is where confusion usually begins.",
      "This guide is written for Pakistani applicants, families, and job candidates who want one practical explanation of the Saudi work visa process. It explains what a Saudi work visa is, the common types of work visa cases, the documents usually required, the step-by-step filing flow, and the role of a licensed travel agency. It also clarifies how The Flight Centre Travel & Tours supports clients with Saudi travel documentation and next-step guidance.",
    ],
    sections: [
      {
        heading: "What is a Saudi Work Visa?",
        paragraphs: [
          "A Saudi work visa is the official route that allows a worker from Pakistan to enter Saudi Arabia for employment under a valid sponsor or company. It is not the same as a tourist visa, family visit visa, or Umrah route because it is directly linked to a job role and employer-backed paperwork. For that reason, the visa is only one part of the process. The file must also make sense as an overseas employment case.",
          "In practice, a Saudi work visa case usually depends on whether the job demand, worker profile, passport details, and supporting documents all line up. If the employer papers mention one occupation and the applicant’s documents suggest something else, the case can slow down. That is why workers benefit from an early review instead of waiting until a later step to discover a mismatch.",
        ],
      },
      {
        heading: "Types of Saudi Work Visas",
        paragraphs: [
          "Saudi work visa cases vary by occupation and employer type. Some files are general manpower recruitment cases, while others are for technical staff, drivers, office workers, hospitality staff, maintenance workers, or specialized trades. Each category can place emphasis on a different kind of supporting document. A trade-based job may need stronger skill proof, while another job may depend more heavily on employer demand and identity documents.",
          "The important point is that applicants should not assume one worker’s checklist applies to every Saudi file. The structure of the case depends on the role, the employer, and the stage at which the file is being handled. A licensed desk helps sort this out early so the worker knows which documents matter most.",
        ],
        bullets: [
          "General manpower and labor recruitment cases",
          "Technical and skilled trade occupations",
          "Driver and transport-related employment routes",
          "Company-based contract positions",
          "Occupation-specific cases needing extra documentation",
        ],
      },
      {
        heading: "Required Documents",
        paragraphs: [
          "The most common Saudi work visa documents for Pakistani applicants include a valid passport, recent photographs, CNIC copy, employer or demand papers, and personal file details that match the job route. Depending on the role, an applicant may also need educational certificates, trade documents, or experience letters. Medical steps can also become part of the process when the file reaches that stage.",
          "The safest approach is to gather every relevant paper before beginning formal submission. A worker may not need to hand in every document on the first day, but the agency can only give accurate guidance if it sees the real file. Workers often lose time by relying on second-hand advice instead of showing their own documents for review.",
        ],
        bullets: [
          "Valid passport",
          "CNIC copy and personal identification details",
          "Passport-size photographs",
          "Employer demand, job offer, or sponsor-linked paperwork",
          "Medical documentation where required",
          "Trade, experience, or education records for relevant occupations",
        ],
      },
      {
        heading: "Step-by-Step Application Process",
        paragraphs: [
          "Most Saudi work visa cases begin with the employer side of the file: a demand, a job offer, or an existing Saudi employment route. Once the applicant has those details, the next step is to review the passport and supporting documents with a licensed office. That review helps identify missing items early. A strong first review reduces the chance of later delays and gives the worker a clearer sense of what must be completed first.",
          "From there, the file may move into employer-paper verification, medical or regulatory steps, Wakala handling, and final travel readiness. The exact order can vary by case, but the principle remains the same: the visa should be treated as a chain of connected tasks, not a single stamp. Workers who understand this sequence are usually better prepared and less vulnerable to confusion.",
        ],
      },
      {
        heading: "Role of a Licensed Wakala Agency",
        paragraphs: [
          "A licensed Wakala agency helps connect the applicant’s documents with the legal and procedural route required for Saudi employment cases. This matters because Saudi work files often involve more than simple travel planning. They require accuracy, document matching, and practical familiarity with manpower workflows. When the worker uses a licensed office, the case is far less likely to depend on guesswork.",
          "The best agencies do more than collect papers. They check names, occupations, employer details, and supporting documents for consistency. They also help the worker understand which part of the process is already complete and which part still needs work. For families, that licensed oversight is often one of the most valuable trust signals in the whole process.",
        ],
      },
      {
        heading: "The Flight Centre Travel Support",
        paragraphs: [
          "The Flight Centre Travel & Tours operates from two offices in Gujranwala and helps travellers move from uncertainty to a clear document checklist. Instead of relying on license-number messaging, the site now presents the company as an IATA certified travel agency with direct support for flights, Umrah, tours, visas and travel planning.",
          "For travellers, that means the next step is straightforward. If you already have a file or travel plan, you can take your passport and current documents to the office or start with a contact enquiry. If you are still at the question stage, the best internal routes on this site are the Umrah page and the contact page, where the team can explain the right checklist for your situation.",
        ],
      },
      {
        heading: "Frequently Asked Questions",
        paragraphs: [
          "Applicants frequently ask how long a Saudi work visa takes from Pakistan. The honest answer is that timing depends on the employer file, occupation, medical progress, and how complete the worker’s documents are. Another common question is whether incomplete papers are enough to start. In most cases, you can begin a review with whatever you already have, but complete documents almost always move better than uncertain or mismatched ones.",
          "Many workers also ask whether a licensed Wakala office is necessary if they already have some employer papers. In practice, that is exactly when professional review becomes useful. Employer papers alone do not tell the worker whether the rest of the route is ready. A licensed desk helps bridge that gap and gives the applicant a clearer next step.",
        ],
      },
    ],
    faq: [
      {
        question: "How long does a Saudi work visa take from Pakistan?",
        answer:
          "The timeline depends on the employer file, job category, medical progress, and how complete the applicant’s documents are when the case starts.",
      },
      {
        question: "Can I start the process without every document in hand?",
        answer:
          "You can begin with a document review, but complete and consistent papers usually make the file smoother and reduce avoidable delays.",
      },
      {
        question: "What is the best next step if I already have an employer file?",
        answer:
          "Take the file to a trusted office such as The Flight Centre Travel & Tours or contact the team so the full route can be checked before you move further.",
      },
    ],
    labels: {
      eyebrow: "Saudi Visa Guide",
      faq: "Frequently Asked Questions",
      final:
        "If you want a licensed office to review your Saudi file before you move further, start here:",
      serviceName: "Saudi Arabia Work Visa Wakala",
    },
    ctas: {
      service: "Explore Saudi Wakala Service",
      contact: "Contact the Saudi Desk",
    },
  },
  ur: {
    title: "پاکستان سے سعودی عرب ورک ویزا کیسے حاصل کریں (2025 مکمل گائیڈ)",
    description:
      "پاکستانی ورکرز کے لیے سعودی عرب ورک ویزا کا عملی گائیڈ جس میں کاغذات، مرحلہ وار پراسیس، رہنمائی کی اہمیت، اور دی فلائٹ سینٹر ٹریول اینڈ ٹورز کی سفری سپورٹ شامل ہے۔",
    intro: [
      "سعودی عرب پاکستانی ورکرز کے لیے ایک اہم اوورسیز روزگار مارکیٹ ہے، لیکن زیادہ تر درخواست گزار شروع ہی میں الجھن کا شکار ہو جاتے ہیں۔ کچھ کے پاس جاب آفر ہوتی ہے، کچھ کے پاس ایمپلائر ڈیمانڈ، اور کچھ صرف اتنا جانتے ہیں کہ سعودی ورک ویزا بنوانا ہے۔ اصل مشکل یہ سمجھنے میں ہوتی ہے کہ فائل آگے کیسے بڑھے گی، کون سے کاغذات درکار ہوں گے، اور وکالہ یا مین پاور پراسیس کہاں شامل ہوتا ہے۔",
      "یہ گائیڈ اسی الجھن کو ختم کرنے کے لیے لکھی گئی ہے۔ اس میں ہم سادہ انداز میں سمجھاتے ہیں کہ سعودی ورک ویزا کیا ہے، اس کی عام اقسام کون سی ہیں، پاکستان سے کن دستاویزات کی ضرورت پڑتی ہے، مرحلہ وار پراسیس کیسے چلتا ہے، اور لائسنس یافتہ وکالہ ایجنسی کا کردار کیوں اہم ہوتا ہے۔",
    ],
    sections: [
      {
        heading: "سعودی ورک ویزا کیا ہے؟",
        paragraphs: [
          "سعودی ورک ویزا وہ قانونی راستہ ہے جس کے ذریعے پاکستانی شہری سعودی عرب میں ملازمت کے لیے سفر کرتا ہے۔ یہ وزٹ یا ٹورسٹ ویزا سے مختلف ہوتا ہے کیونکہ یہ جاب رول، ایمپلائر فائل اور اوورسیز ایمپلائمنٹ پراسیس کے ساتھ منسلک ہوتا ہے۔",
          "عملی طور پر اس کا مطلب یہ ہے کہ صرف پاسپورٹ پر ویزا لگنا کافی نہیں ہوتا۔ جاب ڈیمانڈ، ورکر کی تفصیل اور دستاویزات ایک دوسرے کے مطابق بھی ہونی چاہییں۔ اگر یہ مطابقت کمزور ہو تو پراسیس میں تاخیر آ سکتی ہے۔",
        ],
      },
      {
        heading: "سعودی ورک ویزا کی اقسام",
        paragraphs: [
          "تمام سعودی ورک ویزا کیس ایک جیسے نہیں ہوتے۔ کچھ عام لیبر یا مین پاور ریکروٹمنٹ کے ہوتے ہیں، کچھ ٹیکنیکل ٹریڈ کے، کچھ ڈرائیور یا کمپنی کنٹریکٹ کے۔ ہر قسم میں مختلف دستاویزات کی اہمیت سامنے آ سکتی ہے۔",
          "اسی لیے ایک ورکر کی چیک لسٹ دوسرے پر لاگو نہیں کی جا سکتی۔ کسی فائل میں ٹریڈ سرٹیفکیٹ اہم ہو سکتا ہے جبکہ کسی میں ایمپلائر ڈیمانڈ اور شناختی کاغذات زیادہ بنیادی ہوتے ہیں۔",
        ],
        bullets: [
          "عام مین پاور اور لیبر کیسز",
          "ٹیکنیکل اور اسکلڈ ٹریڈ فائلیں",
          "ڈرائیور اور ٹرانسپورٹ روٹس",
          "کمپنی کنٹریکٹ جابز",
          "خصوصی پروفیشن فائلیں",
        ],
      },
      {
        heading: "ضروری دستاویزات",
        paragraphs: [
          "عموماً پاسپورٹ، تصاویر، CNIC کاپی، ایمپلائر یا ڈیمانڈ لیٹر، اور جاب فائل سے متعلقہ دستاویزات درکار ہوتے ہیں۔ بعض پیشوں میں تعلیمی، تجربہ یا ٹریڈ دستاویزات بھی مانگی جا سکتی ہیں۔ میڈیکل بھی پراسیس کا حصہ بن سکتا ہے۔",
          "بہترین طریقہ یہ ہے کہ جتنے کاغذات دستیاب ہیں، وہ سب ساتھ لے کر لائسنس یافتہ دفتر آئیں۔ اس سے فوری اندازہ ہو جاتا ہے کہ کیا مکمل ہے اور کیا ابھی تیار کرنا باقی ہے۔",
        ],
        bullets: [
          "درست اور قابلِ استعمال پاسپورٹ",
          "CNIC اور ذاتی تفصیل",
          "تصاویر",
          "ایمپلائر یا جاب فائل کاغذات",
          "ضرورت کے مطابق میڈیکل",
          "تعلیمی یا ٹریڈ دستاویزات",
        ],
      },
      {
        heading: "مرحلہ وار پراسیس",
        paragraphs: [
          "زیادہ تر کیسز میں پہلا قدم جاب یا ایمپلائر فائل کا جائزہ ہوتا ہے۔ اس کے بعد ورکر کے پاسپورٹ اور متعلقہ دستاویزات چیک کیے جاتے ہیں۔ اگر بنیادی کمی ہو تو پہلے وہ پوری کی جاتی ہے۔",
          "بعد ازاں فائل وکالہ، میڈیکل، اوورسیز ایمپلائمنٹ یا سفر کی تیاری کے مراحل سے گزرتی ہے۔ ہر کیس کا ترتیب تھوڑا مختلف ہو سکتا ہے، مگر اصل بات یہ ہے کہ اسے ایک مربوط سلسلہ سمجھا جائے، صرف ایک ویزا سٹیمپ نہیں۔",
        ],
      },
      {
        heading: "لائسنس یافتہ وکالہ ایجنسی کا کردار",
        paragraphs: [
          "لائسنس یافتہ وکالہ ایجنسی درخواست گزار کی فائل کو قانونی اور عملی راستے سے جوڑتی ہے۔ سعودی کیسز میں یہ کردار اہم ہوتا ہے کیونکہ اکثر ورکرز پہلی بار بیرون ملک جا رہے ہوتے ہیں اور انہیں درست ترتیب کا علم نہیں ہوتا۔",
          "ایک اچھا دفتر صرف کاغذات جمع نہیں کرتا بلکہ نام، پاسپورٹ، پروفیشن اور ایمپلائر تفصیل میں مطابقت بھی چیک کرتا ہے۔ اس سے غلطی اور تاخیر کے امکانات کم ہوتے ہیں۔",
        ],
      },
      {
        heading: "دی فلائٹ سینٹر کی سفری سپورٹ",
        paragraphs: [
          "دی فلائٹ سینٹر ٹریول اینڈ ٹورز گوجرانوالہ کے دو دفاتر سے کام کرتا ہے اور مسافروں کو واضح دستاویزی رہنمائی فراہم کرتا ہے۔ ویب سائٹ اب آئی اے ٹی اے سرٹیفائیڈ ٹریول ایجنسی کے طور پر کمپنی کی ساکھ، فلائٹس، عمرہ، ٹورز اور ویزا سپورٹ کو نمایاں کرتی ہے۔",
          "اگر آپ کے پاس پہلے سے فائل موجود ہے یا آپ صرف ابتدائی رہنمائی چاہتے ہیں، تو اسی ویب سائٹ پر عمرہ صفحہ اور رابطہ صفحہ آپ کے لیے بہترین اگلا قدم ہیں۔",
        ],
      },
      {
        heading: "اکثر پوچھے جانے والے سوالات",
        paragraphs: [
          "لوگ اکثر پوچھتے ہیں کہ سعودی ورک ویزا میں کتنا وقت لگتا ہے۔ یہ ایمپلائر، پروفیشن، میڈیکل اور کاغذات کی تکمیل پر منحصر ہوتا ہے۔ اسی طرح یہ سوال بھی عام ہے کہ کیا کچھ کاغذات کے ساتھ پراسیس شروع ہو سکتا ہے۔ بہتر یہی ہے کہ دستاویزات کا باقاعدہ جائزہ پہلے ہو جائے۔",
          "اگر کسی کے پاس پہلے سے کچھ ایمپلائر کاغذات ہوں تب بھی لائسنس یافتہ دفتر فائدہ مند رہتا ہے کیونکہ اصل سوال صرف کاغذات کا ہونا نہیں بلکہ پورے روٹ کی سمجھ ہے۔",
        ],
      },
    ],
    faq: [
      {
        question: "پاکستان سے سعودی ورک ویزا میں کتنا وقت لگ سکتا ہے؟",
        answer:
          "یہ ایمپلائر فائل، پروفیشن، میڈیکل اور کاغذات کی تیاری پر منحصر ہے۔ مکمل فائلیں نسبتاً بہتر چلتی ہیں۔",
      },
      {
        question: "کیا ادھورے کاغذات کے ساتھ بھی آغاز کیا جا سکتا ہے؟",
        answer:
          "ابتدائی جائزہ لیا جا سکتا ہے، لیکن مکمل اور درست دستاویزات فائل کو زیادہ مضبوط بناتی ہیں۔",
      },
      {
        question: "اگر میرے پاس ایمپلائر فائل پہلے سے ہو تو اگلا قدم کیا ہونا چاہیے؟",
        answer:
          "اپنی فائل کسی قابلِ اعتماد دفتر، جیسے دی فلائٹ سینٹر ٹریول اینڈ ٹورز، کو دکھائیں تاکہ پورا روٹ واضح ہو سکے۔",
      },
    ],
    labels: {
      eyebrow: "سعودی ویزا گائیڈ",
      faq: "اکثر پوچھے جانے والے سوالات",
      final:
        "اگر آپ چاہتے ہیں کہ کسی لائسنس یافتہ دفتر سے اپنی سعودی فائل کا جائزہ لے کر اگلا قدم واضح کریں تو یہاں سے آغاز کریں:",
      serviceName: "سعودی عرب ورک ویزہ وکالہ",
    },
    ctas: {
      service: "سعودی وکالہ سروس دیکھیں",
      contact: "سعودی ڈیسک سے رابطہ کریں",
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
    path: "/guides/saudi-visa-guide",
    image: "/images/madinah-masjid.webp",
    imageAlt: page.title,
    keywords: [
      "Saudi Arabia work visa from Pakistan",
      "Saudi Wakala guide",
      "Saudi work visa documents Pakistan",
    ],
  });
}

export default async function SaudiVisaGuidePage({
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
        path={localizePath(locale, "/guides/saudi-visa-guide")}
        image="/images/madinah-masjid.webp"
      />
      <ServiceJsonLd
        locale={locale}
        slug="umrah-packages"
        name={page.labels.serviceName}
        description={page.description}
      />
      <FAQJsonLd items={page.faq} />
      <Breadcrumb />

      <section className="mx-auto mt-6 max-w-5xl px-6">
        <div className="rounded-[2.5rem] bg-brand-mesh px-6 py-10 text-white shadow-glow md:px-10">
          <p className="text-xs uppercase tracking-[0.26em] text-brand-gold">
            {page.labels.eyebrow}
          </p>
          <h1 className="display-copy mt-6 font-display text-4xl font-black leading-tight md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
            {page.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={localizePath(locale, "/umrah")} showArrow>
              {page.ctas.service}
            </Button>
            <Button
              href={localizePath(locale, "/contact")}
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:border-white hover:bg-white hover:text-brand-black"
            >
              {page.ctas.contact}
            </Button>
          </div>
        </div>
      </section>

      <article className="mx-auto mt-12 max-w-5xl px-6">
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
                {section.bullets ? (
                  <ul className="mt-5 list-disc space-y-2 ps-5 text-base leading-8 text-zinc-700">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

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
                href={localizePath(locale, "/umrah")}
                className="font-semibold text-brand-gold underline-offset-4 hover:underline"
              >
                {page.ctas.service}
              </Link>{" "}
              {" / "}
              <Link
                href={localizePath(locale, "/contact")}
                className="font-semibold text-brand-gold underline-offset-4 hover:underline"
              >
                {page.ctas.contact}
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
