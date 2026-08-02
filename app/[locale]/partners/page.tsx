import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionReveal } from "@/components/MotionReveal";
import { PlaceholderBox } from "@/components/PlaceholderBox";
import { partners, sponsors, upcomingProjects } from "@/data/partners";

export async function generateMetadata() {
  const t = await getTranslations("partners");
  return { title: t("title") };
}

function LogoGrid({ items }: { items: { id: string; name: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex aspect-[3/2] items-center justify-center rounded-xl border border-white/10 bg-ink px-4 text-center text-sm font-semibold text-bone/70"
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default async function PartnersPage() {
  const t = await getTranslations("partners");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-28 pt-40">
        <p className="font-display text-sm font-semibold tracking-[0.3em] text-volt">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">{t("title")}</h1>

        <MotionReveal className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-steel">Partners</h2>
          <div className="mt-4">
            <LogoGrid items={partners} />
          </div>
        </MotionReveal>

        <MotionReveal className="mt-14" delay={0.1}>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-steel">Sponsors</h2>
          <div className="mt-4">
            <LogoGrid items={sponsors} />
          </div>
        </MotionReveal>

        <MotionReveal className="mt-14" delay={0.15}>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-steel">
            {t("upcoming")}
          </h2>
          <div className="mt-4">
            <LogoGrid items={upcomingProjects} />
          </div>
        </MotionReveal>

        <MotionReveal className="mt-20 grid gap-8 rounded-3xl border border-white/10 bg-ink p-8 md:grid-cols-2 md:p-14">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              {t("jersey.title")}
            </h2>
            <p className="mt-3 text-bone/65">{t("jersey.body")}</p>
          </div>
          <PlaceholderBox ratio="aspect-[3/4]" label="Jersey — sponsor slots" />
        </MotionReveal>
      </main>
      <Footer />
    </>
  );
}
