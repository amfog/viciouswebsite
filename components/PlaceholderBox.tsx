"use client";

import { useTranslations } from "next-intl";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlaceholderBox({
  className,
  label,
  ratio = "aspect-square",
}: {
  className?: string;
  label?: string;
  ratio?: string;
}) {
  const t = useTranslations("common");

  return (
    <div
      className={cn(
        ratio,
        "relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-ink to-void text-steel",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(215,245,44,0.06)_50%,transparent_55%)]" />
      <ImageIcon className="h-6 w-6 opacity-40" strokeWidth={1.5} />
      <span className="px-4 text-center text-[11px] uppercase tracking-widest opacity-50">
        {label ?? t("placeholderImage")}
      </span>
    </div>
  );
}
