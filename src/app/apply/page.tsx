"use client";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  User, Mail, Phone, GraduationCap, Upload, CheckCircle,
  ChevronRight, ChevronLeft, FileText, Building, AlertCircle, HelpCircle, LogIn
} from "lucide-react";
import { universities } from "@/lib/data";
import { usePortalStore } from "@/lib/store";
import AuthModal from "@/components/AuthModal";

const STORAGE_KEY = "tih_apply_form";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Academic Info", icon: GraduationCap },
  { id: 3, title: "University Choice", icon: Building },
  { id: 4, title: "Documents", icon: Upload },
  { id: 5, title: "Review & Submit", icon: CheckCircle },
];

interface FormState {
  firstName: string; lastName: string; gender: string; dob: string; nationality: string;
  phone: string; whatsapp: string; email: string; address: string;
  school: string; waecGrade: string; gpa: string; degreeLevel: string;
  university: string; program: string; intake: string;
  personalStatement: string;
  agreeTerms: boolean;
}

function ApplicationForm() {
  const searchParams = useSearchParams();
  const preSelected = searchParams.get("university") || "";
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [appId] = useState(() => "TIH-" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as FormState;
          return { ...parsed, university: parsed.university || preSelected };
        }
      } catch {
        // ignore
      }
    }
    return {
      firstName: "", lastName: "", gender: "", dob: "", nationality: "Liberian",
      phone: "", whatsapp: "", email: "", address: "",
      school: "", waecGrade: "", gpa: "", degreeLevel: "undergraduate",
      university: preSelected, program: "", intake: "September 2024",
      personalStatement: "",
      agreeTerms: false,
    };
  });

  // File state is not serializable, kept separate
  const [files, setFiles] = useState<Record<string, File | null>>({
    passport: null, transcript: null, waecResult: null, recommendation: null
  });

  // Save form to localStorage on change (excluding files)
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    }
  }, [form]);

  const updateForm = (field: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedUni = universities.find((u) => u.id === form.university);

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 1) {
      if (!form.firstName.trim()) newErrors.firstName = "First name is required";
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!form.gender) newErrors.gender = "Please select a gender";
      if (!form.dob) newErrors.dob = "Date of birth is required";
      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    }
    if (s === 2) {
      if (!form.school.trim()) newErrors.school = "School name is required";
      if (!form.waecGrade) newErrors.waecGrade = "Please select your WAEC grade";
    }
    if (s === 3) {
      if (!form.university) newErrors.university = "Please select a university";
      if (!form.program) newErrors.program = "Please select a program";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(5, s + 1));
      setErrors({});
    }
  };

  const handleSubmit = () => {
    if (!form.agreeTerms) return;
    // Clear saved progress on submit
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full text-sm border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
      errors[field] ? "border-red-400 bg-red-50 focus:ring-red-300" : "border-slate-200"
    }`;

  const ErrorMsg = ({ field }: { field: string }) =>
    errors[field] ? (
      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> {errors[field]}
      </p>
    ) : null;

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Application Submitted!</h1>
          <p className="text-slate-500 mb-6">Your application has been successfully received. Our team will review it and contact you within 2-3 business days.</p>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
            <p className="text-sm text-slate-500 mb-1">Your Application ID</p>
            <p className="text-3xl font-black text-blue-600 tracking-wider">{appId}</p>
            <p className="text-xs text-slate-400 mt-2">Save this ID to track your application status</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left">
            <h3 className="font-bold text-slate-900 mb-2 text-sm">What happens next?</h3>
            {[
              "Our team reviews your application (2–3 days)",
              "Document verification and assessment",
              "University application submission on your behalf",
              "Offer letter receipt and forwarding",
              "Visa guidance and pre-departure support",
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm">
              Track Application
            </Link>
            <Link href="/" className="flex-1 py-3 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <FileText className="w-4 h-4" /> Online Application
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Apply for University</h1>
          <p className="text-slate-500">Complete the form below to apply to your chosen university. Our team will guide you through the rest.</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-10 px-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step > s.id ? "bg-green-500 text-white" : step === s.id ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110" : "bg-white border-2 border-slate-200 text-slate-400"}`}>
                  {step > s.id ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
                </div>
                <p className={`text-xs mt-1 font-medium hidden sm:block ${step === s.id ? "text-blue-600" : step > s.id ? "text-green-600" : "text-slate-400"}`}>
                  {s.title}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-colors ${step > s.id ? "bg-green-400" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> Personal Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">First Name *</label>
                  <input type="text" placeholder="Emmanuel" value={form.firstName} onChange={(e) => updateForm("firstName", e.target.value)} className={inputClass("firstName")} />
                  <ErrorMsg field="firstName" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Last Name *</label>
                  <input type="text" placeholder="Kollie" value={form.lastName} onChange={(e) => updateForm("lastName", e.target.value)} className={inputClass("lastName")} />
                  <ErrorMsg field="lastName" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Gender *</label>
                  <select value={form.gender} onChange={(e) => updateForm("gender", e.target.value)} className={inputClass("gender")}>
                    <option value="">Select gender</option>
                    <option>Male</option><option>Female</option><option>Prefer not to say</option>
                  </select>
                  <ErrorMsg field="gender" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Date of Birth *</label>
                  <input type="date" value={form.dob} onChange={(e) => updateForm("dob", e.target.value)} className={inputClass("dob")} />
                  <ErrorMsg field="dob" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nationality *</label>
                  <input type="text" value={form.nationality} onChange={(e) => updateForm("nationality", e.target.value)} className={inputClass("nationality")} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address *</label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className={inputClass("email")} />
                  <ErrorMsg field="email" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phone Number *</label>
                  <input type="tel" placeholder="+231 770 000 000" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className={inputClass("phone")} />
                  <ErrorMsg field="phone" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">WhatsApp Number</label>
                  <input type="tel" placeholder="+231 770 000 000" value={form.whatsapp} onChange={(e) => updateForm("whatsapp", e.target.value)} className={inputClass("whatsapp")} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Home Address</label>
                  <textarea rows={2} placeholder="Your address in Liberia" value={form.address} onChange={(e) => updateForm("address", e.target.value)} className={`${inputClass("address")} resize-none`} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Info */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" /> Academic Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Secondary School Name *</label>
                  <input type="text" placeholder="e.g. ABC High School, Monrovia" value={form.school} onChange={(e) => updateForm("school", e.target.value)} className={inputClass("school")} />
                  <ErrorMsg field="school" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Best WAEC Grade *</label>
                  <select value={form.waecGrade} onChange={(e) => updateForm("waecGrade", e.target.value)} className={inputClass("waecGrade")}>
                    <option value="">Select best grade</option>
                    {["A1 (Excellent)", "B2 (Very Good)", "B3 (Good)", "C4 (Credit)", "C5 (Credit)", "C6 (Credit)", "D7 (Pass)", "E8 (Pass)", "F9 (Fail)"].map((g) => <option key={g}>{g}</option>)}
                  </select>
                  <ErrorMsg field="waecGrade" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">GPA / CGPA</label>
                  <input type="number" placeholder="e.g. 3.5" min="0" max="4" step="0.01" value={form.gpa} onChange={(e) => updateForm("gpa", e.target.value)} className={inputClass("gpa")} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Degree Level Applying For *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "undergraduate", label: "Undergraduate", icon: "🎓" },
                      { value: "postgraduate", label: "Postgraduate", icon: "📚" },
                      { value: "mba", label: "MBA", icon: "💼" },
                      { value: "phd", label: "PhD", icon: "🔬" },
                    ].map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => updateForm("degreeLevel", d.value)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${form.degreeLevel === d.value ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 hover:border-blue-200 text-slate-600"}`}
                      >
                        <div className="text-2xl mb-1">{d.icon}</div>
                        <p className="text-xs font-semibold">{d.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: University Choice */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" /> University Selection
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Select University *</label>
                  <select value={form.university} onChange={(e) => updateForm("university", e.target.value)} className={inputClass("university")}>
                    <option value="">Choose a university...</option>
                    <optgroup label="🇮🇳 India">
                      {universities.filter((u) => u.country === "India").map((u) => (
                        <option key={u.id} value={u.id}>{u.name} – {u.city}</option>
                      ))}
                    </optgroup>
                    <optgroup label="🇨🇾 North Cyprus">
                      {universities.filter((u) => u.country === "North Cyprus").map((u) => (
                        <option key={u.id} value={u.id}>{u.name} – {u.city}</option>
                      ))}
                    </optgroup>
                  </select>
                  <ErrorMsg field="university" />
                </div>

                {selectedUni && (
                  <div className="bg-blue-50 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: selectedUni.logoColor }}>
                      {selectedUni.logo}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{selectedUni.name}</p>
                      <p className="text-sm text-slate-600">{selectedUni.city}, {selectedUni.country} • Ranking #{selectedUni.ranking}</p>
                      {selectedUni.scholarship && <span className="text-xs text-amber-600 font-semibold">🏆 Scholarship Available</span>}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Preferred Program *</label>
                  <select value={form.program} onChange={(e) => updateForm("program", e.target.value)} className={inputClass("program")} disabled={!selectedUni}>
                    <option value="">Select program...</option>
                    {selectedUni && (
                      <>
                        <optgroup label="Undergraduate">
                          {selectedUni.programs.undergraduate.map((p) => <option key={p}>{p}</option>)}
                        </optgroup>
                        <optgroup label="Postgraduate">
                          {selectedUni.programs.postgraduate.map((p) => <option key={p}>{p}</option>)}
                        </optgroup>
                      </>
                    )}
                  </select>
                  <ErrorMsg field="program" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Preferred Intake *</label>
                  <select value={form.intake} onChange={(e) => updateForm("intake", e.target.value)} className={inputClass("intake")}>
                    <option>September 2024</option>
                    <option>January 2025</option>
                    <option>September 2025</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" /> Document Upload
              </h2>
              <p className="text-slate-500 text-sm mb-6">Upload scanned copies or photos of your documents. PDF, JPG, PNG accepted (max 5MB each).</p>
              <div className="space-y-4">
                {[
                  { key: "passport", label: "International Passport", required: true, hint: "Bio-data page of your passport" },
                  { key: "transcript", label: "Academic Transcript", required: true, hint: "Official transcript from your school" },
                  { key: "waecResult", label: "WAEC Result", required: true, hint: "West African Examinations Council result" },
                  { key: "recommendation", label: "Recommendation Letter", required: false, hint: "From a teacher or academic counselor" },
                ].map((doc) => (
                  <div key={doc.key} className="border-2 border-dashed border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">
                          {doc.label} {doc.required && <span className="text-red-500">*</span>}
                        </p>
                        <p className="text-xs text-slate-400">{doc.hint}</p>
                      </div>
                      <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors">
                        <Upload className="w-4 h-4" />
                        {files[doc.key] ? "Change File" : "Upload"}
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFiles((f) => ({ ...f, [doc.key]: e.target.files?.[0] || null }))} />
                      </label>
                    </div>
                    {files[doc.key] && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>{files[doc.key]?.name}</span>
                      </div>
                    )}
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Personal Statement (Optional)</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about yourself, why you want to study abroad, and your career goals..."
                    value={form.personalStatement}
                    onChange={(e) => updateForm("personalStatement", e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                  <p className="text-xs text-slate-400 mt-1">{form.personalStatement.length} / 1000 characters</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" /> Review & Submit
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Personal Information", items: [
                    { label: "Full Name", value: `${form.firstName} ${form.lastName}` },
                    { label: "Email", value: form.email },
                    { label: "Phone", value: form.phone },
                    { label: "Nationality", value: form.nationality },
                  ]},
                  { title: "Academic Information", items: [
                    { label: "School", value: form.school },
                    { label: "Best WAEC Grade", value: form.waecGrade },
                    { label: "GPA", value: form.gpa },
                    { label: "Degree Level", value: form.degreeLevel },
                  ]},
                  { title: "University Choice", items: [
                    { label: "University", value: selectedUni?.name || "Not selected" },
                    { label: "Program", value: form.program },
                    { label: "Intake", value: form.intake },
                  ]},
                ].map((section) => (
                  <div key={section.title} className="bg-slate-50 rounded-2xl p-4">
                    <h3 className="font-bold text-slate-800 text-sm mb-3">{section.title}</h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {section.items.map((item) => (
                        <div key={item.label} className="flex justify-between text-sm">
                          <span className="text-slate-500">{item.label}:</span>
                          <span className="font-medium text-slate-800">{item.value || "—"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-amber-50 rounded-2xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold text-amber-900 mb-1">Before Submitting</p>
                    <p className="text-amber-800">Please ensure all information is accurate. Our team will contact you at the email and phone number provided. False information may result in application rejection.</p>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={(e) => updateForm("agreeTerms", e.target.checked)}
                    className="mt-1 w-4 h-4 rounded accent-blue-600"
                  />
                  <span className="text-sm text-slate-600">
                    I confirm that all information provided is accurate and I agree to the{" "}
                    <Link href="#" className="text-blue-600 font-medium hover:underline">Terms & Conditions</Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-600 font-medium hover:underline">Privacy Policy</Link>{" "}
                    of Tolbert Innovation Hub.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 text-slate-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {step < 5 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-lg shadow-blue-200"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!form.agreeTerms}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm shadow-lg shadow-green-200"
              >
                <CheckCircle className="w-4 h-4" /> Submit Application
              </button>
            )}
          </div>
        </div>

        {/* Form progress saved notice */}
        <p className="text-center text-xs text-slate-400 mt-4">
          ✓ Your progress is automatically saved in this browser
        </p>
      </div>

      {/* Floating "Need help?" button */}
      <Link
        href="/counseling"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 bg-white text-slate-700 font-semibold text-sm rounded-2xl shadow-xl border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all"
      >
        <HelpCircle className="w-4 h-4 text-blue-600" /> Need help?
      </Link>
    </main>
  );
}

export default function ApplyPage() {
  const isLoggedIn = usePortalStore(s => s.isLoggedIn);
  const [showAuth, setShowAuth] = useState(false);
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/40">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Sign In to Apply</h1>
          <p className="text-white/60 mb-8 leading-relaxed">
            You need an account to submit an application. Sign in or create a free account to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowAuth(true)}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition-all"
            >
              Sign In / Register Free
            </button>
            <button
              onClick={() => router.back()}
              className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
        <AuthModal open={showAuth} onClose={() => setShowAuth(false)} defaultPortal="student" defaultMode="register" />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ApplicationForm />
    </Suspense>
  );
}
