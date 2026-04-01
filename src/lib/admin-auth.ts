import { cookies } from "next/headers";

const COOKIE_NAME = "llabdul_admin_session";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session?.value === "authenticated";
}
