import { TierId } from "@/data/tiers";

const divisionColors: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: "#3d1420", text: "#ff8a94", border: "#7a1c2b" },
  2: { bg: "#3d2a14", text: "#ffc172", border: "#7a4e1c" },
  3: { bg: "#2c2040", text: "#d3a8ff", border: "#5a3d8a" },
  4: { bg: "#122c40", text: "#8ecbff", border: "#1e4e78" },
  5: { bg: "#1f1e26", text: "#a7a4b3", border: "#38353f" },
};

export default function TierBadge({
  tier,
  size = "md",
}: {
  tier: TierId;
  size?: "sm" | "md" | "lg";
}) {
  const division = Number(tier[2]);
  const colors = divisionColors[division] ?? divisionColors[5];
  const sizes = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3.5 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-display font-bold tracking-wide rounded-full border ${sizes[size]}`}
      style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
    >
      {tier}
    </span>
  );
}
