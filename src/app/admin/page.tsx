"use client";
import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Users, Building2, FileText, TrendingUp,
  CheckCircle, Clock, AlertCircle, Eye, Edit, Trash2, Plus,
  Search, Filter, Download, Bell, Settings, ChevronUp, ChevronDown
} from "lucide-react";
import { universities } from "@/lib/data";

const mockApplications = [
  { id: "TIH-001", student: "Emmanuel Kollie", email: "e.kollie@email.com", university: "Lovely Professional University", program: "BSc Computer Science", status: "under-review", date: "2024-01-15", country: "India" },
  { id: "TIH-002", student: "Patience Saah", email: "p.saah@email.com", university: "Amity University", program: "MBA International Business", status: "accepted", date: "2024-01-14", country: "India" },
  { id: "TIH-003", student: "James Brownell", email: "j.brownell@email.com", university: "Cyrus International University", program: "LLB Law", status: "documents-required", date: "2024-01-13", country: "North Cyprus" },
  { id: "TIH-004", student: "Mary Flomo", email: "m.flomo@email.com", university: "SHARDA University", program: "MBBS", status: "submitted", date: "2024-01-12", country: "India" },
  { id: "TIH-005", student: "Titus Mulbah", email: "t.mulbah@email.com", university: "Marwadi University", program: "BTech Mechanical", status: "accepted", date: "2024-01-11", country: "India" },
  { id: "TIH-006", student: "Sia Kamara", email: "s.kamara@email.com", university: "Graphic Era University", program: "BSc Nursing", status: "rejected", date: "2024-01-10", country: "India" },
  { id: "TIH-007", student: "David Weah", email: "d.weah@email.com", university: "LPU", program: "BTech CSE", status: "under-review", date: "2024-01-09", country: "India" },
  { id: "TIH-008", student: "Agnes Toe", email: "a.toe@email.com", university: "Cyrus West University", program: "MBA", status: "submitted", date: "2024-01-08", country: "North Cyprus" },
];

const dashStats = [
  { label: "Total Applications", value: "247", trend: "+18%", icon: FileText, color: "blue" },
  { label: "Active Students", value: "183", trend: "+12%", icon: Users, color: "green" },
  { label: "Accepted This Month", value: "42", trend: "+25%", icon: CheckCircle, color: "purple" },
  { label: "Pending Review", value: "31", trend: "-5%", icon: Clock, color: "amber" },
];

const statusConfig = {
  "submitted": { label: "Submitted", color: "bg-blue-100 text-blue-700" },
  "under-review": { label: "Under Review", color: "bg-amber-100 text-amber-700" },
  "documents-required": { label: "Docs Required", color: "bg-orange-100 text-orange-700" },
  "accepted": { label: "Accepted", color: "bg-green-100 text-green-700" },
  "rejected": { label: "Rejected", color: "bg-red-100 text-red-700" },
};

const colorMap = {
  blue: "text-blue-600 bg-blue-50",
  green: "text-green-600 bg-green-50",
  purple: "text-purple-600 bg-purple-50",
  amber: "text-amber-600 bg-amber-50",
};

const chartData = [
  { month: "Aug", apps: 18 },
  { month: "Sep", apps: 32 },
  { month: "Oct", apps: 25 },
  { month: "Nov", apps: 41 },
  { month: "Dec", apps: 38 },
  { month: "Jan", apps: 54 },
];

