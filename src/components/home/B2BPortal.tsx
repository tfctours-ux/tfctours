// src/components/home/B2BPortal.tsx
"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { AGENT_LOGIN_URL } from "@/lib/constants";

export function B2BPortal() {
  const t = useTranslations("home.b2b");
  const copy = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    features: t.raw("features") as string[],
    requirementsTitle: t("requirementsTitle"),
    requirements: t.raw("requirements") as string[],
    portalCta: t("portalCta"),
    callCta: t("callCta"),
    imageAlt: t("imageAlt"),
    access: t("access"),
    cardTitle: t("cardTitle"),
    cardText: t("cardText"),
    floatingLabel: t("floatingLabel"),
    floatingValue: t("floatingValue"),
  };

  return (
    <section className="relative overflow-hidden bg-surface px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-1/2 h-[36rem] w-[56rem] translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(var(--tfc-accent)/0.1)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(var(--tfc-gold)/0.1)_0%,transparent_70%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--tfc-foreground) / 0.8) 1px,transparent 1px),linear-gradient(90deg,rgb(var(--tfc-foreground) / 0.8) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
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
            04
          </span>
          <span className="h-px w-10 bg-accent" />
          <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            {copy.eyebrow}
          </span>
          <span className="rounded-full border border-emerald-600/30 bg-emerald-600/10 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.22em] text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
            Same-day
          </span>
        </motion.div>

        {/* Image on the LEFT, content on the RIGHT — mirrored from Umrah for visual rhythm */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -left-6 -top-6 h-48 w-48 rounded-full border border-accent/20" />
            <div className="absolute -left-3 -top-3 h-24 w-24 rounded-full border border-accent/10" />

            <div className="group relative overflow-hidden rounded-[2.5rem] border border-border">
              <div className="relative min-h-[30rem]">
                <Image
                  src="/images/hero-3.webp"
                  alt={copy.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--tfc-accent)/0.18),transparent_45%,rgb(var(--tfc-gold)/0.1))]" />
                <div
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgb(var(--tfc-foreground) / 0.7) 1px,transparent 1px),linear-gradient(90deg,rgb(var(--tfc-foreground) / 0.7) 1px,transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="rounded-[1.75rem] border border-border bg-surface-elevated/90 p-5 backdrop-blur-xl dark:bg-surface-elevated/80">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                        {copy.access}
                      </p>
                      <p className="mt-2 font-display text-xl font-bold text-foreground">
                        {copy.cardTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-foreground-muted">
                        {copy.cardText}
                      </p>
                    </div>
                    <a
                      href={AGENT_LOGIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={copy.portalCta}
                      className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent transition hover:bg-accent hover:text-accent-foreground"
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
              className="absolute -right-5 top-10 rounded-2xl border border-accent/25 bg-surface-elevated px-4 py-3 shadow-[0_18px_44px_-12px_rgb(var(--tfc-accent)/0.35)] backdrop-blur"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                {copy.floatingLabel}
              </p>
              <p className="mt-0.5 font-display text-lg font-bold text-foreground">{copy.floatingValue}</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground md:text-5xl xl:text-[3.25rem]">
              {copy.title}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-foreground-muted">
              {copy.description}
            </p>

            <div className="mt-8 space-y-3">
              {copy.features.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface-elevated/60 px-5 py-3.5 backdrop-blur-sm transition hover:border-accent/30 hover:bg-surface-elevated dark:bg-surface-elevated/40 dark:hover:bg-surface-elevated/70"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent transition group-hover:bg-accent/20">
                    <CheckCircle2 className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-sm font-medium text-foreground/90">{label}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-gold/25 bg-gold/[0.06] p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-gold" />
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                  {copy.requirementsTitle}
                </p>
              </div>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {copy.requirements.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    </span>
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
                className="border-border bg-surface-elevated/60 text-foreground hover:border-border-strong hover:bg-foreground hover:text-background"
              >
                <PhoneCall className="h-4 w-4 text-gold" />
                {copy.callCta}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
