export default function MatchupDetailLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
      <div className="h-4 w-32 bg-[var(--card)] rounded" />
      <div className="flex items-center gap-4 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <div className="w-[72px] h-[72px] bg-[var(--border)] rounded-lg" />
        <div className="flex-1 space-y-3">
          <div className="h-7 w-48 bg-[var(--border)] rounded" />
          <div className="h-4 w-32 bg-[var(--border)] rounded" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-6 w-24 bg-[var(--card)] rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] space-y-3">
            <div className="h-4 w-24 bg-[var(--border)] rounded" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-[var(--border)] rounded" />
              <div className="h-3 w-3/4 bg-[var(--border)] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
