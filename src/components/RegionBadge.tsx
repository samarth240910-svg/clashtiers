const regionColors: Record<string, string> = {
  NA: "#5b9bff",
  EU: "#5bd99a",
  AS: "#ffb648",
  AU: "#d38aff",
};

export default function RegionBadge({ region }: { region: string }) {
  const color = regionColors[region] ?? "#aeacb8";
  return (
    <span
      className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full"
      style={{ color, backgroundColor: `${color}1f`, border: `1px solid ${color}33` }}
    >
      {region}
    </span>
  );
}
