"use client";

import Image from "next/image";
import { useEffect } from "react";

import { useCommerce } from "@/components/commerce/CommerceProvider";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";
import type { SavedList } from "@/types/commerce";

const DISMISS_MS = 3600;

const SAVED_COPY: Readonly<Record<SavedList, { line: string; action: string }>> = {
  cart: { line: "Added to cart", action: "View cart" },
  favourites: { line: "Saved to favourites", action: "View saved" },
};

/**
 * One toast for two jobs: confirming a saved item, with its own photograph so
 * the message is unmistakably about the card just tapped, and carrying plain
 * notices such as the language placeholder.
 *
 * Announced politely — it confirms an action the visitor just took.
 */
export function Toaster() {
  const { toast, dismissToast, openPanel } = useCommerce();

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(dismissToast, DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [toast, dismissToast]);

  return (
    <div className="toaster" role="status" aria-live="polite">
      {toast ? (
        <div
          // Re-keying restarts the entrance when the same toast fires again.
          key={toast.key}
          className={cn(
            "toast",
            toast.kind === "saved" && toast.list === "favourites" && "toast--fav",
            toast.kind === "message" && "toast--message",
          )}
        >
          {toast.kind === "saved" ? (
            <>
              <span className="toast__media">
                <Image src={toast.item.image} alt="" fill sizes="52px" />
              </span>

              <span className="toast__body">
                <span className="toast__line">
                  <Icon name={toast.list === "cart" ? "check" : "heart"} size={13} />
                  {SAVED_COPY[toast.list].line}
                </span>
                <span className="toast__name">{toast.item.name}</span>
              </span>

              <button
                type="button"
                className="toast__action"
                onClick={() => {
                  openPanel(toast.list);
                  dismissToast();
                }}
              >
                {SAVED_COPY[toast.list].action}
              </button>
            </>
          ) : (
            <span className="toast__body">
              <span className="toast__line">
                <Icon name="globe" size={13} />
                {toast.title}
              </span>
              {toast.body ? (
                <span className="toast__name">{toast.body}</span>
              ) : null}
            </span>
          )}

          <button
            type="button"
            className="toast__close"
            aria-label="Dismiss"
            onClick={dismissToast}
          >
            <Icon name="close" size={14} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
