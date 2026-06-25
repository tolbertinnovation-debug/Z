import { getDb } from "@/lib/db";

export const runtime = "nodejs";

// Simple in-memory rate limiter: 10 submissions per IP per hour
const rateMap = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, reset: now + 3_600_000 };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + 3_600_000; }
  entry.count++;
  rateMap.set(ip, entry);
  return entry.count > 10;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\+\-\(\)]{7,20}$/.test(phone);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (rateLimit(ip))
    return Response.json({ error: "Too many requests" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate required fields
  const studentName = String(body.student_name ?? "").trim().slice(0, 100);
  const email       = String(body.email ?? "").trim().slice(0, 150);
  const phone       = String(body.phone ?? "").trim().slice(0, 30);
  const universityId = String(body.university_id ?? "").trim().slice(0, 100);
  const programName  = String(body.program_name ?? "").trim().slice(0, 200);
  const degreeType   = String(body.degree_type ?? "undergraduate").trim();
  const startDate    = String(body.start_date ?? "").trim().slice(0, 20);
  const notes        = String(body.notes ?? "").trim().slice(0, 1000);

  if (!studentName) return Response.json({ error: "Name is required" }, { status: 400 });
  if (!email || !isValidEmail(email)) return Response.json({ error: "Valid email is required" }, { status: 400 });
  if (phone && !isValidPhone(phone)) return Response.json({ error: "Invalid phone number" }, { status: 400 });
  if (!universityId) return Response.json({ error: "University is required" }, { status: 400 });
  if (!programName) return Response.json({ error: "Program name is required" }, { status: 400 });

  const allowedDegrees = ["undergraduate", "postgraduate", "phd", "diploma"];
  if (!allowedDegrees.includes(degreeType))
    return Response.json({ error: "Invalid degree type" }, { status: 400 });

  try {
    const db = getDb();

    // Verify university exists
    const uni = db.prepare("SELECT id FROM universities WHERE id = ? AND is_active = 1").get(universityId);
    if (!uni)
      return Response.json({ error: "University not found" }, { status: 404 });

    const result = db.prepare(`
      INSERT INTO applications
        (student_name, email, phone, university_id, program_name, degree_type, start_date, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(studentName, email, phone || null, universityId, programName, degreeType, startDate || null, notes || null);

    return Response.json(
      { success: true, id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/applications]", err);
    return Response.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
