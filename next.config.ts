import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow a sidecar dev server (e.g. Claude Code preview) to use a
  // separate build directory so it can run alongside the main `npm
  // run dev` without fighting over .next file locks on Windows.
  ...(process.env.NEXT_DIST_DIR
    ? { distDir: process.env.NEXT_DIST_DIR }
    : {}),
};

export default nextConfig;
