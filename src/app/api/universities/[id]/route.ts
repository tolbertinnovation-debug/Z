import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || typeof id !== "string" || id.length > 100) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const db = getDb();

    const university = db
      .prepare(
        `SELECT u.id, u.name, u.short_name, u.country, u.city, u.established,
                u.ranking, u.image_url, u.description, u.tuition_min, u.tuition_max,
                u.currency, u.has_scholarship, u.rating, u.student_count, u.faculty_ratio,
                u.website, u.accreditation, u.logo, u.logo_color, u.placement, u.video_url
         FROM universities u
         WHERE u.id = ? AND u.is_active = 1`
      )
      .get(id) as Record<string, unknown> | undefined;

    if (!university) {
      return Response.json({ error: "University not found" }, { status: 404 });
    }

    const tags = (
      db
        .prepare("SELECT tag FROM university_tags WHERE university_id = ?")
        .all(id) as { tag: string }[]
    ).map((r) => r.tag);

    const highlights = (
      db
        .prepare(
          "SELECT highlight FROM university_highlights WHERE university_id = ?"
        )
        .all(id) as { highlight: string }[]
    ).map((r) => r.highlight);

    const scholarshipNames = (
      db
        .prepare(
          "SELECT name FROM university_scholarships WHERE university_id = ?"
        )
        .all(id) as { name: string }[]
    ).map((r) => r.name);

    const programs = db
      .prepare(
        `SELECT name, degree_type, duration, fees_per_year
         FROM programs WHERE university_id = ? ORDER BY degree_type, name`
      )
      .all(id) as {
      name: string;
      degree_type: string;
      duration: string;
      fees_per_year: number;
    }[];

    return Response.json({
      data: { ...university, tags, highlights, scholarshipNames, programs },
    });
  } catch (err) {
    console.error("[GET /api/universities/[id]]", err);
    return Response.json(
      { error: "Failed to load university" },
      { status: 500 }
    );
  }
}
