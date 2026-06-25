import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export function GET() {
  try {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT id, title, amount, universities_eligible, criteria,
                deadline, icon, color
         FROM scholarships
         WHERE is_active = 1
         ORDER BY rowid`
      )
      .all() as {
      id: number;
      title: string;
      amount: string;
      universities_eligible: string;
      criteria: string;
      deadline: string;
      icon: string;
      color: string;
    }[];

    return Response.json({ data: rows });
  } catch (err) {
    console.error("[GET /api/scholarships]", err);
    return Response.json({ error: "Failed to load scholarships" }, { status: 500 });
  }
}
