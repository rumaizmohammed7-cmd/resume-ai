import React from 'react';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AtsScoreCard({ score = 87, breakdown = {} }) {
  const {
    keyword_match = 84,
    skills_match = 90,
    experience_relevance = 82,
    education_match = 95,
    formatting = 95
  } = breakdown;

  const getScoreColor = (val) => {
    if (val >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (val >= 70) return 'text-brand-600 bg-brand-50 border-brand-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  const metrics = [
    { label: "Keyword Match", value: keyword_match },
    { label: "Skills Match", value: skills_match },
    { label: "Experience Relevance", value: experience_relevance },
    { label: "Education Match", value: education_match },
    { label: "Formatting Compliance", value: formatting }
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-600" />
            ATS Optimization Score
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Calculated against target job requirements</p>
        </div>

        <div className={`px-4 py-2 rounded-xl border font-extrabold text-2xl flex items-baseline gap-1 ${getScoreColor(score)}`}>
          <span>{score}</span>
          <span className="text-xs font-semibold opacity-70">/ 100</span>
        </div>
      </div>

      {/* Breakdown Progress Bars */}
      <div className="space-y-4">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">{m.label}</span>
              <span className="text-slate-900 font-bold">{m.value}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ease-out ${
                  m.value >= 85 ? 'bg-emerald-500' : m.value >= 70 ? 'bg-brand-600' : 'bg-amber-500'
                }`}
                style={{ width: `${m.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
