import { NextRequest, NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongo";
import { verifyApiKey } from "@/lib/auth";

const dbName = "league_coaching_website";
const collectionName = "mechanics";

export async function GET(req: NextRequest) {
  try {
    const champion = req.nextUrl.searchParams.get("champion");
    const difficulty = req.nextUrl.searchParams.get("difficulty");

    const client = await getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const query: any = {};
    if (champion) query.champion = { $regex: new RegExp(`^${champion}$`, "i") };
    if (difficulty) query.difficulty = difficulty.toUpperCase();

    const mechanics = await collection.find(query).toArray();
    return NextResponse.json({ data: mechanics });
  } catch (error: any) {
    console.error("Error in mechanics endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authError = verifyApiKey(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const { champion, title, description, difficulty, videos } = body;

    if (!champion || !title || !difficulty) {
      return NextResponse.json(
        { message: "Missing required fields: champion, title, difficulty" },
        { status: 400 }
      );
    }

    const validDifficulties = ["BASIC", "ADVANCED", "EXPERT"];
    if (!validDifficulties.includes(difficulty.toUpperCase())) {
      return NextResponse.json(
        { message: `Invalid difficulty. Must be one of: ${validDifficulties.join(", ")}` },
        { status: 400 }
      );
    }

    const client = await getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const newMechanic = {
      champion,
      title,
      description: description || "",
      difficulty: difficulty.toUpperCase(),
      videos: videos || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newMechanic);
    return NextResponse.json(
      { message: "Mechanic created", insertedId: result.insertedId, mechanic: newMechanic },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating mechanic:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
