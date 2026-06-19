"use client";
import { useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Star,
  Users,
  BookOpen,
  ExternalLink,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import { universities } from "@/lib/data";

type CountryFilter = "All" | "India" | "North Cyprus";

interface UniversityCardData {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  rating: number;
  image: string;
  students: number;
  programs: {
    undergraduate: string[];
    postgraduate: string[];
  };
}

interface AddUniversityForm {
  name: string;
  country: string;
  city: string;
  ranking: string;
  tuitionMin: string;
  tuitionMax: string;
}

const EMPTY_FORM: AddUniversityForm = {
  name: "",
  country: "India",
  city: "",
  ranking: "",
  tuitionMin: "",
  tuitionMax: "",
};

const COUNTRY_FLAGS: Record<string, string> = {
  India: "🇮🇳",
  "North Cyprus": "🇨🇾",
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < full
              ? "text-amber-400 fill-amber-400"
              : i === full && half
                ? "text-amber-400 fill-amber-200"
                : "text-slate-200 fill-slate-200"
          }`}
        />
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function UniversitiesPage() {
  const [countryFilter, setCountryFilter] = useState<CountryFilter>("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState<AddUniversityForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [localUniversities, setLocalUniversities] =
    useState<UniversityCardData[]>(universities);

  const filtered =
    countryFilter === "All"
      ? localUniversities
      : localUniversities.filter((u) => u.country === countryFilter);

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleAddSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newUni: UniversityCardData = {
      id: `custom-${Date.now()}`,
      name: form.name,
      country: form.country,
      city: form.city,
      ranking: parseInt(form.ranking) || 999,
      rating: 4.0,
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      students: 5000,
      programs: { undergraduate: [], postgraduate: [] },
    };
    setLocalUniversities((prev) => [newUni, ...prev]);
    setForm(EMPTY_FORM);
    setShowAddModal(false);
  }

  function handleDelete(id: string) {
    setLocalUniversities((prev) => prev.filter((u) => u.id !== id));
    setDeletingId(null);
  }

  const FILTER_TABS: CountryFilter[] = ["All", "India", "North Cyprus"];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Universities</h2>
          <p className="text-slate-500 text-sm">
            {localUniversities.length} partner universities
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          Add University
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setCountryFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              countryFilter === tab
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            {tab !== "All" && (
              <span className="mr-1.5">{COUNTRY_FLAGS[tab]}</span>
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* University cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((uni) => {
          const programCount =
            uni.programs.undergraduate.length +
            uni.programs.postgraduate.length;
          const flag = COUNTRY_FLAGS[uni.country] ?? "🌍";

          return (
            <div
              key={uni.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Cover image with overlays */}
              <div className="relative h-32 shrink-0">
                <img
                  src={uni.image}
                  alt={uni.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Flag + ranking overlay */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="text-lg leading-none">{flag}</span>
                </div>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  #{uni.ranking}
                </div>
              </div>

              {/* Card body */}
              <div className="p-4 flex flex-col flex-1">
                {/* Name + location */}
                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-0.5">
                  {uni.name}
                </h3>
                <p className="text-xs text-slate-400 mb-2">
                  {uni.city}, {uni.country}
                </p>

                {/* Rating */}
                <div className="mb-3">
                  <StarRating rating={uni.rating} />
                </div>

                {/* Program count + student count */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                    <span>
                      <span className="font-semibold">{programCount}</span>{" "}
                      programs
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>
                      <span className="font-semibold">
                        {uni.students.toLocaleString()}
                      </span>{" "}
                      students
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto">
                  {deletingId === uni.id ? (
                    <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                      <span className="text-xs text-red-600 font-medium">
                        Confirm delete?
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleDelete(uni.id)}
                          className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : editingId === uni.id ? (
                    <div className="flex items-center justify-between bg-orange-50 border border-orange-100 rounded-xl px-3 py-2">
                      <span className="text-xs text-orange-600 font-medium">
                        Editing mode
                      </span>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        href={`/universities/${uni.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View
                      </Link>
                      <button
                        onClick={() => setEditingId(uni.id)}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingId(uni.id)}
                        className="flex items-center justify-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold rounded-xl transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add University Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  Add University
                </h3>
                <p className="text-slate-500 text-xs">
                  Fill in the details below
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  University Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g. Amity University"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Country *
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleFormChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-white appearance-none focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 pr-10"
                  >
                    <option value="India">India</option>
                    <option value="North Cyprus">North Cyprus</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  City *
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g. Noida"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>

              {/* Ranking */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  National Ranking
                </label>
                <input
                  name="ranking"
                  value={form.ranking}
                  onChange={handleFormChange}
                  type="number"
                  min="1"
                  placeholder="e.g. 42"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>

              {/* Tuition range */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Tuition Range (USD/year)
                </label>
                <div className="flex gap-3">
                  <input
                    name="tuitionMin"
                    value={form.tuitionMin}
                    onChange={handleFormChange}
                    type="number"
                    min="0"
                    placeholder="Min"
                    className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                  <span className="self-center text-slate-400 font-medium">
                    —
                  </span>
                  <input
                    name="tuitionMax"
                    value={form.tuitionMax}
                    onChange={handleFormChange}
                    type="number"
                    min="0"
                    placeholder="Max"
                    className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setForm(EMPTY_FORM);
                  }}
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all"
                >
                  Save University
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
