import Link from "next/link";
import { Player, avatarUrl, playerPoints } from "@/data/players";
import { getRankTitle } from "@/data/tiers";
import { gamemodes } from "@/data/gamemodes";
import GamemodeTierIcon from "./GamemodeTierIcon";
import RankPosition from "./RankPosition";

export default function LeaderboardRow({
  player,
  rank,
  onSelect,
}: {
  player: Player;
  rank: number;
  /** When provided, the row opens a quick-view overlay instead of navigating to the full profile page. */
  onSelect?: (username: string) => void;
}) {
  const points = playerPoints(player);
  const title = getRankTitle(points);
  const tierByGamemode = Object.fromEntries(player.tierList.map((t) => [t.gamemode, t.tier]));

  const rowClass =
    "group grid grid-cols-[auto_auto_1fr_auto_auto] items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 rounded-2xl border border-transparent hover:border-amber/25 hover:bg-surface/70 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(242,193,78,0.1)] transition-all duration-300 w-full text-left";

  const content = (
    <>
      <RankPosition rank={rank} />

      {/* Flat face avatar — simple square, with a soft golden glint ring on hover */}
      <div className="relative w-10 sm:w-11 h-10 sm:h-11 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-amber/50 group-hover:shadow-[0_0_16px_rgba(242,193,78,0.4)] group-hover:scale-105">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarUrl(player.username, 64)} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary truncate">{player.username}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: title.color }}>
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
            <path d="M12 2l2.6 6.6L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.4-.4z" />
          </svg>
          {title.label}
        </div>
        <div className="flex md:hidden items-center gap-2 mt-1.5 flex-wrap">
          {gamemodes.slice(0, 5).map((g, i) => {
            const t = tierByGamemode[g.id];
            return t ? <GamemodeTierIcon key={g.id} gamemode={g} tier={t} index={i} size="sm" /> : null;
          })}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2.5">
        {gamemodes.map((g, i) => {
          const t = tierByGamemode[g.id];
          return t ? (
            <GamemodeTierIcon key={g.id} gamemode={g} tier={t} index={i} size="sm" />
          ) : (
            <span key={g.id} className="w-7 h-7 rounded-full border border-dashed border-border-subtle" />
          );
        })}
      </div>

      <div className="text-right shrink-0">
        <div className="font-display font-bold text-text-primary">{points}</div>
        <div className="text-[11px] text-text-muted uppercase tracking-wide">pts</div>
      </div>
    </>
  );

  if (onSelect) {
    return (
      <button type="button" onClick={() => onSelect(player.username)} className={rowClass}>
        {content}
      </button>
    );
  }

  return (
    <Link href={`/profile/${player.username}`} className={rowClass}>
      {content}
    </Link>
  );
}
