// Central gamemode configuration.
// This mirrors how the Discord bot's config.js will define gamemodes —
// add/remove a gamemode here and it propagates through the whole site
// (tierlist tabs, profile cards, autocomplete-equivalent selectors, etc).

export type GamemodeId =
  | "overall"
  | "sword"
  | "axe"
  | "uhc"
  | "pot"
  | "nethop"
  | "smp"
  | "diapot"
  | "creeper";

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
    id: "uhc",
    label: "UHC",
    shortLabel: "UHC",
    icon: "heart",
    color: "#D63B5C",
    description: "No regen, gapple-fueled sword fights.",
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
    id: "nethop",
    label: "NethOP",
    shortLabel: "NOP",
    icon: "portal",
    color: "#7B5CD6",
    description: "Fully enchanted netherite gear, no cooldowns.",
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
    id: "diapot",
    label: "DiaPot",
    shortLabel: "DPOT",
    icon: "diamond",
    color: "#3FB6D3",
    description: "Diamond armor potion fights.",
  },
  {
    id: "creeper",
    label: "Creeper",
    shortLabel: "CRPR",
    icon: "creeper",
    color: "#4CAF50",
    description: "Explosion-aware positioning and sword combat.",
  },
];

export const gamemodeMap: Record<string, Gamemode> = Object.fromEntries(
  gamemodes.map((g) => [g.id, g])
);

export function getGamemode(id: string): Gamemode | undefined {
  return gamemodeMap[id];
}
