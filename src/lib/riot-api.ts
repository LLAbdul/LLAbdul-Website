import { CommunityDragon } from "poro";
import type {
  Champion,
  Item,
  Rune,
  SummonerSpell,
  RawChampionData,
  RawItemData,
  RawRuneData,
  RawSummonerSpellData,
} from "./types";

const cdClient = new CommunityDragon("latest", "default");
const BASE_URL = "https://raw.communitydragon.org";

// ── Summoner Spells ──────────────────────────────────────────────

export async function getSummonerSpells(): Promise<SummonerSpell[]> {
  const resources = await getSummonerSpellsData();
  const filtered = resources.filter((spell) => spell.name !== "");
  const summonerSpells: SummonerSpell[] = await Promise.all(
    filtered.map(async (spell) => ({
      icon: await getSummonerSpellIcon(spell.name),
      name: spell.name,
      description: spell.description,
      cooldown: spell.cooldown,
    }))
  );
  return summonerSpells;
}

// ── Runes ────────────────────────────────────────────────────────

export async function getRunes(): Promise<Rune[]> {
  const resources = await getPerksData();
  const runes: Rune[] = await Promise.all(
    resources.map(async (rune) => {
      const treeName = getTreeName(rune.iconPath);
      return {
        icon: await getRuneIcon(rune.name),
        name: rune.name,
        description: rune.longDesc,
        tree: treeName,
      };
    })
  );
  return runes.filter((rune) => rune.tree !== "Not Found");
}

export async function getRunesFromTree(treeName: string): Promise<Rune[]> {
  const resources = await getRunes();
  return resources.filter(
    (rune) => rune.tree.toLowerCase() === treeName.toLowerCase()
  );
}

export async function getRune(runeName: string): Promise<Rune> {
  const runes = await getRunes();
  const normalized = runeName.replace(/\s+/g, "").toLowerCase();
  const rune = runes.find(
    (r) => r.name.replace(/\s+/g, "").toLowerCase() === normalized
  );
  if (!rune) throw new Error(`Rune with name "${runeName}" not found`);
  return rune;
}

export function getTreeName(iconPath: string): string {
  const filter = "RunesIcon.png";
  const pathParts = iconPath.split("/");
  const stylesIndex = pathParts.indexOf("Styles");
  if (stylesIndex !== -1 && pathParts[stylesIndex + 1] !== filter) {
    return pathParts[stylesIndex + 1];
  }
  return "Not Found";
}

// ── Champions ────────────────────────────────────────────────────

export async function getChampions(): Promise<Champion[]> {
  const resources = await getChampionSummary();
  const champions: Champion[] = await Promise.all(
    resources
      .filter((raw) => raw.alias !== "None")
      .map(async (raw) => ({
        icon: await getChampionIcon(raw.alias),
        title: raw.description,
        name: raw.name,
        alias: raw.alias,
      }))
  );
  return champions;
}

export async function getChampion(championAlias: string): Promise<Champion> {
  const resources = await getChampionSummary();
  const raw = resources.find(
    (c) => c.alias.toLowerCase() === championAlias.toLowerCase()
  );
  if (!raw) {
    throw new Error(`Champion with alias "${championAlias}" not found`);
  }

  // Fetch detailed champion data for abilities
  let abilities: Record<string, { name: string; icon: string; description?: string }> = {};
  try {
    const detailsRes = await fetch(`${BASE_URL}/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${raw.id}.json`);
    const detailsData = await detailsRes.json();
    
    // Add passive
    if (detailsData.passive) {
      abilities["P"] = {
        name: detailsData.passive.name,
        icon: BASE_URL + detailsData.passive.abilityIconPath.replace("/lol-game-data/assets", "/latest/plugins/rcp-be-lol-game-data/global/default").toLowerCase(),
        description: detailsData.passive.description || detailsData.passive.longDescription || "",
      };
    }
    
    // Add spells
    if (detailsData.spells) {
      detailsData.spells.forEach((spell: any) => {
        abilities[spell.spellKey.toUpperCase()] = {
          name: spell.name,
          icon: BASE_URL + spell.abilityIconPath.replace("/lol-game-data/assets", "/latest/plugins/rcp-be-lol-game-data/global/default").toLowerCase(),
          description: spell.description || spell.dynamicDescription || spell.tooltip || "",
        };
      });
    }
  } catch (error) {
    console.error(`Failed to fetch abilities for ${championAlias}:`, error);
  }

  return {
    icon: await getChampionIcon(raw.alias),
    title: raw.description,
    name: raw.name,
    alias: raw.alias,
    abilities: Object.keys(abilities).length > 0 ? abilities : undefined,
  };
}

