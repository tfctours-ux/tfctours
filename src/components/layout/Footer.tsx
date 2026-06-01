// src/components/layout/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cubicBezier, motion } from "framer-motion";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import {
  AGENT_LOGIN_URL,
  BRAND_IMAGES,
  FLIGHTS_URL,
  SERVICES,
  type BrandProfile,
  type Locale,
  getBaseUrl,
} from "@/lib/constants";
import { localizePath } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: cubicBezier(0.16, 1, 0.3, 1) },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const navLinks = [
  { key: "home", href: "/" },
  { key: "umrah", href: "/umrah" },
  { key: "tours", href: "/tours" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Footer({ brand }: { brand: BrandProfile }) {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const serviceT = useTranslations("servicesData");
  const locale = useLocale() as Locale;

  const year = new Date().getFullYear();
  const mainOfficeAddress = brand.mainOffice ?? brand.office;
  const branchOfficeAddress = brand.branchOffice ?? brand.office;
  const mainOfficeDisplayAddress =
    locale === "ur" && brand.mainOfficeUr
      ? brand.mainOfficeUr
      : mainOfficeAddress;
  const branchOfficeDisplayAddress =
    locale === "ur" && brand.branchOfficeUr
      ? brand.branchOfficeUr
      : branchOfficeAddress;
  const websiteHost = new URL(getBaseUrl()).host;
  const mainOfficeMapsHref = `https://maps.google.com/?q=${encodeURIComponent(
    mainOfficeAddress,
  )}`;
  const branchOfficeMapsHref = `https://maps.google.com/?q=${encodeURIComponent(
    branchOfficeAddress,
  )}`;
  const socialLinks = [
    { href: brand.social?.facebook, label: "Facebook" },
    { href: brand.social?.instagram, label: "Instagram" },
    { href: brand.social?.linkedin, label: "LinkedIn" },
    { href: brand.social?.twitter, label: "Twitter" },
    { href: brand.social?.tiktok, label: "TikTok" },
  ].filter((item): item is { href: string; label: string } => Boolean(item.href));

  return (
    <footer className="relative overflow-hidden bg-background text-foreground">
      <div className="h-px w-full bg-[linear-gradient(90deg,transparent_0%,#8b0000_20%,#cc0000_50%,#c9a84c_80%,transparent_100%)]" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--tfc-accent)/0.06)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--tfc-gold)/0.05)_0%,transparent_70%)] blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="relative border-b border-border"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-14 md:flex-row md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
              {brand.tagline || t("tagline")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-black text-foreground md:text-4xl">
              {locale === "ur"
                ? "اپنے بہترین سفر کی منصوبہ بندی کے لیے تیار ہیں؟"
                : "Ready to plan your perfect journey?"}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-foreground-muted">
              {t("officeHours")}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button
              href={`https://wa.me/${brand.phone.replace(/[^0-9]/g, "")}`}
              variant="gold"
              size="lg"
              external
            >
              {t("whatsappCta")}
            </Button>
            <Button
              href={localizePath(locale, "/contact")}
              variant="outline"
              size="lg"
            >
              {navT("contact")}
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr]"
      >
        <motion.div variants={fadeUp} className="space-y-7">
          <Image
            src={brand.logoDarkUrl ?? BRAND_IMAGES.logoDark}
            alt={brand.companyName}
            width={160}
            height={56}
            className="h-auto w-36 object-contain sm:w-40 dark:hidden"
            style={{ width: "auto", height: "auto" }}
          />
          <Image
            src={brand.logoLightUrl ?? BRAND_IMAGES.logo}
            alt=""
            aria-hidden="true"
            width={160}
            height={56}
            className="hidden h-auto w-36 object-contain sm:w-40 dark:block"
            style={{ width: "auto", height: "auto" }}
          />

          <p className="max-w-xs text-sm leading-7 text-foreground-muted">
            {t("description")}
          </p>

          {brand.iata !== false ? (
            <div className="inline-flex items-center gap-3 rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.08] px-3 py-2.5">
              <Image
                src="/images/iata-logo.png"
                alt={locale === "ur" ? "IATA logo" : "IATA logo"}
                width={130}
                height={90}
                className="h-auto max-h-32 w-auto object-contain invert contrast-125 dark:invert-0 dark:contrast-100"
              />
            </div>
          ) : null}

          {socialLinks.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-foreground-muted transition hover:border-accent/30 hover:bg-accent-soft hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
            {t("servicesTitle")}
          </p>
          <ul className="mt-6 space-y-2.5">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={localizePath(locale, service.href)}
                  className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  {serviceT(`${service.slug}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
            {t("quickLinks")}
          </p>
          <ul className="mt-6 space-y-2.5">
            {navLinks.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={localizePath(locale, href)}
                  className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  {navT(key)}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={FLIGHTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {locale === "ur" ? "فلائٹس بک کریں" : "Book Flights"}
              </a>
            </li>
            <li>
              <a
                href={AGENT_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {locale === "ur" ? "ایجنٹ پورٹل" : "Agent Portal"}
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
            {t("contactTitle")}
          </p>
          <ul className="mt-6 space-y-4">
            <li>
              <ContactLink href={mainOfficeMapsHref} icon={<MapPin size={15} />}>
                <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
                  {locale === "ur" ? "مین آفس" : "Main Office"}
                </span>
                <span className="mt-0.5 block text-sm leading-6 text-foreground-muted">
                  {mainOfficeDisplayAddress}
                </span>
                {brand.mainPhone ? (
                  <span dir="ltr" className="mt-2 block font-body text-sm">
                    {brand.mainPhone}
                  </span>
                ) : null}
              </ContactLink>
            </li>
            {branchOfficeAddress ? (
              <li>
                <ContactLink
                  href={branchOfficeMapsHref}
                  icon={<MapPin size={15} />}
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
                    {locale === "ur" ? "برانچ آفس" : "Branch Office"}
                  </span>
                  <span className="mt-0.5 block text-sm leading-6 text-foreground-muted">
                    {branchOfficeDisplayAddress}
                  </span>
                  {brand.branchPhone ? (
                    <span dir="ltr" className="mt-2 block font-body text-sm">
                      {brand.branchPhone}
                    </span>
                  ) : null}
                </ContactLink>
              </li>
            ) : null}
            <li>
              <ContactLink href={`mailto:${brand.email}`} icon={<Mail size={15} />}>
                <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
                  {locale === "ur" ? "ای میل" : "Email"}
                </span>
                <span dir="ltr" className="mt-0.5 block break-all font-body text-sm">
                  {brand.email}
                </span>
              </ContactLink>
            </li>
            <li>
              <ContactLink
                href={`tel:${brand.phone.replace(/[^0-9]/g, "")}`}
                icon={<Phone size={15} />}
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
                  {locale === "ur" ? "فون" : "Phone"}
                </span>
                <span dir="ltr" className="mt-0.5 block font-body text-sm">
                  {brand.phone}
                </span>
              </ContactLink>
            </li>
            {brand.uan ? (
              <li>
                <ContactLink
                  href={`tel:${brand.uan.replace(/[^0-9]/g, "")}`}
                  icon={<Phone size={15} />}
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
                    UAN
                  </span>
                  <span dir="ltr" className="mt-0.5 block font-body text-sm">
                    {brand.uan}
                  </span>
                </ContactLink>
              </li>
            ) : null}
          </ul>
        </motion.div>
      </motion.div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-foreground-subtle">
            © {year} {brand.companyName} · {t("rights")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {brand.iata !== false ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/[0.08] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-brand-gold">
                <ShieldCheck size={12} />
                {t("licensedBy")}
              </span>
            ) : null}
            <span dir="ltr" className="font-body text-[10px] tracking-wide text-foreground-subtle">
              {websiteHost}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactLink({
  children,
  href,
  icon,
}: {
  children: ReactNode;
  href: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex items-start gap-3 transition-colors hover:text-foreground"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-elevated text-accent transition group-hover:border-accent/30 group-hover:bg-accent-soft">
        {icon}
      </span>
      <span className="text-foreground-muted transition-colors group-hover:text-foreground">
        {children}
      </span>
    </a>
  );
}
