import { GamemodeId } from "./gamemodes";
import { TierId, tiers, tierOrder } from "./tiers";

export type Region = "NA" | "EU" | "AS" | "AU";

export interface PlayerTier {
  gamemode: GamemodeId;
  tier: TierId;
  previousTier?: TierId;
  lastTested: string; // ISO date
  tester: string;
}

export interface Player {
  username: string;
  uuid: string;
  region: Region;
  joined: string;
  bio?: string;
  tierList: PlayerTier[];
}

// Deterministic pseudo-uuid for mock avatars (mc-heads renders by username anyway).
function fakeUuid(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hex = h.toString(16).padStart(8, "0");
  return `${hex}-0000-4000-8000-${hex}${hex.slice(0, 4)}`;
}

const raw: { username: string; region: Region; joined: string; tiers: Partial<Record<GamemodeId, TierId>> }[] = [
  { username: "360Mall", region: "AU", joined: "2025-02-11", tiers: { sword: "LT2", axe: "HT3", uhc: "LT3", pot: "HT2", mace: "LT2", smp: "LT2", diasmp: "HT2", crystal: "LT2" } },
  { username: "Karthik987", region: "AS", joined: "2024-11-03", tiers: { sword: "LT1", axe: "HT3", uhc: "HT3", pot: "HT3", mace: "HT3", smp: "HT3", diasmp: "HT3", crystal: "LT3" } },
  { username: "signetxh", region: "AS", joined: "2025-01-19", tiers: { sword: "LT2", axe: "HT3", uhc: "HT3", pot: "HT3", mace: "HT3", smp: "HT3", diasmp: "LT3", crystal: "LT3" } },
  { username: "VLNISH", region: "AS", joined: "2025-03-27", tiers: { sword: "HT3", axe: "HT3", uhc: "HT3", pot: "HT3", mace: "HT3", smp: "LT3", diasmp: "LT3", crystal: "LT3" } },
  { username: "Rxplyy", region: "EU", joined: "2025-04-02", tiers: { sword: "HT3", axe: "LT3", uhc: "LT3", pot: "LT3", mace: "HT5", smp: "HT2", diasmp: "HT2" } },
  { username: "zomicxd", region: "NA", joined: "2025-05-14", tiers: { sword: "HT4", uhc: "LT4", axe: "HT4" } },
  { username: "kaeldrin_", region: "NA", joined: "2024-08-22", tiers: { sword: "HT1", axe: "HT1", uhc: "LT1", pot: "HT2", mace: "HT1", smp: "HT2", diasmp: "HT1", crystal: "HT2" } },
  { username: "Wrenfeather", region: "EU", joined: "2024-09-30", tiers: { sword: "LT1", axe: "HT2", uhc: "HT2", pot: "LT2", mace: "HT2", smp: "HT1", diasmp: "LT1", crystal: "HT2" } },
  { username: "Nyxelot", region: "NA", joined: "2025-01-08", tiers: { sword: "HT2", axe: "LT2", uhc: "HT2", pot: "HT2", mace: "LT2", smp: "LT2" } },
  { username: "brnt.exe", region: "EU", joined: "2025-06-01", tiers: { sword: "HT3", axe: "HT4", uhc: "HT3", diasmp: "LT3" } },
  { username: "Solmirage", region: "AU", joined: "2024-12-15", tiers: { sword: "HT2", axe: "HT2", uhc: "LT2", pot: "HT1", mace: "HT2", smp: "HT2", diasmp: "HT2", crystal: "HT1" } },
  { username: "quietloch", region: "NA", joined: "2025-02-28", tiers: { sword: "LT3", axe: "LT3", uhc: "HT4", pot: "LT4" } },
  { username: "Dravenholt", region: "EU", joined: "2024-07-19", tiers: { sword: "HT1", axe: "HT1", uhc: "HT1", pot: "HT1", mace: "HT1", smp: "HT1", diasmp: "HT1", crystal: "HT1" } },
  { username: "pixiedust22", region: "AU", joined: "2025-05-30", tiers: { sword: "LT4", uhc: "LT5", pot: "HT5" } },
  { username: "Ashgrove", region: "AS", joined: "2025-03-11", tiers: { sword: "HT2", axe: "HT2", uhc: "HT3", pot: "HT2", mace: "LT2", smp: "HT2" } },
  { username: "moltensteel", region: "NA", joined: "2024-10-06", tiers: { sword: "HT1", axe: "LT1", uhc: "HT2", mace: "HT1", diasmp: "HT1" } },
  { username: "Fennlight", region: "EU", joined: "2025-04-24", tiers: { sword: "LT2", axe: "HT2", uhc: "LT2", pot: "LT2", smp: "LT2", crystal: "HT2" } },
  { username: "grimtoast", region: "NA", joined: "2025-06-18", tiers: { sword: "HT4", axe: "HT4", uhc: "LT4" } },
  { username: "Isolde_pvp", region: "EU", joined: "2024-11-27", tiers: { sword: "HT1", axe: "HT2", uhc: "HT1", pot: "HT2", mace: "HT2", smp: "HT1", diasmp: "HT2", crystal: "HT1" } },
  { username: "coppervein", region: "AS", joined: "2025-02-02", tiers: { sword: "HT3", axe: "HT3", uhc: "HT2", pot: "HT3" } },
  { username: "Thistlewick", region: "AU", joined: "2025-01-14", tiers: { sword: "LT2", axe: "LT2", uhc: "HT2", diasmp: "LT2" } },
  { username: "nullwraith", region: "NA", joined: "2024-09-09", tiers: { sword: "HT2", axe: "HT1", uhc: "HT2", pot: "HT1", mace: "HT2", smp: "HT2", diasmp: "HT1", crystal: "HT2" } },
  { username: "Marrowlynn", region: "EU", joined: "2025-05-05", tiers: { sword: "LT3", uhc: "LT3", pot: "HT3" } },
  { username: "duskgambit", region: "AS", joined: "2025-04-16", tiers: { sword: "HT3", axe: "LT3", uhc: "HT3", smp: "LT3" } },
  { username: "veyroncold", region: "NA", joined: "2024-12-01", tiers: { sword: "HT2", axe: "HT2", uhc: "LT2", pot: "HT2", diasmp: "HT2" } },
  { username: "Hallowmere", region: "AU", joined: "2025-03-08", tiers: { sword: "LT1", axe: "HT2", uhc: "HT1", pot: "HT1", mace: "LT1" } },
  { username: "cinderoute", region: "EU", joined: "2025-06-09", tiers: { sword: "HT4", uhc: "HT4" } },
  { username: "Voidkestrel", region: "AS", joined: "2024-08-03", tiers: { sword: "HT1", axe: "HT1", uhc: "HT1", pot: "HT1", mace: "HT1", smp: "HT2", diasmp: "HT1", crystal: "HT1" } },
  { username: "pallidbrook", region: "NA", joined: "2025-02-19", tiers: { sword: "LT2", axe: "LT2", uhc: "LT2" } },
  { username: "Emberquill", region: "EU", joined: "2025-01-30", tiers: { sword: "HT3", axe: "HT3", uhc: "HT3", pot: "LT3", smp: "HT3" } },
  { username: "grousewilde", region: "AU", joined: "2025-05-21", tiers: { sword: "LT4", axe: "HT4" } },
  { username: "Silvertongue0", region: "NA", joined: "2024-10-25", tiers: { sword: "HT2", axe: "HT2", uhc: "HT2", pot: "HT3", mace: "HT2", diasmp: "HT2" } },
  { username: "mossagate", region: "AS", joined: "2025-04-06", tiers: { sword: "HT3", axe: "HT3", uhc: "LT3", crystal: "HT3" } },
  { username: "Blackfen_", region: "EU", joined: "2025-06-25", tiers: { sword: "LT5", axe: "HT5" } },
  { username: "ravinehollow", region: "NA", joined: "2025-03-19", tiers: { sword: "HT3", uhc: "HT3", pot: "HT2", diasmp: "HT3" } },
  { username: "Quiverstone", region: "AU", joined: "2024-11-11", tiers: { sword: "HT1", axe: "HT2", uhc: "HT1", pot: "HT1" } },
  { username: "faewatch", region: "AS", joined: "2025-02-14", tiers: { sword: "LT3", axe: "LT3", uhc: "HT4" } },
  { username: "Draugrmoss", region: "NA", joined: "2025-05-02", tiers: { sword: "HT4", axe: "LT4", uhc: "LT4" } },
  { username: "opalvex", region: "EU", joined: "2024-12-29", tiers: { sword: "HT2", axe: "HT2", uhc: "HT2", pot: "HT2", mace: "HT3", smp: "HT2", diasmp: "HT2", crystal: "HT2" } },
  { username: "Cragstep", region: "AU", joined: "2025-01-05", tiers: { sword: "LT1", axe: "HT1", uhc: "LT2" } },
];

