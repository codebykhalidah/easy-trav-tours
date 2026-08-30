import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { GUIDES_INTRO, TRAVEL_GUIDES } from "@/lib/constants/guides";

/**
 * Editorial preview, not a blog roll: image, category, title, read time. The
 * first story runs wide so the row has a lead rather than three equal columns.
 */
export function TravelGuides() {
  return (
    <section className="section guides" aria-labelledby="guides-title" id="guides">
      <Container>
        <SectionHeading
          id="guides-title"
          eyebrow={GUIDES_INTRO.eyebrow}
          titleLines={GUIDES_INTRO.titleLines}
          link={GUIDES_INTRO.cta}
        />

        <ul className="guides__grid">
          {TRAVEL_GUIDES.map((guide) => (
            <li key={guide.id}>
              <Link href={guide.href} className="guide">
                <span className="guide__media">
                  <Image
                    src={guide.image}
                    alt={guide.alt}
                    fill
                    sizes="(max-width: 767px) 78vw, (max-width: 1023px) 46vw, 32vw"
                    style={{ objectPosition: guide.objectPosition }}
                  />
                </span>
                <span className="guide__body">
                  <span className="guide__meta">
                    {guide.category}
                    <span className="guide__dot" aria-hidden="true" />
                    {guide.readTime}
                  </span>
                  <span className="display guide__title">{guide.title}</span>
                  <Icon name="arrow" size={14} className="guide__arrow" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
