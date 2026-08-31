"use client";

import { useEffect } from "react";

/** Distance before the header takes on its glass. */
const THRESHOLD = 32;

/**
 * Flags the document once the page has moved off the top, so the fixed header
 * can fade from fully transparent over the hero to a glass panel against the
 * content below.
 *
 * A class on the root rather than React state: the header stays a Server
 * Component, and scrolling never re-renders anything.
 */
export function HeaderScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let flagged = false;

    const apply = () => {
      frame = 0;
      const scrolled = window.scrollY > THRESHOLD;
      if (scrolled === flagged) return;
      flagged = scrolled;
      root.classList.toggle("is-scrolled", scrolled);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("is-scrolled");
    };
  }, []);

  return null;
}
