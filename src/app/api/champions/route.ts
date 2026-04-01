import { NextResponse } from "next/server";
import { getChampions } from "@/lib/riot-api";

export async function GET() {
  try {
    const champions = await getChampions();
    return NextResponse.json({ data: champions });
  } catch (error: any) {
    console.error("Error in champions endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
