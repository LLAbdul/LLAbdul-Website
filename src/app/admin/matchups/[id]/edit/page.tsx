import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongo";
import { MatchupForm } from "@/components/admin/matchup-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getMatchupById(id: string) {
  const client = await getMongoClient();
  const db = client.db("league_coaching_website");

  try {
    const doc = await db.collection("matchups").findOne({ _id: new ObjectId(id) });
    if (!doc) return null;

    return {
      enemyChampion: doc.enemyChampion as string,
      champion: doc.champion as string,
      difficulty: doc.difficulty as string,
      early: (doc.early as string) || "",
      mid: (doc.mid as string) || "",
      late: (doc.late as string) || "",
      videos: Array.isArray(doc.videos) ? (doc.videos as string[]).join("\n") : "",
      summonerSpells: Array.isArray(doc.summonerSpells)
        ? (doc.summonerSpells as string[]).join(", ")
        : "",
    };
  } catch {
    return null;
  }
}

export default async function EditMatchupPage({ params }: PageProps) {
  const { id } = await params;
  const matchup = await getMatchupById(id);

  if (!matchup) {
    notFound();
  }

  return <MatchupForm mode="edit" initialData={matchup} />;
}
