// src/components/shared/LanguageToggle.tsx
"use client";

import { useTransition } from "react";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import { type AppLocale } from "@/i18n";
import { cn, localizePath, stripLocaleFromPath } from "@/lib/utils";

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");
  const [isPending, startTransition] = useTransition();

  function toggle() {
    const next: AppLocale = locale === "en" ? "ur" : "en";
    const normalizedPath = stripLocaleFromPath(pathname);
    const target = localizePath(next, normalizedPath);

    // Mirror next-intl's NEXT_LOCALE cookie so the middleware doesn't
    // bounce the user back to the previous locale on the next request.
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;

    startTransition(() => {
      router.replace(target);
    });
  }

  const nextLabel = locale === "en" ? "اردو" : "EN";

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      aria-label={t("switchLocale")}
      title={nextLabel}
      className={cn(
        "group inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200",
        "bg-surface-elevated text-foreground-muted",
        "hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isPending && "pointer-events-none opacity-50",
        className,
      )}
    >
      <Globe className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
