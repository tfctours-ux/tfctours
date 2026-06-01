// src/components/ui/Badge.tsx
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
          "border-gold/30 bg-gold/10 text-gold/80",
        variant === "red" &&
          "border-accent/20 bg-accent/10 text-accent",
        variant === "dark" &&
          "border-border bg-surface-muted text-foreground-muted",
        className,
      )}
    >
      {withDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full opacity-70",
            variant === "gold" && "bg-gold",
            variant === "red" && "bg-accent",
            variant === "dark" && "bg-foreground-muted",
          )}
        />
      )}
      {children}
    </span>
  );
}
