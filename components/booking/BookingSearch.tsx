"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import { BookingField } from "@/components/booking/BookingField";
import { Icon } from "@/components/ui/Icon";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import {
  BOOKING_TABS,
  BOOKING_TAB_LABELS,
  BOOKING_TAB_ICONS,
  DEFAULT_BOOKING_TAB,
  DEFAULT_ORIGIN,
  TRAVELER_OPTIONS,
  type BookingTab,
} from "@/lib/constants/booking";
import { cn } from "@/lib/utils/cn";

/**
 * One component, two presentations.
 *
 * Desktop keeps the canonical six-column module. At phone widths the same
 * markup becomes an app-style discovery control: the tabs turn into icon
 * category chips, the destination field becomes the prominent search, and the
 * remaining fields collapse behind a disclosure. No field is duplicated, so
 * there are no repeated ids and nothing extra ships to either breakpoint.
 *
 * This phase has no backend: submitting is prevented and no search is issued.
 * When the booking engine lands, every value here is re-validated server-side
 * and no price or availability is ever trusted from this form.
 */
export function BookingSearch() {
  const [tab, setTab] = useState<BookingTab>(DEFAULT_BOOKING_TAB);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function selectAt(index: number) {
    const next = (index + BOOKING_TABS.length) % BOOKING_TABS.length;
    setTab(BOOKING_TABS[next]);
    tabRefs.current[next]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = BOOKING_TABS.indexOf(tab);
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectAt(current + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectAt(current - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectAt(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectAt(BOOKING_TABS.length - 1);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      className={cn("booking", detailsOpen && "booking--expanded")}
      onSubmit={onSubmit}
    >
      <div className="booking__shelf">
        <div
          className="booking__tabs"
          role="tablist"
          aria-label="Search type"
          onKeyDown={onTabKeyDown}
        >
          {BOOKING_TABS.map((item, index) => {
            const selected = item === tab;
            return (
              <button
                key={item}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`booking-tab-${item}`}
                aria-selected={selected}
                aria-controls="booking-panel"
                tabIndex={selected ? 0 : -1}
                className="booking__tab"
                onClick={() => setTab(item)}
              >
                <Icon
                  name={BOOKING_TAB_ICONS[item]}
                  size={20}
                  className="booking__tabIcon"
                />
                {BOOKING_TAB_LABELS[item]}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="booking__body"
        id="booking-panel"
        role="tabpanel"
        aria-labelledby={`booking-tab-${tab}`}
      >
        <BookingField
          id="booking-to"
          label="To"
          icon="pin"
          className="field--to"
        >
          <input
            id="booking-to"
            name="to"
            type="text"
            className="field__control"
            placeholder="Where to?"
            autoComplete="off"
          />
        </BookingField>

        <BookingField
          id="booking-from"
          label="From"
          icon="pin"
          className="field--advanced field--from"
        >
          <input
            id="booking-from"
            name="from"
            type="text"
            className="field__control"
            defaultValue={DEFAULT_ORIGIN}
            autoComplete="off"
          />
        </BookingField>

        <BookingField
          id="booking-depart"
          label="Depart"
          icon="calendar"
          className="field--advanced"
        >
          <input
            id="booking-depart"
            name="depart"
            type="text"
            className="field__control"
            placeholder="Select Date"
            autoComplete="off"
          />
        </BookingField>

        <BookingField
          id="booking-return"
          label="Return"
          icon="calendar"
          className="field--advanced"
        >
          <input
            id="booking-return"
            name="return"
            type="text"
            className="field__control"
            placeholder="Select Date"
            autoComplete="off"
          />
        </BookingField>

        <BookingField
          id="booking-travelers"
          label="Travelers"
          icon="chevron"
          className="field--select field--advanced"
        >
          <select id="booking-travelers" name="travelers" className="field__control">
            {TRAVELER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </BookingField>

        <button
          type="button"
          className="booking__more"
          aria-expanded={detailsOpen}
          aria-controls="booking-panel"
          onClick={() => setDetailsOpen((open) => !open)}
        >
          {detailsOpen ? "Fewer options" : "Dates, travellers & more"}
          <Icon name="chevron" size={15} className="booking__moreIcon" />
        </button>

        <div className="booking__action">
          <LuxuryButton
            type="submit"
            variant="metallic"
            size="md"
            withArrow
            className="booking__search"
          >
            Search
          </LuxuryButton>
        </div>
      </div>
    </form>
  );
}
