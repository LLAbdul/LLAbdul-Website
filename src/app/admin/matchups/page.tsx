import Link from "next/link";
import { getMongoClient } from "@/lib/mongo";
import { Plus, ArrowLeft, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DifficultyBadge } from "@/components/shared/difficulty-badge";

async function getAllMatchupsAdmin() {
  const client = await getMongoClient();
  const db = client.db("league_coaching_website");
  const docs = await db
    .collection("matchups")
    .find({})
    .sort({ updatedAt: -1 })
    .toArray();
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
          <Link
            href="/admin"
            className="flex items-center justify-center w-8 h-8 rounded-md text-[#7B7F9E] hover:text-[#E8E8ED] hover:bg-[#1A2340] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
              Admin
            </p>
            <h1 className="text-xl font-bold text-[#E8E8ED]">Matchup Guides</h1>
          </div>
        </div>
        <Link
          href="/admin/matchups/new"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
          style={{ background: "#B87FD8", color: "#0A0E21" }}
        >
          <Plus className="w-4 h-4" />
          New
        </Link>
      </div>

      {matchups.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-[#7B7F9E] text-sm">No matchup guides yet.</p>
            <Link
              href="/admin/matchups/new"
              className="text-sm text-[#B87FD8] font-medium mt-3 inline-block hover:underline"
            >
              Create your first guide
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-1.5">
          {matchups.map((m) => (
            <Card key={m._id}>
              <CardContent className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-[#E8E8ED]">
                      {m.champion} vs {m.enemyChampion}
                    </div>
                    <div className="text-xs text-[#7B7F9E]">Updated {m.updatedAt}</div>
                  </div>
                  <DifficultyBadge difficulty={m.difficulty} />
                </div>
                <Link
                  href={`/admin/matchups/${m._id}/edit`}
                  className="flex items-center justify-center w-8 h-8 rounded-md text-[#7B7F9E] hover:text-[#E8E8ED] hover:bg-[#1A2340] transition-colors shrink-0 ml-2"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
