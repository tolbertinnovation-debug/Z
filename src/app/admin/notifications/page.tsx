"use client";
import { useState } from "react";
import { usePortalStore } from "@/lib/store";
import LiveBadge from "@/components/LiveBadge";
import { Bell, CheckCircle, FileText, Award, MessageSquare, FolderOpen, Settings, Users } from "lucide-react";

const TYPE_ICONS: Record<string, React.ElementType> = {
  application: FileText, scholarship: Award, message: MessageSquare,
  document: FolderOpen, system: Settings, commission: Users,
};
const TYPE_COLORS: Record<string, string> = {
  application: "bg-orange-100 text-orange-600", scholarship: "bg-amber-100 text-amber-600",
  message: "bg-purple-100 text-purple-600", document: "bg-blue-100 text-blue-600",
  system: "bg-slate-100 text-slate-600", commission: "bg-green-100 text-green-600",
};

const TABS = [
  { key: "all", label: "All" }, { key: "unread", label: "Unread" },
  { key: "application", label: "Applications" }, { key: "system", label: "System" },
  { key: "message", label: "Messages" },
];

function fmtTime(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  if (isToday) return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminNotificationsPage() {
  const allNotifs = usePortalStore(s => s.notifications.filter(n => n.recipientId === "admin"));
  const markRead = usePortalStore(s => s.markNotificationRead);
  const markAllRead = usePortalStore(s => s.markAllNotificationsRead);
  const [tab, setTab] = useState("all");

  const unreadCount = allNotifs.filter(n => !n.read).length;

  const filtered = [...allNotifs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter(n => {
      if (tab === "unread") return !n.read;
      if (tab === "all") return true;
      return n.type === tab;
    });

  const todayMs = new Date().setHours(0, 0, 0, 0);
  const yestMs = todayMs - 86400000;
  const groups: [string, typeof filtered][] = [
    ["Today", filtered.filter(n => new Date(n.createdAt).setHours(0, 0, 0, 0) === todayMs)],
    ["Yesterday", filtered.filter(n => new Date(n.createdAt).setHours(0, 0, 0, 0) === yestMs)],
    ["Earlier", filtered.filter(n => new Date(n.createdAt).setHours(0, 0, 0, 0) < yestMs)],
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-slate-900">Notifications</h2>
          <LiveBadge />
          {unreadCount > 0 && <span className="px-2 py-0.5 bg-orange-600 text-white text-xs font-bold rounded-full">{unreadCount}</span>}
        </div>
        {unreadCount > 0 && (
          <button onClick={() => markAllRead("admin")} className="flex items-center gap-1.5 text-xs text-orange-600 font-semibold hover:underline">
            <CheckCircle className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto">
        {TABS.map(t => {
          const cnt = t.key === "all" ? allNotifs.length : t.key === "unread" ? unreadCount : allNotifs.filter(n => n.type === t.key).length;
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${tab === t.key ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              {t.label}
              {cnt > 0 && <span className={`text-xs px-1.5 rounded-full ${tab === t.key ? "bg-orange-100 text-orange-600" : "bg-slate-200 text-slate-500"}`}>{cnt}</span>}
            </button>
          );
        })}
      </div>

      {/* Grouped notifications */}
      {groups.map(([label, items]) => items.length === 0 ? null : (
        <div key={label}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{label}</p>
          <div className="space-y-2">
            {items.map(n => {
              const Icon = TYPE_ICONS[n.type] ?? Bell;
              return (
                <div key={n.id} onClick={() => markRead(n.id)} className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all hover:shadow-sm ${n.read ? "bg-white border-slate-100" : "bg-orange-50 border-orange-100"}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${TYPE_COLORS[n.type] ?? "bg-slate-100 text-slate-600"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${n.read ? "text-slate-700" : "text-slate-900"}`}>{n.title}</p>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.body}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-slate-400">{fmtTime(n.createdAt)}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${TYPE_COLORS[n.type] ?? "bg-slate-100 text-slate-500"}`}>{n.type}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No notifications here</p>
        </div>
      )}
    </div>
  );
}
