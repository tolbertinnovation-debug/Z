"use client";

import { useState } from "react";
import {
  User,
  Star,
  MapPin,
  CheckCircle,
  Shield,
  Lock,
  Globe,
  Briefcase,
  Edit2,
  Check,
} from "lucide-react";

type ProfileTab = "personal" | "professional" | "bank";
type PayoutMethod = "mobile_money" | "bank_transfer" | "paypal";
type MobileProvider = "Orange Money" | "Lonestar MTN";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string;
  dob: string;
  gender: string;
  city: string;
  country: string;
  address: string;
}

interface ProfessionalInfo {
  organization: string;
  website: string;
  linkedin: string;
  bio: string;
}

interface BankInfo {
  payoutMethod: PayoutMethod;
  mobileProvider: MobileProvider;
  mobilePhone: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode: string;
  paypalEmail: string;
  verified: boolean;
}

const initialPersonal: PersonalInfo = {
  firstName: "Joseph",
  lastName: "Barweh",
  email: "j.barweh@agent.com",
  phone: "+231 77 123 4567",
  whatsapp: "+231 77 123 4567",
  dob: "1990-03-15",
  gender: "Male",
  city: "Monrovia",
  country: "Liberia",
  address: "123 Tubman Boulevard, Sinkor",
};

const initialProfessional: ProfessionalInfo = {
  organization: "Barweh Education Consultants",
  website: "https://barwehedu.com",
  linkedin: "https://linkedin.com/in/josephbarweh",
  bio: "Experienced education consultant specializing in international study abroad programs. Helping Liberian students access quality higher education opportunities globally.",
};

