import Image from "next/image";
import Link from "next/link";

import { CardActions } from "@/components/ui/CardActions";
import { CardPrice } from "@/components/ui/CardPrice";
import { DiscountBadge } from "@/components/ui/DiscountBadge";
import { cn } from "@/lib/utils/cn";
import type { DestinationCard } from "@/lib/constants/destinations";

interface DestinationCubeProps {
  card: DestinationCard;
  /** Rendered width hint for the image srcset. */
  sizes: string;
  /** `feature` runs larger and sets its name in the display face. */
  variant?: "cube" | "feature";
  className?: string;
  priority?: boolean;
}

/**
 * A near-square photographic tile: photograph, place name, price and the two
 * card controls.
 *
 * The card is an `article`, not a link — buttons cannot be nested inside an
 * anchor. A labelled overlay link covers the tile so the whole card is still
 * clickable, and the controls are layered above that overlay so they keep
 * their own hit areas.
 */
export function DestinationCube({
  card,
  sizes,
  variant = "cube",
  className,
  priority,
}: DestinationCubeProps) {
  return (
    <article
      className={cn("cube", variant === "feature" && "cube--feature", className)}
    >
      <span className="cube__media">
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes={sizes}
          style={{ objectPosition: card.objectPosition }}
          priority={priority}
        />
      </span>

      {card.discount ? <DiscountBadge discount={card.discount} /> : null}

      <div className="cube__content">
        <span className="cube__name">{card.name}</span>
        <span className="cube__region">{card.region}</span>

        <span className="cube__foot">
          <CardPrice price={card.price} oldPrice={card.oldPrice} />
          <CardActions name={card.name} compact={variant !== "feature"} />
        </span>
      </div>

      <Link
        href={card.href}
        className="card-overlay"
        aria-label={`${card.name}, ${card.region}`}
      />
    </article>
  );
}
