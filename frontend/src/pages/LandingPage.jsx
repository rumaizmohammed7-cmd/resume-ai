import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, FileText, Target, Layout, Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage({ onStartBuilder, onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar onNavigate={onNavigate} currentPage="landing" />

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>ATS-Friendly • AI-Powered • Easy to Edit</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Build a Resume That <span className="text-brand-600">Gets Noticed</span>
        </h1>

        <p className="mt-4 text-xl font-semibold text-slate-700 max-w-3xl mx-auto">
          Create a professional, ATS-friendly resume from scratch with AI.
        </p>

        <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Tell us about yourself, choose your target job, and let AI organize your information into a professional resume.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartBuilder}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-brand-600 rounded-xl shadow-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition"
          >
            <span>Create My Resume</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition"
          >
            How It Works
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            No Upload Required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Zero AI Hallucinations
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Instant PDF & DOCX Export
          </span>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How It Works</h2>
            <p className="mt-2 text-base text-slate-600">Build a recruiter-ready resume in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 relative space-y-4">
              <div className="text-sm font-black text-brand-600 tracking-widest uppercase">01</div>
              <h3 className="text-xl font-bold text-slate-900">Tell Us About Yourself</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enter your education, skills, work experience, projects, and achievements through a simple step-by-step form.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 relative space-y-4">
              <div className="text-sm font-black text-brand-600 tracking-widest uppercase">02</div>
              <h3 className="text-xl font-bold text-slate-900">Add Your Target Job</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Paste the job description for the position you want to analyze keyword match scores and missing skills.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 relative space-y-4">
              <div className="text-sm font-black text-brand-600 tracking-widest uppercase">03</div>
              <h3 className="text-xl font-bold text-slate-900">Generate Your Resume</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                AI organizes your information and optimizes the wording for the target job while preserving strict accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Features Section */}
      <section id="features" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Designed for Every Experience Level</h2>
          <p className="mt-2 text-base text-slate-600">Tailored structures for freshers, early career, and senior managers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">Student / Fresher</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prioritizes Education, Technical Skills, Key Projects, Internships, and Certifications.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">0–2 Years</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prioritizes Skills, Work Experience, Projects, and Education.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">2–5 Years</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prioritizes Work Experience, Achievements, Technical Skills, and Projects.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="text-lg font-bold text-slate-900">5+ Years</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prioritizes Professional Experience, Leadership, Business Impact, and Core Competencies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Ready to build your ATS resume?</h2>
          <p className="mt-3 text-slate-400 text-base">Start creating your resume now and get hiring managers' attention.</p>
          <button
            onClick={onStartBuilder}
            className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold text-slate-900 bg-white rounded-xl shadow-lg hover:bg-slate-100 transition"
          >
            <span>Create My Resume Now</span>
            <ArrowRight className="w-5 h-5 text-slate-900" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
