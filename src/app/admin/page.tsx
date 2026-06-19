"use client";
import Link from "next/link";
import { FileText, Users, CheckCircle, Clock, ChevronUp, ChevronDown, ArrowRight } from "lucide-react";

const stats = [
  { label: "Total Applications", value: "247", trend: "+18%", up: true, icon: FileText, color: "text-blue-600 bg-blue-50", href: "/admin/applications" },
  { label: "Active Students", value: "183", trend: "+12%", up: true, icon: Users, color: "text-green-600 bg-green-50", href: "/admin/students" },
  { label: "Accepted This Month", value: "42", trend: "+25%", up: true, icon: CheckCircle, color: "text-purple-600 bg-purple-50", href: "/admin/applications" },
  { label: "Pending Review", value: "31", trend: "-5%", up: false, icon: Clock, color: "text-amber-600 bg-amber-50", href: "/admin/applications" },
];

const chart = [
  { month: "Aug", apps: 18 }, { month: "Sep", apps: 32 }, { month: "Oct", apps: 25 },
  { month: "Nov", apps: 41 }, { month: "Dec", apps: 38 }, { month: "Jan", apps: 54 },
];
const maxApps = 54;

const statusDist = [
  { label: "Accepted", count: 2, pct: 25, bar: "bg-green-500" },
  { label: "Under Review", count: 2, pct: 25, bar: "bg-amber-400" },
  { label: "Submitted", count: 2, pct: 25, bar: "bg-blue-500" },
  { label: "Docs Required", count: 1, pct: 12, bar: "bg-orange-400" },
  { label: "Rejected", count: 1, pct: 13, bar: "bg-red-400" },
];

const recent = [
  { id: "TIH-001", student: "Emmanuel Kollie", action: "Application submitted", time: "2 min ago", dot: "bg-blue-500" },
  { id: "TIH-002", student: "Patience Saah", action: "Accepted — Amity University", time: "18 min ago", dot: "bg-green-500" },
  { id: "TIH-003", student: "James Brownell", action: "Documents requested", time: "1 hr ago", dot: "bg-orange-400" },
  { id: "TIH-004", student: "Mary Flomo", action: "Visa appointment booked", time: "3 hr ago", dot: "bg-purple-500" },
  { id: "TIH-005", student: "Titus Mulbah", action: "Scholarship matched", time: "5 hr ago", dot: "bg-indigo-500" },
];

const quickLinks = [
  { label: "Review Applications", href: "/admin/applications", color: "bg-blue-600 hover:bg-blue-700" },
  { label: "Verify Documents", href: "/admin/documents", color: "bg-orange-500 hover:bg-orange-600" },
  { label: "View Messages", href: "/admin/messages", color: "bg-purple-600 hover:bg-purple-700" },
  { label: "Manage Students", href: "/admin/students", color: "bg-green-600 hover:bg-green-700" },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500 text-sm">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickLinks.map(q => (
            <Link key={q.href} href={q.href} className={`flex items-center gap-1.5 px-4 py-2 text-white text-xs font-bold rounded-xl transition-colors shadow-sm ${q.color}`}>
              {q.label} <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-green-600" : "text-red-500"}`}>
                {s.up ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {s.trend}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Monthly Applications</h3>
          <p className="text-sm text-slate-500 mb-6">Last 6 months</p>
          <div className="flex items-end gap-3 h-40">
            {chart.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-slate-600">{d.apps}</span>
                <div className="w-full bg-gradient-to-t from-orange-500 to-red-400 rounded-t-lg" style={{ height: `${(d.apps / maxApps) * 120}px` }} />
                <span className="text-xs text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Dist */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-4">Application Status</h3>
          <div className="space-y-3">
            {statusDist.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{s.label}</span>
                  <span className="text-slate-400">{s.count} ({s.pct}%)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Recent Activity</h3>
            <Link href="/admin/applications" className="text-xs text-orange-600 font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {recent.map((r) => (
              <div key={r.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${r.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{r.student}</p>
                  <p className="text-xs text-slate-500">{r.action}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">{r.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Country breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-4">By Country</h3>
          <div className="space-y-4">
            {[
              { flag: "🇮🇳", country: "India", count: 215, pct: 87, color: "from-orange-400 to-orange-600" },
              { flag: "🇨🇾", country: "North Cyprus", count: 32, pct: 13, color: "from-blue-400 to-blue-600" },
            ].map((c) => (
              <div key={c.country} className="p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.flag}</span>
                    <p className="font-semibold text-slate-900 text-sm">{c.country}</p>
                  </div>
                  <span className="text-xs text-slate-500">{c.count}</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                </div>
                <p className="text-xs text-slate-500 mt-1 text-right">{c.pct}%</p>
              </div>
            ))}
          </div>
          <Link href="/admin/analytics" className="mt-4 flex items-center justify-center gap-1 text-xs text-orange-600 font-semibold hover:underline">
            Full Analytics <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
