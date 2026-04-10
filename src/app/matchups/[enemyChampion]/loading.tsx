import { Skeleton } from "@/components/ui/skeleton";

export default function MatchupDetailLoading() {
  return (
    <div className="relative min-h-screen bg-[#030509]">
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 space-y-8 text-[#E8E8ED]">
        
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
        <div className="grid lg:grid-cols-[1.1fr_1fr] xl:grid-cols-[1.3fr_1fr] gap-8 xl:gap-12 items-start pb-16">
          
          {/* Left Column: Details & Strategy */}
          <div className="space-y-8">
            
            <div className="flex flex-col xl:flex-row gap-8 items-stretch">
              {/* Runes */}
              <section className="space-y-3 w-fit shrink-0 flex flex-col">
                <div className="flex items-center gap-2 px-1">
                  <Skeleton className="bg-white/10 h-7 w-36" />
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 min-h-[300px] animate-pulse" />
              </section>

              <div className="flex flex-col justify-between flex-1 min-w-0 gap-6">
                {/* Summoner Spells */}
                <section className="space-y-3 shrink-0">
                  <div className="flex items-center gap-2 px-1 shrink-0">
                    <Skeleton className="bg-white/10 h-7 w-48" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex gap-3 animate-pulse">
                    <Skeleton className="bg-white/10 rounded-xl w-12 h-12" />
                    <Skeleton className="bg-white/10 rounded-xl w-12 h-12" />
                  </div>
                </section>

                {/* Build Path */}
                <section className="space-y-3 flex-1 flex flex-col min-h-0">
                  <div className="flex items-center gap-2 px-1 shrink-0">
                    <Skeleton className="bg-white/10 h-7 w-32" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 space-y-3 animate-pulse flex-1 flex flex-col justify-center min-h-0">
                    <div className="space-y-4">
                      <Skeleton className="bg-white/10 h-5 w-24" />
                      <div className="flex gap-3">
                        <Skeleton className="bg-white/10 rounded-xl w-12 h-12" />
                        <Skeleton className="bg-white/10 rounded-xl w-12 h-12" />
                      </div>
                    </div>
                    <div className="h-px w-full bg-white/10" />
                    <div className="space-y-4">
                      <Skeleton className="bg-white/10 h-5 w-24" />
                      <div className="flex gap-3">
                        <Skeleton className="bg-white/10 rounded-xl w-12 h-12" />
                        <Skeleton className="bg-white/10 rounded-xl w-12 h-12" />
                        <Skeleton className="bg-white/10 rounded-xl w-12 h-12" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Game Plan Strategy */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Skeleton className="bg-white/10 h-7 w-56" />
              </div>
              <div className="flex flex-col">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="relative pl-8 pb-8">
                    {/* Vertical Line */}
                    {i !== 2 && (
                      <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-white/10" />
                    )}
                    
                    {/* Dot */}
                    <div className="absolute left-0 top-[6px] w-6 h-6 rounded-full border-4 border-[#030509] flex items-center justify-center shadow-lg bg-white/20 animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3 animate-pulse">
                      <Skeleton className="bg-white/10 h-5 w-24" />
                      <div className="space-y-2">
                        <Skeleton className="bg-white/10 h-3 w-full" />
                        <Skeleton className="bg-white/10 h-3 w-[90%]" />
                        <Skeleton className="bg-white/10 h-3 w-[95%]" />
                        <Skeleton className="bg-white/10 h-3 w-[80%]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: VODs */}
          <div className="space-y-6">
            <section className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Skeleton className="bg-white/10 h-8 w-64" />
              </div>
              <div className="flex flex-col gap-8">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl aspect-video w-full animate-pulse" />
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
