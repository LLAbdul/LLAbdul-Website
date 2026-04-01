import { NextRequest, NextResponse } from "next/server";
import { getChampion } from "@/lib/riot-api";

export async function GET(req: NextRequest) {
  try {
    const alias = req.nextUrl.searchParams.get("alias");
    if (!alias) {
      return NextResponse.json(
        { error: "Missing alias query parameter" },
        { status: 400 }
      );
    }

    const champion = await getChampion(alias);
    return NextResponse.json({ data: champion });
  } catch (error: any) {
    console.error("Error in champion endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
