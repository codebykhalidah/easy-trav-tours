"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Icon } from "@/components/ui/Icon";
import { PRIMARY_NAV } from "@/lib/constants/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
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
  }, [open, close]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Icon name="menu" size={20} />
      </button>

      {/* Rendered into <body>: a transformed ancestor would otherwise become
          the containing block for this fixed dialog and collapse it. Only ever
          rendered after a click, so there is no server/client mismatch. */}
      {open
        ? createPortal(
          <div className="drawer-shell">
            <button
              type="button"
              className="drawer__scrim"
              aria-label="Close menu"
              tabIndex={-1}
              onClick={close}
            />

            <div
              ref={drawerRef}
              className="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <button
                ref={closeRef}
                type="button"
                className="drawer__close"
                aria-label="Close menu"
                onClick={close}
              >
                <Icon name="close" size={18} />
              </button>

              <nav className="drawer__nav" aria-label="Mobile">
                {PRIMARY_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="drawer__link"
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>,
          document.body,
        )
        : null}
    </>
  );
}
