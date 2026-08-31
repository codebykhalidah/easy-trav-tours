"use client";

import { useCommerce } from "@/components/commerce/CommerceProvider";
import { Icon } from "@/components/ui/Icon";

/**
 * Header access to the two lists, with live counts. Shown at every width so
 * the phone app shell has the same reach as the desktop header.
 */
export function CommerceButtons() {
  const { cart, favourites, openPanel } = useCommerce();

  return (
    <>
      <button
        type="button"
        className="utility-btn"
        aria-label={`Saved journeys, ${favourites.length} item${favourites.length === 1 ? "" : "s"}`}
        onClick={() => openPanel("favourites")}
      >
        <Icon name="heart" size={18} />
        {favourites.length > 0 ? (
          <span className="utility-btn__count utility-btn__count--fav">
            {favourites.length}
          </span>
        ) : null}
      </button>

      <button
        type="button"
        className="utility-btn"
        aria-label={`Cart, ${cart.length} item${cart.length === 1 ? "" : "s"}`}
        onClick={() => openPanel("cart")}
      >
        <Icon name="cart" size={18} />
        {cart.length > 0 ? (
          <span className="utility-btn__count">{cart.length}</span>
        ) : null}
      </button>
    </>
  );
}
