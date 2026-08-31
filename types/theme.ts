/**
 * Easy Trav ships three premium environmental treatments of one design
 * system: Royal, Onyx and Pearl.
 */
export const THEMES = ["onyx", "royal", "pearl"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "onyx";

export const THEME_STORAGE_KEY = "easytrav-theme";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && THEMES.includes(value as Theme);
}
