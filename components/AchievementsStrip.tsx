"use client";

import { useLocale, useTranslations } from "next-intl";
import { Trophy } from "lucide-react";
import { MotionReveal } from "./MotionReveal";
import { achievements } from "@/data/achievements";
import type { Locale } from "@/types";

export function AchievementsStrip() {
  const t = useTranslations("achievements");
  const locale = useLocale() as Locale;

  return (
    <section className="border-y border-white/10 bg-ink/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <MotionReveal>
          <p className="font-display text-sm font-semibold tracking-[0.3em] text-volt">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{t("title")}</h2>
        </MotionReveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <MotionReveal key={a.id} delay={(i % 6) * 0.05}>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-void p-5">
                <Trophy
                  className={`h-5 w-5 shrink-0 ${
                    a.placement === 1 ? "text-volt" : "text-steel"
                  }`}
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs uppercase tracking-widest text-steel">
                    {a.game} · {a.year}
                  </p>
                  <p className="mt-1 font-semibold leading-snug">
                    {a.placement === 1 ? "#1" : "#2"} {a.title[locale]}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
