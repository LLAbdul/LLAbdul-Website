import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getRune, getRunes, getRunesFromTree } from './riotApi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const { name, tree } = req.query

        if (name && typeof name === "string") {
            const runeData = await getRune(name);
            return res.status(200).send({
                data: runeData
            });
        }
        if (tree && typeof tree === "string") {
            const runesFromTree = await getRunesFromTree(tree);
            return res.status(200).send({
                data: runesFromTree
            });
        }
        const allRunes = await getRunes();
        return res.status(200).send({
            data: allRunes
        });
    } catch (error: any) {
        console.error("Error in runes endpoint:", error);
        return res.status(500).send({
            error: "Internal server error",
            message: error.message
        });
    }
}

