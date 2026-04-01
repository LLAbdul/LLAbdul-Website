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
      <Card
        className={`h-full transition-colors hover:bg-[#1A2340] cursor-pointer ${
          !hasGuide ? "opacity-50" : ""
        }`}
      >
        <CardContent className="flex flex-col items-center gap-1.5 py-2 px-1">
          {enemyIcon ? (
            <ChampionIcon src={enemyIcon} name={enemyChampion} size={48} />
          ) : (
            <div className="w-12 h-12 rounded-md bg-[#1A2340] flex items-center justify-center text-[#7B7F9E] text-xs">
              ?
            </div>
          )}
          <span className="font-medium text-[11px] text-[#E8E8ED] text-center leading-tight line-clamp-2">
            {enemyChampion}
          </span>
          {hasGuide ? (
            <DifficultyBadge difficulty={difficulty} />
          ) : (
            <span className="text-[10px] text-[#7B7F9E]">—</span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
