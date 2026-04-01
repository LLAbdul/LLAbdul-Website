import Link from "next/link";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { DifficultyBadge } from "@/components/shared/difficulty-badge";

interface MatchupCardProps {
  enemyChampion: string;
  enemyIcon: string;
  difficulty: string;
}

export function MatchupCard({
  enemyChampion,
  enemyIcon,
  difficulty,
}: MatchupCardProps) {
  return (
    <Link
      href={`/matchups/${encodeURIComponent(enemyChampion)}`}
      className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--card-hover)] hover:border-[var(--primary)]/40 transition-all"
    >
      <ChampionIcon
        src={enemyIcon}
        name={enemyChampion}
        size={64}
        className="group-hover:scale-105 transition-transform"
      />
      <span className="font-medium text-sm text-center">{enemyChampion}</span>
      <DifficultyBadge difficulty={difficulty} />
    </Link>
  );
}
