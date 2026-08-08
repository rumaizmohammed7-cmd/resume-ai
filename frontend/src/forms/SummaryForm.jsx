import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { generateSummaryApi } from '../services/api';

export default function SummaryForm({ summary = '', fullProfile = {}, onChange }) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const generated = await generateSummaryApi(fullProfile);
      onChange(generated);
    } catch (e) {
      console.error("Summary generation error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Professional Summary</h2>
          <p className="text-xs text-slate-500 mt-1">Briefly outline your background, primary technical skills, and career focus.</p>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 rounded-lg hover:bg-brand-100 transition focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-brand-600" />
          ) : (
            <Sparkles className="w-4 h-4 text-brand-600" />
          )}
          <span>{loading ? "Generating..." : "Generate With AI"}</span>
        </button>
      </div>

      <div className="space-y-2">
        <textarea
          rows={5}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tell us briefly about yourself, your experience, skills, and career goals..."
          className="w-full p-3.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none leading-relaxed"
        />

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-500 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
          <span>
            AI generates your summary exclusively from your entered profile data. You can freely edit or polish the text above.
          </span>
        </div>
      </div>
    </div>
  );
}
