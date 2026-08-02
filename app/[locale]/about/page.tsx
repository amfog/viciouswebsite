import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "@/components/MotionReveal";
import { PlaceholderBox } from "@/components/PlaceholderBox";
import { leaders } from "@/data/leadership";
import type { Locale } from "@/types";
import { Eye, Target, Sparkles } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations("about");
  return { title: t("title") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tLeadership = await getTranslations("leadership");
  const locale = (await getLocale()) as Locale;
  const values = t.raw("values.list") as string[];
  const next2026 = [
    t("next2026.ewc"),
    t("next2026.abudhabi"),
    t("next2026.hq"),
    t("next2026.store"),
    t("next2026.womensTournament"),
  ];

  return (
    <>
      <Header />
      <main className="pb-28 pt-40">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-display text-sm font-semibold tracking-[0.3em] text-volt">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">{t("title")}</h1>
          <div className="mt-8 space-y-4 text-bone/70">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
            <p>{t("body3")}</p>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-6xl px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { Icon: Eye, key: "vision" as const },
              { Icon: Target, key: "mission" as const },
              { Icon: Sparkles, key: "values" as const },
            ].map(({ Icon, key }, i) => (
              <MotionReveal key={key} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink p-7">
                  <Icon className="h-6 w-6 text-volt" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-lg font-semibold">{t(`${key}.title`)}</h3>
                  {key === "values" ? (
                    <ul className="mt-3 space-y-1.5 text-sm text-bone/65">
                      {values.map((v) => (
                        <li key={v}>· {v}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-bone/65">{t(`${key}.body`)}</p>
                  )}
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-6xl px-6">
          <MotionReveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-volt">
              {t("leadership")}
            </h2>
            <Link
              href="/leadership"
              className="text-sm font-semibold uppercase tracking-widest text-volt hover:underline"
            >
              {tLeadership("viewAll")} →
            </Link>
          </MotionReveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {leaders.map((l, i) => (
              <MotionReveal key={l.id} delay={i * 0.08}>
                <Link href="/leadership" className="group block">
                  <PlaceholderBox ratio="aspect-square" src={l.photoSrc} label={l.name} />
                  <p className="mt-3 font-display font-semibold transition group-hover:text-volt">
                    {l.name}
                  </p>
                  <p className="text-sm text-bone/60">{l.role[locale]}</p>
                </Link>
              </MotionReveal>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-6xl px-6">
          <MotionReveal className="grid gap-10 rounded-3xl border border-white/10 bg-ink p-8 md:grid-cols-[1fr_1.2fr] md:p-14">
            <PlaceholderBox ratio="aspect-[4/3]" label={t("inclusion.title")} />
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                {t("inclusion.title")}
              </h2>
              <p className="mt-3 text-bone/65">{t("inclusion.body")}</p>
              <div className="mt-6 flex flex-wrap gap-6">
                <div>
                  <p className="font-display text-3xl font-bold text-volt">65%</p>
                  <p className="text-xs text-bone/60">{t("inclusion.stat1")}</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-volt">2/7</p>
                  <p className="text-xs text-bone/60">{t("inclusion.stat2")}</p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>

        <div className="mx-auto mt-24 max-w-4xl px-6">
          <MotionReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              {t("next2026.title")}
            </h2>
          </MotionReveal>
          <ol className="mt-8 space-y-4">
            {next2026.map((item, i) => (
              <MotionReveal key={i} delay={i * 0.06}>
                <li className="flex items-start gap-4 rounded-xl border border-white/10 bg-ink p-5">
                  <span className="font-display text-sm font-bold text-volt">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-bone/75">{item}</span>
                </li>
              </MotionReveal>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
