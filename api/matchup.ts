import { MongoClient } from "mongodb";
import { getChampion } from "./riotApi";

const uri = process.env.MONGODB_URI; // Set this in Vercel's environment variables
const dbName = "league_coaching_website"; // Replace with your database name
const collectionName = "matchups"; // Replace with your collection name

export default async function handler(req, res) {

    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    const { championName } = req.query;

    if (!championName) {
        return res.status(400).json({ message: "championName query parameter is required" });
    }

    const client = new MongoClient(uri);

    try {
        console.log("Connecting to MongoDB...");
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        console.log(`Searching for enemyChampion: "${championName}"...`);
        const query = { enemyChampion: championName };
        const results = await collection.find(query).toArray();

        if (results.length > 0) {
            const matchup = results[0]
            matchup.champion = await getChampion(matchup.champion)
            res.status(200).json({
                message: `Found ${results.length} document(s) with enemyChampion "${championName}"`,
                matchup,
            });
        } else {
            res.status(404).json({ message: `No documents found with enemyChampion "${championName}"` });
        }
    } catch (error) {
        console.error("Error querying MongoDB:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
        console.log("Closing MongoDB connection.");
        await client.close();
    }
}
