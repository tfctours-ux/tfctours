"use client";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { FLIGHTS_URL, SERVICES, type Locale } from "@/lib/constants";
import { fadeInUp, staggerChildren } from "@/lib/motion";

import { ServiceCard } from "@/components/shared/ServiceCard";

export function ServicesGrid() {
  const locale = useLocale() as Locale;
  const isUrdu = locale === "ur";

  const content = isUrdu
    ? {
        eyebrow: "ہم کیا پیش کرتے ہیں",
        title: "سفر کی تمام خدمات ایک ہی چھت کے نیچے",
        description:
          "فلائٹ بکنگ، عمرہ پیکجز، انٹرنیشنل ٹورز، ہوٹل ریزرویشنز، وزٹ ویزاز اور ٹریول انشورنس تک، دی فلائٹ سینٹر یہ سب سنبھالتا ہے۔",
        notice:
          "تمام فلائٹ بکنگز ہمارے آئی اے ٹی اے سرٹیفائیڈ پلیٹ فارم کے ذریعے کی جاتی ہیں · ",
        noticeLink: "theflightcentre.pk پر آن لائن فلائٹس بک کریں",
      }
    : {
        eyebrow: "What We Offer",
        title: "All your travel needs, one destination",
        description:
          "Tickets, visas, tours, Umrah packages, worldwide hotels and travel insurance deals are handled together with trusted support.",
        notice:
          "Trusted service, best-price guidance and 24/7 customer support. ",
        noticeLink: "Book flights online at theflightcentre.pk",
      };

  return (
    <motion.section
      className="relative overflow-hidden bg-brand-light px-6 py-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerChildren}
    >
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.06)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.07)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-14">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-brand-red" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red">
              {content.eyebrow}
            </span>
          </div>
          <h2 className="display-copy mt-4 max-w-2xl font-display text-4xl font-black leading-tight text-brand-black md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-zinc-500">
            {content.description}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerChildren}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.slug}
              locale={locale}
              service={service}
              index={i}
            />
          ))}
        </motion.div>

        <p className="mt-8 text-center text-xs tracking-wide text-white/30">
          {content.notice}
          <a
            href={FLIGHTS_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-brand-gold/60 transition hover:text-brand-gold"
          >
            {content.noticeLink}
          </a>
        </p>
      </div>
    </motion.section>
  );
}
