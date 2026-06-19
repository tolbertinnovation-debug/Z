"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePortalStore } from "@/lib/store";
import LiveBadge from "@/components/LiveBadge";
import {
  FileText, Heart, Award, Users, CheckCircle, Clock, AlertCircle,
  ArrowRight, TrendingUp, Bell, BookOpen, Calendar, Star, Zap
} from "lucide-react";

const statusMap: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  "submitted":           { label: "Submitted",     cls: "bg-blue-100 text-blue-700",   icon: FileText },
  "under-review":        { label: "Under Review",  cls: "bg-amber-100 text-amber-700", icon: Clock },
  "documents-required":  { label: "Docs Needed",   cls: "bg-red-100 text-red-700",     icon: AlertCircle },
  "accepted":            { label: "Accepted!",     cls: "bg-green-100 text-green-700", icon: CheckCircle },
  "rejected":            { label: "Rejected",      cls: "bg-slate-100 text-slate-500", icon: AlertCircle },
  "enrolled":            { label: "Enrolled",      cls: "bg-purple-100 text-purple-700", icon: CheckCircle },
};

const progressSteps = [
  { step: 1, label: "Registration" }, { step: 2, label: "Profile" }, { step: 3, label: "Application" },
  { step: 4, label: "Documents" }, { step: 5, label: "Under Review" }, { step: 6, label: "Offer Letter" },
  { step: 7, label: "Visa" },
];

const scholarships = [
  { name: "Merit Excellence Award", uni: "LPU India", amount: "$3,000", match: 92, color: "from-blue-500 to-indigo-600" },
  { name: "International Student Grant", uni: "Amity University", amount: "$2,000", match: 85, color: "from-purple-500 to-pink-600" },
  { name: "STEM Leadership Scholarship", uni: "Sharda University", amount: "$1,500", match: 78, color: "from-amber-500 to-orange-500" },
  { name: "Liberia Excellence Fund", uni: "Marwadi University", amount: "$2,500", match: 88, color: "from-emerald-500 to-teal-600" },
];

