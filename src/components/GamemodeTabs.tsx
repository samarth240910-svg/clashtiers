import Link from "next/link";
import { gamemodes } from "@/data/gamemodes";
import GamemodeIcon from "./GamemodeIcon";

export default function GamemodeTabs({ active }: { active?: string }) {
  const isOverall = !active;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
      <Link
        href="/tierlist"
        className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold font-display tracking-wide border transition-all ${
          isOverall
            ? "bg-gradient-to-r from-red/20 to-amber/20 border-amber/40 text-amber shadow-[0_0_16px_rgba(255,182,72,0.15)]"
            : "bg-surface/60 border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-strong"
        }`}
      >
        <GamemodeIcon icon="trophy" className="w-4 h-4" />
        Overall
      </Link>
      {gamemodes.map((g) => {
        const isActive = active === g.id;
        return (
          <Link
            key={g.id}
            href={`/tierlist/${g.id}`}
            title={g.label}
            className={`shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl border transition-all ${
              isActive ? "border-2 scale-105" : "bg-surface/60 border-border-subtle hover:border-border-strong"
            }`}
            style={
              isActive
                ? { backgroundColor: `${g.color}22`, borderColor: `${g.color}66`, color: g.color, boxShadow: `0 0 16px ${g.color}33` }
                : { color: g.color }
            }
          >
            <GamemodeIcon icon={g.icon} className="w-[18px] h-[18px]" />
          </Link>
        );
      })}
    </div>
  );
}
