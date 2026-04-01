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
      className="group game-card flex flex-col items-center gap-3 p-4"
    >
      <div className="relative">
        {enemyIcon ? (
          <ChampionIcon
            src={enemyIcon}
            name={enemyChampion}
            size={64}
            className="group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-surface-elevated flex items-center justify-center text-foreground-muted text-xs">
            ?
          </div>
        )}
      </div>
      <span className="font-medium text-sm text-center leading-tight">
        {enemyChampion}
      </span>
      <DifficultyBadge difficulty={difficulty} />
    </Link>
  );
}
