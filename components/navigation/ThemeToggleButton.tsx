"use client";

import { Icon } from "@/components/ui/Icon";
import { useTheme } from "@/hooks/useTheme";
import { THEMES, type Theme } from "@/types/theme";

const LABELS: Readonly<Record<Theme, string>> = {
  onyx: "Onyx",
  pearl: "Pearl",
  royal: "Royal",
};

/**
 * Compact mode switch for the phone header, where the segmented control is too
 * wide. One tap moves through the available modes.
 *
 * A contrast mark rather than a sun/moon: both Easy Trav modes are dark, so
 * OS light/dark iconography would misdescribe what the control does.
 */
export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const currentIndex = THEMES.indexOf(theme);
  const next = THEMES[(currentIndex + 1) % THEMES.length];

  return (
    <button
      type="button"
      className="utility-btn utility-btn--mode"
      aria-label={`Visual mode: ${LABELS[theme]}. Switch to ${LABELS[next]}.`}
      onClick={() => setTheme(next)}
    >
      <Icon name="mode" size={18} />
    </button>
  );
}
