// src/components/shared/AnimatedCounter.tsx
"use client";

import { useEffect, useRef, useState } from "react";

import { animate, motion, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  from: number;
  to: number;
  label: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  from,
  to,
  label,
  suffix = "",
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(
    new Intl.NumberFormat("en-US").format(from),
  );

  // Sync formatted display value directly from the motion value
  useMotionValueEvent(count, "change", (latest) => {
    setDisplayValue(new Intl.NumberFormat("en-US").format(Math.round(latest)));
  });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [count, duration, isInView, to]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex min-h-[7.5rem] flex-col justify-center px-6 py-5 text-center text-accent-foreground",
        className,
      )}
    >
      <div className="font-display text-3xl font-black tracking-tight text-accent-foreground md:text-5xl">
        {displayValue}
        {suffix}
      </div>
      <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-accent-foreground/72 md:text-xs">
        {label}
      </p>
    </motion.div>
  );
}
