import { getAllChampionsWithMatchups } from "@/lib/data";
import { MatchupGrid } from "@/components/matchup/matchup-grid";

export const metadata = {
  title: "Matchup Guides",
  description: "Challenger-level Yasuo & Yone matchup guides for every champion.",
};

export default async function MatchupsPage() {
  const champions = await getAllChampionsWithMatchups();

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Matchup Guides</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Select a champion to see the matchup guide. Champions with guides are marked with difficulty.
        </p>
      </div>
      <MatchupGrid matchups={champions} />
    </div>
  );
}
