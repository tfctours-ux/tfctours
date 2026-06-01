"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import type { FaqView } from "@/lib/cms/types";
import { BRAND } from "@/lib/constants";
import { fadeInUp } from "@/lib/motion";

export function FAQClient({ items }: { items: FaqView[] }) {
  const t = useTranslations("home.faq");
  const footer = useTranslations("footer");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const bottomCopy = {
    title: t("bottomTitle"),
    description: t("bottomDescription"),
  };

  return (
    <>
      <section className="relative overflow-hidden bg-surface px-6 py-24">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(var(--tfc-gold)/0.08)_0%,transparent_65%)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(var(--tfc-accent)/0.1)_0%,transparent_70%)] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--tfc-foreground) / 0.8) 1px,transparent 1px),linear-gradient(90deg,rgb(var(--tfc-foreground) / 0.8) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
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
              <span className="h-px w-10 bg-gold" />
              <span className="text-[10px] font-mono font-semibold tracking-[0.32em] text-foreground-subtle">
                06
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                {t("eyebrow")}
              </span>
              <span className="h-px w-10 bg-gold" />
            </div>
            <h2 className="display-copy mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground-muted">
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
                  key={item.id}
                  variants={fadeInUp}
                  className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors duration-300 ${
                    isOpen
                      ? "border-gold/30 bg-surface-elevated shadow-[0_18px_44px_-20px_rgb(var(--tfc-gold)/0.3)]"
                      : "border-border bg-surface-elevated/50 hover:border-border-strong/40"
                  }`}
                >
                  {/* Left accent rail when open */}
                  <span
                    className={`absolute inset-y-0 left-0 w-[3px] origin-top bg-gradient-to-b from-gold via-accent to-gold transition-transform duration-500 ${
                      isOpen ? "scale-y-100" : "scale-y-0"
                    }`}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold transition ${
                          isOpen
                            ? "bg-gold/20 text-gold"
                            : "bg-surface-muted text-foreground-muted"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-base font-semibold leading-snug transition-colors md:text-lg ${
                          isOpen ? "text-foreground" : "text-foreground/85"
                        }`}
                      >
                        {item.question}
                      </span>
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-gold/40 bg-gold/15 text-gold"
                          : "border-border bg-surface-elevated/70 text-foreground-muted group-hover:border-border-strong/40 group-hover:text-foreground"
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
                        <div className="border-t border-border px-6 pb-6 pt-4 md:pl-[4.25rem]">
                          <p className="text-sm leading-8 text-foreground-muted md:text-base">
                            {item.answer}
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
            className="relative mt-14 flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-border bg-surface-elevated/70 px-8 py-8 text-center backdrop-blur-sm md:flex-row md:justify-between md:text-left"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--tfc-gold)/0.06),transparent_60%)]" />
            <div className="relative">
              <p className="font-display text-xl font-bold text-foreground">{bottomCopy.title}</p>
              <p className="mt-1 text-sm text-foreground-muted">
                {bottomCopy.description}
              </p>
            </div>
            <div className="relative flex flex-wrap justify-center gap-3 md:justify-end">
              <a
                href={`tel:${BRAND.uan}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/80 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-gold/40 hover:bg-surface-muted"
              >
                <Phone className="h-4 w-4 text-gold" />
                {BRAND.uan}
              </a>
              <a
                href={`https://wa.me/92${BRAND.phone.replace(/\D/g, "").slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[0_10px_30px_-10px_rgb(var(--tfc-accent)/0.7)] transition hover:bg-accent-hover"
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
