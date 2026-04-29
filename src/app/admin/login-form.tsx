"use client";

import { useState, FormEvent } from "react";
import { AlertTriangle } from "lucide-react";

export function LoginForm() {
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErr(json.error ?? "Login failed");
        setLoading(false);
        return;
      }
      window.location.href = "/admin";
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        autoFocus
        autoComplete="current-password"
        placeholder="Password"
        className="w-full rounded-2xl border border-hairline bg-canvas-2 px-4 py-3 text-ink placeholder:text-mute focus:border-electric focus:bg-canvas focus:outline-none transition-colors"
      />
      {err && (
        <div className="flex items-start gap-2 text-sm text-copper">
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2.2} />
          <span>{err}</span>
        </div>
      )}
      <button
        type="submit"
        disabled={loading || !pw}
        className="w-full rounded-full bg-ink text-canvas px-6 py-3 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-60"
      >
        {loading ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
