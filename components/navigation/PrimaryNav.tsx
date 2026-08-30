import Link from "next/link";

import { PRIMARY_NAV } from "@/lib/constants/navigation";

export function PrimaryNav() {
  return (
    <nav className="nav" aria-label="Primary">
      {PRIMARY_NAV.map((item) => (
        <Link key={item.href} href={item.href} className="nav__link">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
