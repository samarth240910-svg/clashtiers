import { GamemodeId } from "./gamemodes";
import { Region } from "./players";

export type TesterStatus = "active" | "idle" | "inactive";

export interface Tester {
  username: string;
  region: Region;
  gamemodes: GamemodeId[];
  testsCompleted: number;
  testsThisWeek: number;
  status: TesterStatus;
  joined: string;
  rank: "Trial Tester" | "Tester" | "Head Tester" | "Tester Manager";
}

export const testers: Tester[] = [
  { username: "SkyeTester", region: "NA", gamemodes: ["sword", "axe", "uhc"], testsCompleted: 842, testsThisWeek: 34, status: "active", joined: "2024-06-01", rank: "Tester Manager" },
  { username: "RunicJudge", region: "EU", gamemodes: ["sword", "pot", "diapot"], testsCompleted: 731, testsThisWeek: 28, status: "active", joined: "2024-07-15", rank: "Head Tester" },
  { username: "FerrousEval", region: "AS", gamemodes: ["sword", "axe", "smp"], testsCompleted: 655, testsThisWeek: 19, status: "active", joined: "2024-08-02", rank: "Head Tester" },
  { username: "NovaAssess", region: "AU", gamemodes: ["uhc", "nethop"], testsCompleted: 512, testsThisWeek: 11, status: "idle", joined: "2024-09-20", rank: "Tester" },
  { username: "GraphiteRef", region: "NA", gamemodes: ["sword", "creeper"], testsCompleted: 489, testsThisWeek: 22, status: "active", joined: "2024-10-11", rank: "Tester" },
  { username: "TalonMark", region: "EU", gamemodes: ["axe", "pot"], testsCompleted: 401, testsThisWeek: 0, status: "inactive", joined: "2024-11-05", rank: "Tester" },
  { username: "PyriteScout", region: "AS", gamemodes: ["sword", "uhc", "diapot"], testsCompleted: 376, testsThisWeek: 17, status: "active", joined: "2024-12-19", rank: "Tester" },
  { username: "HollowGrade", region: "NA", gamemodes: ["smp", "creeper"], testsCompleted: 298, testsThisWeek: 6, status: "idle", joined: "2025-01-22", rank: "Trial Tester" },
  { username: "CobaltEval", region: "EU", gamemodes: ["sword", "nethop"], testsCompleted: 254, testsThisWeek: 14, status: "active", joined: "2025-02-08", rank: "Trial Tester" },
  { username: "AmberRank", region: "AU", gamemodes: ["axe", "uhc"], testsCompleted: 187, testsThisWeek: 3, status: "idle", joined: "2025-03-30", rank: "Trial Tester" },
];

export function getTester(username: string): Tester | undefined {
  return testers.find((t) => t.username.toLowerCase() === username.toLowerCase());
}

export const rankedTesters = [...testers].sort((a, b) => b.testsCompleted - a.testsCompleted);
