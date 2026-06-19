"use client";

import { useState } from "react";
import {
  Camera,
  Eye,
  EyeOff,
  Shield,
  Monitor,
  Smartphone,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  danger?: boolean;
}

function Toggle({ checked, onChange, danger }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        checked
          ? danger
            ? "bg-red-500"
            : "bg-orange-500"
          : "bg-slate-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  disabled,
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all ${
          disabled
            ? "bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed"
            : "bg-white border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        }`}
      />
    </div>
  );
}

function PasswordField({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="••••••••"
          className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  // Profile state
  const [fullName, setFullName] = useState("Admin User");
  const [email, setEmail] = useState("admin@scholarpath.lr");
  const [phone, setPhone] = useState("+231 770 123 456");

  // System settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [dailySummary, setDailySummary] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState("submitted");
  const [maxApplications, setMaxApplications] = useState("3");

  // Security state
  const [twoFactor, setTwoFactor] = useState(false);

  // Save state
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Revoke confirm
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your admin profile, system preferences, and security
        </p>
      </div>

      {/* Section 1: Admin Profile */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-semibold text-slate-800">Admin Profile</h2>
        </div>
        <div className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                AU
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center shadow-md transition-colors">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div>
              <p className="font-semibold text-slate-800">{fullName}</p>
              <p className="text-slate-500 text-sm">{email}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                Super Administrator
              </span>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              value={fullName}
              onChange={setFullName}
            />
            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <InputField
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={setPhone}
            />
            <InputField
              label="Role"
              value="Super Administrator"
              disabled
            />
          </div>

          {/* Change Password */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="font-medium text-slate-700 mb-4 text-sm">
              Change Password
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <PasswordField label="Current Password" />
              <PasswordField label="New Password" />
              <PasswordField label="Confirm Password" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: System Settings */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-semibold text-slate-800">System Settings</h2>
        </div>
        <div className="p-6 space-y-5">
          {/* Toggles */}
          <div className="space-y-4">
            {[
              {
                label: "Application notifications (email)",
                sub: "Receive emails when new applications are submitted",
                checked: emailNotifications,
                onChange: setEmailNotifications,
                danger: false,
              },
              {
                label: "SMS alerts for urgent documents",
                sub: "Get SMS notifications for time-sensitive document actions",
                checked: smsAlerts,
                onChange: setSmsAlerts,
                danger: false,
              },
              {
                label: "Daily summary email",
                sub: "Receive a daily digest of admin activity",
                checked: dailySummary,
                onChange: setDailySummary,
                danger: false,
              },
              {
                label: "Maintenance mode",
                sub: "Disable the platform for all non-admin users",
                checked: maintenanceMode,
                onChange: setMaintenanceMode,
                danger: true,
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  item.danger && item.checked
                    ? "border-red-200 bg-red-50"
                    : "border-slate-100 bg-slate-50"
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                  {item.danger && item.checked && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Warning: Platform is currently offline for students
                    </p>
                  )}
                </div>
                <Toggle
                  checked={item.checked}
                  onChange={item.onChange}
                  danger={item.danger}
                />
              </div>
            ))}
          </div>

          {/* Select + Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Default Application Status
              </label>
              <select
                value={defaultStatus}
                onChange={(e) => setDefaultStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white transition-all"
              >
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Max Applications per Student
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={maxApplications}
                onChange={(e) => setMaxApplications(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Security */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-600" />
            <h2 className="font-semibold text-slate-800">Security</h2>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* 2FA Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50">
            <div>
              <p className="text-sm font-medium text-slate-700">
                Two-factor authentication
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Add an extra layer of security to your account
              </p>
              {twoFactor && (
                <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  2FA is active — your account is more secure
                </p>
              )}
            </div>
            <Toggle checked={twoFactor} onChange={setTwoFactor} />
          </div>

          {/* Active Sessions */}
          <div>
            <h3 className="font-medium text-slate-700 mb-3 text-sm">
              Active Sessions
            </h3>
            <div className="space-y-2">
              {/* Session 1 - Current */}
              <div className="flex items-center gap-3 p-3.5 rounded-lg border border-orange-200 bg-orange-50">
                <Monitor className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-800">
                      Chrome on macOS
                    </p>
                    <span className="px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                      Current
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Monrovia, Liberia · Last active just now
                  </p>
                </div>
              </div>
              {/* Session 2 */}
              <div className="flex items-center gap-3 p-3.5 rounded-lg border border-slate-200 bg-white">
                <Smartphone className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">
                    Safari on iPhone
                  </p>
                  <p className="text-xs text-slate-500">
                    Monrovia, Liberia · Last active 2 hours ago
                  </p>
                </div>
                <button className="text-xs text-red-600 hover:text-red-700 font-medium flex-shrink-0">
                  Revoke
                </button>
              </div>
            </div>
          </div>

          {/* Revoke All Sessions */}
          <div className="border-t border-slate-100 pt-4">
            {!showRevokeConfirm ? (
              <button
                onClick={() => setShowRevokeConfirm(true)}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-medium transition-colors"
              >
                Revoke all sessions
              </button>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700 flex-1">
                  This will log you out of all devices. Continue?
                </p>
                <button
                  onClick={() => setShowRevokeConfirm(false)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowRevokeConfirm(false)}
                  className="px-3 py-1.5 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pb-4">
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Settings saved successfully
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            saved
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
