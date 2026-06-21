// src/components/layout/NavbarClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";

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
  UsersRound,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  AGENT_LOGIN_URL,
  BRAND,
  BRAND_IMAGES,
  FLIGHTS_URL,
  GROUP_TICKETS_B2B_URL,
  type Locale,
} from "@/lib/constants";
import { cn, localizePath, stripLocaleFromPath } from "@/lib/utils";

export type NavbarLink = {
  key: string;
  href: string;
  label: string;
  isExternal: boolean;
  sortOrder: number;
};

function isActivePath(currentPath: string, href: string) {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function NavbarClient({
  links,
  locale,
}: {
  links: NavbarLink[];
  locale: Locale;
}) {
  const common = useTranslations("common");
  const footerT = useTranslations("footer");
  const pathname = usePathname();
  const currentPath = stripLocaleFromPath(pathname);
  const contactLink = links.find((item) => item.href === "/contact");

  const [scrolled, setScrolled] = useState(false);
  const [scrolledFar, setScrolledFar] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolledRef = useRef(false);
  const scrolledFarRef = useRef(false);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        const nextScrolled = scrolledRef.current
          ? scrollY > 8
          : scrollY > 24;
        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled;
          setScrolled(nextScrolled);
        }

        const nextScrolledFar = scrolledFarRef.current
          ? scrollY > 40
          : scrollY > 96;
        if (nextScrolledFar !== scrolledFarRef.current) {
          scrolledFarRef.current = nextScrolledFar;
          setScrolledFar(nextScrolledFar);
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!drawerOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const node = drawerRef.current;
    if (node) {
      const focusable = node.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-50">
      <AnimatePresence>
        {!scrolledFar && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative overflow-hidden"
            style={{
              background:
                "linear-gradient(100deg, rgb(var(--tfc-accent-hover)) 0%, rgb(var(--tfc-accent)) 48%, rgb(var(--tfc-accent-hover)) 100%)",
            }}
          >
            <span
              className="pointer-events-none absolute inset-y-0 w-1/2 -translate-x-full animate-shimmer skew-x-[-20deg] bg-white/[0.06]"
              aria-hidden="true"
            />

            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 md:px-8">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path
                      d="M1.5 4L3 5.5L6.5 2.5"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-[9.5px] font-bold uppercase tracking-[0.24em] text-white/85">
                  {footerT("licensedBy")}
                </p>
              </div>

              <div className="flex items-center gap-3.5">
                <a
                  href={`tel:${BRAND.uan}`}
                  className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-white/90 transition-colors hover:text-white"
                >
                  <Phone className="h-2.5 w-2.5" />
                  <span dir="ltr">{BRAND.uan}</span>
                </a>
                <span className="h-3 w-px bg-white/25" />
                <a
                  href={`https://wa.me/92${BRAND.phone.replace(/\D/g, "").slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-white/90 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-2.5 w-2.5" />
                  {footerT("whatsappCta")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-transparent bg-surface-elevated/[0.97] shadow-[0_2px_20px_rgba(0,0,0,0.06),0_1px_0_rgb(var(--tfc-border)/0.06)] backdrop-blur-2xl dark:shadow-[0_4px_32px_rgba(0,0,0,0.55)]"
            : "border-b border-transparent bg-gradient-to-b from-background/50 to-background/5 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-0 md:px-8">
          <Link
            href={localizePath(locale)}
            className="group relative z-20 flex shrink-0 items-center py-3"
          >
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100",
              )}
            />
            <Image
              src={BRAND_IMAGES.logoDark}
              alt={BRAND.companyName}
              width={180}
              height={60}
              priority
              loading="eager"
              className="h-auto w-[120px] object-contain dark:hidden sm:w-[136px] md:w-[152px] lg:w-[164px]"
              style={{ width: "auto", height: "auto" }}
            />
            <Image
              src={BRAND_IMAGES.logo}
              alt=""
              aria-hidden="true"
              width={180}
              height={60}
              priority
              loading="eager"
              className="hidden h-auto w-[120px] object-contain dark:block sm:w-[136px] md:w-[152px] lg:w-[164px]"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          <span className="hidden h-8 w-px shrink-0 bg-border/40 md:block" />

          <nav className="hidden flex-1 items-center gap-0.5 md:flex">
            {links.map((item) => {
              const active = isActivePath(currentPath, item.href);
              const href = item.isExternal
                ? item.href
                : localizePath(locale, item.href);
              return (
                <Link
                  key={item.key}
                  href={href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group relative inline-flex items-center rounded-lg px-3.5 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.18em] transition-all duration-200",
                    active
                      ? "text-accent"
                      : "text-foreground-muted hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-lg transition-all duration-200",
                      active
                        ? "bg-accent/[0.07] dark:bg-accent/[0.12]"
                        : "bg-transparent group-hover:bg-foreground/[0.05]",
                    )}
                  />
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-accent/80 via-accent to-accent/80" />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={FLIGHTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/[0.06] px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-accent transition-all duration-200 hover:border-accent/50 hover:bg-accent/[0.12]"
            >
              <PlaneTakeoff className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              {locale === "ur" ? "فلائٹس" : "Flights"}
            </a>

            <a
              href={AGENT_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-foreground/15 bg-surface-elevated/60 px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-foreground-subtle transition-all duration-200 hover:border-accent/30 hover:bg-accent/[0.04] hover:text-foreground-muted dark:border-white/15"
            >
              <LogIn className="h-3 w-3" />
              {locale === "ur" ? "ایجنٹ" : "Agent"}
            </a>

            <span className="h-6 w-px bg-border/40" />
            <ThemeToggle />
            <LanguageToggle className="bg-surface-elevated text-foreground-muted hover:bg-surface hover:text-foreground" />

            <a
              href={GROUP_TICKETS_B2B_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-accent px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-accent-foreground shadow-[0_0_24px_rgb(var(--tfc-accent)/0.4)] transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_32px_rgb(var(--tfc-accent)/0.55)]"
              aria-label="Tickets B2B"
            >
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
              <UsersRound className="relative h-3.5 w-3.5" />
              <span className="relative">Tickets B2B</span>
              <ArrowUpRight className="relative h-3 w-3 opacity-70 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
          </div>

          <div className="ml-auto md:hidden">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={common("openMenu")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-surface-elevated text-foreground-muted transition hover:bg-surface hover:text-foreground"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              tabIndex={-1}
              className="fixed inset-0 z-[55] bg-black/75 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            <motion.aside
              ref={drawerRef as React.RefObject<HTMLElement>}
              role="dialog"
              aria-modal="true"
              aria-label={common("openMenu")}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-[340px] flex-col overflow-y-auto bg-background pb-8 rtl:left-0 rtl:right-auto md:hidden"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-foreground/10 bg-background/95 px-5 py-4 backdrop-blur dark:border-white/10">
                <Image
                  src={BRAND_IMAGES.logoDark}
                  alt={BRAND.companyName}
                  width={140}
                  height={46}
                  className="h-auto w-[116px] object-contain dark:hidden"
                  style={{ width: "auto", height: "auto" }}
                />
                <Image
                  src={BRAND_IMAGES.logo}
                  alt=""
                  aria-hidden="true"
                  width={140}
                  height={46}
                  className="hidden h-auto w-[116px] object-contain dark:block"
                  style={{ width: "auto", height: "auto" }}
                />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label={common("closeMenu")}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/15 bg-surface-elevated text-foreground-muted transition hover:border-accent/35 hover:text-foreground dark:border-white/15"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-5 px-5 pt-5">
                <div className="flex items-center justify-between rounded-xl border border-foreground/15 bg-surface-elevated px-4 py-3 dark:border-white/15">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-foreground-subtle">
                      {footerT("tagline")}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-foreground-muted">
                      The Flight Centre
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThemeToggle compact />
                    <LanguageToggle className="bg-surface text-foreground-muted hover:text-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={FLIGHTS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-accent/20 bg-accent/[0.07] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent transition hover:border-accent/35 hover:bg-accent/[0.12] dark:bg-accent/[0.12] dark:hover:bg-accent/[0.18]"
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
                    className="flex items-center justify-between rounded-xl border border-foreground/15 bg-surface-elevated px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground-muted transition hover:border-accent/25 hover:text-foreground/85 dark:border-white/15"
                  >
                    <span className="flex items-center gap-2">
                      <LogIn className="h-3.5 w-3.5" />
                      {locale === "ur" ? "ایجنٹ لاگ اِن" : "Agent Login"}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex-1 border-t border-foreground/15 dark:border-white/15" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground-subtle">
                    Pages
                  </span>
                  <span className="flex-1 border-t border-foreground/15 dark:border-white/15" />
                </div>

                <nav className="space-y-1">
                  {links.map((item) => {
                    const active = isActivePath(currentPath, item.href);
                    const href = item.isExternal
                      ? item.href
                      : localizePath(locale, item.href);
                    return (
                      <Link
                        key={item.key}
                        href={href}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noopener noreferrer" : undefined}
                        onClick={() => setDrawerOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl border px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] transition",
                          active
                            ? "border-accent/20 bg-accent/[0.07] text-accent dark:bg-accent/[0.12]"
                            : "border-foreground/15 bg-surface-elevated text-foreground-muted hover:border-accent/25 hover:text-foreground/85 dark:border-white/15",
                        )}
                      >
                        {item.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                      </Link>
                    );
                  })}
                </nav>

                <div className="rounded-xl border border-foreground/15 bg-surface-elevated p-4 dark:border-white/15">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-foreground-subtle">
                    {footerT("contactTitle")}
                  </p>
                  <div className="mt-3 space-y-2.5">
                    <a
                      href={`tel:${BRAND.uan}`}
                      className="flex items-center gap-2.5 text-[12px] text-foreground-muted transition hover:text-foreground"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/[0.15]">
                        <Phone className="h-3 w-3 text-accent" />
                      </span>
                      <span dir="ltr">{BRAND.uan}</span>
                    </a>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="flex items-center gap-2.5 truncate text-[12px] text-foreground-muted transition hover:text-foreground"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/[0.15]">
                        <MessageCircle className="h-3 w-3 text-accent" />
                      </span>
                      {BRAND.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2 px-5">
                <a
                  href={GROUP_TICKETS_B2B_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-foreground shadow-[0_0_20px_rgb(var(--tfc-accent)/0.35)] transition hover:bg-accent-hover hover:shadow-[0_0_28px_rgb(var(--tfc-accent)/0.5)]"
                  aria-label="Tickets B2B"
                >
                  <UsersRound className="h-4 w-4" />
                  Tickets B2B
                </a>
                <a
                  href={`tel:${BRAND.uan.replace(/[^0-9]/g, "")}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-surface-elevated px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-muted transition hover:border-accent/25 hover:text-foreground dark:border-white/15"
                >
                  <Phone className="h-4 w-4" />
                  {common("callNow")}
                  {" - "}
                  <span dir="ltr" className="font-body">
                    {BRAND.uan}
                  </span>
                </a>
                <Link
                  href={localizePath(locale, contactLink?.href ?? "/contact")}
                  onClick={() => setDrawerOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-transparent px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground-subtle transition hover:border-accent/25 hover:text-foreground-muted dark:border-white/15"
                >
                  {contactLink?.label ?? "Contact"}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
