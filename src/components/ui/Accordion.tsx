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
              "overflow-hidden rounded-3xl border bg-white transition-all duration-200",
              isOpen
                ? "border-brand-red/18 shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
                : "border-black/8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-[1.4rem] py-[1.1rem] text-left"
            >
              <span className="text-[15px] font-semibold leading-snug text-brand-black">
                {item.question}
              </span>

              {/* Icon */}
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-250",
                  isOpen
                    ? "border-brand-red/28 bg-red-50 text-brand-red rotate-180"
                    : "border-black/12 bg-[#F5F3EE] text-zinc-400",
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
                  <p className="px-[1.4rem] pb-[1.2rem] text-sm leading-[1.75] text-zinc-500">
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