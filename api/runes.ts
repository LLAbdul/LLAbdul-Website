import { VercelRequest, type VercelResponse } from '@vercel/node';
import { getChampion, getChampions, getRune, getRuneField, getRuneIcon, getRunes, getRunesFromTree } from './riotApi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
}

