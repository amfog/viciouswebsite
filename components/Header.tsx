"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { href: "/", key: "home" },
  { href: "/teams", key: "teams" },
  { href: "/news", key: "news" },
  { href: "/about", key: "about" },
  { href: "/leadership", key: "leadership" },
  { href: "/partners", key: "partners" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-void/70 px-5 py-3 backdrop-blur-lg">
        <Link href="/" className="font-display text-lg font-bold tracking-wide">
          THE <span className="text-volt">VICIOUS</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="text-sm font-medium text-bone/75 transition hover:text-volt"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="rounded-full bg-volt px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-void transition hover:brightness-110"
          >
            {t("cta")}
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 rounded-2xl border border-white/10 bg-ink p-5 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-bone/85"
                >
                  {t(l.key)}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between">
                <LanguageSwitcher />
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-volt px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-void"
                >
                  {t("cta")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
