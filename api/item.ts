import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getItem } from './riotApi';

interface QueryParams {
    name: string
}
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { name } = req.query as unknown as QueryParams;
    const item = await getItem(name);

    return res.status(200).send({
        data: item
    });
}

