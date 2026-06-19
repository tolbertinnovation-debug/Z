"use client";
import { useState } from "react";
import Link from "next/link";
import {
  X, GraduationCap, Shield, Handshake,
  Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, CheckCircle
} from "lucide-react";

type PortalType = "student" | "agent" | "admin";
type AuthMode = "login" | "register";

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultPortal?: PortalType;
  defaultMode?: AuthMode;
}

const PORTALS = [
  {
    key: "student" as PortalType,
    label: "Student",
    desc: "Track your applications",
    icon: GraduationCap,
    gradient: "from-blue-500 to-indigo-600",
    ring: "ring-blue-500",
    activeBg: "bg-blue-600",
    tabActive: "text-blue-600 border-blue-500",
    btn: "from-blue-600 to-indigo-600",
    href: "/portal",
  },
  {
    key: "agent" as PortalType,
    label: "Agent",
    desc: "Manage referrals & commissions",
    icon: Handshake,
    gradient: "from-emerald-500 to-teal-600",
    ring: "ring-emerald-500",
    activeBg: "bg-emerald-600",
    tabActive: "text-emerald-600 border-emerald-500",
    btn: "from-emerald-600 to-teal-600",
    href: "/agent",
  },
  {
    key: "admin" as PortalType,
    label: "Admin",
    desc: "Manage platform & students",
    icon: Shield,
    gradient: "from-orange-500 to-red-600",
    ring: "ring-orange-500",
    activeBg: "bg-orange-600",
    tabActive: "text-orange-600 border-orange-500",
    btn: "from-orange-500 to-red-600",
    href: "/admin",
  },
];

export default function AuthModal({ open, onClose, defaultPortal = "student", defaultMode = "login" }: AuthModalProps) {
  const [portal, setPortal] = useState<PortalType>(defaultPortal);
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  if (!open) return null;

  const p = PORTALS.find(x => x.key === portal)!;
  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", password: "" });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/80 hover:bg-slate-100 transition-colors text-slate-500 shadow"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* ── Success state ── */
          <div className="p-10 text-center">
            <div className={`w-16 h-16 bg-gradient-to-br ${p.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">
              {mode === "login" ? "Welcome back!" : "Account created!"}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              {mode === "login"
                ? `Signed in to your ${p.label} portal. Redirecting...`
                : "Your account is ready. Let's get started."}
            </p>
            <Link
              href={p.href}
              onClick={handleClose}
              className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${p.btn} text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all text-sm`}
            >
              Go to {p.label} Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* ── Portal selector banner ── */}
            <div className={`p-5 bg-gradient-to-r ${p.gradient}`}>
              <p className="text-white/70 text-xs uppercase tracking-widest font-semibold mb-3">Select portal</p>
              <div className="grid grid-cols-3 gap-2">
                {PORTALS.map(portal => {
                  const Icon = portal.icon;
                  const isActive = portal.key === p.key;
                  return (
                    <button
                      key={portal.key}
                      type="button"
                      onClick={() => setPortal(portal.key)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl transition-all duration-200 ${isActive ? "bg-white/25 shadow-inner scale-[1.03]" : "bg-white/10 hover:bg-white/20"}`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                      <span className="text-white text-xs font-bold">{portal.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Tabs ── */}
            <div className="flex border-b border-slate-100">
              {(["login", "register"] as AuthMode[]).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`flex-1 py-3.5 text-sm font-bold transition-all border-b-2 ${mode === m ? `${p.tabActive} bg-slate-50/50` : "text-slate-400 border-transparent hover:text-slate-600"}`}
                >
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {mode === "login" ? "Welcome back" : `Join as ${p.label}`}
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  {mode === "login"
                    ? `Enter your ${p.label.toLowerCase()} account credentials`
                    : p.desc}
                </p>
              </div>

              {mode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Emmanuel Kollie"
                      value={form.name}
                      onChange={e => update("name", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder={portal === "admin" ? "admin@tolbert.com" : portal === "agent" ? "j.barweh@agent.com" : "you@email.com"}
                    value={form.email}
                    onChange={e => update("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {mode === "register" && portal === "student" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone (WhatsApp)</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+231 770 000 000"
                      value={form.phone}
                      onChange={e => update("phone", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => update("password", e.target.value)}
                    className="w-full pl-10 pr-11 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === "login" && (
                  <div className="text-right mt-1">
                    <a href="#" className="text-xs text-blue-600 font-medium hover:underline">Forgot password?</a>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-3 bg-gradient-to-r ${p.btn} text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all text-sm`}
              >
                {mode === "login" ? `Sign In to ${p.label} Portal` : "Create My Account"}
              </button>

              {/* Divider + Google */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                <div className="relative text-center"><span className="bg-white px-3 text-xs text-slate-400">or continue with</span></div>
              </div>
              <button
                type="button"
                className="w-full py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <p className="text-center text-xs text-slate-500">
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {mode === "login" ? "Register free" : "Sign in"}
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
