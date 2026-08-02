import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { teams } from "@/data/teams";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thevicious.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/teams", "/news", "/about", "/partners", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
      });
    }
    for (const team of teams) {
      entries.push({
        url: `${BASE_URL}/${locale}/teams/${team.slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
