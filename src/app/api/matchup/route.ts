import { NextRequest, NextResponse } from "next/server";
import { getChampion } from "@/lib/riot-api";
import { getMongoClient } from "@/lib/mongo";
import { verifyApiKey } from "@/lib/auth";

const dbName = "league_coaching_website";
const collectionName = "matchups";

export async function GET(req: NextRequest) {
  const enemyChampion = req.nextUrl.searchParams.get("enemyChampion");

  if (!enemyChampion) {
    return NextResponse.json(
      { message: "enemyChampion query parameter is required and must be a string" },
      { status: 400 }
    );
  }

  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { message: "MongoDB not configured", error: "MONGODB_URI environment variable is missing" },
        { status: 500 }
      );
    }

    const client = await getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const query = { $or: [{ enemyChampion }] };
    const results = await collection.find(query).toArray();

    if (results.length > 0) {
      const matchup = results[0];
      matchup.champion = await getChampion(matchup.champion as string);
      return NextResponse.json({
        message: `Found ${results.length} matchup(s) involving "${enemyChampion}"`,
        matchup,
      });
    }

    return NextResponse.json(
      { message: `No matchups found involving "${enemyChampion}"` },
      { status: 404 }
    );
  } catch (error: any) {
    console.error("Error querying MongoDB:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authError = verifyApiKey(req);
  if (authError) return authError;

  try {
    const body = await req.json();
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
      summonerSpells,
    } = body;

    if (!enemyChampion || !champion || !difficulty) {
      return NextResponse.json(
        { message: "Missing required fields: enemyChampion, champion, difficulty" },
        { status: 400 }
      );
    }

    if (typeof enemyChampion !== "string" || typeof champion !== "string") {
      return NextResponse.json(
        { message: "enemyChampion and champion must be strings" },
        { status: 400 }
      );
    }

    const client = await getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const existingMatchup = await collection.findOne({ enemyChampion });
    if (existingMatchup) {
      return NextResponse.json(
        { message: `Matchup for "${enemyChampion}" already exists. Use PUT to update.` },
        { status: 409 }
      );
    }

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
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newMatchup);

    return NextResponse.json(
      {
        message: "Matchup created successfully",
        insertedId: result.insertedId,
        matchup: newMatchup,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating matchup:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const authError = verifyApiKey(req);
  if (authError) return authError;

  try {
    const enemyChampion = req.nextUrl.searchParams.get("enemyChampion");

    if (!enemyChampion) {
      return NextResponse.json(
        { message: "enemyChampion query parameter is required and must be a string" },
        { status: 400 }
      );
    }

    const updateData = await req.json();
    if (!updateData || typeof updateData !== "object") {
      return NextResponse.json(
        { message: "Request body must be a valid object" },
        { status: 400 }
      );
    }

    const client = await getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const query = {
      $or: [{ enemyChampion }, { champion: enemyChampion }],
    };
    const updateDoc = {
      $set: { ...updateData, updatedAt: new Date() },
    };

    const result = await collection.updateOne(query, updateDoc);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: `No matchup found involving "${enemyChampion}"` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Matchup updated successfully for "${enemyChampion}"`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error: any) {
    console.error("Error updating matchup:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
