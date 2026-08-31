import type { Metadata } from "next";
import { Cormorant_Garamond, Gloock, Inter } from "next/font/google";

import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/types/theme";
import "./globals.css";

import { CommerceProvider } from "@/components/commerce/CommerceProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const gloock = Gloock({
  variable: "--font-gloock",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Easy Trav — Travel Made Easy",
  description:
    "Premium travel experiences designed around you. Curated journeys, luxury stays and 24/7 VIP concierge, from inspiration to arrival.",
  openGraph: {
    title: "Easy Trav — Travel Made Easy",
    description:
      "Premium travel experiences designed around you. Curated journeys, luxury stays and 24/7 VIP concierge.",
    siteName: "Easy Trav",
    type: "website",
  },
};

/**
 * Stamps the stored visual mode before first paint so Royal never flashes
 * before Onyx. Kept inline and tiny; it is the only blocking script.
 */
/**
 * Runs before first paint. Stamps the stored visual mode so Royal never
 * flashes before Onyx, and marks the document as motion-capable so the hero
 * entrance can start from a hidden state.
 *
 * The `motion-ready` timer is deliberately here rather than in React: if the
 * bundle ever fails to load, the hero must still become visible on its own.
 */
const themeBootstrap = `(function(){var d=document.documentElement;try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="royal"||t==="onyx"){d.dataset.theme=t}}catch(e){}d.classList.add("js-motion");setTimeout(function(){d.classList.add("motion-ready")},2600)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={`${gloock.variable} ${cormorant.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body data-app className="min-h-full"><CommerceProvider>{children}</CommerceProvider></body>
    </html>
  );
}
