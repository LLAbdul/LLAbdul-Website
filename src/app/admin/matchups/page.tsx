import Link from "next/link";
import { getMongoClient } from "@/lib/mongo";
import { Plus, ArrowLeft, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="max-w-4xl space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Matchup Guides</h1>
        </div>
        <Link
          href="/admin/matchups/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
        >
          <Plus className="w-4 h-4" /> New
        </Link>
      </div>

      {matchups.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground text-sm">No matchup guides yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {matchups.map((m) => (
            <Card key={m._id}>
              <CardContent className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-sm">{m.champion} vs {m.enemyChampion}</div>
                    <div className="text-xs text-muted-foreground">Updated {m.updatedAt}</div>
                  </div>
                  <DifficultyBadge difficulty={m.difficulty} />
                </div>
                <Link
                  href={`/admin/matchups/${m._id}/edit`}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
