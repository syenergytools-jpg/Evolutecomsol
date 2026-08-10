import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

/* ------------------------------------------------------------------ *
 * Shared spam / abuse guards for the public form routes.
 *
 * Extracted so /api/contact and /api/consultation share one rate-limit
 * window per IP instead of each keeping its own — otherwise a bot gets
 * MAX_PER_WINDOW attempts per endpoint rather than per visitor.
 *
 * The window is in-memory, so it resets on deploy and does not span
 * multiple instances. Move it to Upstash/Redis if this ever runs on
 * more than one host.
 * ------------------------------------------------------------------ */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const submissionLog = new Map<string, number[]>();

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const arr = submissionLog.get(key) ?? [];
  const recent = arr.filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    submissionLog.set(key, recent);
    return false;
  }
  recent.push(now);
  submissionLog.set(key, recent);
  return true;
}

export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

/** Never store raw IPs — this is what lands in the `ip_hash` column. */
export function hashIp(ip: string): string {
  const secret = process.env.ADMIN_COOKIE_SECRET ?? "evolut-default-salt-rotate-in-prod";
  return createHash("sha256").update(`${ip}:${secret}`).digest("hex").slice(0, 32);
}
