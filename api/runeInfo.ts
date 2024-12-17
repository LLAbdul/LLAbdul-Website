import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getRuneField, getRuneIcon } from './riotApi';

interface QueryParams {
    tree: string
    name: string
}
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { name } = req.query as unknown as QueryParams;
    const runeIconUrl = await getRuneIcon(name);
    const runeDescription = await getRuneField(name, 'longDesc');

    return res.status(200).send({
        icon: runeIconUrl,
        description: runeDescription
    });
}


