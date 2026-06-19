"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText, Heart, Award, Users, CheckCircle, Clock, AlertCircle,
  ArrowRight, TrendingUp, Bell, BookOpen, Calendar, Star, Zap
} from "lucide-react";
import { universities } from "@/lib/data";

const stats = [
  { label: "Applications", value: "3", icon: FileText, color: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-600", href: "/portal/applications" },
  { label: "Saved Universities", value: "7", icon: Heart, color: "from-rose-500 to-pink-600", bg: "bg-rose-50", text: "text-rose-600", href: "/universities" },
  { label: "Scholarships", value: "4", icon: Award, color: "from-amber-500 to-orange-500", bg: "bg-amber-50", text: "text-amber-600", href: "/portal/scholarships" },
  { label: "Sessions Booked", value: "2", icon: Users, color: "from-purple-500 to-violet-600", bg: "bg-purple-50", text: "text-purple-600", href: "/counseling" },
];

const applications = [
  { id: "TIH-A1B2C3", university: "Lovely Professional University", program: "BSc Computer Science", status: "under-review", date: "Jan 15, 2024" },
  { id: "TIH-D4E5F6", university: "Marwadi University", program: "BTech Mechanical Engineering", status: "documents-required", date: "Jan 10, 2024" },
  { id: "TIH-G7H8I9", university: "Cyrus International University", program: "LLB Law", status: "submitted", date: "Jan 05, 2024" },
];

const statusMap = {
  "submitted": { label: "Submitted", cls: "bg-blue-100 text-blue-700", icon: FileText },
  "under-review": { label: "Under Review", cls: "bg-amber-100 text-amber-700", icon: Clock },
  "documents-required": { label: "Docs Needed", cls: "bg-red-100 text-red-700", icon: AlertCircle },
  "accepted": { label: "Accepted!", cls: "bg-green-100 text-green-700", icon: CheckCircle },
};

const progressSteps = [
  { label: "Registered", done: true },
  { label: "Docs Uploaded", done: true },
  { label: "App Submitted", done: true },
  { label: "Under Review", active: true },
  { label: "Offer Letter", done: false },
  { label: "Visa Process", done: false },
  { label: "Enrolled", done: false },
];

const activities = [
  { icon: Bell, text: "Application TIH-A1B2C3 is now under review", time: "2 hours ago", color: "text-blue-500 bg-blue-50" },
  { icon: AlertCircle, text: "WAEC result required for TIH-D4E5F6", time: "1 day ago", color: "text-red-500 bg-red-50" },
  { icon: Star, text: "New scholarship match: Merit Excellence Award (92%)", time: "2 days ago", color: "text-amber-500 bg-amber-50" },
  { icon: Calendar, text: "Counseling session confirmed for Jan 25", time: "3 days ago", color: "text-purple-500 bg-purple-50" },
  { icon: CheckCircle, text: "Personal Statement document approved", time: "5 days ago", color: "text-green-500 bg-green-50" },
];

const scholarships = [
  { title: "Merit Excellence Scholarship", university: "Lovely Professional University", amount: "Up to 75%", match: 92 },
  { title: "International Student Grant", university: "Marwadi University", amount: "$2,000/yr", match: 88 },
  { title: "STEM Innovation Award", university: "SR University", amount: "Up to 60%", match: 85 },
];

function MatchBar({ pct, color }: { pct: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(pct), 200); return () => clearTimeout(t); }, [pct]);
  return (
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${width}%` }} />
    </div>
  );
}

export default function PortalOverviewPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative">
          <p className="text-blue-200 text-sm font-medium mb-1">Welcome back 👋</p>
          <h2 className="text-2xl font-black mb-2">Emmanuel Kollie</h2>
          <p className="text-blue-100 text-sm max-w-sm">Your application to LPU is under review. Expected response in 3–5 business days.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/portal/applications" className="px-4 py-2 bg-white text-blue-700 font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors">
              Track Applications
            </Link>
            <Link href="/portal/documents" className="px-4 py-2 bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/30 hover:bg-white/30 transition-colors">
              Upload Documents
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.text}`} />
            </div>
            <p className="text-2xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Applications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress tracker */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" /> Application Journey
              </h3>
              <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-full">Step 4 of 7</span>
            </div>
            <div className="flex items-center gap-1">
              {progressSteps.map((step, i) => (
                <div key={step.label} className="flex-1 flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-all ${
                    step.done ? "bg-green-500 text-white" : step.active ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-slate-100 text-slate-400"
                  }`}>
                    {step.done ? <CheckCircle className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
                  </div>
                  <div className={`h-1 w-full rounded-full ${step.done ? "bg-green-400" : step.active ? "bg-blue-200" : "bg-slate-100"}`} />
                  <p className={`text-[9px] text-center mt-1.5 font-medium leading-tight ${step.done ? "text-green-600" : step.active ? "text-blue-600" : "text-slate-400"}`}>
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* My Applications */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">My Applications</h3>
              <Link href="/portal/applications" className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {applications.map(app => {
                const st = statusMap[app.status as keyof typeof statusMap];
                return (
                  <div key={app.id} className="p-5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 text-sm truncate">{app.university}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{app.program}</p>
                        <p className="text-slate-400 text-xs mt-1 font-mono">{app.id}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${st.cls}`}>
                        {st.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { label: "Upload WAEC Result", href: "/portal/documents", urgent: true },
                { label: "Book Counseling Session", href: "/counseling", urgent: false },
                { label: "Browse Universities", href: "/universities", urgent: false },
                { label: "Check Scholarships", href: "/portal/scholarships", urgent: false },
              ].map(a => (
                <Link key={a.label} href={a.href} className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.01] ${
                  a.urgent ? "bg-red-50 text-red-700 border border-red-100" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}>
                  {a.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Scholarship matches */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Scholarship Matches
            </h3>
            <div className="space-y-4">
              {scholarships.map(s => (
                <div key={s.title}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-slate-700 truncate pr-2">{s.title}</p>
                    <span className="text-xs font-bold text-green-600 shrink-0">{s.match}%</span>
                  </div>
                  <MatchBar pct={s.match} color={s.match >= 90 ? "bg-green-500" : s.match >= 80 ? "bg-blue-500" : "bg-amber-500"} />
                  <p className="text-[10px] text-slate-400 mt-1">{s.university} · {s.amount}</p>
                </div>
              ))}
            </div>
            <Link href="/portal/scholarships" className="mt-4 block text-center text-xs text-blue-600 font-semibold hover:underline">
              View all scholarships →
            </Link>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activities.slice(0, 4).map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${a.color}`}>
                    <a.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-700 leading-relaxed">{a.text}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
