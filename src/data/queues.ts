import { GamemodeId } from "./gamemodes";
import { Region } from "./players";

export interface QueueEntry {
  username: string;
  joinedMinutesAgo: number;
}

export interface Queue {
  id: string;
  tester: string;
  region: Region;
  gamemode: GamemodeId;
  dailyLimit: number;
  completed: number;
  entries: QueueEntry[];
  openedMinutesAgo: number;
  durationMinutes: number;
  status: "open" | "closed";
}

export const activeQueues: Queue[] = [
  {
    id: "Q-2291",
    tester: "SkyeTester",
    region: "NA",
    gamemode: "sword",
    dailyLimit: 10,
    completed: 4,
    entries: [
      { username: "brnt.exe", joinedMinutesAgo: 3 },
      { username: "quietloch", joinedMinutesAgo: 7 },
    ],
    openedMinutesAgo: 40,
    durationMinutes: 120,
    status: "open",
  },
  {
    id: "Q-2290",
    tester: "RunicJudge",
    region: "EU",
    gamemode: "pot",
    dailyLimit: 8,
    completed: 6,
    entries: [{ username: "Fennlight", joinedMinutesAgo: 12 }],
    openedMinutesAgo: 95,
    durationMinutes: 180,
    status: "open",
  },
  {
    id: "Q-2289",
    tester: "FerrousEval",
    region: "AS",
    gamemode: "smp",
    dailyLimit: 12,
    completed: 2,
    entries: [],
    openedMinutesAgo: 15,
    durationMinutes: 360,
    status: "open",
  },
];
