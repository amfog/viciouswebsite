import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "./MotionReveal";

export async function CTASection() {
  const t = await getTranslations("contact");

  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      <MotionReveal>
        <div className="relative overflow-hidden rounded-3xl border border-volt/20 bg-gradient-to-br from-ink to-void p-10 text-center md:p-20">
          <div
            className="pointer-events-none absolute -top-1/2 start-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-volt/10 blur-[120px]"
            aria-hidden="true"
          />
          <h2 className="relative font-display text-3xl font-bold md:text-5xl">{t("title")}</h2>
          <p className="relative mx-auto mt-4 max-w-md text-bone/65">{t("body")}</p>
          <Link
            href="/contact"
            className="relative mt-8 inline-block rounded-full bg-volt px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-void transition hover:brightness-110"
          >
            {t("form.submit")}
          </Link>
        </div>
      </MotionReveal>
    </section>
  );
}
