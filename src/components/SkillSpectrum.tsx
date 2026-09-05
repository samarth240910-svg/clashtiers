"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { Player } from "@/data/players";
import { gamemodes } from "@/data/gamemodes";
import { tierRank, tierOrder } from "@/data/tiers";

export default function SkillSpectrum({ player }: { player: Player }) {
  const maxRank = tierOrder.length; // 10 tiers, HT1 = best

  const data = gamemodes.map((g) => {
    const entry = player.tierList.find((t) => t.gamemode === g.id);
    // Invert so HT1 (rank 0) scores highest, untested scores 0.
    const score = entry ? maxRank - tierRank(entry.tier) : 0;
    return {
      gamemode: g.shortLabel,
      score,
      fullMark: maxRank,
    };
  });

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="#2a2830" />
          <PolarAngleAxis
            dataKey="gamemode"
            tick={{ fill: "#726f7d", fontSize: 11 }}
          />
          <Radar
            dataKey="score"
            stroke="#ffb648"
            fill="#ffb648"
            fillOpacity={0.28}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
