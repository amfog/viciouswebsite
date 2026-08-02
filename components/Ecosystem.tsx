"use client";

import { useTranslations } from "next-intl";
import { MotionReveal } from "./MotionReveal";

const nodes = [
  "Esports Rosters",
  "Digital Media",
  "Live Production",
  "Community & Seminars",
  "Traditional Sports",
  "Global Expansion",
];

export function Ecosystem() {
  const t = useTranslations("ecosystem");

  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <MotionReveal className="max-w-2xl">
        <p className="font-display text-sm font-semibold tracking-[0.3em] text-volt">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{t("title")}</h2>
        <p className="mt-4 text-bone/70">{t("body")}</p>
      </MotionReveal>

      <div className="relative mt-16">
        <div className="absolute start-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />
        <div className="grid gap-6 md:grid-cols-6">
          {nodes.map((n, i) => (
            <MotionReveal key={n} delay={i * 0.07}>
              <div className="group relative flex flex-col items-center gap-3 text-center">
                <div className="h-3 w-3 rounded-full bg-volt shadow-[0_0_16px_rgba(215,245,44,0.7)] transition group-hover:scale-125" />
                <span className="text-xs font-medium leading-snug text-bone/70 transition group-hover:text-volt">
                  {n}
                </span>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
