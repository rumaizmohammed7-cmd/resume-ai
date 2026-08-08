import React from 'react';
import { getSectionOrder } from './ClassicTemplate';

export default function ExecutiveTemplate({ data, isCompact = true }) {
  if (!data) return null;
  const { personalInfo = {}, education = [], experiences = [], skills = {}, projects = [], certifications = [], achievements = [], languages = [], experienceLevel } = data;
  const sectionOrder = getSectionOrder(experienceLevel);

  const validExperiences = experiences.filter(e => e.jobTitle || e.company);
  const validProjects = projects.filter(p => p.name);
  const validEducation = education.filter(e => e.degree || e.institution);
  const validCertifications = certifications.filter(c => c.name);
  const validAchievements = achievements.filter(a => a.title);

  const containerPadding = isCompact ? "p-6 md:p-8" : "p-8 md:p-10";
  const sectionMargin = isCompact ? "mb-2.5" : "mb-4";
  const bodyTextSize = isCompact ? "text-[12px] leading-snug" : "text-[13px] leading-relaxed";

  const renderSummary = () => personalInfo.summary && (
    <div key="summary" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-0.5 mb-1">Executive Summary</h2>
      <p className={`${bodyTextSize} text-slate-800 italic`}>{personalInfo.summary}</p>
    </div>
  );

  const renderSkills = () => Object.keys(skills).length > 0 && (
    <div key="skills" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-0.5 mb-1">Core Competencies & Expertise</h2>
      <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-slate-50 p-2 rounded border border-slate-200">
        {Object.entries(skills).map(([cat, list], idx) => {
          if (!Array.isArray(list) || list.length === 0) return null;
          return (
            <div key={idx}>
              <span className="font-bold text-slate-900 block uppercase tracking-wide text-[10px]">{cat}</span>
              <span className="text-slate-700">{list.join(", ")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderExperience = () => validExperiences.length > 0 && (
    <div key="experience" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-0.5 mb-1">Professional Experience</h2>
      <div className="space-y-2">
        {validExperiences.map((exp, idx) => (
          <div key={idx} className={bodyTextSize}>
            <div className="flex justify-between font-bold text-slate-900">
              <span>{exp.jobTitle} — <span className="font-semibold text-slate-700">{exp.company}</span></span>
              <span className="text-[11px] text-slate-600 font-normal">{exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}</span>
            </div>
            {Array.isArray(exp.responsibilities) && (
              <ul className="list-disc ml-3.5 space-y-0.5 text-slate-800 mt-0.5">
                {exp.responsibilities.map((r, i) => r ? <li key={i}>{r}</li> : null)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => validProjects.length > 0 && (
    <div key="projects" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-0.5 mb-1">Key Contributions & Projects</h2>
      <div className="space-y-2">
        {validProjects.map((proj, idx) => (
          <div key={idx} className={bodyTextSize}>
            <div className="flex justify-between font-bold text-slate-900">
              <span>{proj.name}</span>
              {proj.technologies && <span className="text-[11px] font-normal text-slate-600">{proj.technologies.join(", ")}</span>}
            </div>
            {proj.description && <p className="text-slate-800">{proj.description}</p>}
            {Array.isArray(proj.contributions) && (
              <ul className="list-disc ml-3.5 space-y-0.5 text-slate-800 mt-0.5">
                {proj.contributions.map((c, i) => c ? <li key={i}>{c}</li> : null)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => validEducation.length > 0 && (
    <div key="education" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-0.5 mb-1">Education & Credentials</h2>
      <div className="space-y-1.5">
        {validEducation.map((edu, idx) => (
          <div key={idx} className={`${bodyTextSize} flex justify-between`}>
            <div>
              <span className="font-bold text-slate-900">{edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}</span>
              <span className="text-slate-700"> | {edu.institution}</span>
            </div>
            <span className="text-slate-600 font-normal text-[11px]">{edu.startYear} – {edu.endYear}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertifications = () => validCertifications.length > 0 && (
    <div key="certifications" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-0.5 mb-1">Certifications</h2>
      <ul className={`list-disc ml-3.5 space-y-0.5 ${bodyTextSize} text-slate-800`}>
        {validCertifications.map((c, i) => <li key={i}><span className="font-semibold">{c.name}</span> — {c.organization} ({c.date})</li>)}
      </ul>
    </div>
  );

  const renderAchievements = () => validAchievements.length > 0 && (
    <div key="achievements" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-0.5 mb-1">Leadership & Recognition</h2>
      <ul className={`list-disc ml-3.5 space-y-0.5 ${bodyTextSize} text-slate-800`}>
        {validAchievements.map((a, i) => <li key={i}><span className="font-semibold">{a.title}</span>: {a.description}</li>)}
      </ul>
    </div>
  );

  const renderLanguages = () => languages.length > 0 && (
    <div key="languages" className={sectionMargin}>
      <h2 className="text-[11px] font-bold text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-0.5 mb-1">Languages</h2>
      <p className={`${bodyTextSize} text-slate-800`}>{languages.map(l => `${l.language} (${l.proficiency})`).join(" • ")}</p>
    </div>
  );

  const sectionMap = {
    summary: renderSummary,
    skills: renderSkills,
    experience: renderExperience,
    projects: renderProjects,
    education: renderEducation,
    certifications: renderCertifications,
    achievements: renderAchievements,
    languages: renderLanguages
  };

  return (
    <div id="printable-resume" className={`bg-white ${containerPadding} text-slate-900 font-sans shadow-md border border-slate-200 rounded-sm w-full max-w-[800px] mx-auto text-left`}>
      <div className="border-b-4 border-slate-900 pb-2 mb-3 text-center">
        <h1 className="text-2xl font-serif font-bold tracking-tight text-slate-900 uppercase">{personalInfo.fullName || "YOUR NAME"}</h1>
        <p className="text-xs font-medium text-slate-700 tracking-widest uppercase mt-0.5">{personalInfo.title}</p>
        <div className="flex justify-center flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-600 mt-1 font-mono">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </div>

      {sectionOrder.map(secKey => sectionMap[secKey] ? sectionMap[secKey]() : null)}
    </div>
  );
}
