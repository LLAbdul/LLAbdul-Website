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
  BASIC: { background: "rgba(10,200,185,0.12)", color: "#0AC8B9", borderColor: "rgba(10,200,185,0.30)" },
  ADVANCED: { background: "rgba(200,170,110,0.12)", color: "#C8AA6E", borderColor: "rgba(200,170,110,0.30)" },
  EXPERT: { background: "rgba(231,76,60,0.12)", color: "#E74C3C", borderColor: "rgba(231,76,60,0.30)" },
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
    <div className="max-w-3xl space-y-6 py-6">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-xs text-[#7B7F9E] hover:text-[#B87FD8] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        All Guides
      </Link>

      {/* Champion header */}
      <Card>
        <CardContent className="flex items-center gap-4 py-5">
          {champ.icon && (
            <ChampionIcon src={champ.icon} name={champ.name} size={72} className="rounded-lg shrink-0" />
          )}
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mb-1">
              Champion Guide
            </p>
            <h1 className="text-2xl font-bold text-[#E8E8ED]">{champ.name}</h1>
            {champ.title && (
              <p className="text-sm text-[#7B7F9E] mt-0.5 italic">{champ.title}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Strategy */}
      {hasGuide && (
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
            Strategy
          </p>
          {guide.early && <PhaseStrategy phase="early" content={guide.early} />}
          {guide.mid && <PhaseStrategy phase="mid" content={guide.mid} />}
          {guide.late && <PhaseStrategy phase="late" content={guide.late} />}
        </div>
      )}

      {/* Mechanics */}
      {hasMechanics && (
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
            Mechanics
          </p>
          {mechanics.map((mech) => (
            <Card key={mech._id}>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm text-[#E8E8ED]">{mech.title}</h3>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={difficultyColors[mech.difficulty] ?? difficultyColors.BASIC}
                  >
                    {mech.difficulty}
                  </Badge>
                </div>
                {mech.description && (
                  <p className="text-sm text-[#7B7F9E] leading-relaxed">{mech.description}</p>
                )}
                {mech.videos.length > 0 && (
                  <div className="grid gap-3 mt-2">
                    {mech.videos.map((url, i) => (
                      <VideoEmbed key={i} url={url} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Guide videos */}
      {guide?.videos && guide.videos.length > 0 && (
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
            Videos
          </p>
          <div className="grid gap-4">
            {guide.videos.map((url, i) => (
              <VideoEmbed key={i} url={url} />
            ))}
          </div>
        </div>
      )}

      {/* Coming soon */}
      {!hasGuide && !hasMechanics && (
        <Card>
          <CardContent className="text-center py-10">
            <h2 className="font-bold text-[#E8E8ED]">Guide Coming Soon</h2>
            <p className="text-sm text-[#7B7F9E] mt-2 max-w-sm mx-auto leading-relaxed">
              The full {champ.name} guide is being written. Check the matchup guides in the meantime.
            </p>
            <Link
              href="/matchups"
              className="text-sm text-[#B87FD8] font-medium mt-4 inline-block hover:underline"
            >
              Browse Matchups
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
