export interface HeroImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

/**
 * The approved homepage hero: Giza at sunset with the balloon composition of
 * `01-canonical-homepage.png`. One source frame serves both Royal and Onyx —
 * the modes differ only in the non-destructive CSS grade above it.
 */
export const HERO_IMAGE: HeroImage = {
  src: "/images/easy-trav-giza-hero-royal-dark.png",
  width: 1672,
  height: 941,
  alt:
    "The pyramids of Giza at sunset, a hot-air balloon drifting above the " +
    "lamplit town in the foreground.",
};

export const HERO_CONTENT = {
  eyebrow: "Journeys curated for you",
  titleLines: ["Explore More.", "Worry Less."],
  lede: ["Premium travel experiences.", "Designed around you."],
  cta: { label: "Discover Now", href: "/destinations" },
} as const;

export const HERO_CONCIERGE = {
  title: "VIP",
  kicker: "Concierge",
  copy: ["24/7 Personal", "Travel Assistance"],
  href: "/vip-concierge",
} as const;

const HERO_SLIDE_DIR = "/images/hero slides/";

/**
 * Additional cinematic frames. Filenames are kept exactly as delivered;
 * awkward characters stay in this file only.
 */
const HERO_SLIDE_FILE = {
  gizaCamelCouple: "ChatGPT Image Aug 30, 2026, 02_14_23 PM (1).png",
  redSeaSpeedboat: "ChatGPT Image Aug 30, 2026, 02_14_23 PM (3).png",
  grandEgyptianMuseum: "ChatGPT Image Aug 30, 2026, 02_14_24 PM (4).png",
  balloonNileTemple: "ChatGPT Image Aug 30, 2026, 02_14_25 PM (9).png",
} as const;

export interface HeroSlide extends HeroImage {
  readonly id: string;
  /** Extra slides only — slide 01 keeps its CSS crop and must not set this. */
  readonly objectPosition?: string;
  readonly objectPositionTablet?: string;
  readonly objectPositionMobile?: string;
}

/**
 * Slide 01 is the approved Giza hero and must render with the existing
 * `.hero__photo` / `.hero__bed` CSS — no inline crop, no extra transform.
 * Later slides may set object-position only.
 */
export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "giza-sunset",
    src: HERO_IMAGE.src,
    width: HERO_IMAGE.width,
    height: HERO_IMAGE.height,
    alt: HERO_IMAGE.alt,
  },
  {
    id: "balloon-nile",
    src: HERO_SLIDE_DIR + HERO_SLIDE_FILE.balloonNileTemple,
    width: 1448,
    height: 1086,
    alt: "Passengers in a hot-air balloon basket above a Nile-side temple at sunrise.",
    objectPosition: "38% 46%",
    objectPositionTablet: "48% 42%",
    objectPositionMobile: "78% 42%",
  },
  {
    id: "grand-egyptian-museum",
    src: HERO_SLIDE_DIR + HERO_SLIDE_FILE.grandEgyptianMuseum,
    width: 1448,
    height: 1086,
    alt: "Travellers before the colossus of Ramses II in the Grand Egyptian Museum.",
    objectPosition: "58% 38%",
    objectPositionTablet: "56% 36%",
    objectPositionMobile: "62% 32%",
  },
  {
    id: "giza-camel",
    src: HERO_SLIDE_DIR + HERO_SLIDE_FILE.gizaCamelCouple,
    width: 1448,
    height: 1086,
    alt: "A couple and their guide with a camel before the pyramids of Giza at sunset.",
    objectPosition: "56% 46%",
    objectPositionTablet: "54% 44%",
    objectPositionMobile: "64% 48%",
  },
  {
    id: "red-sea",
    src: HERO_SLIDE_DIR + HERO_SLIDE_FILE.redSeaSpeedboat,
    width: 1448,
    height: 1086,
    alt: "Guests aboard a private speedboat on the Red Sea, desert hills in the distance.",
    objectPosition: "62% 40%",
    objectPositionTablet: "58% 38%",
    objectPositionMobile: "72% 42%",
  },
] as const;
