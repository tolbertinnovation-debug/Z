"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, ChevronDown, Brain, GitCompare, Award, LogIn } from "lucide-react";
import AuthModal from "@/components/AuthModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/universities", label: "Universities" },
  { href: "/apply", label: "Apply Now" },
  { href: "/counseling", label: "Counseling" },
  { href: "/portal", label: "Student Portal" },
];

const universityDropdown = [
  { href: "/universities", label: "All Universities", flag: "🎓" },
  { href: "/universities?country=India", label: "India (15)", flag: "🇮🇳" },
  { href: "/universities?country=NorthCyprus", label: "North Cyprus (2)", flag: "🇨🇾" },
];

const toolsDropdown = [
  { href: "/ai-match", label: "AI Matcher", icon: Brain, desc: "Find your perfect university" },
  { href: "/compare", label: "Compare", icon: GitCompare, desc: "Compare universities side-by-side" },
  { href: "/scholarship-finder", label: "Scholarship Finder", icon: Award, desc: "Find scholarships for your profile" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [uniDropOpen, setUniDropOpen] = useState(false);
  const [toolsDropOpen, setToolsDropOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const pathname = usePathname();
  const uniRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (uniRef.current && !uniRef.current.contains(e.target as Node)) setUniDropOpen(false);
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsDropOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isHome = pathname === "/";
  const textClass = scrolled || !isHome ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-white/90 hover:text-white hover:bg-white/10";
  const activeClass = "bg-blue-600 text-white shadow-md shadow-blue-200";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className={`font-bold text-sm leading-tight ${scrolled || !isHome ? "text-slate-900" : "text-white"}`}>
                Tolbert Innovation Hub
              </p>
              <p className={`text-xs ${scrolled || !isHome ? "text-blue-600" : "text-blue-300"}`}>
                Study Abroad Portal
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === "/" ? activeClass : textClass
              }`}
            >
              Home
            </Link>

            {/* Universities dropdown */}
            <div className="relative" ref={uniRef}>
              <button
                onClick={() => { setUniDropOpen(!uniDropOpen); setToolsDropOpen(false); }}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname.startsWith("/universities") ? activeClass : textClass
                }`}
              >
                Universities
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${uniDropOpen ? "rotate-180" : ""}`} />
              </button>
              {uniDropOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  {universityDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setUniDropOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <span className="text-lg">{item.flag}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tools dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => { setToolsDropOpen(!toolsDropOpen); setUniDropOpen(false); }}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  ["/ai-match", "/compare", "/scholarship-finder"].includes(pathname) ? activeClass : textClass
                }`}
              >
                Tools
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropOpen ? "rotate-180" : ""}`} />
              </button>
              {toolsDropOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  {toolsDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setToolsDropOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.filter((l) => !["Home", "Universities"].includes(l.label)).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href ? activeClass : textClass
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAuth(true)}
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${scrolled || !isHome ? "text-slate-700 hover:bg-slate-100" : "text-white/90 hover:bg-white/10"}`}
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
            <Link
              href="/apply"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-105 transition-all duration-200"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled || !isHome ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 border-t border-slate-100 bg-white/98 backdrop-blur-lg rounded-b-2xl shadow-xl">
            <div className="pt-4 px-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile tools */}
              <div className="pt-2 border-t border-slate-100">
                <p className="px-4 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Tools</p>
                {toolsDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => { setOpen(false); setShowAuth(true); }}
                className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors mt-2"
              >
                <LogIn className="w-4 h-4" /> Sign In / Register
              </button>
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center mt-2"
              >
                Apply Now →
              </Link>
            </div>
          </div>
        )}
      </div>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </nav>
  );
}
