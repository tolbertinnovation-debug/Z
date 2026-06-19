"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Users, DollarSign, TrendingUp, UserPlus, Copy, CheckCircle,
  ArrowRight, Star, Award, Clock, ChevronUp, ChevronDown
} from "lucide-react";

const stats = [
  { label: "Total Referrals", value: "47", trend: "+8", up: true, icon: Users, color: "text-emerald-600 bg-emerald-50", href: "/agent/referrals" },
  { label: "Total Earned", value: "$3,760", trend: "+$420", up: true, icon: DollarSign, color: "text-blue-600 bg-blue-50", href: "/agent/earnings" },
  { label: "Conversion Rate", value: "74%", trend: "+6%", up: true, icon: TrendingUp, color: "text-purple-600 bg-purple-50", href: "/agent/performance" },
  { label: "Pending Payout", value: "$840", trend: "3 referrals", up: true, icon: Clock, color: "text-amber-600 bg-amber-50", href: "/agent/earnings" },
];

const recentReferrals = [
  { name: "Sarah Konneh", program: "BSc Computer Science", university: "LPU India", status: "accepted", date: "2 days ago", commission: "$120", dot: "bg-green-500" },
  { name: "Marcus Dolo", program: "MBBS Medicine", university: "Sharda University", status: "under-review", date: "5 days ago", commission: "$180", dot: "bg-amber-400" },
  { name: "Grace Pewu", program: "MBA Business", university: "Amity University", status: "documents-required", date: "1 week ago", commission: "$150", dot: "bg-orange-400" },
  { name: "Daniel Toe", program: "BTech Civil Eng.", university: "Marwadi University", status: "submitted", date: "2 weeks ago", commission: "$100", dot: "bg-blue-500" },
];

const statusBadge: Record<string, string> = {
  "accepted": "bg-green-100 text-green-700",
  "under-review": "bg-amber-100 text-amber-700",
  "documents-required": "bg-orange-100 text-orange-700",
  "submitted": "bg-blue-100 text-blue-700",
};
const statusLabel: Record<string, string> = {
  "accepted": "Accepted", "under-review": "Under Review",
  "documents-required": "Docs Required", "submitted": "Submitted",
};

const earningsChart = [
  { month: "Aug", amt: 320 }, { month: "Sep", amt: 480 }, { month: "Oct", amt: 360 },
  { month: "Nov", amt: 640 }, { month: "Dec", amt: 520 }, { month: "Jan", amt: 840 },
];
const maxAmt = 840;

const tierThresholds = [
  { tier: "Bronze", min: 0, max: 10, color: "from-orange-400 to-amber-600" },
  { tier: "Silver", min: 10, max: 25, color: "from-slate-400 to-slate-500" },
  { tier: "Gold", min: 25, max: 50, color: "from-yellow-400 to-amber-500" },
  { tier: "Platinum", min: 50, max: 100, color: "from-purple-500 to-indigo-600" },
];

export default function AgentDashboard() {
  const [copied, setCopied] = useState(false);
  const [barWidths, setBarWidths] = useState(earningsChart.map(() => 0));
  const referralCode = "TIH-JB-2024";
  const referralLink = `tolbertinnovationhub.com/apply?ref=${referralCode}`;
  const totalReferrals = 47;
  const tierProgress = Math.min((totalReferrals / 50) * 100, 100);

  useEffect(() => {
    const t = setTimeout(() => setBarWidths(earningsChart.map(d => (d.amt / maxAmt) * 100)), 100);
    return () => clearTimeout(t);
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(`https://${referralLink}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
              <span className="text-emerald-200 text-xs">Ref: <span className="font-mono font-bold text-white">{referralCode}</span></span>
            </div>
          </div>
          <Link href="/agent/add-referral" className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 font-bold rounded-xl text-sm hover:bg-emerald-50 transition-colors shadow-lg">
            <UserPlus className="w-4 h-4" /> Add New Referral
          </Link>
        </div>

        {/* Referral Link */}
        <div className="mt-5 p-3 bg-white/10 rounded-xl flex items-center gap-3">
          <p className="flex-1 text-xs font-mono text-emerald-100 truncate">{referralLink}</p>
          <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors shrink-0">
            {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        {/* Tier Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-emerald-200">Progress to Platinum (50 referrals)</span>
            <span className="text-xs font-bold">{totalReferrals}/50</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${tierProgress}%` }} />
          </div>
          <p className="text-xs text-emerald-200 mt-1">3 more referrals to reach Platinum tier</p>
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
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-green-600" : "text-red-500"}`}>
                {s.up ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {s.trend}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Charts + Referrals */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Monthly Earnings</h3>
              <p className="text-xs text-slate-400">Commission earned per month</p>
            </div>
            <Link href="/agent/earnings" className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1">
              Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-end gap-3 h-40">
            {earningsChart.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-slate-600">${d.amt}</span>
                <div
                  className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg transition-all duration-700"
                  style={{ height: `${barWidths[i] * 1.2}px` }}
                />
                <span className="text-xs text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" /> Agent Tiers
          </h3>
          <div className="space-y-3">
            {tierThresholds.map(t => (
              <div key={t.tier} className={`p-3 rounded-xl border-2 ${t.tier === "Gold" ? "border-amber-400 bg-amber-50" : "border-slate-100 bg-slate-50"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${t.color}`} />
                    <span className={`text-sm font-bold ${t.tier === "Gold" ? "text-amber-700" : "text-slate-600"}`}>{t.tier}</span>
                    {t.tier === "Gold" && <span className="text-xs bg-amber-200 text-amber-800 px-1.5 rounded-full font-semibold">You</span>}
                  </div>
                  <span className="text-xs text-slate-500">{t.min}–{t.max} refs</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 ml-7">
                  {t.tier === "Bronze" && "8% commission + basic support"}
                  {t.tier === "Silver" && "10% commission + priority support"}
                  {t.tier === "Gold" && "12% commission + dedicated manager"}
                  {t.tier === "Platinum" && "15% commission + exclusive bonuses"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Recent Referrals</h3>
          <Link href="/agent/referrals" className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-slate-50">
          {recentReferrals.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                {r.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{r.name}</p>
                <p className="text-xs text-slate-400 truncate">{r.program} · {r.university}</p>
              </div>
              <div className="hidden sm:block text-right">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadge[r.status]}`}>{statusLabel[r.status]}</span>
                <p className="text-xs text-slate-400 mt-1">{r.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-emerald-600">{r.commission}</p>
                <p className="text-xs text-slate-400">commission</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
