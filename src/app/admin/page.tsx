import Link from "next/link";
import { getMongoClient } from "@/lib/mongo";
import { Swords, BookOpen, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your content</p>
        </div>
        <AdminLogout />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="text-center py-2">
            <div className="text-2xl font-bold text-primary">{stats.matchupCount}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Matchups</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-2">
            <div className="text-2xl font-bold text-accent-gold">{stats.guideCount}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Guides</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-2">
            <div className="text-2xl font-bold text-accent-cyan">{stats.mechanicsCount}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Mechanics</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/admin/matchups">
            <Card className="transition-colors hover:bg-muted/30">
              <CardContent className="flex items-center gap-3">
                <Swords className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <div className="font-semibold text-sm">Manage Matchups</div>
                  <div className="text-xs text-muted-foreground">View, edit, and create guides</div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/matchups/new">
            <Card className="transition-colors hover:bg-muted/30">
              <CardContent className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-accent-gold shrink-0" />
                <div>
                  <div className="font-semibold text-sm">New Matchup</div>
                  <div className="text-xs text-muted-foreground">Create a new matchup guide</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
