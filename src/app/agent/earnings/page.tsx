"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  ArrowDownCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Star,
  ChevronRight,
  Send,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */

type EarningStatus = "Paid" | "Pending" | "Processing";
type PayoutStatus = "Completed" | "Processing" | "Pending";
type PayoutMethod = "Mobile Money" | "Bank Transfer" | "PayPal";

interface Earning {
  id: string;
  student: string;
  university: string;
  enrollmentDate: string;
  commissionRate: number;
  amount: number;
  status: EarningStatus;
}

interface PayoutRecord {
  id: string;
  requestDate: string;
  amount: number;
  method: PayoutMethod;
  status: PayoutStatus;
  transactionId: string;
}

/* ─── Mock data ─────────────────────────────────────────────── */

const EARNINGS: Earning[] = [
  { id: "E01", student: "Amara Diallo", university: "Near East University", enrollmentDate: "Mar 2024", commissionRate: 12, amount: 1200, status: "Paid" },
  { id: "E02", student: "Emmanuel Boateng", university: "VIT University", enrollmentDate: "Feb 2024", commissionRate: 12, amount: 960, status: "Paid" },
  { id: "E03", student: "Moussa Camara", university: "Near East University", enrollmentDate: "Mar 2024", commissionRate: 12, amount: 720, status: "Paid" },
  { id: "E04", student: "Adjoa Mensah", university: "Manipal University", enrollmentDate: "Jan 2024", commissionRate: 10, amount: 880, status: "Paid" },
  { id: "E05", student: "Kofi Atta", university: "SRM University", enrollmentDate: "Dec 2023", commissionRate: 10, amount: 740, status: "Paid" },
  { id: "E06", student: "Efua Asante", university: "Cyprus International University", enrollmentDate: "Nov 2023", commissionRate: 8, amount: 560, status: "Paid" },
  { id: "E07", student: "Kwame Frimpong", university: "Near East University", enrollmentDate: "Oct 2023", commissionRate: 8, amount: 480, status: "Paid" },
  { id: "E08", student: "Ama Owusu", university: "VIT University", enrollmentDate: "Sep 2023", commissionRate: 8, amount: 420, status: "Paid" },
  { id: "E09", student: "Yaa Bonsu", university: "Manipal University", enrollmentDate: "Apr 2024", commissionRate: 12, amount: 840, status: "Pending" },
  { id: "E10", student: "Nana Appiah", university: "Near East University", enrollmentDate: "Apr 2024", commissionRate: 12, amount: 420, status: "Pending" },
  { id: "E11", student: "Esi Oduro", university: "Cyprus International University", enrollmentDate: "Apr 2024", commissionRate: 12, amount: 600, status: "Processing" },
  { id: "E12", student: "Kweku Darko", university: "SRM University", enrollmentDate: "Mar 2024", commissionRate: 12, amount: 480, status: "Processing" },
];

const PAYOUTS: PayoutRecord[] = [
  { id: "P01", requestDate: "Apr 15, 2024", amount: 1000, method: "Mobile Money", status: "Completed", transactionId: "TXN-MM-8821" },
  { id: "P02", requestDate: "Mar 01, 2024", amount: 800, method: "Bank Transfer", status: "Completed", transactionId: "TXN-BT-4412" },
  { id: "P03", requestDate: "Feb 10, 2024", amount: 700, method: "PayPal", status: "Completed", transactionId: "TXN-PP-6630" },
  { id: "P04", requestDate: "May 02, 2024", amount: 500, method: "Mobile Money", status: "Processing", transactionId: "TXN-MM-9910" },
];

/* ─── Status configs ─────────────────────────────────────────── */

