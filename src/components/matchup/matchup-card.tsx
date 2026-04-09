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
        className={`h-full transition-all bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-[#C9082A]/50 cursor-pointer ${
          !hasGuide ? "opacity-50" : ""
        }`}
      >
        <CardContent className="flex flex-col items-center gap-1.5 py-2 px-1">
          {enemyIcon ? (
            <ChampionIcon src={enemyIcon} name={enemyChampion} size={48} />
          ) : (
            <div className="w-12 h-12 rounded-md bg-white/5 flex items-center justify-center text-[#7B7F9E] text-xs border border-white/10">
              ?
            </div>
          )}
          <span className="text-white font-bold text-center leading-tight line-clamp-2">
            {enemyChampion}
          </span>
          {hasGuide ? (
            <DifficultyBadge difficulty={difficulty} />
          ) : (
            <span className="text-[#7B7F9E] text-xs uppercase tracking-wider">—</span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
