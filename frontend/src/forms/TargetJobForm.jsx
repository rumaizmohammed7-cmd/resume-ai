import React, { useState } from 'react';
import { Target, Sparkles, RefreshCw, Check, X, ShieldAlert } from 'lucide-react';
import { analyzeJobAndAtsApi } from '../services/api';
import AtsScoreCard from '../components/AtsScoreCard';
import MissingSkillsAlert from '../components/MissingSkillsAlert';

export default function TargetJobForm({ targetJob = {}, fullProfile = {}, onUpdateJob, onAnalysisComplete }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dismissedSuggestions, setDismissedSuggestions] = useState([]);

  const handleAnalyze = async () => {
    if (!targetJob.title) {
      alert("Please enter a Target Job Title.");
      return;
    }
    setAnalyzing(true);
    try {
      const res = await analyzeJobAndAtsApi(targetJob.description, fullProfile, targetJob.title);
      setAnalysisResult(res);
      if (onAnalysisComplete) {
        onAnalysisComplete(res);
      }
    } catch (e) {
      console.error("Job analysis error", e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplySuggestion = (index) => {
    setDismissedSuggestions(prev => [...prev, index]);
    alert("Suggestion applied to resume settings!");
  };

  const handleIgnoreSuggestion = (index) => {
    setDismissedSuggestions(prev => [...prev, index]);
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">What job are you applying for?</h2>
          <p className="text-xs text-slate-500 mt-1">Paste the target job description to run real-time ATS keyword matching and receive custom optimization tips.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Target Job Title *</label>
            <input
              type="text"
              required
              value={targetJob.title || ''}
              onChange={(e) => onUpdateJob({ ...targetJob, title: e.target.value })}
              placeholder="e.g. Software Developer"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Target Company <span className="text-slate-400 font-normal lowercase">(optional)</span></label>
            <input
              type="text"
              value={targetJob.company || ''}
              onChange={(e) => onUpdateJob({ ...targetJob, company: e.target.value })}
              placeholder="e.g. Acme Tech Solutions"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Job Description *</label>
            <textarea
              rows={6}
              value={targetJob.description || ''}
              onChange={(e) => onUpdateJob({ ...targetJob, description: e.target.value })}
              placeholder="Paste the target job description here..."
              className="w-full p-3.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none leading-relaxed"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-brand-600 rounded-lg shadow-sm hover:bg-brand-700 transition focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
          >
            {analyzing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Target className="w-4 h-4 text-white" />
            )}
            <span>{analyzing ? "Analyzing Requirements..." : "Analyze Job"}</span>
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="space-y-6 animate-fade-in">
          {/* ATS Score */}
          <AtsScoreCard
            score={analysisResult.ats_score}
            breakdown={analysisResult.breakdown}
          />

          {/* Missing Skills Rules */}
          <MissingSkillsAlert
            missingSkills={analysisResult.missing_skills}
          />

          {/* Job Requirements Extracted */}
          {analysisResult.job_analysis?.required_skills?.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Job Requirements & Key Skills</h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.job_analysis.required_skills.map((s) => (
                  <span key={s} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-semibold border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          {analysisResult.suggestions?.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                AI Optimization Recommendations
              </h3>

              <div className="space-y-3">
                {analysisResult.suggestions.map((sug, idx) => {
                  if (dismissedSuggestions.includes(idx)) return null;
                  return (
                    <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{sug.title}</h4>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{sug.description}</p>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleApplySuggestion(idx)}
                          className="px-3 py-1 text-xs font-bold text-white bg-brand-600 rounded hover:bg-brand-700 transition flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Apply
                        </button>
                        <button
                          type="button"
                          onClick={() => handleIgnoreSuggestion(idx)}
                          className="px-3 py-1 text-xs font-semibold text-slate-600 bg-slate-200 rounded hover:bg-slate-300 transition flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          Ignore
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
