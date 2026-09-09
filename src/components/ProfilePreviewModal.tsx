"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getPlayer, avatarUrl, playerPoints, overallRank } from "@/data/players";
import { getRankTitle, tierRank } from "@/data/tiers";
import { gamemodes, getGamemode } from "@/data/gamemodes";
import TierBadge from "./TierBadge";
import RegionBadge from "./RegionBadge";
import GamemodeIcon from "./GamemodeIcon";
import SkillSpectrum from "./SkillSpectrum";

export default function ProfilePreviewModal({
  username,
  onClose,
}: {
  username: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!username) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [username, onClose]);

  if (!username) return null;
  const player = getPlayer(username);
  if (!player) return null;

  const points = playerPoints(player);
  const rank = overallRank(player.username);
  const title = getRankTitle(points);
  const strongest = [...player.tierList].sort((a, b) => tierRank(a.tier) - tierRank(b.tier))[0];
  const strongestGm = strongest ? getGamemode(strongest.gamemode) : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl border border-border-subtle rounded-3xl bg-surface overflow-hidden shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-hover border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-5 sm:p-6">
          <div className="grid sm:grid-cols-[1fr_auto] gap-5">
            {/* Left: identity + stats */}
            <div className="min-w-0">
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl(player.username, 96)}
                  alt=""
                  className="w-16 h-16 rounded-xl bg-surface-2 ring-1 ring-white/5 shrink-0"
                />
                <div className="min-w-0 pt-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: title.color }}>
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                      <path d="M12 2l2.6 6.6L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.4-.4z" />
                    </svg>
                    {title.label}
                  </div>
                  <h2 className="font-display font-bold text-2xl truncate mt-0.5">{player.username}</h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <RegionBadge region={player.region} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="border border-border-subtle rounded-xl px-2 py-2.5 text-center">
                  <div className="font-display font-bold text-lg">#{rank}</div>
                  <div className="text-[9px] uppercase tracking-wider text-text-muted">Global</div>
                </div>
                <div className="border border-border-subtle rounded-xl px-2 py-2.5 text-center">
                  <div className="font-display font-bold text-lg text-amber">{points}</div>
                  <div className="text-[9px] uppercase tracking-wider text-text-muted">Points</div>
                </div>
                <div className="border border-border-subtle rounded-xl px-2 py-2.5 text-center">
                  <div className="font-display font-bold text-lg">{player.tierList.length}</div>
                  <div className="text-[9px] uppercase tracking-wider text-text-muted">Modes</div>
                </div>
              </div>

              {strongestGm && (
                <p className="text-xs text-text-muted mt-3 leading-relaxed">
                  Ranked across {player.tierList.length} of {gamemodes.length} disciplines. Strongest in{" "}
                  <span className="font-medium" style={{ color: strongestGm.color }}>{strongestGm.label}</span> at{" "}
                  <span className="text-text-secondary">{strongest!.tier}</span>.
                </p>
              )}
            </div>

            {/* Right: skill spectrum */}
            <div className="w-full sm:w-52">
              <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1 text-center sm:text-left">
                Skill Spectrum
              </div>
              <div className="h-40 sm:h-44">
                <SkillSpectrum player={player} />
              </div>
            </div>
          </div>

          {/* Disciplines */}
          <div className="mt-4 pt-4 border-t border-border-subtle">
            <div className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Disciplines</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {gamemodes.map((g) => {
                const entry = player.tierList.find((t) => t.gamemode === g.id);
                const isStrongest = strongest && g.id === strongest.gamemode;
                return (
                  <div
                    key={g.id}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border ${
                      entry ? "border-border-subtle bg-surface-2/60" : "border-dashed border-border-subtle opacity-40"
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${g.color}22`, color: g.color }}
                    >
                      <GamemodeIcon icon={g.icon} className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-medium truncate flex-1">{g.label}</span>
                    {entry ? (
                      <span className="flex items-center gap-1 shrink-0">
                        <TierBadge tier={entry.tier} size="sm" />
                        {isStrongest && (
                          <svg viewBox="0 0 24 24" className="w-3 h-3 text-amber" fill="currentColor">
                            <path d="M12 2l2.6 6.6L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.4-.4z" />
                          </svg>
                        )}
                      </span>
                    ) : (
                      <span className="text-[10px] text-text-muted shrink-0">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center gap-2">
            <Link
              href={`/profile/${player.username}`}
              className="flex-1 text-center bg-surface-2 hover:bg-surface-hover border border-border-subtle text-text-primary text-xs font-semibold px-4 py-2.5 rounded-full transition-colors"
            >
              Full profile
            </Link>
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-red to-amber hover:brightness-110 hover:shadow-[0_0_20px_rgba(242,193,78,0.45)] text-bg text-xs font-bold px-4 py-2.5 rounded-full transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
