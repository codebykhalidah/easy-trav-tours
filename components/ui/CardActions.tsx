"use client";

import { useCommerce } from "@/components/commerce/CommerceProvider";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";
import type { SavedItem } from "@/types/commerce";

interface CardActionsProps {
  item: SavedItem;
  /** Icon-only presentation for the smaller tiles. */
  compact?: boolean;
}

/**
 * Save and add-to-cart controls, backed by the shared commerce store.
 *
 * These are real buttons, deliberately rendered as siblings of the card's link
 * rather than inside it — interactive content cannot nest in an anchor.
 */
export function CardActions({ item, compact = false }: CardActionsProps) {
  const { toggle, has } = useCommerce();
  const saved = has("favourites", item.id);
  const added = has("cart", item.id);

  return (
    <span className={cn("card-actions", compact && "card-actions--compact")}>
      <button
        type="button"
        className={cn("card-action card-action--fav", saved && "is-on")}
        aria-pressed={saved}
        aria-label={
          saved ? `Remove ${item.name} from favourites` : `Save ${item.name} to favourites`
        }
        onClick={() => toggle("favourites", item)}
      >
        <Icon name="heart" size={15} />
      </button>

      <button
        type="button"
        className={cn("card-action card-action--cart", added && "is-on")}
        aria-pressed={added}
        aria-label={added ? `Remove ${item.name} from cart` : `Add ${item.name} to cart`}
        onClick={() => toggle("cart", item)}
      >
        <Icon name={added ? "check" : "cart"} size={15} />
        <span className="card-action__label">{added ? "Added" : "Add to cart"}</span>
      </button>
    </span>
  );
}
