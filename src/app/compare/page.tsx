"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GitCompare, X, CheckSquare, Square, ArrowRight } from "lucide-react";
import { universities } from "@/lib/data";
import CompareModal from "@/components/CompareModal";

function ComparePage() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];
  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds.slice(0, 3));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (initialIds.length >= 2) setShowModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const selectedUniversities = universities.filter((u) => selectedIds.includes(u.id));

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <GitCompare className="w-4 h-4" /> Compare Universities
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Compare Universities</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Select up to 3 universities to compare side by side. Compare rankings, tuition, programs, and more.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selection bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-sm font-semibold text-slate-700">
              Selected: <span className="text-blue-600">{selectedIds.length}/3</span>
            </p>
            {selectedUniversities.map((uni) => (
              <span
                key={uni.id}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {uni.name.split(" ").slice(0, 2).join(" ")}
                <button onClick={() => toggleSelect(uni.id)} className="hover:text-blue-900">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          <button
            onClick={() => setShowModal(true)}
            disabled={selectedIds.length < 2}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            <GitCompare className="w-4 h-4" /> Compare Now
          </button>
        </div>

        {/* University grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {universities.map((uni) => {
            const isSelected = selectedIds.includes(uni.id);
            const isDisabled = !isSelected && selectedIds.length >= 3;
            return (
              <div
                key={uni.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-blue-500 shadow-blue-100 shadow-lg"
                    : isDisabled
                    ? "border-slate-100 opacity-60 cursor-not-allowed"
                    : "border-slate-100 hover:border-blue-300 hover:shadow-md"
                }`}
                onClick={() => !isDisabled && toggleSelect(uni.id)}
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 right-3">
                    {isSelected ? (
                      <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <CheckSquare className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 bg-white/80 rounded-full flex items-center justify-center">
                        <Square className="w-4 h-4 text-slate-500" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                      #{uni.ranking}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-sm mb-0.5 line-clamp-1">{uni.name}</h3>
                  <p className="text-xs text-slate-500 mb-2">
                    {uni.city}, {uni.country}
                  </p>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="font-medium text-blue-600">⭐ {uni.rating}</span>
                    <span>${uni.tuition.min.toLocaleString()}/yr</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedIds.length < 2 && (
          <div className="text-center mt-12 py-8">
            <p className="text-slate-500 text-sm">Select at least 2 universities to compare.</p>
            <Link
              href="/universities"
              className="inline-flex items-center gap-2 mt-3 text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              Browse All Universities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {showModal && selectedUniversities.length >= 2 && (
        <CompareModal universities={selectedUniversities} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}

export default function ComparePageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ComparePage />
    </Suspense>
  );
}
