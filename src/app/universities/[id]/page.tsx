"use client";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import Link from "next/link";
import {
  MapPin, Star, Users, DollarSign, Award, ArrowLeft, Globe,
  CheckCircle, BookOpen, Home, Briefcase, Play, ChevronRight,
  GraduationCap, Calendar, ExternalLink, Heart, Share2
} from "lucide-react";
import { universities } from "@/lib/data";

export default function UniversityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const uni = universities.find((u) => u.id === id);
  if (!uni) notFound();

  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);
  const [gpa, setGpa] = useState("");
  const [waec, setWaec] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);

  const checkEligibility = () => {
    const gpaNum = parseFloat(gpa);
    if (!gpaNum || !waec) return;
    if (gpaNum >= 3.5 && (waec === "A" || waec === "B")) setEligibilityResult("eligible");
    else if (gpaNum >= 2.5 && waec !== "F") setEligibilityResult("conditional");
    else setEligibilityResult("not-eligible");
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "programs", label: "Programs" },
    { id: "fees", label: "Tuition & Fees" },
    { id: "scholarships", label: "Scholarships" },
    { id: "admission", label: "Admission" },
    { id: "campus", label: "Campus Life" },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/universities" className="hover:text-blue-600 transition-colors">Universities</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium truncate">{uni.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={uni.gallery[activeImage]} alt={uni.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Gallery thumbnails */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {uni.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? "border-white scale-110" : "border-white/30 hover:border-white/60"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Back button */}
        <Link href="/universities" className="absolute top-4 left-4 flex items-center gap-2 glass text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* University Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 -mt-8 relative z-10 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg shrink-0" style={{ backgroundColor: uni.logoColor }}>
              {uni.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">{uni.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-blue-500" />{uni.city}, {uni.country}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-blue-500" />Est. {uni.established}</span>
                    <span className="flex items-center gap-1"><Award className="w-4 h-4 text-purple-500" />{uni.accreditation}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-500">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-500">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <Link href="/apply" className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-105 transition-all text-sm">
                    Apply Now <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-xl font-black text-slate-900">#{uni.ranking}</p>
                  <p className="text-xs text-slate-500">National Ranking</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-black text-slate-900">
                    {uni.rating} <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <p className="text-xs text-slate-500">Student Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-slate-900">{uni.students.toLocaleString()}+</p>
                  <p className="text-xs text-slate-500">Total Students</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-green-600">{uni.placement}</p>
                  <p className="text-xs text-slate-500">Placement Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {uni.tags.map((tag) => (
              <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">{tag}</span>
            ))}
            {uni.scholarship && (
              <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-semibold">🏆 Scholarship Available</span>
            )}
          </div>
        </div>

        <div className="flex gap-6 pb-12 flex-col lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex overflow-x-auto border-b border-slate-100">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id ? "text-blue-600 border-blue-600 bg-blue-50/50" : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* OVERVIEW */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3">About {uni.name}</h2>
                      <p className="text-slate-600 leading-relaxed">{uni.description}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-3">Key Highlights</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {uni.highlights.map((h) => (
                          <div key={h} className="flex items-start gap-2.5 bg-green-50 rounded-xl p-3">
                            <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 font-medium">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Campus Video */}
                    <div>
                      <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Play className="w-4 h-4 text-blue-600" /> Campus Tour Video
                      </h3>
                      <div className="relative bg-slate-100 rounded-2xl overflow-hidden aspect-video">
                        <iframe
                          src={uni.video}
                          title={`${uni.name} Campus Tour`}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PROGRAMS */}
                {activeTab === "programs" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-600" /> Undergraduate Programs
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {uni.programs.undergraduate.map((p) => (
                          <div key={p} className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl text-sm font-medium text-slate-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-purple-600" /> Postgraduate Programs
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {uni.programs.postgraduate.map((p) => (
                          <div key={p} className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl text-sm font-medium text-slate-700">
                            <div className="w-2 h-2 bg-purple-500 rounded-full shrink-0" />
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* FEES */}
                {activeTab === "fees" && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-slate-900 text-xl">Tuition Fees</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 rounded-xl">
                            <th className="text-left p-3 font-semibold text-slate-600 rounded-l-xl">Level</th>
                            <th className="text-left p-3 font-semibold text-slate-600">Duration</th>
                            <th className="text-left p-3 font-semibold text-slate-600">Annual Tuition</th>
                            <th className="text-left p-3 font-semibold text-slate-600 rounded-r-xl">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { level: "Undergraduate (BTech/BSc)", duration: "4 Years", annual: `$${uni.tuition.min.toLocaleString()}`, total: `$${(uni.tuition.min * 4).toLocaleString()}` },
                            { level: "Undergraduate (BBA/BCom)", duration: "3 Years", annual: `$${uni.tuition.min.toLocaleString()}`, total: `$${(uni.tuition.min * 3).toLocaleString()}` },
                            { level: "Postgraduate (MTech/MSc)", duration: "2 Years", annual: `$${Math.round(uni.tuition.min * 1.3).toLocaleString()}`, total: `$${Math.round(uni.tuition.min * 1.3 * 2).toLocaleString()}` },
                            { level: "MBA", duration: "2 Years", annual: `$${Math.round(uni.tuition.max * 0.8).toLocaleString()}`, total: `$${Math.round(uni.tuition.max * 0.8 * 2).toLocaleString()}` },
                            { level: "PhD Programs", duration: "3–5 Years", annual: `$${Math.round(uni.tuition.min * 1.1).toLocaleString()}`, total: "Varies" },
                          ].map((row) => (
                            <tr key={row.level} className="hover:bg-slate-50 transition-colors">
                              <td className="p-3 font-medium text-slate-800">{row.level}</td>
                              <td className="p-3 text-slate-600">{row.duration}</td>
                              <td className="p-3 text-green-700 font-semibold">{row.annual}/yr</td>
                              <td className="p-3 text-slate-600">{row.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      {[
                        { label: "Accommodation", value: uni.accommodation.cost },
                        { label: "Living Expenses", value: "$150–250/month" },
                        { label: "Health Insurance", value: "$100–200/year" },
                        { label: "Books & Supplies", value: "$200–400/year" },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center bg-slate-50 rounded-xl p-4">
                          <span className="text-sm text-slate-600">{item.label}</span>
                          <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SCHOLARSHIPS */}
                {activeTab === "scholarships" && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-xl mb-4">Available Scholarships</h3>
                    {uni.scholarships.map((s, i) => (
                      <div key={i} className="flex items-start gap-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
                        <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0">
                          🏆
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 mb-1">{s}</h4>
                          <p className="text-sm text-slate-600">Available for eligible students. Contact our counselors for detailed eligibility criteria.</p>
                        </div>
                      </div>
                    ))}
                    <div className="bg-blue-50 rounded-2xl p-5 mt-4">
                      <h4 className="font-bold text-blue-900 mb-2">How to Apply for Scholarships</h4>
                      <ul className="space-y-2 text-sm text-blue-800">
                        {["Submit your application through Tolbert Innovation Hub", "Provide academic transcripts and WAEC results", "Write a compelling personal statement", "Get recommendation letters from teachers", "Our counselors will assist with the scholarship application"].map((step, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* ADMISSION */}
                {activeTab === "admission" && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-slate-900 text-xl">Admission Requirements</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-600" /> For Undergraduate
                        </h4>
                        {["High School Certificate / WAEC", "WAEC Results (5 credits minimum)", "International Passport", "Birth Certificate", "Passport Photos", "Medical Certificate"].map((req) => (
                          <div key={req} className="flex items-center gap-2 py-2 border-b border-slate-100 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {req}
                          </div>
                        ))}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-purple-600" /> For Postgraduate
                        </h4>
                        {["Bachelor's Degree (relevant field)", "Official Academic Transcript", "International Passport", "2 Recommendation Letters", "Personal Statement / SOP", "Work Experience (for MBA)"].map((req) => (
                          <div key={req} className="flex items-center gap-2 py-2 border-b border-slate-100 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {req}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* CAMPUS LIFE */}
                {activeTab === "campus" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-slate-900 text-xl mb-4">Accommodation</h3>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {uni.accommodation.types.map((type) => (
                          <div key={type} className="bg-slate-50 rounded-xl p-4 text-center">
                            <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="font-semibold text-slate-800 text-sm">{type}</p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-slate-600">Accommodation cost: <strong className="text-slate-900">{uni.accommodation.cost}</strong></p>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xl mb-4">Career Opportunities</h3>
                      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-5 border border-green-100">
                        <div className="flex items-center gap-3 mb-3">
                          <Briefcase className="w-6 h-6 text-green-600" />
                          <div>
                            <p className="font-bold text-slate-900">Placement Rate</p>
                            <p className="text-3xl font-black text-green-600">{uni.placement}</p>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          {["On-campus placement drives", "International internship opportunities", "Alumni mentorship network", "Career counseling services"].map((item) => (
                            <li key={item} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-3">Student Life</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {["International Student Club", "Sports & Athletics", "Cultural Festivals", "Research Clubs", "Entrepreneurship Cell", "Student Government"].map((item) => (
                          <div key={item} className="flex items-center gap-2 bg-indigo-50 rounded-xl p-3 text-sm font-medium text-slate-700">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full shrink-0" /> {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-4">
            {/* Apply CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
              <h3 className="font-bold text-xl mb-2">Ready to Apply?</h3>
              <p className="text-blue-100 text-sm mb-5">Start your application today. Our counselors will guide you through the entire process.</p>
              <Link href={`/apply?university=${uni.id}`} className="block w-full text-center py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                Apply Now
              </Link>
              <Link href="/counseling" className="block w-full text-center py-3.5 mt-3 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors text-sm">
                Book Free Counseling
              </Link>
            </div>

            {/* Eligibility Checker */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900 mb-1">Eligibility Checker</h3>
              <p className="text-xs text-slate-500 mb-4">Check if you qualify for admission</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Your GPA / CGPA</label>
                  <input type="number" placeholder="e.g. 3.5" min="0" max="4" step="0.1" value={gpa} onChange={(e) => setGpa(e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Best WAEC Grade</label>
                  <select value={waec} onChange={(e) => setWaec(e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                    <option value="">Select grade</option>
                    {["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"].map((g) => (
                      <option key={g} value={g.charAt(0)}>{g}</option>
                    ))}
                  </select>
                </div>
                <button onClick={checkEligibility} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
                  Check Eligibility
                </button>
                {eligibilityResult && (
                  <div className={`p-4 rounded-xl text-sm font-medium text-center ${eligibilityResult === "eligible" ? "bg-green-50 text-green-800 border border-green-200" : eligibilityResult === "conditional" ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                    {eligibilityResult === "eligible" && "✅ You are Eligible for admission!"}
                    {eligibilityResult === "conditional" && "⚠️ Conditionally Eligible – contact a counselor for guidance."}
                    {eligibilityResult === "not-eligible" && "❌ You may not qualify. Book a counseling session for alternatives."}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-3">
              <h3 className="font-bold text-slate-900 mb-2">Quick Info</h3>
              {[
                { icon: MapPin, label: "Location", value: `${uni.city}, ${uni.country}` },
                { icon: Calendar, label: "Established", value: uni.established.toString() },
                { icon: Users, label: "Students", value: `${uni.students.toLocaleString()}+` },
                { icon: Award, label: "Accreditation", value: uni.accreditation },
                { icon: DollarSign, label: "Tuition Range", value: `$${uni.tuition.min}–$${uni.tuition.max}/yr` },
                { icon: Star, label: "Rating", value: `${uni.rating}/5.0` },
                { icon: Users, label: "Faculty Ratio", value: uni.facultyRatio },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-slate-500 flex-1">{label}</span>
                  <span className="font-semibold text-slate-800 text-right">{value}</span>
                </div>
              ))}
              <a href={uni.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 pt-2 border-t border-slate-100">
                <Globe className="w-4 h-4" /> Official Website <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
