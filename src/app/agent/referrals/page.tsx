"use client";

import { useState } from "react";
import { usePortalStore, Referral } from "@/lib/store";
import LiveBadge from "@/components/LiveBadge";
import {
  Search, Download, Eye, MessageSquare, Check, Clock,
  Users, UserCheck, Hourglass, DollarSign,
} from "lucide-react";
import React from "react";

type FilterTab = "all" | "pending" | "submitted" | "under-review" | "documents-required" | "accepted" | "rejected";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-slate-100 text-slate-600" },
  submitted: { label: "Submitted", className: "bg-blue-100 text-blue-700" },
  "under-review": { label: "Under Review", className: "bg-amber-100 text-amber-700" },
  "documents-required": { label: "Docs Required", className: "bg-orange-100 text-orange-700" },
  accepted: { label: "Accepted", className: "bg-emerald-100 text-emerald-700" },
  enrolled: { label: "Enrolled", className: "bg-purple-100 text-purple-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700" },
};

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "under-review", label: "Under Review" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
];

const AVATAR_COLORS = [
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600",
];

function avatarColor(id: string) {
  return AVATAR_COLORS[id.charCodeAt(id.length - 1) % AVATAR_COLORS.length];
}

function getTimelineLevel(status: string): number {
  switch (status) {
    case "pending": return 1;
    case "submitted": return 2;
    case "documents-required": return 2;
    case "under-review": return 3;
    case "accepted":
    case "enrolled": return 5;
    case "rejected": return 4;
    default: return 1;
  }
}

function buildTimeline(ref: Referral) {
  const level = getTimelineLevel(ref.status);
  const steps = ["Referred", "Applied", "Docs Submitted", "Under Review", ref.status === "rejected" ? "Rejected" : "Accepted"];
  const dateStr = new Date(ref.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return steps.map((label, i) => ({
    label,
    date: i === 0 ? dateStr : "",
    done: i < level,
  }));
}

export default function ReferralsPage() {
  const referrals = usePortalStore(s => s.getAgentReferrals("a1"));
  const applications = usePortalStore(s => s.applications);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const totalCount = referrals.length;
  const activeCount = referrals.filter(r => r.status === "submitted" || r.status === "under-review" || r.status === "documents-required").length;
  const convertedCount = referrals.filter(r => r.status === "accepted" || r.status === "enrolled").length;
  const pendingCommission = referrals.filter(r => (r.status === "accepted" || r.status === "enrolled") && !r.commissionPaid)
    .reduce((s, r) => s + r.commissionAmount, 0);

  const filtered = referrals.filter(r => {
    const matchTab = activeTab === "all" || r.status === activeTab;
    const q = search.toLowerCase();
    const app = r.applicationId ? applications.find(a => a.id === r.applicationId) : null;
    const matchSearch = !q ||
      r.studentName.toLowerCase().includes(q) ||
      r.studentEmail.toLowerCase().includes(q) ||
      r.program.toLowerCase().includes(q) ||
      r.preferredCountry.toLowerCase().includes(q) ||
      (app?.universityName ?? "").toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  function toggleRow(id: string) {
    setExpandedRow(prev => prev === id ? null : id);
  }

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-2xl font-black text-slate-900">My Referrals</h2>
        <LiveBadge />
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Referrals", value: String(totalCount), icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active", value: String(activeCount), icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Converted", value: String(convertedCount), icon: UserCheck, color: "text-teal-600", bg: "bg-teal-50" },
          { label: "Pending Commission", value: `$${pendingCommission.toLocaleString()}`, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 text-xs truncate">{s.label}</p>
              <p className="text-slate-900 font-bold text-lg leading-tight">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + search */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 px-4 pt-4">
          {FILTER_TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === t.key ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === t.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                {t.key === "all" ? referrals.length : referrals.filter(r => r.status === t.key).length}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 px-4 py-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, program…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition shrink-0">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-slate-100 bg-slate-50/60">
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Student</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Program</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">University / Country</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Referred</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Commission</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => {
                const cfg = STATUS_CONFIG[r.status] ?? STATUS_CONFIG.pending;
                const isExpanded = expandedRow === r.id;
                const app = r.applicationId ? applications.find(a => a.id === r.applicationId) : null;
                const nameParts = r.studentName.split(" ");
                const initials = nameParts.map(p => p[0]).join("").slice(0, 2).toUpperCase();
                const flag = r.preferredCountry === "India" ? "🇮🇳" : "🇨🇾";
                const timeline = buildTimeline(r);

                return (
                  <React.Fragment key={r.id}>
                    <tr
                      className="border-t border-slate-50 hover:bg-slate-50/70 cursor-pointer transition-colors"
                      onClick={() => toggleRow(r.id)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor(r.id)} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-slate-900 font-semibold truncate">{r.studentName}</p>
                            <p className="text-slate-400 text-xs truncate">{r.studentEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">{r.program}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">
                        <p className="truncate max-w-[140px]">{app ? app.universityName : r.preferredCountry}</p>
                        <p className="text-slate-400 mt-0.5">{flag} {r.preferredCountry}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.className}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                        {new Date(r.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        {r.commissionPaid ? (
                          <span className="text-emerald-600 font-bold">${r.commissionAmount.toLocaleString()}</span>
                        ) : r.commissionAmount > 0 ? (
                          <span className="text-amber-600 font-semibold">${r.commissionAmount} <span className="text-xs font-normal text-slate-400">pending</span></span>
                        ) : (
                          <span className="text-slate-400 text-xs">Pending</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={e => { e.stopPropagation(); toggleRow(r.id); }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={e => e.stopPropagation()}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition"
                            title="Message"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="border-t border-emerald-100 bg-emerald-50/40">
                        <td colSpan={7} className="px-6 py-5">
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Referral Timeline</p>
                            {r.applicationId && <p className="text-xs text-slate-400 font-mono">App ID: {r.applicationId}</p>}
                          </div>
                          <div className="flex flex-wrap gap-0">
                            {timeline.map((step, idx) => (
                              <div key={idx} className="flex items-center">
                                <div className="flex flex-col items-center gap-1">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.done ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-400"}`}>
                                    {step.done ? <Check className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                                  </div>
                                  <p className={`text-xs font-semibold whitespace-nowrap ${step.done ? "text-emerald-700" : "text-slate-400"}`}>{step.label}</p>
                                  <p className="text-xs text-slate-400 whitespace-nowrap">{step.date || "—"}</p>
                                </div>
                                {idx < timeline.length - 1 && (
                                  <div className={`h-0.5 w-12 sm:w-16 mt-[-18px] mx-1 ${timeline[idx + 1].done ? "bg-emerald-400" : "bg-slate-200"}`} />
                                )}
                              </div>
                            ))}
                          </div>
                          {r.studentPhone && (
                            <p className="mt-3 text-xs text-slate-500">
                              <span className="font-medium">Phone:</span> {r.studentPhone} &nbsp;|&nbsp;
                              <span className="font-medium">Level:</span> {r.studyLevel} &nbsp;|&nbsp;
                              <span className="font-medium">Budget:</span> {r.budget}
                            </p>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400 text-sm">No referrals match your filters</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-slate-500 text-sm">Showing {filtered.length} of {referrals.length} referrals</p>
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Hourglass className="w-3.5 h-3.5" />
            Click any row to expand the referral timeline
          </div>
        </div>
      </div>
    </div>
  );
}
