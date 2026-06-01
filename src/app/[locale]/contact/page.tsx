import type { Metadata } from "next";

import Image from "next/image";

import { Mail, MapPin, MessageCircleMore, Phone, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactForm } from "@/components/shared/ContactForm";
import { SpeakableJsonLd } from "@/components/shared/JsonLd";
import { Button } from "@/components/ui/Button";
import { BRAND, BRAND_IMAGES } from "@/lib/constants";
import {
  buildLocalizedPageMetadata,
  getLocaleFromParams,
  type LocaleParams,
} from "@/lib/page-metadata";
import { localizePath } from "@/lib/utils";

const mainOffice = {
  label: "Main Office — Jinnah Stadium",
  address: "Office 36, 37 Jinnah Stadium, Gujranwala",
  phone: "+92 55 37 30 255/56",
  mobile: "+92 300 8623817-18",
};

const branchOffice = {
  label: "Branch Office — DC Colony",
  address: "Plaza 18, Neelum Block DC Colony, Gujranwala",
  phone: "+92 55 3783054-55",
  mobile: "+92 301-8723608-09",
};

function OfficeCard({
  office,
  labels,
}: {
  office: { label: string; address: string; phone: string; mobile: string };
  labels: { phone: string; mobile: string };
}) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
      <div className="space-y-5 text-sm text-zinc-700">
        <div className="flex items-start gap-4">
          <MapPin className="mt-1 h-5 w-5 text-brand-red" />
          <div>
            <p className="font-semibold text-brand-black">{office.label}</p>
            <p dir="auto" className="mt-1 inline-block font-body">
              {office.address}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Phone className="mt-1 h-5 w-5 text-brand-red" />
          <div>
            <p className="font-semibold text-brand-black">{labels.phone}</p>
            <p dir="ltr" className="mt-1 inline-block font-body">
              {office.phone}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Phone className="mt-1 h-5 w-5 text-brand-red" />
          <div>
            <p className="font-semibold text-brand-black">{labels.mobile}</p>
            <p dir="ltr" className="mt-1 inline-block font-body">
              {office.mobile}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  return buildLocalizedPageMetadata(params, "contact.meta", "/contact", [
    "contact the flight centre",
    "gujranwala travel agency",
  ]);
}

