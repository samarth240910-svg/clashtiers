import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlayer, avatarUrl, playerPoints, overallRank, players } from "@/data/players";
import { getRankTitle, tierRank } from "@/data/tiers";
import { gamemodes, getGamemode } from "@/data/gamemodes";
import { formatDate } from "@/lib/format";
import TierBadge from "@/components/TierBadge";
import RegionBadge from "@/components/RegionBadge";
import GamemodeIcon from "@/components/GamemodeIcon";
import SkillSpectrum from "@/components/SkillSpectrum";

export function generateStaticParams() {
  return players.map((p) => ({ username: p.username }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const player = getPlayer(username);
  if (!player) return {};
  return {
    title: `${player.username} — Clash Tier`,
    description: `${player.username}'s Clash Tier profile. Rank #${overallRank(player.username)} with ${playerPoints(player)} points.`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const player = getPlayer(username);
  if (!player) notFound();

  const points = playerPoints(player);
  const rank = overallRank(player.username);
  const title = getRankTitle(points);

  const history = [...player.tierList].sort(
    (a, b) => new Date(b.lastTested).getTime() - new Date(a.lastTested).getTime()
  );
  const lastTested = history[0]?.lastTested;

  const strongest = [...player.tierList].sort((a, b) => tierRank(a.tier) - tierRank(b.tier))[0];
  const strongestGm = strongest ? getGamemode(strongest.gamemode) : undefined;

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 overflow-hidden">
      <div className="glow-blob w-[420px] h-[280px] -right-32 -top-20 bg-amber/10" />

      {/* Header */}
      <div className="relative border border-border-subtle rounded-3xl bg-surface/40 overflow-hidden">
        <div
          className="h-24 sm:h-28"
          style={{ background: `linear-gradient(135deg, ${title.color}26, transparent 70%)` }}
        />
        <div className="px-5 sm:px-8 pb-6 -mt-12">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 flex-1 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl(player.username, 128)}
                alt={player.username}
                className="w-24 h-24 rounded-2xl border-4 border-bg bg-surface-2 shrink-0 ring-1 ring-white/5"
              />
              <div className="flex-1 min-w-0 pb-1">
                <h1 className="font-display font-bold text-2xl sm:text-3xl truncate">{player.username}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: title.color }}>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                      <path d="M12 2l2.6 6.6L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.4-.4z" />
                    </svg>
                    {title.label}
                  </span>
                  <RegionBadge region={player.region} />
                  <span className="text-xs text-text-muted">Joined {formatDate(player.joined)}</span>
                </div>
                {strongestGm && (
                  <p className="text-xs text-text-muted mt-2">
                    Ranked across {player.tierList.length} of {gamemodes.length} disciplines. Strongest in{" "}
                    <span className="font-medium" style={{ color: strongestGm.color }}>{strongestGm.label}</span> at{" "}
                    <span className="text-text-secondary">{strongest!.tier}</span>.
                  </p>
                )}
              </div>
              <div className="flex gap-6 sm:gap-8 sm:pb-1 shrink-0">
                <div>
                  <div className="font-display font-bold text-2xl">#{rank}</div>
                  <div className="text-[11px] uppercase tracking-wider text-text-muted">Global</div>
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-amber">{points}</div>
                  <div className="text-[11px] uppercase tracking-wider text-text-muted">Points</div>
                </div>
                <div>
                  <div className="font-display font-bold text-2xl">{player.tierList.length}</div>
                  <div className="text-[11px] uppercase tracking-wider text-text-muted">Modes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Skill spectrum */}
          <div className="mt-6 pt-6 border-t border-border-subtle">
            <div className="text-[11px] uppercase tracking-wider text-text-muted mb-1">Skill Spectrum</div>
            <SkillSpectrum player={player} />
          </div>
        </div>
      </div>

      {/* Gamemode breakdown */}
      <div className="relative mt-8">
        <h2 className="font-display font-bold text-xl mb-3">Gamemode Breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {gamemodes.map((g) => {
            const entry = player.tierList.find((t) => t.gamemode === g.id);
            return (
              <Link
                key={g.id}
                href={`/tierlist/${g.id}`}
                className={`rounded-2xl border p-4 transition-colors ${
                  entry
                    ? "border-border-subtle bg-surface/50 hover:border-border-strong"
                    : "border-dashed border-border-subtle opacity-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${g.color}22`, color: g.color }}
                  >
                    <GamemodeIcon icon={g.icon} className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium">{g.label}</span>
                </div>
                <div className="mt-3">
                  {entry ? (
                    <TierBadge tier={entry.tier} />
                  ) : (
                    <span className="text-xs text-text-muted">Not tested</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Test history */}
      <div className="relative mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-xl">Test History</h2>
          {lastTested && (
            <span className="text-xs text-text-muted">Last tested {formatDate(lastTested)}</span>
          )}
        </div>
        <div className="border border-border-subtle rounded-3xl bg-surface/40 divide-y divide-border-subtle overflow-hidden">
          {history.length === 0 ? (
            <div className="py-10 text-center text-sm text-text-muted">No tests recorded yet.</div>
          ) : (
            history.map((h, idx) => {
              const gm = getGamemode(h.gamemode)!;
              return (
                <div key={idx} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${gm.color}22`, color: gm.color }}
                  >
                    <GamemodeIcon icon={gm.icon} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{gm.label}</div>
                    <div className="text-xs text-text-muted">
                      Tested by {h.tester} · {formatDate(h.lastTested)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {h.previousTier && (
                      <>
                        <TierBadge tier={h.previousTier} size="sm" />
                        <span className="text-text-muted text-xs">→</span>
                      </>
                    )}
                    <TierBadge tier={h.tier} size="sm" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
