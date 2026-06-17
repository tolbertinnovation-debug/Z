"use client";
import { useState } from "react";
import Link from "next/link";
import { Award, ChevronRight, ChevronLeft, Trophy, ExternalLink, CheckCircle } from "lucide-react";
import { universities } from "@/lib/data";

type FormData = {
  gpa: string;
  waecGrade: string;
  degreeLevel: string;
  budget: string;
  needType: string;
  country: string;
  field: string;
};

interface ScholarshipResult {
  universityId: string;
  universityName: string;
  scholarshipName: string;
  matchPercent: number;
  amount: string;
  country: string;
}

const fields = [
  "Engineering",
  "Medicine / Nursing",
  "Business / MBA",
  "Law",
  "Computer Science / IT",
  "Agriculture",
  "Architecture",
  "Arts / Humanities",
  "Pharmacy",
  "Education",
];

function calculateMatch(uni: typeof universities[0], form: FormData): number {
  let score = 50;
  const gpaNum = parseFloat(form.gpa);
  if (!isNaN(gpaNum)) {
    if (gpaNum >= 3.5) score += 20;
    else if (gpaNum >= 3.0) score += 12;
    else if (gpaNum >= 2.5) score += 6;
  }
  if (form.waecGrade.startsWith("A1")) score += 15;
  else if (form.waecGrade.startsWith("B2") || form.waecGrade.startsWith("B3")) score += 10;
  else if (form.waecGrade.startsWith("C")) score += 5;

  if (form.country === "No preference" || uni.country.toLowerCase().includes(form.country.toLowerCase()))
    score += 10;
  if (form.budget === "> $5,000") {
    if (uni.tuition.max > 5000) score += 5;
  } else if (form.budget === "$2,000–$5,000") {
    if (uni.tuition.min >= 2000 && uni.tuition.max <= 5000) score += 10;
  } else if (form.budget === "< $2,000") {
    if (uni.tuition.min < 2000) score += 15;
  }
  if (form.needType === "Need-based" && uni.scholarships.some((s) => s.toLowerCase().includes("need")))
    score += 5;
  if (
    form.needType === "Merit-based" &&
    uni.scholarships.some(
      (s) => s.toLowerCase().includes("merit") || s.toLowerCase().includes("excellence")
    )
  )
    score += 5;
  const fieldLower = form.field.toLowerCase();
  const hasField =
    uni.programs.undergraduate.some((p) => p.toLowerCase().includes(fieldLower.split(" ")[0])) ||
    uni.programs.postgraduate.some((p) => p.toLowerCase().includes(fieldLower.split(" ")[0]));
  if (hasField) score += 10;
  return Math.min(98, Math.max(40, score));
}

