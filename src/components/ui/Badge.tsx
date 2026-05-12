import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "gold" | "red" | "dark";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
  /** Renders a small colored dot before the label — useful for status indicators */
  withDot?: boolean;
}

export function Badge({
  children,
  className,
  variant = "gold",
  withDot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-[5px] text-[10.5px] font-semibold uppercase tracking-[0.2em]",
        variant === "gold" &&
          "border-brand-gold/30 bg-brand-gold/10 text-brand-gold/80",
        variant === "red" &&
          "border-brand-red/20 bg-brand-red/7 text-brand-red",
        variant === "dark" &&
          "border-black/14 bg-black/6 text-zinc-500",
        className,
      )}
    >
      {withDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full opacity-70",
            variant === "gold" && "bg-brand-gold",
            variant === "red" && "bg-brand-red",
            variant === "dark" && "bg-zinc-500",
          )}
        />
      )}
      {children}
    </span>
  );
}