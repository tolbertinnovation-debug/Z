"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus, FileText, Clock, CheckCircle, AlertCircle, XCircle,
  Download, Upload, Eye, ChevronDown, ChevronUp, Calendar,
  Building, Check, ArrowRight,
} from "lucide-react";

interface Milestone {
  label: string;
  date: string;
  done: boolean;
}

interface Application {
  id: string;
  university: string;
  program: string;
  status: "under-review" | "documents-required" | "submitted" | "accepted";
  submitted: string;
  updated: string;
  milestones: Milestone[];
}

const APPLICATIONS: Application[] = [
  {
    id: "TIH-A1B2C3",
    university: "Lovely Professional University",
    program: "BSc Computer Science",
    status: "under-review",
    submitted: "Jan 15, 2024",
    updated: "Jan 17, 2024",
    milestones: [
      { label: "Application Submitted", date: "Jan 15, 2024", done: true },
      { label: "Documents Verified", date: "Jan 16, 2024", done: true },
      { label: "Under Review", date: "Jan 17, 2024", done: true },
      { label: "Offer Extended", date: "Pending", done: false },
      { label: "Visa Application", date: "Pending", done: false },
    ],
  },
  {
    id: "TIH-D4E5F6",
    university: "Marwadi University",
    program: "BTech Mechanical Engineering",
    status: "documents-required",
    submitted: "Jan 10, 2024",
    updated: "Jan 15, 2024",
    milestones: [
      { label: "Application Submitted", date: "Jan 10, 2024", done: true },
      { label: "Documents Verified", date: "Pending", done: false },
      { label: "Under Review", date: "Pending", done: false },
      { label: "Offer Extended", date: "Pending", done: false },
      { label: "Visa Application", date: "Pending", done: false },
    ],
  },
  {
    id: "TIH-G7H8I9",
    university: "Cyrus International University",
    program: "LLB Law",
    status: "submitted",
    submitted: "Jan 05, 2024",
    updated: "Jan 05, 2024",
    milestones: [
      { label: "Application Submitted", date: "Jan 05, 2024", done: true },
      { label: "Documents Verified", date: "Pending", done: false },
      { label: "Under Review", date: "Pending", done: false },
      { label: "Offer Extended", date: "Pending", done: false },
      { label: "Visa Application", date: "Pending", done: false },
    ],
  },
];

const STEPS = ["Submitted", "Documents", "Review", "Offer", "Visa"];

const STATUS_CONFIG: Record<
  Application["status"],
  { label: string; color: string; icon: React.ElementType }
> = {
  "under-review": { label: "Under Review", color: "bg-amber-100 text-amber-700", icon: Clock },
  "documents-required": { label: "Documents Needed", color: "bg-red-100 text-red-700", icon: AlertCircle },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700", icon: FileText },
  accepted: { label: "Accepted", color: "bg-green-100 text-green-700", icon: CheckCircle },
};

type FilterTab = "all" | "under-review" | "documents-required" | "submitted";

const TABS: { id: FilterTab; label: string; count: number }[] = [
  { id: "all", label: "All", count: 3 },
  { id: "under-review", label: "Under Review", count: 1 },
  { id: "documents-required", label: "Documents Needed", count: 1 },
  { id: "submitted", label: "Submitted", count: 1 },
];

function ProgressBar({ status }: { status: Application["status"] }) {
  const stepIndex = status === "submitted" ? 0 : status === "documents-required" ? 1 : status === "under-review" ? 2 : status === "accepted" ? 3 : 0;
  return (
    <div className="mt-3">
      <div className="flex items-center gap-1">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-full h-1.5 rounded-full transition-colors ${
                i <= stepIndex ? "bg-blue-500" : "bg-slate-200"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1">
        {STEPS.map((step, i) => (
          <span
            key={step}
            className={`text-[10px] font-medium ${i <= stepIndex ? "text-blue-600" : "text-slate-400"}`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

function ApplicationCard({ app }: { app: Application }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[app.status];
  const StatusIcon = cfg.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:border-slate-200 transition-all duration-200">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5 text-blue-600" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm leading-tight">{app.university}</h3>
            <p className="text-slate-500 text-xs mt-0.5">{app.program}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-slate-400 text-xs font-mono">{app.id}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {app.submitted}
              </span>
            </div>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
          <StatusIcon className="w-3 h-3" />
          {cfg.label}
        </span>
      </div>

      <ProgressBar status={app.status} />

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <Eye className="w-3.5 h-3.5" /> View Details
        </button>
        {app.status === "documents-required" && (
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors">
            <Upload className="w-3.5 h-3.5" /> Upload Docs
          </button>
        )}
        {app.status === "accepted" && (
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 text-xs font-medium text-green-600 hover:bg-green-100 transition-colors">
            <Download className="w-3.5 h-3.5" /> Download Offer
          </button>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors ml-auto"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? "Hide Timeline" : "Show Timeline"}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Timeline</h4>
          <div className="space-y-3">
            {app.milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${m.done ? "bg-green-100" : "bg-slate-100"}`}>
                  {m.done ? <Check className="w-3 h-3 text-green-600" /> : <XCircle className="w-3 h-3 text-slate-400" />}
                </div>
                <div>
                  <p className={`text-xs font-medium ${m.done ? "text-slate-800" : "text-slate-400"}`}>{m.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{m.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered = activeTab === "all"
    ? APPLICATIONS
    : APPLICATIONS.filter((a) => a.status === activeTab);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track and manage your university applications</p>
        </div>
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30"
        >
          <Plus className="w-4 h-4" /> New Application
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: "3", color: "text-slate-900", bg: "bg-slate-50" },
          { label: "Under Review", value: "1", color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Needs Docs", value: "1", color: "text-red-600", bg: "bg-red-50" },
          { label: "Success Rate", value: "95%", color: "text-green-600", bg: "bg-green-50" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-2xl border border-slate-100 p-4`}>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-slate-500 text-xs font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 overflow-x-auto">
        {TABS.map((tab) => (
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
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-slate-200 text-slate-500"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Application Cards */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-slate-700 font-semibold text-base">No applications found</h3>
          <p className="text-slate-400 text-sm mt-1">Try a different filter or start a new application</p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Application <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
