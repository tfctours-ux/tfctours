"use client";

import { startTransition, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";

type FormState = "idle" | "success" | "error";

const serviceOptions = [
  { value: "Ticket", label: { en: "Ticket", ur: "ٹکٹ" } },
  { value: "Visa", label: { en: "Visa", ur: "ویزا" } },
  { value: "Tours", label: { en: "Tours", ur: "ٹورز" } },
  { value: "Umrah Packages", label: { en: "Umrah Packages", ur: "عمرہ پیکجز" } },
  { value: "Worldwide Hotels", label: { en: "Worldwide Hotels", ur: "دنیا بھر کے ہوٹلز" } },
  { value: "Travel Insurance Deals", label: { en: "Travel Insurance Deals", ur: "ٹریول انشورنس ڈیلز" } },
  { value: "Agent Portal / B2B", label: { en: "Agent Portal / B2B", ur: "ایجنٹ پورٹل / B2B" } },
  { value: "Other", label: { en: "Other", ur: "دیگر" } },
] as const;

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const labelLocale = locale === "ur" ? "ur" : "en";
  const [status, setStatus] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setStatus("idle");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          service: formData.get("service"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? t("error"));
      }

      const form = document.getElementById("contact-form") as HTMLFormElement | null;
      form?.reset();
      startTransition(() => {
        setStatus("success");
        setFeedback(t("success"));
      });
    } catch (error) {
      startTransition(() => {
        setStatus("error");
        setFeedback(
              locale === "ur" ? t("error") : error instanceof Error && error.message ? error.message : t("error"),
        );
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="contact-form"
      action={handleSubmit}
      className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-brand md:p-8"
    >
      <h2 className="font-display text-3xl font-bold text-brand-black">
        {t("title")}
      </h2>
      <p className="mt-3 text-sm leading-7 text-zinc-700">{t("description")}</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-brand-black">{t("name")}</span>
          <input
            required
            name="name"
            placeholder={t("namePlaceholder")}
            className="w-full rounded-2xl border border-black/10 bg-brand-light px-4 py-3 outline-none transition focus:border-brand-red"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-brand-black">{t("phone")}</span>
          <input
            required
            name="phone"
            placeholder={t("phonePlaceholder")}
            dir="ltr"
            className="w-full rounded-2xl border border-black/10 bg-brand-light px-4 py-3 outline-none transition focus:border-brand-red"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-brand-black">{t("email")}</span>
          <input
            required
            type="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            dir="ltr"
            className="w-full rounded-2xl border border-black/10 bg-brand-light px-4 py-3 outline-none transition focus:border-brand-red"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-brand-black">{t("service")}</span>
          <select
            required
            name="service"
            defaultValue=""
            className="w-full rounded-2xl border border-black/10 bg-brand-light px-4 py-3 outline-none transition focus:border-brand-red"
          >
            <option value="" disabled>
              {t("servicePlaceholder")}
            </option>
            {serviceOptions.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label[labelLocale]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-medium text-brand-black">{t("message")}</span>
        <textarea
          required
          name="message"
          rows={6}
          placeholder={t("messagePlaceholder")}
          className="w-full rounded-[1.5rem] border border-black/10 bg-brand-light px-4 py-3 outline-none transition focus:border-brand-red"
        />
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isSubmitting} showArrow>
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              {t("sending")}
            </>
          ) : (
            t("submit")
          )}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {status !== "idle" ? (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
            className={
              status === "success"
                ? "mt-5 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                : "mt-5 rounded-[1.5rem] border border-brand-red/20 bg-brand-red/5 px-4 py-3 text-sm text-brand-red"
            }
          >
            {feedback}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
