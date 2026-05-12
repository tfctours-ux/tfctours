import Image from "next/image";

import {
  type AboutGalleryImage,
  getLocalizedGalleryText,
} from "@/lib/about-gallery";
import { type Locale } from "@/lib/constants";

interface AboutGallerySectionProps {
  locale: Locale;
  items: AboutGalleryImage[];
}

export function AboutGallerySection({
  locale,
  items,
}: AboutGallerySectionProps) {
  const [feature, ...cards] = items;

  if (!feature) {
    return null;
  }

  const copy =
    locale === "ur"
      ? {
          eyebrow: "دی فلائٹ سنٹر کے اندر",
          title: "ہماری ٹیم، فرنٹ ڈیسک اور روزمرہ کام کرنے کا ماحول",
          description:
            "یہ تصاویر اُن اصل جگہوں اور لوگوں کو دکھاتی ہیں جہاں سے ہم روزانہ کلائنٹس کی رہنمائی، بکنگ اور مشاورت سنبھالتے ہیں۔",
        }
      : {
          eyebrow: "Inside The Flight Centre",
          title: "Our team, front desk and day-to-day working environment",
          description:
            "These images show the real spaces and people behind our daily client support, booking coordination and consultation work.",
        };

  return (
    <section className="mx-auto mt-12 max-w-7xl px-6">
      <div className="rounded-[2.5rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-brand-red">
            {copy.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-black text-brand-black md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
            {copy.description}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <figure className="group overflow-hidden rounded-[2rem] border border-black/10 bg-brand-black shadow-brand">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={feature.src}
                alt={getLocalizedGalleryText(feature.alt, locale)}
                fill
                sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 48vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            </div>
            <figcaption className="space-y-2 px-5 py-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">
                {getLocalizedGalleryText(feature.title, locale)}
              </p>
              <p className="text-sm leading-7 text-white/72">
                {getLocalizedGalleryText(feature.caption, locale)}
              </p>
            </figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((item, index) => (
              <figure
                key={item.originalFilename}
                className={`group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-brand ${
                  index === cards.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    index === cards.length - 1 ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={getLocalizedGalleryText(item.alt, locale)}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 640px) 42vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                </div>
                <figcaption className="space-y-2 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">
                    {getLocalizedGalleryText(item.title, locale)}
                  </p>
                  <p className="text-sm leading-7 text-zinc-600">
                    {getLocalizedGalleryText(item.caption, locale)}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
