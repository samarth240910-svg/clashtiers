export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border-subtle rounded-3xl bg-surface/60 px-5 py-6 text-center transition-all duration-300 hover:border-amber/25 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(242,193,78,0.12)]">
      <div className="font-display text-3xl sm:text-4xl font-bold text-text-primary">{value}</div>
      <div className="mt-1.5 text-xs uppercase tracking-wider text-text-muted">{label}</div>
    </div>
  );
}
