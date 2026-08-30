interface DiscountBadgeProps {
  /** Whole percent off, e.g. 25. */
  discount: number;
}

/**
 * Live DOM badge — never baked into the photograph, so it stays crisp, is
 * readable by assistive technology, and can change with the data.
 */
export function DiscountBadge({ discount }: DiscountBadgeProps) {
  return (
    <span className="badge">
      <span className="badge__pct">−{discount}%</span>
      <span className="badge__label">Limited Discount</span>
    </span>
  );
}
