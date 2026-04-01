import { getMongoClient } from "./mongo";
import { getChampion, getRune, getSummonerSpells } from "./riot-api";
import type { Champion, SummonerSpell } from "./types";

const DB_NAME = "league_coaching_website";

export interface MatchupListItem {
  enemyChampion: string;
  champion: string;
  difficulty: string;
  enemyIcon: string;
}

export interface ResolvedRune {
  icon: string;
  name: string;
  tree?: string;
}

export interface ResolvedRuneSetup {
  primary: ResolvedRune[];
  secondary: ResolvedRune[];
  shards: string[];
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
  runes: ResolvedRuneSetup | null;
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

function isRuneSetup(val: any): boolean {
  return val && !Array.isArray(val) && typeof val === "object" && ("primary" in val || "secondary" in val);
}

async function resolveRuneIcon(name: string): Promise<ResolvedRune> {
  try {
    const rune = await getRune(name);
    return { icon: rune.icon, name: rune.name, tree: rune.tree };
  } catch {
    return { icon: "", name };
  }
}

async function resolveSpellIcons(names: string[]): Promise<ResolvedSpell[]> {
  try {
    const allSpells = await getSummonerSpells();
    return names.map((name) => {
      const match = allSpells.find(
        (s) => s.name.toLowerCase() === name.toLowerCase()
      );
      return { icon: match?.icon || "", name };
    });
  } catch {
    return names.map((name) => ({ icon: "", name }));
  }
}

async function resolveRunes(raw: any): Promise<ResolvedRuneSetup | null> {
  if (!raw) return null;

  // Format 1: { primary: string[], secondary: string[], shards: string[] }
  if (isRuneSetup(raw)) {
    const primaryNames: string[] = raw.primary || [];
    const secondaryNames: string[] = raw.secondary || [];
    const shards: string[] = raw.shards || [];

    const [primary, secondary] = await Promise.all([
      Promise.all(primaryNames.map(resolveRuneIcon)),
      Promise.all(secondaryNames.map(resolveRuneIcon)),
    ]);

    return { primary, secondary, shards };
  }

  // Format 2: RuneItem[] with icon already present
  if (Array.isArray(raw) && raw.length > 0) {
    const runes = raw as { icon?: string; name: string; tree?: string }[];
    // Group by tree if possible
    const trees = new Map<string, ResolvedRune[]>();
    for (const r of runes) {
      const tree = r.tree || "Primary";
      if (!trees.has(tree)) trees.set(tree, []);
      trees.get(tree)!.push({ icon: r.icon || "", name: r.name, tree: r.tree });
    }
    const groups = [...trees.values()];
    return {
      primary: groups[0] || [],
      secondary: groups[1] || [],
      shards: [],
    };
  }

  return null;
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

  const [runes, summonerSpells] = await Promise.all([
    resolveRunes(doc.runes),
    resolveSpellIcons(spellNames),
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
    startItems: toArray(doc.startItems),
    build: toArray(doc.build),
    summonerSpells,
    createdAt: doc.createdAt?.toString(),
    updatedAt: doc.updatedAt?.toString(),
  };
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
