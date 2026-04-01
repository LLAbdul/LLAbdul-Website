import { getMongoClient } from "./mongo";
import { getChampion } from "./riot-api";
import type { Champion } from "./types";

const DB_NAME = "league_coaching_website";

export interface MatchupListItem {
  enemyChampion: string;
  champion: string;
  difficulty: string;
  enemyIcon: string;
}

export interface MatchupDetail {
  _id: string;
  enemyChampion: string;
  champion: Champion;
  difficulty: string;
  early: string;
  mid: string;
  late?: string;
  videos: string[];
  runes: any[];
  startItems: any[];
  build: any[];
  summonerSpells: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Fetch all matchups with enemy champion icons for the grid view.
 */
export async function getAllMatchups(): Promise<MatchupListItem[]> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  const collection = db.collection("matchups");

  const docs = await collection.find({}).toArray();

  const matchups = await Promise.all(
    docs.map(async (doc) => {
      let enemyIcon = "";
      try {
        const enemyChamp = await getChampion(doc.enemyChampion);
        enemyIcon = enemyChamp.icon;
      } catch {
        // fallback: no icon
      }

      return {
        enemyChampion: doc.enemyChampion as string,
        champion: doc.champion as string,
        difficulty: doc.difficulty as string,
        enemyIcon,
      };
    })
  );

  return matchups;
}

/**
 * Fetch a single matchup by enemy champion name with full details.
 */
export async function getMatchup(enemyChampion: string): Promise<MatchupDetail | null> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  const collection = db.collection("matchups");

  const doc = await collection.findOne({ enemyChampion });
  if (!doc) return null;

  let champion: Champion = { icon: "", title: "", name: doc.champion as string, alias: doc.champion as string };
  try {
    champion = await getChampion(doc.champion as string);
  } catch {
    // fallback
  }

  return {
    _id: doc._id.toString(),
    enemyChampion: doc.enemyChampion as string,
    champion,
    difficulty: doc.difficulty as string,
    early: (doc.early as string) || "",
    mid: (doc.mid as string) || "",
    late: (doc.late as string) || undefined,
    videos: (doc.videos as string[]) || [],
    runes: (doc.runes as any[]) || [],
    startItems: (doc.startItems as any[]) || [],
    build: (doc.build as any[]) || [],
    summonerSpells: (doc.summonerSpells as string[]) || [],
    createdAt: doc.createdAt?.toString(),
    updatedAt: doc.updatedAt?.toString(),
  };
}
