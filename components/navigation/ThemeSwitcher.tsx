"use client";

import { useRef } from "react";

import { useTheme } from "@/hooks/useTheme";
import { THEMES, type Theme } from "@/types/theme";

const LABELS: Readonly<Record<Theme, string>> = {
  onyx: "Onyx",
  pearl: "Pearl",
  royal: "Royal",
};

/** Display order puts Onyx first, matching the reference presentation. */
const ORDER: readonly Theme[] = ["onyx", "royal", "pearl"];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusOption(index: number) {
    const next = (index + ORDER.length) % ORDER.length;
    setTheme(ORDER[next]);
    refs.current[next]?.focus();
  }

  return (
    <div
      className="mode"
      role="radiogroup"
      aria-label="Visual mode"
      onKeyDown={(event) => {
        const current = ORDER.indexOf(theme);
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          focusOption(current + 1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          focusOption(current - 1);
        }
      }}
    >
      <span
        className="mode__thumb"
        style={{ transform: `translateX(${ORDER.indexOf(theme) * 100}%)` }}
        aria-hidden="true"
      />
      {ORDER.map((option, index) => {
        const selected = theme === option;
        return (
          <button
            key={option}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            className="mode__option"
            onClick={() => setTheme(option)}
          >
            {LABELS[option]}
          </button>
        );
      })}
      <span className="sr-only">
        {THEMES.length} visual modes available. Currently {LABELS[theme]}.
      </span>
    </div>
  );
}
