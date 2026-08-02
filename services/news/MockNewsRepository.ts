import type { NewsItem } from "@/types";
import type { NewsRepository } from "./NewsRepository";

const mockItems: NewsItem[] = [
  {
    id: "mock-1",
    source: "manual",
    sourceUrl: "https://www.instagram.com/thevicious_/",
    caption: "The Vicious lift the Saudi eLeague trophy, defeating Falcons in the finals.",
    mediaType: "image",
    mediaPlaceholder: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "mock-2",
    source: "manual",
    sourceUrl: "https://x.com/TheVicious_",
    caption: "D7om named Saudi eLeague MVP back-to-back.",
    mediaType: "image",
    mediaPlaceholder: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: "mock-3",
    source: "manual",
    sourceUrl: "https://www.facebook.com/profile.php?id=61567453406889",
    caption: "The Vicious x Honor of Kings program stats: 220+ players across the October–November season.",
    mediaType: "image",
    mediaPlaceholder: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

export class MockNewsRepository implements NewsRepository {
  async getLatest(limit = 6): Promise<NewsItem[]> {
    return mockItems.slice(0, limit);
  }
}
