import React, { useState } from 'react';
import { GraduationCap, Briefcase, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

const EXPERIENCE_OPTIONS = [
  {
    id: "Student / Fresher",
    title: "Student / Fresher",
    description: "For students, recent graduates, and people with no full-time experience.",
    icon: GraduationCap,
    structurePriority: "Education • Technical Skills • Projects • Internships • Certifications"
  },
  {
    id: "0–2 Years Experience",
    title: "0–2 Years Experience",
    description: "For early-career professionals.",
    icon: Briefcase,
    structurePriority: "Skills • Work Experience • Key Projects • Education"
  },
  {
    id: "2–5 Years Experience",
    title: "2–5 Years Experience",
    description: "For experienced professionals.",
    icon: Briefcase,
    structurePriority: "Work Experience • Achievements • Technical Skills • Relevant Projects"
  },
  {
    id: "5+ Years Experience",
    title: "5+ Years Experience",
    description: "For senior professionals and managers.",
    icon: Award,
    structurePriority: "Professional Experience • Leadership • Business Impact • Core Competencies"
  }
];

export default function ExperienceSelector({ onSelect, initialValue = "0–2 Years Experience" }) {
  const [selected, setSelected] = useState(initialValue);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Let's build your resume
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          What describes you best? We'll automatically customize your resume structure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {EXPERIENCE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 bg-white flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-600 shadow-md ring-2 ring-brand-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isSelected ? 'bg-brand-50 text-brand-600' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-6 h-6 text-brand-600" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">{opt.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{opt.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
                <span className="text-slate-400 block font-normal text-[11px] uppercase tracking-wider mb-0.5">Recommended Focus:</span>
                {opt.structurePriority}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => onSelect(selected)}
          className="inline-flex items-center space-x-2 px-8 py-3.5 text-base font-semibold text-white bg-brand-600 rounded-xl shadow-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
