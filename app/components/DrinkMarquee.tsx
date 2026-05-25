const drinks = [
  "Berry Blossom",
  "Lychee Grow",
  "Vietnamese Coconut Coffee",
  "Strawberry Matcha",
  "Thai Green Milk Tea",
  "Spring Citrus Cold Brew",
  "Bac Xiu",
  "Sea Salt Foam Matcha",
  "Honey Dew Slush",
  "Tropical Rush",
  "Salted Coffee",
  "Jasmine Milk Tea",
];

export default function DrinkMarquee() {
  const loop = [...drinks, ...drinks];
  return (
    <div
      aria-hidden
      className="bg-ink text-cream py-6 overflow-hidden border-y border-ink"
    >
      <div className="flex w-max animate-marquee">
        {loop.map((d, i) => (
          <span
            key={i}
            className="font-display text-[2rem] md:text-[3rem] leading-none px-8 flex items-center gap-8 whitespace-nowrap"
          >
            {d}
            <span className="h-2 w-2 rounded-full bg-peach inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
