import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../auth";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user && (session.user as any).role === "admin";
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
