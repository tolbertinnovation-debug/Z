"use client";

import { useState } from "react";
import { Plus, Edit2, EyeOff, Trash2, AlertCircle } from "lucide-react";

type ScholarshipStatus = "active" | "expired";
type ScholarshipBasis = "merit" | "need";

interface Scholarship {
  id: number;
  name: string;
  amount: string;
  university: string;
  criteria: string[];
  deadline: string;
  daysUntilDeadline: number;
  applicants: number;
  capacity: number;
  status: ScholarshipStatus;
  basis: ScholarshipBasis;
  gradientFrom: string;
  gradientTo: string;
}

type FilterTab = "all" | ScholarshipStatus | ScholarshipBasis;

const scholarships: Scholarship[] = [
  {
    id: 1,
    name: "Presidential Excellence Award",
    amount: "$5,000/year",
    university: "University of Ghana",
    criteria: ["Merit", "GPA 3.8+", "Liberian"],
    deadline: "Jul 15, 2026",
    daysUntilDeadline: 26,
    applicants: 12,
    capacity: 20,
    status: "active",
    basis: "merit",
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-500",
  },
  {
    id: 2,
    name: "West Africa STEM Grant",
    amount: "$3,500/year",
    university: "Ashesi University",
    criteria: ["Merit", "STEM Major", "GPA 3.5+"],
    deadline: "Aug 1, 2026",
    daysUntilDeadline: 43,
    applicants: 8,
    capacity: 15,
    status: "active",
    basis: "merit",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-600",
  },
  {
    id: 3,
    name: "Community Leaders Fund",
    amount: "$2,000/year",
    university: "Strathmore University",
    criteria: ["Need-based", "Community Service"],
    deadline: "Jun 30, 2026",
    daysUntilDeadline: 11,
    applicants: 19,
    capacity: 25,
    status: "active",
    basis: "need",
    gradientFrom: "from-rose-500",
    gradientTo: "to-red-600",
  },
  {
    id: 4,
    name: "Future Leaders Scholarship",
    amount: "$4,000/year",
    university: "University of Cape Town",
    criteria: ["Merit", "Leadership", "GPA 3.6+"],
    deadline: "May 1, 2026",
    daysUntilDeadline: -49,
    applicants: 20,
    capacity: 20,
    status: "expired",
    basis: "merit",
    gradientFrom: "from-slate-500",
    gradientTo: "to-slate-600",
  },
  {
    id: 5,
    name: "Liberian Diaspora Support",
    amount: "$1,500/year",
    university: "Pan-Atlantic University",
    criteria: ["Need-based", "Liberian", "First-gen"],
    deadline: "Jun 25, 2026",
    daysUntilDeadline: 6,
    applicants: 14,
    capacity: 30,
    status: "active",
    basis: "need",
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-600",
  },
  {
    id: 6,
    name: "Academic Excellence Bursary",
    amount: "$2,500/year",
    university: "University of Nairobi",
    criteria: ["Merit", "GPA 3.7+"],
    deadline: "Apr 15, 2026",
    daysUntilDeadline: -65,
    applicants: 10,
    capacity: 10,
    status: "expired",
    basis: "merit",
    gradientFrom: "from-slate-400",
    gradientTo: "to-slate-500",
  },
];

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "expired", label: "Expired" },
  { key: "merit", label: "Merit-based" },
  { key: "need", label: "Need-based" },
];

function matches(s: Scholarship, tab: FilterTab): boolean {
  if (tab === "all") return true;
  if (tab === "active" || tab === "expired") return s.status === tab;
  return s.basis === tab;
}

export default function ScholarshipsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered = scholarships.filter((s) => matches(s, activeTab));
  const totalCount = scholarships.length;
  const activeCount = scholarships.filter((s) => s.status === "active").length;
  const expiredCount = scholarships.filter((s) => s.status === "expired").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Scholarships</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage scholarship listings and track applications
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Scholarship
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-3xl font-bold text-slate-800">{totalCount}</p>
          <p className="text-xs text-slate-500 mt-1">Total Scholarships</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{activeCount}</p>
          <p className="text-xs text-slate-500 mt-1">Active</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-3xl font-bold text-slate-400">{expiredCount}</p>
          <p className="text-xs text-slate-500 mt-1">Expired</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-white text-orange-600 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scholarship Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-500 font-medium">No scholarships found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((s) => {
            const pct = Math.round((s.applicants / s.capacity) * 100);
            const isUrgent = s.daysUntilDeadline > 0 && s.daysUntilDeadline <= 30;
            const isExpiredDeadline = s.daysUntilDeadline <= 0;
            return (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                {/* Gradient Header */}
                <div
                  className={`bg-gradient-to-r ${s.gradientFrom} ${s.gradientTo} p-4`}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-white text-base leading-tight">
                      {s.name}
                    </h3>
                    <span className="ml-3 flex-shrink-0 px-2.5 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                      {s.amount}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mt-1">{s.university}</p>
                </div>

                <div className="p-4 space-y-3">
                  {/* Criteria Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {s.criteria.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs rounded-full border border-orange-100"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        isExpiredDeadline
                          ? "bg-slate-100 text-slate-500"
                          : isUrgent
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {isExpiredDeadline
                        ? "Expired"
                        : `Deadline: ${s.deadline}`}
                    </span>
                    {isUrgent && (
                      <span className="text-xs text-red-600 font-medium">
                        {s.daysUntilDeadline} days left
                      </span>
                    )}
                  </div>

                  {/* Applicants Progress */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span>
                        {s.applicants} / {s.capacity} applicants
                      </span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${pct >= 90 ? "bg-red-500" : pct >= 60 ? "bg-orange-500" : "bg-green-500"}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors">
                      <EyeOff className="w-3.5 h-3.5" />
                      Deactivate
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors ml-auto">
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
