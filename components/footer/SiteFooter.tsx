import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { DisplayLines } from "@/components/ui/DisplayLines";
import {
  FOOTER_NAV,
  FOOTER_STATEMENT,
  FOOTER_UTILITY,
} from "@/lib/constants/site";

const SOCIAL = [
  { label: "Easy Trav worldwide", icon: "globe" as const, href: "/destinations" },
  { label: "Saved journeys", icon: "heart" as const, href: "/saved" },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__top">
          <div>
            <Link href="/" className="brand footer__brand" aria-label="Easy Trav — Travel Made Easy">
              <Image
                src="/brand/easy-trav-logo-temp.png"
                alt="Easy Trav — Travel Made Easy"
                width={606}
                height={304}
              />
            </Link>
            <p className="display footer__statement">
              <DisplayLines lines={FOOTER_STATEMENT} />
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {FOOTER_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="nav__link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <ul className="footer__utility">
            {FOOTER_UTILITY.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <ul className="footer__social">
            {SOCIAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-label={item.label}>
                  <Icon name={item.icon} size={17} />
                </Link>
              </li>
            ))}
          </ul>

          <p className="footer__legal">
            © {new Date().getFullYear()} Easy Trav. Travel made easy.
          </p>
        </div>
      </Container>
    </footer>
  );
}
