export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border-subtle rounded-3xl bg-surface/60 px-5 py-6 text-center">
      <div className="font-display text-3xl sm:text-4xl font-bold text-text-primary">{value}</div>
      <div className="mt-1.5 text-xs uppercase tracking-wider text-text-muted">{label}</div>
    </div>
  );
}
