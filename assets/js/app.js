/* ════════════════════════════════════════════════════════════
   Tolbert Innovation Hub — shared app logic
════════════════════════════════════════════════════════════ */

/* ── Theme ─────────────────────────────── */
(function () {
  const saved = localStorage.getItem("tih-theme");
  const theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();
function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("tih-theme", next);
  document.querySelectorAll(".theme-toggle .ic").forEach(i => i.textContent = next === "dark" ? "☀️" : "🌙");
}

/* ── Local "database" ──────────────────── */
const TIHStore = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem("tih-" + key)) ?? fallback; } catch { return fallback; } },
  set(key, val) { localStorage.setItem("tih-" + key, JSON.stringify(val)); },
  push(key, val) { const arr = this.get(key, []); arr.push(val); this.set(key, arr); return arr; },
  // session
  user() { return this.get("user", null); },
  login(u) { this.set("user", u); },
  logout() { localStorage.removeItem("tih-user"); },
  // saved unis
  saved() { return this.get("saved", []); },
  toggleSaved(id) {
    let s = this.saved();
    s = s.includes(id) ? s.filter(x => x !== id) : [...s, id];
    this.set("saved", s); return s;
  }
};

/* ── Toast ─────────────────────────────── */
function toast(msg) {
  let el = document.querySelector(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg; requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 3200);
}

/* ── Navbar render ─────────────────────── */
function renderNav(active) {
  const user = TIHStore.user();
  const links = [
    ["index.html", "Home"],
    ["universities.html", "Universities"],
    ["scholarships.html", "Scholarships"],
    ["counseling.html", "Counseling"],
    ["dashboard.html", "Dashboard"]
  ];
  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <div class="wrap">
      <a class="logo" href="index.html">
        <span class="logo-mark">T</span>
        <span>Tolbert Innovation Hub<small>Study Abroad Portal</small></span>
      </a>
      <ul class="nav-links" id="navLinks">
        ${links.map(([h, t]) => `<li><a href="${h}" class="${active === t ? "active" : ""}">${t}</a></li>`).join("")}
      </ul>
      <div class="nav-actions">
        <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme"><span class="ic">${document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙"}</span></button>
        ${user
      ? `<a class="btn btn-primary btn-sm" href="dashboard.html">${user.name.split(" ")[0]}'s Hub</a>`
      : `<a class="btn btn-ghost btn-sm" href="login.html">Sign In</a><a class="btn btn-primary btn-sm" href="apply.html">Apply Now</a>`}
        <button class="nav-burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>`;
  document.body.prepend(nav);
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  document.getElementById("burger").addEventListener("click", () => document.getElementById("navLinks").classList.toggle("open"));
}

