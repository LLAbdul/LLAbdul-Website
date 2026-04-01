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

  return (
    <div className="max-w-4xl space-y-6 py-6">
      {/* Back link */}
      <Link
        href="/matchups"
        className="inline-flex items-center gap-1.5 text-xs text-[#7B7F9E] hover:text-[#C8AA6E] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        All Matchups
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4">
        {enemyChamp?.icon && (
          <ChampionIcon src={enemyChamp.icon} name={enemyChamp.name} size={64} className="rounded-lg shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mb-1">
            Matchup Guide
          </p>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl font-bold text-[#E8E8ED]">
              {matchup.champion.name} vs {decoded}
            </h1>
            <DifficultyBadge difficulty={matchup.difficulty} />
          </div>
          {enemyChamp?.title && (
            <p className="text-xs text-[#7B7F9E] mt-0.5 italic">{enemyChamp.title}</p>
          )}
        </div>
      </div>

      {/* Two-column: Runes (left) + Spells/Build (right) */}
      {(hasRunes || hasBuild || hasSpells) && (
        <div className="grid lg:grid-cols-[1fr_260px] gap-4">
          {/* Left: Runes */}
          {hasRunes && (
            <Card>
              <CardContent className="pt-1">
                <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mb-3">
                  Runes
                </p>
                <RuneDisplay runes={matchup.runes} />
              </CardContent>
            </Card>
          )}

          {/* Right: Spells + Build stacked */}
          <div className="space-y-4">
            {hasSpells && (
              <Card>
                <CardContent>
                  <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mb-3">
                    Summoner Spells
                  </p>
                  <div className="flex gap-2">
                    {matchup.summonerSpells.map((spell) => (
                      <div key={spell.name} title={spell.name}>
                        {spell.icon ? (
                          <Image
                            src={spell.icon}
                            alt={spell.name}
                            width={40}
                            height={40}
                            className="rounded-md border border-[#1E2A4A]"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-[#1A2340] border border-[#1E2A4A] flex items-center justify-center text-[10px] text-[#7B7F9E]">
                            {spell.name.slice(0, 2)}
                          </div>
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
                  {matchup.startItems.length > 0 && (
                    <BuildDisplay items={matchup.startItems} label="Starting Items" />
                  )}
                  {matchup.build.length > 0 && (
                    <BuildDisplay items={matchup.build} label="Core Build" showArrows />
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Strategy */}
      {hasStrategy && (
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
            Game Plan
          </p>
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
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
            Video Guides
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {matchup.videos.map((url, i) => (
              <VideoEmbed key={i} url={url} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
