// src/components/ui/Button.tsx
"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { m } from "@/lib/motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface SharedButtonProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  showArrow?: boolean;
  external?: boolean;
}

type ButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

function getButtonClasses(variant: ButtonVariant, size: ButtonSize) {
  return cn(
    // Base
    "inline-flex items-center justify-center gap-2 rounded-full border font-semibold uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // Sizes
    size === "sm" && "h-[34px] px-4 text-[11px]",
    size === "md" && "h-[40px] px-5 text-[12px]",
    size === "lg" && "h-[48px] px-7 text-[13px]",
    // Primary
    variant === "primary" &&
      "border-accent bg-accent text-accent-foreground shadow-[0_8px_28px_rgb(var(--tfc-accent)/0.22)] hover:border-accent-hover hover:bg-accent-hover hover:shadow-[0_12px_36px_rgb(var(--tfc-accent)/0.32)]",
    // Outline
    variant === "outline" &&
      "border-foreground/15 bg-surface-elevated/70 text-foreground-muted shadow-[0_8px_24px_rgb(var(--tfc-scrim)/0.04)] backdrop-blur-sm hover:border-accent/35 hover:bg-accent/[0.06] hover:text-accent hover:shadow-[0_10px_30px_rgb(var(--tfc-accent)/0.12)] dark:border-white/15",
    // Gold
    variant === "gold" &&
      "border-gold bg-gold text-gold-foreground shadow-[0_8px_28px_rgb(var(--tfc-gold)/0.28)] hover:border-gold-hover hover:bg-gold-hover hover:shadow-[0_12px_36px_rgb(var(--tfc-gold)/0.4)]",
  );
}

function getGlowShadow(variant: ButtonVariant) {
  if (variant === "gold")
    return "0 0 0 1px rgb(var(--tfc-gold) / 0.28), 0 18px 44px rgb(var(--tfc-gold) / 0.28)";
  if (variant === "outline")
    return "0 0 0 1px rgb(var(--tfc-accent) / 0.18), 0 18px 40px rgb(var(--tfc-accent) / 0.10)";
  return "0 0 0 1px rgb(var(--tfc-accent) / 0.22), 0 18px 44px rgb(var(--tfc-accent) / 0.24)";
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  showArrow = false,
  external = false,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(getButtonClasses(variant, size), className);

  const inner = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {showArrow && (
        <ArrowRight className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <m.span
        className={cn("group inline-flex rounded-full", className?.includes("w-full") && "w-full")}
        whileHover={{ scale: 1.03, boxShadow: getGlowShadow(variant) }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.18 }}
      >
        <Link
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
        >
          {inner}
        </Link>
      </m.span>
    );
  }

  return (
    <m.span
      className={cn("group inline-flex rounded-full", className?.includes("w-full") && "w-full")}
      whileHover={{ scale: 1.03, boxShadow: getGlowShadow(variant) }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
    >
      <button className={classes} type={type} {...props}>
        {inner}
      </button>
    </m.span>
  );
}
