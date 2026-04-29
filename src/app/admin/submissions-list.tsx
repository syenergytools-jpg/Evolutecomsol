"use client";

import { useState, useTransition, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Mail, MessageCircle, ExternalLink, AlertTriangle, Filter,
  Search, Trash2, ChevronDown, ChevronUp, StickyNote, Download,
  CheckSquare, Square, X, Archive, Ban, ArrowUpDown,
} from "lucide-react";
import type { ContactSubmissionRow } from "@/lib/supabase";

type Status = ContactSubmissionRow["status"];

const STATUS_TONES: Record<Status, string> = {
  new: "bg-electric/10 text-electric border-electric/30",
  in_progress: "bg-copper/10 text-copper border-copper/30",
  responded: "bg-emerald/10 text-emerald border-emerald/30",
  archived: "bg-mute/10 text-mute border-hairline",
  spam: "bg-ink/10 text-ink/60 border-hairline",
};

const STATUS_OPTIONS: Status[] = ["new", "in_progress", "responded", "archived", "spam"];

type SortKey = "newest" | "oldest" | "name-asc" | "name-desc";

export function SubmissionsList({
  rows,
  filters,
  queryError,
  configured,
}: {
  rows: ContactSubmissionRow[];
  filters: { status: string; service: string };
  queryError: string | null;
  configured: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmBulkAction, setConfirmBulkAction] = useState<string | null>(null);

  const services = Array.from(
    new Set(rows.map((r) => r.service).filter(Boolean) as string[])
  ).sort();

  // Client-side search filter
  const filtered = rows.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.company ?? "").toLowerCase().includes(q) ||
      r.message.toLowerCase().includes(q)
    );
  });

  // Client-side sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sortKey) {
      case "oldest": return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "name-asc": return a.name.localeCompare(b.name);
      case "name-desc": return b.name.localeCompare(a.name);
      default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  function setFilter(key: "status" | "service", value: string) {
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete(key);
    else url.searchParams.set(key, value);
    router.push(url.pathname + url.search);
  }

  async function updateStatus(id: string, status: Status) {
    setUpdateError(null);
    startTransition(async () => {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) { setUpdateError(json.error ?? "Update failed"); return; }
      router.refresh();
    });
  }

  async function saveNotes(id: string, notes: string) {
    setUpdateError(null);
    const res = await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) setUpdateError(json.error ?? "Notes save failed");
    else router.refresh();
  }

  async function deleteSubmission(id: string) {
    setConfirmDeleteId(null);
    setUpdateError(null);
    startTransition(async () => {
      const res = await fetch("/api/admin/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) { setUpdateError(json.error ?? "Delete failed"); return; }
      router.refresh();
    });
  }

  async function bulkAction(action: "archived" | "spam" | "delete") {
    setConfirmBulkAction(null);
    if (selectedIds.size === 0) return;
    setUpdateError(null);
    const ids = Array.from(selectedIds);

    startTransition(async () => {
      if (action === "delete") {
        const res = await fetch("/api/admin/submissions", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) { setUpdateError(json.error ?? "Bulk delete failed"); return; }
      } else {
        for (const id of ids) {
          await fetch("/api/admin/submissions", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: action }),
          });
        }
      }
      setSelectedIds(new Set());
      router.refresh();
    });
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIds.size === sorted.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(sorted.map((r) => r.id)));
  }

  function exportCSV() {
    const headers = ["Name","Email","Company","Phone","Service","Reason","Budget","Message","Status","Notes","Created","Responded"];
    const csvRows = [headers.join(",")];
    for (const r of sorted) {
      csvRows.push([
        esc(r.name), esc(r.email), esc(r.company), esc(r.phone),
        esc(r.service), esc(r.reason), esc(r.budget), esc(r.message),
        esc(r.status), esc(r.notes), esc(r.created_at), esc(r.responded_at),
      ].join(","));
    }
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `evolut-briefs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }

  if (queryError) {
    return (
      <div className="container-x py-10">
        <div className="rounded-2xl border border-copper/40 bg-copper/[0.06] p-5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-copper shrink-0 mt-0.5" strokeWidth={2.2} />
          <div>
            <p className="text-sm font-semibold text-ink mb-1">Couldn&rsquo;t load submissions</p>
            <p className="text-sm text-ink-soft">{queryError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-8 md:py-10">
      {/* Toolbar */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" strokeWidth={2.2} />
          <input
            type="text"
            placeholder="Search name, email, company…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-hairline bg-surface pl-9 pr-4 py-2 text-sm focus:border-electric focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink">
              <X className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          )}
        </div>

        <div className="inline-flex items-center gap-2 text-mute">
          <Filter className="h-4 w-4" strokeWidth={2.2} />
        </div>

        <select value={filters.status} onChange={(e) => setFilter("status", e.target.value)}
          className="rounded-full border border-hairline bg-surface px-4 py-1.5 text-sm focus:border-electric focus:outline-none">
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>

        <select value={filters.service} onChange={(e) => setFilter("service", e.target.value)}
          className="rounded-full border border-hairline bg-surface px-4 py-1.5 text-sm focus:border-electric focus:outline-none">
          <option value="all">All services</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* Sort */}
        <div className="inline-flex items-center gap-1">
          <ArrowUpDown className="h-3.5 w-3.5 text-mute" strokeWidth={2.2} />
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-full border border-hairline bg-surface px-3 py-1.5 text-sm focus:border-electric focus:outline-none">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
          </select>
        </div>

        {/* Export */}
        <button onClick={exportCSV} className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-xs text-ink hover:bg-surface transition-colors">
          <Download className="h-3.5 w-3.5" strokeWidth={2.2} /> CSV
        </button>

        <span className="text-sm text-mute font-mono">{sorted.length} {sorted.length === 1 ? "brief" : "briefs"}</span>
      </div>

      {!configured && (
        <div className="mb-6 rounded-2xl border border-electric/30 bg-electric/[0.06] p-4 text-sm text-ink">
          The form is live but no submissions will persist until Supabase env keys are set.
        </div>
      )}

      {updateError && (
        <div className="mb-4 rounded-xl border border-copper/40 bg-copper/[0.06] p-3 text-sm text-ink">{updateError}</div>
      )}

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-electric/30 bg-electric/[0.04] px-5 py-3">
          <button onClick={toggleSelectAll} className="text-xs text-electric hover:underline font-medium">
            {selectedIds.size === sorted.length ? "Deselect all" : "Select all"}
          </button>
          <span className="text-sm text-ink font-medium">{selectedIds.size} selected</span>
          <div className="ml-auto flex gap-2">
            <button onClick={() => setConfirmBulkAction("archived")}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-hairline px-3 py-1.5 text-xs text-ink hover:border-ink/40">
              <Archive className="h-3 w-3" strokeWidth={2.2} /> Archive
            </button>
            <button onClick={() => setConfirmBulkAction("spam")}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-hairline px-3 py-1.5 text-xs text-ink hover:border-ink/40">
              <Ban className="h-3 w-3" strokeWidth={2.2} /> Spam
            </button>
            <button onClick={() => setConfirmBulkAction("delete")}
              className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-100">
              <Trash2 className="h-3 w-3" strokeWidth={2.2} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Confirm bulk dialog */}
      {confirmBulkAction && (
        <ConfirmDialog
          message={`${confirmBulkAction === "delete" ? "Permanently delete" : `Mark as ${confirmBulkAction}`} ${selectedIds.size} submission(s)?`}
          destructive={confirmBulkAction === "delete"}
          onConfirm={() => bulkAction(confirmBulkAction as "archived" | "spam" | "delete")}
          onCancel={() => setConfirmBulkAction(null)}
        />
      )}

      {sorted.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {sorted.map((r) => (
            <SubmissionCard
              key={r.id}
              row={r}
              onChangeStatus={updateStatus}
              onSaveNotes={saveNotes}
              onDelete={() => setConfirmDeleteId(r.id)}
              busy={pending}
              expanded={expandedId === r.id}
              onToggleExpand={() => setExpandedId(expandedId === r.id ? null : r.id)}
              selected={selectedIds.has(r.id)}
              onToggleSelect={() => toggleSelect(r.id)}
            />
          ))}
        </div>
      )}

      {/* Confirm single delete dialog */}
      {confirmDeleteId && (
        <ConfirmDialog
          message="Permanently delete this submission? This cannot be undone."
          destructive
          onConfirm={() => deleteSubmission(confirmDeleteId)}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
}

function SubmissionCard({
  row, onChangeStatus, onSaveNotes, onDelete, busy,
  expanded, onToggleExpand, selected, onToggleSelect,
}: {
  row: ContactSubmissionRow;
  onChangeStatus: (id: string, status: Status) => void;
  onSaveNotes: (id: string, notes: string) => void;
  onDelete: () => void;
  busy: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  selected: boolean;
  onToggleSelect: () => void;
}) {
  const [notes, setNotes] = useState(row.notes ?? "");
  const [notesDirty, setNotesDirty] = useState(false);
  const created = new Date(row.created_at);
  const ago = formatRelative(created);
  const phoneDigits = row.phone?.replace(/[^0-9]/g, "");

  function handleNotesChange(val: string) {
    setNotes(val);
    setNotesDirty(val !== (row.notes ?? ""));
  }

  function handleSaveNotes() {
    if (!notesDirty) return;
    onSaveNotes(row.id, notes);
    setNotesDirty(false);
  }

  const replySubject = `Re: your brief${row.service ? ` (${row.service})` : ""}`;
  const replyBody = `Hi ${row.name.split(" ")[0]},\n\nThanks for reaching out to Evolut` +
    (row.service ? ` about ${row.service}` : "") +
    `.\n\nI've reviewed your brief and would love to set up a quick call to discuss next steps.\n\nBest,\nEvolut Ops`;

  return (
    <article className={`rounded-3xl border bg-surface transition-all ${selected ? "border-electric/50 ring-1 ring-electric/20" : "border-hairline"} ${expanded ? "shadow-lg" : ""}`}>
      {/* Main row */}
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-start gap-4">
          {/* Checkbox */}
          <button onClick={onToggleSelect} className="mt-1 shrink-0 text-mute hover:text-ink transition-colors">
            {selected ? <CheckSquare className="h-4 w-4 text-electric" strokeWidth={2.2} /> : <Square className="h-4 w-4" strokeWidth={2.2} />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-base font-semibold text-ink truncate">{row.name}</h3>
              <span className="text-mute">·</span>
              <a href={`mailto:${row.email}`} className="text-sm text-ink-soft hover:text-electric truncate">{row.email}</a>
              {row.company && (<><span className="text-mute">·</span><span className="text-sm text-mute">{row.company}</span></>)}
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {row.service && <Chip>{row.service}</Chip>}
              {row.reason && <Chip muted>{row.reason}</Chip>}
              {row.budget && <Chip muted>{row.budget}</Chip>}
              {row.notes && <span title="Has notes" className="text-copper"><StickyNote className="h-3 w-3 inline" strokeWidth={2.2} /></span>}
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mute ml-auto">{ago}</span>
            </div>
            <p className={`text-sm text-ink-soft leading-[1.6] ${expanded ? "whitespace-pre-wrap" : "line-clamp-2"}`}>{row.message}</p>
          </div>

          {/* Actions */}
          <div className="w-full md:w-auto md:min-w-[200px] md:max-w-[240px] space-y-2.5">
            <select value={row.status} disabled={busy} onChange={(e) => onChangeStatus(row.id, e.target.value as Status)}
              className={`w-full rounded-full border px-3 py-1.5 text-xs font-mono uppercase tracking-[0.14em] disabled:opacity-60 ${STATUS_TONES[row.status]}`}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
            </select>

            <div className="flex gap-2">
              <a href={`mailto:${row.email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink text-canvas px-3 py-2 text-xs font-medium hover:bg-ink-soft">
                <Mail className="h-3.5 w-3.5" strokeWidth={2.2} /> Reply
              </a>
              {phoneDigits && (
                <a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald text-canvas px-3 py-2 text-xs font-medium hover:bg-emerald/90">
                  <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.2} /> WhatsApp
                </a>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={onToggleExpand}
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-full border border-hairline px-3 py-1.5 text-xs text-ink hover:bg-canvas-2 transition-colors">
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {expanded ? "Collapse" : "Details"}
              </button>
              <button onClick={onDelete}
                className="inline-flex items-center justify-center gap-1 rounded-full border border-hairline px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors">
                <Trash2 className="h-3 w-3" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded detail panel */}
      {expanded && (
        <div className="border-t border-hairline px-5 md:px-6 py-5 bg-canvas-2/50 rounded-b-3xl space-y-5">
          {/* Metadata grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetaItem label="Submitted" value={created.toLocaleString()} />
            <MetaItem label="Phone" value={row.phone || "—"} />
            {row.responded_at && <MetaItem label="Responded" value={new Date(row.responded_at).toLocaleString()} />}
            {row.source_url && (
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mute mb-1">Source</p>
                <a href={row.source_url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-electric hover:underline inline-flex items-center gap-1 truncate max-w-[180px]">
                  <ExternalLink className="h-3 w-3 shrink-0" strokeWidth={2.2} />
                  {row.source_url.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>

          {/* Full message */}
          <div>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mute mb-2">Full message</p>
            <div className="rounded-2xl border border-hairline bg-canvas p-4 text-sm text-ink leading-[1.7] whitespace-pre-wrap">
              {row.message}
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mute inline-flex items-center gap-1.5">
                <StickyNote className="h-3 w-3" strokeWidth={2.2} /> Admin notes
              </p>
              {notesDirty && (
                <button onClick={handleSaveNotes}
                  className="text-xs text-electric font-medium hover:underline">
                  Save notes
                </button>
              )}
            </div>
            <textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              onBlur={handleSaveNotes}
              placeholder="Add internal notes about this lead…"
              rows={3}
              className="w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink placeholder:text-mute focus:border-electric focus:outline-none transition-colors resize-y"
            />
          </div>

          {/* Quick metadata */}
          <div className="flex flex-wrap gap-2 text-[0.55rem] font-mono uppercase tracking-[0.14em] text-mute">
            {row.user_agent && <span title={row.user_agent}>UA: {row.user_agent.slice(0, 40)}…</span>}
            {row.ip_hash && <span>IP hash: {row.ip_hash.slice(0, 12)}…</span>}
          </div>
        </div>
      )}
    </article>
  );
}

function Chip({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span className={`font-mono text-[0.55rem] uppercase tracking-[0.16em] rounded-full bg-canvas-2 px-2 py-0.5 ${muted ? "text-ink-soft" : "text-ink"}`}>
      {children}
    </span>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mute mb-1">{label}</p>
      <p className="text-sm text-ink">{value}</p>
    </div>
  );
}

function ConfirmDialog({ message, destructive, onConfirm, onCancel }: {
  message: string; destructive?: boolean; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/40 backdrop-blur-sm p-4" onClick={onCancel}>
      <div className="w-full max-w-sm rounded-3xl border border-hairline bg-canvas p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm text-ink mb-5">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="rounded-full border border-hairline px-4 py-2 text-sm text-ink hover:bg-surface">Cancel</button>
          <button onClick={onConfirm}
            className={`rounded-full px-4 py-2 text-sm font-medium text-canvas ${destructive ? "bg-red-600 hover:bg-red-700" : "bg-ink hover:bg-ink-soft"}`}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-hairline-strong bg-surface px-6 py-16 text-center">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute mb-2">Nothing yet</p>
      <h3 className="display text-2xl text-ink mb-2">No briefs in this view.</h3>
      <p className="text-sm text-mute max-w-md mx-auto">
        New submissions land here in real time. Try clearing filters if you expected results.
      </p>
    </div>
  );
}

function formatRelative(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const m = Math.floor(diffMs / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return date.toLocaleDateString();
}

function esc(val: string | null | undefined): string {
  if (!val) return "";
  const s = val.replace(/"/g, '""');
  return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s}"` : s;
}
