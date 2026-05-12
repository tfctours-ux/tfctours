"use client";

import { useTransition } from "react";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type AppLocale } from "@/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("switchLocale")}
      className={cn(
        "relative inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-sm text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]",
        className,
      )}
    >
      {locales.map((item) => {
        const active = item === locale;

        return (
          <button
            key={item}
            type="button"
            disabled={active || isPending}
            onClick={() => {
              if (active) {
                return;
              }

              startTransition(() => {
                router.replace(pathname, { locale: item });
              });
            }}
            className={cn(
              "relative z-10 min-w-[4.5rem] rounded-full px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] transition",
              active ? "text-brand-black" : "text-white/70 hover:text-white",
              item === "ur" && "font-urdu normal-case tracking-normal",
            )}
          >
            {active ? (
              <motion.span
                layoutId="locale-pill"
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                className="absolute inset-0 rounded-full bg-brand-light shadow-[0_10px_30px_rgba(255,255,255,0.12)]"
              />
            ) : null}
            <span className="relative z-10">
              {item === "en" ? t("english") : t("urdu")}
            </span>
          </button>
        );
      })}
    </div>
  );
}
