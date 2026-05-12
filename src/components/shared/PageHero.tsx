import Image from "next/image";
import type { ReactNode } from "react";

import { type Locale } from "@/lib/constants";
import { localizePath } from "@/lib/utils";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface PageHeroProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  aside?: ReactNode;
}

export function PageHero({
  locale,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  aside,
}: PageHeroProps) {
  return (
    <section className="mx-auto mt-6 grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-[1.1fr_0.9fr]">
      {/* ── Left: text panel ── */}
      <div className="overflow-hidden rounded-[2.5rem] bg-brand-mesh p-8 text-white shadow-glow md:p-12">
        <Badge className="border-white/15 bg-white/10 text-white">{eyebrow}</Badge>
        <h1 className="display-copy mt-6 max-w-3xl font-display text-4xl font-black leading-tight text-white md:text-5xl xl:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
          {description}
        </p>
        {(primaryHref || secondaryHref) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryHref && primaryLabel ? (
              <Button
                href={
                  primaryHref.startsWith("/")
                    ? localizePath(locale, primaryHref)
                    : primaryHref
                }
                showArrow
              >
                {primaryLabel}
              </Button>
            ) : null}
            {secondaryHref && secondaryLabel ? (
              <Button
                href={
                  secondaryHref.startsWith("/")
                    ? localizePath(locale, secondaryHref)
                    : secondaryHref
                }
                variant="outline"
                className="border-white/20 bg-white/8 text-white hover:border-white hover:bg-white hover:text-brand-black"
              >
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        )}
      </div>

      {/* ── Right: image fills the full card, aside overlays on top ── */}
      <div className="relative overflow-hidden rounded-[2.5rem] shadow-glow">
        {/* Full-bleed image — no white bg, no min-height gap */}
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />

        {/* Dark scrim so overlaid text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Minimum height so the card has body when there's no aside */}
        <div className="relative min-h-[22rem] lg:min-h-[28rem]" />

        {/* Aside content pinned to the bottom */}
        {aside && (
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">{aside}</div>
        )}
      </div>
    </section>
  );
}