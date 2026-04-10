import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getChampion } from "@/lib/riot-api";
import { getGuide, getMechanics } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { PhaseStrategy } from "@/components/matchup/phase-strategy";
import { VideoEmbed } from "@/components/matchup/video-embed";

interface PageProps {
  params: Promise<{ champion: string }>;
}

const validChampions = ["yasuo", "yone"];

const difficultyColors: Record<string, React.CSSProperties> = {
  BASIC: { background: "rgba(255,255,255,0.05)", color: "#fff", borderColor: "rgba(255,255,255,0.1)" },
  ADVANCED: { background: "rgba(255,215,0,0.1)", color: "#FFD700", borderColor: "rgba(255,215,0,0.2)" },
  EXPERT: { background: "rgba(201,8,42,0.1)", color: "#C9082A", borderColor: "rgba(201,8,42,0.2)" },
};

export async function generateMetadata({ params }: PageProps) {
  const { champion } = await params;
  const name = decodeURIComponent(champion);
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return { title: `${capitalized} Guide` };
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

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/guides"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        All Guides
      </Link>

      {/* Hero Section */}
      <header className="relative flex flex-col md:flex-row items-start md:items-center gap-8 mb-16">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl -z-10" />
        
        {champ.icon && (
          <ChampionIcon src={champ.icon} name={champ.name} size={128} className="rounded-2xl shrink-0 shadow-lg" />
        )}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#C9082A] tracking-wider uppercase">
            Champion Guide
          </p>
          <h1 className="text-5xl sm:text-7xl font-serif text-white font-bold tracking-tight">{champ.name}</h1>
          {champ.title && (
            <p className="text-xl text-white/60 italic">{champ.title}</p>
          )}
        </div>
      </header>

      {/* Strategy Section */}
      {hasGuide && (
        <>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
          <section className="space-y-8 mb-16">
            <h2 className="text-2xl font-serif font-semibold text-white">
              Strategy
            </h2>
            <div className="space-y-6">
              {guide.early && <PhaseStrategy phase="early" content={guide.early} />}
              {guide.mid && <PhaseStrategy phase="mid" content={guide.mid} />}
              {guide.late && <PhaseStrategy phase="late" content={guide.late} />}
            </div>
          </section>
        </>
      )}

      {/* Mechanics Section */}
      {hasMechanics && (
        <>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
          <section className="space-y-8 mb-16">
            <h2 className="text-2xl font-serif font-semibold text-white">
              Mechanics
            </h2>
            <div className="grid gap-6">
              {mechanics.map((mech) => (
                <div key={mech._id} className="bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl p-6 sm:p-8 transition-colors">
                  <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                    <h3 className="font-serif text-2xl text-white font-semibold">{mech.title}</h3>
                    <Badge
                      variant="outline"
                      className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border-white/10"
                      style={difficultyColors[mech.difficulty] ?? difficultyColors.BASIC}
                    >
                      {mech.difficulty}
                    </Badge>
                  </div>
                  {mech.description && (
                    <p className="text-base text-white/70 leading-relaxed mb-6">{mech.description}</p>
                  )}
                  {mech.videos.length > 0 && (
                    <div className="grid gap-4 mt-4">
                      {mech.videos.map((url, i) => (
                        <div key={i} className="rounded-xl overflow-hidden bg-black/20">
                          <VideoEmbed url={url} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Guide Videos */}
      {guide?.videos && guide.videos.length > 0 && (
        <>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
          <section className="space-y-8 mb-16">
            <h2 className="text-2xl font-serif font-semibold text-white">
              Videos
            </h2>
            <div className="grid gap-6">
              {guide.videos.map((url, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white/[0.02]">
                  <VideoEmbed url={url} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Coming Soon */}
      {!hasGuide && !hasMechanics && (
        <>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
          <div className="bg-white/[0.02] rounded-2xl text-center py-24 px-6">
            <h2 className="text-3xl font-serif text-white font-semibold mb-4">Guide Coming Soon</h2>
            <p className="text-base text-white/60 max-w-md mx-auto leading-relaxed">
              The full {champ.name} guide is being written. Check the matchup guides in the meantime.
            </p>
            <Link
              href="/matchups"
              className="mt-8 inline-block px-8 py-3 bg-white/[0.02] hover:bg-white/[0.05] text-[#FFD700] text-sm font-semibold tracking-wider rounded-xl transition-colors"
            >
              Browse Matchups
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
