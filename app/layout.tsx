import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import StickyMobileCTA from "./components/StickyMobileCTA";
import SmoothScroll from "./components/SmoothScroll";
import LocalBusinessJsonLd from "./components/LocalBusinessJsonLd";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://luxetea.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luxe Tea — Fresh fruit tea, coffee & matcha in Midtown Toronto",
    template: "%s · Luxe Tea Davisville",
  },
  description:
    "Cozy Midtown tea and coffee shop near Davisville. Signature fruit teas, Vietnamese coffee, cold brew, matcha and milk tea — handcrafted on Merton St.",
  keywords: [
    "fruit tea Toronto",
    "bubble tea Davisville",
    "Vietnamese coffee Toronto",
    "matcha latte Toronto",
    "cold brew Davisville",
    "tea and coffee shop Midtown Toronto",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    title: "Luxe Tea — Fresh fruit tea, coffee & matcha near Davisville",
    description:
      "Handcrafted fruit teas, Vietnamese coffee, cold brew and matcha in Midtown Toronto.",
    siteName: "Luxe Tea",
    images: ["/placeholders/hero.jpg"],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFF8EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/placeholders/hero.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-svh bg-cream text-ink font-sans">
        <SmoothScroll />
        {children}
        <StickyMobileCTA />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