// ── Items ────────────────────────────────────────────────────────

export function formatItemIcon(item: RawItemData): string {
  if (!item.iconPath) return "";
  const resourcePath = item.iconPath
    .replace(
      "/lol-game-data/assets",
      "/latest/plugins/rcp-be-lol-game-data/global/default"
    )
    .toLowerCase();
  return BASE_URL + resourcePath;
}

export async function getItems(): Promise<Item[]> {
  const resources = await getItemsData();
  const inStore = resources.filter((item) => item.inStore === true);
  return inStore.map((item) => ({
    id: item.id,
    icon: formatItemIcon(item),
    name: item.name,
    description: item.description,
    price: item.price,
  }));
}

export async function getItem(itemName: string): Promise<Item> {
  const items = await getItems();
  const normalized = itemName.replace(/[\s']/g, "").toLowerCase();
  const item = items.find(
    (i) => i.name.replace(/[\s']/g, "").toLowerCase() === normalized
  );
  if (!item) throw new Error(`Item with name "${itemName}" not found`);
  return item;
}

// ── Raw data fetchers ────────────────────────────────────────────

export async function getChampionSummary(): Promise<RawChampionData[]> {
  const resourceUrl = cdClient.meta("champion-summary" as any);
  const rawData = await fetch(resourceUrl);
  return (await rawData.json()) as RawChampionData[];
}

export async function getPerksData(): Promise<RawRuneData[]> {
  const resourceUrl = cdClient.meta("perks" as any);
  const rawData = await fetch(resourceUrl);
  return (await rawData.json()) as RawRuneData[];
}

export async function getItemsData(): Promise<RawItemData[]> {
  const resourceUrl = cdClient.meta("items" as any);
  const rawData = await fetch(resourceUrl);
  return (await rawData.json()) as RawItemData[];
}

export async function getSummonerSpellsData(): Promise<
  RawSummonerSpellData[]
> {
  const resourceUrl = cdClient.meta("summoner-spells" as any);
  const rawData = await fetch(resourceUrl);
  return (await rawData.json()) as RawSummonerSpellData[];
}

export async function getResources(fileName: string): Promise<any> {
  const resourceUrl = cdClient.meta(fileName as any);
  const rawData = await fetch(resourceUrl);
  return await rawData.json();
}

// ── Icon helpers ─────────────────────────────────────────────────

export async function getSummonerSpellIcon(spellName: string): Promise<string> {
  return await getResourceIcon("summoner-spells", spellName);
}

export async function getItemIcon(itemName: string): Promise<string> {
  return await getResourceIcon("items", itemName);
}

export async function getRuneIcon(name: string): Promise<string> {
  return await getResourceIcon("perks", name);
}

export async function getChampionIcon(championName: string): Promise<string> {
  return await getResourceIcon("champion-summary", championName);
}

export async function getResourceIcon(
  fileName: string,
  wantedResource: string
): Promise<string> {
  const resources = await getResources(fileName);

  const resource = resources.find(
    (r: any) =>
      r.name.toLowerCase().includes(wantedResource.toLowerCase()) ||
      (r.alias &&
        r.alias.toLowerCase().includes(wantedResource.toLowerCase()))
  );
  if (!resource) {
    throw new Error(`Resource "${wantedResource}" not found in ${fileName}`);
  }

  const iconPath =
    fileName === "champion-summary"
      ? resource.squarePortraitPath
      : resource.iconPath;

  if (!iconPath) {
    throw new Error(
      `Resource "${wantedResource}" in ${fileName} has no icon path`
    );
  }

  const resourcePath = iconPath
    .replace(
      "/lol-game-data/assets",
      "/latest/plugins/rcp-be-lol-game-data/global/default"
    )
    .toLowerCase();
  return BASE_URL + resourcePath;
}