const maxApps = Math.max(...chartData.map((d) => d.apps));

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState("");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "universities", label: "Universities", icon: Building2 },
    { id: "students", label: "Students", icon: Users },
  ];

  const filteredApps = mockApplications.filter((app) => {
    const matchSearch = !search || app.student.toLowerCase().includes(search.toLowerCase()) || app.id.toLowerCase().includes(search.toLowerCase()) || app.university.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = mockApplications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white shrink-0 hidden lg:flex flex-col fixed h-screen">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sm">Admin Panel</p>
              <p className="text-slate-400 text-xs">Tolbert Innovation Hub</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold">AD</div>
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-slate-400">admin@tolbert.com</p>
            </div>
          </div>
          <Link href="/" className="mt-2 flex items-center gap-2 px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors">
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="lg:hidden flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <p className="font-bold text-sm text-slate-900">Admin Panel</p>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              {/* Mobile Tabs */}
              <div className="flex lg:hidden gap-1">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-2 rounded-lg text-sm ${activeTab === tab.id ? "bg-blue-100 text-blue-600" : "text-slate-500"}`}>
                    <tab.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500 text-sm">Welcome back! Here&apos;s what&apos;s happening today.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {dashStats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[stat.color as keyof typeof colorMap]}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.trend.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
                        {stat.trend.startsWith("+") ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        {stat.trend}
                      </span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Monthly Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h3 className="font-bold text-slate-900 mb-1">Monthly Applications</h3>
                  <p className="text-sm text-slate-500 mb-6">Application submissions over the last 6 months</p>
                  <div className="flex items-end gap-3 h-40">
                    {chartData.map((d) => (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs font-semibold text-slate-600">{d.apps}</span>
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all"
                          style={{ height: `${(d.apps / maxApps) * 120}px` }}
                        />
                        <span className="text-xs text-slate-400">{d.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Distribution */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Application Status</h3>
                  <div className="space-y-3">
                    {Object.entries(statusCounts).map(([status, count]) => {
                      const cfg = statusConfig[status as keyof typeof statusConfig];
                      const pct = Math.round((count / mockApplications.length) * 100);
                      return (
                        <div key={status}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600 font-medium">{cfg?.label}</span>
                            <span className="text-slate-500">{count} ({pct}%)</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${status === "accepted" ? "bg-green-500" : status === "under-review" ? "bg-amber-400" : status === "submitted" ? "bg-blue-500" : status === "documents-required" ? "bg-orange-400" : "bg-red-400"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Country Distribution */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Applications by Country</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { country: "🇮🇳 India", count: 215, pct: 87, color: "from-orange-400 to-orange-600" },
                    { country: "🇨🇾 North Cyprus", count: 32, pct: 13, color: "from-blue-400 to-blue-600" },
                  ].map((item) => (
                    <div key={item.country} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-bold text-slate-900">{item.country}</p>
                        <p className="text-sm text-slate-500">{item.count} applications</p>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                        </div>
                        <p className="text-xs text-slate-500 mt-1 text-right">{item.pct}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* APPLICATIONS */}
          {activeTab === "applications" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Applications</h1>
                  <p className="text-slate-500 text-sm">{filteredApps.length} of {mockApplications.length} applications</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm shadow-sm">
                    <Download className="w-4 h-4" /> Export
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name, ID, or university..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="submitted">Submitted</option>
                    <option value="under-review">Under Review</option>
                    <option value="documents-required">Docs Required</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {["App ID", "Student", "University", "Program", "Status", "Date", "Actions"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApps.map((app) => {
                        const cfg = statusConfig[app.status as keyof typeof statusConfig];
                        return (
                          <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-mono font-semibold text-xs text-slate-600 whitespace-nowrap">{app.id}</td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-semibold text-slate-900 whitespace-nowrap">{app.student}</p>
                                <p className="text-xs text-slate-400">{app.email}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-700 whitespace-nowrap max-w-32 truncate">{app.university}</td>
                            <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{app.program}</td>
                            <td className="px-4 py-3">
                              {selectedApp === app.id ? (
                                <div className="flex gap-1">
                                  <select
                                    value={newStatus || app.status}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="text-xs border border-slate-200 rounded-lg px-2 py-1 outline-none"
                                  >
                                    {Object.keys(statusConfig).map((s) => <option key={s} value={s}>{statusConfig[s as keyof typeof statusConfig].label}</option>)}
                                  </select>
                                  <button onClick={() => setSelectedApp(null)} className="text-xs text-green-600 font-semibold px-2 py-1 bg-green-50 rounded-lg">Save</button>
                                </div>
                              ) : (
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${cfg.color}`}>
                                  {cfg.label}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{app.date}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                                <button onClick={() => setSelectedApp(selectedApp === app.id ? null : app.id)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                                <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* UNIVERSITIES */}
          {activeTab === "universities" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Universities</h1>
                  <p className="text-slate-500 text-sm">Manage partner university listings</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-lg shadow-blue-200">
                  <Plus className="w-4 h-4" /> Add University
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {universities.map((uni) => (
                  <div key={uni.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="relative h-28 overflow-hidden">
                      <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <span className="absolute bottom-2 left-3 text-white text-xs font-semibold">{uni.country}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: uni.logoColor }}>{uni.logo}</div>
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{uni.name}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{uni.city} · Ranking #{uni.ranking} · ⭐ {uni.rating}</p>
                      <div className="flex gap-2">
                        <Link href={`/universities/${uni.id}`} className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors">
                          <Eye className="w-3 h-3" /> View
                        </Link>
                        <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
                          <Edit className="w-3 h-3" /> Edit
                        </button>
                        <button className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STUDENTS */}
          {activeTab === "students" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Students</h1>
                <p className="text-slate-500 text-sm">All registered student profiles</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {["Student", "Email", "Applications", "Status", "Joined", "Actions"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mockApplications.map((app, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                                {app.student.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </div>
                              <p className="font-semibold text-slate-900 whitespace-nowrap">{app.student}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{app.email}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-bold inline-flex items-center justify-center">
                              {Math.floor(Math.random() * 3) + 1}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[app.status as keyof typeof statusConfig]?.color}`}>
                              {statusConfig[app.status as keyof typeof statusConfig]?.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{app.date}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Eye className="w-3.5 h-3.5" /></button>
                              <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600"><Edit className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
