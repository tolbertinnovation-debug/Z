"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Plus,
  CheckCircle,
  XCircle,
  RefreshCw,
  Star,
} from "lucide-react";

type SessionStatus = "confirmed" | "pending" | "cancelled";
type SessionType =
  | "Initial Consultation"
  | "Application Review"
  | "Visa Guidance"
  | "Follow-up";

interface UpcomingSession {
  id: number;
  studentName: string;
  studentEmail: string;
  avatarInitials: string;
  avatarColor: string;
  sessionType: SessionType;
  date: string;
  time: string;
  duration: 30 | 60;
  counselor: string;
  status: SessionStatus;
  isToday: boolean;
}

interface PastSession {
  id: number;
  studentName: string;
  studentEmail: string;
  avatarInitials: string;
  avatarColor: string;
  sessionType: SessionType;
  date: string;
  time: string;
  duration: 30 | 60;
  counselor: string;
  rating: number;
}

const upcomingSessions: UpcomingSession[] = [
  {
    id: 1,
    studentName: "James Kollie",
    studentEmail: "james.kollie@email.com",
    avatarInitials: "JK",
    avatarColor: "bg-orange-500",
    sessionType: "Initial Consultation",
    date: "Jun 19, 2026",
    time: "10:00 AM",
    duration: 60,
    counselor: "Dr. Amara Bah",
    status: "confirmed",
    isToday: true,
  },
  {
    id: 2,
    studentName: "Mary Flomo",
    studentEmail: "mary.flomo@email.com",
    avatarInitials: "MF",
    avatarColor: "bg-rose-500",
    sessionType: "Application Review",
    date: "Jun 19, 2026",
    time: "2:00 PM",
    duration: 30,
    counselor: "Ms. Tina Kollie",
    status: "confirmed",
    isToday: true,
  },
  {
    id: 3,
    studentName: "David Togba",
    studentEmail: "david.togba@email.com",
    avatarInitials: "DT",
    avatarColor: "bg-amber-500",
    sessionType: "Visa Guidance",
    date: "Jun 20, 2026",
    time: "11:00 AM",
    duration: 60,
    counselor: "Dr. Amara Bah",
    status: "pending",
    isToday: false,
  },
  {
    id: 4,
    studentName: "Sarah Kamara",
    studentEmail: "sarah.kamara@email.com",
    avatarInitials: "SK",
    avatarColor: "bg-red-500",
    sessionType: "Follow-up",
    date: "Jun 21, 2026",
    time: "9:30 AM",
    duration: 30,
    counselor: "Ms. Tina Kollie",
    status: "pending",
    isToday: false,
  },
  {
    id: 5,
    studentName: "Emmanuel Pewee",
    studentEmail: "e.pewee@email.com",
    avatarInitials: "EP",
    avatarColor: "bg-orange-600",
    sessionType: "Application Review",
    date: "Jun 22, 2026",
    time: "2:00 PM",
    duration: 60,
    counselor: "Dr. Amara Bah",
    status: "confirmed",
    isToday: false,
  },
  {
    id: 6,
    studentName: "Grace Mulbah",
    studentEmail: "grace.mulbah@email.com",
    avatarInitials: "GM",
    avatarColor: "bg-rose-600",
    sessionType: "Initial Consultation",
    date: "Jun 23, 2026",
    time: "11:30 AM",
    duration: 60,
    counselor: "Ms. Tina Kollie",
    status: "cancelled",
    isToday: false,
  },
];

