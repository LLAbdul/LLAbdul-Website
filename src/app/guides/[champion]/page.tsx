import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getChampion } from "@/lib/riot-api";
import { getGuide, getMechanics } from "@/lib/data";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { PhaseStrategy } from "@/components/matchup/phase-strategy";
import { VideoEmbed } from "@/components/matchup/video-embed";

interface PageProps {
  params: Promise<{ champion: string }>;
}

const validChampions = ["yasuo", "yone"];

const difficultyStyles: Record<string, string> = {
  BASIC: "bg-white/5 text-white/90 border-white/10",
  ADVANCED: "bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20",
  EXPERT: "bg-[#C9082A]/10 text-[#C9082A] border-[#C9082A]/20",
};

export async function generateMetadata({ params }: PageProps) {
  const { champion } = await params;
  const name = decodeURIComponent(champion);
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return { title: `${capitalized} Masterclass` };
}

export default async function ChampionGuidePage({ params }: PageProps) {
  const { champion } = await params;
  const decoded = decodeURIComponent(champion);
  if (!validChampions.includes(decoded.toLowerCase())) notFound();

  let champ = null;
  try { champ = await getChampion(decoded); } catch { notFound(); }
  if (!champ) notFound();

  const [guide, mechanics] = await Promise.all([
    getGuide(decoded),
    getMechanics(decoded),
  ]);

  const hasGuide = guide && (guide.early || guide.mid || guide.late);
  const hasMechanics = mechanics.length > 0;
  
  // Specific premium skins: Truth Dragon Yasuo (54) & Dawnbringer Yone (19)
  const skinNum = decoded.toLowerCase() === "yasuo" ? 54 : 19; 
  const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.alias}_${skinNum}.jpg`;

  return (
    <main className="relative min-h-screen w-full flex flex-col">
      {/* Background Splash */}
      <div className="fixed inset-0 z-0 bg-[#030509] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030509]/20 via-[#030509]/80 to-[#030509] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030509] via-transparent to-transparent z-10" />
        <Image
          src={splashUrl}
          alt={`${champ.name} Splash`}
          fill
          sizes="100vw"
          className="object-cover object-top opacity-20 mix-blend-luminosity"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-20">
        <Link
          href="/guides"
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7B7F9E] hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Masterclass Library
        </Link>

        {/* Editorial Hero */}
        <header className="flex flex-col md:flex-row items-start md:items-end gap-8 mb-20 border-b border-white/5 pb-12">
          {champ.icon && (
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-[#C9082A] blur-3xl opacity-20" />
              <ChampionIcon 
                src={champ.icon} 
                name={champ.name} 
                size={140} 
                className="relative rounded-3xl shadow-2xl border border-white/10" 
              />
            </div>
          )}
          <div className="flex-1 space-y-3">
            <h1 className="text-6xl sm:text-8xl font-serif text-white font-black tracking-tight leading-none drop-shadow-xl">
              {champ.name}
            </h1>
            {champ.title && (
              <p className="text-xl text-[#FFD700] font-serif italic tracking-wide">{champ.title}</p>
            )}
            <p className="text-sm font-medium text-[#7B7F9E] tracking-[0.2em] uppercase mt-2">
              Advanced Execution & Macro
            </p>
          </div>
        </header>

        {/* Strategy Section */}
        {hasGuide && (
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-wide">
                Tactical Flow
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <div className="grid gap-6">
              {guide.early && <PhaseStrategy phase="early" content={guide.early} />}
              {guide.mid && <PhaseStrategy phase="mid" content={guide.mid} />}
              {guide.late && <PhaseStrategy phase="late" content={guide.late} />}
            </div>
          </section>
        )}

        {/* Mechanics Section */}
        {hasMechanics && (
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-wide">
                Mechanics
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            
            <div className="grid gap-16">
              {mechanics.map((mech) => (
                <article key={mech._id} className="group relative pl-0 sm:pl-8 border-l border-transparent sm:hover:border-white/10 transition-colors">
                  {/* Subtle hover line */}
                  <div className="hidden sm:block absolute -left-0.5 top-0 bottom-0 w-1 bg-[#FFD700] opacity-0 group-hover:opacity-100 transition-all rounded-full" />
                  
                  <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold group-hover:text-[#FFD700] transition-colors">
                      {mech.title}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${difficultyStyles[mech.difficulty] || difficultyStyles.BASIC}`}>
                      {mech.difficulty}
                    </span>
                  </div>
                  
                  {mech.description && (
                    <p className="text-lg text-[#E8E8ED]/80 font-light leading-relaxed mb-8 max-w-3xl">
                      {mech.description}
                    </p>
                  )}
                  
                  {mech.videos.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      {mech.videos.map((url, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/40 relative group-hover:border-white/10 transition-colors">
                          <VideoEmbed url={url} />
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Guide Videos */}
        {guide?.videos && guide.videos.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-wide">
                VOD Analysis
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {guide.videos.map((url, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/40">
                  <VideoEmbed url={url} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Coming Soon */}
        {!hasGuide && !hasMechanics && (
          <div className="py-32 text-center border-t border-white/5 mt-16">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/20">
              <ArrowLeft className="w-8 h-8 rotate-180" />
            </div>
            <h2 className="text-4xl font-serif text-white font-bold mb-4">Masterclass in Progress</h2>
            <p className="text-lg text-[#7B7F9E] font-light max-w-md mx-auto mb-10">
              The complete {champ.name} execution guide is currently being documented. Return later for full tactical breakdowns.
            </p>
            <Link
              href="/matchups"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/5"
            >
              Browse Matchup Intel
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
