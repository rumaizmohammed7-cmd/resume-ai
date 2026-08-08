import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, Edit3, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import WizardProgress from '../components/WizardProgress';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import SummaryForm from '../forms/SummaryForm';
import EducationForm from '../forms/EducationForm';
import ExperienceForm from '../forms/ExperienceForm';
import SkillsForm from '../components/SkillTagInput';
import ProjectsForm from '../forms/ProjectsForm';
import ExtrasForm from '../forms/ExtrasForm';
import TargetJobForm from '../forms/TargetJobForm';

export default function BuilderPage({ resumeData, onUpdateResume, onFinishBuilder, onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isReady, setIsReady] = useState(false);

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsReady(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(val) => onUpdateResume({ ...resumeData, personalInfo: val })}
          />
        );
      case 2:
        return (
          <SummaryForm
            summary={resumeData.personalInfo?.summary || ''}
            fullProfile={resumeData}
            onChange={(val) => onUpdateResume({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, summary: val }
            })}
          />
        );
      case 3:
        return (
          <EducationForm
            education={resumeData.education}
            onChange={(val) => onUpdateResume({ ...resumeData, education: val })}
          />
        );
      case 4:
        return (
          <ExperienceForm
            experiences={resumeData.experiences}
            isStudent={resumeData.experienceLevel?.includes("Student")}
            onChange={(val) => onUpdateResume({ ...resumeData, experiences: val })}
            onSkipStep={handleNext}
          />
        );
      case 5:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Technical & Domain Skills</h2>
              <p className="text-xs text-slate-500 mt-1">Categorize your skills. Enter skills relevant to your target role.</p>
            </div>
            <SkillsForm
              skills={resumeData.skills}
              onChange={(val) => onUpdateResume({ ...resumeData, skills: val })}
            />
          </div>
        );
      case 6:
        return (
          <ProjectsForm
            projects={resumeData.projects}
            onChange={(val) => onUpdateResume({ ...resumeData, projects: val })}
          />
        );
      case 7:
        return (
          <ExtrasForm
            data={{
              certifications: resumeData.certifications,
              achievements: resumeData.achievements,
              languages: resumeData.languages
            }}
            onChange={(val) => onUpdateResume({
              ...resumeData,
              certifications: val.certifications,
              achievements: val.achievements,
              languages: val.languages
            })}
          />
        );
      case 8:
        return (
          <TargetJobForm
            targetJob={resumeData.targetJob || { title: "", company: "", description: "" }}
            fullProfile={resumeData}
            onUpdateJob={(val) => onUpdateResume({ ...resumeData, targetJob: val })}
            onAnalysisComplete={(res) => onUpdateResume({ ...resumeData, atsScore: res.ats_score })}
          />
        );
      default:
        return null;
    }
  };

  if (isReady) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar onNavigate={onNavigate} currentPage="builder" />
        <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 text-center my-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Your Resume Is Ready
          </h1>

          <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            We've organized your information into a professional ATS-friendly format tailored for your experience level.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onFinishBuilder('preview')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-slate-900 rounded-xl shadow-md hover:bg-slate-800 transition"
            >
              <Eye className="w-4 h-4" />
              <span>View Resume</span>
            </button>

            <button
              onClick={() => onFinishBuilder('edit')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-brand-600 rounded-xl shadow-md hover:bg-brand-700 transition"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Resume</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onNavigate={onNavigate} currentPage="builder" />

      <WizardProgress
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto py-8 px-4 sm:px-6 pb-24">
        {renderStepForm()}

        {/* Bottom Wizard Controls */}
        <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-7 py-2.5 text-sm font-bold text-white bg-brand-600 rounded-xl shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition"
          >
            <span>{currentStep === 8 ? "Generate Resume" : "Save & Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
