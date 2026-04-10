import { Skeleton } from "@/components/ui/skeleton";

export default function MatchupsLoading() {
  return (
    <div className="space-y-5 py-6">
      <div className="space-y-2">
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-3 w-28" />
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-7 w-48" />
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-4 w-72" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-9 w-56" />
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-9 w-20" />
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-9 w-28" />
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-9 w-24" />
      </div>
      <Skeleton className="bg-white/5 animate-pulse rounded-xl h-3 w-40" />
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {Array.from({ length: 32 }).map((_, i) => (
          <Skeleton key={i} className="bg-white/5 animate-pulse rounded-xl h-24" />
        ))}
      </div>
    </div>
  );
}
