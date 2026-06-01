// src/components/shared/ContactForm.tsx
"use client";

import { startTransition, useCallback, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Turnstile } from "@/components/shared/Turnstile";

type FormState = "idle" | "success" | "error";

const fieldClasses =
  "w-full border border-input-border bg-input px-4 py-3 text-input-foreground placeholder:text-input-placeholder outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-ring/30 autofill:shadow-[inset_0_0_0_1000px_rgb(var(--tfc-input))] autofill:[-webkit-text-fill-color:rgb(var(--tfc-input-foreground))]";

const serviceOptions = [
  { value: "Ticket", labelKey: "serviceOptions.ticket" },
  { value: "Visa", labelKey: "serviceOptions.visa" },
  { value: "Tours", labelKey: "serviceOptions.tours" },
  { value: "Umrah Packages", labelKey: "serviceOptions.umrahPackages" },
  { value: "Worldwide Hotels", labelKey: "serviceOptions.worldwideHotels" },
  { value: "Travel Insurance Deals", labelKey: "serviceOptions.travelInsurance" },
  { value: "Agent Portal / B2B", labelKey: "serviceOptions.agentPortal" },
  { value: "Other", labelKey: "serviceOptions.other" },
] as const;

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken("");
  }, []);

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
          turnstileToken,
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

      formRef.current?.reset();
      setTurnstileToken("");
      startTransition(() => {
        setStatus("success");
        setFeedback(t("success"));
      });
    } catch (error) {
      startTransition(() => {
        setStatus("error");
        setFeedback(
          locale === "ur"
            ? t("error")
            : error instanceof Error && error.message
              ? error.message
              : t("error"),
        );
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="contact-form"
      ref={formRef}
      action={handleSubmit}
      className="rounded-[2rem] border border-border bg-surface-elevated p-6 shadow-brand md:p-8"
    >
      <h2 className="font-display text-3xl font-bold text-foreground">
        {t("title")}
      </h2>
      <p className="mt-3 text-sm leading-7 text-foreground-muted">{t("description")}</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{t("name")}</span>
          <input
            required
            name="name"
            placeholder={t("namePlaceholder")}
            className={`${fieldClasses} rounded-2xl`}
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{t("phone")}</span>
          <input
            required
            name="phone"
            placeholder={t("phonePlaceholder")}
            dir="ltr"
            className={`${fieldClasses} rounded-2xl`}
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{t("email")}</span>
          <input
            required
            type="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            dir="ltr"
            className={`${fieldClasses} rounded-2xl`}
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">{t("service")}</span>
          <select
            required
            name="service"
            defaultValue=""
            className={`${fieldClasses} rounded-2xl`}
          >
            <option value="" disabled>
              {t("servicePlaceholder")}
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {t(opt.labelKey)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-medium text-foreground">{t("message")}</span>
        <textarea
          required
          name="message"
          rows={6}
          placeholder={t("messagePlaceholder")}
          className={`${fieldClasses} rounded-[1.5rem]`}
        />
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Turnstile
          onToken={handleTurnstileToken}
          onError={handleTurnstileError}
          action="contact"
        />
        <Button type="submit" disabled={isSubmitting || !turnstileToken} showArrow>
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
                ? "mt-5 rounded-[1.5rem] border border-success/30 bg-success-soft px-4 py-3 text-sm text-success"
                : "mt-5 rounded-[1.5rem] border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger"
            }
          >
            {feedback}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
