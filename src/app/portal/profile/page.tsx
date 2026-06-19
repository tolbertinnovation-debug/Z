"use client";
import { useState } from "react";
import {
  User, Mail, Phone, MapPin, Calendar, Globe, BookOpen,
  Camera, Save, CheckCircle, GraduationCap, FileText, Shield
} from "lucide-react";
import toast from "react-hot-toast";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string;
  dob: string;
  gender: string;
  nationality: string;
  address: string;
  city: string;
  country: string;
  highSchool: string;
  graduationYear: string;
  gpa: string;
  waecGrade: string;
  passportNumber: string;
  passportExpiry: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
}

const initial: Profile = {
  firstName: "Emmanuel", lastName: "Kollie", email: "e.kollie@email.com",
  phone: "+231 770 000 001", whatsapp: "+231 770 000 001", dob: "2000-05-15",
  gender: "Male", nationality: "Liberian", address: "123 Broad Street",
  city: "Monrovia", country: "Liberia", highSchool: "St. Patrick's High School",
  graduationYear: "2022", gpa: "3.7", waecGrade: "B+", passportNumber: "LB1234567",
  passportExpiry: "2029-05-15", emergencyName: "John Kollie",
  emergencyPhone: "+231 770 000 002", emergencyRelation: "Father",
};

export default function ProfilePage() {
  const [form, setForm] = useState<Profile>(initial);
  const [activeTab, setActiveTab] = useState("personal");
  const [saved, setSaved] = useState(false);

  const update = (k: keyof Profile, v: string) => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    setSaved(true);
    toast.success("Profile saved successfully!");
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "academic", label: "Academic", icon: GraduationCap },
    { id: "passport", label: "Passport & ID", icon: Shield },
    { id: "emergency", label: "Emergency Contact", icon: Phone },
  ];

  const Field = ({ label, value, onChange, type = "text", options }: {
    label: string; value: string; onChange: (v: string) => void;
    type?: string; options?: string[];
  }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
      )}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      {/* Profile header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-black backdrop-blur-sm">
              EK
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-black">{form.firstName} {form.lastName}</h2>
            <p className="text-blue-200 text-sm">{form.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-semibold">🇱🇷 Liberian Student</span>
              <span className="px-2.5 py-0.5 bg-green-500/30 rounded-full text-xs font-semibold">Active</span>
            </div>
          </div>
        </div>
        {/* Completion */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold text-blue-100">Profile Completion</span>
            <span className="text-sm font-bold">85%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: "85%" }} />
          </div>
          <p className="text-xs text-blue-200 mt-1">Add your WAEC result to complete your profile</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === t.id ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        {activeTab === "personal" && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Personal Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="First Name" value={form.firstName} onChange={v => update("firstName", v)} />
              <Field label="Last Name" value={form.lastName} onChange={v => update("lastName", v)} />
              <Field label="Email Address" value={form.email} onChange={v => update("email", v)} type="email" />
              <Field label="Phone Number" value={form.phone} onChange={v => update("phone", v)} type="tel" />
              <Field label="WhatsApp Number" value={form.whatsapp} onChange={v => update("whatsapp", v)} type="tel" />
              <Field label="Date of Birth" value={form.dob} onChange={v => update("dob", v)} type="date" />
              <Field label="Gender" value={form.gender} onChange={v => update("gender", v)} options={["Male", "Female", "Prefer not to say"]} />
              <Field label="Nationality" value={form.nationality} onChange={v => update("nationality", v)} />
            </div>
            <hr className="border-slate-100" />
            <h4 className="font-semibold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" /> Address
            </h4>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <Field label="Street Address" value={form.address} onChange={v => update("address", v)} />
              </div>
              <Field label="City" value={form.city} onChange={v => update("city", v)} />
              <Field label="Country" value={form.country} onChange={v => update("country", v)} />
            </div>
          </div>
        )}

        {activeTab === "academic" && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" /> Academic Background
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <Field label="High School / Secondary School" value={form.highSchool} onChange={v => update("highSchool", v)} />
              </div>
              <Field label="Year of Graduation" value={form.graduationYear} onChange={v => update("graduationYear", v)} />
              <Field label="Overall GPA / Grade Average" value={form.gpa} onChange={v => update("gpa", v)} />
              <Field label="WAEC/WASSCE Best Grade" value={form.waecGrade} onChange={v => update("waecGrade", v)} options={["A", "B+", "B", "C+", "C", "D", "F"]} />
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Academic Profile Score
              </p>
              <p className="text-xs text-blue-600 mt-1">Based on your GPA of {form.gpa} and WAEC grade {form.waecGrade}, you qualify for <strong>Merit Excellence Scholarships</strong> at 12 partner universities.</p>
            </div>
          </div>
        )}

        {activeTab === "passport" && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" /> Passport & Identification
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Passport Number" value={form.passportNumber} onChange={v => update("passportNumber", v)} />
              <Field label="Passport Expiry Date" value={form.passportExpiry} onChange={v => update("passportExpiry", v)} type="date" />
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm font-semibold text-amber-800 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Passport Validity Check
              </p>
              <p className="text-xs text-amber-700 mt-1">Your passport expires on {new Date(form.passportExpiry).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. Most universities require at least 2 years validity. You are good to go!</p>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
              <Globe className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500 font-medium">Upload Passport Bio-data Page</p>
              <p className="text-xs text-slate-400 mt-1">PDF, JPG or PNG · Max 5MB</p>
              <button className="mt-3 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                Choose File
              </button>
            </div>
          </div>
        )}

        {activeTab === "emergency" && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" /> Emergency Contact
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <Field label="Full Name" value={form.emergencyName} onChange={v => update("emergencyName", v)} />
              </div>
              <Field label="Phone Number" value={form.emergencyPhone} onChange={v => update("emergencyPhone", v)} type="tel" />
              <Field label="Relationship" value={form.emergencyRelation} onChange={v => update("emergencyRelation", v)} options={["Father", "Mother", "Sibling", "Guardian", "Spouse", "Other"]} />
            </div>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Last saved: Just now</p>
          <button
            onClick={save}
            className={`flex items-center gap-2 px-6 py-2.5 font-bold text-sm rounded-xl transition-all ${
              saved ? "bg-green-500 text-white" : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.02]"
            }`}
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