const pastSessions: PastSession[] = [
  {
    id: 101,
    studentName: "Isaac Sumo",
    studentEmail: "isaac.sumo@email.com",
    avatarInitials: "IS",
    avatarColor: "bg-amber-600",
    sessionType: "Initial Consultation",
    date: "Jun 14, 2026",
    time: "10:00 AM",
    duration: 60,
    counselor: "Dr. Amara Bah",
    rating: 5,
  },
  {
    id: 102,
    studentName: "Patience Sirleaf",
    studentEmail: "p.sirleaf@email.com",
    avatarInitials: "PS",
    avatarColor: "bg-red-600",
    sessionType: "Application Review",
    date: "Jun 12, 2026",
    time: "3:00 PM",
    duration: 30,
    counselor: "Ms. Tina Kollie",
    rating: 4,
  },
  {
    id: 103,
    studentName: "Moses Dahn",
    studentEmail: "moses.dahn@email.com",
    avatarInitials: "MD",
    avatarColor: "bg-orange-500",
    sessionType: "Visa Guidance",
    date: "Jun 10, 2026",
    time: "1:00 PM",
    duration: 60,
    counselor: "Dr. Amara Bah",
    rating: 5,
  },
  {
    id: 104,
    studentName: "Comfort Weah",
    studentEmail: "comfort.weah@email.com",
    avatarInitials: "CW",
    avatarColor: "bg-rose-500",
    sessionType: "Follow-up",
    date: "Jun 8, 2026",
    time: "11:00 AM",
    duration: 30,
    counselor: "Ms. Tina Kollie",
    rating: 4,
  },
];

const SESSION_TYPE_COLORS: Record<SessionType, string> = {
  "Initial Consultation": "bg-blue-100 text-blue-700",
  "Application Review": "bg-purple-100 text-purple-700",
  "Visa Guidance": "bg-teal-100 text-teal-700",
  "Follow-up": "bg-orange-100 text-orange-700",
};

const STATUS_CONFIG: Record<
  SessionStatus,
  { label: string; className: string }
> = {
  confirmed: { label: "Confirmed", className: "bg-green-100 text-green-700" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

export default function CounselingPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [sessionStatuses, setSessionStatuses] = useState<
    Record<number, SessionStatus>
  >(() => {
    const init: Record<number, SessionStatus> = {};
    upcomingSessions.forEach((s) => {
      init[s.id] = s.status;
    });
    return init;
  });

  function updateStatus(id: number, status: SessionStatus) {
    setSessionStatuses((prev) => ({ ...prev, [id]: status }));
  }

  const todaySessions = upcomingSessions.filter((s) => s.isToday);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Counseling Sessions
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and schedule student counseling appointments
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Schedule Session
        </button>
      </div>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
            {(["upcoming", "past"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {tab === "upcoming" ? "Upcoming" : "Past Sessions"}
              </button>
            ))}
          </div>

          {/* Sessions List */}
          {activeTab === "upcoming" ? (
            <div className="space-y-3">
              {upcomingSessions.map((session) => {
                const currentStatus = sessionStatuses[session.id];
                const statusCfg = STATUS_CONFIG[currentStatus];
                return (
                  <div
                    key={session.id}
                    className="bg-white rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full ${session.avatarColor} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}
                      >
                        {session.avatarInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-slate-800 text-sm">
                            {session.studentName}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${SESSION_TYPE_COLORS[session.sessionType]}`}
                          >
                            {session.sessionType}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusCfg.className}`}
                          >
                            {statusCfg.label}
                          </span>
                          {session.isToday && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                              Today
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {session.studentEmail}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {session.time} · {session.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {session.counselor}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => updateStatus(session.id, "confirmed")}
                          disabled={currentStatus === "confirmed"}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(session.id, "pending")}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Reschedule
                        </button>
                        <button
                          onClick={() => updateStatus(session.id, "cancelled")}
                          disabled={currentStatus === "cancelled"}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {pastSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full ${session.avatarColor} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}
                    >
                      {session.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-slate-800 text-sm">
                          {session.studentName}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${SESSION_TYPE_COLORS[session.sessionType]}`}
                        >
                          {session.sessionType}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                          Completed
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {session.studentEmail}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {session.time} · {session.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {session.counselor}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <StarRating rating={session.rating} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Today's Schedule Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">
                  Today&apos;s Schedule
                </p>
                <p className="text-xs text-slate-500">Jun 19, 2026</p>
              </div>
            </div>
            {todaySessions.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-4">
                No sessions today
              </p>
            ) : (
              <div className="space-y-3">
                {todaySessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-orange-50 border border-orange-100"
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${session.avatarColor} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}
                    >
                      {session.avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 text-xs truncate">
                        {session.studentName}
                      </p>
                      <p className="text-orange-600 text-xs">{session.time}</p>
                      <p className="text-slate-500 text-xs">
                        {session.duration} min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
