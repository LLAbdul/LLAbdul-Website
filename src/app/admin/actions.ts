"use server";

import { getMongoClient } from "@/lib/mongo";
import { isAuthenticated } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DB_NAME = "league_coaching_website";

export async function createMatchup(formData: {
  enemyChampion: string;
  champion: string;
  difficulty: string;
  early: string;
  mid: string;
  late?: string;
  videos: string[];
  summonerSpells: string[];
}) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error("Unauthorized");

  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  const collection = db.collection("matchups");

  const existing = await collection.findOne({
    enemyChampion: formData.enemyChampion,
  });
  if (existing) {
    return { error: `Matchup for "${formData.enemyChampion}" already exists.` };
  }

  await collection.insertOne({
    ...formData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath("/matchups");
  revalidatePath("/admin/matchups");
  redirect("/admin/matchups");
}

export async function updateMatchup(
  enemyChampion: string,
  formData: {
    difficulty?: string;
    early?: string;
    mid?: string;
    late?: string;
    videos?: string[];
    summonerSpells?: string[];
  }
) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error("Unauthorized");

  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  const collection = db.collection("matchups");

  const result = await collection.updateOne(
    { enemyChampion },
    { $set: { ...formData, updatedAt: new Date() } }
  );

  if (result.matchedCount === 0) {
    return { error: `Matchup for "${enemyChampion}" not found.` };
  }

  revalidatePath("/matchups");
  revalidatePath(`/matchups/${enemyChampion}`);
  revalidatePath("/admin/matchups");
  redirect("/admin/matchups");
}

export async function deleteMatchup(enemyChampion: string) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error("Unauthorized");

  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  await db.collection("matchups").deleteOne({ enemyChampion });

  revalidatePath("/matchups");
  revalidatePath("/admin/matchups");
  redirect("/admin/matchups");
}
