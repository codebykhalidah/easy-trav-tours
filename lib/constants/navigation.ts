export interface NavItem {
  readonly label: string;
  readonly href: string;
}

/**
 * Routes beyond the homepage are not built in this phase; the hrefs are the
 * intended production paths so the markup stays semantic anchors.
 */
export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Deals", href: "/deals" },
  { label: "About Us", href: "/about" },
  { label: "VIP Concierge", href: "/vip-concierge" },
] as const;

export const BOOK_NOW: NavItem = { label: "Book Now", href: "/book" };
