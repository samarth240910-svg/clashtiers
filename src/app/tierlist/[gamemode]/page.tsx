import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gamemodes, getGamemode } from "@/data/gamemodes";
import GamemodeTabs from "@/components/GamemodeTabs";
import GamemodeTierlistView from "@/components/GamemodeTierlistView";
import GamemodeIcon from "@/components/GamemodeIcon";

export function generateStaticParams() {
  return gamemodes.map((g) => ({ gamemode: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gamemode: string }>;
}): Promise<Metadata> {
  const { gamemode: gamemodeId } = await params;
  const gm = getGamemode(gamemodeId);
  if (!gm) return {};
  return {
    title: `${gm.label} Tierlist — Clash Tier`,
    description: gm.description,
  };
}

export default async function GamemodeTierlistPage({
  params,
}: {
  params: Promise<{ gamemode: string }>;
}) {
  const { gamemode: gamemodeId } = await params;
  const gm = getGamemode(gamemodeId);
  if (!gm) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6 flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${gm.color}22`, color: gm.color }}
        >
          <GamemodeIcon icon={gm.icon} className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl">{gm.label}</h1>
          <p className="text-sm text-text-secondary">{gm.description}</p>
        </div>
      </div>
      <GamemodeTabs active={gm.id} />
      <div className="mt-6">
        <GamemodeTierlistView gamemode={gm.id} />
      </div>
    </div>
  );
}
