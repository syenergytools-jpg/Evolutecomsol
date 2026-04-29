import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, buildSessionToken, checkPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

/* POST /admin/login — body: { password }. Sets a signed cookie on success. */
export async function POST(req: NextRequest) {
  let body: { password?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  if (!body.password || !checkPassword(body.password)) {
    // Throttle response to discourage password guessing
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json(
      { ok: false, error: "Wrong password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: ADMIN_COOKIE.name,
    value: buildSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE.maxAge,
  });
  return res;
}

/* DELETE /admin/login — log out by clearing the cookie. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: ADMIN_COOKIE.name,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
