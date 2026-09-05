import Link from "next/link";
import { Player, avatarUrl, playerPoints } from "@/data/players";
import { getRankTitle } from "@/data/tiers";
import { gamemodes } from "@/data/gamemodes";
import TierBadge from "./TierBadge";
import RankPosition from "./RankPosition";

export default function LeaderboardRow({ player, rank }: { player: Player; rank: number }) {
  const points = playerPoints(player);
  const title = getRankTitle(points);
  const tierByGamemode = Object.fromEntries(player.tierList.map((t) => [t.gamemode, t.tier]));

  return (
    <Link
      href={`/profile/${player.username}`}
      className="grid grid-cols-[auto_1fr_auto_auto] sm:grid-cols-[auto_auto_1fr_auto_auto] items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3.5 rounded-2xl border border-transparent hover:border-border-subtle hover:bg-surface/70 transition-colors"
    >
      <RankPosition rank={rank} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatarUrl(player.username, 64)}
        alt=""
        className="hidden sm:block w-10 h-10 rounded-xl bg-surface-2 ring-1 ring-white/5"
      />

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatarUrl(player.username, 32)} alt="" className="sm:hidden w-7 h-7 rounded-lg" />
          <span className="font-medium text-text-primary truncate">{player.username}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: title.color }}>
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
            <path d="M12 2l2.6 6.6L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.4-.4z" />
          </svg>
          {title.label}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-1.5">
        {gamemodes.map((g) => {
          const t = tierByGamemode[g.id];
          return t ? (
            <TierBadge key={g.id} tier={t} size="sm" />
          ) : (
            <span key={g.id} className="w-8 h-5 rounded-full border border-dashed border-border-subtle" />
          );
        })}
      </div>

      <div className="text-right shrink-0">
        <div className="font-display font-bold text-text-primary">{points}</div>
        <div className="text-[11px] text-text-muted uppercase tracking-wide">pts</div>
      </div>
    </Link>
  );
}
