import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getChampion, getChampions, getRuneField, getRuneIcon } from './riotApi';

interface QueryParams {
    tree: string
    alias: string
}
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { alias } = req.query as unknown as QueryParams;
    const champion = await getChampion(alias);

    return res.status(200).send({
        data: champion
    });
}



