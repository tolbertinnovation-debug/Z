"use client";

import { useState } from "react";
import {
  Eye,
  Check,
  X,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

type DocStatus = "pending" | "approved" | "rejected";
type DocType =
  | "Passport"
  | "WAEC Result"
  | "Bank Statement"
  | "Transcript"
  | "Photo";
type FilterTab = "all" | DocStatus;

interface Document {
  id: number;
  studentName: string;
  studentEmail: string;
  avatarInitials: string;
  avatarColor: string;
  docType: DocType;
  uploadDate: string;
  fileSize: string;
  status: DocStatus;
}

const initialDocuments: Document[] = [
  {
    id: 1,
    studentName: "James Kollie",
    studentEmail: "james.kollie@email.com",
    avatarInitials: "JK",
    avatarColor: "bg-orange-500",
    docType: "Passport",
    uploadDate: "Jun 18, 2026",
    fileSize: "2.4 MB",
    status: "pending",
  },
  {
    id: 2,
    studentName: "Mary Flomo",
    studentEmail: "mary.flomo@email.com",
    avatarInitials: "MF",
    avatarColor: "bg-rose-500",
    docType: "WAEC Result",
    uploadDate: "Jun 18, 2026",
    fileSize: "1.1 MB",
    status: "approved",
  },
  {
    id: 3,
    studentName: "David Togba",
    studentEmail: "david.togba@email.com",
    avatarInitials: "DT",
    avatarColor: "bg-amber-500",
    docType: "Bank Statement",
    uploadDate: "Jun 17, 2026",
    fileSize: "3.7 MB",
    status: "pending",
  },
  {
    id: 4,
    studentName: "Sarah Kamara",
    studentEmail: "sarah.kamara@email.com",
    avatarInitials: "SK",
    avatarColor: "bg-red-500",
    docType: "Transcript",
    uploadDate: "Jun 17, 2026",
    fileSize: "0.9 MB",
    status: "rejected",
  },
  {
    id: 5,
    studentName: "Emmanuel Pewee",
    studentEmail: "e.pewee@email.com",
    avatarInitials: "EP",
    avatarColor: "bg-orange-600",
    docType: "Photo",
    uploadDate: "Jun 16, 2026",
    fileSize: "0.3 MB",
    status: "approved",
  },
  {
    id: 6,
    studentName: "Grace Mulbah",
    studentEmail: "grace.mulbah@email.com",
    avatarInitials: "GM",
    avatarColor: "bg-rose-600",
    docType: "Passport",
    uploadDate: "Jun 16, 2026",
    fileSize: "2.1 MB",
    status: "pending",
  },
  {
    id: 7,
    studentName: "Isaac Sumo",
    studentEmail: "isaac.sumo@email.com",
    avatarInitials: "IS",
    avatarColor: "bg-amber-600",
    docType: "WAEC Result",
    uploadDate: "Jun 15, 2026",
    fileSize: "1.8 MB",
    status: "approved",
  },
  {
    id: 8,
    studentName: "Patience Sirleaf",
    studentEmail: "p.sirleaf@email.com",
    avatarInitials: "PS",
    avatarColor: "bg-red-600",
    docType: "Bank Statement",
    uploadDate: "Jun 15, 2026",
    fileSize: "4.2 MB",
    status: "rejected",
  },
  {
    id: 9,
    studentName: "Moses Dahn",
    studentEmail: "moses.dahn@email.com",
    avatarInitials: "MD",
    avatarColor: "bg-orange-500",
    docType: "Transcript",
    uploadDate: "Jun 14, 2026",
    fileSize: "1.5 MB",
    status: "pending",
  },
  {
    id: 10,
    studentName: "Comfort Weah",
    studentEmail: "comfort.weah@email.com",
    avatarInitials: "CW",
    avatarColor: "bg-rose-500",
    docType: "Photo",
    uploadDate: "Jun 14, 2026",
    fileSize: "0.4 MB",
    status: "approved",
  },
];

const DOC_TYPE_COLORS: Record<DocType, string> = {
  Passport: "bg-blue-100 text-blue-700",
  "WAEC Result": "bg-purple-100 text-purple-700",
  "Bank Statement": "bg-green-100 text-green-700",
  Transcript: "bg-yellow-100 text-yellow-700",
  Photo: "bg-pink-100 text-pink-700",
};

const STATUS_CONFIG: Record<
  DocStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700",
    icon: <Clock className="w-3 h-3" />,
  },
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-700",
    icon: <CheckCircle className="w-3 h-3" />,
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-700",
    icon: <XCircle className="w-3 h-3" />,
  },
};

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered =
    activeTab === "all"
      ? documents
      : documents.filter((d) => d.status === activeTab);

  const pendingCount = documents.filter((d) => d.status === "pending").length;
  const approvedToday = documents.filter((d) => d.status === "approved").length;
  const rejectedCount = documents.filter((d) => d.status === "rejected").length;

  function updateStatus(id: number, status: DocStatus) {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Document Review</h1>
        <p className="text-slate-500 text-sm mt-1">
          Review and process student document submissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{pendingCount}</p>
            <p className="text-xs text-slate-500">Pending Review</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{approvedToday}</p>
            <p className="text-xs text-slate-500">Approved Today</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{rejectedCount}</p>
            <p className="text-xs text-slate-500">Rejected</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-white text-orange-600 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Document List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-500 font-medium">No documents found</p>
          <p className="text-slate-400 text-sm">
            No {activeTab === "all" ? "" : activeTab} documents at this time.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((doc) => {
            const statusCfg = STATUS_CONFIG[doc.status];
            return (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4"
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full ${doc.avatarColor} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}
                >
                  {doc.avatarInitials}
                </div>

                {/* Student Info */}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-800 text-sm">
                    {doc.studentName}
                  </p>
                  <p className="text-slate-500 text-xs truncate">
                    {doc.studentEmail}
                  </p>
                </div>

                {/* Doc Type Badge */}
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${DOC_TYPE_COLORS[doc.docType]} flex-shrink-0`}
                >
                  {doc.docType}
                </span>

                {/* Meta */}
                <div className="text-xs text-slate-500 flex-shrink-0 hidden sm:block">
                  <p>{doc.uploadDate}</p>
                  <p>{doc.fileSize}</p>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusCfg.className} flex-shrink-0`}
                >
                  {statusCfg.icon}
                  {statusCfg.label}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateStatus(doc.id, "approved")}
                    disabled={doc.status === "approved"}
                    className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateStatus(doc.id, "rejected")}
                    disabled={doc.status === "rejected"}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
