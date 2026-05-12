"use client";

import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/Button";
import { EASE_OUT_EXPO } from "@/lib/motion";

import { isUrdu, umrahCopy } from "./copy";

export interface SuccessScreenProps {
  referenceId: string;
  contactNumber: string;
  email: string;
}

export function SuccessScreen({
  referenceId,
  contactNumber,
  email,
}: SuccessScreenProps) {
  const locale = useLocale();
  const copy = umrahCopy[isUrdu(locale) ? "ur" : "en"].success;
  const [countdown, setCountdown] = useState(15);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();
  const routerRef = useRef(router);

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          routerRef.current.push("/");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  function goHomeNow() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    router.push("/");
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      className="flex flex-col items-center space-y-8 px-6 py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20">
          <CheckCircle2 className="h-12 w-12 text-emerald-400" />
        </div>

        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-400/30"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>

      <div className="space-y-4">
        <h2 className="font-display text-3xl font-black text-white">
          {copy.title} {"\u{1F54B}"}
        </h2>
        <p className="max-w-md text-base leading-7 text-white/65">
          {copy.description}
        </p>
      </div>

      {referenceId ? (
        <div className="rounded-2xl border border-brand-gold/25 bg-brand-gold/[0.07] px-6 py-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-brand-gold/70">
            {copy.reference}
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-brand-gold">
            {referenceId}
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/65">
          <Phone className="h-4 w-4 text-brand-red" />
          {copy.call} {contactNumber}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/65">
          <Mail className="h-4 w-4 text-brand-red" />
          {copy.confirmation} {email}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Clock className="h-4 w-4" />
          <span>
            {copy.returning}{" "}
            <span className="font-bold text-white/70">{countdown}s</span>...
          </span>
        </div>

        <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className="h-full rounded-full bg-brand-red"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 15, ease: "linear" }}
          />
        </div>
      </div>

      <Button
        variant="outline"
        onClick={goHomeNow}
        className="border-white/20 text-white hover:border-white hover:bg-white hover:text-brand-black"
      >
        {copy.goHome}
      </Button>
    </motion.div>
  );
}
