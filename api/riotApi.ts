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
        return {
            icon: await getRuneIcon(rune.name),
            name: rune.name,
            description: rune.longDesc
        }
    }))
    return runes

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
} export async function getChampions() {
    const resources = await getResources("champion-summary")
    const championNames = resources.map(champion => champion.alias).filter(alias => alias !== "None")
    const champions = await Promise.all(championNames.map(async name => {
        const champs = await getChampion(name)

        return champs
    }))
    return champions

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


