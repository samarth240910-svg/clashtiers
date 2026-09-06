import { Gamemode } from "@/data/gamemodes";
import { TierId } from "@/data/tiers";
import GamemodeIcon from "./GamemodeIcon";

// Deterministic small tilt per position — alternating + a little spread so the
// row doesn't look perfectly mechanical, but is stable across renders.
const tiltPattern = [-8, 6, -5, 9, -7, 4, -9, 7, -6];

export default function GamemodeTierIcon({
  gamemode,
  tier,
  index = 0,
  size = "md",
}: {
  gamemode: Gamemode;
  tier: TierId;
  index?: number;
  size?: "sm" | "md";
}) {
  const tilt = tiltPattern[index % tiltPattern.length];
  const dims = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const iconDims = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className="group/tier flex flex-col items-center gap-1" title={`${gamemode.label} · ${tier}`}>
      <div
        className={`${dims} rounded-full flex items-center justify-center border transition-all duration-300 ease-out group-hover/tier:rotate-0 group-hover/tier:scale-[1.15] group-hover/tier:drop-shadow-[0_0_8px_currentColor]`}
        style={{
          backgroundColor: `${gamemode.color}26`,
          borderColor: `${gamemode.color}55`,
          color: gamemode.color,
          transform: `rotate(${tilt}deg)`,
        }}
      >
        <GamemodeIcon icon={gamemode.icon} className={iconDims} />
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-wide text-text-muted transition-colors duration-300 group-hover/tier:text-text-secondary">
        {tier}
      </span>
    </div>
  );
}
