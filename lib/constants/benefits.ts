import type { IconName } from "@/types/icon";

export interface ServiceBenefit {
  readonly icon: IconName;
  readonly title: string;
  readonly copy: string;
}

export const SERVICE_BENEFITS: readonly ServiceBenefit[] = [
  {
    icon: "concierge",
    title: "VIP Concierge",
    copy: "24/7 Personal Assistance",
  },
  {
    icon: "guarantee",
    title: "Best Price Guarantee",
    copy: "Exclusive Rates & Offers",
  },
  {
    icon: "curated",
    title: "Handpicked Experiences",
    copy: "Curated Just for You",
  },
  {
    icon: "secure",
    title: "Secure Booking",
    copy: "Safe & Hassle-Free",
  },
] as const;
