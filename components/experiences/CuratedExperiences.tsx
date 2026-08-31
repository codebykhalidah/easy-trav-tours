import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { CardShell } from "@/components/commerce/CardShell";
import { CardActions } from "@/components/ui/CardActions";
import { CardPrice } from "@/components/ui/CardPrice";
import { DiscountBadge } from "@/components/ui/DiscountBadge";
import { LuxuryLinkButton } from "@/components/ui/LuxuryButton";
import { DisplayLines } from "@/components/ui/DisplayLines";
import {
  CURATED_EXPERIENCES,
  EXPERIENCES_INTRO,
} from "@/lib/constants/experiences";

/**
 * Type column at roughly 28% against an asymmetric image field: the first tile
 * runs tall down the left of the field, the other three stack beside it.
 */
export function CuratedExperiences() {
  return (
    <section
      className="section experiences"
      aria-labelledby="experiences-title"
      id="experiences"
    >
      <Container className="experiences__grid">
        <div className="experiences__intro">
          <h2 id="experiences-title" className="display experiences__title">
            <DisplayLines lines={EXPERIENCES_INTRO.titleLines} />
          </h2>
          <p className="experiences__lede">
            {EXPERIENCES_INTRO.lede.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <LuxuryLinkButton
            href={EXPERIENCES_INTRO.cta.href}
            size="md"
            className="experiences__cta"
          >
            {EXPERIENCES_INTRO.cta.label}
          </LuxuryLinkButton>
        </div>

        <ul className="experiences__field">
          {CURATED_EXPERIENCES.map((item, index) => (
            <li key={item.id} className={index === 0 ? "is-tall" : undefined}>
              <CardShell id={item.id} className="exp-tile">
                <span className="exp-tile__media">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 30vw"
                        : "(max-width: 767px) 46vw, (max-width: 1023px) 30vw, 20vw"
                    }
                    style={{ objectPosition: item.objectPosition }}
                  />
                </span>

                {item.discount ? <DiscountBadge discount={item.discount} /> : null}

                <div className="exp-tile__body">
                  <span className="exp-tile__name">{item.title}</span>
                  <span className="exp-tile__meta">{item.meta}</span>

                  <div className="exp-tile__foot">
                    <CardPrice price={item.price} oldPrice={item.oldPrice} />
                    <CardActions
                      item={{
                        id: item.id,
                        name: item.title,
                        price: item.price,
                        image: item.image,
                        href: item.href,
                        meta: item.meta,
                      }}
                      compact
                    />
                  </div>
                </div>

                <Link
                  href={item.href}
                  className="card-overlay"
                  aria-label={`${item.title}, ${item.meta}`}
                />
              </CardShell>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
