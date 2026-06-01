// src/components/home/WhyTfc.tsx
"use client";

import { motion } from "framer-motion";
import { Clock, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ComponentType, SVGProps } from "react";

import { Button } from "@/components/ui/Button";
import { type Locale } from "@/lib/constants";
import { fadeInUp, staggerChildren } from "@/lib/motion";
import { localizePath } from "@/lib/utils";

interface Pillar {
    title: string;
    description: string;
    metric: string;
}

const PILLAR_ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
    ShieldCheck,
    Clock,
    Sparkles,
    Globe2,
];

export function WhyTfc() {
    const t = useTranslations("home.whyTfc");
    const locale = useLocale() as Locale;
    const pillars = t.raw("pillars") as Pillar[];

    return (
        <motion.section
            aria-label={t("eyebrow")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerChildren}
            className="relative overflow-hidden bg-background px-6 py-20"
        >
            {/* Background atmosphere */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(var(--tfc-accent)/0.08)_0%,transparent_70%)] blur-3xl" />
                <div className="absolute -right-32 bottom-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(var(--tfc-gold)/0.08)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    variants={fadeInUp}
                    className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                >
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3">
                            <span className="h-px w-10 bg-accent" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                                {t("eyebrow")}
                            </span>
                        </div>
                        <h2 className="display-copy mt-4 font-display text-4xl font-black leading-tight text-foreground md:text-5xl">
                            {t("title")}
                        </h2>
                        <p className="mt-4 max-w-xl text-base leading-8 text-foreground-muted">
                            {t("description")}
                        </p>
                    </div>
                </motion.div>

                {/* Pillars grid */}
                <motion.div
                    variants={staggerChildren}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {pillars.map((pillar, index) => {
                        const Icon = PILLAR_ICONS[index] ?? ShieldCheck;
                        return (
                            <motion.article
                                key={pillar.title}
                                variants={fadeInUp}
                                className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-surface-elevated p-7 transition-all duration-300 hover:border-accent/40 hover:shadow-glow"
                            >
                                {/* Subtle hover glow */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgb(var(--tfc-gold)/0.18)_0%,transparent_70%)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                                />

                                <div className="flex items-start justify-between">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                                        <Icon className="h-6 w-6" aria-hidden="true" />
                                    </span>
                                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                                        {pillar.metric}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-display text-xl font-bold text-foreground">
                                        {pillar.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                                        {pillar.description}
                                    </p>
                                </div>

                                {/* Subtle bottom accent bar that slides in on hover */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-gold to-accent transition-transform duration-500 group-hover:scale-x-100"
                                />
                            </motion.article>
                        );
                    })}
                </motion.div>

                {/* CTA pair */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-12 flex flex-wrap justify-center gap-3"
                >
                    <Button
                        href={localizePath(locale, "/contact")}
                        variant="primary"
                        size="lg"
                        showArrow
                    >
                        {t("ctaPrimary")}
                    </Button>
                    <Button href={localizePath(locale, "/services")} variant="outline" size="lg">
                        {t("ctaSecondary")}
                    </Button>
                </motion.div>
            </div>
        </motion.section>
    );
}