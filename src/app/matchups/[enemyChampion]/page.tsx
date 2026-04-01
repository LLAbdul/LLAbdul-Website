import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMatchup } from "@/lib/data";
import { getChampion } from "@/lib/riot-api";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { DifficultyBadge } from "@/components/shared/difficulty-badge";
import { PhaseStrategy } from "@/components/matchup/phase-strategy";
import { BuildDisplay } from "@/components/matchup/build-display";
import { VideoEmbed } from "@/components/matchup/video-embed";

interface PageProps {
  params: Promise<{ enemyChampion: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { enemyChampion } = await params;
  const decoded = decodeURIComponent(enemyChampion);
  return {
    title: `vs ${decoded} - Matchup Guide - LLAbdul`,
    description: `How to play Yasuo/Yone vs ${decoded}. Strategy, builds, runes, and tips.`,
  };
}

export default async function MatchupDetailPage({ params }: PageProps) {
  const { enemyChampion } = await params;
  const decoded = decodeURIComponent(enemyChampion);
  const matchup = await getMatchup(decoded);

  if (!matchup) {
    notFound();
  }

  let enemyChamp = null;
  try {
    enemyChamp = await getChampion(decoded);
  } catch {
    // fallback
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back link */}
      <Link
        href="/matchups"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Matchups
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        {enemyChamp && (
          <ChampionIcon src={enemyChamp.icon} name={enemyChamp.name} size={72} />
        )}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">
              {matchup.champion.name} vs {decoded}
            </h1>
            <DifficultyBadge difficulty={matchup.difficulty} />
          </div>
          {enemyChamp?.title && (
            <p className="text-sm text-[var(--muted-foreground)]">{enemyChamp.title}</p>
          )}
        </div>
      </div>

      {/* Strategy Phases */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Game Plan</h2>
        <div className="grid gap-4">
          <PhaseStrategy phase="early" content={matchup.early} />
          <PhaseStrategy phase="mid" content={matchup.mid} />
          {matchup.late && <PhaseStrategy phase="late" content={matchup.late} />}
        </div>
      </section>

      {/* Build */}
      {(matchup.startItems.length > 0 || matchup.build.length > 0) && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Build</h2>
          <BuildDisplay items={matchup.startItems} label="Starting Items" />
          <BuildDisplay items={matchup.build} label="Core Build" />
        </section>
      )}

      {/* Summoner Spells */}
      {matchup.summonerSpells.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Summoner Spells</h2>
          <div className="flex gap-2">
            {matchup.summonerSpells.map((spell) => (
              <span
                key={spell}
                className="px-3 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm"
              >
                {spell}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      {matchup.videos.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Video Guides</h2>
          <div className="grid gap-4">
            {matchup.videos.map((url, i) => (
              <VideoEmbed key={i} url={url} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
