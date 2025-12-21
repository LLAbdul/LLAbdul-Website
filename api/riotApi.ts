import { CommunityDragon } from "poro";

// Import types from separate file for better organization
import type { Champion, Item, Rune, SummonerSpell, RawChampionData, RawItemData, RawRuneData, RawSummonerSpellData, MatchupData, MatchupResponse, ApiResponse } from './types';
export type { Champion, Item, Rune, SummonerSpell, RawChampionData, RawItemData, RawRuneData, RawSummonerSpellData, MatchupData, MatchupResponse, ApiResponse } from './types';

const cdClient = new CommunityDragon('latest', 'default');
const BASE_URL = "https://raw.communitydragon.org";

export async function getSummonerSpells() {
    try {
    const resources = await getSummonerSpellsData()
    const newResources = resources.filter(spell => spell.name !== "")
    const summonerSpells: SummonerSpell[] = await Promise.all(newResources.map(async spell => {
        console.log(spell)
        return {
            icon: await getSummonerSpellIcon(spell.name),
            name: spell.name,
            description: spell.description,
            cooldown: spell.cooldown
        }
    }))
    return summonerSpells
    } catch (error: any) {
        console.error("Error in getSummonerSpells:", error);
        throw new Error(error.message);
    }
}
export async function getRunes(): Promise<Rune[]> {
    try {
        const resources = await getPerksData();
        const runes: Rune[] = await Promise.all(resources.map(async rune => {
            const treeName = await getTreeName(rune.iconPath)

            return {
                icon: await getRuneIcon(rune.name),
                name: rune.name,
                description: rune.longDesc,
                tree: treeName
            }


        }))
        const validRunes = runes.filter(rune => rune.tree !== "Not Found")
        return validRunes
    } catch (error: any) {
        console.error("Error in getRunes:", error);
        throw new Error(error.message);
    }

} export async function getRunesFromTree(treeName: string): Promise<Rune[]> {
    try {
    const resources = await getRunes()
    const runes: Rune[] = resources.filter((rune) => rune.tree.toLowerCase() === treeName.toLowerCase())
    return runes;
    } catch (error: any) {
        console.error("Error in getRunesFromTree:", error);
        throw new Error(error.message);
    }
}

export async function getRune(runeName: string): Promise<Rune> {
    try {
    const runes = await getRunes()
    const runeNameWithoutSpaces = runeName.replace(/\s+/g, "").toLowerCase();
    const rune: Rune = runes.find(rune => rune.name.replace(/\s+/g, "").toLowerCase() === runeNameWithoutSpaces)
    if (!rune) throw new Error(`Rune with name "${runeName}" not found`);
    return rune
    } catch (error: any) {
        console.error("Error in getRune:", error);
        throw new Error(error.message);
    }
}

export async function getTreeName(iconPath: string) {
    try {
    let filter = "RunesIcon.png"
    const pathParts = iconPath.split("/");
    const stylesIndex = pathParts.indexOf("Styles")
    const treeName = stylesIndex !== -1 && pathParts[stylesIndex + 1] !== filter ? pathParts[stylesIndex + 1] : "Not Found"
    if (!treeName) throw new Error("Treename not found");
    return treeName
    } catch (error: any) {
        console.error("Error in getTreeName:", error);
        throw new Error(error.message);
    }

}

