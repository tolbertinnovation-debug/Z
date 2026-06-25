import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit") ?? 10), 20);

    const db = getDb();
    const rows = db
      .prepare(
        `SELECT id, action, student_name, university_name, emoji, time_ago
         FROM activity_log
         ORDER BY id DESC
         LIMIT ?`
      )
      .all(limit) as {
      id: number;
      action: string;
      student_name: string;
      university_name: string | null;
      emoji: string;
      time_ago: string;
    }[];

    return Response.json({ data: rows });
  } catch (err) {
    console.error("[GET /api/activity]", err);
    return Response.json({ error: "Failed to load activity" }, { status: 500 });
  }
}
