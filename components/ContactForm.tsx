"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Wire this up to /api/contact (or Vicious OS) once a backend
        // endpoint exists — currently a UI-only stub.
        setStatus("sent");
      }}
      className="mt-8 space-y-4"
    >
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-steel">
          {t("name")}
        </label>
        <input
          required
          type="text"
          className="mt-2 w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-sm outline-none transition focus:border-volt"
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-steel">
          {t("email")}
        </label>
        <input
          required
          type="email"
          className="mt-2 w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-sm outline-none transition focus:border-volt"
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-steel">
          {t("message")}
        </label>
        <textarea
          required
          rows={4}
          className="mt-2 w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-sm outline-none transition focus:border-volt"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-volt px-6 py-3 text-sm font-bold uppercase tracking-widest text-void transition hover:brightness-110"
      >
        {status === "sent" ? "✓" : t("submit")}
      </button>
    </form>
  );
}
