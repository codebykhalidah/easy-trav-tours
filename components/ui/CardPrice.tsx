import type { Pricing } from "@/lib/constants/pricing";

interface CardPriceProps extends Pricing {
  /** Prefixes the amount, e.g. "From". */
  prefix?: string;
}

/**
 * Price cluster. When a discount applies the previous amount sits before the
 * current one, struck through and muted, so the saving reads without needing
 * the badge to explain it.
 */
export function CardPrice({ price, oldPrice, prefix }: CardPriceProps) {
  return (
    <span className="price">
      {prefix ? <span className="price__prefix">{prefix}</span> : null}
      {oldPrice ? (
        <s className="price__old">
          <span className="sr-only">Was </span>
          {oldPrice}
        </s>
      ) : null}
      <span className="price__now">
        {oldPrice ? <span className="sr-only">Now </span> : null}
        {price}
      </span>
    </span>
  );
}
