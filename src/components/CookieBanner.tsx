"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
          <Cookie className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm mb-0.5">We use cookies</p>
          <p className="text-slate-400 text-xs leading-relaxed">
            We use cookies to improve your experience, analyze site traffic, and personalize content.
            By continuing, you agree to our{" "}
            <Link href="/cookie-policy" className="text-blue-400 hover:underline">Cookie Policy</Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/cookie-policy" className="text-xs text-slate-400 hover:text-white transition-colors whitespace-nowrap">
            Learn More
          </Link>
          <button
            onClick={accept}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
          >
            Accept All
          </button>
          <button onClick={accept} className="text-slate-500 hover:text-white transition-colors" aria-label="Dismiss">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
