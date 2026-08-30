import { destImage } from "@/lib/constants/destinations";
import type { Pricing } from "@/lib/constants/pricing";

export interface Experience extends Pricing {
  readonly id: string;
  readonly title: string;
  readonly meta: string;
  readonly image: string;
  readonly alt: string;
  readonly objectPosition: string;
  readonly href: string;
}

/** The first tile runs tall in the editorial field; the rest are square. */
export const CURATED_EXPERIENCES: readonly Experience[] = [
  {
    id: "egypt-luxury-tours",
    price: "From $1,450",
    title: "Egypt Luxury Tours",
    meta: "Private guides",
    image: destImage("karnakGuide"),
    alt: "A guide leading travellers through a temple colonnade at sunset.",
    objectPosition: "54% 48%",
    href: "/experiences/egypt-luxury-tours",
  },
  {
    id: "balloon-adventures",
    price: "From $210",
    oldPrice: "$280",
    discount: 25,
    title: "Balloon Adventures",
    meta: "Sunrise flights",
    image: destImage("balloonNileValley"),
    alt: "A hot-air balloon carrying passengers above the Nile valley at sunrise.",
    objectPosition: "58% 40%",
    href: "/experiences/balloon-adventures",
  },
  {
    id: "red-sea-diving",
    price: "From $160",
    title: "Red Sea Diving",
    meta: "Reef & wreck",
    image: "/images/easy-trav-cards1.png",
    alt: "A sea turtle gliding over a coral reef lit by shafts of sunlight.",
    objectPosition: "62% 46%",
    href: "/experiences/red-sea-diving",
  },
  {
    id: "historical-explorations",
    price: "From $340",
    oldPrice: "$420",
    discount: 19,
    title: "Historical Explorations",
    meta: "Guided antiquity",
    image: destImage("abuSimbel"),
    alt: "The rock-cut colossi of Abu Simbel in low evening light.",
    objectPosition: "66% 42%",
    href: "/experiences/historical-explorations",
  },
] as const;

export const EXPERIENCES_INTRO = {
  titleLines: ["Curated", "Experiences"],
  lede: ["Handpicked journeys.", "Unforgettable moments."],
  cta: { label: "Explore All Experiences", href: "/experiences" },
} as const;
