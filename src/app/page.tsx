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

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030509] to-transparent z-10"></div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-16 -mt-8 w-full">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Left: Nav Cards */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-white mb-6">Explore the Path</h2>
            
            <Link href="/matchups" className="group block">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-[#C9082A]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(201,8,42,0.15)]">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#C9082A]/20 to-transparent border border-[#C9082A]/30 text-[#C9082A]">
                      <Swords className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-xl text-white group-hover:text-[#C9082A] transition-colors">Matchup Guides</div>
                      <div className="text-sm text-[#7B7F9E] mt-1">{matchups.length > 0 ? `${matchups.length} guides · ` : ""}Dominate every lane phase</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#7B7F9E] group-hover:text-[#C9082A] group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides" className="group block">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-[#FFD700]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(255,215,0,0.1)]">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent border border-[#FFD700]/30 text-[#FFD700]">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-xl text-white group-hover:text-[#FFD700] transition-colors">Champion Masterclass</div>
                      <div className="text-sm text-[#7B7F9E] mt-1">Combos, animation cancels, macro</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#7B7F9E] group-hover:text-[#FFD700] group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Right: Featured Matchups */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-xl font-bold text-white">Recent Matchups</h3>
            </div>
            
            {matchups.length > 0 ? (
              <div className="space-y-3">
                {matchups.slice(0, 6).map((m) => (
                  <Link key={m.enemyChampion} href={`/matchups/${encodeURIComponent(m.enemyChampion)}`} className="group block">
                    <Card className="bg-white/5 backdrop-blur-md border-white/5 transition-all duration-200 hover:bg-white/10 hover:border-white/20">
                      <CardContent className="flex items-center gap-4 p-3">
                        {m.enemyIcon && <ChampionIcon src={m.enemyIcon} name={m.enemyChampion} size={40} />}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-white group-hover:text-[#C9082A] transition-colors">vs {m.enemyChampion}</div>
                          <div className="text-[11px] text-[#7B7F9E] uppercase tracking-wider mt-0.5">{m.champion}</div>
                        </div>
                        <DifficultyBadge difficulty={m.difficulty} />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                {matchups.length > 6 && (
                  <Link href="/matchups" className="block text-center text-sm text-[#7B7F9E] font-medium hover:text-white transition-colors py-3 mt-2 border border-white/5 rounded-lg bg-white/[0.02] hover:bg-white/5">
                    View all {matchups.length} matchups
                  </Link>
                )}
              </div>
            ) : (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="py-10 text-center">
                  <p className="text-sm text-[#7B7F9E]">No matchups yet</p>
                </CardContent>
              </Card>
            )}
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