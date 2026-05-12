"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, PhoneCall } from "lucide-react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/Button";
import { AGENT_LOGIN_URL } from "@/lib/constants";

const content = {
  en: {
    eyebrow: "For Travel Agents",
    title: "Obtain Your Web Portal ID - Within the Same Day",
    description:
      "The Flight Centre offers Pakistan's travel agents a powerful B2B booking portal with same-day activation.",
    features: [
      "Top B2B solution for travel agencies",
      "Multiple user ID support",
      "Fast top-up feature",
      "Swift ticket management (issue/void/refund/exchange)",
      "Round-the-clock connectivity",
    ],
    requirementsTitle: "Requirements",
    requirements: ["Deposit of One Lakh Rupees", "DTS Copy", "Visiting Card", "Owner CNIC Copy"],
    portalCta: "Get Portal ID",
    callCta: "Call for Inquiry - 0300-6569091",
    imageAlt: "B2B travel portal",
    access: "Portal Access",
    cardTitle: "Same-Day Agent Activation",
    cardText:
      "Multi-user IDs, ticket operations, top-ups and continuous connectivity for modern travel agencies.",
    floatingLabel: "B2B Ready",
    floatingValue: "Multiple User IDs",
  },
  ur: {
    eyebrow: "ٹریول ایجنٹس کے لیے",
    title: "اپنی ویب پورٹل آئی ڈی حاصل کریں - اسی دن",
    description:
      "دی فلائٹ سینٹر پاکستان کے ٹریول ایجنٹس کے لیے طاقتور B2B بکنگ پورٹل فراہم کرتا ہے، جس کی ایکٹیویشن اسی دن ہو سکتی ہے۔",
    features: [
      "ٹریول ایجنسیز کے لیے مضبوط B2B حل",
      "ملٹی پل یوزر آئی ڈی سپورٹ",
      "فاسٹ ٹاپ اَپ فیچر",
      "ٹکٹ مینجمنٹ: ایشو، ووئڈ، ریفنڈ اور ایکسچینج",
      "مسلسل کنیکٹیویٹی",
    ],
    requirementsTitle: "ضروریات",
    requirements: ["ایک لاکھ روپے ڈپازٹ", "DTS کاپی", "وزٹنگ کارڈ", "مالک کی CNIC کاپی"],
    portalCta: "پورٹل آئی ڈی حاصل کریں",
    callCta: "معلومات کے لیے کال کریں - 0300-6569091",
    imageAlt: "B2B ٹریول پورٹل",
    access: "پورٹل رسائی",
    cardTitle: "اسی دن ایجنٹ ایکٹیویشن",
    cardText:
      "جدید ٹریول ایجنسیز کے لیے ملٹی یوزر آئی ڈیز، ٹکٹ آپریشنز، ٹاپ اَپس اور مسلسل کنیکٹیویٹی۔",
    floatingLabel: "B2B تیار",
    floatingValue: "ملٹی پل یوزر آئی ڈیز",
  },
} as const;

export function B2BPortal() {
  const locale = useLocale();
  const copy = content[locale === "ur" ? "ur" : "en"];

  return (
    <section className="relative overflow-hidden bg-brand-black px-6 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.08)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.12)_0%,transparent_70%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-brand-red" />
          <span className="rounded-full border border-brand-red/20 bg-brand-red/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red">
            {copy.eyebrow}
          </span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="mt-3 font-display text-4xl font-black leading-tight text-white md:text-5xl">
              {copy.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
              {copy.description}
            </p>

            <div className="mt-8 space-y-4">
              {copy.features.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-4 backdrop-blur-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-white/80">{label}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                {copy.requirementsTitle}
              </p>
              <ul className="mt-4 space-y-3">
                {copy.requirements.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/72">
                    <span className="h-2 w-2 rounded-full bg-brand-red" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={AGENT_LOGIN_URL} showArrow external>
                {copy.portalCta}
              </Button>
              <Button
                href="tel:03006569091"
                variant="outline"
                className="border-white/15 bg-white/10 text-white hover:border-white hover:bg-white hover:text-brand-black"
              >
                <PhoneCall className="h-4 w-4 text-brand-gold" />
                {copy.callCta}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -right-6 -top-6 h-48 w-48 rounded-full border border-brand-gold/20" />
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full border border-brand-gold/10" />

            <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/[0.08]">
              <div className="relative min-h-[30rem]">
                <Image
                  src="/images/hero-3.webp"
                  alt={copy.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/35 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(204,0,0,0.12),transparent_40%,rgba(201,168,76,0.1))]" />
                <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="rounded-[1.75rem] border border-white/[0.1] bg-white/[0.08] p-5 backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-brand-gold">
                        {copy.access}
                      </p>
                      <p className="mt-2 font-display text-xl font-bold text-white">
                        {copy.cardTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {copy.cardText}
                      </p>
                    </div>
                    <a
                      href={AGENT_LOGIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold transition hover:bg-brand-gold hover:text-black"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-5 top-10 rounded-2xl border border-white/10 bg-brand-surface px-4 py-3 shadow-glow backdrop-blur"
            >
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/40">
                {copy.floatingLabel}
              </p>
              <p className="mt-0.5 text-lg font-bold text-white">{copy.floatingValue}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
