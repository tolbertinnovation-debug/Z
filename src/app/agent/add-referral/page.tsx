"use client";

import { useState } from "react";
import { usePortalStore } from "@/lib/store";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  User,
  GraduationCap,
  ClipboardCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Tag,
  Percent,
  DollarSign,
  UserPlus,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */

interface StudentInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  nationality: string;
  city: string;
}

interface AcademicInfo {
  highSchool: string;
  graduationYear: string;
  gpa: string;
  preferredCountry: string;
  preferredProgram: string;
  studyLevel: string;
  budgetRange: string;
}

type Step1Field = keyof StudentInfo;
type Step2Field = keyof AcademicInfo;

/* ─── Constants ─────────────────────────────────────────────── */

const STEPS = [
  { id: 1, label: "Student Info", icon: User },
  { id: 2, label: "Academic & Program", icon: GraduationCap },
  { id: 3, label: "Review & Submit", icon: ClipboardCheck },
];

const REQUIRED_STEP1: Step1Field[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "dob",
  "nationality",
  "city",
];

const REQUIRED_STEP2: Step2Field[] = [
  "highSchool",
  "graduationYear",
  "gpa",
  "preferredCountry",
  "preferredProgram",
  "studyLevel",
  "budgetRange",
];

const PROGRAM_OPTIONS = [
  "Medicine",
  "Engineering",
  "MBA",
  "Law",
  "Computer Science",
  "Other",
];

const BUDGET_OPTIONS = [
  { value: "<3000", label: "Below $3,000" },
  { value: "3000-5000", label: "$3,000 – $5,000" },
  { value: "5000-8000", label: "$5,000 – $8,000" },
  { value: ">8000", label: "Above $8,000" },
];

const COMMISSION_RATE = 12;
const REFERRAL_CODE = "TIH-JB-2024";

/* ─── Helpers ────────────────────────────────────────────────── */

function estimateCommission(budget: string): string {
  const midpoints: Record<string, number> = {
    "<3000": 2500,
    "3000-5000": 4000,
    "5000-8000": 6500,
    ">8000": 9000,
  };
  const mid = midpoints[budget];
  if (!mid) return "—";
  return `$${Math.round((mid * COMMISSION_RATE) / 100).toLocaleString()}`;
}

/* ─── Sub-components ─────────────────────────────────────────── */

