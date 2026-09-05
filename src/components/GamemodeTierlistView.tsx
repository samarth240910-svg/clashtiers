"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GamemodeId } from "@/data/gamemodes";
import { players, avatarUrl, Region } from "@/data/players";
import { tierOrder, TierId } from "@/data/tiers";
import TierBadge from "./TierBadge";
import RegionBadge from "./RegionBadge";
import TierlistFilters from "./TierlistFilters";

export default function GamemodeTierlistView({ gamemode }: { gamemode: GamemodeId }) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<Region | "ALL">("ALL");

  const grouped = useMemo(() => {
    const map = new Map<TierId, { username: string; region: Region }[]>();
    tierOrder.forEach((t) => map.set(t, []));

    players.forEach((p) => {
      const entry = p.tierList.find((t) => t.gamemode === gamemode);
      if (!entry) return;
      if (region !== "ALL" && p.region !== region) return;
      if (search.trim() && !p.username.toLowerCase().includes(search.toLowerCase())) return;
      map.get(entry.tier)?.push({ username: p.username, region: p.region });
    });

    return map;
  }, [gamemode, search, region]);

  const totalCount = [...grouped.values()].reduce((s, arr) => s + arr.length, 0);

  return (
    <div>
      <TierlistFilters
        search={search}
        onSearch={setSearch}
        region={region}
        onRegion={setRegion}
        resultCount={totalCount}
      />

      <div className="mt-6 space-y-5">
        {tierOrder.map((tier) => {
          const list = grouped.get(tier) ?? [];
          if (list.length === 0) return null;
          return (
            <div key={tier}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <TierBadge tier={tier} size="lg" />
                <div className="h-px flex-1 bg-border-subtle" />
                <span className="text-xs text-text-muted">{list.length} player{list.length === 1 ? "" : "s"}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {list.map((p) => (
                  <Link
                    key={p.username}
                    href={`/profile/${p.username}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border border-border-subtle bg-surface/50 hover:bg-surface hover:border-border-strong transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatarUrl(p.username, 32)} alt="" className="w-8 h-8 rounded-lg shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{p.username}</div>
                    </div>
                    <RegionBadge region={p.region} />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {totalCount === 0 && (
          <div className="py-16 text-center text-sm text-text-muted">No players match your filters.</div>
        )}
      </div>
    </div>
  );
}
