import Link from "next/link";
import Image from "next/image";
import { gamemodes } from "@/data/gamemodes";
import { rankedPlayers, avatarUrl } from "@/data/players";
import { rankedTesters } from "@/data/testers";
import { recentResults, timeAgoLabel } from "@/data/results";
import LeaderboardRow from "@/components/LeaderboardRow";
import StatCard from "@/components/StatCard";
import TierBadge from "@/components/TierBadge";
import GamemodeIcon from "@/components/GamemodeIcon";
import RegionBadge from "@/components/RegionBadge";

export default function Home() {
  const topPlayers = rankedPlayers.slice(0, 5);
  const featuredTesters = rankedTesters.slice(0, 4);
  const totalTests = rankedTesters.reduce((s, t) => s + t.testsCompleted, 0);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 bg-grid" />
        <div className="glow-blob w-[520px] h-[320px] -left-40 -top-20 bg-red/20" />
        <div className="glow-blob w-[420px] h-[300px] -right-24 top-10 bg-amber/15" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <div className="flex flex-col items-center text-center animate-fade-in-up">
            <div className="rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_40px_rgba(239,59,77,0.25)] mb-6">
              <Image src="/logo.png" alt="Clash Tier" width={84} height={84} />
            </div>
            <span className="text-xs font-semibold tracking-[0.2em] text-amber uppercase">Minecraft PvP Rankings</span>
            <h1 className="font-display font-bold text-5xl sm:text-7xl tracking-tight leading-none mt-3">
              <span className="text-text-primary">CLASH</span>
              <span className="text-gradient-brand">TIER</span>
            </h1>
            <p className="mt-5 max-w-xl text-text-secondary text-base sm:text-lg">
              The competitive ranking platform for Minecraft PvP. Get tested across{" "}
              <span className="text-text-primary font-medium">{gamemodes.length} gamemodes</span>, earn your
              place, and <span className="text-text-primary font-medium">claim your tier</span>.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/tierlist"
                className="w-full sm:w-auto text-center bg-gradient-to-r from-red to-amber hover:brightness-110 hover:shadow-[0_0_28px_rgba(242,193,78,0.45)] text-bg font-bold px-6 py-3 rounded-full transition-all shadow-lg shadow-red-glow/25"
              >
                View Tierlist
              </Link>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-surface hover:bg-surface-hover border border-border-subtle text-text-primary font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Join Discord
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <StatCard label="Players Tested" value={`${rankedPlayers.length}`} />
            <StatCard label="Tests Completed" value={`${totalTests.toLocaleString()}`} />
            <StatCard label="Active Testers" value={`${rankedTesters.filter((t) => t.status === "active").length}`} />
            <StatCard label="Gamemodes" value={`${gamemodes.length}`} />
          </div>
        </div>
      </section>

      {/* Gamemodes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl">Gamemodes</h2>
          <Link href="/tierlist" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {gamemodes.map((g) => (
            <Link
              key={g.id}
              href={`/tierlist/${g.id}`}
              className="group relative border border-border-subtle rounded-3xl bg-surface/60 hover:bg-surface hover:border-amber/25 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(242,193,78,0.12)] p-5 transition-all duration-300 overflow-hidden"
            >
              <div
                className="absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-35 transition-opacity"
                style={{ backgroundColor: g.color }}
              />
              <div
                className="relative w-11 h-11 rounded-2xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${g.color}22`, color: g.color }}
              >
                <GamemodeIcon icon={g.icon} className="w-5 h-5" />
              </div>
              <div className="relative font-display font-semibold text-lg">{g.label}</div>
              <p className="relative text-xs text-text-muted mt-1 line-clamp-2">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured rankings + Recent results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 border border-border-subtle rounded-3xl bg-surface/40 p-4 sm:p-5">
          <div className="flex items-end justify-between mb-3 px-1">
            <h2 className="font-display font-bold text-xl">Featured Rankings</h2>
            <Link href="/tierlist" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Full tierlist →
            </Link>
          </div>
          <div className="space-y-0.5">
            {topPlayers.map((p, i) => (
              <LeaderboardRow key={p.username} player={p} rank={i + 1} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 border border-border-subtle rounded-3xl bg-surface/40 p-4 sm:p-5">
          <div className="flex items-end justify-between mb-3 px-1">
            <h2 className="font-display font-bold text-xl">Recent Results</h2>
          </div>
          <div className="space-y-1">
            {recentResults.slice(0, 6).map((r) => {
              const gm = gamemodes.find((g) => g.id === r.gamemode)!;
              return (
                <Link
                  key={r.id}
                  href={`/profile/${r.player}`}
                  className="flex items-center gap-3 px-2 py-2.5 rounded-2xl hover:bg-surface/60 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatarUrl(r.player, 32)} alt="" className="w-8 h-8 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{r.player}</div>
                    <div className="text-xs text-text-muted truncate">
                      {gm.label} · Tested by {r.tester}
                    </div>
                  </div>
                  <TierBadge tier={r.tier} size="sm" />
                  <span className="text-[11px] text-text-muted w-14 text-right shrink-0">
                    {timeAgoLabel(r.minutesAgo)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured testers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl">Featured Testers</h2>
          <Link href="/testers" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            All testers →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {featuredTesters.map((t) => (
            <div key={t.username} className="border border-border-subtle rounded-3xl bg-surface/60 p-4">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatarUrl(t.username, 64)} alt="" className="w-11 h-11 rounded-2xl" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{t.username}</div>
                  <div className="text-xs text-text-muted">{t.rank}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <RegionBadge region={t.region} />
                <span
                  className={`text-[11px] font-medium flex items-center gap-1 ${
                    t.status === "active" ? "text-[#4CC98A]" : t.status === "idle" ? "text-[#F2B34C]" : "text-text-muted"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: t.status === "active" ? "#4CC98A" : t.status === "idle" ? "#F2B34C" : "#6b6b76" }}
                  />
                  {t.status}
                </span>
              </div>
              <div className="mt-2 text-xs text-text-muted">{t.testsCompleted} tests completed</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
