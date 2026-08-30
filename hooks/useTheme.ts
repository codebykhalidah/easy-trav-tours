"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isTheme,
  type Theme,
} from "@/types/theme";

const TRANSITION_CLASS = "theme-transition";
const TRANSITION_MS = 700;

/**
 * The active mode lives on <html data-theme>, stamped before first paint by
 * the bootstrap script in the root layout. That element is the source of
 * truth, so it is read as an external store rather than mirrored into state.
 */
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function getSnapshot(): Theme {
  const current = document.documentElement.dataset.theme;
  return isTheme(current) ? current : DEFAULT_THEME;
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

export function useTheme(): { theme: Theme; setTheme: (next: Theme) => void } {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add(TRANSITION_CLASS);
      window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_MS);
    }

    root.dataset.theme = next;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode, blocked site data). The mode
      // still applies for this visit; only persistence is lost.
    }

    for (const listener of listeners) {
      listener();
    }
  }, []);

  return { theme, setTheme };
}
