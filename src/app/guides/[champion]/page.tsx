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

interface PageProps { params: Promise<{ champion: string }>; }

const validChampions = ["yasuo", "yone"];

export async function generateMetadata({ params }: PageProps) {
  const { champion } = await params;
  return { title: `${decodeURIComponent(champion)} Guide` };
}

export default async function ChampionGuidePage({ params }: PageProps) {
  const { champion } = await params;
  const decoded = decodeURIComponent(champion);
  if (!validChampions.includes(decoded.toLowerCase())) notFound();

  let champ = null;
  try { champ = await getChampion(decoded); } catch { notFound(); }

  const [guide, mechanics] = await Promise.all([getGuide(decoded), getMechanics(decoded)]);
  const hasGuide = guide && (guide.early || guide.mid || guide.late);
  const hasMechanics = mechanics.length > 0;

  return (
    <div className="max-w-3xl space-y-6 py-6">
      <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> All Guides
      </Link>

      <Card>
        <CardContent className="flex items-center gap-4">
          {champ.icon && <ChampionIcon src={champ.icon} name={champ.name} size={64} />}
          <div>
            <h1 className="text-2xl font-bold">{champ.name}</h1>
            {champ.title && <p className="text-sm text-muted-foreground">{champ.title}</p>}
          </div>
        </CardContent>
      </Card>

      {hasGuide && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Strategy</h2>
          {guide.early && <PhaseStrategy phase="early" content={guide.early} />}
          {guide.mid && <PhaseStrategy phase="mid" content={guide.mid} />}
          {guide.late && <PhaseStrategy phase="late" content={guide.late} />}
        </div>
      )}

      {hasMechanics && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Mechanics</h2>
          {mechanics.map((mech) => (
            <Card key={mech._id}>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{mech.title}</h3>
                  <Badge variant="outline" className="text-[10px]">{mech.difficulty}</Badge>
                </div>
                {mech.description && <p className="text-sm text-muted-foreground leading-relaxed">{mech.description}</p>}
                {mech.videos.length > 0 && (
                  <div className="grid gap-3 mt-2">
                    {mech.videos.map((url, i) => <VideoEmbed key={i} url={url} />)}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {guide?.videos && guide.videos.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Videos</h2>
          <div className="grid gap-4">
            {guide.videos.map((url, i) => <VideoEmbed key={i} url={url} />)}
          </div>
        </div>
      )}

      {!hasGuide && !hasMechanics && (
        <Card>
          <CardContent className="text-center py-8">
            <h2 className="font-semibold">Guide Coming Soon</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              The full {champ.name} guide is being written. Check out the matchup guides in the meantime.
            </p>
            <Link href="/matchups" className="text-sm text-primary font-medium mt-3 inline-block hover:underline">
              Browse Matchups
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
