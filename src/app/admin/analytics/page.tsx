"use client";

import { useState } from "react";
import { Download, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { usePortalStore } from "@/lib/store";
import LiveBadge from "@/components/LiveBadge";

type DateRange = "7d" | "30d" | "3m" | "custom";

const DATE_RANGES: { key: DateRange; label: string }[] = [
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "3m", label: "Last 3 months" },
  { key: "custom", label: "Custom" },
];

// kpis and funnel computed inside component from store

const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const chartApps = [95, 120, 145, 160, 185, 210];
const chartAcceptances = [52, 70, 88, 102, 118, 135];
const maxBar = 220;

const demographics = {
  nationality: [{ label: "Liberian", pct: 100, color: "bg-orange-500" }],
  gender: [
    { label: "Male", pct: 62, color: "bg-orange-500" },
    { label: "Female", pct: 38, color: "bg-rose-400" },
  ],
  level: [
    { label: "Undergraduate", pct: 70, color: "bg-orange-500" },
    { label: "Postgraduate", pct: 30, color: "bg-amber-400" },
  ],
};

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const applications = usePortalStore(s => s.applications);
  const students = usePortalStore(s => s.students);
  const referrals = usePortalStore(s => s.referrals);

  const totalApps = applications.length;
  const acceptedApps = applications.filter(a => a.status === "accepted").length;
  const acceptanceRate = totalApps ? Math.round((acceptedApps / totalApps) * 100) : 0;
  const totalCommissions = applications.filter(a => a.status === "accepted").reduce((s, a) => s + a.commissionAmount, 0);

  // Compute university breakdown from real data
  const uniMap = applications.reduce<Record<string, number>>((acc, a) => {
    acc[a.universityName] = (acc[a.universityName] ?? 0) + 1;
    return acc;
  }, {});
  const topUniversities = Object.entries(uniMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 6);
  const maxUniversity = Math.max(...topUniversities.map(u => u.count), 1);

  const kpis = [
    { label: "Total Commissions", value: `$${totalCommissions.toLocaleString()}`, change: "+12%", up: true, sub: "from accepted apps" },
    { label: "Avg Processing Time", value: "8 days", change: "-2 days", up: true, sub: "faster than before" },
    { label: "Acceptance Rate", value: `${acceptanceRate}%`, change: "+4%", up: true, sub: "vs last period" },
    { label: "Agent Referrals", value: String(referrals.length), change: "+8", up: true, sub: "total referrals" },
  ];

  const funnelStages = [
    { label: "Registered", count: students.length, pct: 100 },
    { label: "Applied", count: totalApps, pct: students.length ? Math.round((totalApps / students.length) * 100) : 0 },
    { label: "Docs Submitted", count: applications.filter(a => a.documents.some(d => d.status === "approved")).length, pct: totalApps ? Math.round((applications.filter(a => a.documents.some(d => d.status === "approved")).length / totalApps) * 100) : 0 },
    { label: "Under Review", count: applications.filter(a => a.status === "under-review").length, pct: totalApps ? Math.round((applications.filter(a => a.status === "under-review").length / totalApps) * 100) : 0 },
    { label: "Accepted", count: acceptedApps, pct: totalApps ? Math.round((acceptedApps / totalApps) * 100) : 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Analytics & Reports <LiveBadge />
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Insights and trends across all student activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {DATE_RANGES.map((r) => (
          <button
            key={r.key}
            onClick={() => setDateRange(r.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              dateRange === r.key
                ? "bg-white text-orange-600 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-xl border border-slate-200 p-4"
          >
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {kpi.up ? (
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${kpi.up ? "text-green-600" : "text-red-600"}`}
              >
                {kpi.change}
              </span>
              <span className="text-xs text-slate-400">{kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Application Funnel */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">
          Application Funnel
        </h2>
        <div className="space-y-3">
          {funnelStages.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-3">
              <div className="w-32 text-xs text-slate-600 text-right flex-shrink-0">
                {stage.label}
              </div>
              <div className="flex-1 bg-slate-100 rounded-full h-7 relative overflow-hidden">
                <div
                  className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                  style={{
                    width: `${stage.pct}%`,
                    backgroundColor: `rgb(${249 - i * 20}, ${115 - i * 10}, ${22 + i * 5})`,
                  }}
                >
                  <span className="text-xs text-white font-semibold">
                    {stage.count}
                  </span>
                </div>
              </div>
              <div className="w-12 text-xs text-slate-500 text-right flex-shrink-0">
                {stage.pct}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Universities */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">
            Top Universities by Applications
          </h2>
          <div className="space-y-3">
            {topUniversities.map((u) => {
              const pct = Math.round((u.count / maxUniversity) * 100);
              return (
                <div key={u.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">{u.name}</span>
                    <span className="text-slate-500">{u.count}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="h-2 bg-orange-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Student Demographics */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">
            Student Demographics
          </h2>
          <div className="space-y-5">
            {(
              [
                { title: "Nationality", key: "nationality" },
                { title: "Gender", key: "gender" },
                { title: "Program Level", key: "level" },
              ] as const
            ).map(({ title, key }) => (
              <div key={title}>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {title}
                </p>
                <div className="space-y-2">
                  {demographics[key].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-700">{item.label}</span>
                        <span className="font-semibold text-slate-800">
                          {item.pct}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className={`h-2 ${item.color} rounded-full`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-slate-800">Monthly Trends</h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-orange-500 inline-block" />
              Applications
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-400 inline-block" />
              Acceptances
            </span>
          </div>
        </div>
        <div className="flex items-end gap-4 h-40">
          {chartMonths.map((month, i) => (
            <div
              key={month}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div className="w-full flex items-end gap-1 h-32">
                {/* Applications bar */}
                <div className="flex-1 flex items-end">
                  <div
                    className="w-full bg-orange-500 rounded-t"
                    style={{
                      height: `${(chartApps[i] / maxBar) * 100}%`,
                    }}
                  />
                </div>
                {/* Acceptances bar */}
                <div className="flex-1 flex items-end">
                  <div
                    className="w-full bg-rose-400 rounded-t"
                    style={{
                      height: `${(chartAcceptances[i] / maxBar) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <span className="text-xs text-slate-500">{month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400">
          {chartMonths.map((month, i) => (
            <div key={month} className="flex-1 text-center">
              <div className="text-slate-600">{chartApps[i]}</div>
              <div className="text-rose-400">{chartAcceptances[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
