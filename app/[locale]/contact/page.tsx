import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Mail } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return { title: t("title") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 pb-28 pt-40">
        <h1 className="font-display text-4xl font-bold md:text-6xl">{t("title")}</h1>
        <p className="mt-3 text-bone/65">{t("body")}</p>

        <a
          href={`mailto:${t("email")}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-volt hover:underline"
        >
          <Mail className="h-4 w-4" />
          {t("email")}
        </a>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
