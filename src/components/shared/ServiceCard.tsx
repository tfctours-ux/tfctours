// src/components/shared/ServiceCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  MoonStar,
  Plane,
  ShieldCheck,
  Stamp,
  Ticket,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { type Locale, type ServiceConfig } from "@/lib/constants";
import { cn, localizePath } from "@/lib/utils";

const serviceIcons = {
  tickets: Ticket,
  visa: Stamp,
  tour: Plane,
  hotel: Building2,
  insurance: ShieldCheck,
  umrah: MoonStar,
};

interface ServiceCardProps {
  locale: Locale;
  service: ServiceConfig;
  index?: number;
}

export function ServiceCard({ locale, service, index = 0 }: ServiceCardProps) {
  const t = useTranslations("servicesData");
  const common = useTranslations("common");
  const Icon = serviceIcons[service.icon];
  const href = localizePath(locale, service.href);

  const isFeatured = service.featured;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={cn("h-full", isFeatured && "sm:col-span-2 lg:col-span-1")}
    >
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface-elevated shadow-brand ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_80px_rgb(var(--tfc-scrim)/0.22)]"
      >
        {/* Image panel */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={service.image}
            alt={t(`${service.slug}.title`)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-85 transition duration-300 group-hover:opacity-75",
              service.accentClass,
            )}
          />

          {/* Featured ribbon */}
          {isFeatured && (
            <div className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-foreground">
              {locale === "ur" ? "نمایاں" : "Featured"}
            </div>
          )}

          {/* Icon + tag row */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent-foreground/20 bg-scrim/30 text-accent-foreground backdrop-blur-md">
                <Icon className="h-5 w-5" />
              </span>
              <span className="rounded-full border border-accent-foreground/20 bg-accent-foreground/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-foreground backdrop-blur-sm">
                {t(`${service.slug}.tag`)}
              </span>
            </div>
            {/* Arrow hint */}
            <span className="flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-accent-foreground/15 text-accent-foreground opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold leading-snug text-foreground">
              {t(`${service.slug}.title`)}
            </h3>
            <p className="mt-2.5 text-sm leading-7 text-foreground-muted">
              {t(`${service.slug}.summary`)}
            </p>
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent transition-colors group-hover:text-accent-hover">
              {locale === "ur" ? common("readMore") : "Learn More"}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Shimmer effect on hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </Link>
    </motion.article>
  );
}
