"use client";

import { useState } from "react";
import {
  Bell, FileText, Award, AlertCircle, CheckCircle,
  CheckCheck, Calendar,
} from "lucide-react";

type NotifCategory = "applications" | "scholarships" | "system";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  group: "today" | "yesterday" | "week";
  unread: boolean;
  category: NotifCategory;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

const NOTIFICATIONS: Notification[] = [
  // Today
  {
    id: 1,
    title: "Application Under Review",
    description: "Your application TIH-A1B2C3 to LPU is now under review. Expected response in 3-5 days.",
    time: "2 hours ago",
    group: "today",
    unread: true,
    category: "applications",
    icon: CheckCircle,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    id: 2,
    title: "Document Required",
    description: "Please upload your WAEC result for application TIH-D4E5F6 to avoid delays.",
    time: "3 hours ago",
    group: "today",
    unread: true,
    category: "applications",
    icon: AlertCircle,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
  },
  // Yesterday
  {
    id: 3,
    title: "Scholarship Match",
    description: "New scholarship match! Merit Excellence Scholarship at LPU — 92% match for your profile.",
    time: "1 day ago",
    group: "yesterday",
    unread: true,
    category: "scholarships",
    icon: Award,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
  },
  {
    id: 4,
    title: "Message from Counselor",
    description: "Counselor Sarah sent you a message about your Marwadi application.",
    time: "1 day ago",
    group: "yesterday",
    unread: true,
    category: "system",
    icon: Bell,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  // This Week
  {
    id: 5,
    title: "Session Confirmed",
    description: "Your counseling session with Sarah is confirmed for Jan 25, 2024 at 3:00 PM via Zoom.",
    time: "2 days ago",
    group: "week",
    unread: true,
    category: "system",
    icon: Calendar,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-100",
  },
  {
    id: 6,
    title: "Application Submitted",
    description: "Your application TIH-G7H8I9 to Cyrus International University has been received.",
    time: "3 days ago",
    group: "week",
    unread: false,
    category: "applications",
    icon: FileText,
    iconColor: "text-slate-600",
    iconBg: "bg-slate-100",
  },
  {
    id: 7,
    title: "Document Approved",
    description: "Your Personal Statement for TIH-A1B2C3 has been approved.",
    time: "4 days ago",
    group: "week",
    unread: false,
    category: "applications",
    icon: CheckCircle,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    id: 8,
    title: "Welcome to Tolbert Hub",
    description: "Welcome to Tolbert Innovation Hub! Your student portal is ready. Explore your dashboard.",
    time: "5 days ago",
    group: "week",
    unread: false,
    category: "system",
    icon: Bell,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
  },
];

type FilterTab = "all" | "unread" | NotifCategory;

const TABS: { id: FilterTab; label: string; count: number }[] = [
  { id: "all", label: "All", count: 8 },
  { id: "unread", label: "Unread", count: 5 },
  { id: "applications", label: "Applications", count: 3 },
  { id: "scholarships", label: "Scholarships", count: 1 },
  { id: "system", label: "System", count: 3 },
];

const GROUP_LABELS: Record<Notification["group"], string> = {
  today: "Today",
  yesterday: "Yesterday",
  week: "This Week",
};

function NotifItem({
  notif,
  onRead,
}: {
  notif: Notification;
  onRead: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = notif.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-150 cursor-pointer ${
        notif.unread
          ? "bg-white border-slate-100 hover:border-blue-100 hover:shadow-sm"
          : "bg-slate-50/60 border-transparent hover:bg-white hover:border-slate-100"
      }`}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.iconBg}`}>
        <Icon className={`w-5 h-5 ${notif.iconColor}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={`text-sm font-semibold ${notif.unread ? "text-slate-900" : "text-slate-600"}`}>
              {notif.title}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.description}</p>
            <p className="text-xs text-slate-400 mt-1.5 font-medium">{notif.time}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {hovered && notif.unread && (
              <button
                onClick={(e) => { e.stopPropagation(); onRead(notif.id); }}
                className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[11px] font-semibold hover:bg-blue-100 transition-colors flex items-center gap-1 whitespace-nowrap"
              >
                <CheckCheck className="w-3 h-3" /> Mark read
              </button>
            )}
            {notif.unread && (
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const markRead = (id: number) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const filtered = notifs.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return n.unread;
    return n.category === activeTab;
  });

  const unreadCount = notifs.filter((n) => n.unread).length;

  const groups: Notification["group"][] = ["today", "yesterday", "week"];

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <CheckCheck className="w-4 h-4" /> Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map((tab) => {
          const count =
            tab.id === "all"
              ? notifs.length
              : tab.id === "unread"
              ? notifs.filter((n) => n.unread).length
              : notifs.filter((n) => n.category === tab.id).length;

          return (
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
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-slate-200 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notification Groups */}
      {filtered.length > 0 ? (
        <div className="space-y-6">
          {groups.map((group) => {
            const groupItems = filtered.filter((n) => n.group === group);
            if (groupItems.length === 0) return null;
            return (
              <div key={group}>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
                  {GROUP_LABELS[group]}
                </h2>
                <div className="space-y-2">
                  {groupItems.map((notif) => (
                    <NotifItem key={notif.id} notif={notif} onRead={markRead} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bell className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-slate-700 font-semibold">No notifications</h3>
          <p className="text-slate-400 text-sm mt-1">
            {activeTab === "unread" ? "You have no unread notifications." : "Nothing here yet."}
          </p>
        </div>
      )}
    </div>
  );
}
