import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Tv, MessageCircle, Trophy, Swords, Medal } from "lucide-react";
import { RANK_EMBLEMS, POSITION_ICONS } from "@/lib/constants";

export default function About() {
  return (
    <main className="min-h-screen w-full flex flex-col py-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-16 relative">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFD700]/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <Image 
          src={RANK_EMBLEMS.challenger} 
          alt="Challenger" 
          width={140} 
          height={140} 
          className="mb-6 drop-shadow-[0_0_25px_rgba(255,215,0,0.3)] animate-pulse" 
        />
        
        <h1 className="font-serif text-5xl md:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-xl">
          LLABDUL
        </h1>
        
        <div className="flex items-center gap-3 justify-center mb-8 flex-wrap">
          <Badge className="bg-white/5 border-[#FFD700]/50 text-[#FFD700] backdrop-blur-md px-4 py-1.5 text-sm font-bold tracking-[0.1em] uppercase">
            Peak Rank: Challenger #16
          </Badge>
          <Badge className="bg-white/5 border-[#C9082A]/50 text-[#C9082A] backdrop-blur-md px-4 py-1.5 text-sm font-bold tracking-[0.1em] uppercase">
            Region: NA
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] xl:grid-cols-[1.4fr_1fr] gap-8 xl:gap-12 items-start">
        
        {/* Left Column: The Story */}
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
              The Journey
            </h2>
            <div className="prose prose-invert max-w-none text-[#E8E8ED] leading-relaxed">
              <p className="text-lg font-light text-[#E8E8ED]/90 mb-4">
                I'm LLAbdul. I play Yasuo and Yone, and I peaked Rank 16 Challenger in NA. 
              </p>
              <p className="mb-4">
                Everyone thinks climbing that high is all mechanics and flashy outplays, but it's really not. It's mostly knowing exactly when a wave is doomed and how to squeeze out one extra auto in a trade without dying for it.
              </p>
              <p>
                I built this site to just dump everything I've learned from grinding thousands of games in high elo. The exact trade patterns, the weird micro-interactions, the builds that actually work—I put it all here so you don't have to figure it out the hard way. The blueprint is right in front of you. Use it, or stay hardstuck.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Socials */}
        <div className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <h3 className="font-serif text-xl font-bold text-white mb-5 flex items-center gap-2">
                <Swords className="w-5 h-5 text-[#C9082A]" /> Combat Profile
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-[#7B7F9E]">
                    <Image src={POSITION_ICONS.mid} alt="Mid" width={16} height={16} className="opacity-70" />
                    <span>Primary Role</span>
                  </div>
                  <span className="font-bold text-white">Mid Lane</span>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-[#7B7F9E]">
                    <Image src={POSITION_ICONS.top} alt="Top" width={16} height={16} className="opacity-70" />
                    <span>Secondary Role</span>
                  </div>
                  <span className="font-bold text-white">Top Lane</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-[#7B7F9E]">
                    <Trophy className="w-4 h-4" />
                    <span>Signature</span>
                  </div>
                  <span className="font-bold text-white">Yasuo / Yone</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <h3 className="font-serif text-xl font-bold text-white mb-5">Connect</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#C9082A]/50 transition-all group">
                  <Video className="w-5 h-5 text-[#7B7F9E] group-hover:text-[#C9082A]" />
                  <span className="font-medium text-[#E8E8ED] group-hover:text-white">YouTube</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#C9082A]/50 transition-all group">
                  <Tv className="w-5 h-5 text-[#7B7F9E] group-hover:text-[#C9082A]" />
                  <span className="font-medium text-[#E8E8ED] group-hover:text-white">Twitch</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#C9082A]/50 transition-all group">
                  <MessageCircle className="w-5 h-5 text-[#7B7F9E] group-hover:text-[#C9082A]" />
                  <span className="font-medium text-[#E8E8ED] group-hover:text-white">Twitter / X</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </main>
  );
}
