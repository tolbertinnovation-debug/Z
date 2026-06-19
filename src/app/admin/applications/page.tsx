"use client";
import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";

type AppStatus =
  | "submitted"
  | "under-review"
  | "documents-required"
  | "accepted"
  | "rejected";

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  university: string;
  program: string;
  country: string;
  status: AppStatus;
  date: string;
}

const ALL_STATUSES: AppStatus[] = [
  "submitted",
  "under-review",
  "documents-required",
  "accepted",
  "rejected",
];

const STATUS_LABELS: Record<AppStatus, string> = {
  submitted: "Submitted",
  "under-review": "Under Review",
  "documents-required": "Docs Required",
  accepted: "Accepted",
  rejected: "Rejected",
};

const STATUS_COLORS: Record<AppStatus, string> = {
  submitted: "bg-blue-100 text-blue-700 border-blue-200",
  "under-review": "bg-amber-100 text-amber-700 border-amber-200",
  "documents-required": "bg-orange-100 text-orange-700 border-orange-200",
  accepted: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};

const mockApplications: Application[] = [
  {
    id: "TIH-001",
    studentName: "Emmanuel Kollie",
    studentEmail: "ekollie@mail.com",
    university: "Lovely Professional University",
    program: "BSc Computer Science",
    country: "India",
    status: "submitted",
    date: "2026-06-10",
  },
  {
    id: "TIH-002",
    studentName: "Patience Saah",
    studentEmail: "psaah@mail.com",
    university: "Amity University",
    program: "MBA International Business",
    country: "India",
    status: "accepted",
    date: "2026-06-08",
  },
  {
    id: "TIH-003",
    studentName: "James Brownell",
    studentEmail: "jbrownell@mail.com",
    university: "Cyrus International University",
    program: "LLB Law",
    country: "North Cyprus",
    status: "documents-required",
    date: "2026-06-07",
  },
  {
    id: "TIH-004",
    studentName: "Mary Flomo",
    studentEmail: "mflomo@mail.com",
    university: "SHARDA University",
    program: "MBBS Medicine",
    country: "India",
    status: "under-review",
    date: "2026-06-05",
  },
  {
    id: "TIH-005",
    studentName: "Titus Mulbah",
    studentEmail: "tmulbah@mail.com",
    university: "Marwadi University",
    program: "BTech Mechanical Engineering",
    country: "India",
    status: "accepted",
    date: "2026-06-04",
  },
  {
    id: "TIH-006",
    studentName: "Sia Kamara",
    studentEmail: "skamara@mail.com",
    university: "Graphic Era University",
    program: "BSc Nursing",
    country: "India",
    status: "submitted",
    date: "2026-06-03",
  },
  {
    id: "TIH-007",
    studentName: "David Togba",
    studentEmail: "dtogba@mail.com",
    university: "Cyrus West University",
    program: "BSc Computer Engineering",
    country: "North Cyprus",
    status: "rejected",
    date: "2026-06-01",
  },
  {
    id: "TIH-008",
    studentName: "Ruth Gonquoi",
    studentEmail: "rgonquoi@mail.com",
    university: "SR University",
    program: "MSc Data Science",
    country: "India",
    status: "under-review",
    date: "2026-05-30",
  },
  {
    id: "TIH-009",
    studentName: "Moses Kpargoi",
    studentEmail: "mkpargoi@mail.com",
    university: "Desh Bhagat University",
    program: "BSc Agriculture",
    country: "India",
    status: "documents-required",
    date: "2026-05-28",
  },
  {
    id: "TIH-010",
    studentName: "Alice Sumo",
    studentEmail: "asumo@mail.com",
    university: "SOA University",
    program: "BDS Dentistry",
    country: "India",
    status: "submitted",
    date: "2026-05-25",
  },
];

type FilterTab =
  | "all"
  | "pending-review"
  | "documents-required"
  | "accepted"
  | "rejected";

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending-review", label: "Pending Review" },
  { key: "documents-required", label: "Documents Required" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
];

function tabMatchesStatus(tab: FilterTab, status: AppStatus): boolean {
  if (tab === "all") return true;
  if (tab === "pending-review")
    return status === "submitted" || status === "under-review";
  if (tab === "documents-required") return status === "documents-required";
  if (tab === "accepted") return status === "accepted";
  if (tab === "rejected") return status === "rejected";
  return true;
}

const miniStats = [
  {
    label: "Total",
    value: 247,
    trend: "+18%",
    up: true,
    color: "text-slate-700",
  },
  {
    label: "Pending",
    value: 31,
    trend: "-5%",
    up: false,
    color: "text-amber-600",
  },
  {
    label: "Accepted",
    value: 42,
    trend: "+25%",
    up: true,
    color: "text-green-600",
  },
  {
    label: "Rejected",
    value: 6,
    trend: "-2%",
    up: false,
    color: "text-red-600",
  },
];

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppStatus | "all">("all");
  const [applications, setApplications] =
    useState<Application[]>(mockApplications);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingStatus, setEditingStatus] = useState<AppStatus>("submitted");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = applications.filter((app) => {
    const matchesTab = tabMatchesStatus(activeTab, app.status);
    const matchesStatus =
      statusFilter === "all" || app.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      app.studentName.toLowerCase().includes(q) ||
      app.studentEmail.toLowerCase().includes(q) ||
      app.university.toLowerCase().includes(q) ||
      app.id.toLowerCase().includes(q);
    return matchesTab && matchesStatus && matchesSearch;
  });

  function startEdit(app: Application) {
    setEditingId(app.id);
    setEditingStatus(app.status);
  }

  function saveEdit(id: string) {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: editingStatus } : a))
    );
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function deleteApp(id: string) {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    setDeletingId(null);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Mini stat bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {miniStats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            </div>
            <span
              className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-green-600" : "text-red-500"}`}
            >
              {s.up ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
              {s.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search + filter row */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, university, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-slate-700 placeholder-slate-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as AppStatus | "all")}
          className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 text-slate-700 bg-white"
        >
          <option value="all">All Statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  App ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Student
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  University
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Program
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-12 text-slate-400 text-sm"
                  >
                    No applications match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">
                      {app.id}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800 whitespace-nowrap">
                        {app.studentName}
                      </p>
                      <p className="text-xs text-slate-400">
                        {app.studentEmail}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap max-w-[180px] truncate">
                      {app.university}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap max-w-[160px] truncate">
                      {app.program}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                      {app.country}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === app.id ? (
                        <div className="flex items-center gap-1.5">
                          <select
                            value={editingStatus}
                            onChange={(e) =>
                              setEditingStatus(e.target.value as AppStatus)
                            }
                            className="text-xs border border-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-orange-400 bg-white text-slate-700"
                          >
                            {ALL_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {STATUS_LABELS[s]}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => saveEdit(app.id)}
                            className="p-1 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[app.status]}`}
                        >
                          {STATUS_LABELS[app.status]}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {app.date}
                    </td>
                    <td className="px-4 py-3">
                      {deletingId === app.id ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-500">
                            Delete?
                          </span>
                          <button
                            onClick={() => deleteApp(app.id)}
                            className="p-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => startEdit(app)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(app.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              1-{Math.min(8, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">247</span> results
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 border border-slate-200 disabled:opacity-50"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Prev
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-orange-600 border border-orange-200 hover:bg-orange-50 transition-colors">
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
