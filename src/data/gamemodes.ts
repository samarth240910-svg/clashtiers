// Central gamemode configuration.
// This mirrors how the Discord bot's config will define gamemodes —
// add/remove a gamemode here and it propagates through the whole site
// (tierlist tabs, profile cards, autocomplete-equivalent selectors, etc).

export type GamemodeId =
  | "sword"
  | "axe"
  | "pot"
  | "mace"
  | "uhc"
  | "diasmp"
  | "smp"
  | "crystal"
  | "spearmace";

export interface Gamemode {
  id: GamemodeId;
  label: string;
  shortLabel: string;
  icon: string; // key into <GamemodeIcon />
  color: string; // accent hex used for badges/icons in this gamemode
  description: string;
}

export const gamemodes: Gamemode[] = [
  {
    id: "sword",
    label: "Sword",
    shortLabel: "SW",
    icon: "sword",
    color: "#E23636",
    description: "Vanilla sword combat with knockback and blocking.",
  },
  {
    id: "axe",
    label: "Axe",
    shortLabel: "AXE",
    icon: "axe",
    color: "#C77C3B",
    description: "Axe combat, favoring high-damage single hits.",
  },
  {
    id: "pot",
    label: "Pot",
    shortLabel: "POT",
    icon: "potion",
    color: "#8E44C9",
    description: "Splash potion combat with sword follow-ups.",
  },
  {
    id: "mace",
    label: "Mace",
    shortLabel: "MACE",
    icon: "mace",
    color: "#B08D57",
    description: "Wind-charge mace combat built around burst damage.",
  },
  {
    id: "uhc",
    label: "UHC",
    shortLabel: "UHC",
    icon: "heart",
    color: "#D63B5C",
    description: "No regen, gapple-fueled sword fights.",
  },
  {
    id: "diasmp",
    label: "Dia SMP",
    shortLabel: "DSMP",
    icon: "diamond",
    color: "#3FB6D3",
    description: "Full diamond gear, survival-server style combat.",
  },
  {
    id: "smp",
    label: "SMP",
    shortLabel: "SMP",
    icon: "grass",
    color: "#3FA34D",
    description: "Realistic survival-server gear and combos.",
  },
  {
    id: "crystal",
    label: "Crystal",
    shortLabel: "CRYS",
    icon: "crystal",
    color: "#C77CF2",
    description: "End crystal PvP — positioning, timing, and burst damage.",
  },
  {
    id: "spearmace",
    label: "Spear Mace",
    shortLabel: "SPMC",
    icon: "spearmace",
    color: "#5B7FBF",
    description: "Mace combat extended with spear-range pole weapons.",
  },
];

export const gamemodeMap: Record<string, Gamemode> = Object.fromEntries(
  gamemodes.map((g) => [g.id, g])
);

export function getGamemode(id: string): Gamemode | undefined {
  return gamemodeMap[id];
}
