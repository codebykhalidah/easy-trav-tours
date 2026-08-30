"use client";

import { useEffect } from "react";

import { CINEMA_EASE, REVEAL_EASE, ScrollTrigger, ensureGsap } from "@/lib/motion/gsap";

type Gsap = ReturnType<typeof ensureGsap>;

const HEADINGS = [
  ".hero__title",
  ".section-head__title",
  ".moment__title",
  ".experiences__title",
  ".egypt__title",
  ".concierge__title",
  ".journey__title",
  ".offers__title",
  ".footer__statement",
] as const;

const LEDES = [
  ".section-head__lede",
  ".moment__lede",
  ".experiences__lede",
  ".egypt__lede",
  ".concierge__lede",
  ".journey__lede",
] as const;

/** Full-bleed cinematic frames that open behind their own headline. */
const CINEMATIC_MEDIA = [
  { media: ".moment__media", host: ".moment" },
  { media: ".egypt__media", host: ".egypt" },
  { media: ".journey__media", host: ".journey" },
] as const;

/** Releases the CSS pre-hide once inline start states are in place. */
function markReady() {
  document.documentElement.classList.add("motion-ready");
}

/**
 * Homepage motion only. Selects existing markup — no layout or copy changes.
 * Desktop gets the editorial entrance, masked line reveals and restrained
 * parallax. Phone is lighter. Reduced motion leaves everything static and
 * immediately readable.
 */
export function PageMotion() {
  useEffect(() => {
    const gsap = ensureGsap();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markReady();
      return;
    }

    const ctx = gsap.context(() => {
      heroIntro(gsap);

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          revealHeadings(gsap, { duration: 0.95, stagger: 0.11 });
          revealLedes(gsap, { y: 12, duration: 0.8 });
          revealEyebrows(gsap, { y: 10, duration: 0.6 });
          revealMosaic(gsap, { y: 18, stagger: 0.08 });
          revealTiles(gsap, ".moment__overlap .cube__media", ".moment", {
            y: 16,
            stagger: 0.08,
          });
          revealTiles(gsap, ".offers__rail .offer__media", ".offers", {
            y: 16,
            stagger: 0.09,
          });
          revealExperiences(gsap);
          revealTiles(gsap, ".rail .cube__media", ".rail-section", {
            y: 14,
            stagger: 0.07,
          });
          revealTiles(gsap, ".guides__grid .guide__media", ".guides", {
            y: 16,
            stagger: 0.09,
          });
          revealStats(gsap);
          revealSupportingCopy(gsap);
          revealFooter(gsap);
          openCinematicMedia(gsap);
          openPortraitMedia(gsap);
          parallaxImage(gsap, ".moment__media img", ".moment", 5.5);
          parallaxImage(gsap, ".egypt__media img", ".egypt", 4.5);
          parallaxImage(gsap, ".journey__media img", ".journey", 4);
          depthPair(gsap, ".moment__overlap", ".moment");
        },
      );

      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          revealHeadings(gsap, { duration: 0.7, stagger: 0.07 });
          revealLedes(gsap, { y: 9, duration: 0.6 });
          revealEyebrows(gsap, { y: 8, duration: 0.42 });
          revealMosaic(gsap, { y: 12, stagger: 0.05 });
          revealTiles(gsap, ".moment__overlap .cube__media", ".moment", {
            y: 10,
            stagger: 0.05,
          });
          revealTiles(gsap, ".offers__rail .offer__media", ".offers", {
            y: 10,
            stagger: 0.05,
          });
          revealTiles(gsap, ".experiences__field .exp-tile__media", ".experiences", {
            y: 10,
            stagger: 0.05,
          });
          revealTiles(gsap, ".rail .cube__media", ".rail-section", {
            y: 10,
            stagger: 0.05,
          });
          revealTiles(gsap, ".guides__grid .guide__media", ".guides", {
            y: 10,
            stagger: 0.05,
          });
          revealStats(gsap);
          revealSupportingCopy(gsap);
          revealFooter(gsap);
          openPortraitMedia(gsap);
        },
      );
    });

    /**
     * Reveals start from a hidden state, so a trigger that never fires would
     * leave content invisible. Positions are first measured while images and
     * webfonts are still settling, so they must be re-measured afterwards —
     * a refresh also fires any trigger whose start has since been passed,
     * which is what rescues deep links into a section.
     */
    const refresh = () => ScrollTrigger.refresh();
    refresh();

    if (document.readyState !== "complete") {
      window.addEventListener("load", refresh, { once: true });
    }
    document.fonts?.ready.then(refresh).catch(() => undefined);
    const settle = window.setTimeout(refresh, 1200);
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}

