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
  return (
    <Link href={`/matchups/${encodeURIComponent(enemyChampion)}`}>
      <Card className="h-full transition-colors hover:bg-muted/30">
        <CardContent className="flex flex-col items-center gap-2.5 py-2">
          {enemyIcon ? (
            <ChampionIcon src={enemyIcon} name={enemyChampion} size={56} />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">
              ?
            </div>
          )}
          <span className="font-medium text-sm text-center leading-tight">{enemyChampion}</span>
          <DifficultyBadge difficulty={difficulty} />
        </CardContent>
      </Card>
    </Link>
  );
}
