import { BUSINESS } from "../lib/business";

export default function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: BUSINESS.name,
    image: ["/placeholders/hero.jpg"],
    telephone: BUSINESS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postal,
      addressCountry: BUSINESS.country,
    },
    areaServed: [
      "Midtown Toronto",
      "Davisville",
      "Yonge and Eglinton",
      "Mount Pleasant",
      "Deer Park",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:30",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "12:00",
        closes: "19:00",
      },
    ],
    priceRange: "$$",
    servesCuisine: ["Tea", "Coffee", "Bubble Tea", "Vietnamese Coffee", "Matcha"],
    url: "https://luxetea.example",
    hasMap: BUSINESS.googleMapsUrl,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
