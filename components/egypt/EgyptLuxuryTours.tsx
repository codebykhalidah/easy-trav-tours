import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { LuxuryLinkButton } from "@/components/ui/LuxuryButton";
import { DisplayLines } from "@/components/ui/DisplayLines";
import { EGYPT_TOURS, TOUR_ADVANTAGES } from "@/lib/constants/egypt";

/**
 * Full-bleed cinematic band: the photograph runs edge to edge with the copy
 * set into its darker left side, and the four advantages carried on a
 * hairline shelf across the bottom of the same frame.
 */
export function EgyptLuxuryTours() {
  return (
    <section className="egypt" aria-labelledby="egypt-title">
      <div className="egypt__media">
        <Image
          src={EGYPT_TOURS.image}
          alt="The colonnade of a Luxor temple lit at dusk."
          fill
          sizes="100vw"
          style={{ objectPosition: "50% 46%" }}
        />
        <div className="egypt__scrim" />
      </div>

      <Container className="egypt__inner">
        <div className="egypt__copy">
          <p className="eyebrow">{EGYPT_TOURS.eyebrow}</p>
          <h2 id="egypt-title" className="display egypt__title">
            <DisplayLines lines={EGYPT_TOURS.titleLines} />
          </h2>
          <p className="egypt__lede">
            {EGYPT_TOURS.lede.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <LuxuryLinkButton href={EGYPT_TOURS.cta.href} size="md" withArrow>
            {EGYPT_TOURS.cta.label}
          </LuxuryLinkButton>
        </div>

        <ul className="egypt__advantages">
          {TOUR_ADVANTAGES.map((item) => (
            <li key={item.title} className="advantage">
              <Icon name={item.icon} size={22} className="advantage__icon" />
              <div>
                <p className="advantage__title">{item.title}</p>
                <p className="advantage__copy">{item.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
