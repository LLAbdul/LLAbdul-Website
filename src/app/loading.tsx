import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-[#030509]">
      {/* Hero Section Skeleton */}
      <section className="relative w-full overflow-hidden border-b border-white/5 pb-16 pt-24">
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center text-center mt-12">
          {/* Badge Skeleton */}
          <Skeleton className="bg-white/5 animate-pulse rounded-full h-8 w-32 mb-8 border border-[#FFD700]/20" />
          
          {/* Title Skeleton */}
          <Skeleton className="bg-white/5 animate-pulse rounded-lg h-16 md:h-24 lg:h-32 w-3/4 max-w-2xl mb-6" />
          
          {/* Subtitle Skeleton */}
          <div className="flex flex-col items-center gap-2 mb-10 w-full">
            <Skeleton className="bg-white/5 animate-pulse rounded-md h-5 w-1/2 max-w-md" />
            <Skeleton className="bg-white/5 animate-pulse rounded-md h-5 w-2/3 max-w-lg" />
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Skeleton className="bg-[#C9082A]/10 animate-pulse rounded-lg h-14 w-full sm:w-48 border border-[#C9082A]/20" />
            <Skeleton className="bg-[#FFD700]/10 animate-pulse rounded-lg h-14 w-full sm:w-48 border border-[#FFD700]/20" />
          </div>
        </div>
      </section>

      {/* Main Content Area Skeleton */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-16 -mt-8 w-full">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
          
          {/* Left: Nav Cards Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="bg-white/5 animate-pulse h-px w-8" />
              <Skeleton className="bg-white/5 animate-pulse rounded-md h-8 w-48" />
              <Skeleton className="bg-white/5 animate-pulse h-px flex-1" />
            </div>
            
            <Skeleton className="bg-white/5 animate-pulse rounded-2xl h-40 w-full border border-white/5" />
            <Skeleton className="bg-white/5 animate-pulse rounded-2xl h-40 w-full border border-white/5" />
          </div>

          {/* Right: Recent Matchups List Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <Skeleton className="bg-white/5 animate-pulse rounded-md h-8 w-40" />
              <Skeleton className="bg-white/5 animate-pulse h-px flex-1" />
            </div>
            
            <div className="rounded-2xl border border-white/10 bg-[#030509]/60 overflow-hidden">
              <div className="flex items-center px-6 py-4 border-b border-white/5">
                <Skeleton className="bg-white/5 animate-pulse h-4 w-12" />
                <Skeleton className="bg-white/5 animate-pulse h-4 flex-1 mx-4" />
                <Skeleton className="bg-white/5 animate-pulse h-4 w-16" />
              </div>
              
              <div className="divide-y divide-white/5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center px-6 py-4 gap-4">
                    <Skeleton className="bg-white/5 animate-pulse rounded-full h-12 w-12 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="bg-white/5 animate-pulse rounded-md h-5 w-32" />
                      <Skeleton className="bg-white/5 animate-pulse rounded-md h-3 w-16" />
                    </div>
                    <Skeleton className="bg-white/5 animate-pulse rounded-md h-6 w-16 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}
