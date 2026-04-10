import { Skeleton } from "@/components/ui/skeleton";

export default function MatchupsLoading() {
  return (
    <div className="space-y-5 py-6 bg-[#030509]">
      {/* Header section skeleton */}
      <div>
        <Skeleton className="bg-white/5 animate-pulse border border-white/10 h-3 w-28 mb-1" />
        <div className="relative inline-block mt-1">
          {/* Subtle #C9082A glow behind the title skeleton */}
          <div className="absolute inset-0 bg-[#C9082A]/20 blur-xl rounded-full" />
          <Skeleton className="bg-white/5 animate-pulse border border-white/10 h-8 w-48 relative" />
        </div>
        <Skeleton className="bg-white/5 animate-pulse border border-white/10 h-4 w-72 mt-2" />
      </div>

      <div className="space-y-4 pt-2">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <Skeleton className="bg-white/5 animate-pulse border border-white/10 h-10 w-full max-w-xs" />
          
          <div className="flex gap-1.5">
            {/* 3 buttons: A-Z, Guides First, Difficulty */}
            {/* The first one has a subtle red tint to show it's "active" */}
            <Skeleton className="bg-[#C9082A]/20 animate-pulse border border-[#C9082A]/30 shadow-[0_0_10px_rgba(201,8,42,0.1)] h-8 w-14" />
            <Skeleton className="bg-white/5 animate-pulse border border-white/10 h-8 w-24" />
            <Skeleton className="bg-white/5 animate-pulse border border-white/10 h-8 w-20" />
          </div>
        </div>

        {/* Count */}
        <Skeleton className="bg-white/5 animate-pulse border border-white/10 h-[14px] w-40" />

        {/* Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="relative group">
              {/* Subtle red hover-like glow on a few random cards */}
              {i < 4 && (
                <div className="absolute inset-0 bg-[#C9082A]/10 blur-lg rounded-xl" />
              )}
              <Skeleton className="bg-white/5 animate-pulse border border-white/10 h-[104px] rounded-xl relative" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
