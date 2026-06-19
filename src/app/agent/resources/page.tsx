"use client";

import { useState } from "react";
import {
  FileText,
  Video,
  BookOpen,
  Download,
  Copy,
  Check,
  Mail,
  MessageCircle,
  ExternalLink,
  Archive,
} from "lucide-react";

type Category = "All" | "Marketing" | "Training" | "Documents";

type Resource = {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  fileType: string;
  fileMeta: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  action: "Download" | "View";
};

const resources: Resource[] = [
  {
    id: 1,
    title: "Agent Handbook 2024",
    category: "Training",
    description: "Comprehensive guide covering everything you need to know as a Tolbert Innovation Hub agent.",
    fileType: "PDF",
    fileMeta: "48 pages",
    icon: BookOpen,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    action: "Download",
  },
  {
    id: 2,
    title: "Commission Structure Guide",
    category: "Documents",
    description: "Detailed breakdown of commission tiers, rates, and payout schedules for all agent levels.",
    fileType: "PDF",
    fileMeta: "8 pages",
    icon: FileText,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-100",
    action: "Download",
  },
  {
    id: 3,
    title: "Student Application Guide",
    category: "Marketing",
    description: "Share this guide with prospective students to walk them through the application process.",
    fileType: "PDF",
    fileMeta: "12 pages",
    icon: FileText,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    action: "Download",
  },
  {
    id: 4,
    title: "India Universities Brochure",
    category: "Marketing",
    description: "Showcase all Indian partner universities with courses, fees, and admission requirements.",
    fileType: "PDF",
    fileMeta: "24 pages",
    icon: FileText,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    action: "Download",
  },
  {
    id: 5,
    title: "North Cyprus Universities Brochure",
    category: "Marketing",
    description: "Detailed showcase of North Cyprus partner universities, programs, and campus life.",
    fileType: "PDF",
    fileMeta: "16 pages",
    icon: FileText,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    action: "Download",
  },
  {
    id: 6,
    title: "Social Media Templates Pack",
    category: "Marketing",
    description: "Ready-to-use Instagram, Facebook, and WhatsApp templates to promote your referral link.",
    fileType: "ZIP",
    fileMeta: "24 files",
    icon: Archive,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
    action: "Download",
  },
  {
    id: 7,
    title: "Referral Portal Tutorial",
    category: "Training",
    description: "Step-by-step video walkthrough of the agent portal — tracking referrals, earnings, and more.",
    fileType: "Video",
    fileMeta: "22 min",
    icon: Video,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
    action: "View",
  },
  {
    id: 8,
    title: "WAEC Requirements Guide",
    category: "Documents",
    description: "Official WAEC document requirements for Liberian students applying through the portal.",
    fileType: "PDF",
    fileMeta: "6 pages",
    icon: FileText,
    iconColor: "text-slate-600",
    iconBg: "bg-slate-100",
    action: "Download",
  },
  {
    id: 9,
    title: "Scholarship Opportunities 2024",
    category: "Marketing",
    description: "A comprehensive list of scholarships available for students referred through TIH agents.",
    fileType: "PDF",
    fileMeta: "20 pages",
    icon: FileText,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
    action: "Download",
  },
];

const categoryFilters: Category[] = ["All", "Marketing", "Training", "Documents"];

const categoryBadgeClass: Record<Exclude<Category, "All">, string> = {
  Marketing: "bg-blue-100 text-blue-700",
  Training: "bg-emerald-100 text-emerald-700",
  Documents: "bg-slate-100 text-slate-600",
};

const REFERRAL_LINK = "https://portal.tolbertinnovation.com/apply?ref=TIH-JB-2024";

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [copied, setCopied] = useState(false);

  const filtered =
    activeCategory === "All" ? resources : resources.filter((r) => r.category === activeCategory);

  const handleCopy = () => {
    void navigator.clipboard.writeText(REFERRAL_LINK).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome Banner / Referral Link */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-lg">
        <p className="text-emerald-200 text-sm font-medium mb-1">Your Unique Referral Link</p>
        <h2 className="text-xl font-bold mb-4">Share & Earn Commissions</h2>
        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
          <span className="flex-1 text-sm font-mono truncate text-emerald-100">{REFERRAL_LINK}</span>
          <button
            onClick={handleCopy}
            className="shrink-0 flex items-center gap-1.5 bg-white text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-emerald-200 text-xs mt-3">
          Every student who applies using your link is automatically attributed to you.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categoryFilters.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              activeCategory === cat
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
            }`}
          >
            {cat}
            {cat !== "All" && (
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                {resources.filter((r) => r.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((resource) => (
          <div
            key={resource.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col hover:shadow-md hover:border-emerald-200 transition-all"
          >
            {/* Icon + Category Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${resource.iconBg} flex items-center justify-center shrink-0`}>
                <resource.icon className={`w-6 h-6 ${resource.iconColor}`} />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryBadgeClass[resource.category]}`}>
                {resource.category}
              </span>
            </div>

            {/* Title + Description */}
            <h3 className="font-bold text-slate-800 text-sm mb-1">{resource.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-4">{resource.description}</p>

            {/* File type badge + Action */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                  {resource.fileType}
                </span>
                <span className="text-xs text-slate-400">{resource.fileMeta}</span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                {resource.action === "Download" ? (
                  <Download className="w-3.5 h-3.5" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5" />
                )}
                {resource.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact / Help Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <h3 className="font-bold text-slate-800 mb-1">Need Help?</h3>
        <p className="text-slate-500 text-sm mb-4">
          Our agent support team is available Monday–Friday, 9am–6pm WAT.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:agents@tolbertinnovation.com"
            className="flex items-center gap-3 flex-1 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl px-4 py-3 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
                Email Support
              </p>
              <p className="text-xs text-slate-400">agents@tolbertinnovation.com</p>
            </div>
          </a>
          <a
            href="https://wa.me/231770000000?text=Hello%20TIH%20Agent%20Support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 flex-1 bg-slate-50 hover:bg-green-50 border border-slate-200 hover:border-green-300 rounded-xl px-4 py-3 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 group-hover:text-green-700 transition-colors">
                WhatsApp Support
              </p>
              <p className="text-xs text-slate-400">+231 77 000 0000</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
