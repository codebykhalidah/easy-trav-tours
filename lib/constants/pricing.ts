/**
 * Illustrative prototype pricing. No amount here is authoritative — when the
 * booking engine lands, every price is re-derived server-side from the product
 * record and nothing money-related is trusted from the browser.
 */
export interface Pricing {
  /** Current price, already formatted for display. */
  readonly price: string;
  /** Pre-discount price. Present only alongside `discount`. */
  readonly oldPrice?: string;
  /** Whole percent off, e.g. 25. Drives the limited-discount badge. */
  readonly discount?: number;
}
