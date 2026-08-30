import { destImage } from "@/lib/constants/destinations";

export interface Guide {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly readTime: string;
  readonly image: string;
  readonly alt: string;
  readonly objectPosition: string;
  readonly href: string;
}

export const GUIDES_INTRO = {
  eyebrow: "Read before you go",
  titleLines: ["Travel Guides", "& Stories"],
  cta: { label: "All Guides", href: "/guides" },
} as const;

export const TRAVEL_GUIDES: readonly Guide[] = [
  {
    id: "grand-egyptian-museum",
    category: "Culture",
    title: "Inside the Grand Egyptian Museum",
    readTime: "6 min",
    image: destImage("grandEgyptianMuseum"),
    alt: "The atrium of the Grand Egyptian Museum with the colossus of Ramses II.",
    objectPosition: "58% 42%",
    href: "/guides/grand-egyptian-museum",
  },
  {
    id: "planning-a-nile-journey",
    category: "Planning",
    title: "How to Plan a Nile Journey",
    readTime: "8 min",
    image: destImage("feluccaSunset"),
    alt: "A sailing boat's deck laid out for guests on the Nile at sunset.",
    objectPosition: "52% 52%",
    href: "/guides/planning-a-nile-journey",
  },
  {
    id: "red-sea-below-the-surface",
    category: "Nature",
    title: "The Red Sea, Below the Surface",
    readTime: "5 min",
    image: destImage("reefSnorkelling"),
    alt: "Snorkellers drifting over a shallow coral reef in clear water.",
    objectPosition: "48% 58%",
    href: "/guides/red-sea-below-the-surface",
  },
] as const;
