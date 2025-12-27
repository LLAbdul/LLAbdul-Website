import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getChampion } from './riotApi';
import { Champion, ApiResponse } from './types';

interface QueryParams {
    alias: string
}
export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
    const { alias } = req.query as unknown as QueryParams;
    const champion = await getChampion(alias);

    return res.status(200).send({
        data: champion
    });
    } catch (error: any) {
        console.error("Error in champion endpoint:", error);
        return res.status(500).send({
            error: "Internal server error",
            message: error.message
        });
    }
}



