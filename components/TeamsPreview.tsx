"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "./MotionReveal";
import { PlaceholderBox } from "./PlaceholderBox";
import { teams } from "@/data/teams";

export function TeamsPreview() {
  const t = useTranslations("teams");

  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <MotionReveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl font-bold md:text-5xl">{t("title")}</h2>
          <p className="mt-2 text-bone/60">{t("subtitle")}</p>
        </div>
        <Link
          href="/teams"
          className="text-sm font-semibold uppercase tracking-widest text-volt hover:underline"
        >
          {t("viewTeam")} →
        </Link>
      </MotionReveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teams.slice(0, 8).map((team, i) => (
          <MotionReveal key={team.id} delay={(i % 4) * 0.06}>
            <Link
              href={`/teams/${team.slug}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-ink transition hover:border-volt/40"
            >
              <PlaceholderBox ratio="aspect-[4/3]" className="rounded-none border-0" label={team.name} />
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-steel">{team.game}</p>
                <p className="mt-1 font-display text-lg font-semibold transition group-hover:text-volt">
                  {team.name}
                </p>
              </div>
            </Link>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
