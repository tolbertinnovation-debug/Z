"use client";
import { useState } from "react";
import {
  Search,
  UserPlus,
  Users,
  TrendingUp,
  BarChart2,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

type StudentStatus = "Active" | "Inactive" | "Visa Processing";

interface Student {
  id: string;
  name: string;
  email: string;
  nationality: string;
  flag: string;
  applicationCount: number;
  profileCompletion: number;
  status: StudentStatus;
  gradientFrom: string;
  gradientTo: string;
}

const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Emmanuel Kollie",
    email: "ekollie@mail.com",
    nationality: "Liberian",
    flag: "🇱🇷",
    applicationCount: 2,
    profileCompletion: 92,
    status: "Active",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
  },
  {
    id: "s2",
    name: "Patience Saah",
    email: "psaah@mail.com",
    nationality: "Liberian",
    flag: "🇱🇷",
    applicationCount: 1,
    profileCompletion: 100,
    status: "Visa Processing",
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-600",
  },
  {
    id: "s3",
    name: "James Brownell",
    email: "jbrownell@mail.com",
    nationality: "Liberian",
    flag: "🇱🇷",
    applicationCount: 3,
    profileCompletion: 78,
    status: "Active",
    gradientFrom: "from-green-500",
    gradientTo: "to-teal-600",
  },
  {
    id: "s4",
    name: "Mary Flomo",
    email: "mflomo@mail.com",
    nationality: "Liberian",
    flag: "🇱🇷",
    applicationCount: 1,
    profileCompletion: 88,
    status: "Visa Processing",
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-600",
  },
  {
    id: "s5",
    name: "Titus Mulbah",
    email: "tmulbah@mail.com",
    nationality: "Liberian",
    flag: "🇱🇷",
    applicationCount: 2,
    profileCompletion: 95,
    status: "Active",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-blue-600",
  },
  {
    id: "s6",
    name: "Sia Kamara",
    email: "skamara@mail.com",
    nationality: "Sierra Leonean",
    flag: "🇸🇱",
    applicationCount: 1,
    profileCompletion: 65,
    status: "Active",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-600",
  },
  {
    id: "s7",
    name: "David Togba",
    email: "dtogba@mail.com",
    nationality: "Liberian",
    flag: "🇱🇷",
    applicationCount: 1,
    profileCompletion: 55,
    status: "Inactive",
    gradientFrom: "from-slate-500",
    gradientTo: "to-slate-600",
  },
  {
    id: "s8",
    name: "Ruth Gonquoi",
    email: "rgonquoi@mail.com",
    nationality: "Ghanaian",
    flag: "🇬🇭",
    applicationCount: 2,
    profileCompletion: 82,
    status: "Active",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-600",
  },
];

const STATUS_COLORS: Record<StudentStatus, string> = {
  Active: "bg-green-100 text-green-700 border-green-200",
  Inactive: "bg-slate-100 text-slate-600 border-slate-200",
  "Visa Processing": "bg-amber-100 text-amber-700 border-amber-200",
};

const COMPLETION_COLORS = (pct: number): string => {
  if (pct >= 90) return "bg-green-500";
  if (pct >= 70) return "bg-orange-400";
  return "bg-red-400";
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = mockStudents.filter((s) => {
    const q = search.toLowerCase();
    return (
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.nationality.toLowerCase().includes(q)
    );
  });

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Student Management
          </h2>
          <p className="text-slate-500 text-sm">
            Manage and monitor all registered students
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all whitespace-nowrap">
          <UserPlus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">183</p>
            <p className="text-xs text-slate-500">Active Students</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">12</p>
            <p className="text-xs text-slate-500">New This Month</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
            <BarChart2 className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">89%</p>
            <p className="text-xs text-slate-500">Avg. Profile Completion</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search students by name, email, or nationality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-slate-700 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Student cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-slate-400">
            No students found.
          </div>
        ) : (
          displayed.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Card top strip */}
              <div
                className={`h-16 bg-gradient-to-r ${student.gradientFrom} ${student.gradientTo} relative`}
              />

              <div className="px-5 pb-5 -mt-8">
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${student.gradientFrom} ${student.gradientTo} flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white mb-3`}
                >
                  {getInitials(student.name)}
                </div>

                {/* Name + email */}
                <div className="mb-3">
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    {student.name}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {student.email}
                  </p>
                </div>

                {/* Nationality + applications */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{student.flag}</span>
                    <span className="text-xs text-slate-600 font-medium">
                      {student.nationality}
                    </span>
                  </div>
                  <span className="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-0.5 rounded-full font-semibold">
                    {student.applicationCount}{" "}
                    {student.applicationCount === 1 ? "App" : "Apps"}
                  </span>
                </div>

                {/* Profile completion bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 font-medium">
                      Profile Completion
                    </span>
                    <span className="font-bold text-slate-700">
                      {student.profileCompletion}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${COMPLETION_COLORS(student.profileCompletion)}`}
                      style={{ width: `${student.profileCompletion}%` }}
                    />
                  </div>
                </div>

                {/* Status badge */}
                <div className="mb-4">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[student.status]}`}
                  >
                    {student.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Profile
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load more */}
      {filtered.length > 6 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-8 py-3 bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 text-slate-700 text-sm font-bold rounded-2xl shadow-sm transition-all"
          >
            {showAll
              ? "Show Less"
              : `Load More (${filtered.length - 6} remaining)`}
          </button>
        </div>
      )}
    </div>
  );
}
