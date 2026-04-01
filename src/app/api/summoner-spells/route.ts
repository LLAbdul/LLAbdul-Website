import { NextResponse } from "next/server";
import { getSummonerSpells } from "@/lib/riot-api";

export async function GET() {
  try {
    const summonerSpells = await getSummonerSpells();
    return NextResponse.json({ data: summonerSpells });
  } catch (error: any) {
    console.error("Error in summoner-spells endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
