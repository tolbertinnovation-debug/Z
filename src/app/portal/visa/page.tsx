"use client";

import { useState } from "react";
import {
  FileText, CheckCircle, Clock, AlertCircle, Calendar,
  MapPin, Mail, Phone, Check, Circle, Plane, Shield,
  CreditCard, Heart, BookOpen, Camera,
} from "lucide-react";

type StepStatus = "completed" | "current" | "upcoming";

interface VisaStep {
  title: string;
  description: string;
  date: string;
  status: StepStatus;
  icon: React.ElementType;
}

interface DocCheck {
  label: string;
  done: boolean;
  icon: React.ElementType;
}

const INDIA_STEPS: VisaStep[] = [
  {
    title: "Application Initiated",
    description: "Visa application form submitted online",
    date: "Jan 10, 2024",
    status: "completed",
    icon: FileText,
  },
  {
    title: "Documents Submitted",
    description: "All supporting documents uploaded",
    date: "Jan 14, 2024",
    status: "completed",
    icon: CheckCircle,
  },
  {
    title: "Documents Preparation",
    description: "Preparing physical copies for appointment",
    date: "In Progress",
    status: "current",
    icon: Clock,
  },
  {
    title: "Biometrics Appointment",
    description: "Fingerprints & photo at embassy",
    date: "Feb 5, 2024",
    status: "upcoming",
    icon: Camera,
  },
  {
    title: "Processing",
    description: "Application under official review",
    date: "Est. Feb 10–20, 2024",
    status: "upcoming",
    icon: Shield,
  },
  {
    title: "Decision",
    description: "Visa approval or request for more info",
    date: "Est. Feb 20, 2024",
    status: "upcoming",
    icon: CheckCircle,
  },
];

const DOC_CHECKLIST: DocCheck[] = [
  { label: "Valid International Passport (6+ months)", done: true, icon: BookOpen },
  { label: "2 Passport-sized Photos", done: true, icon: Camera },
  { label: "Bank Statement (3 months)", done: false, icon: CreditCard },
  { label: "University Admission Letter", done: true, icon: FileText },
  { label: "Health Insurance Certificate", done: false, icon: Heart },
  { label: "Visa Fee Receipt", done: false, icon: CreditCard },
];

const STEP_COLORS: Record<StepStatus, { circle: string; line: string; badge: string }> = {
  completed: { circle: "bg-green-500 border-green-500", line: "bg-green-400", badge: "bg-green-100 text-green-700" },
  current: { circle: "bg-blue-500 border-blue-500 ring-4 ring-blue-100", line: "bg-slate-200", badge: "bg-blue-100 text-blue-700" },
  upcoming: { circle: "bg-white border-slate-200", line: "bg-slate-200", badge: "bg-slate-100 text-slate-500" },
};

export default function VisaPage() {
  const [activeTab, setActiveTab] = useState<"india" | "north-cyprus">("india");

  const docsComplete = DOC_CHECKLIST.filter((d) => d.done).length;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Visa Tracker</h1>
        <p className="text-slate-500 text-sm mt-0.5">Monitor your visa application progress</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
        {(["india", "north-cyprus"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Plane className="w-4 h-4" />
            {tab === "india" ? "India Visa" : "North Cyprus Visa"}
          </button>
        ))}
      </div>

      {activeTab === "india" && (
        <div className="space-y-5">
          {/* Progress Tracker */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-slate-900">Application Progress</h2>
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                Step 3 of 6
              </span>
            </div>

            <div className="space-y-0">
              {INDIA_STEPS.map((step, i) => {
                const colors = STEP_COLORS[step.status];
                const StepIcon = step.icon;
                const isLast = i === INDIA_STEPS.length - 1;

                return (
                  <div key={i} className="flex gap-4">
                    {/* Icon + Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${colors.circle}`}
                      >
                        {step.status === "completed" ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : step.status === "current" ? (
                          <StepIcon className="w-4 h-4 text-white" />
                        ) : (
                          <Circle className="w-3 h-3 text-slate-300" />
                        )}
                      </div>
                      {!isLast && <div className={`w-0.5 h-10 ${colors.line} mt-0`} />}
                    </div>

                    {/* Content */}
                    <div className={`pb-6 flex-1 min-w-0 ${isLast ? "pb-0" : ""}`}>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3
                            className={`text-sm font-semibold ${
                              step.status === "upcoming" ? "text-slate-400" : "text-slate-900"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-xs mt-0.5 ${
                              step.status === "upcoming" ? "text-slate-300" : "text-slate-500"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${colors.badge}`}>
                            {step.status === "completed"
                              ? "Done"
                              : step.status === "current"
                              ? "In Progress"
                              : "Upcoming"}
                          </span>
                          <span className="text-xs text-slate-400 whitespace-nowrap">{step.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Document Checklist */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Document Checklist</h2>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  docsComplete === DOC_CHECKLIST.length ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {docsComplete}/{DOC_CHECKLIST.length} Ready
              </span>
            </div>
            <div className="space-y-2.5">
              {DOC_CHECKLIST.map((doc, i) => {
                const DocIcon = doc.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl ${doc.done ? "bg-green-50" : "bg-red-50"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        doc.done ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <DocIcon className={`w-4 h-4 ${doc.done ? "text-green-600" : "text-red-500"}`} />
                    </div>
                    <span className={`text-sm flex-1 ${doc.done ? "text-slate-700" : "text-slate-600"}`}>
                      {doc.label}
                    </span>
                    {doc.done ? (
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Two column: Dates + Embassy */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Important Dates */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 className="text-sm font-bold text-slate-900 mb-4">Important Dates</h2>
              <div className="space-y-3">
                {[
                  { label: "Application Date", date: "Jan 10, 2024", icon: FileText },
                  { label: "Biometrics Appointment", date: "Feb 5, 2024", icon: Camera },
                  { label: "Expected Decision", date: "Feb 20, 2024", icon: CheckCircle },
                ].map((d) => {
                  const DIcon = d.icon;
                  return (
                    <div key={d.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        <DIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{d.label}</p>
                        <p className="text-sm font-semibold text-slate-800">{d.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Embassy Contact */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 className="text-sm font-bold text-slate-900 mb-4">Embassy Contact</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Address</p>
                    <p className="text-sm text-slate-700">High Commission of India, Lagos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Phone</p>
                    <p className="text-sm text-slate-700">+234 1 269 3400</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Email</p>
                    <p className="text-sm text-slate-700">cons.lagos@mea.gov.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-sm">Next Step: Book Biometrics Appointment</p>
              <p className="text-white/70 text-xs mt-0.5">Your appointment date is Feb 5, 2024 — confirm now</p>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-white text-blue-700 text-sm font-bold hover:bg-blue-50 transition-colors shrink-0 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Book Appointment
            </button>
          </div>
        </div>
      )}

      {activeTab === "north-cyprus" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plane className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-slate-700 font-semibold text-base">North Cyprus Visa</h3>
          <p className="text-slate-400 text-sm mt-1">
            Your North Cyprus visa process has not started yet. Contact your counselor to begin.
          </p>
          <button className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            Start Application
          </button>
        </div>
      )}
    </div>
  );
}
