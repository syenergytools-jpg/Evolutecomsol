import { getCurrentSession } from "@/lib/admin-auth";
import {
  getServiceClient,
  isSupabaseConfigured,
  type ContactSubmissionRow,
} from "@/lib/supabase";
import { LoginForm } from "./login-form";
import { SubmissionsList } from "./submissions-list";
import { LogoutButton } from "./logout-button";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type StatusCount = {
  total: number;
  new: number;
  in_progress: number;
  responded: number;
  archived: number;
  spam: number;
};

function countStatuses(rows: ContactSubmissionRow[]): StatusCount {
  const c: StatusCount = {
    total: rows.length,
    new: 0,
    in_progress: 0,
    responded: 0,
    archived: 0,
    spam: 0,
  };
  for (const r of rows) {
    if (r.status in c) c[r.status as keyof Omit<StatusCount, "total">]++;
  }
  return c;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; service?: string }>;
}) {
  const isLoggedIn = await getCurrentSession();
  if (!isLoggedIn) return <LoginScreen />;

  const params = await searchParams;
  const filters = {
    status: params.status ?? "all",
    service: params.service ?? "all",
  };

  let rows: ContactSubmissionRow[] = [];
  let allRows: ContactSubmissionRow[] = [];
  let queryError: string | null = null;

  if (!isSupabaseConfigured()) {
    queryError =
      "Supabase env vars not set. Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY in your hosting env to start receiving submissions.";
  } else {
    try {
      const sb = getServiceClient();

      // Fetch ALL rows for stats (unfiltered)
      const { data: allData, error: allError } = await sb
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);

      if (allError) {
        queryError = allError.message;
      } else {
        allRows = (allData ?? []) as ContactSubmissionRow[];

        // Apply filters for the visible list
        if (filters.status === "all" && filters.service === "all") {
          rows = allRows;
        } else {
          let q = sb
            .from("contact_submissions")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(500);
          if (filters.status !== "all") q = q.eq("status", filters.status);
          if (filters.service !== "all") q = q.eq("service", filters.service);
          const { data, error } = await q;
          if (error) {
            queryError = error.message;
          } else {
            rows = (data ?? []) as ContactSubmissionRow[];
          }
        }
      }
    } catch (e) {
      queryError = e instanceof Error ? e.message : String(e);
    }
  }

  const stats = countStatuses(allRows);

  return (
    <main className="min-h-screen bg-canvas">
      <header className="border-b border-hairline bg-surface sticky top-0 z-50 backdrop-blur">
        <div className="container-x flex items-center justify-between py-4">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mute">
              Evolut · ops
            </p>
            <h1 className="display text-2xl text-ink mt-0.5">
              Admin · briefs
            </h1>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Stats bar */}
      {!queryError && (
        <div className="border-b border-hairline bg-canvas-2">
          <div className="container-x py-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <StatCard
                label="Total"
                value={stats.total}
                accent="text-ink"
              />
              <StatCard
                label="New"
                value={stats.new}
                accent="text-electric"
                pulse={stats.new > 0}
              />
              <StatCard
                label="In progress"
                value={stats.in_progress}
                accent="text-copper"
              />
              <StatCard
                label="Responded"
                value={stats.responded}
                accent="text-emerald"
              />
              <StatCard
                label="Archived"
                value={stats.archived}
                accent="text-mute"
              />
              <StatCard
                label="Spam"
                value={stats.spam}
                accent="text-ink/40"
              />
            </div>
          </div>
        </div>
      )}

      <SubmissionsList
        rows={rows}
        filters={filters}
        queryError={queryError}
        configured={isSupabaseConfigured()}
      />
    </main>
  );
}

function StatCard({
  label,
  value,
  accent,
  pulse,
}: {
  label: string;
  value: number;
  accent: string;
  pulse?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-canvas p-4">
      <div className="flex items-center gap-2 mb-1">
        {pulse && (
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-electric animate-ping opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
          </span>
        )}
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mute">
          {label}
        </p>
      </div>
      <p className={`text-2xl font-semibold ${accent}`}>{value}</p>
    </div>
  );
}

function LoginScreen() {
  return (
    <main className="min-h-screen bg-canvas grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mute">
            Evolut · ops
          </p>
          <h1 className="display text-3xl text-ink mt-2">Admin login</h1>
          <p className="text-sm text-mute mt-2">
            Single-password gate. Set{" "}
            <code className="font-mono">ADMIN_PASSWORD</code> in your env.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
