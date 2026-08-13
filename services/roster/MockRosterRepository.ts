import { players } from "@/data/players";
import { teams } from "@/data/teams";
import type { RosterRepository, Roster } from "./RosterRepository";

export class MockRosterRepository implements RosterRepository {
  async getRoster(): Promise<Roster> {
    return { players, teams };
  }
}
