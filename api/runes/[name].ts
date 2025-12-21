import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getRune } from '../riotApi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const name = req.query['name']

    if (!name || typeof name !== "string") {
        return res.status(400).send({
            error: "Missing name"
        });
    }
    const runeData = await getRune(name);


    return res.status(200).send({
        data: runeData
    });
}
