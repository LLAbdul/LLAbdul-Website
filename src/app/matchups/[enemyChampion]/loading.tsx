import { Skeleton } from "@/components/ui/skeleton";

export default function MatchupDetailLoading() {
  return (
    <div className="relative min-h-screen bg-[#030509]">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10 text-[#E8E8ED]">
        
        {/* Navigation & Header Section */}
        <div className="space-y-6">
          <Skeleton className="bg-white/10 h-4 w-32" />

          {/* Header Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 bg-white/5 backdrop-blur-xl p-6 sm:p-10 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden animate-pulse">
            <Skeleton className="bg-white/10 rounded-3xl w-32 h-32 shrink-0" />
            <div className="flex-1 min-w-0 flex flex-col justify-center space-y-4">
              <Skeleton className="bg-white/10 h-3 w-40" />
              <div className="flex items-center gap-4 flex-wrap">
                <Skeleton className="bg-white/10 h-14 w-80" />
                <Skeleton className="bg-white/10 h-8 w-16" />
              </div>
              <Skeleton className="bg-white/10 h-5 w-48" />
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid xl:grid-cols-[440px_1fr] gap-10 xl:gap-16 items-start pb-24">
          
          {/* Left Column: Optimal Setup (Runes, Spells, Build) */}
          <div className="space-y-8">
            {/* Runes */}
            <section className="space-y-5">
              <div className="flex items-center gap-3 px-1">
                <div className="w-1.5 h-6 bg-white/10 rounded-full animate-pulse" />
                <Skeleton className="bg-white/10 h-8 w-48" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-64 animate-pulse" />
            </section>

            {/* Summoner Spells */}
            <section className="space-y-5">
              <div className="flex items-center gap-3 px-1">
                <div className="w-1.5 h-6 bg-white/10 rounded-full animate-pulse" />
                <Skeleton className="bg-white/10 h-8 w-56" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex gap-4 animate-pulse">
                <Skeleton className="bg-white/10 rounded-2xl w-16 h-16" />
                <Skeleton className="bg-white/10 rounded-2xl w-16 h-16" />
              </div>
            </section>

            {/* Build Path */}
            <section className="space-y-5">
              <div className="flex items-center gap-3 px-1">
                <div className="w-1.5 h-6 bg-white/10 rounded-full animate-pulse" />
                <Skeleton className="bg-white/10 h-8 w-36" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8 animate-pulse">
                <div className="space-y-4">
                  <Skeleton className="bg-white/10 h-6 w-32" />
                  <div className="flex gap-4">
                    <Skeleton className="bg-white/10 rounded-2xl w-12 h-12" />
                    <Skeleton className="bg-white/10 rounded-2xl w-12 h-12" />
                  </div>
                </div>
                <div className="h-px w-full bg-white/10" />
                <div className="space-y-4">
                  <Skeleton className="bg-white/10 h-6 w-32" />
                  <div className="flex gap-4">
                    <Skeleton className="bg-white/10 rounded-2xl w-12 h-12" />
                    <Skeleton className="bg-white/10 rounded-2xl w-12 h-12" />
                    <Skeleton className="bg-white/10 rounded-2xl w-12 h-12" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Game Plan Strategy & Videos */}
          <div className="space-y-8">
            {/* Strategy */}
            <section className="space-y-5">
              <div className="flex items-center gap-3 px-1">
                <div className="w-1.5 h-6 bg-white/10 rounded-full animate-pulse" />
                <Skeleton className="bg-white/10 h-8 w-64" />
              </div>
              <div className="flex flex-col gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4 animate-pulse">
                    <Skeleton className="bg-white/10 h-6 w-32" />
                    <div className="space-y-2">
                      <Skeleton className="bg-white/10 h-4 w-full" />
                      <Skeleton className="bg-white/10 h-4 w-[90%]" />
                      <Skeleton className="bg-white/10 h-4 w-[95%]" />
                      <Skeleton className="bg-white/10 h-4 w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Videos */}
            <section className="space-y-5 pt-4">
              <div className="flex items-center gap-3 px-1">
                <div className="w-1.5 h-6 bg-white/10 rounded-full animate-pulse" />
                <Skeleton className="bg-white/10 h-8 w-64" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl h-64 animate-pulse" />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
