import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { PlaceholderBox } from "@/components/PlaceholderBox";
import { MotionReveal } from "@/components/MotionReveal";
import { teams } from "@/data/teams";

export async function generateMetadata() {
  const t = await getTranslations("teams");
  return { title: t("title") };
}

export default async function TeamsPage() {
  const t = await getTranslations("teams");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-28 pt-40">
        <h1 className="font-display text-4xl font-bold md:text-6xl">{t("title")}</h1>
        <p className="mt-3 text-bone/60">{t("subtitle")}</p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => (
            <MotionReveal key={team.id} delay={(i % 6) * 0.05}>
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
      </main>
      <Footer />
    </>
  );
}
