import Image from "next/image";
import Link from "next/link";

import { CommerceButtons } from "@/components/commerce/CommerceButtons";
import { Container } from "@/components/layout/Container";
import { HeaderScroll } from "@/components/navigation/HeaderScroll";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { MobileNav } from "@/components/navigation/MobileNav";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { ThemeSwitcher } from "@/components/navigation/ThemeSwitcher";
import { ThemeToggleButton } from "@/components/navigation/ThemeToggleButton";
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
      <HeaderScroll />
      <Container className="site-header__inner">
        <Link href="/" className="brand" aria-label="Easy Trav — Travel Made Easy">
          {/*
            Temporary raster extraction of the locked Easy Trav logo, pending
            the production SVG. The `.brand` box is fixed by aspect ratio so
            the swap will not move anything around it.
          */}
          {/* Horizontal lockup on desktop, mark alone on phones. Both are the
              official lockups extracted from the brand board — neither is a
              re-drawn variant. CSS picks one per breakpoint. */}
          <Image
            className="brand__wide"
            src="/brand/easy-trav-logo-horizontal.png"
            alt="Easy Trav — Travel Made Easy"
            width={1383}
            height={222}
            sizes="232px"
            priority
          />
          <Image
            className="brand__mark"
            src="/brand/easy-trav-mark.png"
            alt="Easy Trav"
            width={460}
            height={244}
            sizes="60px"
            priority
          />
        </Link>

        <div className="site-header__actions">
          <PrimaryNav />
          <LanguageSwitcher />
          <ThemeSwitcher />
          <LuxuryLinkButton href={BOOK_NOW.href} size="sm">
            {BOOK_NOW.label}
          </LuxuryLinkButton>

          {/* Phone-only: the segmented control is too wide for this bar. */}
          <ThemeToggleButton />

          <CommerceButtons />

          {/* App-shell utility. Hidden on phones, where the bar is tight and
              Offers already has a place in the bottom navigation. */}
          <Link href="#offers" className="utility-btn utility-btn--bell" aria-label="Offers and updates">
            <Icon name="bell" size={19} />
          </Link>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
