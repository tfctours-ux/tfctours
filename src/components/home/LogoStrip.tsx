// src/components/home/LogoStrip.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Ticket } from "lucide-react";
import { useTranslations } from "next-intl";

import { fadeInUp, staggerChildren } from "@/lib/motion";

export function LogoStrip() {
    const t = useTranslations("home.logoStrip");
    const airlines = t.raw("airlines") as string[];

    return (
        <motion.section
            aria-label={t("eyebrow")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
            className="relative overflow-hidden border-y border-border bg-surface"
        >
            {/* Background atmosphere */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(var(--tfc-gold)/0.06)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16">
                {/* Header */}
                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                >
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-3">
                            <span className="h-px w-10 bg-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                                {t("eyebrow")}
                            </span>
                        </div>
                        <h2 className="mt-3 font-display text-2xl font-black leading-tight text-foreground md:text-3xl">
                            {t("title")}
                        </h2>
                        <p className="mt-3 max-w-md text-sm leading-7 text-foreground-muted">
                            {t("description")}
                        </p>
                    </div>

                    {/* Right-aligned credibility cluster */}
                    <div className="flex flex-wrap items-stretch gap-3">
                        {/* IATA badge */}
                        <div className="flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 backdrop-blur-sm">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold">
                                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                                    {t("iataLabel")}
                                </p>
                                <p className="text-sm font-semibold text-foreground">IATA</p>
                            </div>
                        </div>

                        {/* Stat tile */}
                        <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-elevated px-5 py-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                                <Ticket className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <div>
                                <p className="font-display text-xl font-black text-foreground">
                                    {t("statValue")}
                                </p>
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground-subtle">
                                    {t("statLabel")}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Airline name pills — generic text mentions, no logos (no IP risk) */}
                <motion.div variants={fadeInUp} className="mt-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-foreground-subtle">
                        {t("airlinesLabel")}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {airlines.map((name) => (
                            <span
                                key={name}
                                className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-4 py-2 text-xs font-semibold text-foreground/85 transition hover:border-border-strong hover:text-foreground"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}