export default function PortalDashboard() {
  const myApps = usePortalStore(s => s.getStudentApplications("s1"));
  const notifications = usePortalStore(s => s.notifications.filter(n => n.recipientId === "s1"));
  const activityFeed = usePortalStore(s => s.activityFeed);
  const [bars, setBars] = useState(scholarships.map(() => 0));

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const t = setTimeout(() => setBars(scholarships.map(s => s.match)), 150);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { label: "Applications", value: String(myApps.length), icon: FileText, color: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-600", href: "/portal/applications" },
    { label: "Saved Unis", value: "7", icon: Heart, color: "from-rose-500 to-pink-600", bg: "bg-rose-50", text: "text-rose-600", href: "/universities" },
    { label: "Scholarships", value: "4", icon: Award, color: "from-amber-500 to-orange-500", bg: "bg-amber-50", text: "text-amber-600", href: "/portal/scholarships" },
    { label: "Sessions", value: "2", icon: Users, color: "from-purple-500 to-violet-600", bg: "bg-purple-50", text: "text-purple-600", href: "/counseling" },
  ];

  const currentStep = myApps.length === 0 ? 1 :
    myApps.some(a => a.status === "accepted") ? 6 :
    myApps.some(a => a.status === "under-review") ? 5 :
    myApps.some(a => a.status === "documents-required") ? 4 : 3;

  function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-blue-200 text-sm mb-1">Welcome back,</p>
            <h2 className="text-2xl font-black">Emmanuel Kollie 👋</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-semibold">🇱🇷 Liberian Student</span>
              <span className="px-2.5 py-0.5 bg-green-500/30 rounded-full text-xs font-semibold">Active</span>
              {unreadCount > 0 && (
                <Link href="/portal/notifications" className="flex items-center gap-1 px-2.5 py-0.5 bg-red-500/30 rounded-full text-xs font-semibold">
                  <Bell className="w-3 h-3" /> {unreadCount} unread
                </Link>
              )}
              <LiveBadge />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Apply Now", href: "/apply", icon: Zap },
              { label: "Find Scholarships", href: "/portal/scholarships", icon: Star },
              { label: "Book Session", href: "/counseling", icon: Calendar },
            ].map(b => (
              <Link key={b.href} href={b.href} className="flex items-center gap-1.5 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-xs font-bold transition-colors">
                <b.icon className="w-3.5 h-3.5" />{b.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.text}`} />
            </div>
            <p className="text-2xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Journey tracker */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" /> Your Application Journey
        </h3>
        <div className="flex items-center gap-0 overflow-x-auto pb-2">
          {progressSteps.map((s, i) => (
            <div key={s.step} className="flex items-center shrink-0">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                  s.step < currentStep ? "bg-blue-600 text-white" :
                  s.step === currentStep ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                  "bg-slate-100 text-slate-400"
                }`}>
                  {s.step < currentStep ? <CheckCircle className="w-4 h-4" /> : s.step}
                </div>
                <p className="text-xs text-center text-slate-500 w-14">{s.label}</p>
              </div>
              {i < progressSteps.length - 1 && (
                <div className={`h-0.5 w-8 mx-0 transition-colors ${s.step < currentStep ? "bg-blue-600" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Applications (live) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900">My Applications</h3>
              <LiveBadge />
            </div>
            <Link href="/portal/applications" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {myApps.length === 0 && (
              <div className="p-6 text-center text-slate-400 text-sm">No applications yet. <Link href="/apply" className="text-blue-600 font-semibold">Apply now →</Link></div>
            )}
            {myApps.map(app => {
              const sm = statusMap[app.status] ?? statusMap["submitted"];
              const Icon = sm.icon;
              return (
                <div key={app.id} className="p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 truncate">{app.universityName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{app.program}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Submitted {fmtDate(app.submittedAt)} · Updated {fmtDate(app.updatedAt)}</p>
                    </div>
                    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${sm.cls}`}>
                      <Icon className="w-3 h-3" />{sm.label}
                    </span>
                  </div>
                  {app.status === "documents-required" && (
                    <div className="mt-3 p-2.5 bg-red-50 rounded-xl border border-red-100">
                      <p className="text-xs text-red-700 font-semibold flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Action required: Upload missing documents
                      </p>
                      <Link href="/portal/documents" className="text-xs text-red-600 font-bold mt-1 inline-block hover:underline">Go to Documents →</Link>
                    </div>
                  )}
                  {app.notes && (
                    <p className="mt-2 text-xs text-slate-500 italic">Admin note: {app.notes}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions + activity */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { label: "Upload Documents", href: "/portal/documents", urgent: true, desc: "WAEC result pending" },
                { label: "Browse Universities", href: "/universities", urgent: false, desc: "17 partner universities" },
                { label: "Find Scholarships", href: "/portal/scholarships", urgent: false, desc: "4 matches found" },
                { label: "Book Counseling", href: "/counseling", urgent: false, desc: "Free sessions available" },
              ].map(a => (
                <Link key={a.href} href={a.href} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${a.urgent ? "bg-red-50 border border-red-100" : "hover:bg-slate-50"}`}>
                  <div>
                    <p className={`text-sm font-semibold ${a.urgent ? "text-red-700" : "text-slate-700"}`}>{a.label}</p>
                    <p className="text-xs text-slate-400">{a.desc}</p>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${a.urgent ? "text-red-400" : "text-slate-300"}`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Live activity */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold text-slate-900 text-sm">Portal Activity</h3>
              <LiveBadge />
            </div>
            <div className="space-y-2.5">
              {activityFeed.slice(0, 4).map(a => (
                <div key={a.id} className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${a.color}`} />
                  <p className="text-xs text-slate-500 leading-relaxed">{a.action} <span className="text-slate-400">· {a.time}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship matches */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" /> Scholarship Matches
          </h3>
          <Link href="/portal/scholarships" className="text-xs text-blue-600 font-semibold hover:underline">View all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {scholarships.map((s, i) => (
            <div key={i} className={`bg-gradient-to-r ${s.color} rounded-xl p-4 text-white`}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="font-bold text-sm">{s.name}</p>
                  <p className="text-xs text-white/80">{s.uni}</p>
                </div>
                <span className="text-xs font-black bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap">{s.amount}</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Match</span><span className="font-bold">{s.match}%</span>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${bars[i]}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
