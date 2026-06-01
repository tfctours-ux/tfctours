export const BRAND_COLORS = {
  red: "#CC0000",
  darkred: "#8B0000",
  gold: "#C9A84C",
  goldHi: "#D9B964",
  black: "#080808",
  light: "#F5F4F0",
} as const;

export const LIGHT_TOKENS = {
  // Surfaces
  background: "#FFFFFF",
  surface: "#FAFAF7",
  "surface-elevated": "#FFFFFF",
  "surface-muted": "#F2F1EC",
  "surface-inverse": "#080808",
  // Foreground / text
  foreground: "#0A0A0A",
  "foreground-muted": "#52525B",
  "foreground-subtle": "#71717A",
  "foreground-inverse": "#FAFAF7",
  // Borders
  border: "rgba(8, 8, 8, 0.08)",
  "border-strong": "rgba(8, 8, 8, 0.16)",
  "border-inverse": "rgba(255, 255, 255, 0.10)",
  // Accents (brand-aware)
  accent: "#CC0000",
  "accent-hover": "#8B0000",
  "accent-foreground": "#FFFFFF",
  "accent-soft": "rgba(204, 0, 0, 0.08)",
  "accent-ring": "rgba(204, 0, 0, 0.28)",
  gold: "#C9A84C",
  "gold-hover": "#B8973D",
  "gold-foreground": "#0A0A0A",
  // Feedback
  success: "#047857",
  "success-soft": "rgba(4, 120, 87, 0.10)",
  warning: "#B45309",
  "warning-soft": "rgba(180, 83, 9, 0.10)",
  danger: "#B91C1C",
  "danger-soft": "rgba(185, 28, 28, 0.10)",
  // Form
  input: "#FFFFFF",
  "input-border": "rgba(8, 8, 8, 0.12)",
  "input-foreground": "#0A0A0A",
  "input-placeholder": "#A1A1AA",
  // Overlay / scrim
  overlay: "rgba(8, 8, 8, 0.6)",
  scrim: "rgba(8, 8, 8, 0.78)",
} as const;

export const DARK_TOKENS = {
  // Surfaces
  background: "#080808",
  surface: "#111111",
  "surface-elevated": "#1A1A1A",
  "surface-muted": "#0F0F0F",
  "surface-inverse": "#FAFAF7",
  // Foreground / text
  foreground: "#FAFAF7",
  "foreground-muted": "rgba(250, 250, 247, 0.72)",
  "foreground-subtle": "rgba(250, 250, 247, 0.48)",
  "foreground-inverse": "#0A0A0A",
  // Borders
  border: "rgba(255, 255, 255, 0.08)",
  "border-strong": "rgba(255, 255, 255, 0.16)",
  "border-inverse": "rgba(8, 8, 8, 0.10)",
  // Accents
  accent: "#E11D1D",
  "accent-hover": "#CC0000",
  "accent-foreground": "#FFFFFF",
  "accent-soft": "rgba(225, 29, 29, 0.12)",
  "accent-ring": "rgba(225, 29, 29, 0.40)",
  gold: "#D9B964",
  "gold-hover": "#C9A84C",
  "gold-foreground": "#080808",
  // Feedback
  success: "#10B981",
  "success-soft": "rgba(16, 185, 129, 0.14)",
  warning: "#F59E0B",
  "warning-soft": "rgba(245, 158, 11, 0.14)",
  danger: "#F87171",
  "danger-soft": "rgba(248, 113, 113, 0.14)",
  // Form
  input: "rgba(255, 255, 255, 0.04)",
  "input-border": "rgba(255, 255, 255, 0.10)",
  "input-foreground": "#FAFAF7",
  "input-placeholder": "rgba(250, 250, 247, 0.40)",
  // Overlay / scrim
  overlay: "rgba(0, 0, 0, 0.72)",
  scrim: "rgba(0, 0, 0, 0.88)",
} as const;

export type ThemeName = "light" | "dark";
export type SemanticTokenKey = keyof typeof LIGHT_TOKENS;

// Sanity check at compile time - both maps must share the same keys.
type _AssertSameKeys =
  keyof typeof LIGHT_TOKENS extends keyof typeof DARK_TOKENS
    ? keyof typeof DARK_TOKENS extends keyof typeof LIGHT_TOKENS
      ? true
      : never
    : never;
const _assert: _AssertSameKeys = true;
void _assert;
