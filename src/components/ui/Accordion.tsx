// src/components/ui/Accordion.tsx
"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("space-y-2.5", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-3xl border bg-surface-elevated transition-all duration-200",
              isOpen
                ? "border-accent/20 shadow-[0_4px_20px_rgb(var(--tfc-scrim)/0.07)]"
                : "border-border shadow-[0_2px_12px_rgb(var(--tfc-scrim)/0.04)]",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-[1.4rem] py-[1.1rem] text-left"
            >
              <span className="text-[15px] font-semibold leading-snug text-foreground">
                {item.question}
              </span>

              {/* Icon */}
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-250",
                  isOpen
                    ? "rotate-180 border-accent/30 bg-accent/10 text-accent"
                    : "border-border bg-surface-muted text-foreground-subtle",
                )}
              >
                <ChevronDown className="h-[15px] w-[15px]" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-[1.4rem] pb-[1.2rem] text-sm leading-[1.75] text-foreground-muted">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
