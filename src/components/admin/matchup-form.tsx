"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";

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

interface MatchupFormProps {
  initialData?: MatchupFormData;
  mode: "create" | "edit";
  matchupId?: string;
}

const difficulties = ["EASY", "SKILL", "HARD"];

export function MatchupForm({ initialData, mode, matchupId }: MatchupFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiKey = document.cookie
        .split("; ")
        .find((c) => c.startsWith("llabdul_admin_session="));

      const body = {
        enemyChampion: data.enemyChampion,
        champion: data.champion,
        difficulty: data.difficulty,
        early: data.early,
        mid: data.mid,
        late: data.late || undefined,
        videos: data.videos
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean),
        summonerSpells: data.summonerSpells
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const url =
        mode === "edit"
          ? `/api/matchup?enemyChampion=${encodeURIComponent(data.enemyChampion)}`
          : "/api/matchup";

      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.NEXT_PUBLIC_ADMIN_API_KEY || "",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/admin/matchups");
        router.refresh();
      } else {
        const result = await res.json();
        setError(result.message || "Failed to save matchup");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      <div className="flex items-center gap-3 animate-in-up">
        <Link
          href="/admin/matchups"
          className="text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-display font-bold tracking-wide">
          {mode === "create" ? "New Matchup Guide" : "Edit Matchup Guide"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 animate-in-up" style={{ animationDelay: "0.1s" }}>
        {/* Champion + Enemy */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-display font-semibold uppercase tracking-wider text-foreground-muted">
              Your Champion
            </label>
            <select
              value={data.champion}
              onChange={(e) => update("champion", e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground text-sm focus:outline-none focus:border-accent-purple/50"
            >
              <option value="Yasuo">Yasuo</option>
              <option value="Yone">Yone</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-display font-semibold uppercase tracking-wider text-foreground-muted">
              Enemy Champion
            </label>
            <input
              type="text"
              value={data.enemyChampion}
              onChange={(e) => update("enemyChampion", e.target.value)}
              placeholder="e.g. Zed"
              required
              disabled={mode === "edit"}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-foreground-subtle text-sm focus:outline-none focus:border-accent-purple/50 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <label className="text-xs font-display font-semibold uppercase tracking-wider text-foreground-muted">
            Difficulty
          </label>
          <div className="flex gap-2">
            {difficulties.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => update("difficulty", d)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  data.difficulty === d
                    ? d === "EASY"
                      ? "bg-difficulty-easy/20 text-difficulty-easy border-difficulty-easy/30"
                      : d === "SKILL"
                      ? "bg-difficulty-skill/20 text-difficulty-skill border-difficulty-skill/30"
                      : "bg-difficulty-hard/20 text-difficulty-hard border-difficulty-hard/30"
                    : "bg-surface border-border text-foreground-muted hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Strategy phases */}
        {(["early", "mid", "late"] as const).map((phase) => (
          <div key={phase} className="space-y-2">
            <label className="text-xs font-display font-semibold uppercase tracking-wider text-foreground-muted">
              {phase === "early" ? "Early Game" : phase === "mid" ? "Mid Game" : "Late Game (optional)"}
            </label>
            <textarea
              value={data[phase]}
              onChange={(e) => update(phase, e.target.value)}
              placeholder={`Strategy for ${phase} game...`}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-foreground-subtle text-sm focus:outline-none focus:border-accent-purple/50 resize-y"
            />
          </div>
        ))}

        {/* Summoner Spells */}
        <div className="space-y-2">
          <label className="text-xs font-display font-semibold uppercase tracking-wider text-foreground-muted">
            Summoner Spells (comma-separated)
          </label>
          <input
            type="text"
            value={data.summonerSpells}
            onChange={(e) => update("summonerSpells", e.target.value)}
            placeholder="Flash, Ignite"
            className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-foreground-subtle text-sm focus:outline-none focus:border-accent-purple/50"
          />
        </div>

        {/* Videos */}
        <div className="space-y-2">
          <label className="text-xs font-display font-semibold uppercase tracking-wider text-foreground-muted">
            Video URLs (one per line)
          </label>
          <textarea
            value={data.videos}
            onChange={(e) => update("videos", e.target.value)}
            placeholder={"https://youtube.com/watch?v=...\nhttps://youtube.com/watch?v=..."}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-foreground-subtle text-sm focus:outline-none focus:border-accent-purple/50 resize-y"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-difficulty-hard p-3 rounded-lg bg-difficulty-hard/10 border border-difficulty-hard/20">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !data.enemyChampion}
          className="w-full py-3 rounded-lg bg-accent-purple text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow-purple"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {mode === "create" ? "Create Matchup" : "Save Changes"}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
