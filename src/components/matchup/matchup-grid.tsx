"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/shared/search-bar";
import { MatchupCard } from "@/components/matchup/matchup-card";
import type { MatchupListItem } from "@/lib/data";

type SortMode = "alpha" | "difficulty" | "guides-first";

const sortLabels: Record<SortMode, string> = {
  "alpha": "A-Z",
  "guides-first": "Guides First",
  "difficulty": "Difficulty",
};

const difficultyOrder: Record<string, number> = {
  "EASY": 1,
  "SKILL": 2,
  "HARD": 3,
};

export function MatchupGrid({ matchups }: { matchups: MatchupListItem[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("alpha");

  const filtered = useMemo(() => {
    let result = matchups.filter((m) =>
      m.enemyChampion.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      if (sort === "alpha") {
        return a.enemyChampion.localeCompare(b.enemyChampion);
      }
      if (sort === "guides-first") {
        const aHas = a.difficulty ? 0 : 1;
        const bHas = b.difficulty ? 0 : 1;
        if (aHas !== bHas) return aHas - bHas;
        return a.enemyChampion.localeCompare(b.enemyChampion);
      }
      if (sort === "difficulty") {
        const aD = difficultyOrder[a.difficulty.toUpperCase()] || 99;
        const bD = difficultyOrder[b.difficulty.toUpperCase()] || 99;
        if (aD !== bD) return aD - bD;
        return a.enemyChampion.localeCompare(b.enemyChampion);
      }
      return 0;
    });

    return result;
  }, [matchups, search, sort]);

  const guideCount = matchups.filter((m) => m.difficulty).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search champions..."
          className="max-w-sm"
        />
        <div className="flex gap-1.5">
          {(Object.keys(sortLabels) as SortMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setSort(mode)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                sort === mode
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {sortLabels[mode]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} champions &middot; {guideCount} guides
      </p>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">
          {search ? `No champions found for "${search}"` : "No champions loaded."}
        </p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-2">
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
