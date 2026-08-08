import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import ExperienceSelector from './components/ExperienceSelector';
import BuilderPage from './pages/BuilderPage';
import EditorPage from './pages/EditorPage';
import DashboardPage from './pages/DashboardPage';
import { initialSampleProfile } from './data/sampleResumes';
import { getDraft, saveDraft, saveResumeToStorage } from './services/storageService';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [resumeData, setResumeData] = useState(() => {
    return getDraft() || initialSampleProfile;
  });

  // Save current working draft on state updates
  useEffect(() => {
    if (resumeData) {
      saveDraft(resumeData);
    }
  }, [resumeData]);

  const handleStartBuilder = () => {
    setCurrentPage('experience-selector');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExperienceSelect = (expLevel) => {
    const updated = {
      ...resumeData,
      id: resumeData.id || "resume-" + Date.now(),
      experienceLevel: expLevel
    };
    setResumeData(updated);
    setCurrentPage('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishBuilder = (mode = 'edit') => {
    // Save to stored resumes list
    saveResumeToStorage(resumeData);
    if (mode === 'preview' || mode === 'edit') {
      setCurrentPage('editor');
    } else {
      setCurrentPage('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectResumeFromDashboard = (selectedResume, mode = 'edit') => {
    setResumeData(selectedResume);
    if (mode === 'edit' || mode === 'preview') {
      setCurrentPage('editor');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateNewResume = () => {
    const blankResume = {
      ...initialSampleProfile,
      id: "resume-" + Date.now(),
      personalInfo: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary: ""
      },
      education: [],
      experiences: [],
      internships: [],
      skills: {
        "Programming Languages": [],
        "Frameworks & Libraries": [],
        "Databases": [],
        "Tools & Software": []
      },
      projects: [],
      certifications: [],
      achievements: [],
      languages: [{ language: "English", proficiency: "Fluent" }],
      targetJob: { title: "", company: "", description: "" }
    };
    setResumeData(blankResume);
    setCurrentPage('experience-selector');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage
            onStartBuilder={handleStartBuilder}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );
      case 'experience-selector':
        return (
          <div className="min-h-screen bg-slate-50">
            <ExperienceSelector
              initialValue={resumeData.experienceLevel}
              onSelect={handleExperienceSelect}
            />
          </div>
        );
      case 'builder':
        return (
          <BuilderPage
            resumeData={resumeData}
            onUpdateResume={setResumeData}
            onFinishBuilder={handleFinishBuilder}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );
      case 'editor':
        return (
          <EditorPage
            resumeData={resumeData}
            onUpdateResume={setResumeData}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage
            onSelectResume={handleSelectResumeFromDashboard}
            onCreateNew={handleCreateNewResume}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );
      default:
        return (
          <LandingPage
            onStartBuilder={handleStartBuilder}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-brand-100 selection:text-brand-800">
      {renderCurrentPage()}
    </div>
  );
}
