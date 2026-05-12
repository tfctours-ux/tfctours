"use client";

import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";

import { motion, cubicBezier } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import {
  AGENT_LOGIN_URL,
  BRAND,
  BRAND_IMAGES,
  FLIGHTS_URL,
  SERVICES,
  type Locale,
  getBaseUrl,
} from "@/lib/constants";
import { localizePath } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: cubicBezier(0.16, 1, 0.3, 1) } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

type IconProps = SVGProps<SVGSVGElement>;

function FooterArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function FooterShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 2.75c2.3 1.6 4.98 2.45 7.78 2.45v5.6c0 5.05-3.18 9.4-7.78 10.95C7.4 20.2 4.22 15.85 4.22 10.8V5.2c2.8 0 5.48-.85 7.78-2.45Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m8.9 12.15 2.05 2.05 4.35-4.45" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FooterPhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7.05 4.85c.42-.44 1.02-.64 1.61-.55l2.14.35c.72.12 1.28.7 1.37 1.43l.17 1.46c.06.5-.1 1-.45 1.36l-1.57 1.58a14.9 14.9 0 0 0 4.2 4.2l1.58-1.57c.36-.35.86-.51 1.36-.45l1.46.17c.73.09 1.3.65 1.43 1.37l.35 2.14c.1.6-.11 1.19-.55 1.61l-1.45 1.39c-.67.64-1.65.93-2.57.76C9.82 20.3 3.7 14.18 2.86 7.26c-.17-.92.12-1.9.76-2.57l1.39-1.45Z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
      <path d="M14.8 5.9a5.1 5.1 0 0 1 3.3 3.3" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
      <path d="M14.65 2.95a8.27 8.27 0 0 1 6.4 6.4" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" opacity=".65" />
    </svg>
  );
}

function FooterMailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="3" stroke="currentColor" strokeWidth="1.65" />
      <path d="m5.6 8.15 5.38 4.27a1.65 1.65 0 0 0 2.04 0l5.38-4.27" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FooterMapIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 21c3.75-4.22 5.62-7.48 5.62-9.8a5.62 5.62 0 1 0-11.24 0C6.38 13.52 8.25 16.78 12 21Z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
      <circle cx="12" cy="11.15" r="2.15" stroke="currentColor" strokeWidth="1.65" />
    </svg>
  );
}

function FooterMessageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 4c4.95 0 8.75 3.18 8.75 7.38 0 4.2-3.8 7.37-8.75 7.37-1.1 0-2.16-.16-3.14-.46L4.5 20l1.22-3.28A6.82 6.82 0 0 1 3.25 11.38C3.25 7.18 7.05 4 12 4Z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
      <path d="M8.6 11.4h.01M12 11.4h.01M15.4 11.4h.01" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function FooterFacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M13.4 20v-6.15h2.12l.42-2.56H13.4V9.65c0-.83.27-1.5 1.63-1.5H16V5.9c-.5-.08-1.32-.15-2.28-.15-2.38 0-3.95 1.25-3.95 4.1v1.44H7.7v2.56h2.07V20h3.63Z" fill="currentColor" />
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.4" opacity=".45" />
    </svg>
  );
}

function FooterInstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4.1" y="4.1" width="15.8" height="15.8" rx="5.2" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="12" cy="12" r="3.55" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="17.15" cy="6.95" r="1.05" fill="currentColor" />
    </svg>
  );
}

function FooterLinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.4" opacity=".45" />
      <path d="M8.05 10.2V16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M8.05 7.75h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M11.25 16v-5.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M11.25 12.2c0-1.35 1.05-2.3 2.45-2.3 1.5 0 2.25.98 2.25 2.82V16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FooterTwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4.75 5.4h3.6l3.2 4.25 3.95-4.25h3.5l-5.75 6.15 6.05 7.05h-3.6l-3.55-4.1-3.85 4.1H4.7l5.7-6.08L4.75 5.4Z" fill="currentColor" />
    </svg>
  );
}

