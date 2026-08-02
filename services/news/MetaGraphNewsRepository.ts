import type { NewsItem } from "@/types";
import type { NewsRepository } from "./NewsRepository";

/**
 * Requires a Meta Business app with the Instagram Graph API + Pages API
 * products added, a long-lived Page access token, and the IG account
 * connected as a professional/business account linked to the Page.
 *
 * Env vars:
 *   META_PAGE_ID                – Facebook Page ID (thevicious_)
 *   META_IG_BUSINESS_ACCOUNT_ID – Instagram Business Account ID linked to the Page
 *   META_ACCESS_TOKEN           – long-lived Page access token
 *
 * Docs: https://developers.facebook.com/docs/instagram-api/guides/content-publishing
 *       https://developers.facebook.com/docs/pages-api
 *
 * Token expires (long-lived tokens last ~60 days) — refresh via a scheduled
 * job or the token debug endpoint before it lapses, or posts silently stop
 * updating.
 */
export class MetaGraphNewsRepository implements NewsRepository {
  private readonly graphVersion = "v21.0";

  async getLatest(limit = 6): Promise<NewsItem[]> {
    const [igItems, fbItems] = await Promise.all([
      this.getInstagram(limit),
      this.getFacebook(limit),
    ]);

    return [...igItems, ...fbItems]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }

  private async getInstagram(limit: number): Promise<NewsItem[]> {
    const igId = process.env.META_IG_BUSINESS_ACCOUNT_ID;
    const token = process.env.META_ACCESS_TOKEN;
    if (!igId || !token) return [];

    const fields = "id,caption,media_type,permalink,timestamp";
    const url = `https://graph.facebook.com/${this.graphVersion}/${igId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;

    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) {
      throw new Error(`Instagram Graph API error: ${res.status} ${await res.text()}`);
    }
    const json = await res.json();

    return (json.data ?? []).map(
      (item: { id: string; caption?: string; media_type: string; permalink: string; timestamp: string }): NewsItem => ({
        id: `ig-${item.id}`,
        source: "instagram",
        sourceUrl: item.permalink,
        caption: item.caption ?? "",
        mediaType: item.media_type === "VIDEO" ? "video" : "image",
        mediaPlaceholder: true,
        publishedAt: item.timestamp,
      })
    );
  }

  private async getFacebook(limit: number): Promise<NewsItem[]> {
    const pageId = process.env.META_PAGE_ID;
    const token = process.env.META_ACCESS_TOKEN;
    if (!pageId || !token) return [];

    const fields = "id,message,created_time,permalink_url,full_picture";
    const url = `https://graph.facebook.com/${this.graphVersion}/${pageId}/posts?fields=${fields}&limit=${limit}&access_token=${token}`;

    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) {
      throw new Error(`Facebook Graph API error: ${res.status} ${await res.text()}`);
    }
    const json = await res.json();

    return (json.data ?? []).map(
      (item: { id: string; message?: string; created_time: string; permalink_url: string }): NewsItem => ({
        id: `fb-${item.id}`,
        source: "facebook",
        sourceUrl: item.permalink_url,
        caption: item.message ?? "",
        mediaType: "image",
        mediaPlaceholder: true,
        publishedAt: item.created_time,
      })
    );
  }
}
