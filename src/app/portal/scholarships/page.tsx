"use client";

import { useState } from "react";
import {
  Award, TrendingUp, DollarSign, Calendar, Check, Target,
  Sparkles,
} from "lucide-react";

type ScholarshipStatus = "eligible" | "applied" | "conditional";

interface Scholarship {
  title: string;
  university: string;
  amount: string;
  criteria: string;
  deadline: string;
  match: number;
  status: ScholarshipStatus;
  color: string;
}

const SCHOLARSHIPS: Scholarship[] = [
  {
    title: "Merit Excellence Scholarship",
    university: "Lovely Professional University",
    amount: "Up to 75% Tuition Waiver",
    criteria: "GPA 3.5+ / WAEC Grade B+",
    deadline: "Rolling",
    match: 92,
    status: "eligible",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "International Student Grant",
    university: "Marwadi University",
    amount: "$2,000 / year",
    criteria: "International Student",
    deadline: "Mar 15, 2024",
    match: 88,
    status: "applied",
    color: "from-blue-400 to-indigo-600",
  },
  {
    title: "STEM Innovation Award",
    university: "SR University",
    amount: "Up to 60% Tuition",
    criteria: "Engineering Program",
    deadline: "Semester Basis",
    match: 85,
    status: "eligible",
    color: "from-purple-400 to-pink-600",
  },
  {
    title: "African Student Scholarship",
    university: "Cyrus West University",
    amount: "Up to 75% Tuition",
    criteria: "African Nationality",
    deadline: "Feb 28, 2024",
    match: 80,
    status: "conditional",
    color: "from-green-400 to-teal-600",
  },
];

const STATUS_CONFIG: Record<ScholarshipStatus, { label: string; color: string }> = {
  eligible: { label: "Eligible", color: "bg-green-100 text-green-700" },
  applied: { label: "Applied ✓", color: "bg-blue-100 text-blue-700" },
  conditional: { label: "Conditional", color: "bg-amber-100 text-amber-700" },
};

type FilterTab = "all" | ScholarshipStatus;

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "eligible", label: "Eligible" },
  { id: "applied", label: "Applied" },
  { id: "conditional", label: "Conditional" },
];

function MatchBar({ pct }: { pct: number }) {
  const color =
    pct >= 90 ? "bg-green-500" : pct >= 80 ? "bg-blue-500" : pct >= 70 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-bold ${pct >= 90 ? "text-green-600" : pct >= 80 ? "text-blue-600" : "text-amber-600"}`}>
        {pct}%
      </span>
    </div>
  );
}

function ScholarshipCard({ s }: { s: Scholarship }) {
  const cfg = STATUS_CONFIG[s.status];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md hover:border-slate-200 transition-all duration-200">
      {/* Gradient Header */}
      <div className={`bg-gradient-to-r ${s.color} p-5 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-bold text-sm leading-tight">{s.title}</h3>
            <p className="text-white/80 text-xs mt-0.5">{s.university}</p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color} shrink-0`}>
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Match */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <Target className="w-3 h-3" /> Profile Match
            </span>
            <span className="text-xs text-slate-400">Excellent fit</span>
          </div>
          <MatchBar pct={s.match} />
        </div>

        {/* Details */}
        <div className="space-y-2.5">
          <div className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Award</p>
              <p className="text-sm font-semibold text-slate-800">{s.amount}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Criteria</p>
              <p className="text-sm font-semibold text-slate-800">{s.criteria}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Deadline</p>
              <p className="text-sm font-semibold text-slate-800">{s.deadline}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          {s.status === "applied" ? (
            <button
              disabled
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <Check className="w-4 h-4" /> Applied
            </button>
          ) : (
            <button
              className={`w-full py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 bg-gradient-to-r ${s.color} hover:opacity-90 transition-opacity shadow-sm`}
            >
              <Sparkles className="w-4 h-4" /> Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ScholarshipsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered =
    activeTab === "all" ? SCHOLARSHIPS : SCHOLARSHIPS.filter((s) => s.status === activeTab);

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Scholarships</h1>
        <p className="text-slate-500 text-sm mt-0.5">Matched funding opportunities for your profile</p>
      </div>

      {/* Summary Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-white/70 text-sm font-medium">Total Matches Found</p>
          <p className="text-white text-3xl font-bold mt-0.5">4 Scholarships</p>
        </div>
        <div className="text-right">
          <p className="text-white/70 text-sm font-medium">Potential Savings</p>
          <p className="text-white text-3xl font-bold mt-0.5">$45,000+</p>
        </div>
        <div className="w-full h-px bg-white/20" />
        <p className="text-white/60 text-xs">
          Based on your academic profile, nationality, and chosen programs
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map((tab) => {
          const count =
            tab.id === "all"
              ? SCHOLARSHIPS.length
              : SCHOLARSHIPS.filter((s) => s.status === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-slate-200 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <ScholarshipCard key={s.title} s={s} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-slate-700 font-semibold">No scholarships in this category</h3>
          <p className="text-slate-400 text-sm mt-1">Try a different filter to see more opportunities</p>
        </div>
      )}
    </div>
  );
}
