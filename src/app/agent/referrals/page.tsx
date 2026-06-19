"use client";

import { useState } from "react";
import {
  Search,
  Download,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock,
  Users,
  UserCheck,
  Hourglass,
  DollarSign,
} from "lucide-react";

type ReferralStatus =
  | "submitted"
  | "under-review"
  | "documents-required"
  | "accepted"
  | "rejected";

interface TimelineStep {
  label: string;
  date: string;
  done: boolean;
}

interface Referral {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  university: string;
  country: string;
  flag: string;
  status: ReferralStatus;
  referredDate: string;
  commission: number | null;
  timeline: TimelineStep[];
}

const MOCK_REFERRALS: Referral[] = [
  {
    id: "R001",
    firstName: "Amara",
    lastName: "Diallo",
    email: "amara.diallo@email.com",
    program: "Medicine",
    university: "Near East University",
    country: "North Cyprus",
    flag: "🇨🇾",
    status: "accepted",
    referredDate: "2024-02-10",
    commission: 1200,
    timeline: [
      { label: "Referred", date: "Feb 10, 2024", done: true },
      { label: "Applied", date: "Feb 15, 2024", done: true },
      { label: "Docs Submitted", date: "Feb 22, 2024", done: true },
      { label: "Under Review", date: "Mar 01, 2024", done: true },
      { label: "Accepted", date: "Mar 10, 2024", done: true },
    ],
  },
  {
    id: "R002",
    firstName: "Kwame",
    lastName: "Mensah",
    email: "kwame.m@gmail.com",
    program: "Engineering",
    university: "Cyprus International University",
    country: "North Cyprus",
    flag: "🇨🇾",
    status: "under-review",
    referredDate: "2024-03-05",
    commission: null,
    timeline: [
      { label: "Referred", date: "Mar 05, 2024", done: true },
      { label: "Applied", date: "Mar 12, 2024", done: true },
      { label: "Docs Submitted", date: "Mar 18, 2024", done: true },
      { label: "Under Review", date: "Mar 20, 2024", done: true },
      { label: "Accepted", date: "", done: false },
    ],
  },
  {
    id: "R003",
    firstName: "Fatima",
    lastName: "Al-Hassan",
    email: "fatima.h@outlook.com",
    program: "MBA",
    university: "Manipal University",
    country: "India",
    flag: "🇮🇳",
    status: "submitted",
    referredDate: "2024-03-20",
    commission: null,
    timeline: [
      { label: "Referred", date: "Mar 20, 2024", done: true },
      { label: "Applied", date: "", done: false },
      { label: "Docs Submitted", date: "", done: false },
      { label: "Under Review", date: "", done: false },
      { label: "Accepted", date: "", done: false },
    ],
  },
  {
    id: "R004",
    firstName: "Emmanuel",
    lastName: "Boateng",
    email: "e.boateng@yahoo.com",
    program: "Computer Science",
    university: "VIT University",
    country: "India",
    flag: "🇮🇳",
    status: "accepted",
    referredDate: "2024-01-15",
    commission: 960,
    timeline: [
      { label: "Referred", date: "Jan 15, 2024", done: true },
      { label: "Applied", date: "Jan 20, 2024", done: true },
      { label: "Docs Submitted", date: "Jan 28, 2024", done: true },
      { label: "Under Review", date: "Feb 03, 2024", done: true },
      { label: "Accepted", date: "Feb 14, 2024", done: true },
    ],
  },
  {
    id: "R005",
    firstName: "Aya",
    lastName: "Kouassi",
    email: "aya.kouassi@email.com",
    program: "Law",
    university: "Cyprus International University",
    country: "North Cyprus",
    flag: "🇨🇾",
    status: "documents-required",
    referredDate: "2024-04-01",
    commission: null,
    timeline: [
      { label: "Referred", date: "Apr 01, 2024", done: true },
      { label: "Applied", date: "Apr 08, 2024", done: true },
      { label: "Docs Submitted", date: "", done: false },
      { label: "Under Review", date: "", done: false },
      { label: "Accepted", date: "", done: false },
    ],
  },
  {
    id: "R006",
    firstName: "Ibrahim",
    lastName: "Traoré",
    email: "i.traore@mail.com",
    program: "Medicine",
    university: "SRM University",
    country: "India",
    flag: "🇮🇳",
    status: "rejected",
    referredDate: "2024-02-28",
    commission: null,
    timeline: [
      { label: "Referred", date: "Feb 28, 2024", done: true },
      { label: "Applied", date: "Mar 05, 2024", done: true },
      { label: "Docs Submitted", date: "Mar 10, 2024", done: true },
      { label: "Under Review", date: "Mar 15, 2024", done: true },
      { label: "Accepted", date: "Mar 22, 2024", done: false },
    ],
  },
  {
    id: "R007",
    firstName: "Abena",
    lastName: "Osei",
    email: "abena.osei@gmail.com",
    program: "Engineering",
    university: "Manipal University",
    country: "India",
    flag: "🇮🇳",
    status: "under-review",
    referredDate: "2024-04-10",
    commission: null,
    timeline: [
      { label: "Referred", date: "Apr 10, 2024", done: true },
      { label: "Applied", date: "Apr 16, 2024", done: true },
      { label: "Docs Submitted", date: "Apr 20, 2024", done: true },
      { label: "Under Review", date: "Apr 23, 2024", done: true },
      { label: "Accepted", date: "", done: false },
    ],
  },
  {
    id: "R008",
    firstName: "Moussa",
    lastName: "Camara",
    email: "m.camara@proton.me",
    program: "MBA",
    university: "Near East University",
    country: "North Cyprus",
    flag: "🇨🇾",
    status: "accepted",
    referredDate: "2024-01-30",
    commission: 720,
    timeline: [
      { label: "Referred", date: "Jan 30, 2024", done: true },
      { label: "Applied", date: "Feb 05, 2024", done: true },
      { label: "Docs Submitted", date: "Feb 12, 2024", done: true },
      { label: "Under Review", date: "Feb 18, 2024", done: true },
      { label: "Accepted", date: "Feb 28, 2024", done: true },
    ],
  },
  {
    id: "R009",
    firstName: "Naomi",
    lastName: "Adjei",
    email: "naomi.adjei@email.com",
    program: "Computer Science",
    university: "VIT University",
    country: "India",
    flag: "🇮🇳",
    status: "submitted",
    referredDate: "2024-04-18",
    commission: null,
    timeline: [
      { label: "Referred", date: "Apr 18, 2024", done: true },
      { label: "Applied", date: "", done: false },
      { label: "Docs Submitted", date: "", done: false },
      { label: "Under Review", date: "", done: false },
      { label: "Accepted", date: "", done: false },
    ],
  },
  {
    id: "R010",
    firstName: "Yaw",
    lastName: "Asante",
    email: "yaw.asante@gmail.com",
    program: "Medicine",
    university: "Cyprus International University",
    country: "North Cyprus",
    flag: "🇨🇾",
    status: "documents-required",
    referredDate: "2024-04-05",
    commission: null,
    timeline: [
      { label: "Referred", date: "Apr 05, 2024", done: true },
      { label: "Applied", date: "Apr 11, 2024", done: true },
      { label: "Docs Submitted", date: "", done: false },
      { label: "Under Review", date: "", done: false },
      { label: "Accepted", date: "", done: false },
    ],
  },
];

