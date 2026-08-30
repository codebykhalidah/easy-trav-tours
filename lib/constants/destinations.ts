/**
 * Destination photography supplied under /public/images/destinations/.
 *
 * The source filenames are generator output and contain spaces, commas and
 * parentheses. They are kept exactly as delivered — nothing is renamed — so
 * every awkward path is confined to this one file and referenced everywhere
 * else through a semantic id.
 */
import type { Pricing } from "@/lib/constants/pricing";

const DIR = "/images/destinations/";

const FILE = {
  balloonsOverGiza: "ChatGPT Image Aug 30, 2026, 01_12_14 PM (5).png",
  gizaCamelSunset: "ChatGPT Image Aug 30, 2026, 02_14_23 PM (1).png",
  desertQuads: "ChatGPT Image Aug 30, 2026, 02_14_23 PM (2).png",
  seaSpeedboat: "ChatGPT Image Aug 30, 2026, 02_14_23 PM (3).png",
  grandEgyptianMuseum: "ChatGPT Image Aug 30, 2026, 02_14_24 PM (4).png",
  turquoiseShallows: "ChatGPT Image Aug 30, 2026, 02_14_24 PM (5).png",
  feluccaSunset: "ChatGPT Image Aug 30, 2026, 02_14_24 PM (6).png",
  karnakColumns: "ChatGPT Image Aug 30, 2026, 02_14_24 PM (7).png",
  cairoMosqueArcade: "ChatGPT Image Aug 30, 2026, 02_14_25 PM (10).png",
  oasisSunset: "ChatGPT Image Aug 30, 2026, 02_14_25 PM (8).png",
  balloonNileValley: "ChatGPT Image Aug 30, 2026, 02_14_25 PM (9).png",
  abuSimbel: "ChatGPT Image Aug 30, 2026, 02_21_20 PM (1).png",
  gizaCamels: "ChatGPT Image Aug 30, 2026, 02_21_20 PM (2).png",
  reefSnorkelling: "ChatGPT Image Aug 30, 2026, 02_21_20 PM (3).png",
  nileDinner: "ChatGPT Image Aug 30, 2026, 02_21_21 PM (4).png",
  karnakGuide: "ChatGPT Image Aug 30, 2026, 02_21_21 PM (5).png",
  thermalPool: "ChatGPT Image Aug 30, 2026, 02_21_21 PM (6).png",
  privateCharter: "ChatGPT Image Aug 30, 2026, 02_21_21 PM (7).png",
  khanElKhalili: "ChatGPT Image Aug 30, 2026, 02_21_22 PM (8).png",
  aswanTerrace: "ChatGPT Image Aug 30, 2026, 02_21_22 PM (9).png",
} as const;

type FileKey = keyof typeof FILE;

/** Path for a supplied destination photograph. */
export function destImage(key: FileKey): string {
  return DIR + FILE[key];
}

export interface DestinationCard extends Pricing {
  readonly id: string;
  readonly name: string;
  readonly region: string;
  readonly image: string;
  readonly alt: string;
  readonly objectPosition: string;
  readonly href: string;
}

/**
 * Only places the photography actually shows are named. Images whose location
 * could not be identified with confidence are used for experiences and
 * editorial rather than being labelled with a guessed place.
 */
export const DESTINATION_CUBES: readonly DestinationCard[] = [
  {
    id: "giza",
    price: "From $890",
    oldPrice: "$1,180",
    discount: 25,
    name: "Giza",
    region: "Pyramids",
    image: destImage("gizaCamels"),
    alt: "Two riders on camels before the three pyramids of Giza at sunset.",
    objectPosition: "52% 52%",
    href: "/destinations/giza",
  },
  {
    id: "cairo",
    price: "From $640",
    name: "Cairo",
    region: "Old City",
    image: destImage("khanElKhalili"),
    alt: "Travellers walking through a lantern-lit bazaar street in old Cairo.",
    objectPosition: "50% 46%",
    href: "/destinations/cairo",
  },
  {
    id: "luxor",
    price: "From $760",
    name: "Luxor",
    region: "Karnak",
    image: destImage("karnakColumns"),
    alt: "Two visitors walking among the carved columns of a Karnak hall.",
    objectPosition: "56% 50%",
    href: "/destinations/luxor",
  },
  {
    id: "aswan",
    price: "From $820",
    oldPrice: "$1,020",
    discount: 20,
    name: "Aswan",
    region: "Nile",
    image: destImage("aswanTerrace"),
    alt: "Guests at a terrace table overlooking the Nile at sunset.",
    objectPosition: "56% 50%",
    href: "/destinations/aswan",
  },
  {
    id: "abu-simbel",
    price: "From $940",
    name: "Abu Simbel",
    region: "Nubia",
    image: destImage("abuSimbel"),
    alt: "Travellers and a guide before the colossi of Abu Simbel at sunset.",
    objectPosition: "62% 44%",
    href: "/destinations/abu-simbel",
  },
  {
    id: "red-sea",
    price: "From $710",
    name: "Red Sea",
    region: "Reefs",
    image: destImage("reefSnorkelling"),
    alt: "Snorkellers above a coral reef beside a moored yacht.",
    objectPosition: "50% 56%",
    href: "/destinations/red-sea",
  },
  {
    id: "grand-egyptian-museum",
    price: "From $520",
    name: "Grand Egyptian Museum",
    region: "Giza",
    image: destImage("grandEgyptianMuseum"),
    alt: "Visitors before the colossus of Ramses II in the Grand Egyptian Museum atrium.",
    objectPosition: "58% 44%",
    href: "/destinations/grand-egyptian-museum",
  },
  {
    id: "nile-valley",
    price: "From $1,180",
    oldPrice: "$1,480",
    discount: 20,
    name: "Nile Valley",
    region: "Balloon",
    image: destImage("balloonNileValley"),
    alt: "A hot-air balloon drifting over the Nile valley at sunrise.",
    objectPosition: "52% 50%",
    href: "/destinations/nile-valley",
  },
] as const;

