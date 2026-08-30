import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { DestinationCube } from "@/components/destinations/DestinationCube";
import { DESTINATION_RAIL, RAIL_INTRO } from "@/lib/constants/destinations";

/**
 * Activity-led discovery. A snap rail at every width — it is the one place on
 * the page where horizontal travel is the point, so it stays a rail on desktop
 * rather than becoming another grid.
 */
export function DestinationRail() {
  return (
    <section className="section rail-section" aria-labelledby="rail-title" id="ways">
      <Container>
        <SectionHeading
          id="rail-title"
          eyebrow={RAIL_INTRO.eyebrow}
          titleLines={RAIL_INTRO.titleLines}
          link={RAIL_INTRO.cta}
        />
      </Container>

      <Container>
        <ul className="rail">
          {DESTINATION_RAIL.map((card) => (
            <li key={card.id}>
              <DestinationCube
                card={card}
                sizes="(max-width: 767px) 62vw, (max-width: 1023px) 38vw, 24vw"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
