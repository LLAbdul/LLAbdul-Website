import { getAllMatchups } from "@/lib/data";
import { MatchupGrid } from "@/components/matchup/matchup-grid";

export const metadata = {
  title: "Matchup Guides - LLAbdul",
  description: "Challenger-level Yasuo & Yone matchup guides for every champion.",
};

export default async function MatchupsPage() {
  const matchups = await getAllMatchups();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Matchup Guides</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Select a champion to see how to play against them.
        </p>
      </div>

      <MatchupGrid matchups={matchups} />
    </div>
  );
}
