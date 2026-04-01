import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { getMatchup } from "@/lib/data";
import { getChampion } from "@/lib/riot-api";
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

  const hasStrategy = matchup.early || matchup.mid || matchup.late;
  const hasBuild = matchup.startItems.length > 0 || matchup.build.length > 0;
  const hasRunes = matchup.runes !== null;
  const hasVideos = matchup.videos.length > 0;
  const hasSpells = matchup.summonerSpells.length > 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back */}
      <Link
        href="/matchups"
        className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors animate-in-up"
      >
        <ArrowLeft className="w-4 h-4" />
        All Matchups
      </Link>

      {/* Header card */}
      <div
        className="relative p-6 rounded-xl bg-surface border border-border overflow-hidden animate-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Subtle gradient behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-transparent pointer-events-none" />

        <div className="relative flex items-center gap-5">
          {enemyChamp?.icon && (
            <ChampionIcon src={enemyChamp.icon} name={enemyChamp.name} size={72} />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-display font-bold tracking-wide">
                {matchup.champion.name}
                <span className="text-foreground-muted mx-2 font-normal">vs</span>
                {decoded}
              </h1>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <DifficultyBadge difficulty={matchup.difficulty} />
              {enemyChamp?.title && (
                <span className="text-xs text-foreground-subtle">{enemyChamp.title}</span>
              )}
            </div>
          </div>
          {matchup.champion.icon && (
            <ChampionIcon
              src={matchup.champion.icon}
              name={matchup.champion.name}
              size={48}
              className="hidden sm:block opacity-50"
            />
          )}
        </div>
      </div>

      {/* Strategy */}
      {hasStrategy && (
        <section className="space-y-4 animate-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="section-heading text-sm text-foreground-muted tracking-widest">Game Plan</h2>
          <div className="grid gap-3">
            {matchup.early && <PhaseStrategy phase="early" content={matchup.early} />}
            {matchup.mid && <PhaseStrategy phase="mid" content={matchup.mid} />}
            {matchup.late && <PhaseStrategy phase="late" content={matchup.late} />}
          </div>
        </section>
      )}

      {/* Runes */}
      {hasRunes && (
        <section className="space-y-3 animate-in-up" style={{ animationDelay: "0.25s" }}>
          <h2 className="section-heading text-sm text-foreground-muted tracking-widest">Runes</h2>
          <div className="p-5 rounded-xl bg-surface border border-border">
            <RuneDisplay runes={matchup.runes} />
          </div>
        </section>
      )}

      {/* Build */}
      {hasBuild && (
        <section className="space-y-4 animate-in-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="section-heading text-sm text-foreground-muted tracking-widest">Build</h2>
          <div className="p-5 rounded-xl bg-surface border border-border space-y-5">
            {matchup.startItems.length > 0 && (
              <BuildDisplay items={matchup.startItems} label="Starting Items" />
            )}
            {matchup.build.length > 0 && (
              <BuildDisplay items={matchup.build} label="Core Build" />
            )}
          </div>
        </section>
      )}

      {/* Summoner Spells */}
      {hasSpells && (
        <section className="space-y-3 animate-in-up" style={{ animationDelay: "0.35s" }}>
          <h2 className="section-heading text-sm text-foreground-muted tracking-widest">Summoner Spells</h2>
          <div className="flex gap-2">
            {matchup.summonerSpells.map((spell) => (
              <span
                key={spell}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-border text-sm font-medium"
              >
                <Zap className="w-3.5 h-3.5 text-accent-gold" />
                {spell}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      {hasVideos && (
        <section className="space-y-4 animate-in-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="section-heading text-sm text-foreground-muted tracking-widest">Video Guides</h2>
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
