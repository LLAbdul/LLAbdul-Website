"use client";

import { useState, useTransition } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createMatchup, updateMatchup } from "@/app/admin/actions";

interface MatchupFormData {
  enemyChampion: string;
  champion: string;
  difficulty: string;
  early: string;
  mid: string;
  late: string;
  videos: string;
  summonerSpells: string;
}

const difficulties = ["EASY", "SKILL", "HARD"] as const;

const difficultyColors: Record<string, { active: React.CSSProperties; idle: React.CSSProperties }> = {
  EASY: {
    active: { background: "rgba(39,174,96,0.15)", color: "#27AE60", borderColor: "rgba(39,174,96,0.40)" },
    idle: { background: "transparent", color: "#7B7F9E", borderColor: "#1E2A4A" },
  },
  SKILL: {
    active: { background: "rgba(200,170,110,0.15)", color: "#C8AA6E", borderColor: "rgba(200,170,110,0.40)" },
    idle: { background: "transparent", color: "#7B7F9E", borderColor: "#1E2A4A" },
  },
  HARD: {
    active: { background: "rgba(231,76,60,0.15)", color: "#E74C3C", borderColor: "rgba(231,76,60,0.40)" },
    idle: { background: "transparent", color: "#7B7F9E", borderColor: "#1E2A4A" },
  },
};

export function MatchupForm({
  initialData,
  mode,
}: {
  initialData?: MatchupFormData;
  mode: "create" | "edit";
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [data, setData] = useState<MatchupFormData>(
    initialData || {
      enemyChampion: "",
      champion: "Yasuo",
      difficulty: "SKILL",
      early: "",
      mid: "",
      late: "",
      videos: "",
      summonerSpells: "Flash, Ignite",
    }
  );

  function update(field: keyof MatchupFormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const videos = data.videos
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean);
    const summonerSpells = data.summonerSpells
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    startTransition(async () => {
      try {
        const result =
          mode === "create"
            ? await createMatchup({
                ...data,
                late: data.late || undefined,
                videos,
                summonerSpells,
              })
            : await updateMatchup(data.enemyChampion, {
                difficulty: data.difficulty,
                early: data.early,
                mid: data.mid,
                late: data.late || undefined,
                videos,
                summonerSpells,
              });
        if (result?.error) setError(result.error);
      } catch (err: any) {
        if (err?.message !== "NEXT_REDIRECT") setError("Something went wrong.");
      }
    });
  }

  const inputClass =
    "w-full px-3 py-2 rounded-md text-sm text-white placeholder:text-[#7B7F9E] bg-white/5 border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#C9082A] focus:border-[#C9082A] transition-colors";

  return (
    <div className="max-w-2xl space-y-6 py-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/matchups"
          className="flex items-center justify-center w-8 h-8 rounded-md text-[#7B7F9E] hover:text-white hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
            Admin
          </p>
          <h1 className="font-serif text-2xl font-bold text-white">
            {mode === "create" ? "New Matchup" : "Edit Matchup"}
          </h1>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champion + Enemy */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
                  Champion
                </label>
                <select
                  value={data.champion}
                  onChange={(e) => update("champion", e.target.value)}
                  className={inputClass}
                >
                  <option value="Yasuo">Yasuo</option>
                  <option value="Yone">Yone</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
                  Enemy Champion
                </label>
                <input
                  type="text"
                  value={data.enemyChampion}
                  onChange={(e) => update("enemyChampion", e.target.value)}
                  placeholder="e.g. Zed"
                  required
                  disabled={mode === "edit"}
                  className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                />
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
                Difficulty
              </label>
              <div className="flex gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => update("difficulty", d)}
                    className="px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-widest border transition-colors"
                    style={
                      data.difficulty === d
                        ? difficultyColors[d].active
                        : difficultyColors[d].idle
                    }
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Phase strategy */}
            {(["early", "mid", "late"] as const).map((phase) => (
              <div key={phase} className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
                  {phase === "early" ? "Early Game" : phase === "mid" ? "Mid Game" : "Late Game"}
                  {phase === "late" ? " (optional)" : ""}
                </label>
                <textarea
                  value={data[phase]}
                  onChange={(e) => update(phase, e.target.value)}
                  placeholder="Strategy notes…"
                  rows={3}
                  className={`${inputClass} resize-y`}
                />
              </div>
            ))}

            {/* Summoner spells */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
                Summoner Spells
              </label>
              <input
                type="text"
                value={data.summonerSpells}
                onChange={(e) => update("summonerSpells", e.target.value)}
                placeholder="Flash, Ignite"
                className={inputClass}
              />
            </div>

            {/* Videos */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
                Video URLs (one per line)
              </label>
              <textarea
                value={data.videos}
                onChange={(e) => update("videos", e.target.value)}
                placeholder="https://youtube.com/watch?v=…"
                rows={3}
                className={`${inputClass} resize-y`}
              />
            </div>

            {error && <p className="text-sm text-[#E74C3C]">{error}</p>}

            <Button
              type="submit"
              disabled={isPending || !data.enemyChampion}
              className="w-full bg-[#C9082A] text-white hover:bg-[#C9082A]/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving…
                </>
              ) : mode === "create" ? (
                "Create Matchup"
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
