import { LuxuryLinkButton } from "@/components/ui/LuxuryButton";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { HERO_CONTENT } from "@/lib/constants/hero";

export function HeroContent() {
  return (
    <div className="hero__copy">
      <p className="eyebrow">{HERO_CONTENT.eyebrow}</p>

      <h1 className="display hero__title">
        <DisplayLines lines={HERO_CONTENT.titleLines} />
      </h1>

      <p className="hero__lede">
        {HERO_CONTENT.lede.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      <div className="hero__cta">
        <LuxuryLinkButton href={HERO_CONTENT.cta.href} size="md" withArrow>
          {HERO_CONTENT.cta.label}
        </LuxuryLinkButton>
      </div>
    </div>
  );
}
