import { BookingSearch } from "@/components/booking/BookingSearch";
import { Container } from "@/components/layout/Container";

/**
 * The booking module lives in its own section so the phone layout can order it
 * above the hero — an app home leads with search, a desktop page leads with the
 * cinematic frame. Same markup, reordered by CSS.
 */
export function BookingSection() {
  return (
    <section className="booking-section" aria-label="Search journeys">
      <Container>
        {/* App-shell greeting, phone only. */}
        <div className="greeting">
          <p className="greeting__hello">
            Hello, Explorer <span aria-hidden="true">✦</span>
          </p>
          <p className="greeting__sub">Where will ease take you next?</p>
        </div>

        <BookingSearch />
      </Container>
    </section>
  );
}
