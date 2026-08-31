"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  getServerSnapshot,
  getSnapshot,
  removeItem,
  subscribe,
  toggleItem,
  type CommerceState,
} from "@/lib/commerce/store";
import type { SavedItem, SavedList } from "@/types/commerce";

/** Distinct `key` per emission so a repeat restarts the animation. */
export type Toast =
  | { readonly kind: "saved"; readonly list: SavedList; readonly item: SavedItem; readonly key: number }
  | { readonly kind: "message"; readonly title: string; readonly body?: string; readonly key: number };

interface CommerceValue extends CommerceState {
  toggle: (list: SavedList, item: SavedItem) => void;
  /** Latest announcement. Removals stay silent. */
  toast: Toast | null;
  /** Generic notice, for anything that is not a saved item. */
  notify: (title: string, body?: string) => void;
  dismissToast: () => void;
  remove: (list: SavedList, id: string) => void;
  has: (list: SavedList, id: string) => boolean;
  /** Which panel is open, if any. */
  panel: SavedList | null;
  openPanel: (list: SavedList) => void;
  closePanel: () => void;
}

const CommerceContext = createContext<CommerceValue | null>(null);

/**
 * Cart and favourites for the prototype.
 *
 * The lists live in a module store read through `useSyncExternalStore`, which
 * gives the server an empty snapshot and hydrates from localStorage on the
 * client without a state-setting effect. Only the open panel is React state.
 *
 * There is no cart service and no order: when the booking engine arrives it
 * owns quantities, availability and every money value, and this keeps only
 * identifiers.
 */
export function CommerceProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [panel, setPanel] = useState<SavedList | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const has = useCallback(
    (list: SavedList, id: string) => state[list].some((entry) => entry.id === id),
    [state],
  );
  // Wraps the store action so an add can announce itself; a removal is a
  // quiet undo and says nothing.
  const toggle = useCallback((list: SavedList, item: SavedItem) => {
    const added = !state[list].some((entry) => entry.id === item.id);
    toggleItem(list, item);
    if (added) setToast({ kind: "saved", list, item, key: Date.now() });
  }, [state]);

  const notify = useCallback((title: string, body?: string) => {
    setToast({ kind: "message", title, body, key: Date.now() });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);
  const openPanel = useCallback((list: SavedList) => setPanel(list), []);
  const closePanel = useCallback(() => setPanel(null), []);

  const value = useMemo<CommerceValue>(
    () => ({
      cart: state.cart,
      favourites: state.favourites,
      toggle,
      remove: removeItem,
      has,
      toast,
      notify,
      dismissToast,
      panel,
      openPanel,
      closePanel,
    }),
    [state, toggle, has, toast, notify, dismissToast, panel, openPanel, closePanel],
  );

  return (
    <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>
  );
}

export function useCommerce(): CommerceValue {
  const value = useContext(CommerceContext);
  if (!value) {
    throw new Error("useCommerce must be used inside CommerceProvider");
  }
  return value;
}
