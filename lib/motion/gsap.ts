"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registers plugins once per runtime. Safe to call from any client leaf.
 *
 * CustomEase matters here: GSAP core cannot parse a `cubic-bezier(...)` string
 * — `gsap.parseEase()` returns undefined and the tween silently falls back to
 * the default ease. The named curves below are registered properly so the
 * intended weighting is actually what runs.
 */
export function ensureGsap(): typeof gsap {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create(CINEMA_EASE, "0.65,0,0.35,1");
    CustomEase.create(REVEAL_EASE, "0.22,0.61,0.36,1");
    CustomEase.create(METAL_EASE, "0.4,0,0.15,1");
    registered = true;
  }
  return gsap;
}

export { ScrollTrigger };

/** Hero scene change — gentle start, smooth middle, soft settle. */
export const CINEMA_EASE = "etCinema";

/** Editorial reveal for headings, copy and tiles. */
export const REVEAL_EASE = "etReveal";

/** Metallic surfaces and button fills. */
export const METAL_EASE = "etMetal";
