import { supabase } from "@/lib/supabase";
import type { Player, Team, LocalizedText, SocialLinks } from "@/types";
import type { RosterRepository, Roster } from "./RosterRepository";

const defaultRole: LocalizedText = { en: "Competitor", ar: "لاعب محترف" };

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type PublicPlayerRow = {
  id: string;
  display_name: string;
  ign: string;
  game: string;
  team_id: string | null;
  in_game_role: string | null;
  nationality: string | null;
  bio: string | null;
  social_instagram: string | null;
  social_twitter: string | null;
  social_tiktok: string | null;
  social_youtube: string | null;
  social_twitch: string | null;
  personal_photo_url: string | null;
  is_active: boolean;
};

type TeamRow = {
  id: string;
  name: string;
  slug: string;
  game: string;
  game_icon: string | null;
  country: string | null;
  coach: string | null;
  status: "active" | "upcoming" | "archived";
  logo_url: string | null;
};

function mapPlayer(row: PublicPlayerRow): Player {
  const socials: SocialLinks = {};
  if (row.social_instagram) socials.instagram = row.social_instagram;
  if (row.social_twitter) socials.x = row.social_twitter;
  if (row.social_tiktok) socials.tiktok = row.social_tiktok;
  if (row.social_youtube) socials.youtube = row.social_youtube;

  return {
    id: row.id,
    slug: slugify(row.ign || row.display_name),
    nickname: row.ign,
    realName: row.display_name,
    country: row.nationality ?? "",
    role: row.in_game_role ? { en: row.in_game_role, ar: row.in_game_role } : defaultRole,
    teamId: row.team_id ?? "",
    photoPlaceholder: true,
    photoUrl: row.personal_photo_url ?? undefined,
    socials: Object.keys(socials).length > 0 ? socials : undefined,
    bio: row.bio ? { en: row.bio, ar: row.bio } : undefined,
  };
}

function mapTeam(row: TeamRow, playerIds: string[]): Team {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    game: row.game,
    gameIcon: row.game_icon ?? "",
    country: row.country ?? "",
    playerIds,
    coach: row.coach ?? undefined,
    status: row.status === "upcoming" ? "upcoming" : "active",
    logoUrl: row.logo_url ?? undefined,
  };
}

/**
 * Reads the same Supabase project Vicious OS writes to — `public_players`
 * (a safe view over `players`, no PII) and `teams`. Archived teams are
 * excluded from the public site entirely.
 */
export class SupabaseRosterRepository implements RosterRepository {
  async getRoster(): Promise<Roster> {
    if (!supabase) return { players: [], teams: [] };

    const [playersRes, teamsRes] = await Promise.all([
      supabase.from("public_players").select("*").eq("is_active", true),
      supabase.from("teams").select("*").neq("status", "archived"),
    ]);

    if (playersRes.error || teamsRes.error) {
      throw playersRes.error ?? teamsRes.error;
    }

    const playerRows = (playersRes.data ?? []) as PublicPlayerRow[];
    const teamRows = (teamsRes.data ?? []) as TeamRow[];

    const players = playerRows.map(mapPlayer);

    const playerIdsByTeam = new Map<string, string[]>();
    for (const p of players) {
      if (!p.teamId) continue;
      playerIdsByTeam.set(p.teamId, [...(playerIdsByTeam.get(p.teamId) ?? []), p.id]);
    }

    const teams = teamRows.map((row) => mapTeam(row, playerIdsByTeam.get(row.id) ?? []));

    return { players, teams };
  }
}
