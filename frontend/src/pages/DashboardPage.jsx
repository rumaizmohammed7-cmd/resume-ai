import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Eye, Copy, Trash2, Target, FileText, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSavedResumes, deleteResumeFromStorage, saveResumeToStorage } from '../services/storageService';
import { initialSampleProfile } from '../data/sampleResumes';

export default function DashboardPage({ onSelectResume, onCreateNew, onNavigate }) {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const list = getSavedResumes();
    if (list.length === 0) {
      // Seed default sample resume for initial view
      const seeded = saveResumeToStorage(initialSampleProfile);
      setResumes([seeded]);
    } else {
      setResumes(list);
    }
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this resume?")) {
      deleteResumeFromStorage(id);
      setResumes(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleDuplicate = (resume, e) => {
    e.stopPropagation();
    const dup = {
      ...resume,
      id: "resume-" + Date.now(),
      title: `${resume.title || resume.personalInfo?.fullName || "Resume"} (Copy)`,
      updatedAt: "Today"
    };
    const saved = saveResumeToStorage(dup);
    setResumes(prev => [saved, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onNavigate={onNavigate} currentPage="dashboard" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Resumes</h1>
            <p className="text-sm text-slate-600 mt-1">Manage, edit, and duplicate your ATS-friendly resumes.</p>
          </div>

          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-brand-600 rounded-xl shadow-md hover:bg-brand-700 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Resume</span>
          </button>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-md mx-auto my-12 space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Resumes Saved</h3>
            <p className="text-xs text-slate-500">Create your first professional ATS resume in minutes.</p>
            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-2 px-6 py-2 text-xs font-bold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create Resume</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((item) => {
              const name = item.personalInfo?.fullName || item.title || "Software Engineer Resume";
              const target = item.targetJob?.title || item.targetJobTitle || item.personalInfo?.title || "Software Developer";
              const score = item.atsScore || 87;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectResume(item, 'edit')}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer p-6 flex flex-col justify-between space-y-5 group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                        ATS Resume
                      </span>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">
                        <Target className="w-3.5 h-3.5" />
                        <span>ATS Score: {score}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition line-clamp-1">
                      {name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Target: <strong className="text-slate-800 font-semibold">{target}</strong>
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Updated: {item.updatedAt || "Recently"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onSelectResume(item, 'edit'); }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onSelectResume(item, 'preview'); }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleDuplicate(item, e)}
                        title="Duplicate Resume"
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(item.id, e)}
                        title="Delete Resume"
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
