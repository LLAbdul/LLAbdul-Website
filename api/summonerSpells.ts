import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getSummonerSpells } from './riotApi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
    const summonerSpells = await getSummonerSpells();

    return res.status(200).send({
        data: summonerSpells
    });
    } catch (error: any) {
        console.error("Error in summonerSpells endpoint:", error);
        return res.status(500).send({
            error: "Internal server error",
            message: error.message
        });
    }
}


