import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getChampion } from "@/lib/riot-api";
import { getGuide, getMechanics } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="max-w-3xl space-y-10 py-10">
      <Link
        href="/guides"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Guides
      </Link>

      {/* Champion header */}
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all overflow-hidden">
        <CardContent className="flex items-center gap-6 p-6 sm:p-8">
          {champ.icon && (
            <ChampionIcon src={champ.icon} name={champ.name} size={96} className="rounded-2xl shrink-0 shadow-2xl" />
          )}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9082A] mb-2">
              Champion Guide
            </p>
            <h1 className="text-4xl sm:text-5xl font-serif text-white font-black tracking-tight">{champ.name}</h1>
            {champ.title && (
              <p className="text-lg text-white/60 mt-2 font-light italic">{champ.title}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Strategy */}
      {hasGuide && (
        <div className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-white/40 border-b border-white/10 pb-2">
            Strategy
          </h2>
          <div className="space-y-4">
            {guide.early && <PhaseStrategy phase="early" content={guide.early} />}
            {guide.mid && <PhaseStrategy phase="mid" content={guide.mid} />}
            {guide.late && <PhaseStrategy phase="late" content={guide.late} />}
          </div>
        </div>
      )}

      {/* Mechanics */}
      {hasMechanics && (
        <div className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-white/40 border-b border-white/10 pb-2">
            Mechanics
          </h2>
          <div className="grid gap-4">
            {mechanics.map((mech) => (
              <Card key={mech._id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h3 className="font-serif text-2xl text-white font-black">{mech.title}</h3>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10"
                      style={difficultyColors[mech.difficulty] ?? difficultyColors.BASIC}
                    >
                      {mech.difficulty}
                    </Badge>
                  </div>
                  {mech.description && (
                    <p className="text-base text-white/70 leading-relaxed font-light">{mech.description}</p>
                  )}
                  {mech.videos.length > 0 && (
                    <div className="grid gap-4 mt-4">
                      {mech.videos.map((url, i) => (
                        <div key={i} className="rounded-lg overflow-hidden border border-white/10">
                          <VideoEmbed url={url} />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Guide videos */}
      {guide?.videos && guide.videos.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-white/40 border-b border-white/10 pb-2">
            Videos
          </h2>
          <div className="grid gap-6">
            {guide.videos.map((url, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-white/10">
                <VideoEmbed url={url} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coming soon */}
      {!hasGuide && !hasMechanics && (
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all">
          <CardContent className="text-center py-20 px-6">
            <h2 className="text-3xl font-serif text-white font-black mb-4">Guide Coming Soon</h2>
            <p className="text-base text-white/60 max-w-md mx-auto leading-relaxed font-light">
              The full {champ.name} guide is being written. Check the matchup guides in the meantime.
            </p>
            <Link
              href="/matchups"
              className="mt-8 inline-block px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#FFD700] text-sm font-bold uppercase tracking-[0.2em] rounded-lg transition-all"
            >
              Browse Matchups
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