const EARNING_STATUS: Record<EarningStatus, { className: string; icon: React.ElementType }> = {
  Paid: { className: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  Pending: { className: "bg-amber-100 text-amber-700", icon: Clock },
  Processing: { className: "bg-blue-100 text-blue-700", icon: Loader2 },
};

const PAYOUT_STATUS: Record<PayoutStatus, { className: string }> = {
  Completed: { className: "bg-emerald-100 text-emerald-700" },
  Processing: { className: "bg-blue-100 text-blue-700" },
  Pending: { className: "bg-amber-100 text-amber-700" },
};

/* ─── Payout form types ──────────────────────────────────────── */

interface PayoutForm {
  amount: string;
  method: PayoutMethod | "";
  accountDetails: string;
}

type PayoutFormField = keyof PayoutForm;
type PayoutFormErrors = Partial<Record<PayoutFormField, string>>;

/* ─── Component ──────────────────────────────────────────────── */

export default function EarningsPage() {
  const [activeTab, setActiveTab] = useState<"history" | "payouts">("history");
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [payoutSubmitted, setPayoutSubmitted] = useState(false);

  const [form, setForm] = useState<PayoutForm>({
    amount: "",
    method: "",
    accountDetails: "",
  });
  const [formErrors, setFormErrors] = useState<PayoutFormErrors>({});

  function setFormField(field: PayoutFormField, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validatePayout(): boolean {
    const errors: PayoutFormErrors = {};
    if (!form.amount.trim()) errors.amount = "Amount is required";
    else if (isNaN(Number(form.amount)) || Number(form.amount) < 100)
      errors.amount = "Minimum payout is $100";
    if (!form.method) errors.method = "Select a payout method";
    if (!form.accountDetails.trim()) errors.accountDetails = "Account details are required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handlePayoutSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validatePayout()) {
      setPayoutSubmitted(true);
      setShowPayoutForm(false);
      setForm({ amount: "", method: "", accountDetails: "" });
    }
  }

  const totalEarned = EARNINGS.reduce((s, e) => s + e.amount, 0);
  const paidTotal = EARNINGS.filter((e) => e.status === "Paid").reduce((s, e) => s + e.amount, 0);
  const pendingTotal = EARNINGS.filter((e) => e.status === "Pending" || e.status === "Processing").reduce((s, e) => s + e.amount, 0);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Summary banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-emerald-200/40">
        <p className="text-emerald-100 text-sm font-medium mb-4">Earnings Overview</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Earned", value: "$3,760", icon: TrendingUp, sub: "All time" },
            { label: "This Month", value: "$840", icon: DollarSign, sub: "April 2024" },
            { label: "Pending", value: "$420", icon: Clock, sub: "Awaiting payout" },
            { label: "Withdrawn", value: "$2,500", icon: ArrowDownCircle, sub: "Paid out" },
          ].map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-200 text-xs">
                <s.icon className="w-3.5 h-3.5" />
                {s.label}
              </div>
              <p className="text-white font-bold text-2xl">{s.value}</p>
              <p className="text-emerald-200 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
            {(["history", "payouts"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t === "history" ? "Earnings History" : "Payout Requests"}
              </button>
            ))}
          </div>

          {/* Earnings History */}
          {activeTab === "history" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100">
                      <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Student</th>
                      <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">University</th>
                      <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Enrolled</th>
                      <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Rate</th>
                      <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Amount</th>
                      <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EARNINGS.map((e) => {
                      const cfg = EARNING_STATUS[e.status];
                      return (
                        <tr key={e.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                          <td className="px-4 py-3 text-slate-800 font-medium whitespace-nowrap">{e.student}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{e.university}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{e.enrollmentDate}</td>
                          <td className="px-4 py-3 text-slate-600 text-xs font-semibold">{e.commissionRate}%</td>
                          <td className="px-4 py-3">
                            <span className={`font-bold ${e.status === "Paid" ? "text-emerald-600" : "text-slate-500"}`}>
                              ${e.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.className}`}>
                              <cfg.icon className="w-3 h-3" />
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 border-t-2 border-slate-200">
                      <td colSpan={4} className="px-4 py-3 text-slate-700 font-bold text-sm">Total</td>
                      <td className="px-4 py-3 text-emerald-600 font-bold text-sm">${totalEarned.toLocaleString()}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Payouts tab */}
          {activeTab === "payouts" && (
            <div className="space-y-4">
              {/* Request button */}
              <div className="flex items-center justify-between">
                <p className="text-slate-600 text-sm">
                  Available balance:{" "}
                  <span className="font-bold text-emerald-600">${pendingTotal.toLocaleString()}</span>
                </p>
                <button
                  onClick={() => { setShowPayoutForm((v) => !v); setPayoutSubmitted(false); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold shadow-sm hover:scale-[1.02] transition-transform"
                >
                  <Send className="w-3.5 h-3.5" />
                  Request Payout
                </button>
              </div>

              {payoutSubmitted && (
                <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-emerald-800 text-sm font-semibold">Payout request submitted successfully!</p>
                </div>
              )}

              {/* Inline form */}
              {showPayoutForm && (
                <form
                  onSubmit={handlePayoutSubmit}
                  className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-5 space-y-4"
                >
                  <p className="text-slate-800 font-bold text-sm">New Payout Request</p>

                  {/* Amount */}
                  <div className="space-y-1">
                    <label className="block text-slate-700 text-sm font-medium">Amount (USD)</label>
                    <input
                      type="number"
                      min={100}
                      value={form.amount}
                      onChange={(e) => setFormField("amount", e.target.value)}
                      placeholder="Min $100"
                      className={`w-full px-3 py-2.5 rounded-xl border text-slate-900 text-sm bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
                        formErrors.amount ? "border-red-400 bg-red-50" : "border-slate-200"
                      }`}
                    />
                    {formErrors.amount && (
                      <p className="flex items-center gap-1 text-red-600 text-xs">
                        <AlertCircle className="w-3 h-3" /> {formErrors.amount}
                      </p>
                    )}
                  </div>

                  {/* Method */}
                  <div className="space-y-1">
                    <label className="block text-slate-700 text-sm font-medium">Payout Method</label>
                    <select
                      value={form.method}
                      onChange={(e) => setFormField("method", e.target.value as PayoutMethod)}
                      className={`w-full px-3 py-2.5 rounded-xl border text-slate-900 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition appearance-none ${
                        formErrors.method ? "border-red-400 bg-red-50" : "border-slate-200"
                      } ${!form.method ? "text-slate-400" : ""}`}
                    >
                      <option value="" disabled>Select method</option>
                      <option value="Mobile Money">Mobile Money</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="PayPal">PayPal</option>
                    </select>
                    {formErrors.method && (
                      <p className="flex items-center gap-1 text-red-600 text-xs">
                        <AlertCircle className="w-3 h-3" /> {formErrors.method}
                      </p>
                    )}
                  </div>

                  {/* Account details */}
                  <div className="space-y-1">
                    <label className="block text-slate-700 text-sm font-medium">Account Details</label>
                    <textarea
                      value={form.accountDetails}
                      onChange={(e) => setFormField("accountDetails", e.target.value)}
                      placeholder="Phone number, account number, or PayPal email…"
                      rows={3}
                      className={`w-full px-3 py-2.5 rounded-xl border text-slate-900 text-sm bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none ${
                        formErrors.accountDetails ? "border-red-400 bg-red-50" : "border-slate-200"
                      }`}
                    />
                    {formErrors.accountDetails && (
                      <p className="flex items-center gap-1 text-red-600 text-xs">
                        <AlertCircle className="w-3 h-3" /> {formErrors.accountDetails}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowPayoutForm(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:scale-[1.01] transition-transform"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}

              {/* Payout history table */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-slate-800 font-bold text-sm">Payout History</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-100">
                        <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Date</th>
                        <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Amount</th>
                        <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Method</th>
                        <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                        <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">Transaction ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PAYOUTS.map((p) => {
                        const cfg = PAYOUT_STATUS[p.status];
                        return (
                          <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                            <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">{p.requestDate}</td>
                            <td className="px-4 py-3 text-slate-800 font-bold">${p.amount.toLocaleString()}</td>
                            <td className="px-4 py-3 text-slate-600 text-xs">{p.method}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.className}`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-400 text-xs font-mono">{p.transactionId}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Commission rate card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-5">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <p className="text-slate-800 font-bold text-sm">Commission Tier</p>
            </div>

            {/* Current tier */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mx-auto mb-2 shadow-md">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-amber-800 font-bold text-lg">Gold Tier</p>
              <p className="text-amber-600 text-sm">12% Commission Rate</p>
            </div>

            {/* Tier ladder */}
            <div className="space-y-2.5">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Tier System</p>
              {[
                { label: "Bronze", range: "0–10 refs", rate: "8%", color: "from-orange-400 to-amber-600", active: false },
                { label: "Silver", range: "10–25 refs", rate: "10%", color: "from-slate-400 to-slate-500", active: false },
                { label: "Gold", range: "25–50 refs", rate: "12%", color: "from-yellow-400 to-amber-500", active: true },
                { label: "Platinum", range: "50+ refs", rate: "15%", color: "from-purple-500 to-indigo-600", active: false },
              ].map((t) => (
                <div
                  key={t.label}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    t.active ? "bg-amber-50 border border-amber-200" : "bg-slate-50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shrink-0`}>
                    <Star className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold ${t.active ? "text-amber-800" : "text-slate-700"}`}>{t.label}</p>
                      {t.active && (
                        <span className="text-xs bg-amber-200 text-amber-800 font-bold px-1.5 rounded-full">Current</span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs">{t.range}</p>
                  </div>
                  <span className={`text-sm font-bold ${t.active ? "text-amber-700" : "text-slate-500"}`}>{t.rate}</span>
                </div>
              ))}
            </div>

            {/* Progress to Platinum */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Progress to Platinum</span>
                <span className="text-slate-700 font-bold">47 / 50 refs</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all"
                  style={{ width: "94%" }}
                />
              </div>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                3 more referrals to unlock Platinum (15%)
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-slate-900 font-bold text-lg">${paidTotal.toLocaleString()}</p>
                <p className="text-slate-400 text-xs">Total Paid</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-emerald-600 font-bold text-lg">${pendingTotal.toLocaleString()}</p>
                <p className="text-slate-400 text-xs">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
