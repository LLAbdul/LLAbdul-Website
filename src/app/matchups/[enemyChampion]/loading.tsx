import { Skeleton } from "@/components/ui/skeleton";

export default function MatchupDetailLoading() {
  return (
    <div className="max-w-3xl space-y-6 py-6">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
    </div>
  );
}
