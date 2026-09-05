import type { Metadata } from "next";
import GamemodeTabs from "@/components/GamemodeTabs";
import OverallTierlistView from "@/components/OverallTierlistView";

export const metadata: Metadata = {
  title: "Tierlist — Clash Tier",
  description: "The overall Clash Tier ranking across every gamemode.",
};

export default function TierlistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl sm:text-4xl">Tierlist</h1>
        <p className="text-sm text-text-secondary mt-1.5">
          Overall rankings combine points earned across every gamemode.
        </p>
      </div>
      <GamemodeTabs />
      <div className="mt-6">
        <OverallTierlistView />
      </div>
    </div>
  );
}
