import { NextRequest, NextResponse } from "next/server";
import { getItem } from "@/lib/riot-api";

export async function GET(req: NextRequest) {
  try {
    const name = req.nextUrl.searchParams.get("name");

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        {
          error: "Missing or invalid name parameter",
          message: "name query parameter is required and must be a string",
        },
        { status: 400 }
      );
    }

    const item = await getItem(name);
    return NextResponse.json({ data: item });
  } catch (error: any) {
    console.error("Error in item endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
