"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap, LayoutDashboard, FileText, FolderOpen,
  MessageSquare, Award, Plane, Bell, User, Settings,
  LogOut, Menu, X, ChevronRight
} from "lucide-react";

const navItems = [
  { href: "/portal", icon: LayoutDashboard, label: "Overview", exact: true },
  { href: "/portal/applications", icon: FileText, label: "My Applications", badge: 3 },
  { href: "/portal/documents", icon: FolderOpen, label: "Documents", badge: 2 },
  { href: "/portal/messages", icon: MessageSquare, label: "Messages", badge: 4 },
  { href: "/portal/scholarships", icon: Award, label: "Scholarships" },
  { href: "/portal/visa", icon: Plane, label: "Visa Tracker" },
  { href: "/portal/notifications", icon: Bell, label: "Notifications", badge: 5 },
  { href: "/portal/profile", icon: User, label: "My Profile" },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Login page renders standalone without sidebar
  if (pathname === "/portal/login") return <>{children}</>;

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-900 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Tolbert Hub</p>
              <p className="text-blue-400 text-xs">Student Portal</p>
            </div>
          </Link>
          <button className="absolute top-4 right-4 lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Info */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              EK
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">Emmanuel Kollie</p>
              <p className="text-slate-400 text-xs truncate">e.kollie@email.com</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-green-400 text-xs font-medium">Active Student</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <item.icon className="w-4.5 h-4.5 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${active ? "bg-white/20 text-white" : "bg-blue-600 text-white"}`}>
                    {item.badge}
                  </span>
                )}
                {active && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <Link href="/portal/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Settings className="w-4.5 h-4.5" />
            Settings
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-all">
            <LogOut className="w-4.5 h-4.5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-slate-900 font-bold text-lg truncate">
              {navItems.find(n => isActive(n.href, n.exact))?.label ?? "Portal"}
            </h1>
            <p className="text-slate-400 text-xs">Tolbert Innovation Hub</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/portal/notifications" className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </Link>
            <Link href="/portal/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              EK
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
