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

interface CommerceValue extends CommerceState {
  toggle: (list: SavedList, item: SavedItem) => void;
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

  const has = useCallback(
    (list: SavedList, id: string) => state[list].some((entry) => entry.id === id),
    [state],
  );
  const openPanel = useCallback((list: SavedList) => setPanel(list), []);
  const closePanel = useCallback(() => setPanel(null), []);

  const value = useMemo<CommerceValue>(
    () => ({
      cart: state.cart,
      favourites: state.favourites,
      toggle: toggleItem,
      remove: removeItem,
      has,
      panel,
      openPanel,
      closePanel,
    }),
    [state, has, panel, openPanel, closePanel],
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
