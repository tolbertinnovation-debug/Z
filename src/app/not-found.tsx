import Link from "next/link";
import { Home, GraduationCap, FileText, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative text-center max-w-lg">
        {/* 404 */}
        <div className="mb-6">
          <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent leading-none select-none">
            404
          </span>
        </div>

        {/* SVG Illustration */}
        <div className="mb-8 flex justify-center">
          <svg
            width="120"
            height="80"
            viewBox="0 0 120 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" y="30" width="100" height="50" rx="8" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" />
            <rect x="20" y="15" width="80" height="25" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" />
            <rect x="40" y="5" width="40" height="18" rx="4" fill="#2563eb" />
            <circle cx="60" cy="14" r="4" fill="#93c5fd" />
            <line x1="30" y1="45" x2="90" y2="45" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="30" y1="55" x2="70" y2="55" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
            <circle cx="100" cy="65" r="8" fill="#ef4444" opacity="0.8" />
            <line x1="97" y1="62" x2="103" y2="68" stroke="white" strokeWidth="2" />
            <line x1="103" y1="62" x2="97" y2="68" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-white mb-3">Page Not Found</h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you
          back on track.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-lg shadow-blue-900/50"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/universities"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
          >
            <GraduationCap className="w-4 h-4" /> Universities
          </Link>
          <Link
            href="/apply"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
          >
            <FileText className="w-4 h-4" /> Apply Now
          </Link>
        </div>

        <Link
          href="javascript:history.back()"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Link>
      </div>
    </main>
  );
}
