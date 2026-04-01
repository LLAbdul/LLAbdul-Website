import { NextRequest, NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongo";
import { verifyApiKey } from "@/lib/auth";

const dbName = "league_coaching_website";
const collectionName = "guides";

export async function GET(req: NextRequest) {
  try {
    const champion = req.nextUrl.searchParams.get("champion");
    const client = await getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    if (champion) {
      const guide = await collection.findOne({
        champion: { $regex: new RegExp(`^${champion}$`, "i") },
      });
      if (!guide) {
        return NextResponse.json(
          { message: `No guide found for "${champion}"` },
          { status: 404 }
        );
      }
      return NextResponse.json({ data: guide });
    }

    const guides = await collection.find({}).toArray();
    return NextResponse.json({ data: guides });
  } catch (error: any) {
    console.error("Error in guides endpoint:", error);
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
    const { champion, early, mid, late, videos } = body;

    if (!champion) {
      return NextResponse.json(
        { message: "Missing required field: champion" },
        { status: 400 }
      );
    }

    const client = await getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const existing = await collection.findOne({
      champion: { $regex: new RegExp(`^${champion}$`, "i") },
    });
    if (existing) {
      return NextResponse.json(
        { message: `Guide for "${champion}" already exists. Use PUT to update.` },
        { status: 409 }
      );
    }

    const newGuide = {
      champion,
      early: early || "",
      mid: mid || "",
      late: late || "",
      videos: videos || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newGuide);
    return NextResponse.json(
      { message: "Guide created", insertedId: result.insertedId, guide: newGuide },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating guide:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const authError = verifyApiKey(req);
  if (authError) return authError;

  try {
    const champion = req.nextUrl.searchParams.get("champion");
    if (!champion) {
      return NextResponse.json(
        { message: "champion query parameter is required" },
        { status: 400 }
      );
    }

    const updateData = await req.json();
    const client = await getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.updateOne(
      { champion: { $regex: new RegExp(`^${champion}$`, "i") } },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: `No guide found for "${champion}"` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Guide updated for "${champion}"`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error: any) {
    console.error("Error updating guide:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
