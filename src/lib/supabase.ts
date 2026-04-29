import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ *
 * Supabase clients
 *
 * Two flavours:
 *   - `getServiceClient()` — server-only, bypasses RLS. Use this in
 *     API routes / server actions / admin loaders.
 *   - `getPublicClient()`  — anon key, safe for the browser. We don't
 *     use it from client components today, but it's here for when we
 *     do (e.g. real-time subscriptions on a dashboard).
 *
 * Both throw a descriptive error if env is missing so we don't ship a
 * silently-broken form.
 * ------------------------------------------------------------------ */

export type ContactSubmissionRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string | null;
  reason: string | null;
  budget: string | null;
  message: string;
  source_url: string | null;
  user_agent: string | null;
  ip_hash: string | null;
  status: "new" | "in_progress" | "responded" | "archived" | "spam";
  notes: string | null;
  responded_at: string | null;
};

const URL_KEY = "NEXT_PUBLIC_SUPABASE_URL";
const ANON_KEY = "NEXT_PUBLIC_SUPABASE_ANON_KEY";
const SERVICE_KEY = "SUPABASE_SERVICE_ROLE_KEY";

let serviceClient: SupabaseClient | null = null;
let publicClient: SupabaseClient | null = null;

function readEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Supabase: missing env var ${name}. Set it in .env.local for dev or in your hosting platform for prod.`
    );
  }
  return value;
}

export function getServiceClient(): SupabaseClient {
  if (serviceClient) return serviceClient;
  serviceClient = createClient(readEnv(URL_KEY), readEnv(SERVICE_KEY), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return serviceClient;
}

export function getPublicClient(): SupabaseClient {
  if (publicClient) return publicClient;
  publicClient = createClient(readEnv(URL_KEY), readEnv(ANON_KEY), {
    auth: { persistSession: false },
  });
  return publicClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env[URL_KEY] &&
      process.env[ANON_KEY] &&
      process.env[SERVICE_KEY]
  );
}
