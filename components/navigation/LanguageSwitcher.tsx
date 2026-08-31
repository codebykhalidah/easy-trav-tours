"use client";

import { useEffect, useId, useRef, useState } from "react";

import { useCommerce } from "@/components/commerce/CommerceProvider";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";
import { DEFAULT_LANGUAGE, LANGUAGES } from "@/lib/constants/languages";

/**
 * Prototype language selector. Choosing a language raises a "coming soon"
 * notice rather than pretending to switch locale — nothing is translated yet.
 */
export function LanguageSwitcher() {
  const { notify } = useCommerce();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lang" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="lang__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`Language, currently ${DEFAULT_LANGUAGE.label}`}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="globe" size={15} />
        <span className="lang__short">{DEFAULT_LANGUAGE.short}</span>
        <Icon
          name="chevron"
          size={12}
          className={cn("lang__caret", open && "is-open")}
        />
      </button>

      {open ? (
        <div className="lang__menu" id={menuId} role="menu">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              type="button"
              role="menuitem"
              lang={language.code}
              className={cn(
                "lang__option",
                language.code === DEFAULT_LANGUAGE.code && "is-current",
              )}
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
                notify("Coming soon", `${language.label} is not available yet.`);
              }}
            >
              <span className="lang__name">{language.label}</span>
              <span className="lang__native">{language.native}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
