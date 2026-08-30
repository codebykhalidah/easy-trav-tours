import type { IconName } from "@/types/icon";
import type { NavItem } from "@/lib/constants/navigation";

export const FOOTER_NAV: readonly NavItem[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Tours", href: "/tours" },
  { label: "About", href: "/about" },
  { label: "VIP Concierge", href: "/vip-concierge" },
] as const;

export const FOOTER_UTILITY: readonly NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_STATEMENT = ["One Brand.", "Endless Journeys."] as const;

export interface MobileNavItem {
  readonly label: string;
  readonly icon: IconName;
  readonly href: string;
}

/**
 * Prototype navigation: the app-shell labels from the mobile reference boards,
 * pointing at homepage sections until those routes exist.
 */
export const MOBILE_NAV: readonly MobileNavItem[] = [
  { label: "Home", icon: "home", href: "#main" },
  { label: "Bookings", icon: "bookings", href: "#booking-panel" },
  { label: "Trips", icon: "trips", href: "#experiences" },
  { label: "Offers", icon: "offers", href: "#offers" },
  { label: "Profile", icon: "traveler", href: "#concierge" },
] as const;
