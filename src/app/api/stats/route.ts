import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export function GET() {
  try {
    const db = getDb();
    const rows = db
      .prepare("SELECT key, value, suffix, label FROM stats ORDER BY rowid")
      .all() as { key: string; value: number; suffix: string; label: string }[];
    return Response.json({ data: rows });
  } catch (err) {
    console.error("[GET /api/stats]", err);
    return Response.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