/* ==========================================================================
   Hero entrance — once, on load. Never replays with a slide change.
   ========================================================================== */

function heroIntro(gsap: Gsap) {
  // A page opened in a background tab has no rAF, so the timeline would not
  // advance while the inline hidden state stayed applied. Skip the entrance
  // entirely there — it would be missed anyway — and show the hero at rest.
  if (document.hidden) {
    markReady();
    return;
  }

  const nav = document.querySelector(".site-header__inner");
  const eyebrow = document.querySelector(".hero__copy .eyebrow");
  const titleLines = document.querySelectorAll(".hero__title .line__inner");
  const lede = document.querySelector(".hero__lede");
  const cta = document.querySelector(".hero__cta");
  const concierge = document.querySelector(".hero__concierge");
  const booking = document.querySelector(".booking");
  const benefits = document.querySelector(".benefits__grid");

  const fades = [nav, eyebrow, lede, cta, concierge, booking, benefits].filter(
    (node): node is Element => node !== null,
  );

  // Inline start states first, then release the CSS pre-hide, so the swap
  // never shows an unstyled frame.
  gsap.set(fades, { autoAlpha: 0 });
  if (titleLines.length > 0) gsap.set(titleLines, { yPercent: 105 });
  markReady();

  const tl = gsap.timeline({ defaults: { ease: REVEAL_EASE } });

  if (nav) tl.to(nav, { autoAlpha: 1, y: 0, duration: 0.7 }, 0);
  if (eyebrow) tl.fromTo(eyebrow, { y: 10 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.18);

  if (titleLines.length > 0) {
    tl.to(
      titleLines,
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.12,
        ease: CINEMA_EASE,
        clearProps: "transform",
      },
      0.28,
    );
  }

  if (lede) tl.fromTo(lede, { y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.62);
  if (booking) tl.fromTo(booking, { y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.7);
  if (cta) tl.fromTo(cta, { y: 10 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.78);
  if (concierge) {
    tl.fromTo(concierge, { y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.86);
  }
  if (benefits) {
    tl.fromTo(benefits, { y: 12 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.95);
  }

  // Watchdog: the inline hidden state must never outlive the entrance, whatever
  // stalls the ticker. Well clear of the ~1.7s choreography.
  const watchdog = window.setTimeout(() => {
    if (tl.progress() < 1) tl.progress(1);
  }, 4000);
  tl.eventCallback("onComplete", () => window.clearTimeout(watchdog));
}

/* ==========================================================================
   Scroll reveals
   ========================================================================== */

function revealHeadings(gsap: Gsap, opts: { duration: number; stagger: number }) {
  let revealIndex = 0;

  for (const selector of HEADINGS) {
    for (const title of gsap.utils.toArray<HTMLElement>(selector)) {
      // The hero heading is owned by the entrance timeline.
      if (title.closest(".hero")) continue;

      const inners = title.querySelectorAll<HTMLElement>(".line__inner");
      const direction = revealIndex % 3;
      revealIndex += 1;

      if (inners.length > 0) {
        const from =
          direction === 0
            ? { yPercent: 105 }
            : {
                xPercent: direction === 1 ? -7 : 7,
                autoAlpha: 0,
                filter: "blur(5px)",
              };

        gsap.from(inners, {
          ...from,
          duration: opts.duration,
          stagger: opts.stagger,
          ease: CINEMA_EASE,
          clearProps: "transform,opacity,visibility,filter",
          scrollTrigger: { trigger: title, start: "top 86%", once: true },
        });
      } else {
        gsap.from(title, {
          y: 18,
          autoAlpha: 0,
          duration: opts.duration,
          ease: REVEAL_EASE,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: title, start: "top 86%", once: true },
        });
      }
    }
  }
}

function revealLedes(gsap: Gsap, opts: { y: number; duration: number }) {
  const ledes = gsap.utils.toArray<HTMLElement>(LEDES.join(", "));

  ledes.forEach((lede, index) => {
    if (lede.closest(".hero")) return;
    gsap.from(lede, {
      y: opts.y,
      x: index % 2 === 0 ? -7 : 7,
      autoAlpha: 0,
      filter: "blur(4px)",
      duration: opts.duration,
      ease: REVEAL_EASE,
      clearProps: "transform,opacity,visibility,filter",
      scrollTrigger: { trigger: lede, start: "top 90%", once: true },
    });
  });
}

function revealEyebrows(gsap: Gsap, opts: { y: number; duration: number }) {
  for (const eyebrow of gsap.utils.toArray<HTMLElement>(".eyebrow")) {
    if (eyebrow.closest(".hero")) continue;
    gsap.from(eyebrow, {
      x: -opts.y,
      autoAlpha: 0,
      letterSpacing: "0.32em",
      duration: opts.duration,
      ease: REVEAL_EASE,
      clearProps: "transform,opacity,visibility,letterSpacing",
      scrollTrigger: { trigger: eyebrow, start: "top 90%", once: true },
    });
  }
}

function revealMosaic(gsap: Gsap, opts: { y: number; stagger: number }) {
  const mosaic = document.querySelector(".mosaic");
  if (!mosaic) return;

  const feature = mosaic.querySelector(".mosaic__feature .cube__media");
  const cubes = mosaic.querySelectorAll(".mosaic__field .cube__media");

  const tl = gsap.timeline({
    scrollTrigger: { trigger: mosaic, start: "top 82%", once: true },
  });

  if (feature) {
    addImageReveal(tl, feature, 0, {
      y: opts.y + 4,
      duration: 1.05,
    });
  }

  if (cubes.length > 0) {
    cubes.forEach((node, index) => {
      addImageReveal(tl, node, index + 1, {
        y: opts.y,
        duration: 0.9,
        position: feature ? 0.2 + index * opts.stagger : index * opts.stagger,
      });
    });
  }
}

function revealTiles(
  gsap: Gsap,
  selector: string,
  trigger: string,
  opts: { y: number; stagger: number },
) {
  const nodes = gsap.utils.toArray<HTMLElement>(selector);
  const host = document.querySelector(trigger);
  if (nodes.length === 0 || !host) return;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: host, start: "top 84%", once: true },
  });

  nodes.forEach((node, index) => {
    addImageReveal(tl, node, index, {
      y: opts.y,
      duration: 0.9,
      position: index * opts.stagger,
    });
  });
}

function revealExperiences(gsap: Gsap) {
  const field = document.querySelector(".experiences__field");
  if (!field) return;

  const tall = field.querySelector("li.is-tall .exp-tile__media");
  const rest = field.querySelectorAll("li:not(.is-tall) .exp-tile__media");
  if (!tall && rest.length === 0) return;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: field, start: "top 82%", once: true },
  });

  if (tall) {
    addImageReveal(tl, tall, 0, { y: 20, duration: 1.05 });
  }

  if (rest.length > 0) {
    rest.forEach((node, index) => {
      addImageReveal(tl, node, index + 1, {
        y: 16,
        duration: 0.9,
        position: tall ? 0.2 + index * 0.09 : index * 0.09,
      });
    });
  }
}

