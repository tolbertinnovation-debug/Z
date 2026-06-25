"use client";
import Link from "next/link";
import { MapPin, Star, Users, DollarSign, Award, ArrowRight } from "lucide-react";

interface University {
  id: string;
  name: string;
  shortName: string;
  country: string;
  city: string;
  ranking: number;
  image: string;
  logoColor: string;
  logo: string;
  rating: number;
  students: number;
  tuition: { min: number; max: number; currency: string };
  scholarship: boolean;
  accreditation: string;
  tags: string[];
  programs: { undergraduate: string[] };
}

export default function UniversityCard({ uni }: { uni: University }) {
  return (
    <Link href={`/universities/${uni.id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={uni.image}
            alt={uni.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          {/* Country badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <MapPin className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-semibold text-slate-700">{uni.country}</span>
          </div>
          {uni.scholarship && (
            <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full">
              Scholarship
            </div>
          )}
          {/* Ranking */}
          <div className="absolute bottom-3 left-3 text-white">
            <p className="text-xs text-white/70">Ranking</p>
            <p className="font-bold text-sm">#{uni.ranking}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Logo + Name */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: uni.logoColor }}
            >
              {uni.logo}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {uni.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{uni.city}, {uni.country}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {uni.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{uni.rating}/5.0</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span>{uni.students.toLocaleString()}+ students</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <DollarSign className="w-3.5 h-3.5 text-green-500" />
              <span>${uni.tuition.min}–${uni.tuition.max}/yr</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Award className="w-3.5 h-3.5 text-purple-500" />
              <span className="truncate">{uni.accreditation}</span>
            </div>
          </div>

          {/* Programs */}
          <div className="mb-4 flex-1">
            <p className="text-xs text-slate-500 font-medium mb-1.5">Top Programs</p>
            <div className="flex flex-wrap gap-1">
              {uni.programs.undergraduate.slice(0, 3).map((p) => (
                <span key={p} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-3 border-t border-slate-100">
            <span className="flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:gap-2.5 transition-all duration-200 py-1">
              View University Profile <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
