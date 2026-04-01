import { getAllChampionsWithMatchups } from "@/lib/data";
import { MatchupGrid } from "@/components/matchup/matchup-grid";

export const metadata = {
  title: "Matchup Guides",
  description: "Challenger-level Yasuo & Yone matchup guides for every champion.",
};

export default async function MatchupsPage() {
  const champions = await getAllChampionsWithMatchups();

  return (
    <div className="space-y-5 py-6">
      <div>
        <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mb-1">
          Yasuo &amp; Yone
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#E8E8ED]">Matchup Guides</h1>
        <p className="text-sm text-[#7B7F9E] mt-1">
          Every champion. Champions with a guide show difficulty.
        </p>
      </div>
      <MatchupGrid matchups={champions} />
    </div>
  );
}
