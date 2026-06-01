// src/components/home/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MessageCircle, PhoneCall, Shield, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import {
  HERO_IMAGES,
  HeroBackgroundLayer,
} from "@/components/home/HeroBackgroundSlideshow";
import { HeroImagePreload } from "@/components/home/HeroImagePreload";
import { BRAND, type Locale } from "@/lib/constants";
import { LazyMotion, domAnimation, m } from "@/lib/motion";
import { localizePath } from "@/lib/utils";

const SLIDESHOW_INTERVAL_MS = 6000;
const EASE_HERO = [0.16, 1, 0.3, 1] as const;

function heroTransition(delay: number) {
  return { delay, duration: 0.8, ease: EASE_HERO };
}

interface HeroProps {
  h1Id?: string;
  pId?: string;
}

export function Hero({ h1Id, pId }: HeroProps = {}) {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const isUrdu = locale === "ur";

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDESHOW_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const trustChips = [
    { icon: Shield, label: t("iataBadge"), accent: "gold" as const },
    { icon: Clock3, label: t("trustOpenNow"), accent: "emerald" as const },
    { icon: Sparkles, label: t("trustResponse"), accent: "accent" as const },
  ];

  // tel: link — strip non-digits from UAN
  const phoneHref = `tel:${BRAND.uan.replace(/\D/g, "")}`;
  // WhatsApp link — strip non-digits from primary phone, drop leading 0, prefix 92
  const whatsappHref = `https://wa.me/${BRAND.phone.replace(/\D/g, "").replace(/^0/, "")}`;

  return (
    <LazyMotion features={domAnimation} strict>
      <HeroImagePreload />
      <section
        className="relative isolate min-h-[100svh] overflow-hidden bg-background"
        aria-label={t("eyebrow")}
      >
        <HeroBackgroundLayer activeIndex={activeIdx} />

        {/* Theme-aware overlay stack — stronger scrim so text stays readable on bright photos */}
        <div className="pointer-events-none absolute inset-0">
          {/* Primary directional gradient — text-side coverage */}
          <div
            className={
              isUrdu
                ? "absolute inset-0 bg-gradient-to-l from-background via-background/88 to-background/25"
                : "absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/25"
            }
          />
          {/* Vertical vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/55" />
          {/* Accent glow — bottom text-side corner */}
          <div
            className={
              isUrdu
                ? "absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-[0.22] dark:opacity-[0.32]"
                : "absolute bottom-0 left-0 h-80 w-80 rounded-full blur-3xl opacity-[0.22] dark:opacity-[0.32]"
            }
            style={{
              background:
                "radial-gradient(circle, rgb(var(--tfc-accent) / 1) 0%, transparent 70%)",
            }}
          />
          {/* Gold glow — upper photo-side corner for warmth */}
          <div
            className={
              isUrdu
                ? "absolute top-0 left-0 h-72 w-72 rounded-full blur-3xl opacity-[0.14] dark:opacity-[0.18]"
                : "absolute top-0 right-0 h-72 w-72 rounded-full blur-3xl opacity-[0.14] dark:opacity-[0.18]"
            }
            style={{
              background:
                "radial-gradient(circle, rgb(var(--tfc-gold) / 1) 0%, transparent 70%)",
            }}
          />
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--tfc-foreground) / 0.6) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--tfc-foreground) / 0.6) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Main content */}
        <div
          className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-32 pt-28 md:pt-32"
          dir={isUrdu ? "rtl" : "ltr"}
        >
          <div
            className={
              "flex w-full max-w-4xl flex-col " +
              (isUrdu ? "ml-auto items-end text-right" : "mr-auto items-start text-left")
            }
          >
            {/* Eyebrow chip */}
            <m.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(0.05)}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-gold/40 bg-surface-elevated/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur-md shadow-[0_0_24px_rgb(var(--tfc-gold)/0.12)] dark:shadow-[0_0_24px_rgb(var(--tfc-gold)/0.22)]"
            >
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold shadow-[0_0_6px_rgb(var(--tfc-gold)/0.9)]" />
              </span>
              {t("eyebrow")}
            </m.span>

            {/* Headline — two lines, second line in accent */}
            <m.h1
              id={h1Id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(0.14)}
              className={
                "mt-7 w-full font-display text-[52px] font-black leading-[0.95] tracking-tight text-foreground md:text-[76px] xl:text-[92px] " +
                (isUrdu ? "text-right" : "text-left")
              }
            >
              <span className="block">{t("line1")}</span>
              <span
                className="relative block text-accent"
                style={{ textShadow: "0 0 60px rgb(var(--tfc-accent) / 0.25)" }}
              >
                {t("line2")}
                {/* Decorative underbar */}
                <span
                  className={
                    "absolute -bottom-3 h-[3px] w-1/3 rounded-full " +
                    (isUrdu ? "right-0" : "left-0")
                  }
                  style={{
                    background: "linear-gradient(90deg, rgb(var(--tfc-accent)), rgb(var(--tfc-gold)), transparent)",
                  }}
                  aria-hidden="true"
                />
              </span>
            </m.h1>

            {/* Lede */}
            <m.p
              id={pId}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(0.22)}
              className={
                "mt-8 w-full max-w-2xl text-base leading-8 text-foreground/85 md:text-lg md:leading-9 " +
                (isUrdu ? "text-right" : "text-left")
              }
            >
              {t("subtitle")}
            </m.p>

            {/* Primary action cluster */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(0.3)}
              className={
                "mt-9 flex w-full flex-wrap items-center gap-3 " +
                (isUrdu ? "justify-end" : "justify-start")
              }
            >
              <Button
                href={localizePath(locale, "/tour-calculator")}
                variant="primary"
                size="lg"
                showArrow
              >
                {t("ctaPrimary")}
              </Button>
              <Button href={localizePath(locale, "/contact")} variant="outline" size="lg">
                {t("ctaSecondary")}
              </Button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/[0.1] px-5 py-3 text-sm font-semibold text-emerald-700 backdrop-blur-sm transition hover:border-emerald-500/55 hover:bg-emerald-500/[0.16] dark:border-emerald-400/30 dark:bg-emerald-400/[0.08] dark:text-emerald-300 dark:hover:border-emerald-400/55 dark:hover:bg-emerald-400/[0.14]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </m.div>

            {/* Inline UAN — tappable, prominent, ltr-locked so digits render correctly in RTL */}
            <m.a
              href={phoneHref}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(0.38)}
              className={
                "mt-5 inline-flex items-center gap-3 text-sm text-foreground-muted transition hover:text-foreground " +
                (isUrdu ? "self-end" : "self-start")
              }
              dir="ltr"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-surface-elevated/70 text-gold shadow-[0_8px_22px_rgb(var(--tfc-scrim)/0.05)] dark:border-white/15">
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex items-baseline gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground-subtle">
                  {t("uanLabel")}
                </span>
                <span className="font-display text-lg font-bold text-foreground">
                  {BRAND.uan}
                </span>
              </span>
            </m.a>

            {/* Trust chips — compact row */}
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={heroTransition(0.46)}
              className={
                "mt-8 flex w-full flex-wrap gap-2 " +
                (isUrdu ? "justify-end" : "justify-start")
              }
            >
              {trustChips.map(({ icon: Icon, label, accent }) => {
                const accentClass =
                  accent === "gold"
                    ? "border-gold/35 bg-gold/[0.1] text-gold shadow-[0_0_14px_rgb(var(--tfc-gold)/0.08)] dark:shadow-[0_0_14px_rgb(var(--tfc-gold)/0.18)]"
                    : accent === "emerald"
                      ? "border-emerald-500/35 bg-emerald-500/[0.08] text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/[0.08] dark:text-emerald-300"
                      : "border-accent/30 bg-accent/[0.08] text-accent dark:bg-accent/[0.1]";
                return (
                  <div
                    key={label}
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em] backdrop-blur-md ${accentClass}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                );
              })}
            </m.div>
          </div>
        </div>

        {/* Slideshow dot controls — small, bottom-center, away from content */}
        <div
          role="tablist"
          aria-label="Hero slideshow"
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5"
        >
          {HERO_IMAGES.map((_, index) => {
            const isActive = index === activeIdx;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show hero image ${index + 1} of ${HERO_IMAGES.length}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIdx(index)}
                className={
                  "h-1.5 rounded-full transition-all duration-500 " +
                  (isActive
                    ? "w-9 bg-accent shadow-[0_0_10px_rgb(var(--tfc-accent)/0.55)]"
                    : "w-1.5 bg-foreground/30 hover:bg-foreground/55 dark:bg-white/40 dark:hover:bg-white/70")
                }
              />
            );
          })}
        </div>

        {/* Bottom-center "scroll" affordance */}
        <div
          className="pointer-events-none absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-foreground-subtle"
        >
          <span>{t("scrollLabel")}</span>
          <ArrowRight
            className="h-3 w-3 rotate-90"
            aria-hidden="true"
          />
        </div>
      </section>
    </LazyMotion>
  );
}
