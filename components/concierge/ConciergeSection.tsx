import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { LuxuryLinkButton } from "@/components/ui/LuxuryButton";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { CONCIERGE_SECTION, CONCIERGE_STATS } from "@/lib/constants/concierge";

/**
 * Split composition: copy left, concierge photography right, with the four
 * figures carried on a hairline shelf beneath both — understated, per the
 * reference panel.
 */
export function ConciergeSection() {
  return (
    <section
      className="section concierge"
      aria-labelledby="concierge-title"
      id="concierge"
    >
      <Container>
        <div className="concierge__grid">
          <div className="concierge__copy">
            <h2 id="concierge-title" className="display concierge__title">
              <DisplayLines lines={CONCIERGE_SECTION.titleLines} />
            </h2>
            <p className="concierge__lede">
              {CONCIERGE_SECTION.lede.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <LuxuryLinkButton
              href={CONCIERGE_SECTION.cta.href}
              size="md"
              withArrow
            >
              {CONCIERGE_SECTION.cta.label}
            </LuxuryLinkButton>
          </div>

          <div className="concierge__media">
            <Image
              src={CONCIERGE_SECTION.image}
              alt={CONCIERGE_SECTION.imageAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 52vw"
              style={{ objectPosition: "62% 40%" }}
            />
            <div className="concierge__mediaScrim" />
          </div>
        </div>

        <dl className="stats">
          {CONCIERGE_STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <dt className="stat__label">{stat.label}</dt>
              <dd className="display stat__value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
