"use client";
import { useState } from "react";
import { Bell, Lock, Globe, Smartphone, Shield, Save, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailApplications: true, emailScholarships: true, emailMessages: true,
    smsAlerts: false, whatsappUpdates: true, pushNotifications: false,
  });
  const [privacy, setPrivacy] = useState({ showProfile: true, shareData: false });
  const [saved, setSaved] = useState(false);

  const toggleNotif = (k: keyof typeof notifications) =>
    setNotifications(p => ({ ...p, [k]: !p[k] }));

  const save = () => {
    setSaved(true);
    toast.success("Settings saved!");
    setTimeout(() => setSaved(false), 3000);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${value ? "bg-blue-600" : "bg-slate-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );

  const sections = [
    {
      id: "notifications", title: "Notification Preferences", icon: Bell,
      items: [
        { key: "emailApplications", label: "Application updates via email", desc: "Get notified when your application status changes" },
        { key: "emailScholarships", label: "Scholarship alerts via email", desc: "New scholarships matching your profile" },
        { key: "emailMessages", label: "New messages via email", desc: "When counselors send you messages" },
        { key: "whatsappUpdates", label: "WhatsApp updates", desc: "Important updates on your WhatsApp number" },
        { key: "smsAlerts", label: "SMS alerts", desc: "Critical alerts via SMS" },
        { key: "pushNotifications", label: "Push notifications", desc: "Browser push notifications" },
      ] as { key: keyof typeof notifications; label: string; desc: string }[],
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 mb-1">Settings</h2>
        <p className="text-slate-500 text-sm">Manage your account preferences</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center gap-3 p-5 border-b border-slate-100">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
            <Bell className="w-4.5 h-4.5 text-blue-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Notifications</p>
            <p className="text-xs text-slate-400">Choose how we contact you</p>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {sections[0].items.map(item => (
            <div key={item.key} className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
              <Toggle value={notifications[item.key]} onChange={() => toggleNotif(item.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center gap-3 p-5 border-b border-slate-100">
          <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-purple-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Privacy</p>
            <p className="text-xs text-slate-400">Control your data and visibility</p>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-semibold text-slate-700">Public profile</p>
              <p className="text-xs text-slate-400">Allow universities to view your profile</p>
            </div>
            <Toggle value={privacy.showProfile} onChange={() => setPrivacy(p => ({ ...p, showProfile: !p.showProfile }))} />
          </div>
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-semibold text-slate-700">Share anonymized data</p>
              <p className="text-xs text-slate-400">Help us improve the portal experience</p>
            </div>
            <Toggle value={privacy.shareData} onChange={() => setPrivacy(p => ({ ...p, shareData: !p.shareData }))} />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center gap-3 p-5 border-b border-slate-100">
          <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
            <Lock className="w-4.5 h-4.5 text-red-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Security</p>
            <p className="text-xs text-slate-400">Password and account security</p>
          </div>
        </div>
        <div className="p-5 space-y-3">
          <button className="w-full text-left text-sm font-semibold text-slate-700 p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between">
            Change Password <span className="text-slate-400 text-xs">→</span>
          </button>
          <button className="w-full text-left text-sm font-semibold text-slate-700 p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between">
            Two-Factor Authentication <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">Off</span>
          </button>
          <button className="w-full text-left text-sm font-semibold text-slate-700 p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between">
            Active Sessions <span className="text-slate-400 text-xs">1 device →</span>
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={save}
          className={`flex items-center gap-2 px-6 py-2.5 font-bold text-sm rounded-xl transition-all ${
            saved ? "bg-green-500 text-white" : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 hover:scale-[1.02]"
          }`}
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