/**
 * Opens a card photograph with a directional mask while the image settles
 * inside it. The wrapper and image both clear their inline transforms at the
 * end, preserving every existing hover and resting style.
 */
function addImageReveal(
  timeline: ReturnType<Gsap["timeline"]>,
  media: Element,
  index: number,
  opts: { y: number; duration: number; position?: string | number },
) {
  const fromRight = index % 2 === 1;
  const image = media.querySelector("img");
  const position = opts.position ?? 0;

  timeline.fromTo(
    media,
    {
      y: opts.y,
      autoAlpha: 0,
      clipPath: fromRight ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
    },
    {
      y: 0,
      autoAlpha: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: opts.duration,
      ease: CINEMA_EASE,
      clearProps: "transform,opacity,visibility,clipPath",
    },
    position,
  );

  if (image) {
    timeline.fromTo(
      image,
      { scale: 1.075, xPercent: fromRight ? -1.5 : 1.5 },
      {
        scale: 1,
        xPercent: 0,
        duration: opts.duration * 1.12,
        ease: CINEMA_EASE,
        clearProps: "transform",
      },
      position,
    );
  }
}

function revealSupportingCopy(gsap: Gsap) {
  const groups = gsap.utils.toArray<HTMLElement>(
    ".offer__content, .cube__content, .exp-tile__content, .guide__content, .advantages, .benefits__grid",
  );

  for (const group of groups) {
    const items = Array.from(group.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
    if (items.length === 0) continue;

    gsap.from(items, {
      y: 8,
      autoAlpha: 0,
      duration: 0.58,
      stagger: 0.055,
      delay: 0.14,
      ease: REVEAL_EASE,
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger: group, start: "top 89%", once: true },
    });
  }
}

