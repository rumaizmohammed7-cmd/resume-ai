import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-7 h-7 rounded bg-brand-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold">ResumeAI</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Empowering job seekers, freshers, and experienced professionals to build ATS-friendly resumes that stand out.
          </p>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ATS-Compliant • 100% Fact-Based AI</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Resume Builder</a></li>
            <li><a href="#" className="hover:text-white transition">ATS Checker</a></li>
            <li><a href="#" className="hover:text-white transition">Job Description Analyzer</a></li>
            <li><a href="#" className="hover:text-white transition">ATS Templates</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Experience Levels</h4>
          <ul className="space-y-2 text-sm">
            <li><span className="text-slate-400">Student & Fresher</span></li>
            <li><span className="text-slate-400">0–2 Years Experience</span></li>
            <li><span className="text-slate-400">2–5 Years Experience</span></li>
            <li><span className="text-slate-400">5+ Years Experience</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Privacy & Ethics</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            ResumeAI never invents metrics, skills, or employment history. All output is strictly generated from user-provided facts.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-800 text-xs text-center text-slate-400">
        © {new Date().getFullYear()} ResumeAI Inc. All rights reserved.
      </div>
    </footer>
  );
}
