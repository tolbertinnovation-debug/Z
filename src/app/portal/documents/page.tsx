"use client";

import { useState } from "react";
import {
  FileText, Upload, CheckCircle, AlertCircle, Clock,
  UploadCloud, RefreshCw, X,
} from "lucide-react";

type DocStatus = "uploaded" | "missing" | "under-review";

interface Document {
  name: string;
  status: DocStatus;
  uploadDate?: string;
  urgent?: boolean;
  required: boolean;
}

const DOCUMENTS: Document[] = [
  // Required
  { name: "International Passport", status: "uploaded", uploadDate: "Jan 12, 2024", required: true },
  { name: "Academic Transcript", status: "uploaded", uploadDate: "Jan 12, 2024", required: true },
  { name: "WAEC/WASSCE Result", status: "missing", required: true, urgent: true },
  { name: "Passport Photo", status: "missing", required: true },
  { name: "Birth Certificate", status: "uploaded", uploadDate: "Jan 13, 2024", required: true },
  { name: "Medical Certificate", status: "uploaded", uploadDate: "Jan 14, 2024", required: true },
  // Optional
  { name: "Recommendation Letter", status: "uploaded", uploadDate: "Jan 13, 2024", required: false },
  { name: "Personal Statement", status: "uploaded", uploadDate: "Jan 13, 2024", required: false },
];

const STATUS_CONFIG: Record<DocStatus, { label: string; color: string; icon: React.ElementType }> = {
  uploaded: { label: "Uploaded ✓", color: "bg-green-100 text-green-700", icon: CheckCircle },
  missing: { label: "Missing", color: "bg-red-100 text-red-700", icon: AlertCircle },
  "under-review": { label: "Under Review", color: "bg-amber-100 text-amber-700", icon: Clock },
};

function DocumentCard({ doc }: { doc: Document }) {
  const cfg = STATUS_CONFIG[doc.status];
  const StatusIcon = cfg.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-md hover:border-slate-200 transition-all duration-200 flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          doc.status === "uploaded" ? "bg-green-50" : "bg-red-50"
        }`}
      >
        {doc.status === "uploaded" ? (
          <FileText className="w-5 h-5 text-green-600" />
        ) : (
          <Upload className="w-5 h-5 text-red-500" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900">{doc.name}</h3>
              {doc.urgent && (
                <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wide">
                  Urgent
                </span>
              )}
            </div>
            {doc.uploadDate && (
              <p className="text-xs text-slate-400 mt-0.5">Uploaded {doc.uploadDate}</p>
            )}
            {doc.status === "missing" && (
              <p className="text-xs text-slate-400 mt-0.5">Not yet uploaded</p>
            )}
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
            <StatusIcon className="w-3 h-3" />
            {cfg.label}
          </span>
        </div>

        <div className="flex gap-2 mt-3">
          {doc.status === "missing" && (
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors">
              <Upload className="w-3.5 h-3.5" /> Upload Now
            </button>
          )}
          {doc.status === "uploaded" && (
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Replace
            </button>
          )}
          {doc.status === "under-review" && (
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50 text-xs font-medium text-amber-600 hover:bg-amber-100 transition-colors">
              <Clock className="w-3.5 h-3.5" /> Under Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const [dragging, setDragging] = useState(false);
  const [successDismissed, setSuccessDismissed] = useState(false);

  const required = DOCUMENTS.filter((d) => d.required);
  const optional = DOCUMENTS.filter((d) => !d.required);
  const uploaded = DOCUMENTS.filter((d) => d.status === "uploaded").length;
  const total = DOCUMENTS.length;
  const allComplete = uploaded === total;
  const progressPct = Math.round((uploaded / total) * 100);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Document Center</h1>
        <p className="text-slate-500 text-sm mt-0.5">Upload and manage your application documents</p>
      </div>

      {/* All Complete Banner */}
      {allComplete && !successDismissed && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-800">All documents submitted!</p>
            <p className="text-xs text-green-600 mt-0.5">Your application is complete and under review.</p>
          </div>
          <button onClick={() => setSuccessDismissed(true)} className="text-green-500 hover:text-green-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Completion Meter */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Overall Completion</h2>
            <p className="text-xs text-slate-400 mt-0.5">{uploaded} of {total} documents uploaded</p>
          </div>
          <span className={`text-2xl font-bold ${progressPct === 100 ? "text-green-600" : progressPct >= 60 ? "text-amber-500" : "text-red-500"}`}>
            {progressPct}%
          </span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              progressPct === 100 ? "bg-green-500" : progressPct >= 60 ? "bg-amber-400" : "bg-red-400"
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-slate-400">{uploaded} uploaded</span>
          <span className="text-xs text-slate-400">{total - uploaded} remaining</span>
        </div>
      </div>

      {/* Required Documents */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-slate-900">Required Documents</h2>
          <span className="text-xs text-slate-400">{required.filter(d => d.status === "uploaded").length}/{required.length} uploaded</span>
        </div>
        <div className="space-y-3">
          {required.map((doc) => (
            <DocumentCard key={doc.name} doc={doc} />
          ))}
        </div>
      </div>

      {/* Optional Documents */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-slate-900">Optional Documents</h2>
          <span className="text-xs text-slate-400">{optional.filter(d => d.status === "uploaded").length}/{optional.length} uploaded</span>
        </div>
        <div className="space-y-3">
          {optional.map((doc) => (
            <DocumentCard key={doc.name} doc={doc} />
          ))}
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); }}
        className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 ${
          dragging ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"
        }`}
      >
        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-3">
          <UploadCloud className={`w-6 h-6 ${dragging ? "text-blue-500" : "text-slate-400"}`} />
        </div>
        <p className="text-sm font-semibold text-slate-700">
          {dragging ? "Drop your file here" : "Drag & drop files here"}
        </p>
        <p className="text-xs text-slate-400 mt-1">or click to browse — PDF, JPG, PNG up to 10MB</p>
        <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
          <Upload className="w-4 h-4" /> Browse Files
        </button>
      </div>
    </div>
  );
}
