// src/components/home/GalleryClient.tsx
"use client";

import Image from "next/image";

import { motion, cubicBezier } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) },
  },
};

const cardSizes = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
];

const cardHeights = [
  "min-h-[22rem] md:min-h-[28rem]",
  "min-h-[13rem]",
  "min-h-[13rem]",
  "min-h-[13rem]",
  "min-h-[13rem]",
  "min-h-[14rem]",
];

export interface GalleryClientProps {
  images: { id: string; image: string }[];
}

export function GalleryClient({ images }: GalleryClientProps) {
  const t = useTranslations("home.gallery");
  const captions = t.raw("captions") as Record<string, string>;
  const galleryItems = images.map((item) => ({
    ...item,
    caption: captions[item.id] ?? item.id,
  }));

  return (
    <section className="relative overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(var(--tfc-gold)/0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--tfc-accent)/0.07)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="text-[10px] font-mono font-semibold tracking-[0.32em] text-foreground-subtle">
                05
              </span>
              <span className="h-px w-10 bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                {t("eyebrow")}
              </span>
            </div>
            <h2 className="display-copy mt-5 max-w-xl font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {galleryItems.length}+ destinations curated
            </span>
            <p className="max-w-sm text-sm leading-7 text-foreground-muted md:text-right">
              {t("description")}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid gap-4 md:grid-cols-4 md:grid-rows-[auto_auto_auto]"
        >
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              className={cardSizes[index]}
            >
              <div className="group relative overflow-hidden rounded-3xl border border-border shadow-brand transition duration-500 hover:border-gold/35 hover:shadow-[0_24px_60px_-20px_rgb(var(--tfc-accent)/0.4)]">
                <div className={`relative overflow-hidden ${cardHeights[index]}`}>
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_55%,rgb(var(--tfc-accent)/0.12))] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
                        <p className="truncate font-display text-base font-bold text-white md:text-lg">
                          {item.caption}
                        </p>
                      </div>
                      <span className="mt-2 block h-px w-10 origin-left scale-x-50 bg-gradient-to-r from-gold via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    </div>
                    <div className="shrink-0 translate-y-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {t("view")}
                    </div>
                  </div>

                  <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
