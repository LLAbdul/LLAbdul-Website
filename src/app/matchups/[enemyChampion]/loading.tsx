import { Skeleton } from "@/components/ui/skeleton";

export default function MatchupDetailLoading() {
  return (
    <div className="max-w-4xl space-y-6 py-6 text-[#E8E8ED]">
      {/* Back link skeleton */}
      <Skeleton className="bg-white/10 h-4 w-24" />

      {/* Header skeleton */}
      <div className="flex items-start gap-4 bg-black/40 p-6 rounded-xl border border-white/10 animate-pulse relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <Skeleton className="bg-white/10 rounded-lg w-16 h-16 shrink-0 relative z-10" />
        <div className="flex-1 min-w-0 space-y-3 relative z-10">
          <Skeleton className="bg-white/10 h-3 w-28" />
          <Skeleton className="bg-white/10 h-8 w-64" />
          <Skeleton className="bg-white/10 h-4 w-40" />
        </div>
      </div>

      {/* Two column: Runes (left) + Spells/Build (right) */}
      <div className="grid lg:grid-cols-[1fr_260px] gap-4">
        {/* Left: Runes skeleton */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          <Skeleton className="bg-white/10 h-6 w-24 mb-6" />
          
          <div className="flex justify-center mb-6">
            <Skeleton className="bg-white/10 rounded-full h-16 w-16" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="bg-white/10 rounded-full h-10 w-full" />
            ))}
          </div>
        </div>

        {/* Right: Spells + Build stacked */}
        <div className="space-y-4">
          {/* Spells */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            <Skeleton className="bg-white/10 h-6 w-32 mb-4" />
            <div className="flex gap-2">
              <Skeleton className="bg-white/10 rounded-md h-10 w-10" />
              <Skeleton className="bg-white/10 rounded-md h-10 w-10" />
            </div>
          </div>
          
          {/* Builds */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            <Skeleton className="bg-white/10 h-6 w-28 mb-4" />
            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="bg-white/10 rounded-md h-10 w-10" />
                <Skeleton className="bg-white/10 rounded-md h-10 w-10" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="bg-white/10 rounded-md h-10 w-10" />
                <Skeleton className="bg-white/10 rounded-md h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy skeleton */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <Skeleton className="bg-white/10 h-6 w-32 mb-6" />
        <div className="space-y-3">
          <Skeleton className="bg-white/10 rounded-full h-4 w-full" />
          <Skeleton className="bg-white/10 rounded-full h-4 w-[90%]" />
          <Skeleton className="bg-white/10 rounded-full h-4 w-[95%]" />
          <Skeleton className="bg-white/10 rounded-full h-4 w-[85%]" />
        </div>
      </div>

      {/* Videos skeleton */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <Skeleton className="bg-white/10 h-6 w-32 mb-6" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="bg-white/10 rounded-xl h-48 w-full" />
          <Skeleton className="bg-white/10 rounded-xl h-48 w-full" />
        </div>
      </div>
    </div>
  );
}
