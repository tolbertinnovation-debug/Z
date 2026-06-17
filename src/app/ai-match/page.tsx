"use client";
import { useState } from "react";
import Link from "next/link";
import { Brain, ChevronRight, ChevronLeft, Sparkles, Star, ArrowRight, RotateCcw } from "lucide-react";
import { universities } from "@/lib/data";

interface Answers {
  degreeLevel: string;
  field: string;
  budget: string;
  country: string;
  scholarship: string;
  gpa: string;
}

interface MatchResult {
  id: string;
  name: string;
  country: string;
  city: string;
  rating: number;
  ranking: number;
  tuition: { min: number; max: number; currency: string };
  image: string;
  matchScore: number;
  matchReason: string;
}

const questions = [
  {
    id: "degreeLevel",
    question: "What degree level are you pursuing?",
    options: ["Undergraduate (UG)", "Postgraduate (PG)", "MBA", "PhD"],
  },
  {
    id: "field",
    question: "What field of study interests you?",
    options: [
      "Engineering",
      "Medicine / Healthcare",
      "Business / Management",
      "Law",
      "Computer Science / IT",
      "Agriculture",
      "Architecture",
      "Arts / Humanities",
    ],
  },
  {
    id: "budget",
    question: "What is your annual budget for tuition?",
    options: ["$0 – $2,000", "$2,000 – $5,000", "$5,000+"],
  },
  {
    id: "country",
    question: "Do you prefer India or North Cyprus?",
    options: ["🇮🇳 India", "🇨🇾 North Cyprus", "No preference"],
  },
  {
    id: "scholarship",
    question: "Is scholarship availability important to you?",
    options: ["Yes – Essential", "Maybe – Would be nice", "No – Not a priority"],
  },
  {
    id: "gpa",
    question: "What is your current GPA (out of 4.0)?",
    options: ["Less than 2.5", "2.5 – 3.0", "3.0 – 3.5", "3.5+"],
  },
];

function calculateMatchScore(
  uni: typeof universities[0],
  answers: Answers
): { score: number; reason: string } {
  let score = 50;
  const reasons: string[] = [];

  // Budget match
  if (answers.budget === "$0 – $2,000") {
    if (uni.tuition.min < 2000) {
      score += 20;
      reasons.push("fits your budget");
    } else score -= 10;
  } else if (answers.budget === "$2,000 – $5,000") {
    if (uni.tuition.min >= 1500 && uni.tuition.max <= 6000) {
      score += 15;
      reasons.push("within budget range");
    }
  } else if (answers.budget === "$5,000+") {
    if (uni.tuition.max > 5000) {
      score += 10;
      reasons.push("premium program");
    }
  }

  // Country match
  if (answers.country !== "No preference") {
    const countryName = answers.country.includes("India") ? "India" : "North Cyprus";
    if (uni.country === countryName) {
      score += 20;
      reasons.push(`located in ${uni.country}`);
    } else score -= 15;
  }

  // Field match
  const fieldLower = answers.field.toLowerCase().split(" ")[0];
  const allPrograms = [...uni.programs.undergraduate, ...uni.programs.postgraduate];
  if (allPrograms.some((p) => p.toLowerCase().includes(fieldLower))) {
    score += 15;
    reasons.push("offers your field");
  }

  // Scholarship
  if (answers.scholarship === "Yes – Essential" && uni.scholarship) {
    score += 10;
    reasons.push("scholarship available");
  }

  // GPA / Rating correlation
  if (answers.gpa === "3.5+") {
    if (uni.rating >= 4.7) {
      score += 10;
      reasons.push("top-rated match");
    } else if (uni.rating >= 4.5) score += 6;
  } else if (answers.gpa === "3.0 – 3.5") {
    if (uni.rating >= 4.3 && uni.rating < 4.8) score += 8;
  } else if (answers.gpa === "2.5 – 3.0") {
    if (uni.rating < 4.5) score += 5;
  }

  // Degree level match
  if (answers.degreeLevel === "MBA") {
    if (uni.programs.postgraduate.some((p) => p.toLowerCase().includes("mba"))) {
      score += 10;
      reasons.push("MBA program available");
    }
  } else if (answers.degreeLevel === "PhD") {
    if (uni.programs.postgraduate.some((p) => p.toLowerCase().includes("phd"))) {
      score += 10;
    }
  }

  return {
    score: Math.min(99, Math.max(45, score)),
    reason: reasons.slice(0, 2).join(", ") || "good overall match",
  };
}

