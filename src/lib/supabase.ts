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

/** One row per /consultation funnel lead. See migration 0002. */
export type ConsultationLeadRow = {
  id: string;
  created_at: string;
  kind: "onboarding" | "qualifier";
  name: string;
  email: string;
  phone: string | null;
  budget: string | null;
  authority: string | null;
  need: string | null;
  timing: string | null;
  answers: Record<string, unknown>;
  source_url: string | null;
  user_agent: string | null;
  ip_hash: string | null;
  status: "new" | "in_progress" | "responded" | "archived" | "spam";
  notes: string | null;
};

const URL_KEY = "NEXT_PUBLIC_SUPABASE_URL";
const ANON_KEY = "NEXT_PUBLIC_SUPABASE_ANON_KEY";
const SERVICE_KEY = "SUPABASE_SERVICE_ROLE_KEY";

/**
 * Turn a raw Supabase/undici failure into something a human can act on.
 *
 * The default surfaced in the admin UI was a bare "TypeError: fetch
 * failed", which says nothing about what went wrong or who can fix it.
 * The three failures that actually happen in practice are: the project
 * host not resolving (wrong or deleted project ref), the migrations not
 * having been run, and a bad key.
 */
export function describeSupabaseError(err: unknown): string {
  const host = (() => {
    try {
      return new URL(process.env[URL_KEY] ?? "").host;
    } catch {
      return process.env[URL_KEY] || "(unset)";
    }
  })();

  // undici buries the useful part in `cause`.
  const cause = (err as { cause?: { code?: string; message?: string } } | undefined)?.cause;
  const code = cause?.code ?? "";
  const raw = `${(err as Error)?.message ?? String(err)} ${cause?.message ?? ""}`;

  if (code === "ENOTFOUND" || /ENOTFOUND|getaddrinfo/i.test(raw)) {
    return (
      `Can't reach the Supabase project at ${host}. That hostname doesn't exist in DNS. ` +
      `The project reference is most likely wrong, or the project was deleted or never finished ` +
      `provisioning. Copy the Project URL again from Supabase > Settings > API into ` +
      `${URL_KEY}, then restart the server.`
    );
  }
  if (code === "UND_ERR_CONNECT_TIMEOUT" || /timeout/i.test(raw)) {
    return (
      `Timed out connecting to ${host}. The project may be paused (Supabase pauses free projects ` +
      `after inactivity) or this machine's network is blocking the request.`
    );
  }
  if (/relation .* does not exist|schema cache/i.test(raw)) {
    return (
      `Connected to ${host}, but the table is missing. Run the SQL in supabase/migrations/ ` +
      `(0001_contact_submissions.sql, then 0002_consultation_leads.sql) in the Supabase SQL editor.`
    );
  }
  if (/JWT|api key|invalid.*key|Unauthorized/i.test(raw)) {
    return (
      `Supabase rejected the credentials for ${host}. Re-copy ${SERVICE_KEY} from ` +
      `Supabase > Settings > API — it must be the service_role key, not the anon key.`
    );
  }
  if (/fetch failed/i.test(raw)) {
    return `Couldn't reach ${host}. Check the project URL and that this machine has network access.`;
  }
  return raw.trim() || "Unknown Supabase error.";
}

/** True when the failure is a transport problem rather than a query one. */
export function isTransportError(message: string): boolean {
  return /fetch failed|Couldn't reach|Can't reach|Timed out connecting/i.test(message);
}

/**
 * supabase-js flattens transport failures into a PostgREST-shaped error
 * whose message is just "TypeError: fetch failed" — the `cause.code`
 * that says *why* is lost. So on the error path only, make one direct
 * request to the project host to recover the real reason (ENOTFOUND vs
 * timeout vs anything else) and describe it accurately.
 */
export async function diagnoseSupabaseConnection(): Promise<string | null> {
  const url = process.env[URL_KEY];
  if (!url) return null;
  try {
    await fetch(`${url}/rest/v1/`, {
      method: "HEAD",
      signal: AbortSignal.timeout(8000),
    });
    return null; // host is reachable; the original failure was something else
  } catch (e) {
    return describeSupabaseError(e);
  }
}

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
