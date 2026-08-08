import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function MissingSkillsAlert({ missingSkills = [] }) {
  if (!missingSkills || missingSkills.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-emerald-800">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-bold">Excellent Skills Alignment</p>
          <p className="mt-0.5">Your profile matches all primary technical skills detected in the job description.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-amber-900">Missing Skills Identified</h4>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            These skills appear in the job description but were not found in your profile.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {missingSkills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-amber-900 border border-amber-300 shadow-2xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="bg-white/80 p-3 rounded-lg border border-amber-200/80 text-xs text-slate-700 font-medium leading-relaxed">
        <span className="text-amber-900 font-bold uppercase tracking-wider block mb-0.5">Ethics & Accuracy Disclaimer:</span>
        Add these skills only if you genuinely have hands-on experience with them. ResumeAI strictly enforces truthful ATS representation.
      </div>
    </div>
  );
}
