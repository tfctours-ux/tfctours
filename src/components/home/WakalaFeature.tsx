"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/Button";
import { UmrahPackageImageRow } from "@/components/shared/UmrahPackageImageRow";
import { type Locale } from "@/lib/constants";
import { localizePath } from "@/lib/utils";

const content = {
  en: {
    eyebrow: "Umrah Specialists",
    urduLine: "عمرہ پیکجز - بہترین قیمت، بہترین خدمات",
    title: "Complete Umrah Packages - 15, 21 & 28 Days",
    description:
      "The Flight Centre offers all-inclusive Umrah packages from Pakistan. Hotel, flights, transport and visa - everything handled under one roof.",
    bullets: [
      "15, 21 & 28 day package options available",
      "Hotel accommodation near Haram included",
      "Air tickets from Pakistan on all airlines",
      "Umrah visa processing support",
      "Ziyarat and ground transport included",
    ],
    chips: ["All-Inclusive Support", "Pakistan to Haram"],
    primary: "View Umrah Packages",
    secondary: "Get Instant Quote ->",
    cardTitle: "Complete Umrah Packages",
    cardText:
      "15, 21 and 28 day options with flights, hotels, transport, visa support and guided Ziyarat coordination.",
    floatingLabel: "Package Options",
    floatingValue: "15 / 21 / 28 Days",
    imageAlt: "Umrah packages by The Flight Centre",
  },
  ur: {
    eyebrow: "عمرہ ماہرین",
    urduLine: "عمرہ پیکجز - بہترین قیمت، بہترین خدمات",
    title: "مکمل عمرہ پیکجز - 15، 21 اور 28 دن",
    description:
      "دی فلائٹ سینٹر پاکستان سے مکمل عمرہ پیکجز فراہم کرتا ہے۔ ہوٹل، فلائٹس، ٹرانسپورٹ اور ویزا سب ایک ہی جگہ سے مکمل۔",
    bullets: [
      "15، 21 اور 28 دن کے پیکج آپشنز",
      "حرم کے قریب ہوٹل رہائش شامل",
      "پاکستان سے تمام ایئر لائنز پر ایئر ٹکٹس",
      "عمرہ ویزا پروسیسنگ سپورٹ",
      "زیارات اور گراؤنڈ ٹرانسپورٹ شامل",
    ],
    chips: ["مکمل سپورٹ", "پاکستان سے حرم تک"],
    primary: "عمرہ پیکجز دیکھیں",
    secondary: "فوری کوٹیشن لیں ←",
    cardTitle: "مکمل عمرہ پیکجز",
    cardText:
      "15، 21 اور 28 دن کے آپشنز، فلائٹس، ہوٹلز، ٹرانسپورٹ، ویزا سپورٹ اور زیارات کوآرڈینیشن کے ساتھ۔",
    floatingLabel: "پیکج آپشنز",
    floatingValue: "15 / 21 / 28 دن",
    imageAlt: "دی فلائٹ سینٹر کے عمرہ پیکجز",
  },
} as const;

export function UmrahFeature() {
  const locale = useLocale() as Locale;
  const copy = content[locale === "ur" ? "ur" : "en"];

  return (
    <section className="relative overflow-hidden bg-brand-black px-6 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.09)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.12)_0%,transparent_70%)] blur-3xl" />
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
          <span className="h-px w-10 bg-brand-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
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
            <p className="font-urdu text-3xl leading-[2] text-brand-gold">
              {copy.urduLine}
            </p>

            <h2 className="mt-3 font-display text-4xl font-black leading-tight text-white md:text-5xl">
              {copy.title}
            </h2>

            <p className="mt-5 text-base leading-8 text-white/65">
              {copy.description}
            </p>

            <div className="mt-8 space-y-4">
              {copy.bullets.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-4 backdrop-blur-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-white/80">{label}</span>
                  <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-400" />
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {copy.chips.map((chip) => (
                <div
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 first:border-emerald-400/25 first:bg-emerald-400/10 first:text-emerald-300"
                >
                  {chip}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={localizePath(locale, "/umrah")} showArrow>
                {copy.primary}
              </Button>
              <Button
                href={localizePath(locale, "/umrah-calculator")}
                variant="outline"
                className="border-white/20 text-white hover:border-white hover:bg-white hover:text-brand-black"
              >
                {copy.secondary}
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
                  src="/images/umrah-package.webp"
                  alt={copy.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-emerald-500/20 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="rounded-[1.75rem] border border-white/[0.1] bg-white/[0.08] p-5 backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-brand-gold">
                        {copy.eyebrow}
                      </p>
                      <p className="mt-2 font-display text-xl font-bold text-white">
                        {copy.cardTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {copy.cardText}
                      </p>
                    </div>
                    <a
                      href={localizePath(locale, "/umrah")}
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <UmrahPackageImageRow locale={locale} />
        </motion.div>
      </div>
    </section>
  );
}
