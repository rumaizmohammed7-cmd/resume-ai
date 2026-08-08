import React from 'react';
import { FileText } from 'lucide-react';

export default function Navbar({ onNavigate, currentPage }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <img 
            src="/logo.png" 
            alt="ResumeAI Logo" 
            className="w-9 h-9 rounded-lg shadow-md shadow-brand-500/20 group-hover:scale-105 transition object-cover border border-slate-800"
          />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Resume<span className="text-brand-600">AI</span>
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <a href="#how-it-works" onClick={() => onNavigate('landing')} className="hover:text-slate-900 transition">How It Works</a>
          <a href="#features" onClick={() => onNavigate('landing')} className="hover:text-slate-900 transition">Features</a>
          <a href="#templates" onClick={() => onNavigate('landing')} className="hover:text-slate-900 transition">Templates</a>
          <button onClick={() => onNavigate('dashboard')} className={`hover:text-slate-900 transition ${currentPage === 'dashboard' ? 'text-brand-600 font-semibold' : ''}`}>
            My Resumes
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onNavigate('experience-selector')}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-lg shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition"
          >
            Create My Resume
          </button>
        </div>
      </div>
    </nav>
  );
}
