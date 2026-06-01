// src/components/tour-calculator/SuccessScreen.tsx
"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { EASE_OUT_EXPO } from "@/lib/motion";

import { isUrdu, tourCopy } from "./copy";

export interface TourSuccessScreenProps {
  referenceId: string;
  contactNumber: string;
  email: string;
}

export function SuccessScreen({
  referenceId,
  contactNumber,
  email,
}: TourSuccessScreenProps) {
  const locale = useLocale();
  const copy = tourCopy[isUrdu(locale) ? "ur" : "en"].success;
  const [countdown, setCountdown] = useState(15);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const routerRef = useRef<ReturnType<typeof useRouter> | null>(null);
  const router = useRouter();

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          routerRef.current?.push("/");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function goHomeNow() {
    if (timerRef.current) clearInterval(timerRef.current);
    router.push("/");
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      className="flex flex-col items-center space-y-8 px-6 py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 14 }}
        className="relative"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-success/30 bg-success-soft">
          <CheckCircle2 className="h-12 w-12 text-success" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-success/25"
          animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      <div className="space-y-4">
        <h2 className="font-display text-3xl font-black text-foreground">
          {copy.title} {"\u2708\uFE0F"}
        </h2>
        <p className="mx-auto max-w-sm text-base leading-7 text-foreground-muted">
          {copy.description}
        </p>
      </div>

      {referenceId ? (
        <div className="w-full max-w-xs rounded-2xl border border-gold bg-gold px-6 py-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold-foreground/70">
            {copy.reference}
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-gold-foreground">
            {referenceId}
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface-elevated/50 px-4 py-2 text-sm text-foreground-muted">
          <Phone className="h-4 w-4" />
          <span>{copy.call} {contactNumber}</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface-elevated/50 px-4 py-2 text-sm text-foreground-muted">
          <Mail className="h-4 w-4" />
          <span>{copy.confirmation} {email}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-foreground-subtle">
        <Clock className="h-4 w-4" />
        <span>
          {copy.returning}{" "}
          <span className="font-bold text-foreground-muted">{countdown}s</span> ...
        </span>
      </div>

      <div className="mx-auto w-full max-w-xs">
        <div className="h-1 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 15, ease: "linear" }}
          />
        </div>
      </div>

      <Button
        variant="outline"
        onClick={goHomeNow}
        className="border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
      >
        {copy.goHome}
      </Button>
    </motion.section>
  );
}
