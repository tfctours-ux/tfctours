"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { HOME_STATS } from "@/lib/constants";
import { fadeInUp, staggerChildren } from "@/lib/motion";

import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

export function TrustBar() {
  const t = useTranslations("trust");

  return (
    <motion.section
      className="relative z-10 w-full overflow-hidden bg-brand-red"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.45 }}
      variants={fadeInUp}
    >
      <motion.div
        className="mx-auto grid max-w-7xl divide-y divide-brand-gold/45 px-4 py-3 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4"
        variants={staggerChildren}
      >
        {HOME_STATS.map((stat, index) => (
          <motion.div
            key={stat.id}
            variants={fadeInUp}
            className={index > 1 ? "lg:border-l-0" : ""}
          >
            <AnimatedCounter
              from={stat.from}
              to={stat.to}
              suffix={stat.suffix}
              label={t(stat.id)}
              duration={1.8}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
