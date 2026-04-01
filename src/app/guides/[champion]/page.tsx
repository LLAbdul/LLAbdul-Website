import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Swords, BookOpen } from "lucide-react";
import { getChampion } from "@/lib/riot-api";
import { getGuide, getMechanics } from "@/lib/data";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { PhaseStrategy } from "@/components/matchup/phase-strategy";
import { VideoEmbed } from "@/components/matchup/video-embed";

interface PageProps {
  params: Promise<{ champion: string }>;
}

const validChampions = ["yasuo", "yone"];

const mechanicsDifficultyConfig = {
  BASIC: { label: "Basic", color: "var(--color-mechanics-basic)" },
  ADVANCED: { label: "Advanced", color: "var(--color-mechanics-advanced)" },
  EXPERT: { label: "Expert", color: "var(--color-mechanics-expert)" },
} as const;

export async function generateMetadata({ params }: PageProps) {
  const { champion } = await params;
  const decoded = decodeURIComponent(champion);
  return {
    title: `${decoded} Guide - LLAbdul`,
    description: `Complete ${decoded} guide with mechanics, combos, and gameplay tips from Challenger.`,
  };
}

export default async function ChampionGuidePage({ params }: PageProps) {
  const { champion } = await params;
  const decoded = decodeURIComponent(champion);

  if (!validChampions.includes(decoded.toLowerCase())) {
    notFound();
  }

  let champ = null;
  try {
    champ = await getChampion(decoded);
  } catch {
    notFound();
  }

  const [guide, mechanics] = await Promise.all([
    getGuide(decoded),
    getMechanics(decoded),
  ]);

  const hasGuide = guide && (guide.early || guide.mid || guide.late);
  const hasMechanics = mechanics.length > 0;
  const hasVideos = guide?.videos && guide.videos.length > 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back link */}
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Guides
      </Link>

      {/* Header */}
      <div className="flex items-center gap-5 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        {champ.icon && (
          <ChampionIcon src={champ.icon} name={champ.name} size={80} />
        )}
        <div>
          <h1 className="text-3xl font-bold">{champ.name}</h1>
          {champ.title && (
            <p className="text-[var(--muted-foreground)] mt-1">{champ.title}</p>
          )}
        </div>
      </div>

      {/* Strategy */}
      {hasGuide && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--primary)]" />
            Strategy
          </h2>
          <div className="grid gap-4">
            {guide.early && <PhaseStrategy phase="early" content={guide.early} />}
            {guide.mid && <PhaseStrategy phase="mid" content={guide.mid} />}
            {guide.late && <PhaseStrategy phase="late" content={guide.late} />}
          </div>
        </section>
      )}

      {/* Mechanics */}
      {hasMechanics && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Swords className="w-5 h-5 text-[var(--color-accent-gold)]" />
            Mechanics
          </h2>
          <div className="grid gap-4">
            {mechanics.map((mech) => {
              const config = mechanicsDifficultyConfig[mech.difficulty] ?? mechanicsDifficultyConfig.BASIC;
              return (
                <div
                  key={mech._id}
                  className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{mech.title}</h3>
                    <span
                      className="px-2 py-0.5 rounded-md text-xs font-semibold border uppercase tracking-wide"
                      style={{
                        color: config.color,
                        borderColor: `color-mix(in srgb, ${config.color} 30%, transparent)`,
                        backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)`,
                      }}
                    >
                      {config.label}
                    </span>
                  </div>
                  {mech.description && (
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed whitespace-pre-wrap">
                      {mech.description}
                    </p>
                  )}
                  {mech.videos.length > 0 && (
                    <div className="mt-3 grid gap-3">
                      {mech.videos.map((url, i) => (
                        <VideoEmbed key={i} url={url} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Videos */}
      {hasVideos && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Video Guides</h2>
          <div className="grid gap-4">
            {guide.videos.map((url, i) => (
              <VideoEmbed key={i} url={url} />
            ))}
          </div>
        </section>
      )}

      {/* Coming soon if no content */}
      {!hasGuide && !hasMechanics && (
        <div className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] text-center space-y-3">
          <h2 className="text-lg font-semibold">Guide Coming Soon</h2>
          <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
            The full {champ.name} guide with mechanics tutorials, combos, and in-depth
            strategy is being written. Check out the matchup guides in the meantime.
          </p>
          <Link
            href="/matchups"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--primary)] font-medium hover:underline mt-2"
          >
            Browse Matchups
          </Link>
        </div>
      )}
    </div>
  );
}
