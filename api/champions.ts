import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getChampions } from './riotApi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const champion = await getChampions();

        return res.status(200).send({
            data: champion
        });
    } catch (error: any) {
        console.error("Error in champions endpoint:", error);
        return res.status(500).send({
            error: "Internal server error",
            message: error.message
        });
    }
}


