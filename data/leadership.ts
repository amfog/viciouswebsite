import type { Leader } from "@/types";

// Names, roles and affiliated logos are real (Company Profile 2026, p.5).
// Bios are placeholders — replace with real copy when available.
export const leaders: Leader[] = [
  {
    id: "ceo",
    slug: "ahmed-al-hassan",
    name: "Ahmed Al-Hassan",
    role: { en: "CEO", ar: "الرئيس التنفيذي" },
    affiliations: ["PMP", "Saudi Esports", "Saudi League", "Esports World Cup", "Tencent"],
  },
  {
    id: "strategy",
    slug: "tariq-al-kwaitim",
    name: "Tariq Al-Kwaitim",
    role: { en: "Strategic Director", ar: "المدير الاستراتيجي" },
    affiliations: ["King Fahad Medical City"],
  },
  {
    id: "esports",
    slug: "mohamed-ashraf",
    name: "Mohamed Ashraf",
    role: { en: "Esports Director", ar: "مدير الرياضات الإلكترونية" },
    affiliations: ["GeekBay Esports", "Riot Games"],
  },
];