function revealStats(gsap: Gsap) {
  const stats = document.querySelector(".stats");
  if (!stats) return;

  gsap.from(stats.querySelectorAll(".stat"), {
    y: 14,
    autoAlpha: 0,
    duration: 0.75,
    stagger: 0.08,
    ease: REVEAL_EASE,
    scrollTrigger: { trigger: stats, start: "top 88%", once: true },
  });
}

function revealFooter(gsap: Gsap) {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  const brand = footer.querySelector(".footer__brand");
  const links = footer.querySelectorAll(".footer__nav a");

  const tl = gsap.timeline({
    scrollTrigger: { trigger: footer, start: "top 92%", once: true },
  });

  if (brand) {
    tl.from(brand, { y: 10, autoAlpha: 0, duration: 0.7, ease: REVEAL_EASE }, 0);
  }
  if (links.length > 0) {
    tl.from(
      links,
      { y: 8, autoAlpha: 0, duration: 0.6, stagger: 0.06, ease: REVEAL_EASE },
      0.12,
    );
  }
}

/**
 * The three full-bleed frames open with a soft upward mask while their
 * headline reveals on its own trigger just after — overlap, not a queue.
 */
function openCinematicMedia(gsap: Gsap) {
  for (const { media, host } of CINEMATIC_MEDIA) {
    const node = document.querySelector(media);
    const section = document.querySelector(host);
    if (!node || !section) continue;

    gsap.from(node, {
      clipPath: "inset(0% 0% 26% 0%)",
      duration: 0.9,
      ease: CINEMA_EASE,
      scrollTrigger: { trigger: section, start: "top 88%", once: true },
    });
  }
}

/** The concierge portrait gets a quieter vertical reveal of its own. */
function openPortraitMedia(gsap: Gsap) {
  const media = document.querySelector(".concierge__media");
  const host = document.querySelector(".concierge");
  if (!media || !host) return;

  const image = media.querySelector("img");
  const tl = gsap.timeline({
    scrollTrigger: { trigger: host, start: "top 86%", once: true },
  });

  tl.fromTo(
    media,
    { clipPath: "inset(12% 0% 12% 0%)", autoAlpha: 0 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      autoAlpha: 1,
      duration: 1.05,
      ease: CINEMA_EASE,
      clearProps: "opacity,visibility,clipPath",
    },
  );

  if (image) {
    tl.fromTo(
      image,
      { scale: 1.06 },
      {
        scale: 1,
        duration: 1.2,
        ease: CINEMA_EASE,
        clearProps: "transform",
      },
      0,
    );
  }
}

/* ==========================================================================
   Scrubbed depth
   ========================================================================== */

function parallaxImage(gsap: Gsap, image: string, section: string, amount: number) {
  const img = document.querySelector(image);
  const host = document.querySelector(section);
  if (!img || !host) return;

  gsap.fromTo(
    img,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: "none",
      scrollTrigger: {
        trigger: host,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.65,
      },
    },
  );
}

function depthPair(gsap: Gsap, foreground: string, section: string) {
  const front = document.querySelector(foreground);
  const host = document.querySelector(section);
  if (!front || !host) return;

  gsap.fromTo(
    front,
    { yPercent: 1 },
    {
      yPercent: -1,
      ease: "none",
      scrollTrigger: {
        trigger: host,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    },
  );
}
