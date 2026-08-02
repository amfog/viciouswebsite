"use client";

import { useTranslations } from "next-intl";
import { Calendar, Video, GraduationCap, Mic, Briefcase } from "lucide-react";
import { MotionReveal } from "./MotionReveal";

const items = [
  { key: "eventManagement", Icon: Calendar },
  { key: "eventProduction", Icon: Video },
  { key: "seminars", Icon: GraduationCap },
  { key: "podcasts", Icon: Mic },
  { key: "consultancy", Icon: Briefcase },
] as const;

export function WhatWeDo() {
  const t = useTranslations("whatWeDo");

  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <MotionReveal>
        <p className="font-display text-sm font-semibold tracking-[0.3em] text-volt">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{t("title")}</h2>
      </MotionReveal>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {items.map(({ key, Icon }, i) => (
          <MotionReveal key={key} delay={i * 0.06}>
            <div className="group h-full rounded-2xl border border-white/10 bg-ink p-7 transition hover:border-volt/40">
              <Icon className="h-7 w-7 text-volt" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-lg font-semibold">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bone/65">
                {t(`items.${key}.body`)}
              </p>
            </div>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
