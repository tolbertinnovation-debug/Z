"use client";
import { useState } from "react";
import { usePortalStore, AppStatus } from "@/lib/store";
import LiveBadge from "@/components/LiveBadge";
import toast from "react-hot-toast";
import { Search, Download, Eye, Pencil, Trash2, Check, X, ChevronUp, ChevronDown } from "lucide-react";

const STATUS_LABELS: Record<AppStatus, string> = {
  submitted: "Submitted", "under-review": "Under Review",
  "documents-required": "Docs Required", accepted: "Accepted",
  rejected: "Rejected", enrolled: "Enrolled",
};
const STATUS_COLORS: Record<AppStatus, string> = {
  submitted: "bg-blue-100 text-blue-700", "under-review": "bg-amber-100 text-amber-700",
  "documents-required": "bg-orange-100 text-orange-700", accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700", enrolled: "bg-purple-100 text-purple-700",
};

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "submitted", label: "Submitted" },
  { key: "under-review", label: "Under Review" },
  { key: "documents-required", label: "Docs Required" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
];

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return "Today";
  if (d === 1) return "Yesterday";
  return `${d} days ago`;
}

export default function AdminApplicationsPage() {
  const applications = usePortalStore(s => s.applications);
  const updateApplicationStatus = usePortalStore(s => s.updateApplicationStatus);

  const [search, setSearch] = useState("");
  const [tabFilter, setTabFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<AppStatus>("submitted");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filtered = applications.filter(a => {
    const matchSearch = !search ||
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.universityName.toLowerCase().includes(search.toLowerCase());
    const matchTab = tabFilter === "all" || a.status === tabFilter;
    return matchSearch && matchTab;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const saveStatus = (id: string) => {
    updateApplicationStatus(id, newStatus);
    toast.success("Status updated — student notified automatically");
    setEditingId(null);
  };

  const miniStats = [
    { label: "Total", value: applications.length, up: true },
    { label: "Pending", value: applications.filter(a => a.status === "submitted" || a.status === "under-review").length, up: false },
    { label: "Accepted", value: applications.filter(a => a.status === "accepted").length, up: true },
    { label: "Rejected", value: applications.filter(a => a.status === "rejected").length, up: false },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-slate-900">Applications</h2>
          <LiveBadge />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-sm shadow-sm">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {miniStats.map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className="text-xl font-black text-slate-900">{s.value}</p>
            </div>
            <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-green-600" : "text-red-500"}`}>
              {s.up ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto">
        {FILTER_TABS.map(t => (
          <button
            key={t.key}
            onClick={() => { setTabFilter(t.key); setPage(1); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${tabFilter === t.key ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {t.label}
            <span className={`text-xs px-1.5 rounded-full ${tabFilter === t.key ? "bg-orange-100 text-orange-600" : "bg-slate-200 text-slate-500"}`}>
              {t.key === "all" ? applications.length : applications.filter(a => a.status === t.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, ID, or university..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["App ID", "Student", "University", "Program", "Country", "Status", "Updated", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.map(app => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-xs text-slate-600 whitespace-nowrap">{app.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {app.studentName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 whitespace-nowrap">{app.studentName}</p>
                        <p className="text-xs text-slate-400">{app.studentEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700 max-w-32 truncate whitespace-nowrap">{app.universityName}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{app.program}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm">{app.country === "India" ? "🇮🇳" : "🇨🇾"} {app.country}</span>
                  </td>
                  <td className="px-4 py-3">
                    {editingId === app.id ? (
                      <div className="flex gap-1 items-center">
                        <select
                          value={newStatus}
                          onChange={e => setNewStatus(e.target.value as AppStatus)}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1 outline-none"
                        >
                          {(Object.keys(STATUS_LABELS) as AppStatus[]).map(s => (
                            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                          ))}
                        </select>
                        <button onClick={() => saveStatus(app.id)} className="p-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"><Check className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setEditingId(null)} className="p-1 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${STATUS_COLORS[app.status]}`}>
                        {STATUS_LABELS[app.status]}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{timeAgo(app.updatedAt)}</td>
                  <td className="px-4 py-3">
                    {deletingId === app.id ? (
                      <div className="flex gap-1 items-center">
                        <span className="text-xs text-slate-500">Delete?</span>
                        <button onClick={() => setDeletingId(null)} className="text-xs text-red-600 font-bold px-2 py-0.5 bg-red-50 rounded">Yes</button>
                        <button onClick={() => setDeletingId(null)} className="text-xs text-slate-500 px-2 py-0.5 bg-slate-100 rounded">No</button>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Eye className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { setEditingId(app.id); setNewStatus(app.status); }} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setDeletingId(app.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-400 text-sm">No applications match your filters</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50">Prev</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