const navLinks = [
  { key: "home", href: "/" },
  { key: "umrah", href: "/umrah" },
  { key: "tours", href: "/tours" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

const socialLinks = [
  {
    href: BRAND.social?.facebook ?? "#",
    label: "Facebook",
    Icon: FooterFacebookIcon,
  },
  {
    href: BRAND.social?.instagram ?? "#",
    label: "Instagram",
    Icon: FooterInstagramIcon,
  },
  {
    href: BRAND.social?.linkedin ?? "#",
    label: "LinkedIn",
    Icon: FooterLinkedInIcon,
  },
  {
    href: BRAND.social?.twitter ?? "#",
    label: "Twitter",
    Icon: FooterTwitterIcon,
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const serviceT = useTranslations("servicesData");
  const locale = useLocale() as Locale;

  const year = new Date().getFullYear();
  const mainOfficeAddress = BRAND.mainOffice ?? BRAND.office;
  const branchOfficeAddress = BRAND.branchOffice ?? BRAND.office;
  const mainOfficeDisplayAddress =
    locale === "ur"
      ? "آفس 36، 37 جناح اسٹیڈیم، گوجرانوالہ، پاکستان"
      : mainOfficeAddress;
  const branchOfficeDisplayAddress =
    locale === "ur"
      ? "پلازہ 18، نیلم بلاک ڈی سی کالونی، گوجرانوالہ، پاکستان"
      : branchOfficeAddress;
  const websiteHost = new URL(getBaseUrl()).host;
  const mainOfficeMapsHref = `https://maps.google.com/?q=${encodeURIComponent(mainOfficeAddress)}`;
  const branchOfficeMapsHref = `https://maps.google.com/?q=${encodeURIComponent(branchOfficeAddress)}`;

  return (
    <footer className="relative overflow-hidden bg-brand-black text-white">
      <div className="h-px w-full bg-[linear-gradient(90deg,transparent_0%,#8b0000_20%,#cc0000_50%,#c9a84c_80%,transparent_100%)]" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.1)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_65%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.9) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="relative border-b border-white/[0.06]"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-14 md:flex-row md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
              {t("tagline")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-black text-white md:text-4xl">
              {locale === "ur" ? "اپنے بہترین سفر کی منصوبہ بندی کے لیے تیار ہیں؟" : "Ready to plan your perfect journey?"}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/50">
              {t("officeHours")}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button
              href="https://wa.me/923041119786"
              variant="gold"
              size="lg"
              external
            >
              <FooterMessageIcon className="h-4 w-4" />
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
            src={BRAND_IMAGES.logo}
            alt={BRAND.companyName}
            width={160}
            height={56}
            className="h-auto w-36 object-contain brightness-0 invert sm:w-40"
            style={{ height: "auto" }}
          />

          <p className="max-w-xs text-sm leading-7 text-white/50">
            {t("description")}
          </p>

          <div className="inline-flex items-center gap-3 rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.08] px-3 py-2.5">
             
              <Image
                src="/images/iata-logo.png"
                alt={locale === "ur" ? "آئی اے ٹی اے لوگو" : "IATA logo"}
                width={130}
                height={90}
                className="h-auto max-h-32 w-auto object-contain"
              />
            
             
          </div>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/40 transition hover:border-brand-red/30 hover:bg-brand-red/10 hover:text-brand-red"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
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
                  className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <FooterArrowIcon className="h-3.5 w-3.5 text-brand-red opacity-0 transition-all group-hover:opacity-100" />
                  <span className="transition-transform group-hover:translate-x-0.5">
                    {serviceT(`${service.slug}.title`)}
                  </span>
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
                  className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <FooterArrowIcon className="h-3.5 w-3.5 text-brand-red opacity-0 transition-all group-hover:opacity-100" />
                  <span className="transition-transform group-hover:translate-x-0.5">
                    {navT(key)}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <a
                href={FLIGHTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <FooterArrowIcon className="h-3.5 w-3.5 text-brand-red transition-all group-hover:translate-x-0.5" />
                <span>{locale === "ur" ? "فلائٹس بک کریں" : "Book Flights"}</span>
              </a>
            </li>
            <li>
              <a
                href={AGENT_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <FooterArrowIcon className="h-3.5 w-3.5 text-brand-red transition-all group-hover:translate-x-0.5" />
                <span>{locale === "ur" ? "ایجنٹ پورٹل" : "Agent Portal"}</span>
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
              <a
                href={mainOfficeMapsHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-brand-red transition group-hover:border-brand-red/30 group-hover:bg-brand-red/10">
                  <FooterMapIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                    {locale === "ur" ? "مین آفس" : "Main Office"}
                  </p>
                  <p className="mt-0.5 text-sm leading-6 text-white/60 transition-colors group-hover:text-white">
                    {mainOfficeDisplayAddress}
                  </p>
                  <p dir="ltr" className="mt-2 font-body text-sm text-white/60 transition-colors group-hover:text-white">
                    {BRAND.mainPhone}
                  </p>
                  <p dir="ltr" className="font-body text-sm text-white/60 transition-colors group-hover:text-white">
                    {BRAND.phone}
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a
                href={branchOfficeMapsHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-brand-red transition group-hover:border-brand-red/30 group-hover:bg-brand-red/10">
                  <FooterMapIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                    {locale === "ur" ? "برانچ آفس" : "Branch Office"}
                  </p>
                  <p className="mt-0.5 text-sm leading-6 text-white/60 transition-colors group-hover:text-white">
                    {branchOfficeDisplayAddress}
                  </p>
                  <p dir="ltr" className="mt-2 font-body text-sm text-white/60 transition-colors group-hover:text-white">
                    {BRAND.branchPhone}
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a
                href={`mailto:${BRAND.email}`}
                className="group flex items-start gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-brand-red transition group-hover:border-brand-red/30 group-hover:bg-brand-red/10">
                  <FooterMailIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                    {locale === "ur" ? "ای میل" : "Email"}
                  </p>
                  <p dir="ltr" className="mt-0.5 break-all font-body text-sm text-white/60 transition-colors group-hover:text-white">
                    {BRAND.email}
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a
                href={`tel:${BRAND.uan.replace(/[^0-9]/g, "")}`}
                className="group flex items-start gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-brand-red transition group-hover:border-brand-red/30 group-hover:bg-brand-red/10">
                  <FooterPhoneIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">UAN</p>
                  <p dir="ltr" className="mt-0.5 font-body text-sm text-white/60 transition-colors group-hover:text-white">
                    {BRAND.uan}
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a
                href={`tel:${(BRAND.helpdesk ?? "").replace(/[^0-9]/g, "")}`}
                className="group flex items-start gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-brand-red transition group-hover:border-brand-red/30 group-hover:bg-brand-red/10">
                  <FooterPhoneIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                    {locale === "ur" ? "24/7 ہیلپ ڈیسک" : "24/7 Helpdesk"}
                  </p>
                  <p dir="ltr" className="mt-0.5 font-body text-sm text-white/60 transition-colors group-hover:text-white">
                    {BRAND.helpdesk}
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
            © {year} The Flight Centre Travel & Tours · {t("rights")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/[0.08] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-brand-gold">
              <FooterShieldIcon className="h-3 w-3" />
              {t("licensedBy")}
            </span>
            <span dir="ltr" className="font-body text-[10px] tracking-wide text-white/25">
              {websiteHost}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