function computePoints(t: Partial<Record<GamemodeId, TierId>>): number {
  return Object.values(t).reduce((sum, tier) => sum + (tier ? tiers[tier].points : 0), 0);
}

const testerPool = [
  "SkyeTester", "RunicJudge", "FerrousEval", "NovaAssess", "GraphiteRef",
  "TalonMark", "PyriteScout", "HollowGrade", "CobaltEval", "AmberRank",
];

function testHash(seed: string, mod: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 131 + seed.charCodeAt(i)) >>> 0;
  return h % mod;
}

export const players: Player[] = raw.map((p) => {
  const tierList: PlayerTier[] = Object.entries(p.tiers).map(([gamemode, tier]) => ({
    gamemode: gamemode as GamemodeId,
    tier: tier as TierId,
    lastTested: `2026-0${(testHash(p.username + gamemode, 4) + 6)}-${String((testHash(p.username + gamemode + "d", 27) + 1)).padStart(2, "0")}`,
    tester: testerPool[testHash(p.username + gamemode, testerPool.length)],
  }));

  // "Spear Mace" is a brand-new discipline with no historical mock tests —
  // synthesize coverage for roughly half the roster, derived from their
  // sword/axe tier, so the tierlist and profile pages aren't empty for it.
  const base = p.tiers.sword ?? p.tiers.axe;
  if (base && testHash(p.username + "spearmace", 5) < 3) {
    const idx = Math.min(tierOrder.indexOf(base) + 1, tierOrder.length - 1);
    tierList.push({
      gamemode: "spearmace",
      tier: tierOrder[idx],
      lastTested: `2026-0${(testHash(p.username + "spearmace", 4) + 6)}-${String((testHash(p.username + "spearmaced", 27) + 1)).padStart(2, "0")}`,
      tester: testerPool[testHash(p.username + "spearmace", testerPool.length)],
    });
  }

  return {
    username: p.username,
    uuid: fakeUuid(p.username),
    region: p.region,
    joined: p.joined,
    tierList,
  };
});

export function playerPoints(p: Player): number {
  const t: Partial<Record<GamemodeId, TierId>> = {};
  p.tierList.forEach((pt) => (t[pt.gamemode] = pt.tier));
  return computePoints(t);
}

export function getPlayer(username: string): Player | undefined {
  return players.find((p) => p.username.toLowerCase() === username.toLowerCase());
}

export const rankedPlayers = [...players].sort((a, b) => playerPoints(b) - playerPoints(a));

export function overallRank(username: string): number {
  return rankedPlayers.findIndex((p) => p.username.toLowerCase() === username.toLowerCase()) + 1;
}

export function avatarUrl(username: string, size = 128) {
  return `https://mc-heads.net/avatar/${encodeURIComponent(username)}/${size}`;
}

// Full-body isometric render — the character stands turned at an angle
// (same look as NameMC/skin-viewer sites) instead of a flat front-on face.
export function bodyUrl(username: string, size = 128) {
  return `https://mc-heads.net/body/${encodeURIComponent(username)}/${size}`;
}
