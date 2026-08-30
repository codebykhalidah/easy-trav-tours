import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { MOBILE_NAV } from "@/lib/constants/site";

/**
 * App-shell bottom navigation, phone widths only. Prototype targets are
 * homepage sections until the real routes exist, so these stay real anchors
 * rather than dead buttons.
 */
export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Sections">
      <ul>
        {MOBILE_NAV.map((item, index) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="bottom-nav__item"
              aria-current={index === 0 ? "page" : undefined}
            >
              <Icon name={item.icon} size={21} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
