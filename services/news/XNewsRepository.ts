import type { NewsItem } from "@/types";
import type { NewsRepository } from "./NewsRepository";

/**
 * Requires an X Developer Portal app with API v2 access (at minimum the
 * Basic paid tier — the free tier does not include user timeline reads)
 * and a Bearer Token.
 *
 * Env vars:
 *   X_BEARER_TOKEN – app-only Bearer Token
 *   X_USER_ID      – numeric user ID for @TheVicious_ (resolve once via
 *                    GET /2/users/by/username/TheVicious_ and hardcode
 *                    the id here, since the free tier's rate limit makes
 *                    a live username lookup on every request wasteful)
 *
 * Docs: https://developer.x.com/en/docs/x-api/tweets/timelines/api-reference/get-users-id-tweets
 */
export class XNewsRepository implements NewsRepository {
  async getLatest(limit = 6): Promise<NewsItem[]> {
    const userId = process.env.X_USER_ID;
    const token = process.env.X_BEARER_TOKEN;
    if (!userId || !token) return [];

    const params = new URLSearchParams({
      max_results: String(Math.min(Math.max(limit, 5), 100)),
      "tweet.fields": "created_at,text",
      exclude: "replies,retweets",
    });
    const url = `https://api.x.com/2/users/${userId}/tweets?${params.toString()}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 900 },
    });
    if (!res.ok) {
      throw new Error(`X API error: ${res.status} ${await res.text()}`);
    }
    const json = await res.json();

    return (json.data ?? []).map(
      (tweet: { id: string; text: string; created_at: string }): NewsItem => ({
        id: `x-${tweet.id}`,
        source: "x",
        sourceUrl: `https://x.com/TheVicious_/status/${tweet.id}`,
        caption: tweet.text,
        mediaType: "text",
        mediaPlaceholder: true,
        publishedAt: tweet.created_at,
      })
    );
  }
}
