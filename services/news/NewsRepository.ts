import type { NewsItem } from "@/types";

export interface NewsRepository {
  getLatest(limit?: number): Promise<NewsItem[]>;
}
