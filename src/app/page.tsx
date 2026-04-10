import Link from "next/link";
import Image from "next/image";
import { Swords, BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllMatchups } from "@/lib/data";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { DifficultyBadge } from "@/components/shared/difficulty-badge";

export default async function Home() {
  let matchups: Awaited<ReturnType<typeof getAllMatchups>> = [];
  
  try {
    const m = await getAllMatchups();
    matchups = m;
  } catch {}

  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden border-b border-white/5 pb-16 pt-24">
        {/* Atmospheric Backgrounds */}
        <div className="absolute inset-0 z-0 bg-[#030509]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left_center,rgba(201,8,42,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right_center,rgba(0,212,255,0.1),transparent_50%)]"></div>
          
          {/* Yasuo Background Image (Left) */}
          <div className="absolute -left-[2%] top-0 h-[120%] w-[55%] opacity-20 mix-blend-screen mask-image-gradient-left pointer-events-none">
            <Image 
              src="/resources/images/NightBringerYasuo.png"
              alt=""
              fill
              sizes="55vw"
              className="object-cover object-right-top"
              priority
            />
          </div>

          {/* Yone Background Image (Right) */}
          <div className="absolute -right-[2%] top-0 h-[120%] w-[55%] opacity-20 mix-blend-screen mask-image-gradient-right pointer-events-none">
            <Image 
              src="/resources/images/YoneDefault.png"
              alt=""
              fill
              sizes="55vw"
              className="object-cover object-left-top"
              priority
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center text-center mt-12">
          <Badge className="bg-white/5 hover:bg-white/10 text-[#FFD700] border-[#FFD700]/30 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-[0.2em] mb-8 uppercase animate-pulse">
            Challenger #16
          </Badge>
          
          <h1 className="font-serif text-6xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 tracking-tight drop-shadow-2xl mb-6">
            LLABDUL
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-[#7B7F9E] font-light leading-relaxed mb-10">
            Master the wind. Dominate the rift. <br />
            Premium Yasuo & Yone guides crafted by NA's finest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-30 pointer-events-auto">
            <Link href="/matchups" className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#C9082A] to-[#ff4500] opacity-50 blur transition duration-500 group-hover:opacity-100"></div>
              <button className="relative w-full sm:w-auto px-8 py-4 bg-[#030509] border border-white/10 rounded-lg flex items-center justify-center gap-3 text-white font-medium hover:bg-white/5 transition-all">
                <Swords className="w-5 h-5 text-[#C9082A]" />
                <span>Matchup Guides</span>
              </button>
            </Link>
            
            <Link href="/guides" className="group">
              <button className="relative w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center gap-3 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all">
                <BookOpen className="w-5 h-5 text-[#FFD700]" />
                <span>Advanced Mechanics</span>
              </button>
            </Link>
          </div>
        </div>
        
        {/* Bottom Fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030509] to-transparent z-0 pointer-events-none"></div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-16 -mt-8 w-full pointer-events-none">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start pointer-events-auto">
          {/* Left: Nav Cards */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9082A]"></div>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-wide uppercase">Explore the Path</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-[#C9082A]"></div>
            </div>
            
            <Link href="/matchups" className="group block relative">
              {/* Glow Behind */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C9082A]/30 to-[#C9082A]/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
              
              <div className="relative overflow-hidden rounded-2xl bg-[#030509]/80 backdrop-blur-xl border border-white/5 transition-all duration-500 group-hover:border-[#C9082A]/50 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-[#C9082A]/10">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(201,8,42,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                
                <div className="relative p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                  {/* Icon Container */}
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-[#C9082A] blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-inner overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C9082A]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <Swords className="w-10 h-10 text-white group-hover:text-[#C9082A] transition-colors duration-500 drop-shadow-[0_0_15px_rgba(201,8,42,0.5)]" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-serif font-black text-3xl text-white tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#C9082A]/70 transition-all duration-500">
                      Matchup Library
                    </h3>
                    <p className="text-lg text-[#7B7F9E] font-light group-hover:text-white/80 transition-colors duration-500 leading-relaxed">
                      Dominate every lane phase with deep-dive strategies against {matchups.length > 0 ? <span className="text-white font-medium">{matchups.length}</span> : "all"} champions.
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-[#C9082A] group-hover:border-[#C9082A] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(201,8,42,0.4)]">
                    <ChevronRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/guides" className="group block relative">
              {/* Glow Behind */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
              
              <div className="relative overflow-hidden rounded-2xl bg-[#030509]/80 backdrop-blur-xl border border-white/5 transition-all duration-500 group-hover:border-[#FFD700]/40 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-[#FFD700]/10">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                
                <div className="relative p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                  {/* Icon Container */}
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-[#FFD700] blur-lg opacity-10 group-hover:opacity-30 transition duration-500"></div>
                    <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-inner overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <BookOpen className="w-10 h-10 text-white group-hover:text-[#FFD700] transition-colors duration-500 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-serif font-black text-3xl text-white tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#FFD700]/70 transition-all duration-500">
                      Champion Masterclass
                    </h3>
                    <p className="text-lg text-[#7B7F9E] font-light group-hover:text-white/80 transition-colors duration-500 leading-relaxed">
                      Frame-perfect combos, animation cancels, and Challenger macro concepts.
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                    <ChevronRight className="w-6 h-6 text-white/50 group-hover:text-black group-hover:translate-x-0.5 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right: Recent Matchups List */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-serif text-2xl font-black text-white uppercase tracking-wide">Recent Intel</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            
            <div className="relative rounded-2xl border border-white/10 bg-[#030509]/60 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Header Row */}
              <div className="flex items-center px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="text-[10px] font-bold text-[#7B7F9E] uppercase tracking-widest w-12 text-center">Hero</div>
                <div className="text-[10px] font-bold text-[#7B7F9E] uppercase tracking-widest flex-1 px-4">Matchup</div>
                <div className="text-[10px] font-bold text-[#7B7F9E] uppercase tracking-widest text-right">Threat</div>
              </div>

              {/* List */}
              <div className="divide-y divide-white/5">
                {matchups.length > 0 ? (
                  matchups.slice(0, 6).map((m) => (
                    <Link 
                      key={m.enemyChampion} 
                      href={`/matchups/${encodeURIComponent(m.enemyChampion)}`} 
                      className="group flex items-center px-6 py-4 hover:bg-white/[0.04] transition-colors relative overflow-hidden"
                    >
                      {/* Hover Highlight line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C9082A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      {/* Hero Icon */}
                      <div className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-[#C9082A]/30 transition-all overflow-hidden shrink-0 flex items-center justify-center bg-[#030509]">
                        {m.enemyIcon ? (
                          <div className="w-[120%] h-[120%] flex items-center justify-center">
                            <ChampionIcon src={m.enemyIcon} name={m.enemyChampion} size={48} />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-white/10" />
                        )}
                      </div>
                      
                      {/* Matchup Info */}
                      <div className="flex-1 px-4 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif font-bold text-lg text-white group-hover:text-[#C9082A] transition-colors truncate">
                            vs {m.enemyChampion}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-[#7B7F9E] font-medium uppercase tracking-wider">{m.champion}</span>
                        </div>
                      </div>
                      
                      {/* Difficulty */}
                      <div className="shrink-0 flex justify-end">
                        <DifficultyBadge difficulty={m.difficulty} />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <p className="text-sm text-[#7B7F9E]">Awaiting intel...</p>
                  </div>
                )}
              </div>

              {/* Footer Link */}
              {matchups.length > 6 && (
                <Link href="/matchups" className="block w-full px-6 py-4 text-center text-xs font-bold text-[#7B7F9E] uppercase tracking-widest hover:text-white bg-black/40 hover:bg-black/60 transition-colors border-t border-white/5">
                  View Database ({matchups.length})
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mask utilities for the images */}
      <style dangerouslySetInnerHTML={{__html: `
        .mask-image-gradient-left {
          mask-image: linear-gradient(to right, black, transparent);
          -webkit-mask-image: linear-gradient(to right, black, transparent);
        }
        .mask-image-gradient-right {
          mask-image: linear-gradient(to left, black, transparent);
          -webkit-mask-image: linear-gradient(to left, black, transparent);
        }
      `}} />
    </main>
  );
}