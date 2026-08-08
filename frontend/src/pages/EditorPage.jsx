import React, { useState } from 'react';
import { Save, Download, RotateCcw, FileSpreadsheet, ArrowLeft, Layers, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import SummaryForm from '../forms/SummaryForm';
import EducationForm from '../forms/EducationForm';
import ExperienceForm from '../forms/ExperienceForm';
import SkillsForm from '../components/SkillTagInput';
import ProjectsForm from '../forms/ProjectsForm';
import ExtrasForm from '../forms/ExtrasForm';
import { exportToPdf, exportToDocx } from '../services/pdfService';
import { saveResumeToStorage } from '../services/storageService';

const SECTIONS = [
  { id: "personal", name: "Personal" },
  { id: "summary", name: "Summary" },
  { id: "experience", name: "Experience" },
  { id: "skills", name: "Skills" },
  { id: "projects", name: "Projects" },
  { id: "education", name: "Education" },
  { id: "extras", name: "Certifications & Extras" }
];

export default function EditorPage({ resumeData, onUpdateResume, onNavigate }) {
  const [activeSection, setActiveSection] = useState("summary");
  const [template, setTemplate] = useState(resumeData.template || "classic");
  const [isCompact, setIsCompact] = useState(true);
  const [history, setHistory] = useState([resumeData]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    saveResumeToStorage({ ...resumeData, template });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleUndo = () => {
    if (history.length > 1) {
      const prev = history[history.length - 2];
      setHistory(history.slice(0, -1));
      onUpdateResume(prev);
    }
  };

  const updateProfileData = (newData) => {
    setHistory(prev => [...prev.slice(-10), newData]);
    onUpdateResume(newData);
  };

  const handleDownloadPdf = () => {
    exportToPdf("printable-resume", `${resumeData.personalInfo?.fullName || "Resume"}_ResumeAI.pdf`);
  };

  const handleDownloadDocx = () => {
    exportToDocx(resumeData, `${resumeData.personalInfo?.fullName || "Resume"}_ResumeAI.docx`);
  };

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(val) => updateProfileData({ ...resumeData, personalInfo: val })}
          />
        );
      case 'summary':
        return (
          <SummaryForm
            summary={resumeData.personalInfo?.summary || ''}
            fullProfile={resumeData}
            onChange={(val) => updateProfileData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, summary: val }
            })}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            experiences={resumeData.experiences}
            isStudent={resumeData.experienceLevel?.includes("Student")}
            onChange={(val) => updateProfileData({ ...resumeData, experiences: val })}
            onSkipStep={() => setActiveSection('skills')}
          />
        );
      case 'skills':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Technical Skills</h3>
            <SkillsForm
              skills={resumeData.skills}
              onChange={(val) => updateProfileData({ ...resumeData, skills: val })}
            />
          </div>
        );
      case 'projects':
        return (
          <ProjectsForm
            projects={resumeData.projects}
            onChange={(val) => updateProfileData({ ...resumeData, projects: val })}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={resumeData.education}
            onChange={(val) => updateProfileData({ ...resumeData, education: val })}
          />
        );
      case 'extras':
        return (
          <ExtrasForm
            data={{
              certifications: resumeData.certifications,
              achievements: resumeData.achievements,
              languages: resumeData.languages
            }}
            onChange={(val) => updateProfileData({
              ...resumeData,
              certifications: val.certifications,
              achievements: val.achievements,
              languages: val.languages
            })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar onNavigate={onNavigate} currentPage="editor" />

      {/* Control Action Toolbar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight">
                {resumeData.personalInfo?.fullName || "Resume Editor"}
              </h1>
              <p className="text-xs text-slate-500">
                Target: <span className="font-semibold text-brand-600">{resumeData.targetJob?.title || "Software Professional"}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* 1-Page Fit Toggle Button */}
            <button
              type="button"
              onClick={() => setIsCompact(!isCompact)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                isCompact
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
              title="Enforce tight single-page ATS formatting"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1-Page Fit</span>
              {isCompact && <Check className="w-3 h-3 text-emerald-600" />}
            </button>

            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition disabled:opacity-40"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Undo
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition"
            >
              <Save className="w-3.5 h-3.5" />
              {savedSuccess ? "Saved!" : "Save"}
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>

            <button
              type="button"
              onClick={handleDownloadDocx}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              Download DOCX
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Section Nav & Form Editor */}
        <div className="lg:col-span-5 space-y-6">
          <TemplateSelector
            selectedTemplate={template}
            onSelect={(t) => setTemplate(t)}
          />

          {/* Section Navigation Tabs */}
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-1">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  activeSection === s.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
            {renderSectionEditor()}
          </div>
        </div>

        {/* Right Column - Live Resume Preview */}
        <div className="lg:col-span-7 sticky top-36 self-start">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center px-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live ATS Preview ({isCompact ? 'Single-Page Mode' : 'Standard Spacing'})
              </span>
              <span>Template: <strong className="text-slate-800 uppercase">{template}</strong></span>
            </div>

            <ResumePreview
              data={resumeData}
              template={template}
              isCompact={isCompact}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
