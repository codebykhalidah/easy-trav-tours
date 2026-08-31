import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { CardShell } from "@/components/commerce/CardShell";
import { CardActions } from "@/components/ui/CardActions";
import { CardPrice } from "@/components/ui/CardPrice";
import { DiscountBadge } from "@/components/ui/DiscountBadge";
import { Icon } from "@/components/ui/Icon";
import { EXCLUSIVE_OFFERS } from "@/lib/constants/offers";

/**
 * The commercial band: place, duration and a from-price, but image-first and
 * with no white information plate. A snap rail below 768.
 */
export function ExclusiveOffers() {
  return (
    <section className="section offers" aria-labelledby="offers-title" id="offers">
      <Container>
        <div className="offers__head">
          <h2 id="offers-title" className="display offers__title">
            E<span className="sc">xclusive</span> O<span className="sc">ffers</span>
          </h2>
          <Link href="/deals" className="section-head__link">
            View All
            <Icon name="arrow" size={14} className="btn__arrow" />
          </Link>
        </div>

        <ul className="offers__rail">
          {EXCLUSIVE_OFFERS.map((offer) => (
            <li key={offer.id}>
              <CardShell id={offer.id} className="offer">
                <span className="offer__media">
                  <Image
                    src={offer.image}
                    alt={offer.alt}
                    fill
                    sizes="(max-width: 767px) 78vw, (max-width: 1023px) 46vw, 30vw"
                    style={{ objectPosition: offer.objectPosition }}
                  />
                </span>

                {offer.discount ? <DiscountBadge discount={offer.discount} /> : null}

                <div className="offer__body">
                  <span className="offer__eyebrow">{offer.eyebrow}</span>
                  <span className="display offer__name">{offer.title}</span>
                  <span className="offer__meta">
                    {offer.place}
                    <span className="offer__dot" aria-hidden="true" />
                    {offer.duration}
                  </span>
                </div>

                <div className="offer__foot">
                  <CardPrice price={offer.fromPrice} oldPrice={offer.oldPrice} />
                  <CardActions
                    item={{
                      id: offer.id,
                      name: offer.title,
                      price: offer.fromPrice,
                      image: offer.image,
                      href: offer.href,
                      meta: `${offer.place} · ${offer.duration}`,
                    }}
                  />
                </div>

                <Link
                  href={offer.href}
                  className="card-overlay"
                  aria-label={`${offer.title}, ${offer.place}, ${offer.duration}`}
                />
              </CardShell>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
