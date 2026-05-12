"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { FAQJsonLd } from "@/components/shared/JsonLd";
import { BRAND, type Locale } from "@/lib/constants";
import { fadeInUp } from "@/lib/motion";

interface FAQItem {
  q: string;
  a: string;
}

export function FAQ() {
  const t = useTranslations("home.faq");
  const footer = useTranslations("footer");
  const locale = useLocale() as Locale;
  const isUrdu = locale === "ur";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = t.raw("items") as FAQItem[];
  const bottomCopy = isUrdu
    ? {
        title: "مزید سوالات ہیں؟",
        description: "ہماری ٹیم رہنمائی کے لیے تیار ہے، کسی بھی وقت رابطہ کریں۔",
      }
    : {
        title: "Still have questions?",
        description: "Our team is ready to help — reach out any time.",
      };

  return (
    <>
      <FAQJsonLd items={items.map((i) => ({ question: i.q, answer: i.a }))} />

      <section className="relative overflow-hidden bg-brand-black px-6 py-20">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.07)_0%,transparent_65%)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.1)_0%,transparent_70%)] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-14 text-center"
          >
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                {t("eyebrow")}
              </span>
              <span className="h-px w-10 bg-brand-gold" />
            </div>
            <h2 className="display-copy mt-5 font-display text-4xl font-black text-white md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/50">
              {t("description")}
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="space-y-3"
          >
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={item.q}
                  variants={fadeInUp}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-brand-gold/25 bg-white/[0.06]"
                      : "border-white/[0.07] bg-white/[0.03]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span
                      className={`text-base font-semibold leading-snug transition-colors md:text-lg ${
                        isOpen ? "text-white" : "text-white/75"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-brand-gold/40 bg-brand-gold/15 text-brand-gold"
                          : "border-white/10 bg-white/[0.05] text-white/50"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/[0.06] px-6 pb-6 pt-4">
                          <p className="text-sm leading-8 text-white/55 md:text-base">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA strip */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-14 flex flex-col items-center gap-6 rounded-3xl border border-white/[0.08] bg-white/[0.04] px-8 py-8 text-center md:flex-row md:justify-between md:text-left"
          >
            <div>
              <p className="text-lg font-semibold text-white">{bottomCopy.title}</p>
              <p className="mt-1 text-sm text-white/50">
                {bottomCopy.description}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:justify-end">
              <a
                href={`tel:${BRAND.uan}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-brand-gold" />
                {BRAND.uan}
              </a>
              <a
                href={`https://wa.me/92${BRAND.phone.replace(/\D/g, "").slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-darkred"
              >
                <MessageCircle className="h-4 w-4" />
                {footer("whatsappCta")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
