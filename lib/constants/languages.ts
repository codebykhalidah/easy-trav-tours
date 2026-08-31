export interface Language {
  /** BCP 47 tag, ready for when real localisation lands. */
  readonly code: string;
  /** Short label shown on the trigger. */
  readonly short: string;
  /** Name in English. */
  readonly label: string;
  /** Name as written by its own speakers. */
  readonly native: string;
}

/**
 * Prototype language list. Nothing is translated yet — choosing one raises a
 * "coming soon" notice. Codes are real so the switcher can be wired to actual
 * locales without changing this shape.
 */
export const LANGUAGES: readonly Language[] = [
  { code: "en", short: "EN", label: "English", native: "English" },
  { code: "ar", short: "AR", label: "Arabic", native: "العربية" },
  { code: "ru", short: "RU", label: "Russian", native: "Русский" },
  { code: "de", short: "DE", label: "German", native: "Deutsch" },
  { code: "cs", short: "CS", label: "Czech", native: "Čeština" },
  { code: "zh", short: "ZH", label: "Chinese", native: "中文" },
] as const;

export const DEFAULT_LANGUAGE = LANGUAGES[0];
