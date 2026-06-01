// src/components/about/AboutGallerySection.tsx
import Image from "next/image";

import {
  type AboutGalleryImage,
  ABOUT_GALLERY_IMAGES,
  getLocalizedGalleryText,
} from "@/lib/about-gallery";
import { type Locale } from "@/lib/constants";
import { getGalleryImages } from "@/lib/cms/fetchers";
import type { GalleryImageView } from "@/lib/cms/types";

interface NormalizedItem {
  id: string;
  src: string;
  alt: string;
  title: string | null;
  caption: string | null;
  sortOrder: number;
}

interface AboutGallerySectionProps {
  locale: Locale;
  /** @deprecated Passed by about/page.tsx; ignored when DB returns data. */
  items?: AboutGalleryImage[];
}

export async function AboutGallerySection({
  locale,
}: AboutGallerySectionProps) {
  const items = await resolveItems(locale);

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
      <div className="rounded-[2.5rem] border border-border bg-surface p-6 shadow-brand md:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">
            {copy.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-black text-foreground md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-foreground-muted md:text-base">
            {copy.description}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <figure className="group overflow-hidden rounded-[2rem] border border-border bg-background shadow-brand">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={feature.src}
                alt={feature.alt}
                fill
                sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 48vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            </div>
            <figcaption className="space-y-2 px-5 py-5 text-foreground">
              {feature.title ? (
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  {feature.title}
                </p>
              ) : null}
              {feature.caption ? (
                <p className="text-sm leading-7 text-foreground-muted">
                  {feature.caption}
                </p>
              ) : null}
            </figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((item, index) => (
              <figure
                key={item.id}
                className={`group overflow-hidden rounded-[2rem] border border-border bg-surface shadow-brand ${
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
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 640px) 42vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                </div>
                <figcaption className="space-y-2 px-5 py-4">
                  {item.title ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                      {item.title}
                    </p>
                  ) : null}
                  {item.caption ? (
                    <p className="text-sm leading-7 text-foreground-muted">
                      {item.caption}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

async function resolveItems(locale: Locale): Promise<NormalizedItem[]> {
  try {
    const [heroImages, officeImages, galleryImages] = await Promise.all([
      getGalleryImages("about_hero", locale),
      getGalleryImages("about_office_presence", locale),
      getGalleryImages("about_gallery", locale),
    ]);

    const dbItems = [
      ...(heroImages ?? []),
      ...(officeImages ?? []),
      ...(galleryImages ?? []),
    ];

    if (dbItems.length > 0) {
      return dbItems
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(mapGalleryImageView);
    }
  } catch (error) {
    console.error({ action: "about_gallery_fetch_failed", error });
  }

  return ABOUT_GALLERY_IMAGES.filter((img) => img.usage !== "skip")
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((img) => mapAboutGalleryImage(img, locale));
}

function mapGalleryImageView(v: GalleryImageView): NormalizedItem {
  return {
    id: v.id,
    src: v.url,
    alt: v.alt,
    title: v.title,
    caption: v.caption,
    sortOrder: v.sortOrder,
  };
}

function mapAboutGalleryImage(
  img: AboutGalleryImage,
  locale: Locale,
): NormalizedItem {
  return {
    id: img.originalFilename,
    src: img.src,
    alt: getLocalizedGalleryText(img.alt, locale),
    title: getLocalizedGalleryText(img.title, locale),
    caption: getLocalizedGalleryText(img.caption, locale),
    sortOrder: img.sortOrder,
  };
}
