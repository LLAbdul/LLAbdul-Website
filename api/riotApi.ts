import { CommunityDragon } from "poro";


const cdClient = new CommunityDragon('latest', 'default');
const BASE_URL = 'https://raw.communitydragon.org/latest'

export async function getSummonerSpells() {
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
}
export async function getRunes() {
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
    const resources = await getResources("champion-summary")
    const championNames = resources.map(champion => champion.alias).filter(alias => alias !== "None")
    const champions = await Promise.all(championNames.map(async name => {
        const champs = await getChampion(name)

        return champs
    }))
    return champions

}
export async function getChampion(championName: string) {
    const rawData = await fetch(cdClient.champion.championData(championName))
    const resource = await rawData.json();
    return {
        icon: cdClient.champion.basePortrait(championName),
        title: resource.title,
        name: resource.name,
        alias: resource.alias,
    }
}
export async function getItems() {
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

export async function getItemIcon(spellName: string) {
    return await getResourceIcon('items', spellName)
}

export async function getRuneIcon(name: string) {
    return await getResourceIcon('perks', name)
}

export async function getResourceIcon(fileName: string, wantedResource: string) {
    const resources = await getResources(fileName);

    const gamePath = resources.find(resource => resource.name.toLowerCase().includes(wantedResource.toLowerCase())).iconPath;
    const resourcePath = gamePath.replace('/lol-game-data/assets', '/plugins/rcp-be-lol-game-data/global/default').toLowerCase();
    return BASE_URL + resourcePath
}


