export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="h-8 w-48 bg-[var(--card)] rounded-lg" />
      <div className="h-4 w-72 bg-[var(--card)] rounded" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]"
          >
            <div className="w-16 h-16 bg-[var(--border)] rounded-lg" />
            <div className="h-4 w-16 bg-[var(--border)] rounded" />
            <div className="h-5 w-12 bg-[var(--border)] rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
