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

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10 text-[#E8E8ED]">
        
        {/* Navigation & Header Section */}
        <div className="space-y-6">
          <Link
            href="/matchups"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7B7F9E] hover:text-[#C9082A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Matchups
          </Link>

          {/* Header Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 bg-white/5 backdrop-blur-xl p-6 sm:p-10 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9082A] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
            
            {enemyChamp?.icon && (
              <ChampionIcon 
                src={enemyChamp.icon} 
                name={enemyChamp.name} 
                size={128} 
                className="rounded-3xl shrink-0 shadow-2xl border border-white/10 z-10" 
              />
            )}
            <div className="flex-1 min-w-0 flex flex-col justify-center space-y-3 z-10">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#C9082A]">
                Tactical Matchup Guide
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-wide">
                  {matchup.champion.name} <span className="text-white/20 font-light mx-2 italic">vs</span> {decoded}
                </h1>
                <div className="scale-110 origin-left">
                  <DifficultyBadge difficulty={matchup.difficulty} />
                </div>
              </div>
              {enemyChamp?.title && (
                <p className="text-sm sm:text-base text-[#7B7F9E] italic tracking-wide font-serif capitalize">
                  {enemyChamp.title}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[440px_1fr] gap-8 xl:gap-12 items-start pb-24">
          
          {/* Left Column: Optimal Setup (Runes, Spells, Build) */}
          <div className="space-y-8">
            {/* Runes */}
            {hasRunes && (
              <section className="space-y-5">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-1.5 h-6 bg-[#C9082A] rounded-full shadow-[0_0_10px_rgba(201,8,42,0.5)]" />
                  <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                    Optimal Runes
                  </h2>
                </div>
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:bg-white/[0.07] transition-colors">
                  <CardContent className="p-6">
                    <RuneDisplay runes={matchup.runes} />
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Summoner Spells */}
            {hasSpells && (
              <section className="space-y-5">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-1.5 h-6 bg-[#FFD700] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                  <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                    Summoner Spells
                  </h2>
                </div>
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:bg-white/[0.07] transition-colors">
                  <CardContent className="p-6 flex gap-4">
                    {matchup.summonerSpells.map((spell) => (
                      <div key={spell.name} title={spell.name} className="relative group">
                        {spell.icon ? (
                          <div className="relative">
                            <div className="absolute inset-0 bg-[#FFD700] rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
                            <Image
                              src={spell.icon}
                              alt={spell.name}
                              width={64}
                              height={64}
                              className="relative rounded-2xl border border-white/10 shadow-lg group-hover:border-[#FFD700]/50 transition-colors z-10"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-xs font-bold text-[#7B7F9E] shadow-lg">
                            {spell.name.slice(0, 3)}
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Build Path */}
            {hasBuild && (
              <section className="space-y-5">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-1.5 h-6 bg-[#E8E8ED] rounded-full shadow-[0_0_10px_rgba(232,232,237,0.5)]" />
                  <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                    Build Path
                  </h2>
                </div>
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:bg-white/[0.07] transition-colors">
                  <CardContent className="p-6 sm:p-8 space-y-8">
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

          {/* Right Column: Game Plan Strategy & Videos */}
          <div className="space-y-8">
            {/* Strategy */}
            {hasStrategy && (
              <section className="space-y-5">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-1.5 h-6 bg-[#C9082A] rounded-full shadow-[0_0_10px_rgba(201,8,42,0.5)]" />
                  <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                    Game Plan Strategy
                  </h2>
                </div>
                <div className="flex flex-col gap-6">
                  {matchup.early && <PhaseStrategy phase="early" content={matchup.early} />}
                  {matchup.mid && <PhaseStrategy phase="mid" content={matchup.mid} />}
                  {matchup.late && <PhaseStrategy phase="late" content={matchup.late} />}
                </div>
              </section>
            )}

            {/* Videos */}
            {hasVideos && (
              <section className="space-y-5 pt-4">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-1.5 h-6 bg-[#FFD700] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                  <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                    VOD Reviews & Examples
                  </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {matchup.videos.map((url, i) => (
                    <div key={i} className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 group hover:border-white/20 transition-colors">
                       <VideoEmbed url={url} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
