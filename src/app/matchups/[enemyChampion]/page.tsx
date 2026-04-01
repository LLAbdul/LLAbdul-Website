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
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: Promise<{ enemyChampion: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { enemyChampion } = await params;
  const decoded = decodeURIComponent(enemyChampion);
  return {
    title: `vs ${decoded} - Matchup Guide`,
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

  return (
    <div className="max-w-4xl space-y-6 py-6">
      <Link href="/matchups" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> All Matchups
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        {enemyChamp?.icon && <ChampionIcon src={enemyChamp.icon} name={enemyChamp.name} size={56} />}
        <div className="flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl font-bold">{matchup.champion.name} vs {decoded}</h1>
            <DifficultyBadge difficulty={matchup.difficulty} />
          </div>
          {enemyChamp?.title && <p className="text-xs text-muted-foreground mt-0.5">{enemyChamp.title}</p>}
        </div>
      </div>

      {/* Two-column layout for runes + spells/build on wider screens */}
      <div className="grid lg:grid-cols-[1fr_auto] gap-4">
        {/* Left column: Runes */}
        {hasRunes && (
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Runes</h2>
              </div>
              <RuneDisplay runes={matchup.runes} />
            </CardContent>
          </Card>
        )}

        {/* Right column: Spells + Build */}
        <div className="space-y-4 lg:w-64">
          {hasSpells && (
            <Card>
              <CardContent>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Summoner Spells</h2>
                <div className="flex gap-1.5">
                  {matchup.summonerSpells.map((spell) => (
                    <div key={spell.name} title={spell.name}>
                      {spell.icon ? (
                        <Image src={spell.icon} alt={spell.name} width={36} height={36} className="rounded border border-border" />
                      ) : (
                        <div className="w-9 h-9 rounded bg-muted border border-border flex items-center justify-center text-[10px] text-muted-foreground">{spell.name.slice(0, 2)}</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {hasBuild && (
            <Card>
              <CardContent className="space-y-4">
                {matchup.startItems.length > 0 && <BuildDisplay items={matchup.startItems} label="Starting Items" />}
                {matchup.build.length > 0 && <BuildDisplay items={matchup.build} label="Core Build" showArrows />}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Strategy */}
      {hasStrategy && (
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Game Plan</h2>
          <div className="space-y-2">
            {matchup.early && <PhaseStrategy phase="early" content={matchup.early} />}
            {matchup.mid && <PhaseStrategy phase="mid" content={matchup.mid} />}
            {matchup.late && <PhaseStrategy phase="late" content={matchup.late} />}
          </div>
        </div>
      )}

      {/* Videos */}
      {hasVideos && (
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Video Guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {matchup.videos.map((url, i) => <VideoEmbed key={i} url={url} />)}
          </div>
        </div>
      )}
    </div>
  );
}
