"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  GraduationCap, Globe, Users, Trophy, ChevronRight, Star,
  BookOpen, Plane, Award, CheckCircle, ArrowRight, Play,
  Search, Lightbulb, Shield
} from "lucide-react";
import { universities, testimonials, scholarships, stats } from "@/lib/data";
import UniversityCard from "@/components/UniversityCard";

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

const features = [
  { icon: Search, title: "Find Universities", desc: "Browse 17 partner universities across India and North Cyprus with detailed profiles, rankings, and programs.", color: "from-blue-500 to-blue-600" },
  { icon: BookOpen, title: "Compare Programs", desc: "Compare tuition fees, programs, scholarships, and admission requirements side by side.", color: "from-indigo-500 to-indigo-600" },
  { icon: Globe, title: "Apply Online", desc: "Submit your application directly through our portal with document uploads and real-time tracking.", color: "from-purple-500 to-purple-600" },
  { icon: Users, title: "Expert Counseling", desc: "Book one-on-one sessions with our experienced education counselors for personalized guidance.", color: "from-pink-500 to-rose-500" },
  { icon: Award, title: "Scholarship Finder", desc: "Discover scholarships worth up to 80% tuition waiver matched to your academic profile.", color: "from-amber-500 to-orange-500" },
  { icon: Shield, title: "Visa Support", desc: "Get complete assistance with student visa applications, documentation, and pre-departure guidance.", color: "from-green-500 to-teal-500" },
];

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setHeroVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen">
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
              <span className="text-white/80 text-sm font-medium">Now Accepting Applications for 2024–25</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Your Gateway to{" "}
              <span className="gradient-text">International</span>
              <br />Education
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
              Explore top universities in India and North Cyprus, compare programs, discover scholarships, and apply directly through Tolbert Innovation Hub — Liberia&apos;s most trusted study abroad portal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/universities" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
                Explore Universities <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/apply" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                Apply Now
              </Link>
              <Link href="/counseling" className="inline-flex items-center gap-2 px-8 py-4 text-white/80 font-semibold hover:text-white transition-colors">
                <Play className="w-4 h-4" /> Book Free Counseling
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-4 max-w-xl">
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

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L360 20L720 50L1080 15L1440 40V80H0V40Z" fill="white" fillOpacity="1"/>
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-5xl font-black bg-gradient-to-br from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-slate-500 text-sm font-medium mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Lightbulb className="w-4 h-4" /> Everything You Need
            </div>
            <h2 className="section-title text-slate-900 mb-4">Your Complete Study Abroad Solution</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">From discovery to enrollment, we guide you through every step of your international education journey.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-hover">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED UNIVERSITIES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <GraduationCap className="w-4 h-4" /> Partner Universities
              </div>
              <h2 className="section-title text-slate-900">Featured Universities</h2>
              <p className="text-slate-500 text-lg mt-2 max-w-xl">Explore our handpicked partner universities with world-class programs and generous scholarships.</p>
            </div>
            <Link href="/universities" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shrink-0">
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

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Plane className="w-4 h-4" /> Simple Process
            </div>
            <h2 className="section-title mb-4">How It Works</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Get from Liberia to your dream university in 4 simple steps.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Register Free", desc: "Create your free student account and complete your profile in minutes.", icon: Users },
              { step: "02", title: "Explore & Match", desc: "Browse universities, use our AI matcher, and save your favorites.", icon: Search },
              { step: "03", title: "Apply Online", desc: "Submit your application with documents through our secure portal.", icon: BookOpen },
              { step: "04", title: "Get Enrolled", desc: "Receive your offer letter, get visa guidance, and fly to your future.", icon: Plane },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-blue-400 text-sm font-bold mb-1">{item.step}</p>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/apply" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
              Start Your Application <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SCHOLARSHIPS ── */}
      <section className="py-24 bg-white">
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
              <div key={s.title} className="rounded-2xl overflow-hidden card-hover shadow-sm border border-slate-100">
                <div className={`p-6 bg-gradient-to-br ${s.color} text-white`}>
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-lg leading-tight mb-1">{s.title}</h3>
                  <p className="text-2xl font-black">{s.amount}</p>
                </div>
                <div className="bg-white p-4 space-y-2">
                  <p className="text-xs text-slate-600 font-medium">{s.universities}</p>
                  <p className="text-xs text-slate-500">Criteria: {s.criteria}</p>
                  <p className="text-xs text-slate-500">Deadline: {s.deadline}</p>
                  <Link href="/apply" className="block text-center text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 pt-3 border-t border-slate-100">
                    Apply for Scholarship →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-green-500" /> Student Stories
            </div>
            <h2 className="section-title text-slate-900 mb-4">Success Stories</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Hear from students who made their international education dreams come true.</p>
          </div>
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
                </div>
                <blockquote className="text-lg text-slate-700 font-medium leading-relaxed mb-6">
                  &ldquo;{testimonials[activeTestimonial].story}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <img src={testimonials[activeTestimonial].image} alt={testimonials[activeTestimonial].name} className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100" />
                  <div>
                    <p className="font-bold text-slate-900">{testimonials[activeTestimonial].name}</p>
                    <p className="text-sm text-blue-600">{testimonials[activeTestimonial].program}</p>
                    <p className="text-sm text-slate-500">{testimonials[activeTestimonial].university}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            {testimonials.map((t, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${i === activeTestimonial ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-slate-600 border border-slate-200 hover:border-blue-200"}`}>
                <img src={t.image} alt={t.name} className="w-6 h-6 rounded-full object-cover" />
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/5 rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to Study Abroad?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join 1,000+ students from Liberia who have successfully enrolled in top international universities through Tolbert Innovation Hub.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="px-10 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-2xl hover:bg-blue-50 hover:scale-105 transition-all duration-300">
              Start Free Application
            </Link>
            <Link href="/counseling" className="px-10 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              Book Free Counseling
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/70 text-sm">
            {["✓ Free Application", "✓ Expert Guidance", "✓ Scholarship Support", "✓ Visa Assistance"].map((item) => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
