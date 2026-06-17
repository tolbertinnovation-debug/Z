"use client";
import { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal, MapPin, GraduationCap, X } from "lucide-react";
import { universities } from "@/lib/data";
import UniversityCard from "@/components/UniversityCard";

const countries = ["All Countries", "India", "North Cyprus"];
const degrees = ["All Degrees", "Undergraduate", "Postgraduate", "MBA", "PhD", "Medical"];
const budgets = ["Any Budget", "< $2,000/yr", "$2,000–$5,000/yr", "> $5,000/yr"];

export default function UniversitiesPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [degree, setDegree] = useState("All Degrees");
  const [budget, setBudget] = useState("Any Budget");
  const [scholarship, setScholarship] = useState(false);
  const [sortBy, setSortBy] = useState("ranking");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...universities];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          u.country.toLowerCase().includes(q) ||
          u.programs.undergraduate.some((p) => p.toLowerCase().includes(q)) ||
          u.programs.postgraduate.some((p) => p.toLowerCase().includes(q)) ||
          u.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (country !== "All Countries") list = list.filter((u) => u.country === country);
    if (scholarship) list = list.filter((u) => u.scholarship);

    if (budget === "< $2,000/yr") list = list.filter((u) => u.tuition.min < 2000);
    else if (budget === "$2,000–$5,000/yr") list = list.filter((u) => u.tuition.min >= 2000 && u.tuition.max <= 5000);
    else if (budget === "> $5,000/yr") list = list.filter((u) => u.tuition.max > 5000);

    if (degree !== "All Degrees") {
      list = list.filter((u) =>
        degree === "Undergraduate"
          ? u.programs.undergraduate.length > 0
          : u.programs.postgraduate.some((p) => p.toLowerCase().includes(degree.toLowerCase()))
      );
    }

    if (sortBy === "ranking") list.sort((a, b) => a.ranking - b.ranking);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "tuition_low") list.sort((a, b) => a.tuition.min - b.tuition.min);
    else if (sortBy === "tuition_high") list.sort((a, b) => b.tuition.min - a.tuition.min);

    return list;
  }, [search, country, degree, budget, scholarship, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setCountry("All Countries");
    setDegree("All Degrees");
    setBudget("Any Budget");
    setScholarship(false);
    setSortBy("ranking");
  };

  const hasFilters = search || country !== "All Countries" || degree !== "All Degrees" || budget !== "Any Budget" || scholarship;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <GraduationCap className="w-4 h-4" />
            17 Partner Universities
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">University Directory</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Browse all partner universities. Filter by country, program, tuition, and scholarship availability to find your perfect match.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex gap-3 max-w-2xl">
            <div className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-xl">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search universities, programs, countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-sm outline-none border-none p-0"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-4 rounded-2xl font-semibold text-sm transition-all ${showFilters ? "bg-blue-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"} shadow-xl`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasFilters && <span className="w-2 h-2 bg-amber-400 rounded-full" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <h3 className="font-semibold text-slate-900">Filters</h3>
              </div>
              {hasFilters && (
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Clear all filters
                </button>
              )}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  {countries.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Degree Level</label>
                <select value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  {degrees.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Annual Budget</label>
                <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  {budgets.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Sort By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option value="ranking">Best Ranking</option>
                  <option value="rating">Highest Rated</option>
                  <option value="tuition_low">Lowest Tuition</option>
                  <option value="tuition_high">Highest Tuition</option>
                </select>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={scholarship} onChange={(e) => setScholarship(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600" />
                <span className="text-sm text-slate-700 font-medium">Show only universities with scholarships</span>
              </label>
            </div>
          </div>
        )}

        {/* Country Pills */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${country === c ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-blue-600"}`}
            >
              {c === "India" && "🇮🇳"}
              {c === "North Cyprus" && "🇨🇾"}
              {c}
            </button>
          ))}
          <button
            onClick={() => setScholarship(!scholarship)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${scholarship ? "bg-amber-500 text-white shadow-md shadow-amber-200" : "bg-white text-slate-600 border border-slate-200 hover:border-amber-200 hover:text-amber-600"}`}
          >
            🏆 Scholarships Available
          </button>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-500 text-sm">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of {universities.length} universities
            {hasFilters && <span className="text-blue-600 font-medium"> (filtered)</span>}
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="w-4 h-4" />
            <span>India & North Cyprus</span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((uni) => (
              <UniversityCard key={uni.id} uni={uni} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No universities found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filters to find more results.</p>
            <button onClick={clearFilters} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
