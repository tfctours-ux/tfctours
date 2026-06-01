// src/components/home/WakalaFeature.tsx
"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { UmrahPackageImageRow } from "@/components/shared/UmrahPackageImageRow";
import { Button } from "@/components/ui/Button";
import { type Locale } from "@/lib/constants";
import { localizePath } from "@/lib/utils";

export function UmrahFeature() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home.umrahFeature");
  const copy = {
    eyebrow: t("eyebrow"),
    urduLine: t("urduLine"),
    title: t("title"),
    description: t("description"),
    bullets: t.raw("bullets") as string[],
    chips: t.raw("chips") as string[],
    primary: t("primary"),
    secondary: t("secondary"),
    cardTitle: t("cardTitle"),
    cardText: t("cardText"),
    floatingLabel: t("floatingLabel"),
    floatingValue: t("floatingValue"),
    imageAlt: t("imageAlt"),
  };

  return (
    <section className="relative overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(var(--tfc-gold)/0.1)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(var(--tfc-accent)/0.12)_0%,transparent_70%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--tfc-foreground) / 0.8) 1px,transparent 1px),linear-gradient(90deg,rgb(var(--tfc-foreground) / 0.8) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 flex items-center gap-3"
        >
          <span className="text-[10px] font-mono font-semibold tracking-[0.32em] text-foreground-subtle">
            03
          </span>
          <span className="h-px w-10 bg-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
            {copy.eyebrow}
          </span>
          <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.22em] text-gold">
            Signature
          </span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-urdu text-3xl leading-[2] text-gold">
              {copy.urduLine}
            </p>

            <h2 className="mt-3 font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground md:text-5xl xl:text-[3.25rem]">
              {copy.title}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-foreground-muted">
              {copy.description}
            </p>

            <div className="mt-8 space-y-3">
              {copy.bullets.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface-elevated/60 px-5 py-3.5 backdrop-blur-sm transition hover:border-gold/30 hover:bg-surface-elevated dark:bg-surface-elevated/40 dark:hover:bg-surface-elevated/70"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/15 font-mono text-[11px] font-bold text-gold transition group-hover:bg-gold/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-foreground/90">{label}</span>
                  <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {copy.chips.map((chip, i) => (
                <div
                  key={chip}
                  className={
                    "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm " +
                    (i === 0
                      ? "border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300"
                      : "border-border bg-surface-elevated/60 text-foreground-muted")
                  }
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
                className="border-border text-foreground hover:border-border-strong hover:bg-foreground hover:text-background"
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
            <div className="absolute -right-6 -top-6 h-48 w-48 rounded-full border border-gold/20" />
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full border border-gold/10" />

            <div className="group relative overflow-hidden rounded-[2.5rem] border border-border">
              <div className="relative min-h-[30rem]">
                <Image
                  src="/images/umrah-package.webp"
                  alt={copy.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-emerald-500/20 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="rounded-[1.75rem] border border-border bg-surface-elevated/90 p-5 backdrop-blur-xl dark:bg-surface-elevated/80">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                        {copy.eyebrow}
                      </p>
                      <p className="mt-2 font-display text-xl font-bold text-foreground">
                        {copy.cardTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-foreground-muted">
                        {copy.cardText}
                      </p>
                    </div>
                    <a
                      href={localizePath(locale, "/umrah")}
                      aria-label={copy.primary}
                      className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold transition hover:bg-gold hover:text-gold-foreground"
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
              className="absolute -left-5 top-10 rounded-2xl border border-gold/25 bg-surface-elevated px-4 py-3 shadow-[0_18px_44px_-12px_rgb(var(--tfc-gold)/0.35)] backdrop-blur"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                {copy.floatingLabel}
              </p>
              <p className="mt-0.5 font-display text-lg font-bold text-foreground">{copy.floatingValue}</p>
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
