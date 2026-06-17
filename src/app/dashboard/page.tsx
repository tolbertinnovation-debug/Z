"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap, FileText, Bell, BookOpen, Calendar, Upload,
  CheckCircle, Clock, AlertCircle, Star, TrendingUp, Users,
  Award, Heart, ArrowRight, Plus, Eye, MessageSquare, Paperclip,
  CheckSquare
} from "lucide-react";
import { universities } from "@/lib/data";

const savedUniversities = universities.slice(0, 4);

const applications = [
  { id: "TIH-A1B2C3", university: "Lovely Professional University", program: "BSc Computer Science", status: "under-review", date: "2024-01-15", lastUpdate: "2 days ago" },
  { id: "TIH-D4E5F6", university: "Marwadi University", program: "BTech Mechanical Engineering", status: "documents-required", date: "2024-01-10", lastUpdate: "5 days ago" },
  { id: "TIH-G7H8I9", university: "Cyrus International University", program: "LLB Law", status: "submitted", date: "2024-01-05", lastUpdate: "1 week ago" },
];

const notifications = [
  { type: "info", message: "Your application TIH-A1B2C3 is under review. Expected response in 3–5 days.", time: "2 hours ago" },
  { type: "warning", message: "Please upload your WAEC result for application TIH-D4E5F6.", time: "1 day ago" },
  { type: "success", message: "Welcome to Tolbert Innovation Hub! Your account has been created successfully.", time: "1 week ago" },
];

const progressSteps = [
  { id: 1, label: "Registration", done: true },
  { id: 2, label: "Document Upload", done: true },
  { id: 3, label: "Application Submitted", done: true },
  { id: 4, label: "University Review", active: true },
  { id: 5, label: "Offer Letter" },
  { id: 6, label: "Visa Process" },
  { id: 7, label: "Enrollment" },
];

const statusConfig = {
  "submitted": { label: "Submitted", color: "bg-blue-100 text-blue-700", icon: FileText },
  "under-review": { label: "Under Review", color: "bg-amber-100 text-amber-700", icon: Clock },
  "documents-required": { label: "Documents Needed", color: "bg-red-100 text-red-700", icon: AlertCircle },
  "accepted": { label: "Accepted!", color: "bg-green-100 text-green-700", icon: CheckCircle },
  "rejected": { label: "Not Successful", color: "bg-slate-100 text-slate-600", icon: AlertCircle },
};

const quickStats = [
  { label: "Applications", value: "3", icon: FileText, color: "text-blue-600 bg-blue-50" },
  { label: "Saved Univ.", value: "7", icon: Heart, color: "text-rose-600 bg-rose-50" },
  { label: "Scholarships", value: "4", icon: Award, color: "text-amber-600 bg-amber-50" },
  { label: "Sessions", value: "2", icon: Users, color: "text-purple-600 bg-purple-50" },
];

const documents = [
  { name: "International Passport", status: "uploaded", date: "Jan 12, 2024", required: true },
  { name: "Academic Transcript", status: "uploaded", date: "Jan 12, 2024", required: true },
  { name: "WAEC Result", status: "missing", date: null, required: true },
  { name: "Recommendation Letter", status: "uploaded", date: "Jan 13, 2024", required: false },
  { name: "Personal Statement", status: "uploaded", date: "Jan 13, 2024", required: false },
  { name: "Passport Photo", status: "missing", date: null, required: true },
];

const counselorMessages = [
  {
    sender: "Counselor Sarah",
    avatar: "CS",
    avatarColor: "bg-purple-500",
    message: "Hi Emmanuel! I've reviewed your application for Lovely Professional University. Your profile looks great! I recommend uploading your WAEC result as soon as possible to move forward.",
    time: "Jan 20, 2024 · 10:30 AM",
    isMe: false,
  },
  {
    sender: "You",
    avatar: "EK",
    avatarColor: "bg-blue-600",
    message: "Thank you, Sarah! I'll upload the WAEC result today. Should I also prepare for any additional documents?",
    time: "Jan 20, 2024 · 11:15 AM",
    isMe: true,
  },
  {
    sender: "Counselor Sarah",
    avatar: "CS",
    avatarColor: "bg-purple-500",
    message: "Yes! Make sure your passport is valid for at least 2 years. Also, I'd suggest preparing a strong personal statement. I can help you with that in our counseling session on Jan 25.",
    time: "Jan 20, 2024 · 11:45 AM",
    isMe: false,
  },
  {
    sender: "Counselor Sarah",
    avatar: "CS",
    avatarColor: "bg-purple-500",
    message: "Also, great news — Marwadi University has a new scholarship deadline coming up. Let's discuss this in our session. You qualify based on your profile!",
    time: "Jan 21, 2024 · 9:00 AM",
    isMe: false,
  },
];

const scholarshipMatches = [
  { title: "Merit Excellence Scholarship", univ: "Lovely Professional University", amount: "Up to 75%", match: 92, color: "from-yellow-400 to-orange-500" },
  { title: "International Student Grant", univ: "Marwadi University", amount: "$2,000/year", match: 88, color: "from-blue-400 to-indigo-600" },
  { title: "STEM Innovation Scholarship", univ: "SR University", amount: "Up to 60%", match: 85, color: "from-purple-400 to-pink-600" },
  { title: "African Student Scholarship", univ: "Cyrus West University", amount: "Up to 75%", match: 80, color: "from-green-400 to-teal-600" },
];

