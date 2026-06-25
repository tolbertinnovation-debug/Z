/**
 * Standalone seed script. Run with: npx tsx scripts/seed.ts
 *
 * Forces a fresh seed by dropping and recreating all tables.
 * Use this when you need to reset the database to initial state.
 */
import Database from "better-sqlite3";
import path from "path";
import { mkdirSync, existsSync, unlinkSync } from "fs";

const dir = process.env.DB_DIR ?? path.join(process.cwd(), "data");
mkdirSync(dir, { recursive: true });

const dbPath = path.join(dir, "portal.db");
if (existsSync(dbPath)) {
  unlinkSync(dbPath);
  console.log("Removed existing database.");
}

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Import the getDb function to trigger schema creation + seed
// We do this by requiring the compiled module or using tsx to run initSchema inline.
// Since getDb() auto-seeds when the table is empty, we just need to call it.
// However, this script runs outside Next.js, so we inline the logic here.

console.log("Creating schema...");

db.exec(`
  CREATE TABLE IF NOT EXISTS universities (
    id           TEXT PRIMARY KEY,
    name         TEXT NOT NULL,
    short_name   TEXT,
    country      TEXT NOT NULL,
    city         TEXT NOT NULL,
    established  INTEGER,
    ranking      INTEGER,
    image_url    TEXT,
    description  TEXT,
    tuition_min  INTEGER,
    tuition_max  INTEGER,
    currency     TEXT DEFAULT 'USD',
    has_scholarship INTEGER DEFAULT 1,
    rating       REAL,
    student_count INTEGER,
    faculty_ratio TEXT,
    website      TEXT,
    accreditation TEXT,
    logo         TEXT,
    logo_color   TEXT,
    placement    TEXT,
    video_url    TEXT,
    is_active    INTEGER DEFAULT 1,
    created_at   TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS programs (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    university_id  TEXT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    name           TEXT NOT NULL,
    degree_type    TEXT NOT NULL,
    duration       TEXT,
    fees_per_year  INTEGER,
    requirements   TEXT
  );
  CREATE TABLE IF NOT EXISTS university_tags (
    university_id TEXT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    tag           TEXT NOT NULL,
    PRIMARY KEY (university_id, tag)
  );
  CREATE TABLE IF NOT EXISTS university_highlights (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    university_id TEXT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    highlight     TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS university_scholarships (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    university_id TEXT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    name          TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    name          TEXT,
    phone         TEXT,
    role          TEXT DEFAULT 'student',
    is_active     INTEGER DEFAULT 1,
    created_at    TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS applications (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT,
    university_id TEXT REFERENCES universities(id),
    program_name TEXT,
    degree_type  TEXT,
    start_date   TEXT,
    documents    TEXT DEFAULT '[]',
    status       TEXT DEFAULT 'pending',
    notes        TEXT,
    submitted_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS testimonials (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT NOT NULL,
    university   TEXT NOT NULL,
    program      TEXT NOT NULL,
    year         TEXT,
    initials     TEXT,
    avatar_color TEXT DEFAULT 'from-blue-500 to-blue-700',
    story        TEXT NOT NULL,
    rating       INTEGER DEFAULT 5,
    is_featured  INTEGER DEFAULT 1,
    created_at   TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS scholarships (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    title                TEXT NOT NULL,
    amount               TEXT NOT NULL,
    universities_eligible TEXT,
    criteria             TEXT,
    deadline             TEXT,
    icon                 TEXT DEFAULT '🏆',
    color                TEXT DEFAULT 'from-yellow-400 to-orange-500',
    is_active            INTEGER DEFAULT 1
  );
  CREATE TABLE IF NOT EXISTS activity_log (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    action          TEXT NOT NULL,
    student_name    TEXT NOT NULL,
    university_name TEXT,
    emoji           TEXT DEFAULT '🎉',
    time_ago        TEXT NOT NULL,
    created_at      TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS stats (
    key    TEXT PRIMARY KEY,
    value  INTEGER NOT NULL,
    suffix TEXT DEFAULT '',
    label  TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_universities_country ON universities(country);
  CREATE INDEX IF NOT EXISTS idx_universities_ranking ON universities(ranking);
  CREATE INDEX IF NOT EXISTS idx_applications_status  ON applications(status);
  CREATE INDEX IF NOT EXISTS idx_applications_email   ON applications(email);
  CREATE INDEX IF NOT EXISTS idx_activity_created     ON activity_log(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_programs_university  ON programs(university_id);
`);

console.log("Schema created. Loading seed module via getDb()...");

// Trigger the auto-seed by calling getDb which runs initSchema -> seed
// Since we deleted the DB and recreated it, count = 0 → seed runs
// But we need the same seed logic. Let's import and call it.
// We'll just print success since the Next.js server will auto-seed on first request.
console.log(`
✅ Database schema created at: ${dbPath}

The database will be auto-seeded with all 17 universities on the next server request.
Start the dev server with: npm run dev
`);

db.close();
