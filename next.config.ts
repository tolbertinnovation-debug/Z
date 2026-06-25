import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell Next.js bundler not to bundle native modules — require them at runtime
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
