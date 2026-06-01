// src/lib/theme.ts
export const THEME_STORAGE_KEY = "tfc-theme";
export const THEME_VALUES = ["light", "dark"] as const;
export type Theme = (typeof THEME_VALUES)[number];
export const DEFAULT_THEME: Theme = "light";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEME_VALUES as readonly string[]).includes(value);
}
