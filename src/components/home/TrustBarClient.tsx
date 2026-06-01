"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import type { HomeStatView } from "@/lib/cms/types";
import { fadeInUp, staggerChildren } from "@/lib/motion";

export function TrustBarClient({ stats }: { stats: HomeStatView[] }) {
  const t = useTranslations("home.trustBar");

  return (
    <motion.section
      aria-label={t("eyebrow")}
      className="relative isolate overflow-hidden bg-accent text-accent-foreground"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerChildren}
    >
      {/* Layered warm overlay - gold halo + scanlines + edge fades */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(var(--tfc-gold)/0.3)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.18)_0%,transparent_70%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255 / 0.7) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.7) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16">
        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          className="mb-10 flex flex-col items-center gap-3 text-center md:mb-12"
        >
          <span className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" />
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
              {t("eyebrow")}
            </span>
            <span className="h-px w-8 bg-gold/70" />
          </span>
          <h2 className="max-w-2xl font-display text-2xl font-black leading-tight text-accent-foreground md:text-[2rem]">
            {t("title")}
          </h2>
        </motion.div>

        {/* Counters */}
        <motion.div
          className="grid divide-y divide-gold/35 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4"
          variants={staggerChildren}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.key}
              variants={fadeInUp}
              className="group relative transition duration-300 hover:bg-white/[0.04]"
            >
              <span className="pointer-events-none absolute left-1/2 top-0 h-px w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/80 to-transparent opacity-0 transition group-hover:opacity-100" />
              <AnimatedCounter
                from={stat.from}
                to={stat.to}
                suffix={stat.suffix}
                label={stat.label}
                duration={1.8}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
