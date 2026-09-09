import type { Metadata } from "next";
import { rankedTesters } from "@/data/testers";
import { avatarUrl } from "@/data/players";
import { getGamemode } from "@/data/gamemodes";
import RegionBadge from "@/components/RegionBadge";
import GamemodeIcon from "@/components/GamemodeIcon";

export const metadata: Metadata = {
  title: "Testers — Clash Tier",
  description: "Meet the Clash Tier testers — rankings by tests completed, region, and activity.",
};

const statusColor: Record<string, string> = {
  active: "#5bd99a",
  idle: "#ffb648",
  inactive: "#726f7d",
};

const podiumStyle: Record<number, string> = {
  0: "sm:order-2 border-amber/50 shadow-[0_0_40px_rgba(255,182,72,0.22)] sm:scale-105 shimmer-wrap",
  1: "sm:order-1 border-white/20 shadow-[0_0_24px_rgba(199,204,214,0.15)] shimmer-wrap",
  2: "sm:order-3 border-[#d38a4f]/30 shadow-[0_0_24px_rgba(211,138,79,0.15)] shimmer-wrap",
};

export default function TestersPage() {
  const [first, second, third, ...rest] = rankedTesters;
  const podium = [first, second, third].filter(Boolean);
  const totalThisWeek = rankedTesters.reduce((s, t) => s + t.testsThisWeek, 0);
  const activeCount = rankedTesters.filter((t) => t.status === "active").length;
  const topLeadCount = first?.testsCompleted ?? 1;

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 overflow-hidden">
      <div className="glow-blob w-[420px] h-[280px] -left-32 top-0 bg-amber/10" />

      <div className="relative mb-8">
        <span className="text-xs font-semibold tracking-[0.2em] text-amber uppercase">Testing Vanguard</span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mt-2">
          The testers behind <span className="text-gradient-brand">every placement</span>
        </h1>
        <p className="text-sm text-text-secondary mt-2 max-w-xl">
          Ranked by total tests completed across every gamemode.
        </p>
      </div>

      <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        <div className="border border-border-subtle rounded-3xl bg-surface/60 px-4 py-4 text-center">
          <div className="font-display text-2xl font-bold">{totalThisWeek}</div>
          <div className="text-[11px] uppercase tracking-wider text-text-muted mt-1">Tests this week</div>
        </div>
        <div className="border border-border-subtle rounded-3xl bg-surface/60 px-4 py-4 text-center">
          <div className="font-display text-2xl font-bold">{rankedTesters.length}</div>
          <div className="text-[11px] uppercase tracking-wider text-text-muted mt-1">Testers on roster</div>
        </div>
        <div className="border border-border-subtle rounded-3xl bg-surface/60 px-4 py-4 text-center">
          <div className="font-display text-2xl font-bold text-[#5bd99a]">{activeCount}</div>
          <div className="text-[11px] uppercase tracking-wider text-text-muted mt-1">Active now</div>
        </div>
        <div className="border border-amber/30 rounded-3xl bg-surface/60 px-4 py-4 text-center">
          <div className="font-display text-lg font-bold text-amber truncate">{first?.username}</div>
          <div className="text-[11px] uppercase tracking-wider text-text-muted mt-1">Top contributor</div>
        </div>
      </div>

      {/* Podium */}
      <div className="relative grid sm:grid-cols-3 gap-4 mb-10">
        {podium.map((t, i) => (
          <div
            key={t.username}
            className={`relative border rounded-3xl bg-surface/60 p-6 flex flex-col items-center text-center overflow-hidden ${podiumStyle[i]}`}
          >
            {i === 0 && (
              <span className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-semibold text-amber bg-amber/10 border border-amber/30 rounded-full px-2.5 py-1">
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                  <path d="M2 6l4 3 6-6 6 6 4-3-2 13H4L2 6z" />
                </svg>
                Top Tester
              </span>
            )}
            <span className="absolute top-4 left-4 text-[11px] font-semibold text-text-muted">Rank {i + 1}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl(t.username, 96)}
              alt=""
              className={`rounded-2xl mt-4 ${i === 0 ? "w-20 h-20" : "w-16 h-16"} ring-1 ring-white/10`}
            />
            <div className="font-display font-bold text-lg mt-3">{t.username}</div>
            <div className="text-xs text-text-muted mt-0.5">{t.rank} · {t.region}</div>
            <div className="font-display font-bold text-3xl text-amber mt-3">{t.testsCompleted}</div>
            <div className="text-[11px] uppercase tracking-wider text-text-muted">Tests</div>
            <div className="w-full h-1.5 rounded-full bg-surface-2 mt-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red to-amber"
                style={{ width: `${Math.round((t.testsCompleted / topLeadCount) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Ranked list */}
      <div className="relative border border-border-subtle rounded-3xl bg-surface/40 overflow-hidden">
        <div className="hidden sm:grid grid-cols-[auto_auto_1fr_auto_auto_auto] gap-4 px-5 py-3 text-[11px] uppercase tracking-wider text-text-muted border-b border-border-subtle">
          <span className="w-6">#</span>
          <span className="w-10" />
          <span>Tester</span>
          <span>Gamemodes</span>
          <span>Tests</span>
          <span>Status</span>
        </div>
        <div className="p-1.5 space-y-0.5">
          {rest.map((t, i) => (
            <div
              key={t.username}
              className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_auto_1fr_auto_auto_auto] items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3.5 rounded-2xl hover:bg-surface/70 transition-colors"
            >
              <span className="w-6 text-sm font-display font-semibold text-text-muted">{i + 4}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarUrl(t.username, 64)} alt="" className="hidden sm:block w-10 h-10 rounded-xl bg-surface-2" />

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatarUrl(t.username, 32)} alt="" className="sm:hidden w-7 h-7 rounded-lg" />
                  <span className="font-medium truncate">{t.username}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <RegionBadge region={t.region} />
                  <span className="text-xs text-text-muted">{t.rank}</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5">
                {t.gamemodes.map((gid) => {
                  const gm = getGamemode(gid)!;
                  return (
                    <div
                      key={gid}
                      title={gm.label}
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${gm.color}22`, color: gm.color }}
                    >
                      <GamemodeIcon icon={gm.icon} className="w-3.5 h-3.5" />
                    </div>
                  );
                })}
              </div>

              <div className="text-right sm:text-left shrink-0">
                <div className="font-display font-bold">{t.testsCompleted}</div>
                <div className="text-[11px] text-text-muted">{t.testsThisWeek} this week</div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 shrink-0 justify-self-end">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor[t.status] }} />
                <span className="text-xs capitalize" style={{ color: statusColor[t.status] }}>
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