/** Feature tile in the mosaic — larger, given its own crop. */
export const DESTINATION_FEATURE: DestinationCard = {
  id: "grand-egyptian-museum-feature",
  price: "From $520",
  oldPrice: "$650",
  discount: 20,
  name: "Grand Egyptian Museum",
  region: "Giza · Newly opened",
  image: destImage("grandEgyptianMuseum"),
  alt: "The colossus of Ramses II beneath the hanging obelisk of the Grand Egyptian Museum.",
  objectPosition: "56% 46%",
  href: "/destinations/grand-egyptian-museum",
};

/** The full-bleed cinematic moment between the mosaic and the experiences. */
export const EGYPT_MOMENT = {
  eyebrow: "Egypt",
  titleLines: ["Egypt,", "Beyond the Ordinary."],
  lede: [
    "Sunrise over the valley of kings,",
    "and a table waiting at dusk.",
  ],
  cta: { label: "Explore Egypt", href: "/destinations/egypt" },
  image: destImage("balloonNileValley"),
  alt: "A hot-air balloon rising over the temples of the Nile valley at sunrise.",
} as const;

/** Second, activity-led discovery rail. */
export const DESTINATION_RAIL: readonly DestinationCard[] = [
  {
    id: "nile-cruises",
    price: "From $2,780",
    name: "Nile Cruises",
    region: "Dahabiya",
    image: destImage("feluccaSunset"),
    alt: "Guests relaxing on the deck of a sailing dahabiya at sunset.",
    objectPosition: "54% 50%",
    href: "/experiences/nile-cruises",
  },
  {
    id: "desert-safari",
    price: "From $180",
    oldPrice: "$240",
    discount: 25,
    name: "Desert Safari",
    region: "Dunes",
    image: destImage("desertQuads"),
    alt: "Two riders crossing desert dunes on quad bikes at sunset.",
    objectPosition: "50% 50%",
    href: "/experiences/desert-safari",
  },
  {
    id: "private-charters",
    price: "From $1,960",
    name: "Private Charters",
    region: "Coast",
    image: destImage("privateCharter"),
    alt: "A couple aboard a private speedboat at sunset.",
    objectPosition: "50% 46%",
    href: "/experiences/private-charters",
  },
  {
    id: "coastal-escapes",
    price: "From $540",
    name: "Coastal Escapes",
    region: "Shoreline",
    image: destImage("turquoiseShallows"),
    alt: "Two swimmers floating in clear turquoise shallows off a sandy shore.",
    objectPosition: "50% 54%",
    href: "/experiences/coastal-escapes",
  },
  {
    id: "guided-antiquity",
    price: "From $320",
    name: "Guided Antiquity",
    region: "Temples",
    image: destImage("karnakGuide"),
    alt: "A local guide leading travellers through a temple hall at sunset.",
    objectPosition: "56% 48%",
    href: "/experiences/guided-antiquity",
  },
  {
    id: "private-dining",
    price: "From $260",
    oldPrice: "$340",
    discount: 24,
    name: "Private Dining",
    region: "On the Nile",
    image: destImage("nileDinner"),
    alt: "A long candlelit table set for dinner on a boat deck at sunset.",
    objectPosition: "50% 50%",
    href: "/experiences/private-dining",
  },
] as const;

export const DESTINATIONS_INTRO = {
  eyebrow: "Where to next",
  titleLines: ["Curated", "Destinations"],
  lede: ["Eight places we know intimately.", "Chosen, not listed."],
  cta: { label: "All Destinations", href: "/destinations" },
} as const;

export const RAIL_INTRO = {
  eyebrow: "Ways to travel",
  titleLines: ["How You", "Explore"],
  cta: { label: "All Experiences", href: "/experiences" },
} as const;

export const PRIVATE_JOURNEY = {
  titleLines: ["Your Journey.", "Curated Around You."],
  lede: [
    "From airport arrival to private experiences,",
    "Easy Trav takes care of every detail.",
  ],
  primary: { label: "Plan My Journey", href: "/plan" },
  secondary: { label: "Contact Concierge", href: "/vip-concierge" },
  image: destImage("nileDinner"),
  alt: "",
} as const;
