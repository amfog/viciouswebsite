"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const next = locale === "en" ? "ar" : "en";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: next })}
      className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-bone/80 transition hover:border-volt hover:text-volt"
      aria-label="Switch language"
    >
      {next === "ar" ? "العربية" : "EN"}
    </button>
  );
}
