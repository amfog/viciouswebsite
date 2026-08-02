import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { PlaceholderBox } from "@/components/PlaceholderBox";
import { MotionReveal } from "@/components/MotionReveal";
import { teams } from "@/data/teams";
import { getPlayersByTeam } from "@/data/players";
import { partners, sponsors } from "@/data/partners";
import type { Locale } from "@/types";
import { Trophy } from "lucide-react";

export function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const team = teams.find((t) => t.slug === slug);
  if (!team) notFound();

  const t = await getTranslations("teams");
  const locale = (await getLocale()) as Locale;
  const roster = getPlayersByTeam(team.id);

  return (
    <>
      <Header />
      <main className="pb-28 pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <PlaceholderBox ratio="aspect-[21/9]" label={`${team.name} banner`} />

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-steel">{team.game}</p>
              <h1 className="font-display text-4xl font-bold md:text-6xl">{team.name}</h1>
            </div>
            <PlaceholderBox ratio="aspect-square" className="h-20 w-20" label="Logo" />
          </div>

          {team.achievements && team.achievements.length > 0 && (
            <MotionReveal className="mt-10">
              <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-volt">
                {t("achievements")}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {team.achievements.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink p-4"
                  >
                    <Trophy className="h-5 w-5 text-volt" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{a.title[locale]}</span>
                  </div>
                ))}
              </div>
            </MotionReveal>
          )}

          <MotionReveal className="mt-14">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-volt">
              {t("roster")}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {roster.map((player) => (
                <Link
                  key={player.id}
                  href={`/players/${player.slug}`}
                  className="group block overflow-hidden rounded-xl border border-white/10 bg-ink transition hover:border-volt/40"
                >
                  <PlaceholderBox ratio="aspect-[3/4]" className="rounded-none border-0" label={player.nickname} />
                  <div className="p-3">
                    <p className="font-display text-sm font-semibold transition group-hover:text-volt">
                      {player.nickname}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </MotionReveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <MotionReveal>
              <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-volt">
                {t("gallery")}
              </h2>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PlaceholderBox key={i} ratio="aspect-square" />
                ))}
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-volt">
                {t("sponsors")}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {[...partners, ...sponsors].slice(0, 6).map((s) => (
                  <span
                    key={s.id}
                    className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-bone/70"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </MotionReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
