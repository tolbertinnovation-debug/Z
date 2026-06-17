"use client";
import { X, Star, Users, Award, TrendingUp } from "lucide-react";

interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  rating: number;
  tuition: { min: number; max: number; currency: string };
  students: number;
  programs: { undergraduate: string[]; postgraduate: string[] };
  scholarships: string[];
  accreditation: string;
  placement: string;
  image?: string;
}

interface CompareModalProps {
  universities: University[];
  onClose: () => void;
}

const rows: { label: string; key: string }[] = [
  { label: "Country", key: "country" },
  { label: "City", key: "city" },
  { label: "Ranking", key: "ranking" },
  { label: "Rating", key: "rating" },
  { label: "Tuition (USD/yr)", key: "tuition" },
  { label: "Students", key: "students" },
  { label: "Programs", key: "programs" },
  { label: "Scholarships", key: "scholarships" },
  { label: "Accreditation", key: "accreditation" },
  { label: "Placement Rate", key: "placement" },
];

function getCellValue(uni: University, key: string): string {
  switch (key) {
    case "country":
      return uni.country;
    case "city":
      return uni.city;
    case "ranking":
      return `#${uni.ranking}`;
    case "rating":
      return `${uni.rating} / 5.0`;
    case "tuition":
      return `$${uni.tuition.min.toLocaleString()} – $${uni.tuition.max.toLocaleString()}`;
    case "students":
      return uni.students.toLocaleString() + "+";
    case "programs":
      return `${uni.programs.undergraduate.length + uni.programs.postgraduate.length} programs`;
    case "scholarships":
      return uni.scholarships.length > 0 ? uni.scholarships[0] : "None";
    case "accreditation":
      return uni.accreditation;
    case "placement":
      return uni.placement;
    default:
      return "—";
  }
}

export default function CompareModal({ universities, onClose }: CompareModalProps) {
  if (universities.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-900">University Comparison</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Comparing {universities.length} universities side by side
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-6 py-4 text-slate-500 font-semibold text-xs uppercase tracking-wider w-40 sticky left-0 bg-slate-50">
                  Feature
                </th>
                {universities.map((uni) => (
                  <th key={uni.id} className="px-6 py-4 text-center min-w-48">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-amber-600 font-bold text-sm">{uni.rating}</span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm leading-tight">{uni.name}</p>
                      <p className="text-xs text-slate-500">
                        {uni.city}, {uni.country}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.key} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td
                    className={`px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider sticky left-0 ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }`}
                  >
                    {row.label}
                  </td>
                  {universities.map((uni) => (
                    <td key={uni.id} className="px-6 py-4 text-center text-slate-700">
                      {row.key === "ranking" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-bold text-xs">
                          <TrendingUp className="w-3 h-3" /> #{uni.ranking}
                        </span>
                      ) : row.key === "rating" ? (
                        <span className="inline-flex items-center gap-1 font-bold text-slate-900">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {uni.rating}
                        </span>
                      ) : row.key === "students" ? (
                        <span className="inline-flex items-center gap-1 text-slate-700">
                          <Users className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {uni.students.toLocaleString()}+
                        </span>
                      ) : row.key === "scholarships" ? (
                        <span className="inline-flex items-center gap-1 text-green-700 text-xs font-medium">
                          <Award className="w-3.5 h-3.5" />{" "}
                          {uni.scholarships.length > 0
                            ? uni.scholarships[0].split("(")[0].trim()
                            : "None"}
                        </span>
                      ) : (
                        <span>{getCellValue(uni, row.key)}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex gap-3 justify-end flex-wrap">
          {universities.map((uni) => (
            <a
              key={uni.id}
              href={`/universities/${uni.id}`}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              View {uni.name.split(" ").slice(0, 2).join(" ")}
            </a>
          ))}
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
