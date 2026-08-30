import { destImage } from "@/lib/constants/destinations";

export interface Offer {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly place: string;
  readonly duration: string;
  readonly fromPrice: string;
  readonly oldPrice?: string;
  readonly discount?: number;
  readonly image: string;
  readonly alt: string;
  readonly objectPosition: string;
  readonly href: string;
}

/**
 * More commercial than the destination cubes — place, duration and a from-price
 * — but still presented image-first, as invitations rather than listings.
 */
export const EXCLUSIVE_OFFERS: readonly Offer[] = [
  {
    id: "giza-sunrise",
    eyebrow: "Limited release",
    title: "Sunrise Over Giza",
    place: "Cairo",
    duration: "3 nights",
    fromPrice: "From $1,450",
    oldPrice: "$1,850",
    discount: 22,
    image: destImage("gizaCamelSunset"),
    alt: "A couple and a camel handler before the pyramids of Giza at sunrise.",
    objectPosition: "56% 48%",
    href: "/deals/sunrise-over-giza",
  },
  {
    id: "dahabiya-nile",
    eyebrow: "Private access",
    title: "Nile Dahabiya Escape",
    place: "Luxor to Aswan",
    duration: "5 nights",
    fromPrice: "From $2,780",
    image: destImage("feluccaSunset"),
    alt: "Guests aboard a traditional sailing dahabiya on the Nile at sunset.",
    objectPosition: "54% 50%",
    href: "/deals/nile-dahabiya-escape",
  },
  {
    id: "red-sea-charter",
    eyebrow: "Members only",
    title: "Red Sea Private Charter",
    place: "Hurghada",
    duration: "4 nights",
    fromPrice: "From $1,960",
    oldPrice: "$2,450",
    discount: 20,
    image: destImage("privateCharter"),
    alt: "A couple aboard a private charter boat on the Red Sea at sunset.",
    objectPosition: "50% 44%",
    href: "/deals/red-sea-private-charter",
  },
] as const;
