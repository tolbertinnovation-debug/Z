"use client";

import { useState } from "react";
import {
  TrendingUp,
  Calendar,
  Users,
  Clock,
  Award,
  DollarSign,
  BarChart2,
  Trophy,
} from "lucide-react";

type DateRange = "7d" | "30d" | "3m";

const kpis = [
  {
    label: "Referrals This Month",
    value: "8",
    icon: Users,
    color: "bg-emerald-50 text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    label: "Conversion Rate",
    value: "74%",
    icon: TrendingUp,
    color: "bg-teal-50 text-teal-600",
    iconBg: "bg-teal-100",
  },
  {
    label: "Avg Time to Convert",
    value: "18 days",
    icon: Clock,
    color: "bg-emerald-50 text-emerald-700",
    iconBg: "bg-emerald-100",
  },
  {
    label: "Rank Among Agents",
    value: "#7 of 43",
    icon: Award,
    color: "bg-teal-50 text-teal-700",
    iconBg: "bg-teal-100",
  },
];

const funnelStages = [
  { label: "Referred", count: 47 },
  { label: "Applied", count: 39 },
  { label: "Docs Submitted", count: 28 },
  { label: "Under Review", count: 19 },
  { label: "Accepted", count: 12 },
];

const monthlyData = [
  { month: "Jan", referrals: 6, conversions: 4 },
  { month: "Feb", referrals: 8, conversions: 5 },
  { month: "Mar", referrals: 10, conversions: 7 },
  { month: "Apr", referrals: 7, conversions: 6 },
  { month: "May", referrals: 9, conversions: 7 },
  { month: "Jun", referrals: 8, conversions: 6 },
];

const maxReferrals = Math.max(...monthlyData.map((d) => d.referrals));

const topUniversities = [
  { name: "University of Ibadan", count: 12 },
  { name: "Near East University", count: 10 },
  { name: "Eastern Mediterranean Univ.", count: 9 },
  { name: "Girne American University", count: 8 },
  { name: "Cyprus International Univ.", count: 8 },
];

const maxUniCount = Math.max(...topUniversities.map((u) => u.count));

type TierName = "Platinum" | "Gold" | "Silver" | "Bronze";

const leaderboard: {
  rank: number;
  name: string;
  tier: TierName;
  referrals: number;
  conversions: number;
  earnings: string;
  isYou?: boolean;
}[] = [
  { rank: 1, name: "Agent #1", tier: "Platinum", referrals: 87, conversions: 71, earnings: "$13,920" },
  { rank: 2, name: "Agent #2", tier: "Platinum", referrals: 74, conversions: 59, earnings: "$11,832" },
  { rank: 3, name: "Agent #3", tier: "Platinum", referrals: 68, conversions: 54, earnings: "$10,854" },
  { rank: 4, name: "Agent #4", tier: "Platinum", referrals: 61, conversions: 49, earnings: "$9,792" },
  { rank: 5, name: "Agent #5", tier: "Gold", referrals: 58, conversions: 44, earnings: "$8,448" },
  { rank: 6, name: "Agent #6", tier: "Gold", referrals: 52, conversions: 41, earnings: "$7,872" },
  { rank: 7, name: "You", tier: "Gold", referrals: 47, conversions: 35, earnings: "$3,760", isYou: true },
  { rank: 8, name: "Agent #8", tier: "Gold", referrals: 43, conversions: 32, earnings: "$6,144" },
  { rank: 9, name: "Agent #9", tier: "Silver", referrals: 22, conversions: 17, earnings: "$2,720" },
  { rank: 10, name: "Agent #10", tier: "Silver", referrals: 19, conversions: 14, earnings: "$2,240" },
];

const tierBadgeClass: Record<TierName, string> = {
  Platinum: "bg-purple-100 text-purple-700",
  Gold: "bg-yellow-100 text-yellow-700",
  Silver: "bg-slate-100 text-slate-600",
  Bronze: "bg-orange-100 text-orange-700",
};

const dateRangeOptions: { label: string; value: DateRange }[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 3 months", value: "3m" },
];

