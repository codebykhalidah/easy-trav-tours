import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { DestinationCube } from "@/components/destinations/DestinationCube";
import { LuxuryLinkButton } from "@/components/ui/LuxuryButton";
import { DisplayLines } from "@/components/ui/DisplayLines";
import {
  DESTINATION_CUBES,
  EGYPT_MOMENT,
} from "@/lib/constants/destinations";

/**
 * The page's largest visual scale: a near-full-height photograph with minimal
 * type, and a short rail of cubes overlapping its lower edge so the moment
 * hands straight back to discovery instead of ending in a hard band.
 */
export function EgyptMoment() {
  return (
    <section className="moment" aria-labelledby="moment-title">
      <div className="moment__media">
        <Image
          src={EGYPT_MOMENT.image}
          alt={EGYPT_MOMENT.alt}
          fill
          sizes="100vw"
          style={{ objectPosition: "54% 46%" }}
        />
        <div className="moment__scrim" />
      </div>

      <Container className="moment__inner">
        <p className="eyebrow">{EGYPT_MOMENT.eyebrow}</p>
        <h2 id="moment-title" className="display moment__title">
          <DisplayLines lines={EGYPT_MOMENT.titleLines} />
        </h2>
        <p className="moment__lede">
          {EGYPT_MOMENT.lede.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <LuxuryLinkButton href={EGYPT_MOMENT.cta.href} size="md" withArrow>
          {EGYPT_MOMENT.cta.label}
        </LuxuryLinkButton>
      </Container>

      <Container>
        <ul className="moment__overlap">
          {DESTINATION_CUBES.slice(2, 6).map((card) => (
            <li key={card.id}>
              <DestinationCube
                card={card}
                sizes="(max-width: 767px) 42vw, (max-width: 1023px) 30vw, 21vw"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
