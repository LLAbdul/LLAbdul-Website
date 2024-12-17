import { CommunityDragon } from "poro";

const cdClient = new CommunityDragon('latest', 'default');
const BASE_URL = 'https://raw.communitydragon.org/latest'

export async function getRuneField(name: string, field: string) {
    return await getResourceField('perks', name, field)
}

export async function getResourceField(fileName: string, wantedResource: string, field: string) {
    const resources = await getResources(fileName);

    const description = resources.find(resource => resource.name.toLowerCase().includes(wantedResource))[field];
    return description
}
export async function getResources(fileName: string) {
    const resourceUrl = cdClient.meta(fileName);
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

    const gamePath = resources.find(resource => resource.name.toLowerCase().includes(wantedResource)).iconPath;
    const resourcePath = gamePath.replace('/lol-game-data/assets', '/plugins/rcp-be-lol-game-data/global/default').toLowerCase();
    return BASE_URL + resourcePath
}


