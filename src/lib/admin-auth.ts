import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/* ------------------------------------------------------------------ *
 * Admin auth — single-password gate for /admin.
 *
 * - Login: POST /admin/login with { password }; if it matches
 *   ADMIN_PASSWORD we set a signed cookie. Cookie value = HMAC(secret,
 *   "admin:" + issuedAtMs); we verify the HMAC and the age (24h).
 * - Logout: clear the cookie.
 * - Verify: read the cookie on every admin route.
 *
 * No usernames / sessions in DB on purpose — this is a single-tenant
 * tool used by one team. If you ever add multi-user, swap this for
 * Supabase Auth.
 * ------------------------------------------------------------------ */

const COOKIE_NAME = "evolut_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

function secret(): string {
  return (
    process.env.ADMIN_COOKIE_SECRET ??
    "evolut-default-cookie-secret-rotate-in-prod"
  );
}

function sign(issuedAt: number): string {
  const h = createHmac("sha256", secret());
  h.update(`admin:${issuedAt}`);
  return `${issuedAt}.${h.digest("hex")}`;
}

export function buildSessionToken(): string {
  return sign(Date.now());
}

export function isValidSession(token: string | undefined | null): boolean {
  if (!token) return false;
  const [issuedRaw, mac] = token.split(".");
  if (!issuedRaw || !mac) return false;
  const issuedAt = Number(issuedRaw);
  if (!Number.isFinite(issuedAt)) return false;
  if (Date.now() - issuedAt > MAX_AGE_SECONDS * 1000) return false;
  const expected = sign(issuedAt).split(".")[1];
  if (expected.length !== mac.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(mac, "hex"));
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(input), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function getCurrentSession(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  return isValidSession(token);
}

export const ADMIN_COOKIE = {
  name: COOKIE_NAME,
  maxAge: MAX_AGE_SECONDS,
};
