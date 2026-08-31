"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { useCommerce } from "@/components/commerce/CommerceProvider";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";
import type { SavedList } from "@/types/commerce";

const COPY: Readonly<Record<SavedList, { title: string; empty: string }>> = {
  cart: {
    title: "Your Cart",
    empty: "Nothing added yet. Add a journey from any card to see it here.",
  },
  favourites: {
    title: "Saved Journeys",
    empty: "No favourites yet. Tap the heart on any card to keep it here.",
  },
};

/**
 * One panel serving both lists — a bottom sheet on phones, a side panel on
 * desktop. Prototype only: it lists what has been added and links back to each
 * item; there is no checkout.
 */
export function SavedPanel() {
  const { cart, favourites, panel, closePanel, openPanel, remove } = useCommerce();
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panel) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;

      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [panel, closePanel]);

  if (!panel) return null;

  const items = panel === "cart" ? cart : favourites;
  const copy = COPY[panel];

  return (
    <div className="sheet-scrim" onClick={closePanel}>
      <div
        ref={sheetRef}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={copy.title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet__head">
          <div className="sheet__tabs" role="tablist" aria-label="Saved lists">
            {(["cart", "favourites"] as const).map((list) => (
              <button
                key={list}
                type="button"
                role="tab"
                aria-selected={panel === list}
                className={cn("sheet__tab", panel === list && "is-active")}
                onClick={() => openPanel(list)}
              >
                {COPY[list].title}
                <span className="sheet__count">
                  {list === "cart" ? cart.length : favourites.length}
                </span>
              </button>
            ))}
          </div>

          <button
            ref={closeRef}
            type="button"
            className="sheet__close"
            aria-label="Close"
            onClick={closePanel}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="sheet__empty">{copy.empty}</p>
        ) : (
          <ul className="sheet__list">
            {items.map((item) => (
              <li key={item.id} className="saved-row">
                <span className="saved-row__media">
                  <Image src={item.image} alt="" fill sizes="72px" />
                </span>

                <span className="saved-row__body">
                  <Link
                    href={item.href}
                    className="saved-row__name"
                    onClick={closePanel}
                  >
                    {item.name}
                  </Link>
                  <span className="saved-row__meta">{item.meta}</span>
                </span>

                <span className="saved-row__price">{item.price}</span>

                <button
                  type="button"
                  className="saved-row__remove"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => remove(panel, item.id)}
                >
                  <Icon name="close" size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {panel === "cart" && items.length > 0 ? (
          <p className="sheet__note">
            Prototype cart — prices are illustrative and there is no checkout yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
