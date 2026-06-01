import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

type TailwindColorOpacity = { opacityValue?: string };

function tokenWithDefaultAlpha(token: string, alphaToken: string): string {
  return (({ opacityValue }: TailwindColorOpacity) => {
    if (opacityValue && opacityValue !== "1" && !opacityValue.startsWith("var(")) {
      return `rgb(var(${token}) / ${opacityValue})`;
    }

    return `rgb(var(${token}) / var(${alphaToken}))`;
  }) as unknown as string;
}

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Backwards-compatible brand palette (do NOT remove until Prompt 8)
        brand: {
          red:      "#CC0000",
          darkred:  "#8B0000",
          gold:     "#c9a84c",
          black:    "#080808",
          surface:  "#111111",
          muted:    "#1A1A1A",
          light:    "#F5F4F0",
        },
        // Semantic theme-aware tokens (consumed via CSS variables)
        background:           "rgb(var(--tfc-background) / <alpha-value>)",
        surface:              "rgb(var(--tfc-surface) / <alpha-value>)",
        "surface-elevated":   "rgb(var(--tfc-surface-elevated) / <alpha-value>)",
        "surface-muted":      "rgb(var(--tfc-surface-muted) / <alpha-value>)",
        "surface-inverse":    "rgb(var(--tfc-surface-inverse) / <alpha-value>)",
        foreground:           "rgb(var(--tfc-foreground) / <alpha-value>)",
        "foreground-muted":   "rgb(var(--tfc-foreground-muted) / <alpha-value>)",
        "foreground-subtle":  "rgb(var(--tfc-foreground-subtle) / <alpha-value>)",
        "foreground-inverse": "rgb(var(--tfc-foreground-inverse) / <alpha-value>)",
        border:               tokenWithDefaultAlpha("--tfc-border", "--tfc-border-alpha"),
        "border-strong":      tokenWithDefaultAlpha("--tfc-border-strong", "--tfc-border-strong-alpha"),
        "border-inverse":     "rgb(var(--tfc-border-inverse) / <alpha-value>)",
        accent:               "rgb(var(--tfc-accent) / <alpha-value>)",
        "accent-hover":       "rgb(var(--tfc-accent-hover) / <alpha-value>)",
        "accent-foreground":  "rgb(var(--tfc-accent-foreground) / <alpha-value>)",
        "accent-soft":        tokenWithDefaultAlpha("--tfc-accent-soft", "--tfc-accent-soft-alpha"),
        "accent-ring":        tokenWithDefaultAlpha("--tfc-accent-ring", "--tfc-accent-ring-alpha"),
        gold:                 "rgb(var(--tfc-gold) / <alpha-value>)",
        "gold-hover":         "rgb(var(--tfc-gold-hover) / <alpha-value>)",
        "gold-foreground":    "rgb(var(--tfc-gold-foreground) / <alpha-value>)",
        success:              "rgb(var(--tfc-success) / <alpha-value>)",
        "success-soft":       "rgb(var(--tfc-success-soft) / <alpha-value>)",
        warning:              "rgb(var(--tfc-warning) / <alpha-value>)",
        "warning-soft":       "rgb(var(--tfc-warning-soft) / <alpha-value>)",
        danger:               "rgb(var(--tfc-danger) / <alpha-value>)",
        "danger-soft":        "rgb(var(--tfc-danger-soft) / <alpha-value>)",
        input:                "rgb(var(--tfc-input) / <alpha-value>)",
        "input-border":       "rgb(var(--tfc-input-border) / <alpha-value>)",
        "input-foreground":   "rgb(var(--tfc-input-foreground) / <alpha-value>)",
        "input-placeholder":  "rgb(var(--tfc-input-placeholder) / <alpha-value>)",
        overlay:              tokenWithDefaultAlpha("--tfc-overlay", "--tfc-overlay-alpha"),
        scrim:                tokenWithDefaultAlpha("--tfc-scrim", "--tfc-scrim-alpha"),
      },
      fontFamily: {
        display: ["var(--font-playfair)"],
        body: ["var(--font-dm-sans)"],
        urdu: ["var(--font-noto-nastaliq)"],
      },
      backgroundImage: {
        "brand-mesh":
          "radial-gradient(circle at top, rgba(201, 168, 76, 0.18), transparent 36%), radial-gradient(circle at 80% 20%, rgba(204, 0, 0, 0.16), transparent 34%), linear-gradient(135deg, rgba(8, 8, 8, 0.96) 0%, rgba(17, 17, 17, 0.92) 48%, rgba(8, 8, 8, 1) 100%)",
        "paper-glow":
          "radial-gradient(circle at top left, rgba(201, 168, 76, 0.28), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.4), transparent)",
      },
      boxShadow: {
        brand: "0 28px 70px rgba(8, 8, 8, 0.18)",
        glow: "0 0 0 1px rgba(201, 168, 76, 0.2), 0 20px 60px rgba(204, 0, 0, 0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [typography],
};

export default config;
