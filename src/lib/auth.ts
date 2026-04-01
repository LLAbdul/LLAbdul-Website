import { NextRequest, NextResponse } from "next/server";

/**
 * Verify the API key from the X-API-Key header.
 * Returns null if valid, or a NextResponse error if invalid.
 */
export function verifyApiKey(
  req: NextRequest
): NextResponse | null {
  const apiKey = req.headers.get("x-api-key");
  const expectedApiKey = process.env.ADMIN_API_KEY;

  if (!expectedApiKey) {
    console.error("ADMIN_API_KEY not configured in environment variables");
    return NextResponse.json(
      {
        error: "Server configuration error",
        message: "API key authentication is not configured",
      },
      { status: 500 }
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Missing API key. Include X-API-Key header in your request.",
      },
      { status: 401 }
    );
  }

  if (apiKey !== expectedApiKey) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Invalid API key",
      },
      { status: 401 }
    );
  }

  return null;
}