const initialBank: BankInfo = {
  payoutMethod: "mobile_money",
  mobileProvider: "Orange Money",
  mobilePhone: "+231 77 123 4567",
  bankName: "",
  accountName: "",
  accountNumber: "",
  swiftCode: "",
  paypalEmail: "",
  verified: false,
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("personal");
  const [personal, setPersonal] = useState<PersonalInfo>(initialPersonal);
  const [professional, setProfessional] = useState<ProfessionalInfo>(initialProfessional);
  const [bank, setBank] = useState<BankInfo>(initialBank);
  const [personalSaved, setPersonalSaved] = useState(false);
  const [professionalSaved, setProfessionalSaved] = useState(false);
  const [bankSaved, setBankSaved] = useState(false);

  const updatePersonal = (key: keyof PersonalInfo, value: string) =>
    setPersonal((prev) => ({ ...prev, [key]: value }));

  const updateProfessional = (key: keyof ProfessionalInfo, value: string) =>
    setProfessional((prev) => ({ ...prev, [key]: value }));

  const updateBank = <K extends keyof BankInfo>(key: K, value: BankInfo[K]) =>
    setBank((prev) => ({ ...prev, [key]: value }));

  const handleSavePersonal = () => {
    setPersonalSaved(true);
    setTimeout(() => setPersonalSaved(false), 3000);
  };

  const handleSaveProfessional = () => {
    setProfessionalSaved(true);
    setTimeout(() => setProfessionalSaved(false), 3000);
  };

  const handleSaveBank = () => {
    setBank((prev) => ({ ...prev, verified: true }));
    setBankSaved(true);
    setTimeout(() => setBankSaved(false), 3000);
  };

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: "personal", label: "Personal Info" },
    { key: "professional", label: "Professional Info" },
    { key: "bank", label: "Bank Details" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur border-2 border-white/30 flex items-center justify-center text-white font-extrabold text-2xl shrink-0">
            JB
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold">Joseph Barweh</h2>
            <p className="text-emerald-200 text-sm mt-0.5">j.barweh@agent.com</p>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-3">
              <span className="flex items-center gap-1 bg-yellow-400/90 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-yellow-700" />
                Gold Agent
              </span>
              <span className="bg-white/15 text-white text-xs font-medium px-3 py-1 rounded-full">
                Code: TIH-JB-2847
              </span>
              <span className="flex items-center gap-1 bg-white/15 text-white text-xs font-medium px-3 py-1 rounded-full">
                <MapPin className="w-3 h-3" />
                Monrovia, Liberia
              </span>
            </div>
            <p className="text-emerald-200 text-xs mt-2">Joined: January 15, 2024</p>
          </div>
          <div className="flex items-center gap-1 bg-white/10 rounded-xl px-3 py-2 text-xs text-emerald-100 cursor-pointer hover:bg-white/20 transition-colors">
            <Edit2 className="w-3.5 h-3.5" />
            Edit Photo
          </div>
        </div>

        {/* Completion bar */}
        <div className="mt-5 pt-5 border-t border-white/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Profile Completion</span>
            <span className="text-emerald-200 text-sm font-bold">80%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-gradient-to-r from-yellow-300 to-emerald-300 rounded-full" />
          </div>
          <p className="text-emerald-200 text-xs mt-2">
            Add bank details to reach 100% and unlock faster payouts.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3.5 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === tab.key
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Personal Info Tab */}
          {activeTab === "personal" && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={personal.firstName}
                    onChange={(e) => updatePersonal("firstName", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={personal.lastName}
                    onChange={(e) => updatePersonal("lastName", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={personal.email}
                  onChange={(e) => updatePersonal("email", e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={personal.phone}
                    onChange={(e) => updatePersonal("phone", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={personal.whatsapp}
                    onChange={(e) => updatePersonal("whatsapp", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={personal.dob}
                    onChange={(e) => updatePersonal("dob", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Gender
                  </label>
                  <select
                    value={personal.gender}
                    onChange={(e) => updatePersonal("gender", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={personal.city}
                    onChange={(e) => updatePersonal("city", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    value={personal.country}
                    onChange={(e) => updatePersonal("country", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Address
                </label>
                <input
                  type="text"
                  value={personal.address}
                  onChange={(e) => updatePersonal("address", e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleSavePersonal}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                    personalSaved
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90"
                  }`}
                >
                  {personalSaved ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" /> Saved!
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                {personalSaved && (
                  <span className="text-green-600 text-sm font-medium">
                    Profile updated successfully.
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Professional Info Tab */}
          {activeTab === "professional" && (
            <div className="space-y-4">
              {/* Read-only fields */}
              <div className="bg-slate-50 rounded-xl p-4 grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Agent ID", value: "TIH-AGT-2847" },
                  { label: "Tier", value: "Gold" },
                  { label: "Commission Rate", value: "12%" },
                  { label: "Join Date", value: "January 15, 2024" },
                  { label: "Total Referrals", value: "47" },
                  { label: "Total Earned", value: "$3,760" },
                ].map((field) => (
                  <div key={field.label}>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                      {field.label}
                    </p>
                    <p className="text-slate-800 font-semibold text-sm">{field.value}</p>
                  </div>
                ))}
              </div>

              {/* Editable fields */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> Organization / Company
                  </span>
                </label>
                <input
                  type="text"
                  value={professional.organization}
                  onChange={(e) => updateProfessional("organization", e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Website URL
                  </span>
                </label>
                <input
                  type="url"
                  value={professional.website}
                  onChange={(e) => updateProfessional("website", e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={professional.linkedin}
                  onChange={(e) => updateProfessional("linkedin", e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Brief Bio
                </label>
                <textarea
                  rows={4}
                  value={professional.bio}
                  onChange={(e) => updateProfessional("bio", e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none"
                />
              </div>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleSaveProfessional}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                    professionalSaved
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90"
                  }`}
                >
                  {professionalSaved ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" /> Saved!
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                {professionalSaved && (
                  <span className="text-green-600 text-sm font-medium">
                    Professional info updated.
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bank Details Tab */}
          {activeTab === "bank" && (
            <div className="space-y-5">
              {/* Payout Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Payout Method
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {(
                    [
                      { value: "mobile_money", label: "Mobile Money" },
                      { value: "bank_transfer", label: "Bank Transfer" },
                      { value: "paypal", label: "PayPal" },
                    ] as { value: PayoutMethod; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateBank("payoutMethod", opt.value)}
                      className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                        bank.payoutMethod === opt.value
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Money Fields */}
              {bank.payoutMethod === "mobile_money" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                      Mobile Money Provider
                    </label>
                    <select
                      value={bank.mobileProvider}
                      onChange={(e) => updateBank("mobileProvider", e.target.value as MobileProvider)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                    >
                      <option>Orange Money</option>
                      <option>Lonestar MTN</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                      Mobile Money Phone Number
                    </label>
                    <input
                      type="tel"
                      value={bank.mobilePhone}
                      onChange={(e) => updateBank("mobilePhone", e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>
              )}

              {/* Bank Transfer Fields */}
              {bank.payoutMethod === "bank_transfer" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={bank.bankName}
                      onChange={(e) => updateBank("bankName", e.target.value)}
                      placeholder="e.g. Liberia Bank for Development"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                        Account Name
                      </label>
                      <input
                        type="text"
                        value={bank.accountName}
                        onChange={(e) => updateBank("accountName", e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={bank.accountNumber}
                        onChange={(e) => updateBank("accountNumber", e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                      Routing / SWIFT Code
                    </label>
                    <input
                      type="text"
                      value={bank.swiftCode}
                      onChange={(e) => updateBank("swiftCode", e.target.value)}
                      placeholder="e.g. LBDCUNMX"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>
              )}

              {/* PayPal Fields */}
              {bank.payoutMethod === "paypal" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    PayPal Email Address
                  </label>
                  <input
                    type="email"
                    value={bank.paypalEmail}
                    onChange={(e) => updateBank("paypalEmail", e.target.value)}
                    placeholder="your@paypal.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              )}

              {/* Verified badge */}
              {bank.verified && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                  <p className="text-green-700 text-sm font-semibold">
                    Payout details verified and active
                  </p>
                </div>
              )}

              {/* Security Notice */}
              <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-700">Your data is secure</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    All banking information is encrypted with AES-256 and stored securely. TIH never shares your payout details with third parties.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveBank}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                    bankSaved
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90"
                  }`}
                >
                  {bankSaved ? (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Details Saved!
                    </span>
                  ) : (
                    "Save Bank Details"
                  )}
                </button>
                {bankSaved && (
                  <span className="text-green-600 text-sm font-medium">
                    Payout details saved securely.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tier Progress */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-800">Tier Progress</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { name: "Bronze", range: "0–10", rate: "8%", active: false },
            { name: "Silver", range: "10–25", rate: "10%", active: false },
            { name: "Gold", range: "25–50", rate: "12%", active: true },
            { name: "Platinum", range: "50+", rate: "15%", active: false },
          ].map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-3 text-center border-2 ${
                tier.active
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-slate-100 bg-slate-50"
              }`}
            >
              <p className={`text-xs font-bold ${tier.active ? "text-emerald-700" : "text-slate-500"}`}>
                {tier.name}
              </p>
              <p className={`text-lg font-extrabold mt-1 ${tier.active ? "text-emerald-700" : "text-slate-400"}`}>
                {tier.rate}
              </p>
              <p className="text-xs text-slate-400">{tier.range}</p>
              {tier.active && (
                <span className="mt-1 inline-block text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-slate-500 text-xs mt-3">
          You have 47 referrals. Reach 50 to unlock <span className="font-bold text-purple-600">Platinum (15%)</span> — just 3 more!
        </p>
      </div>
    </div>
  );
}
