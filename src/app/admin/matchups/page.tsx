import Link from "next/link";
import { getMongoClient } from "@/lib/mongo";
import { Plus, ArrowLeft, Pencil } from "lucide-react";
import { DifficultyBadge } from "@/components/shared/difficulty-badge";

async function getAllMatchupsAdmin() {
  const client = await getMongoClient();
  const db = client.db("league_coaching_website");
  const docs = await db.collection("matchups").find({}).sort({ updatedAt: -1 }).toArray();
  return docs.map((d) => ({
    _id: d._id.toString(),
    enemyChampion: d.enemyChampion as string,
    champion: d.champion as string,
    difficulty: d.difficulty as string,
    updatedAt: d.updatedAt ? new Date(d.updatedAt).toLocaleDateString() : "N/A",
  }));
}

export default async function AdminMatchupsPage() {
  const matchups = await getAllMatchupsAdmin();

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="flex items-center justify-between animate-in-up">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-display font-bold tracking-wide">Matchup Guides</h1>
        </div>
        <Link
          href="/admin/matchups/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-purple text-white text-sm font-medium hover:opacity-90 transition-opacity glow-purple"
        >
          <Plus className="w-4 h-4" />
          New Matchup
        </Link>
      </div>

      {matchups.length === 0 ? (
        <div className="p-8 rounded-xl bg-surface border border-border text-center animate-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-foreground-muted">No matchup guides yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-2 animate-in-up" style={{ animationDelay: "0.1s" }}>
          {matchups.map((m) => (
            <div
              key={m._id}
              className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border hover:border-border transition-colors"
            >
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-medium text-sm">
                    {m.champion} vs {m.enemyChampion}
                  </div>
                  <div className="text-xs text-foreground-subtle mt-0.5">
                    Updated {m.updatedAt}
                  </div>
                </div>
                <DifficultyBadge difficulty={m.difficulty} />
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/matchups/${m._id}/edit`}
                  className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
