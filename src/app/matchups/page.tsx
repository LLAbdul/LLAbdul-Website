import { getAllMatchups } from "@/lib/data";
import { MatchupGrid } from "@/components/matchup/matchup-grid";

export const metadata = {
  title: "Matchup Guides",
  description: "Challenger-level Yasuo & Yone matchup guides for every champion.",
};

export default async function MatchupsPage() {
  const matchups = await getAllMatchups();

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Matchup Guides</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {matchups.length > 0
            ? `${matchups.length} guides available. Select a champion.`
            : "No guides yet — check back soon."}
        </p>
      </div>
      <MatchupGrid matchups={matchups} />
    </div>
  );
}
