"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/shared/search-bar";
import { MatchupCard } from "@/components/matchup/matchup-card";
import { cn } from "@/lib/utils";
import type { MatchupListItem } from "@/lib/data";

type SortMode = "alpha" | "guides-first" | "difficulty";

const sortLabels: Record<SortMode, string> = {
  alpha: "A–Z",
  "guides-first": "Guides First",
  difficulty: "Difficulty",
};

const difficultyOrder: Record<string, number> = {
  EASY: 1,
  SKILL: 2,
  HARD: 3,
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
        const aD = difficultyOrder[a.difficulty.toUpperCase()] ?? 99;
        const bD = difficultyOrder[b.difficulty.toUpperCase()] ?? 99;
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
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search champions…"
          className="max-w-xs"
        />
        <div className="flex gap-1.5">
          {(Object.keys(sortLabels) as SortMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setSort(mode)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors border",
                sort === mode
                  ? "text-[#0A0E21] bg-[#C9082A] border-[#C9082A]"
                  : "text-[#7B7F9E] bg-white/5 border-white/10 hover:text-white hover:border-[#C9082A]/50"
              )}
            >
              {sortLabels[mode]}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
        {filtered.length} champions &middot; {guideCount} guides
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-[#7B7F9E] text-center py-16 text-sm">
          {search ? `No champions match "${search}"` : "No champions loaded."}
        </p>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
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
