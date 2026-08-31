import type { ReactElement } from "react";

import type { IconName, IconProps } from "@/types/icon";

/**
 * Easy Trav icon family — thin stroke, open, geometric, rounded terminals,
 * no fills. Authored locally rather than pulled from an icon package so the
 * visual language stays under our control and the dependency surface stays
 * small. All shapes inherit `currentColor`.
 */
const PATHS: Readonly<Record<IconName, ReactElement>> = {
  concierge: (
    <>
      <path d="M5 14.4v-2.6a7 7 0 0 1 14 0v2.6" />
      <rect x="3.4" y="13.4" width="3.8" height="5.8" rx="1.7" />
      <rect x="16.8" y="13.4" width="3.8" height="5.8" rx="1.7" />
      <path d="M18.7 19.2v.5a2.4 2.4 0 0 1-2.4 2.4h-2.6" />
    </>
  ),
  guarantee: (
    <>
      <path d="M12 2.8 19.3 5.6v5.6c0 4.6-2.9 8.2-7.3 9.9-4.4-1.7-7.3-5.3-7.3-9.9V5.6Z" />
      <path d="M9.4 12.1a8.4 8.4 0 0 1 5.2-4.2 8.4 8.4 0 0 1-3.1 6.9" />
    </>
  ),
  curated: (
    <>
      <rect x="3.6" y="9.4" width="16.8" height="10.8" rx="2" />
      <path d="M3.6 13.2h16.8" />
      <path d="M12 9.4v10.8" />
      <path d="M12 9.4C10.5 6.5 9.1 5.5 7.8 6.1c-1.1.5-.9 2.3.6 3.3Z" />
      <path d="M12 9.4c1.5-2.9 2.9-3.9 4.2-3.3 1.1.5.9 2.3-.6 3.3Z" />
    </>
  ),
  secure: (
    <>
      <rect x="4.6" y="10.4" width="14.8" height="10" rx="2.4" />
      <path d="M8.4 10.4V7.9a3.6 3.6 0 0 1 7.2 0v2.5" />
      <path d="M12 14.4v2.2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.3s6.5-5.9 6.5-10.3a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21.3 12 21.3Z" />
      <circle cx="12" cy="10.6" r="2.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.8" y="5.5" width="16.4" height="14.8" rx="2.2" />
      <path d="M3.8 10h16.4" />
      <path d="M8.4 3.3v4.1" />
      <path d="M15.6 3.3v4.1" />
    </>
  ),
  traveler: (
    <>
      <circle cx="12" cy="8.4" r="3.8" />
      <path d="M4.9 20.4a7.1 7.1 0 0 1 14.2 0" />
    </>
  ),
  chevron: <path d="m6.4 9.6 5.6 5.6 5.6-5.6" />,
  arrow: (
    <>
      <path d="M4.6 12h14.8" />
      <path d="m13.6 6.2 5.8 5.8-5.8 5.8" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.4" />
      <path d="m15.6 15.6 4 4" />
    </>
  ),
  flights: (
    <path d="M20.4 13.2 13.9 15l-3 5.4-1.7.5.9-5-3.4.9-1.4 2-1.3.4.5-2.7-1.8-2.1 1.3-.3 2.1 1.2 3.4-1-3.4-3.8.9-.3 5 3.2 6.5-1.8a1.6 1.6 0 0 1 1.9 1.1 1.6 1.6 0 0 1-1 1.5Z" />
  ),
  hotels: (
    <>
      <path d="M3.6 19.6V7.4a1.8 1.8 0 0 1 1.8-1.8h5.2a1.8 1.8 0 0 1 1.8 1.8v12.2" />
      <path d="M12.4 19.6v-7.2h6.2a1.8 1.8 0 0 1 1.8 1.8v5.4" />
      <path d="M2.6 19.6h18.8" />
      <path d="M6.4 9.2h3.6" />
      <path d="M6.4 13h3.6" />
      <path d="M15.6 15.8h1.8" />
    </>
  ),
  experiences: (
    <>
      <path d="M3.4 9.6 12 4.4l8.6 5.2" />
      <path d="M5.4 9.6v9.2" />
      <path d="M9.8 9.6v9.2" />
      <path d="M14.2 9.6v9.2" />
      <path d="M18.6 9.6v9.2" />
      <path d="M3 19.6h18" />
    </>
  ),
  packages: (
    <>
      <rect x="3.6" y="7.4" width="16.8" height="12.4" rx="2.2" />
      <path d="M8.6 7.4V5.6a2 2 0 0 1 2-2h2.8a2 2 0 0 1 2 2v1.8" />
      <path d="M3.6 12.6h16.8" />
    </>
  ),
  transfers: (
    <>
      <path d="M4 16.4v-3.2l1.8-4.4a2 2 0 0 1 1.9-1.2h8.6a2 2 0 0 1 1.9 1.2L20 13.2v3.2" />
      <path d="M3.4 16.4h17.2" />
      <circle cx="7.4" cy="16.4" r="1.7" />
      <circle cx="16.6" cy="16.4" r="1.7" />
      <path d="M5.4 13h13.2" />
    </>
  ),
  vip: (
    <>
      <path d="M3.6 8.4 6.8 16h10.4l3.2-7.6-4.4 2.6L12 5.2l-4 5.8Z" />
      <path d="M6.8 19h10.4" />
    </>
  ),
  menu: (
    <>
      <path d="M4 8.4h16" />
      <path d="M4 15.6h16" />
    </>
  ),
  close: (
    <>
      <path d="m6.4 6.4 11.2 11.2" />
      <path d="M17.6 6.4 6.4 17.6" />
    </>
  ),
  bell: (
    <>
      <path d="M18 10.4a6 6 0 0 0-12 0c0 4.4-1.8 5.8-1.8 5.8h15.6s-1.8-1.4-1.8-5.8Z" />
      <path d="M13.8 19.2a2 2 0 0 1-3.6 0" />
    </>
  ),
  home: (
    <>
      <path d="M3.6 10.4 12 3.8l8.4 6.6v8.2a1.8 1.8 0 0 1-1.8 1.8H5.4a1.8 1.8 0 0 1-1.8-1.8Z" />
      <path d="M9.4 20.4v-6.2h5.2v6.2" />
    </>
  ),
  bookings: (
    <>
      <rect x="4.4" y="4.6" width="15.2" height="15.2" rx="2.2" />
      <path d="M4.4 9.2h15.2" />
      <path d="m9 14 2.2 2.2 3.8-4" />
    </>
  ),
  trips: (
    <>
      <rect x="4.2" y="8" width="15.6" height="11.8" rx="2.2" />
      <path d="M9 8V5.8a1.8 1.8 0 0 1 1.8-1.8h2.4A1.8 1.8 0 0 1 15 5.8V8" />
      <path d="M9.4 11.6v4.6" />
      <path d="M14.6 11.6v4.6" />
    </>
  ),
  offers: (
    <>
      <path d="M11.2 3.6H19a1.4 1.4 0 0 1 1.4 1.4v7.8a1.4 1.4 0 0 1-.4 1l-7.4 7.4a1.4 1.4 0 0 1-2 0l-6.8-6.8a1.4 1.4 0 0 1 0-2l7.4-7.4a1.4 1.4 0 0 1 1-.4Z" />
      <circle cx="16" cy="8" r="1.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.6a13 13 0 0 1 0 16.8 13 13 0 0 1 0-16.8Z" />
    </>
  ),
  heart: (
    <path d="M12 20.2s-7.4-4.4-7.4-9.4a4.2 4.2 0 0 1 7.4-2.7 4.2 4.2 0 0 1 7.4 2.7c0 5-7.4 9.4-7.4 9.4Z" />
  ),
  cart: (
    <>
      <path d="M3.2 4.4h2.3l2.2 10.2h9.4l2.1-7.4H6.5" />
      <circle cx="9.4" cy="19" r="1.5" />
      <circle cx="16.6" cy="19" r="1.5" />
    </>
  ),
  check: <path d="m5.4 12.6 4.2 4.2 9-9.6" />,
  mode: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 3.6a8.4 8.4 0 0 0 0 16.8Z" fill="currentColor" stroke="none" />
    </>
  ),
};

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
