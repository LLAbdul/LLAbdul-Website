import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { DifficultyBadge } from "@/components/shared/difficulty-badge";

interface MatchupCardProps {
  enemyChampion: string;
  enemyIcon: string;
  difficulty: string;
}

export function MatchupCard({ enemyChampion, enemyIcon, difficulty }: MatchupCardProps) {
  const hasGuide = difficulty !== "";

  return (
    <Link href={`/matchups/${encodeURIComponent(enemyChampion)}`}>
      <Card className={`h-full transition-colors hover:bg-muted/30 ${!hasGuide ? "opacity-60" : ""}`}>
        <CardContent className="flex flex-col items-center gap-2 py-2">
          {enemyIcon ? (
            <ChampionIcon src={enemyIcon} name={enemyChampion} size={48} />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">?</div>
          )}
          <span className="font-medium text-xs text-center leading-tight">{enemyChampion}</span>
          {hasGuide ? (
            <DifficultyBadge difficulty={difficulty} />
          ) : (
            <span className="text-[10px] text-muted-foreground">No guide</span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
