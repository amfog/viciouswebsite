"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { HeroLogoBackground } from "./HeroLogoBackground";
import { PartnersMarquee } from "./PartnersMarquee";

const slideKeys = ["esports", "media", "services", "traditional", "next"] as const;

export function Hero() {
  const t = useTranslations("hero");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slideKeys.length), 5500);
    return () => clearInterval(id);
  }, []);

  const key = slideKeys[index];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div
        className="pointer-events-none absolute -top-1/3 start-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-volt/10 blur-[140px]"
        aria-hidden="true"
      />

      <HeroLogoBackground />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-28">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display text-sm font-semibold tracking-[0.3em] text-volt"
        >
          {t("eyebrow")}
        </motion.p>

        <h1 className="mt-6 font-display text-[13vw] font-bold uppercase leading-[0.85] tracking-tight text-balance md:text-[6.5rem]">
          THE
          <br />
          <span className="text-volt">VICIOUS</span>
        </h1>

        <div className="mt-10 min-h-[7.5rem] max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-2xl font-semibold text-bone md:text-3xl">
                {t(`slides.${key}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bone/70 md:text-base">
                {t(`slides.${key}.body`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-6">
          <Link
            href="/teams"
            className="group inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 text-sm font-bold uppercase tracking-wide text-void transition hover:brightness-110"
          >
            {t("cta")}
            <ChevronRight className="h-4 w-4 rtl:rotate-180 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>

          <div className="flex gap-2">
            {slideKeys.map((k, i) => (
              <button
                key={k}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-volt" : "w-3 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <p className="mx-auto max-w-6xl px-6 pb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-steel">
          {t("trustedBy")}
        </p>
        <PartnersMarquee compact />
      </div>
    </section>
  );
}
