import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-3 w-24" />
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-7 w-52" />
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-4 w-80" />
      </div>
      <Skeleton className="bg-white/5 animate-pulse rounded-xl h-20 max-w-2xl" />
      <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-16" />
        <Skeleton className="bg-white/5 animate-pulse rounded-xl h-16" />
      </div>
    </div>
  );
}