export default function ScholarshipFinder() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    gpa: "",
    waecGrade: "",
    degreeLevel: "",
    budget: "",
    needType: "",
    country: "",
    field: "",
  });
  const [results, setResults] = useState<ScholarshipResult[]>([]);
  const [done, setDone] = useState(false);

  const update = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleFinish = () => {
    const matched: ScholarshipResult[] = universities
      .filter((u) => u.scholarship)
      .map((u) => ({
        universityId: u.id,
        universityName: u.name,
        scholarshipName: u.scholarships[0] || "Merit Scholarship",
        matchPercent: calculateMatch(u, form),
        amount: u.scholarships[0] || "Up to 50% tuition waiver",
        country: u.country,
      }))
      .sort((a, b) => b.matchPercent - a.matchPercent)
      .slice(0, 6);
    setResults(matched);
    setDone(true);
  };

  const inputClass =
    "w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white";
  const selectClass = inputClass;

  const colorForMatch = (m: number) =>
    m >= 85
      ? "from-green-400 to-emerald-500"
      : m >= 70
      ? "from-blue-400 to-indigo-500"
      : "from-amber-400 to-orange-500";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Trophy className="w-4 h-4" /> Scholarship Finder
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Find Your Scholarship</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Answer 3 quick steps to discover scholarships matched to your academic profile.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {!done ? (
          <>
            {/* Progress */}
            <div className="flex items-center mb-10">
              {[1, 2, 3].map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      step > s
                        ? "bg-green-500 text-white"
                        : step === s
                        ? "bg-blue-600 text-white shadow-lg scale-110"
                        : "bg-white border-2 border-slate-200 text-slate-400"
                    }`}
                  >
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {i < 2 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${step > s ? "bg-green-400" : "bg-slate-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" /> Academic Profile
                  </h2>
                  <p className="text-slate-500 text-sm mb-6">Tell us about your academic background.</p>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        GPA / CGPA (out of 4.0)
                      </label>
                      <select
                        value={form.gpa}
                        onChange={(e) => update("gpa", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select your GPA</option>
                        <option value="3.75">3.75+ (Distinction)</option>
                        <option value="3.5">3.5 – 3.74 (Excellent)</option>
                        <option value="3.0">3.0 – 3.49 (Very Good)</option>
                        <option value="2.5">2.5 – 2.99 (Good)</option>
                        <option value="2.0">Below 2.5</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Best WAEC Grade
                      </label>
                      <select
                        value={form.waecGrade}
                        onChange={(e) => update("waecGrade", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select grade</option>
                        <option value="A1">A1 – Excellent</option>
                        <option value="B2">B2 – Very Good</option>
                        <option value="B3">B3 – Good</option>
                        <option value="C4">C4 – Credit</option>
                        <option value="C5">C5 – Credit</option>
                        <option value="C6">C6 – Credit</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Degree Level
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Undergraduate", "Postgraduate", "MBA", "PhD"].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => update("degreeLevel", d)}
                            className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                              form.degreeLevel === d
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-slate-200 text-slate-600 hover:border-blue-200"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-blue-600" /> Financial Situation
                  </h2>
                  <p className="text-slate-500 text-sm mb-6">Help us understand your financial needs.</p>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Annual Budget (Tuition only)
                      </label>
                      <div className="grid gap-3">
                        {["< $2,000", "$2,000–$5,000", "> $5,000", "Flexible / Not sure"].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => update("budget", b)}
                            className={`p-3 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
                              form.budget === b
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-slate-200 text-slate-600 hover:border-blue-200"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Scholarship Type Preference
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Merit-based", "Need-based", "Sports-based", "Any / All"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => update("needType", t)}
                            className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                              form.needType === t
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-slate-200 text-slate-600 hover:border-blue-200"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-blue-600" /> Preferences
                  </h2>
                  <p className="text-slate-500 text-sm mb-6">Tell us where and what you want to study.</p>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Preferred Country
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "🇮🇳 India", value: "India" },
                          { label: "🇨🇾 N. Cyprus", value: "North Cyprus" },
                          { label: "🌍 No Preference", value: "No preference" },
                        ].map((c) => (
                          <button
                            key={c.value}
                            type="button"
                            onClick={() => update("country", c.value)}
                            className={`p-3 rounded-xl border-2 text-sm font-semibold text-center transition-all ${
                              form.country === c.value
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-slate-200 text-slate-600 hover:border-blue-200"
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Field of Study
                      </label>
                      <select
                        value={form.field}
                        onChange={(e) => update("field", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select field</option>
                        {fields.map((f) => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="flex items-center gap-2 px-6 py-3 text-slate-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors text-sm"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                {step < 3 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-lg shadow-blue-200"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-teal-700 transition-all text-sm shadow-lg shadow-green-200"
                  >
                    <Trophy className="w-4 h-4" /> Find Scholarships
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Your Scholarship Matches!</h2>
              <p className="text-slate-500">
                Based on your profile, here are your top scholarship opportunities.
              </p>
            </div>
            <div className="space-y-4">
              {results.map((r, i) => (
                <div
                  key={r.universityId}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${colorForMatch(r.matchPercent)}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{r.scholarshipName}</h3>
                          <p className="text-xs text-slate-500">
                            {r.universityName} · {r.country}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p
                          className={`text-xl font-black ${
                            r.matchPercent >= 85
                              ? "text-green-600"
                              : r.matchPercent >= 70
                              ? "text-blue-600"
                              : "text-amber-600"
                          }`}
                        >
                          {r.matchPercent}%
                        </p>
                        <p className="text-xs text-slate-500">match</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colorForMatch(r.matchPercent)} rounded-full transition-all duration-700`}
                          style={{ width: `${r.matchPercent}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-green-700">{r.amount}</span>
                      <Link
                        href={`/universities/${r.universityId}`}
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        View University <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3 justify-center">
              <button
                onClick={() => {
                  setDone(false);
                  setStep(1);
                }}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors text-sm"
              >
                Retake Quiz
              </button>
              <Link
                href="/apply"
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
