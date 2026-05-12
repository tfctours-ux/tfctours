"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  LogIn,
  Menu,
  MessageCircle,
  Phone,
  PlaneTakeoff,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { LanguageToggle } from "@/components/shared/LanguageToggle";
import {
  AGENT_LOGIN_URL,
  BRAND,
  BRAND_IMAGES,
  FLIGHTS_URL,
  NAV_LINKS,
  type Locale,
} from "@/lib/constants";
import { cn, localizePath, stripLocaleFromPath } from "@/lib/utils";

const navItems = NAV_LINKS;

function isActivePath(currentPath: string, href: string) {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function Navbar() {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const footerT = useTranslations("footer");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const currentPath = stripLocaleFromPath(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [scrolledFar, setScrolledFar] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrolledFar(window.scrollY > 72);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* ── Top utility bar ─────────────────────────────────────── */}
      <AnimatePresence>
        {!scrolledFar && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
            style={{ background: "linear-gradient(90deg, #b91c1c 0%, #991b1b 100%)" }}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-1.5 md:px-8">
              {/* License badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-white/75">
                  {t("licenses")}
                </p>
              </div>

              {/* Contact links */}
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${BRAND.uan}`}
                  className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-white/85 transition-colors hover:text-white"
                >
                  <Phone className="h-2.5 w-2.5" />
                  <span dir="ltr">{BRAND.uan}</span>
                </a>
                <span className="h-3 w-px bg-white/20" />
                <a
                  href={`https://wa.me/92${BRAND.phone.replace(/\D/g, "").slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-white/85 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-2.5 w-2.5" />
                  {footerT("whatsappCta")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main nav bar ────────────────────────────────────────── */}
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-white/[0.07] bg-[rgba(6,6,6,0.92)] shadow-[0_4px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : "border-b border-transparent bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-0 md:px-8">

          {/* ── Logo ── */}
          <Link
            href={localizePath(locale)}
            className="group relative z-20 shrink-0 flex items-center py-3"
          >
            {/* Red accent line beneath logo on hover */}
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-brand-red transition-transform duration-300 group-hover:scale-x-100",
              )}
            />
            <Image
              src={BRAND_IMAGES.logo}
              alt={BRAND.companyName}
              width={180}
              height={60}
              priority
              loading="eager"
              className="h-auto w-[120px] object-contain sm:w-[136px] md:w-[152px] lg:w-[164px]"
              style={{ height: "auto" }}
            />
          </Link>

          {/* ── Divider ── */}
          <span className="hidden h-9 w-px shrink-0 bg-white/[0.09] md:block" />

          {/* ── Desktop nav links ── */}
          <nav className="hidden flex-1 items-center gap-0.5 md:flex">
            {navItems.map((item) => {
              const active = isActivePath(currentPath, item.href);
              return (
                <Link
                  key={item.key}
                  href={localizePath(locale, item.href)}
                  className={cn(
                    "group relative inline-flex items-center rounded-lg px-3.5 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.18em] transition-all duration-200",
                    active
                      ? "text-brand-red"
                      : "text-white/55 hover:text-white/90",
                  )}
                >
                  {/* Hover / active background pill */}
                  <span
                    className={cn(
                      "absolute inset-0 rounded-lg transition-all duration-200",
                      active
                        ? "bg-brand-red/10"
                        : "bg-transparent group-hover:bg-white/[0.05]",
                    )}
                  />
                  {/* Active indicator bottom line */}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] rounded-full bg-brand-red/60" />
                  )}
                  <span className="relative">{t(item.key)}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop right action cluster ── */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Flights pill */}
            <a
              href={FLIGHTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-lg border border-brand-red/30 bg-brand-red/8 px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-brand-red transition-all duration-200 hover:border-brand-red/55 hover:bg-brand-red/14"
            >
              <PlaneTakeoff className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
              {locale === "ur" ? "فلائٹس" : "Flights"}
            </a>

            {/* Agent login */}
            <a
              href={AGENT_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.09] px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/40 transition-all duration-200 hover:border-white/20 hover:text-white/75"
            >
              <LogIn className="h-3 w-3" />
              {locale === "ur" ? "ایجنٹ" : "Agent"}
            </a>

            {/* Divider */}
            <span className="h-6 w-px bg-white/[0.09]" />

            {/* Language toggle */}
            <LanguageToggle className="border-white/[0.09] bg-white/[0.04] text-white/60 hover:border-white/20 hover:bg-white/[0.08] hover:text-white" />

            {/* WhatsApp CTA — primary */}
            <a
              href={`https://wa.me/92${BRAND.phone.replace(/\D/g, "").slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-1.5 overflow-hidden rounded-lg bg-brand-red px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(185,28,28,0.35)] transition-all duration-200 hover:shadow-[0_0_28px_rgba(185,28,28,0.5)]"
            >
              {/* Shine sweep */}
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
              <MessageCircle className="relative h-3.5 w-3.5" />
              <span className="relative">{footerT("whatsappCta")}</span>
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <div className="ml-auto md:hidden">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={common("openMenu")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-brand-red/30 hover:bg-white/[0.09] hover:text-white"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[55] bg-black/75 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-[340px] flex-col overflow-y-auto bg-[#080808] pb-8 md:hidden rtl:left-0 rtl:right-auto"
            >
              {/* Drawer header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.07] bg-[#080808]/95 px-5 py-4 backdrop-blur">
                <Image
                  src={BRAND_IMAGES.logo}
                  alt={BRAND.companyName}
                  width={140}
                  height={46}
                  className="h-auto w-[116px] object-contain"
                  style={{ height: "auto" }}
                />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label={common("closeMenu")}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-white/20 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex flex-1 flex-col gap-5 px-5 pt-5">
                {/* Language + tagline card */}
                <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/30">
                      {footerT("tagline")}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-white/55">
                      The Flight Centre
                    </p>
                  </div>
                  <LanguageToggle className="border-white/10 bg-white/[0.05] text-white/60 hover:text-white" />
                </div>

                {/* Quick actions */}
                <div className="space-y-2">
                  <a
                    href={FLIGHTS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-brand-red/25 bg-brand-red/10 px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red transition hover:border-brand-red/40 hover:bg-brand-red/15"
                  >
                    <span className="flex items-center gap-2">
                      <PlaneTakeoff className="h-3.5 w-3.5" />
                      {locale === "ur" ? "فلائٹس" : "Flights"}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </a>
                  <a
                    href={AGENT_LOGIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60 transition hover:border-white/14 hover:text-white/85"
                  >
                    <span className="flex items-center gap-2">
                      <LogIn className="h-3.5 w-3.5" />
                      {locale === "ur" ? "ایجنٹ لاگ اِن" : "Agent Login"}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                  </a>
                </div>

                {/* Divider label */}
                <div className="flex items-center gap-3">
                  <span className="flex-1 border-t border-white/[0.07]" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/25">
                    Pages
                  </span>
                  <span className="flex-1 border-t border-white/[0.07]" />
                </div>

                {/* Nav pages */}
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const active = isActivePath(currentPath, item.href);
                    return (
                      <Link
                        key={item.key}
                        href={localizePath(locale, item.href)}
                        onClick={() => setDrawerOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl border px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] transition",
                          active
                            ? "border-brand-red/25 bg-brand-red/10 text-brand-red"
                            : "border-white/[0.07] bg-white/[0.03] text-white/60 hover:border-white/12 hover:text-white/85",
                        )}
                      >
                        {t(item.key)}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                      </Link>
                    );
                  })}
                </nav>

                {/* Contact card */}
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/30">
                    {footerT("contactTitle")}
                  </p>
                  <div className="mt-3 space-y-2.5">
                    <a
                      href={`tel:${BRAND.uan}`}
                      className="flex items-center gap-2.5 text-[12px] text-white/60 transition hover:text-white"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-red/15">
                        <Phone className="h-3 w-3 text-brand-red" />
                      </span>
                      <span dir="ltr">{BRAND.uan}</span>
                    </a>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="flex items-center gap-2.5 truncate text-[12px] text-white/60 transition hover:text-white"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-red/15">
                        <MessageCircle className="h-3 w-3 text-brand-red" />
                      </span>
                      {BRAND.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Drawer footer CTAs */}
              <div className="mt-6 space-y-2 px-5">
                <a
                  href={`https://wa.me/92${BRAND.phone.replace(/\D/g, "").slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(185,28,28,0.4)] transition hover:shadow-[0_0_28px_rgba(185,28,28,0.55)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  {footerT("whatsappCta")}
                </a>
                <a
                  href={`tel:${BRAND.uan.replace(/[^0-9]/g, "")}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  {common("callNow")}
                  {" — "}
                  <span dir="ltr" className="font-body">
                    {BRAND.uan}
                  </span>
                </a>
                <Link
                  href={localizePath(locale, "/contact")}
                  onClick={() => setDrawerOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-transparent px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 transition hover:border-white/14 hover:text-white/65"
                >
                  {t("contact")}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
