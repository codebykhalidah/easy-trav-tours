/**
 * Easy Trav ships two premium dark modes, not light/dark. Royal and Onyx are
 * environmental treatments of one design system.
 */
export const THEMES = ["royal", "onyx"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "onyx";

export const THEME_STORAGE_KEY = "easytrav-theme";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && THEMES.includes(value as Theme);
}