export async function getChampions(): Promise<Champion[]> {
    try {
        const resources = await getChampionSummary();
        const champions: Champion[] = await Promise.all(resources
            .filter(rawChampion => rawChampion.alias !== "None")
            .map(async rawChampion => ({
                icon: await getChampionIcon(rawChampion.alias),
                title: rawChampion.description,
                name: rawChampion.name,
                alias: rawChampion.alias,
            })));
        return champions;
    } catch (error: any) {
        console.error("Error in getChampions:", error);
        throw new Error(error.message);
    }
}
export async function getChampion(championAlias: string): Promise<Champion> {
    try {
        const resources = await getChampionSummary();
        const rawChampion: RawChampionData = resources.find(c => c.alias.toLowerCase() === championAlias.toLowerCase());

        if (!rawChampion) {
            throw new Error(`Champion with alias "${championAlias}" not found`);
        }

        return {
            icon: await getChampionIcon(rawChampion.alias),
            title: rawChampion.description,
            name: rawChampion.name,
            alias: rawChampion.alias,
        };
    } catch (error: any) {
        console.error(`Error in getChampion for ${championAlias}:`, error);
        throw new Error(error.message);
    }
}
export async function getItems(): Promise<Item[]> {
    try{
        const resources = await getItemsData()
        const itemsInShop = resources.filter(items => items.inStore === true)
        const items: Item[] = await Promise.all(itemsInShop.map(async items => {
            return {
                id: items.id,
                icon: await getItemIcon(items.name),
                name: items.name,
                description: items.description,
                price: items.price
            } as Item;
        }))

        return items;
    } catch (error: any) {
        console.error("Error in getItems:", error);
        throw new Error(error.message);
    }
}
export async function getItem(itemName: string): Promise<Item> {
    try {
    const items = await getItems()
    const itemNameWithoutSpecials = itemName.replace(/[\s']/g, "").toLowerCase();
    const item = items.find(rune => rune.name.replace(/[\s']/g, "").toLowerCase() === itemNameWithoutSpecials);
    if (!item) throw new Error(`Item with name "${itemName}" not found`);
    return item
    } catch (error: any) {
        console.error("Error in getItem:", error);
        throw new Error(error.message);
    }
}

export async function getRuneField(name: string, field: string) {
    try {
    return await getResourceField('perks', name, field)
    } catch (error: any) {
        console.error("Error in getRuneField:", error);
        throw new Error(error.message);
    }
}

export async function getResourceField(fileName: string, wantedResource: string, field: string) {
    try {
    const resources = await getResources(fileName);

    const description = resources.find(resource => resource.name.toLowerCase().includes(wantedResource))[field];
    return description
    } catch (error: any) {
        console.error("Error in getResourceField:", error);
        throw new Error(error.message);
    }
}
// Individual typed resource getter functions
export async function getChampionSummary(): Promise<RawChampionData[]> {
    try {
        const resourceUrl = cdClient.meta("champion-summary" as any);
        const rawData = await fetch(resourceUrl);
        const resource = await rawData.json() as RawChampionData[];
        return resource;
    } catch (error: any) {
        console.error("Error in getChampionSummary:", error);
        throw new Error(error.message);
    }
}

export async function getPerksData(): Promise<RawRuneData[]> {
    try {
        const resourceUrl = cdClient.meta("perks" as any);
        const rawData = await fetch(resourceUrl);
        const resource = await rawData.json() as RawRuneData[];
        return resource;
    } catch (error: any) {
        console.error("Error in getPerksData:", error);
        throw new Error(error.message);
    }
}

export async function getItemsData(): Promise<RawItemData[]> {
    try {
        const resourceUrl = cdClient.meta("items" as any);
        const rawData = await fetch(resourceUrl);
        const resource = await rawData.json() as RawItemData[];
        return resource;
    } catch (error: any) {
        console.error("Error in getItemsData:", error);
        throw new Error(error.message);
    }
}

export async function getSummonerSpellsData(): Promise<RawSummonerSpellData[]> {
    try {
        const resourceUrl = cdClient.meta("summoner-spells" as any);
        const rawData = await fetch(resourceUrl);
        const resource = await rawData.json() as RawSummonerSpellData[];
        return resource;
    } catch (error: any) {
        console.error("Error in getSummonerSpellsData:", error);
        throw new Error(error.message);
    }
}

// Generic fallback for other resources
export async function getResources(fileName: string): Promise<any> {
    try {
        const resourceUrl = cdClient.meta(fileName as any);
        const rawData = await fetch(resourceUrl);
        const resource = await rawData.json();
        return resource;
    } catch (error: any) {
        console.error(`Error in getResources for ${fileName}:`, error);
        throw new Error(error.message);
    }
}

// ICONS
export async function getSummonerSpellIcon(spellName: string) {
    try {
    return await getResourceIcon('summoner-spells', spellName)
    } catch (error: any) {
        console.error("Error in getSummonerSpellIcon:", error);
        throw new Error(error.message);
    }
}

export async function getItemIcon(itemName: string) {
    try {
    return await getResourceIcon('items', itemName)
    } catch (error: any) {
        console.error("Error in getItemIcon:", error);
        throw new Error(error.message);
    }
}

export async function getRuneIcon(name: string) {
    try {
    return await getResourceIcon('perks', name)
    } catch (error: any) {
        console.error("Error in getRuneIcon:", error);
        throw new Error(error.message);
    }
}

export async function getChampionIcon(championName: string) {
    try {
    return await getResourceIcon('champion-summary', championName)
    } catch (error: any) {
        console.error("Error in getChampionIcon:", error);
        throw new Error(error.message);
    }
}

export async function getResourceIcon(fileName: string, wantedResource: string) {
    try {
    const resources = await getResources(fileName);

    const resource = resources.find(resource => resource.name.toLowerCase().includes(wantedResource.toLowerCase()) ||
                                                (resource.alias && resource.alias.toLowerCase().includes(wantedResource.toLowerCase())));
    if (!resource) {
        throw new Error(`Resource "${wantedResource}" not found in ${fileName}`);
    }

    // Different data types use different field names for icon paths
    let iconPath;
    if (fileName === 'champion-summary') {
        iconPath = resource.squarePortraitPath;
    } else {
        iconPath = resource.iconPath;
    }

    if (!iconPath) {
        throw new Error(`Resource "${wantedResource}" in ${fileName} has no icon path`);
    }

    const resourcePath = iconPath.replace('/lol-game-data/assets', '/latest/plugins/rcp-be-lol-game-data/global/default').toLowerCase();
    return BASE_URL + resourcePath
    } catch (error: any) {
        console.error("Error in getResourceIcon:", error);
        throw new Error(error.message);
    }
}


