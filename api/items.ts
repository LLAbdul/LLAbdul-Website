import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getItems } from './riotApi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const item = await getItems();

    return res.status(200).send({
        data: item
    });
}

