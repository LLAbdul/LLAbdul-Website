"use client";

import { useState } from "react";
import { SearchBar } from "@/components/shared/search-bar";
import { MatchupCard } from "@/components/matchup/matchup-card";
import type { MatchupListItem } from "@/lib/data";

interface MatchupGridProps {
  matchups: MatchupListItem[];
}

export function MatchupGrid({ matchups }: MatchupGridProps) {
  const [search, setSearch] = useState("");

  const filtered = matchups.filter((m) =>
    m.enemyChampion.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search champions..."
        className="max-w-sm"
      />

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">
          {search ? `No matchups found for "${search}"` : "No matchup guides yet."}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((matchup) => (
            <MatchupCard
              key={matchup.enemyChampion}
              enemyChampion={matchup.enemyChampion}
              enemyIcon={matchup.enemyIcon}
              difficulty={matchup.difficulty}
            />
          ))}
        </div>
      )}
    </div>
  );
}