export default function PerformancePage() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header + Date Range */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-slate-800 font-bold text-xl">Performance & Analytics</h2>
          <p className="text-slate-500 text-sm mt-0.5">Track your referral performance and earnings</p>
        </div>
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          <Calendar className="w-4 h-4 text-slate-400 ml-2" />
          {dateRangeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDateRange(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                dateRange === opt.value
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className={`w-10 h-10 rounded-xl ${kpi.iconBg} flex items-center justify-center mb-3`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color.split(" ")[1]}`} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Referral Funnel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-800">Referral Funnel</h3>
        </div>
        <div className="space-y-3">
          {funnelStages.map((stage, i) => {
            const pct = Math.round((stage.count / funnelStages[0].count) * 100);
            return (
              <div key={stage.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-600 font-medium">{stage.label}</span>
                  <span className="text-sm font-bold text-slate-800">{stage.count}</span>
                </div>
                <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center px-3 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  >
                    {pct > 20 && (
                      <span className="text-white text-xs font-semibold">{pct}%</span>
                    )}
                  </div>
                </div>
                {i < funnelStages.length - 1 && (
                  <p className="text-xs text-slate-400 mt-1">
                    Drop-off: {funnelStages[i].count - funnelStages[i + 1].count} students
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <h3 className="font-bold text-slate-800">Monthly Performance</h3>
          <div className="ml-auto flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Referrals
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-teal-300 inline-block" /> Conversions
            </span>
          </div>
        </div>
        <div className="flex items-end gap-4 h-40">
          {monthlyData.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end gap-1 h-32">
                <div
                  className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all"
                  style={{ height: `${(d.referrals / maxReferrals) * 100}%` }}
                  title={`Referrals: ${d.referrals}`}
                />
                <div
                  className="flex-1 bg-gradient-to-t from-teal-400 to-teal-200 rounded-t-md transition-all"
                  style={{ height: `${(d.conversions / maxReferrals) * 100}%` }}
                  title={`Conversions: ${d.conversions}`}
                />
              </div>
              <span className="text-xs text-slate-500 font-medium">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Universities */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-800">Top Universities by Referrals</h3>
        </div>
        <div className="space-y-3">
          {topUniversities.map((u, i) => {
            const pct = Math.round((u.count / maxUniCount) * 100);
            return (
              <div key={u.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 w-4">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-700 font-medium">{u.name}</span>
                    <span className="text-sm font-bold text-slate-800">{u.count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-yellow-600" />
          </div>
          <h3 className="font-bold text-slate-800">Agent Leaderboard</h3>
          <span className="ml-auto text-xs text-slate-400">Top 10 agents</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-100">
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Rank</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Agent</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Tier</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide text-right">Referrals</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide text-right">Conversions</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide text-right">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((agent) => (
                <tr
                  key={agent.rank}
                  className={`border-b border-slate-50 ${agent.isYou ? "bg-emerald-50" : "hover:bg-slate-50"}`}
                >
                  <td className="py-3 pr-3">
                    <span className={`font-bold ${agent.rank <= 3 ? "text-yellow-600" : "text-slate-500"}`}>
                      {agent.rank <= 3 ? ["🥇", "🥈", "🥉"][agent.rank - 1] : `#${agent.rank}`}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className={`font-semibold ${agent.isYou ? "text-emerald-700" : "text-slate-700"}`}>
                      {agent.name}
                      {agent.isYou && (
                        <span className="ml-2 text-xs bg-emerald-600 text-white px-1.5 py-0.5 rounded-full">You</span>
                      )}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tierBadgeClass[agent.tier]}`}>
                      {agent.tier}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-right font-semibold text-slate-700">{agent.referrals}</td>
                  <td className="py-3 pr-3 text-right text-slate-600">{agent.conversions}</td>
                  <td className={`py-3 text-right font-bold ${agent.isYou ? "text-emerald-700" : "text-slate-700"}`}>
                    {agent.earnings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commission Breakdown */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg p-5 text-white">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-emerald-200" />
          <h3 className="font-bold text-lg">Commission Breakdown</h3>
          <span className="ml-auto text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">Gold Tier · 12%</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-3xl font-bold">47</p>
            <p className="text-emerald-200 text-xs mt-1">Total Referrals</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-3xl font-bold">$3,200</p>
            <p className="text-emerald-200 text-xs mt-1">Avg Tuition Fee</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-3xl font-bold">12%</p>
            <p className="text-emerald-200 text-xs mt-1">Commission Rate</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
          <p className="text-emerald-100 text-sm">47 referrals × $3,200 avg × 12% =</p>
          <p className="text-3xl font-extrabold">$18,048</p>
        </div>
        <p className="text-emerald-200 text-xs mt-3">
          * Earnings shown reflect accepted conversions. Reach Platinum tier (50+ referrals) to unlock 15% commission.
        </p>
      </div>
    </div>
  );
}
