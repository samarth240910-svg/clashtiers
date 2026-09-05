"use client";

import { Region } from "@/data/players";

const regions: (Region | "ALL")[] = ["ALL", "NA", "EU", "AS", "AU"];

export default function TierlistFilters({
  search,
  onSearch,
  region,
  onRegion,
  resultCount,
}: {
  search: string;
  onSearch: (v: string) => void;
  region: Region | "ALL";
  onRegion: (v: Region | "ALL") => void;
  resultCount: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <div className="relative flex-1 sm:max-w-xs">
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
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search players..."
          className="w-full bg-surface border border-border-subtle rounded-full pl-9 pr-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:border-red/60 transition-colors"
        />
      </div>

      <div className="flex items-center gap-1.5">
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => onRegion(r)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
              region === r
                ? "bg-gradient-to-r from-red/20 to-amber/20 border-amber/40 text-amber"
                : "bg-surface border-border-subtle text-text-secondary hover:text-text-primary"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="sm:ml-auto text-xs text-text-muted whitespace-nowrap">
        {resultCount} player{resultCount === 1 ? "" : "s"}
      </div>
    </div>
  );
}
