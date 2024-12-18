import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getChampion, getChampions, getRuneField, getRuneIcon, getRunes } from './riotApi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const runes = await getRunes();

    return res.status(200).send({
        data: runes
    });
}


