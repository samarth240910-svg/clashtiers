// Tier system config. HT/LT per numbered division, high to low.
// Points model matches what an overall leaderboard would sum from per-gamemode tiers.

export type TierId =
  | "HT1" | "LT1"
  | "HT2" | "LT2"
  | "HT3" | "LT3"
  | "HT4" | "LT4"
  | "HT5" | "LT5";

export interface TierDef {
  id: TierId;
  division: 1 | 2 | 3 | 4 | 5;
  isHigh: boolean;
  points: number;
}

export const tierOrder: TierId[] = [
  "HT1", "LT1",
  "HT2", "LT2",
  "HT3", "LT3",
  "HT4", "LT4",
  "HT5", "LT5",
];

export const tiers: Record<TierId, TierDef> = {
  HT1: { id: "HT1", division: 1, isHigh: true, points: 60 },
  LT1: { id: "LT1", division: 1, isHigh: false, points: 45 },
  HT2: { id: "HT2", division: 2, isHigh: true, points: 30 },
  LT2: { id: "LT2", division: 2, isHigh: false, points: 21 },
  HT3: { id: "HT3", division: 3, isHigh: true, points: 14 },
  LT3: { id: "LT3", division: 3, isHigh: false, points: 9 },
  HT4: { id: "HT4", division: 4, isHigh: true, points: 5 },
  LT4: { id: "LT4", division: 4, isHigh: false, points: 3 },
  HT5: { id: "HT5", division: 5, isHigh: true, points: 2 },
  LT5: { id: "LT5", division: 5, isHigh: false, points: 1 },
};

export function tierRank(id: TierId): number {
  return tierOrder.indexOf(id);
}

// Ranked titles by point thresholds, shown next to a player's name.
export interface RankTitle {
  label: string;
  min: number;
  color: string;
}

export const rankTitles: RankTitle[] = [
  { label: "Combat Grandmaster", min: 200, color: "#FFC13B" },
  { label: "Combat Ace", min: 120, color: "#E23636" },
  { label: "Combat Specialist", min: 70, color: "#B26CE8" },
  { label: "Combat Master", min: 40, color: "#4CC2FF" },
  { label: "Combatant", min: 15, color: "#9AA3AF" },
  { label: "Rookie", min: 0, color: "#6B7280" },
];

export function getRankTitle(points: number): RankTitle {
  return rankTitles.find((r) => points >= r.min) ?? rankTitles[rankTitles.length - 1];
}
