export const ICON_NAMES = [
  // service benefits
  "concierge",
  "guarantee",
  "curated",
  "secure",
  // booking affordances
  "pin",
  "calendar",
  "traveler",
  "chevron",
  "arrow",
  "search",
  // booking / quick categories
  "flights",
  "hotels",
  "experiences",
  "packages",
  "transfers",
  "vip",
  // chrome
  "menu",
  "close",
  "bell",
  // mobile app shell
  "home",
  "bookings",
  "trips",
  "offers",
  // footer social
  "globe",
  "heart",
  "cart",
  "check",
  "mode",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export interface IconProps {
  name: IconName;
  /** Rendered box in px. Stroke weight stays constant across sizes. */
  size?: number;
  className?: string;
}
