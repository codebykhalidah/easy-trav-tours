import { HeroSlideshow } from "@/components/hero/HeroSlideshow";

/**
 * Layered hero media, in paint order:
 * slideshow (bed + frame per slide) → theme tint + left scrim (z-index above
 * every slide, so the cinematic envelope never travels with the photograph).
 *
 * Tint and scrim stay outside the slideshow so Royal / Onyx grading never
 * changes with the photograph. Slide 01 is the approved Giza frame and
 * renders immediately as the LCP image.
 */
export function HeroMedia() {
  return <HeroSlideshow />;
}
