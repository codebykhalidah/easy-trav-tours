import { ServiceBenefits } from "@/components/benefits/ServiceBenefits";
import { BookingSection } from "@/components/booking/BookingSection";
import { SavedPanel } from "@/components/commerce/SavedPanel";
import { Toaster } from "@/components/commerce/Toaster";
import { ConciergeSection } from "@/components/concierge/ConciergeSection";
import { PrivateJourney } from "@/components/cta/PrivateJourney";
import { DestinationMosaic } from "@/components/destinations/DestinationMosaic";
import { DestinationRail } from "@/components/destinations/DestinationRail";
import { EgyptMoment } from "@/components/destinations/EgyptMoment";
import { EgyptLuxuryTours } from "@/components/egypt/EgyptLuxuryTours";
import { CuratedExperiences } from "@/components/experiences/CuratedExperiences";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { TravelGuides } from "@/components/guides/TravelGuides";
import { Hero } from "@/components/hero/Hero";
import { BottomNav } from "@/components/mobile/BottomNav";
import { PageMotion } from "@/components/motion/PageMotion";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { ExclusiveOffers } from "@/components/offers/ExclusiveOffers";

/**
 * Section order is the same in the DOM at every width, so reading order and
 * focus order always match what is on screen. Discovery leads and commerce
 * follows, which is also the rhythm the phone layout wants; the only thing
 * CSS reorders is the booking module, which rises above the hero on phones.
 */
export default function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <BookingSection />
        <ExclusiveOffers />
        <DestinationMosaic />
        <EgyptMoment />
        <ServiceBenefits />
        <CuratedExperiences />
        <DestinationRail />
        <EgyptLuxuryTours />
        <ConciergeSection />
        <TravelGuides />
        <PrivateJourney />
      </main>
      <SiteFooter />
      <BottomNav />
      <SavedPanel />
      <Toaster />
      <PageMotion />
    </>
  );
}
