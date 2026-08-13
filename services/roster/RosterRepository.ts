import type { Player, Team } from "@/types";

export interface Roster {
  players: Player[];
  teams: Team[];
}

export interface RosterRepository {
  getRoster(): Promise<Roster>;
}
