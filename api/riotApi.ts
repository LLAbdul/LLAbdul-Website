import { CommunityDragon } from "poro";


const cdClient = new CommunityDragon('latest', 'default');
const BASE_URL = "https://raw.communitydragon.org";

export async function getSummonerSpells() {
    try {
    const resources = await getResources("summoner-spells")
    const newResources = resources.filter(spell => spell.name !== "")
    const summonerSpells = await Promise.all(newResources.map(async spell => {
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
export async function getRunes() {
    try {
    const resources = await getResources("perks")
    const runes = await Promise.all(resources.map(async rune => {
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

} export async function getRunesFromTree(treeName: string) {
    const resources = await getRunes()
    const runes = resources.filter((rune) => rune.tree.toLowerCase() === treeName.toLowerCase())
    return runes;

}

export async function getRune(runeName: string) {
    const runes = await getRunes()
    const runeNameWithoutSpaces = runeName.replace(/\s+/g, "").toLowerCase();
    const rune = runes.find(rune => rune.name.replace(/\s+/g, "").toLowerCase() === runeNameWithoutSpaces)
    if (!rune) throw new Error(`Rune with name "${runeName}" not found`);
    return rune
}

export async function getTreeName(iconPath: string) {
    let filter = "RunesIcon.png"
    const pathParts = iconPath.split("/");
    const stylesIndex = pathParts.indexOf("Styles")
    const treeName = stylesIndex !== -1 && pathParts[stylesIndex + 1] !== filter ? pathParts[stylesIndex + 1] : "Not Found"
    if (!treeName) throw new Error("Treename not found");
    return treeName


}

export async function getChampions() {
    try {
    const resources = await getResources("champion-summary")
    const champions = await Promise.all(resources
        .filter(champion => champion.alias !== "None")
        .map(async champion => ({
            icon: await getChampionIcon(champion.alias),
            title: champion.description,
            name: champion.name,
            alias: champion.alias,
        })));
    return champions;
    } catch (error: any) {
        console.error("Error in getChampions:", error);
        throw new Error(error.message);
    }
}
export async function getChampion(championAlias: string) {
    try {
        const resources = await getResources("champion-summary");
        const champion = resources.find(c => c.alias.toLowerCase() === championAlias.toLowerCase());

        if (!champion) {
            throw new Error(`Champion with alias "${championAlias}" not found`);
        }

        return {
            icon: await getChampionIcon(champion.alias),
            title: champion.description,
            name: champion.name,
            alias: champion.alias,
        };
    } catch (error: any) {
        console.error(`Error in getChampion for ${championAlias}:`, error);
        throw new Error(error.message);
    }
}
export async function getItems() {
    try{
    const resources = await getResources("items")
    const itemsInShop = resources.filter(items => items.inStore === true)
    const items = await Promise.all(itemsInShop.map(async items => {
        return {
            id: items.id,
            icon: await getItemIcon(items.name),
            name: items.name,
            description: items.description,
            price: items.price
        }


    }))

    return items
    } catch (error: any) {
        console.error("Error in getItems:", error);
        throw new Error(error.message);
    }

}
export async function getItem(itemName: string) {
    const items = await getItems()
    const itemNameWithoutSpecials = itemName.replace(/[\s']/g, "").toLowerCase();
    const item = items.find(rune => rune.name.replace(/[\s']/g, "").toLowerCase() === itemNameWithoutSpecials);
    if (!item) throw new Error(`Item with name "${itemName}" not found`);
    return item
}

export async function getRuneField(name: string, field: string) {
    return await getResourceField('perks', name, field)
}

export async function getResourceField(fileName: string, wantedResource: string, field: string) {
    const resources = await getResources(fileName);

    const description = resources.find(resource => resource.name.toLowerCase().includes(wantedResource))[field];
    return description
}
export async function getResources(fileName: string) {
    const resourceUrl = cdClient.meta(fileName as any);
    const rawData = await fetch(resourceUrl);
    const resource = await rawData.json();

    return resource;
}

// ICONS
export async function getSummonerSpellIcon(spellName: string) {
    return await getResourceIcon('summoner-spells', spellName)
}

export async function getItemIcon(itemName: string) {
    return await getResourceIcon('items', itemName)
}

export async function getRuneIcon(name: string) {
    return await getResourceIcon('perks', name)
}

export async function getChampionIcon(championName: string) {
    return await getResourceIcon('champion-summary', championName)
}

export async function getResourceIcon(fileName: string, wantedResource: string) {
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
}


