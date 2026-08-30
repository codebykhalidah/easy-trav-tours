import type { IconName } from "@/types/icon";

export interface TourAdvantage {
  readonly icon: IconName;
  readonly title: string;
  readonly copy: string;
}

export const EGYPT_TOURS = {
  eyebrow: "Egypt",
  titleLines: ["Egypt", "Luxury Tours"],
  lede: [
    "Step into a world of timeless wonders.",
    "Private tours. Iconic places.",
    "Unmatched experiences.",
  ],
  cta: { label: "Discover Tours", href: "/destinations/egypt" },
  image: "/images/easy-trav-cards2.png",
} as const;

export const TOUR_ADVANTAGES: readonly TourAdvantage[] = [
  { icon: "traveler", title: "Private Guides", copy: "Expert Local Guides" },
  { icon: "transfers", title: "Luxury Transport", copy: "Premium Comfort" },
  { icon: "vip", title: "VIP Access", copy: "Skip the Line" },
  { icon: "curated", title: "Tailored Journeys", copy: "Just for You" },
] as const;
