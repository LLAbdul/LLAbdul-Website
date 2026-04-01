import { NextRequest, NextResponse } from "next/server";
import { getRune } from "@/lib/riot-api";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;

    if (!name) {
      return NextResponse.json(
        { error: "Missing name" },
        { status: 400 }
      );
    }

    const runeData = await getRune(name);
    return NextResponse.json({ data: runeData });
  } catch (error: any) {
    console.error("Error in runes/[name] endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
