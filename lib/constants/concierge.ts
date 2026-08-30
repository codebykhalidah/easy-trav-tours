export interface Stat {
  readonly value: string;
  readonly label: string;
}

export const CONCIERGE_SECTION = {
  titleLines: ["Your Journey,", "Our Priority"],
  lede: [
    "From planning to landing,",
    "we're with you every step",
    "of the way.",
  ],
  cta: { label: "Contact VIP Concierge", href: "/vip-concierge" },
  image: "/images/easy-trav-cards5.png",
  imageAlt:
    "An Easy Trav concierge in a hotel lobby at night, gesturing in welcome.",
} as const;

export const CONCIERGE_STATS: readonly Stat[] = [
  { value: "98%", label: "Customer Satisfaction" },
  { value: "24/7", label: "VIP Support" },
  { value: "10K+", label: "Happy Travelers" },
  { value: "50+", label: "Top Destinations" },
] as const;
