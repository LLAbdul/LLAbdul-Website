import { Skeleton } from "@/components/ui/skeleton";

export default function GuidesLoading() {
  return (
    <div className="space-y-8 py-10 max-w-4xl mx-auto">
      <div className="text-center md:text-left">
        <Skeleton className="h-4 w-40 bg-white/10 mb-3 mx-auto md:mx-0" />
        <Skeleton className="h-14 w-80 bg-white/10 mb-4 mx-auto md:mx-0" />
        <Skeleton className="h-5 w-full max-w-xl bg-white/10 mx-auto md:mx-0" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
          >
            <div className="flex items-center gap-6 p-6">
              <Skeleton className="w-20 h-20 rounded-xl shrink-0 bg-white/10" />
              <div className="flex-1 min-w-0 space-y-3">
                <Skeleton className="h-10 w-44 bg-white/10" />
                <Skeleton className="h-4 w-40 bg-white/10" />
                <Skeleton className="h-4 w-28 bg-white/10 mt-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
