"use client";

import { useMemo, useState } from "react";
import { rankedPlayers, Region } from "@/data/players";
import LeaderboardRow from "./LeaderboardRow";
import TierlistFilters from "./TierlistFilters";
import ProfilePreviewModal from "./ProfilePreviewModal";

export default function OverallTierlistView() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<Region | "ALL">("ALL");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return rankedPlayers.filter((p) => {
      if (region !== "ALL" && p.region !== region) return false;
      if (search.trim() && !p.username.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, region]);

  return (
    <div>
      <TierlistFilters
        search={search}
        onSearch={setSearch}
        region={region}
        onRegion={setRegion}
        resultCount={filtered.length}
      />

      <div className="mt-5 border border-border-subtle rounded-3xl bg-surface/40 overflow-hidden">
        <div className="hidden sm:grid grid-cols-[auto_auto_1fr_auto_auto] gap-4 px-4 py-2.5 text-[11px] uppercase tracking-wider text-text-muted border-b border-border-subtle">
          <span className="w-8">#</span>
          <span className="w-9" />
          <span>Player</span>
          <span>Tiers</span>
          <span className="text-right">Points</span>
        </div>
        <div className="p-1.5 space-y-0.5">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-text-muted">No players match your filters.</div>
          ) : (
            filtered.map((p) => {
              const rank = rankedPlayers.indexOf(p) + 1;
              return <LeaderboardRow key={p.username} player={p} rank={rank} onSelect={setSelected} />;
            })
          )}
        </div>
      </div>

      <ProfilePreviewModal username={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
