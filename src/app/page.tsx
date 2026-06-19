"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  GraduationCap, Globe, Users, Trophy, ChevronRight, Star,
  BookOpen, Plane, Award, CheckCircle, ArrowRight, Play,
  Search, Lightbulb, Shield, Brain, Sparkles, ChevronDown, LogIn
} from "lucide-react";
import { universities, testimonials, scholarships, stats } from "@/lib/data";
import UniversityCard from "@/components/UniversityCard";
import AuthModal from "@/components/AuthModal";
import { usePortalStore } from "@/lib/store";
import { useRouter } from "next/navigation";

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = end / 80;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 25);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const typedWords = ["Computer Science", "Medicine", "Law", "Engineering", "MBA"];

function TypedText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const word = typedWords[wordIndex];
    const delay = deleting ? 60 : charIndex === word.length ? 1800 : 90;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < word.length) {
        setText(word.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!deleting && charIndex === word.length) {
        setDeleting(true);
      } else if (deleting && charIndex > 0) {
        setText(word.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIndex((w) => (w + 1) % typedWords.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [wordIndex, charIndex, deleting]);

  return (
    <span className="gradient-text">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

const features = [
  { icon: Search, title: "Find Universities", desc: "Browse 17 partner universities across India and North Cyprus with detailed profiles, rankings, and programs.", color: "from-blue-500 to-blue-600" },
  { icon: BookOpen, title: "Compare Programs", desc: "Compare tuition fees, programs, scholarships, and admission requirements side by side.", color: "from-indigo-500 to-indigo-600" },
  { icon: Globe, title: "Apply Online", desc: "Submit your application directly through our portal with document uploads and real-time tracking.", color: "from-purple-500 to-purple-600" },
  { icon: Users, title: "Expert Counseling", desc: "Book one-on-one sessions with our experienced education counselors for personalized guidance.", color: "from-pink-500 to-rose-500" },
  { icon: Award, title: "Scholarship Finder", desc: "Discover scholarships worth up to 80% tuition waiver matched to your academic profile.", color: "from-amber-500 to-orange-500" },
  { icon: Shield, title: "Visa Support", desc: "Get complete assistance with student visa applications, documentation, and pre-departure guidance.", color: "from-green-500 to-teal-500" },
];

const trustMetrics = [
  { value: "100%", label: "Authentic Partner Universities", icon: "🎓", desc: "Every university is officially verified and accredited" },
  { value: "92%", label: "Visa Success Rate", icon: "✈️", desc: "Industry-leading visa approval rate for our students" },
  { value: "1000+", label: "Students Successfully Placed", icon: "🌍", desc: "Liberian students studying abroad through our portal" },
];

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const isLoggedIn = usePortalStore(s => s.isLoggedIn);
  const router = useRouter();

  function handleApply() {
    if (isLoggedIn) router.push("/apply");
    else setShowAuth(true);
  }

  useEffect(() => {
    setHeroVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen">
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen hero-bg flex items-center overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-float-delay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/30 rounded-full blur-3xl" />
        </div>

        {/* Floating badges */}
        <div className="absolute top-32 right-8 lg:right-24 animate-float hidden md:block">
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2 shadow-2xl">
            <span className="text-2xl">🇮🇳</span>
            <div><p className="text-white text-xs font-bold">India</p><p className="text-white/60 text-xs">15 Universities</p></div>
          </div>
        </div>
        <div className="absolute bottom-48 right-12 lg:right-36 animate-float-delay hidden md:block">
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2 shadow-2xl">
            <span className="text-2xl">🇨🇾</span>
            <div><p className="text-white text-xs font-bold">North Cyprus</p><p className="text-white/60 text-xs">2 Universities</p></div>
          </div>
        </div>
        <div className="absolute top-48 left-8 lg:left-16 animate-float hidden md:block" style={{ animationDelay: "1s" }}>
          <div className="glass rounded-2xl px-4 py-3 shadow-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div><p className="text-white text-xs font-bold">95% Success</p><p className="text-white/60 text-xs">Admission Rate</p></div>
            </div>
          </div>
        </div>

        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">Now Accepting Applications for 2026–2027</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Study{" "}
              <TypedText />
              <br />
              <span className="text-white/80">Abroad Today</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
              Explore top universities in India and North Cyprus, compare programs, discover scholarships, and apply directly through Tolbert Innovation Hub — Liberia&apos;s most trusted study abroad portal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/universities" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
                Explore Universities <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setShowAuth(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-2xl hover:bg-blue-50 hover:scale-105 transition-all duration-300"
              >
                <LogIn className="w-5 h-5" /> Sign In / Register
              </button>
              <Link href="/counseling" className="inline-flex items-center gap-2 px-8 py-4 text-white/80 font-semibold hover:text-white transition-colors">
                <Play className="w-4 h-4" /> Book Free Counseling
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["bg-blue-500","bg-indigo-500","bg-purple-500","bg-pink-500","bg-emerald-500"].map((bg, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold`}>
                      {["JK","PS","MT","MF","SK"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-white/70 text-xs"><span className="text-white font-bold">1,000+</span> students enrolled this year</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-white/80 text-xs font-medium">92% visa success rate</span>
              </div>
              <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-white/80 text-xs font-medium">Scholarships up to 80% off</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4 max-w-xl">
              <div className="flex-1 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3.5 border border-white/20">
                <Search className="w-5 h-5 text-white/50" />
                <span className="text-white/50 text-sm flex-1">Search universities, programs...</span>
              </div>
              <Link href="/universities" className="px-5 py-3.5 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-colors shrink-0">
                Search
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L360 20L720 50L1080 15L1440 40V80H0V40Z" fill="white" fillOpacity="1"/>
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="relative bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-100 rounded-2xl p-6 text-center group hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-300 rounded-2xl" />
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-br from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-slate-500 text-sm font-semibold leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI MATCH BANNER ── */}
      <section className="py-6 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-white/5 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-white/5 rounded-full" />
              <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-white/5 rounded-full" />
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px", opacity: 0.04 }} />
            </div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-xl ring-1 ring-white/20">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span className="text-yellow-300 text-xs font-bold uppercase tracking-widest">New Feature</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Find Your Perfect University Match</h3>
                  <p className="text-white/70 max-w-lg text-sm leading-relaxed">Answer 6 quick questions and our AI will recommend the top 5 universities perfectly matched to your profile, budget, and goals.</p>
                </div>
              </div>
              <Link href="/ai-match" className="shrink-0 group flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-black rounded-2xl hover:bg-yellow-50 hover:scale-105 transition-all duration-300 shadow-xl text-sm whitespace-nowrap ring-2 ring-white/50">
                <Brain className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Try AI Matcher
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED UNIVERSITIES ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <GraduationCap className="w-4 h-4" /> Partner Universities
              </div>
              <h2 className="section-title text-slate-900">Featured Universities</h2>
              <p className="text-slate-500 text-lg mt-2 max-w-xl">Explore our handpicked partner universities with world-class programs and generous scholarships.</p>
            </div>
            <Link href="/universities" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:scale-105 transition-all shrink-0 shadow-lg shadow-blue-200">
              View All 17 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {universities.slice(0, 8).map((uni) => (
              <UniversityCard key={uni.id} uni={uni} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Lightbulb className="w-4 h-4" /> Everything You Need
            </div>
            <h2 className="section-title text-slate-900 mb-4">Your Complete Study Abroad Solution</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">From discovery to enrollment, we guide you through every step of your international education journey.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-slate-200 font-black text-2xl select-none">0{i + 1}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{f.desc}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-bold bg-gradient-to-r ${f.color} bg-clip-text text-transparent group-hover:gap-2 transition-all duration-200`}>
                  Learn more <ArrowRight className="w-3 h-3 text-blue-500" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDY DESTINATIONS ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Globe className="w-4 h-4" /> Study Destinations
            </div>
            <h2 className="section-title text-slate-900 mb-4">Where Will You Study?</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Choose from vibrant destinations offering world-class education, rich culture, and exciting student life.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1532664189809-02133fee698d?w=800&q=80"
                alt="India"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🇮🇳</span>
                  <div>
                    <h3 className="text-white text-2xl font-black">India</h3>
                    <p className="text-blue-300 text-sm font-semibold">15 Partner Universities</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">World-ranked universities, affordable tuition, rich culture, and booming tech industry opportunities.</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["NAAC A++", "Scholarships up to 80%", "$1K–$10K/yr"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">{tag}</span>
                  ))}
                </div>
                <Link href="/universities?country=India" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors">
                  Explore Indian Universities <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                alt="North Cyprus"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🇨🇾</span>
                  <div>
                    <h3 className="text-white text-2xl font-black">North Cyprus</h3>
                    <p className="text-cyan-300 text-sm font-semibold">2 Partner Universities</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">European-standard education in a stunning Mediterranean setting with EU-recognized degrees.</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["EU-Recognized", "Scholarships up to 75%", "Mediterranean Life"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">{tag}</span>
                  ))}
                </div>
                <Link href="/universities?country=NorthCyprus" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-cyan-50 transition-colors">
                  Explore Cyprus Universities <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY LIBERIAN STUDENTS CHOOSE US ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px", opacity: 0.03 }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <CheckCircle className="w-4 h-4 text-green-400" /> Trusted by Students
            </div>
            <h2 className="section-title text-white mb-4">Why Liberian Students Choose Us</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">We&apos;re not just an agent — we&apos;re your dedicated partner from Liberia to the world.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trustMetrics.map((metric) => (
              <div key={metric.label} className="relative text-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{metric.icon}</div>
                <p className="text-5xl font-black bg-gradient-to-br from-blue-400 to-indigo-300 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </p>
                <h3 className="font-bold text-white text-lg mb-2">{metric.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Plane className="w-4 h-4" /> Simple Process
            </div>
            <h2 className="section-title text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Get from Liberia to your dream university in 4 simple steps.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200" />
            {[
              { step: "01", title: "Register Free", desc: "Create your free student account and complete your profile in minutes.", icon: Users, color: "from-blue-500 to-blue-600" },
              { step: "02", title: "Explore & Match", desc: "Browse universities, use our AI matcher, and save your favorites.", icon: Search, color: "from-indigo-500 to-indigo-600" },
              { step: "03", title: "Apply Online", desc: "Submit your application with documents through our secure portal.", icon: BookOpen, color: "from-purple-500 to-violet-600" },
              { step: "04", title: "Get Enrolled", desc: "Receive your offer letter, get visa guidance, and fly to your future.", icon: Plane, color: "from-pink-500 to-rose-600" },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-2xl mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-blue-500 text-xs font-black mb-1 tracking-widest">{item.step}</p>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <button onClick={handleApply} className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-200 hover:shadow-blue-300 hover:scale-105 transition-all duration-300">
              Start Your Application <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── SCHOLARSHIPS ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4" /> Financial Aid
            </div>
            <h2 className="section-title text-slate-900 mb-4">Scholarship Opportunities</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Multiple scholarship options available to make international education affordable for every student.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scholarships.map((s) => (
              <div key={s.title} className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className={`p-6 bg-gradient-to-br ${s.color} text-white relative overflow-hidden`}>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 relative">{s.icon}</div>
                  <h3 className="font-bold text-lg leading-tight mb-1 relative">{s.title}</h3>
                  <p className="text-2xl font-black relative">{s.amount}</p>
                </div>
                <div className="bg-white p-4 space-y-2">
                  <p className="text-xs text-slate-600 font-medium">{s.universities}</p>
                  <p className="text-xs text-slate-500">Criteria: {s.criteria}</p>
                  <p className="text-xs text-slate-500">Deadline: {s.deadline}</p>
                  <button onClick={handleApply} className="block w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 pt-3 border-t border-slate-100 hover:underline transition-colors">
                    Apply for Scholarship →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-green-500" /> Student Stories
            </div>
            <h2 className="section-title text-slate-900 mb-4">Success Stories</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Hear from students who made their international education dreams come true.</p>
          </div>
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl" />
              <div className="absolute -top-2 -left-2 text-9xl text-blue-100 font-serif leading-none select-none pointer-events-none">&ldquo;</div>
              <div className="relative">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
                </div>
                <blockquote className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[activeTestimonial].story}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <img src={testimonials[activeTestimonial].image} alt={testimonials[activeTestimonial].name} className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-200 shadow-md" />
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{testimonials[activeTestimonial].name}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonials[activeTestimonial].program}</p>
                    <p className="text-sm text-slate-500">{testimonials[activeTestimonial].university}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            {testimonials.map((t, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${i === activeTestimonial ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                <img src={t.image} alt={t.name} className="w-6 h-6 rounded-full object-cover" />
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "36px 36px", opacity: 0.06 }} />
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-300" /> Applications Open for 2026–2027
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">Ready to Study Abroad?</h2>
          <p className="text-xl text-white/75 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 1,000+ students from Liberia who have successfully enrolled in top international universities through Tolbert Innovation Hub.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <button onClick={handleApply} className="px-10 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-2xl hover:bg-yellow-50 hover:scale-105 transition-all duration-300 text-lg">
              Start Free Application
            </button>
            <button
              onClick={() => setShowAuth(true)}
              className="inline-flex items-center gap-2 px-10 py-4 bg-white/15 text-white font-bold rounded-2xl border border-white/30 hover:bg-white/25 hover:scale-105 transition-all duration-300 backdrop-blur-sm text-lg"
            >
              <LogIn className="w-5 h-5" /> Sign In
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            {["✓ Free Application", "✓ Expert Guidance", "✓ Scholarship Support", "✓ Visa Assistance"].map((item) => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
