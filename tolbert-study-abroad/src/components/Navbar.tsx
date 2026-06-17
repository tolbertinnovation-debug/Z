"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/universities", label: "Universities" },
  { href: "/apply", label: "Apply Now" },
  { href: "/counseling", label: "Counseling" },
  { href: "/dashboard", label: "Student Portal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isHome = pathname === "/";

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : scrolled || !isHome
                    ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
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
    </nav>
  );
}