function FieldWrapper({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-slate-700 text-sm font-medium">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-red-600 text-xs">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hasError?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2.5 rounded-xl border text-slate-900 text-sm placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
        hasError ? "border-red-400 bg-red-50" : "border-slate-200"
      }`}
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  hasError?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2.5 rounded-xl border text-slate-900 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition appearance-none ${
        hasError ? "border-red-400 bg-red-50" : "border-slate-200"
      } ${!value ? "text-slate-400" : ""}`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className="text-slate-800 text-sm font-semibold text-right max-w-[55%]">{value || "—"}</span>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────── */

export default function AddReferralPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [student, setStudent] = useState<StudentInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    nationality: "",
    city: "",
  });

  const [academic, setAcademic] = useState<AcademicInfo>({
    highSchool: "",
    graduationYear: "",
    gpa: "",
    preferredCountry: "",
    preferredProgram: "",
    studyLevel: "",
    budgetRange: "",
  });

  const [errors1, setErrors1] = useState<Partial<Record<Step1Field, string>>>({});
  const [errors2, setErrors2] = useState<Partial<Record<Step2Field, string>>>({});

  function setStudentField(field: Step1Field, value: string) {
    setStudent((prev) => ({ ...prev, [field]: value }));
    if (errors1[field]) setErrors1((prev) => ({ ...prev, [field]: "" }));
  }

  function setAcademicField(field: Step2Field, value: string) {
    setAcademic((prev) => ({ ...prev, [field]: value }));
    if (errors2[field]) setErrors2((prev) => ({ ...prev, [field]: "" }));
  }

  function validateStep1(): boolean {
    const newErrors: Partial<Record<Step1Field, string>> = {};
    for (const f of REQUIRED_STEP1) {
      if (!student[f].trim()) newErrors[f] = "This field is required";
    }
    setErrors1(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep2(): boolean {
    const newErrors: Partial<Record<Step2Field, string>> = {};
    for (const f of REQUIRED_STEP2) {
      if (!academic[f].trim()) newErrors[f] = "This field is required";
    }
    setErrors2(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleSubmit() {
    const addReferral = usePortalStore.getState().addReferral;
    addReferral({
      agentId: "a1",
      studentName: `${student.firstName} ${student.lastName}`,
      studentEmail: student.email,
      studentPhone: student.phone,
      program: academic.preferredProgram,
      preferredCountry: academic.preferredCountry,
      studyLevel: academic.studyLevel,
      budget: academic.budgetRange,
      commissionRate: 12,
      commissionAmount: 0,
      commissionPaid: false,
    });
    toast.success("Referral submitted! Admin has been notified.");
    setSubmitted(true);
  }

  function handleReset() {
    setStudent({ firstName: "", lastName: "", email: "", phone: "", dob: "", nationality: "", city: "" });
    setAcademic({ highSchool: "", graduationYear: "", gpa: "", preferredCountry: "", preferredProgram: "", studyLevel: "", budgetRange: "" });
    setErrors1({});
    setErrors2({});
    setStep(1);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-slate-900 font-bold text-xl">Referral Submitted!</h2>
            <p className="text-slate-500 text-sm mt-1">
              {student.firstName} {student.lastName} has been added to your referrals.
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 text-sm text-emerald-800 space-y-1">
            <p className="font-semibold">Commission will be credited upon enrollment</p>
            <p className="text-emerald-600 text-xs">Gold Tier · {COMMISSION_RATE}% rate · Code: {REFERRAL_CODE}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:scale-[1.01] transition-transform"
            >
              Add Another Referral
            </button>
            <Link
              href="/agent/referrals"
              className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition text-center"
            >
              View Referrals
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-0">
        {STEPS.map((s, idx) => {
          const isActive = step === s.id;
          const isDone = step > s.id;
          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1 min-w-[72px]">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isDone
                      ? "bg-emerald-600 text-white"
                      : isActive
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-4.5 h-4.5" />}
                </div>
                <span
                  className={`text-xs font-semibold text-center ${
                    isActive ? "text-emerald-700" : isDone ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mb-5 mx-1 ${step > s.id ? "bg-emerald-400" : "bg-slate-200"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <h2 className="text-slate-900 font-bold text-base">
            Step {step}: {STEPS[step - 1].label}
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            {step === 1 && "Enter the student's personal details"}
            {step === 2 && "Academic background and program preferences"}
            {step === 3 && "Confirm all details before submitting"}
          </p>
        </div>

        <div className="px-6 py-6">
          {/* Step 1 */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldWrapper label="First Name" error={errors1.firstName}>
                <TextInput
                  value={student.firstName}
                  onChange={(v) => setStudentField("firstName", v)}
                  placeholder="Amara"
                  hasError={!!errors1.firstName}
                />
              </FieldWrapper>
              <FieldWrapper label="Last Name" error={errors1.lastName}>
                <TextInput
                  value={student.lastName}
                  onChange={(v) => setStudentField("lastName", v)}
                  placeholder="Diallo"
                  hasError={!!errors1.lastName}
                />
              </FieldWrapper>
              <FieldWrapper label="Email Address" error={errors1.email}>
                <TextInput
                  value={student.email}
                  onChange={(v) => setStudentField("email", v)}
                  placeholder="student@email.com"
                  type="email"
                  hasError={!!errors1.email}
                />
              </FieldWrapper>
              <FieldWrapper label="Phone (WhatsApp)" error={errors1.phone}>
                <TextInput
                  value={student.phone}
                  onChange={(v) => setStudentField("phone", v)}
                  placeholder="+233 50 000 0000"
                  type="tel"
                  hasError={!!errors1.phone}
                />
              </FieldWrapper>
              <FieldWrapper label="Date of Birth" error={errors1.dob}>
                <TextInput
                  value={student.dob}
                  onChange={(v) => setStudentField("dob", v)}
                  type="date"
                  hasError={!!errors1.dob}
                />
              </FieldWrapper>
              <FieldWrapper label="Nationality" error={errors1.nationality}>
                <TextInput
                  value={student.nationality}
                  onChange={(v) => setStudentField("nationality", v)}
                  placeholder="Ghanaian"
                  hasError={!!errors1.nationality}
                />
              </FieldWrapper>
              <FieldWrapper label="City" error={errors1.city}>
                <TextInput
                  value={student.city}
                  onChange={(v) => setStudentField("city", v)}
                  placeholder="Accra"
                  hasError={!!errors1.city}
                />
              </FieldWrapper>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldWrapper label="High School" error={errors2.highSchool}>
                <TextInput
                  value={academic.highSchool}
                  onChange={(v) => setAcademicField("highSchool", v)}
                  placeholder="Achimota School"
                  hasError={!!errors2.highSchool}
                />
              </FieldWrapper>
              <FieldWrapper label="Graduation Year" error={errors2.graduationYear}>
                <TextInput
                  value={academic.graduationYear}
                  onChange={(v) => setAcademicField("graduationYear", v)}
                  placeholder="2023"
                  hasError={!!errors2.graduationYear}
                />
              </FieldWrapper>
              <FieldWrapper label="GPA / Grade" error={errors2.gpa}>
                <TextInput
                  value={academic.gpa}
                  onChange={(v) => setAcademicField("gpa", v)}
                  placeholder="3.8 / 4.0"
                  hasError={!!errors2.gpa}
                />
              </FieldWrapper>
              <FieldWrapper label="Preferred Country" error={errors2.preferredCountry}>
                <SelectInput
                  value={academic.preferredCountry}
                  onChange={(v) => setAcademicField("preferredCountry", v)}
                  options={[
                    { value: "India", label: "India" },
                    { value: "North Cyprus", label: "North Cyprus" },
                  ]}
                  placeholder="Select country"
                  hasError={!!errors2.preferredCountry}
                />
              </FieldWrapper>
              <FieldWrapper label="Preferred Program" error={errors2.preferredProgram}>
                <SelectInput
                  value={academic.preferredProgram}
                  onChange={(v) => setAcademicField("preferredProgram", v)}
                  options={PROGRAM_OPTIONS.map((p) => ({ value: p, label: p }))}
                  placeholder="Select program"
                  hasError={!!errors2.preferredProgram}
                />
              </FieldWrapper>
              <FieldWrapper label="Study Level" error={errors2.studyLevel}>
                <SelectInput
                  value={academic.studyLevel}
                  onChange={(v) => setAcademicField("studyLevel", v)}
                  options={[
                    { value: "Undergraduate", label: "Undergraduate" },
                    { value: "Postgraduate", label: "Postgraduate" },
                    { value: "PhD", label: "PhD" },
                  ]}
                  placeholder="Select level"
                  hasError={!!errors2.studyLevel}
                />
              </FieldWrapper>
              <FieldWrapper label="Budget Range (USD)" error={errors2.budgetRange}>
                <SelectInput
                  value={academic.budgetRange}
                  onChange={(v) => setAcademicField("budgetRange", v)}
                  options={BUDGET_OPTIONS}
                  placeholder="Select budget"
                  hasError={!!errors2.budgetRange}
                />
              </FieldWrapper>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Student summary */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Student Information</p>
                <div className="bg-slate-50 rounded-xl p-4 space-y-0.5">
                  <ReviewRow label="Full Name" value={`${student.firstName} ${student.lastName}`} />
                  <ReviewRow label="Email" value={student.email} />
                  <ReviewRow label="Phone" value={student.phone} />
                  <ReviewRow label="Date of Birth" value={student.dob} />
                  <ReviewRow label="Nationality" value={student.nationality} />
                  <ReviewRow label="City" value={student.city} />
                </div>
              </div>

              {/* Academic summary */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Academic & Program</p>
                <div className="bg-slate-50 rounded-xl p-4 space-y-0.5">
                  <ReviewRow label="High School" value={academic.highSchool} />
                  <ReviewRow label="Graduation Year" value={academic.graduationYear} />
                  <ReviewRow label="GPA" value={academic.gpa} />
                  <ReviewRow label="Preferred Country" value={academic.preferredCountry} />
                  <ReviewRow label="Program" value={academic.preferredProgram} />
                  <ReviewRow label="Study Level" value={academic.studyLevel} />
                  <ReviewRow label="Budget Range" value={BUDGET_OPTIONS.find((b) => b.value === academic.budgetRange)?.label ?? academic.budgetRange} />
                </div>
              </div>

              {/* Commission info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-emerald-50 rounded-xl p-4 flex items-center gap-3">
                  <Tag className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-emerald-700 text-xs font-medium">Referral Code</p>
                    <p className="text-emerald-900 font-bold text-sm">{REFERRAL_CODE}</p>
                  </div>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 flex items-center gap-3">
                  <Percent className="w-5 h-5 text-teal-600 shrink-0" />
                  <div>
                    <p className="text-teal-700 text-xs font-medium">Commission Rate</p>
                    <p className="text-teal-900 font-bold text-sm">{COMMISSION_RATE}% (Gold Tier)</p>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-amber-700 text-xs font-medium">Est. Commission</p>
                    <p className="text-amber-900 font-bold text-sm">{estimateCommission(academic.budgetRange)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-sm hover:scale-[1.02] transition-transform"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-sm hover:scale-[1.02] transition-transform"
            >
              <UserPlus className="w-4 h-4" /> Submit Referral
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
