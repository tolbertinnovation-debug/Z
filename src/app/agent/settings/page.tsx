"use client";

import { useState } from "react";
import {
  Bell,
  Link,
  Copy,
  Check,
  MessageCircle,
  Download,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  Shield,
  X,
} from "lucide-react";

type ToggleKey =
  | "referralStatusEmail"
  | "commissionCreditEmail"
  | "whatsappAlerts"
  | "weeklyPerformance"
  | "scholarshipOpportunities";

interface NotificationSettings {
  referralStatusEmail: boolean;
  commissionCreditEmail: boolean;
  whatsappAlerts: boolean;
  weeklyPerformance: boolean;
  scholarshipOpportunities: boolean;
}

interface PasswordFields {
  current: string;
  next: string;
  confirm: string;
}

interface PasswordVisibility {
  current: boolean;
  next: boolean;
  confirm: boolean;
}

const REFERRAL_CODE = "TIH-JB-2024";
const REFERRAL_LINK = `https://portal.tolbertinnovation.com/apply?ref=${REFERRAL_CODE}`;
const WA_MESSAGE = encodeURIComponent(
  `Hi! I'm Joseph Barweh, an authorized agent for the Tolbert Innovation Hub Study Abroad Portal. 🎓\n\nAre you interested in studying abroad? We help students get admitted to top universities in India and North Cyprus.\n\n✅ No IELTS required\n✅ Affordable tuition\n✅ Full support from application to admission\n\nApply now using my referral link:\n${REFERRAL_LINK}`
);

const DEFAULT_MESSAGE = `Hi! I'm Joseph Barweh, an authorized agent for the Tolbert Innovation Hub Study Abroad Portal.

Are you interested in studying abroad? We help students get admitted to top universities in India and North Cyprus.

✅ No IELTS required for most programs
✅ Affordable tuition fees
✅ Full support from application to admission

Apply now using my referral link:
${REFERRAL_LINK}`;

