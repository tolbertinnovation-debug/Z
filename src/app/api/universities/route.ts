import { getDb } from "@/lib/db";

export const runtime = "nodejs";

// Simple in-memory rate limiter: 60 requests per IP per minute
const rateMap = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, reset: now + 60_000 };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + 60_000; }
  entry.count++;
  rateMap.set(ip, entry);
  return entry.count > 60;
}

export function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (rateLimit(ip))
    return Response.json({ error: "Too many requests" }, { status: 429 });

  try {
    const { searchParams } = new URL(request.url);
    const search    = searchParams.get("search")?.trim().slice(0, 100) ?? "";
    const country   = searchParams.get("country")?.trim() ?? "";
    const minTuition = Number(searchParams.get("minTuition") ?? 0);
    const maxTuition = Number(searchParams.get("maxTuition") ?? 999999);
    const hasScholarship = searchParams.get("scholarship") === "true";
    const sortBy    = searchParams.get("sort") ?? "ranking";
    const limit     = Math.min(Number(searchParams.get("limit") ?? 50), 50);
    const offset    = Number(searchParams.get("offset") ?? 0);

    const db = getDb();

    // Build query dynamically with safe parameterized placeholders
    const conditions: string[] = ["u.is_active = 1"];
    const args: (string | number)[] = [];

    if (search) {
      conditions.push(`(
        u.name LIKE ? OR u.city LIKE ? OR u.country LIKE ? OR u.accreditation LIKE ?
        OR EXISTS (SELECT 1 FROM programs p WHERE p.university_id = u.id AND p.name LIKE ?)
        OR EXISTS (SELECT 1 FROM university_tags t WHERE t.university_id = u.id AND t.tag LIKE ?)
      )`);
      const q = `%${search}%`;
      args.push(q, q, q, q, q, q);
    }
    if (country) { conditions.push("u.country = ?"); args.push(country); }
    if (hasScholarship) { conditions.push("u.has_scholarship = 1"); }
    conditions.push("u.tuition_min >= ? AND u.tuition_max <= ?");
    args.push(minTuition, maxTuition);

    const orderMap: Record<string, string> = {
      ranking: "u.ranking ASC",
      rating: "u.rating DESC",
      tuition_low: "u.tuition_min ASC",
      tuition_high: "u.tuition_min DESC",
    };
    const order = orderMap[sortBy] ?? "u.ranking ASC";

    const where = conditions.join(" AND ");
    const sql = `
      SELECT u.id, u.name, u.short_name, u.country, u.city, u.ranking,
             u.image_url, u.rating, u.student_count, u.tuition_min, u.tuition_max,
             u.currency, u.has_scholarship, u.accreditation, u.logo, u.logo_color,
             u.placement, u.description, u.website
      FROM universities u
      WHERE ${where}
      ORDER BY ${order}
      LIMIT ? OFFSET ?
    `;
    args.push(limit, offset);

    const rows = db.prepare(sql).all(...args);

    // Attach tags and programs to each university
    const enriched = (rows as Record<string, unknown>[]).map((u) => {
      const tags = (db.prepare("SELECT tag FROM university_tags WHERE university_id = ?").all(u.id) as { tag: string }[]).map(r => r.tag);
      const programs_ug = (db.prepare("SELECT name FROM programs WHERE university_id = ? AND degree_type = 'undergraduate' LIMIT 3").all(u.id) as { name: string }[]).map(r => r.name);
      const programs_pg = (db.prepare("SELECT name FROM programs WHERE university_id = ? AND degree_type = 'postgraduate' LIMIT 5").all(u.id) as { name: string }[]).map(r => r.name);
      return { ...u, tags, programs_ug, programs_pg };
    });

    const totalRow = db.prepare(`SELECT COUNT(*) as n FROM universities u WHERE ${where}`).get(...args.slice(0, -2)) as { n: number };

    return Response.json({ data: enriched, total: totalRow.n });
  } catch (err) {
    console.error("[GET /api/universities]", err);
    return Response.json({ error: "Failed to load universities" }, { status: 500 });
  }
}
