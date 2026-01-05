import { VercelRequest, VercelResponse } from '@vercel/node';
import { getChampion } from "./riotApi";
import { getMongoClient } from "./lib/mongo";

const dbName = "league_coaching_website"; // Replace with your database name
const collectionName = "matchups"; // Replace with your collection name

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle different HTTP methods
    switch (req.method) {
        case "GET":
            return await handleGetMatchup(req, res);
        case "POST":
            return await handleCreateMatchup(req, res);
        case "PUT":
            return await handleUpdateMatchup(req, res);
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT"]);
            return res.status(405).json({
                message: `Method ${req.method} not allowed. Use GET, POST, or PUT.`
            });
    }
}

// GET: Retrieve matchup data (existing functionality)
async function handleGetMatchup(req: VercelRequest, res: VercelResponse) {
    const { enemyChampion } = req.query;

    if (!enemyChampion || typeof enemyChampion !== "string") {
        return res.status(400).json({ message: "enemyChampion query parameter is required and must be a string" });
    }

    try {
        // Check if MONGODB_URI is configured
        if (!process.env.MONGODB_URI) {
            return res.status(500).json({ 
                message: "MongoDB not configured", 
                error: "MONGODB_URI environment variable is missing" 
            });
        }

        const client = await getMongoClient();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        console.log(`Searching for matchups involving: "${enemyChampion}"...`);
        // Find matchups where the champion is either the enemy OR the champion you're playing
        const query = {
            $or: [
                { enemyChampion: enemyChampion } // Yasuo is the enemy
            ]
        };
        const results = await collection.find(query).toArray();

        if (results.length > 0) {
            const matchup = results[0]
            matchup.champion = await getChampion(matchup.champion)
            res.status(200).json({
                message: `Found ${results.length} matchup(s) involving "${enemyChampion}"`,
                matchup,
            });
        } else {
            res.status(404).json({ message: `No matchups found involving "${enemyChampion}"` });
        }
    } catch (error: any) {
        console.error("Error querying MongoDB:", error.message);
        res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message,
            details: process.env.MONGODB_URI ? "MongoDB URI is configured" : "MongoDB URI is missing"
        });
    }
}

// POST: Create new matchup data
async function handleCreateMatchup(req: VercelRequest, res: VercelResponse) {
    try {
        // 1. Validate request body structure
        const {
            enemyChampion,
            champion,
            difficulty,
            early,
            mid,
            late,
            videos,
            runes,
            startItems,
            build,
            summonerSpells
        } = req.body;

        // 2. Validate required fields
        if (!enemyChampion || !champion || !difficulty) {
            return res.status(400).json({
                message: "Missing required fields: enemyChampion, champion, difficulty"
            });
        }

        // 3. Validate data types (optional but recommended)
        if (typeof enemyChampion !== 'string' || typeof champion !== 'string') {
            return res.status(400).json({
                message: "enemyChampion and champion must be strings"
            });
        }

        const client = await getMongoClient();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        try {

            // 4. Check if matchup already exists (optional)
            const existingMatchup = await collection.findOne({ enemyChampion });
            if (existingMatchup) {
                return res.status(409).json({
                    message: `Matchup for "${enemyChampion}" already exists. Use PUT to update.`
                });
            }

            // 5. Prepare the document to insert
            const newMatchup = {
                enemyChampion,
                champion,
                difficulty,
                early: early || "",
                mid: mid || "",
                late: late || "",
                videos: videos || [],
                runes: runes || [],
                startItems: startItems || [],
                build: build || [],
                summonerSpells: summonerSpells || [],
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // 6. Insert the document
            const result = await collection.insertOne(newMatchup);

            console.log("Matchup created successfully");
            res.status(201).json({
                message: "Matchup created successfully",
                insertedId: result.insertedId,
                matchup: newMatchup
            });
        } catch (dbError: any) {
            console.error("Error creating matchup in database:", dbError);
            res.status(500).json({
                message: "Internal Server Error",
                error: dbError?.message || "Unknown error"
            });
        }
    } catch (error: any) {
        console.error("Error creating matchup:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error?.message || "Unknown error"
        });
    }
}

async function handleUpdateMatchup(req: VercelRequest, res: VercelResponse) {
    try {
        const { enemyChampion: enemyChampion } = req.query;

        // 1. Validate query parameter
        if (!enemyChampion || typeof enemyChampion !== "string") {
            return res.status(400).json({
                message: "enemyChampion query parameter is required and must be a string"
            });
        }

        // 2. Validate request body
        const updateData = req.body;
        if (!updateData || typeof updateData !== 'object') {
            return res.status(400).json({
                message: "Request body must be a valid object"
            });
        }

        const client = await getMongoClient();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        try {

            // 3. Prepare update query and data
            // Find matchups where championName is either the enemy or the champion
            const query = {
                $or: [
                    { enemyChampion: enemyChampion },
                    { champion: enemyChampion }
                ]
            };
            const updateDoc = {
                $set: {
                    ...updateData,
                    updatedAt: new Date()
                }
            };

            // 4. Update the document
            const result = await collection.updateOne(query, updateDoc);

            // 5. Check if document was found and updated
            if (result.matchedCount === 0) {
                return res.status(404).json({
                    message: `No matchup found involving "${enemyChampion}"`
                });
            }

            console.log(`Matchup updated for "${enemyChampion}"`);
            res.status(200).json({
                message: `Matchup updated successfully for "${enemyChampion}"`,
                modifiedCount: result.modifiedCount
            });
        } catch (dbError: any) {
            console.error("Error updating matchup in database:", dbError);
            res.status(500).json({
                message: "Internal Server Error",
                error: dbError?.message || "Unknown error"
            });
        }
    } catch (error: any) {
        console.error("Error updating matchup:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error?.message || "Unknown error"
        });
    }
}