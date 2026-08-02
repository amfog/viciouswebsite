import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { PlaceholderBox } from "@/components/PlaceholderBox";
import { players } from "@/data/players";
import { teams } from "@/data/teams";
import type { Locale } from "@/types";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const player = players.find((p) => p.slug === slug);
  if (!player) notFound();

  const team = teams.find((t) => t.id === player.teamId);
  const t = await getTranslations("player");
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-28 pt-40">
        {team && (
          <Link
            href={`/teams/${team.slug}`}
            className="inline-flex items-center gap-2 text-sm text-bone/60 hover:text-volt"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("back")}
          </Link>
        )}

        <div className="mt-6 grid gap-8 md:grid-cols-[280px_1fr]">
          <PlaceholderBox ratio="aspect-[3/4]" label={player.nickname} />

          <div>
            <h1 className="font-display text-4xl font-bold md:text-6xl">{player.nickname}</h1>
            {player.realName && <p className="mt-1 text-bone/60">{player.realName}</p>}

            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-widest text-steel">{t("role")}</dt>
                <dd className="mt-1 font-medium">{player.role[locale]}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-steel">{t("country")}</dt>
                <dd className="mt-1 font-medium">{player.country}</dd>
              </div>
              {team && (
                <div>
                  <dt className="text-xs uppercase tracking-widest text-steel">Team</dt>
                  <dd className="mt-1 font-medium">{team.name}</dd>
                </div>
              )}
            </dl>

            {player.bio && (
              <p className="mt-8 leading-relaxed text-bone/70">{player.bio[locale]}</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
