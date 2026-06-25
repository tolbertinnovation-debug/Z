import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export function GET() {
  try {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT id, student_name, university, program, year, initials,
                avatar_color, story, rating
         FROM testimonials
         WHERE is_featured = 1
         ORDER BY rowid`
      )
      .all() as {
      id: number;
      student_name: string;
      university: string;
      program: string;
      year: string;
      initials: string;
      avatar_color: string;
      story: string;
      rating: number;
    }[];

    return Response.json({ data: rows });
  } catch (err) {
    console.error("[GET /api/testimonials]", err);
    return Response.json({ error: "Failed to load testimonials" }, { status: 500 });
  }
}