export default function AIMatchPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    degreeLevel: "",
    field: "",
    budget: "",
    country: "",
    scholarship: "",
    gpa: "",
  });
  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [done, setDone] = useState(false);

  const answerKeys: (keyof Answers)[] = [
    "degreeLevel",
    "field",
    "budget",
    "country",
    "scholarship",
    "gpa",
  ];

  const selectOption = (option: string) => {
    const key = answerKeys[current];
    setAnswers((prev) => ({ ...prev, [key]: option }));
  };

  const goNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setCalculating(true);
      setTimeout(() => {
        const scored: MatchResult[] = universities
          .map((uni) => {
            const { score, reason } = calculateMatchScore(uni, answers);
            return {
              id: uni.id,
              name: uni.name,
              country: uni.country,
              city: uni.city,
              rating: uni.rating,
              ranking: uni.ranking,
              tuition: uni.tuition,
              image: uni.image,
              matchScore: score,
              matchReason: reason,
            };
          })
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, 5);
        setResults(scored);
        setCalculating(false);
        setDone(true);
      }, 2000);
    }
  };

  const goBack = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const reset = () => {
    setCurrent(0);
    setAnswers({ degreeLevel: "", field: "", budget: "", country: "", scholarship: "", gpa: "" });
    setDone(false);
    setResults([]);
  };

  const currentAnswer = answers[answerKeys[current]];
  const progress = ((current + 1) / questions.length) * 100;

  const scoreColor = (s: number) =>
    s >= 85 ? "text-green-600" : s >= 70 ? "text-blue-600" : "text-amber-600";
  const barColor = (s: number) =>
    s >= 85
      ? "from-green-400 to-emerald-500"
      : s >= 70
      ? "from-blue-400 to-indigo-500"
      : "from-amber-400 to-orange-500";

  if (calculating) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Calculating Your Matches...</h2>
          <p className="text-slate-500">Our AI is analyzing 17 universities for you.</p>
        </div>
      </main>
    );
  }

  if (done) {
    return (
      <main className="min-h-screen bg-slate-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" /> AI Recommendations
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Your Top 5 University Matches</h1>
            <p className="text-slate-500">Based on your preferences, here are your best-fit universities.</p>
          </div>

          <div className="space-y-4">
            {results.map((uni, i) => (
              <div
                key={uni.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="relative w-full sm:w-40 h-32 sm:h-auto shrink-0">
                  <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center font-black text-blue-600 text-sm shadow-md">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900">{uni.name}</h3>
                      <p className="text-sm text-slate-500">
                        {uni.city}, {uni.country}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {uni.rating}
                        </span>
                        <span className="text-xs text-slate-500">Rank #{uni.ranking}</span>
                        <span className="text-xs text-slate-500">
                          ${uni.tuition.min.toLocaleString()}/yr
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className={`text-2xl font-black ${scoreColor(uni.matchScore)}`}>
                        {uni.matchScore}%
                      </p>
                      <p className="text-xs text-slate-500">match</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${barColor(uni.matchScore)} rounded-full`}
                        style={{ width: `${uni.matchScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1 capitalize">{uni.matchReason}</p>
                  </div>
                  <Link
                    href={`/universities/${uni.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    View Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3 justify-center">
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
            <Link
              href="/apply"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Brain className="w-4 h-4" /> AI University Matcher
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Find Your Perfect University</h1>
          <p className="text-slate-500">
            Answer 6 quick questions to get personalized university recommendations.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>
              Question {current + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">{questions[current].question}</h2>
          <div className="grid gap-3">
            {questions[current].options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => selectOption(option)}
                className={`w-full p-4 rounded-xl border-2 text-left text-sm font-semibold transition-all ${
                  currentAnswer === option
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-slate-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={goBack}
              disabled={current === 0}
              className="flex items-center gap-2 px-6 py-3 text-slate-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={goNext}
              disabled={!currentAnswer}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm shadow-lg shadow-blue-200"
            >
              {current === questions.length - 1 ? (
                <>
                  <Sparkles className="w-4 h-4" /> Get My Matches
                </>
              ) : (
                <>
                  Next <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
