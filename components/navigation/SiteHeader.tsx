import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/navigation/MobileNav";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { ThemeSwitcher } from "@/components/navigation/ThemeSwitcher";
import { Icon } from "@/components/ui/Icon";
import { LuxuryLinkButton } from "@/components/ui/LuxuryButton";
import { BOOK_NOW } from "@/lib/constants/navigation";

/**
 * Transparent header overlaying the hero photograph — the reference has no
 * solid navigation bar.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Link href="/" className="brand" aria-label="Easy Trav — Travel Made Easy">
          {/*
            Temporary raster extraction of the locked Easy Trav logo, pending
            the production SVG. The `.brand` box is fixed by aspect ratio so
            the swap will not move anything around it.
          */}
          <Image
            src="/brand/easy-trav-logo-temp.png"
            alt="Easy Trav — Travel Made Easy"
            width={606}
            height={304}
            priority
          />
        </Link>

        <div className="site-header__actions">
          <PrimaryNav />
          <ThemeSwitcher />
          <LuxuryLinkButton href={BOOK_NOW.href} size="sm">
            {BOOK_NOW.label}
          </LuxuryLinkButton>

          {/* App-shell utility, phone only. */}
          <Link href="#offers" className="utility-btn" aria-label="Offers and updates">
            <Icon name="bell" size={19} />
          </Link>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
