import { FileText } from "lucide-react";
import { InstagramIcon, FacebookIcon, XIcon } from "./icons/SocialIcons";
import { getLatestNews } from "@/services/news";
import { MotionReveal } from "./MotionReveal";
import { PlaceholderBox } from "./PlaceholderBox";

const sourceIcon = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  x: XIcon,
  manual: FileText,
} as const;

export async function NewsGrid() {
  const t = await getTranslations();
  const items = await getLatestNews(6);

  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <MotionReveal>
        <p className="font-display text-sm font-semibold tracking-[0.3em] text-volt">
          {t("news.eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{t("news.title")}</h2>
      </MotionReveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = sourceIcon[item.source];
          return (
            <MotionReveal key={item.id} delay={(i % 3) * 0.08}>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-ink transition hover:border-volt/40"
              >
                <PlaceholderBox ratio="aspect-[4/3]" className="rounded-none border-0" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-steel">
                    <Icon className="h-3.5 w-3.5" />
                    <time className="text-[11px] uppercase tracking-widest">
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-bone/80">{item.caption}</p>
                </div>
              </a>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
}

// Local helper — next-intl's server `getTranslations` needs no namespace
// here since we read both `news` keys directly.
async function getTranslations() {
  const { getTranslations: get } = await import("next-intl/server");
  return get();
}
