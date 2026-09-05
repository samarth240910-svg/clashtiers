export default function RankPosition({ rank }: { rank: number }) {
  const styles: Record<number, string> = {
    1: "bg-gradient-to-b from-[#ffd873] to-[#e0a629] text-[#2a1c00] border-[#ffd873]/50 shadow-[0_0_16px_rgba(242,193,78,0.35)]",
    2: "bg-gradient-to-b from-[#e6e9ef] to-[#aeb4c0] text-[#1a1c1f] border-white/40",
    3: "bg-gradient-to-b from-[#e3a066] to-[#b6733c] text-[#2a1600] border-[#e3a066]/40",
  };

  if (rank <= 3) {
    return (
      <div
        className={`w-9 h-9 rounded-2xl flex items-center justify-center font-display font-bold text-sm border ${styles[rank]}`}
      >
        {rank}
      </div>
    );
  }

  return (
    <div className="w-9 h-9 rounded-2xl flex items-center justify-center font-display font-semibold text-sm text-text-secondary bg-surface-2 border border-border-subtle">
      {rank}
    </div>
  );
}