type FilterTab = "all" | ReferralStatus;

const STATUS_CONFIG: Record<
  ReferralStatus,
  { label: string; className: string }
> = {
  submitted: { label: "Submitted", className: "bg-blue-100 text-blue-700" },
  "under-review": {
    label: "Under Review",
    className: "bg-amber-100 text-amber-700",
  },
  "documents-required": {
    label: "Docs Required",
    className: "bg-orange-100 text-orange-700",
  },
  accepted: { label: "Accepted", className: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700" },
};

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "submitted", label: "Pending" },
  { key: "under-review", label: "Under Review" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
];

function avatarInitials(first: string, last: string) {
  return `${first[0]}${last[0]}`.toUpperCase();
}

function avatarColor(id: string) {
  const colors = [
    "from-emerald-500 to-teal-600",
    "from-blue-500 to-indigo-600",
    "from-violet-500 to-purple-600",
    "from-amber-500 to-orange-600",
    "from-pink-500 to-rose-600",
  ];
  const idx = id.charCodeAt(1) % colors.length;
  return colors[idx];
}

export default function ReferralsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filtered = MOCK_REFERRALS.filter((r) => {
    const matchTab =
      activeTab === "all" || r.status === activeTab;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      `${r.firstName} ${r.lastName}`.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.program.toLowerCase().includes(q) ||
      r.university.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  function toggleRow(id: string) {
    setExpandedRow((prev) => (prev === id ? null : id));
  }

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Referrals",
            value: "47",
            icon: Users,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Active",
            value: "31",
            icon: Clock,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Converted",
            value: "12",
            icon: UserCheck,
            color: "text-teal-600",
            bg: "bg-teal-50",
          },
          {
            label: "Pending Commission",
            value: "$840",
            icon: DollarSign,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3 shadow-sm"
          >
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
          {FILTER_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === t.key
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t.label}
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
              onChange={(e) => setSearch(e.target.value)}
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
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">University</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Country</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Date</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Commission</th>
                <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const cfg = STATUS_CONFIG[r.status];
                const isExpanded = expandedRow === r.id;
                return (
                  <>
                    <tr
                      key={r.id}
                      className="border-t border-slate-50 hover:bg-slate-50/70 cursor-pointer transition-colors"
                      onClick={() => toggleRow(r.id)}
                    >
                      {/* Student */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor(r.id)} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                          >
                            {avatarInitials(r.firstName, r.lastName)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-slate-900 font-semibold truncate">{r.firstName} {r.lastName}</p>
                            <p className="text-slate-400 text-xs truncate">{r.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">{r.program}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs max-w-[140px] truncate">{r.university}</td>
                      <td className="px-4 py-3">
                        <span className="text-base">{r.flag}</span>{" "}
                        <span className="text-slate-600 text-xs">{r.country}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.className}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                        {new Date(r.referredDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        {r.commission != null ? (
                          <span className="text-emerald-600 font-bold">${r.commission.toLocaleString()}</span>
                        ) : (
                          <span className="text-slate-400 text-xs">Pending</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleRow(r.id); }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition"
                            title="Message"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded timeline row */}
                    {isExpanded && (
                      <tr key={`${r.id}-expanded`} className="border-t border-emerald-100 bg-emerald-50/40">
                        <td colSpan={8} className="px-6 py-5">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
                            Referral Timeline
                          </p>
                          <div className="flex flex-wrap gap-0">
                            {r.timeline.map((step, idx) => (
                              <div key={idx} className="flex items-center">
                                <div className="flex flex-col items-center gap-1">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      step.done
                                        ? "bg-emerald-600 text-white"
                                        : "bg-slate-200 text-slate-400"
                                    }`}
                                  >
                                    {step.done ? (
                                      <Check className="w-4 h-4" />
                                    ) : (
                                      <Clock className="w-3.5 h-3.5" />
                                    )}
                                  </div>
                                  <p className={`text-xs font-semibold whitespace-nowrap ${step.done ? "text-emerald-700" : "text-slate-400"}`}>
                                    {step.label}
                                  </p>
                                  <p className="text-xs text-slate-400 whitespace-nowrap">
                                    {step.date || "—"}
                                  </p>
                                </div>
                                {idx < r.timeline.length - 1 && (
                                  <div
                                    className={`h-0.5 w-12 sm:w-16 mt-[-18px] mx-1 ${
                                      r.timeline[idx + 1].done ? "bg-emerald-400" : "bg-slate-200"
                                    }`}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-slate-500 text-sm">Showing 1–10 of 47 referrals</p>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition disabled:opacity-40">
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition">
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Pagination note */}
      <div className="flex items-center gap-2 text-slate-400 text-xs">
        <Hourglass className="w-3.5 h-3.5" />
        Click any row to expand the referral timeline
      </div>
    </div>
  );
}
