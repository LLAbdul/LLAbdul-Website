import { getAllMatchups } from "@/lib/data";
import { MatchupGrid } from "@/components/matchup/matchup-grid";
import { Swords } from "lucide-react";

export const metadata = {
  title: "Matchup Guides - LLAbdul",
  description: "Challenger-level Yasuo & Yone matchup guides for every champion.",
};

export default async function MatchupsPage() {
  const matchups = await getAllMatchups();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="animate-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center">
            <Swords className="w-5 h-5 text-accent-purple" />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-wide">Matchup Guides</h1>
        </div>
        <p className="text-foreground-muted text-sm ml-[52px]">
          {matchups.length > 0
            ? `${matchups.length} guides available. Select a champion to learn the matchup.`
            : "No guides yet. Check back soon!"}
        </p>
      </div>

      <div className="animate-in-up" style={{ animationDelay: "0.15s" }}>
        <MatchupGrid matchups={matchups} />
      </div>
    </div>
  );
}
