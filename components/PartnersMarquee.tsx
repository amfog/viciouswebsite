import { partners, sponsors } from "@/data/partners";

export function PartnersMarquee({ compact = false }: { compact?: boolean }) {
  const names = [...partners, ...sponsors].map((p) => p.name);
  const loop = [...names, ...names];

  return (
    <section
      className={`overflow-hidden border-white/10 ${
        compact ? "border-t py-6" : "border-y py-10"
      }`}
    >
      <div
        className={`flex w-max animate-[marquee_28s_linear_infinite] ${
          compact ? "gap-10" : "gap-16"
        }`}
      >
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className={`font-display font-semibold uppercase tracking-widest text-bone/25 ${
              compact ? "text-base" : "text-2xl"
            }`}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
