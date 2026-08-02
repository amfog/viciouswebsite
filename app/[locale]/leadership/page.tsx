import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionReveal } from "@/components/MotionReveal";
import { PlaceholderBox } from "@/components/PlaceholderBox";
import { leaders } from "@/data/leadership";
import type { Locale } from "@/types";

export async function generateMetadata() {
  const t = await getTranslations("leadership");
  return { title: t("title") };
}

export default async function LeadershipPage() {
  const t = await getTranslations("leadership");
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-28 pt-40">
        <p className="font-display text-sm font-semibold tracking-[0.3em] text-volt">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">{t("title")}</h1>
        <p className="mt-4 max-w-xl text-bone/65">{t("subtitle")}</p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader, i) => (
            <MotionReveal key={leader.id} delay={i * 0.08}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink">
                <PlaceholderBox
                  ratio="aspect-square"
                  className="rounded-none border-0"
                  src={leader.photoSrc}
                  label={leader.name}
                />
                <div className="p-6">
                  <h2 className="font-display text-xl font-bold">{leader.name}</h2>
                  <p className="mt-1 text-sm text-volt">{leader.role[locale]}</p>

                  {leader.affiliations && leader.affiliations.length > 0 && (
                    <div className="mt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-steel">
                        {t("affiliations")}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {leader.affiliations.map((a) => (
                          <span
                            key={a}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs text-bone/70"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {leader.bio && (
                    <p className="mt-4 text-sm leading-relaxed text-bone/65">{leader.bio[locale]}</p>
                  )}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
