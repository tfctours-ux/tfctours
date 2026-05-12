"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe2, Shield, Star } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { type Locale } from "@/lib/constants";
import { localizePath } from "@/lib/utils";

const backgroundImages = [
  "/images/hero-1.webp",
  "/images/hero-2.webp",
  "/images/hero-3.webp",
  "/images/hero-4.webp",
  "/images/hero-5.webp",
];

function heroTransition(delay: number) {
  return {
    delay,
    duration: 0.85,
    ease: [0.16, 1, 0.3, 1] as const,
  };
}

export function Hero() {
  const t = useTranslations("hero");
  const statsT = useTranslations("home.hero");
  const trustT = useTranslations("trust");
  const locale = useLocale() as Locale;
  const isUrdu = locale === "ur";
  const stats = statsT.raw("stats") as Array<{ label: string; value: string }>;

  const trustBadges = [
    { icon: Shield, label: trustT("offices") },
    { icon: Globe2, label: trustT("countries") },
    { icon: Star, label: trustT("experience") },
  ];

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((index) => (index + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#050505]">
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <Image
              src={backgroundImages[currentImg]}
              alt=""
              fill
              priority={currentImg === 0}
              sizes="100vw"
              className="absolute inset-0 object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            <div
              className={`absolute inset-0 ${
                isUrdu ? "bg-gradient-to-l" : "bg-gradient-to-r"
              } from-[#050505] via-[rgba(5,5,5,0.78)] to-[rgba(5,5,5,0.45)]`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[rgba(5,5,5,0.5)]" />
            <div
              className={`absolute bottom-0 ${
                isUrdu ? "right-0" : "left-0"
              } h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.22)_0%,transparent_70%)] blur-3xl`}
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        </div>

      {/* Slideshow dot controls — outside pointer-events-none so they are clickable */}
      <div className="absolute bottom-10 right-8 z-20 flex gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImg(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentImg ? "w-8 bg-brand-red" : "w-1.5 bg-white/30"
            }`}
            aria-label={`Background ${index + 1}`}
          />
        ))}
      </div>

      <div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-28 pt-28"
        dir={isUrdu ? "rtl" : "ltr"}
      >
        <div
          className={`flex w-full max-w-4xl flex-col ${
            isUrdu ? "ml-auto items-end text-right" : "mr-auto items-start text-left"
          }`}
        >
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroTransition(0.05)}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-gold backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-gold" />
            {t("eyebrow")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroTransition(0.14)}
            className={`mt-7 w-full font-display text-[52px] font-black leading-[0.95] text-white md:text-[76px] xl:text-[88px] ${
              isUrdu ? "text-right" : "text-left"
            }`}
          >
            <span>{t("line1")}</span>
            <br />
            <span className="text-brand-red">{t("line2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroTransition(0.24)}
            className={`mt-6 w-full max-w-2xl text-base leading-8 text-white/70 md:text-lg md:leading-9 ${
              isUrdu ? "text-right" : "text-left"
            }`}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroTransition(0.32)}
            className={`mt-8 flex w-full flex-wrap gap-3 ${
              isUrdu ? "justify-end" : "justify-start"
            }`}
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md"
              >
                <Icon className="h-3.5 w-3.5 text-brand-red" />
                <span className="text-[11px] font-medium uppercase tracking-widest text-white/60">
                  {label}
                </span>
              </div>
            ))}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-black/30 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                {isUrdu ? "آئی اے ٹی اے سرٹیفائیڈ" : "IATA Certified"}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroTransition(0.42)}
            className={`mt-10 flex w-full flex-wrap gap-4 ${
              isUrdu ? "justify-end" : "justify-start"
            }`}
          >
            <Button href={localizePath(locale, "/tours")} variant="primary" size="lg">
              {t("ctaPrimary")}
            </Button>
            <Button href={localizePath(locale, "/contact")} variant="outline" size="lg">
              {t("ctaSecondary")}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition(0.52)}
          className={`mt-14 flex flex-wrap gap-4 md:absolute md:bottom-14 ${
            isUrdu ? "md:right-6" : "md:left-6"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3.5 backdrop-blur-xl"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                {stat.label}
              </p>
              <p className="mt-1 text-xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white/40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[9px] uppercase tracking-[0.2em]">
            {isUrdu ? "نیچے جائیں" : "Scroll"}
          </span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </div>
    </section>
  );
}
