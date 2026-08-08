import React from 'react';
import { Layout, Check, Award } from 'lucide-react';

const TEMPLATES = [
  { id: "maang", name: "MAANG Standard", desc: "Ultra-clean Google/Meta single-column ATS format." },
  { id: "classic", name: "Classic ATS", desc: "Traditional professional ATS format with clean layout." },
  { id: "modern", name: "Modern Tech", desc: "Minimal modern design with blue accent headers." },
  { id: "executive", name: "Executive", desc: "Tailored for senior professionals and managers." }
];

export default function TemplateSelector({ selectedTemplate = "maang", onSelect }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <Layout className="w-4 h-4 text-brand-600" />
          Choose ATS Resume Template
        </div>
        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
          <Award className="w-3 h-3 text-amber-600" />
          MAANG Approved
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {TEMPLATES.map((t) => {
          const isSelected = selectedTemplate === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={`p-3 rounded-lg border text-left transition relative flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-bold ${isSelected ? 'text-brand-700' : 'text-slate-900'}`}>{t.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">{t.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
