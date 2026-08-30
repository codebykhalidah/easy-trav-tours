"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { HeroSlideLayer } from "@/components/hero/HeroSlideLayer";
import { HERO_SLIDES } from "@/lib/constants/hero";
import { ensureGsap } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils/cn";

/** Full cycle from one slide start to the next. Transition is inside this. */
const CYCLE_MS = 6200;
const TRANSITION_DESKTOP = 1.8;
const TRANSITION_PHONE = 1.15;

/**
 * Scenes alternate between full-height left and right entrances. Each has its
 * own slight vertical travel and photographic pan, so they do not repeat the
 * same movement. The outgoing scene stays fully opaque until it is covered,
 * removing the muddy overlap shadow of a crossfade.
 */
type SlideOrigin = "left" | "right";

interface SlideMotion {
  readonly origin: SlideOrigin;
  readonly xPercent: number;
  readonly yPercent: number;
  readonly photoXPercent: number;
  readonly photoYPercent: number;
}

const SLIDE_MOTIONS: readonly SlideMotion[] = [
  { origin: "left", xPercent: -5, yPercent: 1.4, photoXPercent: -7, photoYPercent: 1 },
  { origin: "right", xPercent: 5, yPercent: -1.2, photoXPercent: 7, photoYPercent: -1.8 },
  { origin: "left", xPercent: -4.6, yPercent: -0.8, photoXPercent: -6, photoYPercent: -1.2 },
  { origin: "right", xPercent: 4.8, yPercent: 1.5, photoXPercent: 6.5, photoYPercent: 2 },
  { origin: "left", xPercent: -5.2, yPercent: 0.4, photoXPercent: -7.5, photoYPercent: 0.6 },
];

const CLIP_START: Record<SlideOrigin, string> = {
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

const SLIDE_EASE = "sine.inOut";
/** One restrained camera move while a slide rests. */
const DWELL_SCALE = 1.016;
const HOLD_DESKTOP_MS = CYCLE_MS - TRANSITION_DESKTOP * 1000;
const HOLD_PHONE_MS = CYCLE_MS - TRANSITION_PHONE * 1000;
const PHONE_QUERY = "(max-width: 767px)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReduce(): boolean {
  return window.matchMedia(REDUCE_QUERY).matches;
}

function isPhone(): boolean {
  return window.matchMedia(PHONE_QUERY).matches;
}

