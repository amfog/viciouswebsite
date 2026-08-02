import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { CustomCursor } from "@/components/CustomCursor";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Vicious | Esports Organization",
    template: "%s | The Vicious",
  },
  description:
    "The Vicious — a Saudi esports organization competing across ten titles, from PUBG Mobile to Tekken to CS2. #FearTheVicious",
  openGraph: {
    title: "The Vicious | Esports Organization",
    description: "A Saudi esports organization competing across ten titles. #FearTheVicious",
    siteName: "The Vicious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TheVicious_",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&family=Cairo:wght@600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-void text-bone">
        <NextIntlClientProvider>
          <div className="noise-overlay" aria-hidden="true" />
          <CustomCursor />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
