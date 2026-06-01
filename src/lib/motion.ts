// src/lib/motion.ts
// Re-export the small `m` component for use with LazyMotion.
export { LazyMotion, domAnimation, m } from "framer-motion";

// Shared easing curve used throughout the app
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: EASE_OUT_EXPO,
    },
  },
} as const;

export const staggerChildren = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
} as const;
