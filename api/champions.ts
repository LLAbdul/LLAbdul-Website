import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getChampions } from './riotApi';
import { Champion, ApiResponse } from './types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const champion = await getChampions();

    return res.status(200).send({
        data: champion
    });
}


