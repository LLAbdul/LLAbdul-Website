import { CommunityDragon } from "poro";

const cdClient = new CommunityDragon("latest", "default");
const BASE_URL = "https://raw.communitydragon.org";

function resolveIcon(path: string): string {
  return BASE_URL + path.replace("/lol-game-data/assets", "/latest/plugins/rcp-be-lol-game-data/global/default").toLowerCase();
}

export interface PerkInfo {
  id: number;
  name: string;
  icon: string;
}

export interface RuneTreeTier {
  label: string;
  perks: PerkInfo[];
}

export interface RuneTree {
  id: number;
  name: string;
  icon: string;
  keystones: PerkInfo[];
  tiers: RuneTreeTier[];  // rows 1-3 (non-keystone)
  shards: RuneTreeTier[]; // offense/flex/defense
}

let cachedTrees: RuneTree[] | null = null;
let cachedPerkMap: Map<string, PerkInfo> | null = null;

async function loadRuneData() {
  if (cachedTrees && cachedPerkMap) return { trees: cachedTrees, perkMap: cachedPerkMap };

  const stylesUrl = cdClient.meta("perkstyles" as any);
  const perksUrl = cdClient.meta("perks" as any);

  const [stylesRes, perksRes] = await Promise.all([fetch(stylesUrl), fetch(perksUrl)]);
  const stylesData = await stylesRes.json();
  const perksData = await perksRes.json();

  // Build perk lookup by ID and name
  const perkById = new Map<number, PerkInfo>();
  const perkByName = new Map<string, PerkInfo>();
  for (const p of perksData) {
    const info: PerkInfo = {
      id: p.id,
      name: p.name,
      icon: resolveIcon(p.iconPath),
    };
    perkById.set(p.id, info);
    perkByName.set(p.name.toLowerCase(), info);
  }

  const trees: RuneTree[] = stylesData.styles.map((style: any) => {
    const slots = style.slots as { slotLabel?: string; perks: number[] }[];

    // First slot is keystones, next 3 are tiers, last 3 are shards
    const keystones = (slots[0]?.perks || []).map((id: number) => perkById.get(id)!).filter(Boolean);

    const tiers: RuneTreeTier[] = slots.slice(1, 4).map((slot) => ({
      label: slot.slotLabel || "",
      perks: slot.perks.map((id: number) => perkById.get(id)!).filter(Boolean),
    }));

    const shardLabels = ["Offense", "Flex", "Defense"];
    const shards: RuneTreeTier[] = slots.slice(4, 7).map((slot, i) => ({
      label: shardLabels[i] || slot.slotLabel || "",
      perks: slot.perks.map((id: number) => perkById.get(id)!).filter(Boolean),
    }));

    return {
      id: style.id,
      name: style.name,
      icon: resolveIcon(style.iconPath),
      keystones,
      tiers,
      shards,
    };
  });

  cachedTrees = trees;
  cachedPerkMap = perkByName;
  return { trees, perkMap: perkByName };
}

export async function getRuneTrees(): Promise<RuneTree[]> {
  const { trees } = await loadRuneData();
  return trees;
}

export async function findPerkByName(name: string): Promise<PerkInfo | null> {
  const { perkMap } = await loadRuneData();
  return perkMap.get(name.toLowerCase()) || null;
}

/**
 * Given a matchup's rune data (names or objects), resolve into a structured
 * format with tree info for the u.gg-style display.
 */
export interface ResolvedRunePage {
  primaryTree: RuneTree | null;
  secondaryTree: RuneTree | null;
  selectedPerkNames: Set<string>;
  shardNames: string[];
}

export async function resolveRunePage(runeData: any): Promise<ResolvedRunePage | null> {
  if (!runeData) return null;

  const { trees, perkMap } = await loadRuneData();
  const selectedPerkNames = new Set<string>();
  let primaryTree: RuneTree | null = null;
  let secondaryTree: RuneTree | null = null;
  let shardNames: string[] = [];

  // Format 1: { primary: string[], secondary: string[], shards: string[] }
  if (!Array.isArray(runeData) && typeof runeData === "object" && ("primary" in runeData || "secondary" in runeData)) {
    const primaryNames: string[] = runeData.primary || [];
    const secondaryNames: string[] = runeData.secondary || [];
    shardNames = runeData.shards || [];

    // Add all selected rune names
    for (const name of [...primaryNames, ...secondaryNames]) {
      selectedPerkNames.add(name.toLowerCase());
    }
    for (const name of shardNames) {
      selectedPerkNames.add(name.toLowerCase());
    }

    // Find primary tree by keystone match
    if (primaryNames.length > 0) {
      const keystoneName = primaryNames[0].toLowerCase();
      primaryTree = trees.find((t) =>
        t.keystones.some((k) => k.name.toLowerCase() === keystoneName)
      ) || null;
    }

    // Find secondary tree by matching any rune in the secondary list
    if (secondaryNames.length > 0) {
      const secName = secondaryNames[0].toLowerCase();
      secondaryTree = trees.find((t) =>
        t.tiers.some((tier) => tier.perks.some((p) => p.name.toLowerCase() === secName))
      ) || null;
    }
  }

  // Format 2: RuneItem[] with icon/name/tree
  if (Array.isArray(runeData) && runeData.length > 0) {
    for (const r of runeData) {
      selectedPerkNames.add((r.name as string).toLowerCase());
    }
    // Find trees
    const firstTree = (runeData[0] as any).tree;
    if (firstTree) {
      primaryTree = trees.find((t) => t.name.toLowerCase() === firstTree.toLowerCase()) || null;
    }
    const otherTreeRune = runeData.find((r: any) => r.tree && r.tree.toLowerCase() !== firstTree?.toLowerCase());
    if (otherTreeRune) {
      secondaryTree = trees.find((t) => t.name.toLowerCase() === (otherTreeRune as any).tree.toLowerCase()) || null;
    }
  }

  if (!primaryTree && !secondaryTree) return null;
  return { primaryTree, secondaryTree, selectedPerkNames, shardNames };
}
