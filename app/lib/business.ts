export const BUSINESS = {
  name: "Luxe Tea",
  legalName: "Luxe Coffee & Tea",
  // TODO: verify phone with owner before launch
  phone: "(437) 601-3668",
  phoneHref: "tel:+14376013668",
  // TODO: verify email with owner before launch
  email: "hello@luxetea.example",
  street: "230 Merton St",
  city: "Toronto",
  region: "ON",
  postal: "M4S 1A1",
  country: "CA",
  neighbourhood: "Davisville",
  area: "Midtown Toronto",
  // TODO: verify hours; one social post shows 10:00am open
  hoursLine: "Mon–Sat 10:30am–7pm · Sun 12pm–7pm",
  hours: [
    { day: "Mon–Sat", open: "10:30", close: "19:00" },
    { day: "Sun", open: "12:00", close: "19:00" },
  ],
  // TODO: confirm Google rating + count
  googleMapsUrl: "https://maps.app.goo.gl/oKp9er6pWxBbW12c9",
  primaryCta: "View Menu",
  ctaSecondary: "Get Directions",
} as const;
