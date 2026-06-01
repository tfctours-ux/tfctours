// src/components/shared/UmrahPackageImageRow.tsx
import Image from "next/image";

import { type Locale } from "@/lib/constants";
import { cn } from "@/lib/utils";

const umrahImages = [
  {
    src: "/images/umrah/3-star-umrah.webp",
    title: {
      en: "3 Star Umrah",
      ur: "3 اسٹار عمرہ",
    },
    description: {
      en: "Practical hotel options with complete visa, ticket and transport support.",
      ur: "مناسب ہوٹل آپشنز، ویزا، ٹکٹ اور ٹرانسپورٹ سپورٹ کے ساتھ۔",
    },
  },
  {
    src: "/images/umrah/4-star-umrah-packages-pakistan.webp",
    title: {
      en: "4 Star Package",
      ur: "4 اسٹار پیکج",
    },
    description: {
      en: "Balanced comfort for families who want a smoother stay in Makkah and Madinah.",
      ur: "فیملیز کے لیے مکہ اور مدینہ میں آرام دہ قیام کا متوازن انتخاب۔",
    },
  },
  {
    src: "/images/umrah/5-star-umrah-packages-pakistan.webp",
    title: {
      en: "5 Star Package",
      ur: "5 اسٹار پیکج",
    },
    description: {
      en: "Premium Umrah planning with upgraded hotels and attentive coordination.",
      ur: "اپ گریڈڈ ہوٹلز اور مکمل کوآرڈینیشن کے ساتھ پریمیم عمرہ پلاننگ۔",
    },
  },
  {
    src: "/images/umrah/customized-umrah-packages-pakistan.webp",
    title: {
      en: "Customized Umrah",
      ur: "کسٹمائزڈ عمرہ",
    },
    description: {
      en: "Flexible dates, hotel categories and routes shaped around your requirements.",
      ur: "آپ کی ضرورت کے مطابق تاریخیں، ہوٹل کیٹیگریز اور روٹس ترتیب دیے جاتے ہیں۔",
    },
  },
] as const;

interface UmrahPackageImageRowProps {
  locale: Locale;
  className?: string;
  tone?: "dark" | "light";
}

export function UmrahPackageImageRow({
  locale,
  className,
  tone = "dark",
}: UmrahPackageImageRowProps) {
  const isUrdu = locale === "ur";

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      dir={isUrdu ? "rtl" : "ltr"}
    >
      {umrahImages.map((item, index) => (
        <article
          key={item.src}
          className={cn(
            "group relative min-h-[19rem] overflow-hidden rounded-[1.75rem] shadow-brand",
            tone === "dark"
              ? "border border-border bg-surface-elevated/40"
              : "border border-border bg-surface-elevated",
          )}
        >
          <Image
            src={item.src}
            alt={item.title[locale]}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/15" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-5">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-gold" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold [text-shadow:0_2px_8px_rgb(0_0_0_/_0.85)]">
                {isUrdu ? "عمرہ پیکج" : "Umrah Package"}
              </p>
            </div>
            <h3 className="mt-3 font-display text-2xl font-black text-white [text-shadow:0_2px_10px_rgb(0_0_0_/_0.9)]">
              {item.title[locale]}
            </h3>
            <p className="mt-2 text-sm font-medium leading-7 text-white/90 [text-shadow:0_2px_8px_rgb(0_0_0_/_0.85)]">
              {item.description[locale]}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
