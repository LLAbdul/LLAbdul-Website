import { getMongoClient } from "./mongo";
import { getChampion, getChampions, getItems, getSummonerSpells } from "./riot-api";
import { resolveRunePage, type ResolvedRunePage } from "./rune-trees";
import type { Champion } from "./types";

const DB_NAME = "league_coaching_website";

export interface MatchupListItem {
  enemyChampion: string;
  champion: string;
  difficulty: string;
  enemyIcon: string;
}

export interface BuildItem {
  id?: number;
  icon?: string;
  name: string;
  description?: string;
  price?: number;
}

export interface ResolvedSpell {
  icon: string;
  name: string;
  description?: string;
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
  runes: ResolvedRunePage | null;
  startItems: BuildItem[];
  build: BuildItem[];
  summonerSpells: ResolvedSpell[];
  createdAt?: string;
  updatedAt?: string;
}

function toArray(val: any): any[] {
  if (Array.isArray(val)) return val;
  if (!val || typeof val !== "object" || Object.keys(val).length === 0) return [];
  return [val];
}

async function resolveItemIcons(items: any[]): Promise<BuildItem[]> {
  if (!items || items.length === 0) return [];
  try {
    const allItems = await getItems();
    return items.map((item) => {
      const name = typeof item === "string" ? item : item.name;
      if (!name) return { name: "Unknown", icon: "" };
      const match = allItems.find(
        (i) => i.name.toLowerCase().replace(/[\s']/g, "") === name.toLowerCase().replace(/[\s']/g, "")
      );
      return {
        id: match?.id || item.id,
        icon: match?.icon || "",
        name: match?.name || name,
        description: match?.description || item.description,
        price: match?.price || item.price,
      };
    });
  } catch {
    return items.map((item) => ({
      name: typeof item === "string" ? item : item.name || "Unknown",
      icon: "",
    }));
  }
}

async function resolveSpellIcons(names: string[]): Promise<ResolvedSpell[]> {
  try {
    const allSpells = await getSummonerSpells();
    return names.map((name) => {
      const match = allSpells.find(
        (s) => s.name.toLowerCase() === name.toLowerCase()
      );
      return { 
        icon: match?.icon || "", 
        name,
        description: match?.description || "",
      };
    });
  } catch {
    return names.map((name) => ({ icon: "", name }));
  }
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
      } catch {}
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
    icon: "", title: "", name: doc.champion as string, alias: doc.champion as string,
  };
  try { champion = await getChampion(doc.champion as string); } catch {}

  const spellNames = toArray(doc.summonerSpells);

  const rawStartItems = toArray(doc.startItems);
  const rawBuild = toArray(doc.build);

  const [runes, summonerSpells, startItems, build] = await Promise.all([
    resolveRunePage(doc.runes),
    resolveSpellIcons(spellNames),
    resolveItemIcons(rawStartItems),
    resolveItemIcons(rawBuild),
  ]);

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
    startItems,
    build,
    summonerSpells,
    createdAt: doc.createdAt?.toString(),
    updatedAt: doc.updatedAt?.toString(),
  };
}

/**
 * Get all champions with matchup status for the grid view.
 * Shows every champion, with difficulty info for ones that have guides.
 */
export async function getAllChampionsWithMatchups(): Promise<MatchupListItem[]> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);

  const [allChamps, matchupDocs] = await Promise.all([
    getChampions(),
    db.collection("matchups").find({}).toArray(),
  ]);

  // Build lookup of matchups by enemy champion name
  const matchupMap = new Map<string, string>();
  for (const doc of matchupDocs) {
    matchupMap.set((doc.enemyChampion as string).toLowerCase(), doc.difficulty as string);
  }

  return allChamps.map((champ) => ({
    enemyChampion: champ.name,
    champion: "Yasuo",
    difficulty: matchupMap.get(champ.name.toLowerCase()) || "",
    enemyIcon: champ.icon,
  }));
}

export async function getMatchupCount(): Promise<number> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  return db.collection("matchups").countDocuments();
}

// ── Guide types and fetchers ─────────────────────────────────────

export interface GuideDetail {
  _id: string;
  champion: string;
  early: string;
  mid: string;
  late: string;
  videos: string[];
}

export interface MechanicsGuide {
  _id: string;
  champion: string;
  title: string;
  description: string;
  difficulty: "BASIC" | "ADVANCED" | "EXPERT";
  videos: string[];
}

export async function getGuide(champion: string): Promise<GuideDetail | null> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  const doc = await db.collection("guides").findOne({
    champion: { $regex: new RegExp(`^${champion}$`, "i") },
  });
  if (!doc) return null;
  return {
    _id: doc._id.toString(),
    champion: doc.champion as string,
    early: (doc.early as string) || "",
    mid: (doc.mid as string) || "",
    late: (doc.late as string) || "",
    videos: toArray(doc.videos),
  };
}

export async function getMechanics(champion: string): Promise<MechanicsGuide[]> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  const docs = await db.collection("mechanics").find({
    champion: { $regex: new RegExp(`^${champion}$`, "i") },
  }).toArray();
  return docs.map((doc) => ({
    _id: doc._id.toString(),
    champion: doc.champion as string,
    title: (doc.title as string) || "",
    description: (doc.description as string) || "",
    difficulty: (doc.difficulty as "BASIC" | "ADVANCED" | "EXPERT") || "BASIC",
    videos: toArray(doc.videos),
  }));
}
