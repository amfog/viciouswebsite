// Core domain types.
// These interfaces define the contract between the UI and its data sources.
// Today they're satisfied by mock/JSON repositories; later, Vicious OS
// (Supabase-backed) implements the same shapes so no UI code needs to change.

export type Locale = "en" | "ar";

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface SocialLinks {
  instagram?: string;
  x?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  discord?: string;
}

export interface Achievement {
  id: string;
  title: LocalizedText;
  competition: LocalizedText;
  placement: 1 | 2 | 3;
  year: number;
  game: string;
}

export interface Player {
  id: string;
  slug: string;
  nickname: string;
  realName?: string;
  country: string; // ISO 3166-1 alpha-2
  role: LocalizedText;
  age?: number;
  teamId: string;
  photoPlaceholder: true;
  /** Real photo URL (Supabase Storage), set once Vicious OS supplies one.
   *  Falls through to the placeholder box when absent. */
  photoUrl?: string;
  socials?: SocialLinks;
  achievements?: Achievement[];
  bio?: LocalizedText;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  game: string;
  gameIcon: string; // key into /public/games/*
  country: string;
  playerIds: string[];
  coach?: string;
  achievements?: Achievement[];
  status: "active" | "upcoming";
  /** Real logo URL (Supabase Storage), set once Vicious OS supplies one. */
  logoUrl?: string;
}

export interface NewsItem {
  id: string;
  source: "instagram" | "facebook" | "x" | "manual";
  sourceUrl: string;
  caption: string;
  mediaType: "image" | "video" | "text";
  mediaPlaceholder: true;
  publishedAt: string; // ISO date
}

export interface Leader {
  id: string;
  slug: string;
  name: string;
  role: LocalizedText;
  affiliations?: string[];
  bio?: LocalizedText;
  photoSrc?: string; // e.g. /images/leadership/{slug}.jpg
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "partner" | "sponsor" | "upcoming";
  logoPlaceholder: true;
  url?: string;
}

export interface Match {
  id: string;
  teamId: string;
  opponent: string;
  game: string;
  date: string;
  result?: "win" | "loss" | "upcoming";
  score?: string;
}
