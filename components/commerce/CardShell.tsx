"use client";

import type { ReactNode } from "react";

import { useCommerce } from "@/components/commerce/CommerceProvider";
import { cn } from "@/lib/utils/cn";

interface CardShellProps {
  /** Item id, matched against both saved lists. */
  id: string;
  className: string;
  children: ReactNode;
}

/**
 * Card wrapper that reflects the item's saved state onto the card itself, so
 * a package reads as chosen at a glance and not only through its buttons.
 *
 * A thin client boundary: the card's contents are still rendered on the server
 * and passed through as children.
 */
export function CardShell({ id, className, children }: CardShellProps) {
  const { has } = useCommerce();

  return (
    <article
      className={cn(
        className,
        has("favourites", id) && "is-saved",
        has("cart", id) && "is-in-cart",
      )}
    >
      {children}
    </article>
  );
}
