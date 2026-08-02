import type { Player } from "@/types";

// Nicknames are real (from the roster slide). Real names, ages, and bios
// are placeholders until Vicious OS supplies confirmed player data.
const roster: Array<[string, string, string, string]> = [
  // [slug, nickname, teamId, country]
  ["ozil", "Ozil", "pubg-mobile", "SA"],
  ["mo7", "MO7", "pubg-mobile", "SA"],
  ["r3b", "R3B", "pubg-mobile", "SA"],
  ["y4sr", "Y4SR", "pubg-mobile", "SA"],
  ["salum", "SALUM", "pubg-mobile", "SA"],
  ["dyana", "Dyana", "pubg-mobile-female", "TR"],
  ["gucci", "Gucci", "pubg-mobile-female", "TR"],
  ["melek9", "Melek9", "pubg-mobile-female", "TR"],
  ["sila", "Sıla", "pubg-mobile-female", "TR"],
  ["rissky", "RISSKY", "fc-mobile", "SA"],
  ["agit", "Agit", "fc25", "US"],
  ["lamps", "Lamps", "fc25", "CA"],
  ["goatman", "Goatman", "fc25", "SA"],
  ["faares", "Faares", "rainbow-six", "SA"],
  ["sngl", "Sngl", "rainbow-six", "SA"],
  ["mhagr", "Mhagr", "rainbow-six", "SA"],
  ["jubz", "Jubz", "rainbow-six", "SA"],
  ["mcdo", "Mcdo", "rainbow-six", "SA"],
  ["roxas", "Roxas", "call-of-duty", "SA"],
  ["kingabody", "KingAbody", "call-of-duty", "SA"],
  ["rohen", "Rohen", "call-of-duty", "SA"],
  ["knoxx", "Knoxx", "call-of-duty", "SA"],
  ["9lq", "9LQ", "cod-mobile", "SA"],
  ["abu3tb", "ABU3TB", "cod-mobile", "SA"],
  ["alshamri", "ALSHAMRI", "cod-mobile", "SA"],
  ["khaled", "Khaled", "cod-mobile", "SA"],
  ["nile", "NILE", "cod-mobile", "PH"],
  ["nuke", "NUKE", "cod-mobile", "SA"],
  ["qasim", "Qasim", "tekken", "PK"],
  ["turki", "Turki", "street-fighter", "SA"],
  ["basel", "Basel", "rocket-league", "SA"],
  ["nawaf", "Nawaf", "rocket-league", "SA"],
  ["yehia", "Yehia", "rocket-league", "SA"],
  ["mohammed", "Mohammed", "rocket-league", "SA"],
];

export const players: Player[] = roster.map(([slug, nickname, teamId, country]) => ({
  id: slug,
  slug,
  nickname,
  country,
  teamId,
  photoPlaceholder: true,
  role: { en: "Competitor", ar: "لاعب محترف" },
}));

export function getPlayersByTeam(teamId: string): Player[] {
  return players.filter((p) => p.teamId === teamId);
}
