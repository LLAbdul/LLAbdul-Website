import { NextRequest, NextResponse } from "next/server";
import { getRune, getRunes, getRunesFromTree } from "@/lib/riot-api";

export async function GET(req: NextRequest) {
  try {
    const name = req.nextUrl.searchParams.get("name");
    const tree = req.nextUrl.searchParams.get("tree");

    if (name) {
      const runeData = await getRune(name);
      return NextResponse.json({ data: runeData });
    }

    if (tree) {
      const runesFromTree = await getRunesFromTree(tree);
      return NextResponse.json({ data: runesFromTree });
    }

    const allRunes = await getRunes();
    return NextResponse.json({ data: allRunes });
  } catch (error: any) {
    console.error("Error in runes endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
