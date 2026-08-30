import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { HERO_CONCIERGE } from "@/lib/constants/hero";

/**
 * Small vertical card floating on the photograph, right-aligned to the same
 * line as the navigation and anchored just above the hero's lower edge.
 */
export function HeroConciergeCard() {
  return (
    <div className="hero__concierge">
      <Link href={HERO_CONCIERGE.href} className="concierge-card">
        <span>
          <span className="concierge-card__title">{HERO_CONCIERGE.title}</span>
          <span className="concierge-card__kicker block">{HERO_CONCIERGE.kicker}</span>
        </span>

        <span className="concierge-card__copy">
          {HERO_CONCIERGE.copy.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>

        <span className="concierge-card__rule" aria-hidden="true" />
        <Icon name="concierge" size={20} className="concierge-card__icon" />
      </Link>
    </div>
  );
}
