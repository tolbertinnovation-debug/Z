import Database from "better-sqlite3";
import path from "path";
import { mkdirSync } from "fs";

// Singleton: survive Next.js hot-module replacement in dev
const g = globalThis as unknown as { __db: Database.Database | undefined };

export function getDb(): Database.Database {
  if (!g.__db) {
    const dir = process.env.DB_DIR ?? path.join(process.cwd(), "data");
    mkdirSync(dir, { recursive: true });
    const db = new Database(path.join(dir, "portal.db"));
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initSchema(db);
    g.__db = db;
  }
  return g.__db;
}

// ─── Schema ────────────────────────────────────────────────────────────────

function initSchema(db: Database.Database) {
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

    CREATE TABLE IF NOT EXISTS student_profiles (
      id                    INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id               INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      nationality           TEXT,
      date_of_birth         TEXT,
      passport_number       TEXT,
      waec_score            TEXT,
      highest_qualification TEXT,
      desired_program       TEXT,
      preferred_country     TEXT,
      budget_range          TEXT,
      created_at            TEXT DEFAULT (datetime('now'))
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

    -- Indexes for common queries
    CREATE INDEX IF NOT EXISTS idx_universities_country ON universities(country);
    CREATE INDEX IF NOT EXISTS idx_universities_ranking ON universities(ranking);
    CREATE INDEX IF NOT EXISTS idx_applications_status  ON applications(status);
    CREATE INDEX IF NOT EXISTS idx_applications_email   ON applications(email);
    CREATE INDEX IF NOT EXISTS idx_activity_created     ON activity_log(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_programs_university  ON programs(university_id);
  `);

  // Auto-seed if the universities table is empty
  const count = (
    db.prepare("SELECT COUNT(*) as n FROM universities").get() as { n: number }
  ).n;
  if (count === 0) seed(db);
}

// ─── Seed Data ─────────────────────────────────────────────────────────────

function seed(db: Database.Database) {
  const addUni = db.prepare(`
    INSERT OR IGNORE INTO universities
      (id, name, short_name, country, city, established, ranking, image_url,
       description, tuition_min, tuition_max, currency, has_scholarship,
       rating, student_count, faculty_ratio, website, accreditation,
       logo, logo_color, placement, video_url)
    VALUES
      (@id, @name, @short_name, @country, @city, @established, @ranking, @image_url,
       @description, @tuition_min, @tuition_max, @currency, @has_scholarship,
       @rating, @student_count, @faculty_ratio, @website, @accreditation,
       @logo, @logo_color, @placement, @video_url)
  `);

  const addTag  = db.prepare("INSERT OR IGNORE INTO university_tags (university_id, tag) VALUES (?, ?)");
  const addHL   = db.prepare("INSERT INTO university_highlights (university_id, highlight) VALUES (?, ?)");
  const addSch  = db.prepare("INSERT INTO university_scholarships (university_id, name) VALUES (?, ?)");
  const addProg = db.prepare(`
    INSERT INTO programs (university_id, name, degree_type, duration, fees_per_year)
    VALUES (?, ?, ?, ?, ?)
  `);

  const universities: UniversitySeed[] = [
    {
      id: "graphic-era", name: "Graphic Era University", short_name: "GE",
      country: "India", city: "Dehradun", established: 1993, ranking: 42,
      image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      description: "Graphic Era University is a premier institution known for its excellence in technology, engineering, and management education.",
      tuition_min: 2500, tuition_max: 6000, currency: "USD", has_scholarship: 1,
      rating: 4.7, student_count: 12000, faculty_ratio: "1:15",
      website: "https://geu.ac.in", accreditation: "NAAC A+",
      logo: "GE", logo_color: "#1a56db", placement: "92%",
      video_url: "https://www.youtube.com/embed/XuW9Yc6Ow2E",
      tags: ["Technology", "Engineering", "Management"],
      highlights: ["NBA Accredited", "International Exchange Programs", "100+ Research Centers", "Smart Campus"],
      scholarships: ["Merit Scholarship (up to 50%)", "Sports Scholarship", "International Student Scholarship"],
      programs_ug: ["Computer Science", "Information Technology", "Business Administration", "Nursing", "Engineering"],
      programs_pg: ["MBA", "MSc Computer Science", "MA English", "PhD Programs", "MTech"],
    },
    {
      id: "pp-savani", name: "PP Savani University", short_name: "PPSU",
      country: "India", city: "Surat", established: 2018, ranking: 78,
      image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      description: "PP Savani University is a modern university offering cutting-edge programs in engineering, management, sciences, and healthcare.",
      tuition_min: 2000, tuition_max: 5500, currency: "USD", has_scholarship: 1,
      rating: 4.5, student_count: 8500, faculty_ratio: "1:18",
      website: "https://ppsavani.edu.in", accreditation: "NAAC A",
      logo: "PPSU", logo_color: "#0e9f6e", placement: "88%",
      video_url: "https://www.youtube.com/embed/bsV4_nIV2sU",
      tags: ["Engineering", "Healthcare", "Business"],
      highlights: ["Industry 4.0 Labs", "Innovation Hub", "International Collaborations", "Green Campus"],
      scholarships: ["Academic Excellence Scholarship", "Need-Based Aid", "Sports Excellence Award"],
      programs_ug: ["Computer Science", "Mechanical Engineering", "Civil Engineering", "Pharmacy", "Nursing"],
      programs_pg: ["MBA", "MTech", "MSc", "PhD Programs"],
    },
    {
      id: "gulzar-group", name: "Gulzar Group of Institutes", short_name: "GGI",
      country: "India", city: "Ludhiana", established: 2001, ranking: 95,
      image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      description: "Gulzar Group of Institutes is one of Punjab's leading educational institutions offering diverse programs.",
      tuition_min: 1800, tuition_max: 4500, currency: "USD", has_scholarship: 1,
      rating: 4.3, student_count: 10000, faculty_ratio: "1:20",
      website: "https://ggi.ac.in", accreditation: "NAAC B++",
      logo: "GGI", logo_color: "#7e3af2", placement: "85%",
      video_url: "https://www.youtube.com/embed/eCr_U6N5dHA",
      tags: ["Pharmacy", "Engineering", "Agriculture"],
      highlights: ["Pharmacy Research Labs", "Agricultural Fields", "Sports Complex", "Cultural Hub"],
      scholarships: ["Merit Scholarship", "Rural Student Scholarship", "Girls Scholarship"],
      programs_ug: ["Computer Science", "Electronics", "Pharmacy", "Business Administration", "Agriculture"],
      programs_pg: ["MBA", "MTech", "MSc Pharmacy", "PhD Programs"],
    },
    {
      id: "mats-university", name: "MATS University", short_name: "MATS",
      country: "India", city: "Raipur", established: 2006, ranking: 112,
      image_url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
      description: "MATS University offers quality education in engineering, management, law, and education.",
      tuition_min: 1500, tuition_max: 4000, currency: "USD", has_scholarship: 1,
      rating: 4.2, student_count: 7500, faculty_ratio: "1:22",
      website: "https://matsuniversity.ac.in", accreditation: "NAAC B+",
      logo: "MATS", logo_color: "#e3a008", placement: "82%",
      video_url: "https://www.youtube.com/embed/toDqZc-Hcs0",
      tags: ["Law", "Education", "Hotel Management"],
      highlights: ["Moot Court", "Hotel Management Kitchen", "Digital Library", "Eco-Friendly Campus"],
      scholarships: ["Academic Merit Award", "International Student Grant", "Financial Need Scholarship"],
      programs_ug: ["Computer Science", "Civil Engineering", "Law", "Hotel Management"],
      programs_pg: ["MBA", "LLM", "MEd", "MTech", "PhD Programs"],
    },
    {
      id: "sr-university", name: "SR University", short_name: "SRU",
      country: "India", city: "Warangal", established: 2013, ranking: 87,
      image_url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80",
      description: "SR University is a dynamic institution focused on engineering, technology, and management education.",
      tuition_min: 2200, tuition_max: 5000, currency: "USD", has_scholarship: 1,
      rating: 4.6, student_count: 6000, faculty_ratio: "1:16",
      website: "https://sru.edu.in", accreditation: "NAAC A",
      logo: "SRU", logo_color: "#f05252", placement: "94%",
      video_url: "https://www.youtube.com/embed/3Ir4C6wdn3o",
      tags: ["AI/ML", "Data Science", "Technology"],
      highlights: ["AI Research Center", "Industry 4.0 Labs", "Startup Incubator", "International Faculty"],
      scholarships: ["Tech Excellence Award", "Innovation Scholarship", "Merit-Based Financial Aid"],
      programs_ug: ["Computer Science", "AI & ML", "Data Science", "Business Administration"],
      programs_pg: ["MTech AI", "MBA Technology", "MSc Data Science", "PhD Engineering"],
    },
    {
      id: "marwadi-university", name: "Marwadi University", short_name: "MU",
      country: "India", city: "Rajkot", established: 2016, ranking: 65,
      image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      description: "Marwadi University is known for innovation, entrepreneurship, and holistic education.",
      tuition_min: 2500, tuition_max: 5500, currency: "USD", has_scholarship: 1,
      rating: 4.8, student_count: 9000, faculty_ratio: "1:14",
      website: "https://marwadiuniversity.ac.in", accreditation: "NAAC A+",
      logo: "MU", logo_color: "#0694a2", placement: "96%",
      video_url: "https://www.youtube.com/embed/Ni3ScjGpVjI",
      tags: ["Innovation", "Entrepreneurship", "Engineering"],
      highlights: ["Top NAAC A+ Rating", "Startup Incubator with 50+ Startups", "International Exchange", "Industry 4.0 Lab"],
      scholarships: ["Startup Scholarship", "Excellence Award", "Sports Scholarship", "International Grant"],
      programs_ug: ["Computer Engineering", "Information Technology", "Chemical Engineering", "Business Administration"],
      programs_pg: ["MBA", "MTech", "MSc", "PhD Programs"],
    },
    {
      id: "desh-bhagat", name: "Desh Bhagat University", short_name: "DBU",
      country: "India", city: "Mandi Gobindgarh", established: 2012, ranking: 103,
      image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
      description: "Desh Bhagat University is a premier private university in Punjab offering comprehensive programs.",
      tuition_min: 1800, tuition_max: 4200, currency: "USD", has_scholarship: 1,
      rating: 4.4, student_count: 11000, faculty_ratio: "1:19",
      website: "https://deshbhagatuniversity.in", accreditation: "NAAC A",
      logo: "DBU", logo_color: "#3f83f8", placement: "87%",
      video_url: "https://www.youtube.com/embed/DQIeqtHsdi4",
      tags: ["Agriculture", "Nursing", "Education"],
      highlights: ["Agricultural Research Farm", "Nursing Skills Lab", "State Sports Facilities"],
      scholarships: ["Merit Scholarship", "Agriculture Excellence Award", "Sports Scholarship"],
      programs_ug: ["Computer Science", "Agriculture", "Nursing", "Pharmacy", "Physical Education"],
      programs_pg: ["MBA", "MSc Agriculture", "MPharm", "PhD Programs"],
    },
    {
      id: "lpu", name: "Lovely Professional University", short_name: "LPU",
      country: "India", city: "Phagwara", established: 2005, ranking: 28,
      image_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
      description: "LPU is one of India's largest private universities, renowned globally for diverse programs and exceptional placement.",
      tuition_min: 3000, tuition_max: 7000, currency: "USD", has_scholarship: 1,
      rating: 4.9, student_count: 30000, faculty_ratio: "1:12",
      website: "https://lpu.in", accreditation: "NAAC A++",
      logo: "LPU", logo_color: "#ff5a1f", placement: "98%",
      video_url: "https://www.youtube.com/embed/coEaOaAhxTs",
      tags: ["Global University", "Industry Connect", "Research"],
      highlights: ["QS World Ranked", "30,000+ Students", "50+ Countries", "600+ Programs"],
      scholarships: ["Chancellor's Excellence Scholarship", "Academic Merit Award", "Sports Championship Scholarship"],
      programs_ug: ["Computer Science", "IT", "Business Administration", "Design", "Law", "Hotel Management"],
      programs_pg: ["MBA", "MTech", "MSc", "LLM", "PhD Programs", "MCA"],
    },
    {
      id: "royal-global", name: "Royal Global University", short_name: "RGU",
      country: "India", city: "Guwahati", established: 2013, ranking: 118,
      image_url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
      description: "Royal Global University offers quality education in management, engineering, healthcare, and social sciences.",
      tuition_min: 1600, tuition_max: 4000, currency: "USD", has_scholarship: 1,
      rating: 4.1, student_count: 5000, faculty_ratio: "1:20",
      website: "https://rgu.ac", accreditation: "NAAC B++",
      logo: "RGU", logo_color: "#c81e1e", placement: "80%",
      video_url: "https://www.youtube.com/embed/pZnaKowtN8w",
      tags: ["Healthcare", "Management", "Social Work"],
      highlights: ["Northeast India's Hub", "Healthcare Training Center", "Social Entrepreneurship Lab"],
      scholarships: ["Regional Merit Award", "Healthcare Excellence Scholarship", "First Generation Learner Grant"],
      programs_ug: ["Business Administration", "Computer Applications", "Nursing", "Social Work"],
      programs_pg: ["MBA", "MCA", "MSc Nursing", "MSW", "PhD Programs"],
    },
    {
      id: "sharda", name: "SHARDA University", short_name: "SU",
      country: "India", city: "Greater Noida", established: 2009, ranking: 52,
      image_url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
      description: "Sharda University is one of the fastest-growing private universities in India, known for its international student community.",
      tuition_min: 3500, tuition_max: 8000, currency: "USD", has_scholarship: 1,
      rating: 4.6, student_count: 18000, faculty_ratio: "1:13",
      website: "https://sharda.ac.in", accreditation: "NAAC A+",
      logo: "SU", logo_color: "#8e4b10", placement: "95%",
      video_url: "https://www.youtube.com/embed/Kw4Af3hN8fk",
      tags: ["Medical", "Law", "International"],
      highlights: ["Medical & Dental Colleges", "150+ International MOU", "Delhi NCR Location"],
      scholarships: ["International Excellence Scholarship", "Academic Merit Award", "STEM Scholarship"],
      programs_ug: ["Computer Science", "Engineering", "Law", "Medicine", "Dentistry", "Architecture"],
      programs_pg: ["MBA", "MTech", "LLM", "MD", "PhD Programs"],
    },
    {
      id: "amity", name: "Amity University", short_name: "AU",
      country: "India", city: "Noida", established: 2005, ranking: 22,
      image_url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
      description: "Amity University is India's most renowned private university with global campuses.",
      tuition_min: 4000, tuition_max: 9000, currency: "USD", has_scholarship: 1,
      rating: 4.8, student_count: 25000, faculty_ratio: "1:11",
      website: "https://amity.edu", accreditation: "NAAC A++",
      logo: "AU", logo_color: "#0f172a", placement: "97%",
      video_url: "https://www.youtube.com/embed/RWH1MpQ_Zng",
      tags: ["Top Ranked", "Research", "Global"],
      highlights: ["QS World Top 300", "Global Campuses", "200+ MoUs Worldwide"],
      scholarships: ["Chancellor's Scholarship", "Research Excellence Award", "Global Merit Scholarship"],
      programs_ug: ["Computer Science", "Engineering", "Business", "Law", "Media Studies", "Biotechnology"],
      programs_pg: ["MBA", "MTech", "LLM", "MSc Biotechnology", "PhD Programs"],
    },
    {
      id: "khalsa", name: "Khalsa University", short_name: "KU",
      country: "India", city: "Amritsar", established: 2015, ranking: 125,
      image_url: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&q=80",
      description: "Khalsa University in Amritsar offers programs in engineering, sciences, humanities, and commerce.",
      tuition_min: 1400, tuition_max: 3500, currency: "USD", has_scholarship: 1,
      rating: 4.2, student_count: 6500, faculty_ratio: "1:21",
      website: "https://khalsauniversity.org", accreditation: "NAAC B+",
      logo: "KU", logo_color: "#1c64f2", placement: "78%",
      video_url: "https://www.youtube.com/embed/paVk-PPl2r0",
      tags: ["Heritage", "Arts", "Sciences"],
      highlights: ["Cultural Heritage Center", "Punjabi Language Research", "Golden Temple Proximity"],
      scholarships: ["Sikh Heritage Scholarship", "Academic Excellence Award", "Sports Scholarship"],
      programs_ug: ["Computer Science", "Commerce", "Arts", "Science", "Physical Education"],
      programs_pg: ["MBA", "MSc", "MA", "PhD Programs"],
    },
    {
      id: "invertis", name: "Invertis University", short_name: "IU",
      country: "India", city: "Bareilly", established: 2010, ranking: 138,
      image_url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
      description: "Invertis University offers quality professional education in management, technology, law, and sciences.",
      tuition_min: 1300, tuition_max: 3800, currency: "USD", has_scholarship: 1,
      rating: 4.0, student_count: 5500, faculty_ratio: "1:22",
      website: "https://invertis.org", accreditation: "NAAC B",
      logo: "IU", logo_color: "#057a55", placement: "75%",
      video_url: "https://www.youtube.com/embed/fE5Uit93NvI",
      tags: ["Law", "Journalism", "Technology"],
      highlights: ["Media Production Studio", "Legal Aid Clinic", "Pharmaceutical Lab"],
      scholarships: ["Merit Scholarship", "Rural Achievers Award", "Girl Student Scholarship"],
      programs_ug: ["Computer Science", "Business Administration", "Law", "Journalism", "Fine Arts"],
      programs_pg: ["MBA", "MTech", "LLM", "MCA", "PhD Programs"],
    },
    {
      id: "mvm-institute", name: "MVM Institute", short_name: "MVM",
      country: "India", city: "Bhopal", established: 1999, ranking: 155,
      image_url: "https://images.unsplash.com/photo-1497366858526-0766d9dae979?w=800&q=80",
      description: "MVM Institute offers programs in commerce, humanities, and applied sciences.",
      tuition_min: 1000, tuition_max: 2800, currency: "USD", has_scholarship: 1,
      rating: 3.9, student_count: 4000, faculty_ratio: "1:24",
      website: "https://mvminstitute.ac.in", accreditation: "NAAC B",
      logo: "MVM", logo_color: "#6875f5", placement: "72%",
      video_url: "https://www.youtube.com/embed/Sr1Tn-crCxU",
      tags: ["Commerce", "Arts", "Sciences"],
      highlights: ["Affordable Education", "Strong Alumni Network", "Women-Friendly Campus"],
      scholarships: ["Academic Merit Award", "Need-Based Scholarship", "Women Empowerment Scholarship"],
      programs_ug: ["Commerce", "Arts", "Science", "Computer Applications"],
      programs_pg: ["MCom", "MA", "MSc", "MCA", "PhD Programs"],
    },
    {
      id: "soa-university", name: "SOA University", short_name: "SOA",
      country: "India", city: "Bhubaneswar", established: 2007, ranking: 48,
      image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80",
      description: "Siksha 'O' Anusandhan (SOA) University is a NAAC A++ institution with strong research focus.",
      tuition_min: 3000, tuition_max: 10000, currency: "USD", has_scholarship: 1,
      rating: 4.7, student_count: 20000, faculty_ratio: "1:12",
      website: "https://soa.ac.in", accreditation: "NAAC A++",
      logo: "SOA", logo_color: "#e74694", placement: "94%",
      video_url: "https://www.youtube.com/embed/0oLl_3YEtd4",
      tags: ["Medical", "Research", "Engineering"],
      highlights: ["NAAC A++ Ranked", "1000-bed Teaching Hospital", "International Collaborations"],
      scholarships: ["Research Excellence Scholarship", "Medical Merit Award", "International Student Grant"],
      programs_ug: ["Medicine", "Dentistry", "Nursing", "Engineering", "Pharmacy"],
      programs_pg: ["MD", "MDS", "MSc Nursing", "MTech", "MBA", "PhD Programs"],
    },
    {
      id: "cyrus-west", name: "Cyrus West University", short_name: "CWU",
      country: "North Cyprus", city: "Famagusta", established: 2010, ranking: 180,
      image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      description: "Cyrus West University offers internationally recognized degrees in a Mediterranean setting.",
      tuition_min: 3500, tuition_max: 7500, currency: "USD", has_scholarship: 1,
      rating: 4.4, student_count: 8000, faculty_ratio: "1:16",
      website: "https://cyruswest.edu.tr", accreditation: "YÖK Recognized, FIBAA Accredited",
      logo: "CWU", logo_color: "#7e3af2", placement: "85%",
      video_url: "https://www.youtube.com/embed/c0auZbBHjpI",
      tags: ["Mediterranean", "International", "English-Medium"],
      highlights: ["European Standards", "Mediterranean Climate", "Affordable Cost of Living"],
      scholarships: ["International Merit Scholarship (up to 75%)", "African Student Scholarship"],
      programs_ug: ["Business Administration", "Computer Engineering", "International Relations", "Nursing"],
      programs_pg: ["MBA", "MSc Computer Engineering", "MA International Relations", "PhD Programs"],
    },
    {
      id: "cyrus-international", name: "Cyrus International University", short_name: "CIU",
      country: "North Cyprus", city: "Nicosia", established: 2008, ranking: 165,
      image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      description: "Cyrus International University offers internationally accredited programs in a stunning Mediterranean campus.",
      tuition_min: 4000, tuition_max: 9000, currency: "USD", has_scholarship: 1,
      rating: 4.6, student_count: 12000, faculty_ratio: "1:14",
      website: "https://cyrusinternational.edu.tr", accreditation: "YÖK Recognized, AACSB Candidate",
      logo: "CIU", logo_color: "#1a56db", placement: "90%",
      video_url: "https://www.youtube.com/embed/OeP3EAnnzFA",
      tags: ["Law", "Medicine", "International"],
      highlights: ["EU-Recognized Degrees", "Nicosia Capital City", "International Faculty"],
      scholarships: ["International Excellence Scholarship (up to 80%)", "African Development Scholarship"],
      programs_ug: ["Law", "Medicine", "Engineering", "Business", "Education"],
      programs_pg: ["LLM", "MBA", "MTech", "MSc", "MEd", "PhD Programs"],
    },
  ];

  const insertAll = db.transaction(() => {
    for (const u of universities) {
      addUni.run({
        id: u.id, name: u.name, short_name: u.short_name,
        country: u.country, city: u.city, established: u.established,
        ranking: u.ranking, image_url: u.image_url, description: u.description,
        tuition_min: u.tuition_min, tuition_max: u.tuition_max, currency: u.currency,
        has_scholarship: u.has_scholarship, rating: u.rating,
        student_count: u.student_count, faculty_ratio: u.faculty_ratio,
        website: u.website, accreditation: u.accreditation,
        logo: u.logo, logo_color: u.logo_color, placement: u.placement,
        video_url: u.video_url,
      });
      u.tags.forEach(t => addTag.run(u.id, t));
      u.highlights.forEach(h => addHL.run(u.id, h));
      u.scholarships.forEach(s => addSch.run(u.id, s));
      u.programs_ug.forEach(p => addProg.run(u.id, p, "undergraduate", "3-4 years", u.tuition_min));
      u.programs_pg.forEach(p => addProg.run(u.id, p, "postgraduate", "1-2 years", u.tuition_max));
    }

    db.prepare(`
      INSERT OR IGNORE INTO testimonials
        (student_name, university, program, year, initials, avatar_color, story, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run("Emmanuel Kollie", "Lovely Professional University, India", "BSc Computer Science", "2023",
      "EK", "from-blue-500 to-blue-700",
      "Tolbert Innovation Hub made my dream of studying abroad a reality. From document preparation to visa guidance, they were with me every step. Now I'm pursuing my passion in Computer Science at LPU!", 5);

    db.prepare(`
      INSERT OR IGNORE INTO testimonials
        (student_name, university, program, year, initials, avatar_color, story, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run("Patience Saah", "Amity University, India", "MBA International Business", "2023",
      "PS", "from-emerald-500 to-teal-600",
      "I never thought studying at a top Indian university was possible from Liberia. The team at Tolbert Innovation Hub guided me through the entire process and helped me secure a 50% scholarship!", 5);

    db.prepare(`
      INSERT OR IGNORE INTO testimonials
        (student_name, university, program, year, initials, avatar_color, story, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run("Mary Flomo", "SHARDA University, India", "MBBS Medicine", "2022",
      "MF", "from-purple-500 to-pink-600",
      "Getting into medical school abroad seemed impossible, but Tolbert Innovation Hub made it happen. Their counselors understood my academic background and matched me with the perfect university.", 5);

    db.prepare(`
      INSERT OR IGNORE INTO testimonials
        (student_name, university, program, year, initials, avatar_color, story, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run("James Brownell", "Cyrus International University, North Cyprus", "LLB Law", "2024",
      "JB", "from-indigo-500 to-purple-600",
      "North Cyprus was not on my radar until the counselors at Tolbert Innovation Hub showed me the opportunities. The EU-recognized degree and affordable tuition made it the perfect choice.", 5);

    db.prepare(`
      INSERT OR IGNORE INTO testimonials
        (student_name, university, program, year, initials, avatar_color, story, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run("Titus Mulbah", "Marwadi University, India", "BTech Mechanical Engineering", "2023",
      "TM", "from-orange-500 to-red-500",
      "The application process was smooth and stress-free thanks to the team. They handled all the paperwork and kept me updated throughout. Now I'm thriving at Marwadi University with a scholarship!", 5);

    db.prepare(`
      INSERT OR IGNORE INTO testimonials
        (student_name, university, program, year, initials, avatar_color, story, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run("Sia Kamara", "Graphic Era University, India", "BSc Nursing", "2024",
      "SK", "from-teal-500 to-cyan-600",
      "Tolbert Innovation Hub's counselors were knowledgeable and supportive. They helped me choose the right nursing program and walked me through every step from application to arrival in India.", 5);

    db.prepare(`
      INSERT OR IGNORE INTO testimonials
        (student_name, university, program, year, initials, avatar_color, story, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run("David Wesseh", "Lovely Professional University, India", "MBA Business Analytics", "2025",
      "DW", "from-red-500 to-rose-600",
      "I was skeptical at first, but the team at Tolbert Innovation Hub proved me wrong. Within three months I had an offer letter from LPU and a 60% merit scholarship. Best decision of my life!", 5);

    db.prepare(`
      INSERT OR IGNORE INTO testimonials
        (student_name, university, program, year, initials, avatar_color, story, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run("Fatima Kollie", "SOA University, India", "BSc Pharmacy", "2025",
      "FK", "from-pink-500 to-fuchsia-600",
      "As a first-generation university student, I was overwhelmed by the process. The counselors at Tolbert Innovation Hub made it simple, supportive, and affordable. Now I'm studying pharmacy at a NAAC A++ university!", 5);

    // Scholarships
    const addScholarship = db.prepare(`
      INSERT OR IGNORE INTO scholarships (title, amount, universities_eligible, criteria, deadline, icon, color)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    addScholarship.run("Merit Excellence Scholarship", "Up to 75% Tuition Waiver",
      "Available at 12 Partner Universities", "GPA 3.5+ / WAEC Grade B+", "Rolling Admission", "🏆", "from-yellow-400 to-orange-500");
    addScholarship.run("International Student Grant", "Up to $2,000/year",
      "All Partner Universities", "International Student Status", "Before Registration", "🌍", "from-blue-400 to-indigo-600");
    addScholarship.run("Sports Achievement Award", "Up to 50% Tuition Waiver",
      "Selected Universities", "National Level Sports Achievement", "With Application", "⚽", "from-green-400 to-teal-600");
    addScholarship.run("STEM Innovation Scholarship", "Up to 60% Tuition Waiver",
      "8 Partner Universities", "Engineering / Science Programs", "Semester Basis", "🔬", "from-purple-400 to-pink-600");

    // Activity log
    const addActivity = db.prepare(`
      INSERT INTO activity_log (action, student_name, university_name, emoji, time_ago)
      VALUES (?, ?, ?, ?, ?)
    `);
    const activityItems = [
      ["received an offer from", "David W.", "LPU India", "🎉", "2 hours ago"],
      ["secured a 60% scholarship at", "Fatima K.", "SOA University", "🏆", "5 hours ago"],
      ["got admitted to", "Moses B.", "Amity University", "✅", "1 day ago"],
      ["completed her visa application", "Agnes T.", null, "✈️", "1 day ago"],
      ["enrolled at", "Kofi M.", "Marwadi University", "🎓", "2 days ago"],
      ["received a merit scholarship at", "Blessing S.", "LPU", "🌟", "3 days ago"],
      ["applied for", "Emmanuel K.", "Graphic Era University", "📝", "4 days ago"],
      ["completed counseling session", "Hannah T.", null, "💬", "4 days ago"],
      ["submitted documents for", "Isaac F.", "SHARDA University", "📎", "5 days ago"],
      ["received admission letter from", "Grace M.", "SR University", "🎊", "5 days ago"],
    ];
    for (const [action, name, uni, emoji, time] of activityItems) {
      addActivity.run(action, name, uni, emoji, time);
    }

    // Stats
    const setStat = db.prepare(
      "INSERT OR REPLACE INTO stats (key, value, suffix, label) VALUES (?, ?, ?, ?)"
    );
    setStat.run("partner_universities", 17, "+", "Partner Universities");
    setStat.run("students_guided", 1000, "+", "Students Guided");
    setStat.run("visa_success_rate", 92, "%", "Admission Success Rate");
    setStat.run("countries_available", 2, "", "Countries Available");
  });

  insertAll();
}

// ─── Types ─────────────────────────────────────────────────────────────────

interface UniversitySeed {
  id: string; name: string; short_name: string;
  country: string; city: string; established: number; ranking: number;
  image_url: string; description: string;
  tuition_min: number; tuition_max: number; currency: string; has_scholarship: number;
  rating: number; student_count: number; faculty_ratio: string;
  website: string; accreditation: string; logo: string; logo_color: string;
  placement: string; video_url: string;
  tags: string[]; highlights: string[]; scholarships: string[];
  programs_ug: string[]; programs_pg: string[];
}
