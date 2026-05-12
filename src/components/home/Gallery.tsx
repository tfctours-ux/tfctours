"use client";

import Image from "next/image";

import { motion, cubicBezier } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLocale } from "next-intl";

import { GALLERY_IMAGES, type Locale } from "@/lib/constants";

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

const galleryCaptions = {
  en: {
    dubai: "Dubai, UAE — Tours & Visit Visas",
    malaysia: "Kuala Lumpur, Malaysia — Tour Packages",
    thailand: "Thailand — Beach & Culture Tours",
    singapore: "Singapore — City Tour Packages",
    bahrain: "Bahrain — Visit Visa & Tours",
    azerbaijan: "Azerbaijan — Scenic Tour Packages",
  },
  ur: {
    dubai: "دبئی، یو اے ای — ٹورز اور وزٹ ویزا",
    malaysia: "کوالالمپور، ملائیشیا — ٹور پیکجز",
    thailand: "تھائی لینڈ — بیچ اور کلچر ٹورز",
    singapore: "سنگاپور — سٹی ٹور پیکجز",
    bahrain: "بحرین — وزٹ ویزا اور ٹورز",
    azerbaijan: "آذربائیجان — خوبصورت ٹور پیکجز",
  },
} as const;

const galleryCopy = {
  en: {
    eyebrow: "Popular Destinations",
    title: "Where will your journey take you?",
    description:
      "From Dubai's skyline to Malaysia's rainforests — The Flight Centre connects you to the world's most sought-after destinations.",
    view: "View",
  },
  ur: {
    eyebrow: "مقبول منزلیں",
    title: "آپ کا اگلا سفر کہاں تک جائے گا؟",
    description:
      "دبئی کی اسکائی لائن سے ملائیشیا کے سرسبز مناظر تک، دی فلائٹ سینٹر آپ کو دنیا کی پسندیدہ منزلوں سے جوڑتا ہے۔",
    view: "دیکھیں",
  },
} as const;

export function Gallery() {
  const locale = useLocale() as Locale;
  const copy = galleryCopy[locale];
  const galleryItems = GALLERY_IMAGES.map((item) => ({
    ...item,
    caption: galleryCaptions[locale][item.id as keyof typeof galleryCaptions.en] ?? item.id,
  }));

  return (
    <section className="relative overflow-hidden bg-brand-light px-6 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.07)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.06)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-brand-red" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red">
                {copy.eyebrow}
              </span>
            </div>
            <h2 className="display-copy mt-4 max-w-xl font-display text-4xl font-black leading-tight text-brand-black md:text-5xl">
              {copy.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-zinc-500 md:text-right">
            {copy.description}
          </p>
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
              <div className="group relative overflow-hidden rounded-3xl border border-black/[0.07] shadow-brand">
                <div className={`relative overflow-hidden ${cardHeights[index]}`}>
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-brand-gold" />
                        <p className="font-display text-base font-bold text-white md:text-lg">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                    <div className="translate-y-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {copy.view}
                    </div>
                  </div>

                  <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-gold via-brand-red to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
