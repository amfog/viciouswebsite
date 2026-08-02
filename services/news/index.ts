import type { NewsItem } from "@/types";
import { MockNewsRepository } from "./MockNewsRepository";
import { MetaGraphNewsRepository } from "./MetaGraphNewsRepository";
import { XNewsRepository } from "./XNewsRepository";

const mock = new MockNewsRepository();
const meta = new MetaGraphNewsRepository();
const x = new XNewsRepository();

/**
 * Aggregates Instagram + Facebook (Meta Graph API) and X into one feed.
 * Each live source fails independently and silently — if credentials
 * aren't configured yet, or a token expires, that source just contributes
 * nothing rather than breaking the page. If every live source returns
 * empty, the mock feed fills the gap so News never renders blank.
 *
 * Once Vicious OS is ready, add a ManualNewsRepository here (reading
 * from Supabase) and give it priority over the mock fallback.
 */
export async function getLatestNews(limit = 6): Promise<NewsItem[]> {
  const results = await Promise.allSettled([
    meta.getLatest(limit),
    x.getLatest(limit),
  ]);

  const live = results
    .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);

  if (live.length > 0) {
    return live
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }

  return mock.getLatest(limit);
}
