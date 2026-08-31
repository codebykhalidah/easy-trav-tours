/** A card the visitor has put in their cart or saved. */
export interface SavedItem {
  readonly id: string;
  readonly name: string;
  /** Formatted for display. Prototype only — the server owns real amounts. */
  readonly price: string;
  readonly image: string;
  readonly href: string;
  /** Short supporting line: region, duration, category. */
  readonly meta: string;
}

export type SavedList = "cart" | "favourites";
