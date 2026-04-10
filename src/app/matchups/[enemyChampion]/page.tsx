import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getMatchup } from "@/lib/data";
import { getChampion } from "@/lib/riot-api";
import { Card, CardContent } from "@/components/ui/card";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { DifficultyBadge } from "@/components/shared/difficulty-badge";
import { PhaseStrategy } from "@/components/matchup/phase-strategy";
import { BuildDisplay } from "@/components/matchup/build-display";
import { RuneDisplay } from "@/components/matchup/rune-display";
import { VideoEmbed } from "@/components/matchup/video-embed";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PageProps {
  params: Promise<{ enemyChampion: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { enemyChampion } = await params;
  const decoded = decodeURIComponent(enemyChampion);
  return {
    title: `vs ${decoded} — Matchup Guide`,
    description: `Challenger Yasuo/Yone vs ${decoded} matchup guide with runes, builds, and strategy.`,
  };
}

export default async function MatchupDetailPage({ params }: PageProps) {
  const { enemyChampion } = await params;
  const decoded = decodeURIComponent(enemyChampion);
  const matchup = await getMatchup(decoded);
  if (!matchup) notFound();

  let enemyChamp = null;
  try { enemyChamp = await getChampion(decoded); } catch {}

  const hasStrategy = matchup.early || matchup.mid || matchup.late;
  const hasBuild = matchup.startItems.length > 0 || matchup.build.length > 0;
  const hasRunes = matchup.runes !== null;
  const hasVideos = matchup.videos.length > 0;
  const hasSpells = matchup.summonerSpells.length > 0;
  
  const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${enemyChamp?.alias || decoded}_0.jpg`;

  return (
    <div className="relative min-h-screen bg-[#030509]">
      {/* Background Splash with heavy mask/gradient to blend into #030509 */}
      <div 
        className="absolute inset-x-0 top-0 h-[800px] z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${splashUrl})`,
          backgroundPosition: "center 20%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)"
        }}
      />
      {/* Additional gradient overlay to make sure text is super readable */}
      <div className="absolute inset-x-0 top-0 h-[800px] z-0 pointer-events-none bg-gradient-to-b from-transparent via-[#030509]/80 to-[#030509]" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 space-y-8 text-[#E8E8ED]">
        
        {/* Navigation & Header Section */}
        <div className="space-y-4">
          <Link
            href="/matchups"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7B7F9E] hover:text-[#C9082A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Matchups
          </Link>

          {/* Header Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 bg-white/5 backdrop-blur-xl p-5 sm:p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9082A] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
            
            {enemyChamp?.icon && (
              <ChampionIcon 
                src={enemyChamp.icon} 
                name={enemyChamp.name} 
                size={80} 
                className="rounded-2xl shrink-0 shadow-xl border border-white/10 z-10" 
              />
            )}
            <div className="flex-1 min-w-0 flex flex-col justify-center space-y-1 z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C9082A] mb-1">
                Tactical Matchup Guide
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-wide">
                  {matchup.champion.name} <span className="text-white/20 font-light mx-1 italic">vs</span> {decoded}
                </h1>
                <DifficultyBadge difficulty={matchup.difficulty} />
              </div>
              {enemyChamp?.title && (
                <p className="text-sm text-[#7B7F9E] italic tracking-wide font-serif capitalize mt-1">
                  {enemyChamp.title}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className={`grid grid-cols-1 ${hasVideos ? "lg:grid-cols-[1.15fr_1fr] xl:grid-cols-[1.4fr_1fr]" : "max-w-2xl"} gap-8 xl:gap-12 items-start pb-16`}>
          
          {/* Left Column: Details & Strategy */}
          <div className="space-y-8">
            
            <div className="flex flex-col xl:flex-row gap-8 items-stretch">
              {/* Runes */}
              {hasRunes && (
                <section className="space-y-3 shrink-0 flex flex-col">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-1 h-5 bg-[#C9082A] rounded-full shadow-[0_0_8px_rgba(201,8,42,0.5)]" />
                    <h2 className="font-serif text-xl font-bold text-white tracking-wide">
                      Optimal Runes
                    </h2>
                  </div>
                  <Card className="flex-1 w-fit bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:bg-white/[0.06] transition-colors">
                    <CardContent className="p-4 h-full flex flex-col justify-center">
                      <RuneDisplay runes={matchup.runes} />
                    </CardContent>
                  </Card>
                </section>
              )}

              <div className="flex flex-col justify-between flex-1 min-w-0 gap-6">
                {/* Summoner Spells */}
                {hasSpells && (
                  <section className="space-y-3 shrink-0">
                    <div className="flex items-center gap-2 px-1 shrink-0">
                      <div className="w-1 h-5 bg-[#FFD700] rounded-full shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                      <h2 className="font-serif text-xl font-bold text-white tracking-wide">
                        Summoner Spells
                      </h2>
                    </div>
                    <Card className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:bg-white/[0.06] transition-colors">
                      <CardContent className="p-4 flex flex-wrap gap-2.5">
                        <TooltipProvider delay={0}>
                          <div className="flex flex-wrap gap-2.5">
                            {matchup.summonerSpells.map((spell) => (
                              <div key={spell.name} className="relative group">
                                <Tooltip>
                                  <TooltipTrigger className="outline-none focus:outline-none">
                                      {spell.icon ? (
                                        <div className="relative">
                                          <div className="absolute inset-0 bg-[#FFD700] rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                                            <Image
                                              src={spell.icon}
                                              alt={spell.name}
                                              width={30}
                                              height={30}
                                              className="relative rounded-xl border border-white/10 shadow-md group-hover:border-[#FFD700]/50 transition-colors z-10"
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-[30px] h-[30px] rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-[10px] font-bold text-[#7B7F9E] shadow-md hover:border-white/20 transition-colors">
                                          {spell.name.slice(0, 3)}
                                        </div>
                                      )}
                                  </TooltipTrigger>
                                  <TooltipContent 
                                    side="top" 
                                    sideOffset={8}
                                    className="bg-[#09090B] border border-white/10 px-3 py-2 rounded-md shadow-2xl z-50"
                                  >
                                    <p className="text-[#3b82f6] text-[13px] font-medium leading-none">{spell.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            ))}
                          </div>
                        </TooltipProvider>
                      </CardContent>
                    </Card>
                  </section>
                )}

                {/* Build Path */}
                {hasBuild && (
                  <section className="space-y-3 flex-1 flex flex-col min-h-0">
                    <div className="flex items-center gap-2 px-1 shrink-0">
                      <div className="w-1 h-5 bg-[#E8E8ED] rounded-full shadow-[0_0_8px_rgba(232,232,237,0.5)]" />
                      <h2 className="font-serif text-xl font-bold text-white tracking-wide">
                        Build Path
                      </h2>
                    </div>
                    <Card className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:bg-white/[0.06] transition-colors flex-1 flex flex-col justify-center min-h-0">
                      <CardContent className="p-3 space-y-3">
                        {matchup.startItems.length > 0 && (
                          <BuildDisplay items={matchup.startItems} label="Starting Items" />
                        )}
                        {matchup.startItems.length > 0 && matchup.build.length > 0 && (
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        )}
                        {matchup.build.length > 0 && (
                          <BuildDisplay items={matchup.build} label="Core Build" showArrows />
                        )}
                      </CardContent>
                    </Card>
                  </section>
                )}
              </div>
            </div>

            {/* Game Plan Strategy */}
            {hasStrategy && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-1 h-5 bg-[#C9082A] rounded-full shadow-[0_0_8px_rgba(201,8,42,0.5)]" />
                  <h2 className="font-serif text-xl font-bold text-white tracking-wide">
                    Game Plan Strategy
                  </h2>
                </div>
                <div className="flex flex-col">
                  {matchup.early && <PhaseStrategy phase="early" content={matchup.early} isLast={!matchup.mid && !matchup.late} />}
                  {matchup.mid && <PhaseStrategy phase="mid" content={matchup.mid} isLast={!matchup.late} />}
                  {matchup.late && <PhaseStrategy phase="late" content={matchup.late} isLast={true} />}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: VODs (Only renders if hasVideos is true) */}
          {hasVideos && (
            <div className="space-y-6">
              <section className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-1 h-6 bg-[#FFD700] rounded-full shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                  <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                    VOD Reviews & Examples
                  </h2>
                </div>
                <div className="flex flex-col gap-8">
                  {matchup.videos.map((url, i) => (
                    <div key={i} className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 group hover:border-white/20 transition-all duration-300">
                       <VideoEmbed url={url} />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
