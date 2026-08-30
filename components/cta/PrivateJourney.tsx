import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { LuxuryLinkButton } from "@/components/ui/LuxuryButton";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { PRIVATE_JOURNEY } from "@/lib/constants/destinations";

/** The page's emotional close: one dark cinematic frame, centred type. */
export function PrivateJourney() {
  return (
    <section className="journey" aria-labelledby="journey-title">
      <div className="journey__media">
        <Image
          src={PRIVATE_JOURNEY.image}
          alt={PRIVATE_JOURNEY.alt}
          fill
          sizes="100vw"
          style={{ objectPosition: "50% 58%" }}
        />
        <div className="journey__scrim" />
      </div>

      <Container className="journey__inner">
        <h2 id="journey-title" className="display journey__title">
          <DisplayLines lines={PRIVATE_JOURNEY.titleLines} />
        </h2>
        <p className="journey__lede">
          {PRIVATE_JOURNEY.lede.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <div className="journey__actions">
          <LuxuryLinkButton
            href={PRIVATE_JOURNEY.primary.href}
            variant="metallic"
            size="md"
            withArrow
          >
            {PRIVATE_JOURNEY.primary.label}
          </LuxuryLinkButton>
          <LuxuryLinkButton href={PRIVATE_JOURNEY.secondary.href} size="md">
            {PRIVATE_JOURNEY.secondary.label}
          </LuxuryLinkButton>
        </div>
      </Container>
    </section>
  );
}
