import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#CC0000",
          darkred: "#8B0000",
          gold: "#c9504c",
          black: "#080808",
          surface: "#111111",
          muted: "#1A1A1A",
          light: "#F5F4F0",
        },
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