export default async function ContactPage({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = await getLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "contact" });
  const common = await getTranslations({ locale, namespace: "common" });
  const footer = await getTranslations({ locale, namespace: "footer" });
  const whatsappHref = `https://wa.me/${BRAND.phone.replace(/[^0-9]/g, "")}`;
  const telHref = `tel:${BRAND.phone.replace(/[^0-9+]/g, "")}`;
  const mapQuery = encodeURIComponent(mainOffice.address);
  const mapTitle = common("gujranwalaOffice");
  const contactLabels =
    locale === "ur"
      ? {
        mainOffice: "مین آفس — جناح اسٹیڈیم",
        branchOffice: "برانچ آفس — ڈی سی کالونی",
        mainAddress: "آفس 36، 37 جناح اسٹیڈیم، گوجرانوالہ",
        branchAddress: "پلازہ 18، نیلم بلاک ڈی سی کالونی، گوجرانوالہ",
        phone: "فون",
        mobile: "موبائل",
        helpdesk: "24/7 ہیلپ ڈیسک",
        }
      : {
        mainOffice: mainOffice.label,
        branchOffice: branchOffice.label,
        mainAddress: mainOffice.address,
        branchAddress: branchOffice.address,
        phone: "Phone",
        mobile: "Mobile",
        helpdesk: "24/7 Helpdesk",
        };
  const localizedMainOffice = {
    ...mainOffice,
    label: contactLabels.mainOffice,
    address: contactLabels.mainAddress,
  };
  const localizedBranchOffice = {
    ...branchOffice,
    label: contactLabels.branchOffice,
    address: contactLabels.branchAddress,
  };

  return (
    <div className="pb-20">
      <SpeakableJsonLd
        path={localizePath(locale, "/contact")}
        cssSelectors={["#contact-h1", "#contact-lede"]}
      />
      <Breadcrumb />
      <section className="mx-auto mt-6 max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2.75rem] bg-brand-mesh shadow-glow">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8 text-white md:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">
                {t("hero.eyebrow")}
              </p>
              <h1 id="contact-h1" className="display-copy mt-6 max-w-3xl font-display text-4xl font-black leading-tight md:text-6xl">
                {t("title")}
              </h1>
              <p id="contact-lede" className="mt-5 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">
                    {localizedMainOffice.label}
                  </p>
                  <p
                    dir={locale === "ur" ? "rtl" : "ltr"}
                    className="mt-3 text-base leading-7 text-white/82"
                  >
                    {localizedMainOffice.address}
                  </p>
                </div>
                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">
                    {localizedBranchOffice.label}
                  </p>
                  <p
                    dir={locale === "ur" ? "rtl" : "ltr"}
                    className="mt-3 text-base leading-7 text-white/82"
                  >
                    {localizedBranchOffice.address}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={telHref} size="lg">
                  <Phone className="h-4 w-4" />
                  <span dir="ltr">{BRAND.phone}</span>
                </Button>
                <Button
                  href={localizePath(locale, "/services")}
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/10 text-white hover:border-white hover:bg-white hover:text-brand-black"
                >
                  {common("exploreServices")}
                </Button>
              </div>
            </div>

            <div className="relative min-h-[22rem] overflow-hidden">
              <Image
                src={BRAND_IMAGES.office}
                alt={mainOffice.address}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="absolute inset-0 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ContactForm />

        <aside className="space-y-6">
          <OfficeCard
            office={localizedMainOffice}
            labels={contactLabels}
          />
          <OfficeCard
            office={localizedBranchOffice}
            labels={contactLabels}
          />

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8">
            <div className="space-y-5 text-sm text-zinc-700">
              <a
                href={`tel:${BRAND.uan.replace(/[^0-9]/g, "")}`}
                className="flex items-start gap-4 transition hover:text-brand-red"
              >
                <Phone className="mt-1 h-5 w-5 text-brand-red" />
                <div>
                  <p className="font-semibold text-brand-black">{t("labels.uan")}</p>
                  <p dir="ltr" className="mt-1 inline-block font-body">
                    {BRAND.uan}
                  </p>
                </div>
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-start gap-4 transition hover:text-brand-red"
              >
                <Mail className="mt-1 h-5 w-5 text-brand-red" />
                <div>
                  <p className="font-semibold text-brand-black">{t("labels.email")}</p>
                  <p dir="ltr" className="mt-1 inline-block font-body">
                    {BRAND.email}
                  </p>
                </div>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 transition hover:text-brand-red"
              >
                <MessageCircleMore className="mt-1 h-5 w-5 text-brand-red" />
                <div>
                  <p className="font-semibold text-brand-black">{footer("whatsappCta")}</p>
                  <p dir="ltr" className="mt-1 inline-block font-body">
                    {BRAND.phone}
                  </p>
                </div>
              </a>
              <a
                href={`tel:${(BRAND.helpdesk ?? "").replace(/[^0-9]/g, "")}`}
                className="flex items-start gap-4 transition hover:text-brand-red"
              >
                <Phone className="mt-1 h-5 w-5 text-brand-red" />
                <div>
                  <p className="font-semibold text-brand-black">{contactLabels.helpdesk}</p>
                  <p dir="ltr" className="mt-1 inline-block font-body">
                    {BRAND.helpdesk}
                  </p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <UserRound className="mt-1 h-5 w-5 text-brand-red" />
                <div>
                  <p className="font-semibold text-brand-black">{t("labels.ceo")}</p>
                  <p className="mt-1">{BRAND.ceo}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button href={whatsappHref} variant="gold" size="lg" external>
                <MessageCircleMore className="h-4 w-4" />
                {footer("whatsappCta")}
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-brand">
            <div className="border-b border-black/10 px-6 py-4">
              <h2 className="font-display text-2xl font-bold text-brand-black">
                {mapTitle}
              </h2>
            </div>
            <div className="aspect-[4/3]">
              <iframe
                title={mapTitle}
                src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
