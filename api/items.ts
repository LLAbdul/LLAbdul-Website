import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getItems } from './riotApi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const item = await getItems();

        return res.status(200).send({
            data: item
        });
    } catch (error: any) {
        console.error("Error in items endpoint:", error);
        return res.status(500).send({
            error: "Internal server error",
            message: error.message
        });
    }
}

