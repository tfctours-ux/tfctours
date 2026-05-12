"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight, Home } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";
import { type Locale } from "@/lib/constants";
import { localizePath, stripLocaleFromPath } from "@/lib/utils";

export function Breadcrumb() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("breadcrumbs");
  const strippedPath = stripLocaleFromPath(pathname);
  const segments = strippedPath.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const items = [
    {
      label: t("home"),
      href: localizePath(locale),
    },
    ...segments.map((segment, index) => ({
      label: t(segment),
      href: localizePath(locale, `/${segments.slice(0, index + 1).join("/")}`),
    })),
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={items.map((item) => ({ name: item.label, path: item.href }))}
      />
      <nav
        aria-label={t("aria")}
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-2 px-6 pt-8 text-xs uppercase tracking-[0.14em] text-white/55"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={item.href} className="inline-flex items-center gap-2">
              {index === 0 ? (
                <Home className="h-4 w-4 text-brand-red" />
              ) : (
                <ChevronRight className="h-4 w-4 text-brand-red rtl:rotate-180" />
              )}
              {isLast ? (
                <span className="font-semibold text-brand-red">{item.label}</span>
              ) : (
                <Link href={item.href} className="transition hover:text-brand-red">
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
