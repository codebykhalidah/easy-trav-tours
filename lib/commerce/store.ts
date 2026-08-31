import type { SavedItem, SavedList } from "@/types/commerce";

const STORAGE_KEY = "easytrav-commerce";

export interface CommerceState {
  readonly cart: readonly SavedItem[];
  readonly favourites: readonly SavedItem[];
}

/** Stable empty snapshot — the server render and the pre-load client render. */
const EMPTY: CommerceState = { cart: [], favourites: [] };

let state: CommerceState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function isSavedItem(value: unknown): value is SavedItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.price === "string" &&
    typeof item.image === "string" &&
    typeof item.href === "string" &&
    typeof item.meta === "string"
  );
}

/** Anything malformed in storage is dropped rather than trusted. */
function load(): void {
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return;
    const record = parsed as Record<string, unknown>;
    const pick = (key: string): SavedItem[] =>
      Array.isArray(record[key]) ? (record[key] as unknown[]).filter(isSavedItem) : [];
    state = { cart: pick("cart"), favourites: pick("favourites") };
  } catch {
    // Unreadable storage: start empty rather than fail.
  }
}

function persist(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or a full quota: the lists still work for this session.
  }
}

function emit(): void {
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void): () => void {
  if (!loaded && typeof window !== "undefined") {
    load();
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CommerceState {
  return state;
}

export function getServerSnapshot(): CommerceState {
  return EMPTY;
}

export function toggleItem(list: SavedList, item: SavedItem): void {
  const existing = state[list];
  const next = existing.some((entry) => entry.id === item.id)
    ? existing.filter((entry) => entry.id !== item.id)
    : [...existing, item];
  state = { ...state, [list]: next };
  persist();
  emit();
}

export function removeItem(list: SavedList, id: string): void {
  state = { ...state, [list]: state[list].filter((entry) => entry.id !== id) };
  persist();
  emit();
}
