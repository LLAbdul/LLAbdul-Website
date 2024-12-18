import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getChampion, getChampions, getRuneField, getRuneIcon, getSummonerSpells } from './riotApi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const summonerSpells = await getSummonerSpells();

    return res.status(200).send({
        data: summonerSpells
    });
}


