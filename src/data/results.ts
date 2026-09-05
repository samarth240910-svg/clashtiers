import { GamemodeId } from "./gamemodes";
import { TierId } from "./tiers";
import { Region } from "./players";

export interface ResultEntry {
  id: string;
  player: string;
  gamemode: GamemodeId;
  tier: TierId;
  previousTier?: TierId;
  tester: string;
  region: Region;
  feedback?: string;
  tip?: string;
  minutesAgo: number;
}

export const recentResults: ResultEntry[] = [
  { id: "CT-10482", player: "zomicxd", gamemode: "sword", tier: "HT4", previousTier: "LT4", tester: "SkyeTester", region: "NA", feedback: "Very consistent movement and aim.", tip: "Improve spacing during combos.", minutesAgo: 2 },
  { id: "CT-10481", player: "grimtoast", gamemode: "axe", tier: "HT4", previousTier: "LT5", tester: "GraphiteRef", region: "NA", feedback: "Strong reads on axe cooldown timing.", tip: "Work on W-tap consistency.", minutesAgo: 9 },
  { id: "CT-10480", player: "cinderoute", gamemode: "uhc", tier: "HT4", tester: "NovaAssess", region: "EU", feedback: "Solid gapple cycling under pressure.", minutesAgo: 21 },
  { id: "CT-10479", player: "Marrowlynn", gamemode: "pot", tier: "HT3", previousTier: "LT3", tester: "RunicJudge", region: "EU", feedback: "Good pot accuracy, clean crystal awareness.", tip: "Tighten up combo reset timing.", minutesAgo: 34 },
  { id: "CT-10478", player: "mossagate", gamemode: "creeper", tier: "HT3", previousTier: "LT4", tester: "HollowGrade", region: "AS", feedback: "Handled explosions well, good spacing.", minutesAgo: 48 },
  { id: "CT-10477", player: "faewatch", gamemode: "uhc", tier: "HT4", previousTier: "LT4", tester: "PyriteScout", region: "AS", feedback: "Improved a lot since last test.", tip: "Focus on hunger management.", minutesAgo: 61 },
  { id: "CT-10476", player: "Draveholt2", gamemode: "sword", tier: "HT2", previousTier: "LT2", tester: "FerrousEval", region: "AS", feedback: "Clean W-tapping, strong combo control.", minutesAgo: 77 },
  { id: "CT-10475", player: "grousewilde", gamemode: "axe", tier: "HT4", tester: "CobaltEval", region: "EU", feedback: "Promising raw mechanics for a first test.", tip: "Learn basic combo extensions.", minutesAgo: 95 },
  { id: "CT-10474", player: "Draugrmoss", gamemode: "sword", tier: "HT4", previousTier: "LT5", tester: "SkyeTester", region: "NA", feedback: "Noticeably better crit timing.", minutesAgo: 118 },
  { id: "CT-10473", player: "opalvex", gamemode: "nethop", tier: "HT3", previousTier: "HT4", tester: "CobaltEval", region: "EU", feedback: "Strong sustained pressure with full kit.", minutesAgo: 142 },
];

export function timeAgoLabel(minutes: number): string {
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
