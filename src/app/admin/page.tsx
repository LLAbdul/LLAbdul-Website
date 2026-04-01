import Link from "next/link";
import { getMongoClient } from "@/lib/mongo";
import { Shield, Swords, BookOpen, Plus, LogOut } from "lucide-react";
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
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex items-center justify-between animate-in-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold tracking-wide">Admin Dashboard</h1>
            <p className="text-sm text-foreground-muted">Manage your content</p>
          </div>
        </div>
        <AdminLogout />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 animate-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="p-5 rounded-xl bg-surface border border-border text-center">
          <Swords className="w-5 h-5 text-accent-purple mx-auto mb-2" />
          <div className="text-2xl font-display font-bold text-accent-purple">{stats.matchupCount}</div>
          <div className="text-xs text-foreground-subtle uppercase tracking-wider mt-1">Matchups</div>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-border text-center">
          <BookOpen className="w-5 h-5 text-accent-gold mx-auto mb-2" />
          <div className="text-2xl font-display font-bold text-accent-gold">{stats.guideCount}</div>
          <div className="text-xs text-foreground-subtle uppercase tracking-wider mt-1">Guides</div>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-border text-center">
          <Swords className="w-5 h-5 text-accent-cyan mx-auto mb-2" />
          <div className="text-2xl font-display font-bold text-accent-cyan">{stats.mechanicsCount}</div>
          <div className="text-xs text-foreground-subtle uppercase tracking-wider mt-1">Mechanics</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="space-y-4 animate-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="section-heading text-sm text-foreground-muted tracking-widest">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/admin/matchups"
            className="game-card p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center shrink-0">
              <Swords className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Manage Matchups</h3>
              <p className="text-xs text-foreground-muted mt-0.5">View, edit, and create matchup guides</p>
            </div>
          </Link>
          <Link
            href="/admin/matchups/new"
            className="game-card p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h3 className="font-display font-semibold">New Matchup</h3>
              <p className="text-xs text-foreground-muted mt-0.5">Create a new matchup guide</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
