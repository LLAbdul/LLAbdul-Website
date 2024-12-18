import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getChampion, getChampions, getRuneField, getRuneIcon } from './riotApi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const champion = await getChampions();

    return res.status(200).send({
        data: champion
    });
}