function AnimatedBar({ match, color }: { match: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(match), 300);
    return () => clearTimeout(t);
  }, [match]);
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function getMotivationalBanner() {
  // Based on application status (documents-required = needs action)
  return {
    type: "warning",
    title: "Action Required",
    message: "You have 1 application waiting for documents. Upload your WAEC result to move forward!",
    cta: "Upload Now",
    href: "/apply",
    icon: AlertCircle,
  };
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "applications", label: "Applications" },
    { id: "saved", label: "Saved Universities" },
    { id: "scholarships", label: "Scholarships" },
    { id: "documents", label: "Documents" },
    { id: "messages", label: "Messages" },
  ];

  const banner = getMotivationalBanner();

  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-black shadow-xl border-2 border-white/30">
                EK
              </div>
              <div>
                <p className="text-blue-200 text-sm font-medium">Welcome back,</p>
                <h1 className="text-2xl font-black">Emmanuel Kollie</h1>
                <p className="text-blue-200 text-sm">Aspiring Computer Scientist · Monrovia, Liberia</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/apply" className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-lg">
                <Plus className="w-4 h-4" /> New Application
              </Link>
              <Link href="/counseling" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors text-sm">
                <Calendar className="w-4 h-4" /> Book Session
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Motivational Banner */}
        <div className={`mb-6 flex items-center gap-4 p-4 rounded-2xl border ${banner.type === "warning" ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"}`}>
          <banner.icon className={`w-6 h-6 shrink-0 ${banner.type === "warning" ? "text-amber-600" : "text-green-600"}`} />
          <div className="flex-1 min-w-0">
            <p className={`font-bold text-sm ${banner.type === "warning" ? "text-amber-900" : "text-green-900"}`}>{banner.title}</p>
            <p className={`text-sm ${banner.type === "warning" ? "text-amber-800" : "text-green-800"}`}>{banner.message}</p>
          </div>
          <Link href={banner.href} className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${banner.type === "warning" ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-green-600 text-white hover:bg-green-700"}`}>
            {banner.cta}
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6 space-y-2">
            {notifications.slice(0, 2).map((n, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-xl text-sm ${n.type === "warning" ? "bg-amber-50 border border-amber-200" : n.type === "success" ? "bg-green-50 border border-green-200" : "bg-blue-50 border border-blue-200"}`}>
                {n.type === "warning" ? <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> : n.type === "success" ? <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> : <Bell className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                <div className="flex-1">
                  <p className={n.type === "warning" ? "text-amber-800" : n.type === "success" ? "text-green-800" : "text-blue-800"}>{n.message}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm border border-slate-100 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Tracker */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" /> Application Progress
                </h3>
                <div className="space-y-3">
                  {progressSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${step.done ? "bg-green-500 text-white" : step.active ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-slate-100 text-slate-400"}`}>
                        {step.done ? <CheckCircle className="w-4 h-4" /> : step.id}
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className={`text-sm font-medium ${step.done ? "text-green-700" : step.active ? "text-blue-700" : "text-slate-400"}`}>
                          {step.label}
                        </span>
                        {step.done && <span className="text-xs text-green-600 font-medium">Completed</span>}
                        {step.active && <span className="text-xs text-blue-600 font-medium animate-pulse">In Progress</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" /> Recent Applications
                  </h3>
                  <button onClick={() => setActiveTab("applications")} className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
                </div>
                <div className="space-y-3">
                  {applications.map((app) => {
                    const cfg = statusConfig[app.status as keyof typeof statusConfig];
                    return (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate">{app.university}</p>
                          <p className="text-xs text-slate-500 truncate">{app.program}</p>
                          <p className="text-xs text-slate-400">Updated {app.lastUpdate}</p>
                        </div>
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ml-3 shrink-0 ${cfg.color}`}>
                          <cfg.icon className="w-3 h-3" /> {cfg.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Upcoming */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" /> Upcoming
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">25</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Counseling Session</p>
                      <p className="text-xs text-slate-500">Jan 25 · 10:00 AM · Zoom</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                    <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">31</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Document Deadline</p>
                      <p className="text-xs text-slate-500">Jan 31 · Upload WAEC result</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { icon: Plus, label: "New Application", href: "/apply", color: "text-blue-600 bg-blue-50" },
                    { icon: Upload, label: "Upload Documents", href: "/apply", color: "text-purple-600 bg-purple-50" },
                    { icon: Calendar, label: "Book Counseling", href: "/counseling", color: "text-green-600 bg-green-50" },
                    { icon: BookOpen, label: "Browse Universities", href: "/universities", color: "text-amber-600 bg-amber-50" },
                  ].map((action) => (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                        <action.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">{action.label}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 ml-auto group-hover:text-blue-600" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">All Applications ({applications.length})</h2>
              <Link href="/apply" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm">
                <Plus className="w-4 h-4" /> New Application
              </Link>
            </div>
            {applications.map((app) => {
              const cfg = statusConfig[app.status as keyof typeof statusConfig];
              const uni = universities.find((u) => u.name === app.university);
              return (
                <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {uni && (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0" style={{ backgroundColor: uni.logoColor }}>
                        {uni.logo}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-slate-900">{app.university}</h3>
                          <p className="text-sm text-slate-500">{app.program}</p>
                          <p className="text-xs text-slate-400 mt-1">Application ID: <span className="font-mono font-semibold text-slate-600">{app.id}</span> · Submitted {app.date}</p>
                        </div>
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.color}`}>
                          <cfg.icon className="w-3 h-3" /> {cfg.label}
                        </div>
                      </div>
                      {app.status === "documents-required" && (
                        <div className="mt-3 flex items-center gap-2 bg-red-50 rounded-xl p-3">
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                          <span className="text-xs text-red-700 font-medium">Action required: Please upload your WAEC result to proceed.</span>
                          <Link href="/apply" className="ml-auto text-xs text-red-700 font-bold underline shrink-0">Upload Now</Link>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors">
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SAVED */}
        {activeTab === "saved" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Saved Universities (7)</h2>
              <Link href="/universities" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                Browse More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedUniversities.map((uni) => (
                <div key={uni.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover">
                  <div className="relative h-32 overflow-hidden">
                    <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                    <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{uni.name}</h3>
                    <p className="text-xs text-slate-500 mb-3">{uni.city}, {uni.country}</p>
                    <div className="flex gap-2">
                      <Link href={`/universities/${uni.id}`} className="flex-1 text-center py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors">
                        View
                      </Link>
                      <Link href={`/apply?university=${uni.id}`} className="flex-1 text-center py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors">
                        Apply
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHOLARSHIPS */}
        {activeTab === "scholarships" && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Scholarship Matches for You</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {scholarshipMatches.map((s) => (
                <div key={s.title} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${s.color}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900">{s.title}</h3>
                        <p className="text-xs text-slate-500">{s.univ}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-black text-green-600">{s.amount}</p>
                        <p className="text-xs text-slate-500">scholarship</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Profile Match</span>
                        <span className="font-semibold text-blue-600">{s.match}%</span>
                      </div>
                      <AnimatedBar match={s.match} color={s.color} />
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors">Details</button>
                      <Link href="/apply" className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors text-center">Apply Now</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCUMENTS */}
        {activeTab === "documents" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Documents</h2>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-green-600"><CheckSquare className="w-4 h-4" /> {documents.filter((d) => d.status === "uploaded").length} Uploaded</span>
                <span className="flex items-center gap-1 text-red-500"><AlertCircle className="w-4 h-4" /> {documents.filter((d) => d.status === "missing").length} Missing</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {documents.map((doc, i) => (
                <div key={doc.name} className={`flex items-center gap-4 p-5 ${i < documents.length - 1 ? "border-b border-slate-100" : ""}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${doc.status === "uploaded" ? "bg-green-50" : "bg-red-50"}`}>
                    <Paperclip className={`w-5 h-5 ${doc.status === "uploaded" ? "text-green-600" : "text-red-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm">
                      {doc.name}
                      {doc.required && <span className="ml-1.5 text-xs text-red-500">*Required</span>}
                    </p>
                    {doc.date ? (
                      <p className="text-xs text-slate-500">Uploaded on {doc.date}</p>
                    ) : (
                      <p className="text-xs text-red-500 font-medium">Not yet uploaded</p>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    {doc.status === "uploaded" ? (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        <CheckCircle className="w-3 h-3" /> Uploaded
                      </span>
                    ) : (
                      <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-full text-xs font-semibold hover:bg-blue-700 transition-colors">
                        <Upload className="w-3 h-3" /> Upload
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {activeTab === "messages" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-slate-900">Messages</h2>
              <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Counselor Sarah</span>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col" style={{ height: "520px" }}>
              {/* Message header */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">CS</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Counselor Sarah Mensah</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <p className="text-xs text-slate-500">Online · Tolbert Innovation Hub</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {counselorMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.isMe ? "justify-end" : "justify-start"} items-end gap-2`}>
                    {!msg.isMe && (
                      <div className={`w-8 h-8 rounded-full ${msg.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {msg.avatar}
                      </div>
                    )}
                    <div className={`max-w-sm rounded-2xl px-4 py-3 shadow-sm ${msg.isMe ? "bg-blue-600 text-white rounded-br-md" : "bg-white text-slate-700 rounded-bl-md"}`}>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <p className={`text-xs mt-1.5 ${msg.isMe ? "text-blue-200" : "text-slate-400"}`}>{msg.time}</p>
                    </div>
                    {msg.isMe && (
                      <div className={`w-8 h-8 rounded-full ${msg.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {msg.avatar}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-100 bg-white">
                <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3">
                  <MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />
                  <input type="text" placeholder="Type a message to your counselor..." className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none border-none" />
                  <button className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center">Counselors typically respond within 24 hours</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
