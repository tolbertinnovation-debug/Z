"use client";
import { useState } from "react";
import { usePortalStore } from "@/lib/store";
import LiveBadge from "@/components/LiveBadge";
import {
  Search, UserPlus, Users, TrendingUp, BarChart2, MessageSquare, ExternalLink,
} from "lucide-react";

const AVATAR_GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-600",
  "from-green-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-slate-500 to-slate-600",
];

function getGradient(id: string) {
  const idx = id.charCodeAt(id.length - 1) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[idx];
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function completionColor(pct: number) {
  if (pct >= 90) return "bg-green-500";
  if (pct >= 70) return "bg-orange-400";
  return "bg-red-400";
}

const now = new Date();

export default function StudentsPage() {
  const students = usePortalStore(s => s.students);
  const applications = usePortalStore(s => s.applications);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const activeCount = students.filter(s => s.status === "active").length;
  const newThisMonth = students.filter(s => {
    const d = new Date(s.joinedAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;
  const avgCompletion = students.length
    ? Math.round(students.reduce((sum, s) => sum + s.profileCompletion, 0) / students.length)
    : 0;

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.nationality.toLowerCase().includes(q) || s.city.toLowerCase().includes(q);
  });

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Student Management</h2>
            <p className="text-slate-500 text-sm">Manage and monitor all registered students</p>
          </div>
          <LiveBadge />
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all whitespace-nowrap">
          <UserPlus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{activeCount}</p>
            <p className="text-xs text-slate-500">Active Students</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{newThisMonth || students.length}</p>
            <p className="text-xs text-slate-500">{newThisMonth > 0 ? "New This Month" : "Total Registered"}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
            <BarChart2 className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{avgCompletion}%</p>
            <p className="text-xs text-slate-500">Avg. Profile Completion</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search students by name, email, city, or nationality..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-slate-700 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Student cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-slate-400">No students found.</div>
        ) : (
          displayed.map(student => {
            const gradient = getGradient(student.id);
            const appCount = applications.filter(a => a.studentId === student.id).length;
            const statusLabel = student.status === "active" ? "Active" : "Inactive";
            const statusClass = student.status === "active"
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-slate-100 text-slate-600 border-slate-200";

            return (
              <div key={student.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-16 bg-gradient-to-r ${gradient}`} />
                <div className="px-5 pb-5 -mt-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white mb-3`}>
                    {getInitials(student.name)}
                  </div>
                  <div className="mb-3">
                    <h3 className="font-bold text-slate-900 text-base leading-tight">{student.name}</h3>
                    <p className="text-slate-400 text-xs mt-0.5">{student.email}</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">🇱🇷</span>
                      <span className="text-xs text-slate-600 font-medium">{student.nationality} · {student.city}</span>
                    </div>
                    <span className="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-0.5 rounded-full font-semibold">
                      {appCount} {appCount === 1 ? "App" : "Apps"}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 font-medium">Profile Completion</span>
                      <span className="font-bold text-slate-700">{student.profileCompletion}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${completionColor(student.profileCompletion)}`} style={{ width: `${student.profileCompletion}%` }} />
                    </div>
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusClass}`}>{statusLabel}</span>
                    {student.agentId && <span className="text-xs text-slate-400">via Agent</span>}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Profile
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {filtered.length > 6 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(v => !v)}
            className="px-8 py-3 bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 text-slate-700 text-sm font-bold rounded-2xl shadow-sm transition-all"
          >
            {showAll ? "Show Less" : `Load More (${filtered.length - 6} remaining)`}
          </button>
        </div>
      )}
    </div>
  );
}
