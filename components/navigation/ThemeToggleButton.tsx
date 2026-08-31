"use client";

import { Icon } from "@/components/ui/Icon";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@/types/theme";

const LABELS: Readonly<Record<Theme, string>> = {
  onyx: "Onyx",
  royal: "Royal",
};

/**
 * Compact mode switch for the phone header, where the segmented control is too
 * wide. One tap moves between the two modes.
 *
 * A contrast mark rather than a sun/moon: both Easy Trav modes are dark, so
 * OS light/dark iconography would misdescribe what the control does.
 */
export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const next: Theme = theme === "onyx" ? "royal" : "onyx";

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
