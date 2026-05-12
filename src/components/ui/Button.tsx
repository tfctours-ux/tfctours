"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { motion } from "framer-motion";
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
    "inline-flex items-center justify-center gap-2 rounded-full border font-semibold uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black",
    // Sizes
    size === "sm" && "h-[34px] px-4 text-[11px]",
    size === "md" && "h-[40px] px-5 text-[12px]",
    size === "lg" && "h-[48px] px-7 text-[13px]",
    // Primary
    variant === "primary" &&
      "border-brand-red bg-brand-red text-white shadow-[0_8px_28px_rgba(204,0,0,0.22)] hover:border-brand-darkred hover:bg-brand-darkred hover:shadow-[0_12px_36px_rgba(204,0,0,0.32)]",
    // Outline — inverts to filled black on hover
    variant === "outline" &&
      "border-black/20 bg-transparent text-brand-black hover:border-brand-black hover:bg-brand-black hover:text-white hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)]",
    // Gold
    variant === "gold" &&
      "border-brand-gold bg-brand-gold text-brand-black shadow-[0_8px_28px_rgba(201,168,76,0.28)] hover:border-[#d9b964] hover:bg-[#d9b964] hover:shadow-[0_12px_36px_rgba(201,168,76,0.4)]",
  );
}

function getGlowShadow(variant: ButtonVariant) {
  if (variant === "gold")
    return "0 0 0 1px rgba(201,168,76,0.28), 0 18px 44px rgba(201,168,76,0.28)";
  if (variant === "outline")
    return "0 0 0 1px rgba(0,0,0,0.18), 0 18px 40px rgba(0,0,0,0.12)";
  return "0 0 0 1px rgba(204,0,0,0.22), 0 18px 44px rgba(204,0,0,0.24)";
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
      <motion.span
        className={cn("group inline-flex", className?.includes("w-full") && "w-full")}
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
      </motion.span>
    );
  }

  return (
    <motion.span
      className={cn("group inline-flex", className?.includes("w-full") && "w-full")}
      whileHover={{ scale: 1.03, boxShadow: getGlowShadow(variant) }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
    >
      <button className={classes} type={type} {...props}>
        {inner}
      </button>
    </motion.span>
  );
}