const toggleLabels: Record<ToggleKey, { label: string; description: string }> = {
  referralStatusEmail: {
    label: "Referral status changes",
    description: "Get an email when a referred student updates their application status",
  },
  commissionCreditEmail: {
    label: "Commission credited",
    description: "Email notification when a commission payment is processed to your account",
  },
  whatsappAlerts: {
    label: "WhatsApp urgent alerts",
    description: "Receive WhatsApp messages for time-sensitive updates and action required",
  },
  weeklyPerformance: {
    label: "Weekly performance summary",
    description: "A weekly digest of your referrals, conversions, and earnings every Monday",
  },
  scholarshipOpportunities: {
    label: "New scholarship opportunities",
    description: "Be notified when new scholarships are available for your referred students",
  },
};

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex w-12 h-6 items-center rounded-full transition-colors shrink-0 ${
        checked ? "bg-emerald-600" : "bg-slate-200"
      }`}
      aria-checked={checked}
      role="switch"
    >
      <span
        className={`inline-block w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    referralStatusEmail: true,
    commissionCreditEmail: true,
    whatsappAlerts: false,
    weeklyPerformance: true,
    scholarshipOpportunities: true,
  });

  const [linkCopied, setLinkCopied] = useState(false);
  const [customMessage, setCustomMessage] = useState(DEFAULT_MESSAGE);

  const [passwords, setPasswords] = useState<PasswordFields>({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState<PasswordVisibility>({
    current: false,
    next: false,
    confirm: false,
  });
  const [passwordSaved, setPasswordSaved] = useState(false);

  const [deactivateConfirm, setDeactivateConfirm] = useState(false);

  const [settingsSaved, setSettingsSaved] = useState(false);

  const toggleNotification = (key: ToggleKey) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyLink = () => {
    void navigator.clipboard.writeText(REFERRAL_LINK).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
    setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const updatePassword = (field: keyof PasswordFields, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleSavePassword = () => {
    setPasswordSaved(true);
    setPasswords({ current: "", next: "", confirm: "" });
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  const handleSaveAll = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl">
      {/* Section 1: Notification Preferences */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Bell className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Notification Preferences</h3>
            <p className="text-xs text-slate-400">Choose how and when you hear from us</p>
          </div>
        </div>
        <div className="space-y-4">
          {(Object.keys(toggleLabels) as ToggleKey[]).map((key) => (
            <div key={key} className="flex items-start justify-between gap-4 py-2 border-b border-slate-50 last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700">{toggleLabels[key].label}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {toggleLabels[key].description}
                </p>
              </div>
              <Toggle
                checked={notifications[key]}
                onChange={() => toggleNotification(key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Referral Link Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center">
            <Link className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Referral Link Settings</h3>
            <p className="text-xs text-slate-400">Your unique link and sharing tools</p>
          </div>
        </div>

        {/* Referral link display */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Your Referral Link ({REFERRAL_CODE})
          </label>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="flex-1 text-sm font-mono text-slate-600 truncate">{REFERRAL_LINK}</span>
            <button
              onClick={handleCopyLink}
              className="shrink-0 flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {linkCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* QR code + Share buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5">
          {/* QR Code placeholder */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
              <span className="text-xs text-slate-400 font-medium text-center leading-tight px-1">
                QR Code
              </span>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors">
              <Download className="w-3.5 h-3.5" />
              Download QR
            </button>
          </div>

          {/* Share actions */}
          <div className="flex flex-col gap-3 flex-1">
            <a
              href={`https://wa.me/?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-3 rounded-xl transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Share on WhatsApp
            </a>
            <p className="text-xs text-slate-400">
              Opens WhatsApp with your referral link and pitch pre-filled.
            </p>
          </div>
        </div>

        {/* Custom message template */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Custom Referral Message Template
          </label>
          <textarea
            rows={7}
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none font-mono leading-relaxed"
          />
          <p className="text-xs text-slate-400 mt-1.5">
            This message is pre-filled when you share via WhatsApp or other channels.
          </p>
        </div>
      </div>

      {/* Section 3: Account */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
            <Shield className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Account Security</h3>
            <p className="text-xs text-slate-400">Manage password and account access</p>
          </div>
        </div>

        {/* Change Password */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            Change Password
          </h4>
          <div className="space-y-3">
            {(["current", "next", "confirm"] as (keyof PasswordFields)[]).map((field) => {
              const labels: Record<keyof PasswordFields, string> = {
                current: "Current Password",
                next: "New Password",
                confirm: "Confirm New Password",
              };
              return (
                <div key={field} className="relative">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    {labels[field]}
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisibility[field] ? "text" : "password"}
                      value={passwords[field]}
                      onChange={(e) => updatePassword(field, e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-12 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {passwordVisibility[field] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={handleSavePassword}
            className={`mt-4 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
              passwordSaved
                ? "bg-green-500 text-white"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
          >
            {passwordSaved ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" /> Password Updated!
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-slate-100 pt-5">
          <h4 className="text-sm font-bold text-red-600 mb-1 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Danger Zone
          </h4>
          <p className="text-xs text-slate-500 mb-4">
            Deactivating your account will pause all active referrals. Pending commissions will still be processed.
          </p>

          {!deactivateConfirm ? (
            <button
              onClick={() => setDeactivateConfirm(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold border-2 border-red-300 text-red-600 hover:bg-red-50 transition-colors"
            >
              Deactivate Account
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-medium">
                  This will deactivate your agent account. All pending commissions will be processed and paid out. Are you sure?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeactivateConfirm(false)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors">
                  Confirm Deactivation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save All Button */}
      <div className="flex items-center gap-4 pb-4">
        <button
          onClick={handleSaveAll}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-md ${
            settingsSaved
              ? "bg-green-500 text-white shadow-green-200"
              : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90 shadow-emerald-200"
          }`}
        >
          {settingsSaved ? (
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Settings Saved!
            </span>
          ) : (
            "Save All Settings"
          )}
        </button>
        {settingsSaved && (
          <span className="text-green-600 text-sm font-medium">
            All preferences updated successfully.
          </span>
        )}
      </div>
    </div>
  );
}