/* ── Footer render ─────────────────────── */
function renderFooter() {
  const f = document.createElement("footer");
  f.className = "footer";
  f.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a class="logo" href="index.html"><span class="logo-mark">T</span><span>Tolbert Innovation Hub<small>Study Abroad Portal</small></span></a>
          <p class="muted" style="margin-top:1rem;max-width:300px">Your trusted gateway from Liberia to world-class international universities. Guidance, applications and scholarships — all in one place.</p>
          <div class="flex gap" style="margin-top:1.2rem">
            <a class="theme-toggle" href="#" aria-label="Facebook">f</a>
            <a class="theme-toggle" href="#" aria-label="Instagram">◎</a>
            <a class="theme-toggle" href="#" aria-label="WhatsApp">✆</a>
          </div>
        </div>
        <div>
          <h5>Explore</h5>
          <a href="universities.html">Universities</a>
          <a href="scholarships.html">Scholarships</a>
          <a href="apply.html">Apply Now</a>
          <a href="counseling.html">Book Counseling</a>
        </div>
        <div>
          <h5>Students</h5>
          <a href="dashboard.html">Dashboard</a>
          <a href="login.html">Sign In</a>
          <a href="universities.html">Eligibility Checker</a>
          <a href="scholarships.html">Scholarship Finder</a>
        </div>
        <div>
          <h5>Contact</h5>
          <a href="mailto:hello@tolbertinnovationhub.com">hello@tolbertinnovationhub.com</a>
          <a href="tel:+231770000000">+231 77 000 0000</a>
          <a href="#">Broad Street, Monrovia, Liberia</a>
          <a href="admin.html">Admin Portal</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Tolbert Innovation Hub. All rights reserved.</span>
        <span>Crafted for students across Liberia & Africa 🌍</span>
      </div>
    </div>`;
  document.body.appendChild(f);
}

/* ── Floating WhatsApp + chat ──────────── */
function renderFab() {
  const wrap = document.createElement("div");
  wrap.className = "fab-stack";
  wrap.innerHTML = `
    <button class="fab chat" id="chatFab" aria-label="Live chat">💬</button>
    <a class="fab wa" href="https://wa.me/231770000000" target="_blank" rel="noopener" aria-label="WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207z"/></svg>
    </a>`;
  document.body.appendChild(wrap);

  const panel = document.createElement("div");
  panel.className = "chat-panel glass";
  panel.innerHTML = `
    <div class="chat-head">Tolbert Assistant <span style="float:right;cursor:pointer" id="chatClose">✕</span></div>
    <div class="chat-body" id="chatBody">
      <div class="chat-msg bot">👋 Hi! I'm your study abroad assistant. Ask me about universities, scholarships, or how to apply!</div>
    </div>
    <div class="chat-input"><input id="chatIn" placeholder="Type a message…"><button class="btn btn-primary btn-sm" id="chatSend">→</button></div>`;
  document.body.appendChild(panel);

  document.getElementById("chatFab").onclick = () => panel.classList.toggle("open");
  document.getElementById("chatClose").onclick = () => panel.classList.remove("open");
  const send = () => {
    const inp = document.getElementById("chatIn"); const v = inp.value.trim(); if (!v) return;
    const body = document.getElementById("chatBody");
    body.insertAdjacentHTML("beforeend", `<div class="chat-msg me">${escapeHtml(v)}</div>`);
    inp.value = ""; body.scrollTop = body.scrollHeight;
    setTimeout(() => { body.insertAdjacentHTML("beforeend", `<div class="chat-msg bot">${botReply(v)}</div>`); body.scrollTop = body.scrollHeight; }, 600);
  };
  document.getElementById("chatSend").onclick = send;
  document.getElementById("chatIn").addEventListener("keydown", e => { if (e.key === "Enter") send(); });
}
function botReply(q) {
  q = q.toLowerCase();
  if (q.includes("scholar")) return "🎓 We offer merit, sports & international scholarships up to 100% tuition! Visit the Scholarships page to find your match.";
  if (q.includes("apply") || q.includes("application")) return "📝 Great! Click 'Apply Now' and complete the 4-step form. You'll get an Application ID instantly.";
  if (q.includes("cyprus")) return "🇨🇾 North Cyprus has 2 partner universities offering European-standard, English-taught degrees.";
  if (q.includes("india")) return "🇮🇳 We partner with 15 universities in India — from LPU and Amity to Graphic Era. Browse the Universities page!";
  if (q.includes("cost") || q.includes("fee") || q.includes("tuition")) return "💰 Tuition ranges from about $1,600 to $7,500 per year depending on the university and program. Use Compare to see side by side.";
  if (q.includes("counsel") || q.includes("book")) return "📅 You can book a free counseling session (Zoom, phone, WhatsApp or in-person) on the Counseling page.";
  return "I can help with universities, scholarships, eligibility and applications. Try asking 'How do I apply?' or 'Show me scholarships'.";
}

/* ── Reveal on scroll ──────────────────── */
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12 });
  els.forEach(e => io.observe(e));
}

/* ── Animated counters ─────────────────── */
function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1600; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(0)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: .5 });
  els.forEach(e => io.observe(e));
}

/* ── Particle canvas ───────────────────── */
function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, parts;
  const resize = () => {
    w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight;
    const n = Math.min(70, Math.floor(w / 22));
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 2 + 1
    }));
  };
  resize(); window.addEventListener("resize", resize);
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    const col = dark ? "139,124,255" : "91,70,245";
    parts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},.5)`; ctx.fill();
      for (let j = i + 1; j < parts.length; j++) {
        const q = parts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${col},${.14 * (1 - d / 120)})`; ctx.lineWidth = 1; ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  };
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) draw();
}

/* ── Helpers ───────────────────────────── */
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function getParam(name) { return new URLSearchParams(location.search).get(name); }
function uniById(id) { return (window.TIH_UNIVERSITIES || []).find(u => u.id === id); }
function genId(prefix) { return prefix + "-" + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 900 + 100); }
function flagFor(country) { return country === "India" ? "🇮🇳" : country === "North Cyprus" ? "🇨🇾" : "🌍"; }

/* ── University card markup ────────────── */
function uniCardHTML(u, delay = 0) {
  const saved = TIHStore.saved().includes(u.id);
  return `
  <article class="card card-lift uni-card" data-reveal data-delay="${delay}">
    <div class="banner" style="background:linear-gradient(135deg, ${u.accent}, ${shade(u.accent, -25)})">
      <span class="flag">${flagFor(u.country)} ${u.country}</span>
      <div class="logo-badge" style="background:linear-gradient(135deg, ${u.accent}, ${shade(u.accent, -30)})">${u.short}</div>
    </div>
    <div class="body">
      <h3>${u.name}</h3>
      <div class="meta">📍 ${u.city} • Est. ${u.founded}</div>
      <span class="rank-pill">★ ${u.ranking}</span>
      <div class="tags">${u.programsUG.slice(0, 3).map(p => `<span class="tag">${p}</span>`).join("")}</div>
      <div class="foot">
        <div class="tuition">Tuition / yr<strong>$${u.tuitionMin.toLocaleString()}–$${u.tuitionMax.toLocaleString()}</strong></div>
        <a class="btn btn-primary btn-sm" href="university.html?id=${u.id}">Quick View</a>
      </div>
    </div>
  </article>`;
}
/* tiny color shader */
function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + Math.round(255 * pct / 100);
  let g = ((n >> 8) & 255) + Math.round(255 * pct / 100);
  let b = (n & 255) + Math.round(255 * pct / 100);
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* ── Boot ──────────────────────────────── */
function bootChrome(active) {
  renderNav(active);
  renderFooter();
  renderFab();
  initParticles();
  // run after DOM injected by page scripts
  requestAnimationFrame(() => { initReveal(); initCounters(); });
}
