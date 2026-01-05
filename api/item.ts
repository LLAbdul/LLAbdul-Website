import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getItem } from './riotApi';

interface QueryParams {
    name: string
}
export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
    const { name } = req.query as unknown as QueryParams;
    
    if (!name || typeof name !== "string") {
        return res.status(400).json({
            error: "Missing or invalid name parameter",
            message: "name query parameter is required and must be a string"
        });
    }
    
    const item = await getItem(name);

    return res.status(200).send({
        data: item
    });
    } catch (error: any) {
        console.error("Error in item endpoint:", error);
        return res.status(500).send({
            error: "Internal server error",
            message: error.message
        });
    }
}

