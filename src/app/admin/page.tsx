import Link from "next/link";
import { getMongoClient } from "@/lib/mongo";
import { Swords, BookOpen, Plus, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminLogout } from "@/components/admin/admin-logout";

async function getStats() {
  const client = await getMongoClient();
  const db = client.db("league_coaching_website");
  const [matchupCount, guideCount, mechanicsCount] = await Promise.all([
    db.collection("matchups").countDocuments(),
    db.collection("guides").countDocuments(),
    db.collection("mechanics").countDocuments(),
  ]);
  return { matchupCount, guideCount, mechanicsCount };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="max-w-4xl space-y-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mb-1">
            Admin
          </p>
          <h1 className="font-serif text-2xl font-bold text-white">Dashboard</h1>
        </div>
        <AdminLogout />
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
          Content Stats
        </p>
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="text-center py-4">
              <div className="text-2xl font-bold text-[#B87FD8]">{stats.matchupCount}</div>
              <div className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mt-1">
                Matchups
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="text-center py-4">
              <div className="text-2xl font-bold text-[#0AC8B9]">{stats.guideCount}</div>
              <div className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mt-1">
                Guides
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="text-center py-4">
              <div className="text-2xl font-bold text-[#E8E8ED]">{stats.mechanicsCount}</div>
              <div className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mt-1">
                Mechanics
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
          Quick Actions
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/admin/matchups" className="group">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 transition-colors hover:bg-white/10">
              <CardContent className="flex items-center gap-3 py-4">
                <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ background: "rgba(200,170,110,0.10)", color: "#C8AA6E" }}>
                  <Swords className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">Manage Matchups</div>
                  <div className="text-xs text-[#7B7F9E]">View, edit, and delete guides</div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/matchups/new" className="group">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 transition-colors hover:bg-white/10">
              <CardContent className="flex items-center gap-3 py-4">
                <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ background: "rgba(10,200,185,0.10)", color: "#0AC8B9" }}>
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">New Matchup</div>
                  <div className="text-xs text-[#7B7F9E]">Create a new matchup guide</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
