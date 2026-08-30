"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";

interface CardActionsProps {
  /** Item name, used to build distinct accessible labels per card. */
  name: string;
  /** Icon-only presentation for the smaller tiles. */
  compact?: boolean;
}

/**
 * Save and add-to-cart controls.
 *
 * Prototype state only: this holds UI state in the component and does not
 * persist anything or talk to a cart service. When the real basket lands it
 * takes an item id and the server owns quantities and every money value.
 *
 * These are real buttons, deliberately rendered as siblings of the card's
 * link rather than inside it — interactive content cannot nest in an anchor.
 */
export function CardActions({ name, compact = false }: CardActionsProps) {
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <span className={cn("card-actions", compact && "card-actions--compact")}>
      <button
        type="button"
        className={cn("card-action", saved && "is-on")}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${name} from favourites` : `Save ${name} to favourites`}
        onClick={() => setSaved((on) => !on)}
      >
        <Icon name="heart" size={15} />
      </button>

      <button
        type="button"
        className={cn("card-action card-action--cart", added && "is-on")}
        aria-pressed={added}
        aria-label={added ? `${name} added to cart` : `Add ${name} to cart`}
        onClick={() => setAdded((on) => !on)}
      >
        <Icon name={added ? "check" : "cart"} size={15} />
        {compact ? null : (
          <span className="card-action__label">{added ? "Added" : "Add to cart"}</span>
        )}
      </button>
    </span>
  );
}
