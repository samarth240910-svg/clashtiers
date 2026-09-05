"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { players, playerPoints, avatarUrl } from "@/data/players";
import TierBadge from "./TierBadge";

export default function GlobalSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return players
      .filter((p) => p.username.toLowerCase().includes(q))
      .sort((a, b) => playerPoints(b) - playerPoints(a))
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function go(username: string) {
    setOpen(false);
    setQuery("");
    router.push(`/profile/${username}`);
  }

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) go(results[0].username);
          }}
          placeholder="Search players..."
          className={`w-full bg-surface border border-border-subtle rounded-full pl-9 pr-3 ${
            compact ? "py-1.5 text-sm" : "py-2.5 text-sm"
          } text-text-primary placeholder:text-text-muted focus:outline-none focus:border-red/60 transition-colors`}
        />
      </div>

      {open && query.trim() && (
        <div className="absolute z-50 mt-2 w-full min-w-[280px] bg-surface-2 border border-border-subtle rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-text-muted">No players found.</div>
          ) : (
            results.map((p) => {
              const topTiers = [...p.tierList].sort((a, b) => a.tier.localeCompare(b.tier)).slice(0, 2);
              return (
                <button
                  key={p.username}
                  onClick={() => go(p.username)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface-hover transition-colors text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatarUrl(p.username, 32)} alt="" className="w-7 h-7 rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">{p.username}</div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {topTiers.map((t) => (
                      <div key={t.gamemode} className="flex items-center gap-1">
                        <TierBadge tier={t.tier} size="sm" />
                      </div>
                    ))}
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
