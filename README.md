# Tolbert Innovation Hub — Study Abroad Portal 🌍🎓

A premium, fully-interactive study-abroad platform helping students in **Liberia** discover international universities, check eligibility, find scholarships, apply online, and receive counseling — with a complete **student dashboard** and **admin panel**.

> Built as a fast, self-contained static site (HTML + modern CSS + vanilla JS). No build step required — just open `index.html`.

## ✨ Highlights

- **Landing page** — animated particle background, aurora orbs, world-map hero, live stat counters, scroll-reveal animations, glassmorphism, **dark / light mode**.
- **University Directory** (`universities.html`) — live search + filters (country, degree level, program, tuition slider, scholarships) and sorting, plus an **instant eligibility checker**.
- **Individual University Pages** (`university.html?id=`) — overview, campus video, image gallery, programs, tuition table, scholarships, admission requirements, eligibility checker, accommodation, student life, careers, and Apply CTA. Driven by data for all **17 partner universities**.
- **Online Application System** (`apply.html`) — 4-step wizard (Personal → Academic → University → Documents) with validation, document upload UI, and an auto-generated **Application ID** + simulated email confirmation.
- **Scholarships** (`scholarships.html`) — full scholarship directory + an interactive **Scholarship Finder** that matches awards and universities to a student's GPA, budget, program and country.
- **Student Counseling** (`counseling.html`) — book In-person / Phone / Zoom / WhatsApp sessions.
- **Student Dashboard** (`dashboard.html`) — welcome panel, stat cards, **7-stage progress tracker**, applications table, saved universities, scholarship matches, profile.
- **Admin Dashboard** (`admin.html`) — password-gated demo panel for lead management (editable application statuses), university CRUD, counseling requests, and **analytics charts** (CSS/SVG, no libraries).  _Demo password: `admin123`_
- **Communication** — floating WhatsApp button and a live-chat assistant widget on every page.

## 🗂 Structure

```
index.html            Landing page
universities.html     Searchable university directory + eligibility checker
university.html       Individual university page (?id=<university-id>)
apply.html            Multi-step online application
scholarships.html     Scholarship directory + finder
counseling.html       Counseling booking
dashboard.html        Student dashboard
admin.html            Admin panel (demo password: admin123)
login.html            Simulated sign in / register
assets/css/styles.css Design system (light + dark, glassmorphism, motion)
assets/js/data.js     Demo dataset (17 universities, scholarships, stories)
assets/js/app.js      Shared logic (theme, nav, particles, store, chat, helpers)
sitemap.xml, robots.txt  SEO
```

## 🚀 Run locally

It's a static site — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## 🧠 How the "backend" works

To keep the demo fully functional with **no server**, applications, counseling requests, saved universities, the logged-in user, and admin edits are persisted in the browser via `localStorage` (namespaced `tih-*`). The dashboards seed realistic demo data on first visit so they always look complete.

## 🎨 Brand & tech notes

- Fonts: **Sora** (display) + **Inter** (body).
- Palette: indigo `#5b46f5` → violet `#8b5cf6` → cyan `#06b6d4`, gold accent.
- Respects `prefers-reduced-motion` and `prefers-color-scheme`.
- SEO: meta + Open Graph tags, JSON-LD `EducationalOrganization`, sitemap & robots.

## 📍 Partner Universities

**India (15):** Graphic Era, PP Savani, Gulzar (GGI), MATS, SR University, Marwadi, Desh Bhagat, LPU, Royal Global, Sharda, Amity, Khalsa, Invertis, MVM Institute, SOA.
**North Cyprus (2):** Cyrus West University, Cyrus International University.

---

_All university details, images, videos and statistics are illustrative placeholder/demo content for demonstration purposes._
