import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { DestinationCube } from "@/components/destinations/DestinationCube";
import {
  DESTINATIONS_INTRO,
  DESTINATION_CUBES,
  DESTINATION_FEATURE,
} from "@/lib/constants/destinations";

/**
 * Editorial mosaic rather than a row of equal cards: one tall feature holding
 * the left column against a field of square cubes, which becomes a two-up grid
 * on tablet and a two-column app grid on phones.
 */
export function DestinationMosaic() {
  return (
    <section
      className="section destinations"
      aria-labelledby="destinations-title"
      id="destinations"
    >
      <Container>
        <SectionHeading
          id="destinations-title"
          eyebrow={DESTINATIONS_INTRO.eyebrow}
          titleLines={DESTINATIONS_INTRO.titleLines}
          lede={DESTINATIONS_INTRO.lede}
          link={DESTINATIONS_INTRO.cta}
        />

        <div className="mosaic">
          <DestinationCube
            card={DESTINATION_FEATURE}
            variant="feature"
            className="mosaic__feature"
            sizes="(max-width: 767px) 92vw, (max-width: 1023px) 96vw, 38vw"
          />

          <ul className="mosaic__field">
            {DESTINATION_CUBES.slice(0, 6).map((card) => (
              <li key={card.id}>
                <DestinationCube
                  card={card}
                  sizes="(max-width: 767px) 46vw, (max-width: 1023px) 31vw, 19vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
