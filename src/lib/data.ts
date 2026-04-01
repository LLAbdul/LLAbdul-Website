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

export interface RuneItem {
  icon?: string;
  name: string;
  description?: string;
  tree?: string;
}

export interface RuneSetup {
  primary: string[];
  secondary: string[];
  shards: string[];
}

export interface BuildItem {
  id?: number;
  icon?: string;
  name: string;
  description?: string;
  price?: number;
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
  runes: RuneItem[] | RuneSetup | null;
  startItems: BuildItem[];
  build: BuildItem[];
  summonerSpells: string[];
  createdAt?: string;
  updatedAt?: string;
}

function toArray(val: any): any[] {
  if (Array.isArray(val)) return val;
  if (!val || typeof val !== "object" || Object.keys(val).length === 0) return [];
  return [val];
}

function isRuneSetup(val: any): val is RuneSetup {
  return val && !Array.isArray(val) && typeof val === "object" && ("primary" in val || "secondary" in val);
}

export async function getAllMatchups(): Promise<MatchupListItem[]> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  const docs = await db.collection("matchups").find({}).toArray();

  const matchups = await Promise.all(
    docs.map(async (doc) => {
      let enemyIcon = "";
      try {
        const enemyChamp = await getChampion(doc.enemyChampion);
        enemyIcon = enemyChamp.icon;
      } catch {
        // no icon available
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

export async function getMatchup(enemyChampion: string): Promise<MatchupDetail | null> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  const doc = await db.collection("matchups").findOne({ enemyChampion });
  if (!doc) return null;

  let champion: Champion = {
    icon: "",
    title: "",
    name: doc.champion as string,
    alias: doc.champion as string,
  };
  try {
    champion = await getChampion(doc.champion as string);
  } catch {
    // fallback
  }

  // Handle runes: could be { primary, secondary, shards } or Rune[]
  let runes: RuneItem[] | RuneSetup | null = null;
  if (doc.runes) {
    if (isRuneSetup(doc.runes)) {
      runes = {
        primary: doc.runes.primary || [],
        secondary: doc.runes.secondary || [],
        shards: doc.runes.shards || [],
      };
    } else if (Array.isArray(doc.runes) && doc.runes.length > 0) {
      runes = doc.runes as RuneItem[];
    }
  }

  return {
    _id: doc._id.toString(),
    enemyChampion: doc.enemyChampion as string,
    champion,
    difficulty: doc.difficulty as string,
    early: (doc.early as string) || "",
    mid: (doc.mid as string) || "",
    late: doc.late ? (doc.late as string) : undefined,
    videos: toArray(doc.videos),
    runes,
    startItems: toArray(doc.startItems),
    build: toArray(doc.build),
    summonerSpells: toArray(doc.summonerSpells),
    createdAt: doc.createdAt?.toString(),
    updatedAt: doc.updatedAt?.toString(),
  };
}

export async function getMatchupCount(): Promise<number> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  return db.collection("matchups").countDocuments();
}
