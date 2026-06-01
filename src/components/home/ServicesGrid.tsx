// src/components/home/ServicesGrid.tsx
"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { ServiceCard } from "@/components/shared/ServiceCard";
import { FLIGHTS_URL, SERVICES, type Locale } from "@/lib/constants";
import { fadeInUp, staggerChildren } from "@/lib/motion";

export function ServicesGrid() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home.services");
  const content = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    notice: t("notice"),
    noticeLink: t("noticeLink"),
  };

  return (
    <motion.section
      className="relative overflow-hidden bg-surface px-6 py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerChildren}
    >
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(var(--tfc-accent)/0.06)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(var(--tfc-gold)/0.07)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header — title left, description right on lg+ */}
        <motion.div
          variants={fadeInUp}
          className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3">
              <span className="text-[10px] font-mono font-semibold tracking-[0.32em] text-foreground-subtle">
                02
              </span>
              <span className="h-px w-10 bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                {content.eyebrow}
              </span>
            </div>
            <h2 className="display-copy mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground md:text-5xl xl:text-[3.5rem]">
              {content.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-md text-base leading-8 text-foreground-muted lg:ml-auto lg:text-right">
              {content.description}
            </p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerChildren}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.slug}
              locale={locale}
              service={service}
              index={i}
            />
          ))}
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mt-10 text-center text-xs tracking-wide text-foreground-muted"
        >
          {content.notice}
          <a
            href={FLIGHTS_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-gold underline-offset-4 transition hover:text-gold-hover hover:underline"
          >
            {content.noticeLink}
          </a>
        </motion.p>
      </div>
    </motion.section>
  );
}
