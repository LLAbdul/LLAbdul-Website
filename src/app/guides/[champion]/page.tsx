import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getChampion } from "@/lib/riot-api";
import { ChampionIcon } from "@/components/shared/champion-icon";

interface PageProps {
  params: Promise<{ champion: string }>;
}

const validChampions = ["yasuo", "yone"];

export async function generateMetadata({ params }: PageProps) {
  const { champion } = await params;
  const decoded = decodeURIComponent(champion);
  return {
    title: `${decoded} Guide - LLAbdul`,
    description: `Complete ${decoded} guide — mechanics, combos, and gameplay tips from Challenger.`,
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
      <div className="flex items-center gap-4">
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

      {/* Coming Soon placeholder */}
      <div className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] text-center space-y-3">
        <div className="text-4xl">
          {decoded.toLowerCase() === "yasuo" ? "\u{2694}\u{FE0F}" : "\u{1F5E1}\u{FE0F}"}
        </div>
        <h2 className="text-lg font-semibold">Guide Coming Soon</h2>
        <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
          The full {champ.name} guide with mechanics tutorials, combos, and in-depth
          strategy is being written. Check back soon or check out the matchup guides
          in the meantime.
        </p>
        <Link
          href="/matchups"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--primary)] font-medium hover:underline mt-2"
        >
          Browse Matchups
        </Link>
      </div>
    </div>
  );
}
