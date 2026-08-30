import type { IconName } from "@/types/icon";

export const BOOKING_TABS = [
  "flights",
  "hotels",
  "experiences",
  "packages",
] as const;

export type BookingTab = (typeof BOOKING_TABS)[number];

export const BOOKING_TAB_LABELS: Readonly<Record<BookingTab, string>> = {
  flights: "Flights",
  hotels: "Hotels",
  experiences: "Experiences",
  packages: "Packages",
};

/** Shown only in the phone presentation, where the tabs become category chips. */
export const BOOKING_TAB_ICONS: Readonly<Record<BookingTab, IconName>> = {
  flights: "flights",
  hotels: "hotels",
  experiences: "experiences",
  packages: "packages",
};

export const DEFAULT_BOOKING_TAB: BookingTab = "flights";

export interface TravelerOption {
  readonly value: string;
  readonly label: string;
}

export const TRAVELER_OPTIONS: readonly TravelerOption[] = [
  { value: "1", label: "1 Passenger" },
  { value: "2", label: "2 Passengers" },
  { value: "3", label: "3 Passengers" },
  { value: "4", label: "4 Passengers" },
  { value: "5+", label: "5+ Passengers" },
] as const;

export const DEFAULT_ORIGIN = "Cairo, EGY";
