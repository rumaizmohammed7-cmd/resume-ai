import React from 'react';
import { Layout, Check } from 'lucide-react';

const TEMPLATES = [
  { id: "classic", name: "Classic", desc: "Traditional professional ATS format with clean layout." },
  { id: "modern", name: "Modern", desc: "Minimal modern design with blue accent headers." },
  { id: "executive", name: "Executive", desc: "Tailored for experienced professionals and managers." }
];

export default function TemplateSelector({ selectedTemplate = "classic", onSelect }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
        <Layout className="w-4 h-4 text-brand-600" />
        Choose ATS Template
      </div>

      <div className="grid grid-cols-3 gap-3">
        {TEMPLATES.map((t) => {
          const isSelected = selectedTemplate === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={`p-3 rounded-lg border text-left transition relative flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
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
