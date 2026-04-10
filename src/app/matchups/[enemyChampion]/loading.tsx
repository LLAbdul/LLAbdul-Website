import { Skeleton } from "@/components/ui/skeleton";

export default function MatchupDetailLoading() {
  return (
    <div className="max-w-4xl space-y-6 py-6">
      {/* Back link */}
      <Skeleton className="bg-white/5 animate-pulse rounded-xl h-4 w-24" />

      {/* Header */}
      <div className="flex items-start gap-4">
        <Skeleton className="bg-white/5 animate-pulse rounded-xl w-16 h-16 shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="bg-white/5 animate-pulse rounded-xl h-3 w-28" />
          <Skeleton className="bg-white/5 animate-pulse rounded-xl h-6 w-64" />
          <Skeleton className="bg-white/5 animate-pulse rounded-xl h-4 w-40" />
        </div>
      </div>

      {/* Two column */}
      <div className="grid lg:grid-cols-[1fr_260px] gap-4">
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-64" />
        <div className="space-y-4">
          <Skeleton className="bg-white/5 animate-pulse rounded-xl h-24" />
          <Skeleton className="bg-white/5 animate-pulse rounded-xl h-36" />
        </div>
      </div>

      {/* Strategy */}
      <div className="space-y-2">
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-3 w-20" />
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-28" />
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-28" />
      </div>
    </div>
  );
}
