"use client";

import { useState, useTransition } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const difficulties = ["EASY", "SKILL", "HARD"];

export function MatchupForm({ initialData, mode }: { initialData?: MatchupFormData; mode: "create" | "edit" }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [data, setData] = useState<MatchupFormData>(
    initialData || { enemyChampion: "", champion: "Yasuo", difficulty: "SKILL", early: "", mid: "", late: "", videos: "", summonerSpells: "Flash, Ignite" }
  );

  function update(field: keyof MatchupFormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const videos = data.videos.split("\n").map((v) => v.trim()).filter(Boolean);
    const summonerSpells = data.summonerSpells.split(",").map((s) => s.trim()).filter(Boolean);

    startTransition(async () => {
      try {
        const result = mode === "create"
          ? await createMatchup({ ...data, late: data.late || undefined, videos, summonerSpells })
          : await updateMatchup(data.enemyChampion, { difficulty: data.difficulty, early: data.early, mid: data.mid, late: data.late || undefined, videos, summonerSpells });
        if (result?.error) setError(result.error);
      } catch (err: any) {
        if (err?.message !== "NEXT_REDIRECT") setError("Something went wrong.");
      }
    });
  }

  const inputClass = "w-full px-3 py-2 rounded-md bg-background text-foreground text-sm border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring";

  return (
    <div className="max-w-2xl space-y-6 py-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/matchups" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold">{mode === "create" ? "New Matchup" : "Edit Matchup"}</h1>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Champion</label>
                <select value={data.champion} onChange={(e) => update("champion", e.target.value)} className={inputClass}>
                  <option value="Yasuo">Yasuo</option>
                  <option value="Yone">Yone</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Enemy</label>
                <input type="text" value={data.enemyChampion} onChange={(e) => update("enemyChampion", e.target.value)} placeholder="e.g. Zed" required disabled={mode === "edit"} className={`${inputClass} disabled:opacity-50`} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Difficulty</label>
              <div className="flex gap-2">
                {difficulties.map((d) => (
                  <Button key={d} type="button" variant={data.difficulty === d ? "default" : "outline"} size="sm" onClick={() => update("difficulty", d)}>
                    {d}
                  </Button>
                ))}
              </div>
            </div>

            {(["early", "mid", "late"] as const).map((phase) => (
              <div key={phase} className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {phase.charAt(0).toUpperCase() + phase.slice(1)} Game{phase === "late" ? " (optional)" : ""}
                </label>
                <textarea value={data[phase]} onChange={(e) => update(phase, e.target.value)} placeholder={`Strategy...`} rows={3} className={`${inputClass} resize-y`} />
              </div>
            ))}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Summoner Spells</label>
              <input type="text" value={data.summonerSpells} onChange={(e) => update("summonerSpells", e.target.value)} placeholder="Flash, Ignite" className={inputClass} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Video URLs (one per line)</label>
              <textarea value={data.videos} onChange={(e) => update("videos", e.target.value)} placeholder="https://youtube.com/watch?v=..." rows={3} className={`${inputClass} resize-y`} />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={isPending || !data.enemyChampion} className="w-full">
              {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</> : mode === "create" ? "Create Matchup" : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
