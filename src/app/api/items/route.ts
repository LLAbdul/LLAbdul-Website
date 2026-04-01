import { NextResponse } from "next/server";
import { getItems } from "@/lib/riot-api";

export async function GET() {
  try {
    const items = await getItems();
    return NextResponse.json({ data: items });
  } catch (error: any) {
    console.error("Error in items endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
