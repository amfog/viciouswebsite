import type { Player, Team } from "@/types";
import type { Roster } from "./RosterRepository";
import { MockRosterRepository } from "./MockRosterRepository";
import { SupabaseRosterRepository } from "./SupabaseRosterRepository";

const mock = new MockRosterRepository();
const live = new SupabaseRosterRepository();

let cached: Roster | null = null;

/**
 * Live-first, same pattern as services/news: if Supabase is configured
 * and has at least one player or team, use it. If the query fails (no
 * env vars, network issue) or Vicious OS simply hasn't added anyone yet,
 * fall back to the mock roster so Teams/Players never render blank.
 *
 * Cached per server instance/build — the roster doesn't change often
 * enough to justify a fresh query per request.
 */
export async function getRoster(): Promise<Roster> {
  if (cached) return cached;

  try {
    const result = await live.getRoster();
    if (result.players.length > 0 || result.teams.length > 0) {
      cached = result;
      return cached;
    }
  } catch {
    // fall through to mock
  }

  cached = await mock.getRoster();
  return cached;
}

export async function getAllTeams(): Promise<Team[]> {
  return (await getRoster()).teams;
}

export async function getAllPlayers(): Promise<Player[]> {
  return (await getRoster()).players;
}

export async function getTeamBySlug(slug: string): Promise<Team | undefined> {
  return (await getRoster()).teams.find((t) => t.slug === slug);
}

export async function getPlayerBySlug(slug: string): Promise<Player | undefined> {
  return (await getRoster()).players.find((p) => p.slug === slug);
}

export async function getPlayersByTeam(teamId: string): Promise<Player[]> {
  return (await getRoster()).players.filter((p) => p.teamId === teamId);
}
