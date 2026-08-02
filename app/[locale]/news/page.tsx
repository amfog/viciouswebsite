import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsGrid } from "@/components/NewsGrid";

export async function generateMetadata() {
  const t = await getTranslations("news");
  return { title: t("title") };
}

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="pt-28">
        <NewsGrid />
      </main>
      <Footer />
    </>
  );
}
