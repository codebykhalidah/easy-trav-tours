import Image from "next/image";
import type { CSSProperties } from "react";

import type { HeroSlide } from "@/lib/constants/hero";
import { cn } from "@/lib/utils/cn";

interface HeroSlideLayerProps {
  slide: HeroSlide;
  index: number;
  /** First slide is the LCP frame and uses the locked CSS crop. */
  canonical: boolean;
  /** Extra frames wait for idle before mounting their images. */
  load: boolean;
  active: boolean;
}

/**
 * One slideshow layer: the same bed + frame architecture as the original
 * hero. Canonical slide 01 leaves object-position to CSS. Extra slides set
 * `--slide-pos` variables only.
 */
export function HeroSlideLayer({
  slide,
  index,
  canonical,
  load,
  active,
}: HeroSlideLayerProps) {
  const style = canonical
    ? undefined
    : ({
        "--slide-pos": slide.objectPosition,
        "--slide-pos-t": slide.objectPositionTablet,
        "--slide-pos-m": slide.objectPositionMobile,
      } as CSSProperties);

  return (
    <div
      className={cn(
        "hero__slide",
        canonical && "hero__slide--canonical",
        active && "is-current",
      )}
      data-slide={slide.id}
      data-index={index}
      style={style}
      aria-hidden={!active}
    >
      {load ? (
        <>
          <div className="hero__bed" aria-hidden="true">
            <Image
              src={slide.src}
              alt=""
              width={slide.width}
              height={slide.height}
              sizes="100vw"
              quality={75}
              priority={canonical}
            />
          </div>

          <div className="hero__frame">
            <Image
              className="hero__photo"
              src={slide.src}
              alt={active ? slide.alt : ""}
              width={slide.width}
              height={slide.height}
              sizes="(max-width: 767px) 100vw, 80vw"
              quality={canonical ? 85 : 75}
              priority={canonical}
            />
          </div>
        </>
      ) : (
        <>
          <div className="hero__bed" aria-hidden="true" />
          <div className="hero__frame" />
        </>
      )}
    </div>
  );
}