export function HeroSlideshow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const busyRef = useRef(false);
  const pausedRef = useRef(false);
  const extrasRef = useRef(false);
  const startedRef = useRef(false);
  const holdTimer = useRef(0);
  const dwellTween = useRef<{ kill: () => void } | null>(null);
  const driftTween = useRef<{ kill: () => void } | null>(null);
  const goToRef = useRef<(next: number, user?: boolean) => void>(() => undefined);
  const holdRef = useRef<() => void>(() => undefined);
  const pendingRef = useRef<number | null>(null);

  const [index, setIndex] = useState(0);
  const [loadedThrough, setLoadedThrough] = useState(0);
  const lastSlide = HERO_SLIDES.length - 1;

  const stopHold = useCallback(() => {
    window.clearTimeout(holdTimer.current);
    dwellTween.current?.kill();
    dwellTween.current = null;
    driftTween.current?.kill();
    driftTween.current = null;
  }, []);

  const scheduleHold = useCallback(() => {
    stopHold();
    if (prefersReduce() || document.hidden || pausedRef.current) return;
    if (!extrasRef.current) return;

    const gsap = ensureGsap();
    const fill = rootRef.current
      ?.closest(".hero")
      ?.querySelector<HTMLElement>(".hero__progress-fill");
    if (fill) {
      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
      dwellTween.current = gsap.to(fill, {
        scaleX: 1,
        duration: (isPhone() ? HOLD_PHONE_MS : HOLD_DESKTOP_MS) / 1000,
        ease: "none",
      });
    }

    // One restrained camera move while the scene rests, on the photograph
    // rather than the slide, so it never collides with the transition's own
    // scale. Phones stay still.
    if (!isPhone()) {
      const photo = rootRef.current
        ?.querySelectorAll<HTMLElement>(".hero__slide")
        [indexRef.current]?.querySelector<HTMLElement>(".hero__photo");
      if (photo) {
        gsap.set(photo, { scale: 1 });
        // Runs exactly the hold, so it lands as the transition takes over
        // instead of being cut off mid-move.
        driftTween.current = gsap.to(photo, {
          scale: DWELL_SCALE,
          duration: HOLD_DESKTOP_MS / 1000,
          ease: "none",
        });
      }
    }

    holdTimer.current = window.setTimeout(() => {
      goToRef.current(indexRef.current + 1);
    }, isPhone() ? HOLD_PHONE_MS : HOLD_DESKTOP_MS);
  }, [stopHold]);

  const goTo = useCallback(
    (next: number, user = false) => {
      if (prefersReduce()) return;

      const root = rootRef.current;
      if (!root) return;
      const slides = Array.from(root.querySelectorAll<HTMLElement>(".hero__slide"));
      const current = indexRef.current;
      const target = ((next % slides.length) + slides.length) % slides.length;
      if (target === current || busyRef.current) {
        return;
      }
      if (!slides[target]?.querySelector("img")) {
        pendingRef.current = target;
        setLoadedThrough((currentLoaded) =>
          currentLoaded < lastSlide ? lastSlide : currentLoaded,
        );
        window.setTimeout(() => {
          if (pendingRef.current !== target || busyRef.current) return;
          pendingRef.current = null;
          goToRef.current(target, user);
        }, 80);
        return;
      }

      const outgoing = slides[current];
      const incoming = slides[target];
      if (!outgoing || !incoming) return;

      const outgoingPhoto = outgoing.querySelector<HTMLElement>(".hero__photo");
      const incomingPhoto = incoming.querySelector<HTMLElement>(".hero__photo");
      const incomingImages = Array.from(incoming.querySelectorAll("img"));

      // A mounted image is not necessarily decoded. Starting before both the
      // bed and crisp frame are ready causes the new scene to pop in halfway
      // through its motion, which reads as a jump.
      const imagesReady =
        incomingImages.length > 0 &&
        incomingImages.every((image) => image.complete && image.naturalWidth > 0);

      if (!imagesReady) {
        pendingRef.current = target;
        void Promise.all(
          incomingImages.map((image) => image.decode().catch(() => undefined)),
        ).then(() => {
          if (pendingRef.current !== target || busyRef.current) return;
          pendingRef.current = null;
          goToRef.current(target, user);
        });
        return;
      }

      const gsap = ensureGsap();
      busyRef.current = true;
      stopHold();

      const duration = isPhone() ? TRANSITION_PHONE : TRANSITION_DESKTOP;
      const phone = isPhone();
      const motion = SLIDE_MOTIONS[target] ?? SLIDE_MOTIONS[1];
      const origin = motion.origin;
      const offsetScale = phone ? 0.65 : 1;

      gsap.set(incoming, {
        autoAlpha: 1,
        zIndex: 2,
        clipPath: CLIP_START[origin],
        xPercent: motion.xPercent * offsetScale,
        yPercent: motion.yPercent * offsetScale,
      });
      gsap.set(outgoing, { autoAlpha: 1, zIndex: 1 });

      if (incomingPhoto) {
        gsap.set(incomingPhoto, {
          scale: phone ? 1.025 : 1.045,
          xPercent: motion.photoXPercent * offsetScale,
          yPercent: motion.photoYPercent * offsetScale,
        });
      }

      const timeline = gsap.timeline({
        defaults: { ease: SLIDE_EASE },
        onComplete: () => {
          gsap.set(incoming, {
            zIndex: 1,
            clearProps: "clipPath,scale,x,y,xPercent,yPercent",
          });
          gsap.set(outgoing, {
            autoAlpha: 0,
            zIndex: 0,
            clearProps: "clipPath,scale,x,y,xPercent,yPercent",
          });
          // Both photographs return to their CSS resting state so hover and
          // the next dwell move always start from a clean frame.
          if (outgoingPhoto) {
            gsap.set(outgoingPhoto, { clearProps: "scale,x,xPercent" });
          }
          if (incomingPhoto) {
            gsap.set(incomingPhoto, { clearProps: "scale,x,xPercent" });
          }
          indexRef.current = target;
          setIndex(target);
          setLoadedThrough((currentLoaded) =>
            currentLoaded < lastSlide ? lastSlide : currentLoaded,
          );
          busyRef.current = false;
          if (!user && !document.hidden && !pausedRef.current) {
            holdRef.current();
          }
        },
      });

      timeline.to(
        incoming,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          xPercent: 0,
          yPercent: 0,
          duration,
        },
        0,
      );

      if (incomingPhoto) {
        timeline.to(
          incomingPhoto,
          {
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            duration: duration * 1.03,
          },
          0,
        );
      }

      if (outgoingPhoto) {
        timeline.to(
          outgoingPhoto,
          {
            scale: 1.012,
            xPercent: motion.xPercent * -0.22 * offsetScale,
            yPercent: motion.yPercent * -0.22 * offsetScale,
            duration,
          },
          0,
        );
      }
    },
    [lastSlide, stopHold],
  );

  useEffect(() => {
    extrasRef.current = loadedThrough > 0;
    holdRef.current = scheduleHold;
    goToRef.current = goTo;
  }, [goTo, loadedThrough, scheduleHold]);

  useEffect(() => {
    if (prefersReduce()) return;

    const revealSecond = () => setLoadedThrough((n) => Math.max(n, 1));
    const idleWindow = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleId =
      idleWindow.requestIdleCallback?.(revealSecond, { timeout: 1800 }) ??
      window.setTimeout(revealSecond, 700);

    const reduceMq = window.matchMedia(REDUCE_QUERY);
    const onReduce = () => {
      if (reduceMq.matches) {
        stopHold();
        busyRef.current = false;
      }
    };
    reduceMq.addEventListener("change", onReduce);

    return () => {
      reduceMq.removeEventListener("change", onReduce);
      if (idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      stopHold();
    };
  }, [stopHold]);

  useEffect(() => {
    if (loadedThrough !== 1) return;
    const restId = window.setTimeout(() => {
      setLoadedThrough((n) => (n < lastSlide ? lastSlide : n));
    }, 400);
    return () => window.clearTimeout(restId);
  }, [lastSlide, loadedThrough]);

  useEffect(() => {
    if (loadedThrough < 1 || prefersReduce() || startedRef.current) return;
    startedRef.current = true;

    const root = rootRef.current;
    if (!root) return;
    const slides = Array.from(root.querySelectorAll<HTMLElement>(".hero__slide"));
    const gsap = ensureGsap();
    slides.forEach((node, i) => {
      if (i === indexRef.current) return;
      gsap.set(node, { autoAlpha: 0, zIndex: 0 });
    });

    scheduleHold();
  }, [loadedThrough, scheduleHold]);

  useEffect(() => {
    if (pendingRef.current === null) return;
    const pending = pendingRef.current;
    pendingRef.current = null;
    goToRef.current(pending, pausedRef.current);
  }, [loadedThrough]);

  useEffect(() => {
    function onVisibility() {
      if (document.hidden) {
        stopHold();
      } else if (extrasRef.current && !pausedRef.current && !prefersReduce()) {
        holdRef.current();
      }
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [stopHold]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.target instanceof HTMLElement) {
        const tag = event.target.tagName;
        if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      }

      const hero = rootRef.current?.closest(".hero");
      if (!(event.target instanceof Node) || !hero?.contains(event.target)) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        pausedRef.current = true;
        goTo(indexRef.current + 1, true);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        pausedRef.current = true;
        goTo(indexRef.current - 1, true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [goTo]);

  function selectSlide(next: number) {
    pausedRef.current = true;
    setLoadedThrough(lastSlide);
    goTo(next, true);
  }

  return (
    <>
      <div className="hero__media">
        <div
          ref={rootRef}
          className="hero__slides"
          aria-roledescription="carousel"
          aria-label="Featured destinations"
        >
          {HERO_SLIDES.map((slide, i) => (
            <HeroSlideLayer
              key={slide.id}
              slide={slide}
              index={i}
              canonical={i === 0}
              load={i === 0 || i <= loadedThrough}
              active={i === index}
            />
          ))}
        </div>
        <div className="hero__tint" />
        <div className="hero__scrim" />
      </div>

      <div className="hero__progress">
        <div className="hero__progress-track" role="tablist" aria-label="Hero scenes">
          {HERO_SLIDES.map((slide, i) => {
            const current = i === index;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={current}
                aria-label={`Scene ${String(i + 1).padStart(2, "0")}`}
                className={cn("hero__progress-seg", current && "is-active")}
                onClick={() => selectSlide(i)}
              />
            );
          })}
          <span className="hero__progress-fill" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
