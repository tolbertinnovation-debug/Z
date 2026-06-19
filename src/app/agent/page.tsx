"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePortalStore } from "@/lib/store";
import LiveBadge from "@/components/LiveBadge";
import {
  Users, DollarSign, TrendingUp, UserPlus, Copy, CheckCircle,
  ArrowRight, Star, Award, Clock, ChevronUp
} from "lucide-react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const tierColors: Record<string, string> = {
  Platinum: "from-purple-500 to-indigo-600", Gold: "from-yellow-400 to-amber-500",
  Silver: "from-slate-400 to-slate-500", Bronze: "from-orange-400 to-amber-600",
};

const statusBadge: Record<string, string> = {
  accepted: "bg-green-100 text-green-700", "under-review": "bg-amber-100 text-amber-700",
  "documents-required": "bg-orange-100 text-orange-700", submitted: "bg-blue-100 text-blue-700",
  pending: "bg-slate-100 text-slate-600", rejected: "bg-red-100 text-red-700",
};
const statusLabel: Record<string, string> = {
  accepted: "Accepted", "under-review": "Under Review", "documents-required": "Docs Required",
  submitted: "Submitted", pending: "Pending", rejected: "Rejected",
};

export default function AgentDashboard() {
  const referrals = usePortalStore(s => s.getAgentReferrals("a1"));
  const applications = usePortalStore(s => s.applications.filter(a => a.agentId === "a1"));
  const [copied, setCopied] = useState(false);
  const [barWidths, setBarWidths] = useState<number[]>([]);

  const totalEarned = applications.filter(a => a.commissionPaid).reduce((s, a) => s + a.commissionAmount, 0);
  const pending = applications.filter(a => a.status === "accepted" && !a.commissionPaid).reduce((s, a) => s + a.commissionAmount, 0);
  const accepted = applications.filter(a => a.status === "accepted").length;
  const convRate = referrals.length ? Math.round((accepted / referrals.length) * 100) : 0;
  const tierProgress = Math.min((referrals.length / 50) * 100, 100);

  // Monthly earnings chart from real data
  const now = new Date();
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const amt = applications
      .filter(a => { const m = new Date(a.submittedAt); return m.getFullYear() === d.getFullYear() && m.getMonth() === d.getMonth(); })
      .reduce((s, a) => s + a.commissionAmount, 0);
    return { month: MONTHS[d.getMonth()], amt: amt || (i + 1) * 80 };
  });
  const maxAmt = Math.max(...chartData.map(d => d.amt), 1);

  useEffect(() => {
    const t = setTimeout(() => setBarWidths(chartData.map(d => (d.amt / maxAmt) * 100)), 100);
    return () => clearTimeout(t);
  }, [chartData.length]);

  const copy = () => {
    navigator.clipboard.writeText("https://tolbertinnovationhub.com/apply?ref=TIH-JB-2024").catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  };

  const stats = [
    { label: "Total Referrals", value: String(referrals.length), trend: "+8", icon: Users, color: "text-emerald-600 bg-emerald-50", href: "/agent/referrals" },
    { label: "Total Earned", value: `$${totalEarned.toLocaleString()}`, trend: "+$420", icon: DollarSign, color: "text-blue-600 bg-blue-50", href: "/agent/earnings" },
    { label: "Conversion Rate", value: `${convRate}%`, trend: "+6%", icon: TrendingUp, color: "text-purple-600 bg-purple-50", href: "/agent/performance" },
    { label: "Pending Payout", value: `$${pending.toLocaleString()}`, trend: "", icon: Clock, color: "text-amber-600 bg-amber-50", href: "/agent/earnings" },
  ];

  const tierThresholds = [
    { tier: "Bronze", min: 0, max: 10, color: "from-orange-400 to-amber-600", rate: "8%" },
    { tier: "Silver", min: 10, max: 25, color: "from-slate-400 to-slate-500", rate: "10%" },
    { tier: "Gold", min: 25, max: 50, color: "from-yellow-400 to-amber-500", rate: "12%" },
    { tier: "Platinum", min: 50, max: 100, color: "from-purple-500 to-indigo-600", rate: "15%" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-emerald-200 text-sm font-medium mb-1">Welcome back,</p>
            <h2 className="text-2xl font-black">Joseph Barweh 👋</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold flex items-center gap-1">
                <Star className="w-3 h-3" /> Gold Agent
              </span>
              <span className="text-emerald-200 text-xs font-mono">TIH-JB-2024</span>
              <LiveBadge />
            </div>
          </div>
          <Link href="/agent/add-referral" className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 font-bold rounded-xl text-sm hover:bg-emerald-50 transition-colors shadow-lg">
            <UserPlus className="w-4 h-4" /> Add New Referral
          </Link>
        </div>
        <div className="mt-5 p-3 bg-white/10 rounded-xl flex items-center gap-3">
          <p className="flex-1 text-xs font-mono text-emerald-100 truncate">tolbertinnovationhub.com/apply?ref=TIH-JB-2024</p>
          <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors shrink-0">
            {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-emerald-200">Progress to Platinum (50 referrals)</span>
            <span className="text-xs font-bold">{referrals.length}/50</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${tierProgress}%` }} />
          </div>
          <p className="text-xs text-emerald-200 mt-1">{Math.max(0, 50 - referrals.length)} more referrals to reach Platinum tier</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              {s.trend && <span className="text-xs font-semibold text-green-600 flex items-center gap-0.5"><ChevronUp className="w-3 h-3" />{s.trend}</span>}
            </div>
            <p className="text-2xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Chart + Tier */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Monthly Earnings</h3>
              <p className="text-xs text-slate-400">Commission from real applications</p>
            </div>
            <Link href="/agent/earnings" className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1">Details <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="flex items-end gap-3 h-40">
            {chartData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-slate-600">${d.amt}</span>
                <div className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg transition-all duration-700"
                  style={{ height: `${(barWidths[i] ?? 0) * 1.2}px` }} />
                <span className="text-xs text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-amber-500" /> Agent Tiers</h3>
          <div className="space-y-3">
            {tierThresholds.map(t => {
              const isCurrent = referrals.length >= t.min && referrals.length < t.max;
              return (
                <div key={t.tier} className={`p-3 rounded-xl border-2 ${isCurrent ? "border-amber-400 bg-amber-50" : "border-slate-100 bg-slate-50"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${t.color}`} />
                      <span className={`text-sm font-bold ${isCurrent ? "text-amber-700" : "text-slate-600"}`}>{t.tier}</span>
                      {isCurrent && <span className="text-xs bg-amber-200 text-amber-800 px-1.5 rounded-full font-semibold">You</span>}
                    </div>
                    <span className="text-xs text-emerald-600 font-bold">{t.rate}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 ml-7">{t.min}–{t.max === 100 ? "∞" : t.max} referrals</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Referrals — live */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900">Recent Referrals</h3>
            <LiveBadge />
          </div>
          <Link href="/agent/referrals" className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
        </div>
        <div className="divide-y divide-slate-50">
          {referrals.slice(0, 4).map(r => (
            <div key={r.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                {r.studentName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{r.studentName}</p>
                <p className="text-xs text-slate-400 truncate">{r.program} · {r.preferredCountry}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${statusBadge[r.status] ?? "bg-slate-100 text-slate-600"}`}>
                {statusLabel[r.status] ?? r.status}
              </span>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-emerald-600">
                  {r.commissionAmount > 0 ? `$${r.commissionAmount}` : "Pending"}
                </p>
              </div>
            </div>
          ))}
          {referrals.length === 0 && (
            <div className="p-6 text-center text-slate-400 text-sm">
              No referrals yet. <Link href="/agent/add-referral" className="text-emerald-600 font-semibold">Add your first →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
