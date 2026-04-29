"use client";

import { useState } from "react";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/admin/login", { method: "DELETE" });
    window.location.href = "/admin";
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm text-ink hover:border-ink/40 transition-colors disabled:opacity-60"
    >
      {loading ? "Logging out…" : "Log out"}
    </button>
  );
}
